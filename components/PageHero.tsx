import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  ctaLabel = "Book Discovery Call"
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
}) {
  return (
    <section className="hero reveal">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{subtitle}</p>
          <div className="hero-actions">
            <Link href="/book" className="button button-accent">
              {ctaLabel}
            </Link>
            <Link href="/services" className="button button-ghost">
              Review Services
            </Link>
          </div>
          <div className="hero-kpis" aria-label="Outcome metrics">
            <article className="kpi-card">
              <p className="kpi-label">Launch Window</p>
              <p className="kpi-value">2-4 weeks for first workflow</p>
            </article>
            <article className="kpi-card">
              <p className="kpi-label">Typical Result</p>
              <p className="kpi-value">Faster follow-up + lower admin load</p>
            </article>
          </div>
        </div>
        <div className="hero-panel" aria-hidden="true">
          <p className="panel-kicker">Automation Workspace</p>
          <div className="factory-grid">
            <div className="factory-cell">
              <p>01</p>
              <span>Baseline the current process</span>
            </div>
            <div className="factory-cell">
              <p>02</p>
              <span>Define decision and exception rules</span>
            </div>
            <div className="factory-cell">
              <p>03</p>
              <span>Ship staged automation in production</span>
            </div>
            <div className="factory-cell">
              <p>04</p>
              <span>Measure and tune every week</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
