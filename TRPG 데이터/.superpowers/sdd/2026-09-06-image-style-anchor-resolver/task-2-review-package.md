# Task 2 검토 패키지

## 권위 자료

- 작업 브리프: `task-2-brief.md`
- 승인 설계: `../../../docs/superpowers/specs/2026-09-06-image-style-anchor-resolver-design.md`
- 중앙 호출 규칙: `../../../1. 프롬프트/1. 이미지 생성 모듈/라이브러리/스타일/정식 스타일 호출 규칙.md`
- 구현 보고서: `task-2-report.md`
- 수정 전 매니페스트: `task-2-before-manifest.json`
- 수정 전 스냅샷: `task-2-before/`

## 파일별 수정 차이

1. `task-2-diffs/01-AGENTS.diff`
2. `task-2-diffs/02-README.diff`
3. `task-2-diffs/03-0._이미지_생성_모듈_마스터_프롬프트.diff`
4. `task-2-diffs/04-1._이미지_생성_공통_승인_절차.diff`
5. `task-2-diffs/05-2._요구사항_확인서_작성_규칙.diff`
6. `task-2-diffs/06-6._이미지_생성_프롬프트_점검_및_교정_지침.diff`

## 구현자 검증 요약

- 중앙 호출 규칙 검색: 일치 확인, 종료 코드 0
- 확장 감사 필드 검색: 일치 확인, 종료 코드 0
- 구 가정 검색: 출력 없음, 종료 코드 1
- 대상 Markdown 펜스 균형: 통과

## 검토 요청

1. Task 2 브리프와 승인 설계에 대한 명세 준수 여부를 먼저 판정한다.
2. 여섯 개 diff와 현재 파일을 모두 확인한다.
3. 누락, 충돌, 과도한 범위 변경, 기존 승인 절차 약화를 찾는다.
4. 문제는 `Critical`, `Important`, `Minor`로 분류하고 파일·줄·근거·수정 방향을 제시한다.
5. 문제가 없으면 `Approved`라고 명시한다.
