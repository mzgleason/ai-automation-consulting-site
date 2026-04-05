# Deployment

## Local setup

- `npm install`
- `npm run dev`

## Branch strategy

- `main` is production
- `feature/*` branches are for active work
- Use feature branches for sprint work and preview validation before merge

## Preview deployment flow

- Push a feature branch
- Review the Vercel preview
- Validate mobile, CTA paths, and content rendering
- Merge only after checks pass

## Env vars

- No additional env vars required for the current static content build

## Domain setup

- Update production metadata and canonical URLs once the final domain is confirmed

## Analytics setup

- Vercel Analytics is enabled in the root layout

## Production policy

- Production changes are allowed only when validation passes
- Use preview deploys for active sprint review
- Do not update production directly while sprint work is still under review
