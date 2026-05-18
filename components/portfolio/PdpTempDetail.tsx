"use client";

import Image from "next/image";
import Link from "next/link";

type PdpTempDetailProps = {
  category: string;
  title: string;
  summary: string;
  metricOneValue: string;
  metricOneLabel: string;
  metricTwoValue: string;
  metricTwoLabel: string;
  metricOneIconSrc?: string;
  metricTwoIconSrc?: string;
  snapshot: Array<{ label: string; value: string }>;
  problemHeadline: string;
  problemBullets: string[];
  approachHeadline: string;
  approachSteps: string[];
  systemHeadline: string;
  supportTags: string[];
  systemSteps?: Array<{ name: string; icon: string }>;
  insights: string[];
  lessons: string[];
  ctaHeadline: string;
  ctaBody: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  heroBackgroundImageSrc?: string;
  lastUpdated?: string;
};

export function PdpTempDetail({
  category,
  title,
  summary,
  metricOneValue,
  metricOneLabel,
  metricTwoValue,
  metricTwoLabel,
  metricOneIconSrc = "/images/portfolio-icons/kpi-posts.svg",
  metricTwoIconSrc = "/images/portfolio-icons/kpi-hours.svg",
  snapshot,
  problemHeadline,
  problemBullets,
  approachHeadline,
  approachSteps,
  systemHeadline,
  supportTags,
  systemSteps,
  insights,
  lessons,
  ctaHeadline,
  ctaBody,
  primaryCtaLabel,
  secondaryCtaLabel,
  heroBackgroundImageSrc,
  lastUpdated
}: PdpTempDetailProps) {
  const steps = systemSteps ?? [
    { name: "Capture", icon: "/images/portfolio-icons/capture.svg" },
    { name: "Extract", icon: "/images/portfolio-icons/extract.svg" },
    { name: "Draft", icon: "/images/portfolio-icons/draft.svg" },
    { name: "Review", icon: "/images/portfolio-icons/review.svg" },
    { name: "Publish", icon: "/images/portfolio-icons/publish.svg" }
  ];
  const useHeroBackground = Boolean(heroBackgroundImageSrc);
  return (
    <main className="section section-top portfolio-template-page">
      <div className="container portfolio-template-stack portfolio-detail-page">
        <section className={`portfolio-detail-hero-shell${useHeroBackground ? " portfolio-detail-hero-shell-routing" : ""}`} aria-label="Hero">
          {useHeroBackground ? (
            <div className="portfolio-detail-hero-bg" aria-hidden>
              <Image src={heroBackgroundImageSrc!} alt="" fill sizes="100vw" className="portfolio-detail-hero-bg-image" />
            </div>
          ) : null}
          <div className="portfolio-detail-hero portfolio-detail-hero-no-right">
            <div className="portfolio-detail-hero-left">
              <Link href="/portfolio" className="text-link portfolio-template-back">Portfolio</Link>
              <p className="portfolio-template-pill">{category}</p>
              <h1>{title}</h1>
              <p>{summary}</p>
              {lastUpdated ? <p><strong>Last updated:</strong> {lastUpdated}</p> : null}
              <div className="portfolio-detail-hero-metrics portfolio-detail-hero-metrics-inline">
                <div className="hero-metric-card">
                  <Image src={metricOneIconSrc} alt="" aria-hidden width={24} height={24} />
                  <div>
                    <strong>{metricOneValue}</strong>
                    <span>{metricOneLabel}</span>
                  </div>
                </div>
                <div className="hero-metric-card">
                  <Image src={metricTwoIconSrc} alt="" aria-hidden width={24} height={24} />
                  <div>
                    <strong>{metricTwoValue}</strong>
                    <span>{metricTwoLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio-detail-snapshot" aria-label="Project snapshot">
          <p className="portfolio-template-section-label">Project snapshot</p>
          <div className="portfolio-detail-snapshot-grid">
            {snapshot.map((item) => (
              <article key={item.label} className="portfolio-detail-snapshot-item">
                <h2 className="portfolio-detail-snapshot-item-label">
                  <Image src={item.label === "Type" ? "/images/portfolio-icons/snapshot-type.svg" : item.label === "Problem" ? "/images/portfolio-icons/snapshot-problem.svg" : item.label === "Solution" ? "/images/portfolio-icons/snapshot-solution.svg" : item.label === "Outcome" ? "/images/portfolio-icons/snapshot-outcome.svg" : "/images/portfolio-icons/snapshot-tools.svg"} alt="" aria-hidden width={20} height={20} />
                  {item.label}
                </h2>
                <p>{item.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-detail-pair-row" aria-label="Problem and approach">
          <article className="portfolio-detail-card">
            <p className="portfolio-template-section-label">The problem</p>
            <h2>{problemHeadline}</h2>
            <ul>
              {problemBullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </article>
          <article className="portfolio-detail-card">
            <p className="portfolio-template-section-label">The approach</p>
            <h2>{approachHeadline}</h2>
            <ol>
              {approachSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </article>
        </section>

        <section className="portfolio-detail-system" id="system" aria-label="The system">
          <p className="portfolio-template-section-label">The system</p>
          <h2>{systemHeadline}</h2>
          <div className="portfolio-detail-system-steps">
            {steps.map((step) => (
              <div key={step.name} className="portfolio-detail-system-step">
                <span className="portfolio-detail-system-dot" aria-hidden>
                  <Image src={step.icon} alt="" aria-hidden width={24} height={24} className="portfolio-detail-system-icon" />
                </span>
                <h3>{step.name}</h3>
              </div>
            ))}
          </div>
          <div className="portfolio-detail-supported">
            {supportTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </section>

        <section className="portfolio-detail-pair-row portfolio-detail-pair-plain" aria-label="Insights and lessons learned">
          <article>
            <p className="portfolio-template-section-label">Key insights</p>
            <ul>
              {insights.map((insight) => <li key={insight}>{insight}</li>)}
            </ul>
          </article>
          <article>
            <p className="portfolio-template-section-label">Lessons learned</p>
            <ul>
              {lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}
            </ul>
          </article>
        </section>

        <section className="portfolio-detail-next-step" aria-label="Next step">
          <div>
            <p className="portfolio-template-section-label">Next step</p>
            <h2>{ctaHeadline}</h2>
            <p>{ctaBody}</p>
          </div>
          <div className="portfolio-detail-next-actions">
            <Link href="/contact" className="button button-accent">{primaryCtaLabel}</Link>
            <Link href="/playbooks" className="button button-ghost">{secondaryCtaLabel}</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

