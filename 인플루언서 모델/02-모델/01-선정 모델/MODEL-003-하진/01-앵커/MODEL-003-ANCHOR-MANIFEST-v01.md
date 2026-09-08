# MODEL-003 앵커 매니페스트 v01

- 모델: MODEL-003 강하진 / 하진
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
| FACE | `MODEL-003-ANCHOR-HALF-v01.png` | MASTER | ACTIVE | 얼굴 골격, 이목구비, 피부, 기본 헤어와 상반신 인상 |
| FULL | `MODEL-003-ANCHOR-FULL-v01.png` | MASTER | ACTIVE | 175cm 장신 인상, 긴 다리, 늘씬한 전신 비율과 대표 실루엣 |
| BODY | `MODEL-003-ANCHOR-BODY-4VIEW-v03.png` | MASTER | ACTIVE | 정면·3/4·측면·후면에서 175cm 장신 슬림 체형과 큰 자연형 바스트를 고정 |

## 3. 표정 레퍼런스

다음 파일은 모두 `EXPRESSION / ACTIVE`다.

- `MODEL-003-EXPRESSION-BOARD-01-BASELINE-v01.png`
- `MODEL-003-EXPRESSION-BOARD-02-POSITIVE-v01.png`
- `MODEL-003-EXPRESSION-BOARD-03-PLAYFUL-v01.png`
- `MODEL-003-EXPRESSION-BOARD-04-NARRATIVE-v01.png`
- `MODEL-003-EXPRESSION-BOARD-05-SADNESS-v01.png`

표정 작업 시 `FACE MASTER + MODEL-003-EXPRESSION-SIGNATURE-v01.md + 필요한 EXPRESSION 보드`를 함께 사용한다.

### Expression Signature 연결

- `MODEL-003-EXPRESSION-SIGNATURE-v01.md`는 이 모델의 표정 행동 정체성을 정의한다.
- EXPRESSION 보드는 감정별 승인 예시이고, Signature는 눈·시선·입·눈썹·고개 움직임의 개인적 경향을 정의한다.
- 같은 감정도 보드 한 칸을 그대로 복제하지 말고 Signature 범위 안에서 자연스럽게 변주한다.

### Body Signature 연결

- 신체 행동 기준: `MODEL-003-BODY-SIGNATURE-v02.md`
- 현재 신체 생성 우선순위: `공식 신체 수치 → BODY MASTER → Body Signature v02 → 장면별 의상·포즈`
- 핵심: 175cm 장신, 긴 다리, 늘씬한 몸통과 팔다리, 중간 폭 골반, 매우 큰 자연형 바스트. 가슴만 매우 크고 나머지 신체는 슬림하게 유지한다.

## 4. SUPPORT / DEPRECATED

- SUPPORT: 현재 없음.
- DEPRECATED:
  - `MODEL-003-ANCHOR-BODY-4VIEW-v02.png` — 이전의 더 커비하고 무거운 체형 정의. 175cm 장신 슬림 개정과 충돌하므로 정체성 기준에서 제외.
  - `MODEL-003-BODY-SIGNATURE-v01.md` — 이전 커비 애슬레틱 체형 정의. v02로 대체.

## 5. 버전 감사 기록

- `MODEL-003-ANCHOR-BODY-4VIEW-v01.png`은 2026-09-07 Drive 전체 검색에서 확인되지 않았다.
- `MODEL-003-ANCHOR-BODY-4VIEW-v02.png`는 2026-09-07 사용자 체형 재정의 이후 DEPRECATED 처리한다.
- `MODEL-003-ANCHOR-BODY-4VIEW-v03.png`를 2026-09-07 사용자 승인 후 BODY MASTER / ACTIVE로 등록했다.

## 6. 사용 우선순위

- 얼굴·뷰티: `HALF MASTER` + `MODEL-003-MORPHOLOGY-v01.md`
- 전신·패션: `FULL MASTER` + `BODY MASTER` + `MODEL-003-BODY-SIGNATURE-v02.md`
- 체형·피팅: `공식 신체 수치` + `BODY MASTER` + `MODEL-003-BODY-SIGNATURE-v02.md` + 필요 시 `FULL MASTER`
- 표정: `HALF MASTER` + `MODEL-003-EXPRESSION-SIGNATURE-v01.md` + 해당 `EXPRESSION` 보드
- 영상 얼굴 일관성: `HALF MASTER` 우선
- 영상 전신 일관성: `BODY MASTER` + `MODEL-003-BODY-SIGNATURE-v02.md` + 필요 시 `FULL MASTER`

## 7. 하진 전용 생성 금지

- 평균 키나 170cm 전후처럼 짧아 보이는 비율로 생성하지 않는다.
- 큰 바스트를 이유로 몸통·팔·골반·허벅지를 함께 크게 만들지 않는다.
- 커비형, 소프트 헤비형, 살집 있는 체형으로 수렴시키지 않는다.
- 골반을 넓히거나 허벅지를 두껍게 만들어 바스트와 균형을 맞추지 않는다.
- DEPRECATED `BODY-4VIEW-v02`를 현재 체형의 기준으로 사용하지 않는다.
- EXPRESSION 보드만으로 얼굴 정체성을 재정의하지 않는다.
- DERIVED, TEST 결과를 승인 없이 MASTER로 승격하지 않는다.
