# AI Builder Website Roadmap
## Full implementation plan for Codex to turn the site into a client-generating business

## 0. Outcome of this roadmap

By the end of this roadmap, the website should do all of the following well:

1. Position Mark as a builder who can help small businesses and teams build with AI
2. Convert qualified visitors into conversations
3. Show proof through case studies, writing, and offer clarity
4. Create a repeatable content engine that compounds trust and SEO over time
5. Support a lightweight, credible consulting business without becoming a maintenance burden

This roadmap assumes:
- local development with Codex on your machine
- GitHub as source control
- Vercel for deployments
- Next.js + TypeScript + Tailwind
- file-based content via markdown or MDX
- no heavy CMS required in the first major version

---

# 1. Business model and positioning

## Core positioning

Use the site to position Mark as:

**A builder-led AI partner who helps teams and small businesses turn promising ideas into real systems, workflows, and prototypes that drive business outcomes.**

This is stronger than:
- AI consultant
- Product manager
- Automation expert
- AI strategist

This positioning sits at the intersection of:
- AI workflow design
- prototype and MVP shaping
- product/system thinking
- operator-level execution

## Primary audience

### Tier 1
- small businesses that want help operationalizing AI
- founders and operators who have ideas but need help getting to a real system
- teams exploring AI workflows, internal tools, lead qualification, intake automation, support automation, or process automation

### Tier 2
- startups or teams that need product + AI framing before they build
- decision makers who know AI matters but are overwhelmed by options

### Tier 3
- recruiters and peers
- people interested in Mark's thinking and builds

## Core promise

The site should communicate:

**I help you figure out what is worth building with AI, shape it into a real system, and get it moving.**

## Commercial objectives

The website should help generate:
- discovery calls
- advisory calls
- prototype sprint engagements
- AI workflow design work
- longer-term build support

---

# 2. What successful visitors should experience

A strong visitor journey should look like this:

1. Land on homepage
2. Understand in under 10 seconds what Mark does
3. See proof that this is real work, not vague capability claims
4. Understand what kinds of businesses or problems are a fit
5. Click into a project, writing piece, or Work With Me page
6. Feel enough trust to start a conversation

If the site looks beautiful but does not create this path, it is underperforming.

---

# 3. Competitive lessons to incorporate

The leading competitor and benchmark sites do a few things especially well:
- they make the offer clear
- they move quickly from capability to business value
- they show proof early
- they give the visitor an obvious next step
- they package services in a way buyers can understand
- they support trust with educational content, case studies, and tools

The site should incorporate those strengths without turning into a generic agency catalog.

---

# 4. Final site architecture

## Core pages
1. Home
2. Projects
3. Project detail pages
4. Writing
5. Writing detail pages
6. Work With Me
7. Contact
8. About

## Secondary pages to add in later phases
9. Case studies landing page
10. AI Workflow Design service page
11. Prototype Sprint service page
12. Advisory + Build Support service page
13. Best Fit / Who I help page or section
14. Resource pages / SEO landing pages

---

# 5. Offers that should exist on the site

The site should clearly package at least 3 ways to work together.

## Offer 1: AI Workflow Design
For businesses or teams that want to structure repetitive, manual, or fuzzy work into a better AI-enabled workflow.

### Good fit examples
- lead qualification
- intake routing
- customer support triage
- internal knowledge access
- document processing
- recurring operations workflows

### Deliverables
- workflow map
- recommended system design
- human-in-the-loop design
- tool selection or build recommendation
- implementation roadmap
- optional prototype or pilot

## Offer 2: Prototype Sprint
For founders or operators who need to move from vague idea to testable product, workflow, or proof of concept quickly.

### Deliverables
- problem framing
- prototype plan
- scoped MVP or proof of concept
- user flow / workflow design
- technical handoff or implementation support

## Offer 3: Advisory + Build Support
For teams that need a partner who can help shape the right AI opportunity and stay involved as it gets built.

### Deliverables
- opportunity framing
- feature/system prioritization
- workflow and product decisions
- acceptance criteria and evaluation thinking
- build partner support
- iteration guidance

---

