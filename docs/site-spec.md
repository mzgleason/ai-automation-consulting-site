# Website Build Spec

This document is aligned to `docs/ai-website-roadmap-for-codex.md` and should be treated as an implementation-facing companion to that roadmap, not a competing source of truth.

## Project goal

Build the website as a business asset that does all of the following well:

1. Position Mark as a builder who can help small businesses and teams build with AI
2. Convert qualified visitors into conversations
3. Show proof through case studies, writing, and offer clarity
4. Create a repeatable content engine that compounds trust and SEO over time
5. Support a lightweight, credible consulting business without becoming a maintenance burden

## Core positioning

A builder-led AI partner who helps teams and small businesses turn promising ideas into real systems, workflows, and prototypes that drive business outcomes.

## CTA system

- Primary CTA: `Start a conversation`
- Secondary CTA: `View case studies`
- Tertiary CTA: `See how I help`

## Final site architecture

### Core pages

1. Home
2. Projects
3. Project detail pages
4. Writing
5. Writing detail pages
6. Work With Me
7. Contact
8. About

### Secondary pages for later phases

1. Case studies landing page
2. AI Workflow Design service page
3. Prototype Sprint service page
4. Advisory + Build Support service page
5. Best Fit or Who I help page or section
6. Resource pages or SEO landing pages

## Page requirements

### Home

Required sections:

1. Hero
2. Credibility strip
3. What I help with
4. Selected work
5. Point of view
6. Writing preview
7. Work With Me CTA

### Work With Me

Required sections:

1. Hero
2. Who I help
3. What I help with
4. Engagement types
5. What a first conversation covers
6. FAQ
7. CTA

### Projects

Required sections:

1. Intro
2. Filters or categories
3. Featured case studies
4. Build cards

### Project detail pages

Required sections:

1. Summary
2. Challenge
3. Context
4. Approach
5. System or workflow design
6. What shipped
7. Outcomes
8. Lessons learned
9. CTA

### Writing

Required sections:

1. Intro
2. Featured writing
3. Recent notes, essays, or case studies
4. Category tags

### Contact

Required sections:

1. Best-fit intro
2. Simple contact form
3. Direct email option
4. LinkedIn option
5. Expectation-setting copy

### About

Required sections:

1. Intro
2. How I work
3. Why AI changed my workflow
4. Types of work I enjoy
5. Optional credibility section

## Offers

Public packaging should follow:

1. AI Workflow Design
2. Prototype Sprint
3. Advisory + Build Support

## Content system

### Structure

```text
/content/projects
/content/writing
/content/pages
/docs
/prompts
/public/images/case-studies
/public/images/og
```

### Project frontmatter

```yaml
title:
slug:
summary:
date:
featured:
published:
category:
tags:
outcomes:
clientType:
serviceType:
coverImage:
heroImage:
ctaLabel:
ctaHref:
```

## Design guidance

### Keep

- dark theme
- strong typography
- slightly technical aesthetic
- clean spacing
- interactive sphere if performance remains acceptable
- card-based content system

### Improve in later passes

- stronger trust strip near hero
- stronger Work With Me page structure
- project detail page design
- contact form flow
- image support on case study pages
- better mobile CTA rhythm
- subtle social proof modules if available

### Avoid

- bloated agency sections
- generic stock photos
- giant service menus
- too much motion
- overcomplicated animations
- vague AI jargon

## Sprint sequence

### Sprint 1: Positioning and conversion foundation

Build:

- finalize homepage polish
- build Work With Me page
- build Contact page with form
- tighten CTA system site-wide
- add credibility strip below hero
- make homepage selected work cards route to project detail pages
- make homepage writing cards route to article pages

Acceptance criteria:

- visitor understands the offer quickly
- visitor can identify whether they are a fit
- visitor can start a conversation without confusion

### Sprint 2: Case study engine

Build:

- create reusable project detail template
- publish 3 full case studies
- add project index filtering
- support images or diagrams on project pages
- add CTA block to each case study

Acceptance criteria:

- each project clearly shows problem, system, outcome, and lessons
- case studies feel credible and easy to scan
- visitors can imagine hiring Mark based on the work shown

### Sprint 3: Writing and authority layer

Build:

- create writing detail template
- publish first 5 writing pieces
- improve writing taxonomy
- add related posts component
- add homepage feature slots for strongest writing

Acceptance criteria:

- writing section no longer looks placeholder
- each article supports business trust, not thought-leadership vanity
- site has enough substance to share publicly and send in outreach

### Sprint 4: Offer packaging and lead qualification

Build:

- create individual service pages
- add best-fit copy
- add FAQ for objections
- add process section
- add optional calendar link if desired

Acceptance criteria:

- a buyer can tell what to hire Mark for
- a buyer can self-select the right engagement shape
- fewer low-fit inquiries

### Sprint 5: SEO and search-intent pages

Build 4 to 6 useful landing pages around search topics tied to small-business and operator buying intent.

Acceptance criteria:

- content supports discoverability
- pages feel like assets, not keyword stuffing

### Sprint 6: Trust, analytics, and optimization

Build:

- analytics
- CTA click tracking
- contact form conversion tracking
- scroll tracking for key pages
- optional `how did you hear about me?` field
- copy refinement based on behavior

### Sprint 7: Expansion and assets

Build:

- downloadable one-page overview PDF
- short `How I work` leave-behind asset
- optional case study PDF export later
- lightweight resources page
- page-level social previews

## Implementation rules

- optimize for clarity, proof, and conversion
- preserve the file-based content system
- do not add unnecessary dependencies
- reuse components where sensible
- support mobile first
- no placeholder lorem ipsum
- every major page should have a CTA
- avoid generic consulting copy
- write like an operator who has built real systems
- do not turn the site into an agency brochure
