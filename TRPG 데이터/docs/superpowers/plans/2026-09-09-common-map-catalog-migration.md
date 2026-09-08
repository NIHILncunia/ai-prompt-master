# 공용 맵 카탈로그 전환 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 맵 문서·풍경·전술맵을 `11. 맵` 공용 카탈로그로 옮기고, 세션은 영구 `map_uuid`로만 공용 맵을 참조하게 한다.

**Architecture:** 공용 맵 문서는 환경별 폴더에서 공간의 구조·그리드·자산을 소유한다. 세션 장면은 해당 플레이의 전투 목적·토큰·사건만 소유하고, 세션 `맵/00. 맵 목록.md`는 공용 맵 UUID 참조 원장으로 유지한다. 자산은 해시 확인 뒤 개별 이동하며 원본은 검증 전 삭제하지 않는다.

**Tech Stack:** Markdown, PowerShell, SHA-256, Git 정적 검사

**Spec:** `docs/superpowers/specs/2026-09-09-common-map-catalog-migration-design.md`

## Global Constraints

- 모든 맵 문서·풍경·전술맵의 물리 정본은 `11. 맵` 공용 카탈로그에만 둔다.
- 환경 폴더 아래에 Markdown·풍경·전술맵을 평면으로 함께 저장한다.
- `map_uuid`는 변경하지 않고, `map_code`는 `M_<환경 영문명><순번>` 형식의 변경 가능 코드로 사용한다.
- 공용 맵 이름에는 특정 지역명을 넣지 않는다.
- 논리 그리드가 있는 맵의 가로·세로는 각각 5의 배수이며, 검증 전 값은 `미확정`으로 기록한다.
- 세션 전용 사건·토큰·배치는 장면 문서에 두고 공용 맵 문서에 중복하지 않는다.
- 이미지 파일 7개는 이동 전후 SHA-256이 완전히 일치해야 한다.
- 기존 더티 워크트리의 다른 변경은 소유하지 않는다. 이 작업에서 `git add`, `git commit`, 원격 푸시를 하지 않는다.

---

## File Structure

| 경로 | 책임 |
| --- | --- |
| `11. 맵/비공정/` | 오리진 비공정 공용 문서와 풍경 |
| `11. 맵/동굴/` | 수정 동굴 공용 문서·풍경·전술맵 |
| `11. 맵/도시/` | 도시 전투 구역과 도시 외곽 진입로 공용 문서·전술맵 |
| `11. 맵/성소/` | 성소 전술맵 2개의 공용 문서·전술맵 |
| `17. 세션 설계/남아있는 이야기/섬에서 전해진 바람 상편 2 기획/맵/00. 맵 목록.md` | 세션의 공용 맵 UUID 참조 원장 |
| `17. 세션 설계/남아있는 이야기/섬에서 전해진 바람 상편 2 기획/장면/01~07.*.md` | 세션 전용 사건·토큰·배치와 구조화된 `사용 맵` |
| `AGENTS.md`, `1. 프롬프트/AGENTS.md`, `1. 프롬프트/00. TRPG 세션 매니저 프로젝트 기본 지침.md`, `1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md` | 전역 공용 맵 정본·참조 규칙 |
| `1. 프롬프트/8. 세션 제작 프롬프트/`의 AGENTS·마스터·지침·템플릿 | 신규 세션에서의 공용 맵 검색·참조·저장 규칙 |
| `1. 프롬프트/1. 이미지 생성 모듈/2. 배틀맵 생성/`, `6. 풍경 생성/`의 AGENTS·마스터 | 생성된 맵·풍경의 공용 카탈로그 저장 규칙 |

### Task 1: 이관 전 기준선 고정

**Files:**
- Read: `11. 맵 이미지/`의 이미지 3개
- Read: `17. 세션 설계/남아있는 이야기/섬에서 전해진 바람 상편 2 기획/맵/`의 이미지 4개와 Markdown 5개
- Read: `docs/superpowers/specs/2026-09-09-common-map-catalog-migration-design.md`

**Interfaces:**
- Consumes: 설계 문서의 6개 맵 원장과 7개 이미지 해시 기준
- Produces: 이후 작업이 비교할 원본 파일 경로·SHA-256 기준선

- [ ] **Step 1: 7개 원본 파일 존재와 SHA-256을 다시 기록한다.**

