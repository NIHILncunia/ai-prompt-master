# Google Sheets Markdown 전환 검증 보고서

## 검증 개요

- 작업일: 2026-09-06
- 대상: 작업 폴더의 Google Sheets 4개
- 결과: 통과
- 미결: 없음

## 원본 구조와 전환 결과

| 원본 | 원본 ID | 사용 범위 | 전환 결과 | 결과 ID | 행렬 대조 |
| --- | --- | --- | --- | --- | --- |
| 클래스 / 서브클래스 한글화 매핑 | `1NkVaxALD310uG7rh1mx1k5Q23L3tjIm07UQBCOiFiTw` | `시트1!A1:E341` | `4. 한글화/클래스   서브클래스 한글화 매핑.md` | `1NP4fuxnmydYO-SGF9IVmDhilnKnlkZZd` | 341행 일치 |
| D&D 5.5E 추가 주문 모음 | `1khXljo6hUtFxYCgb0uIzcvyDt6zLdIhEilMtmO-20eA` | `시트1!A1:D135` | `D&D 5.5E 추가 주문 모음.md` | `1TkhdLzYcslzRxG1h58PceocUAzqQRS6m` | 135행 일치 |
| D&D 5.5E 추가 주문 상세 데이터 | `1Ah8B79LAagUDBlvbBsQoD-Qw6aLLsKhfFNF6nitOMtw` | `시트1!A1:G479` | `D&D 5.5E 추가 주문 상세 데이터.md` | `1SqJaj4sTIUb0u6M1t1nxc08nQytPa4H6` | 479행 일치 |
| FVTT 룰북 검증 및 갱신 현황 | `1D8UgoMMuszESHqrxvdYalvHrMEYMHFKt2VXNrhQ8qVQ` | `룰북 검증 현황!A1:D150` | `작업 정비/룰북 인덱싱 및 FVTT 컴펜디움 이관 체계/FVTT 룰북 검증 및 갱신 현황 - Google Sheets 전환 보존본.md` | `1czLEhB6XsqzGjLA0dqeXuonYdmKwtU6e` | 150행 일치 |

- 네 원본은 모두 단일 탭이었다.
- 업로드한 네 결과의 MIME 유형은 모두 `text/markdown`이었다.
- 업로드본을 다시 읽어 Markdown 표를 행렬로 복원한 뒤 원본 표시값 행렬과 비교했으며 네 건 모두 일치했다.
- 빈 셀은 빈 표 셀로 유지했다.

## 수식 처리

- `D&D 5.5E 추가 주문 모음`의 B~D열 2~126행에는 총 375개의 반복 수식이 있었다.
- Markdown에서는 수식을 실행할 수 없으므로 현재 표시값을 고정해 보존했다.
- B~D열 수식 패턴과 적용 범위를 문서 본문에 별도로 기록했다.
- 127~135행의 B~D열은 원본에서도 수식이 아닌 수동 입력값이므로 그대로 보존했다.

## 기존 FVTT Markdown 충돌 처리

- 같은 폴더에 `FVTT 룰북 검증 및 갱신 현황.md`가 이미 존재했으며 시트보다 최신인 진행 정본이었다.
- 시트의 데이터 149행 중 정본과 `룰북명 + 실제 파일명` 키가 겹치는 행은 146개였다.
- 겹치는 행 가운데 데이터 유형 또는 검증 상태가 다른 행은 132개였고, 이전 분할 파일 기준 행 3개는 현행 정본에 없었다.
- 최신 정본을 덮어쓰거나 과거 값으로 되돌리지 않고, 시트 전체를 `Google Sheets 전환 보존본`으로 분리했다.
- 보존본에는 현행 집계와 후속 작업의 입력으로 사용하지 않는 이전 스냅샷임을 명시했다.

## 로컬 무결성

| 파일 | SHA-256 |
| --- | --- |
| `클래스   서브클래스 한글화 매핑.md` | `90959CEE54FEEC5577CF1A2D2C7EA826DC6B62743A86A132BED9270764188E1C` |
| `D&D 5.5E 추가 주문 모음.md` | `9D8E31A88A83EEE431C89448A4A47A949117D3CCCCD90B4F866B5E0D6E445584` |
| `D&D 5.5E 추가 주문 상세 데이터.md` | `88DCB280E7B56788958104A57E583F52CF862959BD0CEA2B22E367210653187E` |
| `FVTT 룰북 검증 및 갱신 현황 - Google Sheets 전환 보존본.md` | `6703BE6E6A18F7635E8EBBAE9699A958636B6324A9C12F39D4B2D317AF8820A7` |

## 원본 삭제 검증

- 행렬 대조를 통과한 뒤 Google Sheets 원본 4개를 영구 삭제했다.
- 전체 작업 폴더의 `.gsheet` 잔여 파일은 0개였다.
- 원본 ID 4개는 Drive에서 다시 조회할 수 없는 상태로 검증한다.
- Google Drive 커넥터의 삭제는 휴지통 이동이 아닌 영구 삭제이므로 원본 시트는 Drive에서 복구할 수 없다.

## 최종 판정

네 Google Sheets의 실제 사용 범위, 표시값, 행·열 순서와 빈 셀이 Markdown으로 보존됐다. 큰 문서 3개를 포함한 모든 변환본은 원문 행렬 대조를 통과했고, 기존 FVTT 정본은 훼손하지 않았으며 원본 시트 정리까지 요구 범위대로 완료됐다.
