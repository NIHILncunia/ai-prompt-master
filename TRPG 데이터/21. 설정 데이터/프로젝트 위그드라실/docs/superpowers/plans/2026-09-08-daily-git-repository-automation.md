# 매일 23시 Git 저장소 자동 관리 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 매일 23:00 KST에 두 Git 저장소의 변경을 안전하게 분석하고 논리 단위로 커밋한 뒤 현재 upstream으로 push하는 Codex 예약 작업을 생성한다.

**Architecture:** 기존 로컬 프로젝트 `project-yggdrail-codex`를 실행 호스트로 사용하는 cron 자동화 하나가 설정 저장소와 작업 저장소를 순서대로 처리한다. 저장소별 사전 검사, 변경 분류, 검증, 커밋, push, 알림을 하나의 작업 프롬프트에 고정하고 실패 범위는 저장소 단위로 격리한다.

**Tech Stack:** Codex 로컬 cron 자동화, Git, PowerShell, Codex 앱 자동화 관리 도구

**Spec:** `프로젝트 위그드라실/docs/superpowers/specs/2026-09-08-daily-git-repository-automation-design.md`

## Global Constraints

- 실행 시각은 매일 23:00 KST다.
- 예약 작업은 하나만 만들며 기존 로컬 프로젝트 `project-yggdrail-codex`에서 실행한다.
- 모델은 `gpt-5.6-sol`, 추론 수준은 `high`다.
- 설정 저장소 Git 루트는 `C:\Users\nihil\coding\note\project-yggdrail-codex`다.
- 작업 저장소 Git 루트는 `C:\Users\nihil\coding\ai\ai-data-master`다.
- 설정 저장소를 먼저 처리하고 작업 저장소를 이어서 처리한다.
- branch 전환·생성, pull, rebase, `reset --hard`, force push, 자동 충돌 해결, 이력 재작성은 금지한다.
- 기존 staged 변경, 진행 중인 Git 작업, 해결되지 않은 충돌, Git 잠금, 변경 후보의 최근 15분 수정, detached HEAD, 해석 불가능한 upstream이 있으면 해당 저장소를 건너뛴다.
- 변경이 없을 때에는 커밋, push, 알림을 만들지 않는다.
- 커밋 제목은 `yyyy MMdd <type>(<scope>): <한글 설명>` 형식을 사용한다.
- 비밀정보 값은 어떤 결과나 알림에도 노출하지 않는다.

## File Structure

- Modify: `.git/config` — 설정 저장소 `master`의 upstream 연결만 저장한다.
- External create: Codex 자동화 레코드 — 일정, 실행 프로젝트, 모델, 추론 수준, 실행 프롬프트를 저장한다.
- Create: `프로젝트 위그드라실/docs/superpowers/reports/2026-09-08-daily-git-repository-automation-verification.md` — 생성된 자동화의 식별자와 검증 결과를 기록한다.
- Modify: `프로젝트 위그드라실/docs/superpowers/SUPERPOWERS SETTINGS REGISTRY.md` — 작업 상태, 실행 계획, 검증 보고서, 자동화 식별자를 연결한다.

---

### Task 1: 설정 저장소 upstream 연결

**Files:**
- Modify: `.git/config`

**Interfaces:**
- Consumes: 설정 저장소 `master`, 원격 참조 `origin/master`
- Produces: `master`의 upstream `origin/master`

- [ ] **Step 1: 원격 상태를 갱신한다**

Run:

```powershell
git fetch origin
```

Expected: exit code `0`이며 `origin/master`가 해석된다.

- [ ] **Step 2: 현재 브랜치와 분기 여부를 검증한다**

Run:

```powershell
git branch --show-current
git merge-base --is-ancestor origin/master HEAD
git rev-list --left-right --count origin/master...HEAD
```

Expected: 현재 브랜치는 `master`, ancestor 검사는 exit code `0`, 원격 전용 커밋 수는 `0`이다. 하나라도 다르면 upstream을 설정하지 않고 작업을 중단한다.

- [ ] **Step 3: upstream을 연결한다**

Run:

```powershell
git branch --set-upstream-to=origin/master master
```

