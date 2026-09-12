# Nihil Workbench 개발 정비

## 목적

`nihil-compendium-module`의 Nihil Workbench 개발을 장기 과제로 추적하고, 세션이 바뀌어도 현재 구현 범위·검증 결과·미완료 지점·정확한 재개 위치를 잃지 않도록 관리한다.

## 상태

- 상태: 진행 중
- 시작일: 2026-09-12
- 마지막 확인일: 2026-09-13
- 저장소: `/shared/fvtt/nihil-compendium-module`
- 현재 브랜치: `fix/common-monster-cr-names`
- 현재 HEAD: `c90aae6`
- 기준 환경: Foundry VTT 13.351 / D&D5e 5.2.4

## 관련 문서

- 저장소 설계 정본: `/shared/fvtt/nihil-compendium-module/docs/workbench/nihil-workbench-concept-v0.md`
- 저장소 Item MVP 계획: `/shared/fvtt/nihil-compendium-module/docs/workbench/nihil-workbench-item-mvp-plan.md`
- 현재 상태 보고서: `TRPG 데이터/docs/superpowers/reports/2026-09-13-nihil-workbench-current-state.md`
- FVTT 개발 API 참고: `TRPG 데이터/FVTT API 및 개발 참고.md`

## 현재 구현 범위

Item Workbench v1은 다음 범위까지 구현되어 있다.

1. ApplicationV2 기반 독립 Workbench UI.
2. 1200×820, 좌 편집 / 우 Item Browser 2열 구조.
3. `openWorkbench(itemId?)` 모듈 API.
4. 기존 월드 Item 검색·필터·선택.
5. 이름·아이콘·설명 편집.
6. Activity 선택.
7. Base/Extra Damage 편집.
8. 복수 피해 유형 지원.
9. Uses / Recharge 편집.
10. On-Hit ActiveEffect 연결·해제 및 단순 상태 Effect 생성.
11. Transfer Passive Effect change 생성.
12. 기존 D&D5e Item Sheet 고급 편집 진입.
13. raw source와 파생값을 구분하는 비파괴 저장.
14. no-op 저장 시 Item/Activity/Effect와 수정시각 보존.

스탯블록 임포터도 모듈 내부 기능으로 이관되어 있으며 SBI Import + 한글화 후처리 구조가 현재 작업 트리에 존재한다.

## 검증 완료 범위

- 테스트 요약: `40 tests / 40 pass / 0 fail`
- Git 상태: `로컬 커밋 완료` — 체크포인트 `c90aae6` (`feat: checkpoint Nihil Workbench and statblock importer`)에 Workbench·Importer·Pack 현재 상태를 포함했다. 원격 push는 HTTPS 자격증명 부재로 대기 중이다.

2026-09-13 다음 테스트를 재실행했다.

```text
node --test tests/workbench-item-adapter.test.mjs tests/workbench-module.test.mjs tests/statblock-importer.test.mjs tests/module-manifest.test.mjs
```

결과:

```text
40 tests / 40 pass / 0 fail
```

2026-09-12 실제 룩스테라 월드에서도 Item Workbench 렌더, 검색·선택, Activity 전환, 비파괴 저장, Damage/Uses 저장, On-Hit/Passive Effect 생성, 기본 Item Sheet 열기까지 E2E 검증했다.

## 현재 미완료

### Item Directory 우클릭 진입

실제 Foundry V13 Item Directory 엔트리는 Item ID를 `data-entry-id`로 제공하지만 현재 `scripts/module.mjs`의 `contextDocumentId()`는 `data-document-id`만 읽는다.

현재 상태:

```js
function contextDocumentId(entry) {
  if (typeof entry?.data === 'function') return entry.data('documentId') ?? null;
  const element = entry?.[0] ?? entry;
  return element?.dataset?.documentId ?? null;
}
```

실환경 관찰:

```text
entry.dataset.entryId     -> Item ID 존재
entry.dataset.documentId  -> null
```

확정된 수정 방향:

```js
entry.data('documentId') ?? entry.data('entryId')
element.dataset.documentId ?? element.dataset.entryId
```

아직 구현하지 않았다.

## 정확한 재개 지점

1. `tests/workbench-module.test.mjs`에 `data-entry-id` fallback 회귀 테스트 추가.
2. 기존 코드에서 해당 테스트 실패 확인.
3. `scripts/module.mjs`의 `contextDocumentId()` 최소 수정.
4. Workbench/Importer 관련 전체 테스트 실행.
5. 실제 FVTT Item Directory에서 월드 Item 우클릭 메뉴 노출 확인.
6. `Nihil Workbench에서 편집` 클릭 시 해당 Item ID로 Workbench가 열리는지 확인.
7. 실환경 검증 통과 후 Item MVP v1 완료 여부 재판정.

## 이후 범위

### v2

- 신규 Item 생성
- Item 복제
- Compendium 선택/편집 검토
- 효과 프리셋 확장

### v3 / Actor

- Actor 우클릭 진입
- Actor 능력치 편집
- Embedded Item / Feat / Spell 표시
- NPC·몬스터 생성
- Item Workbench 재사용

### 장기

- Class / Advancement 편집
- DSL 또는 구조화 텍스트 기반 빠른 입력

## 저장·커밋 상태

Workbench 관련 소스·문서·테스트와 현재 Pack 상태는 체크포인트 `c90aae6`에 커밋되어 있다. 따라서 같은 작업 디렉터리뿐 아니라 해당 커밋을 사용할 수 있는 환경에서도 상태를 재현할 수 있다. 다만 현재 실행 환경에는 GitHub HTTPS 자격증명이 없어 원격 push는 완료되지 않았다.

따라서:

- 로컬 커밋 `c90aae6`을 현재 복구 지점으로 사용한다.
- 원격 push는 GitHub 자격증명이 연결된 환경에서 `fix/common-monster-cr-names` 브랜치를 push한다.
- push 완료 전에는 다른 머신의 새 clone에서 이 체크포인트를 가져올 수 없다.

## 외부 모듈 호환성

World Item Embedded ActiveEffect 생성 자체는 성공하지만 다음 외부 모듈 Hook에서 V13 호환성 오류가 관찰됐다.

- custom-dnd5e 2.3.1
- autoanimations 6.5.2
- df-qol 2.0.2

Nihil Workbench의 데이터 저장 성공 여부와 외부 모듈 콘솔 오류는 분리해서 판단한다.

## 다음

Item Directory `data-entry-id` 대응 Context Menu 회귀 테스트와 최소 수정부터 재개한다.
