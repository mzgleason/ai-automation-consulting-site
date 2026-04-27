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
  workflowDiagram?: WorkflowDiagramProps;
  cta: {
    headline: string;
    text: string;
    href: string;
    label: string;
    secondaryHref?: string;
    secondaryLabel?: string;
  };
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
  return (
    <section className="portfolio-template-hero" data-testid="portfolio-hero">
      <Link href={backHref} className="text-link portfolio-template-back">
        {backLabel}
      </Link>
      <div className="portfolio-template-hero-copy">
        <p className="portfolio-template-pill">{category}</p>
        <h1>{title}</h1>
        <p>{summary}</p>
      </div>
      {metrics.length > 0 ? <MetricsGrid metrics={metrics} ariaLabel={`${title} headline metrics`} compact /> : null}
      <div className="hero-actions">
        <Link href={primaryHref} className="button button-accent">
          {primaryLabel}
        </Link>
        <Link href={secondaryHref} className="button button-ghost">
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}

export function ProjectSnapshot({ items }: { items: SnapshotItem[] }) {
  return (
    <dl className="portfolio-template-snapshot" data-testid="project-snapshot" aria-label="Project snapshot">
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="portfolio-template-snapshot-item">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
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

export function WorkflowDiagram({ imageSrc, imageAlt }: WorkflowDiagramProps) {
  if (!imageSrc) {
    return null;
  }

  return (
    <section className="portfolio-template-diagram" data-testid="workflow-diagram" aria-label="System visualization">
      <Image src={imageSrc} alt={imageAlt} width={1440} height={840} />
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
  return (
    <dl
      className={`portfolio-template-metrics${compact ? " portfolio-template-metrics-compact" : ""}`}
      aria-label={ariaLabel}
      data-testid="metrics-grid"
    >
      {metrics.map((metric) => (
        <div key={`${metric.value}-${metric.label}`} className="portfolio-template-metric-card">
          <dt>{metric.value}</dt>
          <dd>{metric.label}</dd>
          {metric.context ? <p>{metric.context}</p> : null}
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
      <p className="portfolio-template-section-label">Next step</p>
      <h2>{headline}</h2>
      <p>{text}</p>
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
  workflowDiagram,
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
          secondaryLabel="View more work"
        />
        <ProjectSnapshot items={snapshot} />
        <div className="portfolio-template-problem-approach">
          {problem ? <SectionBlock {...problem} /> : null}
          {approach ? <SectionBlock {...approach} /> : null}
        </div>
        {system ? <SectionBlock {...system} /> : null}
        {workflowDiagram ? <WorkflowDiagram {...workflowDiagram} /> : null}
        <section className="portfolio-template-results" data-testid="portfolio-section-results">
          <p className="portfolio-template-section-label">Results</p>
          <h2>What changed</h2>
          <MetricsGrid metrics={results} ariaLabel={`${title} results`} />
        </section>
        {insights ? <SectionBlock {...insights} /> : null}
        <ProjectCTA {...cta} />
      </div>
    </main>
  );
}
