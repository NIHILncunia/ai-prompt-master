# 이미지 생성 모듈 최종 전환 및 프롬프트 1~8 재번호 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 구 이미지 기능 8개를 제거하고 `1. 이미지 생성 모듈`과 비이미지 기능 2~8번만 남는 단일 활성 프롬프트 체계를 만든다.

**Architecture:** 먼저 신규 이미지 모듈을 유일한 정본으로 완결하고, 삭제 대상의 백업·이관·참조 제거를 증명한다. 이후 구 이미지 폴더 삭제와 비이미지 폴더 재번호를 하나의 전환 배치로 실행하고, 상위 라우터와 모든 현행 참조를 새 1~8 체계로 동기화한다.

**Tech Stack:** PowerShell, ripgrep, Markdown, Google Drive 동기화 폴더, SHA-256, Superpowers 작업 레지스트리.

## Global Constraints

- 활성 최상위 기능은 `1. 이미지 생성 모듈`과 2~8번 비이미지 기능만 남긴다.
- 구 이미지 기능 폴더는 검증된 백업과 운영 참조 0건 확인 전에는 삭제하지 않는다.
- `공통`, `보관`, `docs/superpowers`와 역사 Superpowers 문서는 재번호하거나 삭제하지 않는다.
- 현재 운영 문서만 경로·번호를 갱신한다. 과거 설계·계획·감사·인계 문서의 구 번호는 역사 기록으로 보존한다.
- Codex는 로컬 동기화 Markdown을 직접 읽으며, 외부 Drive 접근 시작 문구를 사용하지 않는다.
- 모든 삭제·이름 변경 전후에는 실제 경로·인벤토리·참조 결과를 기록한다.

---

## 전환 대상

### 삭제할 구 이미지 폴더

```text
1. 포트레이트 생성 프롬프트
2. 배틀맵 생성 프롬프트
3. 캐릭터 레퍼런스 시트 생성 프롬프트
5. 세션 하이라이트 이미지 생성 프롬프트
10. 토큰 프레임 생성 프롬프트
12. 풍경 일러스트 생성 프롬프트
13. 게임 아이콘 생성 프롬프트
14. 월드 지도 생성 프롬프트
```

### 이름을 변경할 비이미지 폴더

```text
4. 로그 하이라이트 추출 프롬프트 -> 2. 로그 하이라이트 추출 프롬프트
6. 로그 분석 프롬프트 -> 3. 로그 분석 프롬프트
7. 룰북 관련 요청 프롬프트 -> 4. 룰북 관련 요청 프롬프트
8. 설정 관련 요청 프롬프트 -> 5. 설정 관련 요청 프롬프트
9. FVTT 관련 요청 프롬프트 -> 6. FVTT 관련 요청 프롬프트
11. 창작 지원 프롬프트 -> 7. 창작 지원 프롬프트
15. 세션 제작 프롬프트 -> 8. 세션 제작 프롬프트
```

### 반드시 동기화할 상위 운영 문서

```text
TRPG 데이터/AGENTS.md
TRPG 데이터/1. 프롬프트/AGENTS.md
TRPG 데이터/1. 프롬프트/00. TRPG 세션 매니저 프로젝트 기본 지침.md
TRPG 데이터/1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md
TRPG 데이터/1. 프롬프트/1. 이미지 생성 모듈/공통/1. 이미지 생성 공통 승인 절차.md
```

### Task 1: 전환 기준선과 복구 지점 생성

**Files:**
- Read: `1. 프롬프트/**`
- Create: `docs/superpowers/reports/2026-08-08-image-generation-module-final-cutover-baseline.md`
- Create: 사용자 적용용 백업 디렉터리 또는 ZIP

**Interfaces:**
- Consumes: 최종 전환 설계의 삭제 대상·재번호표.
- Produces: `baseline` 인벤토리, SHA-256 목록, 삭제 대상 백업 경로, 현행 참조 목록.

- [x] **Step 1: 삭제·재번호 대상의 실제 경로를 확인한다.**

