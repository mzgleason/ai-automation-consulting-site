"use client";

import Image from "next/image";
import Link from "next/link";
import { LendingConciergeHeroVisual } from "@/components/portfolio/LendingConciergeHeroVisual";
import RealtimeRoutingFieldHero from "@/components/portfolio/RealtimeRoutingFieldHero";

type PdpTempDetailProps = {
  category: string;
  title: string;
  summary: string;
  metricOneValue: string;
  metricOneLabel: string;
  metricTwoValue: string;
  metricTwoLabel: string;
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
  heroVisualVariant?: "default" | "lending-concierge";
  heroVisualImageSrc?: string;
  heroBackgroundVariant?: "none" | "realtime-routing-field";
};

export function PdpTempDetail({
  category,
  title,
  summary,
  metricOneValue,
  metricOneLabel,
  metricTwoValue,
  metricTwoLabel,
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
  heroVisualVariant = "default",
  heroVisualImageSrc,
  heroBackgroundVariant = "none"
}: PdpTempDetailProps) {
  const heroScreens = [
    { key: "topic", src: "/images/case-studies/Topic Inbox Mock.png", alt: "Topic Inbox app screen" },
    { key: "capture", src: "/images/case-studies/Capture Opinion Mock.png", alt: "Capture Opinion app screen" },
    { key: "draft", src: "/images/case-studies/Draft Review Mock.png", alt: "Draft Review app screen" }
  ] as const;
  const steps = systemSteps ?? [
    { name: "Capture", icon: "/images/portfolio-icons/capture.svg" },
    { name: "Extract", icon: "/images/portfolio-icons/extract.svg" },
    { name: "Draft", icon: "/images/portfolio-icons/draft.svg" },
    { name: "Review", icon: "/images/portfolio-icons/review.svg" },
    { name: "Publish", icon: "/images/portfolio-icons/publish.svg" }
  ];
  const useHeroBackground = heroBackgroundVariant === "realtime-routing-field";

  return (
    <main className="section section-top portfolio-template-page">
      <div className="container portfolio-template-stack linkedin-detail-page">
        <section className={`linkedin-hero-shell${useHeroBackground ? " linkedin-hero-shell-routing" : ""}`} aria-label="Hero">
          {useHeroBackground ? (
            <div className="linkedin-hero-bg" aria-hidden>
              <RealtimeRoutingFieldHero />
            </div>
          ) : null}
          <div className={`linkedin-hero${useHeroBackground ? " linkedin-hero-no-right" : ""}`}>
            <div className="linkedin-hero-left">
              <Link href="/portfolio" className="text-link portfolio-template-back">Portfolio</Link>
              <p className="portfolio-template-pill">{category}</p>
              <h1>{title}</h1>
              <p>{summary}</p>
              <div className="linkedin-hero-metrics">
                <div className="linkedin-hero-metric-card">
                  <Image src="/images/portfolio-icons/kpi-posts.svg" alt="" aria-hidden width={21} height={21} />
                  <div>
                    <strong>{metricOneValue}</strong>
                    <span>{metricOneLabel}</span>
                  </div>
                </div>
                <div className="linkedin-hero-metric-card">
                  <Image src="/images/portfolio-icons/kpi-hours.svg" alt="" aria-hidden width={21} height={14} />
                  <div>
                    <strong>{metricTwoValue}</strong>
                    <span>{metricTwoLabel}</span>
                  </div>
                </div>
              </div>
            </div>
            {!useHeroBackground ? <div className="linkedin-hero-right" aria-hidden>
              {heroVisualImageSrc ? (
                <Image src={heroVisualImageSrc} alt="" className="portfolio-project1-image" width={800} height={500} />
              ) : heroVisualVariant === "lending-concierge" ? (
                <LendingConciergeHeroVisual />
              ) : (
                <>
                  <div className="linkedin-hero-rings" />
                  <div className="linkedin-hero-app-rail">
                    {heroScreens.map((screen, index) => {
                      const isCenter = index === 1;
                      return (
                        <div
                          key={screen.key}
                          className={`linkedin-hero-app-static ${isCenter ? "is-center" : "is-side"}`}
                          aria-label={screen.alt}
                        >
                          <Image
                            src={screen.src}
                            alt={screen.alt}
                            width={isCenter ? 148 : 94}
                            height={isCenter ? 300 : 190}
                            className="linkedin-hero-app"
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div> : null}
          </div>
        </section>

        <section className="linkedin-snapshot" aria-label="Project snapshot">
          <p className="portfolio-template-section-label">Project snapshot</p>
          <div className="linkedin-snapshot-grid">
            {snapshot.map((item) => (
              <article key={item.label} className="linkedin-snapshot-item">
                <h2 className="linkedin-snapshot-item-label">
                  <Image src={item.label === "Type" ? "/images/portfolio-icons/snapshot-type.svg" : item.label === "Problem" ? "/images/portfolio-icons/snapshot-problem.svg" : item.label === "Solution" ? "/images/portfolio-icons/snapshot-solution.svg" : item.label === "Outcome" ? "/images/portfolio-icons/snapshot-outcome.svg" : "/images/portfolio-icons/snapshot-tools.svg"} alt="" aria-hidden width={16} height={16} />
                  {item.label}
                </h2>
                <p>{item.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="linkedin-pair-row" aria-label="Problem and approach">
          <article className="linkedin-card">
            <p className="portfolio-template-section-label">The problem</p>
            <h2>{problemHeadline}</h2>
            <ul>
              {problemBullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </article>
          <article className="linkedin-card">
            <p className="portfolio-template-section-label">The approach</p>
            <h2>{approachHeadline}</h2>
            <ol>
              {approachSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </article>
        </section>

        <section className="linkedin-system" id="system" aria-label="The system">
          <p className="portfolio-template-section-label">The system</p>
          <h2>{systemHeadline}</h2>
          <div className="linkedin-system-steps">
            {steps.map((step) => (
              <div key={step.name} className="linkedin-system-step">
                <span className="linkedin-system-dot" aria-hidden>
                  <Image src={step.icon} alt="" aria-hidden width={24} height={24} className="linkedin-system-icon" />
                </span>
                <h3>{step.name}</h3>
              </div>
            ))}
          </div>
          <div className="linkedin-supported">
            {supportTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </section>

        <section className="linkedin-pair-row linkedin-pair-plain" aria-label="Insights and lessons learned">
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

        <section className="linkedin-next-step" aria-label="Next step">
          <div>
            <p className="portfolio-template-section-label">Next step</p>
            <h2>{ctaHeadline}</h2>
            <p>{ctaBody}</p>
          </div>
          <div className="linkedin-next-actions">
            <Link href="/contact" className="button button-accent">{primaryCtaLabel}</Link>
            <Link href="/playbooks" className="button button-ghost">{secondaryCtaLabel}</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

