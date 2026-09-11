import assert from "node:assert/strict"
import test from "node:test"
import {
	createLinkRegistry,
	parseWikiLinks,
	resolveWikiTarget,
	type LinkRegistryEntry,
} from "../src/settings-links.js"

test("parseWikiLinks finds prose links while protecting code and keeping images distinct", () => {
	const markdown = `---
title: Sample
---
본문 [[세계수 위그드라실]] [[신위|정령성]]
[[라크샤라 대륙#용맥의 심장|용맥의 심장]]
![[image.webp]]
\`[[inline code]]\`
\`\`\`md
[[fenced code]]
\`\`\`
`
	const links = parseWikiLinks(markdown)
	assert.deepEqual(
		links.filter((link) => !link.isImage).map(({ target, alias, heading }) => ({ target, alias, heading })),
		[
			{ target: "세계수 위그드라실", alias: "", heading: "" },
			{ target: "신위", alias: "정령성", heading: "" },
			{ target: "라크샤라 대륙", alias: "용맥의 심장", heading: "용맥의 심장" },
		],
	)
	assert.equal(links.filter((link) => link.isImage).length, 1)
	assert.equal(links.some((link) => link.target === "inline code"), false)
	assert.equal(links.some((link) => link.target === "fenced code"), false)
})

const entries: LinkRegistryEntry[] = [
	{
		uuid: "lux",
		title: "정제사",
		stem: "정제사",
		relativePath: "룩스테라/설정/개념/정제사.md",
		world: "룩스테라",
	},
	{
		uuid: "eld",
		title: "정제사",
		stem: "정제사",
		relativePath: "엘드로스/설정/주요 개념/정제사.md",
		world: "엘드로스",
	},
	{
		uuid: "tree",
		title: "세계수 위그드라실",
		stem: "세계수 위그드라실",
		relativePath: "룩스테라/설정/개념/세계수 위그드라실.md",
		world: "룩스테라",
	},
]

function one(raw: string) {
	const links = parseWikiLinks(raw)
	assert.equal(links.length, 1)
	return links[0]
}

test("resolveWikiTarget resolves unique page links", () => {
	const registry = createLinkRegistry(entries)
	const result = resolveWikiTarget({
		link: one("[[세계수 위그드라실]]"),
		sourceWorld: "룩스테라",
		registry,
		relationTargets: new Set(),
	})
	assert.equal(result.kind, "page")
	if (result.kind === "page") {
		assert.equal(result.entry.uuid, "tree")
		assert.equal(result.resolution, "title")
	}
})

test("resolveWikiTarget disambiguates duplicate titles by source world", () => {
	const registry = createLinkRegistry(entries)
	const lux = resolveWikiTarget({
		link: one("[[정제사]]"),
		sourceWorld: "룩스테라",
		registry,
		relationTargets: new Set(),
	})
	const eld = resolveWikiTarget({
		link: one("[[정제사]]"),
		sourceWorld: "엘드로스",
		registry,
		relationTargets: new Set(),
	})
	assert.equal(lux.kind, "page")
	assert.equal(eld.kind, "page")
	if (lux.kind === "page") {
		assert.equal(lux.entry.uuid, "lux")
		assert.equal(lux.resolution, "same_world")
	}
	if (eld.kind === "page") {
		assert.equal(eld.entry.uuid, "eld")
		assert.equal(eld.resolution, "same_world")
	}
})

test("resolveWikiTarget classifies relation targets as deferred", () => {
	const registry = createLinkRegistry(entries)
	const result = resolveWikiTarget({
		link: one("[[A ↔ B]]"),
		sourceWorld: "룩스테라",
		registry,
		relationTargets: new Set(["A ↔ B"]),
	})
	assert.deepEqual(result, { kind: "deferred_relation", display: "A ↔ B" })
})

test("resolveWikiTarget leaves truly missing targets unresolved", () => {
	const registry = createLinkRegistry(entries)
	const result = resolveWikiTarget({
		link: one("[[없는 문서]]"),
		sourceWorld: "룩스테라",
		registry,
		relationTargets: new Set(),
	})
	assert.equal(result.kind, "unresolved")
	if (result.kind === "unresolved") {
		assert.equal(result.candidates.length, 0)
		assert.match(result.reason, /target not found/)
	}
})

