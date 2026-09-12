# dev_게임 스킬 아이콘 스타일 계약 — 승격 확정본

상태: 승격 완료 / 개발 기록
정식 런타임 직접 호출: 금지
정식 계약: `../../../1. 프롬프트/1. 이미지 생성 모듈/라이브러리/스타일/게임 스킬 아이콘.md`

## 1. 최종 기능 계약

- 1:1 아이콘
- 한 슬롯 한 핵심 개념
- 64×64 / 128×128 판독성
- 실제 슬롯 전체를 유색 비투명 추상 배경으로 완전 충전
- 실제 슬롯의 검정·거의 검정·차콜 기본 배경 금지
- 다중 최종 정본은 3×3 고정
- 슬롯 512×512 / 시트 1536×1536
- 행 우선
- 빈 슬롯만 순수 검정
- 셀 사이·외곽 0px
- 9개 초과 시 3×3 추가
- 실제 슬롯만 512×512 낱개 저장
- 원시 생성본은 임시본이며 정규화 후 최종 판정

## 2. 최종 시각 문법

- 고채도·고대비 판타지 RPG 스킬 아이콘
- 굵고 빠르게 읽히는 실루엣
- 중앙 집중형 또는 명확한 대각선 운동형
- 페인터리와 그래픽의 중간 렌더링 밀도
- 선택적 림라이트·국소 에너지 글로우
- 속성색과 강한 명도 분리
- 배경과 같은 색 계열이면 명도·채도·림라이트로 중심 형태 분리
- 신성·광휘는 내부 형태선 보존
- 장소·풍경 배경, 전역 bloom, 미세 텍스처 과다 금지

## 3. 고정 영어 스타일 블록

```text
Apply the locked high-readability fantasy RPG skill-icon language:
one dominant gameplay concept per square icon,
a bold large-shape silhouette that remains immediately legible at 64x64 and 128x128,
clear central focus or decisive directional motion,
high chroma with strong value separation,
graphic-painterly rendering with controlled material detail,
selective hard edges,
selective rim light,
and localized energy glow that reinforces rather than obscures the main form.

Keep the subject or primary effect visually dominant over all secondary effects. Fill the entire square with an opaque colored abstract background harmonized with the subject's element, dominant hue, luminance, and glow. Do not use pure black, near-black, or charcoal as the default background for an occupied icon slot. When subject and background share a hue family, separate them with luminance contrast, saturation contrast, and selective rim light. Preserve internal shape lines in bright holy or radiant subjects instead of clipping them into featureless white.

Use only abstract color fields, restrained gradients, localized mist, energy haze, or sparse particles as background support. Do not introduce scenery, floors, rooms, landscapes, token frames, badge rims, dense microtexture, or global bloom. Do not let particles, glow, or background effects overpower the core silhouette.
```

## 4. 승격 앵커

1. `01. 동적 원소 공격 앵커.png` — 핵심 동적
2. `02. 장축 투사체 앵커.png` — 조건부 장축
3. `03. 고에너지 발광 앵커.png` — 조건부 고에너지
4. `04. 치유·지원 앵커.png` — 조건부 지원
5. `05. 방어·재질 앵커.png` — 핵심 정적

## 5. 공통 붓터치 마감

미적용. 이 스타일은 게임 아이콘 기능 전용 계약으로 독립 운용한다.

## 6. 승격 판정

반복 테스트와 패키징 테스트가 정식 운용에 충분한 재현성을 보였고, 최종 고정 영어 블록·앵커·기능 계약을 정식 경로로 이식했다. 개발 폴더는 더 이상 런타임 입력이 아니다.
