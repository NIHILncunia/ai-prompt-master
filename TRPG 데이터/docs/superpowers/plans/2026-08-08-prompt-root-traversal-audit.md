# 프롬프트 루트 탐색 심층 점검 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 활성 프롬프트 체계의 모든 진입 경로와 호출 시나리오를 루트부터 검증해 라우팅 결함을 판정한다.

**Architecture:** 1단계는 물리 진입점·문서 경로·공통 승인 절차의 도달성을 검사한다. 2단계는 사용자 호출을 유형별 시나리오로 고정하고, 해당 시나리오가 현재 1~8 체계와 이미지 모듈 내부 1~8 체계로만 해석되는지 문서 근거를 대조한다.

**Tech Stack:** Markdown, PowerShell, ripgrep.

## Global Constraints

- 활성 운영 문서만 결함 판정 대상이며 `보관`과 과거 Superpowers 기록은 역사 기록으로 보존한다.
- 이미지는 공통 승인 절차를 경유해야 하고, 비이미지 요청에는 이미지 승인을 강제하지 않는다.
- 실제 파일·경로·문서 근거가 없는 성공 판정은 하지 않는다.
- 결함이 발견되면 원인·영향·최소 수정 범위를 보고하고, 마스터 승인 없이 수정하지 않는다.

---

### Task 1: 활성 운영 경로 전수 탐색

**Files:**
- Read: `TRPG 데이터/AGENTS.md`, `TRPG 데이터/1. 프롬프트/AGENTS.md`
- Read: 활성 상위 1~8 기능과 이미지 모듈 내부 1~8 기능의 AGENTS·README·0번 마스터
- Create: `docs/superpowers/reports/2026-08-08-prompt-root-traversal-path-audit.md`

**Interfaces:**
- Consumes: 현재 활성 1~8 구조와 이미지 모듈 내부 1~8 구조.
- Produces: 경로별 진입점 존재성·필수 참조·깨진 경로 판정.

- [x] **Step 1: 활성 상위 1~8 기능 및 이미지 모듈 내부 1~8 기능의 AGENTS·README·0번 마스터 존재를 검사한다.**

- [x] **Step 2: 루트→프롬프트 라우터→기능 AGENTS→0번 마스터 순서가 각 기능 문서에 명시되는지 대조한다.**

- [x] **Step 3: 이미지 내부 1~8 기능이 공통 승인 절차를 참조하고, 비이미지 기능에는 이미지 승인 절차가 강제되지 않는지 검사한다.**

- [x] **Step 4: 활성 Markdown의 전체 프롬프트 경로를 추출해 실경로 존재성을 검사하고 보고서에 기록한다.**

### Task 2: 호출 시나리오 전수 대조

**Files:**
- Read: 루트·프롬프트 라우터와 활성 기능 마스터
- Create: `docs/superpowers/reports/2026-08-08-prompt-root-traversal-scenario-audit.md`

**Interfaces:**
- Consumes: Task 1의 정상 경로 목록.
- Produces: 호출 시나리오별 예상 목적지·근거 문서·판정.

- [x] **Step 1: `준비.`, `준비 1번`, `준비 4번`, `준비 7번`, `준비 8번` 호출을 현재 기능 체계와 대조한다.**

- [x] **Step 2: 이미지 모듈 내부 1~8 요청과 승인 전 생성·프롬프트만 요청을 대조한다.**

- [x] **Step 3: 로그·룰북·설정·FVTT·창작 지원·세션 제작 및 복합 요청의 우선 라우팅을 대조한다.**

- [x] **Step 4: 시나리오 보고서와 Task 1 결과를 통합해 결함·정상·주의 항목을 구분한다.**

### Task 3: 최종 기록과 상태 갱신

**Files:**
- Create: `docs/superpowers/reports/2026-08-08-prompt-root-traversal-audit-summary.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`

**Interfaces:**
- Consumes: 경로·시나리오 보고서.
- Produces: 최종 정상 판정 또는 수정 필요 결함 목록.

- [x] **Step 1: 두 보고서의 결과를 통합하고 결함이 있으면 수정 없이 정확한 원인을 기록한다.**

- [x] **Step 2: 통합 보고서 존재를 확인한 뒤 레지스트리에 작업 상태와 보고서 참조를 기록한다.**
