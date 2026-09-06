# Image Style Anchor Resolver Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Promote the approved fourth `붓터치 반실사` finish anchor and make every image-module function resolve style mode, style anchors, and fixed English prompt blocks through one canonical contract.

**Architecture:** Add one central Markdown resolver under the shared style library. Style contracts own their active anchor manifests and fixed English blocks; feature documents own only output contracts and pass their subject/framing/reference conditions to the resolver. Character functions use the formal style path when appropriate, while tactical and functional image types explicitly retain their own rendering contracts.

**Tech Stack:** Markdown prompt contracts, PNG anchor files, Windows PowerShell, ripgrep (`rg`), SHA-256 verification, `apply_patch`

**Spec:** `docs/superpowers/specs/2026-09-06-image-style-anchor-resolver-design.md`

## Global Constraints

- The workspace root is `G:\내 드라이브\TRPG 데이터` and is not a Git repository; do not create a branch, commit, or push.
- Use `apply_patch` for Markdown creation and edits.
- Treat the approved source `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/견본/붓터치 반실사/후보/JRPG 양식화/04. 마감 앵커 교정본.png` as the only source for the active fourth anchor.
- Preserve the original candidate by moving it to `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/견본/보관/붓터치 반실사 재구축 후보/04. 마감 앵커.png`; do not delete or overwrite it.
- The active semi-realistic anchor filenames are exactly `01. 핵심 얼굴 앵커.png`, `02. 나이 표현 앵커.png`, `03. 전신 앵커.png`, and `04. 마감 앵커.png`.
- Style anchors may control drawing language, age expression, body proportions, painting, materials, and finish only; never copy their identity, clothing, palette, pose, camera, background, or composition.
- Provided-image preservation remains the default for Character Reference V1/V2 and Session Highlight when the user has not explicitly requested a style conversion.
- Anime Painting keeps its current three active anchor assets; this work must not rename or replace them.
- No image generation is part of this implementation.

---

### Task 1: Install the Four-Anchor Semi-Realistic Style Contract

**Files:**
- Create: `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/스타일/정식 스타일 호출 규칙.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/스타일/붓터치 반실사.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/스타일/애니 페인팅.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/스타일/공통 붓터치 마감 규칙.md`
- Move: `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/견본/붓터치 반실사/후보/JRPG 양식화/04. 마감 앵커.png` → `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/견본/보관/붓터치 반실사 재구축 후보/04. 마감 앵커.png`
- Move: `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/견본/붓터치 반실사/후보/JRPG 양식화/04. 마감 앵커 교정본.png` → `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/견본/붓터치 반실사/04. 마감 앵커.png`

**Interfaces:**
- Consumes: `그림체 적용 방식`, `선택 정식 스타일`, `대상 유형`, `주 프레이밍`, `디자인 기준 이미지 수`, `도구 전체 이미지 참조 한도`
- Produces: `전체 활성 앵커`, `실제 사용할 앵커`, `제외한 앵커와 사유`, `고정 영어 그림체 블록`, `공통 고정 영어 마감 블록`

- [ ] **Step 1: Verify source and destination paths before moving files**

Run:

