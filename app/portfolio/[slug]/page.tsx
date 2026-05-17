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
        title="Automated Lead Qualification Before Human Follow-Up"
        summary="I built an AI-assisted qualification workflow that called incomplete leads, collected missing application details, updated operational systems automatically, and prepared cleaner handoffs for human sales reps."
        metricOneValue="~40%"
        metricOneLabel="Faster lead qualification"
        metricTwoValue="~60%"
        metricTwoLabel="Faster application review"
        snapshot={[
          { label: "Type", value: "Operator-led workflow automation project" },
          { label: "Problem", value: "Sales reps spent too much time repeating intake questions and manually updating incomplete lead records before follow-up conversations could begin." },
          { label: "Solution", value: "Built an AI-assisted intake workflow using n8n and VAPI to collect missing qualification details, sync operational systems, schedule follow-ups, and prepare structured summaries for sales reps." },
          { label: "Outcome", value: "Cleaner lead records, faster qualification review, reduced repetitive admin work, and more consistent human handoffs." },
          { label: "Tools & Systems", value: "n8n workflows, VAPI voice agents, Google Sheets operations tracking, calendar-aware scheduling, CRM synchronization, structured qualification pipelines" }
        ]}
        problemHeadline="Lead qualification work was slowing down the sales process."
        problemBullets={[
          "Lead records often entered review missing key qualification details.",
          "Reps repeated the same intake conversations across large lead volumes.",
          "Operational updates were manually copied across systems.",
          "Follow-up scheduling depended heavily on rep availability.",
          "CRM records required cleanup before meaningful sales conversations could happen.",
          "High-intent leads were delayed by repetitive admin work."
        ]}
        approachHeadline="Move repetitive qualification work earlier in the workflow."
        approachSteps={[
          "Detect incomplete lead records: n8n monitored operational lead lists and identified applications missing required qualification details.",
          "Launch AI qualification calls: VAPI voice agents contacted leads automatically to collect missing intake information.",
          "Pull operational context: The AI assistant referenced calendars, project notes, and operational tracking systems during conversations.",
          "Update operational systems: Structured summaries, qualification fields, and scheduling updates were written back automatically.",
          "Escalate qualified opportunities: High-intent or edge-case leads were routed to human reps for direct follow-up."
        ]}
        systemHeadline="How the operational workflow functioned."
        systemSteps={[
          { name: "Detect", icon: "/images/portfolio-icons/target.svg" },
          { name: "Qualify", icon: "/images/portfolio-icons/capture.svg" },
          { name: "Synchronize", icon: "/images/portfolio-icons/data-2.svg" },
          { name: "Escalate", icon: "/images/portfolio-icons/branch.svg" }
        ]}
        supportTags={[
          "Voice AI",
          "Qualification Workflows",
          "Operational Automation",
          "CRM Synchronization",
          "Human Handoff Logic",
          "Scheduling Automation",
          "Structured Intake Systems",
          "AI-Assisted Operations"
        ]}
        insights={[
          "AI performs best on repetitive operational conversations.",
          "Structured intake flows improve downstream review quality.",
          "Fast operational synchronization reduces rep friction.",
          "Human escalation logic matters more than conversational complexity.",
          "Qualification workflows work best with tightly defined schemas."
        ]}
        lessons={[
          "Narrow operational workflows outperform broad AI assistants.",
          "Human review checkpoints remain important for edge cases.",
          "Qualification systems fail when required fields are loosely defined.",
          "AI workflows become more reliable when escalation paths are explicit.",
          "Operational clarity matters more than conversational realism."
        ]}
        ctaHeadline="Building practical AI workflows for operational teams"
        ctaBody="I design AI-assisted operational systems that reduce repetitive admin work, improve workflow quality, and keep human teams focused on higher-value decisions."
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
        title="Building Operational Systems for Real-Time Marketplace Decisions"
        summary="Built operational routing infrastructure that helped marketplace teams react faster, apply business logic earlier, and manage traffic more intentionally in real time."
        metricOneValue="Real-time"
        metricOneLabel="Routing and marketplace decisions"
        metricTwoValue="Flexible"
        metricTwoLabel="Partner controls and workflow automation"
        snapshot={[
          { label: "Type", value: "Marketplace workflow launch and operational rollout" },
          { label: "Problem", value: "Routing decisions were delayed by operational handoffs, inconsistent partner logic, and workflows that could not react fast enough to marketplace changes." },
          { label: "Solution", value: "Built a configurable routing layer that let teams apply business logic earlier, respond to traffic shifts faster, and reduce lag between intake and operational action." },
          { label: "Outcome", value: "Improved marketplace responsiveness, faster operational decisions, and better visibility into how traffic moved through the system." },
          { label: "Tools & Systems", value: "API integrations, routing logic, partner controls, operational dashboards, marketplace monitoring" }
        ]}
        problemHeadline="Slow handoffs and rigid rules reduced marketplace speed."
        problemBullets={[
          "Partners used different quality thresholds, targeting rules, and response strategies.",
          "Legacy workflows added delays between lead intake, evaluation, and action.",
          "Teams were reacting to marketplace changes too late because routing visibility was fragmented across systems.",
          "The system needed partner flexibility without degrading customer experience."
        ]}
        approachHeadline="Design a routing system, then operationalize it."
        approachSteps={[
          "Translate marketplace constraints into routing logic teams could actually operate against.",
          "Design operational decision flows that could react to marketplace conditions in real time.",
          "Create configurable controls so partner behavior could adapt without rebuilding the system.",
          "Expose routing visibility earlier so operational teams could identify issues before performance degraded.",
          "Keep operational, product, and engineering decisions aligned as the system evolved."
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
        ctaBody="This system was designed to improve marketplace responsiveness, reduce operational friction, and make routing decisions easier to manage at scale without creating unnecessary process overhead."
        primaryCtaLabel="Start a conversation"
        secondaryCtaLabel="Browse playbooks"
        heroBackgroundVariant="realtime-routing-field"
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







