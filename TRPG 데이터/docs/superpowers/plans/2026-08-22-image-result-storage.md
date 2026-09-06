# 이미지 생성 결과 저장 체계 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 모든 이미지 생성 결과를 유형별 로컬 하위 폴더에 일관되게 보관한다.

**Architecture:** 공통 저장 루트는 `TRPG 데이터/15. 이미지 생성 결과/`다. 이미지 생성 공통 승인 절차를 저장 규칙의 정본으로 두고, 최상위·프롬프트·이미지 모듈 진입점에는 같은 경로와 비덮어쓰기 규칙을 동기화한다.

**Tech Stack:** Markdown 지침 문서, Windows 로컬 동기화 작업 폴더.

**Spec:** 마스터의 2026-08-22 이미지 결과 유형별 저장 체계 지시.

## Global Constraints

- 완료된 이미지 결과는 `TRPG 데이터/15. 이미지 생성 결과/<유형>/`에 저장한다.
- 유형 폴더가 없으면 생성한다.
- 기존 파일을 덮어쓰지 않는다.
- Google Drive 커넥터를 통한 직접 파일 작업은 하지 않는다.

---

### Task 1: 공통 저장 규칙 반영

**Files:**
- Modify: `TRPG 데이터/AGENTS.md`
- Modify: `TRPG 데이터/1. 프롬프트/1. 이미지 생성 모듈/공통/1. 이미지 생성 공통 승인 절차.md`

- [x] 공통 저장 루트, 유형별 하위 폴더 생성, 비덮어쓰기, 로컬 작업 원칙을 정본에 추가한다.
- [x] 루트 지침에 동일한 파일 정책을 추가한다.

### Task 2: 진입점 동기화

**Files:**
- Modify: `TRPG 데이터/1. 프롬프트/AGENTS.md`
- Modify: `TRPG 데이터/1. 프롬프트/00. TRPG 세션 매니저 프로젝트 기본 지침.md`
- Modify: `TRPG 데이터/1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`
- Modify: `TRPG 데이터/1. 프롬프트/1. 이미지 생성 모듈/AGENTS.md`
- Modify: `TRPG 데이터/1. 프롬프트/1. 이미지 생성 모듈/0. 이미지 생성 모듈 마스터 프롬프트.md`

- [x] 모든 활성 이미지 생성 진입점에 저장 경로와 비덮어쓰기 규칙을 동기화한다.
- [x] 경로와 규칙이 모든 대상 문서에서 일치하는지 검증한다.

### Task 3: 드로이드 흉상 후속 단계

**Files:**
- Verify: `TRPG 데이터/15. 이미지 생성 결과/캐릭터/남성형 드로이드 은폐 포트레이트.png`

- [x] 전신 기준본을 참고 이미지로 사용해 흉상 요구사항 확인서와 영어 프롬프트를 공개한다.
- [x] 마스터의 흉상 생성 승인을 받는다.
- [x] 흉상 9:16 한 장을 `TRPG 데이터/15. 이미지 생성 결과/캐릭터/<대상명> 포트레이트 초상화.png`에 비덮어쓰기 방식으로 저장한다.
