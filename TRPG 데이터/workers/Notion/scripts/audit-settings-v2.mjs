#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export const MAIN_CATEGORIES = [
  '개념', '신격', '국가', '도시', '단체', '종족', '인물', '아이템', '사건', '설화', '지형지물', '용종', '클래스',
]

export const SUBCATEGORY_OPTIONS = [
  '주요 개념', '보조 개념',
  '정령성 신위', '용성 신위',
  '왕국', '제국', '공화국', '연맹', '연방', '막부',
  '도시국가', '항구 도시',
  '길드', '클랜', '부족', '부족국가', '교단', '문파', '결사', '범죄조직', '의회', '연합체',
  '인류', '유사인류', '비인류',
  '주요 인물', '보조 인물', '엑스트라 인물', '단역 인물',
  '무기', '방어구', '의상', '장신구', '도구', '소비품', '재료', '보석·결정체', '마법 도구', '유물·성물', '장치', '문서·기록물', '열쇠·증표', '운송·보관품', '생활용품', '특수 아이템',
  '전쟁·분쟁', '재난', '정치 변동', '건국·창설', '멸망·붕괴', '발견·탐사', '변칙 현상', '의식·현현',
  '민담', '소문', '전승', '신화',
  '대륙', '지역', '장소', '건물', '구조물', '자연 지형', '수계·해양', '특수 지형',
  '조룡종', '비룡종', '수룡종', '해룡종', '아룡종', '어룡종', '사룡종', '익룡종', '초식종', '아수종', '양서종', '갑각종', '갑충종', '협각종', '두족종', '식생종',
  '기본 클래스', '서브클래스',
]

export const STATUS_OPTIONS = ['시작 전', '초안', '진행 중', '완료']
export const IMPORTANCE_OPTIONS = ['일반', '주요', '핵심']
export const WORLD_OPTIONS = ['공통', '룩스테라', '엘드로스']

const DRAGON_LINEAGES = [
  '조룡종', '비룡종', '수룡종', '해룡종', '아룡종', '어룡종', '사룡종', '익룡종', '초식종', '아수종', '양서종', '갑각종', '갑충종', '협각종', '두족종', '식생종',
]

const LAND_TERRAIN_TAGS = new Set([
  '숲', '정글', '평원', '황야', '사막', '설원', '빙원', '습지', '늪지', '산', '산맥', '고원', '분지', '화산', '협곡', '절벽', '동굴', '지하',
])
const WATER_TERRAIN_TAGS = new Set(['강', '호수', '내해', '해협', '해안', '군도', '수중'])
const SPECIAL_TERRAIN_TAGS = new Set(['오염지대', '봉인지대', '변칙지형'])

const COUNTRY_SUBCATEGORIES = new Set(['왕국', '제국', '공화국', '연맹', '연방', '막부'])
const GROUP_SUBCATEGORIES = new Set(['길드', '클랜', '부족', '부족국가', '교단', '문파', '결사', '범죄조직', '의회', '연합체'])
const RACE_SUBCATEGORIES = new Set(['인류', '유사인류', '비인류'])
const PERSON_SUBCATEGORIES = new Set(['주요 인물', '보조 인물', '엑스트라 인물', '단역 인물'])
const ITEM_SUBCATEGORIES = new Set(['무기', '방어구', '의상', '장신구', '도구', '소비품', '재료', '보석·결정체', '마법 도구', '유물·성물', '장치', '문서·기록물', '열쇠·증표', '운송·보관품', '생활용품', '특수 아이템'])
const EVENT_SUBCATEGORIES = new Set(['전쟁·분쟁', '재난', '정치 변동', '건국·창설', '멸망·붕괴', '발견·탐사', '변칙 현상', '의식·현현'])
const TALE_SUBCATEGORIES = new Set(['민담', '소문', '전승', '신화'])
const EXCLUDED_SEGMENTS = new Set(['인덱스', '라이브러리', '세력 관계', '스토리 설계', '설정 정비', '템플릿', 'docs'])
const BLACK_DRAGON_DEITY_UUID = '3812916f-d6aa-4063-b656-a4c253d32b57'
const AUDIT_REPORT_UUID = '48b1dcb5-4a36-4969-a52b-15d06802f3d7'

function koreanDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(date)
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${byType.year}년 ${Number(byType.month)}월 ${Number(byType.day)}일`
}

function unquote(value) {
  const trimmed = String(value ?? '').trim()
  if (trimmed.length >= 2) {
    const first = trimmed[0]
    const last = trimmed[trimmed.length - 1]
    if ((first === "'" && last === "'") || (first === '"' && last === '"')) {
      return trimmed.slice(1, -1)
    }
  }
  return trimmed
}

export function parseFrontmatter(source) {
  const normalized = String(source ?? '').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  if (!normalized.startsWith('---\n')) return { meta: {}, body: normalized.trim() }
  const end = normalized.indexOf('\n---\n', 4)
  if (end < 0) return { meta: {}, body: normalized.trim() }

  const raw = normalized.slice(4, end)
  const meta = {}
  for (const line of raw.split('\n')) {
    const match = line.match(/^([^:#][^:]*):\s*(.*)$/)
    if (!match) continue
    meta[match[1].trim()] = unquote(match[2])
  }
  return { meta, body: normalized.slice(end + 5).trim() }
}

export function classifyRepositoryPath(relativePath) {
  const normalized = String(relativePath ?? '').replaceAll('\\', '/').replace(/^\/+|\/+$/g, '')
  const segments = normalized.split('/').filter(Boolean)
  const worldSegment = segments[0]
  const role = segments[1]
  const world = worldSegment === '위그드라실' ? '공통' : WORLD_OPTIONS.includes(worldSegment) ? worldSegment : ''

  if (!world) return { included: false, reason: '지원하지 않는 세계 루트' }
  if (!role) return { included: false, reason: '문서군 경로 없음' }
  if (segments.slice(1).some((segment) => EXCLUDED_SEGMENTS.has(segment))) {
    return { included: false, reason: `제외 문서군: ${segments.slice(1).find((segment) => EXCLUDED_SEGMENTS.has(segment))}` }
  }
  if (worldSegment === '룩스테라' && role === '용종 도감') {
    return { included: true, world, role }
  }
  if (role === '설정' || role === '신격' || role === '비밀 설정') {
    return { included: true, world, role }
  }
  return { included: false, reason: `문서 테이블 비대상 문서군: ${role}` }
}

function inferDragonLineage(body) {
  const text = String(body ?? '')
  const found = []
  for (const lineage of DRAGON_LINEAGES) {
    const escaped = lineage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const patterns = [
      new RegExp(`\\[\\[용종#${escaped}(?:\\|${escaped})?\\]\\]`),
      new RegExp(`원종\\s+${escaped}(?:이다|로|으로|에)`),
      new RegExp(`${escaped}(?:으로|로)\\s*분류`),
    ]
    if (patterns.some((pattern) => pattern.test(text))) found.push(lineage)
  }
  return [...new Set(found)]
}

