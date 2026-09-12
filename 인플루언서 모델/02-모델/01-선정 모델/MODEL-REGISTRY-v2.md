# 실사 모델 MODEL Registry v2

기준일: 2026-09-10

## 관리 원칙

- 승인된 FACE MASTER와 BODY MASTER만 후속 생성의 정체성 기준으로 사용한다.
- 신규 BODY MASTER는 `BODY-FRONT` + `BODY-SIDE` + `BODY-BACK`의 3분리 세트다.
- 구버전·실패·교체 파일은 `DEPRECATED / 99-보관`으로 관리하고 정체성 참조에서 제외한다.
- 상세 수치와 반응 규칙은 각 모델의 Profile, Morphology Card, Body Signature, Expression Signature, Anchor Manifest를 따른다.

## 공식 모델 현황

| 모델 | 나이 | FACE MASTER | BODY MASTER | 표정 | 상태 |
|---|---:|---|---|---|---|
| MODEL-001 차예린 | 24 | HALF-v03 | FRONT/SIDE/BACK-v01 | 24종·6보드 | 운용 중 |
| MODEL-002 백세아 | 22 | HALF-v04 | FRONT-v01 / SIDE-v02 / BACK-v02 | 24종·6보드 | 운용 중 |
| MODEL-003 강하진 | 27 | HALF-v03 | FRONT/SIDE/BACK-v01 | 24종·6보드 | 운용 중 |
| MODEL-004 한서윤 / 리안 | 25 | HALF-v04 | 3분리 세트 검수 중 | 24종 | 운용 중 |
| MODEL-005 윤서린 / 서린 | 26 | HALF-v02 | FRONT/SIDE/BACK-v01 | 24종 | 운용 중 |

## MODEL-003 강하진 — 2026-09-09 확정 변경

- FACE MASTER: `MODEL-003-ANCHOR-HALF-v03.png`
- BODY MASTER: `MODEL-003-ANCHOR-BODY-FRONT-v01.png`, `MODEL-003-ANCHOR-BODY-SIDE-v01.png`, `MODEL-003-ANCHOR-BODY-BACK-v01.png`
- EXPRESSION / ACTIVE: `MODEL-003-EXPRESSION-BOARD-01-BASELINE-v02.png`부터 `MODEL-003-EXPRESSION-BOARD-06-EDITORIAL-ALLURE-v01.png`까지, 총 24종.
- 문서: `MODEL-003-PROFILE-v02.md`, `MODEL-003-MORPHOLOGY-v02.md`, `MODEL-003-BODY-SIGNATURE-v03.md`, `MODEL-003-EXPRESSION-SIGNATURE-v02.md`, `MODEL-003-ANCHOR-MANIFEST-v03.md`
- 이전 5개 v01 표정 보드, HALF-v01, FULL-v01, BODY-4VIEW-v02/v03은 DEPRECATED / `99-보관`이다.

## MODEL-001·MODEL-002 — 2026-09-10 기본 프로필·표정 스펙트럼 전환

- 기본 프로필은 루네바 이너웨어를 착용한 정면·왼쪽 측면·후면 전신 및 정면 흉상으로 통일했다.
- MODEL-001은 `HALF-v03`, MODEL-002는 `HALF-v04`를 정확한 9:16 정면 흉상 FACE MASTER로 사용한다.
- MODEL-002의 오른쪽을 보던 `BODY-SIDE-v01`은 왼쪽을 보는 `BODY-SIDE-v02`로 교체했다.
- 두 모델은 동일한 루네바 이너웨어·헤어·조명·프레이밍의 24종·6보드 v02 표정 스펙트럼을 ACTIVE로 전환했다.
- 기존 흉상·측면·표정 v01·BODY-4VIEW·Seedance BASE v01은 `99-보관`의 DEPRECATED 자료로 관리한다.
- MODEL-001, MODEL-002, MODEL-003, MODEL-005는 BASE Seedance 3패널 시트를 보유한다.

## 전 모델 — 2026-09-10 흉상 9:16 및 루네바 로고 점검

- 다섯 모델의 ACTIVE FACE MASTER를 정확한 9:16 비율로 교정했다.
- 전신·흉상 앵커의 루네바 의상 심볼과 워드마크를 승인 로고 원본과 대조했다. 보이는 위치의 심볼·워드마크가 정상적으로 유지된 것을 확인했다.

## 공통 표준

- 표정: `EXPRESSION-BOARD-STANDARD-v02.md`, 2×2 보드 6장·총 24종.
- 신체 참조: `공식 수치 → BODY MASTER → Body Signature → 장면 의상·포즈`.
- 표정 참조: `FACE MASTER → 표정 보드 표준 → Expression Signature → 해당 보드`.
