# Work Folder Drive ID Remapping Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 신규 작업 폴더의 지침 문서에 남은 기존 작업 폴더 ID를 동일 상대 경로의 신규 ID로 안전하게 교체한다.

**Architecture:** 기존·신규 Drive 트리를 각각 재귀 열거하고 상대 경로를 키로 1:1 매핑한다. 원격 문서와 로컬 복제본이 일치하는 파일만 로컬에서 치환한 뒤 같은 원격 파일 ID를 유지하여 갱신하고 재조회로 검증한다.

**Tech Stack:** Google Drive 파일 목록·조회·갱신 도구, PowerShell 5.1, ripgrep, Markdown

**Spec:** `docs/superpowers/specs/2026-09-06-work-folder-id-remapping-design.md`

## Global Constraints

- 설정 폴더 ID `1Wjo6z5YfZDTjzfwNNVhR4ubZ2CVhH6oj`는 변경하지 않는다.
- 상대 경로가 1:1로 대응하지 않는 폴더 ID는 자동 교체하지 않는다.
- 신규 작업 폴더 내부의 기존 Markdown 파일 ID를 유지한다.
- 파일 ID와 매핑에 없는 외부 폴더 ID는 변경하지 않는다.
- 변경 뒤 원격 문서를 다시 읽어 활성 지침의 잔여 기존 ID와 설정 폴더 ID를 검증한다.
- `.superpowers/sdd` 백업 5개와 완료 검증 보고서 1개는 역사적 증거로 보존한다.

---

### Task 1: 폴더 트리 매핑 확정

**Files:**
- Read: 기존 작업 폴더 전체 트리
- Read: 신규 작업 폴더 전체 트리

**Interfaces:**
- Consumes: 기존·신규 작업 폴더 루트 ID
- Produces: `relativePath`, `oldId`, `newId`를 가진 267개 매핑

- [x] **Step 1: 두 루트의 메타데이터와 직접 하위를 확인한다.**
- [x] **Step 2: 두 트리의 모든 하위 폴더를 재귀 열거한다.**
- [x] **Step 3: 상대 경로 중복·누락·동일 ID 재사용을 검사한다.**
- [x] **Step 4: 폴더 267개의 1:1 매핑을 확정한다.**

### Task 2: 변경 사용처 확정

**Files:**
- Read: 신규 작업 폴더의 Markdown 589개
- Modify: ID 사용처가 확인된 활성 지침 17개

**Interfaces:**
- Consumes: Task 1의 확정 매핑
- Produces: 파일별 정확한 치환 목록 175건과 보존 예외 136건

- [x] **Step 1: 신규 복제본의 Markdown에서 Drive ID 후보를 추출한다.**
- [x] **Step 2: 후보를 기존 폴더 ID 집합과 대조한다.**
- [x] **Step 3: 활성 지침 17개·치환 175건과 역사·백업 기록 6개·보존 136건을 확정한다.**
- [x] **Step 4: 원격 활성 지침 17개와 로컬 복제본의 본문 일치를 확인한다.**

### Task 3: 지침 문서 갱신

**Files:**
- Modify: `AGENTS.md`
- Modify: `1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`
- Modify: `1. 프롬프트/00. TRPG 세션 매니저 프로젝트 기본 지침.md`
- Modify: `1. 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/공통/AGENTS.md`
- Modify: `1. 프롬프트/공통/종족 데이터/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/AGENTS.md`
- Modify: `1. 프롬프트/2. 로그 하이라이트 추출 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/3. 로그 분석 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/4. 룰북 관련 요청 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/5. 설정 관련 요청 프롬프트/0. 설정 관련 요청 마스터 프롬프트.md`
- Modify: `1. 프롬프트/5. 설정 관련 요청 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/6. FVTT 관련 요청 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/7. 창작 지원 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/7. 창작 지원 프롬프트/능력 제작/AGENTS.md`
- Modify: `1. 프롬프트/7. 창작 지원 프롬프트/클래스 제작/AGENTS.md`
- Modify: `1. 프롬프트/7. 창작 지원 프롬프트/특성 제작/AGENTS.md`

**Interfaces:**
- Consumes: 확정 치환 목록 175건
- Produces: 기존 파일 ID를 유지한 신규 폴더 ID 참조 문서 17개

- [x] **Step 1: 로컬 복제본에서 정확한 기존 ID 문자열만 신규 ID로 치환한다.**
- [x] **Step 2: 파일별 치환 횟수가 사전 집계와 일치하는지 검사한다.**
- [x] **Step 3: 같은 Drive 파일 ID를 유지하여 원격 본문을 갱신한다.**

### Task 4: 원격 재검증과 완료 기록

**Files:**
- Create: `docs/superpowers/reports/2026-09-06-work-folder-id-remapping-verification.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`
- Modify: `작업 정비/작업 정비 현황.md`
- Modify: `작업 정비/작업 폴더 ID 일괄 이관 정비.md`

**Interfaces:**
- Consumes: 갱신된 원격 문서 17개
- Produces: 재조회 검증 결과와 완료 상태 기록

- [x] **Step 1: 갱신된 원격 17개 문서를 다시 읽는다.**
- [x] **Step 2: 활성 지침의 기존 ID 잔여 0건, 신규 ID 175건, 설정 폴더 ID 17건을 확인한다.**
- [x] **Step 3: 검증 보고서를 신규 작업 폴더에 업로드하고 존재와 내용을 확인한다.**
- [x] **Step 4: 레지스트리와 작업 정비 기록을 완료 상태로 갱신한다.**
