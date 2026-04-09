"use client";

import Link from "next/link";
import HeroProductionGlobe from "@/components/HeroProductionGlobe";

type HeroProof = {
  label: string;
  title: string;
  description: string;
  href: string;
  hrefLabel: string;
};

type BuilderHeroProps = {
  title: string;
  description: string;
  proof?: HeroProof;
};

export function BuilderHero({ title, description, proof }: BuilderHeroProps) {
  const leftTitleLines = ["REMOVE THE", "WORK THAT"];
  const rightTitleLines = ["SLOWS YOUR", "TEAM DOWN"];

  return (
    <section className="builder-hero">
      <div className="builder-hero-overlay">
        <div className="container builder-hero-grid">
          <div className="builder-hero-topline">
            <p className="eyebrow">AI consulting</p>
            <p className="builder-hero-kicker">Operator-led workflow design and systems implementation</p>
          </div>

          <HeroProductionGlobe />

          <div className="builder-hero-headline">
            <h1 aria-label={title}>
              <span className="builder-hero-headline-left">
                {leftTitleLines.map((line) => (
                  <span key={line} className="builder-hero-line">
                    {line}
                  </span>
                ))}
              </span>
              <span className="builder-hero-headline-right">
                {rightTitleLines.map((line) => (
                  <span key={line} className="builder-hero-line">
                    {line}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <div className="builder-hero-copy">
            <p className="lead builder-hero-lead">
              Start with the workflow that costs time, clarity, and follow-through every single week.
            </p>
            <div className="builder-hero-footer">
              <Link href="/contact" className="text-link build-link builder-hero-inline-link">
                Start a workflow review
              </Link>
              <p className="builder-hero-inline-note">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
