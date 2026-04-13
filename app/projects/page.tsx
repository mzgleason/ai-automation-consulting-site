import Image from "next/image";
import Link from "next/link";
import { BrutalistFrame } from "@/components/projects/BrutalistFrame";
import { getProjectCategories, getProjects } from "@/lib/content";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const [projects, categories, params] = await Promise.all([
    getProjects(),
    getProjectCategories(),
    searchParams,
  ]);
  const requestedCategory = Array.isArray(params.category)
    ? params.category[0]
    : params.category;
  const activeCategory =
    requestedCategory && categories.includes(requestedCategory)
      ? requestedCategory
      : "All";
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <main className="section section-top">
      <section className="projects-hero">
        <div className="container projects-hero-intro">
          <p className="eyebrow">Projects</p>
          <h1>Case studies from shipped AI systems.</h1>
          <p className="lead projects-hero-lead">
            Practical build stories across content operations, intake
            automation, and model workflows—with clear decisions, constraints,
            and outcomes.
          </p>
          <Link
            href="#featured-case-studies"
            className="text-link projects-hero-link"
          >
            Start with featured case studies
          </Link>
        </div>

        <div className="container projects-hero-filters">
          <BrutalistFrame
            marker="01"
            title="UTILITY / FILTERS"
            className="projects-brutalist-block"
          >
            <div className="projects-filter-meta">
              <p className="projects-filter-label">Browse by category</p>
              <p className="projects-filter-count" aria-live="polite">
                {filteredProjects.length}{" "}
                {filteredProjects.length === 1 ? "case study" : "case studies"}
                {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
              </p>
            </div>
            <div
              className="filter-row project-filter-row"
              aria-label="Filter projects by category"
            >
              <Link
                href="/projects"
                className={`chip project-filter-chip ${activeCategory === "All" ? "chip-active" : ""}`}
              >
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
          </BrutalistFrame>
        </div>
      </section>

      <section
        id="featured-case-studies"
        className="section section-compact projects-featured-section"
      >
        <div className="container">
          <BrutalistFrame
            marker="02"
            title="FEATURED / PROOF"
            className="projects-brutalist-block"
          >
            <div className="section-head project-index-head">
              <div>
                <p className="eyebrow">Featured case studies</p>
                <h2>
                  Proof depth for the kinds of systems I help shape and ship
                </h2>
              </div>
            </div>
            <div className="project-showcase-grid">
              {featuredProjects.map((project) => (
                <article
                  key={project.slug}
                  className="card project-showcase-card"
                >
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
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-link build-link"
                    >
                      Read the build story
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </BrutalistFrame>
        </div>
      </section>

      <section className="section section-compact">
        <div className="container">
          <BrutalistFrame
            marker="03"
            title="BROWSE / ARCHIVE"
            className="projects-brutalist-block"
          >
            <div className="section-head project-index-head">
              <div>
                <p className="eyebrow">Build cards</p>
                <h2>
                  {activeCategory === "All"
                    ? "All case studies"
                    : `${activeCategory} case studies`}
                </h2>
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
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-link build-link"
                  >
                    Read the build story
                  </Link>
                </article>
              ))}
            </div>
          </BrutalistFrame>
        </div>
      </section>
    </main>
  );
}
