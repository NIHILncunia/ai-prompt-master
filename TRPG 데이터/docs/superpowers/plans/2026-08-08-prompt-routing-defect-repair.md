# 프롬프트 라우팅 결함 수정 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 이미지 직접 진입의 승인 게이트와 활성 문서의 구 번호 라우팅을 현행 1~8 체계로 복구한다.

**Architecture:** 승인 게이트는 이미지 내부 1~4 AGENTS에만, 이미 정상인 5~8과 동일한 읽기 순서를 추가한다. 구 번호는 숫자 단독 치환을 금지하고, 룰북·설정·FVTT·이미지 하위 기능이라는 문맥별 목적지로 바꾼다.

**Tech Stack:** Markdown, PowerShell, ripgrep.

## Global Constraints

- 내부 문서 번호 `0.`, `1.`, `2.`는 변경하지 않는다.
- 현행 기능 번호는 룰북 4, 설정 5, FVTT 6, 창작 지원 7, 세션 제작 8이다.
- 토큰·풍경·아이콘·지도는 각각 이미지 모듈 내부 5·6·7·8번이다.
- 보관 문서와 과거 Superpowers 기록은 수정하지 않는다.

---

### Task 1: 이미지 직접 진입 승인 게이트 복구

**Files:**
- Modify: `1. 이미지 생성 모듈/1. 반실사 포트레이트/AGENTS.md`
- Modify: `1. 이미지 생성 모듈/2. 배틀맵 생성/AGENTS.md`
- Modify: `1. 이미지 생성 모듈/3. 캐릭터 레퍼런스 생성/AGENTS.md`
- Modify: `1. 이미지 생성 모듈/4. 세션 하이라이트 이미지 생성/AGENTS.md`

**Interfaces:**
- Consumes: 정상 예시인 내부 5번 AGENTS의 읽기 순서.
- Produces: 내부 1~8 모두에서 `../공통/1. 이미지 생성 공통 승인 절차.md`를 직접 읽는 계약.

- [x] **Step 1: 네 AGENTS의 0번 마스터 다음 읽기 항목에 공통 승인 절차 경로를 추가한다.**
- [x] **Step 2: 각 파일에 이미지 생성은 공통 승인 절차 적용 후 실행한다는 핵심 계약을 추가한다.**
- [x] **Step 3: 내부 1~8 AGENTS에서 공통 승인 절차 경로가 8건인지 검사한다.**

### Task 2: 설정·FVTT·창작 지원·세션 제작의 문맥형 구 번호 복구

**Files:**
- Modify: `5. 설정 관련 요청 프롬프트/`와 `공통/종족 데이터/`의 활성 Markdown
- Modify: `6. FVTT 관련 요청 프롬프트/`의 활성 Markdown
- Modify: `7. 창작 지원 프롬프트/`의 활성 Markdown
- Modify: `8. 세션 제작 프롬프트/`의 활성 Markdown
- Modify: `공통/AGENTS.md`, `공통/1. 이미지 생성 공통 승인 절차.md`

**Interfaces:**
- Consumes: 최종 기능 매핑과 이미지 내부 5·6·7·8 목적지.
- Produces: 직접 진입·복합 요청에서도 현행 번호만 해석하는 기능 경계.

- [x] **Step 1: 설정 정본 의미의 구 8번과 룰북 의미의 구 7번을 각각 5번·4번으로 전환한다.**
- [x] **Step 2: FVTT 의미의 구 9번과 토큰·풍경·아이콘·지도 의미의 구 10·12·13·14번을 현행 목적지로 전환한다.**
- [x] **Step 3: 세션 제작 폴더의 과거 19번 개발 자료를 보관으로 이동하거나 활성 라우팅 제외 표기를 추가한다.**
- [x] **Step 4: 상위·하위 기능 직접 진입 문서에서 구 번호 기능 의미가 남지 않는지 검사한다.**

### Task 3: 재시나리오 검증과 기록

**Files:**
- Create: `docs/superpowers/reports/2026-08-08-prompt-routing-defect-repair-verification.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`

**Interfaces:**
- Consumes: Task 1~2 수정 결과.
- Produces: 활성 경로·직접 진입·복합 요청의 재검증 판정.

- [x] **Step 1: 이미지 내부 1~8 직접 진입, 설정·FVTT·창작 지원·세션 제작·지도 복합 요청을 다시 대조한다.**
- [x] **Step 2: 구 번호 라우팅·공통 승인 절차 누락·깨진 경로가 모두 0건인지 확인한다.**
- [x] **Step 3: 검증 보고서 존재를 확인한 뒤 레지스트리에 수리 이력을 기록한다.**
