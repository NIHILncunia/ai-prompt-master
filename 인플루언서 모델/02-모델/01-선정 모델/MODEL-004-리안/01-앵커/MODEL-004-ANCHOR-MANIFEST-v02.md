# MODEL-004 앵커 매니페스트 v02

- 모델: MODEL-004 한서윤 / 리안 (RIAN)
- 기준일: 2026-09-09
- 상태: ACTIVE 파일만 후속 생성에 사용한다.

## 활성 MASTER

| 영역 | 파일 | State | 용도 |
|---|---|---|---|
| FACE | `MODEL-004-ANCHOR-HALF-v04.png` | ACTIVE | 정확한 9:16 비율의 얼굴 골격, 피부, 기본 헤어, 흉상 인상 |
| FULL | `MODEL-004-ANCHOR-FULL-v01.png` | ACTIVE | 전체 인상과 173cm 전신 비율 |
| BODY SUPPORT | `MODEL-004-ANCHOR-BODY-SIDE-v01.png`, `MODEL-004-ANCHOR-BODY-BACK-v01.png` | ACTIVE | 현재 측·후면 실루엣 보조 기준 |

## 활성 표정 데이터

- `MODEL-004-EXPRESSION-BOARD-01-BASELINE-v03.png`
- `MODEL-004-EXPRESSION-BOARD-02-POSITIVE-v02.png`
- `MODEL-004-EXPRESSION-BOARD-03-PLAYFUL-v02.png`
- `MODEL-004-EXPRESSION-BOARD-04-NARRATIVE-v02.png`
- `MODEL-004-EXPRESSION-BOARD-05-SADNESS-v02.png`
- `MODEL-004-EXPRESSION-BOARD-06-EDITORIAL-ALLURE-v01.png`

총 24개의 1:1 표정 패널이다. 표정 생성 우선순위는 `FACE MASTER → EXPRESSION-BOARD-STANDARD-v02 → MODEL-004-EXPRESSION-SIGNATURE-v01.md → 해당 보드`다.

## 레거시

이전 v01 보드와 BASELINE v02는 `99-보관`의 `REPLACED` 파일로 관리한다. 후속 생성에 혼합 참조하지 않는다.

- `MODEL-004-ANCHOR-HALF-v03.png` — 정확한 9:16 흉상 v04으로 대체

## 금지

- EXPRESSION 보드만으로 얼굴 정체성을 재정의하지 않는다.
- 정식 BODY MASTER가 생성되기 전에는 BODY SUPPORT를 MASTER로 승격하지 않는다.
- 레거시·TEST 파일을 ACTIVE 기준과 함께 사용하지 않는다.
