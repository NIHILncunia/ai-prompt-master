import * as Builder from "@notionhq/workers/builder"
import { normalizeUuid } from "./settings-admin.js"
import { classifySettingRepositoryPath, normalizeSettingDocument } from "./settings-document.js"
import { parseSettingMarkdownSource, type SettingMeta } from "./settings-drive.js"

const LEGACY_DRIVE_METADATA_FALLBACKS: Record<string, SettingMeta> = {
	"위그드라실/설정/창조신과 우주적 대립.md": {
		title: "창조신과 우주적 대립",
		uuid: "7e5fd52a-881b-45e1-89c8-8b15928a8aca",
		docType: "setting",
		thumbnail: "",
		subtype: "",
		region: "",
	},
	"위그드라실/설정/질서와 혼돈.md": {
		title: "질서와 혼돈",
		uuid: "c1da1ab0-a813-4dba-a785-4fb90d997d87",
		docType: "setting",
		thumbnail: "",
	},
	"위그드라실/설정/질서와 혼돈의 우주론.md": {
		title: "질서와 혼돈의 우주론",
		uuid: "434d9ac0-29f7-47f1-973f-86ab7bb8fef5",
		docType: "setting",
		thumbnail: "",
	},
}

export type SettingSyncFile = {
	id: string
	modifiedTime?: string
}

type SettingPropertyValue = ReturnType<typeof Builder.richText>

type SettingSyncProperties = {
	"이름": SettingPropertyValue
	"UUID": SettingPropertyValue
	"세계": SettingPropertyValue
	"카테고리": SettingPropertyValue
	"서브카테고리": SettingPropertyValue
	"중요도": SettingPropertyValue
	"태그": SettingPropertyValue
	"공개 여부": SettingPropertyValue
	"상태": SettingPropertyValue
	"영역": SettingPropertyValue
	"썸네일 경로": SettingPropertyValue
	"Drive File ID": SettingPropertyValue
}

export type BuildSettingUpsertResult =
	| { kind: "skip" }
	| { kind: "unresolved"; issues: string[] }
	| {
		kind: "upsert"
		change: {
			type: "upsert"
			key: string
			properties: SettingSyncProperties
			upstreamUpdatedAt?: string
			pageContentMarkdown?: string
		}
	}

export function buildSettingUpsert(input: {
	relativePath: string
	meta: SettingMeta
	body: string
	file: SettingSyncFile
	includeBody: boolean
}): BuildSettingUpsertResult {
	const normalized = normalizeSettingDocument({
		relativePath: input.relativePath,
		meta: input.meta,
		body: input.body,
	})
	if ("skip" in normalized) return { kind: "skip" }
	if ("unresolved" in normalized) return { kind: "unresolved", issues: normalized.unresolved }

	const uuid = normalizeUuid(input.meta.uuid)
	const change: BuildSettingUpsertResult & { kind: "upsert" } = {
		kind: "upsert",
		change: {
			type: "upsert",
			key: uuid,
			properties: {
				"이름": Builder.title(input.meta.title),
				"UUID": Builder.richText(uuid),
				"세계": Builder.select(normalized.world),
				"카테고리": Builder.select(normalized.category),
				"서브카테고리": normalized.subcategory ? Builder.select(normalized.subcategory) : [],
				"중요도": Builder.select(normalized.importance),
				"태그": normalized.tags.length ? Builder.multiSelect(...normalized.tags) : [],
				"공개 여부": Builder.checkbox(normalized.isPublic),
				"상태": Builder.select(normalized.status),
				"영역": normalized.region ? Builder.select(normalized.region) : [],
				"썸네일 경로": Builder.richText(input.meta.thumbnail ?? ""),
				"Drive File ID": Builder.richText(input.file.id),
			},
			...(input.file.modifiedTime ? { upstreamUpdatedAt: input.file.modifiedTime } : {}),
			...(input.includeBody ? { pageContentMarkdown: input.body } : {}),
		},
	}
	return change
}

export function buildSettingChangeFromSource(input: {
	relativePath: string
	source: string
	file: SettingSyncFile
	includeBody: boolean
}): BuildSettingUpsertResult {
	const pathInfo = classifySettingRepositoryPath(input.relativePath)
	if ("skip" in pathInfo) return { kind: "skip" }
	let parsed
	try {
		parsed = parseSettingMarkdownSource(
			input.source,
			LEGACY_DRIVE_METADATA_FALLBACKS[input.relativePath] ?? {},
		)
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error)
		throw new Error(`${input.relativePath}: ${message}`)
	}
	if (parsed.kind === "skip") return { kind: "skip" }
	return buildSettingUpsert({
		relativePath: input.relativePath,
		meta: parsed.meta,
		body: parsed.body,
		file: input.file,
		includeBody: input.includeBody,
	})
}
