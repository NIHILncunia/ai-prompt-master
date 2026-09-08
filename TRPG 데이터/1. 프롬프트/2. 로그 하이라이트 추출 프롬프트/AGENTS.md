# 2번 로그 하이라이트 추출 기능 지침

## 폴더 정체성

- 현재 폴더: `TRPG 데이터/1. 프롬프트/2. 로그 하이라이트 추출 프롬프트`
- 폴더 ID: `14VEUKXgQ5Ek6B9on9Hd7pw1h3LP70EpD`
- 상위 프롬프트 루트 ID: `1PDa8TO0BdKrPaNWTfImJTcYoYY3gpj8N`
- 상위 TRPG 데이터 루트 ID: `15dR_0fhsY5RwmsJkr18FERKLMvqjTJaH`
- 기능 진입점: `0. 로그 하이라이트 추출 마스터 프롬프트.md`

## 역할

원본 로그에서 하이라이트를 독립 추출하거나, 3. 로그 분석 프롬프트의 `Hxx/Pxx`를 따라 이미지 제작용 Highlight Card 또는 Scene Beat Data로 정밀화한다.

## 필수 읽기 순서

1. 상위 `../AGENTS.md`
2. 상위 `../00. TRPG 세션 매니저 프로젝트 기본 지침.md`
3. 상위 `../0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`
4. `0. 로그 하이라이트 추출 마스터 프롬프트.md`
5. `1. 로그 하이라이트 추출 지침서.md`

요청과 무관한 예시·라이브러리·데이터 폴더는 무조건 전부 읽지 않는다. 마스터가 지정하거나 현재 작업에 필요한 자료만 추가로 확인한다.

## 기능 경계와 연동

- 원본 로그는 TRPG 데이터/2. 로그에서 찾는다.
- 장기 정보흐름분석은 3. 로그 분석 프롬프트, 최종 이미지는 1번 이미지 생성 모듈 내부 4번 세션 하이라이트 이미지 생성이 담당한다.
- 캐릭터 레퍼런스는 1번 이미지 생성 모듈 내부 3번, 장소 시각화와 배틀맵은 1번 이미지 생성 모듈 내부 2번과 연결한다.

## 동기화 원칙

- 이 `AGENTS.md`와 `0. 로그 하이라이트 추출 마스터 프롬프트.md`는 함께 기능 진입점으로 취급한다.
- 폴더 ID·경로·진입점·읽기 순서·기능 경계·외부 데이터 원천·기본 산출물·파일 정책이 바뀌면 두 문서를 함께 점검한다.
- 세부 실행 절차와 품질 규칙은 마스터와 하위 지침에 둔다. 상위 전역 규칙이나 다른 기능이 소유한 정본을 이 폴더에 복제하지 않는다.
- 전역 라우팅이나 파일 정책이 바뀌면 TRPG 데이터 루트·프롬프트 루트 `AGENTS.md`, 프로젝트 기본 지침, 통합 마스터를 함께 갱신한다.
- 새 하위 문서가 진입점·필수 로드 파일·정본 데이터 원천이 되면 이 문서와 마스터의 파일 목록 및 읽기 순서를 함께 수정한다.

## 파일 작업 원칙

- Google Drive에 파일을 직접 생성·업로드·덮어쓰기·삭제·이름 변경하지 않는다.
- 수정본은 실제 적용 경로와 원래 파일명을 유지한 로컬 파일 또는 ZIP으로 제공한다.
- 기존 문서를 교체할 때에는 ZIP 내부 경로에 따라 덮어쓰고, 삭제가 필요한 파일은 별도 목록으로 명시한다.

## 분석 연계 정밀화 데이터 모델

## 독립 추출 모드와 분석 연계 정밀화 모드

2번 기능은 다음 두 모드를 지원한다.

### 독립 추출 모드

- 사용자가 로그 분석 없이 하이라이트만 요구하거나 대상 세션의 3번 분석본이 없을 때 사용한다.
- 원본 로그에서 직접 이미지화 가능한 장면을 선별하고 완전한 Highlight Card / Scene Beat Data를 작성한다.
- 이 경우 `analysis_highlight_id`와 `play_scene_refs`는 비워둘 수 있다.

### 분석 연계 정밀화 모드

- 대상 세션의 3번 정보흐름분석 문서에 `Hxx`와 `Pxx`가 있으면 기본 모드로 우선한다.
- `Hxx`가 이미 하이라이트 선정 책임을 가진다. 2번은 같은 로그 전체에서 후보를 처음부터 다시 선정하지 않는다.
- `Hxx → Pxx`를 따라 해당 실제 플레이 장면의 로그 범위를 다시 확인하고, `Pxx → scene_uuid → map_uuid` 설계 참조를 이어받는다.
- 필요한 포즈·행동·장면 직전/직후 맥락·시각 요소만 원본 로그에서 정밀 검증한다.
- 3번의 해석이 원본 로그와 충돌하면 원본 로그를 우선하고 불일치를 기록한다.

### 식별자 분리

다음 값은 서로 다른 정본이다.

- `analysis_highlight_id`: 3번 로그 분석의 `Hxx`.
- `play_scene_refs`: 3번 로그 분석의 `Pxx` 목록.
- `design_scene_refs[].scene_uuid`: 8번 세션 제작의 영구 설계 장면 UUID.
- `design_map_refs[].map_uuid`: 8번 세션 제작의 영구 설계 맵 UUID.
- `fvtt_scene_id`: 실제 Foundry VTT Scene 또는 Scene Manifest의 식별자.

FVTT Scene 식별자는 항상 `fvtt_scene_id`로 명시하며, 설계 장면의 `scene_uuid`와 혼동하지 않는다.

### 설계 맵 사용 원칙

- 분석 연계 모드에서는 로그의 장소 단어만 보고 설계 맵을 새로 추정하지 않는다.
- 3번 `Pxx`가 확정적으로 설계 장면에 대응했다면 그 장면 파일의 직접 맵 참조와 `map_uuid`를 사용한다.
- `confirmed / none / unavailable / unmapped / uncertain` 상태를 그대로 전달한다.
- FVTT Scene이 없어도 설계 맵이 `confirmed`라면 배경 정본으로 활용할 수 있다.
- 세션 설계가 없거나 맵이 없으면 원본 로그의 환경 단서를 사용하고 부족한 정보는 `missing_context`에 남긴다.

### Highlight Card 연계 필드

Highlight Card의 하이라이트 항목에는 필요하면 다음을 포함한다.

```yaml
analysis_highlight_id:
play_scene_refs: []
design_scene_refs:
  - scene_uuid:
    scene_number:
    scene_title:
    mapping_status:
design_map_refs:
  - map_uuid:
    map_number:
    map_title:
    map_file:
    map_status:
fvtt_scene_id:
fvtt_scene_confidence:
```

독립 추출 모드에서 분석·설계 자료가 없으면 빈 목록 또는 `null`로 둘 수 있다.
