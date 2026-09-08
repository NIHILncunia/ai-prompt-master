# 룰북 PDF 원본 전환 문서 정합성 정비 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `0. 룰북`의 룰북 원본이 PDF 148개로 전환된 현재 상태를 모든 활성 레지스트리·검증 현황·작업 추적 문서에 일관되게 반영한다.

**Architecture:** 실제 파일 시스템과 PDF 내부 구조를 근거로 논리 룰북-실제 파일 관계를 재구성한다. 논리 룰북 수와 원본 검증 상태는 유지하되, 분할 PDF와 합본 PDF의 관계·고유 파일 수·검증 행 수를 분리해 기록한다.

**Tech Stack:** Markdown, PowerShell, Git, SHA-256, pypdf 6.16.2

**Spec:** `docs/superpowers/specs/2026-09-04-rulebook-primary-classification-design.md`

## Global Constraints

- 기존 미커밋 변경을 보존하고 이번 작업과 직접 관련된 문장만 수정한다.
- 룰북 PDF는 읽기 전용 입력으로 취급하고 재저장·변환·삭제하지 않는다.
- `0. 룰북` 루트의 룰북 원본과 `0. 룰북/문서`의 운영 Markdown을 구분한다.
- 합본·분할본·상위 룰북 수록 관계는 중복 파일로 오판하지 않는다.
- 원본 전체 검증을 수행하지 않은 룰북은 `원본 확인 N`을 유지한다.

---

### Task 1: 실제 원본과 교체 관계 검증

**Files:**

- Read: `0. 룰북/*.pdf`
- Read: `C:/Users/nihil/Downloads/룰북/*.pdf`

- [x] **Step 1: 룰북 원본 형식과 수량 집계**

  `0. 룰북` 직계 파일을 집계해 PDF 148개, 룰북 원본 Markdown 0개인지 확인한다.

- [x] **Step 2: 다운로드 원본과 저장본 동일성 확인**

  마스터가 지정한 PDF 24개의 파일 크기와 SHA-256을 다운로드 폴더와 `0. 룰북`에서 비교한다.

- [x] **Step 3: PDF 구조 확인**

  pypdf로 24개 PDF의 열기·암호화·페이지 수·분할 경계를 확인하고, `Spelljammer - Adventures in Space.pdf`의 세 수록 룰북 시작 페이지를 찾는다.

### Task 2: 룰북 레지스트리와 공통 출처 규칙 갱신

**Files:**

- Modify: `1. 프롬프트/4. 룰북 관련 요청 프롬프트/9999. D&D 룰북 소유 리스트.md`
- Modify: `0. 룰북/문서/00. NotebookLM 룰북 데이터 작업 마스터 지침.md`
- Modify: `0. 룰북/문서/01. 룰북 목록 및 소스 파일 레지스트리.md`
- Modify: `0. 룰북/문서/02. 공통 인덱싱 및 출처 표기 지침.md`

- [x] **Step 1: 제거된 Markdown 원본 참조 11개를 현재 PDF 연결로 교체**

  Baldur’s Gate Gazetteer, Explorer's Guide to Wildemount, Frozen Sick, Strixhaven, Boo's Astral Menagerie, Light of Xaryxis, The Astral Adventurer's Guide, Monsters of the Multiverse, Glory of the Giants, Lorwyn, Monster Manual, Netheril’s Fall의 실제 파일 연결을 갱신한다. 미연결 PDF 15개를 새로 연결하고 Baldur’s Gate Gazetteer는 기존 Descent into Avernus PDF의 수록 관계로 연결한다.

- [x] **Step 2: PDF 전용 원본 규칙 반영**

  룰북 원본은 PDF 148개이며 원본 Markdown은 0개임을 기록하고, 운영 지침 Markdown과 룰북 원본을 구분한다.

- [x] **Step 3: 합본·수록 관계 명시**

  `Spelljammer - Adventures in Space.pdf`, `Explorer's Guide to Wildemount` 분할본, `Baldur’s Gate - Descent into Avernus.pdf`가 여러 논리 항목에 연결되는 관계를 명시한다.

### Task 3: 검증 현황과 장기 작업 상태 갱신

**Files:**

- Modify: `작업 정비/룰북 인덱싱 및 FVTT 컴펜디움 이관 체계/FVTT 룰북 검증 및 갱신 현황.md`
- Modify: `작업 정비/룰북 인덱싱 및 FVTT 컴펜디움 이관 체계 정비.md`
- Modify: `작업 정비/작업 정비 현황.md`
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`

- [x] **Step 1: 파일별 검증 행 재계산**

  데이터북 54행, 시나리오북 58행, 설정북 40행, Beyond 비교 전용 14행, 합계 166행과 `Y 17 / N 149 / 실제 파일 없음 13`을 반영한다.

- [x] **Step 2: 고유 PDF 수와 공유 관계 분리 기록**

  검증 행은 논리 룰북 연결 기준 166행이며 실제 고유 PDF는 148개임을 분리한다.

- [x] **Step 3: Boo's Astral Menagerie 재개 지점 복원**

  불완전 Markdown 때문에 건너뛴 과거 이력은 보존하되, 완전한 합본 PDF 확보로 데이터북 현재 대상을 Boo's Astral Menagerie로 되돌린다.

- [x] **Step 4: 삭제된 Google Sheet 참조 제거**

  현황 문서의 원본 대조 자료를 삭제된 Google Sheet URL에서 Markdown 전환 보존본과 현재 정본으로 교체한다.

### Task 4: 정적 검증과 완료 보고

**Files:**

- Create: `docs/superpowers/reports/2026-09-08-rulebook-pdf-source-reconciliation-verification.md`

- [x] **Step 1: 실제 파일-레지스트리 집합 대조**

  레지스트리의 `.pdf` 코드 스팬과 `0. 룰북`의 PDF 파일명 집합을 비교해 누락·유령 참조가 0건인지 확인한다.

- [x] **Step 2: 활성 룰북 원본 Markdown 참조 검사**

  보존본·과거 이력·상세 인덱스 산출물은 제외하고, 활성 소스 레지스트리와 검증 표의 룰북 원본 `.md` 참조가 0건인지 확인한다.

- [x] **Step 3: 집계와 Markdown 형식 검사**

  표 행 수, 분류 합계, `git diff --check`, 수정 파일 존재 여부를 검증한다.

- [x] **Step 4: 검증 보고서와 레지스트리 완료 상태 갱신**

  실행 근거·수정 범위·검증 결과·남은 위험을 보고서에 기록하고 장기 작업의 현재 상태를 갱신한다.
