# Task 1 Review Package

## Review basis
- Base: task-1-before snapshot and SHA-256 manifest
- Head: current non-Git workspace files after Task 1

## Image move evidence
- 1. 프롬프트\1. 이미지 생성 모듈\라이브러리\견본\붓터치 반실사\04. 마감 앵커.png | SHA256=4DD50806C3905725D60AB07AB72CEBE463D3A13496A03A3600D4DF44B0A080E7
- 1. 프롬프트\1. 이미지 생성 모듈\라이브러리\견본\보관\붓터치 반실사 재구축 후보\04. 마감 앵커.png | SHA256=82DF15CEFE6F685D96412501FCBDAFFE9A13C729672628C39D30ACD8B64E0289

## Markdown diffs

### 1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\붓터치 반실사.md
```diff
warning: in the working copy of 'G:\내 드라이브\TRPG 데이터\.superpowers\sdd\2026-09-06-image-style-anchor-resolver\task-1-before\1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\붓터치 반실사.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'G:\내 드라이브\TRPG 데이터\1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\붓터치 반실사.md', LF will be replaced by CRLF the next time Git touches it
diff --git "a/G:\\내 드라이브\\TRPG 데이터\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\task-1-before\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\붓터치 반실사.md" "b/G:\\내 드라이브\\TRPG 데이터\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\붓터치 반실사.md"
index 9266f92..5db93b5 100644
--- "a/G:\\내 드라이브\\TRPG 데이터\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\task-1-before\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\붓터치 반실사.md"	
+++ "b/G:\\내 드라이브\\TRPG 데이터\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\붓터치 반실사.md"	
@@ -1,80 +1,67 @@
 # 붓터치 반실사 스타일 계약
 
 ## 1. 정체성과 소유 범위
 
 `붓터치 반실사`는 현실 구조를 바탕으로 하되 사진보다 일러스트 설계가 먼저 읽히는 정식 스타일이다. 실사 이미지에 붓 필터를 얹은 형태도, 애니 그림체를 세밀하게 묘사한 형태도 아니다.
 
-이 문서는 반실사 얼굴·인체 설계, 형태 단순화, 선 의존도, 명암과 채색 문법을 소유한다. 캐릭터 정체성·의상·소품·포즈·카메라·배경·장면 구성은 소유하지 않는다.
+이 문서는 반실사 얼굴·인체 설계, 형태 단순화, 선 의존도와 고정 영어 그림체 블록을 소유한다. 캐릭터 정체성·의상·소품·포즈·카메라·배경·장면 구성은 소유하지 않는다. 앵커 조합과 참조 예산 결정은 `정식 스타일 호출 규칙.md`를 따른다.
 
 ## 2. 고정 영어 그림체 블록
 
 이 스타일을 선택한 최종 영어 프롬프트에는 아래 블록을 문장 변경 없이 그대로 넣는다.
 
 ```text