function normalizeLegacyType(type, subtype, body, relativePath) {
  let category = ''
  let subcategory = ''
  let importance = '일반'
  const tags = []
  const notes = []

  switch (type) {
    case '개념':
      category = '개념'
      if (subtype === '주요' || subtype === '주요 개념') subcategory = '주요 개념'
      else if (subtype === '보조' || subtype === '보조 개념') subcategory = '보조 개념'
      break
    case '주요 개념':
      category = '개념'
      subcategory = '주요 개념'
      break
    case '신격':
      category = '신격'
      subcategory = subtype === '용성 신위' ? '용성 신위' : '정령성 신위'
      break
    case '국가':
      category = '국가'
      if (COUNTRY_SUBCATEGORIES.has(subtype)) subcategory = subtype
      else if (subtype === '주요') importance = '주요'
      else if (subtype && subtype !== '일반') notes.push(`국가 legacy subtype '${subtype}'는 v2 서브카테고리로 자동 이관하지 않음`)
      break
    case '도시':
      category = '도시'
      if (subtype === '도시국가') subcategory = '도시국가'
      else if (subtype === '항구' || subtype === '항구 도시') subcategory = '항구 도시'
      else if (subtype === '주요') importance = '주요'
      break
    case '도시국가':
      category = '도시'
      subcategory = subtype === '항구' || subtype === '항구 도시' ? '항구 도시' : '도시국가'
      break
    case '단체':
      category = '단체'
      if (GROUP_SUBCATEGORIES.has(subtype)) subcategory = subtype
      else if (subtype === '주요') importance = '주요'
      break
    case '부족국가':
      category = '단체'
      subcategory = '부족국가'
      break
    case '종족':
      category = '종족'
      if (RACE_SUBCATEGORIES.has(subtype)) subcategory = subtype
      else if (subtype && subtype !== '일반' && subtype !== '용종') notes.push(`종족 legacy subtype '${subtype}'는 v2 서브카테고리로 자동 이관하지 않음`)
      break
    case '인물':
      category = '인물'
      if (subtype === '주요') subcategory = '주요 인물'
      else if (PERSON_SUBCATEGORIES.has(subtype)) subcategory = subtype
      if (subtype === '헌터' || subtype === '헌터/오퍼레이터') tags.push('헌터')
      if (subtype === '오퍼레이터' || subtype === '헌터/오퍼레이터') tags.push('오퍼레이터')
      break
    case '아이템':
      category = '아이템'
      if (ITEM_SUBCATEGORIES.has(subtype)) subcategory = subtype
      else if (subtype === '기기') subcategory = '장치'
      else if (subtype === '주요') importance = '주요'
      break
    case '사건':
      category = '사건'
      if (EVENT_SUBCATEGORIES.has(subtype)) subcategory = subtype
      else if (subtype === '주요') importance = '주요'
      break
    case '설화':
      category = '설화'
      if (TALE_SUBCATEGORIES.has(subtype)) subcategory = subtype
      else if (subtype === '주요') importance = '주요'
      break
    case '지형':
    case '지형지물':
      category = '지형지물'
      if (subtype === '대륙') subcategory = '대륙'
      else if (['지역', '장소', '건물', '구조물', '자연 지형', '수계·해양', '특수 지형'].includes(subtype)) subcategory = subtype
      else if (LAND_TERRAIN_TAGS.has(subtype)) { subcategory = '자연 지형'; tags.push(subtype) }
      else if (WATER_TERRAIN_TAGS.has(subtype)) { subcategory = '수계·해양'; tags.push(subtype) }
      else if (SPECIAL_TERRAIN_TAGS.has(subtype)) { subcategory = '특수 지형'; tags.push(subtype) }
      break
    case '장소':
      category = '지형지물'; subcategory = '장소'; break
    case '지역':
      category = '지형지물'; subcategory = '지역'; break
    case '건물':
      category = '지형지물'; subcategory = '건물'; break
    case '구조물':
      category = '지형지물'; subcategory = '구조물'; break
    case '클래스':
      category = '클래스'
      subcategory = relativePath.includes('/설정/클래스/') || /\|\s*상위 클래스\s*\|\s*기본 클래스\s*\|/.test(body) ? '기본 클래스' : ''
      break
    case '용종':
      category = '용종'
      break
    default:
      break
  }

  return { category, subcategory, importance, tags: [...new Set(tags)], notes }
}

