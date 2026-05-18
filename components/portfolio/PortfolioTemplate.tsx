import Image from "next/image";
import Link from "next/link";

type Metric = {
  value: string;
  label: string;
  context?: string;
};

type SnapshotItem = {
  label: string;
  value: string;
};

type SectionContent = {
  label: string;
  headline: string;
  html: string;
};

type WorkflowDiagramProps = {
  imageSrc?: string;
  imageAlt: string;
};

type PortfolioTemplateProps = {
  backHref: string;
  backLabel: string;
  category: string;
  title: string;
  summary: string;
  metrics: Metric[];
  snapshot: SnapshotItem[];
  problem?: SectionContent;
  approach?: SectionContent;
  system?: SectionContent;
  results: Metric[];
  insights?: SectionContent;
  lessons?: SectionContent;
  cta: {
    headline: string;
    text: string;
    href: string;
    label: string;
    secondaryHref?: string;
    secondaryLabel?: string;
  };
  heroSecondaryHref?: string;
  heroSecondaryLabel?: string;
};

export function PortfolioHero({
  backHref,
  backLabel,
  category,
  title,
  summary,
  metrics,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel
}: {
  backHref: string;
  backLabel: string;
  category: string;
  title: string;
  summary: string;
  metrics: Metric[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  const showSystemArrow = primaryLabel.trim().toLowerCase() === "view the system";

  return (
    <section className="portfolio-template-hero" data-testid="portfolio-hero">
      <div className="portfolio-template-hero-main">
        <Link href={backHref} className="text-link portfolio-template-back">
          <span aria-hidden>← </span>{backLabel}
        </Link>
        <div className="portfolio-template-hero-copy">
          <p className="portfolio-template-pill">{category}</p>
          <h1>{title}</h1>
          <p>{summary}</p>
        </div>
        {metrics.length > 0 ? <MetricsGrid metrics={metrics} ariaLabel={`${title} headline metrics`} compact /> : null}
        <div className="hero-actions">
          <Link href={primaryHref} className="button button-accent">
            <span>{primaryLabel}</span>
            {showSystemArrow ? (
              <svg
                className="portfolio-template-cta-arrow"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v14m7-7l-7 7l-7-7"
                />
              </svg>
            ) : null}
          </Link>
          <Link href={secondaryHref} className="button button-ghost">
            {secondaryLabel}
          </Link>
        </div>
      </div>
      <div className="portfolio-template-hero-visual" aria-hidden>
        <div className="portfolio-template-hero-ring" />
        <div className="portfolio-template-hero-window">
          <div className="portfolio-template-hero-linkedin portfolio-template-hero-linkedin-app">
            <Image
              src="/images/case-studies/linkedin-workflow-hero.svg"
              alt=""
              aria-hidden
              width={200}
              height={320}
              className="portfolio-template-hero-linkedin-icon"
            />
          </div>
          <div className="portfolio-template-hero-badge portfolio-template-hero-badge-app">
            <p>Human-reviewed workflow output</p>
            <strong>3x posts/wk</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectSnapshot({ items }: { items: SnapshotItem[] }) {
  const iconForSnapshotLabel = (label: string) => {
    const normalized = label.trim().toLowerCase();
    if (normalized.includes("type")) return "/images/portfolio-icons/person.svg";
    if (normalized.includes("problem")) return "/images/portfolio-icons/target.svg";
    if (normalized.includes("solution")) return "/images/portfolio-icons/bolt.svg";
    if (normalized.includes("outcome")) return "/images/portfolio-icons/signal.svg";
    if (normalized.includes("tools")) return "/images/portfolio-icons/stack.svg";
    return null;
  };

  return (
    <section className="portfolio-template-snapshot-wrap" data-testid="project-snapshot" aria-label="Project snapshot">
      <p className="portfolio-template-section-label">Project snapshot</p>
      <dl className="portfolio-template-snapshot">
        {items.map((item) => (
          <div key={`${item.label}-${item.value}`} className="portfolio-template-snapshot-item">
            <dt>
              {iconForSnapshotLabel(item.label) ? (
                <Image
                  src={iconForSnapshotLabel(item.label)!}
                  alt=""
                  aria-hidden
                  width={18}
                  height={18}
                  className="portfolio-template-snapshot-icon"
                />
              ) : null}
              {item.label}
            </dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function SectionBlock({ label, headline, html }: SectionContent) {
  return (
    <section className="portfolio-template-section-block" data-testid={`portfolio-section-${label.toLowerCase()}`}>
      <p className="portfolio-template-section-label">{label}</p>
      <h2>{headline}</h2>
      <div className="portfolio-template-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}

export function WorkflowDiagram({ imageSrc }: WorkflowDiagramProps) {
  if (!imageSrc) {
    return null;
  }

  const steps = [
    { name: "Capture", detail: "Collect weekly wins, notes, and ideas." },
    { name: "Extract", detail: "Identify the strongest story signal." },
    { name: "Draft", detail: "Generate a first draft from a clear narrative." },
    { name: "Review", detail: "Human review gate for quality and voice." },
    { name: "Publish", detail: "Ship and track engagement each week." }
  ];

  return (
    <section className="portfolio-template-diagram" data-testid="workflow-diagram" aria-label="System visualization" id="system">
      <p className="portfolio-template-section-label">The system</p>
      <h2>A repeatable workflow from raw notes to published posts.</h2>
      <ol className="portfolio-template-system-flow">
        {steps.map((step) => (
          <li key={step.name}>
            <h3>{step.name}</h3>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
      <div className="portfolio-template-supported">
        <span>AI Workflow Design</span>
        <span>Structured Intake</span>
        <span>Review Gates</span>
        <span>Publishing Hand-off</span>
        <span>Performance Feedback Loop</span>
      </div>
      <div className="portfolio-template-app-shots" aria-label="Workflow app screens">
        <Image src="/images/case-studies/linkedin-workflow-hero.svg" alt="Topic Inbox mobile screen" width={340} height={680} />
        <Image src="/images/case-studies/linkedin-workflow-hero.svg" alt="Capture Opinion mobile screen" width={340} height={680} />
        <Image src="/images/case-studies/linkedin-workflow-hero.svg" alt="Draft Review mobile screen" width={340} height={680} />
      </div>
    </section>
  );
}

export function MetricsGrid({
  metrics,
  ariaLabel,
  compact = false
}: {
  metrics: Metric[];
  ariaLabel: string;
  compact?: boolean;
}) {
  const iconForMetric = (label: string) => {
    const normalized = label.trim().toLowerCase();
    if (normalized.includes("post")) return "/images/portfolio-icons/arrow-up-trend.svg";
    if (normalized.includes("engagement")) return "/images/portfolio-icons/arrow-up-trend.svg";
    if (normalized.includes("time") || normalized.includes("saved")) return "/images/portfolio-icons/clock.svg";
    if (normalized.includes("system") || normalized.includes("rhythm")) return "/images/portfolio-icons/target.svg";
    return "/images/portfolio-icons/stack.svg";
  };

  return (
    <dl
      className={`portfolio-template-metrics${compact ? " portfolio-template-metrics-compact" : ""}`}
      aria-label={ariaLabel}
      data-testid="metrics-grid"
    >
      {metrics.map((metric, index) => (
        <div key={`${metric.value}-${metric.label}`} className={`portfolio-template-metric-card portfolio-template-metric-card-${index + 1}`}>
          <div className="portfolio-template-metric-layout">
            {compact ? (
              <Image
                src={iconForMetric(metric.label)}
                alt=""
                aria-hidden
                width={30}
                height={30}
                className="portfolio-template-metric-glyph"
              />
            ) : null}
            <div className="portfolio-template-metric-copy">
              <dt>{metric.value}</dt>
              <dd>{metric.label}</dd>
            </div>
          </div>
          {!compact && metric.context ? <p>{metric.context}</p> : null}
        </div>
      ))}
    </dl>
  );
}

export function ProjectCTA({
  headline,
  text,
  href,
  label,
  secondaryHref,
  secondaryLabel
}: PortfolioTemplateProps["cta"]) {
  return (
    <section className="portfolio-template-cta" data-testid="portfolio-cta">
      <div>
        <p className="portfolio-template-section-label">Next step</p>
        <h2>{headline}</h2>
        <p>{text}</p>
      </div>
      <div className="hero-actions">
        <Link href={href} className="button button-accent">
          {label}
        </Link>
        {secondaryHref && secondaryLabel ? (
          <Link href={secondaryHref} className="button button-ghost">
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export function PortfolioTemplate({
  backHref,
  backLabel,
  category,
  title,
  summary,
  metrics,
  snapshot,
  problem,
  approach,
  system,
  results,
  insights,
  lessons,
  cta
}: PortfolioTemplateProps) {
  return (
    <main className="section section-top portfolio-template-page">
      <div className="container portfolio-template-stack">
        <PortfolioHero
          backHref={backHref}
          backLabel={backLabel}
          category={category}
          title={title}
          summary={summary}
          metrics={metrics}
          primaryHref={cta.href}
          primaryLabel={cta.label}
          secondaryHref="/portfolio"
          secondaryLabel="Browse all projects"
        />
        <ProjectSnapshot items={snapshot} />
        <div className="portfolio-template-problem-approach">
          {problem ? <SectionBlock {...problem} /> : null}
          {approach ? <SectionBlock {...approach} /> : null}
        </div>
        {system ? <SectionBlock {...system} /> : null}
        <section className="portfolio-template-results" data-testid="portfolio-section-results">
          <p className="portfolio-template-section-label">Results</p>
          <h2>Better content. More impact. Less time.</h2>
          <MetricsGrid metrics={results} ariaLabel={`${title} results`} />
        </section>
        {insights || lessons ? (
          <div className="portfolio-template-problem-approach">
            {insights ? <SectionBlock {...insights} /> : null}
            {lessons ? <SectionBlock {...lessons} /> : null}
          </div>
        ) : null}
        <ProjectCTA {...cta} />
      </div>
    </main>
  );
}
