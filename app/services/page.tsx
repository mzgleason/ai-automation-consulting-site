import { PageHero } from "@/components/PageHero";

const serviceTracks = [
  {
    title: "Diagnostic Audit",
    detail:
      "Map current workflow reality: handoffs, failure points, tool constraints, and ownership boundaries.",
    outputs: [
      "Prioritized automation opportunities",
      "Risk register for exceptions",
      "Decision memo for phase-one scope"
    ]
  },
  {
    title: "System Blueprint",
    detail:
      "Design exact logic paths before implementation: triggers, branch conditions, approvals, and fallback actions.",
    outputs: [
      "Workflow architecture map",
      "Data-routing rules",
      "Implementation sequencing plan"
    ]
  },
  {
    title: "Build + Enablement",
    detail:
      "Deploy staged automations, test edge cases, and hand over operational ownership to your team.",
    outputs: [
      "Production-ready automations",
      "SOP documentation",
      "Owner training and transition"
    ]
  }
];

const riskControls = [
  "No production deployment without owner signoff",
  "Exception handling and rollback path on every workflow",
  "Access controls and least-privilege connection setup",
  "Written handoff and operating SOP for internal team"
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="From process diagnosis to reliable production automation"
        subtitle="Each engagement runs through explicit checkpoints so your team gains speed without losing control."
      />

      <section className="section">
        <div className="container editorial-intro">
          <div>
            <p className="eyebrow">Delivery Shape</p>
            <h2>Every service stage reduces risk before scale.</h2>
          </div>
          <p>
            Decisions come before implementation. Implementation comes before expansion. This protects service quality
            while automation volume grows.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container card-grid three tier-grid">
          {serviceTracks.map((track) => (
            <article className="card tier-card" key={track.title}>
              <h2>{track.title}</h2>
              <p>{track.detail}</p>
              <ul className="micro-list">
                {track.outputs.map((output) => (
                  <li key={output}>{output}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <p className="eyebrow">Security + Governance</p>
          <h2>Risk controls included in every implementation</h2>
          <ul className="micro-list">
            {riskControls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}