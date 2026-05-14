# Deployment

## Local setup
- `npm install`
- `npm run dev`

## Vercel production setup
1. Push the repo to GitHub.
2. Import the repo into Vercel as a Next.js project.
3. Add the production domain in Vercel project settings.
4. Apply DNS records from Vercel at your registrar.

## Branch and preview flow
- `main` is production.
- Use feature branches for active work and sprint validation.
- Push branch updates and review the Vercel preview before merge.
- Validate mobile/desktop, CTA paths, and content rendering.

## Verification before merge/release
- Run `npm run test`.
- Run `npm run test:e2e`.
- Run `npm run build`.
- Verify `/`, `/portfolio`, `/work-with-me`, `/about`, `/contact`, `/privacy`, and `/terms`.
- Confirm analytics events still fire for CTA clicks and form submissions.

## Content checks
- Review markdown content in `content/`.
- Review offers in `lib/offers.ts`.

## Environment and analytics
- No additional env vars required for the current static content build.
- Vercel Analytics is enabled in the root layout.

## Production policy
- Only ship to production when validation passes.
- Use preview deploys for active sprint review.
- Avoid direct production updates while sprint work is under review.
