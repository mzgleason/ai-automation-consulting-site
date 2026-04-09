# Mark Gleason AI Consulting Site

Next.js website for Mark Gleason's AI consulting business.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel Analytics
- Vitest
- Playwright

## Repo layout
- `app/`: routes, layouts, and page entrypoints
- `components/`: shared UI and page-building components
- `content/`: markdown content for pages, projects, and writing
- `lib/`: content loaders, offer definitions, analytics, and form logic
- `public/`: static assets
- `tests/`: unit tests with Vitest
- `e2e/`: browser tests with Playwright
- `docs/`: product, brand, content, and planning docs
- `prompts/`: saved AI-agent prompt templates and working prompts

## Local development
```bash
npm install
npm run dev
```

## Quality checks
```bash
npm run test
npm run test:e2e
npm run build
```

## Notes
- The live homepage and `/preview/foundry-home` both render the same shared homepage content component so the preview route can be used as a staging copy.
- Content changes are usually made in `content/` and `lib/offers.ts`.
- Browser verification is handled with Playwright against a local production build.
