### Task 3: Convert Character-Producing Functions to the Central Resolver

**Files:**
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/1. 반실사 포트레이트/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/1. 반실사 포트레이트/README.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/1. 반실사 포트레이트/0. 반실사 포트레이트 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/1. 반실사 포트레이트/1. 반실사 포트레이트 공통 지침.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/3. 캐릭터 레퍼런스 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/3. 캐릭터 레퍼런스 생성/README.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/3. 캐릭터 레퍼런스 생성/0. 캐릭터 레퍼런스 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/4. 세션 하이라이트 이미지 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/4. 세션 하이라이트 이미지 생성/README.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/4. 세션 하이라이트 이미지 생성/0. 세션 하이라이트 마스터 프롬프트.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/5. 캐릭터 레퍼런스 V2 생성/AGENTS.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/5. 캐릭터 레퍼런스 V2 생성/README.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/5. 캐릭터 레퍼런스 V2 생성/0. 캐릭터 레퍼런스 V2 마스터 프롬프트.md`

**Interfaces:**
- Consumes: central resolver input/output contracts and the common requirements fields from Tasks 1–2
- Produces: correct style handling for new portraits, reference sheets, and session scenes without changing their output-layout contracts

- [ ] **Step 1: Update Portrait's direct-entry read order and full-body/bust mapping**

Use `apply_patch` so Portrait reads the resolver before the selected style contract. Replace its hard-coded three-anchor and maximum-two rules with:

```text
- 신규 얼굴·흉상: 붓터치 반실사 선택 시 01 + 02 + 04를 기본 호출한다.
- 신규 반신·전신: 붓터치 반실사 선택 시 01 + 02 + 03 + 04를 기본 호출한다.
- 실제 조합과 참조 예산 축소는 정식 스타일 호출 규칙.md가 결정한다.
- 완성형 VTT 토큰은 기준 이미지의 기존 그림체를 보존하며 캐릭터 스타일 앵커로 다시 그리지 않는다.
```

Keep the `전신 9:16 → 전신 확정 → 흉상 또는 완성형 토큰` contract unchanged.

- [ ] **Step 2: Update Character Reference V1**

Use `apply_patch` so V1 explicitly reads the resolver. Preserve provided-image style by default. For new generation or explicit conversion, classify each source generation as face/bust or full-body and obtain its anchor list from the resolver. Remove direct `핵심 얼굴 + 마감`, `중립 전신 + 마감`, and maximum-two rules.

- [ ] **Step 3: Update Session Highlight**

Use `apply_patch` so Session Highlight:

- preserves all compatible provided character styles when no conversion is requested;
- asks for a single baseline when provided styles conflict;
- uses design references before style anchors during explicit conversion;
- classifies the scene's dominant framing as face-focused or body/action-focused;
- records every omitted anchor when multiple character references consume the tool's reference budget;
- never imports anchor clothing, palette, pose, camera, background, or composition.

- [ ] **Step 4: Update Character Reference V2**

Use `apply_patch` so V2 resolves anchors per source-generation phase:

- face/head source: face/bust resolver path;
- front/side/back body sources: full-body resolver path;
- final sheet assembly: preserve generated source style without adding a conflicting second style pass.

Keep `1916 × 821 px`, panel layout, weapon rules, and the full black data bar unchanged.

- [ ] **Step 5: Verify Task 3's independently testable result**

Run:

```powershell
$characterRoots = @(
  '1. 프롬프트\1. 이미지 생성 모듈\1. 반실사 포트레이트',
  '1. 프롬프트\1. 이미지 생성 모듈\3. 캐릭터 레퍼런스 생성',
  '1. 프롬프트\1. 이미지 생성 모듈\4. 세션 하이라이트 이미지 생성',
  '1. 프롬프트\1. 이미지 생성 모듈\5. 캐릭터 레퍼런스 V2 생성'
)

rg -n '정식 스타일 호출 규칙' $characterRoots
rg -n '제공 이미지.*그림체|그림체.*보존' $characterRoots
rg -n '핵심 얼굴 \+ 마감|중립 전신 \+ 마감|정식 3앵커|스타일 앵커는 최대 2장|정식 앵커를 최대 2장' $characterRoots
```

Expected: every character-producing function has an explicit resolver route and preservation clause; the final command returns no matches in active feature guidance.