Expected: `branch 'master' set up to track 'origin/master'`에 해당하는 성공 결과가 나온다.

- [ ] **Step 4: 연결 결과와 작업 트리 보존을 검증한다**

Run:

```powershell
git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}'
git status --short
```

Expected: 첫 결과는 `origin/master`다. 기존 staged·unstaged·untracked 파일 상태는 upstream 연결 전과 동일하다.

### Task 2: Codex 예약 작업 생성 및 조회 검증

**Files:**
- External create: Codex 자동화 레코드

**Interfaces:**
- Consumes: 프로젝트 이름 `project-yggdrail-codex`, Task 1의 설정 저장소 upstream, 아래 확정 프롬프트
- Produces: 활성 상태의 Codex cron 자동화 식별자 `automationId: string`

- [ ] **Step 1: 실행 프로젝트를 다시 조회한다**

Codex 프로젝트 목록에서 이름이 `project-yggdrail-codex`이고 로컬 Git 저장소로 등록된 항목을 찾는다. 설계 단계에서 확인한 프로젝트 식별자는 `a4d43606-df85-4210-8497-f4cb4822baca`다. 조회 결과가 다르거나 같은 이름이 둘 이상이면 자동화를 만들지 않고 중단한다.

- [ ] **Step 2: 기존 자동화 중복 여부를 확인한다**

`C:\Users\nihil\.codex\automations\*\automation.toml`에서 이름 또는 프롬프트가 같은 자동화를 찾는다. 디렉터리가 없거나 일치 항목이 없으면 Step 3에서 새 자동화를 만든다. 일치 항목이 한 건이면 그 식별자를 사용해 새 항목을 만들지 않고 전체 설정을 갱신한다. 일치 항목이 둘 이상이면 어떤 항목도 변경하지 않고 식별자 목록을 보고한다.

Expected: 생성 또는 갱신 대상으로 사용할 자동화가 없거나 정확히 한 건이다. 2026-09-08 계획 작성 시점의 로컬 확인 결과는 자동화 디렉터리가 존재하지 않아 일치 항목이 없다.

- [ ] **Step 3: 확정 프롬프트로 자동화를 생성하거나 갱신한다**

자동화 이름은 `매일 23시 두 Git 저장소 자동 관리`로 한다. 일정은 매일 23:00 KST, 실행 환경은 로컬, 실행 프로젝트는 Step 1에서 다시 확인한 프로젝트, 모델은 `gpt-5.6-sol`, 추론 수준은 `high`, 상태는 활성으로 설정한다. 자동화 프롬프트는 다음 내용을 그대로 사용한다.