```powershell
$files = @(
  '11. 맵 이미지\오리진 비공정 풍경화.webp',
  '11. 맵 이미지\ChatGPT Image 2026년 6월 26일 오전 11_05_53.webp',
  '11. 맵 이미지\file_00000000792871f8b7e5f8fca8a11dd2.webp',
  '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\01. 아그니르 도시 전투 구역.webp',
  '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\02. 검은 사수의 왼팔 성소.webp',
  '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\03. 아그니르 도시 외곽 진입로.webp',
  '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\04. 성소 외곽 회랑 및 격리 구역.webp'
)
$files | ForEach-Object {
  if (-not (Test-Path -LiteralPath $_ -PathType Leaf)) { throw "Missing source: $_" }
  Get-FileHash -LiteralPath $_ -Algorithm SHA256
}
```

Expected: 아래 SHA-256 7개와 각각 일치한다.

```text
F4B471AD9816064EC1378F5CB6C7A79B59F66D0E40E2C1BA05768EAF48F2343D
846A1345F426CEFF40C407C14468963BF73A570E3C62CCFCD360815C696029A2
D66118E1967273ED192216FD4279FFAD164F9A659B1CCF63DFF23AEEC40A40B1
04F749BA0DA406B3F6992287152E4C3DE90F42806EB34564812D2341F9D2EA2E
1E6CA44E7635CA27698DD9A23A13428251D2AA8D7599BE81BC67F96848AA30D2
0238EBB38B9AB4A737237690AE1AC0467831C98A878CDF7458ADD798AA0F4363
BC8ABC07A4E9EF021D77E8225F9E45CA67BFF4529F63A0EEBC1ED3DF3D947CAF
```

- [ ] **Step 2: 기존 세션의 4개 UUID와 장면 01~07의 `사용 맵` 참조를 고정한다.**

Run:

```powershell
$mapRoot = '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵'
$sceneRoot = '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\장면'
rg -n '^map_uuid: ' $mapRoot
rg -n '^- map_uuid: ' $sceneRoot
```

Expected: 기존 공용 대상 UUID `f64579ed-12a1-4c24-a3c4-c675b9695fea`, `8060cb5a-0e2b-4ee5-b41d-82fa2c008bca`, `c0350d55-2d40-419c-83ea-ef2785dd8e0f`, `38289b6a-e3c2-492d-a4f1-31a50db793de`가 변하지 않는다.

### Task 2: 신규 공용 맵 2개를 문서화하고 기존 공용 후보 자산을 이관

**Files:**
- Create: `11. 맵/비공정/M_AIRSHIP001_오리진 비공정.md`
- Create: `11. 맵/동굴/M_CAVE001_수정 동굴.md`
- Move: `11. 맵 이미지/오리진 비공정 풍경화.webp` → `11. 맵/비공정/M_AIRSHIP001_오리진 비공정_풍경.webp`
- Move: `11. 맵 이미지/ChatGPT Image 2026년 6월 26일 오전 11_05_53.webp` → `11. 맵/동굴/M_CAVE001_수정 동굴_맵.webp`
- Move: `11. 맵 이미지/file_00000000792871f8b7e5f8fca8a11dd2.webp` → `11. 맵/동굴/M_CAVE001_수정 동굴_풍경.webp`

**Interfaces:**
- Consumes: Task 1의 해시 기준선, 설계의 신규 UUID 2개
- Produces: `e313df92-ace1-4f56-908c-88b0bea70240`, `c63e022b-5794-4b1a-a925-f70af4f72439` 공용 맵 문서와 이름이 정규화된 이미지 3개

- [ ] **Step 1: 환경 폴더를 만들고 두 공용 맵 문서를 `apply_patch`로 작성한다.**

```powershell
New-Item -ItemType Directory -Force -Path '11. 맵\비공정', '11. 맵\동굴' | Out-Null
```

오리진 비공정 문서에는 아래 frontmatter와 외관 풍경의 재사용 조건을 적는다.

```yaml
document_type: 공용 맵
map_uuid: e313df92-ace1-4f56-908c-88b0bea70240
map_code: M_AIRSHIP001
map_title: 오리진 비공정
environment: 비공정
map_status: 초안
logical_grid: 미확정
reuse_notes: 비공정 외관 풍경 기준. 구조적으로 독립된 내부·갑판 전술맵은 새 map_uuid를 사용한다.
assets:
  - role: 풍경
    file: M_AIRSHIP001_오리진 비공정_풍경.webp
```

