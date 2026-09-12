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
- Item 전 타입 커버리지 분석: `/shared/fvtt/nihil-compendium-module/docs/workbench/nihil-workbench-item-type-coverage-2026-09-13.md`
- 발견 이슈·개선 backlog: `/shared/fvtt/nihil-compendium-module/docs/workbench/nihil-workbench-backlog-2026-09-13.md`

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

- 테스트 요약: `69 tests / 69 pass / 0 fail`
- Git 상태: `로컬 커밋 완료` — 체크포인트 `c90aae6` (`feat: checkpoint Nihil Workbench and statblock importer`)에 Workbench·Importer·Pack 현재 상태를 포함했다. 원격 push는 HTTPS 자격증명 부재로 대기 중이다.

2026-09-13 다음 테스트를 재실행했다.

```text
node --test tests/workbench-item-adapter.test.mjs tests/workbench-module.test.mjs tests/statblock-importer.test.mjs tests/module-manifest.test.mjs
```

결과:

```text
69 tests / 69 pass / 0 fail
```

2026-09-12 실제 룩스테라 월드에서도 Item Workbench 렌더, 검색·선택, Activity 전환, 비파괴 저장, Damage/Uses 저장, On-Hit/Passive Effect 생성, 기본 Item Sheet 열기까지 E2E 검증했다.

## 최근 완료: Item Directory 우클릭 진입

2026-09-13 Foundry V13 실환경에서 Item Directory Context Menu 경로를 재조사하고 우클릭 Workbench 진입을 수정했다.

확인된 원인과 해결:

1. 실제 Item 엔트리는 `data-entry-id`만 제공하고 `data-document-id`는 제공하지 않는다.
2. `contextDocumentId()`에 `documentId ?? entryId` fallback을 추가했다.
3. 이 수정만으로 condition은 true가 되었지만 실제 렌더 메뉴에는 항목이 나타나지 않았다.
4. `CONFIG.ui.items === ui.items.constructor === ItemDirectory5e`이며 실제 메뉴 옵션은 `_getEntryContextOptions()`가 생성함을 확인했다.
5. ready 시점 인스턴스 패치는 이미 만들어진 Context Menu의 캐시에는 늦었다.
6. `CONFIG.ui.items.prototype._getEntryContextOptions()`를 조기 비파괴 래핑하고 `ui.items` 인스턴스 fallback을 유지했다.
7. `Symbol.for()` 마커로 중복 패치를 방지하고 기존 메뉴 옵션은 그대로 보존했다.

검증:

- `tests/workbench-module.test.mjs`에서 `data-entry-id`, class prototype 조기 패치, ready fallback 회귀 테스트 통과.
- 환경 의존 `verify-compendium-packs.test.mjs`를 제외한 전체 테스트 `69/69` 통과.
- `보조마스터1` GM 실환경에서 `벽력일섬` 우클릭 메뉴에 `Nihil Workbench에서 편집`이 실제 표시됨을 확인.
- 메뉴 클릭 후 Workbench 창 진입 확인.

현재 이 수정은 체크포인트 `c90aae6` 이후 작업 트리에 존재하며 아직 후속 커밋하지 않았다.

## 최근 완료: 빈 선택 진입·생성·복제 UX

2026-09-13 Item Workbench 진입과 기본 생성·복제 UX를 확장했다.

- Item Directory footer에 `Nihil Workbench` 런처 버튼을 추가했다.
- 런처 버튼은 `Gamemaster`와 `AI-GPT` 두 User ID 화이트리스트 계정에만 생성된다.
- `openWorkbench()`를 Item ID 없이 호출하면 기존 선택을 명시적으로 초기화하고 왼쪽 편집 영역을 `Item을 선택하십시오.` 빈 상태로 연다.
- 우클릭 `openWorkbench(itemId)`는 기존처럼 해당 Item을 선택해서 연다.
- Workbench 우측 목록 하단에 화이트리스트 계정 전용 `아이템 생성` / `아이템 복제` 버튼을 추가했다.
- `아이템 복제`는 선택 Item이 없으면 disabled이며 선택 후 활성화된다.
- 복제는 `selectedItem.clone({name: ...}, {save:true})`를 사용하고 성공 직후 복제본을 자동 선택한다.
- `아이템 생성`은 현재 Foundry 기본 `Item.createDialog()`를 연다. Workbench-native type별 생성 UI는 아직 별도 구현하지 않았다.

실환경 E2E (`AI-GPT`, GM role 4):

- Item Sidebar 펼침 상태에서 footer 런처 실제 가시 확인.
- 런처 클릭 후 왼쪽 무선택 상태 확인.
- 관리 버튼 표시 확인.
- 복제 버튼 disabled → Item 선택 후 enabled 전환 확인.
- 복제 후 새 ID의 `(복제)` Item 자동 선택 확인.
- World Item 수 +1 확인 후 테스트 복제본 삭제, 원래 Item 수 원복.
- `아이템 생성` 클릭 시 Foundry 기본 `아이템 만들기` 다이얼로그 표시 확인.
- 환경 의존 pack verifier 제외 전체 테스트 `69/69` 통과.

현재 이 변경은 체크포인트 `c90aae6` 이후 작업 트리에 있으며 아직 후속 커밋하지 않았다.

## 최근 완료: Item Folder 생성

