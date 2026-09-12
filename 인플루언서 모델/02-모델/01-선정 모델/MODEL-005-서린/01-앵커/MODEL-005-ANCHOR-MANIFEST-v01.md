# MODEL-005 Anchor Manifest v01

## 상태

- 모델 상태: 기본 앵커 세트 활성.
- ACTIVE 파일만 후속 생성의 정체성 기준으로 사용한다.

## 활성 MASTER

| 영역 | 파일 | Role | State | 용도 |
|---|---|---|---|---|
| FACE | `MODEL-005-ANCHOR-HALF-v02.png` | MASTER | ACTIVE | 정확한 9:16 비율의 얼굴 골격, 피부, 기본 헤어, 흉상 인상 |
| BODY | `MODEL-005-ANCHOR-BODY-FRONT-v01.png` | MASTER 구성 | ACTIVE | 정면 전신, 기본 신체 비례와 의상 정면 |
| BODY | `MODEL-005-ANCHOR-BODY-SIDE-v01.png` | MASTER 구성 | ACTIVE | 정확한 측면, 몸통 깊이와 방향별 실루엣 |
| BODY | `MODEL-005-ANCHOR-BODY-BACK-v01.png` | MASTER 구성 | ACTIVE | 후면 전신, 후면 실루엣과 의상 구조 |

세 BODY 파일은 함께 하나의 BODY MASTER다. 동일한 배경·조명·카메라 조건과 LUNEVA 등록 피팅 의상을 공유한다.

## DEPRECATED / 레거시

다음 자료는 `99-보관`으로 이동했으며 ACTIVE 기준과 함께 사용하지 않는다.

- `LEGACY-MODEL-005-ANCHOR-BODY-FRONT-v01-CANDIDATE.png`
- `LEGACY-MODEL-005-ANCHOR-BODY-SIDE-v01-CANDIDATE.png`
- `LEGACY-MODEL-005-REFERENCE-FACE-CLOSEUP-v01.png`
- `LEGACY-MODEL-005-REFERENCE-PROFILE-CONCEPT-v01.png`
- `MODEL-005-EXPRESSION-BOARD-01-BASELINE-v01-REPLACED.png`
- `MODEL-005-EXPRESSION-BOARD-02-POSITIVE-v01-REPLACED.png`
- `MODEL-005-EXPRESSION-BOARD-03-PLAYFUL-v01-REPLACED.png`
- `MODEL-005-EXPRESSION-BOARD-04-NARRATIVE-v01-REPLACED.png`
- `MODEL-005-EXPRESSION-BOARD-05-SADNESS-v01-REPLACED.png`

## 표정 데이터

- 다음 파일은 `EXPRESSION / ACTIVE`다.
  - `MODEL-005-EXPRESSION-BOARD-01-BASELINE-v02.png`
  - `MODEL-005-EXPRESSION-BOARD-02-POSITIVE-v02.png`
  - `MODEL-005-EXPRESSION-BOARD-03-PLAYFUL-v02.png`
  - `MODEL-005-EXPRESSION-BOARD-04-NARRATIVE-v02.png`
  - `MODEL-005-EXPRESSION-BOARD-05-SADNESS-v02.png`
- 총 20개 독립 1:1 표정 패널이며 `EXPRESSION-BOARD-STANDARD-v02.md`의 감정 명료성 게이트를 통과한 정본이다.
- 표정 작업 우선순위: `FACE MASTER → EXPRESSION-BOARD-STANDARD-v02 → Expression Signature → 해당 EXPRESSION 보드`.

## 화보용 보조 표정 데이터

- `MODEL-005-EXPRESSION-BOARD-06-EDITORIAL-ALLURE-v01.png` — EXPRESSION / ACTIVE
- 구성: 자석처럼 고정된 정면 시선, 비스듬한 미스터리, 자신감 있는 반미소, 차가운 여운.
- 용도: 럭셔리 뷰티·향수·주얼리·이브닝 패션 화보. 기본 20종의 대체 마스터가 아닌 보조 표현 레퍼런스다.

## 참조 우선순위

`FACE MASTER → BODY MASTER → Morphology Card → EXPRESSION-BOARD-STANDARD-v02 → Expression Signature → Body Signature` 순으로 사용한다.

## DEPRECATED / 99-보관

- `MODEL-005-ANCHOR-HALF-v01.png` — 정확한 9:16 흉상 v02로 대체