```powershell
$root = 'G:\내 드라이브\TRPG 데이터\1. 프롬프트'
$targets = @('1. 포트레이트 생성 프롬프트','2. 배틀맵 생성 프롬프트','3. 캐릭터 레퍼런스 시트 생성 프롬프트','5. 세션 하이라이트 이미지 생성 프롬프트','10. 토큰 프레임 생성 프롬프트','12. 풍경 일러스트 생성 프롬프트','13. 게임 아이콘 생성 프롬프트','14. 월드 지도 생성 프롬프트','4. 로그 하이라이트 추출 프롬프트','6. 로그 분석 프롬프트','7. 룰북 관련 요청 프롬프트','8. 설정 관련 요청 프롬프트','9. FVTT 관련 요청 프롬프트','11. 창작 지원 프롬프트','15. 세션 제작 프롬프트','1. 이미지 생성 모듈')
$targets | ForEach-Object { "$_ | $(Test-Path -LiteralPath (Join-Path $root $_))" }
```

Expected: 16개 대상이 모두 `True`이며, 하나라도 `False`면 전환을 중지하고 실제 구조를 다시 설계한다.

- [x] **Step 2: 삭제 대상 8개 폴더의 파일 인벤토리와 SHA-256을 수집한다.**

```powershell
$legacy = $targets[0..7] | ForEach-Object { Join-Path $root $_ }
Get-ChildItem -LiteralPath $legacy -Recurse -File |
  Get-FileHash -Algorithm SHA256 |
  Sort-Object Path
```

Expected: 백업과 삭제 후 검증에 사용할 해시 목록을 확보한다.

- [x] **Step 3: 삭제 대상 8개 폴더를 정확한 상대 경로로 백업한다.**

```powershell
$backupRoot = 'G:\내 드라이브\TRPG 데이터\docs\superpowers\backups\2026-08-08-image-generation-module-final-cutover'
```

`$backupRoot` 아래에 `1. 프롬프트` 기준 상대 경로를 유지해 복사하고, 원본·백업의 파일 수와 SHA-256 집합이 같은지 비교한다.

Expected: 원본과 백업의 경로·파일 수·해시가 모두 일치한다.

- [x] **Step 4: 기준선 보고서에 실제 목록, 백업 위치, 해시 검증 결과를 기록한다.**

Expected: 이후 삭제 단계가 백업 검증 보고서를 참조할 수 있다.

### Task 2: 신규 이미지 모듈 정본 완결

**Files:**
- Modify: `TRPG 데이터/AGENTS.md`
- Modify: `1. 프롬프트/00. TRPG 세션 매니저 프로젝트 기본 지침.md`
- Modify: `1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/5. 토큰 프레임 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/6. 풍경 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/7. 게임 아이콘 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/8. 월드 지도 생성/AGENTS.md`

**Interfaces:**
- Consumes: 감사 C-01~C-04와 최종 전환 설계의 정본 완결 게이트.
- Produces: 신규 이미지 모듈만으로 실행 가능한 상위·하위 라우팅.

- [x] **Step 1: 두 상위 문서의 중첩 경로 6건을 실제 공통 승인 경로로 바꾼다.**

Replace:

```text
1. 이미지 생성 모듈/1. 이미지 생성 모듈/공통/1. 이미지 생성 공통 승인 절차.md
```

With:

```text
1. 이미지 생성 모듈/공통/1. 이미지 생성 공통 승인 절차.md
```

- [x] **Step 2: 포트레이트 단일 실행 모드 문장을 고정 파이프라인 계약으로 통일한다.**

The resulting rule must state:

```text
전신 9:16 1장 → 전신 확정 → 동일 개체 흉상 9:16 1장.
전신과 흉상은 각각 요구사항 확인서와 명시적 승인을 거치는 별도 이미지 생성 호출이다.
```

- [x] **Step 3: 최상위 AGENTS의 접근 정책을 Codex 로컬 Markdown 직접 접근 규칙으로 통일한다.**

Expected: `구글 드라이브에 접근을 시도합니다.`를 강제하는 문장이 활성 운영 규칙에서 사라지고, 로컬 동기화 경로를 직접 읽는 방식만 남는다.

- [x] **Step 4: 내부 5~8번 AGENTS에 동일한 최소 라우터 형식을 추가한다.**

Each file must contain:

```text
역할
읽기 순서: 0번 마스터 → 이미지 생성 공통 승인 절차 → 기능 실행 문서 → 필요한 라이브러리
기능 경계 또는 핵심 산출물 계약
```

- [x] **Step 5: 신규 이미지 모듈의 모든 명시 Markdown 경로를 실제 파일과 대조한다.**

```powershell
rg -n -F '1. 이미지 생성 모듈/1. 이미지 생성 모듈/' 'G:\내 드라이브\TRPG 데이터\1. 프롬프트'
```

Expected: 출력 0건.

