# Task 5 검토 패키지

## 권위 자료

- 작업 브리프: `task-5-brief.md`
- 승인 설계: `../../../docs/superpowers/specs/2026-09-06-image-style-anchor-resolver-design.md`
- 승인 실행 계획: `../../../docs/superpowers/plans/2026-09-06-image-style-anchor-resolver.md`
- 공식 검증 보고서: `../../../docs/superpowers/reports/2026-09-06-image-style-anchor-resolver-verification.md`
- 구현 보고서: `task-5-report.md`
- 수정 전 매니페스트: `task-5-before-manifest.json`
- 수정 전 스냅샷: `task-5-before/`

## 추적 문서 수정 차이

1. `task-5-diffs/01-SUPERPOWERS_WORK_REGISTRY.diff`
2. `task-5-diffs/02-이미지_스타일_앵커_호출_체계_정비.diff`
3. `task-5-diffs/03-작업_정비_현황.diff`

## 핵심 검증 수치

- 반실사 활성 앵커: 정확히 4장
- 활성 04 SHA-256: `4DD50806C3905725D60AB07AB72CEBE463D3A13496A03A3600D4DF44B0A080E7`
- 보관 04 SHA-256: `82DF15CEFE6F685D96412501FCBDAFFE9A13C729672628C39D30ACD8B64E0289`
- 구 반실사 계약: 보정된 주어 경계 검색 0건, 구 파일명 0건, 구 조합 0건
- 중앙 호출 규칙 참조 파일: 28개
- 고정 영어 블록 시작문 소유권: 각 1개
- 검사 Markdown: 33개, 펜스 불균형 0개
- 필수 정본: 4/4 존재

## 주의할 검토 지점

브리프의 첫 구 계약 검색식은 `.*`가 같은 줄의 애니 페인팅 3앵커 절까지 넘어가 승인된 루트 정책을 1건 오탐했다. 공식 보고서는 이 원시 결과를 숨기지 않고 기록하고, `애니 페인팅` 주어 경계를 넘지 않는 PCRE2 동등 검색으로 실제 붓터치 반실사 구 계약이 0건임을 재검증했다. 이 보정이 논리적으로 타당한지 확인한다.

## 검토 요청

1. Task 5 브리프의 모든 검증을 현재 파일에서 독립적으로 재현하거나 대조한다.
2. 공식 검증 보고서가 사실과 일치하고 중요한 실패·오탐을 숨기지 않는지 확인한다.
3. 레지스트리 항목이 현재 작업에서 완료 이력으로 중복 없이 이동했는지 확인한다.
4. 작업 기록과 현황이 모두 완료, 미결 없음, 후속 작업 없음, 동일 검증 보고서 경로를 가리키는지 확인한다.
5. 실제 변경 파일 목록과 no-image/no-Git 진술이 범위와 일치하는지 확인한다.
6. 문제는 `Critical`, `Important`, `Minor`로 분류하고 파일·줄·근거·수정 방향을 제시한다. 문제가 없으면 `Approved`라고 명시한다.
