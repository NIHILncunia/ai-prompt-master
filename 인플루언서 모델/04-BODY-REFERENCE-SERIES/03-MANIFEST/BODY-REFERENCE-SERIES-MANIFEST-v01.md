# BODY REFERENCE SERIES — Manifest v01

## Purpose

Approved semi-realistic 2.5D morphology-reference library for fictional adult women. This is an explicit project exception to the normal photoreal commercial-model default, retained because the user selected semi-realistic 2.5D for this body-comparison use case. Images are nonsexual, full-body, and use an opaque matte gray full-length unitard on a plain studio background.

## Series rule

The visual comparison target is the stepwise change in upper-torso volume and silhouette. This library is an approved **reference collection**, not a controlled single-subject study: faces and non-target body details may differ across images. Facial identity is **not** a series lock.

The assets are `MORPHOLOGY REFERENCE / APPROVED / NON-IDENTITY`. They must never be used as a `MODEL` FACE MASTER, BODY MASTER, Body Signature, or identity-preservation anchor. A future controlled series, if built, must use its own separate storage and manifest.

## Levels

| Level | Korean label | Nominal reference | Intent |
| --- | --- | --- | --- |
| L01 | 무유 | 75AA | Minimal / near-flat upper-torso silhouette |
| L02 | 미유 | 75A | Very small but visible silhouette |
| L03 | 빈유 | 75B–C | Clearly recognizable small silhouette |
| L04 | 보통유 | 75D | Moderate central reference |
| L05 | 풍유 | 75E–F | Distinctly full reference |
| L06 | 거유 | 75G–H | Large reference |
| L07 | 폭유 | 75I | Final maximum reference |

These nominal references are project labels only, not clinical or standardized sizing measurements.

## Storage map

- `00-ORIGINALS`: User-supplied initial outputs, preserved unchanged.
- `01-APPROVED/L01-MUYU` through `L07-BAKUNYU`: usable v01/v02 reference images.
- `01-APPROVED/00-SHARED`: one common BACK reference used by all levels; stored once, never duplicated.
- `02-REVIEW`: generated candidates or rejected versions; never use as the current anchor.
- `03-MANIFEST`: this file and future coverage/QC notes.

## Current coverage

| View | L01 | L02 | L03 | L04 | L05 | L06 | L07 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FRONT | approved v01 | approved v01 | approved v01 | approved v01 | approved v01 | **approved v02** | approved v01 |
| SIDE | approved v01 | approved v01 | approved v01 | approved v01 | approved v01 | approved v01 | approved v01 |
| BACK | shared v01 | shared v01 | shared v01 | shared v01 | shared v01 | shared v01 | shared v01 |

## QC decisions

- A prior L06 front `v01` has an anomalous head/neck/collarbone connection and is retained only in `02-REVIEW`.
- L06 front `v02` repaired the neck, jaw, and clavicle continuity and is the current approved L06 front reference.
- The current L06 side candidate with inconsistent long sleeves remains in `02-REVIEW`; a sleeveless `L06 SIDE v01` has been approved instead.
- L07 SIDE v01 has been generated and approved with a visibly stronger forward garment silhouette than L06 SIDE v01.
- Level changes must be judged primarily from FRONT and exact SIDE views. BACK is intentionally one common skeletal/pose check because the upper-torso difference is not directly visible from behind. The shared file is `BODY-SERIES-BACK-SHARED-v01.png`.
- The library is formally approved for reference use despite identity and full-frame variation between levels. It is not approved as a controlled same-body measurement series.

## Naming

`BODY-L##-LABEL-VIEW-v##.png`

Example: `BODY-L06-KYONYU-FRONT-v02.png`
