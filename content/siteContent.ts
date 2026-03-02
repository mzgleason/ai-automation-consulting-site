export type PricingTier = {
  id: "starter" | "growth" | "scale";
  name: string;
  timeline: string;
  summary: string;
  deliverables: string[];
  ctaLabel: string;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter Automation Sprint",
    timeline: "2 weeks",
    summary: "Automate 1-2 high-friction workflows to prove ROI fast.",
    deliverables: [
      "Workflow audit and opportunity map",
      "Implementation of 1-2 automations",
      "SOP documentation and owner training",
      "14-day post-launch tune-up"
    ],
    ctaLabel: "Book Starter Call"
  },
  {
    id: "growth",
    name: "Growth Automation System",
    timeline: "4-6 weeks",
    summary: "Build a connected automation layer across operations and follow-up.",
    deliverables: [
      "Multi-step workflow system design",
      "Tool integrations and routing logic",
      "Team playbook and adoption training",
      "Performance dashboard with KPI baselines"
    ],
    ctaLabel: "Book Growth Call"
  },
  {
    id: "scale",
    name: "Scale Automation Partner",
    timeline: "Monthly",
    summary: "Ongoing optimization and roadmap execution for compounding gains.",
    deliverables: [
      "Monthly KPI and bottleneck review",
      "Priority backlog and sprint execution",
      "Change management support",
      "Advanced workflows and experiments"
    ],
    ctaLabel: "Book Scale Call"
  }
];

export type ResourcePost = {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  author: string;
  tags: string[];
  readingTime: string;
};

export const resourcePosts: ResourcePost[] = [
  {
    title: "The Local SMB AI Automation Playbook",
    slug: "ai-automation-playbook",
    summary:
      "A practical framework to find, prioritize, and ship your first profitable AI automations.",
    publishedAt: "2026-03-01",
    author: "Iris Consulting",
    tags: ["automation", "operations", "smb"],
    readingTime: "12 min"
  }
];

