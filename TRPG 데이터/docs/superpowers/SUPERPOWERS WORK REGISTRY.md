# SUPERPOWERS WORK REGISTRY

## 목적

이 문서는 `TRPG 데이터/docs/superpowers`에서 관리하는 작업 폴더 전용 Superpowers 작업의 공식 상태 정본이다. 설정 폴더 전용 Superpowers 작업은 `프로젝트 위그드라실/docs/superpowers/SUPERPOWERS SETTINGS REGISTRY.md`에서 별도로 관리한다.

설계·실행 계획·보고서의 내용과 체크박스는 당시 작업 내용과 진행 기록을 보존하며, 작업의 최종 상태 판정은 이 레지스트리를 우선한다. 완료·중단·폐기 이력도 삭제하지 않는다.

Superpowers 문서의 생성·업로드·검증 절차는 `SUPERPOWERS DOCUMENT OPERATIONS.md`를 따른다. 레지스트리에는 Drive에서 실제 존재가 검증된 문서만 참조한다.

## 상태 값

`설계 중` / `설계 완료` / `실행 계획 완료` / `진행 중` / `검증 중` / `완료` / `중단` / `폐기`

## 현재 작업

### 2026-09-09-common-map-catalog-migration

- 작업명: 공용 맵 카탈로그 전환
- 상태: 완료
- 작업 유형: 전역 맵 자산 카탈로그 통합·세션 참조 구조 정비
- 시작일: 2026-09-09
- 설계: `specs/2026-09-09-common-map-catalog-migration-design.md`
- 실행 계획: `plans/2026-09-09-common-map-catalog-migration.md`
- 검증 보고서: `reports/2026-09-09-common-map-catalog-migration-verification.md`
- 작업 정비: `TRPG 데이터/작업 정비/공용 맵 카탈로그 전환 정비.md`
- 현재 결과: 공용 카탈로그 구조, 6개 맵 항목·7개 이미지 자산, UUID·코드·상태 규칙, 세션과 공용 맵의 정보 소유 경계를 확정했다.
- 현재 결과: 공용 맵 문서 6개·이미지 7개 이관, 세션 물리 사본 0개, 활성 이전 경로 참조 0건, 이미지 SHA-256 7개 일치를 확인했다.
- 검증: 공용 맵 문서 6개·이미지 7개·공용 UUID 6개, 세션 물리 사본 0개, 활성 이전 경로 참조 0건, 이미지 SHA-256 7개 일치를 확인했다.
- 환경 잔여: `desktop.ini`는 제거했으며, `11. 맵 이미지/` 빈 폴더 하나만 실행 환경의 삭제 정책으로 남아 있다. 자산·참조·운영 영향은 없다.
- 다음: 후속 작업 없음.

### 2026-09-01-rulebook-index-fvtt-compendium-tracking

- 작업명: 룰북 인덱싱·검증·FVTT 컴펜디움 이관 추적 체계
- 상태: 진행 중
- 작업 유형: 장기 룰북 데이터 인덱싱·원본 검증·FVTT Compendium 이관 및 저장소 정합성 추적
- 시작일: 2026-09-01
- 설계: `specs/2026-09-04-rulebook-primary-classification-design.md`
- 실행 계획: `plans/2026-09-04-rulebook-primary-classification.md`
- 추가 실행 계획: `plans/2026-09-08-rulebook-pdf-source-reconciliation.md`
- 검증 보고서: `reports/2026-09-04-rulebook-primary-classification-verification.md`
- 추가 검증 보고서: `reports/2026-09-08-rulebook-pdf-source-reconciliation-verification.md`
- 작업 정비: `TRPG 데이터/작업 정비/룰북 인덱싱 및 FVTT 컴펜디움 이관 체계 정비.md`
- 현재 결과: 수집 룰북 96권을 데이터북 35권·시나리오북 39권·설정북 22권의 독립 표로 관리하고, 실제 파일 검증 166행을 주분류별로 추적한다.
- 완료 범위: 검증 상태 `Y 17 / N 149`, 실제 파일 없음 13행, 고유 PDF 148개, 룰북 원본 Markdown 0개를 확인했다. 활성 상세 인덱스는 데이터북 Volo's Guide to Monsters·One Grung Above·Xanathar's Guide to Everything·Mordenkainen’s Tome of Foes·Mordenkainen's Fiendish Folio Volume 1·Tasha’s Cauldron of Everything·Fizban's Treasury of Dragons 7개다. 비데이터북 인덱스 아카이브는 2026-09-06 정리되어 현재 없다.
- 현재 진행: 완전한 `Spelljammer - Adventures in Space.pdf` 합본을 확보해 과거 불완전 Markdown 때문에 건너뛴 Boo's Astral Menagerie 8번 상세 인덱싱을 현재 대상으로 복원했다.
- 추가 반영: 마스터가 지정한 신규·교체 PDF 24개의 다운로드 원본과 저장본 SHA-256 일치를 확인하고, 제거된 룰북 원본 Markdown 참조를 현재 PDF 연결로 교체했다.
- 다음: 데이터북 Boo's Astral Menagerie, 시나리오북 Tomb of Annihilation, 설정북 Guildmasters’ Guide to Ravnica 중 선택한 흐름을 재개한다.
### 2026-09-01-character-reference-v2-slot-five

