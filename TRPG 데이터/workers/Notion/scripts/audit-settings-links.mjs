#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import {
	createLinkRegistry,
	parseWikiLinks,
	resolveWikiTarget,
	transformWikiLinks,
} from "../src/settings-links.ts"
import { auditRepository, parseFrontmatter } from "./audit-settings-v2.mjs"

const DEFAULT_ROOT = "/shared/note/project-yggdrail-codex/프로젝트 위그드라실"

export const FROZEN_LINK_AUDIT = Object.freeze({
	documents: 338,
	documentLinks: 1076,
	resolvedPageLinks: 970,
	directResolved: 963,
	sameWorldResolved: 7,
	deferredRelations: 106,
	hardUnresolved: 0,
	sectionLinks: 15,
	sectionHeadingsMatched: 15,
	sectionTargetDocuments: 3,
	sectionDependencyCycles: 0,
	imagesPreserved: 285,
})

function syntheticPageUrl(uuid) {
	return `https://www.notion.so/${uuid.replace(/-/g, "")}`
}

function sourceBody(root, relativePath) {
	const source = fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "")
	return parseFrontmatter(source).body
}

function buildHeadingCounts(body) {
	const counts = new Map()
	for (const match of body.matchAll(/^#{1,6}\s+(.+?)\s*$/gm)) {
		const heading = match[1].trim()
		counts.set(heading, (counts.get(heading) ?? 0) + 1)
	}
	return counts
}

function relationTargetSet(root) {
	const targets = new Set()
	const relationRoots = [
		path.join(root, "룩스테라", "세력 관계"),
		path.join(root, "엘드로스", "세력 관계"),
		path.join(root, "위그드라실", "세력 관계"),
	]
	for (const relationRoot of relationRoots) {
		if (!fs.existsSync(relationRoot)) continue
		const stack = [relationRoot]
		while (stack.length) {
			const current = stack.pop()
			for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
				const full = path.join(current, entry.name)
				if (entry.isDirectory()) stack.push(full)
				else if (entry.isFile() && entry.name.endsWith(".md")) {
					const source = fs.readFileSync(full, "utf8").replace(/^\uFEFF/, "")
					const { meta } = parseFrontmatter(source)
					const stem = path.basename(entry.name, ".md")
					targets.add(stem)
					if (meta.title?.trim()) targets.add(meta.title.trim())
					if (meta["이름"]?.trim()) targets.add(meta["이름"].trim())
				}
			}
		}
	}
	return targets
}

