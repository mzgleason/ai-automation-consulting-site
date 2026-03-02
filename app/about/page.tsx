export default function AboutPage() {
  return (
    <section className="section section-top">
      <div className="container prose">
        <p className="eyebrow">About</p>
        <h1>I run automation projects the way strong product teams run delivery</h1>
        <p>
          My background is product management: ambiguous problems, constrained resources, and high accountability.
          That same discipline now goes into small-business automation projects. The goal is simple: remove
          repetitive work without creating brittle systems your team cannot maintain.
        </p>
        <h2>Working principles</h2>
        <ul>
          <li>Define success criteria before touching tooling.</li>
          <li>Prefer durable process changes over one-off hacks.</li>
          <li>Document tradeoffs so owners can make informed calls.</li>
          <li>Treat team adoption as a core deliverable, not an afterthought.</li>
        </ul>
        <h2>What I optimize for</h2>
        <ul>
          <li>Operational reliability under normal and edge-case conditions.</li>
          <li>Clear ownership for every workflow step and exception path.</li>
          <li>Measurable reduction in repetitive manual workload.</li>
        </ul>
      </div>
    </section>
  );
}

