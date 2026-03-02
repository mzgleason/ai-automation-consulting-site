# GitHub + Vercel Deployment Steps

## 1. Initialize and push to GitHub
```bash
git init
git add .
git commit -m "Initial launch: Iris automation consulting website"
git branch -M main
git remote add origin https://github.com/<your-username>/iris-automation-consulting-site.git
git push -u origin main
```

## 2. Deploy on Vercel
1. In Vercel, click **Add New Project**.
2. Import `iris-automation-consulting-site` from GitHub.
3. Keep framework preset as **Next.js**.
4. Deploy.

## 3. Connect domain
1. In Vercel project: **Settings -> Domains**.
2. Add your `.com` domain.
3. Apply DNS records from Vercel at your registrar.
4. Confirm HTTPS is active.

## 4. Post-launch checks
- Replace Calendly URL in `components/CalendlyEmbed.tsx`.
- Validate conversion events in Vercel Analytics:
  - `cta_click`
  - `calendly_opened`
  - `contact_form_submitted`
- Submit test intake on `/contact`.
- Book a test meeting from `/book`.