수정 동굴 문서에는 아래 frontmatter와 풍경·전술맵이 같은 공간의 한 쌍임을 적는다.

```yaml
document_type: 공용 맵
map_uuid: c63e022b-5794-4b1a-a925-f70af4f72439
map_code: M_CAVE001
map_title: 수정 동굴
environment: 동굴
map_status: 초안
logical_grid: 미확정
reuse_notes: 수정 동굴 풍경과 전술맵은 같은 공간의 한 쌍이다. 논리 그리드 확인 전에는 전술 운용을 확정하지 않는다.
assets:
  - role: 풍경
    file: M_CAVE001_수정 동굴_풍경.webp
  - role: 맵
    file: M_CAVE001_수정 동굴_맵.webp
```

- [ ] **Step 2: 원본 해시를 재확인한 뒤 자산 3개를 개별 이동한다.**

```powershell
$moves = @(
  @{ Source = '11. 맵 이미지\오리진 비공정 풍경화.webp'; Target = '11. 맵\비공정\M_AIRSHIP001_오리진 비공정_풍경.webp' },
  @{ Source = '11. 맵 이미지\ChatGPT Image 2026년 6월 26일 오전 11_05_53.webp'; Target = '11. 맵\동굴\M_CAVE001_수정 동굴_맵.webp' },
  @{ Source = '11. 맵 이미지\file_00000000792871f8b7e5f8fca8a11dd2.webp'; Target = '11. 맵\동굴\M_CAVE001_수정 동굴_풍경.webp' }
)
foreach ($move in $moves) {
  if (-not (Test-Path -LiteralPath $move.Source -PathType Leaf)) { throw "Missing source: $($move.Source)" }
  if (Test-Path -LiteralPath $move.Target) { throw "Target already exists: $($move.Target)" }
  Move-Item -LiteralPath $move.Source -Destination $move.Target
}
```

- [ ] **Step 3: 이동 직후 3개 대상의 SHA-256이 Task 1 기준선과 일치하는지 검사한다.**

Run:

```powershell
Get-FileHash -LiteralPath `
  '11. 맵\비공정\M_AIRSHIP001_오리진 비공정_풍경.webp', `
  '11. 맵\동굴\M_CAVE001_수정 동굴_맵.webp', `
  '11. 맵\동굴\M_CAVE001_수정 동굴_풍경.webp' `
  -Algorithm SHA256
```

Expected: Task 1의 앞 세 SHA-256과 순서대로 일치한다.

### Task 3: 세션 맵 4개를 공용 공간 문서와 세션 운용 정보로 분리

**Files:**
- Create: `11. 맵/도시/M_CITY001_도시 전투 구역.md`
- Create: `11. 맵/도시/M_CITY002_도시 외곽 진입로.md`
- Create: `11. 맵/성소/M_SHRINE001_검은 사수의 왼팔 성소.md`
- Create: `11. 맵/성소/M_SHRINE002_성소 외곽 회랑 및 격리 구역.md`
- Move: 세션 맵 이미지 4개 → 위 네 공용 문서와 같은 환경 폴더의 `<map_code>_<맵명>_맵.webp`
- Modify: 세션 `장면/01. 추격의 끝, 아그니르.md`부터 `장면/07. 낯익은 이방인들.md`
- Modify: `17. 세션 설계/남아있는 이야기/섬에서 전해진 바람 상편 2 기획/맵/00. 맵 목록.md`
- Delete after extraction: 세션 `맵/01~04.*.md`와 해당 `.webp` 4개

**Interfaces:**
- Consumes: 기존 UUID 4개, Task 1의 해시 기준선, 공용 맵 문서 계약
- Produces: 4개 공용 `사용 가능` 맵 문서, 4개 이름 정규화 전술맵, 장면 소유의 세션 전용 운용 정보

- [ ] **Step 1: 네 환경 폴더를 만들고 기존 UUID·논리 그리드를 유지한 공용 맵 문서를 작성한다.**

```powershell
New-Item -ItemType Directory -Force -Path '11. 맵\도시', '11. 맵\성소' | Out-Null
```

각 문서의 고정 frontmatter는 아래 표를 사용한다.