```powershell
$moduleRoot = 'G:\내 드라이브\TRPG 데이터\1. 프롬프트\1. 이미지 생성 모듈'
$candidateDir = Join-Path $moduleRoot '라이브러리\견본\붓터치 반실사\후보\JRPG 양식화'
$archiveDir = Join-Path $moduleRoot '라이브러리\견본\보관\붓터치 반실사 재구축 후보'
$activeDir = Join-Path $moduleRoot '라이브러리\견본\붓터치 반실사'
$oldCandidate = Join-Path $candidateDir '04. 마감 앵커.png'
$approvedCandidate = Join-Path $candidateDir '04. 마감 앵커 교정본.png'
$archiveTarget = Join-Path $archiveDir '04. 마감 앵커.png'
$activeTarget = Join-Path $activeDir '04. 마감 앵커.png'

$resolvedModule = (Resolve-Path -LiteralPath $moduleRoot).Path
$resolvedCandidate = (Resolve-Path -LiteralPath $candidateDir).Path
$resolvedArchive = (Resolve-Path -LiteralPath $archiveDir).Path
$resolvedActive = (Resolve-Path -LiteralPath $activeDir).Path

if (-not $resolvedCandidate.StartsWith($resolvedModule)) { throw '후보 폴더가 이미지 모듈 밖입니다.' }
if (-not $resolvedArchive.StartsWith($resolvedModule)) { throw '보관 폴더가 이미지 모듈 밖입니다.' }
if (-not $resolvedActive.StartsWith($resolvedModule)) { throw '활성 폴더가 이미지 모듈 밖입니다.' }
if (-not (Test-Path -LiteralPath $oldCandidate)) { throw '기존 04 후보가 없습니다.' }
if (-not (Test-Path -LiteralPath $approvedCandidate)) { throw '승인된 04 교정본이 없습니다.' }
if (Test-Path -LiteralPath $archiveTarget) { throw '보관 목적지에 같은 이름의 파일이 이미 있습니다.' }
if (Test-Path -LiteralPath $activeTarget) { throw '활성 목적지에 같은 이름의 파일이 이미 있습니다.' }

$approvedHash = (Get-FileHash -LiteralPath $approvedCandidate -Algorithm SHA256).Hash
$oldCandidateHash = (Get-FileHash -LiteralPath $oldCandidate -Algorithm SHA256).Hash
[PSCustomObject]@{
  ApprovedHash = $approvedHash
  OldCandidateHash = $oldCandidateHash
}
```

Expected: both source files exist, both target files are absent, all resolved directories remain inside the image module, and two SHA-256 values are printed.

- [ ] **Step 2: Move the original and approved candidate files to their final locations**

Run:

```powershell
$moduleRoot = 'G:\내 드라이브\TRPG 데이터\1. 프롬프트\1. 이미지 생성 모듈'
$candidateDir = Join-Path $moduleRoot '라이브러리\견본\붓터치 반실사\후보\JRPG 양식화'
$archiveDir = Join-Path $moduleRoot '라이브러리\견본\보관\붓터치 반실사 재구축 후보'
$activeDir = Join-Path $moduleRoot '라이브러리\견본\붓터치 반실사'
$oldCandidate = Join-Path $candidateDir '04. 마감 앵커.png'
$approvedCandidate = Join-Path $candidateDir '04. 마감 앵커 교정본.png'
$archiveTarget = Join-Path $archiveDir '04. 마감 앵커.png'
$activeTarget = Join-Path $activeDir '04. 마감 앵커.png'
$approvedHash = (Get-FileHash -LiteralPath $approvedCandidate -Algorithm SHA256).Hash
$oldCandidateHash = (Get-FileHash -LiteralPath $oldCandidate -Algorithm SHA256).Hash

Move-Item -LiteralPath $oldCandidate -Destination $archiveTarget
Move-Item -LiteralPath $approvedCandidate -Destination $activeTarget

$activeHash = (Get-FileHash -LiteralPath $activeTarget -Algorithm SHA256).Hash
$archivedHash = (Get-FileHash -LiteralPath $archiveTarget -Algorithm SHA256).Hash
if ($activeHash -ne $approvedHash) { throw '승인 교정본과 활성 04 해시가 다릅니다.' }
if ($archivedHash -ne $oldCandidateHash) { throw '기존 후보와 보관본 해시가 다릅니다.' }
```

Expected: both comparisons pass without an exception.

- [ ] **Step 3: Create the central style resolver**

Use `apply_patch` to create `정식 스타일 호출 규칙.md` with these exact sections and contract values:

```text
# 정식 스타일 호출 규칙

## 입력 계약
- 그림체 적용 방식
- 선택 정식 스타일
- 대상 유형
- 주 프레이밍
- 디자인 기준 이미지 수
- 도구 전체 이미지 참조 한도

## 출력 계약
- 스타일별 전체 활성 앵커
- 실제 사용할 앵커
- 제외한 앵커와 제외 사유
- 고정 영어 그림체 블록 적용 여부
- 공통 고정 영어 마감 블록 적용 여부

## 붓터치 반실사 기본 조합
- 얼굴·흉상: 01 + 02 + 04
- 반신·전신: 01 + 02 + 03 + 04
- 비인물 풍경: 명시적 적용일 때 04만 사용

## 참조 예산 우선순위
1. 디자인 기준 이미지
2. 마감 앵커
3. 주 구도 앵커
4. 나이 표현 앵커
5. 남은 보조 앵커
```

Also include the three mutually exclusive style modes, the Anime Painting three-anchor manifest, provided-image preservation, functional-image exceptions, actual-pixel hard gate, and prohibited anchor-content copying exactly as defined in the spec.

- [ ] **Step 4: Replace the semi-realistic style contract**

Use `apply_patch` to make `붓터치 반실사.md`:

- own the four exact active filenames;
- define `01` as face, `02` as age, `03` as full-body proportion, and `04` as finish;
- delegate combination and reference-budget decisions to `정식 스타일 호출 규칙.md`;
- replace the old fixed English drawing block with the exact block in spec section 8;
- remove `정식 3앵커`, `최대 2장`, `01 + 03`, and `02 + 03` as semi-realistic rules;
- retain provided-image preservation and anchor-content exclusion rules.

- [ ] **Step 5: Replace the shared finish block and connect Anime Painting to the resolver**

Use `apply_patch` to:

- replace the English block in `공통 붓터치 마감 규칙.md` with the exact low-water block in spec section 9;
- replace prohibitions against all watercolor influence with the narrower prohibitions against diluted washes, wet blooms, puddled edges, washed-out haze, rough impasto, CGI gloss, and uniform texture overlays;
- keep the rule that provided-image preservation does not automatically receive the shared finish block;
- keep Anime Painting's current three active anchor files unchanged;
- make `애니 페인팅.md` defer selection and reference-budget handling to `정식 스타일 호출 규칙.md` while preserving its existing face/body/finish roles.

- [ ] **Step 6: Verify Task 1's independently testable result**

Run:

```powershell
$styleRoot = '1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일'
$semiAnchorRoot = '1. 프롬프트\1. 이미지 생성 모듈\라이브러리\견본\붓터치 반실사'

Get-ChildItem -LiteralPath $semiAnchorRoot -File -Filter '*.png' |
  Sort-Object Name |
  Select-Object Name, Length

rg -n '01\. 핵심 얼굴 앵커\.png|02\. 나이 표현 앵커\.png|03\. 전신 앵커\.png|04\. 마감 앵커\.png' "$styleRoot\붓터치 반실사.md"
rg -n '정식 스타일 호출 규칙|참조 예산|제공 이미지 그림체 보존|기능성 예외' $styleRoot
rg -n 'Apply the locked illustration-forward Stylized JRPG Painterly Semi-Realistic drawing language|Apply the locked low-water painterly digital illustration finish' $styleRoot
```

Expected: the active semi-realistic folder contains exactly four top-level PNG files with the approved filenames, the resolver clauses are found, and each new English block opening is found in its canonical owner.

### Task 2: Route the Module and Common Approval Gates Through the Resolver