import { transformWikiLinks } from "../src/settings-links.js"

test("transformWikiLinks renders page mentions, aliases, sections, relations, and preserves images/code", () => {
	const registry = createLinkRegistry([
		{
			uuid: "tree",
			title: "세계수 위그드라실",
			stem: "세계수 위그드라실",
			relativePath: "룩스테라/설정/개념/세계수 위그드라실.md",
			world: "룩스테라",
			pageId: "page-tree",
			pageUrl: "https://www.notion.so/Page-tree",
		},
		{
			uuid: "rak",
			title: "라크샤라 대륙",
			stem: "라크샤라 대륙",
			relativePath: "룩스테라/설정/지형/라크샤라 대륙.md",
			world: "룩스테라",
			pageId: "page-rak",
			pageUrl: "https://www.notion.so/Page-rak",
		},
	])
	const markdown = `본문 [[세계수 위그드라실]] [[세계수 위그드라실|세계수]]\n[[라크샤라 대륙#용맥의 심장|용맥의 심장]] [[A ↔ B]]\n![[image.webp]]\n\`[[inline code]]\`\n\`\`\`md\n[[fenced code]]\n\`\`\``
	const result = transformWikiLinks({
		markdown,
		sourceWorld: "룩스테라",
		registry,
		relationTargets: new Set(["A ↔ B"]),
		resolveHeadingUrl: (entry, heading) =>
			entry.uuid === "rak" && heading === "용맥의 심장"
				? "https://www.notion.so/Page-rak#block-id"
				: null,
	})
	assert.match(result.markdown, /<mention-page url="https:\/\/www\.notion\.so\/Page-tree">세계수 위그드라실<\/mention-page>/)
	assert.match(result.markdown, /\[세계수\]\(https:\/\/www\.notion\.so\/Page-tree\)/)
	assert.match(result.markdown, /\[용맥의 심장\]\(https:\/\/www\.notion\.so\/Page-rak#block-id\)/)
	assert.match(result.markdown, / A ↔ B/)
	assert.match(result.markdown, /!\[\[image\.webp\]\]/)
	assert.match(result.markdown, /`\[\[inline code\]\]`/)
	assert.match(result.markdown, /\[\[fenced code\]\]/)
	assert.deepEqual(
		{
			pageLinks: result.pageLinks,
			aliasLinks: result.aliasLinks,
			sectionLinks: result.sectionLinks,
			deferredRelations: result.deferredRelations,
			imagesPreserved: result.imagesPreserved,
			unresolved: result.unresolved.length,
		},
		{ pageLinks: 1, aliasLinks: 1, sectionLinks: 1, deferredRelations: 1, imagesPreserved: 1, unresolved: 0 },
	)
})

test("transformWikiLinks leaves a section wikilink untouched when heading anchor cannot resolve", () => {
	const registry = createLinkRegistry([
		{
			uuid: "rak",
			title: "라크샤라 대륙",
			stem: "라크샤라 대륙",
			relativePath: "룩스테라/설정/지형/라크샤라 대륙.md",
			world: "룩스테라",
			pageId: "page-rak",
			pageUrl: "https://www.notion.so/Page-rak",
		},
	])
	const original = "[[라크샤라 대륙#용맥의 심장|용맥의 심장]]"
	const result = transformWikiLinks({
		markdown: original,
		sourceWorld: "룩스테라",
		registry,
		relationTargets: new Set(),
		resolveHeadingUrl: () => null,
	})
	assert.equal(result.markdown, original)
	assert.equal(result.unresolved.length, 1)
	assert.match(result.unresolved[0].reason, /heading/i)
})

test("transformWikiLinks leaves page links unresolved until a Notion page URL exists", () => {
	const registry = createLinkRegistry(entries)
	const original = "[[세계수 위그드라실]]"
	const result = transformWikiLinks({
		markdown: original,
		sourceWorld: "룩스테라",
		registry,
		relationTargets: new Set(),
	})
	assert.equal(result.markdown, original)
	assert.equal(result.unresolved.length, 1)
	assert.match(result.unresolved[0].reason, /page URL/i)
})
