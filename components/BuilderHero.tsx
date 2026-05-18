"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/BuilderHero.module.css";

const HeroProductionGlobe = dynamic(() => import("@/components/visuals/HeroProductionGlobe"), {
  ssr: false
});

type BuilderHeroProps = {
  title: string;
  description: string;
  proof?: unknown;
};

export function BuilderHero(_props: BuilderHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineStageRef = useRef<HTMLDivElement>(null);
  const phraseBuildRef = useRef<HTMLSpanElement>(null);
  const phraseThatRef = useRef<HTMLSpanElement>(null);
  const phraseDoRef = useRef<HTMLSpanElement>(null);
  const phraseWorkRef = useRef<HTMLSpanElement>(null);
  const [headlineReady, setHeadlineReady] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);

  useEffect(() => {
    const complete = () => setLoaderComplete(true);
    if (document.body.dataset.homeLoaderComplete === "true") {
      complete();
      return;
    }

    window.addEventListener("home-loader-complete", complete);
    return () => window.removeEventListener("home-loader-complete", complete);
  }, []);

  useEffect(() => {
    const stageEl = headlineStageRef.current;
    const buildEl = phraseBuildRef.current;
    const thatEl = phraseThatRef.current;
    const doEl = phraseDoRef.current;
    const workEl = phraseWorkRef.current;

    if (!stageEl || !buildEl || !thatEl || !doEl || !workEl) return;

    let rafId = 0;
    let disposed = false;

    const measure = () => {
      if (disposed) return;

      stageEl.dataset.measuring = "true";
      stageEl.getBoundingClientRect();

      const stageRect = stageEl.getBoundingClientRect();
      const buildRect = buildEl.getBoundingClientRect();
      const thatRect = thatEl.getBoundingClientRect();
      const doRect = doEl.getBoundingClientRect();
      const workRect = workEl.getBoundingClientRect();

      const stageCx = stageRect.left + stageRect.width / 2;
      const stageCy = stageRect.top + stageRect.height / 2;

      const line2Gap = Math.max(10, Math.min(24, buildRect.height * 0.22));
      const line2Total = thatRect.width + line2Gap + doRect.width;
      const thatTargetCx = stageCx - line2Total / 2 + thatRect.width / 2;
      const doTargetCx = stageCx + line2Total / 2 - doRect.width / 2;

      const targets = [
        {
          el: buildEl,
          targetX: stageCx,
          targetY: stageCy - buildRect.height * 0.96
        },
        {
          el: thatEl,
          targetX: thatTargetCx,
          targetY: stageCy
        },
        {
          el: doEl,
          targetX: doTargetCx,
          targetY: stageCy
        },
        {
          el: workEl,
          targetX: stageCx,
          targetY: stageCy + workRect.height * 0.96
        }
      ] as const;

      for (const item of targets) {
        const rect = item.el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = item.targetX - cx;
        const dy = item.targetY - cy;
        item.el.style.setProperty("--from-x", `${dx.toFixed(2)}px`);
        item.el.style.setProperty("--from-y", `${dy.toFixed(2)}px`);
      }

      stageEl.dataset.measuring = "false";
      setHeadlineReady(true);
    };

    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(stageEl);

    window.addEventListener("resize", schedule, { passive: true });

    const anyDocument = document as unknown as { fonts?: { ready?: Promise<unknown> } };
    const fontsReady = anyDocument.fonts?.ready;

    if (fontsReady && typeof fontsReady.then === "function") {
      fontsReady.then(schedule).catch(schedule);
    } else {
      schedule();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section className={styles.hero} ref={heroRef} data-loader-complete={loaderComplete ? "true" : "false"}>
      <div className={styles.globeWrap} ref={globeWrapRef} aria-hidden="true">
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      <div className={styles.overlay} ref={overlayRef}>
        <div className={styles.textStage}>
          <h1 className={styles.srOnly}>Systems powering modern operations</h1>
          <div
            className={styles.headlineStage}
            aria-hidden="true"
            ref={headlineStageRef}
            data-ready={headlineReady && loaderComplete ? "true" : "false"}
          >
            <span className={`${styles.phrase} ${styles.phraseBuild}`} ref={phraseBuildRef}>
              SYSTEMS
            </span>
            <span className={`${styles.phrase} ${styles.phraseThat}`} ref={phraseThatRef}>
              POWERING
            </span>
            <span className={`${styles.phrase} ${styles.phraseDo}`} ref={phraseDoRef}>
              MODERN
            </span>
            <span className={`${styles.phrase} ${styles.phraseWork}`} ref={phraseWorkRef}>
              OPERATIONS
            </span>
          </div>
        </div>

        <div className={styles.bottomRail}>
          <div className={styles.bottomRule} />
          <div className={styles.bottomRow}>
            <Link href="/contact" className={styles.contactCta} data-testid="hero-cta">
              WORK THROUGH YOUR WORKFLOW
              <span className={styles.ctaCorners} aria-hidden="true">
                <span className={styles.ctaCornerTl} />
                <span className={styles.ctaCornerTr} />
                <span className={styles.ctaCornerBl} />
                <span className={styles.ctaCornerBr} />
              </span>
            </Link>
            <p className={styles.bottomCopy}>{_props.description}</p>
          </div>
        </div>
      </div>

      <HeroProductionGlobe
        heroRef={heroRef}
        overlayRef={overlayRef}
        globeWrapRef={globeWrapRef}
        canvasRef={canvasRef}
      />
    </section>
  );
}
