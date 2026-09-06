# Google Docs Markdown 전환 및 정비 아카이브 정리 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Google Docs 3개를 Markdown으로 검증 전환하고 원본을 제거한 뒤 정비 아카이브 내부를 비우고 삭제 이력을 남긴다.

**Architecture:** 커넥터 읽기 결과를 Drive 밖 임시 경로의 UTF-8 Markdown으로 만들고 같은 부모 폴더에 업로드한다. 업로드 readback 이후 Google Docs 원본을 삭제하고, 아카이브의 원격 항목과 로컬 동기화 잔여 항목을 모두 제거한 다음 정본 기록을 갱신한다.

**Tech Stack:** Google Drive 커넥터, Windows PowerShell, Markdown

**Spec:** `docs/superpowers/specs/2026-09-06-gdoc-markdown-archive-cleanup-design.md`

## Global Constraints

- `작업 정비/정비 아카이브/` 폴더 자체는 보존한다.
- 원본 Google Docs는 대응 Markdown 업로드와 readback 검증 뒤에만 삭제한다.
- 삭제는 마스터가 명시한 아카이브 내부와 Google Docs 3개로 제한한다.
- 작업 결과는 `작업 정비/작업 정비 현황.md`와 Superpowers 레지스트리에 누적한다.

---

### Task 1: Google Docs 원문 전환

**Files:**
- Create: `지침  주문(spell) 템플릿.md`
- Temporary: `%LOCALAPPDATA%/Temp/codex-gdoc-markdown-archive-cleanup-20260906-01/_temp_gdoc_scag.md`
- Temporary: `%LOCALAPPDATA%/Temp/codex-gdoc-markdown-archive-cleanup-20260906-01/_temp_gdoc_upload.md`

**Interfaces:**
- Consumes: Google Docs 원문 3개와 각 원본 부모 폴더 ID
- Produces: Drive `text/markdown` 파일 3개와 검증된 파일 ID

- [x] **Step 1: 세 Google Docs의 단일 탭 구조와 원문을 읽는다.**
- [x] **Step 2: 원문 의미와 표·목록 구조를 보존한 UTF-8 Markdown 3개를 만든다.**
- [x] **Step 3: 변환본을 원본과 같은 Drive 부모 폴더에 업로드한다.**
- [x] **Step 4: 업로드본을 다시 읽어 MIME 유형과 내용을 검증한다.**
- [x] **Step 5: 검증을 통과한 Google Docs 원본 3개를 영구 삭제한다.**

### Task 2: 정비 아카이브 비우기

**Files:**
- Delete contents: `작업 정비/정비 아카이브/`

**Interfaces:**
- Consumes: 삭제 전 18개 파일·2개 하위 폴더 기준선과 Task 1 임시 업로드 2개
- Produces: 내부 항목이 0개인 보존된 아카이브 폴더

- [x] **Step 1: 원격 아카이브 파일과 하위 폴더의 ID를 다시 확인한다.**
- [x] **Step 2: 하위 파일부터 원격 항목을 영구 삭제한다.**
- [x] **Step 3: 검증된 절대 경로의 로컬 아카이브 내부만 재귀 삭제한다.**
- [x] **Step 4: 원격 폴더 목록과 로컬 재귀 목록이 모두 0개인지 확인한다.**

### Task 3: 이력과 검증 기록 갱신

**Files:**
- Modify: `작업 정비/작업 정비 현황.md`
- Modify: `작업 정비/Google Docs Markdown 전환 및 정비 아카이브 정리 정비.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`
- Create: `docs/superpowers/reports/2026-09-06-gdoc-markdown-archive-cleanup-verification.md`

**Interfaces:**
- Consumes: 업로드·삭제·빈 폴더 검증 결과
- Produces: 완료 상태와 삭제 범위를 추적할 수 있는 정본 기록

- [x] **Step 1: 작업 정비 현황에 새 완료 이력을 추가한다.**
- [x] **Step 2: 작업별 정비 문서와 검증 보고서에 실제 결과를 기록한다.**
- [x] **Step 3: Superpowers 레지스트리를 완료 상태로 갱신한다.**
- [x] **Step 4: Markdown 형식, 참조 경로, Drive readback을 최종 검증한다.**
