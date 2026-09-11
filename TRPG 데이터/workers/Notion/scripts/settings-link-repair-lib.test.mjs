import assert from "node:assert/strict"
import test from "node:test"
import {
	buildHeadingUrlIndex,
	buildNotionRegistry,
	queryAllSettingPages,
	runNtnApi,
} from "./settings-link-repair-lib.mjs"

test("runNtnApi fixes CLI auth environment and API version", () => {
	let captured
	const fakeSpawn = (command, args, options) => {
		captured = { command, args, options }
		return { status: 0, stdout: '{"ok":true}', stderr: "" }
	}
	const result = runNtnApi("/v1/test", {
		method: "POST",
		data: { hello: "world" },
		spawnSyncImpl: fakeSpawn,
	})
	assert.deepEqual(result, { ok: true })
	assert.equal(captured.command, "ntn")
	assert.deepEqual(captured.args.slice(0, 3), ["api", "/v1/test", "-X"])
	assert.ok(captured.args.includes("2026-03-11"))
	assert.equal(captured.options.env.NOTION_HOME, "/root/.notion")
	assert.equal(captured.options.env.NOTION_KEYRING, "0")
	assert.equal(captured.options.input, JSON.stringify({ hello: "world" }))
})

test("queryAllSettingPages paginates the data source query", async () => {
	const calls = []
	const api = async (apiPath, options) => {
		calls.push({ apiPath, options })
		if (calls.length === 1) return { results: [{ id: "p1" }], has_more: true, next_cursor: "next" }
		return { results: [{ id: "p2" }], has_more: false, next_cursor: null }
	}
	const pages = await queryAllSettingPages("ds", { api })
	assert.deepEqual(pages.map((page) => page.id), ["p1", "p2"])
	assert.equal(calls.length, 2)
	assert.deepEqual(calls[0], {
		apiPath: "/v1/data_sources/ds/query",
		options: { method: "POST", data: { page_size: 100 } },
	})
	assert.deepEqual(calls[1].options.data, { page_size: 100, start_cursor: "next" })
})

test("buildNotionRegistry joins local entries to Notion pages by UUID", () => {
	const local = [
		{ uuid: "u1", title: "A", stem: "A", relativePath: "룩스테라/설정/A.md", world: "룩스테라" },
		{ uuid: "u2", title: "B", stem: "B", relativePath: "엘드로스/설정/B.md", world: "엘드로스" },
	]
	const pages = [
		{ id: "p1", url: "https://notion.so/p1", properties: { UUID: { rich_text: [{ plain_text: "u1" }] } } },
		{ id: "old", url: "https://notion.so/old", properties: { UUID: { rich_text: [{ plain_text: "old-uuid" }] } } },
	]
	const result = buildNotionRegistry(local, pages)
	assert.equal(result.entries.length, 1)
	assert.deepEqual(result.entries[0], { ...local[0], pageId: "p1", pageUrl: "https://notion.so/p1" })
	assert.deepEqual(result.missingLocalUuids, ["u2"])
	assert.deepEqual(result.unknownNotionUuids, ["old-uuid"])
})

test("buildNotionRegistry rejects duplicate Notion UUID pages", () => {
	const local = [{ uuid: "u1", title: "A", stem: "A", relativePath: "룩스테라/설정/A.md", world: "룩스테라" }]
	const pages = [
		{ id: "p1", url: "https://notion.so/p1", properties: { UUID: { rich_text: [{ plain_text: "u1" }] } } },
		{ id: "p2", url: "https://notion.so/p2", properties: { UUID: { rich_text: [{ plain_text: "u1" }] } } },
	]
	assert.throws(() => buildNotionRegistry(local, pages), /duplicate notion uuid/i)
})

test("buildHeadingUrlIndex returns unique block URLs and flags duplicate headings", () => {
	const blocks = [
		{ id: "11111111-2222-3333-4444-555555555555", type: "heading_2", heading_2: { rich_text: [{ plain_text: "용맥의 심장" }] } },
		{ id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", type: "heading_3", heading_3: { rich_text: [{ plain_text: "중복" }] } },
		{ id: "ffffffff-1111-2222-3333-444444444444", type: "heading_2", heading_2: { rich_text: [{ plain_text: "중복" }] } },
		{ id: "paragraph", type: "paragraph", paragraph: { rich_text: [{ plain_text: "무시" }] } },
	]
	const result = buildHeadingUrlIndex("https://www.notion.so/Page", blocks)
	assert.equal(
		result.urls.get("용맥의 심장"),
		"https://www.notion.so/Page#11111111222233334444555555555555",
	)
	assert.equal(result.urls.has("중복"), false)
	assert.deepEqual([...result.ambiguous], ["중복"])
})
