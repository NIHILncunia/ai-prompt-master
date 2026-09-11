export const WORLD_OPTIONS = ["공통", "룩스테라", "엘드로스"] as const
export const IMPORTANCE_OPTIONS = ["일반", "주요", "핵심"] as const
export const STATUS_OPTIONS = ["시작 전", "초안", "진행 중", "완료"] as const

export const CATEGORY_OPTIONS = [
	"개념", "신격", "국가", "도시", "단체", "종족", "인물",
	"아이템", "사건", "설화", "지형지물", "용종", "클래스",
] as const

export const SUBCATEGORY_OPTIONS = [
	"주요 개념", "보조 개념",
	"정령성 신위", "용성 신위",
	"왕국", "제국", "공화국", "연맹", "연방", "막부",
	"도시국가", "항구 도시",
	"길드", "클랜", "부족", "부족국가", "교단", "문파", "결사", "범죄조직", "의회", "연합체",
	"인류", "유사인류", "비인류",
	"주요 인물", "보조 인물", "엑스트라 인물", "단역 인물",
	"무기", "방어구", "의상", "장신구", "도구", "소비품", "재료", "보석·결정체", "마법 도구", "유물·성물", "장치", "문서·기록물", "열쇠·증표", "운송·보관품", "생활용품", "특수 아이템",
	"전쟁·분쟁", "재난", "정치 변동", "건국·창설", "멸망·붕괴", "발견·탐사", "변칙 현상", "의식·현현",
	"민담", "소문", "전승", "신화",
	"대륙", "지역", "장소", "건물", "구조물", "자연 지형", "수계·해양", "특수 지형",
	"조룡종", "비룡종", "수룡종", "해룡종", "아룡종", "어룡종", "사룡종", "익룡종", "초식종", "아수종", "양서종", "갑각종", "갑충종", "협각종", "두족종", "식생종",
	"기본 클래스", "서브클래스",
] as const

// Temporary compatibility exports for Task 5 callers. New v2 code must use SUBCATEGORY_OPTIONS.
export const CURRENT_SUBCATEGORY_OPTIONS = SUBCATEGORY_OPTIONS
export const WORLD_SUBCATEGORY_OPTIONS = [
	"용종 - 조룡종", "용종 - 비룡종", "용종 - 수룡종", "용종 - 해룡종",
	"용종 - 아룡종", "용종 - 어룡종", "용종 - 사룡종", "용종 - 익룡종",
	"용종 - 초식종", "용종 - 아수종", "용종 - 양서종", "용종 - 갑각종",
	"용종 - 갑충종", "용종 - 협각종", "용종 - 두족종", "용종 - 식생종",
	"클래스 - 기본 클래스", "클래스 - 서브클래스",
] as const

export const REGION_OPTIONS = [
	"범대륙", "에리디안", "라크샤라", "발가르", "칼디라", "카르코사",
	"네베아", "청연", "실란도르", "녹턴", "진홍의 해협", "심연의 의회", "엘드로스",
] as const

export const TAG_OPTIONS = [
	"헌터", "오퍼레이터",
	"고룡종", "재해룡종", "원종", "아종", "변종", "용성",
	"숲", "정글", "평원", "황야", "사막", "설원", "빙원", "습지", "늪지",
	"산", "산맥", "고원", "분지", "화산", "협곡", "절벽", "동굴", "지하",
	"강", "호수", "내해", "해협", "해안", "군도", "수중",
	"오염지대", "봉인지대", "변칙지형", "성역", "유적", "던전",
] as const

const CATEGORY_SET = new Set<string>(CATEGORY_OPTIONS)
const SUBCATEGORY_SET = new Set<string>(SUBCATEGORY_OPTIONS)
const COUNTRY_SUBCATEGORIES = new Set(["왕국", "제국", "공화국", "연맹", "연방", "막부"])
const GROUP_SUBCATEGORIES = new Set(["길드", "클랜", "부족", "부족국가", "교단", "문파", "결사", "범죄조직", "의회", "연합체"])
const RACE_SUBCATEGORIES = new Set(["인류", "유사인류", "비인류"])
const PERSON_SUBCATEGORIES = new Set(["주요 인물", "보조 인물", "엑스트라 인물", "단역 인물"])
const ITEM_SUBCATEGORIES = new Set(["무기", "방어구", "의상", "장신구", "도구", "소비품", "재료", "보석·결정체", "마법 도구", "유물·성물", "장치", "문서·기록물", "열쇠·증표", "운송·보관품", "생활용품", "특수 아이템"])
const EVENT_SUBCATEGORIES = new Set(["전쟁·분쟁", "재난", "정치 변동", "건국·창설", "멸망·붕괴", "발견·탐사", "변칙 현상", "의식·현현"])
const TALE_SUBCATEGORIES = new Set(["민담", "소문", "전승", "신화"])
const DRAGON_SUBCATEGORIES = new Set(["조룡종", "비룡종", "수룡종", "해룡종", "아룡종", "어룡종", "사룡종", "익룡종", "초식종", "아수종", "양서종", "갑각종", "갑충종", "협각종", "두족종", "식생종"])
const TERRAIN_LAND = new Set(["숲", "정글", "평원", "황야", "사막", "설원", "빙원", "습지", "늪지", "산", "산맥", "고원", "분지", "화산", "협곡", "절벽", "동굴", "지하"])
const TERRAIN_WATER = new Set(["강", "호수", "내해", "해협", "해안", "군도", "수중"])
const TERRAIN_SPECIAL = new Set(["오염지대", "봉인지대", "변칙지형"])

