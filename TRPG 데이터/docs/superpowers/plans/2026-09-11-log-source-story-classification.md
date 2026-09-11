# 로그 원본 스토리 분류 및 진행자 메타데이터 정비 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 원본 로그 최상위 폴더명으로 정규 스토리와 외전을 안정적으로 판별하고, 분석 문서에 해당 스토리의 진행자 맥락을 남긴다.

**Architecture:** 3번 로그 분석 기능의 진입 문서는 분류 규칙의 위치를 안내하고, 세션 분석 지침은 실제 판별·검색·프론트매터 규칙을 소유한다. 장기 스토리 정리 지침은 이 메타데이터를 범위 판별에만 사용하며, 진행자 정보를 서사 사실로 쓰지 않는다.

**Tech Stack:** Markdown, PowerShell, ripgrep, Git diff 검사

**Spec:** `docs/superpowers/specs/2026-09-11-log-source-story-classification-design.md`

## Global Constraints

- 원본 로그·기존 분석본·기존 스토리 정리 문서를 이동·수정·삭제하지 않는다.
- 정규 스토리는 원본 최상위 폴더명에 `스토리 <번호>` 표기가 있는 경우만 판별한다.
- 외전의 진행자는 등록된 담당 정보나 원본 로그의 명시적 진행자 표기로만 확정한다.
- 기존 작업 트리의 무관한 변경은 수정·되돌림·스테이징하지 않는다.

---

### Task 1: 원본 폴더 기준과 문서 영향 범위를 확정

**Files:**
- Create: `docs/superpowers/specs/2026-09-11-log-source-story-classification-design.md`
- Test: `2. 로그/원본` 최상위 폴더 목록

- [x] `2. 로그/원본`의 최상위 폴더가 정규 스토리 2개와 외전 4개로 구성된 현재 구조를 확인한다.
- [x] 기존 `룩스테라=메인`, 그 외 스토리=사이드라는 판별이 새 구조와 충돌함을 확인한다.

### Task 2: 로그 분석 규칙을 새 분류와 진행자 메타데이터로 교체

**Files:**
- Modify: `1. 프롬프트/3. 로그 분석 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/3. 로그 분석 프롬프트/0. 로그 분석 마스터 프롬프트.md`
- Modify: `1. 프롬프트/3. 로그 분석 프롬프트/1. 로그 분석 지침서.md`
- Modify: `1. 프롬프트/3. 로그 분석 프롬프트/2. 스토리 정리 작성 지침.md`
- Modify: `1. 프롬프트/3. 로그 분석 프롬프트/README.md`
- Test: 기존 이름 기반 메인·사이드 자동 판별 문구와 새 분류·진행자 규칙의 존재

- [x] 기능 진입 문서에 원본 최상위 폴더 분류와 진행자 맥락 확인 절차를 연결한다.
- [x] 세션 분석 지침의 기존 `룩스테라` 하드코딩 판별을 폴더명 기준으로 교체한다.
- [x] 정보흐름분석 프론트매터에 `story_type`과 `game_master`를 추가한다.
- [x] 장기 스토리 정리에서 분류·진행자 정보를 범위 판별에만 쓰고 서사 사실로 쓰지 않도록 제한한다.

### Task 3: 문서 무결성을 검증하고 결과를 기록

**Files:**
- Create: `docs/superpowers/reports/2026-09-11-log-source-story-classification-verification.md`
- Test: `rg`, `git diff --check`, 대상 파일 한정 diff

- [x] 정규 스토리·외전·진행자 규칙과 프론트매터 필드를 검색한다.
- [x] 대상 문서의 Markdown 공백 오류와 기존 판별 규칙 잔여를 검사한다.
- [x] 검증 결과를 보고서에 기록한다.