-Apply the locked illustration-forward Painterly Semi-Realistic drawing language:
-believable underlying anatomy,
-selective simplification of facial and body planes,
-elegant character-specific shape design,
-expressive but controlled eyes within plausible human proportions,
-clean structured noses and mouths,
-graphic painted hair masses,
-minimal reliance on outlines,
-sculpted but non-photographic volume,
-and refined fantasy illustration aesthetics.
-
-The result must look designed and illustrated, not photographed and given a brush filter. It must not use anime, manga, chibi, webtoon, photographic, hyperreal, or 3D CGI construction.
+Apply the locked illustration-forward Stylized JRPG Painterly Semi-Realistic drawing language:
+a distinctly designed two-dimensional character illustration built on believable underlying anatomy rather than photographic likeness,
+idealized but age-appropriate facial construction,
+selectively simplified facial and body planes,
+clean intentional jaw, cheek, nose, and mouth shapes,
+expressive but restrained eyes kept within plausible proportions,
+graphic grouped hair masses with selective strand accents,
+controlled shape hierarchy,
+minimal dependence on contour lines,
+sculpted yet non-photographic volume,
+and elegant fantasy character-design proportions.
+
+Translate the specified age through the cranial-to-face ratio, lower-face length, neck and shoulder breadth, torso length, limb proportions, musculature, and overall head-to-body scale. Preserve clear age separation without turning children into miniature adults or adults into youthful anime figures.
+
+The result must remain unmistakably illustrative: more designed and selectively simplified than a realistic portrait, yet more structurally grounded than anime. Do not use anime or manga facial construction, photographic or hyperreal skin, live-action portrait realism, game screenshot rendering, or three-dimensional CGI surfaces.
 ```
 
-이 블록 바로 뒤에 `공통 붓터치 마감 규칙.md`의 고정 영어 마감 블록을 그대로 붙인다.
+이 블록 바로 뒤에 `공통 붓터치 마감 규칙.md`의 고정 영어 마감 블록을 한 번만 그대로 붙인다.
 
 ## 3. 정식 시각 앵커
 
 정본 경로: `../견본/붓터치 반실사/`
 
-- `01. 핵심 얼굴 앵커.png` — 일러스트 중심 반실사 얼굴 구조, 눈·코·입 비례, 형태 단순화와 얼굴 채색의 기준
-- `02. 중립 전신 앵커.png` — 설득력 있는 해부학, 전신 비례, 실루엣과 복식 형태의 기준
-- `03. 마감 앵커.png` — 완성 일러스트의 채색층·명암·경계·붓터치·재질 표현·최종 표면 처리 기준
+- `01. 핵심 얼굴 앵커.png` — 얼굴 그림체: 얼굴 평면 단순화, 눈·코·입 설계, 머리카락 덩어리, 비사진적 얼굴 조형
+- `02. 나이 표현 앵커.png` — 연령 표현: 두개골 대비 얼굴 비율, 하안부 길이, 목·어깨, 연령별 인상과 노화 표현
+- `03. 전신 앵커.png` — 전신 비례: 머리 대비 신장, 몸통·팔다리 비율, 연령별 체형, 전신 실루엣
+- `04. 마감 앵커.png` — 최종 마감: 저수분 수채·과슈 계열 채색, 명암, 경계, 붓터치, 재질 분리와 표면 처리
 
-이 세 파일만 활성 정식 앵커다. `../견본/보관/붓터치 반실사 기존 견본/`의 파일은 이력·복구 자료이며 생성 참조로 사용하지 않는다.
+이 네 파일만 활성 정식 앵커다. `../견본/보관/붓터치 반실사 기존 견본/`과 `../견본/보관/붓터치 반실사 재구축 후보/`의 파일은 이력·복구 자료이며 생성 참조로 사용하지 않는다.
 
-## 4. 앵커 하드 게이트와 선택
+## 4. 앵커 하드 게이트와 호출 위임
 
-- 최종 영어 프롬프트를 공개하기 전에 사용할 정식 앵커의 실제 픽셀을 확인한다.
+- 최종 영어 프롬프트를 공개하기 전에 실제 사용할 정식 앵커의 실제 픽셀을 확인한다.
 - 파일명·메타데이터·이전 세션 기억만으로 확인을 대체하지 않는다.
-- 한 생성에 사용하는 스타일 앵커는 최대 2장이다.
-- 흉상·얼굴 중심: `01. 핵심 얼굴 앵커.png` + `03. 마감 앵커.png`
-- 전신·인체 중심: `02. 중립 전신 앵커.png` + `03. 마감 앵커.png`
-- 사용자 제공 이미지의 스타일 변환: 사용자 이미지를 디자인 기준으로 두고, 구도가 얼굴 중심이면 `01`, 전신 중심이면 `02` 한 장만 스타일 기준으로 사용한다.
-- 도구의 전체 이미지 참조 수 제한이 더 낮으면 사용자 제공 디자인 기준을 먼저 유지한다.
-
-요구사항 확인서와 최종 영어 프롬프트 검토에는 실제 사용할 앵커의 전체 파일명을 기록한다.
+- 산출물 구도별 앵커 조합과 도구 전체 이미지 참조 한도에 따른 축소는 `정식 스타일 호출 규칙.md`의 기본 조합과 참조 예산 우선순위를 따른다.
+- 요구사항 확인서와 최종 영어 프롬프트 검토에는 전체 활성 앵커, 실제 사용할 앵커, 제외한 앵커와 사유를 기록한다.
 
 ## 5. 스타일 전용 참조 제한
 
 스타일 앵커의 인물·의상·팔레트·포즈·카메라·배경·구성은 참조하지 않는다.
 
-앵커에서 참조할 수 있는 것은 다음뿐이다.
-
-- 반실사 얼굴과 인체의 그림체
-- 현실 구조와 일러스트 단순화의 균형
-- 선보다 면과 명암으로 형태를 세우는 방식
-- 채색·명암·재질 분리 방식
-- 디지털 페인팅 붓터치와 완성도
-
-다음 요소는 참조하거나 복제하지 않는다.
+앵커에서 참조할 수 있는 것은 반실사 얼굴과 인체의 그림체, 현실 구조와 일러스트 단순화의 균형, 선보다 면과 명암으로 형태를 세우는 방식, 채색·명암·재질 분리 방식, 디지털 페인팅 붓터치와 완성도뿐이다.
 
-- 앵커 인물의 정체성·성별·연령·종족
-- 얼굴 생김새·헤어스타일·의상·장신구·무기
-- 색상 팔레트·문양·문화권·장식 밀도
-- 포즈·표정·시선·카메라·크롭
-- 배경·조명 상황·마법 효과·장면 구성
+앵커 인물의 정체성·성별·연령·종족, 얼굴 생김새·헤어스타일·의상·장신구·무기, 색상 팔레트·문양·문화권·장식 밀도, 포즈·표정·시선·카메라·크롭, 배경·조명 상황·마법 효과·장면 구성은 참조하거나 복제하지 않는다.
 
 ## 6. 캐릭터와 장면의 가변 영역
 
 캐릭터 디자인, 연령, 체형, 종족, 의상, 행동, 포즈, 표정, 카메라, 배경과 장면 구성은 사용자 입력과 기능 계약이 결정한다. 사용자가 지정하지 않은 포즈·카메라·배경은 기능 목적에 맞게 결정할 수 있으나 앵커 구성을 답습하지 않는다.
 
 반실사의 현실성은 구조의 설득력에만 사용한다. 모공·사진식 피부·렌즈 심도·실사 조명·극사실 재질을 추가하는 근거로 사용하지 않는다.
 
 ## 7. 사용자 제공 이미지
 
 - 스타일 변경 지시가 없으면 제공 이미지의 디자인과 그림체를 모두 따른다.
@@ -87,18 +74,18 @@ The result must look designed and illustrated, not photographed and given a brus
 - 포토리얼 사진, 하이퍼리얼 피부·모공, 사진식 렌즈 효과
 - AAA 3D CGI 렌더, 게임 시네마틱 캐릭터, 플라스틱 표면
 - 애니·만화·치비·웹툰 얼굴 구조
 - 애니 그림체에 디테일만 추가한 결과
 - 형태가 흐려지는 과도한 추상화와 거친 임파스토
 - 앵커의 의상·팔레트·배경·구도 복제
 
 ## 9. 프롬프트 조립 순서
 
 1. 기능 규격과 사용자 요구에서 가변 내용을 정리한다.
-2. 사용자 제공 이미지가 있으면 디자인 보존 항목과 그림체 보존·변경 여부를 분리한다.
-3. 구도에 맞는 정식 앵커를 최대 2장 선택하고 실제 픽셀을 확인한다.
-4. 대상·디자인·행동·포즈·카메라·배경·출력 규격을 작성한다.
-5. 고정 영어 그림체 블록을 그대로 삽입한다.
-6. 공통 고정 영어 마감 블록을 그대로 삽입한다.
+2. 그림체 적용 방식을 `정식 스타일 호출 규칙.md`에서 하나로 판정한다.
+3. 제공 이미지가 있으면 디자인 보존 항목과 그림체 보존·변경 여부를 분리한다.
+4. 중앙 호출 규칙이 반환한 앵커를 실제 픽셀로 확인한다.
+5. 대상·디자인·행동·포즈·카메라·배경·출력 규격을 작성한다.
+6. 고정 영어 그림체 블록과 공통 고정 영어 마감 블록을 순서대로 삽입한다.
 7. 앵커 콘텐츠 복제와 금지 화풍 유도 표현이 없는지 검사한다.
 8. `../../공통/6. 이미지 생성 프롬프트 점검 및 교정 지침.md`의 P01~P10을 검사하고 실패 항목을 교정한다.
 9. 전 항목을 통과한 요구사항 확인서와 최종 영어 프롬프트를 공개하고 승인받은 뒤 생성한다.
```

