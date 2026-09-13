# FVTT API 및 개발 참고

## 문서 목적

이 문서는 TRPG 프로젝트에서 Foundry VTT 모듈 개발·자동화·데이터 입력을 수행하면서 **실제 환경에서 확인한 API, 데이터 구조, 호환성 지식과 안전한 조작 패턴**을 누적하는 실전 레퍼런스다.

공식 룰 해석이나 게임 데이터의 정본을 대신하지 않는다. FVTT 기능 작업에서 구현 방법을 빠르게 재사용하기 위한 개발 지식 저장소이며, 새 API·패턴을 실제로 검증했을 때만 추가한다.

현재 기준 버전은 다음과 같다.

```text
Foundry VTT 13.351
D&D5e 5.2.4
MIDI-QOL 13.0.31
DAE 13.0.17
5e-statblock-importer 2.3.10
```

버전이 바뀌면 이 문서의 API·DOM·데이터 경로를 그대로 신뢰하지 말고 재검증한다.

## 정보 등급

이 문서에서는 API의 성격을 다음처럼 구분한다.

- **Core API**: Foundry Document/Collection 등 일반적인 공개 API 사용 패턴.
- **System 구조**: D&D5e 시스템이 정의하는 Item/Actor 필드. 시스템 버전에 민감하다.
- **Module API**: 설치 모듈이 명시적으로 노출하거나 실제 환경에서 호출 가능한 API.
- **Observed/Internal**: 런타임 DOM·Hook 내부 배열·반환 객체 등 관찰로 확인한 구현 세부. 안정 API로 간주하지 않는다.

`Observed/Internal` 항목은 문제 분석과 호환성 대응에만 사용하고, 가능한 경우 Core API 또는 Module API로 작업한다.

---

## 1. 가장 중요한 안전 규칙

### FVTT 실행 중 LevelDB 직접 수정 금지

World의 `data/actors`, `data/items`, `data/scenes` 등 LevelDB 저장소를 FVTT 서버가 실행 중일 때 파일 시스템에서 직접 수정하지 않는다.

Actor·Item·Scene·Token·Macro 같은 World Document는 가능하면 **실행 중인 FVTT 브라우저 컨텍스트의 `game.*` / Document API를 통해 수정**한다.

```js
const actor = game.actors.get(actorId);
await actor.update({ name: "새 이름" });
```

이미지·WebP 같은 일반 파일 자산을 Data 폴더 안으로 복사하는 것은 DB 수정과 별개지만, Actor에 저장할 경로는 운영체제 절대경로가 아니라 FVTT가 서비스할 수 있는 **Data 기준 상대 URL**을 사용한다.

```text
worlds/prac/assets/actors/example/example.webp
```

`/shared/...`, `C:\...`, `/mounts/...` 같은 호스트 파일 경로를 Actor `img`에 직접 넣지 않는다.

---

## 2. Actor 조회와 기본 갱신

### Actor 조회 — Core API

```js
const actorById = game.actors.get(actorId);
const actorByName = game.actors.getName("아그니르 성기사");
```

현재 World 전체 Actor 열람:

```js
const actors = game.actors.contents;
```

특정 Folder의 Actor 필터링:

```js
const actors = game.actors.filter(a => a.folder?.id === folderId);
```

### Actor 기본 필드 수정 — Core API

```js
await actor.update({
  name: "새 이름",
  folder: folderId,
  img: "worlds/prac/assets/actors/example/full.webp",
  "prototypeToken.name": "새 이름",
  "prototypeToken.texture.src": "worlds/prac/assets/actors/example/token.webp"
});
```

Prototype Token 이름 표시 모드도 함께 지정할 수 있다.

```js
await actor.update({
  "prototypeToken.displayName": CONST.TOKEN_DISPLAY_MODES.HOVER
});
```

### 기존 Actor 본체를 보존하면서 Item만 추가할 때

특수 Actor의 HP·능력치·숙련·이동속도 등을 보존해야 한다면 작업 전후 `system`을 직렬화하여 비교하는 방식이 유용하다.

```js
const before = JSON.stringify(actor.system.toObject());

// Embedded Item만 변경

const after = JSON.stringify(actor.system.toObject());
console.assert(before === after);
```

이번 세션에서는 이 방법으로 `방랑자 ????`의 본체 데이터가 Item 추가 전후 동일함을 검증했다.

---

## 3. Embedded Item 생성·수정·삭제

Actor의 피트·무기·주문은 Embedded Document로 다룬다.

### 생성 — Core API

```js
const created = await actor.createEmbeddedDocuments("Item", [itemData]);
```

복수 생성:

```js
await actor.createEmbeddedDocuments("Item", [weaponData, featA, featB]);
```

### 수정 — Core API

```js
await actor.updateEmbeddedDocuments("Item", [
  {
    _id: item.id,
    "system.description.value": "<p>새 설명</p>"
  }
]);
```

### 삭제 — Core API

```js
await actor.deleteEmbeddedDocuments("Item", [itemId]);
```

이름으로 기존 Item을 찾아 멱등성을 확보하는 패턴:

```js
const names = new Set(["신속", "죽지 않는 육체"]);
const stale = actor.items.filter(i => names.has(i.name));
if (stale.length) {
  await actor.deleteEmbeddedDocuments("Item", stale.map(i => i.id));
}
```

---

## 4. Scene과 Token 생성·배치

### 현재 Scene — Core API

```js
const scene = canvas.scene;
```

### Actor에서 TokenDocument 생성 — Core API

```js
const tokenDoc = await actor.getTokenDocument({
  x: 500,
  y: 500,
  hidden: false,
  name: actor.name
});
```

### Scene에 Token 생성 — Core API

```js
const [created] = await scene.createEmbeddedDocuments("Token", [
  tokenDoc.toObject()
]);
```

### Scene Token 수정 — Core API

```js
await scene.updateEmbeddedDocuments("Token", [
  { _id: tokenId, x: 500, y: 450 }
]);
```

### Scene Token 삭제 — Core API

```js
await scene.deleteEmbeddedDocuments("Token", [tokenId]);
```

Actor ID로 Scene Token 찾기:

```js
const token = scene.tokens.find(t => t.actorId === actor.id);
```

### 화면 이동 — Canvas API

```js
await canvas.animatePan({
  x: 500,
  y: 500,
  scale: 1,
  duration: 200
});
```

### `bypass` 옵션 — 호환성 대응, Core 보장 아님

현재 환경에서 Monk's Active Tile Triggers 등 이동 Hook이 좌표를 바꾸는 상황이 확인됐다. 다음 옵션을 사용하면 요청 좌표가 그대로 유지되는 것을 실제로 확인했다.

```js
await token.update(
  { x: 500, y: 500 },
  { bypass: true, animate: false }
);
```

복수 Token에서도 사용 가능했다.

```js
await scene.updateEmbeddedDocuments(
  "Token",
  updates,
  { bypass: true, animate: false }
);
```

`bypass`는 현재 설치 모듈이 해석하는 옵션에 의존하므로 **Foundry Core의 일반 보장 기능으로 취급하지 않는다**. 모듈 구성이 바뀌면 재검증한다.

---

## 5. Actor 이미지와 Prototype Token

이 프로젝트의 기본 연결은 다음과 같다.

- `Actor.img`: 전신 이미지
- `Actor.prototypeToken.texture.src`: VTT 토큰 이미지

```js
await actor.update({
  img: "worlds/prac/assets/actors/example/example.webp",
  "prototypeToken.texture.src": "worlds/prac/assets/actors/example/example 토큰.webp"
});
```

실제 URL 로딩 검증:

```js
const actorImageOk = await fetch(actor.img, { cache: "no-store" })
  .then(r => r.ok);

const tokenImageOk = await fetch(actor.prototypeToken.texture.src, { cache: "no-store" })
  .then(r => r.ok);
```

Canvas에 생성된 Token 텍스처 확인 시 현재 환경에서는 다음 값도 사용했다.

```js
const textureValid = !!token.object?.mesh?.texture?.baseTexture?.valid;
```

이 마지막 경로는 렌더러 내부 구조에 가깝기 때문에 **Observed/Internal 검증용**으로만 사용한다.

---

## 6. D&D5e Weapon 데이터 구조

기준: D&D5e 5.2.4.

### 기본 피해 — System 구조

무기의 기본 피해는 다음 구조에서 확인됐다.

```js
item.system.damage.base = {
  number: 2,
  denomination: 10,
  types: ["necrotic"],
  custom: { enabled: false },
  scaling: { number: 1 }
};
```

예: `2d10 사령 피해`.

### 추가 피해 — Activity 구조

공격 Activity의 `damage.parts`에 별도 피해를 추가할 수 있다.

```js
const attack = Object.values(item.system.activities)
  .find(a => a.type === "attack");

attack.damage.includeBase = true;
attack.damage.parts = [
  {
    number: 2,
    denomination: 6,
    types: ["acid"],
    custom: { enabled: false },
    scaling: { number: 1 }
  }
];
```

이 구조로 `기본 2d10 사령 + 추가 2d6 산성`을 실제 Item에 적용했다.

### 사거리 — System 구조

```js
item.system.range = {
  value: 100,
  long: 400,
  units: "ft"
};
```

### Activity 조회

실제 Document에서는 `system.activities`가 Collection처럼 동작할 수 있다.

```js
const activities = Array.from(item.system.activities ?? []);
```

직렬화된 `toObject()` 결과에서는 keyed object 형태로 나타날 수 있다.

```js
const raw = item.toObject();
const attack = Object.values(raw.system.activities)
  .find(a => a.type === "attack");
```

Document 상태와 raw object 상태를 혼동하지 않는다.

---

## 7. D&D5e Feat 사용 횟수와 회복

기준: D&D5e 5.2.4.

하루 1회 사용 구조가 다음처럼 확인됐다.

```js
item.system.uses = {
  max: 1,
  spent: 0,
  recovery: [
    {
      period: "day",
      type: "recoverAll"
    }
  ]
};
```

실제 Document에서 파생값으로 다음과 같은 값이 보일 수 있다.

```text
value: 1
label: 1/Day
```

`value`, `label`은 시스템 파생값일 수 있으므로 저장 데이터 작성 시 원본 스키마와 파생 필드를 구분한다.

---

## 8. 5e Statblock Importer API

모듈: `5e-statblock-importer` 2.3.10.

### 모듈 객체 획득 — Module API

```js
const sbi = game.modules.get("5e-statblock-importer");
```

### 파싱 — Module API

```js
const parsed = sbi.api.parse(statblockText);
```

현재 환경에서 실제 확인한 활용:

```js
const parsed = sbi.api.parse(statblockText);
if (!parsed?.actor) throw new Error("parse failed");
```

파싱 결과에서 `unknownLines`를 검사하면 누락 가능성을 찾는 데 유용하다.

```js
const unknown = parsed.unknownLines ?? [];
```

### Import — Module API

```js
const result = await sbi.api.import(statblockText, folderId);
const actor = result.actor5e;
```

현재 환경에서 반환 객체의 `actor5e`와 `importIssues`를 실제로 사용했다.

```js
const issues = result.importIssues ?? {};
```

반환 shape는 모듈 버전에 따라 달라질 수 있으므로 모듈 업데이트 후 재검증한다.

### 중요한 Import 후 검증 항목

SBI Import 성공만으로 자동화가 완전하다고 판단하지 않는다. 이번 작업에서 다음을 별도로 검사할 필요가 확인됐다.

- `unknownLines` 존재 여부
- 한국어 localization 미매칭 Item
- 자동 생성된 영어 장비명
- Recharge 5-6 같은 회복/재충전 데이터
- Save Activity의 능력치 필드
- 공격 피해 공식과 능력 수정치 계산
- Activity의 피해 파트와 실제 설명 일치 여부

실제 사례:

- `Shield`가 자동 장비로 생성되어 `방패`로 별도 한글화가 필요했다.
- 일부 Recharge 텍스트는 설명에는 남아 있어도 구조화된 recovery 값이 비어 있을 수 있었다.
- 일부 Save Activity의 ability 값이 기대와 다르게 비어 있는 형태로 직렬화될 수 있었다.
- 공격 공식이 기대한 표준식과 다른 형태로 생성되는 사례가 있었다.