**Files:**
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/README.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/0. 이미지 생성 모듈 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/공통/1. 이미지 생성 공통 승인 절차.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/공통/2. 요구사항 확인서 작성 규칙.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/공통/6. 이미지 생성 프롬프트 점검 및 교정 지침.md`

**Interfaces:**
- Consumes: the resolver output contract from Task 1
- Produces: one module-wide style decision record embedded in every requirements confirmation and enforced by P01–P10

- [ ] **Step 1: Add the resolver to the mandatory read order**

Use `apply_patch` to place `라이브러리/스타일/정식 스타일 호출 규칙.md` before the selected style contract in `AGENTS.md` and the module master. State that filename combinations in feature documents are informative only and cannot override the resolver.

- [ ] **Step 2: Replace the module-level three-anchor assumptions**

Use `apply_patch` to update the module master and README so they state:

```text
- Each formal style declares its own active anchor manifest.
- 붓터치 반실사 uses four roles: core face, age expression, full-body proportion, and finish.
- 애니 페인팅 retains its current three active anchors.
- Anchor combinations and reference-budget reduction come only from 정식 스타일 호출 규칙.md.
```

Remove module-level `3앵커`, global `최대 2장`, and hard-coded `01 + 03` or `02 + 03` combinations.

- [ ] **Step 3: Expand the common requirements-confirmation fields**

Use `apply_patch` in both common confirmation documents so `스타일 통제` contains these exact fields:

```text
- 그림체 적용 방식:
- 선택 정식 스타일:
- 산출물 구도 분류:
- 디자인 기준 이미지:
- 스타일별 전체 활성 앵커:
- 실제 사용할 스타일 앵커:
- 제외한 스타일 앵커와 사유:
- 앵커 실제 픽셀 확인: 완료 / 해당 없음
- 고정 영어 그림체 블록: 원문 적용 / 미적용 사유
- 공통 고정 영어 마감 블록: 원문 적용 / 미적용 사유
- 프롬프트 점검 결과: 통과
- 자동 교정 내역: 없음 / <실제 교정 내용>
```

Do not mark omitted anchors as `해당 없음` when the actual cause is a tool reference limit.

- [ ] **Step 4: Rewrite P04 around resolver output**

Use `apply_patch` in `공통/6. 이미지 생성 프롬프트 점검 및 교정 지침.md` so P04 checks:

1. the selected style's complete active manifest;
2. the output framing classification;
3. the resolver's expected combination;
4. the actual loaded filenames;
5. omitted anchors and their documented reasons;
6. actual pixel inspection;
7. design-reference priority;
8. content/composition exclusion.

Keep P05's verbatim drawing-block gate. Update P06's collision scan to allow controlled low-water watercolor-and-gouache influence while rejecting diluted washes, wet blooms, puddled edges, washed-out haze, rough impasto, plastic CGI, and uniform texture overlays.

- [ ] **Step 5: Verify Task 2's independently testable result**

Run:

```powershell
$moduleRoot = '1. 프롬프트\1. 이미지 생성 모듈'
$commonRoot = Join-Path $moduleRoot '공통'

rg -n '정식 스타일 호출 규칙' "$moduleRoot\AGENTS.md" "$moduleRoot\README.md" "$moduleRoot\0. 이미지 생성 모듈 마스터 프롬프트.md" $commonRoot
rg -n '스타일별 전체 활성 앵커|실제 사용할 스타일 앵커|제외한 스타일 앵커와 사유' "$commonRoot\1. 이미지 생성 공통 승인 절차.md" "$commonRoot\2. 요구사항 확인서 작성 규칙.md" "$commonRoot\6. 이미지 생성 프롬프트 점검 및 교정 지침.md"
rg -n '정식 3앵커|한 생성에 쓰는 스타일 앵커는 최대 2장|01\. 핵심 얼굴 앵커\.png \+ 03\. 마감 앵커\.png|02\. 중립 전신 앵커\.png \+ 03\. 마감 앵커\.png' "$moduleRoot\AGENTS.md" "$moduleRoot\README.md" "$moduleRoot\0. 이미지 생성 모듈 마스터 프롬프트.md" $commonRoot
```

Expected: resolver and expanded audit fields are found; the final command returns no matches.

### Task 3: Convert Character-Producing Functions to the Central Resolver

**Files:**
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/1. 반실사 포트레이트/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/1. 반실사 포트레이트/README.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/1. 반실사 포트레이트/0. 반실사 포트레이트 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/1. 반실사 포트레이트/1. 반실사 포트레이트 공통 지침.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/3. 캐릭터 레퍼런스 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/3. 캐릭터 레퍼런스 생성/README.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/3. 캐릭터 레퍼런스 생성/0. 캐릭터 레퍼런스 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/4. 세션 하이라이트 이미지 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/4. 세션 하이라이트 이미지 생성/README.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/4. 세션 하이라이트 이미지 생성/0. 세션 하이라이트 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/5. 캐릭터 레퍼런스 V2 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/5. 캐릭터 레퍼런스 V2 생성/README.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/5. 캐릭터 레퍼런스 V2 생성/0. 캐릭터 레퍼런스 V2 마스터 프롬프트.md`