- 작업명: 캐릭터 레퍼런스 V2 내부 5번 이관
- 상태: 완료
- 작업 유형: 이미지 생성 모듈 번호 이관·활성 라우팅 동기화
- 시작일: 2026-09-01
- 설계: `specs/2026-09-01-character-reference-v2-slot-five-design.md`
- 실행 계획: `plans/2026-09-01-character-reference-v2-slot-five.md`
- 검증 보고서: `reports/2026-09-01-character-reference-v2-slot-five-verification.md`
- 작업 정비: `TRPG 데이터/작업 정비/캐릭터 레퍼런스 V2 내부 5번 이관 정비.md`
- 현재 결과: 내부 9번 V2 폴더를 내부 5번으로 이관하고, 루트부터 하위 활성 라우터까지 V2 참조를 5번으로 동기화했다. 내부 5번은 V2만 소유하며 토큰 프레임은 복원하지 않는다.
- 검증: 기존 9번 폴더 없음, 1~8 연속 기능 폴더 8개, 활성 구 9번·결번·토큰 프레임 라우팅 0건, 상대 Markdown 참조 누락 0건을 확인했다.
- 다음: 후속 작업 없음.

### 2026-09-01-character-reference-v2

- 작업명: 캐릭터 레퍼런스 V2 기능 추가
- 상태: 완료
- 작업 유형: 이미지 생성 모듈 신규 고정 계약형 기능 추가
- 시작일: 2026-09-01
- 설계: `specs/2026-09-01-character-reference-v2-design.md`
- 실행 계획: `plans/2026-09-01-character-reference-v2.md`
- 검증 보고서: `reports/2026-09-01-character-reference-v2-verification.md`
- 현재 결과: 기존 내부 3번 V1을 유지하면서 내부 9번 캐릭터 레퍼런스 V2 기능을 추가했다. V2는 1916 × 821 고정, 목 위 없는 정면·측면·후면 균등 패널, 우측 대형 정면 두상 중앙 정렬, 조건부 독립 무기 패널, 검은색 사용자 제공 데이터 바 계약을 사용한다.
- 다음: 후속 작업 없음.

### 2026-09-01-root-instruction-consistency-repair

- 작업명: 루트 지침 체계 정합성 정정
- 상태: 완료
- 작업 유형: 활성 지침 경로·번호·라우팅·상태 기록 정합성 수정
- 시작일: 2026-09-01
- 설계: `specs/2026-09-01-root-instruction-consistency-repair-design.md`
- 실행 계획: `plans/2026-09-01-root-instruction-consistency-repair.md`
- 검증 보고서: `reports/2026-09-01-root-instruction-consistency-repair-verification.md`
- 작업 정비: `TRPG 데이터/작업 정비/루트 지침 체계 정합성 정정.md`
- 현재 결과: 루트부터 하위 프롬프트까지 정적 점검에서 끊어진 상대 경로 5건, 구 번호 1건, 내부 결번과 범위 표기의 불일치, VTT 토큰 통합 상태 불일치를 식별했다.
- 현재 결과: 전역 준비 호출, 활성 라우팅, 상대 Markdown 참조, VTT 토큰 작업 상태를 실제 활성 구조에 맞게 정정했다.
- 검증: 상대 참조 누락 0건, 구 NPC 이미지 번호 0건, 불가능한 내부 1~8 범위 표기 0건, 최상위 기능 8개와 이미지 내부 활성 기능 `1·2·3·4·6·7·8`을 확인했다.
- 다음: 후속 작업 없음.

### 2026-09-01-complete-vtt-token-integration

- 작업명: 완성형 VTT 토큰 통합
- 상태: 완료
- 작업 유형: 이미지 생성 모듈 기능 제거·토큰 생성 체계 통합
- 시작일: 2026-09-01
- 설계: `specs/2026-09-01-complete-vtt-token-integration-design.md`
- 실행 계획: `plans/2026-09-01-complete-vtt-token-integration.md`
- 검증 보고서: `reports/2026-09-01-complete-vtt-token-integration-verification.md`
- 작업 정비: `TRPG 데이터/작업 정비/완성형 VTT 토큰 통합 정비.md`
- 현재 결과: 독립 5번 토큰 프레임 기능을 제거하고, 포트레이트 전신 확정본 및 사용자 업로드 이미지 기반의 완성형 토큰 단일 산출물로 통합하는 설계를 마스터가 승인했다. 내부 5번은 결번으로 유지하며, 유형 기반 계열 자동 선택과 일반·엘리트·보스 시각 규칙을 적용한다.
- 검증: 독립 5번 기능 경로·빈 프레임 계약·Inner Mask 잔존 0건, 두 입력 경로와 계열·등급 계약 추적을 확인했다. Git 저장소 부재로 git 검증과 커밋은 생략했다.
- 다음: 후속 작업 없음.

### 2026-08-23-prompt-routing-flow-repair

