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

