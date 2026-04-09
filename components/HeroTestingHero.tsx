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
  const introLines = ["TURN MESSY", "WORK INTO", "A CLEARER", "SYSTEM"];
  const leftLines = ["TURN MESSY", "WORK INTO"];
  const rightLines = ["A CLEARER", "SYSTEM"];

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.globeWrap} ref={globeWrapRef} aria-hidden="true">
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      <div className={styles.overlay} ref={overlayRef}>
        <div className={styles.textStage}>
          <div className={styles.introText} aria-hidden="true">
            {introLines.map((line) => (
              <span key={line} className={styles.introLine}>
                {line}
              </span>
            ))}
          </div>

          <div className={styles.finalText}>
            <h1 className={styles.finalHeadline} aria-label="Turn messy work into a clearer system">
              <span className={styles.finalColumnLeft}>
                {leftLines.map((line) => (
                  <span key={line} className={styles.finalLine}>
                    {line}
                  </span>
                ))}
              </span>
              <span className={styles.finalColumnRight}>
                {rightLines.map((line) => (
                  <span key={line} className={styles.finalLine}>
                    {line}
                  </span>
                ))}
              </span>
            </h1>
          </div>
        </div>

        <div className={styles.bottomRail}>
          <div className={styles.bottomRule} />
          <div className={styles.bottomRow}>
            <Link href="/contact" className={styles.contactCta}>
              CONTACT US
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
