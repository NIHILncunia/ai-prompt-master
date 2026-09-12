import type { Client } from "@notionhq/client"
import { Worker } from "@notionhq/workers"
import { j } from "@notionhq/workers/schema-builder"
import {
	downloadDriveText,
	DRIVE_FOLDER_MIME,
	getDriveFileMetadata,
	getDriveStartPageToken,
	listDriveChanges,
	listDriveChildren,
	type DriveFileMetadata,
} from "./google-drive-settings.js"
import { getServiceAccountAccessToken } from "./google-service-account.js"
import {
	buildSettingsQueryFilter,
	normalizeUuid,
	requireSingleSettingPage,
	type SettingsQuery,
} from "./settings-admin.js"
import {
	advanceBackfillTraversal,
	nextDeltaCursorStep,
	parseSettingMarkdownSource,
	resolveDriveRelativePath,
	type BackfillTraversalState,
} from "./settings-drive.js"
import { normalizeSettingDocument } from "./settings-document.js"
import { buildManagedSettingsSchemaProperties } from "./settings-schema.js"
import { buildSettingChangeFromSource } from "./settings-sync.js"

const worker = new Worker()
export default worker

const SETTINGS_DATA_SOURCE_TITLE = "TRPG 설정 DB"
const DEFAULT_SETTINGS_ROOT_FOLDER_ID = "1WEBpOqPKjlPMBD1fCCzqU8ojRuyQWJGF"

const driveApi = worker.pacer("driveApi", {
	allowedRequests: 10,
	intervalMs: 1000,
})

const settings = worker.database("settings", {
	type: "managed",
	initialTitle: SETTINGS_DATA_SOURCE_TITLE,
	primaryKeyProperty: "UUID",
	schema: {
		properties: buildManagedSettingsSchemaProperties(),
	},
})

type SettingsFindInput = SettingsQuery & {
	pageSize?: number
}

type SettingsDeltaState = {
	pageToken: string
}

function settingsRootFolderId(): string {
	return process.env.GOOGLE_SETTINGS_ROOT_FOLDER_ID?.trim() || DEFAULT_SETTINGS_ROOT_FOLDER_ID
}

async function driveAccessToken(): Promise<string> {
	await driveApi.wait()
	return getServiceAccountAccessToken({
		email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "",
		privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "",
	})
}

function isMarkdownFile(file: DriveFileMetadata): boolean {
	return file.mimeType === "text/markdown" || file.name.toLowerCase().endsWith(".md")
}

function richTextPlainText(value: unknown): string {
	if (!Array.isArray(value)) return ""
	return value
		.map((item) => {
			if (!item || typeof item !== "object") return ""
			const plainText = (item as { plain_text?: unknown }).plain_text
			return typeof plainText === "string" ? plainText : ""
		})
		.join("")
}

function dataSourceTitle(result: unknown): string {
	if (!result || typeof result !== "object") return ""
	return richTextPlainText((result as { title?: unknown }).title)
}

async function resolveSettingsDataSourceId(notion: Client): Promise<string> {
	const configured = process.env.SETTINGS_DATA_SOURCE_ID?.trim()
	if (configured) return configured

	const response = await notion.search({
		query: SETTINGS_DATA_SOURCE_TITLE,
		filter: { property: "object", value: "data_source", in_trash: false },
		page_size: 20,
	})
	const matches = response.results.filter(
		(result) =>
			result.object === "data_source" &&
			dataSourceTitle(result) === SETTINGS_DATA_SOURCE_TITLE,
	)
	if (matches.length !== 1) {
		throw new Error(
			`Expected exactly one ${SETTINGS_DATA_SOURCE_TITLE} data source, found ${matches.length}. Set SETTINGS_DATA_SOURCE_ID to disambiguate.`,
		)
	}
	return matches[0].id
}

