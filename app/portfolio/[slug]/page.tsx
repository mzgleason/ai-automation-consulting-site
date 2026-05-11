import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinkedInPortfolioDetail } from "@/components/portfolio/LinkedInPortfolioDetail";
import { PdpTempDetail } from "@/components/portfolio/PdpTempDetail";
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

  const isLinkedInWorkflow = slug === "ai-driven-linkedin-content-workflow";
  const isLendingConcierge = slug === "ai-intern-lending-concierge-system";
  const isAffiliatesLaunch = slug === "affiliates-ping-post-api-launch";
  const isPdpTemp = slug === "pdpTemp";

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
  if (isLendingConcierge) {
    return (
      <PdpTempDetail
        category="SALES OPERATIONS"
        title="Built an AI Voice Sales Assistant for Incomplete Leads"
        summary="I built a voice AI sales assistant that calls incomplete leads, collects final qualification details, and updates the CRM so the sales team saves time."
        metricOneValue="~30%"
        metricOneLabel="Less manual follow-up"
        metricTwoValue="~60%"
        metricTwoLabel="Faster lead review"
        snapshot={[
          { label: "Type", value: "Client project (Operator-led)" },
          { label: "Problem", value: "Leads were incomplete, so reps spent too much time chasing missing details." },
          { label: "Solution", value: "AI voice assistant collected final qualification details and updated CRM records." },
          { label: "Outcome", value: "Less rep admin time and faster handoff to real sales conversations." },
          { label: "Tools & Systems", value: "Voice AI, qualification scripts, CRM sync logic, sales handoff rules" }
        ]}
        problemHeadline="Leads were coming in unfinished."
        problemBullets={[
          "Reps asked the same questions again and again.",
          "Important details were missing from lead records.",
          "The CRM needed manual cleanup before review.",
          "Too much time went to admin work instead of selling."
        ]}
        approachHeadline="Automate repeat qualification work first."
        approachSteps={[
          "Call leads that are missing key details.",
          "Ask short, clear qualification questions.",
          "Save answers into the right CRM fields.",
          "Update the lead record automatically.",
          "Send edge cases to a human rep."
        ]}
        systemHeadline="A voice AI flow that prepares leads for the sales team."
        supportTags={[
          "Voice AI",
          "Lead Qualification",
          "CRM Updates",
          "Sales Routing",
          "Human Handoff Rules",
          "Ops Time Savings"
        ]}
        insights={[
          "Clear questions lead to better answers.",
          "Fast CRM updates prevent follow-up mistakes.",
          "Defined handoff rules improve team speed.",
          "AI works best on repeat tasks."
        ]}
        lessons={[
          "Keep call scripts simple and direct.",
          "Set strict rules for human escalation.",
          "Track missing-field rates each week."
        ]}
        ctaHeadline="Want this for your sales team?"
        ctaBody="I build practical AI workflows that remove repeat admin work so reps can focus on high-value conversations."
        primaryCtaLabel="Start a conversation"
        secondaryCtaLabel="Browse playbooks"
        heroVisualVariant="lending-concierge"
      />
    );
  }
  if (isPdpTemp) {
    return (
      <PdpTempDetail
        category="[Category placeholder]"
        title="[Project title placeholder]"
        summary="[Project summary placeholder]"
        metricOneValue="[Metric value 1]"
        metricOneLabel="[Metric label 1]"
        metricTwoValue="[Metric value 2]"
        metricTwoLabel="[Metric label 2]"
        snapshot={[
          { label: "Type", value: "[Type placeholder]" },
          { label: "Problem", value: "[Problem summary placeholder]" },
          { label: "Solution", value: "[Solution summary placeholder]" },
          { label: "Outcome", value: "[Outcome placeholder]" },
          { label: "Tools & Systems", value: "[Tools and systems placeholder]" }
        ]}
        problemHeadline="[Problem headline placeholder]"
        problemBullets={["[Problem bullet 1]", "[Problem bullet 2]", "[Problem bullet 3]", "[Problem bullet 4]"]}
        approachHeadline="[Approach headline placeholder]"
        approachSteps={["[Approach step 1]", "[Approach step 2]", "[Approach step 3]", "[Approach step 4]", "[Approach step 5]"]}
        systemHeadline="[System headline placeholder]"
        supportTags={["[Support tag 1]", "[Support tag 2]", "[Support tag 3]", "[Support tag 4]", "[Support tag 5]", "[Support tag 6]"]}
        insights={["[Insight 1]", "[Insight 2]", "[Insight 3]", "[Insight 4]"]}
        lessons={["[Lesson 1]", "[Lesson 2]", "[Lesson 3]"]}
        ctaHeadline="[CTA headline placeholder]"
        ctaBody="[CTA body placeholder]"
        primaryCtaLabel="[Primary CTA label]"
        secondaryCtaLabel="[Secondary CTA label]"
      />
    );
  }
  if (isAffiliatesLaunch) {
    return (
      <PdpTempDetail
        category="0 TO 1 PRODUCT LAUNCH"
        title="Led a 0 to 1 launch of a real-time lead decisioning product."
        summary="I led the launch of a real-time lead decisioning system that improved speed-to-decision, tightened traffic quality controls, and gave teams clear visibility into performance."
        metricOneValue="0→1"
        metricOneLabel="New product capability launched"
        metricTwoValue="Real-time"
        metricTwoLabel="Decisioning and routing enabled"
        snapshot={[
          { label: "Type", value: "0 to 1 product launch leadership (strategy + systems execution)" },
          { label: "Problem", value: "Lead intake and bidding decisions were too slow and inconsistent, which limited growth and reduced signal quality." },
          { label: "Solution", value: "Built a real-time decisioning workflow with quality checks, pricing logic, and operational reporting." },
          { label: "Outcome", value: "Faster decisions, better traffic control, and stronger cross-functional operating visibility." },
          { label: "Tools & Systems", value: "Real-time API workflows, identity-based duplicate controls, rule-based decisioning, event telemetry" }
        ]}
        problemHeadline="Growth was constrained by slow decision loops."
        problemBullets={[
          "Lead decisions were not happening early enough in the flow.",
          "Quality controls were inconsistent across incoming traffic.",
          "Teams lacked one clear operational view of performance.",
          "Manual coordination created avoidable handoff delays."
        ]}
        approachHeadline="Design a narrow 0→1 wedge, then operationalize it."
        approachSteps={[
          "Define the fastest viable decisioning path.",
          "Add quality gates before committing spend.",
          "Codify bid and routing logic for repeatability.",
          "Connect the new path to existing operations.",
          "Instrument reporting so teams can coach from evidence."
        ]}
        systemHeadline="A real-time operating loop from intake to measurement."
        systemSteps={[
          { name: "Ingest", icon: "/images/portfolio-icons/capture.svg" },
          { name: "Screen", icon: "/images/portfolio-icons/extract.svg" },
          { name: "Decide", icon: "/images/portfolio-icons/draft.svg" },
          { name: "Route", icon: "/images/portfolio-icons/review.svg" },
          { name: "Measure", icon: "/images/portfolio-icons/publish.svg" }
        ]}
        supportTags={["0→1 Launch", "Real-time Operations", "Decision Systems", "Quality Controls", "Cross-team Visibility"]}
        insights={[
          "Narrow launch scope increases execution quality.",
          "Decision rights should be explicit before scaling.",
          "Operational visibility is a growth lever, not a reporting afterthought."
        ]}
        lessons={[
          "Launch the smallest version that proves real behavior.",
          "Treat quality controls as product features, not just safeguards.",
          "Design systems teams can run without heroics."
        ]}
        ctaHeadline="Need a 0→1 launch partner?"
        ctaBody="I help founders and teams launch new products, tighten decision systems, and build operating rhythms that scale."
        primaryCtaLabel="Start a conversation"
        secondaryCtaLabel="Browse playbooks"
      />
    );
  }
  return (
    <PdpTempDetail
      category={project.category.toUpperCase()}
      title={project.title}
      summary={project.summary}
      metricOneValue={project.metrics[0]?.value ?? "Shipped"}
      metricOneLabel={project.metrics[0]?.label ?? project.outcomes[0] ?? "Production delivery"}
      metricTwoValue={project.metrics[1]?.value ?? "Live"}
      metricTwoLabel={project.metrics[1]?.label ?? project.outcomes[1] ?? "Operational impact"}
      snapshot={[
        { label: "Type", value: `${project.clientType ?? "Project"} (${project.serviceType ?? "Operator-led"})` },
        { label: "Problem", value: project.problem },
        { label: "Solution", value: project.summary },
        { label: "Outcome", value: project.outcomes.join(" | ") },
        { label: "Tools & Systems", value: project.tools.slice(0, 5).join(", ") }
      ]}
      problemHeadline={project.sections.problem?.heading ?? "Core execution problem"}
      problemBullets={project.outcomes.slice(0, 4)}
      approachHeadline={project.sections.approach?.heading ?? "Build a staged, controlled workflow"}
      approachSteps={project.tools.slice(0, 5)}
      systemHeadline={project.sections.system?.heading ?? "A repeatable system with explicit controls and handoffs."}
      supportTags={project.tags.slice(0, 6)}
      insights={project.outcomes.slice(0, 4)}
      lessons={[
        "Start narrow, then scale from measured production behavior.",
        "Keep decisioning logic explicit and testable.",
        "Instrument end-to-end visibility from day one."
      ]}
      ctaHeadline="Want help building a system like this?"
      ctaBody="I build practical AI and automation systems that improve speed, quality, and decision confidence."
      primaryCtaLabel={project.ctaLabel ?? "Start a conversation"}
      secondaryCtaLabel="Browse playbooks"
    />
  );
}
