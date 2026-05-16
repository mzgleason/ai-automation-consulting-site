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
  const isAffiliatesLaunch = slug === "realtime-lead-buying";
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
        category="REAL-TIME BUYER / SELLER SYSTEMS"
        title="Building Real-Time Routing Systems for Marketplace Businesses"
        summary="Built a real-time routing workflow that helped buyers and sellers connect faster, apply partner rules earlier, and improve decision quality in a high-volume marketplace."
        metricOneValue="Real-time"
        metricOneLabel="Routing and marketplace decisions"
        metricTwoValue="Flexible"
        metricTwoLabel="Partner controls and workflow automation"
        snapshot={[
          { label: "Type", value: "Marketplace workflow launch and operational rollout" },
          { label: "Problem", value: "Legacy marketplace flows relied on slow handoffs, rigid rules, and limited visibility across buyer and seller operations." },
          { label: "Solution", value: "A real-time routing workflow was implemented so partners could preview opportunities, apply business rules, and respond instantly." },
          { label: "Outcome", value: "Faster decisions, improved operational flexibility, and stronger alignment between supply and demand." },
          { label: "Tools & Systems", value: "API integrations, routing logic, partner controls, operational dashboards, marketplace monitoring" }
        ]}
        problemHeadline="Slow handoffs and rigid rules reduced marketplace speed."
        problemBullets={[
          "Partners used different quality thresholds, targeting rules, and response strategies.",
          "Legacy workflows added delays between lead intake, evaluation, and action.",
          "Operational teams lacked shared real-time visibility into marketplace performance.",
          "The system needed partner flexibility without degrading customer experience."
        ]}
        approachHeadline="Design a routing system, then operationalize it."
        approachSteps={[
          "Define rollout scope, decision points, and launch constraints.",
          "Design routing and response workflow for real-time execution.",
          "Standardize partner onboarding requirements and control surfaces.",
          "Define operational reporting and monitoring requirements.",
          "Coordinate implementation across product, engineering, and operations."
        ]}
        systemHeadline="A repeatable flow from intake to routed outcomes."
        systemSteps={[
          { name: "Ingest", icon: "/images/portfolio-icons/receive.svg" },
          { name: "Enrich", icon: "/images/portfolio-icons/data-2.svg" },
          { name: "Validate", icon: "/images/portfolio-icons/shield-check.svg" },
          { name: "Auction", icon: "/images/portfolio-icons/money-check.svg" },
          { name: "Route", icon: "/images/portfolio-icons/branch.svg" }
        ]}
        supportTags={[
          "Intake and qualification workflows",
          "Real-time response and matching",
          "Business rule and traffic controls",
          "Operational routing and distribution",
          "Marketplace reporting and visibility"
        ]}
        insights={[
          "Faster routing improves both operational speed and buyer experience.",
          "Configurable partner controls support healthier marketplace balance.",
          "Real-time visibility enables earlier response to performance shifts.",
          "Scalable workflow logic reduces overhead as marketplace volume grows."
        ]}
        lessons={[
          "Operational flexibility is as important as raw system speed.",
          "Routing systems perform better when decision logic is explicit.",
          "Stable real-time workflows require shared cross-team ownership.",
          "Simple operational controls can create outsized marketplace impact."
        ]}
        ctaHeadline="Need a marketplace or routing system like this?"
        ctaBody="This project shows a practical way to improve routing speed, workflow visibility, and marketplace performance without adding unnecessary complexity."
        primaryCtaLabel="Start a conversation"
        secondaryCtaLabel="Browse playbooks"
        heroVisualImageSrc="/images/portfolio/project-1-visual.png"
      />
    );
  }  return (
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







