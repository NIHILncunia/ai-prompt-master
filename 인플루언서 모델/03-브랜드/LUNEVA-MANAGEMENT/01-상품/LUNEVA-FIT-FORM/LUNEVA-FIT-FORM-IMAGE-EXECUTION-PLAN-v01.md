# LUNEVA FIT FORM Image Implementation Plan

> **For agentic workers:** Execute this plan inline with one user-facing review gate per image-generation task. Each generation approval is single-use.

**Goal:** Create and approve the LUNEVA FIT FORM design board and the six individual F-01/M-01 mannequin master images before resuming FIT FORM fitting-master generation.

**Architecture:** The system design board is the visual review artifact; it does not replace individual masters. F-01 and M-01 each receive separate FRONT, LEFT SIDE, and BACK master files. Every image uses the approved system specification and is inspected immediately after generation before the next asset is proposed.

**Tech Stack:** ChatGPT image generation, Google Drive, LUNEVA FIT FORM system specification v01, image-generation approval and QA procedure.

**Spec:** `LUNEVA-FIT-FORM-SYSTEM-SPEC-v01.md`

## Global Constraints

- Body: Lunar Ivory `#F6F1E8` matte hard resin.
- Joints and connections: matte grayscale metal.
- Marks: small approved Orbit Frame symbols only on both outer shoulder caps.
- Base: low Noir Ink `#101117` circular base and a thin rear-calf support rod.
- Face: faceless oval head with only a minimal ear contour; no hair or human facial features.
- Joints only at neck, shoulders, elbows, wrists, hips, knees, and ankles.
- Torso, ribcage, waist, and abdomen remain one uninterrupted body shell.
- F-01: standard female fitting body, approximately 165 cm-equivalent.
- M-01: slim standard male fitting body, approximately 178 cm-equivalent.
- No living model, hands, styling props, clothing redesign, pseudo-text, watermark, or real brand mark.
- A generated asset is not promoted to MASTER / ACTIVE until its own visual review passes.

---

### Task 1: Generate the system design board

**Files:**
- Create: `LUNEVA-FIT-FORM-SYSTEM-DESIGN-v01.png`
- Store: `00-FITTING-TOOLS/`
- Reference: `LUNEVA-FIT-FORM-SYSTEM-SPEC-v01.md`

**Consumes:** Approved v01 system specification.

**Produces:** One 16:9 review board containing F-01 and M-01 in FRONT, LEFT SIDE, and BACK views with the same materials, joints, logos, base, and support design.

- [ ] Prepare a 15-section image requirement checklist and final English prompt for one landscape design board.
- [ ] Run the P00–P10 pre-generation check; correct all failures before publishing the checklist.
- [ ] Obtain explicit image-generation approval from the user.
- [ ] Generate one board and inspect: count six complete figures; confirm both shoulder symbols, joint placement, faceless heads, single-piece torsos, and rear-calf supports.
- [ ] Upload only a passing board. If it fails, keep it in REVIEW and return with a corrected new checklist.

### Task 2: Generate F-01 FRONT master

**Files:**
- Create: `F-01/LUNEVA-FIT-FORM-F-01-FRONT-v01.png`
- Store: `00-FITTING-TOOLS/F-01/`
- Reference: approved system design board and system specification.

**Consumes:** Passing system design board and approved v01 system specification.

**Produces:** One F-01 full-body FRONT master with a neutral stance.

- [ ] Prepare and publish a dedicated 15-section requirement checklist and final English prompt.
- [ ] Obtain explicit approval, generate one image, and inspect head, torso, logo placement, joints, base, and symmetric stance.
- [ ] Promote the passing image to MASTER / ACTIVE and upload it. Preserve rejected variants in REVIEW.

### Task 3: Generate F-01 LEFT SIDE and BACK masters

**Files:**
- Create: `F-01/LUNEVA-FIT-FORM-F-01-LEFT-SIDE-v01.png`
- Create: `F-01/LUNEVA-FIT-FORM-F-01-BACK-v01.png`
- Store: `00-FITTING-TOOLS/F-01/`
- Reference: approved F-01 FRONT master and system specification.

**Consumes:** Passing F-01 FRONT master and approved v01 system specification.

**Produces:** Two individual F-01 masters, each generated and approved in its own image-generation turn.

- [ ] Create a fresh requirement checklist and approval request for LEFT SIDE; generate and inspect a true left profile with visible side shoulder mark and rear-calf support alignment.
- [ ] Create a fresh requirement checklist and approval request for BACK; generate and inspect rear symmetry, base alignment, and both shoulder marks where visible.
- [ ] Upload each passing image separately; do not combine the two views in one file.

### Task 4: Generate M-01 FRONT, LEFT SIDE, and BACK masters

**Files:**
- Create: `M-01/LUNEVA-FIT-FORM-M-01-FRONT-v01.png`
- Create: `M-01/LUNEVA-FIT-FORM-M-01-LEFT-SIDE-v01.png`
- Create: `M-01/LUNEVA-FIT-FORM-M-01-BACK-v01.png`
- Store: `00-FITTING-TOOLS/M-01/`
- Reference: approved system design board and system specification.

**Consumes:** Passing system design board and approved v01 system specification.

**Produces:** Three individual M-01 masters, each generated and approved in its own image-generation turn.

- [ ] Generate FRONT first, then LEFT SIDE, then BACK, each with a fresh checklist and explicit approval.
- [ ] Inspect the male fitting proportion independently of F-01 while preserving all common materials, joint locations, logo placements, base, support, and pose rules.
- [ ] Upload each passing image as MASTER / ACTIVE; retain failed variants as REVIEW only.

### Task 5: Activate the mannequin system for FIT FORM fitting masters

**Files:**
- Modify: `LUNEVA-FIT-FORM-SYSTEM-SPEC-v01.md`
- Modify: `LUNEVA-INNER-WEAR` product manifest

**Consumes:** Passing design board and all six MASTER / ACTIVE images.

**Produces:** An ACTIVE mannequin system and a resumed FIT FORM fitting-master sequence.

- [ ] Verify all six files are present, directionally correct, and linked to the approved design board.
- [ ] Update the system specification status from PENDING GENERATION to MASTER / ACTIVE with the approved filenames.
- [ ] After `LUNEVA INNER WEAR` PRODUCT MASTER is approved, create its FIT FORM FITTING MASTER using F-01. The top and boyshorts remain one set product, and each required set view receives a new checklist and explicit approval.

## Plan Review

- Spec coverage: Tasks 1–4 cover the design board and six required masters. Task 5 covers activation and the held product-master workflow.
- Placeholder scan: No open implementation placeholders; all later actions are explicit approval-gated image tasks.
- Consistency check: F-01/M-01 identifiers, three-view filenames, materials, joint locations, support position, and storage path match `LUNEVA-FIT-FORM-SYSTEM-SPEC-v01.md`.
