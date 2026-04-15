import { ProjectSection } from "@/components/projects/ProjectSection";
import { getProjects } from "@/lib/content";

const projectMetrics: Record<string, { value: string; label: string }[]> = {
  "ai-driven-linkedin-content-workflow": [
    { value: "+200+", label: "posts published" },
    { value: "+30%", label: "engagements per month" }
  ],
  "ai-intern-lending-concierge-system": [
    { value: "~30%", label: "lower manual intake" },
    { value: "~60%", label: "faster borrower assessments" }
  ],
  "lendability-model-reproducible-training-system": [
    { value: "3+", label: "model versions launched" },
    { value: "~30%", label: "faster iteration cycles" }
  ]
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
              project={project}
              proofLine={projectProof[project.slug]}
              metrics={projectMetrics[project.slug] ?? []}
              layout={index % 2 === 0 ? "imageLeft" : "imageRight"}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