- 작업명: 프롬프트 라우팅 흐름 정비
- 상태: 완료
- 작업 유형: 프롬프트 체계 라우팅·진입 흐름 정비
- 시작일: 2026-08-23
- 감사: `reports/2026-08-23-prompt-routing-flow-audit.md`
- 설계: `specs/2026-08-23-prompt-routing-flow-repair-design.md`
- 실행 계획: `plans/2026-08-23-prompt-routing-flow-repair.md`
- 작업 정비: `TRPG 데이터/작업 정비/프롬프트 라우팅 흐름 정비.md`
- 현재 결과: 이미지 승인 정본을 이미지 모듈 공통 경로로 통일하고, 로그 재번호 참조·창작 지원 상대 경로·이미지 내부 1~8 직접 진입 순서를 정비했다.
- 검증: 과거 번호 표현과 축소된 이미지 범위 표현이 없고, 창작 지원 상위 경로 6개와 이미지 내부 8개 상위 모듈 진입점이 모두 유효함을 확인했다.
- 다음: 후속 작업 없음.

### 2026-08-23-global-painterly-finish

- 작업명: 이미지 생성 모듈 공통 붓터치 마감 기본값 도입
- 상태: 완료
- 작업 유형: 이미지 생성 공통 스타일 규칙 정비
- 시작일: 2026-08-23
- 설계: `specs/2026-08-23-global-painterly-finish-design.md`
- 실행 계획: `plans/2026-08-23-global-painterly-finish.md`
- 작업 정비: `TRPG 데이터/작업 정비/공통 붓터치 마감 규칙 정비.md`
- 현재 결과: 공통 붓터치 마감 정본을 작성하고, 모듈 AGENTS·마스터·요구사항 확인서·포트레이트 전용 스타일 계약에 연결했다.
- 검증: 적용 대상·자동 예외·사용자 지시 우선순위와 네 개의 영어 프롬프트 표현을 정적 검색으로 대조했다.
- 다음: 후속 작업 없음.

### 2026-08-22-image-result-storage

- 작업명: 이미지 생성 결과 유형별 저장 체계 도입 및 드로이드 흉상 후속 생성
- 상태: 완료
- 작업 유형: 이미지 생성 공통 파일 정책 정비·포트레이트 후속 단계
- 시작일: 2026-08-22
- 완료일: 2026-08-22
- 실행 계획: `plans/2026-08-22-image-result-storage.md`
- 완료 범위: 공통 저장 루트를 `TRPG 데이터/15. 이미지 생성 결과/<유형>/`으로 정하고, 최상위·프롬프트·이미지 모듈·공통 승인 지침 7개 문서에서 저장 경로와 비덮어쓰기 규칙을 검증했다. 포트레이트 산출물 파일명도 `포트레이트 전신`과 `포트레이트 초상화`로 구분했으며, 드로이드의 전신 기준본과 초상화 9:16을 `캐릭터` 폴더에 저장했다.
- 산출물: `15. 이미지 생성 결과/캐릭터/남성형 드로이드 은폐 포트레이트 전신.png`, `15. 이미지 생성 결과/캐릭터/남성형 드로이드 은폐 포트레이트 초상화.png`
- 다음: 후속 작업 없음.

### 2026-08-11-class-creation-reference-analysis

- 작업명: 2024 PHB 기본 클래스 분석 및 클래스 제작 프롬프트 개선
- 상태: 진행 중
- 작업 유형: 룰북 레퍼런스 분석·미세제작 모듈 클래스 제작 체계 개선
- 시작일: 2026-08-11
- 설계: `specs/2026-08-11-class-creation-reference-analysis-design.md`
- 실행 계획: `plans/2026-08-11-class-creation-reference-analysis.md`
- 작업 정비: `TRPG 데이터/작업 정비/클래스 제작 프롬프트 개선 정비.md`
- 현재 결과: 2024 Player’s Handbook을 기준으로 12개 기본 클래스와 클래스 양식을 분석하는 체계를 확정했고 Barbarian 분석을 완료했다.
- 완료 범위: 작업 정비 체계 구축, 분석 축 확정, 01. Barbarian 분석.
- 미결: Bard~Wizard 11개 클래스 분석, 12개 클래스 횡단 비교, 클래스 제작 규칙·양식 재설계, 프롬프트 반영·검증.
- 다음: 02. Bard 분석.

### 2026-08-11-superpowers-auto-tracking-work-maintenance

- 작업명: Superpowers 자동 문서화·완료 추적 및 작업 정비 체계 정식화
- 상태: 완료
- 작업 유형: 프로젝트 공통 운영 지침 개편
- 시작일: 2026-08-11
- 완료일: 2026-08-11
- 설계: `specs/2026-08-11-superpowers-auto-tracking-work-maintenance-design.md`
- 실행 계획: `plans/2026-08-11-superpowers-auto-tracking-work-maintenance.md`
- 검증 보고서: `reports/2026-08-11-superpowers-auto-tracking-work-maintenance-verification.md`
- 결과: 전역 진입점 3종을 덮어쓰기 패치로 반영하고 ZIP 원본과 SHA-256 일치를 확인했다. 원본 ZIP은 `작업 정비/정비 아카이브`에 보관했다.

### 2026-08-09-session-package-output

