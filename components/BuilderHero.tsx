"use client";

import Link from "next/link";
import { useRef } from "react";
import HeroGlobe from "@/components/HeroGlobe";

type BuilderHeroProps = {
  title: string;
  description: string;
};

export function BuilderHero({ title, description }: BuilderHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <section className="builder-hero" ref={heroRef}>
      <div className="builder-hero-globe" ref={globeWrapRef} aria-hidden="true">
        <canvas ref={canvasRef} className="builder-hero-canvas" />
      </div>

      <div className="builder-hero-overlay" ref={overlayRef}>
        <div className="container builder-hero-grid">
          <div className="builder-hero-copy">
            <p className="eyebrow">Builder-led</p>
            <h1>
              <span>I help teams turn ideas</span>
              <span>into AI-powered systems</span>
              <span>that actually ship</span>
            </h1>
            <p className="lead builder-hero-lead">{description}</p>
            <div className="hero-actions">
              <Link href="/projects" className="button button-accent">
                View Projects
              </Link>
              <Link href="/work-with-me" className="button button-ghost">
                Work With Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      <HeroGlobe heroRef={heroRef} overlayRef={overlayRef} globeWrapRef={globeWrapRef} canvasRef={canvasRef} />
    </section>
  );
}
