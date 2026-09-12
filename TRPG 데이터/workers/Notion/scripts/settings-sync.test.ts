import assert from "node:assert/strict"
import test from "node:test"
import * as Builder from "@notionhq/workers/builder"
import { buildSettingUpsert } from "../src/settings-sync.js"

const file = { id: "drive-1", modifiedTime: "2026-09-12T00:00:00.000Z" }

test("buildSettingUpsert emits v2 metadata and omits body in metadata-only mode", () => {
	const result = buildSettingUpsert({
		relativePath: "룩스테라/설정/인물/에리나.md",
		meta: {
			title: "에리나",
			uuid: "B984C536-3737-415D-BE4B-23F6F84A7C76",
			docType: "setting",
			type: "인물",
			subtype: "헌터/오퍼레이터",
			status: "완료",
			region: "에리디안",
			thumbnail: "images/erina.webp",
		},
		body: "# Body",
		file,
		includeBody: false,
	})
	assert.equal(result.kind, "upsert")
	if (result.kind !== "upsert") return
	assert.deepEqual(result.change.properties, {
		"이름": Builder.title("에리나"),
		"UUID": Builder.richText("b984c536-3737-415d-be4b-23f6f84a7c76"),
		"세계": Builder.select("룩스테라"),
		"카테고리": Builder.select("인물"),
		"서브카테고리": [],
		"중요도": Builder.select("일반"),
		"태그": Builder.multiSelect("헌터", "오퍼레이터"),
		"공개 여부": Builder.checkbox(true),
		"상태": Builder.select("완료"),
		"영역": Builder.select("에리디안"),
		"썸네일 경로": Builder.richText("images/erina.webp"),
		"Drive File ID": Builder.richText("drive-1"),
	})
	assert.equal("pageContentMarkdown" in result.change, false)
	assert.equal(result.change.upstreamUpdatedAt, file.modifiedTime)
})

test("buildSettingUpsert can include body only when explicitly requested", () => {
	const result = buildSettingUpsert({
		relativePath: "엘드로스/설정/개념/테스트.md",
		meta: {
			title: "테스트",
			uuid: "11111111-2222-4333-8444-555555555555",
			type: "개념",
			status: "초안",
		},
		body: "# Body",
		file,
		includeBody: true,
	})
	assert.equal(result.kind, "upsert")
	if (result.kind !== "upsert") return
	assert.equal(result.change.pageContentMarkdown, "# Body")
})

test("buildSettingUpsert maps secret settings to private v2 rows", () => {
	const result = buildSettingUpsert({
		relativePath: "엘드로스/비밀 설정/인물/비밀 인물.md",
		meta: {
			title: "비밀 인물",
			uuid: "22222222-3333-4444-8555-666666666666",
			docType: "secret_setting",
			secret_type: "인물",
			status: "완료",
		},
		body: "Secret",
		file,
		includeBody: false,
	})
	assert.equal(result.kind, "upsert")
	if (result.kind !== "upsert") return
	assert.deepEqual(result.change.properties["세계"], Builder.select("엘드로스"))
	assert.deepEqual(result.change.properties["카테고리"], Builder.select("인물"))
	assert.deepEqual(result.change.properties["공개 여부"], Builder.checkbox(false))
})

test("buildSettingUpsert reports normalization issues instead of guessing", () => {
	const result = buildSettingUpsert({
		relativePath: "룩스테라/비밀 설정/미상.md",
		meta: {
			title: "미상",
			uuid: "33333333-4444-4555-8666-777777777777",
			docType: "secret_setting",
			status: "완료",
		},
		body: "Secret",
		file,
		includeBody: false,
	})
	assert.equal(result.kind, "unresolved")
	if (result.kind === "unresolved") assert.match(result.issues[0], /secret_type/)
})

import { buildSettingChangeFromSource } from "../src/settings-sync.js"

