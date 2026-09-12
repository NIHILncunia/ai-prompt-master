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

## 16. 문서 갱신 규칙

다음 조건에서 이 문서를 갱신한다.

- FVTT Core 버전이 변경되어 기존 호출이 달라진 경우
- D&D5e 시스템 버전 변경으로 Actor/Item/Activity 스키마가 달라진 경우
- 신규 모듈 API를 실제 World에서 검증한 경우
- 반복 사용할 만한 안전한 CRUD/자동화 패턴을 새로 확인한 경우
- 기존에 `Observed/Internal`로 기록한 사항이 공식 API로 대체된 경우
- 기존 기록이 틀렸거나 버전 변화로 더 이상 유효하지 않음이 확인된 경우

추측 단계의 API, 한 번도 실행하지 않은 코드, 웹에서 본 예시만으로는 이 문서의 검증된 항목에 추가하지 않는다.
