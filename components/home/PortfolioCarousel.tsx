"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { ProjectEntry } from "@/lib/content";
import styles from "./PortfolioCarousel.module.css";

type PortfolioCarouselProps = {
  projects: ProjectEntry[];
  proofCopy: Record<
    string,
    {
      shortCategory: string;
      displayTitle: string;
      payoff: string;
      support?: string;
    }
  >;
};

const carouselThemeVars: CSSProperties = {
  "--pc-bg": "#F3F3F0",
  "--pc-card": "#ECEDE8",
  "--pc-ink": "#12131A",
  "--pc-muted": "#5E6470",
  "--pc-border": "#C9CCD3",
  "--pc-accent": "#3D63FF",
  "--pc-accent-dark": "#2747D9",
  "--pc-accent-soft": "#DCE4FF"
} as CSSProperties;

function wrapIndex(index: number, length: number) {
  if (length === 0) return 0;
  return ((index % length) + length) % length;
}

function formatCount(value: number) {
  return String(value).padStart(2, "0");
}

function relativeOffset(index: number, active: number, length: number) {
  const raw = index - active;
  const alt = raw > 0 ? raw - length : raw + length;
  return Math.abs(raw) <= Math.abs(alt) ? raw : alt;
}

export function PortfolioCarousel({ projects, proofCopy }: PortfolioCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [step, setStep] = useState(280);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const featured = useMemo(() => projects.filter((project) => project.featured), [projects]);
  const length = featured.length;
  const hasCarousel = length >= 2;
  const featuredIndexBySlug = useMemo(
    () => new Map(featured.map((project, index) => [project.slug, index] as const)),
    [featured]
  );

  useEffect(() => {
    setActiveIndex((index) => wrapIndex(index, length));
  }, [length]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateStep = () => {
      const width = root.getBoundingClientRect().width;
      const factor = width >= 520 ? 0.92 : 0.86;
      const nextStep = Math.max(320, Math.min(520, Math.round(width * factor)));
      setStep(nextStep);
    };

    updateStep();
    window.addEventListener("resize", updateStep);
    return () => window.removeEventListener("resize", updateStep);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (!hasCarousel) return;
      setActiveIndex(wrapIndex(index, length));
    },
    [hasCarousel, length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !hasCarousel) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, hasCarousel]);

  const visible = useMemo(() => {
    if (!hasCarousel) return featured.slice(0, 1);

    const indices = new Set<number>();
    for (let offset = -2; offset <= 2; offset += 1) {
      indices.add(wrapIndex(activeIndex + offset, length));
    }
    return [...indices].sort((a, b) => a - b).map((index) => featured[index]);
  }, [activeIndex, featured, hasCarousel, length]);

  return (
    <div
      ref={rootRef}
      className={styles.carousel}
      tabIndex={hasCarousel ? 0 : -1}
      aria-label="Portfolio carousel"
      style={carouselThemeVars}
    >
      <div className={styles.stage}>
        <motion.div
          className={styles.dragSurface}
          drag={hasCarousel ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (!hasCarousel) return;
            const swipePower = Math.abs(info.offset.x) * info.velocity.x;
            const hasStrongSwipe = Math.abs(info.offset.x) > 60 || Math.abs(swipePower) > 9000;
            if (!hasStrongSwipe) return;
            if (info.offset.x < 0) goNext();
            if (info.offset.x > 0) goPrev();
          }}
          style={{ touchAction: "pan-y" }}
        >
          <div className={styles.track} aria-live="polite">
            {visible.map((project) => {
              const index = featuredIndexBySlug.get(project.slug) ?? 0;
              const offset = hasCarousel ? relativeOffset(index, activeIndex, length) : 0;
              const proof = proofCopy[project.slug];

              const cardTitle = proof?.displayTitle ?? project.title;
              const category = proof?.shortCategory ?? project.serviceType ?? project.category;
              const payoff = proof?.payoff ?? project.summary;
              const support = proof?.support;

              const x = offset * step;
              const scale = offset === 0 ? 1 : offset === -1 || offset === 1 ? 0.92 : 0.86;
              const opacity = offset === 0 ? 1 : offset === -1 || offset === 1 ? 0.22 : 0.08;
              const blur = offset === 0 ? 0 : offset === -1 || offset === 1 ? 1.5 : 3;

              return (
                <motion.article
                  key={project.slug}
                  className={styles.card}
                  style={
                    {
                      pointerEvents: offset === 0 ? "auto" : "none"
                    } as CSSProperties
                  }
                  initial={false}
                  animate={{
                    x,
                    scale,
                    opacity,
                    filter: `blur(${blur}px)`,
                    zIndex: offset === 0 ? 5 : offset === -1 || offset === 1 ? 3 : 1
                  }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 280,
                          damping: 32,
                          mass: 0.9
                        }
                  }
                  aria-hidden={offset !== 0}
                >
                  <div className={styles.cardHead}>
                    <p className={styles.label}>{category}</p>
                    <h3 className={styles.title}>{cardTitle}</h3>
                  </div>

                  <div className={styles.body}>
                    <div className={styles.mark} aria-hidden="true" />
                    <p className={styles.payoff}>{payoff}</p>
                    {support ? <p className={styles.support}>{support}</p> : null}
                  </div>

                  <div className={styles.footer}>
                    <Link href={`/projects/${project.slug}`} className={styles.cta}>
                      <span>See breakdown</span>
                      <span className={styles.ctaCorners} aria-hidden="true">
                        <span className={`${styles.ctaCorner} ${styles.ctaCornerTl}`} />
                        <span className={`${styles.ctaCorner} ${styles.ctaCornerTr}`} />
                        <span className={`${styles.ctaCorner} ${styles.ctaCornerBl}`} />
                        <span className={`${styles.ctaCorner} ${styles.ctaCornerBr}`} />
                      </span>
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className={styles.controls} aria-label="Carousel controls">
        <button
          type="button"
          className={styles.arrow}
          onClick={goPrev}
          disabled={!hasCarousel}
          aria-label="Previous case"
        >
          <span aria-hidden="true">←</span>
        </button>

        <p className={styles.count} aria-label="Carousel position">
          {formatCount(wrapIndex(activeIndex, length) + 1)} / {formatCount(length)}
        </p>

        <button
          type="button"
          className={styles.arrow}
          onClick={goNext}
          disabled={!hasCarousel}
          aria-label="Next case"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
