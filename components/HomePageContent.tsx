import Link from "next/link";
import HeroTestingHero from "@/components/HeroTestingHero";
import { getFeaturedProjects, getPageContent } from "@/lib/content";
import { offers, processSteps } from "@/lib/offers";

const serviceNotes = [
  "Best for teams that need a practical first move.",
  "Built around workflow clarity, not trend chasing.",
  "Structured to move from messy process to usable system."
];

const serviceFocusItems = [
  {
    slug: "ai-workflow-design",
    label: "01",
    title: "WORKFLOW SYSTEMS",
    summary: "Map the messy repeat work first, then design the right AI-supported operating flow.",
    detail: "Best when the team needs clearer routing, ownership, and review."
  },
  {
    slug: "prototype-sprint",
    label: "02",
    title: "PROTOTYPE SPRINTS",
    summary: "Turn an unclear AI opportunity into something concrete enough to test, reject, or fund.",
    detail: "Best when the opportunity is real but the next move still feels fuzzy."
  },
  {
    slug: "advisory-build-support",
    label: "03",
    title: "AI ADVISORY",
    summary: "Stay close to product and workflow decisions while the system is actually being built.",
    detail: "Best when priorities keep drifting or the build needs stronger judgment."
  }
];

const projectProofCopy: Record<
  string,
  {
    cardTitle: string;
    result: string;
    whyBuyerCares: string;
  }
> = {
  "ai-driven-linkedin-content-workflow": {
    cardTitle: "A repeatable content system that cut weekly publishing friction",
    result: "Structured a recurring content workflow into a reusable publishing system with less manual drag.",
    whyBuyerCares: "A good example of turning messy repeat work into a dependable operating rhythm."
  },
  "ai-intern-lending-concierge-system": {
    cardTitle: "A cleaner intake flow with stronger early follow-up",
    result: "Improved how information was captured early so human follow-up became more targeted and less repetitive.",
    whyBuyerCares: "Useful for any business dealing with intake, qualification, triage, or routing problems."
  },
  "lendability-model-reproducible-training-system": {
    cardTitle: "A decision workflow that became easier to trust over time",
    result: "Wrapped a working model in a more repeatable process so later decisions became more reliable.",
    whyBuyerCares: "Shows that AI gets more useful when the surrounding workflow is disciplined and repeatable."
  }
};

