# LUNEVA INNER WEAR PRODUCT MASTER Manifest v01

## 역할

이 폴더는 마네킹·모델 없이 LUNEVA INNER WEAR 세트 자체를 렌더링한 PRODUCT MASTER만 보관한다. 상의와 하의는 하나의 세트 상품이므로 같은 상품 ID와 잠금 규칙을 공유한다.

## 현재 상태

- 상품 설계 정본: APPROVED REFERENCE
- 상품 자체 PRODUCT MASTER: PENDING — 생성된 정본 이미지 없음
- FIT FORM 피팅: `../../02-FITTING-MASTER/FIT-FORM/`에서 별도 관리

새 PRODUCT MASTER는 설계 정본의 실루엣, 소재, Noir Ink 마감, 네 곳의 공식 마크 위치를 그대로 유지해야 한다. 승인 전에는 FIT FORM 또는 모델 피팅 이미지를 활성 정본으로 승격하지 않는다.

## 필수 시점 세트

LUNEVA INNER WEAR는 상의와 하의를 함께 보이는 하나의 대칭 세트 상품으로 다음 세 파일을 PRODUCT MASTER의 최소 시점 세트로 사용한다.

1. `LUNEVA-INNER-WEAR-PRODUCT-MASTER-FRONT-v01.png` — 상의와 하의의 정면 구조, 전면 Orbit Frame·워드마크, Noir Ink 마감 확인
2. `LUNEVA-INNER-WEAR-PRODUCT-MASTER-BACK-v01.png` — 상의와 하의의 후면 워드마크·Orbit Frame, 후면 마감 확인
3. `LUNEVA-INNER-WEAR-PRODUCT-MASTER-SIDE-v01.png` — 세트의 측면 실루엣, 크롭 길이, 허리선, 밑단 마감 확인

설계 정본에는 좌우를 구별하는 절개·여밈·포켓·장식·소재가 없으므로 SIDE 한 파일로 LEFT SIDE와 RIGHT SIDE를 대체한다. 세 파일은 모두 마네킹·모델 없이 상품 자체를 같은 중성 스튜디오 조건에서 렌더링한다.

## 활성화 기준

- 세 필수 시점이 모두 승인되어야 PRODUCT MASTER를 `MASTER / ACTIVE`로 승격한다.
- 전면·후면 공식 마크 또는 Noir Ink 마감이 전체 시점에서 검수되지 않으면, 해당 요소만 보이는 별도 단일 DETAIL 이미지를 추가한다.
- 세 PRODUCT MASTER가 `MASTER / ACTIVE`가 되기 전에는 FIT FORM 피팅을 새로 생성하거나 기존 피팅 이미지를 활성 정본으로 승격하지 않는다.
