import assert from "node:assert/strict"
import test from "node:test"
import { normalizeSettingDocument } from "../src/settings-document.js"
import type { SettingMeta } from "../src/settings-drive.js"

function normalized(relativePath: string, meta: SettingMeta, body = "") {
	const result = normalizeSettingDocument({ relativePath, meta, body })
	assert.equal("skip" in result, false)
	assert.equal("unresolved" in result, false)
	if ("skip" in result || "unresolved" in result) throw new Error("expected normalized document")
	return result
}

test("normal setting path determines world and public scope", () => {
	const result = normalized("룩스테라/설정/인물/테오르 마르케인.md", {
		title: "테오르 마르케인",
		uuid: "b984c536-3737-415d-be4b-23f6f84a7c76",
		docType: "setting",
		status: "완료",
		type: "인물",
		subtype: "주요",
		region: "",
	})
	assert.equal(result.world, "룩스테라")
	assert.equal(result.isPublic, true)
	assert.equal(result.category, "인물")
	assert.equal(result.subcategory, "주요 인물")
})

test("common setting uses 공통 world", () => {
	const result = normalized("위그드라실/설정/질서와 혼돈.md", {
		title: "질서와 혼돈",
		uuid: "c1da1ab0-a813-4dba-a785-4fb90d997d87",
		docType: "setting",
		status: "진행 중",
		type: "개념",
		subtype: "",
		region: "",
	})
	assert.equal(result.world, "공통")
	assert.equal(result.category, "개념")
})

test("secret setting maps secret_type and is private", () => {
	const result = normalized("엘드로스/비밀 설정/숨겨진 장소.md", {
		title: "숨겨진 장소",
		uuid: "11111111-1111-4111-8111-111111111111",
		docType: "secret_setting",
		secret_type: "장소",
		status: "진행 중",
	})
	assert.equal(result.world, "엘드로스")
	assert.equal(result.isPublic, false)
	assert.equal(result.category, "지형지물")
	assert.equal(result.subcategory, "장소")
})

test("secret setting without secret_type is unresolved rather than guessed", () => {
	const result = normalizeSettingDocument({
		relativePath: "룩스테라/비밀 설정/빈문서.md",
		meta: { title: "빈문서", uuid: "22222222-2222-4222-8222-222222222222", docType: "secret_setting", status: "시작 전" },
		body: "",
	})
	assert.deepEqual(result, { unresolved: ["비밀 설정 secret_type으로 카테고리 판정 불가: (빈값)"] })
})

test("deity path maps all deities except 흑린망룡 to 정령성 신위", () => {
	const normal = normalized("룩스테라/신격/아누르.md", {
		title: "아누르", uuid: "33333333-3333-4333-8333-333333333333", docType: "deity", status: "완료",
	})
	assert.equal(normal.category, "신격")
	assert.equal(normal.subcategory, "정령성 신위")

	const black = normalized("룩스테라/신격/검은 비늘의 이무기, 흑린망룡(黑鱗蟒龍).md", {
		title: "검은 비늘의 이무기, 흑린망룡(黑鱗蟒龍)", uuid: "3812916f-d6aa-4063-b656-a4c253d32b57", docType: "deity", status: "완료",
	})
	assert.equal(black.subcategory, "용성 신위")
})

test("dragon-dex path maps an explicitly stated lineage", () => {
	const result = normalized("룩스테라/용종 도감/뇌명조 그라바크.md", {
		title: "뇌명조 그라바크", uuid: "26df70f6-4eea-47ed-bc1d-bc254539404c", docType: "setting", status: "완료", region: "라크샤라 대륙",
	}, "원종 조룡종이다.")
	assert.equal(result.category, "용종")
	assert.equal(result.subcategory, "조룡종")
	assert.equal(result.region, "라크샤라")
})

test("Eldros class documents map to 기본 클래스", () => {
	const result = normalized("엘드로스/설정/클래스/클래스-리퍼.md", {
		title: "클래스-리퍼", uuid: "44444444-4444-4444-8444-444444444444", docType: "setting", status: "진행 중", type: "클래스", subtype: "",
	})
	assert.equal(result.category, "클래스")
	assert.equal(result.subcategory, "기본 클래스")
})

test("excluded repository roles use exact path segments", () => {
	for (const relativePath of [
		"룩스테라/인덱스/A.md",
		"룩스테라/라이브러리/A.md",
		"룩스테라/스토리 설계/A.md",
		"룩스테라/설정 정비/A.md",
	]) {
		assert.deepEqual(normalizeSettingDocument({ relativePath, meta: {}, body: "" }), { skip: true })
	}
	const included = normalized("룩스테라/설정/개념/설정 정비의 역사.md", {
		title: "설정 정비의 역사", uuid: "55555555-5555-4555-8555-555555555555", docType: "setting", status: "완료", type: "개념", subtype: "",
	})
	assert.equal(included.category, "개념")
})

test("status outside the frozen catalog is unresolved", () => {
	const result = normalizeSettingDocument({
		relativePath: "룩스테라/설정/개념/A.md",
		meta: { title: "A", uuid: "66666666-6666-4666-8666-666666666666", docType: "setting", status: "검토 중", type: "개념", subtype: "" },
		body: "",
	})
	assert.deepEqual(result, { unresolved: ["상태가 허용값 밖에 있음: 검토 중"] })
})