export function normalizeAuditRow({ relativePath, meta = {}, body = '' }) {
  const pathInfo = classifyRepositoryPath(relativePath)
  if (!pathInfo.included) {
    return {
      decision: 'excluded', relativePath, title: meta.title || meta['이름'] || path.basename(relativePath, '.md'), uuid: meta.uuid || '', docType: String(meta.docType || '').trim(),
      world: '', category: '', subcategory: '', importance: '', tags: [], public: '', status: meta.status || '', region: meta.region || '',
      issues: [], normalizationNotes: [], excludedReason: pathInfo.reason || '제외',
    }
  }

  const issues = []
  const normalizationNotes = []
  const title = String(meta.title || meta['이름'] || '').trim()
  const uuid = String(meta.uuid || '').trim().toLowerCase()
  const status = String(meta.status || '').trim()
  const type = String(meta.type || '').trim()
  const subtype = String(meta.subtype || '').trim()
  let region = String(meta.region || '').trim()
  const isSecret = pathInfo.role === '비밀 설정' || meta.docType === 'secret_setting'
  const isDeity = pathInfo.role === '신격' || meta.docType === 'deity'

  if (!title) {
    issues.push('포함 문서인데 제목을 title/이름에서 얻을 수 없음')
    normalizationNotes.push('title 또는 이름 메타데이터 보강 필요')
  } else if (!meta.title && meta['이름']) {
    normalizationNotes.push('title 대신 이름 사용: title 정상화 필요')
  }
  if (!uuid) {
    issues.push('포함 문서인데 UUID가 없음')
    normalizationNotes.push('UUID 생성 필요')
  }
  if (!meta.docType) normalizationNotes.push('docType 정상화 필요')
  if (!pathInfo.world) issues.push('세계 판정 불가')
  if (!STATUS_OPTIONS.includes(status)) issues.push(`상태가 허용값 밖에 있음: ${status || '(빈값)'}`)
  if (region === '라크샤라 대륙') {
    region = '라크샤라'
    normalizationNotes.push('영역 라크샤라 대륙 → 라크샤라 정규화')
  }

  let category = ''
  let subcategory = ''
  let importance = '일반'
  let tags = []
  const mappingNotes = []

  if (isSecret) {
    const secretType = String(meta.secret_type || '').trim()
    switch (secretType) {
      case '개념': category = '개념'; break
      case '인물': category = '인물'; break
      case '장소': category = '지형지물'; subcategory = '장소'; break
      case '물건': category = '아이템'; break
      case '사건': category = '사건'; break
      default:
        issues.push(`비밀 설정 secret_type으로 카테고리 판정 불가: ${secretType || '(빈값)'}`)
        break
    }
  } else if (isDeity) {
    category = '신격'
    subcategory = uuid === BLACK_DRAGON_DEITY_UUID ? '용성 신위' : '정령성 신위'
  } else if (pathInfo.role === '용종 도감') {
    category = '용종'
    const candidates = inferDragonLineage(body)
    if (candidates.length === 1) subcategory = candidates[0]
    else if (candidates.length === 0) issues.push('용종 도감의 명시적 계통 판정 근거 없음')
    else issues.push(`용종 도감의 계통 판정 충돌: ${candidates.join(', ')}`)
  } else {
    const mapped = normalizeLegacyType(type, subtype, body, relativePath)
    category = mapped.category
    subcategory = mapped.subcategory
    importance = mapped.importance
    tags = mapped.tags
    mappingNotes.push(...mapped.notes)
  }

  normalizationNotes.push(...mappingNotes)
  if (!category) issues.push(`카테고리 판정 불가: type=${type || '(빈값)'}, subtype=${subtype || '(빈값)'}`)
  if (category && !MAIN_CATEGORIES.includes(category)) issues.push(`카테고리가 동결 목록 밖에 있음: ${category}`)
  if (subcategory && !SUBCATEGORY_OPTIONS.includes(subcategory)) issues.push(`서브카테고리 값이 83개 동결 목록 밖에 있음: ${subcategory}`)
  if (!IMPORTANCE_OPTIONS.includes(importance)) issues.push(`중요도가 허용값 밖에 있음: ${importance}`)
  if (importance === '핵심') issues.push('핵심 중요도는 자동 부여할 수 없음')

  return {
    decision: issues.length ? 'unresolved' : 'included',
    relativePath,
    title,
    uuid,
    docType: String(meta.docType || '').trim(),
    world: pathInfo.world,
    category,
    subcategory,
    importance,
    tags: [...new Set(tags)],
    public: !isSecret,
    status,
    region,
    issues,
    normalizationNotes: [...new Set(normalizationNotes)],
    excludedReason: '',
  }
}

function mdCell(value) {
  const text = Array.isArray(value) ? value.join(', ') : String(value ?? '')
  return text.replaceAll('|', '\\|').replaceAll('\n', '<br>') || '—'
}

