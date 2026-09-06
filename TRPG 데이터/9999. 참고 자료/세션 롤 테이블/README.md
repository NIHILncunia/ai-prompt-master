# TRPG 세션 정보 생성기 최종 롤테이블

작성일: 2026-07-09

이 패키지는 지금까지 확정한 요구사항을 모두 반영한 최종 정리본입니다.  
JSON 중심이 아니라 사람이 읽기 쉬운 Markdown / TSV / TXT 리스트 중심으로 구성했습니다.

## 최종 UI 출력 필드

세션 생성 결과는 아래 6개만 표시합니다.

1. 의뢰 대분류: 민간 의뢰 / 연맹 의뢰
2. 의뢰 종류: 연맹은 개척자 / 해결사 / 사냥꾼, 민간은 생활형 분류
3. 의뢰인
4. 의뢰 사유: 문장이 아니라 단어 토큰 배열
5. 테마
6. 등장 예시 몬스터: `<D&D 14 유형> 몬스터`

후킹 포인트, 진행 이유, 비밀, 상세 설계 문장은 기본 출력에서 제외합니다.

## 핵심 개편 사항

- `기밀`은 모험가 분류가 아니라 연맹 의뢰의 보안 등급입니다.
- 연맹 의뢰의 의뢰인은 민간인이 아니라 탐사, 마법, 기록, 관측, 발굴, 정제, 봉인, 던전 관리와 연계된 존재입니다.
- 엘프와 드워프는 종족 자체가 탐사 연관성이 강하므로 연맹 의뢰자 풀에 적극 반영합니다.
- 민간 의뢰는 공식 공고 유형을 따르지 않습니다. 생계와 생활 문제를 대신 부탁하는 사적 의뢰입니다.
- 의뢰 사유는 반드시 문장형이 아니라 단어 배열로 처리합니다.
- 개척자 의뢰는 `앙그라의 안개권 공식 탐사 공고`로 별도 묶음 처리합니다.
- 사냥꾼은 문명권 내 몬스터 대응 계열입니다. 던전 내부 개체, 필드 잔향 오염 생물, 일반 짐승 대응을 모두 포함합니다.

## 파일 구성

- `docs/FINAL-SPEC.md`: 최종 설계 문서
- `lists/league-requesters.md`: 연맹 의뢰자 60개
- `lists/civilian-requesters.md`: 민간 의뢰자 60개
- `lists/commission-modes.md`: 의뢰 대분류
- `lists/monster-types-dnd14.md`: D&D 14 유형 몬스터 목록
- `lists/themes.md`: 테마 목록
- `lists/terrain.md`: 지형 목록
- `tables/league-notice-token-mapping.md`: 연맹 공고 유형별 의뢰 사유 토큰 매핑
- `tables/league-notice-token-mapping.tsv`: 웹앱 가공용 TSV
- `tables/civilian-token-mapping.md`: 민간 의뢰 분류별 의뢰자/사유 토큰 매핑
- `tables/civilian-token-mapping.tsv`: 웹앱 가공용 TSV
- `tables/session-output-examples.md`: 최종 UI 출력 예시
