# PNG WebP 이미지 포맷 정규화 정비

## 작업 목적

`TRPG 데이터` 전체의 실제 PNG 자산을 lossless WebP로 전환하고 현재 로컬 참조와 신규 이미지 출력 규칙을 WebP로 통일한다. 이미지 작업 뒤에는 활성 로컬 경로를 실제 저장소명인 `ai-data-master`로 전환한다.

## 완료 상태

- 상태: 완료
- 실제 작업 루트: `C:\Users\nihil\coding\ai\ai-data-master\TRPG 데이터`
- 브랜치: `master`
- 최초 실제 PNG: 334개
- 최초 실제 WebP: 137개
- 실제 동일 stem PNG-WebP 쌍: 0개
- PNG 디코딩 실패: 0개
- APNG: 0개
- PNG 모드: RGB 313개, RGBA 21개
- alpha 보유 PNG: 21개
- 파일명·경로상 토큰 PNG: 2개, 모두 alpha 보유
- 선행 미커밋 상태: 추적 PNG 삭제 27개, 신규 WebP 44개, 활성 이미지 지침 수정 존재

## 보존과 충돌 기준

- 기존 사용자 변경은 되돌리지 않는다.
- 선행 삭제 PNG는 Git 원본과 같은 stem의 현재 WebP를 비교해 검증한다.
- 기존 변경과 이번 변경이 서로 다른 결과를 요구할 때에는 자동 덮어쓰지 않고 충돌로 기록한다.
- `TRPG 데이터` 밖의 형제 폴더는 작업하지 않는다.

## 다음 작업

- 후속 작업 없음

## 완료 결과

- PNG 334개를 lossless WebP로 변환하고 해상도·alpha·가시 픽셀 RGB를 전수 검증했다.
- 선행 미커밋 WebP 27개를 Git 원본 PNG와 대조해 모두 검증했다.
- 실제 PNG 0개, WebP 471개, 읽기 실패 0개, 충돌 0개, 변환 실패 0개다.
- 현재 로컬 자산 참조 6건을 3개 파일에서 WebP로 전환했다.
- 활성 출력 규칙 4개 파일을 WebP와 WebP alpha 기준으로 추가 보정했다.
- 이전 로컬 저장소명 참조 5건을 3개 파일에서 `ai-data-master`로 전환했고 잔존은 0건이다.
- 검증 보고서: `docs/superpowers/reports/2026-09-07-png-webp-normalization-verification.md`
