# Work Folder Routing Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 신규 작업 저장소·설정 폴더·사용자 전역 지침의 작업 폴더 라우팅을 신규 Drive ID와 Git 로컬 경로로 전환하고 메모리 갱신 요청을 남긴다.

**Architecture:** 기존·신규 작업 폴더의 상대 경로 기반 ID 매핑을 기준으로 활성 지침만 수정한다. 과거 작업 기록은 증거로 보존하고, 메모리는 직접 수정하지 않고 ad hoc 수정 요청 노트로 새 우선 규칙을 추가한다.

**Tech Stack:** Markdown, PowerShell, ripgrep, Git

**Spec:** `../specs/2026-09-06-work-folder-routing-migration-design.md`

## Global Constraints

- 설정 폴더 ID `1Wjo6z5YfZDTjzfwNNVhR4ubZ2CVhH6oj`는 변경하지 않는다.
- 사용자가 진행 중인 다른 설정 변경은 수정하지 않는다.
- 과거 계획·보고서와 메모리 이력의 당시 경로는 보존한다.
- 메모리는 `memories/extensions/ad_hoc/notes/`의 수정 요청 노트로만 갱신한다.

---

### Task 1: 활성 참조 전수 감사

**Files:**
- Read: `프로젝트 위그드라실/**/*.md`
- Read: `C:\Users\nihil\.codex\AGENTS.md`
- Read: `C:\Users\nihil\.codex\memories\MEMORY.md`

**Interfaces:**
- Consumes: 기존·신규 폴더 ID 267개 상대 경로 매핑
- Produces: 활성 수정 대상과 보존 대상 목록

- [x] **Step 1: 기존 ID 267개를 설정 폴더·사용자 지침·메모리에서 검색한다.**
- [x] **Step 2: 기존 CLI 경로와 임시 복사 경로를 검색한다.**
- [x] **Step 3: 활성 지침과 과거 기록을 분리한다.**

### Task 2: 활성 설정·사용자 지침 전환

**Files:**
- Modify: `C:\Users\nihil\coding\ai\ai-prompt-master\TRPG 데이터/AGENTS.md`
- Modify: `C:\Users\nihil\coding\ai\ai-prompt-master\TRPG 데이터/1. 프롬프트/**/*.md`
- Modify: `프로젝트 위그드라실/AGENTS.md`
- Modify: `프로젝트 위그드라실/문서 작성 및 수정 지침.md`
- Modify: `프로젝트 위그드라실/룩스테라/AGENTS.md`
- Modify: `프로젝트 위그드라실/엘드로스/AGENTS.md`
- Modify: `프로젝트 위그드라실/위그드라실/AGENTS.md`
- Modify: `C:\Users\nihil\.codex\AGENTS.md`

**Interfaces:**
- Consumes: Task 1의 활성 수정 대상
- Produces: 신규 ID·경로·기능 번호를 사용하는 활성 지침

- [x] **Step 1: 세 신규 폴더 ID를 대응하는 활성 참조에 적용한다.**
- [x] **Step 2: 신규 작업 저장소와 설정 지침의 Codex CLI 작업 경로를 Git 로컬 저장소로 전환한다.**
- [x] **Step 3: 설정 관련 요청 기능 번호와 경로를 5번으로 정정한다.**
- [x] **Step 4: 설정 폴더 ID와 경로가 유지됐는지 확인한다.**

### Task 3: 메모리 갱신 요청 기록

**Files:**
- Create: `C:\Users\nihil\.codex\memories\extensions\ad_hoc\notes\2026-09-06-<timestamp>-trpg-work-folder-routing.md`

**Interfaces:**
- Consumes: 확정된 신규 작업 폴더 ID와 로컬 경로
- Produces: 향후 메모리 재생성에 반영할 우선 규칙

- [x] **Step 1: 새 정본 ID·경로와 Git 저장소 정보를 기록한다.**
- [x] **Step 2: 과거 세션 경로는 역사 기록으로 보존하도록 명시한다.**
- [x] **Step 3: 수정 요청 노트의 파일명과 내용을 재조회한다.**

### Task 4: 정적 검증과 완료 기록

**Files:**
- Create: `프로젝트 위그드라실/docs/superpowers/reports/2026-09-06-work-folder-routing-migration-verification.md`
- Modify: `프로젝트 위그드라실/docs/superpowers/SUPERPOWERS SETTINGS REGISTRY.md`
- Modify: `프로젝트 위그드라실/설정 정비/설정 정비 현황.md`
- Modify: `프로젝트 위그드라실/설정 정비/작업 폴더 경로 및 ID 전환 정비.md`

**Interfaces:**
- Consumes: Tasks 1~3의 결과
- Produces: 잔여 참조 0건 검증과 완료 이력

- [x] **Step 1: 활성 문서에서 기존 ID·경로·구 기능 번호를 재검색한다.**
- [x] **Step 2: 변경 대상의 Git diff와 문서 형식을 검사한다.**
- [x] **Step 3: 검증 보고서와 레지스트리·정비 현황을 완료 상태로 갱신한다.**
- [x] **Step 4: 최종 작업 트리에서 사용자 기존 변경과 이번 변경을 구분한다.**