| 공용 문서 | map_uuid | logical_grid | 공용 공간 정보로 옮길 기존 섹션 |
| --- | --- | --- | --- |
| `M_CITY001_도시 전투 구역.md` | `f64579ed-12a1-4c24-a3c4-c675b9695fea` | `30 × 20` | 기본 정보, 공간 흐름, 핵심 전투 구역, 주요 구조물과 장애물, 엄폐와 이동, 이미지 조건 |
| `M_CITY002_도시 외곽 진입로.md` | `c0350d55-2d40-419c-83ea-ef2785dd8e0f` | `30 × 20` | 기본 정보, 공간 흐름, 핵심 구역, 주요 구조물과 장애물, 엄폐와 이동, 연결 관계, 이미지 조건 |
| `M_SHRINE001_검은 사수의 왼팔 성소.md` | `8060cb5a-0e2b-4ee5-b41d-82fa2c008bca` | `30 × 30` | 기본 정보, 전체 공간 구조, 핵심 구역, 이동 구조, 시야 차단과 엄폐, 이미지 조건 |
| `M_SHRINE002_성소 외곽 회랑 및 격리 구역.md` | `38289b6a-e3c2-492d-a4f1-31a50db793de` | `20 × 30` | 기본 정보, 전체 공간 구조, 핵심 구역, 격리 구조 원칙, 엄폐와 시야, 이미지 조건 |

네 문서 모두 `document_type: 공용 맵`, 지정 `map_code`, 지역명이 빠진 `map_title`, 해당 `environment`, `map_status: 사용 가능`, `reuse_notes`와 파일명 `assets` 목록을 갖게 한다. 세션 사건명, 베르카스, 실타래, 수상한 마법사, 장면 번호, 토큰 배치는 공용 문서에 넣지 않는다.

- [ ] **Step 2: 장면별 운용 정보는 해당 장면의 `## 사용 맵` 바로 앞 `## 맵 운용` 섹션으로 옮긴다.**

| 원본 맵 문서의 세션 전용 섹션 | 대상 장면 문서 |
| --- | --- |
| 도시 외곽 진입로의 `장면별 사용 상태`, `토큰 배치 기준` | 장면 01 |
| 도시 전투 구역의 `토큰 배치 기준`, `장면별 사용 상태` | 장면 02, 장면 03 |
| 왼팔 성소의 `보호진 핵 공통 전투 규격`, `실타래 운용을 위한 공간`, `플레이어 방어 지점`, `봉인 상태의 시각적 표현`, `장면별 사용 상태` | 장면 06, 장면 07 |
| 성소 외곽 회랑의 `장면별 사용 상태`, `토큰 배치 기준` | 장면 04, 장면 05 |

장면의 기존 `사용 맵` UUID와 `사용 방식: 필수`는 그대로 유지한다. 이동한 정보는 다른 장면이나 공용 맵 문서에 중복 복사하지 않는다.

- [ ] **Step 3: 세션 맵 목록을 공용 맵 UUID 참조 원장으로 축소하고 직접 물리 경로를 제거한다.**

`맵/00. 맵 목록.md`에는 세션별 번호, `map_uuid`, 공용 맵 이름, 사용 장면, 이번 세션에서의 역할, `사용 방식`만 남긴다. `제작`, `이미지 상태`, 세션 내부 개별 맵 문서·이미지 경로는 제거한다. 도시 두 맵의 표기에서는 `아그니르`를 제거하고 각각 `도시 전투 구역`, `도시 외곽 진입로`를 사용한다.

장면 02, 04, 06의 아래 직접 경로 표현은 각각 해당 `map_uuid`와 공용 맵 이름을 말하는 문장으로 바꾼다.

```text
맵/01. 아그니르 도시 전투 구역.md
맵/04. 성소 외곽 회랑 및 격리 구역.md
맵/02. 검은 사수의 왼팔 성소.md
```

- [ ] **Step 4: 이미지 4개를 개별 이동하고, 내용 분리·참조 갱신이 확인된 뒤 세션 개별 맵 문서 4개를 삭제한다.**

```powershell
$moves = @(
  @{ Source = '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\01. 아그니르 도시 전투 구역.webp'; Target = '11. 맵\도시\M_CITY001_도시 전투 구역_맵.webp' },
  @{ Source = '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\03. 아그니르 도시 외곽 진입로.webp'; Target = '11. 맵\도시\M_CITY002_도시 외곽 진입로_맵.webp' },
  @{ Source = '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\02. 검은 사수의 왼팔 성소.webp'; Target = '11. 맵\성소\M_SHRINE001_검은 사수의 왼팔 성소_맵.webp' },
  @{ Source = '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\04. 성소 외곽 회랑 및 격리 구역.webp'; Target = '11. 맵\성소\M_SHRINE002_성소 외곽 회랑 및 격리 구역_맵.webp' }
)
foreach ($move in $moves) {
  if (-not (Test-Path -LiteralPath $move.Source -PathType Leaf)) { throw "Missing source: $($move.Source)" }
  if (Test-Path -LiteralPath $move.Target) { throw "Target already exists: $($move.Target)" }
  Move-Item -LiteralPath $move.Source -Destination $move.Target
}
```

