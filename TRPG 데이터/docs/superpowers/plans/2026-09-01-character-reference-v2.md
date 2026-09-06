# Character Reference V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 이미지 생성 모듈에 독립된 내부 9번 캐릭터 레퍼런스 V2 기능을 추가한다.

**Architecture:** 기존 내부 3번은 V1 계약으로 유지하고 내부 9번을 별도 고정 계약형 기능으로 추가한다. 모듈 라우터와 전역 라우팅 문서에서 V2 명시 요청만 9번으로 분기한다.

**Tech Stack:** Markdown prompt hierarchy, Google Drive

**Spec:** `specs/2026-09-01-character-reference-v2-design.md`

## Global Constraints
- `1916 × 821 px` 고정
- 전신 3면 동일 너비 및 목 위 제외
- 우측 대형 정면 두상 중앙 정렬
- 무기 조건부 독립 패널
- 검은색 데이터 바와 사용자 제공 데이터 원문 보존

---

### Task 1: 내부 9번 기능 문서 생성
- [ ] `AGENTS.md`, 0~4번 지침, `README.md`를 생성한다.
- [ ] 고정 산출물 계약과 검수 기준을 문서 간 일치시킨다.

### Task 2: 이미지 모듈 라우팅 갱신
- [ ] 모듈 `AGENTS.md`, 마스터 프롬프트, `README.md`에 내부 9번을 등록한다.
- [ ] 공통 승인 절차의 활성 기능 목록에 9번을 추가한다.

### Task 3: 전역 라우팅 갱신
- [ ] 프로젝트 기본 지침에 내부 9번과 V2 계약을 추가한다.
- [ ] 통합 마스터 프롬프트에 기능 트리·라우팅·우선순위·기능 요약을 추가한다.

### Task 4: 검증 및 상태 기록
- [ ] 신규 폴더와 파일 존재를 Drive에서 재조회한다.
- [ ] 활성 기능 목록과 V2 라우팅 문구를 정적 검색한다.
- [ ] 검증 보고서와 작업 레지스트리를 완료 상태로 갱신한다.
