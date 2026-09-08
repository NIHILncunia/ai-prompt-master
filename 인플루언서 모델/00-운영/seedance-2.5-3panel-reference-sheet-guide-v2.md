# Seedance 2.5 3패널 캐릭터 레퍼런스 시트 지침 v2

기준일: 2026-09-08
용도: 실사 가상 모델의 Seedance 2.5 영상 생성용 캐릭터 레퍼런스 시트 제작

## 1. 목적

이 지침은 한 장의 3패널 시트 안에서 신체 정체성, 후면 실루엣·헤어, 얼굴 정체성을 서로 분리해 전달하기 위한 규칙이다.

핵심 목적은 다음 네 가지다.

1. 얼굴 정체성은 한 곳에서만 제공한다.
2. 정면·후면 신체는 정확히 같은 체형, 키, 스케일과 세로 위치를 유지한다.
3. 한 장에는 한 모델과 한 복장만 사용한다.
4. 복장만 교체해 동일 구조의 시트를 별도 이미지로 반복 제작할 수 있게 한다.

이 시트는 얼굴·신체를 새로 설계하는 자료가 아니라, 이미 승인된 모델의 정체성을 Seedance 2.5에 전달하는 영상용 참조 자산이다.

## 2. 정본 우선순위

시트 제작 시 다음 순서로 모델 정보를 읽는다.

`FACE MASTER + Morphology Card → 공식 신체 수치 + BODY MASTER + Body Signature → 현재 복장/헤어 → 3패널 시트 규칙`

- 얼굴은 FACE MASTER와 Morphology Card를 따른다.
- 키, 체형, 정면·후면 실루엣은 공식 신체 수치와 BODY MASTER를 따른다.
- BODY MASTER의 승인 실루엣은 새로 설계하거나 재해석하지 않는다. Seedance 시트는 이미 승인된 신체 실루엣을 동일 규칙의 3패널 형식으로 재배치하는 작업이다.
- 의상 때문에 체형 자체가 바뀌지 않게 Body Signature를 적용한다.
- FULL MASTER는 전체 인상 보조용으로만 사용한다.
- 복장과 헤어는 작업별 가변 슬롯이다.
- 레이아웃 참고가 필요할 때 MODEL-001 예린의 승인 Seedance 시트를 **FORMAT REFERENCE**로 사용할 수 있다. 이 경우 예린의 얼굴·체형·의상을 복제하지 않고 패널 구조와 배치만 참조한다.

## 3. HARD FORMAT LOCK — 최우선 형식 고정

이 항목은 다른 모든 시각 연출보다 우선한다.

### 3.1 한 장 = 한 모델 = 한 복장

- 모든 모델은 동일한 마스터 프롬프트 구조를 사용하고, 모델별 FACE/BODY/OUTFIT/HAIR 슬롯만 교체한다.
- 동일한 규칙을 모델마다 임의로 다르게 해석하지 않는다.
- 한 이미지에는 정확히 한 모델만 존재한다.
- 한 이미지에는 정확히 한 복장만 존재한다.
- CASUAL과 STAGE를 한 장에 함께 만들지 않는다.
- 여러 스타일, 여러 의상, before/after, casual/stage 비교를 한 장에 합치지 않는다.
- 복장별로 **별도의 생성 요청과 별도의 이미지 파일**을 만든다.

### 3.2 정확히 3패널만 허용

- 가로 16:9 캔버스.
- 세로 패널은 정확히 3개만 존재한다.
- 왼쪽 1/3: FRONT BODY ONLY.
- 가운데 1/3: REAR FULL BODY.
- 오른쪽 1/3: FACE IDENTITY ONLY.
- 세 패널은 가능한 한 동일 폭으로 나눈다.
- 추가 칸, 추가 썸네일, 인셋 이미지, 하단 턴어라운드, 보조 얼굴, 작은 전신 이미지를 만들지 않는다.

### 3.3 다음 형식은 명시적으로 금지

- magazine layout
- editorial character sheet
- profile card
- model card
- casting card with text
- turnaround grid
- contact sheet
- mood board
- collage
- before/after comparison
- casual/stage split sheet
- supplementary thumbnails
- inset portraits
- stat block / profile information

텍스트, 이름, 나이, 키, 체중, 치수, 라벨, 번호, 화살표, 원, 로고, 워터마크도 모두 금지한다.

핵심 문장:

`This is not a magazine layout, profile card, collage, contact sheet, turnaround grid, or comparison sheet. Create exactly one clean triptych with only three vertical panels.`

