# Portfolio Project Card Image System

This document defines the shared visual system for **portfolio project card images** used across:
- `/portfolio` project cards (`coverImage`)
- homepage featured project cards when image variants are introduced

Use this system as the source of truth before creating or replacing any project card image.

## Scope

- In scope: portfolio project card artwork (`coverImage` assets)
- Out of scope: hero images, blog imagery, OG images, global brand direction

## Shared visual rules

### 1) Composition
- Centered focal system (not edge-anchored)
- 3 to 5 core elements maximum (medium density)
- Layered panels, cards, or nodes with clear flow direction
  - left → right **or** top → bottom only
- Preserve outer negative space for crop safety
  - keep key elements inside central 70% width and 70% height

### 2) Style
- Minimal, high-contrast, editorial product-systems illustration
- Restrained brutalist attitude (sharp edges, structural hierarchy, no decorative noise)
- Diagram-first visual language (abstracted product systems, not literal screenshots)

### 3) Surfaces and palette
- Background: dark neutral only (charcoal / off-black / soft gray)
- Structural UI/forms/nodes: light neutral surfaces with crisp edges
- One muted accent color per project image
- Non-accent colors stay shared across all project images

### 4) Density and framing
- Medium information density
- Avoid clutter, repeated arrows, and tiny illegible micro-details
- Keep visual weight balanced around center for responsive cropping

### 5) Hard avoid list
Do not use:
- robots
- glowing AI brains
- stock-photo humans
- neon cyberpunk treatment
- generic arrows everywhere
- overly literal screenshots

### 6) Optional finishing pass
- Add subtle grain/texture to avoid sterile AI-rendered flatness
- Keep texture low contrast and non-distracting

## Project subject + accent map

Use one distinct subject + one accent per project while keeping everything else in-system.

| Project | Subject direction | Accent color |
|---|---|---|
| MZG-59 — AI-Driven LinkedIn Content Workflow | editorial publishing pipeline blocks, drafting/review/publish stages | muted cobalt blue (`#4D66B3`) |
| MZG-60 — AI Intern (SMB Lending Concierge) | intake funnel + qualification nodes + handoff checkpoint | muted amber (`#B48A45`) |
| MZG-61 — Workflow / Automation Systems | orchestration board with staged automations and reliability loop | muted teal (`#4C8F87`) |

## Shared generation method (must follow)

1. Start with the shared system prompt (below) before any project-specific prompting.
2. Generate all project card images as one matched batch in the same run.
3. Review the full set together for composition, spacing, density, and lighting consistency.
4. If any one image drifts stylistically, regenerate the **full set** (not just one image).
5. Export selected finals to `public/images/case-studies/` using project cover naming.
6. Validate crop behavior on `/portfolio` at desktop and mobile breakpoints.

## Required system prompt

> You are generating images for a cohesive portfolio system. All images must share the same visual style, composition, and density, feel like part of a single product design language, use a dark neutral background and restrained palette, and maintain strong central composition for card cropping. Do not vary the overall style between images. Only vary subject matter and accent color.

## Quality gate checklist

A set is ready only when all checks pass:

- [ ] Every image follows centered focal composition
- [ ] Every image stays within 3–5 core elements
- [ ] Shared neutral background and structural surfaces are consistent
- [ ] Each image uses exactly one project accent color
- [ ] No item from the hard avoid list appears
- [ ] Image set feels matched side-by-side on `/portfolio`
- [ ] Crops remain legible on mobile and desktop
