# 이미지 스타일 앵커 호출 체계 정비 설계

## 목적

마스터가 확정한 붓터치 반실사 앵커 4장의 역할을 활성 스타일 계약에 반영하고, 이미지 생성 모듈 내부 1~8번 기능이 제공 이미지 보존·정식 스타일 적용·기능성 예외를 같은 기준으로 판정하도록 중앙 호출 체계를 만든다.

이 설계는 기존 `2026-09-06-image-style-anchor-system` 작업을 폐기하지 않는다. 기존 작업에서 확정한 두 정식 스타일, 제공 이미지 그림체 보존, 스타일 앵커 콘텐츠 복제 금지 원칙을 유지하면서 붓터치 반실사의 앵커 역할과 호출 구조를 후속 개편한다.

## 문제 정의

현재 활성 문서는 붓터치 반실사와 애니 페인팅을 모두 `핵심 얼굴·중립 전신·마감` 3앵커 체계로 설명한다. 여러 문서가 흉상은 `01 + 03`, 전신은 `02 + 03`, 한 생성의 스타일 앵커는 최대 2장이라고 직접 고정한다.

마스터가 새로 확정한 붓터치 반실사는 다음 4개 역할을 분리한다.

1. 핵심 얼굴
2. 나이 표현
3. 전신 비례
4. 마감

따라서 파일만 교체하면 `02. 나이 표현 앵커.png`, `03. 전신 앵커.png`, `04. 마감 앵커.png`가 기존 호출 규칙과 충돌한다. 기능 문서마다 조합을 다시 복제하면 이후 앵커 개편 시 같은 불일치가 재발한다.

## 확정 설계

### 1. 중앙 정식 스타일 호출 규칙

`라이브러리/스타일/정식 스타일 호출 규칙.md`를 신설하여 다음 내용을 단일 정본으로 소유한다.

- 그림체 적용 방식 판정
- 스타일별 활성 앵커 역할과 파일명
- 산출물 구도별 기본 앵커 조합
- 사용자 제공 이미지가 있을 때의 참조 우선순위
- 전체 이미지 참조 수가 제한될 때의 축소 규칙
- 인물 중심 기능과 비인물 기능의 적용 경계
- 요구사항 확인서에 공개할 스타일 호출 기록

각 기능 문서는 앵커 파일명과 조합을 직접 소유하지 않는다. 선택한 그림체 적용 방식과 산출물 유형을 중앙 호출 규칙에 전달하고 반환된 앵커 조합을 사용한다.

### 2. 그림체 적용 방식

모든 이미지 기능은 생성 프롬프트를 조립하기 전에 다음 셋 중 하나만 선택한다.

1. `제공 이미지 그림체 보존`
2. `정식 스타일 적용`
3. `사용자 지정 스타일·기능성 예외`

둘 이상의 방식을 혼합하지 않는다. 사용자 제공 이미지가 있는 캐릭터 레퍼런스 V1·V2와 세션 하이라이트는 별도 스타일 변경 지시가 없으면 `제공 이미지 그림체 보존`을 사용한다.

### 3. 붓터치 반실사 활성 앵커

정본 경로는 `라이브러리/견본/붓터치 반실사/`다.

| 파일 | 소유 역할 | 참조 가능 범위 |
| --- | --- | --- |
| `01. 핵심 얼굴 앵커.png` | 얼굴 그림체 | 얼굴 평면 단순화, 눈·코·입 설계, 머리카락 덩어리, 비사진적 얼굴 조형 |
| `02. 나이 표현 앵커.png` | 연령 표현 | 두개골 대비 얼굴 비율, 하안부 길이, 목·어깨, 연령별 인상과 노화 표현 |
| `03. 전신 앵커.png` | 전신 비례 | 머리 대비 신장, 몸통·팔다리 비율, 연령별 체형, 전신 실루엣 |
| `04. 마감 앵커.png` | 최종 마감 | 저수분 수채·과슈 계열 채색, 명암, 경계, 붓터치, 재질 분리와 표면 처리 |

