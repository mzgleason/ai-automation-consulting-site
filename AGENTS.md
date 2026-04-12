# AGENTS.md

This repo contains both the production website and a small amount of agent-support material used to plan or iterate on the site.

## Build philosophy (operator loop)
- Prototype fast, evaluate against reality, refine, then ship.
- Prefer narrow, testable changes over broad “framework” refactors.
- Default to speed over polish until value is proven.
- Avoid premature flexibility; add abstraction only when repeated pain is observed.
- Remove or simplify before expanding scope.

## Decision hierarchy
- Proof over claims: prefer case studies, artifacts, and specifics over adjectives.
- Clarity over cleverness: pages should read like a decision memo, not marketing fog.
- Credibility over completeness: fewer, stronger points beat exhaustive coverage.
- Speed over polish (until proven): ship a solid v1, then iterate with evidence.
- Removal over expansion: delete weak sections, dead prototypes, and unused assets.

## Project structure
- `app/`: Next.js routes and layouts
- `components/`: reusable UI and page components
- `content/`: markdown source for site pages, case studies, and writing
- `lib/`: business logic, analytics helpers, contact helpers, and content loaders
- `public/`: static assets
- `tests/`: unit tests
- `e2e/`: Playwright browser tests
- `docs/`: business, brand, content, and planning docs
- `prompts/`: reusable AI-agent prompt files

## Working rules
- Treat `content/` and `lib/offers.ts` as the main source for business copy and service packaging.
- Keep `/preview/foundry-home` aligned with the homepage when it is being used as a staging copy.
- Prefer removing dead prototypes and unused assets instead of leaving alternate implementations around.
- Run `npm run build` for code-level verification.
- Run `npm run test:e2e` for UI verification after meaningful frontend changes.

## Homepage rules (highest priority surface)
- Treat the homepage as the primary decision surface; optimize it before other pages.
- Every section must earn its place with at least one of: clarity, credibility, action.
- Prefer concrete “what this is / who it’s for / what happens next” over broad positioning.
- Removal criteria: redundant with another section, low-specificity copy, weak proof, or no clear next step.
- Keep sections scannable; if it requires heavy reading, it probably belongs in `content/` as a deeper page.

## Case study standards (proof-first)
- Focus on decisions made and constraints, not just outcomes.
- Make before → after legible (baseline, intervention, result).
- Prefer numbers, timelines, and artifacts (screenshots, snippets, dashboards) where possible.
- Minimize storytelling; keep it tight, specific, and operational.
- If a detail can’t be substantiated, remove it or rephrase as a hypothesis.

## Decision filter (before adding anything)
- What user decision does this help with (and on which page)?
- What proof exists, and where will it be shown?
- Is there a smaller prototype we can ship first?
- What can we remove to make space (section, component, copy, asset)?
- What is the acceptance check (build, e2e, or a clear visual/UX outcome)?

## Cleanup rules
- Do not commit generated output such as `.next/`, `playwright-report/`, `test-results/`, or `tsconfig.tsbuildinfo`.
- Keep agent-specific materials in `docs/` and `prompts/`, not mixed into `app/` or `components/`.
- When a preview or experiment is retired, remove the orphaned components and helper files in the same change.