export async function HomePageContent() {
  const [homePage, projects] = await Promise.all([
    getPageContent("home"),
    getFeaturedProjects(3)
  ]);

  const featuredProject = projects[0];
  const supportingProjects = projects.slice(1, 3);
  return (
    <main className="home-page">
      <HeroTestingHero title={homePage.title} description={homePage.description} />

      <section className="section home-studio-section">
        <div className="container home-studio-head">
          <p className="eyebrow">Our focus</p>
          <div className="home-studio-intro">
            <h2>Three ways to move a messy workflow toward operational clarity.</h2>
            <p className="lead home-studio-lead">
              Clear workflow design, fast prototype decisions, and builder-side advisory support for teams that want AI
              to improve real operations, not just decorate them.
            </p>
          </div>
        </div>

        <div className="container home-focus-board">
          {serviceFocusItems.map((item) => (
            <article key={item.slug} className="home-focus-item">
              <Link href={`/services/${item.slug}`} className="home-focus-link">
                <span className="home-focus-index">{item.label}</span>
                <span className="home-focus-title">{item.title}</span>
                <span className="home-focus-summary">{item.summary}</span>
                <span className="home-focus-detail">{item.detail}</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="container home-focus-footer">
          <div className="home-service-footer-notes">
            {serviceNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
          <Link href="/work-with-me" className="text-link build-link home-focus-footer-link">
            Review how the work is scoped
          </Link>
        </div>
      </section>

      <section className="section home-proof-section">
        <div className="container home-proof-frame">
          <div className="home-proof-intro">
            <p className="eyebrow">Our portfolio</p>
            <h2>Selected systems work that moved messy operations into something clearer.</h2>
            <Link href="/projects" className="text-link build-link home-proof-explore">
              Explore case studies
            </Link>
          </div>

          {featuredProject ? (
            <div className="home-proof-showcase">
              <p className="home-proof-ghost-label">{featuredProject.serviceType ?? featuredProject.category}</p>

              <div className="home-proof-rail">
                {supportingProjects[0] ? (
                  <article className="home-proof-sidecase">
                    <p className="home-proof-side-name">{supportingProjects[0].title}</p>
                  </article>
                ) : (
                  <div />
                )}

                <article className="home-proof-spotlight">
                  <div className="home-proof-spotlight-corners" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <p className="card-kicker">Featured case</p>
                  <h3>Repeatable content workflow.</h3>
                  <p className="home-proof-spotlight-summary">
                    A clearer publishing system that reduced weekly friction and made the work easier to repeat.
                  </p>
                  <div className="home-proof-spotlight-stats">
                    <div>
                      <p className="project-outcome-label">Problem</p>
                      <p>{featuredProject.problem}</p>
                    </div>
                    <div>
                      <p className="project-outcome-label">Result</p>
                      <p>{projectProofCopy[featuredProject.slug]?.result ?? featuredProject.outcomes[0]}</p>
                    </div>
                  </div>
                  <div className="home-proof-spotlight-footer">
                    <span className="home-proof-count">01 / 03</span>
                    <Link href={`/projects/${featuredProject.slug}`} className="text-link build-link">
                      Read the case study
                    </Link>
                  </div>
                </article>

                {supportingProjects[1] ? (
                  <article className="home-proof-sidecase home-proof-sidecase-right">
                    <p className="home-proof-side-name">{supportingProjects[1].title}</p>
                  </article>
                ) : (
                  <div />
                )}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section home-process-section">
        <div className="container home-process-intro">
          <div className="home-process-intro-left">
            <p className="eyebrow">Our ethos</p>
            <h2>Clarity matters. Practical momentum wins.</h2>
          </div>

          <div className="home-process-intro-right">
            <p className="home-process-lead">
              Good AI work starts with a real bottleneck, gets tested in a concrete way, and becomes useful through
              iteration instead of abstraction. The process should create confidence, not more noise.
            </p>
            <Link href="/work-with-me" className="text-link build-link home-process-link">
              Review how engagements start
            </Link>
          </div>
        </div>

        <div className="container home-process-principles">
          {processSteps.map((step, index) => (
            <article key={step.title} className="home-process-principle">
              <div className="home-process-principle-art" aria-hidden="true" />
              <p className="home-process-principle-title">{step.title}</p>
              <p className="home-process-principle-count">0{index + 1} / 04</p>
              <p className="home-process-principle-summary">{step.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section final-cta-section">
        <div className="container home-cta-shell">
          <div className="home-cta-stack">
            <article className="home-cta-panel-card home-cta-panel-card-sky">
              <p className="home-cta-panel-title">Move at the speed of breakthrough.</p>
              <span className="home-cta-panel-count">01</span>
              <p className="home-cta-panel-copy">Start with the bottleneck that is costing time, quality, or follow-through.</p>
            </article>

            <article className="home-cta-panel-card home-cta-panel-card-fire">
              <p className="home-cta-panel-title">Get to a practical first move fast.</p>
              <span className="home-cta-panel-count">02</span>
              <p className="home-cta-panel-copy">Use a tighter process to decide whether to design, prototype, or hold.</p>
            </article>

            <article className="home-cta-panel-card home-cta-panel-card-ghost">
              <p className="home-cta-panel-title">Keep the work grounded in real operations.</p>
              <span className="home-cta-panel-count">03</span>
              <p className="home-cta-panel-copy">Build with workflow clarity, human checkpoints, and cleaner scope from the start.</p>
            </article>
          </div>

          <div className="home-cta-copy">
            <p className="eyebrow">Next step</p>
            <h2>Build fast, with less friction and total focus.</h2>
            <p className="home-cta-lead">
              Skip the vague AI transformation pitch. Start with the real workflow, get direct feedback on fit, and move
              toward something the team can actually use.
            </p>
            <div className="hero-actions home-cta-actions">
              <Link href="/contact" className="button button-accent">
                Talk about your workflow
              </Link>
              <Link href="/work-with-me" className="button button-ghost">
                Review services
              </Link>
            </div>
            <p className="home-cta-microcopy">Short conversation. Direct feedback. No pressure to force AI where it does not belong.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
