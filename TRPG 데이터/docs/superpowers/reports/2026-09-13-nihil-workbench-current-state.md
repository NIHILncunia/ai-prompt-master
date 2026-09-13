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

- 테스트 요약: `69 tests / 69 pass / 0 fail`
- Git 상태: `로컬 커밋 완료 / push 대기` — 현재 HEAD `c90aae6`; HTTPS 인증 자격증명 부재로 원격 push는 실패했다.

2026-09-13 재검증 명령:

```text
node --test tests/workbench-item-adapter.test.mjs tests/workbench-module.test.mjs tests/statblock-importer.test.mjs tests/module-manifest.test.mjs
```

결과:

```text
48 tests
48 pass
0 fail
```

따라서 현재 저장된 Workbench/Importer 단위·정적 계약 테스트는 모두 통과한다.

## 2026-09-13 Context Menu 수정 완료

Item Directory 우클릭 진입 버그는 실환경 재조사 후 수정 완료했다.

실측 결과:

```text
entry.dataset.entryId     -> Item ID 존재
entry.dataset.documentId  -> null
CONFIG.ui.items            -> ItemDirectory5e
CONFIG.ui.items === ui.items.constructor -> true
```

초기 `documentId ?? entryId` fallback만으로는 condition은 true가 되었지만 실제 우클릭 메뉴에는 Workbench 항목이 나타나지 않았다. 추가 조사에서 V13의 실제 Context Menu 옵션은 `ItemDirectory5e._getEntryContextOptions()`가 생성하고, 이미 생성된 Context Menu는 ready 이전 옵션을 캐시한다는 점을 확인했다.

최종 구현:

- `contextDocumentId()`에서 `documentId ?? entryId` fallback.
- `CONFIG.ui.items.prototype._getEntryContextOptions()` 조기 비파괴 래핑.
- 기존 옵션 배열 보존 후 Workbench 옵션 append.
- `Symbol.for()` 마커로 중복 래핑 방지.
- 이미 생성된 환경을 위한 `ui.items` instance fallback.
- 기존 `getItemDirectoryEntryContext` Hook은 구버전 fallback으로 유지.

실환경 검증:

- 사용자: `보조마스터1`, GM role 4.
- 월드 Item `벽력일섬`에서 실제 우클릭 메뉴에 `Nihil Workbench에서 편집` 표시 확인.
- 메뉴 클릭 후 Workbench 창 진입 확인.
- 환경 의존 pack verifier를 제외한 전체 테스트 69/69 통과.

현재 Context Menu 수정은 체크포인트 `c90aae6` 이후 작업 트리에 있으며 아직 후속 커밋하지 않았다.

## 최근 UI 보정

- 입력창·버튼 높이 `32px` 통일.
- Item Browser Item 행 `52px` 유지.
- Folder 행도 `52px`로 통일해 목록 행 높이 일관성을 맞춤.
- 실환경 computed style 검증 완료.

## 2026-09-13 Item 런처·생성·복제 UX 완료

추가 완료 범위:

- Item Directory `renderItemDirectory` Hook에서 footer에 `Nihil Workbench` 버튼 삽입.
- 버튼 노출은 `Gamemaster`와 `AI-GPT` User ID 화이트리스트로 제한.
- `openWorkbench()` 무인자 호출 시 이전 선택까지 초기화하여 왼쪽 편집기를 빈 상태로 시작.
- 우클릭 진입은 Item ID를 전달하므로 선택 진입 유지.
- Workbench 우측 하단에 화이트리스트 전용 `아이템 생성` / `아이템 복제` 버튼 추가.
- 선택 Item이 없으면 복제 disabled.
- `item.clone(..., {save:true})`로 World Item 영속 복제 후 복제본 자동 선택.
- `Item.createDialog()`로 Foundry 기본 Item 생성 다이얼로그 연결.

실환경 검증 (`AI-GPT`, role 4):

- Sidebar expand 후 Item Directory footer 런처 가시 확인.
- 빈 선택 Workbench 진입 확인.
- 생성/복제 버튼 표시 확인.
- 복제 disabled/enabled 전환 확인.
- 복제 시 World Item 수 +1 및 새 ID 확인.
- 복제본 자동 선택 확인.
- 테스트 복제본 삭제 후 Item 수 원복.
- `아이템 만들기` 기본 생성 다이얼로그 표시 확인.
- 전체 회귀 테스트 69/69 통과(환경 의존 pack verifier 제외).

## 2026-09-13 Item Folder 생성 완료

Workbench 우측 하단에 화이트리스트 전용 `폴더 생성` 버튼을 추가했다. 현재 Folder ID를 부모로 `Folder.createDialog()`를 열고, 생성된 Folder를 자동으로 현재 위치로 선택한다. 실환경에서 parent ID readback과 임시 Folder 생성·삭제 원복을 확인했다. 전체 회귀 테스트는 환경 의존 pack verifier 제외 `69/69` 통과했다.