### 1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\애니 페인팅.md
```diff
warning: in the working copy of 'G:\내 드라이브\TRPG 데이터\.superpowers\sdd\2026-09-06-image-style-anchor-resolver\task-1-before\1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\애니 페인팅.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'G:\내 드라이브\TRPG 데이터\1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\애니 페인팅.md', LF will be replaced by CRLF the next time Git touches it
diff --git "a/G:\\내 드라이브\\TRPG 데이터\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\task-1-before\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\애니 페인팅.md" "b/G:\\내 드라이브\\TRPG 데이터\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\애니 페인팅.md"
index bfbf9b8..eda4085 100644
--- "a/G:\\내 드라이브\\TRPG 데이터\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\task-1-before\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\애니 페인팅.md"	
+++ "b/G:\\내 드라이브\\TRPG 데이터\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\애니 페인팅.md"	
@@ -1,17 +1,17 @@
 # 애니 페인팅 스타일 계약
 
 ## 1. 정체성과 소유 범위
 
 `애니 페인팅`은 이미지 생성 모듈의 정식 스타일이다. 영문 내부 명칭은 `Painterly Anime Illustration`이며, 과거 명칭 `세미리얼 애니 페인팅`은 입력 호환용 별칭으로만 받아들인다.
 
-이 문서는 애니형 얼굴·인체 설계, 선 처리, 형태 단순화와 채색 문법을 소유한다. 캐릭터 정체성·의상·소품·포즈·카메라·배경·장면 구성은 소유하지 않는다.
+이 문서는 애니형 얼굴·인체 설계, 선 처리, 형태 단순화와 채색 문법을 소유한다. 캐릭터 정체성·의상·소품·포즈·카메라·배경·장면 구성은 소유하지 않는다. 앵커 선택과 참조 예산 결정은 `정식 스타일 호출 규칙.md`를 따른다.
 
 ## 2. 고정 영어 그림체 블록
 
 이 스타일을 선택한 최종 영어 프롬프트에는 아래 블록을 문장 변경 없이 그대로 넣는다.
 
 ```text
 Apply the locked Painterly Anime Illustration drawing language:
 finely tapered and elegant anime facial construction,
 age-appropriate jaw and lower-face proportions,
 precise sharply controlled upper eyelid lines,
