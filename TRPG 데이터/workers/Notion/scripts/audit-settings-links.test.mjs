import assert from "node:assert/strict"
import test from "node:test"
import { auditSettingsLinks } from "./audit-settings-links.mjs"

test("current 338-document corpus matches the frozen wikilink preflight contract", async () => {
	const summary = await auditSettingsLinks()
	assert.deepEqual(summary, {
		documents: 338,
		documentLinks: 1076,
		resolvedPageLinks: 970,
		directResolved: 963,
		sameWorldResolved: 7,
		deferredRelations: 106,
		hardUnresolved: 0,
		sectionLinks: 15,
		sectionHeadingsMatched: 15,
		sectionTargetDocuments: 3,
		sectionDependencyCycles: 0,
		imagesPreserved: 285,
	})
})