function pagePropertyText(page: unknown, propertyName: string): string {
	if (!page || typeof page !== "object") return ""
	const properties = (page as { properties?: unknown }).properties
	if (!properties || typeof properties !== "object") return ""
	const property = (properties as Record<string, unknown>)[propertyName]
	if (!property || typeof property !== "object") return ""
	const typed = property as {
		type?: unknown
		title?: unknown
		rich_text?: unknown
		select?: { name?: unknown } | null
	}
	if (typed.type === "title") return richTextPlainText(typed.title)
	if (typed.type === "rich_text") return richTextPlainText(typed.rich_text)
	if (typed.type === "select" && typed.select && typeof typed.select.name === "string") {
		return typed.select.name
	}
	return ""
}

function pagePropertyMultiSelect(page: unknown, propertyName: string): string[] {
	if (!page || typeof page !== "object") return []
	const properties = (page as { properties?: unknown }).properties
	if (!properties || typeof properties !== "object") return []
	const property = (properties as Record<string, unknown>)[propertyName]
	if (!property || typeof property !== "object") return []
	const multiSelect = (property as { multi_select?: unknown }).multi_select
	if (!Array.isArray(multiSelect)) return []
	return multiSelect
		.map((item) => item && typeof item === "object" ? (item as { name?: unknown }).name : "")
		.filter((name): name is string => typeof name === "string" && name.length > 0)
}

function pagePropertyCheckbox(page: unknown, propertyName: string): boolean {
	if (!page || typeof page !== "object") return false
	const properties = (page as { properties?: unknown }).properties
	if (!properties || typeof properties !== "object") return false
	const property = (properties as Record<string, unknown>)[propertyName]
	if (!property || typeof property !== "object") return false
	return (property as { checkbox?: unknown }).checkbox === true
}

function summarizeSettingPage(page: unknown) {
	if (!page || typeof page !== "object") return null
	const record = page as {
		id?: unknown
		url?: unknown
		object?: unknown
		created_time?: unknown
		last_edited_time?: unknown
	}
	if (record.object !== "page" || typeof record.id !== "string") return null
	return {
		pageId: record.id,
		url: typeof record.url === "string" ? record.url : null,
		title: pagePropertyText(page, "이름"),
		uuid: pagePropertyText(page, "UUID"),
		world: pagePropertyText(page, "세계"),
		category: pagePropertyText(page, "카테고리"),
		subcategory: pagePropertyText(page, "서브카테고리"),
		importance: pagePropertyText(page, "중요도"),
		tags: pagePropertyMultiSelect(page, "태그"),
		isPublic: pagePropertyCheckbox(page, "공개 여부"),
		status: pagePropertyText(page, "상태"),
		region: pagePropertyText(page, "영역"),
		thumbnail: pagePropertyText(page, "썸네일 경로"),
		driveFileId: pagePropertyText(page, "Drive File ID"),
		createdTime: typeof record.created_time === "string" ? record.created_time : "",
		lastEditedTime:
			typeof record.last_edited_time === "string" ? record.last_edited_time : "",
	}
}

async function querySettings(notion: Client, input: SettingsFindInput) {
	const dataSourceId = await resolveSettingsDataSourceId(notion)
	const filter = buildSettingsQueryFilter(input)
	const response = await notion.dataSources.query({
		data_source_id: dataSourceId,
		...(filter ? { filter } : {}),
		page_size: Math.min(Math.max(input.pageSize ?? 50, 1), 100),
	})
	return response.results.map(summarizeSettingPage).filter((item) => item !== null)
}

async function resolveDrivePath(
	token: string,
	file: DriveFileMetadata,
	rootFolderId: string,
	cache: Map<string, DriveFileMetadata>,
): Promise<string | null> {
	cache.set(file.id, file)
	return resolveDriveRelativePath(file, rootFolderId, async (fileId) => {
		const cached = cache.get(fileId)
		if (cached) return cached
		const metadata = await getDriveFileMetadata({
			token,
			fileId,
			wait: () => driveApi.wait(),
		})
		cache.set(fileId, metadata)
		return metadata
	})
}

async function loadSettingChange(
	token: string,
	file: DriveFileMetadata,
	relativePath: string,
) {
	if (!isMarkdownFile(file) || file.trashed) return null
	const source = await downloadDriveText({
		token,
		fileId: file.id,
		wait: () => driveApi.wait(),
	})
	const result = buildSettingChangeFromSource({
		relativePath,
		source,
		file,
		includeBody: false,
	})
	if (result.kind === "skip") return null
	if (result.kind === "unresolved") {
		throw new Error(`Unresolved setting ${relativePath}: ${result.issues.join("; ")}`)
	}
	return result.change
}

