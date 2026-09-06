# 루트 지침 체계 정합성 정정 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 활성 지침의 번호, 상대 경로, 라우팅, 작업 상태 기록을 실제 파일 구조와 일치시킨다.

**Architecture:** 제품 규칙은 바꾸지 않고, 상위 라우터의 표현과 하위 문서의 참조만 현재 정본 구조로 수렴시킨다. 모든 변경 뒤에는 파일 존재성, 금지된 구 문자열, 상태 기록의 일치 여부를 정적으로 검증한다.

**Tech Stack:** Markdown, PowerShell, ripgrep

**Spec:** `docs/superpowers/specs/2026-09-01-root-instruction-consistency-repair-design.md`

## Global Constraints

- 최상위 활성 기능은 1~8이다.
- 이미지 모듈 내부 활성 기능은 `1·2·3·4·6·7·8`이며 5번은 결번이다.
- 역사적 Superpowers 기록은 수정하지 않는다.
- 이 작업 폴더는 Git 저장소가 아니므로 커밋을 만들지 않는다.

---

### Task 1: 활성 번호와 라우팅 문구 정정

**Files:**
- Modify: `AGENTS.md`
- Modify: `1. 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/00. TRPG 세션 매니저 프로젝트 기본 지침.md`
- Modify: `1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`
- Modify: `1. 프롬프트/공통/AGENTS.md`
- Modify: `1. 프롬프트/공통/1. 이미지 생성 공통 승인 절차.md`
- Modify: `1. 프롬프트/4. 룰북 관련 요청 프롬프트/0. 룰북 관련 요청 마스터 프롬프트.md`
- Modify: `1. 프롬프트/5. 설정 관련 요청 프롬프트/0. 설정 관련 요청 마스터 프롬프트.md`
- Modify: `1. 프롬프트/6. FVTT 관련 요청 프롬프트/0. FVTT 관련 요청 마스터 프롬프트.md`
- Modify: `1. 프롬프트/8. 세션 제작 프롬프트/3. NPC 설계 지침.md`

- [x] 내부 기능 범위 표기를 실제 집합으로 교체한다.
- [x] 배틀맵 관련 문구를 `1번 이미지 생성 모듈 내부 2번`으로 명시한다.
- [x] NPC 지침의 구 번호를 이미지 모듈 내부 1번 라우팅으로 교체한다.
- [x] `준비` 호출에서는 최상위 1~8과 이미지 내부 실제 집합을 구분해 안내하도록 맞춘다.

### Task 2: 상대 Markdown 참조 정정

**Files:**
- Modify: `1. 프롬프트/공통/종족 데이터/AGENTS.md`
- Modify: `1. 프롬프트/7. 창작 지원 프롬프트/특성 제작/라이브러리/크리처 유형 대분류-중분류 인덱스.md`
- Modify: `1. 프롬프트/7. 창작 지원 프롬프트/아이템 제작/템플릿/아이템 템플릿.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/1. 반실사 포트레이트/4. 품질 및 금지 규칙.md`

- [x] 각 문서의 현재 위치를 기준으로 상대 경로 깊이를 정정한다.
- [x] 대상 파일이 실제 존재하는지 확인한다.

### Task 3: VTT 토큰 작업 상태 동기화

**Files:**
- Modify: `작업 정비/작업 정비 현황.md`

- [x] 진행 중 섹션의 완료된 토큰 통합 항목을 완료 작업으로 이동한다.
- [x] 상태를 `완료`, 다음을 `후속 작업 없음`으로 기록한다.
- [x] 공식 등록부와 개별 정비 문서의 완료 결과를 요약해 연결한다.

### Task 4: 정적 검증과 완료 기록

**Files:**
- Modify: `docs/superpowers/reports/2026-09-01-root-instruction-consistency-repair-verification.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`
- Modify: `작업 정비/루트 지침 체계 정합성 정정.md`

- [x] 프롬프트 전체의 상대 Markdown 참조를 검사해 누락 0건을 확인한다.
- [x] 활성 문서의 구 번호와 불가능한 내부 범위 표기를 검사한다.
- [x] 활성 기능 폴더 수와 이미지 내부 실제 번호 집합을 확인한다.
- [x] 검증 결과를 보고서로 남기고, 등록부와 작업 정비를 완료 상태로 갱신한다.