네 앵커 모두 스타일 역할만 소유한다. 앵커에 등장한 인물의 정체성·성별·종족·얼굴 생김새·헤어스타일·의상·색상·포즈·표정·카메라·배경·장면 구성은 참조하지 않는다.

### 4. 교정 마감 앵커 승격

- 승인 원본: `라이브러리/견본/붓터치 반실사/후보/JRPG 양식화/04. 마감 앵커 교정본.png`
- 활성 목적지: `라이브러리/견본/붓터치 반실사/04. 마감 앵커.png`
- 기존 후보 `라이브러리/견본/붓터치 반실사/후보/JRPG 양식화/04. 마감 앵커.png`는 삭제하지 않고 `라이브러리/견본/보관/붓터치 반실사 재구축 후보/04. 마감 앵커.png`로 이동한다.
- 정식 파일명에는 `교정본`, 시안명 또는 파일명 끝의 버전 번호를 남기지 않는다.
- 이동 전후 파일 수와 SHA-256을 확인한다.

### 5. 산출물별 기본 조합

| 산출물 | 기본 스타일 앵커 |
| --- | --- |
| 신규 인물 얼굴·흉상 | `01 + 02 + 04` |
| 신규 인물 반신·전신 | `01 + 02 + 03 + 04` |
| 제공 이미지 그림체 보존 | 정식 스타일 앵커 미적용 |
| 제공 이미지의 정식 스타일 변환 | 디자인 기준 이미지를 우선하고 남은 참조 범위에 해당 구도 조합 적용 |
| 캐릭터 중심 세션 하이라이트 | 디자인 기준 이미지를 우선하고 주 프레이밍에 맞는 인물 앵커 적용 |
| 비인물 풍경 | 명시적으로 붓터치 마감을 적용할 때 `04`만 사용 |
| true top-down 배틀맵·게임 아이콘·양피지 지도 | 기능 전용 스타일 우선, 인물 앵커 자동 적용 금지 |
| 완성형 VTT 토큰 | 확정 기준 이미지의 그림체 보존, 캐릭터 재렌더링용 앵커 미적용 |

애니 페인팅의 현재 3앵커 체계는 이번 작업에서 4앵커로 강제 변환하지 않는다. 중앙 호출 규칙은 스타일마다 서로 다른 앵커 역할과 수량을 선언할 수 있어야 한다.

### 6. 참조 예산 축소 규칙

도구의 전체 이미지 참조 수 때문에 모든 디자인 이미지와 스타일 앵커를 함께 사용할 수 없으면 다음 순서로 참조 자리를 배정한다.

1. 사용자 제공·프로젝트 공식 디자인 기준 이미지
2. 선택 스타일의 마감 앵커
3. 주 구도 앵커: 얼굴 중심은 핵심 얼굴, 전신 중심은 전신
4. 연령 오차 위험이 있는 인물의 나이 표현 앵커
5. 남은 보조 스타일 앵커

축소한 경우 요구사항 확인서에 사용한 앵커와 제외된 앵커, 제외 사유를 기록한다. 정식 스타일을 적용하면서 마감 앵커를 누락하거나, 실제 픽셀 확인 없이 로딩 완료로 처리하지 않는다.

### 7. 기능별 적용 경계