따라서 Import 뒤에는 Item/Activity를 구조적으로 다시 검사한다.

---

## 9. Nihil Compendium Module 스탯블록 Localize 흐름

현재 모듈 경로에서 확인한 기능:

```text
modules/nihil-compendium-module/scripts/statblock-importer/core.mjs
```

### Localization plan — Module 내부 API

```js
const core = await import(
  "/modules/nihil-compendium-module/scripts/statblock-importer/core.mjs"
);

const plan = core.createLocalizationPlan(
  actor.items,
  localization
);
```

현재 확인한 반환값:

```js
plan.itemUpdates
plan.unmatched
```

적용:

```js
if (plan.itemUpdates.length) {
  await actor.updateEmbeddedDocuments("Item", plan.itemUpdates);
}
```

검증:

```js
console.log(plan.unmatched);
```

`unmatched`가 비어 있는지 반드시 확인한다.

### Importer UI API

Nihil Compendium Module에서 `openStatblockImporter`가 스탯블록 임포터 진입 API로 사용 가능함을 확인했다. 공개 범위와 시그니처는 모듈 코드 변경에 민감하므로 호출 전 현재 export를 다시 확인한다.

---

## 10. World Macro 수정

World Macro도 Document이므로 브라우저 API로 갱신한다.

```js
const macro = game.macros.get(macroId);
await macro.update({
  command: newCommand
});
```

FVTT 서버가 실행 중인 상태에서 LevelDB를 직접 수정하지 않고 이 방식을 우선한다.

---

## 11. Hook 진단

### Hook 등록 내용 조사 — Observed/Internal

문제 원인을 찾을 때 현재 런타임에서는 다음으로 Hook 목록을 확인할 수 있었다.

```js
Hooks.events?.preUpdateToken
Hooks.events?.updateToken
Hooks.events?.preCreateToken
Hooks.events?.createToken
```

각 항목의 callback source를 문자열로 확인하면 어느 모듈이 좌표나 Document를 수정하는지 추적하는 데 도움이 된다.

```js
const hooks = Hooks.events?.preUpdateToken ?? [];
const summary = hooks.map(h => String(h.fn ?? h));
```

`Hooks.events`는 안정된 공개 인터페이스로 가정하지 않는다. **디버깅 전용**이다.

이번 세션에서는 `preUpdateToken`에서 Monk's Active Tile Triggers, Rideable, Monk's TokenBar 등 여러 모듈 Hook이 실제로 등록되어 있음을 확인했다.

---

## 12. Foundry V13 Sidebar DOM 주의점

### Item Sidebar 엔트리 식별자 — Observed/Internal

Foundry V13의 실제 Item Sidebar 엔트리 DOM에서 다음 구조가 확인됐다.

```text
data-entry-id="<Item ID>"
```

현재 Workbench Context Menu 구현에서 `data-document-id`만 읽었을 때 조건식이 실패했다.

실제 관찰:

```text
entry.dataset.entryId     -> Item ID 존재
entry.dataset.documentId  -> null
```

따라서 V13 Sidebar Context Menu에서 Document ID를 얻을 때 다음 fallback이 안전했다.

```js
function contextDocumentId(entry) {
  if (typeof entry?.data === "function") {
    return entry.data("documentId")
      ?? entry.data("entryId")
      ?? null;
  }

  const element = entry?.[0] ?? entry;
  return element?.dataset?.documentId
    ?? element?.dataset?.entryId
    ?? null;
}
```

DOM dataset은 Core API가 아니므로 Foundry 버전 업데이트 시 재검증한다.

### Foundry V13 Item Directory Context Menu 생성 경로 — Observed/Internal

2026-09-13 룩스테라 실환경에서 Item Directory의 실제 클래스와 메뉴 생성 경로를 추가 확인했다.

```text
CONFIG.ui.items                  -> ItemDirectory5e
ui.items.constructor             -> ItemDirectory5e
CONFIG.ui.items === ui.items.constructor -> true
ui.items._getEntryContextOptions()        -> 실제 우클릭 메뉴 옵션 배열
```

V13의 `ItemDirectory5e._getEntryContextOptions()`는 상위 클래스 옵션을 얻은 뒤 Item 전용 항목을 직접 합쳐 반환한다. 실환경에서는 모듈이 `Hooks.on("getItemDirectoryEntryContext", ...)`를 등록해도 실제 렌더된 Item Directory 우클릭 메뉴가 그 Hook을 소비하지 않았다. 따라서 해당 Hook은 구버전 호환 fallback으로만 취급한다.

또한 `ready` 시점에 이미 생성된 `ui.items` 인스턴스의 `_getEntryContextOptions()`만 래핑하면 메서드 직접 호출 결과에는 새 옵션이 보이더라도, 기존 Context Menu 인스턴스가 이전 옵션을 이미 캐시해 실제 우클릭 메뉴에는 반영되지 않을 수 있었다.

V13에서 실제로 동작한 방식은 **Context Menu 생성 전에 클래스 prototype을 조기 패치**하는 것이다.

```js
const ItemDirectoryClass = CONFIG.ui.items;
const prototype = ItemDirectoryClass?.prototype;
const original = prototype._getEntryContextOptions;

prototype._getEntryContextOptions = function(...args) {
  const options = original.apply(this, args) ?? [];
  options.push({
    name: "Nihil Workbench에서 편집",
    condition: li => Boolean(game.items.get(li.dataset.entryId)),
    callback: li => openWorkbench(li.dataset.entryId),
  });
  return options;
};
```

실제 구현에서는 다음 안전장치를 함께 사용한다.

- 기존 옵션 배열을 보존하고 새 항목만 append한다.
- `Symbol.for(...)` 마커로 중복 패치를 방지한다.
- `CONFIG.ui.items.prototype`을 우선 패치해 Context Menu 생성 전에 반영한다.
- 이미 생성된 환경을 위한 fallback으로 `ui.items` 인스턴스도 동일 로직으로 패치한다.
- Item ID는 `documentId ?? entryId` fallback으로 읽는다.
- 구버전 호환을 위해 기존 `getItemDirectoryEntryContext` Hook 등록은 유지할 수 있다.

