import assert from "node:assert/strict"
import test from "node:test"
import * as Schema from "@notionhq/workers/schema"
import {
	buildManagedSettingsSchemaProperties,
	buildNativeSettingsSchemaPatch,
	WORLD_SUBCATEGORY_OPTIONS,
} from "../src/settings-schema.js"


test("managed worker schema contains v2 properties but excludes native timestamps", () => {
	const properties = buildManagedSettingsSchemaProperties()
	assert.deepEqual(Object.keys(properties), [
		"이름", "UUID", "세계", "카테고리", "서브카테고리", "중요도",
		"태그", "공개 여부", "상태", "영역", "썸네일 경로", "Drive File ID",
	])
	assert.deepEqual(properties["이름"], Schema.title())
	assert.deepEqual(properties["UUID"], Schema.richText())
	assert.deepEqual(properties["공개 여부"], Schema.checkbox())
	assert.equal("생성일자" in properties, false)
	assert.equal("수정일자" in properties, false)
})

test("native schema patch removes legacy columns and restores native timestamps", () => {
	assert.deepEqual(buildNativeSettingsSchemaPatch(), {
		properties: {
			"문서 유형": null,
			"타입": null,
			"서브타입": null,
			"생성 일시": null,
			"수정 일시": null,
			"생성일자": { type: "created_time", created_time: {} },
			"수정일자": { type: "last_edited_time", last_edited_time: {} },
		},
	})
})

test("native schema patch is idempotent after legacy columns are gone", () => {
	assert.deepEqual(buildNativeSettingsSchemaPatch(new Set(["상태", "생성일자", "수정일자"])), {
		properties: {
			"생성일자": { type: "created_time", created_time: {} },
			"수정일자": { type: "last_edited_time", last_edited_time: {} },
		},
	})
})

test("world-specific subcategories fit in a separate Notion select update batch", () => {
	assert.equal(WORLD_SUBCATEGORY_OPTIONS.length, 18)
	assert.ok(WORLD_SUBCATEGORY_OPTIONS.length <= 100)
	assert.ok(WORLD_SUBCATEGORY_OPTIONS.includes("용종 - 조룡종"))
	assert.ok(WORLD_SUBCATEGORY_OPTIONS.includes("클래스 - 서브클래스"))
})
