# 룰북 PDF 원본 전환 문서 정합성 정비 검증 보고서

## 판정 결과

- 판정: 통과
- 검증일: 2026-09-08
- 범위: 룰북 원본 파일 집합, 신규·교체 PDF 24개, 소유 목록·NotebookLM 레지스트리·검증 현황·작업 추적 문서
- 결론: `0. 룰북`의 고유 PDF 원본 148개가 두 활성 레지스트리와 파일별 검증 표에 모두 연결되며, 룰북 원본 Markdown 참조는 활성 소스 표에서 제거되었다.

## 원본 파일 검증

- `0. 룰북` 직계 파일: PDF 148개, Markdown 0개
- `0. 룰북/문서`: 운영 지침·레지스트리·양식 Markdown 16개. 룰북 원본 집계에서는 제외한다.
- 마스터 지정 신규·교체 PDF: 24개
- 다운로드 원본과 `0. 룰북` 저장본의 파일 크기·SHA-256 일치: 24/24
- PDF 열기 성공: 24/24
- 암호화 파일: 0개
- 확인한 전체 페이지 수: 4,458쪽

| 논리 묶음 | 파일 수 | PDF 페이지 수 | 경계 표본 결과 |
| --- | ---: | --- | --- |
| Explorer's Guide to Wildemount | 2 | 300 + 294 | 1번 말미의 Character Options 도입에서 2번 본문으로 이어짐 |
| Strixhaven: A Curriculum of Chaos | 2 | 216 + 194 | 1번 후반부에서 2번의 The Magister’s Masquerade 구간으로 이어짐 |
| Mordenkainen Presents: Monsters of the Multiverse | 2 | 317 + 259 | 1번 Bestiary K 구간에서 2번 Bestiary L 구간으로 이어짐 |
| Spelljammer: Adventures in Space | 1 | 204 | Astral Adventurer's Guide p.3, Boo's Astral Menagerie p.69, Light of Xaryxis p.135 시작 확인 |
| Bigby Presents: Glory of the Giants | 2 | 159 + 181 | 1번 Giant Enclaves 뒤 2번 Giant Treasures로 이어짐 |
| The Griffon’s Saddlebag: Book Two | 4 | 246 + 195 + 155 + 163 | Magic Items, 세계·지역, 부록 스탯블록 순서의 분할 경계 확인 |
| Dungeon Master’s Guide | 3 | 256 + 277 + 112 | The Basics·Running the Game, Campaigns·Cosmology·Magic Items, Bastions 순서 확인 |
| Lorwyn: First Light | 1 | 64 | Lorwyn-Shadowmoor 소개부터 Credits까지 확인 |
| Monster Manual | 4 | 148 + 167 + 193 + 203 | A, D, L, T 알파벳 구간 시작과 최종 Credits 확인 |
| Netheril’s Fall | 1 | 86 | Introduction부터 Bestiary·Credits까지 확인 |
| Arcana Unleashed Play-Along Pack | 1 | 65 | Introduction과 레벨 6 조우 시작 확인 |
| Deadfall Press Play-Along Pack | 1 | 4 | Thay 지역 레벨 6 모험 전체 구간 확인 |

이 검사는 파일 무결성·열기 가능 여부·분할 및 합본 경계를 확인한 것이다. 24개 PDF의 모든 규칙·데이터를 전 페이지 단위로 검증한 것은 아니므로 해당 룰북의 `원본 확인`은 모두 기존 `N` 상태를 유지한다.

## 논리 룰북과 실제 파일 관계

