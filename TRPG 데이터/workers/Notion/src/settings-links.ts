export type LinkWorld = "공통" | "룩스테라" | "엘드로스"

export type LinkRegistryEntry = {
	uuid: string
	title: string
	stem: string
	relativePath: string
	world: LinkWorld
	pageId?: string
	pageUrl?: string
}

export type ParsedWikiLink = {
	raw: string
	target: string
	alias: string
	heading: string
	isImage: boolean
	start: number
	end: number
}

export type LinkResolutionMethod = "path" | "title" | "stem" | "same_world"

export type ResolvedWikiTarget =
	| { kind: "page"; entry: LinkRegistryEntry; resolution: LinkResolutionMethod }
	| { kind: "deferred_relation"; display: string }
	| { kind: "unresolved"; reason: string; candidates: LinkRegistryEntry[] }

export type LinkRegistry = {
	byUuid: Map<string, LinkRegistryEntry>
	byTitle: Map<string, LinkRegistryEntry[]>
	byStem: Map<string, LinkRegistryEntry[]>
	byPath: Map<string, LinkRegistryEntry>
}

function normalizePath(value: string): string {
	return value
		.replace(/\\/g, "/")
		.replace(/^\/+|\/+$/g, "")
		.replace(/^프로젝트 위그드라실\//, "")
		.replace(/\.md$/i, "")
}

function addMulti(
	map: Map<string, LinkRegistryEntry[]>,
	key: string,
	entry: LinkRegistryEntry,
): void {
	const normalized = key.trim()
	if (!normalized) return
	const existing = map.get(normalized) ?? []
	if (!existing.some((candidate) => candidate.uuid === entry.uuid)) {
		map.set(normalized, [...existing, entry])
	}
}

export function createLinkRegistry(entries: LinkRegistryEntry[]): LinkRegistry {
	const byUuid = new Map<string, LinkRegistryEntry>()
	const byTitle = new Map<string, LinkRegistryEntry[]>()
	const byStem = new Map<string, LinkRegistryEntry[]>()
	const byPath = new Map<string, LinkRegistryEntry>()

	for (const entry of entries) {
		if (byUuid.has(entry.uuid)) {
			throw new Error(`Duplicate link registry UUID: ${entry.uuid}`)
		}
		byUuid.set(entry.uuid, entry)
		addMulti(byTitle, entry.title, entry)
		addMulti(byStem, entry.stem, entry)
		const pathKey = normalizePath(entry.relativePath)
		const existingPath = byPath.get(pathKey)
		if (existingPath && existingPath.uuid !== entry.uuid) {
			throw new Error(`Duplicate link registry path: ${pathKey}`)
		}
		byPath.set(pathKey, entry)
	}

	return { byUuid, byTitle, byStem, byPath }
}

function markRange(mask: Uint8Array, start: number, end: number): void {
	for (let index = Math.max(0, start); index < Math.min(mask.length, end); index += 1) {
		mask[index] = 1
	}
}

function protectedMask(markdown: string): Uint8Array {
	const mask = new Uint8Array(markdown.length)

	const frontmatter = markdown.match(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/)
	if (frontmatter?.index !== undefined) {
		markRange(mask, frontmatter.index, frontmatter.index + frontmatter[0].length)
	}

	const fence = /^(?:```|~~~)[^\n\r]*(?:\r?\n|$)[\s\S]*?^(?:```|~~~)\s*$/gm
	for (const match of markdown.matchAll(fence)) {
		if (match.index === undefined) continue
		markRange(mask, match.index, match.index + match[0].length)
	}

	const inlineCode = /(`+)(?!`)([^\r\n]*?)\1/g
	for (const match of markdown.matchAll(inlineCode)) {
		if (match.index === undefined || mask[match.index]) continue
		markRange(mask, match.index, match.index + match[0].length)
	}

	return mask
}

function parseInner(inner: string): Pick<ParsedWikiLink, "target" | "alias" | "heading"> {
	const pipeIndex = inner.indexOf("|")
	const targetAndHeading = (pipeIndex >= 0 ? inner.slice(0, pipeIndex) : inner).trim()
	const alias = pipeIndex >= 0 ? inner.slice(pipeIndex + 1).trim() : ""
	const headingIndex = targetAndHeading.indexOf("#")
	const target = (headingIndex >= 0 ? targetAndHeading.slice(0, headingIndex) : targetAndHeading)
		.trim()
		.replace(/\.md$/i, "")
	const heading = headingIndex >= 0 ? targetAndHeading.slice(headingIndex + 1).trim() : ""
	return { target, alias, heading }
}

export function parseWikiLinks(markdown: string): ParsedWikiLink[] {
	const mask = protectedMask(markdown)
	const links: ParsedWikiLink[] = []
	const pattern = /(!?)\[\[([^\]\r\n]+)\]\]/g

	for (const match of markdown.matchAll(pattern)) {
		if (match.index === undefined || mask[match.index]) continue
		const raw = match[0]
		const inner = match[2]
		const parsed = parseInner(inner)
		links.push({
			raw,
			...parsed,
			isImage: match[1] === "!",
			start: match.index,
			end: match.index + raw.length,
		})
	}
	return links
}

function uniqueByUuid(candidates: LinkRegistryEntry[]): LinkRegistryEntry[] {
	const unique = new Map<string, LinkRegistryEntry>()
	for (const candidate of candidates) unique.set(candidate.uuid, candidate)
	return [...unique.values()]
}

function resolveCandidates(
	candidates: LinkRegistryEntry[],
	sourceWorld: LinkWorld,
	baseMethod: Exclude<LinkResolutionMethod, "same_world">,
): ResolvedWikiTarget {
	const unique = uniqueByUuid(candidates)
	if (unique.length === 1) {
		return { kind: "page", entry: unique[0], resolution: baseMethod }
	}
	if (unique.length > 1) {
		const sameWorld = unique.filter((candidate) => candidate.world === sourceWorld)
		if (sameWorld.length === 1) {
			return { kind: "page", entry: sameWorld[0], resolution: "same_world" }
		}
		return {
			kind: "unresolved",
			reason: `ambiguous target (${unique.length} candidates)`,
			candidates: unique,
		}
	}
	return { kind: "unresolved", reason: "target not found", candidates: [] }
}

export function resolveWikiTarget(input: {
	link: ParsedWikiLink
	sourceWorld: LinkWorld
	registry: LinkRegistry
	relationTargets: ReadonlySet<string>
}): ResolvedWikiTarget {
	const { link, sourceWorld, registry, relationTargets } = input
	const target = link.target.trim()
	if (!target) {
		return { kind: "unresolved", reason: "empty target", candidates: [] }
	}

	if (relationTargets.has(target)) {
		return {
			kind: "deferred_relation",
			display: link.alias || link.heading || target,
		}
	}

	const normalizedPath = normalizePath(target)
	if (target.includes("/") || target.includes("\\")) {
		const exact = registry.byPath.get(normalizedPath)
		if (exact) return { kind: "page", entry: exact, resolution: "path" }
		return { kind: "unresolved", reason: "target path not found", candidates: [] }
	}

	const titleCandidates = registry.byTitle.get(target) ?? []
	if (titleCandidates.length > 0) {
		return resolveCandidates(titleCandidates, sourceWorld, "title")
	}

	const stemCandidates = registry.byStem.get(target) ?? []
	if (stemCandidates.length > 0) {
		return resolveCandidates(stemCandidates, sourceWorld, "stem")
	}

	return { kind: "unresolved", reason: "target not found", candidates: [] }
}
