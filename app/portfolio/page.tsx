import type { Metadata } from "next";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A portfolio of real systems shipped under real constraints: workflow automation, product prototypes, and decision-support systems."
};

const projectProof: Record<string, string> = {
  "ai-driven-linkedin-content-workflow": "Built as a repeatable weekly publishing workflow with explicit review gates.",
  "ai-intern-lending-concierge-system": "Designed to reduce handoff ambiguity before human advisory conversations.",
  "lendability-model-reproducible-training-system": "Shipped with reproducible training and comparison flow to support future retraining."
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="section section-top">
      <section className="projects-hero">
        <div className="container projects-hero-intro">
          <p className="eyebrow">Portfolio</p>
          <h1>Real systems shipped under real constraints.</h1>
          <p className="lead projects-hero-lead">
            Scroll through projects across content, lending, and modeling to see what was built,
            what changed, and why it mattered.
          </p>
        </div>
      </section>

      <section className="section section-compact projects-editorial-section">
        <div className="container projects-editorial-stack">
          {projects.map((project, index) => (
            <ProjectSection
              key={project.slug}
              title={project.title}
              description={project.summary}
              proofLine={projectProof[project.slug]}
              imageSrc={project.coverImage ?? undefined}
              imageAlt={`${project.title} project visual`}
              ctaHref={`/portfolio/${project.slug}`}
              ctaLabel="View project"
              layout={index % 2 === 0 ? "imageLeft" : "imageRight"}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
