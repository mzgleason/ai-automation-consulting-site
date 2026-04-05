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
    title: "AI Workflow Design",
    eyebrow: "Offer 01",
    summary:
      "For businesses or teams that want to structure repetitive, manual, or fuzzy work into a better AI-enabled workflow.",
    fit: "Best fit when the bottleneck is operational friction, inconsistent handoffs, or work that should be routed, reviewed, and improved instead of handled from scratch every time.",
    outcomes: [
      "A clearer workflow map with real decision points",
      "A system design that respects human review and failure cases",
      "A practical implementation roadmap instead of vague automation ideas"
    ],
    deliverables: [
      "Workflow map",
      "Recommended system design",
      "Human-in-the-loop design",
      "Tool selection or build recommendation",
      "Implementation roadmap",
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
    title: "Prototype Sprint",
    eyebrow: "Offer 02",
    summary:
      "For founders or operators who need to move from vague idea to testable product, workflow, or proof of concept quickly.",
    fit: "Best fit when the opportunity feels promising but the riskiest assumptions, workflow shape, or product direction still need to be pressure-tested with a real artifact.",
    outcomes: [
      "A tighter product or workflow direction",
      "A scoped proof of concept or MVP path",
      "A better handoff into build, iteration, or internal alignment"
    ],
    deliverables: [
      "Problem framing",
      "Prototype plan",
      "Scoped MVP or proof of concept",
      "User flow or workflow design",
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
    title: "Advisory + Build Support",
    eyebrow: "Offer 03",
    summary:
      "For teams that need a partner who can help shape the right AI opportunity and stay involved as it gets built.",
    fit: "Best fit when the team already knows AI matters, but needs sharper prioritization, stronger evaluation thinking, and an operator who can stay close to the work as decisions compound.",
    outcomes: [
      "Better sequencing on what to build now versus later",
      "Stronger product and workflow decisions during implementation",
      "More disciplined acceptance criteria, iteration, and delivery support"
    ],
    deliverables: [
      "Opportunity framing",
      "Feature or system prioritization",
      "Workflow and product decisions",
      "Acceptance criteria and evaluation thinking",
      "Build partner support",
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
      "The fit is strongest if you are trying to structure a workflow, scope an AI-powered product or prototype, or move from a vague idea to a real system without wasting months."
  },
  {
    question: "Do you only work on full builds?",
    answer:
      "No. Some engagements are strategy and workflow design only. Others start as a prototype sprint or advisory engagement and grow into deeper build support."
  },
  {
    question: "What happens in a first conversation?",
    answer:
      "We clarify the problem, the current workflow, the constraint that matters most, the quality bar, and what a useful first milestone would look like."
  },
  {
    question: "What kinds of teams are a poor fit?",
    answer:
      "Low-fit inquiries usually want a vague AI layer without a real workflow, owner, quality bar, or business outcome behind it."
  }
];

export const processSteps = [
  {
    title: "Scope",
    summary: "Clarify the problem, workflow, constraints, and what success should look like."
  },
  {
    title: "Prototype",
    summary: "Pressure-test the riskiest interaction, handoff, or system shape with something concrete."
  },
  {
    title: "Iterate",
    summary: "Use what the prototype or workflow exposes to sharpen decisions, requirements, and next steps."
  },
  {
    title: "Operationalize",
    summary: "Turn the useful version into a system, process, or ongoing build path that can actually run."
  }
];

export function getOfferBySlug(slug: string) {
  return offers.find((offer) => offer.slug === slug);
}