## 4. 캔버스와 패널 구조

- 가로 16:9.
- 정확히 3개의 세로 패널.
- 세 패널은 동일한 중성 회색 스튜디오 배경과 동일한 조명을 사용한다.
- 얇고 단순한 세로 구분선만 허용한다.
- 패널 외부 장식은 없다.

### PANEL 1 — FRONT BODY ONLY

정면 전신 신체 전용 패널이다.

- 동일 모델의 정면 신체.
- 머리와 머리카락 전체를 제거한다.
- 얼굴, 귀, 턱, 머리카락 등 얼굴 식별 정보가 하나도 남지 않아야 한다.
- 제거된 머리 공간은 회색 배경으로 채운다.
- **PANEL 2에서 머리가 차지하는 공간을 PANEL 1에서도 빈 공간으로 그대로 확보한다.**
- 머리를 제거했다고 신체를 위로 당기거나 확대하지 않는다.
- PANEL 1의 목 아래 신체 바운딩 박스는 PANEL 2의 목 아래 신체 바운딩 박스와 동일한 높이와 스케일을 가져야 한다.
- 어깨, 겨드랑이, 가슴 높이, 허리, 골반, 무릎, 발의 세로 좌표는 PANEL 2와 대응해야 한다.
- 발끝까지 전부 보인다.
- 중립적인 피팅 모델 자세를 사용한다.
- 정면 신체가 PANEL 2보다 크거나 작으면 실패다.

### PANEL 2 — REAR FULL BODY

후면 전신·후면 헤어 전용 패널이다.

- PANEL 1과 정확히 동일한 신체를 180도 돌린 후면으로 표현한다.
- 머리부터 발끝까지 전체가 보인다.
- 얼굴은 전혀 보이지 않는다.
- 뒤통수, 헤어 길이와 후면 질감은 보인다.
- PANEL 1과 키, 어깨 폭, 몸통 길이, 허리 높이, 골반 폭, 팔 길이, 다리 길이, 무릎 높이, 발 크기가 동일해야 한다.
- 동일 바닥선, 동일 카메라 높이, 동일 렌즈, 동일 카메라 거리, 동일 확대율을 유지한다.
- PANEL 1과 같은 복장, 같은 신발, 같은 의상 핏을 사용한다.

### PANEL 3 — FACE IDENTITY ONLY

유일한 얼굴 정체성 패널이다.

- 정면 두상~상부 어깨 클로즈업.
- 정수리부터 어깨 상단까지 완전히 보인다.
- 눈높이 카메라.
- 약 85~105mm 상당의 자연스러운 포트레이트 원근감.
- FACE MASTER의 얼굴 구조를 가장 높은 우선순위로 유지한다.
- 표정은 중립 또는 매우 약한 자연스러운 표정. FACE MASTER가 웃는 이미지여도 과도한 미소를 자동 복제하지 않는다.
- 카메라 정면 응시.
- 과도한 고개 기울기 금지.
- PANEL 1·2와 동일한 복장과 동일한 헤어 세팅을 유지하며, 어깨·목 주변에 보이는 의상도 같은 의상이어야 한다.
- 전체 시트에서 얼굴은 이 패널에만 존재한다.

## 5. 가장 중요한 BODY LOCK 규칙

PANEL 1과 PANEL 2는 '비슷한 체형의 두 사람'이 아니라 **동일한 하나의 3D 신체를 정면과 후면에서 본 것**처럼 보여야 한다.

항상 다음 조건을 명시한다.

- same underlying body geometry
- exact same body scale
- exact same camera distance
- exact same focal length
- exact same vertical registration
- exact same floor line
- exact same body bounding-box height below the neck
- same shoulder width
- same torso length
- same waist height
- same hip width
- same arm length
- same leg length
- same knee height
- same foot size

핵심 문장:

`The CENTER body must look like the LEFT body rotated exactly 180 degrees around its vertical axis.`

추가 강제 문장:

`The front and back body below the neck must occupy the same normalized bounding box and the same vertical coordinates. Removing the head must not change body scale or body position.`

머리 제거 때문에 PANEL 1의 몸이 확대되거나 위로 이동하면 실패다.

## 6. FACE LOCK 규칙

- 전체 시트에 보이는 얼굴은 정확히 하나다.
- PANEL 1: 얼굴 정보 0.
- PANEL 2: 얼굴 정보 0.
- PANEL 3: 유일한 얼굴 정본.
- 작은 얼굴 삽입, 반사된 얼굴, 미러 이미지, 보조 초상, 원형 인셋을 만들지 않는다.
- 얼굴을 여러 번 넣어 평균화하지 않는다.
- PANEL 3 얼굴은 FACE MASTER보다 작은 얼굴, 큰 눈, 좁은 턱, 작은 코·입으로 자동 미화하지 않는다.

