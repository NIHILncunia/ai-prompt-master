#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"
import {
	createLinkRegistry,
	parseWikiLinks,
	resolveWikiTarget,
	transformWikiLinks,
} from "../src/settings-links.ts"
import { auditRepository, parseFrontmatter } from "./audit-settings-v2.mjs"
import {
	buildHeadingUrlIndex,
	buildNotionRegistry,
	listPageBlocks,
	queryAllSettingPages,
	runNtnApi,
} from "./settings-link-repair-lib.mjs"

const DATA_SOURCE_ID = "36679aac-ce3d-464a-9b97-06a133554c75"
const ROOT = "/shared/note/project-yggdrail-codex/프로젝트 위그드라실"
const BACKUP_ROOT = "/tmp/notion-settings-link-backup"
const REQUEST_ROOT = "/tmp/notion-settings-link-repair"

export function parseRepairArgs(argv) {
	const result = { apply: false, uuid: "" }
	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index]
		if (arg === "--apply") result.apply = true
		else if (arg === "--uuid") {
			const value = argv[++index]
			if (!value || value.startsWith("--")) throw new Error("--uuid requires a value")
			result.uuid = value.trim().toLowerCase()
		} else throw new Error(`Unknown argument: ${arg}`)
	}
	return result
}

export function buildReplaceContentPayload(markdown) {
	return { type: "replace_content", replace_content: { new_str: markdown } }
}

export function canApplyRepair({ apply, uuid, localCount, registryCount, hardUnresolved }) {
	if (!apply) return { allowed: false, reason: "dry-run" }
	if (hardUnresolved > 0) return { allowed: false, reason: `hard unresolved links: ${hardUnresolved}` }
	if (uuid) return { allowed: true, reason: "single-page apply" }
	if (registryCount !== localCount) {
		return { allowed: false, reason: `registry incomplete: ${registryCount}/${localCount}` }
	}
	return { allowed: true, reason: "full apply" }
}

function loadLocalCatalog() {
	const { rows } = auditRepository(ROOT)
	return rows.filter((row) => row.decision === "included").map((row) => ({
		uuid: row.uuid,
		title: row.title,
		stem: path.basename(row.relativePath, ".md"),
		relativePath: row.relativePath,
		world: row.world,
	}))
}

function loadBody(entry) {
	const source = fs.readFileSync(path.join(ROOT, entry.relativePath), "utf8").replace(/^\uFEFF/, "")
	return parseFrontmatter(source).body
}

function loadRelationTargets() {
	const targets = new Set()
	for (const world of ["룩스테라", "엘드로스", "위그드라실"]) {
		const root = path.join(ROOT, world, "세력 관계")
		if (!fs.existsSync(root)) continue
		const stack = [root]
		while (stack.length) {
			const current = stack.pop()
			for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
				const full = path.join(current, entry.name)
				if (entry.isDirectory()) stack.push(full)
				else if (entry.isFile() && entry.name.endsWith(".md")) {
					const source = fs.readFileSync(full, "utf8").replace(/^\uFEFF/, "")
					const { meta } = parseFrontmatter(source)
					targets.add(path.basename(entry.name, ".md"))
					if (meta.title?.trim()) targets.add(meta.title.trim())
				}
			}
		}
	}
	return targets
}

async function headingResolverFor(body, sourceWorld, registry, relationTargets, cache) {
	const required = new Map()
	for (const link of parseWikiLinks(body)) {
		if (link.isImage || !link.heading) continue
		const resolved = resolveWikiTarget({ link, sourceWorld, registry, relationTargets })
		if (resolved.kind === "page" && resolved.entry.pageId && resolved.entry.pageUrl) {
			required.set(resolved.entry.uuid, resolved.entry)
		}
	}
	for (const entry of required.values()) {
		if (cache.has(entry.pageId)) continue
		const blocks = await listPageBlocks(entry.pageId)
		cache.set(entry.pageId, buildHeadingUrlIndex(entry.pageUrl, blocks))
	}
	return (entry, heading) => cache.get(entry.pageId)?.urls.get(heading) ?? null
}

async function transformEntry(entry, registry, relationTargets, headingCache) {
	const body = loadBody(entry)
	const resolveHeadingUrl = await headingResolverFor(body, entry.world, registry, relationTargets, headingCache)
	return transformWikiLinks({ markdown: body, sourceWorld: entry.world, registry, relationTargets, resolveHeadingUrl })
}

function writeBackup(pageId, markdown) {
	fs.mkdirSync(BACKUP_ROOT, { recursive: true })
	const backupPath = path.join(BACKUP_ROOT, `${pageId}.md`)
	fs.writeFileSync(backupPath, markdown, "utf8")
	return backupPath
}

function writePatchRequest(pageId, markdown) {
	fs.mkdirSync(REQUEST_ROOT, { recursive: true })
	const requestPath = path.join(REQUEST_ROOT, `${pageId}.json`)
	fs.writeFileSync(requestPath, `${JSON.stringify(buildReplaceContentPayload(markdown), null, 2)}\n`, "utf8")
	return requestPath
}

