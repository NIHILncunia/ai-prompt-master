import {
	CATEGORY_OPTIONS,
	REGION_OPTIONS,
	STATUS_OPTIONS,
	SUBCATEGORY_OPTIONS,
	mapLegacySettingCategory,
} from "./settings-categories.js"
import type { SettingMeta } from "./settings-drive.js"

export type SettingWorld = "공통" | "룩스테라" | "엘드로스"
export type SettingImportance = "일반" | "주요" | "핵심"
export type SettingStatus = "시작 전" | "초안" | "진행 중" | "완료"

export type NormalizedSettingDocument = {
	world: SettingWorld
	category: string
	subcategory: string
	importance: SettingImportance
	tags: string[]
	isPublic: boolean
	status: SettingStatus
	region: string
}

export type SettingDocumentNormalization =
	| NormalizedSettingDocument
	| { skip: true }
	| { unresolved: string[] }

const EXCLUDED_ROLES = new Set([
	"인덱스",
	"라이브러리",
	"세력 관계",
	"스토리 설계",
	"설정 정비",
	"템플릿",
	"docs",
])

const DRAGON_LINEAGES = [
	"조룡종", "비룡종", "수룡종", "해룡종", "아룡종", "어룡종", "사룡종", "익룡종",
	"초식종", "아수종", "양서종", "갑각종", "갑충종", "협각종", "두족종", "식생종",
] as const

const BLACK_DRAGON_DEITY_UUID = "3812916f-d6aa-4063-b656-a4c253d32b57"

function pathSegments(relativePath: string): string[] {
	return relativePath.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "").split("/").filter(Boolean)
}

export function classifySettingRepositoryPath(relativePath: string):
	| { skip: true }
	| { world: SettingWorld; role: "설정" | "신격" | "비밀 설정" | "용종 도감" } {
	const segments = pathSegments(relativePath)
	if (segments.join("/") === "룩스테라/비밀 설정/비밀 설정.md") return { skip: true }
	const root = segments[0]
	const role = segments[1]
	const world: SettingWorld | undefined = root === "위그드라실"
		? "공통"
		: root === "룩스테라" || root === "엘드로스"
			? root
			: undefined

	if (!world || !role) return { skip: true }
	if (segments.slice(1).some((segment) => EXCLUDED_ROLES.has(segment))) return { skip: true }
	if (root === "룩스테라" && role === "용종 도감") return { world, role }
	if (role === "설정" || role === "신격" || role === "비밀 설정") return { world, role }
	return { skip: true }
}

function inferDragonLineage(body: string): string[] {
	const found: string[] = []
	for (const lineage of DRAGON_LINEAGES) {
		const escaped = lineage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
		const patterns = [
			new RegExp(`\\[\\[용종#${escaped}(?:\\|${escaped})?\\]\\]`),
			new RegExp(`원종\\s+${escaped}(?:이다|로|으로|에|\\b)`),
			new RegExp(`${escaped}(?:으로|로)\\s*분류`),
		]
		if (patterns.some((pattern) => pattern.test(body))) found.push(lineage)
	}
	return [...new Set(found)]
}

function normalizeRegion(region: string): string {
	if (region === "라크샤라 대륙") return "라크샤라"
	return region
}

function secretCategory(secretType: string): { category: string; subcategory: string } | null {
	switch (secretType) {
		case "개념": return { category: "개념", subcategory: "" }
		case "인물": return { category: "인물", subcategory: "" }
		case "장소": return { category: "지형지물", subcategory: "장소" }
		case "물건": return { category: "아이템", subcategory: "" }
		case "사건": return { category: "사건", subcategory: "" }
		default: return null
	}
}

export function normalizeSettingDocument(input: {
	relativePath: string
	meta: SettingMeta
	body: string
}): SettingDocumentNormalization {
	const pathInfo = classifySettingRepositoryPath(input.relativePath)
	if ("skip" in pathInfo) return pathInfo

	const status = input.meta.status?.trim() ?? ""
	if (!STATUS_OPTIONS.includes(status as (typeof STATUS_OPTIONS)[number])) {
		return { unresolved: [`상태가 허용값 밖에 있음: ${status || "(빈값)"}`] }
	}

	const region = normalizeRegion(input.meta.region?.trim() ?? "")
	if (region && !REGION_OPTIONS.includes(region as (typeof REGION_OPTIONS)[number])) {
		return { unresolved: [`영역이 허용값 밖에 있음: ${region}`] }
	}

	let category = ""
	let subcategory = ""
	let importance: SettingImportance = "일반"
	let tags: string[] = []
	const isPublic = pathInfo.role !== "비밀 설정" && input.meta.docType !== "secret_setting"

	if (pathInfo.role === "비밀 설정" || input.meta.docType === "secret_setting") {
		const secretType = input.meta.secret_type?.trim() ?? ""
		const mapped = secretCategory(secretType)
		if (!mapped) return { unresolved: [`비밀 설정 secret_type으로 카테고리 판정 불가: ${secretType || "(빈값)"}`] }
		category = mapped.category
		subcategory = mapped.subcategory
	} else if (pathInfo.role === "신격" || input.meta.docType === "deity") {
		category = "신격"
		subcategory = input.meta.uuid?.trim().toLowerCase() === BLACK_DRAGON_DEITY_UUID ? "용성 신위" : "정령성 신위"
	} else if (pathInfo.role === "용종 도감") {
		category = "용종"
		const candidates = inferDragonLineage(input.body)
		if (candidates.length === 0) return { unresolved: ["용종 도감의 명시적 계통 판정 근거 없음"] }
		if (candidates.length > 1) return { unresolved: [`용종 도감의 계통 판정 충돌: ${candidates.join(", ")}`] }
		subcategory = candidates[0]
	} else if (pathInfo.world === "엘드로스" && pathSegments(input.relativePath).slice(0, 3).join("/") === "엘드로스/설정/클래스") {
		category = "클래스"
		subcategory = "기본 클래스"
	} else {
		const mapped = mapLegacySettingCategory({ type: input.meta.type, subtype: input.meta.subtype })
		category = mapped.category
		subcategory = mapped.subcategory
		importance = mapped.importance
		tags = mapped.tags
	}

	if (!category || !CATEGORY_OPTIONS.includes(category as (typeof CATEGORY_OPTIONS)[number])) {
		return { unresolved: [`카테고리 판정 불가: type=${input.meta.type?.trim() || "(빈값)"}, subtype=${input.meta.subtype?.trim() || "(빈값)"}`] }
	}
	if (subcategory && !SUBCATEGORY_OPTIONS.includes(subcategory as (typeof SUBCATEGORY_OPTIONS)[number])) {
		return { unresolved: [`서브카테고리 값이 83개 동결 목록 밖에 있음: ${subcategory}`] }
	}

	return {
		world: pathInfo.world,
		category,
		subcategory,
		importance,
		tags: [...new Set(tags)],
		isPublic,
		status: status as SettingStatus,
		region,
	}
}