export function renderAuditMarkdown(rows, summary) {
  const included = rows.filter((row) => row.decision === 'included')
  const unresolved = rows.filter((row) => row.decision === 'unresolved')
  const excluded = rows.filter((row) => row.decision === 'excluded')
  const normalization = rows.filter((row) => row.normalizationNotes?.length || (row.decision === 'unresolved' && row.issues?.some((issue) => /UUID|제목/.test(issue))))

  const lines = [
    '---',
    "title: '문서 분류 매핑 v2'",
    `uuid: '${AUDIT_REPORT_UUID}'`,
    "docType: 'maintenance'",
    "thumbnail: ''",
    "status: '진행 중'",
    "scope: 'Notion 통합 설정 문서 스키마 v2 적용 전 정식 설정 문서의 포함·제외 및 분류 매핑 감사'",
    "created_at: '2026년 9월 12일'",
    `updated_at: '${koreanDate()}'`,
    "completed_at: ''",
    '---',
    '',
    '# 문서 분류 매핑 v2',
    '',
    '> Notion 통합 설정 문서 스키마 v2 적용 전 정본 감사 결과다. 자동 추론이 금지된 항목은 `unresolved`로 유지한다.',
    '',
    '## 요약',
    '',
    '| 항목 | 수량 |',
    '| --- | ---: |',
    `| 전체 Markdown 스캔 | ${summary.scanned ?? rows.length} |`,
    `| 포함 확정 | ${summary.included ?? included.length} |`,
    `| 미확정·오류 | ${summary.unresolved ?? unresolved.length} |`,
    `| 제외 | ${summary.excluded ?? excluded.length} |`,
    `| 치명 오류 항목 | ${summary.fatalIssues ?? unresolved.reduce((n, row) => n + row.issues.length, 0)} |`,
    '',
    '## docType 점검',
    '',
    '| docType | 전체 | 포함 확정 | 미확정·오류 | 제외 |',
    '| --- | ---: | ---: | ---: | ---: |',
  ]

  const docTypeCounts = new Map()
  for (const row of rows) {
    const key = row.docType || '(없음)'
    const current = docTypeCounts.get(key) || { total: 0, included: 0, unresolved: 0, excluded: 0 }
    current.total += 1
    current[row.decision] += 1
    docTypeCounts.set(key, current)
  }
  for (const key of [...docTypeCounts.keys()].sort((a, b) => a.localeCompare(b, 'ko'))) {
    const counts = docTypeCounts.get(key)
    lines.push(`| ${mdCell(key)} | ${counts.total} | ${counts.included} | ${counts.unresolved} | ${counts.excluded} |`)
  }
  lines.push(
    '',
    '## 판정 원칙',
    '',
    '- 세계는 경로의 최상위 `위그드라실 / 룩스테라 / 엘드로스`를 각각 `공통 / 룩스테라 / 엘드로스`로 변환한다.',
    '- `설정`, `신격`, `비밀 설정`, 룩스테라 `용종 도감`만 문서 테이블 대상으로 본다.',
    '- `설정 정비`, `인덱스`, `라이브러리`, `세력 관계`, `스토리 설계`, `템플릿`, `docs`는 제외한다.',
    '- 용종 계통은 본문에 명시된 계통 링크 또는 분류 표현 하나가 확인될 때만 자동 입력한다.',
    '- 중요도 `핵심`은 자동 부여하지 않는다.',
    '',
    '## 원본 정상화 필요',
    '',
  )

  if (normalization.length === 0) {
    lines.push('없음', '')
  } else {
    lines.push('| 경로 | 제목 | UUID | 정상화 사항 |', '| --- | --- | --- | --- |')
    for (const row of normalization) {
      const notes = [...(row.normalizationNotes || [])]
      for (const issue of row.issues || []) if (/UUID|제목/.test(issue) && !notes.includes(issue)) notes.push(issue)
      lines.push(`| ${mdCell(row.relativePath)} | ${mdCell(row.title)} | ${mdCell(row.uuid)} | ${mdCell(notes)} |`)
    }
    lines.push('')
  }

  lines.push('## 미확정·오류', '')
  if (unresolved.length === 0) {
    lines.push('없음', '')
  } else {
    lines.push('| 경로 | 제목 | 세계 | 카테고리 | 서브카테고리 | 문제 |', '| --- | --- | --- | --- | --- | --- |')
    for (const row of unresolved) {
      lines.push(`| ${mdCell(row.relativePath)} | ${mdCell(row.title)} | ${mdCell(row.world)} | ${mdCell(row.category)} | ${mdCell(row.subcategory)} | ${mdCell(row.issues)} |`)
    }
    lines.push('')
  }

  lines.push('## 포함 문서 매핑', '')
  lines.push('| 경로 | 제목 | UUID | 세계 | 카테고리 | 서브카테고리 | 중요도 | 태그 | 공개 여부 | 상태 | 영역 | 비고 |', '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |')
  for (const row of included) {
    lines.push(`| ${mdCell(row.relativePath)} | ${mdCell(row.title)} | ${mdCell(row.uuid)} | ${mdCell(row.world)} | ${mdCell(row.category)} | ${mdCell(row.subcategory)} | ${mdCell(row.importance)} | ${mdCell(row.tags)} | ${row.public ? '공개' : '비공개'} | ${mdCell(row.status)} | ${mdCell(row.region)} | ${mdCell(row.normalizationNotes)} |`)
  }
  lines.push('')

  lines.push('## 제외 문서', '')
  lines.push('| 경로 | 제외 사유 |', '| --- | --- |')
  for (const row of excluded) lines.push(`| ${mdCell(row.relativePath)} | ${mdCell(row.excludedReason)} |`)
  lines.push('')

  return `${lines.join('\n').trimEnd()}\n`
}

