### Task 4: Lock Functional-Image Exceptions and Synchronize Global Routers

**Files:**
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/2. 배틀맵 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/2. 배틀맵 생성/0. 배틀맵 생성 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/6. 풍경 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/6. 풍경 생성/0. 풍경 생성 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/7. 게임 아이콘 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/7. 게임 아이콘 생성/0. 게임 아이콘 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/8. 월드 지도 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/8. 월드 지도 생성/0. 월드 지도 마스터 프롬프트.md`
- Modify: `AGENTS.md`
- Modify: `1. 프롬프트/AGENTS.md`
- Modify: `1. 프롬프트/00. TRPG 세션 매니저 프로젝트 기본 지침.md`
- Modify: `1. 프롬프트/0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md`

**Interfaces:**
- Consumes: central resolver's functional-image exception result
- Produces: unambiguous non-character behavior at every direct and global entry point

- [ ] **Step 1: Lock Battlemap, Icon, and World Map exceptions**

Use `apply_patch` to make each function's AGENTS and master state:

```text
- 그림체 적용 방식은 사용자 지정 스타일·기능성 예외다.
- 정식 인물 스타일의 얼굴·나이·전신 앵커를 자동으로 불러오지 않는다.
- 기능 전용 판독성·시점·레이아웃 계약이 우선한다.
- 사용자가 별도 표면 마감을 요청하면 기능 계약과 충돌하지 않는 범위만 요구사항 확인서에 공개한다.
```

Retain true top-down, 64×64 readability, and colorful parchment-map requirements unchanged.

- [ ] **Step 2: Define Landscape's finish-only path**

Use `apply_patch` so Landscape remains a functional/environment image mode. If the user explicitly asks for the formal painterly finish, load only the selected style's finish anchor and shared finish block; do not load face, age, or body anchors and do not insert a character drawing block into an environment-only prompt.

- [ ] **Step 3: Synchronize the four global entry documents**

Use `apply_patch` to replace the root `3장` statement with this exact policy:

```text
정식 스타일은 스타일별 활성 앵커 구성이 서로 다를 수 있으며, 붓터치 반실사는 핵심 얼굴·나이 표현·전신·마감 4장, 애니 페인팅은 현재 핵심 얼굴·중립 전신·마감 3장을 사용한다. 실제 조합과 참조 예산 축소는 이미지 모듈의 정식 스타일 호출 규칙을 따른다.
```

Add the central resolver to the image-routing explanations in `1. 프롬프트/AGENTS.md`, the basic guidance, and the integrated master without copying the full per-framing table into those global documents.

- [ ] **Step 4: Verify Task 4's independently testable result**

Run:

```powershell
$functionalRoots = @(
  '1. 프롬프트\1. 이미지 생성 모듈\2. 배틀맵 생성',
  '1. 프롬프트\1. 이미지 생성 모듈\6. 풍경 생성',
  '1. 프롬프트\1. 이미지 생성 모듈\7. 게임 아이콘 생성',
  '1. 프롬프트\1. 이미지 생성 모듈\8. 월드 지도 생성'
)
$globalDocs = @(
  'AGENTS.md',
  '1. 프롬프트\AGENTS.md',
  '1. 프롬프트\00. TRPG 세션 매니저 프로젝트 기본 지침.md',
  '1. 프롬프트\0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md'
)

rg -n '기능성 예외|인물 스타일.*자동|얼굴·나이·전신 앵커|마감 앵커' $functionalRoots
rg -n '정식 스타일 호출 규칙|붓터치 반실사.*4장|애니 페인팅.*3장' $globalDocs
```

Expected: functional exception evidence exists for all four functions, and all global documents route to the central resolver without reverting to one shared anchor count.
