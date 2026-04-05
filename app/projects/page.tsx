import Image from "next/image";
import Link from "next/link";
import { getProjectCategories, getProjects } from "@/lib/content";

export default async function ProjectsPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const [projects, categories, params] = await Promise.all([getProjects(), getProjectCategories(), searchParams]);
  const requestedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const activeCategory = requestedCategory && categories.includes(requestedCategory) ? requestedCategory : "All";
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const filteredProjects = activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <main className="section section-top">
      <div className="container page-intro">
        <p className="eyebrow">Projects</p>
        <h1>Real systems, prototypes, and workflow builds</h1>
        <p className="lead">
          A practical record of how ambiguous ideas became shipped tools, operating systems, and measurable outcomes.
        </p>
      </div>

      <div className="container filter-row project-filter-row">
        <Link href="/projects" className={`chip project-filter-chip ${activeCategory === "All" ? "chip-active" : ""}`}>
          All case studies
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/projects?category=${encodeURIComponent(category)}`}
            className={`chip project-filter-chip ${activeCategory === category ? "chip-active" : ""}`}
          >
            {category}
          </Link>
        ))}
      </div>

      <section className="section section-compact">
        <div className="container">
          <div className="section-head project-index-head">
            <div>
              <p className="eyebrow">Featured case studies</p>
              <h2>Proof depth for the kinds of systems I help shape and ship</h2>
            </div>
          </div>
          <div className="project-showcase-grid">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="card project-showcase-card">
                {project.coverImage ? (
                  <div className="project-showcase-media">
                    <Image
                      src={project.coverImage}
                      alt={`${project.title} case study diagram`}
                      width={1200}
                      height={720}
                    />
                  </div>
                ) : null}
                <div className="project-showcase-copy">
                  <div className="card-meta">
                    <span>{project.category}</span>
                    <span>{project.serviceType ?? project.status}</span>
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-compact">
        <div className="container">
          <div className="section-head project-index-head">
            <div>
              <p className="eyebrow">Build cards</p>
              <h2>{activeCategory === "All" ? "All case studies" : `${activeCategory} case studies`}</h2>
            </div>
          </div>
          <div className="card-grid three">
            {filteredProjects.map((project) => (
              <article key={project.slug} className="card project-card">
                <div className="card-meta">
                  <span>{project.category}</span>
                  <span>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <div className="project-outcome">
                  <p className="project-outcome-label">What it did</p>
                  <p>{project.problem}</p>
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
    </main>
  );
}
