# Deployment

## Vercel
1. Push the repo to GitHub.
2. Import the repo into Vercel as a Next.js project.
3. Add the production domain in Vercel project settings.
4. Apply the DNS records from Vercel at the registrar.

## Before shipping
- Verify `/`, `/preview/foundry-home`, `/portfolio`, `/work-with-me`, `/about`, and `/contact`.
- Run `npm run test`.
- Run `npm run test:e2e`.
- Run `npm run build`.
- Confirm analytics events still fire for CTA clicks and form submissions.

## Content and copy
- Review the markdown content in `content/`.
- Review offers in `lib/offers.ts`.
- Review legal pages at `/privacy` and `/terms`.