worker.sync("settingsBackfill", {
	database: settings,
	mode: "replace",
	schedule: "manual",
	execute: async (state: BackfillTraversalState | undefined) => {
		const rootFolderId = settingsRootFolderId()
		const currentState: BackfillTraversalState =
			state?.folderQueue?.length ? state : { folderQueue: [rootFolderId] }
		const currentFolderId = currentState.folderQueue[0]
		if (!currentFolderId) return { changes: [], hasMore: false }

		const token = await driveAccessToken()
		const page = await listDriveChildren({
			token,
			parentId: currentFolderId,
			pageToken: currentState.currentPageToken,
			pageSize: 25,
			wait: () => driveApi.wait(),
		})
		const childFolders = page.files
			.filter((file) => file.mimeType === DRIVE_FOLDER_MIME)
			.map((file) => file.id)
		const metadataCache = new Map(page.files.map((file) => [file.id, file]))
		const changes = []
		for (const file of page.files) {
			if (file.mimeType === DRIVE_FOLDER_MIME || !isMarkdownFile(file)) continue
			const relativePath = await resolveDrivePath(token, file, rootFolderId, metadataCache)
			if (!relativePath) {
				throw new Error(`Could not resolve Drive path for ${file.name} (${file.id}) during backfill`)
			}
			const change = await loadSettingChange(token, file, relativePath)
			if (change) changes.push(change)
		}

		const next = advanceBackfillTraversal(currentState, childFolders, page.nextPageToken)
		return {
			changes,
			hasMore: next.hasMore,
			...(next.hasMore
				? {
					nextState: {
						folderQueue: next.folderQueue,
						...(next.currentPageToken ? { currentPageToken: next.currentPageToken } : {}),
					},
				}
				: {}),
		}
	},
})

worker.sync("settingsDelta", {
	database: settings,
	mode: "incremental",
	schedule: "manual",
	execute: async (state: SettingsDeltaState | undefined) => {
		const token = await driveAccessToken()
		if (!state?.pageToken) {
			const startPageToken = await getDriveStartPageToken({
				token,
				wait: () => driveApi.wait(),
			})
			return {
				changes: [],
				hasMore: false,
				nextState: { pageToken: startPageToken },
			}
		}

		const rootFolderId = settingsRootFolderId()
		const page = await listDriveChanges({
			token,
			pageToken: state.pageToken,
			wait: () => driveApi.wait(),
		})
		const metadataCache = new Map<string, DriveFileMetadata>()
		const changes = []
		for (const driveChange of page.changes) {
			if (driveChange.removed || !driveChange.file || driveChange.file.trashed) continue
			const file = driveChange.file
			if (file.mimeType === DRIVE_FOLDER_MIME || !isMarkdownFile(file)) continue
			const relativePath = await resolveDrivePath(token, file, rootFolderId, metadataCache)
			if (!relativePath) continue
			const change = await loadSettingChange(token, file, relativePath)
			if (change) changes.push(change)
		}

		const cursor = nextDeltaCursorStep(
			state.pageToken,
			page.nextPageToken,
			page.newStartPageToken,
		)
		return {
			changes,
			hasMore: cursor.hasMore,
			...(cursor.nextState ? { nextState: cursor.nextState } : {}),
		}
	},
})

const findSchema = j.object({
	uuid: j.string().nullable().describe("Exact setting UUID, or null"),
	title: j.string().nullable().describe("Title substring, or null"),
	world: j.string().nullable().describe("Exact world select value, or null"),
	category: j.string().nullable().describe("Exact category select value, or null"),
	subcategory: j.string().nullable().describe("Exact subcategory select value, or null"),
	importance: j.string().nullable().describe("Exact importance select value, or null"),
	tag: j.string().nullable().describe("Required tag value, or null"),
	isPublic: j.boolean().nullable().describe("Exact public checkbox value, or null"),
	region: j.string().nullable().describe("Exact region select value, or null"),
	status: j.string().nullable().describe("Exact status select value, or null"),
	pageSize: j.number().nullable().describe("1-100 results, or null for default 50"),
})

