# MODEL-003 앵커 매니페스트 v03

- 모델: MODEL-003 강하진 / 하진
- 기준일: 2026-09-09
- 목적: 공식 FACE/BODY MASTER와 24종 표정 세트를 단일 활성 기준으로 관리한다.

## 상태 체계

- `MASTER / ACTIVE`: 후속 생성의 최상위 정체성 기준.
- `EXPRESSION / ACTIVE`: FACE MASTER를 바꾸지 않는 표정 범위 참고 자료.
- `DEPRECATED`: 교체·실패·구버전. `99-보관`에서만 관리하며 생성 참조에서 제외한다.

## ACTIVE MASTER

| 영역 | 파일 | 역할 |
|---|---|---|
| FACE | `MODEL-003-ANCHOR-HALF-v03.png` | 정확한 9:16 정면 중립 흉상, 얼굴 골격·피부·헤어 기준 |
| BODY | `MODEL-003-ANCHOR-BODY-FRONT-v01.png` | 정면 신체·바닥선·등록복 전면 기준 |
| BODY | `MODEL-003-ANCHOR-BODY-SIDE-v01.png` | 정확한 90도 측면·바스트 깊이·신체 측면 기준 |
| BODY | `MODEL-003-ANCHOR-BODY-BACK-v01.png` | 후면 어깨·허리·골반·하체·등록복 후면 기준 |

세 BODY 파일은 분리할 수 없는 하나의 BODY MASTER다. FULL MASTER는 새 표준에서 별도 사용하지 않는다.

## ACTIVE 보조 문서

- `MODEL-003-MORPHOLOGY-v02.md`
- `MODEL-003-BODY-SIGNATURE-v03.md`
- `MODEL-003-EXPRESSION-SIGNATURE-v02.md`
- `EXPRESSION-BOARD-STANDARD-v02.md` — 24종·6보드 표준

## ACTIVE 표정 레퍼런스 — 24종·6보드

| 보드 | 파일 | 범위 |
|---|---|---|
| 01 | `MODEL-003-EXPRESSION-BOARD-01-BASELINE-v02.png` | 중립·집중·사색·의문 |
| 02 | `MODEL-003-EXPRESSION-BOARD-02-POSITIVE-v02.png` | 따뜻한 미소·환한 기쁨·웃음·만족 |
| 03 | `MODEL-003-EXPRESSION-BOARD-03-PLAYFUL-v02.png` | 윙크·장난·당황·유쾌한 웃음 |
| 04 | `MODEL-003-EXPRESSION-BOARD-04-NARRATIVE-v02.png` | 결의·놀람·걱정·깊은 몰입 |
| 05 | `MODEL-003-EXPRESSION-BOARD-05-SADNESS-v02.png` | 아쉬움·실망·슬픔·회복·체념 |
| 06 | `MODEL-003-EXPRESSION-BOARD-06-EDITORIAL-ALLURE-v01.png` | 고정 시선·미스터리·반미소·차가운 여운 |

모든 표정 보드는 1:1 흉상 4패널의 2×2 구성이다. 표정 보드는 얼굴 골격의 MASTER가 아니며, `HALF-v03`와 Morphology-v02를 항상 우선한다.

## DEPRECATED / 99-보관

- `MODEL-003-EXPRESSION-BOARD-01-BASELINE-v01.png`부터 `05-SADNESS-v01.png` — FACE MASTER v02 기반 24종 세트로 대체
- `MODEL-003-ANCHOR-HALF-v01.png` — HALF-v02로 대체
- `MODEL-003-ANCHOR-HALF-v02.png` — 정확한 9:16 흉상 v03으로 대체
- `MODEL-003-ANCHOR-FULL-v01.png`, `MODEL-003-ANCHOR-BODY-4VIEW-v03.png`, `MODEL-003-ANCHOR-BODY-4VIEW-v02.png` — 3분리 BODY MASTER 표준으로 대체
- 이전 v01/v02 매니페스트·프로필·형태·신체·표정 서명 문서는 해당 후속 버전으로 대체

## 생성 우선순위

- 얼굴·뷰티: `HALF-v03 → Morphology-v02`
- 전신·피팅: `공식 수치 → FRONT/SIDE/BACK-v01 → Body Signature-v03 → 장면 지시`
- 표정: `HALF-v03 → Expression Board Standard-v02 → Expression Signature-v02 → 해당 ACTIVE 보드`