- 작업명: 세션 제작 패키지형 산출물 및 저장 구조 개편
- 상태: 완료
- 작업 유형: 8번 세션 제작 산출물·템플릿·저장 경로 개편
- 시작일: 2026-08-09
- 설계: `specs/2026-08-09-session-package-output-design.md`
- 실행 계획: `plans/2026-08-09-session-package-output.md`
- 검증 보고서: `reports/2026-08-09-session-package-output-verification.md`
- 결과: 마스터가 시나리오·장면 모음·등장인물 및 몬스터·조우 설계의 4파일 패키지와 조우 기본 산출을 승인했다. Codex 로컬 저장과 웹 GPT ZIP 제공의 실행 환경 정책을 분리해 설계했다.
- 결과: 세션 설계 로컬 저장 루트, 4파일 패키지, Codex 로컬 저장과 웹 GPT ZIP 제공의 분리 정책, 템플릿과 검수 기준을 반영하고 검증했다.

### 2026-08-08-prompt-routing-defect-repair

- 작업명: 프롬프트 라우팅 결함 수정 및 재검증
- 상태: 완료
- 작업 유형: 번호 이관 후 활성 라우팅 보정
- 시작일: 2026-08-08
- 완료일: 2026-08-08
- 실행 계획: `plans/2026-08-08-prompt-routing-defect-repair.md`
- 검증 보고서: `reports/2026-08-08-prompt-routing-defect-repair-verification.md`
- 결과: 이미지 생성 모듈 내부 1~8번의 직접 승인 게이트를 복구하고, 설정·룰북·FVTT·창작 지원·세션 제작의 구 번호 의미 참조를 현행 체계로 정정했다. 활성 Markdown 상대 링크와 승인 게이트 누락은 모두 0건으로 검증됐다.

### 2026-08-08-prompt-root-traversal-audit

- 작업명: 프롬프트 루트 탐색 심층 점검
- 상태: 완료
- 작업 유형: 활성 경로·호출 시나리오 전수 감사
- 시작일: 2026-08-08
- 완료일: 2026-08-08
- 설계: `specs/2026-08-08-prompt-root-traversal-audit-design.md`
- 실행 계획: `plans/2026-08-08-prompt-root-traversal-audit.md`
- 활성 경로 보고서: `reports/2026-08-08-prompt-root-traversal-path-audit.md`
- 호출 시나리오 보고서: `reports/2026-08-08-prompt-root-traversal-scenario-audit.md`
- 통합 보고서: `reports/2026-08-08-prompt-root-traversal-audit-summary.md`
- 결과: 상위 루트 진입과 경로 존재성은 정상이나, 직접 진입·복합 요청의 구 번호 라우팅과 이미지 내부 1~4번 공통 승인 절차 직접 연결 누락으로 최종 운영 판정은 실패다. 수정 후 재검증이 필요하다.

### 2026-08-08-prepare-layout-session-progress

- 작업명: 준비 응답 레이아웃 및 SESSION PROGRESS 운영 도입
- 상태: 완료
- 작업 유형: 전역 응답·운영 지침 정비
- 시작일: 2026-08-08
- 완료일: 2026-08-08
- 설계: `specs/2026-08-08-prepare-response-layout-design.md`
- 실행 계획: `plans/2026-08-08-prepare-layout-session-progress.md`
- 검증 보고서: `reports/2026-08-08-prepare-layout-session-progress-verification.md`
- 결과: `준비.`는 기능 설명·이미지 모듈 내부 불릿·이미지 전용 승인 절차를 보여 주며, 모든 실질 응답은 SESSION PROGRESS로 실제 진행 상태를 보고한다.

### 2026-08-08-prompt-flow-integrity-audit

- 작업명: 프롬프트 이중 계통 흐름 무결성 감사
- 상태: 완료
- 작업 유형: 전수 지침·라우팅 감사
- 시작일: 2026-08-08
- 완료일: 2026-08-08
- 설계: `specs/2026-08-08-prompt-flow-integrity-audit-design.md`
- 실행 계획: `plans/2026-08-08-prompt-flow-integrity-audit.md`
- 보고서: `reports/2026-08-08-prompt-flow-integrity-audit.md`
- 범위: 기존 1~15번 기능 계통과 신규 `1. 이미지 생성 모듈` 계통을 분리하여 호출·경로·필수 참조·규칙 충돌을 실제 파일 기준으로 점검한다.
- 판정 기준: 기존 계통의 단절은 이관 의도와 안내가 확인될 때 의도된 단절로, 신규 이미지 모듈의 필수 연결 실패는 결함으로 기록한다.
- 결과: 기존 계통의 보존된 연결과 신규 모듈의 파일 골격은 정상이다. 신규 모듈 상위 흐름에는 공통 승인 경로 중첩, 포트레이트 계약 충돌, 내부 5~8번 AGENTS의 직접 진입 순서 누락을 확인했다.

### 2026-08-08-image-generation-module

