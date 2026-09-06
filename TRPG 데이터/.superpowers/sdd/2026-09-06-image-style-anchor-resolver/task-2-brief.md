### Task 2: Route the Module and Common Approval Gates Through the Resolver

**Files:**
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/README.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/0. 이미지 생성 모듈 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/공통/1. 이미지 생성 공통 승인 절차.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/공통/2. 요구사항 확인서 작성 규칙.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/공통/6. 이미지 생성 프롬프트 점검 및 교정 지침.md`

**Interfaces:**
- Consumes: the resolver output contract from Task 1
- Produces: one module-wide style decision record embedded in every requirements confirmation and enforced by P01–P10

- [ ] **Step 1: Add the resolver to the mandatory read order**

Use `apply_patch` to place `라이브러리/스타일/정식 스타일 호출 규칙.md` before the selected style contract in `AGENTS.md` and the module master. State that filename combinations in feature documents are informative only and cannot override the resolver.

- [ ] **Step 2: Replace the module-level three-anchor assumptions**

Use `apply_patch` to update the module master and README so they state:

```text
- Each formal style declares its own active anchor manifest.
- 붓터치 반실사 uses four roles: core face, age expression, full-body proportion, and finish.
- 애니 페인팅 retains its current three active anchors.
- Anchor combinations and reference-budget reduction come only from 정식 스타일 호출 규칙.md.
```

Remove module-level `3앵커`, global `최대 2장`, and hard-coded `01 + 03` or `02 + 03` combinations.

- [ ] **Step 3: Expand the common requirements-confirmation fields**

Use `apply_patch` in both common confirmation documents so `스타일 통제` contains these exact fields:

```text
- 그림체 적용 방식:
- 선택 정식 스타일:
- 산출물 구도 분류:
- 디자인 기준 이미지:
- 스타일별 전체 활성 앵커:
- 실제 사용할 스타일 앵커:
- 제외한 스타일 앵커와 사유:
- 앵커 실제 픽셀 확인: 완료 / 해당 없음
- 고정 영어 그림체 블록: 원문 적용 / 미적용 사유
- 공통 고정 영어 마감 블록: 원문 적용 / 미적용 사유
- 프롬프트 점검 결과: 통과
- 자동 교정 내역: 없음 / <실제 교정 내용>
```

Do not mark omitted anchors as `해당 없음` when the actual cause is a tool reference limit.

- [ ] **Step 4: Rewrite P04 around resolver output**

Use `apply_patch` in `공통/6. 이미지 생성 프롬프트 점검 및 교정 지침.md` so P04 checks:

1. the selected style's complete active manifest;
2. the output framing classification;
3. the resolver's expected combination;
4. the actual loaded filenames;
5. omitted anchors and their documented reasons;
6. actual pixel inspection;
7. design-reference priority;
8. content/composition exclusion.

Keep P05's verbatim drawing-block gate. Update P06's collision scan to allow controlled low-water watercolor-and-gouache influence while rejecting diluted washes, wet blooms, puddled edges, washed-out haze, rough impasto, plastic CGI, and uniform texture overlays.

- [ ] **Step 5: Verify Task 2's independently testable result**

Run:

```powershell
$moduleRoot = '1. 프롬프트\1. 이미지 생성 모듈'
$commonRoot = Join-Path $moduleRoot '공통'

rg -n '정식 스타일 호출 규칙' "$moduleRoot\AGENTS.md" "$moduleRoot\README.md" "$moduleRoot\0. 이미지 생성 모듈 마스터 프롬프트.md" $commonRoot
rg -n '스타일별 전체 활성 앵커|실제 사용할 스타일 앵커|제외한 스타일 앵커와 사유' "$commonRoot\1. 이미지 생성 공통 승인 절차.md" "$commonRoot\2. 요구사항 확인서 작성 규칙.md" "$commonRoot\6. 이미지 생성 프롬프트 점검 및 교정 지침.md"
rg -n '정식 3앵커|한 생성에 쓰는 스타일 앵커는 최대 2장|01\. 핵심 얼굴 앵커\.png \+ 03\. 마감 앵커\.png|02\. 중립 전신 앵커\.png \+ 03\. 마감 앵커\.png' "$moduleRoot\AGENTS.md" "$moduleRoot\README.md" "$moduleRoot\0. 이미지 생성 모듈 마스터 프롬프트.md" $commonRoot
```

Expected: resolver and expanded audit fields are found; the final command returns no matches.