const listSchema = j.object({
	world: j.string().nullable().describe("Exact world select value, or null"),
	category: j.string().nullable().describe("Exact category select value, or null"),
	subcategory: j.string().nullable().describe("Exact subcategory select value, or null"),
	importance: j.string().nullable().describe("Exact importance select value, or null"),
	tag: j.string().nullable().describe("Required tag value, or null"),
	isPublic: j.boolean().nullable().describe("Exact public checkbox value, or null"),
	region: j.string().nullable().describe("Exact region select value, or null"),
	status: j.string().nullable().describe("Exact status select value, or null"),
	pageSize: j.number().nullable().describe("1-100 results, or null for default 50"),
})

const uuidSchema = j.object({ uuid: j.uuid().describe("Exact setting UUID") })

worker.tool("settingsDelete", {
	title: "Delete synced TRPG setting",
	description:
		"Delete exactly one synced TRPG setting row by UUID for administrative repair or round-trip testing. Never use a title as the destructive key.",
	schema: uuidSchema,
	execute: async ({ uuid }, { notion }) => {
		const normalizedUuid = normalizeUuid(uuid)
		const matches = await querySettings(notion, { uuid: normalizedUuid, pageSize: 2 })
		const target = requireSingleSettingPage(normalizedUuid, matches)
		await notion.pages.update({ page_id: target.pageId, in_trash: true })
		return { deleted: true, uuid: normalizedUuid, pageId: target.pageId }
	},
})

function compactFindInput(input: {
	uuid?: string | null
	title?: string | null
	world?: string | null
	category?: string | null
	subcategory?: string | null
	importance?: string | null
	tag?: string | null
	isPublic?: boolean | null
	region?: string | null
	status?: string | null
	pageSize?: number | null
}): SettingsFindInput {
	return {
		...(input.uuid ? { uuid: input.uuid } : {}),
		...(input.title ? { title: input.title } : {}),
		...(input.world ? { world: input.world } : {}),
		...(input.category ? { category: input.category } : {}),
		...(input.subcategory ? { subcategory: input.subcategory } : {}),
		...(input.importance ? { importance: input.importance } : {}),
		...(input.tag ? { tag: input.tag } : {}),
		...(typeof input.isPublic === "boolean" ? { isPublic: input.isPublic } : {}),
		...(input.region ? { region: input.region } : {}),
		...(input.status ? { status: input.status } : {}),
		...(typeof input.pageSize === "number" ? { pageSize: input.pageSize } : {}),
	}
}

worker.tool("settingsFind", {
	title: "Find TRPG settings",
	description: "Search the synced TRPG settings data source by UUID, title, or structured metadata.",
	schema: findSchema,
	execute: async (input, { notion }) => {
		const query = compactFindInput(input)
		if (!buildSettingsQueryFilter(query)) {
			throw new Error("settingsFind requires at least one search condition")
		}
		return querySettings(notion, query)
	},
})

worker.tool("settingsList", {
	title: "List TRPG settings",
	description: "List synced TRPG settings, optionally constrained by structured metadata.",
	schema: listSchema,
	execute: async (input, { notion }) => querySettings(notion, compactFindInput(input)),
})

worker.tool("settingsGet", {
	title: "Get TRPG setting",
	description: "Retrieve exactly one synced setting by UUID, including page markdown.",
	schema: uuidSchema,
	execute: async ({ uuid }, { notion }) => {
		const normalizedUuid = normalizeUuid(uuid)
		const matches = await querySettings(notion, { uuid: normalizedUuid, pageSize: 2 })
		if (matches.length !== 1) {
			throw new Error(
				`Expected exactly one setting for UUID ${normalizedUuid}, found ${matches.length}`,
			)
		}
		const markdown = await notion.pages.retrieveMarkdown({ page_id: matches[0].pageId })
		return { ...matches[0], markdown: markdown.markdown }
	},
})