## 2026-09-13 Item Browser 폴더 탐색기 완료

우측 Item Browser를 Foundry World Item Folder 관계를 반영하는 단일 폴더 탐색 방식으로 전환했다.

- Folder 관계는 `folder.id`, `folder.folder?.id`, `item.folder?.id`를 사용.
- `currentFolderId`가 null이면 루트.
- 목록에는 현재 Folder의 직계 child Folder와 직계 Item만 렌더.
- breadcrumb와 상위 이동 제공.
- Item 선택 시 Browser 위치를 해당 Item Folder로 동기화.
- 실환경 데이터: Item Folder 21개, 최대 깊이 3.

E2E에서 `루트 → 01. 룩스테라 관련 → 01. 위그드라실 → 01. 피트` 이동, `위그드라실의 가호` 표시, 부모 이동, breadcrumb 루트 복귀를 확인했다. 전체 회귀 테스트는 환경 의존 pack verifier 제외 `69/69` 통과했다.

## 2026-09-13 Item 전 타입 커버리지 분석

전용 테스트 Folder `NCM TEST - Item Type Coverage`를 생성하고 D&D5e 5.2.4 Item type 15종을 실환경에 생성했다. `base`는 내부 타입, `backpack`은 container 호환 alias로 분류했다. 사용자 생성 대상 14종의 기본 Sheet와 저장 원본을 대조했고, 현재 Workbench가 공통 설명·Uses·일부 Damage/Activity/Effect 수준만 지원함을 확인했다.

D&D5e 핵심 Activity 12종 및 Advancement 8종도 런타임에서 확인했다. 상세 보고서: `docs/workbench/nihil-workbench-item-type-coverage-2026-09-13.md`.

발견 이슈 및 개선사항의 단일 backlog: `docs/workbench/nihil-workbench-backlog-2026-09-13.md`.

## 2026-09-13 CORE-001 / CORE-002 완료

Identifier/Source 전체 필드와 조건부 Identification/Unidentified 편집을 Workbench에 추가했다. Weapon Fixture E2E와 Spell 비지원 UI 미노출을 검증했다. 빈 상태 메시지 중앙 정렬 UI 보정도 완료했다. 전체 회귀 테스트는 환경 의존 pack verifier 제외 `69/69` 통과했다.

## 2026-09-13 CORE-003 / CORE-004 완료

물리 Item의 Inventory/Economy 및 장착/조율 공통 필드를 조건부 편집하도록 확장했다. Weapon E2E 및 Spell/Loot 비지원 UI 미노출을 검증했다. 전체 테스트는 환경 의존 pack verifier 제외 `69/69` 통과했다.

## 2026-09-13 CORE-006 / CORE-007 완료

Uses/Recovery를 D&D5e 5.2.4 원본 스키마에 맞게 확장했고 Item 생성 시 현재 Folder 기본 선택을 적용했다. Formula max, 복수 Recovery, recharge 정규화, Consumable autoDestroy, 생성 다이얼로그 Folder 초기값을 AI-GPT 실환경에서 검증했다. 공통 Item Core `CORE-001`~`CORE-007`이 완료됐고 다음 구현은 `TYPE-WEAPON-001`이다.

## 2026-09-13 TYPE-*-001 완료

13개 Item 계열의 직접 본체 필드를 schema-driven Type Editor로 확장하고 타입별 Fixture E2E를 순차 통과했다. 다음 독립 서브시스템은 `ACT-001` Activity CRUD다.

## 2026-09-13 Activity Editor 완료

`ACT-001`~`ACT-004`를 완료했다. CRUD, 공통 schema, 핵심 12 discriminator, 외부 Activity raw 보존/고급 Sheet fallback을 실환경에서 검증했다. 다음 단계는 Advancement Editor다.

## 2026-09-13 섹션 접기 UI 완료

Workbench 주요 편집 카드 14개를 collapsible details/summary 구조로 통일했고, 섹션별 열림 상태를 인스턴스 내에서 보존하여 재렌더에도 유지되게 했다.

## 정확한 재개 지점

`SYNC-001`~`SYNC-003` 외부 Folder/Item 실시간 동기화는 완료했다. 다음 구현은 공통 Item Core `CORE-006` Uses / Recovery 완전 지원이다.

## 이후 로드맵

현재 concept 기준 후속 범위는 다음과 같다.

### v2

- 기본 Item 생성 다이얼로그 연결 — 완료.
- World Item 복제·자동 선택 — 완료.
- Compendium 선택/편집 지원 검토.
- 효과 프리셋 확장.
- 필요 시 Workbench-native 생성 UX 확장.

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
- 최신 전체 회귀 테스트: 환경 의존 pack verifier 제외 `76/76` 통과.
- 최신 전체 회귀 테스트: 환경 의존 pack verifier 제외 `94/94` 통과.
