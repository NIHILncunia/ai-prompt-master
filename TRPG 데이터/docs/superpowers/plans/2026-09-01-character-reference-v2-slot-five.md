# 캐릭터 레퍼런스 V2 내부 5번 이관 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 캐릭터 레퍼런스 V2를 내부 9번에서 내부 5번으로 이관하고, 활성 이미지 모듈 번호를 1~8로 연속화한다.

**Architecture:** V2 폴더와 문서를 5번으로 옮긴 뒤 모든 활성 라우터가 V2를 5번으로 참조하도록 동기화한다. 토큰 프레임은 복원하지 않으며, 내부 5번의 의미는 V2로만 정의한다.

**Tech Stack:** Markdown, PowerShell, ripgrep

**Spec:** `docs/superpowers/specs/2026-09-01-character-reference-v2-slot-five-design.md`

## Global Constraints

- 이미지 내부 활성 번호는 `1·2·3·4·5·6·7·8`이다.
- 내부 5번은 캐릭터 레퍼런스 V2이며 토큰 프레임이 아니다.
- 내부 3번 V1과 5번 V2는 모두 `3. 캐릭터 레퍼런스 이미지`에 저장한다.
- 과거 보고서는 보존하고, 새 검증 보고서로 현재 상태를 기록한다.

---

### Task 1: V2 기능 폴더 이관

**Files:**
- Move: `1. 프롬프트/1. 이미지 생성 모듈/9. 캐릭터 레퍼런스 V2 생성/` → `1. 프롬프트/1. 이미지 생성 모듈/5. 캐릭터 레퍼런스 V2 생성/`
- Modify: 이관 폴더의 `AGENTS.md`

- [x] 9번 V2 폴더의 7개 Markdown 파일을 5번 폴더로 이동한다.
- [x] AGENTS 제목을 `5. 캐릭터 레퍼런스 V2 생성`으로 고친다.
- [x] 폴더 내부 상대 참조와 공통 승인 절차 경로가 이동 뒤에도 실제 파일을 가리키는지 확인한다.

### Task 2: 이미지 모듈 정본 갱신

**Files:**
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/0. 이미지 생성 모듈 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/README.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/공통/1. 이미지 생성 공통 승인 절차.md`

- [x] 활성 번호 목록을 `1·2·3·4·5·6·7·8`으로 바꾼다.
- [x] V2 라우팅, 저장 예외, README 기능 목록을 내부 5번으로 바꾼다.
- [x] 5번 결번과 독립 토큰 프레임 관련 활성 문구를 제거하고, 토큰이 내부 1번 소유임을 유지한다.

### Task 3: 상위·연계 라우터 동기화

**Files:**
- Modify: `C:/Users/nihil/.codex/AGENTS.md`
- Modify: `AGENTS.md`
- Modify: `1. 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/00. TRPG 세션 매니저 프로젝트 기본 지침.md`
- Modify: `1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`
- Modify: `1. 프롬프트/공통/AGENTS.md`
- Modify: `1. 프롬프트/공통/1. 이미지 생성 공통 승인 절차.md`
- Modify: `1. 프롬프트/4. 룰북 관련 요청 프롬프트/0. 룰북 관련 요청 마스터 프롬프트.md`
- Modify: `1. 프롬프트/5. 설정 관련 요청 프롬프트/0. 설정 관련 요청 마스터 프롬프트.md`
- Modify: `1. 프롬프트/6. FVTT 관련 요청 프롬프트/0. FVTT 관련 요청 마스터 프롬프트.md`

- [x] 모든 준비 안내에 V2를 포함한 내부 1~8 기능을 표시한다.
- [x] V2 명시 요청을 내부 5번으로 라우팅한다.
- [x] 상위 저장 예외를 내부 3번 및 5번으로 맞춘다.
- [x] 루트 하드 게이트의 승인 절차를 `1. 이미지 생성 모듈/공통` 전체 경로로 명시한다.

### Task 4: 상태 기록 및 검증

**Files:**
- Create: `docs/superpowers/reports/2026-09-01-character-reference-v2-slot-five-verification.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`
- Modify: `작업 정비/작업 정비 현황.md`
- Create: `작업 정비/캐릭터 레퍼런스 V2 내부 5번 이관 정비.md`

- [x] 전역 등록부와 작업 정비에 이관 작업을 등록한다.
- [x] 이미지 모듈 번호 폴더가 정확히 1~8인지 확인한다.
- [x] 활성 문서의 내부 9번·5번 결번·토큰 프레임 활성 라우팅 잔존을 검사한다.
- [x] 상대 Markdown 참조 누락 0건, V2의 내부 5번 라우팅, V1·V2 저장 예외를 검증한다.
- [x] 검증 보고서 작성 후 등록부와 작업 정비를 완료 상태로 갱신한다.
