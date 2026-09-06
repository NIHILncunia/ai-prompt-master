# 이미지 스타일 앵커 호출 체계 정비 — 최종 종합 검토 패키지

## 검토 대상

승인 설계와 실행 계획 전체에 대한 최종 독립 검토다. 이 작업공간은 Git 저장소가 아니므로 각 Task의 수정 전 스냅샷, SHA-256 매니페스트, `git diff --no-index` 결과를 변경 증거로 사용한다.

## 권위 문서

- 설계: `../../../docs/superpowers/specs/2026-09-06-image-style-anchor-resolver-design.md`
- 실행 계획: `../../../docs/superpowers/plans/2026-09-06-image-style-anchor-resolver.md`
- 공식 검증 보고서: `../../../docs/superpowers/reports/2026-09-06-image-style-anchor-resolver-verification.md`
- SDD 원장: `progress.md`

## Task별 증거

1. Task 1
   - 브리프: `task-1-brief.md`
   - 구현 보고서: `task-1-report.md`
   - 최초 검토 패키지: `task-1-review-package.md`
   - 교정 재검토 패키지: `task-1-fix1-review-package-corrected.md`
   - 수정 전 스냅샷·매니페스트: `task-1-before/`, `task-1-before-manifest.json`
2. Task 2
   - 브리프·보고서·검토 패키지: `task-2-brief.md`, `task-2-report.md`, `task-2-review-package.md`
   - diff: `task-2-diffs/`
3. Task 3
   - 브리프·보고서·검토 패키지: `task-3-brief.md`, `task-3-report.md`, `task-3-review-package.md`
   - diff: `task-3-diffs/`
4. Task 4
   - 브리프·보고서·검토 패키지: `task-4-brief.md`, `task-4-report.md`, `task-4-review-package.md`
   - diff: `task-4-diffs/`
5. Task 5
   - 브리프·보고서·검토 패키지: `task-5-brief.md`, `task-5-report.md`, `task-5-review-package.md`
   - 최초 diff: `task-5-diffs/`
   - 수정 라운드 diff: `task-5-fix1.diff`

## 반드시 재검토할 결과

- 승인된 교정 04번이 활성 마감 앵커이며 원본 후보는 보관되었다.
- 붓터치 반실사는 얼굴·나이·전신·마감 4앵커, 애니 페인팅은 현행 3앵커다.
- 중앙 호출 규칙이 스타일 모드·구도·참조 예산을 단일 판정한다.
- 신규 반실사 얼굴·흉상은 01+02+04, 반신·전신은 01+02+03+04를 기본으로 한다.
- 제공 이미지가 있는 V1·V2·세션 하이라이트는 명시적 변환이 없으면 제공 이미지 그림체를 보존한다.
- 토큰 최종화에서는 캐릭터 스타일 앵커로 재렌더링하지 않는다.
- 배틀맵·아이콘·월드 지도는 기능성 예외이며 인물 앵커를 자동 적용하지 않는다.
- 풍경은 명시 요청 때 마감 앵커와 공통 마감 블록만 적용할 수 있다.
- 고정 영어 그림체 블록과 공통 저수분 마감 블록은 승인 설계 원문과 일치하고 각 정본에 한 번만 존재한다.
- 전역 라우터와 추적 문서가 중앙 규칙 및 완료 상태와 일치한다.

## 알려진 검토·실행 기록

- Task 1 최초 검토의 Important 2건은 수정 라운드 1에서 모두 해소됐다.
- Task 1 최초 재검토 패키지는 늦은 스냅샷 때문에 무효였고, 초기 패키지의 수정 전 문장과 현재 문장을 직접 비교한 교정 패키지로 재승인됐다.
- Task 5 브리프의 첫 `.*` 검색은 같은 줄의 애니 페인팅 3앵커 절을 오탐했으며, 스타일 주어 경계를 제한한 동등 검색으로 실제 구 반실사 계약 0건을 확인했다.
- Task 5 최초 검토의 Important 1건은 현황에 `미결: 없음` 한 줄을 추가해 해소됐다.
- 이미지 생성, Git 브랜치, 커밋, 푸시는 수행하지 않았다.

## 최종 검토 요청

1. 승인 설계와 실행 계획의 모든 요구가 현재 파일에 구현됐는지 전체적으로 판정한다.
2. 각 Task 검토에서 놓친 교차 문서 충돌, 우선순위 모순, 제공 이미지 보존 약화, 기능성 예외 누락, 잘못된 상대경로를 찾는다.
3. 영어 고정 블록 원문과 앵커 매니페스트·파일 해시를 재확인한다.
4. 문서 형식과 추적 완료 상태가 유효한지 확인한다.
5. 문제는 `Critical`, `Important`, `Minor`로 분류하고 정확한 파일·줄·근거·수정 방향을 제시한다.
6. Critical과 Important가 없으면 `Ready`라고 명시한다.
