import * as Schema from "@notionhq/workers/schema"
import {
	CATEGORY_OPTIONS,
	IMPORTANCE_OPTIONS,
	REGION_OPTIONS,
	STATUS_OPTIONS,
	SUBCATEGORY_OPTIONS,
	TAG_OPTIONS,
	WORLD_OPTIONS,
	WORLD_SUBCATEGORY_OPTIONS,
} from "./settings-categories.js"

export { WORLD_SUBCATEGORY_OPTIONS }

const LEGACY_PROPERTIES = ["문서 유형", "타입", "서브타입", "생성 일시", "수정 일시"] as const

function options(values: readonly string[]) {
	return values.map((name) => ({ name }))
}

export function buildManagedSettingsSchemaProperties() {
	return {
		"이름": Schema.title(),
		"UUID": Schema.richText(),
		"세계": Schema.select(options(WORLD_OPTIONS)),
		"카테고리": Schema.select(options(CATEGORY_OPTIONS)),
		"서브카테고리": Schema.select(options(SUBCATEGORY_OPTIONS)),
		"중요도": Schema.select(options(IMPORTANCE_OPTIONS)),
		"태그": Schema.multiSelect(options(TAG_OPTIONS)),
		"공개 여부": Schema.checkbox(),
		"상태": Schema.select(options(STATUS_OPTIONS)),
		"영역": Schema.select(options(REGION_OPTIONS)),
		"썸네일 경로": Schema.richText(),
		"Drive File ID": Schema.richText(),
	}
}

export function buildNativeSettingsSchemaPatch(existingPropertyNames?: ReadonlySet<string>) {
	const properties: Record<string, unknown> = {}
	for (const propertyName of LEGACY_PROPERTIES) {
		if (!existingPropertyNames || existingPropertyNames.has(propertyName)) {
			properties[propertyName] = null
		}
	}
	properties["생성일자"] = { type: "created_time" as const, created_time: {} }
	properties["수정일자"] = { type: "last_edited_time" as const, last_edited_time: {} }
	return { properties }
}
