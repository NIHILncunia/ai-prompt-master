# 세션 제작 패키지형 산출물 및 저장 구조 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 8번 세션 제작이 로컬에서는 `2. 로그/세션 설계`에 4파일 세션 패키지를 저장하고, 웹 GPT에서는 같은 구조의 ZIP을 제공하도록 지침과 템플릿을 개편한다.

**Architecture:** 스토리 폴더 아래에 회차별 세션 패키지 폴더를 둔다. 각 패키지는 시나리오·장면 모음·등장인물 및 몬스터·조우 설계의 4개 Markdown 파일로 구성하고, 서로의 내용을 중복하지 않고 항목명으로 참조한다.

**Tech Stack:** UTF-8 Markdown, PowerShell, ripgrep

## Global Constraints

- Codex는 로컬 `G:\내 드라이브\TRPG 데이터\2. 로그\세션 설계\`에 저장할 수 있다.
- 웹 GPT는 동일한 상대 경로를 보존한 ZIP만 제공하며 Drive를 직접 변경하지 않는다.
- 모든 세션 패키지는 조우 여부와 무관하게 4개 파일을 포함한다.
- 기존 단일 파일 세션은 자동 이관하지 않는다.
- 파일명에 `최종`, `수정본`, 날짜, 임의 버전 접미사를 붙이지 않는다.

---

### Task 1: 저장 루트와 8번 기능 산출물 계약 갱신

**Files:**
- Create: directory `2. 로그/세션 설계/`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/0. 세션 제작 마스터 프롬프트.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/README.md`

**Interfaces:**
- Consumes: 승인된 `specs/2026-08-09-session-package-output-design.md`
- Produces: 세션 패키지의 경로·4파일 구성·실행 환경 정책을 정의하는 8번 기능 진입 규칙

- [ ] **Step 1: 생성 전 경로와 기존 단일 파일 규칙 확인**

Run: `Test-Path '.\\2. 로그\\세션 설계'; rg -n "Markdown 파일 하나|별도 파일로 분리하지 않는다" '.\\1. 프롬프트\\8. 세션 제작 프롬프트'`

Expected: `세션 설계`는 없고, 기존 단일 파일 규칙이 8번 활성 문서에서 확인된다.

- [ ] **Step 2: 세션 설계 루트를 생성**

Create the directory `2. 로그/세션 설계/`; do not create speculative story or session folders, and do not add a placeholder file.

- [ ] **Step 3: 기능 진입 문서를 패키지 계약으로 교체**

Replace the single-file and separation-prohibition language with the story folder → session folder → four numbered files contract. State the Codex-local and web-GPT-ZIP distinction explicitly. Correct only log-analysis references from old `6번` to current `3번`; leave FVTT `6번` unchanged.

- [ ] **Step 4: 기능 안내를 같은 계약으로 동기화**

Update the README to describe the 4-file package, the conditional `00. 세션 아크 개요.md`, no auto-migration, and ZIP delivery path policy.

- [ ] **Step 5: 계약 검증**

Run: `rg -n "세션 설계|웹 GPT|4파일|01\. .*시나리오|03\. .*등장인물|04\. .*조우" '.\\1. 프롬프트\\8. 세션 제작 프롬프트\\AGENTS.md' '.\\1. 프롬프트\\8. 세션 제작 프롬프트\\0. 세션 제작 마스터 프롬프트.md' '.\\1. 프롬프트\\8. 세션 제작 프롬프트\\README.md'`

Expected: all three documents expose the new package contract.

### Task 2: 출력 규칙·검수 기준·템플릿을 역할별 파일로 분해

