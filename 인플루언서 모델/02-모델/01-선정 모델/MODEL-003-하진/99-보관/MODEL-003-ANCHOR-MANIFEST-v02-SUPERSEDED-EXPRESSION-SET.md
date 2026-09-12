# MODEL-003 앵커 매니페스트 v02

- 모델: MODEL-003 강하진 / 하진
- 기준일: 2026-09-09
- 목적: 새 3분리 기본 프로필을 공식 FACE/BODY MASTER로 고정한다.

## 상태 체계

- `MASTER / ACTIVE`: 후속 생성의 최상위 정체성 기준.
- `EXPRESSION / ACTIVE`: 표정 범위 참고 자료. FACE MASTER를 대체하지 않는다.
- `DEPRECATED`: 교체·실패·구버전. `99-보관`에서만 관리하며 생성 참조에서 제외한다.

## ACTIVE MASTER

| 영역 | 파일 | 역할 |
|---|---|---|
| FACE | `MODEL-003-ANCHOR-HALF-v02.png` | 정면 중립 흉상, 얼굴 골격·피부·헤어 기준 |
| BODY | `MODEL-003-ANCHOR-BODY-FRONT-v01.png` | 정면 신체·바닥선·등록복 전면 기준 |
| BODY | `MODEL-003-ANCHOR-BODY-SIDE-v01.png` | 정확한 90도 측면·바스트 깊이·신체 측면 기준 |
| BODY | `MODEL-003-ANCHOR-BODY-BACK-v01.png` | 후면 어깨·허리·골반·하체·등록복 후면 기준 |

세 BODY 파일은 분리할 수 없는 하나의 BODY MASTER다. FULL MASTER는 새 표준에서 별도 사용하지 않는다.

## ACTIVE 보조 문서

- `MODEL-003-MORPHOLOGY-v02.md`
- `MODEL-003-BODY-SIGNATURE-v03.md`
- `MODEL-003-EXPRESSION-SIGNATURE-v02.md`
- `EXPRESSION-BOARD-STANDARD-v02.md`

## ACTIVE 표정 레퍼런스

기존 5개 v01 보드는 현재 `EXPRESSION / ACTIVE`로 유지한다. 새 6보드·24종 세트는 기본 프로필 이후 별도 생성·검수한다.

## DEPRECATED / 99-보관

- `MODEL-003-ANCHOR-HALF-v01.png` — HALF-v02로 대체
- `MODEL-003-ANCHOR-FULL-v01.png` — 3분리 BODY MASTER 표준으로 대체
- `MODEL-003-ANCHOR-BODY-4VIEW-v03.png` — FRONT/SIDE/BACK-v01로 대체
- `MODEL-003-ANCHOR-BODY-4VIEW-v02.png` — 개정 전의 더 무겁고 커비한 체형
- `MODEL-003-ANCHOR-MANIFEST-v01.md`, `MODEL-003-PROFILE.md`, `MODEL-003-MORPHOLOGY-v01.md`, `MODEL-003-BODY-SIGNATURE-v02.md`, `MODEL-003-EXPRESSION-SIGNATURE-v01.md` — v02/v03 문서로 대체

## 생성 우선순위

- 얼굴·뷰티: `HALF-v02 → Morphology-v02`
- 전신·피팅: `공식 수치 → FRONT/SIDE/BACK-v01 → Body Signature-v03 → 장면 지시`
- 표정: `HALF-v02 → Expression Board Standard-v02 → Expression Signature-v02 → 해당 보드`