test("buildSettingChangeFromSource includes deity and missing-docType canonical paths", () => {
	const deity = buildSettingChangeFromSource({
		relativePath: "룩스테라/신격/빛의 신.md",
		source: `---\ntitle: 빛의 신\nuuid: 44444444-5555-4666-8777-888888888888\ndocType: deity\nstatus: 완료\n---\n# Divine`,
		file,
		includeBody: false,
	})
	assert.equal(deity.kind, "upsert")
	if (deity.kind === "upsert") {
		assert.deepEqual(deity.change.properties["세계"], Builder.select("룩스테라"))
		assert.deepEqual(deity.change.properties["카테고리"], Builder.select("신격"))
		assert.deepEqual(deity.change.properties["서브카테고리"], Builder.select("정령성 신위"))
	}

	const missingDocType = buildSettingChangeFromSource({
		relativePath: "엘드로스/설정/개념/유산.md",
		source: `---\ntitle: 유산\nuuid: 55555555-6666-4777-8888-999999999999\ntype: 개념\nstatus: 완료\n---\n# Canon`,
		file,
		includeBody: false,
	})
	assert.equal(missingDocType.kind, "upsert")
	if (missingDocType.kind === "upsert") {
		assert.deepEqual(missingDocType.change.properties["세계"], Builder.select("엘드로스"))
		assert.deepEqual(missingDocType.change.properties["카테고리"], Builder.select("개념"))
	}
})

test("buildSettingChangeFromSource skips excluded paths before UUID validation", () => {
	const result = buildSettingChangeFromSource({
		relativePath: "룩스테라/설정/템플릿/인물 템플릿.md",
		source: `---\ntitle: 인물 템플릿\ndocType: template\n---\nTemplate body`,
		file,
		includeBody: false,
	})
	assert.deepEqual(result, { kind: "skip" })
})


test("buildSettingChangeFromSource includes relative path in canonical parse errors", () => {
	assert.throws(
		() => buildSettingChangeFromSource({
			relativePath: "룩스테라/설정/개념/깨진 문서.md",
			source: `---\nuuid: 77777777-8888-4999-8aaa-bbbbbbbbbbbb\nstatus: 완료\n---\nBody`,
			file,
			includeBody: false,
		}),
		/룩스테라\/설정\/개념\/깨진 문서\.md.*title/i,
	)
})


test("buildSettingChangeFromSource applies exact legacy metadata fallbacks for three common settings", () => {
	const cases = [
		["위그드라실/설정/창조신과 우주적 대립.md", "창조신과 우주적 대립", "7e5fd52a-881b-45e1-89c8-8b15928a8aca"],
		["위그드라실/설정/질서와 혼돈.md", "질서와 혼돈", "c1da1ab0-a813-4dba-a785-4fb90d997d87"],
		["위그드라실/설정/질서와 혼돈의 우주론.md", "질서와 혼돈의 우주론", "434d9ac0-29f7-47f1-973f-86ab7bb8fef5"],
	] as const
	for (const [relativePath, title, uuid] of cases) {
		const source = `---\n이름: '${title}'\nstatus: '진행 중'\ntype: '개념'\n---\n# Body`
		const result = buildSettingChangeFromSource({ relativePath, source, file, includeBody: false })
		assert.equal(result.kind, "upsert")
		if (result.kind !== "upsert") continue
		assert.equal(result.change.key, uuid)
		assert.deepEqual(result.change.properties["이름"], Builder.title(title))
		assert.deepEqual(result.change.properties["UUID"], Builder.richText(uuid))
	}
})

test("buildSettingChangeFromSource still rejects arbitrary included documents without UUID", () => {
	assert.throws(
		() => buildSettingChangeFromSource({
			relativePath: "위그드라실/설정/임의 문서.md",
			source: `---\n이름: '임의 문서'\nstatus: '진행 중'\ntype: '개념'\n---\n# Body`,
			file,
			includeBody: false,
		}),
		/위그드라실\/설정\/임의 문서\.md.*title|uuid/i,
	)
})
