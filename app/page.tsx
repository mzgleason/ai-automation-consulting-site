import Link from "next/link";
import { BuilderHero } from "@/components/BuilderHero";
import { formatDisplayDate, getFeaturedPosts, getFeaturedProjects, getPageContent } from "@/lib/content";

const capabilityChips = ["AI workflows", "Prototypes", "Internal tools", "MVPs", "Product systems", "Automations"];

const services = [
  {
    title: "AI workflow design",
    summary: "Map the human loop, decision points, and failure cases before touching tooling."
  },
  {
    title: "Prototypes and MVPs",
    summary: "Build proof quickly so teams can pressure test a system instead of debating it abstractly."
  },
  {
    title: "System framing",
    summary: "Turn fuzzy ideas into scoped software with clear inputs, outputs, owners, and tradeoffs."
  },
  {
    title: "Operationalizing AI",
    summary: "Move AI from experiments into routines teams can actually run and improve."
  }
];

const principles = [
  "AI should create leverage, not noise.",
  "Prototypes tighten decision loops.",
  "Customer time is the highest-value use of leverage.",
  "Quality compounds across systems.",
  "Outcomes matter more than artifacts."
];

export default async function HomePage() {
  const [homePage, projects, posts] = await Promise.all([
    getPageContent("home"),
    getFeaturedProjects(3),
    getFeaturedPosts(3)
  ]);
  const featuredWritingLead = posts[0];
  const featuredWritingSecondary = posts.slice(1);

  return (
    <main>
      <BuilderHero title={homePage.title} description={homePage.description} />

      <section className="section">
        <div className="container">
          <div className="chip-wrap">
            {capabilityChips.map((chip) => (
              <span key={chip} className="chip">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <div className="section-head services-head">
            <div>
              <p className="eyebrow">What I help with</p>
              <h2>How I help teams build with AI</h2>
            </div>
          </div>
          <div className="card-grid three services-grid">
            {services.map((service) => (
              <article key={service.title} className="card service-card">
                <p className="card-kicker">Capability</p>
                <h3>{service.title}</h3>
                <p className="service-summary">{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section work-section">
        <div className="container">
          <div className="section-head work-head">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Proof that the work gets built, not just scoped</h2>
            </div>
            <Link href="/projects" className="text-link">
              See all projects
            </Link>
          </div>
          <div className="card-grid three work-grid">
            {projects.map((project) => (
              <article key={project.slug} className="card project-card">
                <div className="card-meta">
                  <span>{project.category}</span>
                  <span>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <div className="project-outcome">
                  <p className="project-outcome-label">Why it mattered</p>
                  <p>{project.outcomes[0]}</p>
                </div>
                <div className="chip-wrap project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/projects/${project.slug}`} className="text-link build-link">
                  Read the build story
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section point-of-view-section">
        <div className="container split-layout point-of-view-layout">
          <div className="point-of-view-copy">
            <p className="eyebrow">Point of view</p>
            <h2>How I think about AI and product work</h2>
            <p className="lead point-of-view-intro">
              The goal is not more output for its own sake. The goal is better systems, tighter loops, and work that
              survives contact with reality.
            </p>
          </div>
          <div className="principles">
            {principles.map((principle, index) => (
              <div key={principle} className="principle-row">
                <span className="principle-mark">0{index + 1}</span>
                <p>{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section writing-section">
        <div className="container">
          <div className="section-head writing-head">
            <div>
              <p className="eyebrow">Writing</p>
              <h2>Writing on AI, product, and outcomes</h2>
            </div>
            <Link href="/writing" className="text-link">
              Read all writing
            </Link>
          </div>
          {featuredWritingLead ? (
            <div className="writing-feature-grid writing-home-feature-grid">
              <article className="card writing-feature-card writing-feature-primary">
                <div className="card-meta writing-meta writing-feature-meta">
                  <span>{featuredWritingLead.kind}</span>
                  <span>{formatDisplayDate(featuredWritingLead.date)}</span>
                  <span>{featuredWritingLead.readingTime}</span>
                </div>
                <h3>{featuredWritingLead.title}</h3>
                <p className="writing-summary writing-feature-summary">{featuredWritingLead.excerpt}</p>
                <div className="chip-wrap writing-tag-row">
                  {featuredWritingLead.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/writing/${featuredWritingLead.slug}`} className="text-link build-link">
                  Read featured piece
                </Link>
              </article>

              <div className="writing-feature-stack">
                {featuredWritingSecondary.map((post) => (
                  <article
                    key={post.slug}
                    className={`card writing-card writing-card-${post.kind.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <p className="card-kicker">{post.kind}</p>
                    <h3>{post.title}</h3>
                    <p className="writing-summary">{post.excerpt}</p>
                    <div className="card-meta writing-meta">
                      <span>{formatDisplayDate(post.date)}</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <Link href={`/writing/${post.slug}`} className="text-link build-link">
                      Open article
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section final-cta-section">
        <div className="container cta-panel">
          <p className="eyebrow">Work with me</p>
          <h2>Need help shaping or building with AI?</h2>
          <p className="lead">
            I work with founders and teams to turn promising ideas into real systems, prototypes, and workflows.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="button button-accent">
              Start a conversation
            </Link>
            <Link href="/work-with-me" className="button button-ghost">
              See engagement options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