@@ -33,31 +33,28 @@ Preserve the established anime facial construction, line hierarchy, and stylized
 ## 3. 정식 시각 앵커
 
 정본 경로: `../견본/애니 페인팅/`
 
 - `01. 핵심 얼굴 앵커.png` — 애니형 얼굴 구조, 눈·코·입 단순화, 선 처리, 머리카락과 얼굴 채색의 기준
 - `02. 중립 전신 앵커.png` — 아동·청소년·성인의 연령별 체형 차이, 애니형 전신 비례, 손·팔다리 안정성, 실루엣의 기준
 - `03. 마감 앵커.png` — 완성 일러스트의 채색층·명암·경계·붓터치·재질 표현·최종 표면 처리 기준
 
 이 세 파일만 활성 정식 앵커다. `../견본/보관/애니 페인팅 기존 앵커/`와 `../견본/보관/애니 페인팅 1차 정식 앵커/`의 파일은 이력·복구 자료이며 생성 참조로 사용하지 않는다.
 
-## 4. 앵커 하드 게이트와 선택
+## 4. 앵커 하드 게이트와 호출 위임
 
 - 최종 영어 프롬프트를 공개하기 전에 사용할 정식 앵커의 실제 픽셀을 확인한다.
 - 파일명·메타데이터·이전 세션 기억만으로 확인을 대체하지 않는다.
