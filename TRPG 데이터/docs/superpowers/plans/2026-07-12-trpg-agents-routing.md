# TRPG Data AGENTS Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a root `AGENTS.md` that makes the 14-prompt collection and adjacent rulebook/log data accessible from the TRPG data root.

**Architecture:** Keep `AGENTS.md` as a compact router: it identifies the canonical master prompt, names every feature and its entry point, and defines local data paths and source-of-truth boundaries. Detailed feature rules remain in their own prompt documents.

**Tech Stack:** Markdown, locally synced Google Drive workspace.

## Global Constraints

- Address the user as `마스터` and respond in Korean with a calm, professional tone.
- Treat `G:\내 드라이브\TRPG 데이터\1. 프롬프트\0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md` as the routing authority.
- Do not duplicate per-feature rules in the root router.
- Before referencing the prompt collection, begin the response with `구글 드라이브에 접근을 시도합니다.`
- For image-generation requests, expose the requirement confirmation and final English prompt, then wait for explicit approval before calling an image tool.

---

### Task 1: Create root prompt-routing guidance

**Files:**
- Create: `G:\내 드라이브\TRPG 데이터\AGENTS.md`
- Test: `G:\내 드라이브\TRPG 데이터\AGENTS.md`

**Interfaces:**
- Consumes: The root master prompt and the 14 existing feature folders under `1. 프롬프트`.
- Produces: A repository-level instruction document that routes future requests to the appropriate master prompt and adjacent data folders.

- [ ] **Step 1: Confirm the canonical source and entry-point files exist**

Run:

```powershell
Test-Path -LiteralPath 'G:\내 드라이브\TRPG 데이터\1. 프롬프트\0. TRPG 데이터 프롬프트 통합 마스터 프롬프트.md'
Get-ChildItem -LiteralPath 'G:\내 드라이브\TRPG 데이터\1. 프롬프트' -Directory | Measure-Object
```

Expected: the master-prompt path returns `True` and the feature directory listing contains the numbered prompt folders 1 through 14.

- [ ] **Step 2: Write the root router**

Create `AGENTS.md` with these sections: workspace convention, prompt master and mandatory response marker, 14-feature routing table, adjacent `0. 룰북` and `2. 로그` paths, source-of-truth boundaries, and image-generation approval gate.

- [ ] **Step 3: Verify all documented paths and required policies**

Run:

```powershell
rg -n '0\. TRPG 데이터 프롬프트 통합 마스터 프롬프트|0\. 룰북|2\. 로그|14\. 게임 아이콘 생성 프롬프트|구글 드라이브에 접근을 시도합니다\.|이미지 생성' 'G:\내 드라이브\TRPG 데이터\AGENTS.md'
```

Expected: every required routing and safety phrase is present in `AGENTS.md`.

- [ ] **Step 4: Confirm the working tree change**

Run:

```powershell
git status --short
```

Expected: if this workspace is later initialized as Git, the status lists `AGENTS.md`; otherwise Git reports that the directory is not a repository and no commit is attempted.
