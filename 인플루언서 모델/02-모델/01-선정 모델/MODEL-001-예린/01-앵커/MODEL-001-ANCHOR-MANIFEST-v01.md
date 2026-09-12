# MODEL-001 앵커 매니페스트 v01

- 모델: MODEL-001 차예린 / 예린
- 기준일: 2026-09-10
- 상태: ACTIVE 파일만 후속 생성의 정체성 기준으로 사용한다.

## 활성 MASTER

| 영역 | 파일 | Role | State | 용도 |
|---|---|---|---|---|
| FACE | `MODEL-001-ANCHOR-HALF-v03.png` | MASTER | ACTIVE | 루네바 이너웨어 정면 흉상, 정확한 9:16 비율의 얼굴 골격·피부·헤어·어깨선 기준 |
| FULL | `MODEL-001-ANCHOR-FULL-v01.png` | MASTER | ACTIVE | 전체 인상, 키와 전신 비율 보조 기준 |
| BODY | `MODEL-001-ANCHOR-BODY-FRONT-v02.png` | MASTER 구성 | ACTIVE | 정면 전신·루네바 이너웨어와 검은 하단 마감 기준 |
| BODY | `MODEL-001-ANCHOR-BODY-SIDE-v02.png` | MASTER 구성 | ACTIVE | 왼쪽을 보는 정확한 측면 전신·검은 하단 마감과 깊이 기준 |
| BODY | `MODEL-001-ANCHOR-BODY-BACK-v02.png` | MASTER 구성 | ACTIVE | 후면 전신·헤어·복장 구조와 검은 하단 마감 기준 |

세 BODY 파일은 함께 하나의 BODY MASTER다.

## 활성 표정 데이터

- `MODEL-001-EXPRESSION-BOARD-01-BASELINE-v02.png`
- `MODEL-001-EXPRESSION-BOARD-02-POSITIVE-v02.png`
- `MODEL-001-EXPRESSION-BOARD-03-PLAYFUL-v02.png`
- `MODEL-001-EXPRESSION-BOARD-04-NARRATIVE-v02.png`
- `MODEL-001-EXPRESSION-BOARD-05-SADNESS-v02.png`
- `MODEL-001-EXPRESSION-BOARD-06-EDITORIAL-ALLURE-v01.png`

총 24개의 1:1 흉상 패널이다. 모든 패널은 루네바 이너웨어, 같은 헤어·조명·배경·프레이밍을 유지한다. 표정 생성 우선순위는 `FACE MASTER → EXPRESSION-BOARD-STANDARD-v02.md → MODEL-001-EXPRESSION-SIGNATURE-v01.md → 해당 보드`다.

## Seedance BASE

- `MODEL-001-MOTION-REFSHEET-BASE-v04.png` — DERIVED / ACTIVE, 루네바 등록 피팅복의 전·후면 마크와 검은 마감까지 정합화한 정리본
- PANEL 1은 PANEL 2를 기준으로 바깥쪽 어깨 상단선, 목 아래 신체 스케일과 바닥선을 맞춘다.
- PANEL 3은 상반신이 아닌 정수리~턱 중심의 대형 두상이다.

## DEPRECATED / 99-보관

- `MODEL-001-ANCHOR-HALF-v01.png` — 루네바 이너웨어 흉상 v02로 대체
- `MODEL-001-ANCHOR-HALF-v02.png` — 정확한 9:16 흉상 v03으로 대체
- `MODEL-001-EXPRESSION-BOARD-01`~`05` v01 — 24종·6보드 v02 세트로 대체
- `MODEL-001-ANCHOR-BODY-4VIEW-v02.png` — 3분리 BODY MASTER로 대체
- `MODEL-001-MOTION-REFSHEET-BASE-v01.png` — 어깨선 정렬 교정 v02로 대체

## 금지

- DEPRECATED·TEST 결과를 ACTIVE 기준과 함께 사용하지 않는다.
- EXPRESSION 보드만으로 얼굴 골격을 재정의하지 않는다.
