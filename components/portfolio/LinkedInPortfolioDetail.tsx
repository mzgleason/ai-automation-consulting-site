 "use client";

import Image from "next/image";
import Link from "next/link";

type Metric = { value: string; label: string; context?: string };

type LinkedInPortfolioDetailProps = {
  title: string;
  summary: string;
  metrics: Metric[];
  heroBackgroundImageSrc: string;
  lastUpdated?: string;
};

const snapshot = [
  { label: "Type", value: "Personal project" },
  { label: "Problem", value: "Inconsistent posting and too much time spent turning ideas into quality drafts." },
  { label: "Solution", value: "AI-assisted system with clear stages, gates, and review to produce better content, faster and consistently." },
  { label: "Outcome", value: "3x posts/week | 2+ hours/week saved" },
  { label: "Tools & Systems", value: "ChatGPT, Codex, OpenAI API, Postgres, Docker, Next.js" }
];

export function LinkedInPortfolioDetail({ title, summary, metrics, heroBackgroundImageSrc, lastUpdated }: LinkedInPortfolioDetailProps) {
  const steps = [
    { name: "Capture", icon: "/images/portfolio-icons/capture.svg" },
    { name: "Extract", icon: "/images/portfolio-icons/extract.svg" },
    { name: "Draft", icon: "/images/portfolio-icons/draft.svg" },
    { name: "Review", icon: "/images/portfolio-icons/review.svg" },
    { name: "Publish", icon: "/images/portfolio-icons/publish.svg" }
  ];

  return (
    <main className="section section-top portfolio-template-page">
      <div className="container portfolio-template-stack portfolio-detail-page">
        <section className="portfolio-detail-hero-shell portfolio-detail-hero-shell-routing" aria-label="Hero">
          <div className="portfolio-detail-hero-bg" aria-hidden>
            <Image src={heroBackgroundImageSrc} alt="" fill sizes="100vw" className="portfolio-detail-hero-bg-image" />
          </div>
          <div className="portfolio-detail-hero">
          <div className="portfolio-detail-hero-left">
            <Link href="/portfolio" className="text-link portfolio-template-back">Portfolio</Link>
            <p className="portfolio-template-pill">AI SYSTEMS &amp; WORKFLOWS</p>
            <h1>{title}</h1>
            <p>{summary}</p>
            {lastUpdated ? <p><strong>Last updated:</strong> {lastUpdated}</p> : null}
            <div className="portfolio-detail-hero-metrics portfolio-detail-hero-metrics-inline">
              {metrics.map((metric, index) => (
                <div key={metric.value} className="hero-metric-card">
                  <Image
                    src={index === 0 ? "/images/portfolio-icons/kpi-posts.svg" : "/images/portfolio-icons/clock-3.svg"}
                    alt=""
                    aria-hidden
                    width={24}
                    height={24}
                  />
                  <div>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                </div>
              ))}
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
            <h2>Great ideas, poor system.</h2>
            <ul>
              <li>Ideas lived in scattered notes and documents</li>
              <li>Turning thoughts into posts took too much time</li>
              <li>Inconsistent quality and posting cadence</li>
              <li>No reusable system, starting from scratch every week</li>
            </ul>
          </article>
          <article className="portfolio-detail-card">
            <p className="portfolio-template-section-label">The approach</p>
            <h2>Design a system, then scale it.</h2>
            <ol>
              <li>Capture weekly accomplishments and raw notes</li>
              <li>Extract the strongest story with AI</li>
              <li>Draft from a narrative direction</li>
              <li>Review and refine for quality and clarity</li>
              <li>Publish and learn from engagement</li>
            </ol>
          </article>
        </section>

        <section className="portfolio-detail-system" id="system" aria-label="The system">
          <p className="portfolio-template-section-label">The system</p>
          <h2>A repeatable workflow from raw notes to published posts.</h2>
          <div className="portfolio-detail-system-steps">
            {steps.map((step) => (
              <div key={step.name} className="portfolio-detail-system-step">
                <span className="portfolio-detail-system-dot" aria-hidden>
                  <Image src={step.icon} alt="" aria-hidden width={24} height={24} />
                </span>
                <h3>{step.name}</h3>
              </div>
            ))}
          </div>
          <div className="portfolio-detail-supported">
            <span>ChatGPT</span><span>Codex</span><span>OpenAI API</span><span>Next.js + Postgres</span><span>Weekly Review Cadence</span><span>LinkedIn Analytics Feedback</span>
          </div>
        </section>

        <section className="portfolio-detail-pair-row portfolio-detail-pair-plain" aria-label="Insights and lessons learned">
          <article>
            <p className="portfolio-template-section-label">Key insights</p>
            <ul>
              <li>Start with story signal, not blank-page prompts</li>
              <li>A clear narrative direction makes drafts better and faster</li>
              <li>Human review is the quality multiplier</li>
              <li>Systems &gt; motivation for long-term consistency</li>
            </ul>
          </article>
          <article>
            <p className="portfolio-template-section-label">Lessons learned</p>
            <ul>
              <li>Invest in orchestration earlier to reduce manual steps</li>
              <li>Build review gates smarter for higher signal feedback</li>
              <li>Design for iteration, the system keeps getting better</li>
            </ul>
          </article>
        </section>

        <section className="portfolio-detail-next-step" aria-label="Next step">
          <div>
            <p className="portfolio-template-section-label">Next step</p>
            <h2>Want help building a system like this?</h2>
            <p>I help operators and teams turn messy processes into scalable systems that save time, improve quality, and drive real results.</p>
          </div>
          <div className="portfolio-detail-next-actions">
            <Link href="/contact" className="button button-accent">Start a conversation</Link>
            <Link href="/playbooks" className="button button-ghost">Browse playbooks</Link>
          </div>
        </section>
      </div>
    </main>
  );
}





