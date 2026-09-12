import assert from "node:assert/strict"
import test from "node:test"
import {
	buildDeleteChange,
	buildSettingsQueryFilter,
	normalizeUuid,
	requireSingleSettingPage,
} from "../src/settings-admin.js"

test("normalizeUuid accepts and canonicalizes a UUID", () => {
	assert.equal(
		normalizeUuid("B984C536-3737-415D-BE4B-23F6F84A7C76"),
		"b984c536-3737-415d-be4b-23f6f84a7c76",
	)
})

test("normalizeUuid rejects non-UUID destructive keys", () => {
	assert.throws(() => normalizeUuid("테오르 마르케인"), /valid UUID/i)
})

test("buildDeleteChange only emits an explicit delete for the UUID key", () => {
	assert.deepEqual(buildDeleteChange("b984c536-3737-415d-be4b-23f6f84a7c76"), {
		type: "delete",
		key: "b984c536-3737-415d-be4b-23f6f84a7c76",
	})
})

test("requireSingleSettingPage refuses zero or ambiguous destructive targets", () => {
	const uuid = "b984c536-3737-415d-be4b-23f6f84a7c76"
	assert.throws(() => requireSingleSettingPage(uuid, []), /found 0/i)
	assert.throws(
		() =>
			requireSingleSettingPage(uuid, [
				{ pageId: "page-1", uuid },
				{ pageId: "page-2", uuid },
			]),
		/found 2/i,
	)
	assert.deepEqual(requireSingleSettingPage(uuid, [{ pageId: "page-1", uuid }]), {
		pageId: "page-1",
		uuid,
	})
})

test("buildSettingsQueryFilter builds v2 typed filters", () => {
	assert.deepEqual(
		buildSettingsQueryFilter({
			uuid: "b984c536-3737-415d-be4b-23f6f84a7c76",
			title: "테오르",
			world: "룩스테라",
			category: "인물",
			subcategory: "주요 인물",
			importance: "주요",
			tag: "헌터",
			isPublic: true,
			region: "에리디안",
			status: "완료",
		}),
		{
			and: [
				{
					property: "UUID",
					rich_text: { equals: "b984c536-3737-415d-be4b-23f6f84a7c76" },
				},
				{ property: "이름", title: { contains: "테오르" } },
				{ property: "세계", select: { equals: "룩스테라" } },
				{ property: "카테고리", select: { equals: "인물" } },
				{ property: "서브카테고리", select: { equals: "주요 인물" } },
				{ property: "중요도", select: { equals: "주요" } },
				{ property: "태그", multi_select: { contains: "헌터" } },
				{ property: "공개 여부", checkbox: { equals: true } },
				{ property: "영역", select: { equals: "에리디안" } },
				{ property: "상태", select: { equals: "완료" } },
			],
		},
	)
})

test("buildSettingsQueryFilter returns undefined when no filters are supplied", () => {
	assert.equal(buildSettingsQueryFilter({}), undefined)
})
