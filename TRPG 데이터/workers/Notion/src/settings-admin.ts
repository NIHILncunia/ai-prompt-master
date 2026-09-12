export type SettingsQuery = {
	uuid?: string
	title?: string
	world?: string
	category?: string
	subcategory?: string
	importance?: string
	tag?: string
	isPublic?: boolean
	region?: string
	status?: string
}

export type SettingPageRef = {
	pageId: string
	uuid: string
}

type TextFilter =
	| { property: string; rich_text: { equals: string } }
	| { property: string; title: { contains: string } }
	| { property: string; select: { equals: string } }
	| { property: string; multi_select: { contains: string } }
	| { property: string; checkbox: { equals: boolean } }

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function normalizeUuid(value: string): string {
	const normalized = value.trim().toLowerCase()
	if (!UUID_PATTERN.test(normalized)) {
		throw new Error("A valid UUID is required")
	}
	return normalized
}

export function buildDeleteChange(uuid: string): { type: "delete"; key: string } {
	return {
		type: "delete",
		key: normalizeUuid(uuid),
	}
}

export function requireSingleSettingPage(
	uuid: string,
	rows: SettingPageRef[],
): SettingPageRef {
	const normalizedUuid = normalizeUuid(uuid)
	const matches = rows.filter((row) => row.uuid === normalizedUuid)
	if (matches.length !== 1) {
		throw new Error(
			`Expected exactly one setting for UUID ${normalizedUuid}, found ${matches.length}`,
		)
	}
	return matches[0]
}

export function buildSettingsQueryFilter(
	query: SettingsQuery,
): { and: TextFilter[] } | TextFilter | undefined {
	const filters: TextFilter[] = []

	if (query.uuid) {
		filters.push({
			property: "UUID",
			rich_text: { equals: normalizeUuid(query.uuid) },
		})
	}
	if (query.title?.trim()) {
		filters.push({ property: "이름", title: { contains: query.title.trim() } })
	}
	const leadingSelectProperties: Array<[
		"world" | "category" | "subcategory" | "importance",
		string,
	]> = [
		["world", "세계"],
		["category", "카테고리"],
		["subcategory", "서브카테고리"],
		["importance", "중요도"],
	]

	for (const [key, property] of leadingSelectProperties) {
		const value = query[key]
		if (typeof value === "string" && value.trim()) {
			filters.push({ property, select: { equals: value.trim() } })
		}
	}
	if (query.tag?.trim()) {
		filters.push({ property: "태그", multi_select: { contains: query.tag.trim() } })
	}
	if (typeof query.isPublic === "boolean") {
		filters.push({ property: "공개 여부", checkbox: { equals: query.isPublic } })
	}
	for (const [key, property] of [["region", "영역"], ["status", "상태"]] as const) {
		const value = query[key]
		if (typeof value === "string" && value.trim()) {
			filters.push({ property, select: { equals: value.trim() } })
		}
	}

	if (filters.length === 0) return undefined
	if (filters.length === 1) return filters[0]
	return { and: filters }
}
