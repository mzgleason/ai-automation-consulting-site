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

      <HomepageClosingSection />
    </main>
  );
}
