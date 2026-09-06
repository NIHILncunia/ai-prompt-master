# 룰북 주분류·분리 테이블 전환 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 보유 룰북과 검증 현황을 데이터북·시나리오북·설정북 독립 표로 전환하고 데이터북만 활성 상세 인덱스를 갖게 한다.

**Architecture:** 소유 목록은 논리 룰북 정본, 검증 현황은 실제 파일 검증과 데이터북 상세 인덱스 진행 정본으로 역할을 나눈다. 기존 검증 결과는 보존하며 비데이터북 상세 파일만 비활성 아카이브로 이동한다.

**Tech Stack:** Markdown, PowerShell 정적 검사, 로컬 Python/PDF 도구

**Spec:** `docs/superpowers/specs/2026-09-04-rulebook-primary-classification-design.md`

## 전역 제약

- 소유 목록은 파일을 나누지 않고 같은 파일 내부의 독립 표로 관리한다.
- 원본 룰북과 FVTT 저장소는 수정하지 않는다.
- 시나리오북·설정북은 별도 상세 인덱스 파일을 만들지 않는다.
- 아카이브 파일은 활성 처리 입력에서 제외한다.

## 작업

- [x] 94개 수집 룰북을 주된 사용 목적과 목차 구조에 따라 세 주분류 중 하나로 배치한다.
- [x] 소유 목록을 데이터북·시나리오북·설정북·Beyond 비교 전용 독립 표로 재작성한다.
- [x] 151개 실제 파일 검증 행을 주분류별 독립 표로 재배치하고 Y 12·N 139·파일 없음 13을 보존한다.
- [x] 데이터북 논리 룰북별 상세 인덱스 진행표와 표별 독립 진행 지점을 작성한다.
- [x] 기존 비데이터북 상세 인덱스를 검증 후 정비 아카이브로 이동한다.
- [x] Volo's Guide to Monsters와 One Grung Above 인덱스를 1번·2번으로 재번호한다.
- [x] 4번 룰북 기능 문서와 작업 정비·대시보드·레지스트리를 새 체계에 맞춘다.
- [x] 논리 룰북·실제 파일·검증 상태·표 구조·아카이브·활성 인덱스를 정적으로 검증한다.
- [x] 검증 보고서를 작성하고 레지스트리를 진행 중 상태로 동기화한다.
