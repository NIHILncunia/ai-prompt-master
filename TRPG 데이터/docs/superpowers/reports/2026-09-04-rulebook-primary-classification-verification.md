# 룰북 주분류·분리 테이블 전환 검증 보고서

## 검증 결과

- 결과: 통과
- 검증일: 2026-09-04
- 대상: 소유 목록, 원본 검증 현황, 활성·아카이브 상세 인덱스, 4번 룰북 기능 문서, 작업 정비·대시보드·Superpowers 문서
- 방식: Git 저장소가 아니므로 로컬 Python 정적 검사와 PowerShell 파일·SHA-256 검사를 사용했다.

## 논리 룰북과 표 구조

| 구분 | 수량 | 결과 |
| --- | ---: | :---: |
| 데이터북 | 35 | 통과 |
| 시나리오북 | 37 | 통과 |
| 설정북 | 22 | 통과 |
| 수집 룰북 합계 | 94 | 통과 |
| Beyond 비교 전용 | 14 | 통과 |

- 수집 룰북 94권은 세 주분류에 정확히 한 번씩만 등장한다.
- Beyond 비교 전용 14개는 수집 룰북 집계와 겹치지 않는다.
- 소유 목록의 세 주분류 표는 각 7열, 비교 전용 표는 3열로 일치한다.

## 실제 파일 검증 상태

| 구분 | 실제 파일 행 | Y | N |
| --- | ---: | ---: | ---: |
| 데이터북 | 44 | 2 | 42 |
| 시나리오북 | 54 | 8 | 46 |
| 설정북 | 39 | 2 | 37 |
| Beyond 비교 전용 | 14 | 0 | 14 |
| 합계 | 151 | 12 | 139 |

- 실제 파일 없음은 13행으로 유지됐다.
- 소유 목록의 실제 파일명과 진행 현황의 실제 파일 행을 전수 대조했다.
- 소유 목록의 `원본 확인`은 대응 실제 파일 행이 전부 `Y`일 때만 `Y`다.
- 시나리오북·설정북의 검증 완료 행은 장르·핵심 주제·확인된 데이터 유형이 모두 채워져 있다.
- 미검증 시나리오북·설정북의 장르·핵심 주제는 `-`로 유지하고, 기존 데이터 유형은 `기존 목록 기준 —`으로 검증 결과와 구분했다.

## 상세 인덱스

- 데이터북 상세 인덱스 진행표는 1~35번이 연속이며 데이터북 표 순서와 일치한다.
- 완료 상태는 `Y 2 / N 33`이다.
- 활성 파일은 다음 2개뿐이며 파일명과 문서 제목이 일치한다.
  - `1. D&D 5e 2016 Volo's Guide to Monsters.md`
  - `2. D&D 5e 2017 One Grung Above.md`
- 다음 데이터북 상세 인덱스는 `3. D&D 5e 2017 Xanathar's Guide to Everything.md`다.

## 아카이브 무결성

비데이터북 상세 인덱스 9개를 다음 경로에 보존했다.

`작업 정비/정비 아카이브/룰북 인덱싱 및 FVTT 컴펜디움 이관 체계/룰북별 데이터 위치 인덱스/`

| 파일 | SHA-256 |
| --- | --- |
| `1. D&D 5e 2014 Lost Mine of Phandelver.md` | `DDB8F0C81D439CBCF647DBF692A5D56803490CDBEB1BE3012A2A73A16EEFC0D2` |
| `2. D&D 5e 2014 Tyranny of Dragons.md` | `0E6F16536529E6D878FC182B3833A507A603D61CC523D67A1551412D22096724` |
| `3. D&D 5e 2015 Out of the Abyss.md` | `68CC0EC1D743849362C59B3196B886D6BE910FCEE01EC7A0E710C6F275117EB8` |
| `4. D&D 5e 2015 Princes of the Apocalypse.md` | `2E22244E747EAECA763C478C1D3F1116DA3A7B61B0FFD85D88A03D5C9F8D1368` |
| `5. D&D 5e 2015 Sword Coast Adventurer's Guide.md` | `85871507F1222E3181BA4DDEFC0799DD2F27B414989B80A1833C5E9F17F26C23` |
| `6. D&D 5e 2016 Curse of Strahd.md` | `C8E3C8CE1F9D8C7A6B012208B00D08ADA2422AC7E3EF88AA1006880886CEA273` |
| `7. D&D 5e 2016 Storm King's Thunder.md` | `176AE772FD05BB46C4819A1EA8F662359511AD9B73CCDE57B8F8996036EEFB09` |
| `10. D&D 5e 2017 Tales from the Yawning Portal.md` | `4CF9E381115361FC24DC4FC4A404ABBA42EBAEBC6738A2E5EEB3F664044B4521` |
| `11. D&D 5e 2017 The Tortle Package.md` | `A9607FE70E15AD0F154C484A54B4088C9C4E7CAE4EA2A8A21331A4142F9DAC63` |

## 진행 지점 동기화

- 데이터북: `D&D 5e 2017 Xanathar's Guide to Everything`
- 시나리오북: `D&D 5e 2017 Tomb of Annihilation`
- 설정북: `D&D 5e 2018 Guildmasters’ Guide to Ravnica`
- 소유 목록, 진행 현황, 작업 정비 본문, 대시보드, 4번 기능 문서, Superpowers 레지스트리를 같은 기준으로 동기화했다.

## 형식 검사

- 정적 검사: 44개 검증 항목 통과, 실패 0개
- Markdown 표 열 수: 통과
- 수집 룰북·실제 파일 행 중복: 없음
- 후행 공백: 없음
- 충돌 표식: 없음
- 활성 인덱스 번호·파일명·제목: 통과

## 범위 확인

- 원본 PDF·Markdown 룰북은 수정하지 않았다.
- FVTT Pack·모듈 저장소는 수정하지 않았다.
- 웹검색과 Google Drive 커넥터는 사용하지 않았다.
- 전환 검증을 위한 임시 스크립트는 Drive 밖의 `%LOCALAPPDATA%\Temp`에서 실행했다.

## 남은 작업

주분류·분리 테이블 전환 단위는 완료됐다. 장기 원본 검증 작업은 분류별 현재 대상에서 독립적으로 이어간다.
