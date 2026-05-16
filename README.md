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

## Security and performance baseline
- Global response hardening is configured in `next.config.ts` with CSP, HSTS, frame/object protections, strict referrer policy, and permissions policy.
- Contact intake API (`/api/contact`) enforces payload size checks, in-memory rate limiting, and generic error responses.
- Heavy client-only visuals are dynamically loaded to reduce initial JS cost.
- Raster imagery in interactive UI should use `next/image` with explicit dimensions.
- HTML rendered from markdown is sanitized server-side before being passed to `dangerouslySetInnerHTML`.

## Verification workflow
Run these before merging frontend or platform-affecting changes:
```bash
npm run build
npm run test
npm run test:e2e
```

## Notes
- The live homepage and `/preview/foundry-home` both render the same shared homepage content component so the preview route can be used as a staging copy.
- Content changes are usually made in `content/` and `lib/offers.ts`.
- Browser verification is handled with Playwright against a local production build.