핵심 문장:

`There must be exactly one visible face in the entire reference sheet, located only in Panel 3.`

## 7. 가변 슬롯

다음 요소는 시트마다 교체할 수 있다.

### OUTFIT

복장은 촬영·영상 작업별로 새로 정의한다.

예:

- CASUAL: 편안한 민소매 나시/티셔츠 + 데님/팬츠 + 심플 슈즈
- STAGE: 현재 무대 의상 + 무대용 부츠 + 액세서리
- FASHION: 특정 룩북 의상
- PRODUCT: 제품 캠페인용 의상

복장이 바뀌어도 모델의 체형, 키, 얼굴은 바뀌지 않는다.

**한 번의 생성에서는 반드시 한 복장만 사용한다.** 다른 복장이 필요하면 새 이미지로 별도 생성한다.

### HAIR

- 기본 헤어 또는 현재 캠페인 헤어를 지정할 수 있다.
- PANEL 2에서는 후면 헤어 구조를 명확히 보여준다.
- PANEL 3에서는 얼굴 정체성을 가리지 않게 한다.
- PANEL 1에는 헤어가 존재하지 않는다.
- PANEL 2와 PANEL 3은 같은 헤어 세팅이어야 한다.

### MAKEUP

- FACE MASTER의 얼굴 구조를 바꾸지 않는 범위에서 작업별로 변경 가능하다.
- 레퍼런스 시트 기본값은 약한 커머셜 메이크업이다.

## 8. FORMAT REFERENCE 사용 규칙

현재 성공 사례인 MODEL-001 차예린의 승인 시트를 레이아웃 참고로 사용할 수 있다.

- `MODEL-001-MOTION-REFSHEET-CASUAL-v01.png`
- `MODEL-001-MOTION-REFSHEET-STAGE-v01.png`

이 두 이미지는 **FORMAT REFERENCE**다.

참조할 것:
- 정확히 3개의 세로 패널
- PANEL 1의 빈 머리 공간
- PANEL 1·2의 동일 신체 스케일과 바닥선
- PANEL 2의 후면 헤어
- PANEL 3의 단일 얼굴 클로즈업
- 장식 없는 회색 스튜디오 배경

참조하지 않을 것:
- 예린의 얼굴
- 예린의 체형
- 예린의 신장
- 예린의 의상
- 예린의 메이크업

즉 구조만 복제하고 모델 정체성은 현재 대상 모델의 MASTER 자료에서 가져온다.

## 9. 마스터 프롬프트 템플릿

```text
Create ONE high-resolution photorealistic Seedance 2.5 character reference image for [MODEL ID / NAME].

HARD FORMAT LOCK:
This is ONE image for ONE character wearing ONE outfit.
Create exactly ONE clean 3-panel triptych and nothing else.
Exactly three equal vertical panels only.
Do not create a magazine layout, editorial sheet, profile card, model card, turnaround grid, contact sheet, collage, comparison sheet, casual/stage split, extra thumbnails, inset portraits, profile text, statistics, labels, names, numbers, arrows, circles, logos or watermark.

PURPOSE:
Seedance 2.5 character identity reference asset.
All three panels depict the exact same single adult woman.

CANVAS:
16:9 horizontal canvas, exactly three equal vertical panels, neutral gray seamless studio background, thin dark panel dividers.

CHARACTER IDENTITY:
[MODEL FACE / MORPHOLOGY SUMMARY]

BODY IDENTITY:
[MODEL BODY SIGNATURE SUMMARY]

OUTFIT:
[ONE CURRENT OUTFIT DESCRIPTION ONLY]

HAIR:
[CURRENT HAIR DESCRIPTION]

LIGHTING:
soft neutral even commercial studio lighting, neutral white balance, realistic skin, hair and fabric texture, no dramatic colored lighting.

LEFT PANEL — FRONT BODY ONLY:
Full-body FRONT view in a neutral fitting-model pose.
The entire head and all hair are absent from this panel.
The missing head region is filled with the same neutral gray background.
Reserve the complete normal head-height space above the neck exactly as if the head were still present.
The body below the neck must occupy exactly the same normalized bounding box, body scale and vertical coordinates as the body below the neck in the CENTER panel.
Do not enlarge, shorten, recrop, raise or reposition the body because the head is absent.
No face, no hair, no ears, no jaw, no chin, no facial information.
Show the complete body from neck base to shoes with the full shoes visible.

CENTER PANEL — REAR FULL BODY:
Full-body BACK view of the exact same character.
Same pose, same body geometry, same scale, same camera distance, same focal length, same vertical registration and same floor line as the LEFT panel.
The CENTER body must look like the LEFT body rotated exactly 180 degrees around its vertical axis.
Full rear head and hairstyle visible, absolutely no facial features visible.
Same outfit and same footwear.

RIGHT PANEL — FACE IDENTITY ONLY:
Large frontal head-and-upper-shoulders portrait of the exact same woman.
This is the only visible face anywhere in the entire sheet.
Eye-level camera, approximately 85–105mm equivalent, neutral relaxed expression or very slight natural expression, direct gaze, no strong head tilt.
Preserve the approved facial morphology exactly.
Use the same hairstyle and same outfit as the other panels.
Do not beautify by narrowing the face, enlarging the eyes, shrinking the jaw, nose or mouth.

BODY LOCK:
LEFT and CENTER use the exact same underlying body geometry and the exact same body bounding box below the neck.
Same shoulder width, torso length, waist height, hip width, arm length, leg length, knee height and foot size.
Same outfit fit and dimensions.
Do not make front and back bodies different in height, width or proportions.

FACE LOCK:
There must be exactly one visible face in the entire reference sheet, located only in the RIGHT panel.
No duplicated face, no inset portrait, no mirror face, no reflection, no secondary face.

CONSISTENCY:
one identical adult woman across all three panels, same skin tone, same body, same clothing, same hair identity, same lighting, no identity drift, no body-proportion drift, no wide-angle distortion, no stylization.
```

