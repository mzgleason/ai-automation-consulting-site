export default function CaseApproachPage() {
  return (
    <section className="section section-top">
      <div className="container prose">
        <p className="eyebrow">Case Approach</p>
        <h1>Every engagement runs as a case brief with explicit decisions</h1>
        <p>
          Instead of inflated before/after claims, each project is documented as an operating case: baseline, chosen
          intervention, constraints, and measured results. This keeps execution grounded and auditable.
        </p>
        <h2>Case brief structure</h2>
        <ol>
          <li>Baseline current process: cycle time, handoff points, failure modes.</li>
          <li>Define constraints: tooling, staffing, compliance, and tolerance for change.</li>
          <li>Choose intervention: sequence only what can be supported operationally.</li>
          <li>Validate in staging with exception handling and rollback paths.</li>
          <li>Track impact post-launch and adjust based on observed behavior.</li>
        </ol>
        <h2>Delivery behaviors you can expect</h2>
        <ul>
          <li>Weekly written updates with outcomes, blockers, and next actions.</li>
          <li>Assumptions and tradeoffs documented before implementation.</li>
          <li>Production rollout only after validation and owner approval.</li>
          <li>Clear ownership handoff so your team can run the system confidently.</li>
        </ul>
      </div>
    </section>
  );
}