export type LegacyCategoryInput = {
	type?: string
	subtype?: string
}

export type SettingCategory = {
	category: string
	subcategory: string
	tags: string[]
	importance: (typeof IMPORTANCE_OPTIONS)[number]
}

function result(category: string, subcategory = "", tags: string[] = [], importance: SettingCategory["importance"] = "일반"): SettingCategory {
	return { category, subcategory, tags: [...new Set(tags)], importance }
}

export function mapLegacySettingCategory(input: LegacyCategoryInput): SettingCategory {
	const type = input.type?.trim() ?? ""
	const subtype = input.subtype?.trim() ?? ""

	if (type === "주요 개념") return result("개념", "주요 개념")
	if (type === "도시국가") return result("도시", subtype === "항구" ? "항구 도시" : "도시국가")
	if (type === "부족국가") return result("단체", "부족국가")

	const category = type === "지형" ? "지형지물" : CATEGORY_SET.has(type) ? type : ""
	if (!category) return result("")
	if (!subtype || subtype === "일반") return result(category)

	if (category === "개념") {
		if (subtype === "주요") return result(category, "주요 개념")
		if (subtype === "보조") return result(category, "보조 개념")
	}
	if (category === "국가") {
		if (COUNTRY_SUBCATEGORIES.has(subtype)) return result(category, subtype)
		if (subtype === "주요") return result(category, "", [], "주요")
		return result(category)
	}
	if (category === "도시") {
		if (subtype === "항구") return result(category, "항구 도시")
		if (subtype === "도시국가") return result(category, "도시국가")
		if (subtype === "주요") return result(category, "", [], "주요")
	}
	if (category === "단체") {
		if (GROUP_SUBCATEGORIES.has(subtype)) return result(category, subtype)
		if (subtype === "주요") return result(category, "", [], "주요")
	}
	if (category === "종족") {
		if (RACE_SUBCATEGORIES.has(subtype)) return result(category, subtype)
		// Legacy subtype "용종" is a broad race marker, not a v2 dragon-dex lineage.
		return result(category)
	}
	if (category === "인물") {
		if (subtype === "주요") return result(category, "주요 인물")
		if (PERSON_SUBCATEGORIES.has(subtype)) return result(category, subtype)
		const tags: string[] = []
		if (subtype === "헌터" || subtype === "헌터/오퍼레이터") tags.push("헌터")
		if (subtype === "오퍼레이터" || subtype === "헌터/오퍼레이터") tags.push("오퍼레이터")
		return result(category, "", tags)
	}
	if (category === "아이템") {
		if (ITEM_SUBCATEGORIES.has(subtype)) return result(category, subtype)
		if (subtype === "기기") return result(category, "장치")
		if (subtype === "주요") return result(category, "", [], "주요")
	}
	if (category === "사건") {
		if (EVENT_SUBCATEGORIES.has(subtype)) return result(category, subtype)
		if (subtype === "주요") return result(category, "", [], "주요")
	}
	if (category === "설화") {
		if (TALE_SUBCATEGORIES.has(subtype)) return result(category, subtype)
		if (subtype === "주요") return result(category, "", [], "주요")
	}
	if (category === "지형지물") {
		if (subtype === "대륙") return result(category, "대륙")
		if (["지역", "장소", "건물", "구조물", "자연 지형", "수계·해양", "특수 지형"].includes(subtype)) return result(category, subtype)
		if (TERRAIN_LAND.has(subtype)) return result(category, "자연 지형", [subtype])
		if (TERRAIN_WATER.has(subtype)) return result(category, "수계·해양", [subtype])
		if (TERRAIN_SPECIAL.has(subtype)) return result(category, "특수 지형", [subtype])
	}
	if (category === "용종" && DRAGON_SUBCATEGORIES.has(subtype)) return result(category, subtype)
	if (category === "클래스" && (subtype === "기본 클래스" || subtype === "서브클래스")) return result(category, subtype)

	if (SUBCATEGORY_SET.has(subtype)) return result(category, subtype)
	return result(category)
}