**Interfaces:**
- Consumes: central resolver input/output contracts and the common requirements fields from Tasks 1–2
- Produces: correct style handling for new portraits, reference sheets, and session scenes without changing their output-layout contracts

- [ ] **Step 1: Update Portrait's direct-entry read order and full-body/bust mapping**

Use `apply_patch` so Portrait reads the resolver before the selected style contract. Replace its hard-coded three-anchor and maximum-two rules with:

```text
- 신규 얼굴·흉상: 붓터치 반실사 선택 시 01 + 02 + 04를 기본 호출한다.
- 신규 반신·전신: 붓터치 반실사 선택 시 01 + 02 + 03 + 04를 기본 호출한다.
- 실제 조합과 참조 예산 축소는 정식 스타일 호출 규칙.md가 결정한다.
- 완성형 VTT 토큰은 기준 이미지의 기존 그림체를 보존하며 캐릭터 스타일 앵커로 다시 그리지 않는다.
```

Keep the `전신 9:16 → 전신 확정 → 흉상 또는 완성형 토큰` contract unchanged.

- [ ] **Step 2: Update Character Reference V1**

Use `apply_patch` so V1 explicitly reads the resolver. Preserve provided-image style by default. For new generation or explicit conversion, classify each source generation as face/bust or full-body and obtain its anchor list from the resolver. Remove direct `핵심 얼굴 + 마감`, `중립 전신 + 마감`, and maximum-two rules.

- [ ] **Step 3: Update Session Highlight**

Use `apply_patch` so Session Highlight:

- preserves all compatible provided character styles when no conversion is requested;
- asks for a single baseline when provided styles conflict;
- uses design references before style anchors during explicit conversion;
- classifies the scene's dominant framing as face-focused or body/action-focused;
- records every omitted anchor when multiple character references consume the tool's reference budget;
- never imports anchor clothing, palette, pose, camera, background, or composition.

- [ ] **Step 4: Update Character Reference V2**

Use `apply_patch` so V2 resolves anchors per source-generation phase:

- face/head source: face/bust resolver path;
- front/side/back body sources: full-body resolver path;
- final sheet assembly: preserve generated source style without adding a conflicting second style pass.

Keep `1916 × 821 px`, panel layout, weapon rules, and the full black data bar unchanged.

- [ ] **Step 5: Verify Task 3's independently testable result**

Run:

```powershell
$characterRoots = @(
  '1. 프롬프트\1. 이미지 생성 모듈\1. 반실사 포트레이트',
  '1. 프롬프트\1. 이미지 생성 모듈\3. 캐릭터 레퍼런스 생성',
  '1. 프롬프트\1. 이미지 생성 모듈\4. 세션 하이라이트 이미지 생성',
  '1. 프롬프트\1. 이미지 생성 모듈\5. 캐릭터 레퍼런스 V2 생성'
)

rg -n '정식 스타일 호출 규칙' $characterRoots
rg -n '제공 이미지.*그림체|그림체.*보존' $characterRoots
rg -n '핵심 얼굴 \+ 마감|중립 전신 \+ 마감|정식 3앵커|스타일 앵커는 최대 2장|정식 앵커를 최대 2장' $characterRoots
```

Expected: every character-producing function has an explicit resolver route and preservation clause; the final command returns no matches in active feature guidance.

### Task 4: Lock Functional-Image Exceptions and Synchronize Global Routers

