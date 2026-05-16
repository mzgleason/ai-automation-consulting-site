import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/playbook/PageShell";
import { SectionContainer } from "@/components/playbook/SectionContainer";
import { SystemContainer } from "@/components/playbook/SystemContainer";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Operational systems designed to improve decision speed, team throughput, and measurable business outcomes."
};

type PortfolioSlug =
  | "realtime-lead-buying"
  | "ai-driven-linkedin-content-workflow"
  | "ai-intern-lending-concierge-system"
  | "lendability-model-reproducible-training-system";

type PortfolioCardConfig = {
  title: string;
  body: string;
};

const portfolioCardConfig: Record<PortfolioSlug, PortfolioCardConfig> = {
  "realtime-lead-buying": {
    title: "Lead bidding system for faster accept/reject decisions.",
    body: "Built a left-to-right decision engine that screened, scored, priced, and routed leads in milliseconds so teams could act faster with tighter margin control."
  },
  "ai-driven-linkedin-content-workflow": {
    title: "Editorial production workflow for consistent weekly publishing.",
    body: "Replaced ad hoc drafting with a queue-based workflow that moved ideas through review states into a predictable publishing timeline."
  },
  "ai-intern-lending-concierge-system": {
    title: "Voice AI intake system that converts calls into CRM-ready outcomes.",
    body: "Designed a live conversation workflow that captured missing details and synced structured qualification data into CRM before human follow-up."
  },
  "lendability-model-reproducible-training-system": {
    title: "Controlled model training workflow with reliable release governance.",
    body: "Standardized experiment tracking, evaluation gates, and release states so model updates could move from testing to production with less risk."
  }
};

function ProjectVisual({ slug, title }: { slug: PortfolioSlug; title: string }) {
  if (slug === "realtime-lead-buying") {
    return (
      <div className="portfolio-index-card-visual portfolio-system-visual" aria-hidden>
        <img src="/images/portfolio/project-1-visual.png" alt="" className="portfolio-project1-image" />
        <p className="portfolio-mobile-title">{title}</p>
      </div>
    );
  }

  if (slug === "ai-driven-linkedin-content-workflow") {
    return (
      <div className="portfolio-index-card-visual portfolio-editorial-visual" aria-hidden>
        <p className="portfolio-mobile-title">{title}</p>
        <div className="portfolio-linkedin-phone-row">
          <div className="portfolio-linkedin-phone-frame">
            <img src="/images/case-studies/Topic Inbox Mock.png" alt="" className="portfolio-linkedin-phone-image" />
          </div>
          <div className="portfolio-linkedin-phone-frame">
            <img src="/images/case-studies/Capture Opinion Mock.png" alt="" className="portfolio-linkedin-phone-image portfolio-linkedin-phone-image-capture" />
          </div>
          <div className="portfolio-linkedin-phone-frame">
            <img src="/images/case-studies/Draft Review Mock.png" alt="" className="portfolio-linkedin-phone-image" />
          </div>
        </div>
      </div>
    );
  }

  if (slug === "ai-intern-lending-concierge-system") {
    return (
      <div className="portfolio-index-card-visual portfolio-system-visual" aria-hidden>
        <img src="/images/portfolio/project-3-visual.png" alt="" className="portfolio-project3-image" />
        <p className="portfolio-mobile-title">{title}</p>
      </div>
    );
  }

  if (slug === "lendability-model-reproducible-training-system") {
    return (
      <div className="portfolio-index-card-visual portfolio-system-visual" aria-hidden>
        <img src="/images/portfolio/project-4-visual.png" alt="" className="portfolio-project4-image" />
        <p className="portfolio-mobile-title">{title}</p>
      </div>
    );
  }

  return null;
}

export default async function ProjectsPage() {
  const projects = (await getProjects()).filter((project): project is typeof project & { slug: PortfolioSlug } =>
    project.slug in portfolioCardConfig
  );

  return (
    <PageShell className="portfolio-page-shell">
      <SectionContainer>
        <SystemContainer>
          <section className="pb-library-hero portfolio-library-hero" aria-label="Portfolio hero">
            <div className="pb-library-hero-copy">
              <h1 className="pb-library-title portfolio-hero-title">PORTFOLIO</h1>
              <p className="portfolio-hero-scroll">Scroll for more</p>
            </div>
          </section>
        </SystemContainer>
      </SectionContainer>

      <SectionContainer>
        <SystemContainer>
          <section aria-label="Portfolio projects" className="portfolio-projects-section">
            <div className="portfolio-index-grid">
              {projects.map((project, index) => (
                <Link href={`/portfolio/${project.slug}`} className="portfolio-index-card" key={project.slug}>
                  <p className="portfolio-row-index">#{index + 1}</p>
                  <ProjectVisual slug={project.slug} title={portfolioCardConfig[project.slug].title} />
                  <div className="portfolio-index-card-copy">
                    <h2>{portfolioCardConfig[project.slug].title}</h2>
                    <p>{portfolioCardConfig[project.slug].body}</p>
                    <p className="portfolio-see-more">See more</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </SystemContainer>
      </SectionContainer>
    </PageShell>
  );
}

