# 프로젝트·월드·카테고리 초기 시드 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 프로젝트 위그드라실과 룩스테라·엘드로스 월드, 각 월드의 초기 카테고리 계층을 MySQL 8 시드 SQL로 생성한다.

**Architecture:** 프로젝트 소유 ADMIN ID를 세션 변수로 받는다. 공통 카테고리 97개를 두 월드에 생성하고, 룩스테라의 용종 17개와 엘드로스의 클래스 3개를 추가한다. 부모 카테고리를 먼저 넣고 그 ID로 서브 1 카테고리를 연결한다.

**Tech Stack:** PostgreSQL·SQLite, SQL 트랜잭션, 임시 시드 테이블.

## Global Constraints

- 테이블·컬럼명은 `문서 관리 시스템 데이터베이스 명세서`를 따른다.
- 카테고리는 `upper_category_id` 자기참조와 최대 3단계만 사용한다.
- 초기 데이터에는 1·2단계만 생성하며 `template_id`는 `NULL`이다.
- 룩스테라는 114개, 엘드로스는 100개 카테고리를 생성한다.

---

### Task 1: 프로젝트와 월드 시드

**Files:**
- Create: `설정 정비/데이터베이스 이관 사전 작업/초기 프로젝트·월드·카테고리 시드.postgresql.sql`
- Create: `설정 정비/데이터베이스 이관 사전 작업/초기 프로젝트·월드·카테고리 시드.sqlite.sql`

- [x] 프로젝트 소유 `ADMIN` ID 변수와 실행 전제조건을 작성한다.
- [x] `프로젝트 위그드라실` 프로젝트를 생성하고 생성 ID를 저장한다.
- [x] 룩스테라와 엘드로스 월드를 생성하고 각 ID를 저장한다.
- [x] 두 월드의 생성 여부를 검증하는 조회문을 작성한다.

### Task 2: 카테고리 계층 시드

**Files:**
- Modify: `설정 정비/데이터베이스 이관 사전 작업/초기 프로젝트·월드·카테고리 시드.sql`

- [x] 공통 97개 카테고리와 세계별 확장 20개를 임시 시드 데이터로 정의한다.
- [x] 메인 카테고리를 먼저 생성하고, 서브 1 카테고리를 부모 ID와 연결한다.
- [x] 3단계 카테고리를 만들지 않고 `templateId`를 `NULL`로 유지한다.
- [x] 월드별 총 카테고리 수와 최대 깊이를 검증하는 조회문을 작성한다.

### Task 3: 정적 검증

**Files:**
- Test: `설정 정비/데이터베이스 이관 사전 작업/초기 프로젝트·월드·카테고리 시드.sql`

- [x] SQL에 프로젝트 1개·월드 2개·카테고리 시드 214개가 정의됐는지 확인한다.
- [x] 룩스테라 114개, 엘드로스 100개, 최대 레벨 2를 검증하는 쿼리를 확인한다.
- [x] `git diff --check`으로 공백 오류를 확인한다.
