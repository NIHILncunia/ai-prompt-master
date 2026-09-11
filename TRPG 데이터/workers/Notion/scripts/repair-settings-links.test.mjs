import assert from "node:assert/strict"
import test from "node:test"
import {
	buildReplaceContentPayload,
	canApplyRepair,
	parseRepairArgs,
} from "./repair-settings-links.mjs"

test("parseRepairArgs defaults to dry-run and supports one UUID", () => {
	assert.deepEqual(parseRepairArgs([]), { apply: false, uuid: "" })
	assert.deepEqual(parseRepairArgs(["--apply", "--uuid", "ABC"]), { apply: true, uuid: "abc" })
	assert.throws(() => parseRepairArgs(["--unknown"]), /unknown argument/i)
	assert.throws(() => parseRepairArgs(["--uuid"]), /requires a value/i)
})

test("buildReplaceContentPayload matches Notion markdown PATCH contract", () => {
	assert.deepEqual(buildReplaceContentPayload("# Hello"), {
		type: "replace_content",
		replace_content: { new_str: "# Hello" },
	})
})

test("canApplyRepair blocks incomplete full registries but permits a safe single-page repair", () => {
	assert.deepEqual(
		canApplyRepair({ apply: false, uuid: "", localCount: 338, registryCount: 201, hardUnresolved: 0 }),
		{ allowed: false, reason: "dry-run" },
	)
	assert.deepEqual(
		canApplyRepair({ apply: true, uuid: "", localCount: 338, registryCount: 201, hardUnresolved: 0 }),
		{ allowed: false, reason: "registry incomplete: 201/338" },
	)
	assert.deepEqual(
		canApplyRepair({ apply: true, uuid: "u1", localCount: 338, registryCount: 201, hardUnresolved: 0 }),
		{ allowed: true, reason: "single-page apply" },
	)
	assert.deepEqual(
		canApplyRepair({ apply: true, uuid: "u1", localCount: 338, registryCount: 201, hardUnresolved: 1 }),
		{ allowed: false, reason: "hard unresolved links: 1" },
	)
})
