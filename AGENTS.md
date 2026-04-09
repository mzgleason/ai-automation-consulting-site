# AGENTS.md

This repo contains both the production website and a small amount of agent-support material used to plan or iterate on the site.

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

## Cleanup rules
- Do not commit generated output such as `.next/`, `playwright-report/`, `test-results/`, or `tsconfig.tsbuildinfo`.
- Keep agent-specific materials in `docs/` and `prompts/`, not mixed into `app/` or `components/`.
- When a preview or experiment is retired, remove the orphaned components and helper files in the same change.
