# MODEL-004 앵커 매니페스트 v01

- 모델: MODEL-004 한서윤 / 리안 (RIAN)
- 기준일: 2026-09-09
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
| FACE | `MODEL-004-ANCHOR-HALF-v03.png` | MASTER | ACTIVE | 얼굴 골격, 이목구비, 중립 로즈 베이지 피부, 기본 헤어와 상반신 인상 |
| FULL | `MODEL-004-ANCHOR-FULL-v01.png` | MASTER | ACTIVE | 전체 인상, 173cm 비율, 전신 대표 실루엣 |
| BODY | `MODEL-004-ANCHOR-BODY-4VIEW-v01.png` | MASTER | PENDING | 4방향 체형 정본. 생성·검수·승인 전에는 MASTER로 사용하지 않음 |

## 3. 활성 SUPPORT

| 파일 | Role | State | 용도 |
|---|---|---|---|
| `MODEL-004-ANCHOR-BODY-SIDE-v01.png` | SUPPORT | ACTIVE | 현재 확보된 측면 실루엣·깊이 보조 기준 |
| `MODEL-004-ANCHOR-BODY-BACK-v01.png` | SUPPORT | ACTIVE | 현재 확보된 후면 실루엣·헤어 보조 기준 |

정식 BODY MASTER를 만들 때는 FULL MASTER와 위 두 SUPPORT를 함께 사용하고, 필요한 반대 측면까지 포함해 하나의 4방향 정본으로 정리한다.

## 4. 표정 레퍼런스

다음 파일은 모두 `EXPRESSION / ACTIVE`다.

- `MODEL-004-EXPRESSION-BOARD-01-BASELINE-v02.png`
- `MODEL-004-EXPRESSION-BOARD-02-POSITIVE-v01.png`
- `MODEL-004-EXPRESSION-BOARD-03-PLAYFUL-v01.png`
- `MODEL-004-EXPRESSION-BOARD-04-NARRATIVE-v01.png`
- `MODEL-004-EXPRESSION-BOARD-05-SADNESS-v01.png`

표정 작업 시 `FACE MASTER + MODEL-004-EXPRESSION-SIGNATURE-v01.md + 필요한 EXPRESSION 보드`를 함께 사용한다.

### Expression Signature 연결

- `MODEL-004-EXPRESSION-SIGNATURE-v01.md`는 눈·시선·입·눈썹의 개인적 변화 경향을 정의한다.
- EXPRESSION 보드는 감정별 승인 예시이며, 같은 칸을 그대로 복제하지 않고 Signature 범위 안에서 자연스럽게 변주한다.

### Body Signature 연결

- 신체 행동 기준: `MODEL-004-BODY-SIGNATURE-v01.md`
- BODY MASTER 완성 전 신체 생성 우선순위: `공식 신체 수치 → FULL MASTER + BODY SUPPORT → Body Signature → 장면별 의상·포즈`
- BODY MASTER 완성 후에는 `공식 신체 수치 → BODY MASTER → Body Signature → 장면별 의상·포즈`를 사용한다.

## 5. DEPRECATED

- `MODEL-004-ANCHOR-HALF-v02-REJECTED.png` — DEPRECATED / `99-보관`
- `MODEL-004-EXPRESSION-BOARD-01-BASELINE-v01-REPLACED.png` — DEPRECATED / `99-보관`

위 파일은 승인된 MASTER·SUPPORT·EXPRESSION과 함께 후속 생성에 혼합 참조하지 않는다.

## 6. 버전 감사 기록

- FACE MASTER는 `HALF-v03`이며, v02는 로고·정체성 검수 실패로 보관 처리했다.
- 기존 EXPRESSION BOARD 01 v01은 패널 규격 교체 후 v02로 대체했다.
- BODY-4VIEW 정본은 아직 존재하지 않는다. 측면·후면 파일을 임의로 BODY MASTER로 승격하지 않는다.

## 7. 사용 우선순위

- 얼굴·뷰티: `HALF MASTER` + `MODEL-004-MORPHOLOGY-v01.md`
- 전신·패션: `FULL MASTER` + 필요 시 `BODY SUPPORT`
- 체형·피팅: `공식 신체 수치` + `FULL MASTER + BODY SUPPORT` + `MODEL-004-BODY-SIGNATURE-v01.md`
- 표정: `HALF MASTER` + `MODEL-004-EXPRESSION-SIGNATURE-v01.md` + 해당 `EXPRESSION` 보드
- 영상 얼굴 일관성: `HALF MASTER` 우선, 전신이 보이면 `FULL MASTER + BODY SUPPORT`를 추가

## 8. 금지

- EXPRESSION 보드만으로 얼굴 정체성을 재정의하지 않는다.
- BODY-4VIEW가 승인되기 전에는 BODY MASTER로 표기하지 않는다.
- DERIVED·TEST 결과를 승인 없이 MASTER로 승격하지 않는다.
- DEPRECATED 파일을 ACTIVE 기준과 혼합 참조하지 않는다.
