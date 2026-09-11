import { spawnSync } from "node:child_process"

const NOTION_API_VERSION = "2026-03-11"
const NOTION_HOME = "/root/.notion"
const NOTION_KEYRING = "0"

export function runNtnApi(apiPath, options = {}) {
	const method = options.method ?? "GET"
	const args = ["api", apiPath, "-X", method, "--notion-version", NOTION_API_VERSION]
	let input
	if (options.data !== undefined && options.dataFile) {
		throw new Error("runNtnApi accepts either data or dataFile, not both")
	}
	if (options.dataFile) {
		args.push("-d", `@${options.dataFile}`)
	} else if (options.data !== undefined) {
		args.push("-d", "@-")
		input = JSON.stringify(options.data)
	}
	const spawnSyncImpl = options.spawnSyncImpl ?? spawnSync
	const result = spawnSyncImpl("ntn", args, {
		env: {
			...process.env,
			NOTION_HOME,
			NOTION_KEYRING,
		},
		input,
		encoding: "utf8",
		timeout: options.timeoutMs ?? 30_000,
		maxBuffer: 64 * 1024 * 1024,
	})
	if (result.error) throw result.error
	if (result.status !== 0) {
		throw new Error(`ntn api failed (${result.status}): ${result.stderr || result.stdout || "unknown error"}`)
	}
	const stdout = String(result.stdout ?? "").trim()
	return stdout ? JSON.parse(stdout) : null
}

export async function queryAllSettingPages(dataSourceId, options = {}) {
	const api = options.api ?? runNtnApi
	const pages = []
	let cursor
	do {
		const data = { page_size: 100 }
		if (cursor) data.start_cursor = cursor
		const response = await api(`/v1/data_sources/${dataSourceId}/query`, {
			method: "POST",
			data,
		})
		pages.push(...(response?.results ?? []))
		cursor = response?.has_more ? response?.next_cursor ?? undefined : undefined
	} while (cursor)
	return pages
}

function richTextValue(property) {
	const items = property?.rich_text ?? []
	return items
		.map((item) => item?.plain_text ?? item?.text?.content ?? "")
		.join("")
		.trim()
}

function notionUuid(page) {
	return richTextValue(page?.properties?.UUID).toLowerCase()
}

export function buildNotionRegistry(localEntries, notionPages) {
	const pagesByUuid = new Map()
	for (const page of notionPages) {
		const uuid = notionUuid(page)
		if (!uuid) continue
		if (pagesByUuid.has(uuid)) {
			throw new Error(`Duplicate Notion UUID pages: ${uuid}`)
		}
		pagesByUuid.set(uuid, page)
	}

	const localByUuid = new Map()
	for (const entry of localEntries) {
		const uuid = String(entry.uuid ?? "").toLowerCase()
		if (!uuid) throw new Error(`Local link entry is missing UUID: ${entry.relativePath ?? entry.title ?? "unknown"}`)
		if (localByUuid.has(uuid)) throw new Error(`Duplicate local UUID: ${uuid}`)
		localByUuid.set(uuid, entry)
	}

	const entries = []
	const missingLocalUuids = []
	for (const [uuid, entry] of localByUuid) {
		const page = pagesByUuid.get(uuid)
		if (!page) {
			missingLocalUuids.push(uuid)
			continue
		}
		entries.push({
			...entry,
			pageId: page.id,
			pageUrl: page.url || `https://www.notion.so/${String(page.id).replace(/-/g, "")}`,
		})
	}

	const unknownNotionUuids = [...pagesByUuid.keys()].filter((uuid) => !localByUuid.has(uuid))
	return { entries, missingLocalUuids, unknownNotionUuids }
}

export async function listPageBlocks(pageId, options = {}) {
	const api = options.api ?? runNtnApi
	const blocks = []
	let cursor
	do {
		const query = new URLSearchParams({ page_size: "100" })
		if (cursor) query.set("start_cursor", cursor)
		const response = await api(`/v1/blocks/${pageId}/children?${query.toString()}`, {
			method: "GET",
		})
		blocks.push(...(response?.results ?? []))
		cursor = response?.has_more ? response?.next_cursor ?? undefined : undefined
	} while (cursor)
	return blocks
}

function blockPlainText(block) {
	if (!/^heading_[123]$/.test(block?.type ?? "")) return ""
	const value = block?.[block.type]
	return (value?.rich_text ?? [])
		.map((item) => item?.plain_text ?? item?.text?.content ?? "")
		.join("")
		.trim()
}

export function buildHeadingUrlIndex(pageUrl, blocks) {
	const candidates = new Map()
	for (const block of blocks) {
		const heading = blockPlainText(block)
		if (!heading || !block?.id) continue
		const existing = candidates.get(heading) ?? []
		existing.push(block)
		candidates.set(heading, existing)
	}

	const urls = new Map()
	const ambiguous = new Set()
	for (const [heading, matches] of candidates) {
		if (matches.length !== 1) {
			ambiguous.add(heading)
			continue
		}
		const blockId = String(matches[0].id).replace(/-/g, "")
		urls.set(heading, `${pageUrl}#${blockId}`)
	}
	return { urls, ambiguous }
}
