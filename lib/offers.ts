export type OfferEntry = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  fit: string;
  outcomes: string[];
  deliverables: string[];
  examples: string[];
  processNote: string;
};

export const offers: OfferEntry[] = [
  {
    slug: "ai-workflow-design",
    title: "Workflow Improvement Plan",
    eyebrow: "Offer 01",
    summary:
      "Manual work is slowing the team down, handoffs are inconsistent, and important tasks rely too much on people figuring it out each time.",
    fit: "Best fit when a workflow is eating time, quality is uneven, or the team needs a clearer way to route, review, and complete recurring work.",
    outcomes: [
      "A faster, more reliable workflow with clearer ownership and less manual drag",
      "A system design that respects human review and failure cases",
      "A practical implementation roadmap instead of vague automation ideas"
    ],
    deliverables: [
      "A workflow map that shows where AI helps and where people stay in control",
      "A recommended system design for routing, review, and edge cases",
      "An implementation plan with tool and build recommendations",
      "Human review checkpoints",
      "Operational rollout roadmap",
      "Optional prototype or pilot"
    ],
    examples: [
      "Lead qualification",
      "Intake routing",
      "Customer support triage",
      "Internal knowledge access",
      "Document processing",
      "Recurring operations workflows"
    ],
    processNote:
      "We start by clarifying the workflow, the quality bar, and the human checkpoints before choosing tools or implementation paths."
  },
  {
    slug: "prototype-sprint",
    title: "Pilot or Prototype Sprint",
    eyebrow: "Offer 02",
    summary:
      "You have an AI idea with potential, but it is still too vague to fund, staff, or build with confidence.",
    fit: "Best fit when the opportunity seems real but the product direction, workflow shape, or biggest risk needs to be tested with something concrete.",
    outcomes: [
      "A clearer go, no-go, or next-step decision based on something real instead of a slide or concept",
      "A scoped proof of concept or MVP path",
      "A better handoff into build, iteration, or internal alignment"
    ],
    deliverables: [
      "A tight problem definition and prototype plan",
      "A scoped proof of concept, MVP direction, or workflow prototype",
      "A user flow or operating flow the team can react to",
      "Decision-ready assumptions and risks",
      "Technical handoff or implementation support"
    ],
    examples: [
      "AI-powered internal tools",
      "Workflow prototypes",
      "MVP shaping for AI products",
      "Operator-facing decision systems",
      "Early proof-of-concept builds"
    ],
    processNote:
      "The sprint is designed to tighten the feedback loop fast, expose ambiguity early, and produce something concrete enough to make better decisions."
  },
  {
    slug: "advisory-build-support",
    title: "Ongoing AI Advisory",
    eyebrow: "Offer 03",
    summary:
      "You are already moving, but priorities are blurry, decisions keep reopening, or the team needs stronger judgment as the work gets built.",
    fit: "Best fit when AI is already on the roadmap and the team needs help prioritizing, making better build decisions, and keeping the work tied to real business value.",
    outcomes: [
      "Less wasted effort, sharper priorities, and stronger decisions while the work is in motion",
      "Better sequencing on what to build now versus later",
      "More disciplined acceptance criteria, iteration, and delivery support"
    ],
    deliverables: [
      "Priority calls on where AI should and should not be used",
      "Feature, workflow, and system decisions during implementation",
      "Clear acceptance criteria and quality checks",
      "Builder-side feedback on tradeoffs and sequencing",
      "Iteration guidance"
    ],
    examples: [
      "AI opportunity reviews",
      "Workflow prioritization",
      "Prototype-to-production guidance",
      "Evaluation and acceptance support",
      "Ongoing build partnership"
    ],
    processNote:
      "This works best when the team wants a builder-led partner who can keep the work grounded in outcomes while the product or system is taking shape."
  }
];

export const qualificationFaq = [
  {
    question: "What is the best fit for working together?",
    answer:
      "The fit is strongest if you have a real business process that is slow, repetitive, or inconsistent and you want a practical way to improve it with AI."
  },
  {
    question: "Do you only work on full builds?",
    answer:
      "No. Some engagements stop at strategy and workflow design. Others start with a pilot or prototype and grow into deeper implementation support."
  },
  {
    question: "What happens in a first conversation?",
    answer:
      "We clarify what is slowing the business down today, where the handoffs or delays are happening, what a successful outcome looks like, and what the smartest first step would be."
  },
  {
    question: "What kinds of teams are a poor fit?",
    answer:
      "Low-fit inquiries usually want a vague AI layer without a real workflow, owner, quality bar, or business outcome behind it."
  }
];

export const processSteps = [
  {
    title: "Understand",
    summary: "Clarify what is happening today, where time is being lost, and what a better outcome should look like."
  },
  {
    title: "Test",
    summary: "Try the riskiest part in a simple, concrete way before committing to a bigger rollout."
  },
  {
    title: "Refine",
    summary: "Use what the early version teaches us to improve the workflow, tighten decisions, and reduce waste."
  },
  {
    title: "Put in place",
    summary: "Turn the useful version into a working process, tool, or implementation plan the team can actually use."
  }
];

export function getOfferBySlug(slug: string) {
  return offers.find((offer) => offer.slug === slug);
}
