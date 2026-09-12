import assert from "node:assert/strict"
import test from "node:test"
import { listDriveChildren, listDriveChanges } from "../src/google-drive-settings.js"

function response(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json" },
	})
}

test("listDriveChildren queries one parent page and returns files plus cursor", async () => {
	let requested = ""
	let waits = 0
	const result = await listDriveChildren({
		token: "token",
		parentId: "root",
		pageToken: "cursor-1",
		pageSize: 25,
		wait: async () => {
			waits += 1
		},
		fetchImpl: async (input) => {
			requested = String(input)
			return response({
				nextPageToken: "cursor-2",
				files: [{ id: "f1", name: "One.md", mimeType: "text/markdown", parents: ["root"] }],
			})
		},
	})
	assert.equal(waits, 1)
	assert.match(requested, /pageToken=cursor-1/)
	assert.equal(new URL(requested).searchParams.get("q"), "'root' in parents and trashed = false")
	assert.equal(result.nextPageToken, "cursor-2")
	assert.equal(result.files[0]?.id, "f1")
})

test("listDriveChanges returns Drive cursor fields and changed file metadata", async () => {
	const result = await listDriveChanges({
		token: "token",
		pageToken: "start",
		wait: async () => {},
		fetchImpl: async () =>
			response({
				nextPageToken: null,
				newStartPageToken: "new-start",
				changes: [
					{
						fileId: "f1",
						removed: false,
						file: { id: "f1", name: "One.md", mimeType: "text/markdown", parents: ["root"] },
					},
				],
			}),
	})
	assert.equal(result.newStartPageToken, "new-start")
	assert.equal(result.changes[0]?.fileId, "f1")
})
