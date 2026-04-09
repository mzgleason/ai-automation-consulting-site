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

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.globeWrap} ref={globeWrapRef} aria-hidden="true">
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      <div className={styles.overlay} ref={overlayRef}>
        <div className={styles.container}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Hero testing</p>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.lead}>{description}</p>
            <div className={styles.actions}>
              <Link href="/contact" className={styles.primaryAction}>
                Start a workflow review
              </Link>
              <Link href="/" className={styles.secondaryAction}>
                Return to homepage
              </Link>
            </div>
          </div>

          <div className={styles.separatorWrap}>
            <div className={styles.separator} />
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