**Files:**
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/2. 배틀맵 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/2. 배틀맵 생성/0. 배틀맵 생성 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/6. 풍경 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/6. 풍경 생성/0. 풍경 생성 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/7. 게임 아이콘 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/7. 게임 아이콘 생성/0. 게임 아이콘 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/8. 월드 지도 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/8. 월드 지도 생성/0. 월드 지도 마스터 프롬프트.md`
- Modify: `AGENTS.md`
- Modify: `1. 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/00. TRPG 세션 매니저 프로젝트 기본 지침.md`
- Modify: `1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`

**Interfaces:**
- Consumes: central resolver's functional-image exception result
- Produces: unambiguous non-character behavior at every direct and global entry point

- [ ] **Step 1: Lock Battlemap, Icon, and World Map exceptions**

Use `apply_patch` to make each function's AGENTS and master state:

```text
- 그림체 적용 방식은 사용자 지정 스타일·기능성 예외다.
- 정식 인물 스타일의 얼굴·나이·전신 앵커를 자동으로 불러오지 않는다.
- 기능 전용 판독성·시점·레이아웃 계약이 우선한다.
- 사용자가 별도 표면 마감을 요청하면 기능 계약과 충돌하지 않는 범위만 요구사항 확인서에 공개한다.
```

Retain true top-down, 64×64 readability, and colorful parchment-map requirements unchanged.

- [ ] **Step 2: Define Landscape's finish-only path**

Use `apply_patch` so Landscape remains a functional/environment image mode. If the user explicitly asks for the formal painterly finish, load only the selected style's finish anchor and shared finish block; do not load face, age, or body anchors and do not insert a character drawing block into an environment-only prompt.

- [ ] **Step 3: Synchronize the four global entry documents**

Use `apply_patch` to replace the root `3장` statement with this exact policy:

```text
정식 스타일은 스타일별 활성 앵커 구성이 서로 다를 수 있으며, 붓터치 반실사는 핵심 얼굴·나이 표현·전신·마감 4장, 애니 페인팅은 현재 핵심 얼굴·중립 전신·마감 3장을 사용한다. 실제 조합과 참조 예산 축소는 이미지 모듈의 정식 스타일 호출 규칙을 따른다.
```

Add the central resolver to the image-routing explanations in `1. 프롬프트/AGENTS.md`, the basic guidance, and the integrated master without copying the full per-framing table into those global documents.

- [ ] **Step 4: Verify Task 4's independently testable result**

Run:

```powershell
$functionalRoots = @(
  '1. 프롬프트\1. 이미지 생성 모듈\2. 배틀맵 생성',
  '1. 프롬프트\1. 이미지 생성 모듈\6. 풍경 생성',
  '1. 프롬프트\1. 이미지 생성 모듈\7. 게임 아이콘 생성',
  '1. 프롬프트\1. 이미지 생성 모듈\8. 월드 지도 생성'
)
$globalDocs = @(
  'AGENTS.md',
  '1. 프롬프트\AGENTS.md',
  '1. 프롬프트\00. TRPG 세션 매니저 프로젝트 기본 지침.md',
  '1. 프롬프트\0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md'
)

rg -n '기능성 예외|인물 스타일.*자동|얼굴·나이·전신 앵커|마감 앵커' $functionalRoots
rg -n '정식 스타일 호출 규칙|붓터치 반실사.*4장|애니 페인팅.*3장' $globalDocs
```

Expected: functional exception evidence exists for all four functions, and all global documents route to the central resolver without reverting to one shared anchor count.

### Task 5: Run Full Validation and Close the Tracked Work

**Files:**
- Create: `docs/superpowers/reports/2026-09-06-image-style-anchor-resolver-verification.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`
- Modify: `작업 정비/이미지 스타일 앵커 호출 체계 정비.md`
- Modify: `작업 정비/작업 정비 현황.md`

**Interfaces:**
- Consumes: all Task 1–4 file and document changes
- Produces: reproducible verification evidence and synchronized `완료` state

- [ ] **Step 1: Verify anchor structure and file integrity**

Run:

```powershell
$moduleRoot = 'G:\내 드라이브\TRPG 데이터\1. 프롬프트\1. 이미지 생성 모듈'
$activeDir = Join-Path $moduleRoot '라이브러리\견본\붓터치 반실사'
$archiveTarget = Join-Path $moduleRoot '라이브러리\견본\보관\붓터치 반실사 재구축 후보\04. 마감 앵커.png'
$activeTarget = Join-Path $activeDir '04. 마감 앵커.png'
$expectedNames = @(
  '01. 핵심 얼굴 앵커.png',
  '02. 나이 표현 앵커.png',
  '03. 전신 앵커.png',
  '04. 마감 앵커.png'
)
$actualNames = Get-ChildItem -LiteralPath $activeDir -File -Filter '*.png' |
  Sort-Object Name |
  Select-Object -ExpandProperty Name

