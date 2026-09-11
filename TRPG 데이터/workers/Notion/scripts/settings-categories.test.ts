import assert from "node:assert/strict"
import test from "node:test"
import {
	CATEGORY_OPTIONS,
	IMPORTANCE_OPTIONS,
	REGION_OPTIONS,
	STATUS_OPTIONS,
	SUBCATEGORY_OPTIONS,
	TAG_OPTIONS,
	WORLD_OPTIONS,
	mapLegacySettingCategory,
} from "../src/settings-categories.js"

test("v2 taxonomy uses 13 main categories and 83 unprefixed subcategories", () => {
	assert.deepEqual(CATEGORY_OPTIONS, [
		"개념", "신격", "국가", "도시", "단체", "종족", "인물",
		"아이템", "사건", "설화", "지형지물", "용종", "클래스",
	])
	assert.equal(SUBCATEGORY_OPTIONS.length, 83)
	assert.equal(new Set(SUBCATEGORY_OPTIONS).size, 83)
	assert.ok(SUBCATEGORY_OPTIONS.includes("주요 인물"))
	assert.ok(SUBCATEGORY_OPTIONS.includes("항구 도시"))
	assert.ok(SUBCATEGORY_OPTIONS.includes("자연 지형"))
	assert.ok(SUBCATEGORY_OPTIONS.includes("조룡종"))
	assert.ok(SUBCATEGORY_OPTIONS.includes("기본 클래스"))
	assert.equal(SUBCATEGORY_OPTIONS.some((value) => value.includes(" - ")), false)
})

test("v2 fixed option catalogs are stable", () => {
	assert.deepEqual(WORLD_OPTIONS, ["공통", "룩스테라", "엘드로스"])
	assert.deepEqual(IMPORTANCE_OPTIONS, ["일반", "주요", "핵심"])
	assert.deepEqual(STATUS_OPTIONS, ["시작 전", "초안", "진행 중", "완료"])
	assert.ok(REGION_OPTIONS.includes("라크샤라"))
	assert.ok(REGION_OPTIONS.includes("엘드로스"))
	assert.ok(REGION_OPTIONS.includes("심연의 의회"))
	assert.ok(TAG_OPTIONS.includes("헌터"))
	assert.ok(TAG_OPTIONS.includes("협곡"))
})

test("legacy category mapping follows v2 migration rules", () => {
	assert.deepEqual(mapLegacySettingCategory({ type: "주요 개념", subtype: "지침" }), {
		category: "개념", subcategory: "주요 개념", tags: [], importance: "일반",
	})
	assert.deepEqual(mapLegacySettingCategory({ type: "도시국가", subtype: "항구" }), {
		category: "도시", subcategory: "항구 도시", tags: [], importance: "일반",
	})
	assert.deepEqual(mapLegacySettingCategory({ type: "부족국가", subtype: "일반" }), {
		category: "단체", subcategory: "부족국가", tags: [], importance: "일반",
	})
	assert.deepEqual(mapLegacySettingCategory({ type: "인물", subtype: "주요" }), {
		category: "인물", subcategory: "주요 인물", tags: [], importance: "일반",
	})
	assert.deepEqual(mapLegacySettingCategory({ type: "인물", subtype: "헌터/오퍼레이터" }), {
		category: "인물", subcategory: "", tags: ["헌터", "오퍼레이터"], importance: "일반",
	})
	assert.deepEqual(mapLegacySettingCategory({ type: "국가", subtype: "주요" }), {
		category: "국가", subcategory: "", tags: [], importance: "주요",
	})
	assert.deepEqual(mapLegacySettingCategory({ type: "지형", subtype: "협곡" }), {
		category: "지형지물", subcategory: "자연 지형", tags: ["협곡"], importance: "일반",
	})
	assert.deepEqual(mapLegacySettingCategory({ type: "지형", subtype: "대륙" }), {
		category: "지형지물", subcategory: "대륙", tags: [], importance: "일반",
	})
	assert.deepEqual(mapLegacySettingCategory({ type: "아이템", subtype: "기기" }), {
		category: "아이템", subcategory: "장치", tags: [], importance: "일반",
	})
	assert.deepEqual(mapLegacySettingCategory({ type: "클래스", subtype: "기본 클래스" }), {
		category: "클래스", subcategory: "기본 클래스", tags: [], importance: "일반",
	})
})