실환경 검증 결과:

```text
보조마스터1 / GM role 4
Item: 벽력일섬
entryId: GRHni5TzCo1ffejo
실제 렌더 메뉴: Nihil Workbench에서 편집 표시됨
메뉴 클릭: Workbench 창 정상 진입
```

`CONFIG.ui.items`, `_getEntryContextOptions()`, Sidebar DOM, Context Menu 캐시 시점은 모두 공개 안정 API로 보장된 계약이 아니므로 Foundry 버전 변경 시 재검증한다.

---

## 13. Actor 복제 패턴

기존 Actor의 스탯과 Embedded Item을 그대로 복제해 변형 Actor를 만들 때 사용한 패턴:

```js
const data = sourceActor.toObject();
delete data._id;
delete data._stats;

data.name = "새 Actor";
data.folder = folderId;

const clone = await Actor.create(data);
```

생성 후 이미지·Prototype Token 이름과 경로는 명시적으로 다시 설정한다.

```js
await clone.update({
  img: fullImage,
  "prototypeToken.name": clone.name,
  "prototypeToken.texture.src": tokenImage
});
```

---

## 14. 검증 패턴

### Item 목록 검증

```js
const names = actor.items.map(i => i.name);
```

### Item 설명 검증

```js
const item = actor.items.getName("비정상적 재생");
console.log(item.system.description.value);
```

### Token 데이터 검증

```js
const token = canvas.scene.tokens.find(t => t.actorId === actor.id);
console.log({
  x: token.x,
  y: token.y,
  width: token.width,
  height: token.height,
  image: token.texture.src
});
```

### Actor system 보존 검증

```js
const before = JSON.stringify(actor.system.toObject());
// Item 또는 이미지 작업
const after = JSON.stringify(actor.system.toObject());
console.assert(before === after);
```

### 이미지 HTTP 검증

```js
const ok = await fetch(imagePath, { cache: "no-store" })
  .then(r => r.ok);
```

---

## 15. 이번 세션에서 확인된 실전 원칙

1. **World DB는 API로 수정한다.** 서버 실행 중 LevelDB 직접 수정은 피한다.
2. **이미지는 Data 상대 URL로 저장한다.** OS 파일 경로를 Document에 넣지 않는다.
3. **Actor 본체와 Embedded Item을 분리해서 생각한다.** 특수 Actor를 유지해야 할 때 Item만 추가하면 본체 `system`을 건드릴 필요가 없다.
4. **Prototype Token과 현재 Scene Token은 별개다.** Prototype을 고쳐도 이미 Scene에 존재하는 Token은 별도로 확인한다.
5. **SBI 성공은 최종 검증이 아니다.** Activity, Recharge, Save, 영어 Item 잔존을 검사한다.
6. **D&D5e 5.2.4에서는 기본 피해와 추가 피해가 서로 다른 구조에 존재할 수 있다.** `damage.base`와 Activity `damage.parts`를 함께 확인한다.
7. **모듈 Hook은 Document 위치를 바꿀 수 있다.** 예상 좌표가 달라지면 Hook을 조사하고 모듈별 bypass 옵션을 검증한다.
8. **Foundry DOM은 API가 아니다.** Context Menu처럼 DOM에 의존하는 기능은 V13 실측 결과를 기록하되 버전 변경 때 다시 확인한다.
9. **검증은 실제 World 상태를 다시 읽어 수행한다.** 생성 함수의 반환값만 믿지 않는다.

---

## 16. Item Directory 렌더·Item 생성·복제 — Verified / Observed

2026-09-13 룩스테라 실환경(Foundry VTT 13.351 / D&D5e 5.2.4)에서 다음 흐름을 직접 검증했다.

### Item Directory render Hook

Item Directory를 강제 렌더했을 때 다음 두 Hook이 실제 발생했다.

```text
renderItemDirectory5e(ItemDirectory5e, HTMLElement, Object, Object)
renderItemDirectory(ItemDirectory5e, HTMLElement, Object, Object)
```

모듈이 Item Directory footer에 UI를 추가할 때는 범용 `renderItemDirectory` Hook을 사용해 실제 `HTMLElement`에서 `.directory-footer`를 찾고 중복 여부를 확인한 뒤 버튼을 append하는 방식이 동작했다.

```js
Hooks.on("renderItemDirectory", (_app, html) => {
  const footer = html.querySelector(".directory-footer");
  if (!footer || footer.querySelector(".ncm-open-workbench")) return;
  // button 생성 및 append
});
```

Sidebar가 접혀 있을 때 Item Directory 본문은 viewport 밖에 위치할 수 있다. 실환경 검증에서는 `ui.sidebar.expand()` 후 `ui.sidebar.activateTab("items")`로 실제 가시 상태를 만들 수 있었다. 이 Sidebar 메서드는 버전 민감성이 있으므로 `Observed/Internal`로 취급한다.

### Foundry 기본 Item 생성 다이얼로그

`Item.createDialog()`가 존재하며 실제로 Foundry 기본 `아이템 만들기` Application을 연다. 이번 검증에서는 다이얼로그 표시까지만 확인했고 실제 신규 Item 저장은 수행하지 않았다.

```js
const created = await Item.createDialog();
```

Workbench에서는 생성 결과가 Item Document를 반환하는 경우 해당 `id`를 자동 선택하도록 연결했다. 반환값·취소 동작·type별 최소 생성 데이터는 이후 Item 생성 심화 단계에서 추가 검증한다.

### World Item 영속 복제

D&D5e Item 인스턴스는 `canDuplicate` getter와 `clone()`을 제공한다. 실환경에서 `canDuplicate === true`를 확인했다.

D&D5e 5.2.4의 `clone()` override는 `options.save`가 true일 때 상위 Document clone 경로를 사용한다. 다음 호출로 새 World Item이 실제 저장됐다.

```js
const clone = await item.clone(
  { name: `${item.name} (복제)` },
  { save: true }
);
```

검증 결과:

```text
원본과 복제본 ID 다름
원본과 복제본 type 동일
복제 직후 game.items 수 +1
game.items.get(clone.id)로 readback 가능
복제본 delete 후 game.items 수 원복
```

Workbench의 복제 흐름은 복제 성공 후 `selectItem(clone.id)`를 호출하여 새 복제본을 자동 선택한다.

---

## 17. Item Folder 관계와 Workbench 폴더 탐색 — Verified / Observed

2026-09-13 룩스테라 실환경에서 World Item 폴더 구조를 확인했다. 현재 Item Folder는 21개이며 최대 깊이는 3단계다. 동일한 폴더명(`01. 피트`, `02. 공격`)이 서로 다른 부모 아래 반복되므로 **이름이 아니라 Folder ID로 관계를 추적해야 한다.**

### World Item Folder 읽기

Item Folder 목록은 `game.folders`에서 `type === "Item"`으로 필터링할 수 있었다.

```js
const itemFolders = Array.from(game.folders.values())
  .filter(folder => folder.type === "Item");
```

실환경에서 다음 관계가 확인됐다.

```text
folder.id          -> 현재 Folder ID
folder.folder      -> 부모 Folder Document 또는 null
folder.folder.id   -> 부모 Folder ID
item.folder        -> Item이 속한 Folder Document 또는 null
item.folder.id     -> Item이 속한 Folder ID
```

따라서 특정 현재 폴더의 **직계 하위 폴더**와 **직계 Item**은 다음처럼 구분할 수 있다.

```js
const childFolders = itemFolders.filter(
  folder => (folder.folder?.id ?? null) === currentFolderId
);

const currentItems = Array.from(game.items.values()).filter(
  item => (item.folder?.id ?? null) === currentFolderId
);
```

`currentFolderId === null`은 루트로 취급한다.

### Breadcrumb 구성

현재 Folder에서 부모 `folder.folder`를 반복해서 따라가면 루트까지의 경로를 만들 수 있다. 순환 방지를 위해 Folder ID `Set`을 함께 사용한다.

```js
const breadcrumbs = [];
let folder = game.folders.get(currentFolderId);
const seen = new Set();

while (folder && !seen.has(folder.id)) {
  seen.add(folder.id);
  breadcrumbs.unshift({ id: folder.id, name: folder.name });
  folder = folder.folder ?? null;
}
```

Nihil Workbench는 이 구조를 사용해 트리 전체를 한 화면에 펼치지 않고, 상단 breadcrumb + 상위 이동 버튼 + 현재 폴더 직계 항목만 보여주는 탐색기 UI를 구현했다.

실환경 검증 경로:

```text
루트
→ 01. 룩스테라 관련
→ 01. 위그드라실
→ 01. 피트
→ 위그드라실의 가호
```

각 단계에서 손자 폴더는 목록에 직접 나타나지 않았고, `↑` 상위 이동과 breadcrumb의 `루트` 직접 이동도 정상 동작했다.

`game.folders`, Folder Document의 `folder` 관계, Item Document의 `folder` 관계는 Foundry Document 모델에 기반하지만 세부 형태는 버전 변화 가능성이 있으므로 Foundry/D&D5e 업그레이드 시 readback 검증한다.

### Item Folder 생성 다이얼로그

Foundry V13에서 `Folder.createDialog(data = {}, createOptions = {}, dialogOptions = {})` 시그니처를 실환경에서 확인했다. Item Directory의 기본 `폴더 만들기` 동작도 다음 데이터를 넘긴다.

```js
Folder.createDialog({
  folder: currentFolderId ?? null,
  type: "Item"
});
```

`folder`에는 부모 Folder ID를 넣고, 루트 생성은 `null`을 사용한다. `type: "Item"`으로 Item Directory Folder임을 지정한다.

Workbench의 `폴더 생성` 버튼은 이 기본 다이얼로그를 재사용한다. 생성 결과가 Folder Document를 반환하면 새 Folder ID를 `currentFolderId`로 설정하여 방금 만든 폴더로 자동 진입한다.

실환경에서는 `Folder.create({name, type: "Item", folder: parentId})`로 parent 저장을 별도 readback 검증했으며, 테스트 Folder 생성 시 Item Folder 수가 `21 → 22`, 삭제 후 `21`로 원복됐다.

---

## 18. 후속 실환경 API 조사 큐

Nihil Workbench 개발이 현재 Item 중심 범위를 지나 Actor·Spell·Class까지 확장될 때 다음 영역을 순차적으로 실환경 검증한다. 이 목록은 **조사 예정 범위**이며, 아직 검증하지 않은 경로나 메서드를 확정 API처럼 기록하지 않는다.

### Actor

- Actor 생성·복제·수정·삭제
- `system` 기본 능력치·HP·AC·이동속도·숙련·면역/저항/취약·기술 구조
- Prototype Token과 현재 Scene Token의 관계
- Embedded Item / ActiveEffect CRUD
- NPC/몬스터 CR·스탯·행동 데이터 구조
- Actor Directory Context Menu와 우클릭 진입

### Item

- Item 생성·복제·수정·삭제
- weapon / equipment / feat / consumable 등 Item type별 최소 생성 데이터
- Activity 생성·복제·삭제와 discriminator별 차이
- Damage / Uses / Recovery / ActiveEffect / target effect 구조
- Compendium Item과 World Item 사이의 복제·편집 경계

### Spell

- Spell Item 최소 생성 데이터
- 레벨·학파·준비 방식·ritual·concentration 구조
- Cast / Attack / Save / Damage / Heal Activity
- 주문 슬롯·소모·스케일링과 Activity consumption
- Spellcasting ability와 Actor roll data 연결

### Class / Subclass / Advancement

- Class·Subclass Item 최소 생성 데이터
- 레벨·Hit Dice·spellcasting 구조
- Advancement 생성·수정·삭제
- Item Grant / Scale Value / Trait / Ability Score 등 Advancement 유형
- Class ↔ Subclass 연결 방식
- 레벨 상승 시 Embedded Feature 부여 흐름

### 공통 조사 원칙

각 항목은 다음 순서로 기록한다.

