import { normalizeUuid } from "./settings-admin.js"

export type SettingMeta = Record<string, string>

export type SettingMarkdownClassification =
	| { kind: "skip" }
	| { kind: "setting"; meta: SettingMeta; body: string }

export type SettingSourceParse =
	| { kind: "skip" }
	| { kind: "document"; meta: SettingMeta; body: string }

export type BackfillTraversalState = {
	folderQueue: string[]
	currentPageToken?: string
}

export type BackfillTraversalStep = BackfillTraversalState & {
	hasMore: boolean
}

export type DeltaCursorStep = {
	hasMore: boolean
	nextState?: { pageToken: string }
}

export type DrivePathMetadata = {
	id: string
	name: string
	parents?: string[]
}

export async function resolveDriveRelativePath(
	file: DrivePathMetadata,
	rootFolderId: string,
	resolveMetadata: (fileId: string) => Promise<DrivePathMetadata | null>,
): Promise<string | null> {
	const queue = (file.parents ?? []).map((parentId) => ({ parentId, segments: [file.name] }))
	const visited = new Set<string>()

	while (queue.length > 0) {
		const current = queue.shift()
		if (!current) continue
		if (current.parentId === rootFolderId) return current.segments.join("/")
		if (visited.has(current.parentId)) continue
		visited.add(current.parentId)

		const metadata = await resolveMetadata(current.parentId)
		if (!metadata) continue
		const segments = [metadata.name, ...current.segments]
		for (const parentId of metadata.parents ?? []) {
			queue.push({ parentId, segments })
		}
	}

	return null
}

function unquote(value: string): string {
	const trimmed = value.trim()
	if (
		(trimmed.startsWith("'") && trimmed.endsWith("'")) ||
		(trimmed.startsWith('"') && trimmed.endsWith('"'))
	) {
		return trimmed.slice(1, -1)
	}
	return trimmed
}

export function parseSettingMarkdownSource(
	source: string,
	fallbackMeta: SettingMeta = {},
): SettingSourceParse {
	const normalized = source.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")
	if (!normalized.startsWith("---\n")) return { kind: "skip" }

	const frontmatterEnd = normalized.indexOf("\n---\n", 4)
	if (frontmatterEnd === -1) return { kind: "skip" }

	const meta: SettingMeta = {}
	for (const line of normalized.slice(4, frontmatterEnd).split("\n")) {
		const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/)
		if (!match) continue
		meta[match[1]] = unquote(match[2])
	}
	for (const [key, value] of Object.entries(fallbackMeta)) {
		if (!(key in meta) || !meta[key]?.trim()) meta[key] = value
	}

	if (!meta.title?.trim()) throw new Error("Canonical setting document must contain title")
	if (!meta.uuid?.trim()) throw new Error(`Canonical setting document ${meta.title} must contain uuid`)
	meta.uuid = normalizeUuid(meta.uuid)

	return {
		kind: "document",
		meta,
		body: normalized.slice(frontmatterEnd + 5).trim(),
	}
}

export function classifySettingMarkdown(source: string): SettingMarkdownClassification {
	const normalized = source.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
	if (!normalized.startsWith("---\n")) return { kind: "skip" }

	const frontmatterEnd = normalized.indexOf("\n---\n", 4)
	if (frontmatterEnd === -1) return { kind: "skip" }

	const meta: SettingMeta = {}
	for (const line of normalized.slice(4, frontmatterEnd).split("\n")) {
		const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/)
		if (!match) continue
		meta[match[1]] = unquote(match[2])
	}

	if (meta.docType !== "setting") return { kind: "skip" }
	if (!meta.title?.trim()) throw new Error("Setting document must contain title")
	if (!meta.uuid?.trim()) throw new Error(`Setting document ${meta.title} must contain uuid`)
	meta.uuid = normalizeUuid(meta.uuid)

	return {
		kind: "setting",
		meta,
		body: normalized.slice(frontmatterEnd + 5).trim(),
	}
}

export function inspectSettingMarkdown(
	source: string,
): SettingMarkdownClassification | { kind: "invalid"; error: string } {
	try {
		return classifySettingMarkdown(source)
	} catch (error) {
		return {
			kind: "invalid",
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

export function advanceBackfillTraversal(
	state: BackfillTraversalState,
	discoveredFolderIds: string[],
	nextPageToken: string | null | undefined,
): BackfillTraversalStep {
	const queue = [...state.folderQueue, ...discoveredFolderIds]
	if (nextPageToken) {
		return {
			folderQueue: queue,
			currentPageToken: nextPageToken,
			hasMore: true,
		}
	}

	queue.shift()
	return {
		folderQueue: queue,
		currentPageToken: undefined,
		hasMore: queue.length > 0,
	}
}

export async function isWithinDriveTree(
	initialParentIds: string[],
	rootFolderId: string,
	resolveParents: (fileId: string) => Promise<string[]>,
): Promise<boolean> {
	const queue = [...initialParentIds]
	const visited = new Set<string>()
	while (queue.length > 0) {
		const current = queue.shift()
		if (!current) continue
		if (current === rootFolderId) return true
		if (visited.has(current)) continue
		visited.add(current)
		queue.push(...(await resolveParents(current)))
	}
	return false
}

export function nextDeltaCursorStep(
	currentPageToken: string,
	nextPageToken: string | null | undefined,
	newStartPageToken: string | null | undefined,
): DeltaCursorStep {
	if (nextPageToken && nextPageToken !== currentPageToken) {
		return { hasMore: true, nextState: { pageToken: nextPageToken } }
	}
	return {
		hasMore: false,
		nextState: { pageToken: newStartPageToken ?? currentPageToken },
	}
}
