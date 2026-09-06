# Superpowers 작업 생명주기 관리 체계 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Superpowers 작업의 설계·실행·검증·완료 이력을 Drive에서 영구 추적하고 모든 메인 진입점이 Superpowers 우선 활용 원칙을 공유하도록 한다.

**Architecture:** 기존 `docs/superpowers/{specs,plans,reports}`를 유지하고 루트에 `SUPERPOWERS WORK REGISTRY.md`를 추가한다. 작업 상태는 레지스트리가 단일 정본을 담당하며 기존 계획 문서는 당시 계획을 보존한다.

**Tech Stack:** Google Drive Markdown 문서, Superpowers skill workflow

## Global Constraints

- Superpowers 문서는 ZIP으로 제공하지 않고 Google Drive에 직접 생성·갱신한다.
- 완료·중단·폐기 이력을 삭제하지 않는다.
- 기존 파일 수정 시 원본 파일명을 유지한다.
- 계획 체크박스와 공식 상태 판정을 분리한다.

---

### Task 1: 메인 지침에 Superpowers 우선 활용 규칙 반영

**Files:**
- Modify: `TRPG 데이터/AGENTS.md`
- Modify: `TRPG 데이터/1. 프롬프트/AGENTS.md`
- Modify: `TRPG 데이터/1. 프롬프트/00. TRPG 세션 매니저 프로젝트 기본 지침.md`
- Modify: `TRPG 데이터/1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`

- [ ] 네 파일의 최신 원문을 다시 읽는다.
- [ ] `Superpowers 우선 활용 원칙`을 동일한 의미로 추가한다.
- [ ] 세부 스킬 내용을 중복 복제하지 않고 라우팅 원칙만 남긴다.
- [ ] 네 파일 간 규칙이 충돌하지 않는지 비교 검증한다.

### Task 2: 작업 레지스트리 생성

**Files:**
- Create: `TRPG 데이터/docs/superpowers/SUPERPOWERS WORK REGISTRY.md`

- [ ] 레지스트리 목적과 상태 정본 원칙을 작성한다.
- [ ] 상태 값과 필드 정의를 작성한다.
- [ ] 현재 작업과 전체 이력 영역을 작성한다.
- [ ] `2026-08-02-creative-support-module-migration`을 `완료`로 등록한다.
- [ ] 현재 `superpowers-work-lifecycle` 작업을 실제 진행 상태로 등록한다.

### Task 3: 기존 Superpowers 문서 이력 조사

**Files:**
- Read: `TRPG 데이터/docs/superpowers/specs/*`
- Read: `TRPG 데이터/docs/superpowers/plans/*`
- Read: `TRPG 데이터/docs/superpowers/reports/*`
- Modify: `TRPG 데이터/docs/superpowers/SUPERPOWERS WORK REGISTRY.md`

- [ ] 파일 basename과 주제를 기준으로 관련 spec·plan·report를 작업 단위로 묶는다.
- [ ] 문서 내용과 현행 구조만으로 상태가 확인되는지 판정한다.
- [ ] 확인 가능한 완료·폐기·중단 상태를 레지스트리에 반영한다.
- [ ] 판정할 수 없는 작업은 추측하지 않고 상태 확인 필요로 기록한다.

### Task 4: 기존 계획서 진행 표시 정리

**Files:**
- Modify when verified: `TRPG 데이터/docs/superpowers/plans/*`

- [ ] 레지스트리에서 `완료`로 확정된 기존 계획을 찾는다.
- [ ] 실제 수행이 확인된 체크박스만 `[x]`로 갱신한다.
- [ ] 계획 문서 상단에 공식 상태는 레지스트리를 따른다는 짧은 참조를 추가한다.
- [ ] 레지스트리와 계획서 상태가 모순되지 않는지 검증한다.

### Task 5: 운영 검증 및 완료 처리

**Files:**
- Create if needed: `TRPG 데이터/docs/superpowers/reports/2026-08-08-superpowers-work-lifecycle-verification.md`
- Modify: `TRPG 데이터/docs/superpowers/SUPERPOWERS WORK REGISTRY.md`

- [ ] 네 메인 지침에서 Superpowers 우선 활용 규칙을 확인한다.
- [ ] 레지스트리에서 11번 개편 완료 여부를 즉시 판별할 수 있는지 확인한다.
- [ ] 진행 중·완료·폐기 작업을 각각 표현할 수 있는지 확인한다.
- [ ] 검증 성공 후 현재 작업 상태를 `완료`로 변경한다.