1. 실제 FVTT 13.351 / D&D5e 5.2.4 World에서 최소 샘플을 생성하거나 기존 Document를 읽는다.
2. `toObject()` 저장 원본과 런타임 파생값을 분리한다.
3. 가능한 경우 Core API / System 구조 / Module API / Observed/Internal로 등급을 나눈다.
4. 최소 생성·수정 코드와 readback 검증 코드를 함께 남긴다.
5. 임시 테스트 Document는 검증 후 정리한다.
6. 버전 변화에 민감한 DOM·prototype·private/internal 경로는 명시적으로 경고한다.

이 큐는 현재 진행 중인 Nihil Workbench 기능 개발을 우선 완료한 뒤 단계적으로 소화한다.

## 19. D&D5e Item 타입·Activity·Advancement 커버리지 기준 — Verified

2026-09-13 `AI-GPT` GM 세션에서 `NCM TEST - Item Type Coverage` 폴더를 만들고 D&D5e 5.2.4 Item type별 최소 World Item을 생성해 `toObject()`와 기본 Sheet를 조사했다. 테스트 Folder ID는 `GiSH31ECzGsc4P3a`다.

런타임 type key는 `base`, `weapon`, `equipment`, `consumable`, `tool`, `loot`, `race`, `background`, `class`, `subclass`, `spell`, `feat`, `container`, `backpack`, `facility` 15개였다. 기본 `Item.createDialog()`에서 사용자가 선택 가능한 타입은 `base`를 제외한 14개였다. `base`는 전용 Sheet가 없었고, `backpack`은 생성 후 실제 World Document/Sheet에서 `container`로 정규화됐다.

현재 Workbench adapter는 공통적으로 `name / img / description / Uses / Activity 목록 / 일부 Damage / 일부 ActiveEffect`만 모델링한다. 따라서 Weapon 이외 타입도 열 수는 있지만 전체 설정을 지원한다고 볼 수 없다. 상세 요구사항 정본은 다음 문서에 기록했다.

`/shared/fvtt/nihil-compendium-module/docs/workbench/nihil-workbench-item-type-coverage-2026-09-13.md`

D&D5e 핵심 Activity discriminator는 다음 12종을 확인했다.

`attack`, `cast`, `check`, `damage`, `enchant`, `forward`, `heal`, `order`, `save`, `summon`, `transform`, `utility`

현재 World에는 외부 모듈이 등록한 것으로 보이는 `ddbmacro` Activity type도 추가로 존재한다. 외부 discriminator는 D&D5e 핵심 지원과 분리하고 원본 보존 + fallback 원칙을 적용한다.

Advancement type은 다음 8종을 확인했다.

`AbilityScoreImprovement`, `HitPoints`, `ItemChoice`, `ItemGrant`, `ScaleValue`, `Size`, `Subclass`, `Trait`

Class / Background / Race / Subclass / Feat 완전 지원을 위해 Advancement editor가 독립 서브시스템으로 필요하다.

개발 원칙은 "설정 항목을 줄이는 간편화"가 아니라 "기본 Sheet의 의미 있는 설정을 모두 유지하면서 더 빠르게 편집하는 간편화"로 확정한다.

## 20. World Folder 변경 Hook과 열린 Workbench 동기화 — Verified

2026-09-13 Foundry V13 실환경에서 Item Folder 생성 시 `createFolder` Hook이 발생하는 것을 Workbench 동기화에 사용했다.

```js
Hooks.on("createFolder", folder => {
  if (folder?.type === "Item") refreshWorkbench();
});
```

`refreshWorkbench()`는 Workbench singleton이 존재하고 닫힌 상태가 아닐 때 `render({ force: true })`를 호출한다. Workbench가 열려 있지 않으면 아무 작업도 하지 않는다.

AI-GPT 실환경에서 Workbench를 열어 둔 상태로 `Folder.create({ name, type: "Item", folder: null })`를 실행했을 때 새 Folder가 Workbench Browser에 자동 반영됨을 확인했다. 테스트 Folder는 즉시 삭제했다.

Folder rename/move/delete 및 Item create/update/move/delete는 별도 backlog `SYNC-002`, `SYNC-003`으로 추적하며 각각 Hook 시그니처와 상태 복구 규칙을 검증한다.

## 21. Folder update/delete Hook과 현재 Folder 상태 복구 — Verified

Foundry V13에서 다음 Hook 시그니처를 실환경 확인했다.

```js
Hooks.on("updateFolder", (folder, changes, options, userId) => {});
Hooks.on("preDeleteFolder", (folder, options, userId) => {});
Hooks.on("deleteFolder", (folder, options, userId) => {});
```

`updateFolder`는 변경 후 Folder 상태를 전달하므로 rename/move는 열린 Workbench 재렌더만으로 breadcrumb가 갱신됐다. `preDeleteFolder`에서는 삭제 전 `folder.folder?.id`로 parent ID를 확보할 수 있었다. 이를 Map에 저장한 뒤 `deleteFolder`에서 현재 Workbench Folder와 삭제 Folder ID가 같으면 저장한 parent로 `currentFolderId`를 전환하고 재렌더한다. 루트 직계 Folder의 parent는 `null`이므로 루트로 복귀한다.

AI-GPT E2E에서 `rename → move → delete` 순으로 검증했으며, 삭제 시 이동 후의 부모 Folder로 정확히 복귀했다.

## 22. World Item 변경 Hook과 열린 Workbench 동기화 — Verified

Foundry V13에서 World Item 변경 동기화에 `createItem`, `updateItem`, `deleteItem` Hook을 사용했다.

```js
Hooks.on("createItem", item => refreshWorkbench());
Hooks.on("updateItem", item => syncUpdatedItem(item));
Hooks.on("deleteItem", item => refreshWorkbench());
```

선택 중인 Item이 외부에서 다른 Folder로 이동된 경우 `updateItem`에서 `item.folder?.id`를 새 `currentFolderId`로 사용해 Browser가 선택 Item을 따라가도록 했다. 선택 Item이 삭제되면 재렌더 과정에서 Item lookup이 실패하므로 선택을 해제하고 현재 Folder는 유지한다.

AI-GPT E2E에서 Item 생성, 이름 변경, Folder 이동, 삭제를 순서대로 검증했다.

