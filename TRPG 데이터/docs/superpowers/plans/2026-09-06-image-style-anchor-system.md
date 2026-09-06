# Image Style Anchor System Implementation Plan

> **For Codex:** Apply this plan in the current synchronized non-Git workspace. Preserve old assets in archive folders, then verify every move and copy by count and hash.

**Goal:** Replace the diffuse style-reference system with two fixed, reproducible three-anchor style contracts while preserving source-image style by default in reference and highlight workflows.

**Architecture:** Style ownership is split into a style-specific drawing-language block and one shared painterly-finish block. Functional prompts own only changing content and composition. Active anchor folders contain three canonical files per style; superseded samples remain recoverable in inactive archive folders.

**Tech Stack:** Markdown prompt contracts, PNG reference assets, PowerShell filesystem validation, SHA-256 verification.

**Design:** `docs/superpowers/specs/2026-09-06-image-style-anchor-system-design.md`

---

### Task 1: Register and inventory the work

**Files:**
- Modify: `docs/superpowers/SUPERPOWERS WORK REGISTRY.md`
- Modify: `작업 정비/작업 정비 현황.md`
- Create: `작업 정비/이미지 스타일 앵커 체계 정비.md`

1. Register the work as in progress in both tracking systems.
2. Record the six selected source files, their hashes, and the active/archive destinations.
3. Verify all source files and current old-anchor folders exist.

### Task 2: Install the canonical anchor packs

**Files:**
- Move: `라이브러리/견본/애니 페인팅/*.png` to the anime archive folder.
- Move: `라이브러리/견본/스타일/반실사 포트레이트/*.png` to the semi-real archive folder.
- Create: three canonical PNG copies in each active style folder.

1. Resolve and assert all paths remain under the image-module library root.
2. Move the 11 old anime anchors and 6 old semi-real samples into separate archive folders.
3. Copy the six selected result images into canonical names without trailing draft numbers.
4. Verify counts and SHA-256 equality.

### Task 3: Replace the style contracts

**Files:**
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/스타일/공통 붓터치 마감 규칙.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/스타일/애니 페인팅.md`
- Modify: `1. 프롬프트/1. 이미지 생성 모듈/라이브러리/스타일/붓터치 반실사.md`

1. Define one verbatim common English finish block.
2. Define one verbatim English drawing-language block per style.
3. Define three-anchor roles, the maximum-two selection matrix, and content-composition exclusions.
4. Define source-image design/style priority and prohibited style drift.

### Task 4: Connect the module and portrait flow

**Files:**
- Modify: module `AGENTS.md`, `README.md`, and master prompt.
- Modify: portrait `AGENTS.md`, master prompt, common guide, README, and quality rules.

1. Apply the visual-anchor hard gate to both official styles.
2. Require the exact canonical anchor filenames in the requirements sheet and final prompt review.
3. Require verbatim insertion of the selected style block and common finish block.
4. Remove active references to the old 11-anchor matrix.

### Task 5: Preserve supplied image style in derivative workflows

**Files:**
- Modify: character reference V1 AGENTS, master prompt, common guide, and README.
- Modify: character reference V2 AGENTS, master prompt, common guide, and README.
- Modify: session highlight AGENTS, master prompt, common guide, and README.

1. Preserve the supplied reference image's drawing style by default.
2. Use a named official style only when the user explicitly requests a style change.
3. When overridden, keep the supplied image as the design reference and apply the selected style anchor as style-only.

### Task 6: Verify and close

**Files:**
- Create: `docs/superpowers/reports/2026-09-06-image-style-anchor-system-verification.md`
- Modify: registry and work-maintenance documents.

1. Run count, filename, hash, stale-reference, required-text, and Markdown-path checks.
2. Record actual command evidence and any non-applicable Git checks.
3. Mark both tracking systems complete only after all checks pass.