```text
매일 설정 저장소와 작업 저장소의 Git 루트 전체를 순서대로 점검하고, 안전한 변경이 있을 때만 논리적인 단위로 커밋한 뒤 현재 브랜치의 upstream으로 push한다.

대상과 순서:
1. 설정 저장소: C:\Users\nihil\coding\note\project-yggdrail-codex
2. 작업 저장소: C:\Users\nihil\coding\ai\ai-data-master

각 저장소는 독립적으로 처리한다. 한 저장소가 중단되거나 일부 변경 단위가 실패해도 다른 저장소의 처리는 계속한다.

각 저장소에서 먼저 대상 경로와 Git 저장소 여부, 현재 브랜치, upstream, Git 잠금, 해결되지 않은 충돌, merge·rebase·cherry-pick 진행 상태를 확인한다. 실행 전에 staged 변경이 있거나 Git 상태에서 확인된 변경 후보 중 최근 15분 이내 수정된 파일이 있거나 HEAD가 분리되어 있거나 upstream을 해석할 수 없으면 해당 저장소를 변경하지 말고 건너뛴다. 브랜치를 전환하거나 새 브랜치를 만들지 말고 staged 변경을 해제하지 않는다.

원격 상태는 fetch로만 갱신한다. pull, rebase, reset --hard, force push, 자동 충돌 해결, amend를 실행하지 않는다. upstream보다 뒤처졌거나 로컬과 원격이 분기되었으면 해당 저장소를 중단한다. 로컬에만 존재하는 기존 커밋은 저장소 상태, 변경 연속성, push 안전성을 분석해 함께 push할 수 있다. 안전성을 확정할 수 없으면 기존 로컬 커밋을 유지하고 해당 저장소를 중단한다.

추적 파일 변경, 삭제, 이름 변경, untracked 파일을 모두 분석한다. 예약 작업 생성 전에 존재한 변경도 같은 기준으로 처리하며 별도로 남겨 둘 변경 묶음은 없다. 새로 추적되려는 .env, 인증서, 개인 키, 토큰, 자격 증명 또는 비밀정보 후보를 발견하면 해당 저장소 전체를 중단한다. 알림에는 파일 경로와 차단 사유만 적고 비밀값을 노출하지 않는다.

삭제 안전성은 고정 개수가 아니라 전체 변경 대비 삭제 비율, 디렉터리 단위 소실, 이동·이름 변경·형식 변환의 대체 파일, 저장소 문맥을 함께 분석한다. 정상적인 대량 이동·이름 변경·형식 변환임을 검증할 수 있으면 진행할 수 있다. 삭제 의도나 대체 관계가 불분명하면 해당 저장소 전체를 중단한다.

변경은 기능, 데이터, 문서, 수정, 리팩터링, 운영 지침 등 성격과 직접 의존 관계에 따라 논리적인 커밋 단위로 분류한다. 파일 하나의 변경을 hunk로 나누는 것은 서로 독립적임이 명확하고 부분 stage 뒤 staged diff를 재검증할 수 있을 때만 허용한다. 불명확하면 파일 전체를 관련 단위에 함께 둔다.

각 논리 단위를 stage한 뒤 staged diff에 의도한 변경만 있는지 다시 읽고 git diff --check를 실행한다. 저장소 지침이나 변경 유형에 맞는 추가 검사 명령이 있으면 함께 실행한다. 검증에 실패한 단위는 커밋하지 않으며, 실패 단위와 독립적인 다른 단위는 계속 처리할 수 있다.

커밋 제목은 yyyy MMdd <type>(<scope>): <한글 설명> 형식으로 작성한다. 변경 내용이 많으면 커밋 본문에 한글 불릿으로 주요 내용을 기록한다. 타입과 scope는 실제 변경 성격과 저장소 문맥에 맞게 정한다.

저장소별 안전한 커밋이 모두 끝나면 현재 upstream으로 한 번 push한다. push 실패 시 이미 만든 로컬 커밋과 아직 커밋하지 않은 작업 트리 변경을 그대로 보존한다. 앞서 생성한 정상 커밋을 자동으로 되돌리거나 이력을 재작성하지 않는다.

두 저장소 모두 변경이 없으면 알리지 않는다. 커밋과 push가 성공하면 저장소, 브랜치, 생성한 커밋 목록을 알린다. 저장소를 건너뛰면 저장소와 구체적인 사유를 알린다. 검증이나 push가 실패하면 실패 단계와 보존된 로컬 상태를 알린다.
```

Expected: 자동화 생성 또는 갱신 결과가 고유 `automationId`를 반환하고 상태가 활성으로 표시된다.

- [ ] **Step 4: 생성되거나 갱신된 자동화를 다시 조회한다**

생성 결과의 식별자로 자동화를 조회한다.

Expected: 이름, 매일 23:00 KST 일정, 로컬 실행 환경, 프로젝트 식별자, `gpt-5.6-sol`, 추론 수준 `high`, 활성 상태, 전체 프롬프트가 Step 2와 일치한다.

- [ ] **Step 5: 중복 자동화가 없는지 다시 확인한다**

같은 이름과 목적의 기존 자동화가 함께 활성화되어 있지 않은지 로컬 자동화 목록을 확인한다.

Expected: `매일 23시 두 Git 저장소 자동 관리` 목적의 활성 자동화가 방금 검증한 한 건뿐이다. 중복이 있으면 새 자동화를 추가로 만들지 말고 기존 항목과 생성 항목의 식별자를 보고한다.

### Task 3: 검증 기록과 레지스트리 완료 처리

**Files:**
- Create: `프로젝트 위그드라실/docs/superpowers/reports/2026-09-08-daily-git-repository-automation-verification.md`
- Modify: `프로젝트 위그드라실/docs/superpowers/SUPERPOWERS SETTINGS REGISTRY.md`

