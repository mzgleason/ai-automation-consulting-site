import Link from "next/link";
import { BuilderHero } from "@/components/BuilderHero";
import { getFeaturedProjects, getPageContent } from "@/lib/content";
import { MyFocusSection } from "./MyFocusSection";
import { PortfolioCarousel } from "./PortfolioCarousel";
import { offers, processSteps } from "@/lib/offers";
import proofStyles from "./HomeProof.module.css";

const serviceFocusItems = [
  {
    id: "workflow-systems",
    slug: "ai-workflow-design",
    title: "MAKE THE WORK VISIBLE",
    description: "Map the real flow. Expose friction and waste."
  },
  {
    id: "prototype-sprints",
    slug: "prototype-sprint",
    title: "FORCE REAL DECISIONS",
    description: "Move fast to something testable. Remove ambiguity early."
  },
  {
    id: "ai-advisory",
    slug: "advisory-build-support",
    title: "STAY THROUGH EXECUTION",
    description: "Shape the system as it's built. Make sure it holds."
  }
];

const projectProofCopy: Record<
  string,
  {
    shortCategory: string;
    displayTitle: string;
    payoff: string;
    support?: string;
  }
> = {
  "ai-driven-linkedin-content-workflow": {
    shortCategory: "AI Workflow",
    displayTitle: "LinkedIn Content System for Weekly Publishing",
    payoff: "Reduces weekly content friction with a repeatable AI workflow for capture, drafting, and publishing."
  },
  "ai-intern-lending-concierge-system": {
    shortCategory: "Lending Ops",
    displayTitle: "AI Intake Assistant for Lending Qualification",
    payoff: "Improves intake and qualification with structured follow-up for lending workflows where speed matters."
  },
  "lendability-model-reproducible-training-system": {
    shortCategory: "Model Ops",
    displayTitle: "Lending Model with Reusable Retraining",
    payoff: "Ships a scoring workflow fast, then makes retraining and iteration dramatically easier later."
  }
};

export async function HomePageContent() {
  const [homePage, projects] = await Promise.all([getPageContent("home"), getFeaturedProjects(99)]);

  const featuredProjects = projects.filter((project) => project.featured);
  return (
    <main className="home-page">
      <BuilderHero title={homePage.title} description={homePage.description} />

      <MyFocusSection
        items={serviceFocusItems.map(({ id, title, description }) => ({
          id,
          title,
          description
        }))}
      />

      <section className={`section ${proofStyles.section}`}>
        <div className={`container ${proofStyles.frame}`}>
          <div className={proofStyles.intro}>
            <p className={`eyebrow ${proofStyles.eyebrow}`}>Selected work</p>
            <h2 className={proofStyles.heading}>Real systems. Real constraints. Better ways to operate.</h2>
            <Link href="/projects" className={`text-link build-link ${proofStyles.explore}`}>
              Browse selected work
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <PortfolioCarousel projects={featuredProjects} proofCopy={projectProofCopy} />
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
