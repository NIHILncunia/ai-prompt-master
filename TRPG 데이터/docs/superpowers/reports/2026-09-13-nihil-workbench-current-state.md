# Nihil Workbench 현재 상태 보고서

## 목적

이 문서는 `nihil-compendium-module`에서 진행 중인 Nihil Workbench 개발의 현재 구현 범위, 검증 결과, 저장 상태와 정확한 재개 지점을 다른 세션에서도 즉시 복구할 수 있도록 기록한다.

## 기준 저장소

- 저장소: `/shared/fvtt/nihil-compendium-module`
- 모듈 ID: `nihil-compendium-module`
- 모듈명: `Nihil Compendium Module`
- 현재 브랜치: `fix/common-monster-cr-names`
- 현재 HEAD: `c90aae6`
- 원격 기본 브랜치: `origin/master` (`dbceeb9`)
- Foundry VTT 기준: `13.351`
- D&D5e 기준: `5.2.4`

## 저장 상태

Workbench 관련 구현은 현재 저장소의 작업 트리에 실제 파일로 존재한다.

주요 파일:

- `docs/workbench/nihil-workbench-concept-v0.md`
- `docs/workbench/nihil-workbench-item-mvp-plan.md`
- `scripts/workbench/item-adapter.mjs`
- `scripts/workbench/workbench-app.mjs`
- `scripts/module.mjs`
- `templates/workbench/item-workbench.hbs`
- `styles/workbench.css`
- `tests/workbench-item-adapter.test.mjs`
- `tests/workbench-module.test.mjs`

스탯블록 임포터 관련 구현도 같은 저장소 작업 트리에 존재한다.

- `scripts/statblock-importer/core.mjs`
- `scripts/statblock-importer/importer.mjs`
- `tests/statblock-importer.test.mjs`
- `docs/statblock-importer/README.md`

Workbench·Importer·현재 Pack 상태는 로컬 체크포인트 `c90aae6`에 커밋되었다. 현재 실행 환경에는 GitHub HTTPS 자격증명이 없어 원격 push는 완료되지 않았다.

## Item Workbench v1 구현 완료 범위

현재 구현 문서와 실제 코드 기준으로 다음 범위가 완료되어 있다.

1. Foundry V13 `ApplicationV2 + HandlebarsApplicationMixin` 기반 독립 Workbench 창.
2. 기본 창 1200×820, 왼쪽 편집기 / 오른쪽 월드 Item Browser의 2열 UI.
3. 모듈 API `openWorkbench(itemId?)`.
4. 기존 월드 Item 검색·필터·선택.
5. 이름·아이콘·설명 편집.
6. Activity 선택 및 전환.
7. Base Damage 편집.
8. Activity raw Extra Damage 편집.
9. 복수 피해 유형 선택.
10. dice 없이 bonus 식만 있는 피해 파트 보존.
11. Uses / Recharge 편집.
12. 기존 On-Hit ActiveEffect reference 연결·해제.
13. 단순 상태 On-Hit ActiveEffect 생성.
14. 단순 Transfer Passive ActiveEffect change 생성.
15. 기존 D&D5e Item Sheet 고급 편집 진입.
16. no-op 저장에서 Item/Activity/Effect 및 수정시각 보존.
17. unknown Activity fields·effect reference fields를 가능한 한 보존하는 비파괴 업데이트.

## 실제 FVTT E2E 확인 범위

2026-09-12 룩스테라 월드, `보조마스터1` GM 세션에서 다음을 확인했다.

- Workbench 렌더 및 2열 UI 표시.
- 월드 Item 검색·선택 및 Activity 전환.
- Item Directory Context Hook 등록.
- no-op 저장 시 데이터 및 수정시각 보존.
- 이름·설명·base 피해·Uses 변경 저장.
- synthesized base damage가 raw extra damage에 섞이지 않음.
- 기존 Activity Effect reference `_id` 유지.
- 신규 On-Hit Effect 생성 및 기존 reference와 병존.
- Transfer Passive Effect 생성.
- D&D5e 기본 Item Sheet 열기.
- E2E 임시 Item 삭제 후 월드 Item 수 원복.

## 최신 자동 테스트

- 테스트 요약: `40 tests / 40 pass / 0 fail`
- Git 상태: `로컬 커밋 완료 / push 대기` — 현재 HEAD `c90aae6`; HTTPS 인증 자격증명 부재로 원격 push는 실패했다.