**Files:**
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/6. 세션 문서 양식 및 출력 규칙.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/7. 세션 품질 검수 체크리스트.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/템플릿/단일 세션 템플릿.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/템플릿/연속 세션 회차 템플릿.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/템플릿/세션 아크 개요 템플릿.md`

**Interfaces:**
- Consumes: Task 1's package contract
- Produces: 파일별 frontmatter, 섹션 책임, ZIP 구조 및 품질 검수 기준

- [ ] **Step 1: 현재 출력 규칙과 템플릿의 섹션을 파일별로 분류**

Assign scenario-level sections to `01`, full scene entries to `02`, NPC/monster profiles to `03`, and encounter operation records to `04`; retain only arc-level information in `00`.

- [ ] **Step 2: 출력 규칙을 4파일 기준으로 다시 작성**

Define the exact folder tree, filename pattern, shared session-identifying frontmatter, cross-reference convention, the mandatory `04` no-encounter declaration, and ZIP structure.

- [ ] **Step 3: 템플릿 세트를 패키지 형식으로 교체**

Make the two session templates present all four file skeletons in one Markdown template document, with explicit file boundaries. Adjust the arc template to live at story-folder level and reference package folders.

- [ ] **Step 4: 검수 체크리스트를 패키지 검수로 교체**

Replace the one-file and no-separation checks with checks for all four files, duplicate-content avoidance, scene-to-profile/encounter references, the required no-encounter record, UTF-8, and correct ZIP relative path.

- [ ] **Step 5: 템플릿과 규칙의 구조 검증**

Run: `rg -n "01\. .*시나리오|02\. .*장면 모음|03\. .*등장인물 및 몬스터|04\. .*조우 설계|조우 없음|웹 GPT|ZIP" '.\\1. 프롬프트\\8. 세션 제작 프롬프트\\6. 세션 문서 양식 및 출력 규칙.md' '.\\1. 프롬프트\\8. 세션 제작 프롬프트\\7. 세션 품질 검수 체크리스트.md' '.\\1. 프롬프트\\8. 세션 제작 프롬프트\\템플릿'`

Expected: every required file role and delivery policy appears in the output contract and templates.

### Task 3: 상위 라우팅 동기화 및 전수 검증

**Files:**
- Modify: `1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`
- Create: `docs/superpowers/reports/2026-08-09-session-package-output-verification.md`

**Interfaces:**
- Consumes: Task 1 and Task 2 documents
- Produces: 상위 기능 설명과 일치하는 검증 보고서 및 공식 완료 상태

- [ ] **Step 1: 통합 마스터의 8번 출력 요약을 패키지형으로 갱신**

Replace the old one-Markdown-file output description with the `2. 로그/세션 설계/[스토리명]/[세션 번호] [세션 제목]/` package and web-GPT ZIP rule.

- [ ] **Step 2: 상위 공통 문서의 충돌 여부 확인**

Run: `rg -n "세션 하나당 Markdown 파일 하나|세션 하나 = Markdown 파일 하나|NPC와 조우.*별도 파일" '.\\AGENTS.md' '.\\1. 프롬프트\\AGENTS.md' '.\\1. 프롬프트\\00. TRPG 세션 매니저 프로젝트 기본 지침.md' '.\\1. 프롬프트\\0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md'`

Expected: no conflicting session-output statement remains outside the updated 8번 documents.

- [ ] **Step 3: 활성 문서의 구 계약과 구 로그 분석 번호를 전수 검사**

Run: `rg -n "세션 하나당 Markdown 파일 하나|세션 하나 = Markdown 파일 하나|NPC와 조우는 별도 파일로 분리하지 않는다|로그 분석: 6번|종료된 세션 로그 분석: 6번" '.\\1. 프롬프트\\8. 세션 제작 프롬프트'`

Expected: no matches.

- [ ] **Step 4: 검증 보고서와 레지스트리 상태를 기록**

Create a report with changed-file inventory and the exact verification outputs. Update the registry to `완료` only after the report exists and is read back.

- [ ] **Step 5: 최종 존재성·참조 검증**

Run: `Test-Path '.\\2. 로그\\세션 설계'; Test-Path '.\\docs\\superpowers\\reports\\2026-08-09-session-package-output-verification.md'; rg -n "2026-08-09-session-package-output" '.\\docs\\superpowers\\SUPERPOWERS WORK REGISTRY.md'`

Expected: all commands report existing artifacts and the registry record.
