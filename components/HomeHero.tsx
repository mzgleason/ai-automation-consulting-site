"use client";

import { useRef } from "react";
import HeroGlobe from "@/components/HeroGlobe";

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <section className="hero hero--light" id="hero" ref={heroRef}>
      <div className="globeAnimationWrapper" ref={globeWrapRef} aria-hidden="true">
        <canvas id="hero-canvas" ref={canvasRef} />
      </div>

      <div className="heroOverlay" id="hero-overlay" ref={overlayRef}>
        <div className="hero__container">
          <div className="hero__text">
            <h1>A digital product studio that turns complexity into beautiful simplicity.</h1>
            <a className="btn" href="/services">
              How we can help you <span aria-hidden="true">-&gt;</span>
            </a>
          </div>

          <div className="hero__separatorWrap">
            <div className="hero__separator" />
          </div>
        </div>
      </div>

      <HeroGlobe heroRef={heroRef} overlayRef={overlayRef} globeWrapRef={globeWrapRef} canvasRef={canvasRef} />
    </section>
  );
}
