# 로그 캠페인·스토리 아카이브 이관 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 분석·스토리 정리 아카이브를 캠페인과 원본 최상위 폴더 기준으로 재명명하고, 정규 스토리의 진행자와 서사 순서를 메타데이터로 보존한다.

**Architecture:** 기존 분석 문서의 YAML 프론트매터만 기계적으로 갱신하고, 분석 파일은 새 캠페인·스토리 경로로 이동한다. 활성 로그 분석 지침은 일반화된 경로·캠페인·시간순 규칙을 소유하며, 스토리 정리는 같은 구조와 메타데이터를 사용한다.

**Tech Stack:** Markdown, PowerShell, ripgrep, Git diff 검사

**Spec:** `docs/superpowers/specs/2026-09-11-log-campaign-story-archive-migration-design.md`

## Global Constraints

- 원본 로그와 분석 본문의 서사 사실은 변경하지 않는다.
- 기존 분석 43개와 스토리 정리 1개는 각각 한 번만 새 경로로 이동한다.
- 정규 스토리의 진행자는 `니힐`이며, 외전 진행자는 확정된 담당 정보만 사용한다.
- 시간순 규칙은 같은 캠페인 안에서만 적용한다.
- 이번 작업과 무관한 더티 작업 트리 변경을 수정·되돌림·스테이징하지 않는다.

---

### Task 1: 이관 기준선 확인

**Files:**
- Create: `docs/superpowers/specs/2026-09-11-log-campaign-story-archive-migration-design.md`
- Test: 기존 분석 43개와 스토리 정리 1개의 경로·파일명·프론트매터

- [x] 기존 분석 묶음별 파일 수를 `16 / 3 / 12 / 12`로 확인한다.
- [x] 대상 원본 최상위 폴더와 새 캠페인·스토리 경로가 존재하지 않음을 확인한다.

### Task 2: 분석·스토리 정리 이관과 메타데이터 갱신

**Files:**
- Modify: `2. 로그/분석/**`의 기존 분석 문서 43개
- Modify: `2. 로그/스토리 정리/프롤로그.md`
- Test: 새 경로, 새 파일명, `campaign`, `story`, `story_type`, `game_master`, `story_chronology`, 이전 분석 참조

- [x] 분석 문서 43개를 `더 월드/<원본 최상위 폴더명>/`으로 이동하고 파일명에서 이전 스토리명을 새 원본 최상위 폴더명으로 바꾼다.
- [x] 각 분석 문서의 프론트매터에 현재 경로와 같은 `story`·`story_type`·`game_master`·`story_chronology`를 기록한다.
- [x] `source_log`, `previous_analysis`, `continuity_source`의 경로·파일명을 이관 결과와 맞춘다.
- [x] 스토리 정리 `프롤로그.md`에 메타데이터를 추가하고 새 캠페인·스토리 경로와 파일명으로 이동한다.

### Task 3: 미래 캠페인용 활성 지침 일반화

**Files:**
- Modify: `1. 프롬프트/3. 로그 분석 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/3. 로그 분석 프롬프트/0. 로그 분석 마스터 프롬프트.md`
- Modify: `1. 프롬프트/3. 로그 분석 프롬프트/1. 로그 분석 지침서.md`
- Modify: `1. 프롬프트/3. 로그 분석 프롬프트/2. 스토리 정리 작성 지침.md`
- Modify: `1. 프롬프트/3. 로그 분석 프롬프트/README.md`
- Test: `더 월드` 전역 기본값 부재, 정규 스토리 진행자 `니힐`, 캠페인별 경로, 같은 캠페인 안의 정규 스토리 우선 시간순

- [x] 캠페인명을 원본 로그 또는 마스터 지시에서 결정하도록 변경한다.
- [x] 분석·스토리 정리 저장 경로와 파일명 규칙을 캠페인·원본 최상위 폴더 기준으로 변경한다.
- [x] 정규 스토리가 외전보다 항상 나중이며, 캠페인 사이의 시간순은 비교하지 않는 규칙을 추가한다.

### Task 4: 이관 검증 보고서 작성

**Files:**
- Create: `docs/superpowers/reports/2026-09-11-log-campaign-story-archive-migration-verification.md`
- Test: 파일 수·중복·이전 경로 잔여·frontmatter·Git diff 검사

- [x] 새 분석 문서 43개와 새 스토리 정리 1개가 모두 존재하는지 확인한다.
- [x] 기존 분석·스토리 정리 경로가 남지 않았는지 확인한다.
- [x] 정규·외전의 진행자와 시간순 메타데이터가 전부 일치하는지 확인한다.
- [x] 형식과 변경 범위를 검사하고 결과를 기록한다.

### Task 5: 세션 파일명 캠페인 접두 정규화

**Files:**
- Modify: `2. 로그/원본/스토리 1 - 에리디안의 잔향/**`의 원본 로그 16개
- Modify: `2. 로그/원본/스토리 1 시퀄 - 남아있는 이야기/**`의 원본 로그 3개
- Modify: `2. 로그/분석/더 월드/**`의 대응 분석 문서 31개
- Modify: `1. 프롬프트/3. 로그 분석 프롬프트/{AGENTS.md, 0. 로그 분석 마스터 프롬프트.md, 1. 로그 분석 지침서.md}`
- Test: 원본·분석 파일의 `세션 <번호>` 접두, 모든 분석 참조, 이전 `더 월드 <번호>` 표기 잔여

- [x] 캠페인명은 상위 폴더로만 식별하고, 기존 `더 월드 <번호>` 원본 로그 19개를 `세션 <번호>`로 변경한다.
- [x] 대응 분석 문서 31개의 파일명·문서 안 파일명 참조·제목을 `세션 <번호>`로 변경한다.
- [x] `source_log`, `previous_analysis`, `continuity_source` 참조가 모두 실제 이관 후 파일을 가리키는지 확인한다.
