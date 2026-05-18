import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/playbook/PageShell";
import { SectionContainer } from "@/components/playbook/SectionContainer";
import { SystemContainer } from "@/components/playbook/SystemContainer";
import { getProjects } from "@/lib/content";
import { PortfolioHeroScrollCta } from "@/components/portfolio/PortfolioHeroScrollCta";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case studies on operator-led AI workflows, routing systems, and marketplace operations with clear implementation outcomes.",
  alternates: { canonical: "/portfolio" }
};

type PortfolioSlug =
  | "realtime-decision-routing-system"
  | "ai-content-publishing-workflow"
  | "ai-intake-qualification-workflow"
  | "marketplace-scoring-system";

type PortfolioCardConfig = {
  title: string;
  body: string;
};

const portfolioCardConfig: Record<PortfolioSlug, PortfolioCardConfig> = {
  "realtime-decision-routing-system": {
    title: "Lead bidding system for faster accept/reject decisions.",
    body: "Built a left-to-right decision engine that screened, scored, priced, and routed leads in milliseconds so teams could act faster with tighter margin control."
  },
  "ai-content-publishing-workflow": {
    title: "Editorial production workflow for consistent weekly publishing.",
    body: "Replaced ad hoc drafting with a queue-based workflow that moved ideas through review states into a predictable publishing timeline."
  },
  "ai-intake-qualification-workflow": {
    title: "Voice AI intake system that converts conversations into CRM-ready outcomes.",
    body: "Designed a live conversation workflow that captured missing details and synced structured qualification data into CRM before human follow-up."
  },
  "marketplace-scoring-system": {
    title: "Scoring workflow for more consistent allocation decisions.",
    body: "Built a repeatable scoring and decision workflow that improved consistency, governance, and confidence in marketplace allocation behavior."
  }
};

function ProjectVisual({ slug, title }: { slug: PortfolioSlug; title: string }) {
  if (slug === "realtime-decision-routing-system") {
    return (
      <div className="portfolio-index-card-visual portfolio-system-visual" aria-hidden>
        <Image src="/images/portfolio/project-1-visual-v2.png" alt="" className="portfolio-project1-image" width={800} height={500} />
        <p className="portfolio-mobile-title">{title}</p>
      </div>
    );
  }

  if (slug === "ai-content-publishing-workflow") {
    return (
      <div className="portfolio-index-card-visual portfolio-editorial-visual" aria-hidden>
        <Image src="/images/portfolio/project-2-visual-v2.png" alt="" className="portfolio-project1-image" width={800} height={500} />
        <p className="portfolio-mobile-title">{title}</p>
      </div>
    );
  }

  if (slug === "ai-intake-qualification-workflow") {
    return (
      <div className="portfolio-index-card-visual portfolio-system-visual" aria-hidden>
        <Image src="/images/portfolio/project-3-visual-v2.png" alt="" className="portfolio-project3-image" width={800} height={500} />
        <p className="portfolio-mobile-title">{title}</p>
      </div>
    );
  }

  if (slug === "marketplace-scoring-system") {
    return (
      <div className="portfolio-index-card-visual portfolio-system-visual" aria-hidden>
        <Image src="/images/portfolio/project-4-visual-v2.png" alt="" className="portfolio-project4-image" width={800} height={500} />
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
              <p className="pb-body">
                Operational and AI workflow case studies showing the problem, implementation approach, and measurable outcome.
              </p>
              <PortfolioHeroScrollCta />
            </div>
          </section>
        </SystemContainer>
      </SectionContainer>

      <SectionContainer>
        <SystemContainer>
          <section id="portfolio-projects" aria-label="Portfolio projects" className="portfolio-projects-section">
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





