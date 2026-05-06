import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioTemplate } from "@/components/portfolio/PortfolioTemplate";
import { LinkedInPortfolioDetail } from "@/components/portfolio/LinkedInPortfolioDetail";
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

  const isLinkedInWorkflow = slug === "ai-driven-linkedin-content-workflow";

  if (isLinkedInWorkflow) {
    return (
      <LinkedInPortfolioDetail
        title="Human-guided AI LinkedIn publishing"
        summary="Built an AI-assisted workflow that turns weekly work into high-quality LinkedIn content at scale, without burning time or sacrificing quality."
        metrics={[
          { value: "3x posts/wk", label: "Publishing cadence" },
          { value: "~2+ hrs/wk", label: "Saved on content creation" }
        ]}
      />
    );
  }
  const resultCards = isLinkedInWorkflow
    ? [
        ...results,
        {
          value: "Consistent rhythm",
          label: "Sustainable system",
          context: "A repeatable process that is easy to run every week"
        }
      ]
    : results;

  return (
    <PortfolioTemplate
      backHref="/portfolio"
      backLabel="Back to portfolio"
      category={isLinkedInWorkflow ? "AI SYSTEMS & WORKFLOWS" : project.category}
      title={project.title}
      summary={project.summary}
      metrics={results}
      snapshot={[
        { label: "Type", value: "Personal project (Operator-led)" },
        { label: "Problem", value: "Inconsistent posting and too much time spent turning ideas into drafts." },
        { label: "Solution", value: "AI-assisted workflow with clear stages, gates, and review." },
        { label: "Outcome", value: project.outcomes.join(" | ") },
        { label: "Tools & systems", value: project.tools.slice(0, 4).join(", ") }
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
      results={resultCards}
      insights={project.sections.insights ? {
        label: "Insights",
        headline: "What made the difference",
        html: "<ul><li>Start with story signal, not blank-page prompts</li><li>A clear narrative direction makes drafts better and faster</li><li>Human review is the quality multiplier</li><li>Systems create long-term consistency</li></ul>"
      } : undefined}
      lessons={project.sections.insights ? {
        label: "Lessons learned",
        headline: "What I'd do differently",
        html: "<ul><li>Invest in orchestration earlier to reduce manual steps</li><li>Build review gates smarter for higher signal feedback</li><li>Design for iteration so the system keeps getting better</li></ul>"
      } : undefined}
      cta={{
        headline: "Want help building a system like this?",
        text: "I help operators and teams turn messy processes into scalable systems that save time, improve quality, and drive real results.",
        href: isLinkedInWorkflow ? "#system" : (project.ctaHref ?? "/contact"),
        label: isLinkedInWorkflow ? "View the system" : (project.ctaLabel ?? "Start a conversation"),
        secondaryHref: "/playbooks",
        secondaryLabel: "Browse playbooks"
      }}
    />
  );
}