-- 한 생성에 사용하는 스타일 앵커는 최대 2장이다.
-- 흉상·얼굴 중심: `01. 핵심 얼굴 앵커.png` + `03. 마감 앵커.png`
-- 전신·인체 중심: `02. 중립 전신 앵커.png` + `03. 마감 앵커.png`
-- 사용자 제공 이미지의 스타일 변환: 사용자 이미지를 디자인 기준으로 두고, 구도가 얼굴 중심이면 `01`, 전신 중심이면 `02` 한 장만 스타일 기준으로 사용한다.
-- 도구의 전체 이미지 참조 수 제한이 더 낮으면 사용자 제공 디자인 기준을 먼저 유지한다.
+- 산출물 구도별 앵커 선택과 도구 전체 이미지 참조 한도에 따른 축소는 `정식 스타일 호출 규칙.md`의 스타일별 선언과 참조 예산 우선순위를 따른다.
+- 제공 이미지 그림체 보존은 정식 앵커를 자동 적용하지 않으며, 명시적인 스타일 변환에서는 제공 이미지를 디자인 기준으로 우선한다.
 
-요구사항 확인서와 최종 영어 프롬프트 검토에는 실제 사용할 앵커의 전체 파일명을 기록한다.
+요구사항 확인서와 최종 영어 프롬프트 검토에는 전체 활성 앵커, 실제 사용할 앵커, 제외한 앵커와 사유를 기록한다.
 
 ## 5. 스타일 전용 참조 제한
 
 스타일 앵커의 인물·의상·팔레트·포즈·카메라·배경·구성은 참조하지 않는다.
 
 앵커에서 참조할 수 있는 것은 다음뿐이다.
 
 - 애니형 얼굴과 인체의 그림체
 - 선의 섬세함과 경계 처리
 - 형태 단순화 수준
@@ -91,17 +88,17 @@ Preserve the established anime facial construction, line hierarchy, and stylized
 - 포토리얼 사진, 현실적인 패션 사진, 서구권 리얼리즘 컨셉 아트 얼굴
 - AAA 3D CGI 렌더, 플라스틱 피부와 머리카락
 - 치비·SD 체형, 평면 셀 셰이딩, 웹툰식 단순 채색
 - 모든 인물이 동일 얼굴로 수렴하는 현상
 - 앵커의 의상·금장·팔레트·배경·마법 효과 복제
 
 ## 9. 프롬프트 조립 순서
 
 1. 기능 규격과 사용자 요구에서 가변 내용을 정리한다.
 2. 사용자 제공 이미지가 있으면 디자인 보존 항목과 그림체 보존·변경 여부를 분리한다.
-3. 구도에 맞는 정식 앵커를 최대 2장 선택하고 실제 픽셀을 확인한다.
+3. `정식 스타일 호출 규칙.md`가 반환한 정식 앵커를 실제 픽셀로 확인한다.
 4. 대상·디자인·행동·포즈·카메라·배경·출력 규격을 작성한다.
 5. 고정 영어 그림체 블록을 그대로 삽입한다.
 6. 공통 고정 영어 마감 블록을 그대로 삽입한다.
 7. 앵커 콘텐츠 복제와 금지 화풍 유도 표현이 없는지 검사한다.
 8. `../../공통/6. 이미지 생성 프롬프트 점검 및 교정 지침.md`의 P01~P10을 검사하고 실패 항목을 교정한다.
 9. 전 항목을 통과한 요구사항 확인서와 최종 영어 프롬프트를 공개하고 승인받은 뒤 생성한다.
```

### 1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\공통 붓터치 마감 규칙.md
```diff
warning: in the working copy of 'G:\내 드라이브\TRPG 데이터\.superpowers\sdd\2026-09-06-image-style-anchor-resolver\task-1-before\1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\공통 붓터치 마감 규칙.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'G:\내 드라이브\TRPG 데이터\1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\공통 붓터치 마감 규칙.md', LF will be replaced by CRLF the next time Git touches it
diff --git "a/G:\\내 드라이브\\TRPG 데이터\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\task-1-before\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\공통 붓터치 마감 규칙.md" "b/G:\\내 드라이브\\TRPG 데이터\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\공통 붓터치 마감 규칙.md"
index df5df52..75610ac 100644
--- "a/G:\\내 드라이브\\TRPG 데이터\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\task-1-before\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\공통 붓터치 마감 규칙.md"	
+++ "b/G:\\내 드라이브\\TRPG 데이터\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\공통 붓터치 마감 규칙.md"	
@@ -1,40 +1,39 @@
 # 공통 붓터치 마감 규칙
 
 ## 1. 목적
 