| 논리 항목 | 현재 실제 파일 관계 |
| --- | --- |
| Baldur’s Gate Gazetteer | `Baldur’s Gate - Descent into Avernus.pdf` 내부 수록 |
| Explorer's Guide to Wildemount | Wildemount 1·2번 분할 PDF |
| Frozen Sick | Wildemount 1·2번 분할 PDF 내부 수록 |
| Strixhaven: A Curriculum of Chaos | Strixhaven 1·2번 분할 PDF |
| The Astral Adventurer's Guide | `Spelljammer - Adventures in Space.pdf` 내부 수록 |
| Boo's Astral Menagerie | `Spelljammer - Adventures in Space.pdf` 내부 수록 |
| Light of Xaryxis | `Spelljammer - Adventures in Space.pdf` 내부 수록 |
| Mordenkainen Presents: Monsters of the Multiverse | 1·2번 분할 PDF |
| Bigby Presents: Glory of the Giants | 1·2번 분할 PDF |
| The Griffon’s Saddlebag: Book Two | 1·2·3·4번 분할 PDF |
| Dungeon Master’s Guide | 1·2·3번 분할 PDF |
| Lorwyn: First Light | 단일 PDF |
| Monster Manual | 1·2·3·4번 분할 PDF |
| Netheril’s Fall | 단일 PDF |

## 문서 수정 범위

1. `1. 프롬프트/4. 룰북 관련 요청 프롬프트/9999. D&D 룰북 소유 리스트.md`
2. `0. 룰북/문서/00. NotebookLM 룰북 데이터 작업 마스터 지침.md`
3. `0. 룰북/문서/01. 룰북 목록 및 소스 파일 레지스트리.md`
4. `0. 룰북/문서/02. 공통 인덱싱 및 출처 표기 지침.md`
5. `작업 정비/룰북 인덱싱 및 FVTT 컴펜디움 이관 체계/FVTT 룰북 검증 및 갱신 현황.md`
6. `작업 정비/룰북 인덱싱 및 FVTT 컴펜디움 이관 체계 정비.md`
7. `작업 정비/작업 정비 현황.md`
8. `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`
9. `docs/superpowers/plans/2026-09-08-rulebook-pdf-source-reconciliation.md`

## 정적 검증 결과

- 소유 목록 PDF 고유 참조: 148개
- NotebookLM 레지스트리 PDF 고유 참조: 148개
- 파일별 검증 표 PDF 고유 참조: 148개
- 세 문서의 실제 폴더 미연결 PDF: 0개
- 세 문서의 존재하지 않는 PDF 참조: 0개
- 소유 목록과 NotebookLM 레지스트리의 논리 항목 행: 각각 110개, 본문 행 일치
- 주분류 논리 항목: 데이터북 35권, 시나리오북 39권, 설정북 22권, Beyond 비교 전용 14개
- 파일별 검증 행: 데이터북 54행, 시나리오북 58행, 설정북 40행, Beyond 비교 전용 14행, 합계 166행
- 상태 합계: `Y 17 / N 149`
- 실제 파일 없음: 13행
- 활성 소스 표의 제거된 룰북 원본 Markdown 참조: 0건
- 삭제된 Google Sheet URL의 현행 대조 원본 참조: 0건
- `git diff --check`: 오류 0건

## 남은 위험

- NotebookLM에 현재 PDF 148개와 운영 문서 16개가 실제로 모두 등록되어 있는지는 이번 로컬 작업에서 검증하지 않았다.
- 신규·교체 PDF 24개는 파일 경계와 대표 텍스트만 확인했으며 전 페이지 데이터 검증은 수행하지 않았다.
- `원본 확인 N`과 미작성 상세 인덱스는 각 룰북의 후속 전 페이지 검증 때 갱신해야 한다.
- `Baldur’s Gate Gazetteer`, Wildemount 두 논리 항목, Spelljammer 세 논리 항목은 공유 PDF를 사용하므로 검증 행 166개와 고유 PDF 148개를 혼동하면 안 된다.

## 다음 재개 지점

- 데이터북: `Spelljammer - Adventures in Space.pdf`의 Boo's Astral Menagerie 구간을 전 페이지 대조하고 8번 상세 인덱스를 작성한다.
- 시나리오북: Tomb of Annihilation 원본 검증을 재개한다.
- 설정북: Guildmasters’ Guide to Ravnica 원본 검증을 재개한다.
