import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/content";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: project.heroImage
      ? {
          images: [{ url: project.heroImage, alt: project.title }]
        }
      : undefined
  };
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="section section-top project-detail-page">
      <div className="container detail-hero project-detail-hero">
        <Link href="/projects" className="text-link">
          Back to projects
        </Link>
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="lead">{project.summary}</p>
        <div className="detail-meta-strip">
          <span>{project.status}</span>
          {project.serviceType ? <span>{project.serviceType}</span> : null}
          {project.clientType ? <span>{project.clientType}</span> : null}
          <span>{project.date}</span>
        </div>
        <div className="chip-wrap">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
      {project.heroImage ? (
        <div className="container">
          <div className="card project-hero-visual">
            <Image src={project.heroImage} alt={`${project.title} system diagram`} width={1440} height={840} priority />
          </div>
        </div>
      ) : null}
      <div className="container detail-grid project-detail-grid">
        <aside className="detail-sidebar card project-detail-sidebar">
          <div>
            <p className="card-kicker">Status</p>
            <p>{project.status}</p>
          </div>
          {project.serviceType ? (
            <div>
              <p className="card-kicker">Offer</p>
              <p>{project.serviceType}</p>
            </div>
          ) : null}
          {project.clientType ? (
            <div>
              <p className="card-kicker">Client type</p>
              <p>{project.clientType}</p>
            </div>
          ) : null}
          <div>
            <p className="card-kicker">Tools</p>
            <ul className="plain-list">
              {project.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="card-kicker">Outcomes</p>
            <ul className="plain-list">
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>
          {project.link ? (
            <a href={project.link} className="button button-accent" target="_blank" rel="noreferrer">
              Visit project
            </a>
          ) : null}
        </aside>
        <div className="project-detail-main">
          <div className="card project-case-callout">
            <p className="card-kicker">Why this matters</p>
            <p>
              This case study shows how a messy process can be turned into a clearer system with better decisions,
              stronger handoffs, and outcomes a team can actually reuse.
            </p>
          </div>
          <article className="prose-content card" dangerouslySetInnerHTML={{ __html: project.html }} />
          <div className="cta-panel project-cta-panel">
            <p className="eyebrow">Next step</p>
            <h2>Want help shaping a system like this?</h2>
            <p className="lead">
              If you are trying to move from idea to working workflow, prototype, or decision system, this is the kind
              of work I help scope and build.
            </p>
            <div className="hero-actions">
              <Link href={project.ctaHref ?? "/contact"} className="button button-accent">
                {project.ctaLabel ?? "Start a conversation"}
              </Link>
              <Link href="/work-with-me" className="button button-ghost">
                See how I help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