**Interfaces:**
- Consumes: Task 1의 upstream 검증 결과, Task 2의 자동화 식별자와 조회 결과
- Produces: 재검증 가능한 완료 기록과 레지스트리 연결

- [ ] **Step 1: 검증 보고서를 작성한다**

보고서에 다음 값을 실제 조회 결과로 기록한다.

```markdown
# 매일 23시 Git 저장소 자동 관리 검증 보고서

## 검증 대상

- 자동화 이름: 매일 23시 두 Git 저장소 자동 관리
- 자동화 식별자: Task 2에서 반환된 automationId 값
- 실행 프로젝트: project-yggdrail-codex
- 프로젝트 식별자: a4d43606-df85-4210-8497-f4cb4822baca

## 검증 결과

- 실행 일정: 매일 23:00 KST
- 실행 환경: 로컬
- 모델: gpt-5.6-sol
- 추론 수준: high
- 상태: 활성
- 설정 저장소 upstream: origin/master
- 작업 저장소 upstream: origin/master
- 중복 활성 자동화: 없음

## 안전 규칙 확인

- 작업 중 변경 보호 포함
- fetch 전용 원격 확인 포함
- 충돌 자동 해결과 이력 재작성 금지 포함
- 비밀정보와 불명확한 삭제 차단 포함
- 논리 단위 커밋과 staged diff 재검증 포함
- 저장소별 실패 격리와 조건부 알림 포함
```

`자동화 식별자` 행에는 설명 문구를 남기지 않고 Task 2에서 반환된 `automationId` 문자열을 기록한다.

- [ ] **Step 2: 레지스트리를 완료 상태로 갱신한다**

`2026-09-08-daily-git-repository-automation` 항목을 다음 기준으로 수정한다.

- 상태를 `완료`로 변경한다.
- 실행 계획 `plans/2026-09-08-daily-git-repository-automation.md`를 연결한다.
- 검증 보고서 `reports/2026-09-08-daily-git-repository-automation-verification.md`를 연결한다.
- 자동화 식별자와 완료일 `2026-09-08`을 기록한다.
- 결과에 매일 23:00 KST, 두 Git 루트, 모델과 추론 수준, 활성 상태를 요약한다.
- `다음` 항목은 제거한다.

- [ ] **Step 3: 문서 변경을 검증한다**

Run:

```powershell
git diff --check -- '프로젝트 위그드라실/docs/superpowers/SUPERPOWERS SETTINGS REGISTRY.md' '프로젝트 위그드라실/docs/superpowers/reports/2026-09-08-daily-git-repository-automation-verification.md'
git diff -- '프로젝트 위그드라실/docs/superpowers/SUPERPOWERS SETTINGS REGISTRY.md' '프로젝트 위그드라실/docs/superpowers/reports/2026-09-08-daily-git-repository-automation-verification.md'
```

Expected: `git diff --check`가 exit code `0`이며 diff에는 자동화 완료 기록만 포함된다.

- [ ] **Step 4: 완료 기록만 커밋한다**

Run:

```powershell
git add -- '프로젝트 위그드라실/docs/superpowers/SUPERPOWERS SETTINGS REGISTRY.md' '프로젝트 위그드라실/docs/superpowers/reports/2026-09-08-daily-git-repository-automation-verification.md'
git diff --cached --check
git diff --cached
git commit -m '2026 0908 docs(automation): Git 자동 관리 구축 기록' -m '- 자동화 일정과 실행 설정 검증 결과를 기록' -m '- 설정 레지스트리에 자동화 식별자와 완료 상태를 연결'
```

Expected: 커밋에는 레지스트리의 해당 작업 변경과 새 검증 보고서만 포함된다. 기존의 다른 staged·unstaged·untracked 변경은 그대로 보존된다.

- [ ] **Step 5: 최종 상태를 확인한다**

Run:

```powershell
git show --stat --oneline HEAD
git status --short
```

Expected: 최신 커밋은 자동화 구축 기록 2개 파일만 포함한다. 기존 사용자 변경은 삭제되거나 덮어써지지 않고 작업 트리에 남아 있다.
