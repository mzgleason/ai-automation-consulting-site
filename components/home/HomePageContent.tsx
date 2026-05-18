import Link from "next/link";
import { BuilderHero } from "@/components/BuilderHero";
import { getFeaturedProjects, getPageContent } from "@/lib/content";
import { MyFocusSection } from "./MyFocusSection";
import { PortfolioCarousel } from "./PortfolioCarousel";
import proofStyles from "./HomeProof.module.css";
import { HomepageClosingSection } from "./HomepageClosingSection";

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
    title: "REMOVE HANDOFFS",
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
  "ai-content-publishing-workflow": {
    shortCategory: "CONTENT WORKFLOW",
    displayTitle: "TURN WEEKLY WORK INTO LINKEDIN POSTS",
    payoff: "A repeatable publishing system that captures raw work, extracts strong story angles, drafts content faster, and keeps quality high through human review."
  },
  "ai-intake-qualification-workflow": {
    shortCategory: "AI INTAKE SYSTEM",
    displayTitle: "AI ASSISTANT FOR FASTER QUALIFICATION",
    payoff:
      "Improves early qualification by structuring intake, surfacing missing information, and reducing manual follow-up."
  },
  "realtime-decision-routing-system": {
    shortCategory: "REAL-TIME ROUTING",
    displayTitle: "REAL-TIME LEAD BUYING ENGINE",
    payoff:
      "Built operational routing infrastructure that helps marketplace teams react faster and apply business logic earlier."
  },
  "marketplace-scoring-system": {
    shortCategory: "MARKETPLACE SCORING",
    displayTitle: "SYSTEMS FOR REALTIME MARKETPLACE DECISIONS",
    payoff:
      "A scoring workflow that improves consistency and confidence across marketplace allocation decisions."
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
              <h2 className={proofStyles.heading}>Real operational problems solved with practical systems and AI-enabled execution.</h2>
            <Link href="/portfolio" className={`text-link build-link ${proofStyles.explore}`}>
              Browse selected work
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <PortfolioCarousel projects={featuredProjects} proofCopy={projectProofCopy} />
          ) : null}
        </div>
      </section>

      <HomepageClosingSection />
    </main>
  );
}
