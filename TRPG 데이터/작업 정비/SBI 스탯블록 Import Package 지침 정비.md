# SBI 스탯블록 Import Package 지침 정비

- 작업 ID: 2026-09-06-sbi-statblock-import-package
- 상태: 완료
- 시작일: 2026-09-06
- 완료일: 2026-09-06
- 목적: 실환경 시험을 거친 SBI 한글화 매크로 입력 형식을 스탯블록 지침과 템플릿에 반영한다.
- 확정 방향: 영문 스탯블록과 LOCALIZATION JSON을 하나의 복사 블록으로 통합한다.
- 적용 범위: 4번 룰북 기능의 스탯블록 지침·템플릿·AGENTS·마스터·공통 지침·README 6종.
- 실행 계획: [계획](<../docs/superpowers/plans/2026-09-06-sbi-statblock-import-package.md>)
- 분석: 기존 별도 FVTT 번역은 수동 복사용이므로 매크로가 읽을 JSON으로 통합한다. 일반 한국어 번역과 기반 몬스터 원본은 유지한다.
- 미결: 없음.
- 완료: 지침·템플릿·기능 진입점 6종에 패키지 출력과 번역 규칙을 반영했다.
- 검증: JSON 2개 파싱·템플릿 Item 8개 번역 대응·기존 매크로 입력 파서·문서 형식·기존 본문 보존 검증을 통과했다.
- 검증 보고서: [완료 보고서](<../docs/superpowers/reports/2026-09-06-sbi-statblock-import-package-verification.md>)
- 별도 시험 범위: 주문·Cast Activity 등 이전 실환경 보고서의 미검증 항목. 이번에는 서버에 재접속하지 않았다.
- 다음: 후속 작업 없음.
