# Session Asset Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 세션 제작 기능이 장면 설계 이후 맵·스탯블록·이미지·토큰까지 준비하고 FVTT 데이터 변환만 6번 기능에 남기도록 지침과 템플릿을 개편한다.

**Architecture:** 기존 계단식 이야기·장면 설계를 유지하고 장면 기능 확장 다음에 `세션 자산 제작` 단계를 추가한다. 새 `9. 세션 자산 및 VTT 준비 지침.md`가 맵 산정, NPC·몬스터 스탯 정책, 이미지·토큰 제작, FVTT 경계를 전담하고 기존 마스터·장면·NPC·조우·출력·검수·템플릿 문서가 이를 참조한다.

**Tech Stack:** Markdown, Google Drive raw Markdown files, 기존 이미지 생성 기능, 4번 룰북 기능, 6번 FVTT 기능

**Spec:** `TRPG 데이터/docs/superpowers/specs/2026-09-04-session-asset-pipeline-design.md`

## Global Constraints

- 프로젝트 문서 형식은 `.md`를 사용한다.
- 신규 세션 산출물은 해당 Google Drive 작업 경로에 직접 저장하는 것이 기본이다.
- 기존 파일명은 변경하지 않는다.
- 기존 세션 패키지는 자동 이관하지 않는다.
- 이미지 생성 세부 스타일·비율·승인 절차는 해당 이미지 기능 지침을 따른다.
- 실제 FVTT Actor·Scene·Journal·Compendium·JSON 변환은 6번 기능에 유지한다.
- 모호한 주요 결정은 사용자에게 묻고, 이미 제공된 정보는 재질문하지 않는다.

---

### Task 1: 세션 자산 전문 지침 추가

**Files:**
- Create: `TRPG 데이터/1. 프롬프트/8. 세션 제작 프롬프트/9. 세션 자산 및 VTT 준비 지침.md`

**Interfaces:**
- Consumes: 장면 기능 확장 결과, 기존 이미지 생성 기능, 4번 룰북 기능
- Produces: 맵 목록·설계, NPC·몬스터 자산 목록, 스탯블록 정책, 이미지·토큰 제작 흐름, 6번 FVTT 기능 인계 기준

- [ ] **Step 1:** 설계 문서의 맵 산정·NPC/몬스터·스탯·이미지·토큰·FVTT 경계 규칙을 전문 지침으로 작성한다.
- [ ] **Step 2:** `장면 → 맵 → NPC/몬스터 → 스탯 → 이미지/토큰 → 검증` 순서를 명시한다.
- [ ] **Step 3:** `일반 NPC 기존 스탯 재사용`, `강조 NPC 전용 제작 확인`, `몬스터 등급 확인` 규칙을 명시한다.
- [ ] **Step 4:** 문서에서 `TODO`, `TBD`, `장면 모음`, `FVTT JSON을 세션 기능이 생성` 같은 금지 표현이 없는지 검사한다.

### Task 2: 실행 진입점과 단계 구조 갱신

**Files:**
- Modify: `0. 세션 제작 마스터 프롬프트.md`
- Modify: `2. 세션 구조 및 장면 설계 지침.md`
- Modify: `AGENTS.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: Task 1의 전문 지침
- Produces: 모든 세션 제작 요청이 새 후반 자산 제작 단계로 진입하는 라우팅

- [ ] **Step 1:** 마스터의 전체 단계에 맵 산정·배틀맵·NPC/몬스터 스탯·이미지·토큰 단계를 추가한다.
- [ ] **Step 2:** 장면 설계 지침에 `장면 기능 확장 완료 → 자산 설계 단계` 인계 조건을 추가한다.
- [ ] **Step 3:** AGENTS 필수 읽기와 기본 설계 방식에 9번 지침을 추가한다.
- [ ] **Step 4:** README의 기능 범위와 설계 흐름을 사용자용 설명으로 갱신한다.

### Task 3: NPC·몬스터와 조우 책임 갱신

**Files:**
- Modify: `3. NPC 설계 지침.md`
- Modify: `4. 조우 설계 지침.md`

**Interfaces:**
- Consumes: Task 1의 스탯 정책과 맵 정책
- Produces: NPC·몬스터 스탯 판정 및 조우의 맵·스탯 참조 규칙

- [ ] **Step 1:** NPC 지침에 `불필요 / 기존 재사용 / 전용 제작` 3분류를 추가한다.
- [ ] **Step 2:** 강조된 주요 NPC의 전용 제작 여부와 컨셉을 사용자에게 확인하도록 추가한다.
- [ ] **Step 3:** 모든 맵 배치 NPC는 토큰 대상임을 추가한다.
- [ ] **Step 4:** 조우 지침에 관련 맵·참여자 스탯블록 참조를 추가하고 스탯을 조우 파일에 중복하지 않도록 한다.

### Task 4: 패키지 구조와 템플릿 갱신

**Files:**
- Modify: `6. 세션 문서 양식 및 출력 규칙.md`
- Modify: `템플릿/단일 세션 템플릿.md`
- Modify: `템플릿/연속 세션 회차 템플릿.md`

**Interfaces:**
- Consumes: Task 1~3의 책임 분리
- Produces: 맵/NPC·몬스터/조우 하위 폴더와 인덱스 구조

- [ ] **Step 1:** 표준 세션 폴더에 `맵/`, `NPC 및 몬스터/`, `조우/`를 추가한다.
- [ ] **Step 2:** 기존 `03`, `04` 파일은 호환용 인덱스 역할로 유지하고 하위 상세 파일을 참조하도록 정한다.
- [ ] **Step 3:** 장면 목록 템플릿에 맵 참조 필드를 추가한다.
- [ ] **Step 4:** 맵 목록·맵 상세·NPC/몬스터 목록·스탯블록·조우 목록 템플릿을 추가한다.

### Task 5: 검수 기준 갱신

**Files:**
- Modify: `7. 세션 품질 검수 체크리스트.md`

**Interfaces:**
- Consumes: 모든 선행 Task
- Produces: 세션 자산 완료 판정

- [ ] **Step 1:** 맵 필요성·재사용·장면 할당·그리드 값 검수 항목을 추가한다.
- [ ] **Step 2:** NPC·몬스터의 스탯 정책과 강조 NPC 질의 여부를 검수한다.
- [ ] **Step 3:** 이미지·토큰 제작 상태를 검수한다.
- [ ] **Step 4:** FVTT 실제 데이터가 세션 제작 산출물에 섞이지 않았는지 검수한다.

### Task 6: 일관성 검증 및 Drive 반영

**Files:**
- Verify: Task 1~5 전체 문서

**Interfaces:**
- Consumes: 모든 수정 파일
- Produces: Drive에 반영된 일관된 세션 제작 기능

- [ ] **Step 1:** 전체 수정본에서 `장면 모음`, `4파일 패키지`, `이미지는 추가 제작 자료만`, `세션 제작은 이미지 생성 안 함` 등 구형 규칙을 검색한다.
- [ ] **Step 2:** 전체 수정본에서 `맵`, `그리드`, `스탯블록`, `토큰`, `6번 FVTT` 규칙 존재 여부를 검색한다.
- [ ] **Step 3:** 기존 파일은 같은 Drive ID에 덮어쓰고 새 9번 지침만 새 파일로 업로드한다.
- [ ] **Step 4:** Drive에서 다시 검색·읽기하여 실제 반영 내용을 확인한다.
