import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioTemplate } from "@/components/portfolio/PortfolioTemplate";
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

  const results = project.metrics.length > 0
    ? project.metrics
    : project.outcomes.slice(0, 4).map((outcome) => ({
        value: "Outcome",
        label: outcome
      }));

  return (
    <PortfolioTemplate
      backHref="/portfolio"
      backLabel="Back to portfolio"
      category={project.category}
      title={project.title}
      summary={project.summary}
      metrics={results}
      snapshot={[
        { label: "Type", value: project.serviceType ?? project.category },
        { label: "Problem", value: project.problem },
        { label: "Solution", value: project.sections.shipped?.heading ? "Reusable system with explicit handoffs" : project.tools[0] },
        { label: "Outcome", value: project.outcomes[0] },
        { label: "Tools", value: project.tools.slice(0, 3).join(", ") }
      ]}
      problem={project.sections.problem ? {
        label: "Problem",
        headline: project.sections.problem.heading,
        html: project.sections.problem.html
      } : undefined}
      approach={project.sections.approach ? {
        label: "Approach",
        headline: project.sections.approach.heading,
        html: project.sections.approach.html
      } : undefined}
      system={project.sections.system ? {
        label: "System",
        headline: project.sections.system.heading,
        html: project.sections.system.html
      } : undefined}
      workflowDiagram={project.heroImage ? {
        imageSrc: project.heroImage,
        imageAlt: `${project.title} system diagram`
      } : undefined}
      results={results}
      insights={project.sections.insights ? {
        label: "Insights",
        headline: project.sections.insights.heading,
        html: project.sections.insights.html
      } : undefined}
      cta={{
        headline: "Want help shaping a system like this?",
        text: "If you are trying to move from idea to working workflow, prototype, or decision system, this is the kind of work I help scope and build.",
        href: project.ctaHref ?? "/contact",
        label: project.ctaLabel ?? "Start a conversation",
        secondaryHref: "/playbooks",
        secondaryLabel: "Browse playbooks"
      }}
    />
  );
}