### Task 3: 삭제 전 운영 참조 0건 게이트

**Files:**
- Read: 현재 운영 문서 및 활성 기능 문서
- Create: `docs/superpowers/reports/2026-08-08-image-generation-module-final-cutover-predelete-verification.md`

**Interfaces:**
- Consumes: Task 1 백업 증명과 Task 2 신규 정본 완결.
- Produces: 삭제 승인 가능한 구 이미지 경로 참조 0건 보고서.

- [x] **Step 1: 역사 문서를 제외한 운영 검색 범위를 확정한다.**

Exclude:

```text
docs/superpowers/specs/
docs/superpowers/plans/
docs/superpowers/reports/
1. 프롬프트/보관/
```

- [x] **Step 2: 구 이미지 폴더명 8종의 운영 참조를 검색한다.**

```powershell
rg -n -F -e '1. 포트레이트 생성 프롬프트' -e '2. 배틀맵 생성 프롬프트' -e '3. 캐릭터 레퍼런스 시트 생성 프롬프트' -e '5. 세션 하이라이트 이미지 생성 프롬프트' -e '10. 토큰 프레임 생성 프롬프트' -e '12. 풍경 일러스트 생성 프롬프트' -e '13. 게임 아이콘 생성 프롬프트' -e '14. 월드 지도 생성 프롬프트' 'G:\내 드라이브\TRPG 데이터\1. 프롬프트'
```

Classify every result as history, inactive archive, or active operation. Active-operation results must be changed to their image-module target before deletion.

- [x] **Step 3: 새 이미지 모듈 내부 1~8번의 이관 완료를 다시 확인한다.**

Expected: 각 내부 기능의 AGENTS, README, 0번 마스터와 필요한 실행 문서·라이브러리가 존재한다.

- [x] **Step 4: 삭제 전 검증 보고서에 8개 폴더별 이관 근거·백업·운영 참조 0건을 기록한다.**

Expected: 이 보고서가 없으면 Task 4를 실행하지 않는다.

### Task 4: 구 이미지 폴더 제거