## 10. 생성 검수

다음 항목을 모두 통과해야 승인한다.

1. 정확히 3패널뿐인가.
2. 추가 썸네일, 추가 얼굴, 텍스트, 프로필 정보가 없는가.
3. 한 장에 한 복장만 있는가.
4. PANEL 1과 PANEL 2의 키와 신체 스케일이 같은가.
5. 머리 제거 후 PANEL 1 신체가 확대·상향 이동하지 않았는가.
6. PANEL 1에서 PANEL 2의 머리 높이만큼 빈 공간이 유지되는가.
7. PANEL 1·2의 목 아래 신체 바운딩 박스 높이가 같은가.
8. 어깨, 허리, 골반, 무릎, 발 높이가 두 전신 패널에서 대응하는가.
9. 정면·후면이 같은 체형으로 읽히는가.
10. PANEL 1에 얼굴·머리카락 정보가 완전히 제거되었는가.
11. PANEL 2에 얼굴이 보이지 않는가.
12. PANEL 3만 유일한 얼굴인가.
13. PANEL 3 얼굴이 FACE MASTER와 Morphology Card를 유지하는가.
14. PANEL 3의 헤어·의상이 PANEL 2와 동일한가.
15. 신체가 BODY MASTER와 Body Signature를 유지하는가.
16. 복장만 바뀌고 모델 자체가 바뀌지 않았는가.
17. 손·발·관절·의상 구조가 자연스러운가.
18. 세 패널의 조명·배경·화이트밸런스가 동일한가.

## 11. 파일명

권장 형식:

`MODEL-[ID]-MOTION-REFSHEET-[OUTFIT]-v01.png`

예:

- `MODEL-001-MOTION-REFSHEET-CASUAL-v01.png`
- `MODEL-001-MOTION-REFSHEET-STAGE-v01.png`

지침 파일:

`seedance-2.5-3panel-reference-sheet-guide-v2.md`

## 12. 현재 승인 기준 사례

MODEL-001 차예린의 다음 두 시트를 v2의 공식 FORMAT REFERENCE로 사용한다.

- `MODEL-001-MOTION-REFSHEET-CASUAL-v01.png`
- `MODEL-001-MOTION-REFSHEET-STAGE-v01.png`

두 사례의 핵심 성공 조건은 다음과 같다.

- 정확히 3개의 세로 패널만 존재한다.
- 한 이미지에는 한 복장만 존재한다.
- PANEL 1의 머리 공간은 빈 배경으로 남는다.
- PANEL 1과 PANEL 2의 신체 비율·키·바닥선이 일치한다.
- PANEL 1의 머리만 제거되고 신체 위치는 유지된다.
- PANEL 3에만 얼굴 정체성이 존재한다.
- 별도 텍스트, 프로필 카드, 추가 썸네일이 없다.
