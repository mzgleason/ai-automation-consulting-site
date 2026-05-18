import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinkedInPortfolioDetail } from "@/components/portfolio/LinkedInPortfolioDetail";
import { PdpTempDetail } from "@/components/portfolio/PdpTempDetail";
import { getProjectBySlug, getProjects } from "@/lib/content";

const PROJECT_HERO_VISUAL_BY_SLUG: Record<string, string> = {
  "realtime-decision-routing-system": "/images/portfolio/project-1-visual-v2.png",
  "ai-content-publishing-workflow": "/images/portfolio/project-2-visual-v2.png",
  "ai-intake-qualification-workflow": "/images/portfolio/project-3-visual-v2.png",
  "marketplace-scoring-system": "/images/portfolio/project-4-visual-v2.png"
};

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
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: project.heroImage
      ? {
          images: [{ url: project.heroImage, alt: project.title }]
        }
      : {
          images: [{ url: "/images/portfolio/project-1-visual-v2.png", alt: "Mark Gleason portfolio case study visual" }]
        },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Mark Gleason`,
      description: project.summary,
      images: [project.heroImage ?? "/images/portfolio/project-1-visual-v2.png"]
    }
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

  const isLinkedInWorkflow = slug === "ai-content-publishing-workflow";
  const isLendingConcierge = slug === "ai-intake-qualification-workflow";
  const isAffiliatesLaunch = slug === "realtime-decision-routing-system";
  const isMarketplaceScoring = slug === "marketplace-scoring-system";
  const isPdpTemp = slug === "pdpTemp";
  const heroBackgroundImageSrc = PROJECT_HERO_VISUAL_BY_SLUG[slug];
  const projectDate = project.date;
  const schemaPayload = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: project.title,
    description: project.summary,
    author: { "@type": "Person", name: "Mark Gleason" },
    datePublished: project.date,
    dateModified: project.date,
    keywords: project.tags,
    url: `https://markzgleason.com/portfolio/${project.slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://markzgleason.com/" },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://markzgleason.com/portfolio" },
        { "@type": "ListItem", position: 3, name: project.title, item: `https://markzgleason.com/portfolio/${project.slug}` }
      ]
    }
  };

  if (isLinkedInWorkflow) {
    return (
      <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }} />
      <LinkedInPortfolioDetail
        title="Human-guided AI LinkedIn publishing"
        summary="Built an AI-assisted workflow that turns weekly work into high-quality LinkedIn content at scale, without burning time or sacrificing quality."
        heroBackgroundImageSrc={heroBackgroundImageSrc ?? "/images/portfolio/project-2-visual-v2.png"}
        lastUpdated={projectDate}
        metrics={[
          { value: "3x posts/wk", label: "Publishing cadence" },
          { value: "~2+ hrs/wk", label: "Saved on content creation" }
        ]}
      />
      </>
    );
  }
  if (isLendingConcierge) {
    return (
      <PdpTempDetail
        category="SALES OPERATIONS"
        title="AI-Assisted Intake Handling Before Sales Team Review"
        summary="I built an AI-assisted intake triage prototype that handled repetitive early-stage conversations, filtered low-quality operational work before sales team engagement, and escalated qualified opportunities to sales reps with structured context attached."
        metricOneValue="~35%"
        metricOneLabel="More sales rep time spent on qualified opportunities"
        metricTwoValue="~50%"
        metricTwoLabel="Reduction in repetitive intake and follow-up work"
        snapshot={[
          { label: "Type", value: "Operational intake automation prototype" },
          { label: "Problem", value: "Sales and operations teams were spending too much time on repetitive intake cleanup before meaningful conversations and decisions could happen." },
          { label: "Solution", value: "Built an operational triage prototype using n8n and VAPI to automate intake collection, synchronize records, and apply qualification and escalation rules before sales team review." },
          { label: "Outcome", value: "Reduced repetitive intake work, improved sales handoffs, and allowed teams to focus more attention on high-value conversations and edge cases." },
          { label: "Tools & Systems", value: "n8n workflows, VAPI voice agents, Google Sheets operations tracking, calendar-aware scheduling, CRM synchronization, escalation routing logic" }
        ]}
        problemHeadline="Repetitive intake work was consuming employee time before real decisions could start."
        problemBullets={[
          "Incoming records often entered review with missing context and inconsistent structure.",
          "Team members repeated the same intake collection work across high volumes.",
          "Operational updates were manually copied across systems.",
          "Sales handoffs were inconsistent because qualification and escalation rules were not clearly defined.",
          "CRM records required cleanup before meaningful follow-up could happen.",
          "High-value opportunities were delayed by incomplete intake and repetitive operational tasks."
        ]}
        approachHeadline="Shift repetitive intake handling into an automated triage layer."
        approachSteps={[
          "Detect incomplete records: n8n monitored intake queues and flagged requests missing required context.",
          "Run AI outreach: VAPI agents handled repetitive early-stage conversations to fill data gaps.",
          "Synchronize structured data: Summaries, fields, and scheduling updates were written back automatically.",
          "Route based on qualification signals: Workflow rules separated low-quality intake work from sales escalation candidates.",
          "Escalate qualified cases: High-intent or edge-case requests were handed to sales reps with structured conversation context attached."
        ]}
        systemHeadline="Operational triage system for protecting sales team focus."
        systemSteps={[
          { name: "Detect", icon: "/images/portfolio-icons/target.svg" },
          { name: "Qualify", icon: "/images/portfolio-icons/review.svg" },
          { name: "Synchronize", icon: "/images/portfolio-icons/data-2.svg" },
          { name: "Route", icon: "/images/portfolio-icons/branch.svg" },
          { name: "Escalate", icon: "/images/portfolio-icons/capture.svg" }
        ]}
        supportTags={[
          "Voice AI",
          "Operational Triage",
          "Lead Qualification Workflow",
          "CRM Synchronization",
          "Sales Rep Handoff Rules",
          "Scheduling Automation",
          "Structured Intake Collection",
          "AI-Assisted Intake Operations"
        ]}
        insights={[
          "AI performs best on repetitive operational conversations.",
          "Structured intake flows improve downstream review quality.",
          "Fast operational synchronization reduces rep friction.",
          "Sales escalation logic matters more than conversational complexity.",
          "Qualification workflows work best with tightly defined schemas."
        ]}
        lessons={[
          "AI works best inside tightly scoped operational workflows.",
          "Escalation logic matters more than conversational realism.",
          "Structured intake improves downstream workflow quality.",
          "Sales team review remains critical for edge cases and high-value conversations.",
          "Operational clarity beats feature complexity."
        ]}
        ctaHeadline="Building operational systems that protect sales team focus"
        ctaBody="I design AI-assisted operational workflows that reduce repetitive intake work, improve sales handoffs, and help teams spend more time on high-value conversations and decisions."
        primaryCtaLabel="Start a conversation"
        secondaryCtaLabel="Browse playbooks"
        heroBackgroundImageSrc={heroBackgroundImageSrc ?? "/images/portfolio/project-3-visual-v2.png"}
        lastUpdated={projectDate}
      />
    );
  }
  if (isPdpTemp) notFound();

  if (isAffiliatesLaunch) {
    return (
      <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }} />
      <PdpTempDetail
        lastUpdated={projectDate}
        category="REAL-TIME BUYER / SELLER SYSTEMS"
        title="Building Operational Systems for Real-Time Marketplace Decisions"
        summary="Built operational routing infrastructure that helped marketplace teams react faster, apply business logic earlier, and manage traffic more intentionally in real time."
        metricOneValue="Real-time"
        metricOneLabel="Routing and marketplace decisions"
        metricTwoValue="Flexible"
        metricTwoLabel="Partner controls and workflow automation"
        metricOneIconSrc="/images/portfolio-icons/activity.svg"
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
        approachHeadline="Move routing decisions earlier and make controls configurable."
        approachSteps={[
          "Translate marketplace constraints into routing logic teams could actually operate against.",
          "Design operational decision flows that could react to marketplace conditions in real time.",
          "Create configurable controls so partner behavior could adapt without rebuilding the system.",
          "Expose routing visibility earlier so operational teams could identify issues before performance degraded.",
          "Keep operational, product, and engineering decisions aligned as the system evolved."
        ]}
        systemHeadline="What is the routing system and why it matters: intake-to-route decisions become faster, clearer, and easier to govern at scale."
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
        heroBackgroundImageSrc={heroBackgroundImageSrc ?? "/images/portfolio/project-1-visual-v2.png"}
      />
      </>
    );
  }
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }} />
    <PdpTempDetail
      lastUpdated={projectDate}
      category={project.category.toUpperCase()}
      title={project.title}
      summary={project.summary}
      metricOneValue={project.metrics[0]?.value ?? "Shipped"}
      metricOneLabel={project.metrics[0]?.label ?? project.outcomes[0] ?? "Production delivery"}
      metricTwoValue={project.metrics[1]?.value ?? "Live"}
      metricTwoLabel={project.metrics[1]?.label ?? project.outcomes[1] ?? "Operational impact"}
      metricOneIconSrc={isMarketplaceScoring ? "/images/portfolio-icons/activity.svg" : undefined}
      metricTwoIconSrc={isMarketplaceScoring ? "/images/portfolio-icons/signal.svg" : undefined}
      snapshot={[
        { label: "Type", value: `${project.clientType ?? "Project"} (${project.serviceType ?? "Operator-led"})` },
        { label: "Problem", value: project.problem },
        { label: "Solution", value: project.summary },
        { label: "Outcome", value: project.outcomes.join(" | ") },
        { label: "Tools & Systems", value: project.tools.slice(0, 5).join(", ") }
      ]}
      problemHeadline={project.sections.problem?.heading ?? "What problem did this system solve?"}
      problemBullets={project.outcomes.slice(0, 4)}
      approachHeadline={project.sections.approach?.heading ?? "How was the system implemented?"}
      approachSteps={project.tools.slice(0, 5)}
      systemHeadline={isMarketplaceScoring ? "Operational scoring workflow" : project.sections.system?.heading ?? "What is the system and why does it matter for operational outcomes?"}
      systemSteps={
        isMarketplaceScoring
          ? [
              { name: "Collect", icon: "/images/portfolio-icons/database.svg" },
              { name: "Score", icon: "/images/portfolio-icons/gauge.svg" },
              { name: "Allocate", icon: "/images/portfolio-icons/shuffle.svg" },
              { name: "Monitor", icon: "/images/portfolio-icons/eye.svg" },
              { name: "Optimize", icon: "/images/portfolio-icons/sliders-horizontal.svg" }
            ]
          : undefined
      }
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
      heroBackgroundImageSrc={heroBackgroundImageSrc}
      />
    </>
  );
}