- 작업명: 이미지 생성 기능군 통합 및 전체 기능 재번호
- 상태: 완료
- 작업 유형: 기능 구조 대개편
- 시작일: 2026-08-08
- 설계: `specs/2026-08-08-image-generation-module-design.md`
- 실행 계획: `plans/2026-08-08-image-generation-module-plan.md`
- 상세 실행 명세: `specs/2026-08-08-image-generation-module-execution-spec.md`
- 최종 전환 설계: `specs/2026-08-08-image-generation-module-final-cutover-design.md`
- 최종 전환 실행 계획: `plans/2026-08-08-image-generation-module-final-cutover.md`
- 전환 기준선·복구 지점: `reports/2026-08-08-image-generation-module-final-cutover-baseline.md`
- 신규 모듈 정본 완결 검증: `reports/2026-08-08-image-generation-module-final-cutover-module-readiness.md`
- 삭제 전 운영 참조 검증: `reports/2026-08-08-image-generation-module-final-cutover-predelete-verification.md`
- 구 이미지 기능 제거 검증: `reports/2026-08-08-image-generation-module-final-cutover-legacy-removal.md`
- 비이미지 기능 재번호 검증: `reports/2026-08-08-image-generation-module-final-cutover-renumbering.md`
- 라우팅 동기화 검증: `reports/2026-08-08-image-generation-module-final-cutover-routing-sync.md`
- 최종 전환 검증: `reports/2026-08-08-image-generation-module-final-cutover-verification.md`
- 인계 문서: `reports/2026-08-08-image-generation-module-handoff.md`
- 결과: 상위 1번 이미지 생성 모듈, 내부 1~8번 권장 구조, 반실사 포트레이트 전신→흉상 고정 계약, 선택형 레이아웃 조립 구조까지 설계 완료
- 진행: 기존 이미지 기능 8개 현행 규칙 1차 분류를 완료했고, 신규 `1. 이미지 생성 모듈` Phase A 상위 골격·공통 운영 문서·내부 1~8번 폴더·라이브러리 기본 구조를 Drive에 실제 생성했다.
- 최종 전환 진행: Task 1에서 삭제·재번호 대상 16개 경로를 확인하고, 구 이미지 폴더 8개·64개 파일의 백업을 생성했다. 원본과 백업의 상대 경로별 SHA-256 비교는 차이 0건이다.
- 최종 전환 진행: Task 2에서 상위 공통 승인 경로 6건, 포트레이트 고정 계약, Codex 로컬 접근 규칙, 신규 내부 5~8번 AGENTS 읽기 순서를 정본으로 통일했다. 정본 완결 검증의 결함 항목은 모두 0건이다.
- 최종 전환 진행: Task 3에서 활성 운영 문서 247개를 대상으로 구 이미지 폴더 참조를 검사했다. 초기 25건을 신규 모듈 내부 경로로 전환했고, 재검사 결과 활성 구 이미지 경로 참조는 0건이다.
- 최종 전환 진행: Task 4에서 구 이미지 기능 폴더 8개를 제거했고 삭제 후 잔존은 0건이다. 검증된 백업 8개 폴더·64개 파일은 유지한다. 동시에 신규 포트레이트 프리셋의 과거 3D 렌더링 정체성도 붓터치 반실사 계약으로 보정했다.
- 최종 전환 진행: Task 5에서 비이미지 기능 7개를 물리적으로 2~8번으로 재번호했다. 프롬프트 루트의 번호 기능은 현재 정확히 1~8번이며, 이전 재번호 원본 폴더는 0개다.
- 최종 전환 진행: Task 6에서 활성 문서의 이전 폴더명·이전 명칭 라우팅·폐기된 이미지 외부 번호·전환기 문구를 모두 제거하고, 1~8 최종 체계와 실제 경로를 동기화했다. 검증 보고서: `reports/2026-08-08-image-generation-module-final-cutover-routing-sync.md`.
- 기록 무결성: 2026-08-08 누락됐던 `specs/2026-08-08-image-generation-module-design.md`와 `plans/2026-08-08-image-generation-module-plan.md`를 Drive에 복원하고 실제 존재를 확인했다.
- Phase A 검증: `reports/2026-08-08-image-generation-module-phase-a-verification.md`
- 미결: Phase B 반실사 포트레이트 전면 재작성, 나머지 하위 기능 세부 문서 작성, 비이미지 기능 최종 재번호
- 다음: 최종 전환 실행 계획에 따라 정본 완결 게이트, 백업, 구 이미지 폴더 제거, 비이미지 2~8 재번호, 전역 참조 검증을 순서대로 수행한다.


## 완료 이력

### 2026-09-09-entity-asset-folder-migration

- 작업명: 엔터티 자산 폴더 전환
- 상태: 완료
- 완료일: 2026-09-09
- 작업 유형: 작업 폴더 이미지 자산 구조 재편·저장 규칙 전환
- 설계: `specs/2026-09-09-entity-asset-folder-migration-design.md`
- 실행 계획: `plans/2026-09-09-entity-asset-folder-migration.md`
- 기준선: `reports/2026-09-09-entity-asset-folder-migration-baseline.md`
- 검증 보고서: `reports/2026-09-09-entity-asset-folder-migration-verification.md`
- 작업 정비: `TRPG 데이터/작업 정비/엔터티 자산 폴더 전환 정비.md`
- 완료 결과: 기존 이미지 전용 루트 13개를 대상별 자산 폴더 또는 `16. 미분류`로 전환했다. 이미지 536개의 SHA-256 다중집합, 자산 인덱스 283개, 유효·고유 UUID 283개, 이전 루트 잔존 0개를 검증했다.
- 보류: 대상 연결 근거가 없는 이미지 43개는 `16. 미분류`에 보존했다.
- 다음: 후속 작업 없음.