- Workbench 우측 하단 관리 영역에 `폴더 생성` 버튼을 추가했다.
- `Gamemaster`와 `AI-GPT` 화이트리스트 계정에만 표시된다.
- 현재 `currentFolderId`를 `Folder.createDialog({folder, type: "Item"})`의 parent로 전달한다.
- 루트에서는 parent가 `null`이다.
- 생성 완료 후 새 Folder ID로 자동 진입한다.
- 실환경에서 `Folder.create()` parent readback과 임시 Folder 생성·삭제 원복을 확인했다.
- 환경 의존 pack verifier 제외 전체 테스트 `69/69` 통과.

## 최근 완료: Item Browser 폴더 탐색기

2026-09-13 우측 Item Browser를 평면 목록에서 Folder ID 기반 탐색기로 전환했다.

- `currentFolderId`를 Browser 상태로 추가.
- 루트에서는 루트 Folder와 루트 Item만 표시.
- 폴더 진입 시 해당 폴더의 직계 하위 Folder와 직계 Item만 표시.
- 상단에 `루트 / ... / 현재 폴더` breadcrumb 스택 표시.
- `↑` 버튼으로 부모 Folder 이동.
- breadcrumb 각 구간 클릭으로 해당 상위 Folder에 직접 이동.
- 같은 이름의 폴더가 다른 부모 아래 있어도 Folder ID 기준이라 충돌하지 않음.
- Item 선택 시 Browser 위치도 해당 Item의 Folder로 동기화.
- 검색은 현재 폴더에 보이는 Item과 Folder 범위에서 적용.

실환경 E2E (`AI-GPT`):

```text
루트
→ 01. 룩스테라 관련
→ 01. 위그드라실
→ 01. 피트
→ 위그드라실의 가호 확인
```

손자 Folder가 부모 목록에 조기 노출되지 않는 직계 자식 계약, 상위 이동, breadcrumb 루트 복귀를 모두 확인했다. 환경 의존 pack verifier 제외 전체 테스트는 `69/69` 통과했다.

현재 이 변경은 체크포인트 `c90aae6` 이후 작업 트리에 있으며 아직 후속 커밋하지 않았다.

## 최근 분석: Item 전 타입 커버리지

- `NCM TEST - Item Type Coverage` Folder를 만들고 런타임 Item type 15종 샘플을 생성했다.
- 실제 사용자 생성 대상은 `base` 제외 14종이며 `backpack`은 container alias로 정규화됨을 확인했다.
- 각 타입의 `toObject()` 기본 구조, 기본 Sheet 탭, 일반 input/select와 `dnd5e-checkbox`, `multi-select`, `string-tags` 같은 custom control을 수집했다.
- 현재 Workbench는 공통 설명·Uses·일부 Damage/Activity/Effect만 지원하며 전 타입 완전 지원에는 부족하다고 판정했다.
- D&D5e 핵심 Activity 12종과 Advancement 8종을 확인했다.
- 다음 우선순위는 Compendium보다 Item 전체 커버리지 확장으로 변경한다.

## 최근 완료: 공통 Item Core 1차

- `CORE-001`: Identifier와 Native Source 6필드(book/page/custom/license/rules/revision) 읽기·부분 저장·UI·E2E 완료.
- `CORE-002`: 지원 Item에서 identified + unidentified name/description 조건부 읽기·저장·UI·E2E 완료.
- `UI-002`: Item 미선택 empty 메시지를 좌측 editor 정중앙으로 보정.
- 환경 의존 pack verifier 제외 전체 테스트 `69/69` 통과.

## 최근 완료: 공통 Item Core 2차

- `CORE-003`: 물리 Item의 quantity/weight/price/rarity/container 조건부 편집 및 E2E 완료.
- `CORE-004`: 장착 가능 Item의 equipped/attunement/attuned 조건부 편집 및 E2E 완료.
- 환경 의존 pack verifier 제외 전체 테스트 `69/69` 통과.

## 정확한 재개 지점

현재 구현·분석 이후 모든 후속 작업은 `docs/workbench/nihil-workbench-backlog-2026-09-13.md`를 단일 backlog 정본으로 사용한다.

`SYNC-001`~`SYNC-003` 외부 Folder/Item 동기화는 완료됐다. 다음 TDD 대상은 공통 Item Core `CORE-006` Uses / Recovery 완전 지원이다.

진행 순서:

1. `SYNC-002` Folder rename/move/delete 각각 실환경 재현.
2. 각 이벤트 RED 테스트 작성.
3. 최소 동기화 구현 및 AI-GPT E2E.
4. `SYNC-003` Item create/update/move/delete 재현 및 TDD.
5. 이후 공통 Item Core(`CORE-001`~`CORE-007`)로 진행.

## 최근 UI 보정

- Workbench 본문 입력창·select·일반 버튼 높이를 `32px`로 통일했다.
- 아이템 브라우저 Item 행과 Folder 행을 모두 `52px`로 통일했다.
- 실환경 computed style과 회귀 테스트로 확인했다.

## 이후 범위

### v2

- 기본 Item 생성 다이얼로그 연결 — 완료
- World Item 복제·자동 선택 — 완료
- Compendium 선택/편집 검토
- 효과 프리셋 확장
- 필요 시 Workbench-native Item 생성 UX 확장

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

Item 전 타입 커버리지 분석 보고서를 기준으로 공통 Item Core부터 확장한다. 이후 물리 Item 계열 → Activity 전 타입 → Spell/Feat → Advancement → Race/Background/Class/Subclass → Facility 순으로 진행한다.
