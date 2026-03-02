# Iris Automation Consulting Site

Production website for an AI automation consulting business focused on local SMB operators.

## Stack
- Next.js (App Router)
- TypeScript
- Vercel Analytics
- Vitest

## Local Development
```bash
npm.cmd install
npm.cmd run dev
```

## Quality Gates
```bash
npm.cmd run lint
npm.cmd run test
npm.cmd run build
```

## Launch Checklist (GitHub + Vercel)
1. Create a new GitHub repo: `iris-automation-consulting-site`.
2. Push this directory to `main`.
3. In Vercel, import the GitHub repo and deploy.
4. Add custom domain (`.com`) in Vercel project settings.
5. Update DNS records at registrar to Vercel targets.
6. Replace Calendly URL in `components/CalendlyEmbed.tsx`.
7. Verify legal pages (`/privacy`, `/terms`) and contact email.
8. Validate analytics events in Vercel Analytics dashboard.

## Conversion Event Names
- `cta_click`
- `calendly_opened`
- `contact_form_submitted`

## Content Update Points
- Offer and deliverables: `content/siteContent.ts`
- Flagship guide: `app/resources/ai-automation-playbook/page.tsx`
- Founder narrative: `app/about/page.tsx`
