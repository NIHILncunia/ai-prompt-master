# 주문(spell) 템플릿

TRPG 데이터 / D&D 5.5E 추가 주문 작성 지침서

*(Obojima - Tales from the Tall Grass 및 기타 룰북 주문 추출·제작용)*

## 1. 목적

- Obojima 등 서드파티 룰북의 주문을 완전히 동일한 형식으로 추출
- 신규 커스텀 주문을 제작할 때 동일 양식 사용
- FVTT import 및 [D&D 5.5E 추가 주문 모음] 문서에 바로 복사·붙여넣기 가능하도록 표준화

## 2. 주문 데이터 템플릿 (반드시 이 양식 그대로 사용)

```text
Spell Name
Level-level school (Class1, Class2, Class3...)
Casting Time: X action
Range: Y feet / Self / Touch
Components: V, S, M (material description)
Duration: Z (concentration, up to 1 minute)
[주문 설명 본문. 필요 시 여러 문단으로 작성]
At Higher Levels. [상위 슬롯 사용 시 효과 설명]
```

## 3. 작성 규칙 (반드시 준수)

### 1. Spell Name

- 영문 원문 그대로 볼드 처리
- 한글 번역은 필요 시 주석으로 별도 추가 (본문에는 영문만)

### 2. Level-level school (클래스 목록)

- Level: 1st-level, 2nd-level … 9th-level
- school: conjuration, evocation 등 소문자
- 클래스: 원문 순서 또는 알파벳 순으로 나열

### 3. Casting Time / Range / Components / Duration

- 영문 원문 그대로 기입
- M 재료에 가치(gp)가 있으면 반드시 명시 (예: a pearl worth 100 gp)

### 4. 설명 본문

- 원문 의미를 최대한 그대로 유지하면서 자연스럽게 다듬음
- “이 크리처” 표현 사용 금지 (주문은 플레이어 관점)

### 5. At Higher Levels.

- 상위 슬롯 효과가 있으면 반드시 별도 단락으로 작성
- 없으면 해당 단락 자체 삭제

### 6. 기타 규칙

- Concentration이면 Duration에 (concentration, up to X) 형식 명시
- Obojima 주문은 원서의 모든 세부 사항(angelic arrow, force damage 등) 그대로 반영
- Wotan’s Retribution 주문은 절대 포함하지 않음

## 4. 예시 (완벽 준수 양식)

```text
Armament
1st-level conjuration (Bard, Cleric, Paladin, Ranger, Wizard)
Casting Time: 1 action
Range: 10 feet
Components: V, S, M (metal powder)
Duration: 8 hours
Up to five simple or martial weapons of your choice materialize in an unoccupied space you can see within range. The weapons are nonmagical, but they are well-made and stylistically look however you would like. The weapons vanish when the spell ends.
At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can summon three additional simple or martial weapons of your choice for each slot level above 1st.
```

```text
Divine Arrow
7th-level evocation (Bard, Cleric, Warlock)
Casting Time: 1 action
Range: 120 feet
Components: V, S, M (a pearl worth 100 gp)
Duration: concentration, up to 1 minute
You fire an angelic arrow from a bow made of light that materializes in your hands. Make a ranged spell attack against a creature within range. On a hit, the target takes 4d10 force damage, and until the spell ends, it becomes vulnerable to one of the following damage types of your choice: acid, cold, fire, lightning, necrotic, radiant, or thunder. If a creature has immunity to the selected damage type, it instead has resistance to that type for the duration; if a creature has resistance to the selected damage type, it loses that resistance for the duration.
```