삭제 직전에는 `rg -n '## 맵 운용'`으로 장면 01~07의 이동 정보를 확인하고, `rg -n '맵/(01\\.|02\\.|03\\.|04\\.)'`가 활성 세션 문서에서 0건인지 확인한다. 그 뒤 아래 파일만 개별 삭제한다.

```powershell
$obsolete = @(
  '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\01. 아그니르 도시 전투 구역.md',
  '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\02. 검은 사수의 왼팔 성소.md',
  '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\03. 아그니르 도시 외곽 진입로.md',
  '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\04. 성소 외곽 회랑 및 격리 구역.md'
)
foreach ($path in $obsolete) {
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Expected extracted source missing: $path" }
  Remove-Item -LiteralPath $path
}
```

- [ ] **Step 5: 이동한 이미지 4개의 SHA-256과 4개 UUID 참조를 검사한다.**

Run:

```powershell
Get-FileHash -LiteralPath `
  '11. 맵\도시\M_CITY001_도시 전투 구역_맵.webp', `
  '11. 맵\도시\M_CITY002_도시 외곽 진입로_맵.webp', `
  '11. 맵\성소\M_SHRINE001_검은 사수의 왼팔 성소_맵.webp', `
  '11. 맵\성소\M_SHRINE002_성소 외곽 회랑 및 격리 구역_맵.webp' `
  -Algorithm SHA256
rg -n 'f64579ed-12a1-4c24-a3c4-c675b9695fea|8060cb5a-0e2b-4ee5-b41d-82fa2c008bca|c0350d55-2d40-419c-83ea-ef2785dd8e0f|38289b6a-e3c2-492d-a4f1-31a50db793de' `
  '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵\00. 맵 목록.md' `
  '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\장면'
```

Expected: Task 1의 뒤 네 SHA-256과 일치하며, 장면 01~07과 세션 맵 목록이 기존 UUID를 계속 참조한다.

### Task 4: 신규 세션·이미지 생성 지침을 공용 카탈로그 계약으로 전환

**Files:**
- Modify: `AGENTS.md`
- Modify: `1. 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/00. TRPG 세션 매니저 프로젝트 기본 지침.md`
- Modify: `1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/0. 세션 제작 마스터 프롬프트.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/1. 세션 제작 기본 지침서.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/2. 세션 구조 및 장면 설계 지침.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/6. 세션 문서 양식 및 출력 규칙.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/7. 세션 품질 검수 체크리스트.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/9. 세션 자산 및 VTT 준비 지침.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/템플릿/단일 세션 템플릿.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/템플릿/연속 세션 회차 템플릿.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/2. 배틀맵 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/2. 배틀맵 생성/0. 배틀맵 생성 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/6. 풍경 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/6. 풍경 생성/0. 풍경 생성 마스터 프롬프트.md`

**Interfaces:**
- Consumes: 공용 카탈로그 구조, UUID·코드 규칙, 세션과 공용 문서의 소유 경계
- Produces: 이후 세션 제작과 배틀맵·풍경 생성에 적용되는 단일 저장·참조 규칙

- [ ] **Step 1: 전역 진입 문서 4종에 공용 맵 정본 규칙을 같은 의미로 반영한다.**

`11. 맵 이미지`를 현재 저장 루트로 안내하는 표현은 `11. 맵` 공용 카탈로그로 바꾼다. 모든 맵의 물리 자산은 공용 카탈로그에만 두며 세션은 `map_uuid`를 참조한다는 점, 특정 지역명을 공용 이름에 넣지 않는다는 점, `map_code`가 변경 가능하다는 점을 네 문서에 같은 의미로 기록한다.

- [ ] **Step 2: 세션 제작 문서·템플릿에서 세션 개별 맵 파일 생성 계약을 공용 맵 검색·생성·참조 계약으로 바꾼다.**

다음 오래된 계약을 모두 제거하거나 정정한다.

```text
세션 패키지 안의 맵/NN. [맵명].md가 맵 정본이다.
장면이 map_uuid와 맵 파일을 직접 참조한다.
맵/00. 맵 목록.md가 세션 맵 자산의 기준 원장이다.
```

새 계약은 아래와 같다.

```text
세션 제작은 먼저 11. 맵에서 환경·공간·map_uuid를 검색한다.
기존 공용 맵을 쓰면 같은 map_uuid를 사용하고 세션에는 사용 방식과 장면 운용만 기록한다.
새 맵이면 11. 맵의 환경 폴더에 공용 맵 문서와 자산을 만들고 새 map_uuid를 부여한다.
세션의 맵/00. 맵 목록.md는 이번 회차의 map_uuid 참조 원장이다.
```

품질 체크리스트에는 공용 맵 문서 존재, UUID 참조 일치, 세션 폴더의 개별 맵 사본 없음, 논리 그리드 5 단위, 활성 경로 참조 없음 검사를 추가한다.

- [ ] **Step 3: 배틀맵·풍경 생성 모듈의 최종 저장 규칙을 공용 맵 자산 계약으로 바꾼다.**

배틀맵은 `<map_code>_<map_title>_맵.webp`, 풍경은 `<map_code>_<map_title>_풍경.webp`로 해당 환경 폴더에 저장한다. 새 자산을 생성하기 전에는 같은 공간의 `map_uuid`와 기존 자산을 찾아 재사용 여부를 판단하고, 신규 공간일 때만 공용 맵 문서와 새 UUID를 만든다. 그리드 이미지는 저장 대상에 포함하지 않는다.

- [ ] **Step 4: 지침 간 현재 경로와 금지된 이전 계약이 남지 않았는지 검사한다.**

Run:

```powershell
rg -n '11\. 맵 이미지|세션 맵 자산의 기준 원장|map_uuid와 맵 파일을 직접 참조|맵/NN\. \[맵명\]\.md' `
  'AGENTS.md' `
  '1. 프롬프트'