## 23. D&D5e Item Source / Identifier / Identification 스키마 — Verified

D&D5e 5.2.4 Item의 `system.source` 공통 스키마는 `book`, `page`, `custom`, `license`, `revision`, `rules` 6필드이며, `system.identifier`가 별도 공통 필드로 존재한다. Native `Configure Source` UI에서 이 7개를 모두 사용자 편집 가능 항목으로 노출함을 확인했다. `rules` 값은 빈 값, `2024`, `2014`를 사용한다.

Workbench에서는 source 객체 전체를 교체하지 않고 `system.source.<field>` dotted path만 update하여 알 수 없는/향후 확장 필드를 보존한다.

Identification은 `weapon`, `equipment`, `consumable`, `tool`, `loot`, `container` 계열에서 `system.identified`와 `system.unidentified`를 제공한다. `system.unidentified` schema는 `name`, `description` 두 필드다. Spell/Class/Race/Feat/Facility 등에는 identification field 자체가 없으므로 Workbench도 조건부로 UI와 update path를 제공한다.

AI-GPT 실환경에서 Weapon Fixture 저장/readback/원복 및 Spell 비노출을 확인했다.

## 24. D&D5e Item Inventory / Economy / Attunement 스키마 — Verified

물리 Item 계열 `weapon`, `equipment`, `consumable`, `tool`, `loot`, `container`에서 `quantity`, `weight`, `price`, `rarity`, `container` 공통 필드를 확인했다. `container`는 nullable `ForeignDocumentField`이며 World Item에서는 Container Item ID가 저장된다. `Item.<id>` UUID를 입력해도 D&D5e가 ID로 정규화했다.

`weight`는 `value`와 `units`를 가지며 현재 `CONFIG.DND5E.weightUnits`는 `lb`, `tn`, `kg`, `Mg`를 제공한다. `price`는 `value`와 `denomination`을 가지며 currency key는 `pp`, `gp`, `ep`, `sp`, `cp`다. `rarity`는 `common`, `uncommon`, `rare`, `veryRare`, `legendary`, `artifact`를 사용한다.

장착/조율 필드는 `weapon`, `equipment`, `consumable`, `tool`, `container`에서 `equipped`, `attunement`, `attuned`로 확인됐다. Loot에는 Inventory/Economy는 있으나 장착/조율 필드는 없다. `CONFIG.DND5E.attunementTypes`는 `required`, `optional`을 제공하며 빈 문자열은 조율 없음으로 사용된다.

Workbench는 각 필드의 dotted path만 부분 update하며, 지원하지 않는 Item 타입에는 해당 UI와 update path를 만들지 않는다. Weapon Fixture 저장/readback/원복과 Spell/Loot 비지원 UI 미노출을 AI-GPT 실환경에서 검증했다.

## 25. D&D5e Item Uses / Recovery 및 Item createDialog Folder 기본값 — Verified

D&D5e 5.2.4 Item의 `system.uses.max`는 `FormulaField`이므로 숫자로 강제 변환하면 `@prof` 같은 유효 수식이 손실된다. Workbench에서는 source 문자열을 그대로 읽고 저장한다. `system.uses.recovery`는 복수 배열이며 각 entry는 `period`, `type`, `formula`를 사용한다. Recovery type은 `recoverAll`, `loseAll`, `formula` 3종이다. period는 `lr`, `sr`, `day`, `dawn`, `dusk`, `initiative`, `turnStart`, `turnEnd`, `turn`에 특수 `recharge`가 추가된다.

`recharge` recovery는 시스템 준비 단계에서 type이 `recoverAll`로 정규화되며 formula는 재충전 기준값으로 사용된다. Native Uses UI와 동일하게 Workbench도 복수 Recovery 행 추가/삭제를 제공하고, recharge에서는 type을 `recoverAll`로 강제한다. Consumable의 Uses schema에는 `autoDestroy`가 추가되며 해당 필드가 존재하는 Item에서만 UI를 노출한다. AI-GPT 실환경에서 Weapon `max=@prof`, `sr + recharge` 복수 recovery 저장/readback/원복과 Consumable `autoDestroy` 저장/readback/원복을 확인했다.

Foundry V13 `Item.createDialog(data, createOptions, dialogOptions)`는 첫 번째 `data.folder`에 Folder ID를 전달하면 생성 다이얼로그의 초기 Folder 선택값으로 사용한다. Workbench의 Item 생성은 `Item.createDialog({ folder: currentFolderId })` 형태로 구현했으며, `NCM TEST - Item Type Coverage` Folder에서 다이얼로그의 `select[name=folder]` 값이 실제 Folder ID와 일치함을 AI-GPT 실환경에서 확인했다.

## 26. D&D5e Schema-driven Item Type Field 편집 — Verified

D&D5e 5.2.4의 `item.system.schema.fields`는 Item type별 source DataField 구조를 런타임에 제공한다. Workbench는 이를 재귀 탐색하여 공통 Core, `activities`, `advancement`를 제외한 직접 Item 본체 필드를 자동 편집한다. `SchemaField` 계열은 하위 필드로 재귀 전개하고 Boolean/Number/String/Formula 계열은 직접 컨트롤로, Set/Array/Mapping 같은 복합 구조는 JSON fallback으로 편집한다.

이 구조는 Weapon부터 Facility까지 13개 사용자 편집 계열과 Container/Backpack alias에 적용 가능하다. AI-GPT 실환경에서 각 타입 Fixture를 Workbench UI로 변경하고 `toObject()` readback 후 원복하는 E2E를 순차 통과했다. Container `currency` MappingField도 JSON 편집 및 원복을 확인했다.

Activity와 Advancement는 source schema에 존재하지만 각각 독립 서브시스템이므로 schema-driven Type Editor에서는 제외하고 `ACT-*`, `ADV-*` 전용 adapter가 소유한다.

## 27. D&D5e Activity CRUD·Schema·외부 Fallback — Verified