function walkMarkdown(root) {
  const files = []
  const stack = [root]
  while (stack.length) {
    const current = stack.pop()
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name === '.git') continue
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) stack.push(full)
      else if (entry.isFile() && entry.name.endsWith('.md')) files.push(full)
    }
  }
  return files.sort((a, b) => a.localeCompare(b, 'ko'))
}

function parseArgs(argv) {
  const args = { root: '', markdown: '' }
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--root') args.root = argv[++i] || ''
    else if (arg === '--markdown') args.markdown = argv[++i] || ''
    else throw new Error(`Unknown argument: ${arg}`)
  }
  if (!args.root) throw new Error('--root is required')
  return args
}

function applyDuplicateUuidIssues(rows) {
  const map = new Map()
  for (const row of rows) {
    if (row.decision === 'excluded' || !row.uuid) continue
    const list = map.get(row.uuid) || []
    list.push(row)
    map.set(row.uuid, list)
  }
  for (const [uuid, list] of map) {
    if (list.length < 2) continue
    for (const row of list) {
      row.issues.push(`중복 UUID 존재: ${uuid}`)
      row.decision = 'unresolved'
    }
  }
}

export function auditRepository(root) {
  const rows = []
  const files = walkMarkdown(root)
  for (const full of files) {
    const relativePath = path.relative(root, full).split(path.sep).join('/')
    const source = fs.readFileSync(full, 'utf8')
    const { meta, body } = parseFrontmatter(source)
    rows.push(normalizeAuditRow({ relativePath, meta, body }))
  }
  applyDuplicateUuidIssues(rows)
  const summary = {
    scanned: rows.length,
    included: rows.filter((row) => row.decision === 'included').length,
    unresolved: rows.filter((row) => row.decision === 'unresolved').length,
    excluded: rows.filter((row) => row.decision === 'excluded').length,
    fatalIssues: rows.reduce((total, row) => total + (row.issues?.length || 0), 0),
  }
  return { rows, summary }
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv)
  const root = path.resolve(args.root)
  const { rows, summary } = auditRepository(root)
  const markdown = renderAuditMarkdown(rows, summary)
  if (args.markdown) {
    fs.mkdirSync(path.dirname(args.markdown), { recursive: true })
    fs.writeFileSync(args.markdown, markdown, 'utf8')
  }
  console.log(JSON.stringify(summary, null, 2))
  if (summary.fatalIssues > 0) process.exitCode = 1
}

const invoked = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : ''
if (import.meta.url === invoked) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.stack || error.message : String(error))
    process.exitCode = 1
  })
}
