# 프롬프트 이중 계통 흐름 무결성 감사 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 기능 계통과 신규 이미지 생성 모듈 계통의 실제 라우팅·참조·규칙 흐름을 분리 감사하고 공식 보고서로 저장한다.

**Architecture:** 읽기 전용 수집기로 문서 인벤토리와 참조 그래프를 만들고, 두 계통에 서로 다른 판정 기준을 적용한다. 모든 판정은 실제 파일 존재 여부와 문서 본문 증거를 함께 기록한다.

**Tech Stack:** PowerShell, ripgrep, Markdown, Superpowers 작업 레지스트리.

## Global Constraints

- 기존 1~15번 계통과 신규 이미지 생성 모듈을 별도 계통으로 판정한다.
- 기존 계통의 단절은 이관 의도와 안내가 확인될 때만 정상 신호로 분류한다.
- 신규 이미지 모듈의 필수 연결 실패는 결함으로 분류한다.
- 감사 중 프롬프트 원본은 수정하지 않으며 결과 문서와 레지스트리만 갱신한다.

---

### Task 1: 감사 대상과 기준선 고정

**Files:**
- Read: `1. 프롬프트/**/*.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`

- [ ] 루트·기능·공통·신규 모듈의 Markdown 및 AGENTS 인벤토리를 수집한다.
- [ ] 현재 레지스트리와 이미지 모듈 선행 보고서를 읽어 진행 상태를 확인한다.
- [ ] 레지스트리에 본 감사 작업을 `진행 중`으로 등록한다.

### Task 2: 문서 참조 및 호출 흐름 검증

**Files:**
- Read: `1. 프롬프트/**/*.md`
- Create: `docs/superpowers/reports/2026-08-08-prompt-flow-integrity-audit.md`

- [ ] Markdown 링크, 명시 경로, 필수 읽기 순서를 추출하고 파일 존재 여부를 대조한다.
- [ ] 기존 기능 계통에서 단절·이관 안내·상태 명시를 기록한다.
- [ ] 신규 이미지 모듈에서 상위·공통·내부 1~8번·라이브러리 연결을 기록한다.

### Task 3: 규칙 충돌 및 실행 가능성 판정

**Files:**
- Read: `1. 프롬프트/AGENTS.md`, `1. 프롬프트/00. TRPG 세션 매니저 프로젝트 기본 지침.md`, `1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`
- Modify: `docs/superpowers/reports/2026-08-08-prompt-flow-integrity-audit.md`

- [ ] 번호·호출어·우선순위·승인 게이트·파일 정책의 상호 모순을 판정한다.
- [ ] 각 항목을 정상, 의도된 단절, 경고, 결함으로 분류하고 근거를 붙인다.
- [ ] 결함에는 최소 수정 범위와 수정 전제 조건을 제시한다.

### Task 4: 결과 무결성 검증 및 공식 완료 기록

**Files:**
- Read: `docs/superpowers/reports/2026-08-08-prompt-flow-integrity-audit.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`

- [ ] 보고서의 모든 증거 경로가 실제로 존재하는지 재검사한다.
- [ ] 보고서에 미확정 주장, 빈 판정, 상충한 집계가 없는지 확인한다.
- [ ] 보고서 존재를 재확인한 뒤 레지스트리 상태를 `완료`로 갱신한다.