D&D5e 5.2.4 Item의 `system.activities`는 `ActivityCollection`이며 Activity는 PseudoDocument 계열 Document로 `update()`, `delete()`, `clone()`을 제공한다. Item은 `createActivity(type, data, options)`, `updateActivity(id, updates)`, `deleteActivity(id)`를 제공한다. Workbench 생성은 `item.createActivity(type, data, { renderSheet: false })`를 사용하며 생성 전후 Activity ID를 비교해 새 문서를 찾는다.

Native Item Sheet의 복제 방식과 동일하게 source `toObject()`에서 `_id`를 제거한 뒤 같은 discriminator로 `createActivity()` 하면 현재 `CONFIG.DND5E.activityTypes[type].documentClass`가 사용된다. 따라서 Midi-QOL처럼 Activity class를 확장한 환경에서도 subclass와 확장 source가 유지된다. AI-GPT 실환경에서 `MidiAttackActivity`를 복제해 `midiProperties`와 추가 확장 필드 보존을 확인했다.

생성 가능한 discriminator 선택지는 `CONFIG.DND5E.activityTypes`에서 `configurable !== false`이며 `documentClass.availableForItem(item)`이 허용하는 항목만 사용한다. `OrderActivity`는 `order` 필드가 필수이며 D&D5e 5.2.4의 Facility 구현에서 파생 생성되는 ephemeral Activity다. 시스템 소스에도 user-creatable/configurable 전환이 TODO로 남아 있고 현재 `availableForItem()`은 신규 생성 경로를 허용하지 않는다. Workbench는 이 Native 계약을 존중해 Order를 신규 생성 목록에 강제 노출하지 않고 기존 Facility OrderActivity 편집만 지원한다.

D&D5e 본체 12종 Activity 클래스는 `dnd5e.documents.activity` namespace의 `metadata.type`으로 식별할 수 있다. Workbench는 native schema에서 공통 root를 제외한 discriminator root를 가져오고, 실제 선택된 subclass schema로 세부 Field를 재귀 렌더한다. 핵심 discriminator는 `attack`, `cast`, `check`, `damage`, `enchant`, `forward`, `heal`, `order`, `save`, `summon`, `transform`, `utility`다. 12종 모두 실환경 렌더와 no-op source 보존을 검증했다.

공통 Activity root는 `activation`, `consumption`, `description`, `duration`, `effects`, `flags`, `range`, `target`, `uses`, `visibility`이며 런타임에 존재하는 조건·macro 확장 필드는 조건부로 함께 편집한다. 변경된 dotted path만 `activity.update()`에 전달한다. Custom Field라도 source 값이 Array/Object/Set/Map이면 JSON 구조로 판정하고, null/undefined source의 빈 값·unchecked Boolean은 no-op으로 처리해 시스템 기본값을 불필요하게 materialize하지 않는다.

외부 discriminator는 전용 schema를 추측하지 않는다. 공통 필드는 안전하게 편집하고 전체 source JSON을 읽기 전용으로 표시하며 `activity.sheet`를 여는 고급 편집 fallback을 제공한다. 현재 등록된 외부 `ddbmacro`의 `MacroActivity`를 임시 생성하여 raw source 보존과 Sheet fallback을 E2E로 확인했다.

## 28. Nihil Workbench 목적별 Activity 빠른 추가 — Verified

D&D5e 5.2.4 + Midi-QOL 환경에서 일반적인 Activity 편집은 내부 schema를 직접 다루지 않고 목적별 상위 UI로 처리할 수 있다. Workbench는 `추가 피해`, `회복 효과`, `내성 공격`, `상태 효과`를 한국어 빠른 추가 경로로 제공하고, 기존 schema-driven editor는 특수 필드와 외부 모듈 호환을 위한 `고급 Activity 설정`으로 유지한다.

`추가 피해`는 선택된 `attack`/`damage`/`save` Activity의 기존 `damage.parts` 배열을 보존한 채 새 DamageField source 한 행만 append한다. 따라서 사거리·대상·범위는 기존 Activity 값을 상속한다. AI-GPT E2E에서 기존 0행 → `2d6 + 1` fire 1행 추가를 확인한 뒤 원복했다.

`회복 효과`는 `heal` Activity를 생성하며 사용자 입력을 `range`, `target`, `healing.custom.formula`, `healing.types`로 매핑한다. E2E에서 60ft, 아군 2명, 10ft circle, `2d8 + 3` healing 저장/readback/삭제를 확인했다.

`내성 공격`은 `save` Activity를 생성하며 `range`, `target`, `damage.parts`, `damage.onSave`, `save.ability`, `save.dc`만 일반 UI에서 입력한다. E2E에서 150ft, 15ft circle, fire `7d6`, DEX DC17, 성공 시 half 저장/readback/삭제를 확인했다.

`상태 효과`는 선택 Activity에 연결되는 Item ActiveEffect를 생성한다. E2E에서 poisoned, 2 rounds 효과 생성과 Activity effect reference 연결을 확인한 뒤 삭제했다.

사용자 표시명은 한국어를 우선한다. Activity type은 `공격`, `피해`, `회복`, `내성 굴림` 등으로 표시하며 고급 schema root도 `발동`, `사거리`, `대상 / 범위`, `피해`, `내성 굴림`, `회복`, `소모` 등으로 표시한다. 실제 내부 path는 디버깅/호환성 확인을 위해 보조 텍스트로 유지한다.

상세 사용자 가이드는 모듈 저장소의 `docs/workbench/nihil-workbench-user-guide-ko.md`에 기록한다.

## 29. 문서 갱신 규칙

다음 조건에서 이 문서를 갱신한다.

- FVTT Core 버전이 변경되어 기존 호출이 달라진 경우
- D&D5e 시스템 버전 변경으로 Actor/Item/Activity 스키마가 달라진 경우
- 신규 모듈 API를 실제 World에서 검증한 경우
- 반복 사용할 만한 안전한 CRUD/자동화 패턴을 새로 확인한 경우
- 기존에 `Observed/Internal`로 기록한 사항이 공식 API로 대체된 경우
- 기존 기록이 틀렸거나 버전 변화로 더 이상 유효하지 않음이 확인된 경우

추측 단계의 API, 한 번도 실행하지 않은 코드, 웹에서 본 예시만으로는 이 문서의 검증된 항목에 추가하지 않는다.