-이 문서는 `애니 페인팅`과 `붓터치 반실사`가 공통으로 사용하는 디지털 페인팅 마감의 단일 정본이다.
-
-그림체는 각 스타일 계약이 결정한다. 이 문서는 그림체를 바꾸지 않고 채색층, 붓터치, 경계, 명암, 하이라이트, 재질 분리와 최종 완성도만 고정한다.
+이 문서는 `애니 페인팅`과 `붓터치 반실사`가 공통으로 사용하는 디지털 페인팅 마감의 단일 정본이다. 그림체는 각 스타일 계약이 결정하며, 이 문서는 그림체를 바꾸지 않고 채색층, 붓터치, 경계, 명암, 하이라이트, 재질 분리와 최종 완성도만 고정한다.
 
 ## 2. 고정 영어 마감 블록
 
 선택 스타일을 적용하는 최종 영어 프롬프트에는 아래 블록을 문장 변경 없이 그대로 넣는다.
 
 ```text
-Apply the locked refined painterly digital illustration finish:
-opaque layered digital color,
-controlled painterly brushwork that follows form and material,
-softly blended but clearly defined forms,
-selectively crisp focal edges,
-subtle visible brush texture,
+Apply the locked low-water painterly digital illustration finish:
+clear and stable local colors,
+opaque and semi-opaque layered digital paint,
+controlled watercolor-and-gouache influence with restrained wateriness,
+directional brushwork that follows form and material,
+softly blended planes with selectively crisp focal edges,
+subtle dry-brush and scumbled surface texture,
 dimensional illustrated shading,
 restrained highlights,
 clear material separation,
-and a polished high-end digital painting finish.
+and a cohesive high-end hand-painted finish.
 
-Do not use watercolor washes, wet pigment blooms, translucent watercolor layering, visible paper grain, rough impasto, plastic CGI surfaces, or a uniform texture filter.
+Keep the color shapes decisive and sufficiently saturated. Do not use diluted transparent washes, wet pigment blooms, puddled edges, washed-out haze, photographic skin texture, plastic CGI gloss, rough impasto, or a uniform texture overlay.
 ```
 
 ## 3. 적용 규칙
 
-- 고정 마감 블록은 선택 스타일의 고정 영어 그림체 블록 바로 뒤에 배치한다.
+- 고정 마감 블록은 선택 스타일의 고정 영어 그림체 블록 바로 뒤에 한 번만 배치한다.
 - 기능 프롬프트가 마감 문장을 임의로 요약·확장·교체하지 않는다.
 - 붓터치는 얼굴·피부·머리카락·천·가죽·금속·목재 등 각 형태와 재질의 방향을 따라야 한다.
 - 얼굴과 주요 식별 요소는 선명한 경계를 유지하고, 비초점 영역만 선택적으로 부드럽게 처리한다.
 - 마감은 캐릭터 디자인·의상·장식·색상·포즈·카메라·배경을 추가하거나 바꾸는 근거가 아니다.
 - 조립한 최종 영어 프롬프트는 공개 전에 `../../공통/6. 이미지 생성 프롬프트 점검 및 교정 지침.md`에서 이 고정 블록의 원문·순서·중복·충돌 여부를 검사한다.
 
 ## 4. 원본 그림체 보존 예외
 
 캐릭터 레퍼런스 V1·V2와 세션 하이라이트처럼 제공 이미지의 그림체를 기본 보존하는 작업은 사용자가 별도 스타일 변경을 명시하지 않은 경우 이 고정 블록을 자동 삽입하지 않는다. 원본 이미지의 그림체와 마감 자체를 기준으로 사용한다.
 