# 6. Recommended information architecture by page

## Home
Purpose:
- positioning
- trust
- proof
- first conversion

Required sections:
1. Hero
2. Credibility strip
3. What I help with
4. Selected work
5. Point of view
6. Writing preview
7. Work With Me CTA

## Work With Me
Purpose:
- convert visitors into leads

Required sections:
1. Hero
2. Who I help
3. What I help with
4. Engagement types
5. What a first conversation covers
6. FAQ
7. CTA

## Projects
Purpose:
- show breadth and depth of builds

Required sections:
1. Intro
2. Filters or categories
3. Featured case studies
4. Build cards

## Project detail pages
Purpose:
- prove execution and thinking

Required sections:
1. Summary
2. Challenge
3. Context
4. Approach
5. System / workflow design
6. What shipped
7. Outcomes
8. Lessons learned
9. CTA

## Writing
Purpose:
- trust, SEO, and client qualification

Required sections:
1. Intro
2. Featured writing
3. Recent notes / essays / case studies
4. Category tags

## Contact
Purpose:
- turn interest into a real conversation

Required sections:
1. best-fit intro
2. simple contact form
3. direct email option
4. LinkedIn option
5. expectation-setting copy

## About
Purpose:
- explain how Mark works and why people hire him

Required sections:
1. Intro
2. How I work
3. Why AI changed my workflow
4. Types of work I enjoy
5. Optional credibility section

---

# 7. Case studies to build first

These are the strongest initial proof assets based on the projects discussed.

## Case study 1: AI-Driven LinkedIn Content Workflow

### Positioning
A multi-step AI workflow that turns raw accomplishments and source material into higher-quality LinkedIn content with tighter turnaround and better control.

### Suggested narrative
A content system was designed to reduce friction between weekly accomplishments and a real publishing cadence. Instead of relying on ad hoc writing sessions, the workflow collected structured inputs, generated draft narratives, and moved through staged drafting and review before publishing. The system demonstrated how AI can reduce content overhead while still preserving a human quality bar.

### Suggested outcomes to frame
- cut content creation cycle significantly
- improved consistency in posting cadence
- created reusable workflow logic instead of one-off generation
- surfaced the importance of sequencing, observability, and human review

### Sections to include
- the original bottleneck
- workflow stages
- role of AI vs human review
- what broke and how the system improved
- lessons for multi-step AI systems

### Image prompts
1. **Workflow architecture image**
   “A clean modern systems diagram showing a multi-step AI content workflow for LinkedIn publishing. Dark background, subtle blue accents, nodes labeled Weekly Input, Story Extraction, Narrative Draft, Post Drafting, Human Review, Scheduling, and Feedback Loop. Minimalist, technical, polished, suitable for a case study website.”
2. **Editorial dashboard image**
   “A modern product dashboard for AI-assisted content operations. Dark UI, cards showing draft status, review queue, publishing schedule, and revision feedback. Crisp typography, product design aesthetic, no brand logos, realistic but conceptual.”
3. **Failure and observability image**
   “A professional visualization of an AI workflow feedback loop failure, showing a timeline with stages out of sequence, alert indicators, and then a corrected version with observability and review gates. Sleek, technical, and easy to understand.”

## Case study 2: AI Intern / Lending Concierge System

### Positioning
A voice- and workflow-based AI system designed to guide lending conversations, capture missing information, and reduce dead-end back and forth.

### Suggested narrative
A lending intake and routing experience was designed to help prospects move through early-stage qualification more smoothly. The system combined voice interaction, structured data collection, downstream workflow routing, and human fallback. The goal was not to replace human expertise, but to reduce repetitive early-stage friction and improve how prospects moved through the process.

### Suggested outcomes to frame
- reduced ambiguity in early-stage intake
- improved data capture consistency
- created a more scalable intake layer before human follow-up
- demonstrated how voice + workflow automation can support small business lending operations

### Sections to include
- why lending intake is messy
- what information the system collected
- how the AI assistant routed and escalated
- what was intentionally not automated
- lessons about trust, compliance, and human handoff