function verifyPatchedMarkdown(markdown) {
	return parseWikiLinks(markdown).filter((link) => !link.isImage).length === 0
}

async function applyOne(entry, transformed) {
	const before = runNtnApi(`/v1/pages/${entry.pageId}/markdown`, { method: "GET", timeoutMs: 30_000 })
	if (!before || typeof before.markdown !== "string") throw new Error(`Markdown backup failed for ${entry.uuid}`)
	if (before.truncated || (before.unknown_block_ids?.length ?? 0) > 0) {
		throw new Error(`Markdown backup is incomplete for ${entry.uuid}`)
	}
	const backupPath = writeBackup(entry.pageId, before.markdown)
	const requestPath = writePatchRequest(entry.pageId, transformed.markdown)
	const after = runNtnApi(`/v1/pages/${entry.pageId}/markdown`, {
		method: "PATCH",
		dataFile: requestPath,
		timeoutMs: 30_000,
	})
	if (!after || typeof after.markdown !== "string") throw new Error(`Markdown PATCH response missing for ${entry.uuid}`)
	if (!verifyPatchedMarkdown(after.markdown)) throw new Error(`Raw document wikilink remains after PATCH for ${entry.uuid}`)
	return { backupPath, requestPath }
}

export async function runRepair(argv = process.argv.slice(2)) {
	const args = parseRepairArgs(argv)
	const localEntries = loadLocalCatalog()
	const notionPages = await queryAllSettingPages(DATA_SOURCE_ID)
	const joined = buildNotionRegistry(localEntries, notionPages)
	const registry = createLinkRegistry(joined.entries)
	const relationTargets = loadRelationTargets()
	const headingCache = new Map()
	const matchedByUuid = new Map(joined.entries.map((entry) => [entry.uuid.toLowerCase(), entry]))
	let selected
	if (args.uuid) {
		const local = localEntries.find((entry) => entry.uuid.toLowerCase() === args.uuid)
		if (!local) throw new Error(`Local UUID not found: ${args.uuid}`)
		const matched = matchedByUuid.get(args.uuid)
		if (!matched) throw new Error(`Notion Page not found for UUID: ${args.uuid}`)
		selected = [matched]
	} else {
		selected = joined.entries
	}

	if (!args.uuid && joined.entries.length !== localEntries.length) {
		const gate = canApplyRepair({
			apply: args.apply,
			uuid: "",
			localCount: localEntries.length,
			registryCount: joined.entries.length,
			hardUnresolved: 0,
		})
		const summary = {
			mode: args.apply ? "apply" : "dry-run",
			localDocuments: localEntries.length,
			notionPages: notionPages.length,
			registryEntries: joined.entries.length,
			missingLocalPages: joined.missingLocalUuids.length,
			unknownNotionPages: joined.unknownNotionUuids.length,
			writes: 0,
			applyAllowed: gate.allowed,
			reason: gate.reason,
		}
		console.log(JSON.stringify(summary, null, 2))
		if (args.apply) process.exitCode = 1
		return summary
	}

	const transformedRows = []
	let hardUnresolved = 0
	for (const entry of selected) {
		const transformed = await transformEntry(entry, registry, relationTargets, headingCache)
		hardUnresolved += transformed.unresolved.length
		transformedRows.push({ entry, transformed })
	}
	const gate = canApplyRepair({
		apply: args.apply,
		uuid: args.uuid,
		localCount: localEntries.length,
		registryCount: joined.entries.length,
		hardUnresolved,
	})
	let writes = 0
	const applied = []
	if (gate.allowed) {
		for (const row of transformedRows) {
			const result = await applyOne(row.entry, row.transformed)
			writes += 1
			applied.push({ uuid: row.entry.uuid, pageId: row.entry.pageId, ...result })
		}
	}
	const totals = transformedRows.reduce(
		(acc, row) => {
			for (const key of ["pageLinks", "aliasLinks", "sectionLinks", "deferredRelations", "imagesPreserved"]) {
				acc[key] += row.transformed[key]
			}
			return acc
		},
		{ pageLinks: 0, aliasLinks: 0, sectionLinks: 0, deferredRelations: 0, imagesPreserved: 0 },
	)
	const summary = {
		mode: args.apply ? "apply" : "dry-run",
		uuid: args.uuid || null,
		localDocuments: localEntries.length,
		notionPages: notionPages.length,
		registryEntries: joined.entries.length,
		selectedPages: selected.length,
		...totals,
		hardUnresolved,
		writes,
		applyAllowed: gate.allowed,
		reason: gate.reason,
		applied,
	}
	console.log(JSON.stringify(summary, null, 2))
	if (args.apply && !gate.allowed) process.exitCode = 1
	return summary
}

const invoked = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : ""
if (import.meta.url === invoked) {
	runRepair().catch((error) => {
		console.error(error instanceof Error ? error.stack || error.message : String(error))
		process.exitCode = 1
	})
}