```

Expected: 역사 문서와 이번 실행 계획·검증 보고서를 제외한 활성 지침·템플릿에서는 0건이다.

### Task 5: 전체 정합성 검증과 이전 루트 정리

**Files:**
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`
- Modify: `작업 정비/공용 맵 카탈로그 전환 정비.md`
- Modify: `작업 정비/작업 정비 현황.md`
- Create: `docs/superpowers/reports/2026-09-09-common-map-catalog-migration-verification.md`
- Delete only after verification: 비어 있는 `11. 맵 이미지/`

**Interfaces:**
- Consumes: Task 1~4의 카탈로그 구조, 해시, UUID 참조, 지침 변경
- Produces: 검증 보고서와 공식 상태 `완료` 또는 구체적 실패 기록

- [ ] **Step 1: 공용 카탈로그 수와 파일 구성을 검사한다.**

```powershell
$mapDocs = Get-ChildItem -LiteralPath '11. 맵' -Recurse -Filter '*.md'
$mapImages = Get-ChildItem -LiteralPath '11. 맵' -Recurse -Filter '*.webp'
if ($mapDocs.Count -ne 6) { throw "Expected 6 common map documents, got $($mapDocs.Count)" }
if ($mapImages.Count -ne 7) { throw "Expected 7 common map images, got $($mapImages.Count)" }
rg -n '^map_uuid: [0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' '11. 맵'
```

Expected: 공용 맵 문서 6개, 이미지 7개, 서로 다른 `map_uuid` 6개.

- [ ] **Step 2: 모든 이동 이미지의 해시와 세션 참조를 한 번에 검증한다.**