worker.tool("settingsVerify", {
	title: "Verify TRPG setting sync",
	description: "Verify v2 synced metadata against the Drive source. Page body content is managed separately by the link repair pipeline.",
	schema: uuidSchema,
	execute: async ({ uuid }, { notion }) => {
		const normalizedUuid = normalizeUuid(uuid)
		const matches = await querySettings(notion, { uuid: normalizedUuid, pageSize: 2 })
		if (matches.length !== 1) {
			return {
				ok: false,
				uuid: normalizedUuid,
				count: matches.length,
				metadataMatches: false,
				bodyMatches: null,
				bodyMode: "managed_by_link_repair",
				reason: "row_count_mismatch",
				expected: null,
				actual: null,
			}
		}
		const row = matches[0]
		if (!row.driveFileId) {
			return {
				ok: false,
				uuid: normalizedUuid,
				count: 1,
				metadataMatches: false,
				bodyMatches: null,
				bodyMode: "managed_by_link_repair",
				reason: "missing_drive_file_id",
				expected: null,
				actual: null,
			}
		}

		const token = await driveAccessToken()
		const [source, file] = await Promise.all([
			downloadDriveText({ token, fileId: row.driveFileId, wait: () => driveApi.wait() }),
			getDriveFileMetadata({ token, fileId: row.driveFileId, wait: () => driveApi.wait() }),
		])
		const relativePath = await resolveDrivePath(
			token,
			file,
			settingsRootFolderId(),
			new Map([[file.id, file]]),
		)
		if (!relativePath) {
			return {
				ok: false,
				uuid: normalizedUuid,
				count: 1,
				metadataMatches: false,
				bodyMatches: null,
				bodyMode: "managed_by_link_repair",
				reason: "drive_source_outside_settings_root",
				expected: null,
				actual: null,
			}
		}
		const parsed = parseSettingMarkdownSource(source)
		if (parsed.kind !== "document") {
			return {
				ok: false,
				uuid: normalizedUuid,
				count: 1,
				metadataMatches: false,
				bodyMatches: null,
				bodyMode: "managed_by_link_repair",
				reason: "drive_source_not_canonical_markdown",
				expected: null,
				actual: null,
			}
		}
		if (parsed.meta.uuid !== normalizedUuid) {
			throw new Error(`Drive file UUID ${parsed.meta.uuid} does not match requested UUID ${normalizedUuid}`)
		}
		const normalized = normalizeSettingDocument({
			relativePath,
			meta: parsed.meta,
			body: parsed.body,
		})
		if ("skip" in normalized || "unresolved" in normalized) {
			return {
				ok: false,
				uuid: normalizedUuid,
				count: 1,
				metadataMatches: false,
				bodyMatches: null,
				bodyMode: "managed_by_link_repair",
				reason: "drive_source_not_resolved_v2_setting",
				expected: null,
				actual: null,
			}
		}
		const expected = {
			title: parsed.meta.title,
			uuid: parsed.meta.uuid,
			world: normalized.world,
			category: normalized.category,
			subcategory: normalized.subcategory,
			importance: normalized.importance,
			tags: normalized.tags,
			isPublic: normalized.isPublic,
			status: normalized.status,
			region: normalized.region,
			thumbnail: parsed.meta.thumbnail ?? "",
			driveFileId: file.id,
		}
		const actual = {
			title: row.title,
			uuid: row.uuid,
			world: row.world,
			category: row.category,
			subcategory: row.subcategory,
			importance: row.importance,
			tags: row.tags,
			isPublic: row.isPublic,
			status: row.status,
			region: row.region,
			thumbnail: row.thumbnail,
			driveFileId: row.driveFileId,
		}
		const metadataMatches = JSON.stringify(actual) === JSON.stringify(expected)
		return {
			ok: metadataMatches,
			uuid: normalizedUuid,
			count: 1,
			metadataMatches,
			bodyMatches: null,
			bodyMode: "managed_by_link_repair",
			reason: metadataMatches ? "metadata_verified" : "metadata_mismatch",
			expected,
			actual,
		}
	},
})