### Image prompts
1. **Voice assistant flow image**
   “A clean product-style diagram of an AI voice assistant for small business lending. Show stages for call initiation, missing information capture, qualification logic, secure handoff, scheduling, and human expert follow-up. Modern dark theme, fintech-friendly design, elegant data flow arrows.”
2. **Conversation UI image**
   “A realistic interface mockup of a lending concierge dashboard with conversation transcript, applicant profile, missing fields panel, secure completion link, and next action status. Clean, trustworthy, modern fintech aesthetic.”
3. **Human + AI handoff image**
   “A polished systems graphic showing collaboration between AI assistant and human funding expert. AI handles intake and routing, human handles advisory and complex cases. Dark enterprise-style visual, minimal, professional, trustworthy.”

## Case study 3: Lendability Model + Reproducible Training System

### Positioning
A model and workflow designed to make lendability scoring faster to prototype, easier to retrain, and more reproducible over time.

### Suggested narrative
Instead of only building a one-time model, the effort focused on wrapping the model in a reproducible system so future iterations would be easier to evaluate, retrain, and compare. This turned an analytical exercise into a maintainable product capability.

### Suggested outcomes to frame
- moved quickly from idea to working model
- created a reproducible system instead of a one-off experiment
- improved the path for future retraining and evaluation
- demonstrated how AI can accelerate analytical product work, not just interfaces

### Sections to include
- the original problem
- data and modeling context at a high level
- why reproducibility mattered
- what the training and evaluation workflow looked like
- how dark-mode validation worked
- lessons for backend and analytical AI systems

### Image prompts
1. **Model training workflow**
   “A clean technical diagram showing a machine learning workflow for lendability scoring. Include stages for data preparation, feature generation, model training, evaluation, deployment in dark mode, monitoring, and retraining. Modern enterprise analytics visual style.”
2. **Model comparison dashboard**
   “A professional dark-mode analytics dashboard showing model comparison, validation metrics, reproducibility checks, training runs, and deployment status. Minimalist, polished, enterprise data aesthetic.”
3. **Backend product capability graphic**
   “A conceptual product graphic showing an AI model running behind the scenes in a backend service, enriching decision systems and collecting validation data before customer-facing rollout. Clean, subtle, technical.”

## Case study 4: Small Business Loan Marketplace Build
This can be added after the first three.

### Positioning
A content-first small business lending site designed to build trust, grow organic traffic, and evolve into a lead generation platform.

### Suggested narrative
The project began as a content-rich website for small business owners exploring funding options, with the longer-term goal of evolving into a lead capture and partner routing platform. The build focused on information architecture, trust-building UX, SEO-oriented content structure, and a future-ready foundation for applications and integrations.

### Image prompts
1. “A clean website mockup for a small business funding marketplace homepage with trust indicators, educational content cards, navigation for loan types, and lead capture sections. Modern fintech editorial design.”
2. “A structured content architecture diagram for a small business loan marketplace showing SEO content hubs, lead forms, partner routing, and application tracking. Crisp, strategy-focused visual.”
3. “A polished UI screenshot concept for a small business loan application monitoring dashboard with status steps, required documents, and partner updates.”

---

# 8. Writing program to support trust and SEO

The writing section should not be a random blog. It should qualify buyers and build trust.

## Content buckets

### Bucket 1: Buyer education
Write for people trying to decide what to do with AI:
- When AI should be a workflow, not a chatbot
- What small businesses get wrong about AI implementation
- How to tell if an AI automation idea is worth building
- Why human-in-the-loop is often the product, not a temporary compromise

### Bucket 2: Product + AI thinking
This captures your point of view:
- AI should buy you more customer time, not just more output
- Prototypes did not replace PRDs, they tightened the feedback loop
- Quality compounds across multi-step AI systems
- Faster iteration is not the same as better product decisions

### Bucket 3: Build logs / case-study spin-offs
These expand from real work:
- What broke in my first content workflow and what I changed
- What lending intake taught me about AI handoffs
- Why reproducibility matters more than a quick model demo

## Minimum publishing cadence
- 2 short notes per month
- 1 deeper essay or case study per month

---

# 9. Conversion system to build into the site