2026-09-13 재검증 명령:

```text
node --test tests/workbench-item-adapter.test.mjs tests/workbench-module.test.mjs tests/statblock-importer.test.mjs tests/module-manifest.test.mjs
```

결과:

```text
37 tests
37 pass
0 fail
```

따라서 현재 저장된 Workbench/Importer 단위·정적 계약 테스트는 모두 통과한다.

## 현재 미완료 지점

### Item Directory 우클릭 진입 버그

실제 Foundry V13 Item Directory의 엔트리는 Item ID를 `data-entry-id`에 둔다.

실환경에서 확인한 구조:

```text
entry.dataset.entryId     -> Item ID 존재
entry.dataset.documentId  -> null
```

하지만 현재 `scripts/module.mjs`의 `contextDocumentId()`는 `documentId`만 읽는다.

현재 코드:

```js
function contextDocumentId(entry) {
  if (typeof entry?.data === 'function') return entry.data('documentId') ?? null;
  const element = entry?.[0] ?? entry;
  return element?.dataset?.documentId ?? null;
}
```

따라서 Context Menu 항목은 등록되더라도 실제 Item 엔트리에서 condition이 false가 되어 `Nihil Workbench에서 편집`이 정상 노출되지 않을 수 있다.

확정된 수정 방향:

```js
function contextDocumentId(entry) {
  if (typeof entry?.data === 'function') {
    return entry.data('documentId') ?? entry.data('entryId') ?? null;
  }
  const element = entry?.[0] ?? entry;
  return element?.dataset?.documentId ?? element?.dataset?.entryId ?? null;
}
```

이 수정은 아직 코드에 반영하지 않았다.

## 정확한 재개 지점

다음 세션에서 Nihil Workbench 개발을 재개할 때 첫 작업은 다음과 같다.

1. `scripts/module.mjs`의 `contextDocumentId()`에 `entryId` fallback을 추가하는 회귀 테스트를 먼저 작성한다.
2. 테스트가 기존 코드에서 실패하는지 확인한다.
3. 최소 수정으로 `documentId ?? entryId` fallback을 적용한다.
4. 관련 테스트 전체를 실행한다.
5. 실제 룩스테라 월드의 Item Directory에서 `애쉬` 등 월드 Item을 우클릭해 `Nihil Workbench에서 편집`이 표시되는지 확인한다.
6. 메뉴 클릭 시 해당 Item ID로 Workbench가 열리는지 확인한다.
7. Context Menu 버그가 해결된 뒤 Item MVP v1 완료 상태를 다시 판정한다.

## 이후 로드맵

현재 concept 기준 후속 범위는 다음과 같다.

### v2

- 신규 Item 생성.
- Item 복제.
- Compendium 선택/편집 지원 검토.
- 효과 프리셋 확장.

### v3 / Actor

- Actor 우클릭 진입.
- Actor 기본 능력치 편집.
- 소유 Item / Feat / Spell 목록 표시.
- NPC·몬스터 생성.
- Embedded Item 편집에 Item Workbench 재사용.

### 장기 확장

- Class / Advancement 편집.
- DSL 또는 구조화 텍스트 기반 빠른/대량 입력.

## 외부 모듈 호환성 메모

현재 실제 World Item의 Embedded ActiveEffect 생성 시 NCM 데이터 생성 자체는 성공하지만 일부 서드파티 모듈이 Foundry V13 world Item parent를 Actor처럼 가정하여 콘솔 오류를 발생시키는 것이 확인됐다.

- `custom-dnd5e 2.3.1`: `actor.getActiveTokens is not a function`
- `autoanimations 6.5.2`: parent token 가정으로 `null.token` 오류
- `df-qol 2.0.2`: ApplicationV2 HTML을 jQuery처럼 취급하여 `html.find is not a function`

Workbench 저장 성공 여부와 이 서드파티 Hook 오류는 분리해서 판단한다.

## Git 주의

현재 브랜치의 Workbench·Importer·Compendium LevelDB 현재 상태는 사용자 승인에 따라 체크포인트 `c90aae6`으로 함께 커밋했다. push는 시도했으나 현재 컨테이너에 HTTPS credential helper·token·SSH 실행 환경이 없어 인증 단계에서 중단됐다.