| 내부 기능 | 스타일 호출 방식 |
| --- | --- |
| 1. 반실사 포트레이트 | 신규 전신·흉상은 정식 스타일 호출. 완성형 토큰은 기준 이미지 보존 |
| 2. 배틀맵 생성 | true top-down 기능 계약 우선. 인물 앵커 자동 적용 금지 |
| 3. 캐릭터 레퍼런스 생성 | 제공 이미지 보존이 기본. 신규 또는 명시적 변환에서 중앙 호출 규칙 적용 |
| 4. 세션 하이라이트 이미지 생성 | 제공 이미지 보존이 기본. 명시적 변환에서 디자인 기준을 우선하고 주 프레이밍별 호출 |
| 5. 캐릭터 레퍼런스 V2 생성 | 제공 이미지 보존이 기본. 명시적 변환에서 패널 소스의 얼굴·전신 구도별 호출 |
| 6. 풍경 생성 | 인물 얼굴·나이·전신 앵커 제외. 명시적 요청 때 마감 앵커만 적용 가능 |
| 7. 게임 아이콘 생성 | 64×64 판독성과 기능 스타일 우선. 인물 앵커 자동 적용 금지 |
| 8. 월드 지도 생성 | 양피지·라벨링 계약 우선. 인물 앵커 자동 적용 금지 |

### 8. 붓터치 반실사 고정 영어 그림체 블록

`붓터치 반실사.md`가 다음 블록을 원문 정본으로 소유한다.

```text
Apply the locked illustration-forward Stylized JRPG Painterly Semi-Realistic drawing language:
a distinctly designed two-dimensional character illustration built on believable underlying anatomy rather than photographic likeness,
idealized but age-appropriate facial construction,
selectively simplified facial and body planes,
clean intentional jaw, cheek, nose, and mouth shapes,
expressive but restrained eyes kept within plausible proportions,
graphic grouped hair masses with selective strand accents,
controlled shape hierarchy,
minimal dependence on contour lines,
sculpted yet non-photographic volume,
and elegant fantasy character-design proportions.

Translate the specified age through the cranial-to-face ratio, lower-face length, neck and shoulder breadth, torso length, limb proportions, musculature, and overall head-to-body scale. Preserve clear age separation without turning children into miniature adults or adults into youthful anime figures.

The result must remain unmistakably illustrative: more designed and selectively simplified than a realistic portrait, yet more structurally grounded than anime. Do not use anime or manga facial construction, photographic or hyperreal skin, live-action portrait realism, game screenshot rendering, or three-dimensional CGI surfaces.
```

### 9. 공통 고정 영어 마감 블록

`공통 붓터치 마감 규칙.md`가 다음 블록을 원문 정본으로 소유한다. 애니 페인팅과 붓터치 반실사 모두 이 저수분 마감 계약을 공유하되, 그림체는 각 스타일 계약이 결정한다.

```text
Apply the locked low-water painterly digital illustration finish:
clear and stable local colors,
opaque and semi-opaque layered digital paint,
controlled watercolor-and-gouache influence with restrained wateriness,
directional brushwork that follows form and material,
softly blended planes with selectively crisp focal edges,
subtle dry-brush and scumbled surface texture,
dimensional illustrated shading,
restrained highlights,
clear material separation,
and a cohesive high-end hand-painted finish.

Keep the color shapes decisive and sufficiently saturated. Do not use diluted transparent washes, wet pigment blooms, puddled edges, washed-out haze, photographic skin texture, plastic CGI gloss, rough impasto, or a uniform texture overlay.
```

고정 마감 블록은 정식 스타일의 고정 그림체 블록 바로 뒤에 한 번만 삽입한다. 기능 프롬프트는 두 고정 블록을 요약·재작성·중복하지 않는다.

### 10. 요구사항 확인서와 점검 게이트

정식 스타일을 적용하는 요구사항 확인서에는 다음 정보를 공개한다.

- 그림체 적용 방식
- 선택 정식 스타일
- 디자인 기준 이미지
- 산출물 구도 분류
- 스타일별 전체 활성 앵커
- 실제 사용할 앵커
- 참조 예산 때문에 제외한 앵커와 사유
- 앵커 실제 픽셀 확인 여부
- 고정 영어 그림체 블록 원문 적용 여부
- 공통 고정 영어 마감 블록 원문 적용 여부
- 프롬프트 점검 결과

공통 프롬프트 점검 지침은 고정된 `01 + 03`, `02 + 03`, 최대 2장 조건을 검사하지 않는다. 대신 중앙 호출 규칙과 선택 스타일 계약에서 산출물별 예상 조합을 읽어 실제 조합을 검증한다.