```

### 1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\정식 스타일 호출 규칙.md
```diff
warning: in the working copy of 'G:\내 드라이브\TRPG 데이터\1. 프롬프트\1. 이미지 생성 모듈\라이브러리\스타일\정식 스타일 호출 규칙.md', LF will be replaced by CRLF the next time Git touches it
diff --git "a/G:\\내 드라이브\\TRPG 데이터\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\empty.md" "b/G:\\내 드라이브\\TRPG 데이터\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\정식 스타일 호출 규칙.md"
index e69de29..94a5a84 100644
--- "a/G:\\내 드라이브\\TRPG 데이터\\.superpowers\\sdd\\2026-09-06-image-style-anchor-resolver\\empty.md"	
+++ "b/G:\\내 드라이브\\TRPG 데이터\\1. 프롬프트\\1. 이미지 생성 모듈\\라이브러리\\스타일\\정식 스타일 호출 규칙.md"	
@@ -0,0 +1,89 @@
+# 정식 스타일 호출 규칙
+
+## 목적과 적용 범위
+
+이 문서는 이미지 생성 모듈 내부 1~8번 기능이 그림체 적용 방식을 하나로 판정하고, 선택한 정식 스타일의 활성 앵커와 참조 예산을 일관되게 호출하는 단일 정본이다. 기능 문서는 이 문서가 반환한 앵커 조합을 사용하며, 앵커 파일명·조합·참조 예산을 자체 정본으로 다시 정하지 않는다.
+
+## 입력 계약
+
+- 그림체 적용 방식
+- 선택 정식 스타일
+- 대상 유형
+- 주 프레이밍
+- 디자인 기준 이미지 수
+- 도구 전체 이미지 참조 한도
+
+## 출력 계약
+
+- 스타일별 전체 활성 앵커
+- 실제 사용할 앵커
+- 제외한 앵커와 제외 사유
+- 고정 영어 그림체 블록 적용 여부
+- 공통 고정 영어 마감 블록 적용 여부
+
+## 그림체 적용 방식
+
+생성 프롬프트를 조립하기 전에 아래 셋 중 하나만 선택한다. 둘 이상의 방식을 혼합하지 않는다.
+
+1. 제공 이미지 그림체 보존
+2. 정식 스타일 적용
+3. 사용자 지정 스타일·기능성 예외
+
+캐릭터 레퍼런스 V1·V2와 세션 하이라이트는 제공 이미지가 있고 별도 스타일 변경 지시가 없으면 `제공 이미지 그림체 보존`을 선택한다. 이 방식에서는 정식 스타일 앵커, 고정 영어 그림체 블록, 공통 고정 영어 마감 블록을 자동으로 삽입하지 않는다.
+
+`정식 스타일 적용`에서는 선택 스타일의 활성 앵커 실제 픽셀을 확인하고, 선택 스타일의 고정 영어 그림체 블록 바로 뒤에 공통 고정 영어 마감 블록을 한 번만 원문 그대로 삽입한다. 마감 앵커를 참조 예산 때문에 제외할 수 없으며, 로딩 완료·파일명·메타데이터·이전 기억으로 실제 픽셀 확인을 대체하지 않는다.
+
+`사용자 지정 스타일·기능성 예외`에서는 사용자 명시 스타일 또는 기능 계약을 우선한다. true top-down 배틀맵·게임 아이콘·양피지 지도는 기능 전용 스타일과 판독성 계약을 우선하며 인물 앵커를 자동 적용하지 않는다. 완성형 VTT 토큰은 확정 기준 이미지의 그림체를 보존하고 캐릭터 재렌더링용 앵커를 적용하지 않는다.
+
+## 스타일별 전체 활성 앵커
+
+### 붓터치 반실사
+
+정본 경로: `../견본/붓터치 반실사/`
+
+- `01. 핵심 얼굴 앵커.png` — 얼굴 그림체: 얼굴 평면 단순화, 눈·코·입 설계, 머리카락 덩어리, 비사진적 얼굴 조형
+- `02. 나이 표현 앵커.png` — 연령 표현: 두개골 대비 얼굴 비율, 하안부 길이, 목·어깨, 연령별 인상과 노화 표현
+- `03. 전신 앵커.png` — 전신 비례: 머리 대비 신장, 몸통·팔다리 비율, 연령별 체형, 전신 실루엣
+- `04. 마감 앵커.png` — 최종 마감: 저수분 수채·과슈 계열 채색, 명암, 경계, 붓터치, 재질 분리와 표면 처리
+
+### 애니 페인팅
+
+정본 경로: `../견본/애니 페인팅/`
+
+- `01. 핵심 얼굴 앵커.png` — 애니형 얼굴 구조, 눈·코·입 단순화, 선 처리, 머리카락과 얼굴 채색의 기준
+- `02. 중립 전신 앵커.png` — 아동·청소년·성인의 연령별 체형 차이, 애니형 전신 비례, 손·팔다리 안정성, 실루엣의 기준
+- `03. 마감 앵커.png` — 완성 일러스트의 채색층·명암·경계·붓터치·재질 표현·최종 표면 처리 기준
+
+애니 페인팅은 현재 세 앵커 체계를 유지하며, 이번 계약으로 네 앵커 체계로 변환하지 않는다.
+
+## 붓터치 반실사 기본 조합
+
+- 얼굴·흉상: 01 + 02 + 04
+- 반신·전신: 01 + 02 + 03 + 04
+- 비인물 풍경: 명시적 적용일 때 04만 사용
+
+제공 이미지를 정식 스타일로 변환하거나 캐릭터 중심 세션 하이라이트를 만들 때에는 디자인 기준 이미지를 우선하고, 남은 참조 범위 안에서 주 프레이밍에 맞는 위 조합을 적용한다. 풍경에서는 얼굴·나이·전신 앵커를 적용하지 않는다.
+
+## 참조 예산 우선순위
+
+1. 디자인 기준 이미지
+2. 마감 앵커
+3. 주 구도 앵커
+4. 나이 표현 앵커
+5. 남은 보조 앵커
+
+도구 전체 이미지 참조 한도 때문에 전체 활성 앵커를 모두 사용할 수 없으면 위 순서로 자리를 배정한다. 주 구도 앵커는 얼굴 중심일 때 핵심 얼굴 앵커, 전신 중심일 때 전신 앵커다. 연령 오차 위험이 있는 인물은 나이 표현 앵커를 우선한다. 축소하면 요구사항 확인서에 실제 사용할 앵커, 제외한 앵커, 각 제외 사유를 기록한다.
+
+## 제공 이미지 보존과 기능성 예외
+
+제공 이미지 그림체 보존은 제공 이미지의 디자인과 그림체를 함께 기준으로 삼는다. 사용자가 정식 스타일 변환을 명시한 경우에만 제공 이미지를 디자인 기준으로 유지하고 선택 정식 스타일을 적용한다.
+
+반실사 포트레이트의 신규 전신·흉상은 정식 스타일 호출을 사용한다. 캐릭터 레퍼런스 V1·V2와 세션 하이라이트의 신규 생성 또는 명시적 스타일 변환은 중앙 호출 규칙을 사용한다. 풍경은 명시적 요청일 때 마감 앵커만 적용할 수 있다. 배틀맵·게임 아이콘·월드 지도는 인물 앵커 자동 적용 금지의 기능성 예외다.
+
+## 앵커 콘텐츠 복제 금지
+
+모든 정식 스타일 앵커는 스타일 역할만 소유한다. 앵커의 인물 정체성·성별·종족·얼굴 생김새·헤어스타일·의상·색상·포즈·표정·카메라·배경·장면 구성은 참조하거나 복제하지 않는다. 제공 이미지가 있는 경우에도 앵커는 그림체와 역할만 담당하고, 제공 이미지는 정체성과 디자인 기준을 담당한다.
+
+## 요구사항 확인서 기록
+
+정식 스타일을 적용하는 요구사항 확인서에는 그림체 적용 방식, 선택 정식 스타일, 디자인 기준 이미지, 산출물 구도 분류, 스타일별 전체 활성 앵커, 실제 사용할 앵커, 참조 예산 때문에 제외한 앵커와 사유, 앵커 실제 픽셀 확인 여부, 두 고정 영어 블록 원문 적용 여부를 기록한다.
```
