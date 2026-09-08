# MODEL-001 앵커 매니페스트 v01

- 모델: MODEL-001 차예린 / 예린
- 기준일: 2026-09-07
- 목적: 공식 앵커의 역할(Role), 상태(State), 버전과 사용 우선순위를 고정한다.

## 1. 분류 체계

- Role: `MASTER` / `SUPPORT` / `EXPRESSION` / `DERIVED` / `TEST`
- State: `ACTIVE` / `DEPRECATED`
- `MASTER`만 해당 영역의 최상위 정체성 기준으로 사용한다.
- `EXPRESSION`은 표정 범위 참고용이며 얼굴 골격의 MASTER를 대체하지 않는다.
- `DEPRECATED` 파일은 정체성 레퍼런스에서 제외하고 `99-보관`에서 관리한다.

## 2. 활성 MASTER

| 영역 | 파일 | Role | State | 용도 |
|---|---|---|---|---|
| FACE | `MODEL-001-ANCHOR-HALF-v01.png` | MASTER | ACTIVE | 얼굴 골격, 이목구비, 피부, 기본 헤어와 상반신 인상 |
| FULL | `MODEL-001-ANCHOR-FULL-v01.png` | MASTER | ACTIVE | 전체 인상, 키, 전신 비율, 대표 실루엣 |
| BODY | `MODEL-001-ANCHOR-BODY-4VIEW-v02.png` | MASTER | ACTIVE | 정면·3/4·측면·후면 체형, 골격과 방향별 실루엣 |

## 3. 표정 레퍼런스

다음 파일은 모두 `EXPRESSION / ACTIVE`다.

- `MODEL-001-EXPRESSION-BOARD-01-BASELINE-v01.png`
- `MODEL-001-EXPRESSION-BOARD-02-POSITIVE-v01.png`
- `MODEL-001-EXPRESSION-BOARD-03-PLAYFUL-v01.png`
- `MODEL-001-EXPRESSION-BOARD-04-NARRATIVE-v01.png`
- `MODEL-001-EXPRESSION-BOARD-05-SADNESS-v01.png`

표정 작업 시 `FACE MASTER + MODEL-001-EXPRESSION-SIGNATURE-v01.md + 필요한 EXPRESSION 보드`를 함께 사용한다.

### Expression Signature 연결

- `MODEL-001-EXPRESSION-SIGNATURE-v01.md`는 이 모델의 표정 행동 정체성을 정의한다.
- EXPRESSION 보드는 감정별 승인 예시이고, Signature는 눈·시선·입·눈썹·고개 움직임의 개인적 경향을 정의한다.
- 같은 감정도 보드 한 칸을 그대로 복제하지 말고 Signature 범위 안에서 자연스럽게 변주한다.

### Body Signature 연결

- 신체 행동 기준: `MODEL-001-BODY-SIGNATURE-v01.md`
- 신체 생성 우선순위: `공식 신체 수치 → BODY MASTER → Body Signature → 장면별 의상·포즈`
- BODY MASTER는 방향별 실루엣, Body Signature는 의상 압박·중력·접촉·움직임 반응을 담당한다.

## 4. SUPPORT / DEPRECATED

- SUPPORT: 현재 없음.
- DEPRECATED: 현재 Drive `99-보관` 기준 없음.

## 5. 버전 감사 기록

- `MODEL-001-ANCHOR-BODY-4VIEW-v02.png`가 현재 활성 MASTER다.
- `MODEL-001-ANCHOR-BODY-4VIEW-v01.png`은 2026-09-07 Drive 전체 검색에서 확인되지 않았다.
- v01을 임의로 재생성하거나 v02를 v01로 재명명하지 않는다.
- 추후 과거 v01이 발견되면 `99-보관`으로 편입하고 `DEPRECATED`로 기록한다.

## 6. 사용 우선순위

- 얼굴·뷰티: `HALF MASTER` + `MODEL-001-MORPHOLOGY-v01.md`
- 전신·패션: `FULL MASTER` + 필요 시 `BODY MASTER`
- 체형·피팅: `공식 신체 수치` + `BODY MASTER` + `MODEL-001-BODY-SIGNATURE-v01.md` + 필요 시 `FULL MASTER`
- 표정: `HALF MASTER` + `MODEL-001-EXPRESSION-SIGNATURE-v01.md` + 해당 `EXPRESSION` 보드
- 영상 얼굴 일관성: `HALF MASTER` 우선, 체형이 보이면 `BODY MASTER` 추가

## 7. 금지

- EXPRESSION 보드만으로 얼굴 정체성을 재정의하지 않는다.
- DERIVED, TEST 결과를 승인 없이 MASTER로 승격하지 않는다.
- ACTIVE MASTER와 충돌하는 구버전·파생 결과를 혼합 참조하지 않는다.
