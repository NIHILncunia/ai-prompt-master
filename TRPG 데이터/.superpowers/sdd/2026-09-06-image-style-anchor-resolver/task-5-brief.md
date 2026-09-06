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
