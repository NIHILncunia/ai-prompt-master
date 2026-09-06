# Google Sheets Markdown 전환 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Google Sheets 4개의 실제 데이터를 전량 Markdown으로 전환·검증하고 원본 시트를 삭제한다.

**Architecture:** Google Sheets 메타데이터로 탭과 그리드 범위를 확정하고, 표시값과 수식을 분리해 읽는다. 실제 사용 범위를 Markdown 표로 직렬화하여 같은 Drive 부모에 업로드하고, readback으로 셀 값을 재구성해 원본과 대조한 뒤 원본만 영구 삭제한다.

**Tech Stack:** Google Drive 커넥터, Google Sheets API, Windows PowerShell, Markdown

**Spec:** `docs/superpowers/specs/2026-09-06-google-sheets-markdown-migration-design.md`

## Global Constraints

- 대상은 현재 확인된 Google Sheets 4개로 제한한다.
- 원본의 행 순서, 열 순서, 빈 셀과 표시값을 보존한다.
- 수식은 Markdown에서 실행하지 않고 현재 표시값과 수식 패턴을 기록한다.
- 업로드 readback 검증을 통과하기 전에는 원본을 삭제하지 않는다.
- 모든 결과 문서는 `.md`로 만든다.

---

### Task 1: 원본 구조와 데이터 범위 확정

**Files:**
- Read: Google Sheets 4개
- Create: `docs/superpowers/specs/2026-09-06-google-sheets-markdown-migration-design.md`

**Interfaces:**
- Consumes: 대상 시트 ID와 부모 폴더 ID
- Produces: 탭명, `sheetId`, 사용 행·열, 수식 분포

- [x] **Step 1: Drive 검색으로 네 원본 ID와 부모 폴더를 확정한다.**
- [x] **Step 2: 메타데이터에서 단일 탭 구조와 그리드 크기를 확인한다.**
- [x] **Step 3: 표시값 전체를 읽어 실제 사용 범위를 확정한다.**
- [x] **Step 4: 수식 범위와 수동 입력 범위를 구분한다.**

### Task 2: Markdown 변환과 업로드 검증

**Files:**
- Create: `4. 한글화/클래스   서브클래스 한글화 매핑.md`
- Create: `D&D 5.5E 추가 주문 모음.md`
- Create: `D&D 5.5E 추가 주문 상세 데이터.md`
- Create: `작업 정비/룰북 인덱싱 및 FVTT 컴펜디움 이관 체계/FVTT 룰북 검증 및 갱신 현황 - Google Sheets 전환 보존본.md`

**Interfaces:**
- Consumes: Task 1의 표시값 행렬과 수식 분포
- Produces: `text/markdown` 파일 4개와 원문 대조 결과

- 기존 `FVTT 룰북 검증 및 갱신 현황.md`는 최신 정본이므로 덮어쓰지 않는다. 시트의 이전 데이터는 별도 보존본으로 분리한다.

- [x] **Step 1: 네 표시값 행렬을 용도별 Markdown 표로 직렬화한다.**
- [x] **Step 2: 변환본의 행 수, 열 수, 빈 셀과 예약 문자 처리를 검사한다.**
- [x] **Step 3: 네 Markdown을 원본과 같은 Drive 부모 폴더에 업로드한다.**
- [x] **Step 4: 업로드본을 다시 읽고 원본 행렬과 대조한다.**

### Task 3: 원본 정리와 이력 기록

**Files:**
- Modify: `작업 정비/작업 정비 현황.md`
- Modify: `작업 정비/Google Sheets Markdown 전환 정비.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`
- Create: `docs/superpowers/reports/2026-09-06-google-sheets-markdown-migration-verification.md`

**Interfaces:**
- Consumes: Task 2의 업로드·readback 검증 결과
- Produces: 삭제된 원본 4개와 완료 이력

- [x] **Step 1: 검증을 통과한 Google Sheets 원본 4개를 영구 삭제한다.**
- [x] **Step 2: `.gsheet` 잔여 수와 원본 ID 삭제 상태를 확인한다.**
- [x] **Step 3: 작업 정비 현황과 검증 보고서에 전환·삭제 결과를 기록한다.**
- [x] **Step 4: Superpowers 레지스트리를 완료 상태로 갱신한다.**
- [x] **Step 5: Markdown 형식과 Drive readback을 최종 검증한다.**