if (Compare-Object -ReferenceObject $expectedNames -DifferenceObject $actualNames) {
  throw '붓터치 반실사 활성 앵커 파일 구성이 다릅니다.'
}
if (-not (Test-Path -LiteralPath $archiveTarget)) { throw '기존 후보 보관본이 없습니다.' }
if (-not (Test-Path -LiteralPath $activeTarget)) { throw '활성 04 마감 앵커가 없습니다.' }

Get-FileHash -LiteralPath $activeTarget,$archiveTarget -Algorithm SHA256
```

Expected: exactly four active names, both active/archive files present, and their hashes printed for the report.

- [ ] **Step 2: Scan active guidance for obsolete semi-realistic contracts**

Run:

```powershell
$activeImageRoot = '1. 프롬프트\1. 이미지 생성 모듈'

rg -n '붓터치 반실사.*핵심 얼굴·중립 전신·마감|붓터치 반실사.*정식 앵커 3장|붓터치 반실사.*최대 2장' 'AGENTS.md' $activeImageRoot
rg -n '02\. 중립 전신 앵커\.png|03\. 마감 앵커\.png' "$activeImageRoot\라이브러리\스타일\붓터치 반실사.md" "$activeImageRoot\1. 반실사 포트레이트" "$activeImageRoot\3. 캐릭터 레퍼런스 생성" "$activeImageRoot\4. 세션 하이라이트 이미지 생성" "$activeImageRoot\5. 캐릭터 레퍼런스 V2 생성"
rg -n '핵심 얼굴 \+ 마감|중립 전신 \+ 마감|정식 3앵커' "$activeImageRoot\1. 반실사 포트레이트" "$activeImageRoot\3. 캐릭터 레퍼런스 생성" "$activeImageRoot\4. 세션 하이라이트 이미지 생성" "$activeImageRoot\5. 캐릭터 레퍼런스 V2 생성"
```

Expected: all three searches return no matches. Historical Superpowers specs/reports and the unchanged Anime Painting manifest are outside this obsolete semi-realistic scan.

- [ ] **Step 3: Verify resolver coverage and fixed-block ownership**

Run:

```powershell
$moduleRoot = '1. 프롬프트\1. 이미지 생성 모듈'
$resolver = "$moduleRoot\라이브러리\스타일\정식 스타일 호출 규칙.md"
$semiStyle = "$moduleRoot\라이브러리\스타일\붓터치 반실사.md"
$finishStyle = "$moduleRoot\라이브러리\스타일\공통 붓터치 마감 규칙.md"

$resolverReferences = rg -l '정식 스타일 호출 규칙' $moduleRoot
if ($resolverReferences.Count -lt 9) { throw '모듈 루트와 기능 1~8의 중앙 호출 연결 수가 부족합니다.' }

$drawingBlockCount = (Select-String -LiteralPath $semiStyle -Pattern '^Apply the locked illustration-forward Stylized JRPG Painterly Semi-Realistic drawing language:$').Count
$finishBlockCount = (Select-String -LiteralPath $finishStyle -Pattern '^Apply the locked low-water painterly digital illustration finish:$').Count
if ($drawingBlockCount -ne 1) { throw '붓터치 반실사 고정 영어 그림체 블록 정본 수가 1이 아닙니다.' }
if ($finishBlockCount -ne 1) { throw '공통 고정 영어 마감 블록 정본 수가 1이 아닙니다.' }