### 2026-09-07-png-webp-normalization

- 작업명: PNG-WebP 이미지 포맷 정규화 및 로컬 경로 명칭 전환
- 상태: 완료
- 작업 유형: 전체 이미지 자산 포맷 마이그레이션·현재 참조·활성 출력 규칙·로컬 경로 정합성 정비
- 시작일: 2026-09-07
- 완료일: 2026-09-07
- 설계: `specs/2026-09-07-png-webp-normalization-design.md`
- 실행 계획: `plans/2026-09-07-png-webp-normalization.md`
- 검증 보고서: `reports/2026-09-07-png-webp-normalization-verification.md`
- 작업 정비: `TRPG 데이터/작업 정비/PNG WebP 이미지 포맷 정규화 정비.md`
- 결과: PNG 334개를 lossless WebP로 변환하고 선행 미커밋 WebP 27개를 Git 원본과 검증했다. 최종 실제 PNG 0개, WebP 471개, 충돌·변환 실패·현재 참조 누락 0건이다.
- 추가 결과: 활성 출력 규칙 4개 파일을 보정하고 이전 로컬 저장소명 5건을 `ai-data-master`로 전환했다.
- 다음: 후속 작업 없음.

### 2026-09-06-work-folder-id-remapping

- 작업명: 작업 폴더 Drive ID 일괄 이관
- 상태: 완료
- 작업 유형: 작업 폴더 복제 후 활성 지침의 폴더 ID 재매핑
- 시작일: 2026-09-06
- 완료일: 2026-09-06
- 설계: `specs/2026-09-06-work-folder-id-remapping-design.md`
- 실행 계획: `plans/2026-09-06-work-folder-id-remapping.md`
- 검증 보고서: `reports/2026-09-06-work-folder-id-remapping-verification.md`
- 작업 정비: `TRPG 데이터/작업 정비/작업 폴더 ID 일괄 이관 정비.md`
- 결과: 기존·신규 폴더 267개를 상대 경로로 1:1 매핑하고 활성 지침 17개 파일의 기존 폴더 ID 175건을 신규 ID로 교체했다.
- 검증: 원격 Markdown 589개 조회 오류 0건, 활성 지침 기존 ID 잔여 0건, 신규 ID 175건, 설정 폴더 ID 17건 유지, 원격 재조회 본문 일치 17/17을 확인했다.
- 보존: `.superpowers/sdd` 백업 5개와 완료 검증 보고서 1개의 역사적 ID 136건은 증거 보존을 위해 변경하지 않았다.
- 미결: 없음
- 다음: 후속 작업 없음.

### 2026-09-06-google-sheets-markdown-migration

- 작업명: Google Sheets Markdown 전환
- 상태: 완료
- 작업 유형: Google Sheets 전량 읽기·Markdown 변환·원본 정리
- 시작일: 2026-09-06
- 완료일: 2026-09-06
- 설계: `specs/2026-09-06-google-sheets-markdown-migration-design.md`
- 실행 계획: `plans/2026-09-06-google-sheets-markdown-migration.md`
- 검증 보고서: `reports/2026-09-06-google-sheets-markdown-migration-verification.md`
- 작업 정비: `TRPG 데이터/작업 정비/Google Sheets Markdown 전환 정비.md`
- 결과: Google Sheets 4개의 실제 사용 범위를 Markdown으로 전환하고 원문 행렬을 전량 대조한 뒤 원본을 영구 삭제했다. 기존 FVTT Markdown 정본은 유지하고 시트 내용은 이전 스냅샷으로 분리했다.
- 검증: 341행·135행·479행·150행 행렬 일치, 결과 MIME `text/markdown`, `.gsheet` 0개를 확인했다.
- 미결: 없음
- 다음: 후속 작업 없음.

### 2026-09-06-gdoc-markdown-archive-cleanup

- 작업명: Google Docs Markdown 전환 및 정비 아카이브 정리
- 상태: 완료
- 작업 유형: Google Docs 변환·원본 정리·정비 아카이브 전체 비우기
- 시작일: 2026-09-06
- 완료일: 2026-09-06
- 설계: `specs/2026-09-06-gdoc-markdown-archive-cleanup-design.md`
- 실행 계획: `plans/2026-09-06-gdoc-markdown-archive-cleanup.md`
- 검증 보고서: `reports/2026-09-06-gdoc-markdown-archive-cleanup-verification.md`
- 작업 정비: `TRPG 데이터/작업 정비/Google Docs Markdown 전환 및 정비 아카이브 정리 정비.md`
- 결과: Google Docs 3개를 원문 대조한 Markdown으로 전환하고 원본을 영구 삭제했다. 루트의 주문 템플릿 Markdown은 보존했으며, 정비 아카이브는 폴더만 남기고 내부 전체를 삭제했다.
- 검증: 업로드본 3개의 `text/markdown` MIME과 원문 일치, 작업 폴더 `.gdoc` 0개, Drive 아카이브 직계 항목 0개, 로컬 아카이브 재귀 항목 0개를 확인했다.
- 미결: 없음
- 다음: 후속 작업 없음.

