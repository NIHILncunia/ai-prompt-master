# PNG-WebP 이미지 포맷 정규화 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `TRPG 데이터`의 PNG 자산과 현재 참조·출력 규칙을 검증 가능한 lossless WebP 기준으로 통일한 뒤 활성 로컬 경로 명칭을 `ai-data-master`로 전환한다.

**Architecture:** 일회성 로컬 마이그레이션 도구가 인벤토리와 old-new 매니페스트를 만들고, 각 이미지를 임시 WebP로 인코딩한 뒤 RGBA 디코딩 비교를 통과한 파일만 최종 경로로 이동한다. 텍스트 변경은 실제 매니페스트 참조와 활성 출력·로컬 경로 규칙만 대상으로 하며, 전체 검증 뒤 PNG를 제거한다.

**Tech Stack:** Python 3.14, Pillow 12.3, PowerShell, ripgrep, Git

**Spec:** `docs/superpowers/specs/2026-09-07-png-webp-normalization-design.md`

## Global Constraints

- Google Drive를 사용하지 않는다.
- 이미지 리사이즈와 재인코딩 외 편집을 하지 않는다.
- lossless WebP와 원본 alpha를 유지한다.
- 기존 미커밋 변경을 stash, reset, checkout, 삭제하지 않는다.
- 기존 폴더 구조와 파일 stem을 유지한다.
- PNG 검증과 참조 갱신이 끝나기 전에 원본을 삭제하지 않는다.

---

### Task 1: 기준선과 매니페스트

**Files:**
- Create: `_workspace/2026-09-07-png-webp-normalization/migrate_png_to_webp.py`
- Create: `_workspace/2026-09-07-png-webp-normalization/manifest.json`

- [x] 사전 Git 상태와 PNG, WebP, 동일 stem 쌍, APNG, alpha, 텍스트 참조를 수집한다.
- [x] 모든 현재 PNG의 상대 old 경로와 같은 stem의 new WebP 경로를 매니페스트로 기록한다.
- [x] Git에서 선행 삭제된 PNG와 같은 stem 신규 WebP를 별도 목록으로 기록한다.

### Task 2: 안전 변환과 이미지 검증

**Files:**
- Create: 매니페스트에 정의된 각 `*.webp`
- Delete after verification: 매니페스트에 정의된 각 `*.png`

- [x] 각 PNG를 임시 lossless WebP로 저장하고 재오픈한다.
- [x] 해상도, alpha 전체, alpha가 0보다 큰 가시 픽셀 RGB를 비교한다.
- [x] 토큰류의 alpha와 프레임 바깥 투명 영역을 별도 기록한다.
- [x] 검증된 임시 파일만 최종 WebP 경로로 이동한다.
- [x] 선행 미커밋 WebP를 Git 원본 PNG와 같은 기준으로 검증한다.

### Task 3: 현재 참조와 활성 출력 규칙 전환

**Files:**
- Modify: 매니페스트의 실제 로컬 PNG를 참조하는 텍스트 파일
- Modify: `1. 프롬프트/` 아래 현재 활성 이미지 생성 규칙

- [x] 실제 old-new 매핑에 해당하는 로컬 경로·파일명 참조만 WebP로 바꾼다.
- [x] 전신, 초상화, 토큰의 신규 저장 파일명을 `<액터>.webp`, `<액터> 초상화.webp`, `<액터> 토큰.webp`로 통일한다.
- [x] 토큰 계약을 1:1, 원형 프레임, 프레임 바깥 투명, WebP alpha로 통일한다.
- [x] 외부 URL, 역사 기록, PNG 기술 설명은 분류 근거 없이 바꾸지 않는다.

### Task 4: PNG 제거와 전역 검증

**Files:**
- Delete: Task 2와 Task 3 검증을 모두 통과한 원본 PNG

- [x] 변환·참조·충돌 검증을 통과한 PNG만 일반 파일 삭제한다.
- [x] 실제 PNG 잔존, old PNG 참조, `.png` 문자열을 다시 검사한다.
- [x] 모든 신규 WebP를 재오픈하고 0 byte, 해상도, alpha, 픽셀 비교를 재검증한다.
- [x] NPC 전신·초상화·토큰, 몬스터, 배틀맵, 스타일 앵커, 아이콘, 투명 배경 대표 샘플을 직접 확인한다.

### Task 5: 활성 로컬 경로 명칭 전환

**Files:**
- Modify: 현재 실행 경로가 실제 `ai-data-master`와 일치하지 않는 활성 지침

- [x] PNG-WebP 검증이 끝난 뒤 이전 로컬 저장소명 문자열을 전수 검색한다.
- [x] 현재 활성 로컬 실행 경로만 `ai-data-master`로 바꾼다.
- [x] 역사 기록과 외부 참조를 분류하고 활성 경로 누락을 0건으로 만든다.

### Task 6: 완료 기록과 Git 검토

**Files:**
- Create: `docs/superpowers/reports/2026-09-07-png-webp-normalization-verification.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`
- Modify: `작업 정비/작업 정비 현황.md`
- Modify: `작업 정비/PNG WebP 이미지 포맷 정규화 정비.md`

- [x] 최종 수량, 충돌, 실패, 참조 변경, alpha, 육안 검증 결과를 보고서에 기록한다.
- [x] 작업 추적 문서를 실제 검증 결과와 동기화한다.
- [x] `git diff --check`, `git status`, `git diff --stat`, `git diff`를 실행해 범위 밖 훼손을 확인한다.
