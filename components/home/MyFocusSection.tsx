"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./MyFocus.module.css";
import { ParticleLineBackground } from "./ParticleLineBackground";

type FocusItem = {
  id: string;
  title: string;
  description: string;
};

type MyFocusSectionProps = {
  items: FocusItem[];
};

function FocusRow({
  item,
}: {
  item: FocusItem;
}) {
  return (
    <article className={`${styles.row} ${styles.rowInactive}`}>
      <button type="button" className={styles.rowLink} data-active="false">
        <span className={styles.activePlane} aria-hidden="true" />
        <span className={styles.cornerFrame} aria-hidden="true">
          <span className={styles.cornerTl} />
          <span className={styles.cornerTr} />
          <span className={styles.cornerBl} />
          <span className={styles.cornerBr} />
        </span>
        <span className={styles.rowTitle}>{item.title}</span>
        <span className={styles.rowDescription}>{item.description}</span>
      </button>
    </article>
  );
}

export function MyFocusSection({ items }: MyFocusSectionProps) {
  const [bgProgress, setBgProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const revealStartY = viewportHeight * 0.95;
      const revealDistance = Math.max(rect.height * 0.35, 1);
      const progress = (revealStartY - rect.top) / revealDistance;
      const clamped = Math.max(0, Math.min(1, progress));
      setBgProgress(clamped);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.section}`}
      data-reveal-active={bgProgress > 0 ? "true" : "false"}
      style={{ "--my-focus-bg-progress": bgProgress } as CSSProperties}
    >
      <span className={styles.bgReveal} aria-hidden="true" />
      <ParticleLineBackground hostRef={sectionRef} interactiveRef={rowsRef} />
      <div className={styles.contentReveal}>
        <div className={`container ${styles.panel} ${styles.panelHero}`}>
          <div className={styles.header}>
            <p className={`eyebrow ${styles.label}`}>My Focus</p>
            <div className={styles.intro}>
              <h2>I step into ambiguous systems and make them executable.</h2>
              <p className={`lead ${styles.introCopy}`}>
                Better decisions. Clear ownership. Work that moves.
              </p>
            </div>
          </div>
        </div>

        <div
          ref={rowsRef}
          className={`container ${styles.panel} ${styles.panelRows} ${styles.rows}`}
          role="list"
          aria-label="My Focus areas"
        >
          {items.map((item) => (
            <FocusRow key={item.id} item={item} />
          ))}
        </div>
      </div>

    </section>
  );
}