## 변경 대상

### 신규 문서

- `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/스타일/정식 스타일 호출 규칙.md`

### 직접 수정

- `AGENTS.md`
- `1. 프롬프트/1. 이미지 생성 모듈/AGENTS.md`
- `1. 프롬프트/1. 이미지 생성 모듈/README.md`
- `1. 프롬프트/1. 이미지 생성 모듈/0. 이미지 생성 모듈 마스터 프롬프트.md`
- `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/스타일/붓터치 반실사.md`
- `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/스타일/공통 붓터치 마감 규칙.md`
- `1. 프롬프트/1. 이미지 생성 모듈/공통/1. 이미지 생성 공통 승인 절차.md`
- `1. 프롬프트/1. 이미지 생성 모듈/공통/2. 요구사항 확인서 작성 규칙.md`
- `1. 프롬프트/1. 이미지 생성 모듈/공통/6. 이미지 생성 프롬프트 점검 및 교정 지침.md`
- 내부 1·3·4·5번의 앵커 조합 직접 참조 문서
- 내부 2·6·7·8번의 스타일 적용 경계 문서

정확한 수정 파일 목록은 실행 계획 작성 전에 활성 Markdown 전체에서 구 조합과 스타일 호출 표현을 다시 검색하여 확정한다.

## 구현 순서

1. 교정된 04번 앵커와 기존 후보의 해시·목적지를 확인한다.
2. 중앙 정식 스타일 호출 규칙을 작성한다.
3. 붓터치 반실사와 공통 마감 고정 영어 블록을 교체한다.
4. 모듈 루트와 공통 승인·점검 문서를 중앙 호출 방식으로 전환한다.
5. 내부 1·3·4·5번의 구 앵커 조합을 제거하고 중앙 호출 규칙을 연결한다.
6. 내부 2·6·7·8번에 비인물·기능성 예외 경계를 명확히 연결한다.
7. 교정 마감 앵커를 정식 경로로 승격하고 기존 후보를 보관한다.
8. 전역 지침과 작업 추적 문서를 동기화한다.
9. 정적 검색·파일 구조·SHA-256·Markdown 구조를 검증한다.

## 검증 기준

- 붓터치 반실사 활성 앵커가 `01·02·03·04` 정확히 4장이다.
- 승인된 교정본과 활성 `04. 마감 앵커.png`의 SHA-256이 일치한다.
- 기존 후보 04번이 보관 경로에 존재하고 활성 입력으로 사용되지 않는다.
- 활성 문서에 붓터치 반실사를 3앵커로 설명하는 문장이 남지 않는다.
- 활성 문서에 붓터치 반실사의 `02. 중립 전신 앵커.png`, `03. 마감 앵커.png` 참조가 남지 않는다.
- 기능 문서가 붓터치 반실사의 앵커 조합을 자체 정본처럼 중복 소유하지 않는다.
- 내부 1~8번이 중앙 스타일 판정 또는 명시적 기능성 예외 중 하나에 연결된다.
- 제공 이미지 보존 경로에서는 정식 스타일 블록과 앵커가 자동 삽입되지 않는다.
- 정식 스타일 적용 경로에서는 실제 픽셀 확인, 고정 영어 그림체 블록, 공통 고정 영어 마감 블록이 모두 필수다.
- 구 공통 마감 블록과 새 공통 마감 블록이 동시에 활성 문서에 남지 않는다.
- Markdown 코드 펜스와 상대 문서 참조가 유효하다.

## 범위 제외

- 애니 페인팅 앵커를 4장으로 재구성하는 작업
- 이미지 생성 도구 자체의 동작 변경
- 캐릭터·의상·포즈·카메라·배경 기본값 고정
- 기존 확정 이미지의 재생성
- 배틀맵·아이콘·월드 지도 전용 화풍 재설계
