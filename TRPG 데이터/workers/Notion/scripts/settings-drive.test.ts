import assert from "node:assert/strict"
import test from "node:test"
import {
	advanceBackfillTraversal,
	classifySettingMarkdown,
	inspectSettingMarkdown,
	parseSettingMarkdownSource,
	isWithinDriveTree,
	nextDeltaCursorStep,
	resolveDriveRelativePath,
} from "../src/settings-drive.js"



test("parseSettingMarkdownSource accepts UTF-8 BOM and CRLF frontmatter", () => {
	const parsed = parseSettingMarkdownSource(`\uFEFF---\r\ntitle: BOM Canon\r\nuuid: 66666666-7777-4888-8999-aaaaaaaaaaaa\r\ndocType: setting\r\nstatus: 완료\r\n---\r\n# Body\r\n`)
	assert.equal(parsed.kind, "document")
	if (parsed.kind !== "document") return
	assert.equal(parsed.meta.title, "BOM Canon")
	assert.equal(parsed.meta.uuid, "66666666-7777-4888-8999-aaaaaaaaaaaa")
	assert.equal(parsed.body, "# Body")
})

test("parseSettingMarkdownSource accepts deity and missing-docType canonical documents", () => {
	for (const source of [
		`---\ntitle: Deity\nuuid: B984C536-3737-415D-BE4B-23F6F84A7C76\ndocType: deity\nstatus: 완료\n---\n# Divine Body\n`,
		`---\ntitle: Legacy Canon\nuuid: 11111111-2222-4333-8444-555555555555\nstatus: 완료\n---\n# Canon Body\n`,
	]) {
		const parsed = parseSettingMarkdownSource(source)
		assert.equal(parsed.kind, "document")
		if (parsed.kind !== "document") continue
		assert.match(parsed.meta.uuid, /^[0-9a-f-]{36}$/)
		assert.match(parsed.body, /^# /)
	}
})

test("parseSettingMarkdownSource rejects an included canonical document without UUID", () => {
	assert.throws(
		() => parseSettingMarkdownSource(`---\ntitle: Broken Canon\nstatus: 완료\n---\nBody\n`),
		/uuid/i,
	)
})

test("classifySettingMarkdown returns a normalized setting with body", () => {
	const parsed = classifySettingMarkdown(`---\ntitle: Sample\nuuid: B984C536-3737-415D-BE4B-23F6F84A7C76\ndocType: setting\ntype: 인물\n---\n# Body\n`)
	assert.equal(parsed.kind, "setting")
	if (parsed.kind !== "setting") return
	assert.equal(parsed.meta.uuid, "b984c536-3737-415d-be4b-23f6f84a7c76")
	assert.equal(parsed.meta.title, "Sample")
	assert.equal(parsed.body, "# Body")
})

test("classifySettingMarkdown skips non-setting markdown", () => {
	const parsed = classifySettingMarkdown(`---\ntitle: Template\ndocType: template\n---\nBody\n`)
	assert.deepEqual(parsed, { kind: "skip" })
})

test("classifySettingMarkdown rejects a setting without UUID", () => {
	assert.throws(
		() => classifySettingMarkdown(`---\ntitle: Broken\ndocType: setting\n---\nBody\n`),
		/uuid/i,
	)
})

test("inspectSettingMarkdown reports an invalid setting without aborting a traversal", () => {
	assert.deepEqual(
		inspectSettingMarkdown(`---\ntitle: Broken\ndocType: setting\n---\nBody\n`),
		{ kind: "invalid", error: "Setting document Broken must contain uuid" },
	)
})

test("advanceBackfillTraversal keeps current folder while a page token remains", () => {
	assert.deepEqual(
		advanceBackfillTraversal(
			{ folderQueue: ["root", "queued"], currentPageToken: "p1" },
			["child-a", "child-b"],
			"p2",
		),
		{
			folderQueue: ["root", "queued", "child-a", "child-b"],
			currentPageToken: "p2",
			hasMore: true,
		},
	)
})

test("advanceBackfillTraversal pops a completed folder and advances breadth-first", () => {
	assert.deepEqual(
		advanceBackfillTraversal(
			{ folderQueue: ["root", "queued"] },
			["child-a", "child-b"],
			null,
		),
		{
			folderQueue: ["queued", "child-a", "child-b"],
			currentPageToken: undefined,
			hasMore: true,
		},
	)
	assert.deepEqual(
		advanceBackfillTraversal({ folderQueue: ["root"] }, [], null),
		{ folderQueue: [], currentPageToken: undefined, hasMore: false },
	)
})

test("isWithinDriveTree resolves nested parents and stops outside the configured root", async () => {
	const parents = new Map([
		["folder-b", ["folder-a"]],
		["folder-a", ["root"]],
		["other", ["elsewhere"]],
		["elsewhere", []],
	])
	const resolveParents = async (id: string) => parents.get(id) ?? []
	assert.equal(await isWithinDriveTree(["folder-b"], "root", resolveParents), true)
	assert.equal(await isWithinDriveTree(["other"], "root", resolveParents), false)
})

test("nextDeltaCursorStep advances through next page and then new start token", () => {
	assert.deepEqual(nextDeltaCursorStep("old", "next", "new"), {
		hasMore: true,
		nextState: { pageToken: "next" },
	})
	assert.deepEqual(nextDeltaCursorStep("next", null, "new"), {
		hasMore: false,
		nextState: { pageToken: "new" },
	})
	assert.deepEqual(nextDeltaCursorStep("new", null, "new"), {
		hasMore: false,
		nextState: { pageToken: "new" },
	})
})


test("resolveDriveRelativePath reconstructs a path from parent metadata", async () => {
	const metadata = new Map([
		["child", { id: "child", name: "인물", parents: ["setting"] }],
		["setting", { id: "setting", name: "설정", parents: ["world"] }],
		["world", { id: "world", name: "룩스테라", parents: ["root"] }],
	])
	const resolveMetadata = async (id: string) => metadata.get(id) ?? null
	assert.equal(
		await resolveDriveRelativePath({ id: "file", name: "문서.md", parents: ["child"] }, "root", resolveMetadata),
		"룩스테라/설정/인물/문서.md",
	)
})

test("resolveDriveRelativePath returns null outside root and terminates on parent cycles", async () => {
	const metadata = new Map([
		["a", { id: "a", name: "A", parents: ["b"] }],
		["b", { id: "b", name: "B", parents: ["a"] }],
		["outside", { id: "outside", name: "밖", parents: [] }],
	])
	const resolveMetadata = async (id: string) => metadata.get(id) ?? null
	assert.equal(await resolveDriveRelativePath({ id: "f1", name: "A.md", parents: ["a"] }, "root", resolveMetadata), null)
	assert.equal(await resolveDriveRelativePath({ id: "f2", name: "B.md", parents: ["outside"] }, "root", resolveMetadata), null)
})

test("resolveDriveRelativePath selects the parent chain that reaches root", async () => {
	const metadata = new Map([
		["bad", { id: "bad", name: "bad", parents: ["outside"] }],
		["outside", { id: "outside", name: "outside", parents: [] }],
		["good", { id: "good", name: "설정", parents: ["world"] }],
		["world", { id: "world", name: "엘드로스", parents: ["root"] }],
	])
	const resolveMetadata = async (id: string) => metadata.get(id) ?? null
	assert.equal(
		await resolveDriveRelativePath({ id: "file", name: "클래스.md", parents: ["bad", "good"] }, "root", resolveMetadata),
		"엘드로스/설정/클래스.md",
	)
})
