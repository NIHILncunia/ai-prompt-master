# FVTT SBI 한글 자동화 실환경 검증 정비

- 상태: 완료 (2026-09-05 실환경 시험 범위)
- 완료: 기존 임포터 fd.get 오류 수정, 한글 임포트, 전후 기계 데이터 비교, 장궁 실제 공격 및 피해 굴림, 잘못된 JSON 차단.
- 산출물 정본: ../docs/superpowers/reports/2026-09-05-fvtt-sbi-ko-live-test.md
- 서버 변경: 기존 스탯블록 임포터의 FormData 반환 콜백 추가. 시험 Actor 4개 보존.
- 미검증: 주문 UUID/Cast Activity, 비어 있지 않은 Effect, 전설 행동, 전체 전투 자원 소모 흐름.
- 재개: 주문 포함 시험 입력으로 Cast Activity와 UUID 검증.