**Files:**
- Delete: Task 1의 구 이미지 폴더 8개
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`

**Interfaces:**
- Consumes: 백업 검증 성공 및 삭제 전 운영 참조 0건 보고서.
- Produces: 구 이미지 최상위 번호가 제거된 프롬프트 루트.

- [x] **추가 보정: 신규 포트레이트 프리셋의 과거 3D 렌더링 정체성을 붓터치 반실사 계약으로 교체한다.**

- [x] **Step 1: 삭제 직전 대상 경로와 백업 경로를 다시 확인한다.**

Expected: 원본 8개와 백업 8개가 모두 존재하며, 삭제 대상이 `1. 프롬프트` 밖으로 확장되지 않는다.

- [x] **Step 2: 정확한 8개 폴더만 제거한다.**

Expected: `1. 이미지 생성 모듈`, `공통`, `보관`, 비이미지 7개 폴더는 남는다.

- [x] **Step 3: 삭제 후 프롬프트 루트를 목록화한다.**

```powershell
Get-ChildItem -LiteralPath 'G:\내 드라이브\TRPG 데이터\1. 프롬프트' -Directory | Select-Object -ExpandProperty Name
```

Expected: 구 이미지 폴더명 8개가 0건이고 신규 모듈은 존재한다.

- [x] **Step 4: 레지스트리에 삭제 후 검증 보고서와 전환 진행 상태를 반영한다.**

### Task 5: 비이미지 기능 폴더 일괄 재번호

**Files:**
- Rename: 최종 번호 계약의 비이미지 폴더 7개

**Interfaces:**
- Consumes: 구 이미지 폴더 제거 완료.
- Produces: 최상위 `1~8 + 공통 + 보관` 실제 디렉터리 구조.

- [x] **Step 1: 최종 목적지 2~8번이 비어 있는지 검사한다.**

Expected: 구 이미지 폴더가 제거됐으므로 목적지 충돌이 없다.

- [x] **Step 2: 큰 번호에서 작은 번호 순으로 7개 폴더를 이름 변경한다.**

```text
15 -> 8, 11 -> 7, 9 -> 6, 8 -> 5, 7 -> 4, 6 -> 3, 4 -> 2
```

Expected: 중간 충돌 없이 모든 폴더가 목적지에 도달한다.

- [x] **Step 3: 실제 최상위 번호 폴더를 목록화한다.**

Expected:

```text
1. 이미지 생성 모듈
2. 로그 하이라이트 추출 프롬프트
3. 로그 분석 프롬프트
4. 룰북 관련 요청 프롬프트
5. 설정 관련 요청 프롬프트
6. FVTT 관련 요청 프롬프트
7. 창작 지원 프롬프트
8. 세션 제작 프롬프트
```

### Task 6: 기능 내부와 상위 라우터의 번호·경로 동기화

**Files:**
- Modify: 재번호된 2~8번 기능의 AGENTS, README, 0번 마스터, 실행 문서, 라이브러리, 템플릿
- Modify: 상위 운영 문서 5개

**Interfaces:**
- Consumes: Task 5의 실제 최종 경로.
- Produces: 새 번호만 해석하는 라우팅·상호 참조 체계.

- [x] **Step 1: 각 재번호 폴더 안의 `repository_path`, `drive_path`, 헤더, 본문 라우팅 번호를 새 값으로 갱신한다.**

Do not change internal execution document numbers such as `0.`, `1.`, `2.` inside a feature folder.

- [x] **Step 2: 상위 4개 운영 문서의 기능 목록·즉시 라우팅·준비 명령·기능 경계·상호 참조를 최종 1~8 번호로 갱신한다.**

- [x] **Step 3: 전환기 매핑표와 구 번호 해석 문구를 활성 운영 문서에서 제거한다.**

Remove concepts equivalent to:

```text
목표 번호 / 현재·구 번호 / Phase G 전까지 / 번호를 먼저 조회하여 의미 확정
```

- [ ] **Step 4: `준비`와 `준비 ?번`의 정의를 최종 1~8 체계로 통일한다.**

Expected: 번호만으로 한 기능을 결정하며 구 번호를 탐색하거나 병기하지 않는다.

- [ ] **Step 5: 창작 지원의 최상위 번호 7과 내부 제작기 번호·명칭의 구분을 유지한다.**

Expected: `준비 7번`은 창작 지원 모듈이고, 제작기 선택은 7번 내부 규칙으로 분기한다.

### Task 7: 최종 전수 검증과 완료 보고

**Files:**
- Create: `docs/superpowers/reports/2026-08-08-image-generation-module-final-cutover-verification.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`

**Interfaces:**
- Consumes: 최종 1~8 구조와 Task 1 백업 기록.
- Produces: 완료 판정 가능한 최종 검증 보고서와 레지스트리 상태.

- [x] **Step 1: 최상위 활성 번호 폴더가 정확히 1~8번인지 확인한다.**

```powershell
$root = 'G:\내 드라이브\TRPG 데이터\1. 프롬프트'
Get-ChildItem -LiteralPath $root -Directory |
  Where-Object { $_.Name -match '^[1-8]\. ' } |
  Select-Object -ExpandProperty Name |
  Sort-Object
```

Expected: 설계의 최종 정본 구조와 정확히 일치한다.

- [x] **Step 2: 구 이미지 폴더명 및 전환기 문구의 활성 운영 참조가 0건인지 확인한다.**

Expected: 역사 기록·보관을 제외한 활성 문서에서 0건이다.

- [x] **Step 3: 1번 이미지 모듈의 내부 1~8번과 모든 활성 기능의 AGENTS·README·0번 마스터 존재를 확인한다.**

Expected: 활성 진입점 누락 0건.

- [x] **Step 4: `준비`, `준비 1번`, `준비 4번`, `준비 7번`, `준비 8번`의 문서상 라우팅을 표본 대조한다.**

Expected: 각각 최종 번호 체계의 이미지 모듈, 룰북, 창작 지원, 세션 제작으로만 해석된다.

- [x] **Step 5: 원본과 백업의 해시·파일 수, 삭제 후 인벤토리, 변경된 현행 문서 목록을 최종 검증 보고서에 기록한다.**

- [x] **Step 6: 보고서가 실제 존재함을 확인한 뒤 레지스트리의 `2026-08-08-image-generation-module` 상태와 다음 작업을 갱신한다.**

## 계획 자체 검토

- 설계 2~8절은 Task 2~7에 각각 대응한다.
- 삭제 전에 백업·이관·운영 참조 0건을 강제하는 Task 1~3을 둔다.
- 구 폴더 삭제와 재번호는 Task 4~5에서 분리하되, 같은 전환 배치로 검증한다.
- 역사 기록 보존은 모든 Task의 전역 제약으로 적용한다.
