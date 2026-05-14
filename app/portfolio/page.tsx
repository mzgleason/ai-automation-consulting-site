import type { Metadata } from "next";
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

function ProjectVisual({ slug, category, metrics, tags }: { slug: string; category: string; metrics: { value: string; label: string }[]; tags: string[] }) {
  if (slug === "affiliates-ping-post-api-launch") {
    return (
      <div className="portfolio-index-card-visual" aria-hidden>
        <div className="portfolio-index-visual-head">Affiliates Ping Post Flow</div>
        <div className="portfolio-flow-row portfolio-flow-row-5">
          {["Affiliate Platform", "Ping API", "Pricing Engine", "Post API", "Lender System"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="portfolio-index-tags">
          {["Up-leveling Protection", "Failsafe Pricing Logic", "End-to-End Observability"].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    );
  }

  if (slug === "ai-driven-linkedin-content-workflow") {
    return (
      <div className="portfolio-index-card-visual" aria-hidden>
        <div className="portfolio-index-visual-head">AI-Driven LinkedIn Content Workflow</div>
        <div className="portfolio-flow-columns">
          {[
            ["1. Capture", "Weekly Goals", "Key Updates", "Notes & Wins"],
            ["2. Draft", "AI Draft", "Hook + Structure", "First Pass"],
            ["3. Review", "Refine", "Add Insights", "Approve"],
            ["4. Publish", "Schedule", "Quality Check", "Go Live"]
          ].map((group) => (
            <div className="portfolio-flow-col" key={group[0]}>
              <strong>{group[0]}</strong>
              {group.slice(1).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slug === "ai-intern-lending-concierge-system") {
    return (
      <div className="portfolio-index-card-visual portfolio-index-voice-visual" aria-hidden>
        <div className="portfolio-voice-box">
          <div className="portfolio-index-visual-head">Voice AI Assistant</div>
          <div className="portfolio-wave" />
          <p>Having a conversation...</p>
          <ul>
            <li>Collects missing details</li>
            <li>Qualifies the lead</li>
            <li>Updates CRM in real-time</li>
          </ul>
        </div>
        <div className="portfolio-crm-box">
          <div className="portfolio-index-visual-head">CRM Update</div>
          <dl>
            <div><dt>Lead Status</dt><dd>Contacted</dd></div>
            <div><dt>Intent</dt><dd>High</dd></div>
            <div><dt>Qualification</dt><dd>Completed</dd></div>
            <div><dt>Next Step</dt><dd>Sales Follow-up</dd></div>
          </dl>
        </div>
      </div>
    );
  }

  if (slug === "lendability-model-reproducible-training-system") {
    return (
      <div className="portfolio-index-card-visual" aria-hidden>
        <div className="portfolio-index-visual-head">Reproducible Training System</div>
        <div className="portfolio-flow-row">
          {["Data", "Train", "Evaluate", "Validate", "Monitor"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="portfolio-index-tags">
          {["Versioned Datasets", "Experiment Tracking", "Model Registry", "Audit Ready"].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-index-card-visual" aria-hidden>
      <div className="portfolio-index-visual-head">{category}</div>
      <div className="portfolio-index-visual-flow">
        {(metrics.length > 0 ? metrics : [{ value: "Live", label: "System shipped" }]).slice(0, 4).map((metric) => (
          <div className="portfolio-index-chip" key={`${metric.value}-${metric.label}`}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>
      <div className="portfolio-index-tags">
        {tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="section section-top portfolio-index-page">
      <section className="portfolio-index-hero">
        <div className="container portfolio-index-hero-intro">
          <p className="eyebrow">Portfolio</p>
          <h1>Real systems shipped under real constraints.</h1>
          <p className="lead portfolio-index-hero-lead">
            Scroll through projects across content, lending, and modeling to see what was built,
            what changed, and why it mattered.
          </p>
        </div>
      </section>

      <section className="section section-compact portfolio-index-grid-section">
        <div className="container portfolio-index-grid">
          {projects.map((project, index) => (
            <article className="portfolio-index-card" key={project.slug}>
              <div className="portfolio-index-card-copy">
                <p className="portfolio-index-card-kicker">Project {String(index + 1).padStart(2, "0")}</p>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                {projectProof[project.slug] ? <p className="portfolio-index-proof">{projectProof[project.slug]}</p> : null}
                <a href={`/portfolio/${project.slug}`} className="text-link build-link">
                  View project
                </a>
              </div>
              <ProjectVisual slug={project.slug} category={project.category} metrics={project.metrics} tags={project.tags} />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