rg -n '제공 이미지 그림체 보존|정식 스타일 적용|사용자 지정 스타일·기능성 예외' $resolver "$moduleRoot\공통\6. 이미지 생성 프롬프트 점검 및 교정 지침.md"
```

Expected: at least nine resolver references, one canonical opening for each fixed English block, and all three style modes present in the resolver and checker.

- [ ] **Step 4: Verify Markdown structure and local references**

Run:

```powershell
$changedMarkdown = @(
  'AGENTS.md',
  '1. 프롬프트\AGENTS.md',
  '1. 프롬프트\00. TRPG 세션 매니저 프로젝트 기본 지침.md',
  '1. 프롬프트\0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md'
) + (rg -l '정식 스타일 호출 규칙|low-water painterly|Stylized JRPG Painterly' '1. 프롬프트\1. 이미지 생성 모듈')

$changedMarkdown = $changedMarkdown | Sort-Object -Unique
foreach ($path in $changedMarkdown) {
  $fenceCount = (Select-String -LiteralPath $path -Pattern '^```' -AllMatches).Count
  if ($fenceCount % 2 -ne 0) { throw "코드 펜스가 닫히지 않았습니다: $path" }
}

$requiredPaths = @(
  '1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\정식 스타일 호출 규칙.md',
  '1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\붓터치 반실사.md',
  '1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\애니 페인팅.md',
  '1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\공통 붓터치 마감 규칙.md'
)
foreach ($path in $requiredPaths) {
  if (-not (Test-Path -LiteralPath $path)) { throw "필수 정본이 없습니다: $path" }
}
```

Expected: no unbalanced code fences and every required canonical file exists.

- [ ] **Step 5: Write the verification report**

Use `apply_patch` to create `docs/superpowers/reports/2026-09-06-image-style-anchor-resolver-verification.md` containing:

- verified active and archived anchor paths;
- SHA-256 values from Step 1;
- obsolete-reference scan commands and zero-match results;
- resolver reference count;
- fixed English block ownership counts;
- Markdown fence and required-path results;
- explicit statement that no image was generated and no Git commit was created.

- [ ] **Step 6: Synchronize completion state**

Use `apply_patch` to:

- move `2026-09-06-image-style-anchor-resolver` from `현재 작업` to `완료 이력` in `SUPERPOWERS WORK REGISTRY.md`;
- set the work record status to `완료`, list the actual changed files and verification report, set `미결: 없음`, and set `다음: 후속 작업 없음`;
- move the item from `진행 중 작업` to `완료 작업` in `작업 정비 현황.md`;
- reference `reports/2026-09-06-image-style-anchor-resolver-verification.md` only after confirming the file exists.

- [ ] **Step 7: Run the final completion check**

Run:

```powershell
$requiredFinal = @(
  'docs\superpowers\specs\2026-09-06-image-style-anchor-resolver-design.md',
  'docs\superpowers\plans\2026-09-06-image-style-anchor-resolver.md',
  'docs\superpowers\reports\2026-09-06-image-style-anchor-resolver-verification.md',
  '작업 정비\이미지 스타일 앵커 호출 체계 정비.md'
)

foreach ($path in $requiredFinal) {
  if (-not (Test-Path -LiteralPath $path)) { throw "최종 산출물이 없습니다: $path" }
}

rg -n -C 2 '2026-09-06-image-style-anchor-resolver|이미지 스타일 앵커 호출 체계 정비' 'docs\superpowers\SUPERPOWERS WORK REGISTRY.md' '작업 정비\작업 정비 현황.md' '작업 정비\이미지 스타일 앵커 호출 체계 정비.md'
```

Expected: all four final documents exist and every tracking surface reports the same completed state and report path.