## Primary CTA
Use one main CTA site-wide:
**Start a conversation**

## Secondary CTA
**View case studies**

## Tertiary CTA
**See how I help**

## Contact form fields
Keep it short and useful:
- Name
- Email
- Company
- What are you trying to build?
- Where are you stuck?
- What would a good outcome look like?
- Optional timeline

## Auto-response copy
After form submission:
“Thanks for reaching out. I review each inquiry personally. If it looks like there is a good fit, I will follow up with next steps and a suggested way to talk through your use case.”

## Best-fit section
Add on Work With Me and Contact:
“Best fit if you are trying to structure a workflow, scope an AI-powered product or prototype, or move from vague idea to a real system without wasting months.”

---

# 10. Trust signals to add without sounding fake

Do not fabricate logos or claims.

Use what is true and credible:
- “Builder-led AI systems, prototypes, and product thinking”
- “Experience across fintech, lead generation, lending workflows, and internal tooling”
- “Lead Product Manager at LendingTree” can appear in About or credibility strip if desired
- concrete project outcomes where possible
- technical stack familiarity
- clear explanation of your process

## Add a credibility strip under the hero
Examples:
- AI workflows
- prototypes
- internal tools
- lending systems
- lead-gen systems
- operator-first execution

Or better, more value-oriented:
- scope the right problem
- design the workflow
- ship the prototype
- improve the system

---

# 11. Design guidance for Codex

The current design direction is strong. Preserve the overall feel.

## Keep
- dark theme
- strong typography
- slightly technical aesthetic
- clean spacing
- interactive sphere if performance remains acceptable
- card-based content system

## Improve in later passes
- stronger trust strip near hero
- stronger Work With Me page structure
- project detail page design
- contact form flow
- image support on case study pages
- better mobile CTA rhythm
- subtle social proof modules if available

## Avoid
- bloated agency sections
- generic stock photos
- giant service menus
- too much motion
- overcomplicated animations
- vague AI jargon

---

# 12. Technical roadmap for Codex

## Foundation requirements
- file-based content model
- reusable layout system
- reusable card components
- project detail template
- writing detail template
- SEO metadata
- OG image system
- form handling
- analytics
- conversion tracking

## Suggested content structure
/content/projects
/content/writing
/content/pages
/docs
/prompts
/public/images/case-studies
/public/images/og

## Frontmatter for case studies
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

---

# 13. Full sprint roadmap

## Sprint 1: Positioning and conversion foundation
### Goal
Lock in positioning and create the minimum pages required to convert serious visitors.

### Build
- finalize homepage polish
- build Work With Me page
- build Contact page with form
- tighten CTA system site-wide
- add credibility strip below hero
- make homepage selected work cards route to project detail pages
- make homepage writing cards route to article pages

### Deliverables
- production-ready homepage
- production-ready Work With Me page
- production-ready Contact page
- working form submission flow
- clear CTA paths

### Acceptance criteria
- visitor understands the offer quickly
- visitor can identify whether they are a fit
- visitor can start a conversation without confusion

## Sprint 2: Case study engine
### Goal
Add real proof depth.

### Build
- create reusable project detail template
- publish 3 full case studies
- add project index filtering
- support images/diagrams on project pages
- add CTA block to each case study

### Deliverables
- 3 strong project detail pages
- project index page with filtering or tag support
- “View case studies” CTA path

### Acceptance criteria
- each project clearly shows problem, system, outcome, and lessons
- case studies feel credible and easy to scan
- visitors can imagine hiring Mark based on the work shown

## Sprint 3: Writing and authority layer
### Goal
Build trust and SEO footing.

### Build
- create writing detail template
- publish first 5 writing pieces
- improve writing taxonomy (note / essay / case study)
- add related posts component
- add homepage feature slots for strongest writing

### Suggested first 5 pieces
1. Why AI should buy you more customer time, not just more output
2. Prototypes did not replace PRDs, they tightened the feedback loop
3. Multi-agent systems are only as good as the quality at each stage
4. When AI should be a workflow, not a chatbot
5. What founders get wrong about AI MVPs