export async function auditSettingsLinks(root = DEFAULT_ROOT) {
	const { rows } = auditRepository(root)
	const documents = rows.filter((row) => row.decision === "included")
	const localByUuid = new Map(documents.map((row) => [row.uuid, row]))
	const registryEntries = documents.map((row) => ({
		uuid: row.uuid,
		title: row.title,
		stem: path.basename(row.relativePath, ".md"),
		relativePath: row.relativePath,
		world: row.world,
		pageId: `synthetic-${row.uuid}`,
		pageUrl: syntheticPageUrl(row.uuid),
	}))
	const registry = createLinkRegistry(registryEntries)
	const relationTargets = relationTargetSet(root)
	const headingCounts = new Map()
	for (const row of documents) {
		headingCounts.set(row.uuid, buildHeadingCounts(sourceBody(root, row.relativePath)))
	}

	const summary = {
		documents: documents.length,
		documentLinks: 0,
		resolvedPageLinks: 0,
		directResolved: 0,
		sameWorldResolved: 0,
		deferredRelations: 0,
		hardUnresolved: 0,
		sectionLinks: 0,
		sectionHeadingsMatched: 0,
		sectionTargetDocuments: 0,
		sectionDependencyCycles: 0,
		imagesPreserved: 0,
	}
	const issues = []
	const sectionEdges = []

	for (const row of documents) {
		const body = sourceBody(root, row.relativePath)
		const parsedLinks = parseWikiLinks(body)
		summary.imagesPreserved += parsedLinks.filter((link) => link.isImage).length

		for (const link of parsedLinks) {
			if (link.isImage) continue
			summary.documentLinks += 1
			if (link.heading) summary.sectionLinks += 1
			const resolved = resolveWikiTarget({
				link,
				sourceWorld: row.world,
				registry,
				relationTargets,
			})
			if (resolved.kind === "deferred_relation") {
				summary.deferredRelations += 1
				continue
			}
			if (resolved.kind === "unresolved") {
				summary.hardUnresolved += 1
				issues.push({ source: row.relativePath, raw: link.raw, reason: resolved.reason })
				continue
			}
			summary.resolvedPageLinks += 1
			if (resolved.resolution === "same_world") summary.sameWorldResolved += 1
			else summary.directResolved += 1
			if (link.heading) {
				sectionEdges.push({ source: row.uuid, target: resolved.entry.uuid })
				const count = headingCounts.get(resolved.entry.uuid)?.get(link.heading) ?? 0
				if (count === 1) summary.sectionHeadingsMatched += 1
				else {
					summary.hardUnresolved += 1
					issues.push({
						source: row.relativePath,
						raw: link.raw,
						reason: `heading match count ${count}: ${link.heading}`,
					})
				}
			}
		}

		const transformed = transformWikiLinks({
			markdown: body,
			sourceWorld: row.world,
			registry,
			relationTargets,
			resolveHeadingUrl: (entry, heading) => {
				const count = headingCounts.get(entry.uuid)?.get(heading) ?? 0
				return count === 1 ? `${entry.pageUrl}#synthetic-heading` : null
			},
		})
		for (const unresolved of transformed.unresolved) {
			if (!issues.some((issue) => issue.source === row.relativePath && issue.raw === unresolved.raw)) {
				summary.hardUnresolved += 1
				issues.push({ source: row.relativePath, ...unresolved })
			}
		}
		const remainingDocumentLinks = parseWikiLinks(transformed.markdown).filter((link) => !link.isImage)
		if (remainingDocumentLinks.length > 0) {
			for (const link of remainingDocumentLinks) {
				if (!issues.some((issue) => issue.source === row.relativePath && issue.raw === link.raw)) {
					summary.hardUnresolved += 1
					issues.push({ source: row.relativePath, raw: link.raw, reason: "raw document wikilink remains after transform" })
				}
			}
		}
	}

	summary.sectionTargetDocuments = new Set(sectionEdges.map((edge) => edge.target)).size
	const adjacency = new Map()
	for (const edge of sectionEdges) {
		const targets = adjacency.get(edge.source) ?? new Set()
		targets.add(edge.target)
		adjacency.set(edge.source, targets)
	}
	const visiting = new Set()
	const visited = new Set()
	let hasCycle = false
	function visit(node) {
		if (visiting.has(node)) return true
		if (visited.has(node)) return false
		visiting.add(node)
		for (const target of adjacency.get(node) ?? []) {
			if (visit(target)) return true
		}
		visiting.delete(node)
		visited.add(node)
		return false
	}
	for (const node of adjacency.keys()) {
		if (visit(node)) { hasCycle = true; break }
	}
	summary.sectionDependencyCycles = hasCycle ? 1 : 0

	return summary
}

function diffSummary(actual, expected) {
	return Object.entries(expected)
		.filter(([key, value]) => actual[key] !== value)
		.map(([key, value]) => ({ key, expected: value, actual: actual[key] }))
}

async function main() {
	const summary = await auditSettingsLinks()
	console.log(JSON.stringify(summary, null, 2))
	const differences = diffSummary(summary, FROZEN_LINK_AUDIT)
	if (differences.length) {
		console.error(JSON.stringify({ contractDifferences: differences }, null, 2))
		process.exitCode = 1
	}
}

const invoked = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : ""
if (import.meta.url === invoked) {
	main().catch((error) => {
		console.error(error instanceof Error ? error.stack || error.message : String(error))
		process.exitCode = 1
	})
}
