# 준비 응답 레이아웃 및 SESSION PROGRESS 운영 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `준비.` 응답을 기능 설명 중심으로 개선하고, 모든 실질 응답의 진행 상태를 SESSION PROGRESS로 일관되게 안내한다.

**Architecture:** `TRPG 데이터/AGENTS.md`는 전역 호출·SESSION PROGRESS의 정본을 유지한다. `1. 프롬프트/AGENTS.md`는 `준비.`의 구체적 출력 레이아웃을 정의하고, 프로젝트 기본 지침과 통합 마스터는 같은 운영 계약을 참조·동기화한다.

**Tech Stack:** Markdown, PowerShell, ripgrep, Codex 메모리 확장 노트.

## Global Constraints

- 사용자는 `마스터`로 호칭하고 한국어로 응답한다.
- `준비.`는 실제 활성 1~8 기능만 표시한다.
- 이미지 모듈만 내부 기능 불릿과 이미지 승인 절차를 표시한다.
- 이미지 외 기능에는 이미지 승인 절차를 표시하지 않는다.
- SESSION PROGRESS는 본문 뒤 최하단에 배치하며 실제 진척만 기록한다.
- 사용자가 SESSION PROGRESS 비표시를 명시하면 그 지시를 우선한다.
- 메모리는 사용자 요청에 따라 확장 노트로만 갱신한다.

---

### Task 1: 전역 SESSION PROGRESS 운영 계약 등록

**Files:**
- Modify: `G:\내 드라이브\TRPG 데이터\AGENTS.md`
- Modify: `G:\내 드라이브\TRPG 데이터\1. 프롬프트\00. TRPG 세션 매니저 프로젝트 기본 지침.md`
- Modify: `G:\내 드라이브\TRPG 데이터\1. 프롬프트\0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`

**Interfaces:**
- Consumes: `SESSION PROGRESS 운영 지침.md`의 활성형·중단형·대기형 정의.
- Produces: 전역 응답 하단 상태 보고의 단일 운영 계약.

- [x] **Step 1: 루트 AGENTS에 SESSION PROGRESS의 적용 조건·배치·예외를 등록한다.**

기록할 핵심: 모든 실질 응답의 본문 뒤 최하단, 실제 상태만 기록, 사용자 비표시 지시 우선.

- [x] **Step 2: 두 상위 프롬프트 문서에 같은 운영 계약과 원전 경로를 동기화한다.**

참조 경로: `TRPG 데이터/SESSION PROGRESS 운영 지침.md`.

- [x] **Step 3: 활성형·중단형·대기형 필드가 모두 문서상 식별 가능한지 검사한다.**

Run:

```powershell
rg -n "SESSION PROGRESS|작업: <현재 큰 작업>|상태: 일시 중단|상태: 대기|표시하지 말" "G:\내 드라이브\TRPG 데이터\AGENTS.md" "G:\내 드라이브\TRPG 데이터\1. 프롬프트"
```

Expected: 세 상태와 사용자 예외가 전역 또는 상위 라우터에 확인된다.

### Task 2: `준비.` 상세 안내 레이아웃 정의

**Files:**
- Modify: `G:\내 드라이브\TRPG 데이터\1. 프롬프트\AGENTS.md`
- Modify: `G:\내 드라이브\TRPG 데이터\1. 프롬프트\00. TRPG 세션 매니저 프로젝트 기본 지침.md`
- Modify: `G:\내 드라이브\TRPG 데이터\1. 프롬프트\0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`

**Interfaces:**
- Consumes: 실제 활성 1~8 폴더 구조와 이미지 모듈 내부 1~8 기능.
- Produces: 번호·명칭·처리 범위·연결 관계를 포함한 `준비.` 출력 계약.

- [x] **Step 1: 프롬프트 루트 AGENTS의 `준비` 항목을 상세 출력 계약으로 교체한다.**

기록할 핵심: 각 기능은 목적과 대표 산출물 또는 연결 관계를 1~2문장으로 설명한다. 이미지 모듈만 내부 1~8을 줄바꿈 불릿으로 열거한다.

- [x] **Step 2: 이미지 모듈에만 공통 승인 절차 요약을 추가한다.**

고정 문구 의미: 요구사항 확인서와 최종 영어 프롬프트 공개 후 마스터의 명시적 승인으로만 생성·수정을 실행한다.

- [x] **Step 3: 비이미지 기능에는 승인 절차 대신 필요한 선후 관계만 표시하도록 상위 문서를 동기화한다.**

- [x] **Step 4: `준비.` 응답 표본이 모든 요구 사항을 충족하는지 문서상 대조한다.**

Expected: 8개 기능 설명, 이미지 모듈 내부 8개 불릿, 이미지 전용 승인 절차, 비이미지 승인 절차 미표시.

### Task 3: 메모리와 운영 기록 갱신

**Files:**
- Create: `C:\Users\nihil\.codex\memories\extensions\ad_hoc\notes\2026-08-08-prepare-layout-session-progress.md`
- Create: `G:\내 드라이브\TRPG 데이터\docs\superpowers\reports\2026-08-08-prepare-layout-session-progress-verification.md`
- Modify: `G:\내 드라이브\TRPG 데이터\docs\superpowers\SUPERPOWERS WORK REGISTRY.md`

**Interfaces:**
- Consumes: 승인된 출력 계약과 실제 문서 반영 결과.
- Produces: 차기 세션에서 재사용할 메모리 보정과 검증 가능한 프로젝트 이력.

- [x] **Step 1: 메모리 확장 노트에 현행 1~8 `준비.` 응답 레이아웃과 SESSION PROGRESS 적용 원칙을 기록한다.**

- [x] **Step 2: 최종 검증 보고서에 수정 문서·표본 출력·검색 결과를 기록한다.**

- [x] **Step 3: 보고서 존재를 확인한 뒤 레지스트리에 참조와 완료 상태를 기록한다.**

## Self-Review

- 설계의 준비 응답 6개 요구와 SESSION PROGRESS 7개 운영 계약은 Task 1~3에 모두 대응한다.
- 계획에는 미정 항목이나 placeholder가 없다.
- 직접 실행은 상위 지침·루트 라우터·메모리 노트만 대상으로 하며 기능별 세부 규칙을 복제하지 않는다.