### Acceptance criteria
- writing section no longer looks placeholder
- each article supports business trust, not just thought leadership vanity
- site has enough substance to share publicly and send in outreach

## Sprint 4: Offer packaging and lead qualification
### Goal
Make the site commercially clearer.

### Build
- create individual service pages:
  - AI Workflow Design
  - Prototype Sprint
  - Advisory + Build Support
- add best-fit copy
- add FAQ for objections
- add small process section:
  - scope
  - prototype
  - iterate
  - operationalize
- add optional calendar link if desired

### Acceptance criteria
- a buyer can tell what to hire Mark for
- a buyer can self-select the right engagement shape
- fewer low-fit inquiries

## Sprint 5: SEO and search-intent pages
### Goal
Create pages that attract small-business and operator traffic with buying intent.

### Build
Create 4 to 6 landing pages around useful search topics:
- AI workflow consulting for small business
- How to build an AI MVP without wasting months
- AI intake automation for small businesses
- When to use AI agents vs simpler workflows
- Small business AI roadmap: where to start
- Human-in-the-loop AI systems for real operations

### Requirements
- each page should be useful, not thin SEO bait
- include practical guidance + clear CTA
- link to service pages and case studies

### Acceptance criteria
- content supports discoverability
- pages feel like assets, not keyword stuffing

## Sprint 6: Trust, analytics, and optimization
### Goal
Turn the site into a measured system.

### Build
- add analytics
- add CTA click tracking
- add contact form conversion tracking
- add scroll tracking for key pages
- add “how did you hear about me?” field optionally
- refine copy based on user behavior

### Metrics to watch
- homepage CTA click-through
- case study page views
- work with me page views
- form submissions
- top article traffic
- referral sources

## Sprint 7: Expansion and assets
### Goal
Support business development and sharing.

### Build
- create downloadable one-page overview PDF
- create a short “How I work” page or leave-behind asset
- add a simple case study PDF export option later if helpful
- add a lightweight resources page
- add social/share previews per page

---

# 14. Codex implementation rules

Tell Codex to follow these rules:
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

---

# 15. Suggested prompt sequence for Codex

## Prompt A
Audit the repo against this roadmap and identify what already exists, what is missing, and what should be preserved.

## Prompt B
Implement Sprint 1 fully before making cosmetic changes elsewhere.

## Prompt C
Build the reusable case study system and publish the first 3 case studies.

## Prompt D
Build the writing engine and publish the first 5 writing pages.

## Prompt E
Build the service pages and qualification flow.

## Prompt F
Implement SEO pages and analytics.

---

# 16. Case study copy angle suggestions

## AI-Driven LinkedIn Content Workflow
Headline:
**Turning weekly accomplishments into a repeatable AI-assisted publishing system**

Outcome angle:
**Reduced content friction and created a more structured publishing workflow with better quality control**

## AI Intern / Lending Concierge
Headline:
**Designing an AI-assisted intake layer for small business lending conversations**

Outcome angle:
**Reduced early-stage ambiguity and created a more scalable path from inquiry to qualified handoff**

## Lendability Model
Headline:
**Building a lendability model and the reproducible system behind it**

Outcome angle:
**Moved quickly from model idea to a repeatable evaluation and retraining workflow**

---

# 17. What the site must deliver by the end

If the roadmap is executed well, the site should deliver:

## Business value
- clearer positioning
- more qualified inbound leads
- a professional destination for outreach and networking
- reusable proof assets for conversations
- a business foundation that can support advisory and build work

## Strategic value
- stronger personal brand around AI building
- better leverage than LinkedIn alone
- content that compounds
- a site that can evolve with future work

## Practical value
- easier to send prospects somewhere useful
- easier to explain what Mark does
- easier for clients to trust that he can help
- easier to keep updated over time

---

# 18. Final instruction for Codex

Do not treat this website like a portfolio toy.
Build it like a business asset.

Prioritize:
1. offer clarity
2. proof depth
3. conversion flow
4. useful content
5. maintainability

The finished site should make a small business owner, founder, or operator think:

**This person can help me figure out what to build with AI, shape it into something real, and get it moving without wasting months.**
