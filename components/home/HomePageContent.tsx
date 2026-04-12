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
    shortCategory: "CONTENT ENGINE",
    displayTitle: "LINKEDIN CONTENT SYSTEM FOR WEEKLY PUBLISHING",
    payoff: "Reduces weekly content friction with a repeatable workflow for capture, drafting, review, and publishing."
  },
  "ai-intern-lending-concierge-system": {
    shortCategory: "AI INTAKE SYSTEM",
    displayTitle: "AI INTAKE ASSISTANT FOR LENDING QUALIFICATION",
    payoff:
      "Improves early qualification by structuring intake, surfacing missing information, and reducing manual follow-up."
  },
  "lendability-model-reproducible-training-system": {
    shortCategory: "MODEL OPS SYSTEM",
    displayTitle: "LENDING MODEL RETRAINING SYSTEM",
    payoff:
      "A reusable retraining workflow for keeping lending models current without rebuilding the process each cycle."
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

      <HomepageClosingSection />
    </main>
  );
}