```powershell
$expected = @{
  '11. 맵\비공정\M_AIRSHIP001_오리진 비공정_풍경.webp' = 'F4B471AD9816064EC1378F5CB6C7A79B59F66D0E40E2C1BA05768EAF48F2343D'
  '11. 맵\동굴\M_CAVE001_수정 동굴_맵.webp' = '846A1345F426CEFF40C407C14468963BF73A570E3C62CCFCD360815C696029A2'
  '11. 맵\동굴\M_CAVE001_수정 동굴_풍경.webp' = 'D66118E1967273ED192216FD4279FFAD164F9A659B1CCF63DFF23AEEC40A40B1'
  '11. 맵\도시\M_CITY001_도시 전투 구역_맵.webp' = '04F749BA0DA406B3F6992287152E4C3DE90F42806EB34564812D2341F9D2EA2E'
  '11. 맵\도시\M_CITY002_도시 외곽 진입로_맵.webp' = '0238EBB38B9AB4A737237690AE1AC0467831C98A878CDF7458ADD798AA0F4363'
  '11. 맵\성소\M_SHRINE001_검은 사수의 왼팔 성소_맵.webp' = '1E6CA44E7635CA27698DD9A23A13428251D2AA8D7599BE81BC67F96848AA30D2'
  '11. 맵\성소\M_SHRINE002_성소 외곽 회랑 및 격리 구역_맵.webp' = 'BC8ABC07A4E9EF021D77E8225F9E45CA67BFF4529F63A0EEBC1ED3DF3D947CAF'
}
foreach ($path in $expected.Keys) {
  $actual = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash
  if ($actual -ne $expected[$path]) { throw "SHA mismatch: $path" }
}
$sessionMapRoot = '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획\맵'
if ((Get-ChildItem -LiteralPath $sessionMapRoot -File | Where-Object { $_.Name -ne '00. 맵 목록.md' }).Count -ne 0) {
  throw 'Session map folder still contains a physical map document or image.'
}
rg -n '맵/(01\. 아그니르 도시 전투 구역|02\. 검은 사수의 왼팔 성소|03\. 아그니르 도시 외곽 진입로|04\. 성소 외곽 회랑 및 격리 구역)\.md' `
  '17. 세션 설계\남아있는 이야기\섬에서 전해진 바람 상편 2 기획'
```

Expected: SHA-256 오류 없음, 세션 `맵` 폴더에는 `00. 맵 목록.md`만 남음, 활성 세션 문서의 이전 물리 경로 참조 0건.

- [ ] **Step 3: Markdown과 활성 지침의 형식을 검사하고 검증 보고서를 작성한다.**

Run:

```powershell
git diff --check -- `
  'AGENTS.md' `
  '1. 프롬프트' `
  '17. 세션 설계/남아있는 이야기/섬에서 전해진 바람 상편 2 기획' `
  'docs/superpowers' `
  '작업 정비'
```

검증 보고서에는 파일별 SHA-256, 6개 UUID, 7개 이미지·6개 공용 문서 수, 세션 맵 폴더 잔여 파일 수, 이전 물리 경로 참조 수, 활성 지침의 이전 저장 경로 참조 수를 기록한다. 모두 통과하면 레지스트리·작업 정비·현황을 `완료`로 갱신한다.

- [ ] **Step 4: 이전 루트가 비어 있음을 확인한 뒤에만 `11. 맵 이미지`를 제거한다.**

```powershell
$legacyRoot = '11. 맵 이미지'
$remaining = @(Get-ChildItem -LiteralPath $legacyRoot -Force)
if ($remaining.Count -ne 0) { throw "Legacy root is not empty: $legacyRoot" }
Remove-Item -LiteralPath $legacyRoot
```

Expected: `11. 맵 이미지`가 존재하지 않고, `11. 맵`만 공용 맵 물리 정본으로 남는다.

## Self-Review

### Spec coverage

- 단일 공용 카탈로그와 환경별 평면 저장: Task 2, Task 3
- 영구 UUID와 변경 가능 코드: Task 2, Task 3, Task 4
- 지역명 제외 공용 명명: Task 3, Task 4
- 공용 공간 정보와 세션 운용 정보 분리: Task 3
- 상태·재사용 이력 규칙: Task 2, Task 3, Task 4
- 6개 항목·7개 이미지 이관과 해시 보존: Task 1, Task 2, Task 3, Task 5
- 신규 세션·이미지 생성 저장 규칙: Task 4
- 이전 경로 정리와 검증 보고: Task 5

### Placeholder scan

미완성 지시나 다른 작업을 가리키는 축약 표현을 쓰지 않았다. 파일별 대상, UUID, 코드, 이동 전후 경로, 검증 명령을 모두 명시했다.

### Interface consistency

모든 세션·로그·하이라이트 참조는 `map_uuid`를 사용한다. `map_code`는 공용 카탈로그 문서와 파일명에서만 사람이 읽는 식별자로 사용하며, 세션의 물리 경로 참조는 Task 3에서 제거한다.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-09-common-map-catalog-migration.md`.

이 계획은 실제 파일 이동과 삭제를 포함하므로, 실행 시에는 작업마다 해시와 참조 검사를 마친 뒤 다음 작업으로 진행한다.
