# Codex Kickoff Prompt

You are helping me restructure an existing website repo into a builder-led personal site that attracts clients who want help building with AI.

Before making changes, read these files first if they exist:
- `/docs/site-spec.md`
- `/docs/site-strategy.md`
- `/docs/brand-voice.md`
- `/docs/codex-rules.md`

If some of those files do not exist yet, use `/docs/site-spec.md` as the primary source of truth.

## Project context

This repo already contains a partial website. It was previously positioned more like a generic AI automation consulting or agency site. I want to evolve it into a sharper site that does four things well:

1. Proves I am a builder, not just a strategist
2. Captures my thinking around AI, product, and outcomes
3. Gives me a system I can keep running without it becoming a side chore
4. Captures clients that want help building with AI

This is **not** a résumé site.
This is **not** a generic agency site.
This is **not** a blog-first site.

It should become a **builder-led site** that shows:
- what I build
- how I think
- how I help
- why someone should work with me

## Core positioning

Use this as the default homepage direction unless the existing implementation strongly suggests a better version that still matches the spec:

### Homepage hero
**Headline:**  
I help teams turn ideas into AI-powered systems that actually ship

**Support copy:**  
Prototypes, workflows, and product thinking built around real customer and business outcomes.

**Primary CTA:**  
View Projects

**Secondary CTA:**  
Work With Me

## What I want you to do first

Start with a repo audit and then create the smallest clean path toward the new site structure.

### Step 1: Audit the current repo
Inspect the existing codebase and identify:
- current app structure and routing
- reusable layout/components worth keeping
- current navigation and information architecture
- any content/data patterns already present
- any technical debt or messy dependencies that should be avoided

Then summarize:
- what should be preserved
- what should be replaced
- what should be simplified

Do not ask me for confirmation before proceeding unless there is a truly blocking issue.

### Step 2: Create or align the site structure
Restructure the app toward these top-level pages:

- Home
- Projects
- Writing
- Work With Me
- About
- Contact

Keep the navigation limited to those items unless there is a strong reason not to.

### Step 3: Build the content system
Implement a lightweight file-based content model that makes it easy to add projects and writing later.

Preferred structure:
- `/content/projects`
- `/content/writing`
- `/content/pages`

Use markdown or MDX if appropriate for the current stack.

### Step 4: Build the core pages
Implement the following pages and make them visually coherent:

- homepage
- projects index
- writing index
- work with me
- about
- contact

If time allows, also scaffold:
- project detail template
- writing detail template

### Step 5: Keep the design clean
Use a design direction that feels:
- credible
- sharp
- modern
- builder-oriented
- slightly technical
- clean rather than flashy

Avoid:
- agency clichés
- heavy animations
- generic “future of AI” visuals
- unnecessary complexity
- giant walls of text

## Important implementation rules

- Prefer simple reusable components
- Preserve or improve mobile responsiveness
- Keep content editable through content files, not hardcoded everywhere
- Avoid unnecessary dependencies
- Reuse good existing primitives where it makes sense
- Replace old messaging even if parts of the old design stay
- Every major page should have a clear CTA
- Optimize for clarity, proof, and conversion
- Do not invent vague placeholder copy if real direction is already provided in the spec
- Do not overbuild features that are explicitly marked out of scope in the spec

## Homepage section expectations

Build the homepage around these sections:

1. Hero
2. Proof strip or capability chips
3. What I help with
4. Selected work
5. Principles / point of view
6. Writing preview
7. Work with me CTA

## Work With Me page expectations

This page should clearly explain:
- who I help
- what I help with
- engagement styles
- how to contact me

Do not make it sound like a bloated agency services page.

## Projects page expectations

This page should prove I build real things.

Each project card should support:
- title
- summary
- category
- tags
- optional image
- link

Project detail pages should support:
- problem
- approach
- tools/stack
- workflow/system design
- outcomes
- lessons learned

## Writing page expectations

This page should support:
- notes
- essays
- case studies

Keep the content structure lightweight and scalable.

## About page expectations

This page should explain how I work and why people bring me in.

Tone:
- direct
- practical
- operator-style
- not résumé-first

Avoid opening with a job title.

## Contact page expectations

Keep it simple:
- short intro
- email
- LinkedIn
- lightweight contact option if easy to implement

## Recommended execution order

1. audit current repo
2. propose the preserve/replace/simplify plan in your response
3. implement routing/layout/navigation changes
4. implement content model
5. implement homepage
6. scaffold other main pages
7. add sample content entries if needed
8. clean up styling and responsiveness

## Deliverables for this first pass

I want a strong first pass, not perfection.

At the end of your first implementation cycle, provide:
- a concise summary of what changed
- key files added/updated
- anything intentionally deferred
- any content I still need to supply

## Constraints

- Prefer Next.js + TypeScript + Tailwind patterns already present in the repo
- Keep the architecture maintainable
- Make it easy for me to continue with future Codex prompts
- Do not add a CMS
- Do not add a newsletter
- Do not add advanced search
- Do not add auth
- Do not add a client portal
- Do not add fancy pricing logic

## Final reminder

This site should feel like:
**builder first, thinker second, title third**

Please begin by auditing the repo and then move directly into the first round of restructuring and implementation.
