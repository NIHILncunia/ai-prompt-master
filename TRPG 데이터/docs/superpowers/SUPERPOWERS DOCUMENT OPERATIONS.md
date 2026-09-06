# SUPERPOWERS DOCUMENT OPERATIONS

## 목적

이 문서는 `TRPG 데이터/docs/superpowers`에서 생성·관리하는 Superpowers 작업 문서의 저장·업로드·검증 규칙을 정의한다.

Superpowers 문서는 로컬 산출물로만 존재하면 관리 대상이 아니다. **Drive에 실제 생성되고 존재 검증이 끝난 시점부터 공식 작업 문서로 인정한다.**

## 필수 저장 위치

- 설계 문서: `docs/superpowers/specs/`
- 실행 계획: `docs/superpowers/plans/`
- 분석·검증·완료·인계 보고서: `docs/superpowers/reports/`
- 공식 작업 상태: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`
- 문서 운영 규칙: `docs/superpowers/SUPERPOWERS DOCUMENT OPERATIONS.md`

## 생성 필수 규칙

Superpowers 작업에서 설계·실행 계획·분석·검증·완료 추적 문서가 필요한 단계에 도달하면 해당 문서를 반드시 실제 파일로 생성한다.

**사용자의 별도 문서 작성 요청은 필요하지 않다.** 프로젝트의 모든 실질적인 작업은 시작 시 자동으로 Superpowers 적용 여부와 필요한 문서 종류를 판정한다. 장기·다단계·설계·개편·분석·검증 작업은 해당 문서를 자동 생성하고, 같은 작업 흐름에서 Drive 저장과 레지스트리 갱신까지 완료한다.

장기·다단계 작업은 시작 즉시 `SUPERPOWERS WORK REGISTRY.md`에 등록한다. 상태가 진행·중단·재개·검증·완료로 변할 때마다 레지스트리를 자동 갱신하며, 완료 시 필요한 검증/완료 보고서를 먼저 생성한 뒤 `완료`로 전환한다.

작업 폴더 내부의 장기 작업이 `TRPG 데이터/작업 정비` 대상이면 Superpowers 문서와 작업 정비 기록을 병행한다. Superpowers 문서는 설계·계획·검증·완료 이력, 작업 정비는 실제 대상별 분석·진행·확정·미결·재개 이력을 담당한다.

채팅에서 문서 내용을 설명하거나 로컬 임시 파일만 만든 상태는 문서 작성 완료로 판정하지 않는다.

## 자동 업로드 규칙

Superpowers가 새 문서를 생성하면 다음 순서를 같은 작업 흐름 안에서 수행한다.

1. 로컬 작업 파일 작성
2. 지정된 `docs/superpowers` 하위 폴더로 즉시 Drive 업로드
3. Drive 검색 또는 폴더 조회로 정확한 파일명과 위치 확인
4. 필요한 경우 파일 내용을 다시 읽어 무결성 확인
5. 검증 완료 후에만 `SUPERPOWERS WORK REGISTRY.md`에서 해당 파일을 참조

로컬 파일을 만들고 Drive 업로드를 나중으로 미루지 않는다.

## 상태 전이 게이트

다음 상태 전이에는 Drive 파일 존재가 필수다.

- `설계 중` → `설계 완료`: 설계 문서가 `specs/`에 실제 존재해야 함
- `설계 완료` → `실행 계획 완료`: 실행 계획이 `plans/`에 실제 존재해야 함
- `검증 중` → `완료`: 필요한 검증/완료 보고서가 요구된 작업이라면 `reports/`에 실제 존재해야 함

필수 문서가 누락되면 다음 상태로 진행하지 않는다.

## 레지스트리 참조 규칙

레지스트리에는 실제 Drive에서 존재를 확인한 문서만 링크한다.

파일이 삭제·이동·이름 변경되어 참조가 깨진 경우 즉시:

1. 실제 위치를 재탐색
2. 파일을 복원하거나 경로를 수정
3. 레지스트리의 기록 무결성 항목을 갱신

## 파일명 규칙

같은 작업 묶음은 basename을 통일한다.

예:

- `specs/2026-08-08-image-generation-module-design.md`
- `plans/2026-08-08-image-generation-module-plan.md`
- `specs/2026-08-08-image-generation-module-execution-spec.md`
- `reports/2026-08-08-image-generation-module-handoff.md`

## 기존 파일 수정

Superpowers가 직접 생성한 Drive 문서는 가능한 경우 기존 파일 ID를 유지한 채 갱신한다.

프로젝트의 기존 정본 파일을 수정해야 하지만 Drive 쓰기 권한이 없는 경우에만 예외적으로 원본 파일명과 경로를 유지한 덮어쓰기용 ZIP을 제공한다.

## 완료 검증

문서 작업 완료를 선언하기 전에 반드시 다음을 확인한다.

- 필요한 문서 수와 실제 생성된 파일 수가 일치함
- 파일명이 설계/계획의 참조와 일치함
- 지정 폴더에 실제 존재함
- 레지스트리 링크와 실제 경로가 일치함
- 누락 문서가 없음

하나라도 확인되지 않으면 완료로 판정하지 않는다.
