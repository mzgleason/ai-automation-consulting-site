"use client";

import Link from "next/link";
import { useRef } from "react";
import HeroTestingGlobe from "@/components/HeroTestingGlobe";
import styles from "@/components/HeroTestingHero.module.css";

type HeroTestingHeroProps = {
  title: string;
  description: string;
};

export default function HeroTestingHero({ title, description }: HeroTestingHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startLines = ["BUILD SYSTEMS", "THAT DO THE", "WORK FOR YOU"];

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.globeWrap} ref={globeWrapRef} aria-hidden="true">
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      <div className={styles.overlay} ref={overlayRef}>
        <div className={styles.textStage}>
          <h1 className={styles.startHeadline} aria-label="Build systems that do the work for you">
            {startLines.map((line) => (
              <span key={line} className={styles.startLine}>
                {line}
              </span>
            ))}
          </h1>

          <div className={styles.splitStage} aria-hidden="true">
            <div className={styles.splitGrid}>
              <span className={styles.splitLeftLine}>BUILD SYSTEMS</span>
              <span className={styles.splitRightSpacer} />

              <span className={styles.splitLeftLine}>THAT</span>
              <span className={styles.splitRightLine}>DO THE</span>

              <span className={styles.splitLeftSpacer} />
              <span className={styles.splitRightLine}>WORK FOR YOU</span>
            </div>
          </div>
        </div>

        <div className={styles.bottomRail}>
          <div className={styles.bottomRule} />
          <div className={styles.bottomRow}>
            <Link href="/contact" className={styles.contactCta}>
              CONTACT US
              <span className={styles.ctaCorners} aria-hidden="true">
                <span className={styles.ctaCornerTl} />
                <span className={styles.ctaCornerTr} />
                <span className={styles.ctaCornerBl} />
                <span className={styles.ctaCornerBr} />
              </span>
            </Link>
            <p className={styles.bottomCopy}>
              Turn messy work into a clearer system with operator-led workflow design and implementation.
            </p>
          </div>
        </div>
      </div>

      <HeroTestingGlobe
        heroRef={heroRef}
        overlayRef={overlayRef}
        globeWrapRef={globeWrapRef}
        canvasRef={canvasRef}
      />
    </section>
  );
}