### 2026-09-06-image-style-anchor-resolver

- 작업명: 이미지 스타일 앵커 호출 체계 정비
- 상태: 완료
- 작업 유형: 이미지 생성 모듈 스타일 계약·앵커 호출 구조 후속 개편
- 시작일: 2026-09-06
- 완료일: 2026-09-06
- 설계: `specs/2026-09-06-image-style-anchor-resolver-design.md`
- 실행 계획: `plans/2026-09-06-image-style-anchor-resolver.md`
- 검증 보고서: `reports/2026-09-06-image-style-anchor-resolver-verification.md`
- 작업 정비: `TRPG 데이터/작업 정비/이미지 스타일 앵커 호출 체계 정비.md`
- 결과: 붓터치 반실사의 핵심 얼굴·나이 표현·전신·마감 4앵커를 정식화하고, 내부 기능 1~8번과 전역 진입 문서를 중앙 정식 스타일 호출 규칙에 연결했다. 제공 이미지 그림체 보존, 기능성 이미지 예외, 고정 영어 그림체·마감 블록의 단일 소유권을 유지했다.
- 검증: 활성 앵커 4장·파일명 차이 0건, 구 반실사 파일명·조합 계약 0건, 중앙 호출 참조 28개, 고정 영어 블록 소유권 각 1건, Markdown 33개 중 펜스 불균형 0건, 필수 정본 4개 존재를 확인했다.
- 미결: 없음
- 다음: 후속 작업 없음.

### 2026-09-06-sbi-statblock-import-package

- 작업명: SBI 스탯블록 Import Package 지침 개선
- 상태: 완료
- 시작일: 2026-09-06
- 완료일: 2026-09-06
- 실행 계획: `plans/2026-09-06-sbi-statblock-import-package.md`
- 검증 보고서: `reports/2026-09-06-sbi-statblock-import-package-verification.md`
- 작업 정비: `작업 정비/SBI 스탯블록 Import Package 지침 정비.md`
- 결과: 기능 문서 6종에 단일 Import Package와 LOCALIZATION 규칙을 반영했다. JSON 2개·번역 대응 8개·기존 매크로 입력 파서·문서 형식 검증을 통과했다. 기존 원본·CR·명중 기준을 보존했다.
- 범위: 문서 개선과 로컬 검증 완료. 주문·Cast Activity 등의 실환경 시험은 기존 별도 시험 범위로 남는다.
- 다음: 후속 작업 없음.

### 2026-09-06-image-style-anchor-system

- 작업명: 이미지 스타일 앵커 체계 정비
- 상태: 완료
- 작업 유형: 이미지 생성 모듈 스타일 계약·시각 앵커 구조 개편
- 시작일: 2026-09-06
- 완료일: 2026-09-06
- 설계: `specs/2026-09-06-image-style-anchor-system-design.md`
- 실행 계획: `plans/2026-09-06-image-style-anchor-system.md`
- 검증 보고서:
  1. `reports/2026-09-06-image-style-anchor-system-verification.md`
  2. `reports/2026-09-06-image-style-anchor-restoration-verification.md`
- 작업 정비: `TRPG 데이터/작업 정비/이미지 스타일 앵커 체계 정비.md`
- 결과: 애니 페인팅과 붓터치 반실사에 각각 핵심 얼굴·중립 전신·마감 정식 앵커 3장을 설치하고 고정 영어 그림체 블록과 공통 마감 블록을 연결했다. 애니 페인팅은 마스터가 재확정한 얼굴·연령별 체형·완성 일러스트 마감 앵커로 교체했으며, 03번을 재질 표본판이 아닌 마감 앵커로 통일했다.
- 검증: 활성 앵커 `3+3`, 기존 자료 보관 `11+3+6`, 승인 애니 시안과 정식본 해시 불일치 0건, 활성 문서의 구 03번 참조 0건, 필수 스타일·그림체 보존 규칙 누락 0건을 확인했다.
- 다음: 후속 작업 없음.

### 2026-08-08-superpowers-work-lifecycle

- 작업명: Superpowers 작업 생명주기 관리 체계 정비
- 상태: 완료
- 작업 유형: 운영 체계 개편
- 시작일: 2026-08-08
- 완료일: 2026-08-08
- 설계: `specs/2026-08-08-superpowers-work-lifecycle-design.md`
- 실행 계획: `plans/2026-08-08-superpowers-work-lifecycle.md`
- 결과: 영구 작업 레지스트리 도입, Superpowers 문서의 Drive 직접 관리 체계 확립, 메인 지침 4종에 Superpowers 우선 활용 원칙 반영, 기존 Superpowers 이력 1차 전수 판정 완료
- 비고: 메인 지침 4종은 사용자 직접 덮어쓰기 후 Drive 검색으로 반영 여부를 검증했다.

### 2026-08-02-creative-support-module-migration

- 작업명: 11번 창작 지원 모듈 이관 및 개편
- 상태: 완료
- 작업 유형: 기능 구조 개편
- 시작일: 2026-08-02 이전
- 완료일: 2026-08-08 이전 완료 확인
- 실행 계획: `plans/2026-08-02-creative-support-module-migration.md`
- 결과: 11번 기능 개편은 현행 체계에 반영 완료됨
- 비고: 기존 계획서 체크박스가 미완료 형태로 남아 있으나 사용자가 실제 개편 완료를 확정했으므로 공식 상태를 `완료`로 기록한다.

