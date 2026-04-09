"use client";

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

      <div className={styles.overlay} ref={overlayRef} />

      <HeroTestingGlobe
        heroRef={heroRef}
        overlayRef={overlayRef}
        globeWrapRef={globeWrapRef}
        canvasRef={canvasRef}
      />
    </section>
  );
}