### 2026-07-31-prompt-standardization-phase-1-pilots

- 작업명: TRPG 프롬프트 표준화 1단계 및 시범 이관
- 상태: 완료
- 작업 유형: 프롬프트 구조 표준화 및 기능 이관
- 시작일: 2026-07-31
- 완료일: 2026-07-31
- 설계: `specs/2026-07-31-prompt-folder-standardization-execution-design.md`
- 실행 계획: `plans/2026-07-31-prompt-standardization-phase-1-pilots.md`
- 보고서: `reports/2026-07-31-prompt-standardization-pilot-verification.md`
- 결과: 7번 룰북·19번 세션 제작 시범 표준화와 상위 규약 반영 검증 완료
- 비고: 검증 보고서에서 필수 구조·이전 경로 제거·이관 파일 무결성까지 확인됨.

### 2026-07-31-rulebook-prompt-md-reorganization

- 작업명: 룰북 관련 요청 프롬프트 Markdown 재구성
- 상태: 완료
- 작업 유형: 기능 문서 재구성
- 시작일: 2026-07-31
- 완료일: 2026-07-31
- 설계: `specs/2026-07-31-rulebook-prompt-md-reorganization-design.md`
- 실행 계획: `plans/2026-07-31-rulebook-prompt-md-reorganization.md`
- 보고서: `reports/2026-07-31-prompt-standardization-pilot-verification.md`
- 결과: 7번 룰북 기능의 마스터·지침·README·템플릿·9999 색인 구조가 현행 프롬프트 체계에 반영됨
- 비고: 독립 완료 보고서는 없으나 후속 시범 이관 검증 보고서와 현행 7번 파일 구조에서 실행 결과를 확인했다.

### 2026-07-12-trpg-agents-routing

- 작업명: TRPG 데이터 루트 AGENTS 라우팅 구축
- 상태: 완료
- 작업 유형: 상위 라우팅 체계 구축
- 시작일: 2026-07-12
- 완료일: 2026-07-12 이후 완료 확인
- 실행 계획: `plans/2026-07-12-trpg-agents-routing.md`
- 결과: TRPG 데이터 루트와 프롬프트 루트의 `AGENTS.md`가 상위 라우터로 운영되고 있으며 통합 마스터·기능 진입점·정본 경계를 안내하는 현행 구조가 존재함
- 비고: 전용 검증 보고서는 없으나 계획의 핵심 산출물인 루트 AGENTS 라우팅 구조가 현행 파일에서 확인된다.

### 2026-09-01-story-summary-guideline

- 작업명: 장기 스토리 정리 공통 지침 독립화
- 상태: 완료
- 작업 유형: 로그 분석 기능 지침 구조 개편
- 시작일: 2026-09-01
- 완료일: 2026-09-01
- 설계: `specs/2026-09-01-스토리-정리-공통-지침-설계.md`
- 실행 계획: `plans/2026-09-01-스토리-정리-공통-지침-plan.md`
- 검증 보고서: `reports/2026-09-01-스토리-정리-공통-지침-verification.md`
- 결과: `3. 로그 분석 프롬프트`에 `2. 스토리 정리 작성 지침.md`를 신설하고, 장기 스토리 정리를 세션 단위 정보흐름분석의 비순차 목록 규칙에서 분리했다. 설정 폴더의 문체·품질 원칙은 실행 참조가 아닌 독립 재정의 규칙으로 이식하여 작업 폴더와 설정 폴더 사이의 실행 의존성을 제거했다.
- 직접 적용: 사용자의 명시 요청에 따라 신규 지침 1종을 생성하고 기존 `AGENTS.md`, 마스터, `1. 로그 분석 지침서.md`는 원래 Drive ID를 유지한 채 갱신했다.

## 상태 확인 필요 이력

현재 `docs/superpowers/specs`, `plans`, `reports`에 존재하는 기존 문서는 위 작업 묶음으로 모두 분류했다. 새로운 과거 문서가 발견되면 실행 증거를 확인한 뒤 이 절에 임시 등록하고, 판정 완료 후 해당 상태 절로 이동한다.

### 2026-09-05-fvtt-sbi-ko-live-test

- 작업명: FVTT SBI 한글 자동화 실환경 검증
- 상태: 완료 (이번 시험 범위)
- 시작일: 2026-09-05
- 완료일: 2026-09-05
- 보고서: `G:/내 드라이브/TRPG 데이터/docs/superpowers/reports/2026-09-05-fvtt-sbi-ko-live-test.md`
- 작업 정비: `G:/내 드라이브/TRPG 데이터/작업 정비/FVTT SBI 한글 자동화 실환경 검증 정비.md`
- 결과: fd.get 오류 수정, 한글 임포트 및 핵심 기계 데이터 보존, 장궁 실제 공격·피해 시험 통과. 시험 Actor 4개 보존.
- 후속: 주문·Cast Activity 등 보고서의 미검증 범위는 별도 시험 대상으로 남김.
