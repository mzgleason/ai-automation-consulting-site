"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import GlobeCanvas from "@/components/GlobeCanvas";
import LogoMarquee from "@/components/LogoMarquee";

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path
        d="M3.5 10h11m0 0-4-4m4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [globeAnim, setGlobeAnim] = useState({ explode: 0, cut: 0 });
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const animTokenRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(coarse);
  }, []);

  const smoothstep = useCallback((t: number) => t * t * (3 - 2 * t), []);

  const runSegment = useCallback(
    (
      duration: number,
      draw: (eased: number) => void,
      token: number,
      done?: () => void
    ) => {
      const start = performance.now();

      const tick = (now: number) => {
        if (animTokenRef.current !== token) return;
        const linear = Math.min(1, (now - start) / duration);
        draw(smoothstep(linear));
        if (linear < 1) {
          rafRef.current = window.requestAnimationFrame(tick);
          return;
        }
        done?.();
      };

      rafRef.current = window.requestAnimationFrame(tick);
    },
    [smoothstep]
  );

  const clearAnimation = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const triggerExplode = useCallback(() => {
    if (typeof window === "undefined") return;
    clearAnimation();
    animTokenRef.current += 1;
    const token = animTokenRef.current;

    const explodingMs = 740;
    const holdMs = 680;
    const reformingMs = 980;
    const cutRiseMs = 260;
    const cutHoldMs = 980;
    const settleMs = 840;

    setGlobeAnim({ explode: 0, cut: 0 });

    runSegment(
      explodingMs,
      (eased) => setGlobeAnim({ explode: eased, cut: 0 }),
      token,
      () => {
        if (animTokenRef.current !== token) return;
        setGlobeAnim({ explode: 1, cut: 0 });
        timerRef.current = window.setTimeout(() => {
          if (animTokenRef.current !== token) return;

          const reformStart = performance.now();
          const reformTick = (now: number) => {
            if (animTokenRef.current !== token) return;
            const linear = Math.min(1, (now - reformStart) / reformingMs);
            const eased = smoothstep(linear);
            const explode = 1 - eased;
            let cut = 0;

            if (linear >= 0.72) {
              const cutLinear = Math.min(1, (linear - 0.72) / (cutRiseMs / reformingMs));
              cut = smoothstep(cutLinear);
            }

            setGlobeAnim({ explode, cut });

            if (linear < 1) {
              rafRef.current = window.requestAnimationFrame(reformTick);
              return;
            }

            setGlobeAnim({ explode: 0, cut: 1 });
            timerRef.current = window.setTimeout(() => {
              runSegment(
                settleMs,
                (settleEased) => setGlobeAnim({ explode: 0, cut: 1 - settleEased }),
                token,
                () => {
                  if (animTokenRef.current !== token) return;
                  setGlobeAnim({ explode: 0, cut: 0 });
                }
              );
            }, cutHoldMs);
          };

          rafRef.current = window.requestAnimationFrame(reformTick);
        }, holdMs);
      }
    );
  }, [clearAnimation, runSegment, smoothstep]);

  useEffect(() => {
    return () => {
      clearAnimation();
      animTokenRef.current += 1;
    };
  }, [clearAnimation]);

  const allowParallax = !reducedMotion && !isTouch;

  const globeOffset = useMemo(() => {
    if (!allowParallax) return { x: 0, y: 0 };
    return {
      x: mouse.x * 18,
      y: mouse.y * 14
    };
  }, [allowParallax, mouse.x, mouse.y]);

  return (
    <main>
      <section
        className="hero light relative min-h-[100svh] overflow-hidden bg-[#f6f4ef]"
        onClick={triggerExplode}
        onMouseLeave={triggerExplode}
        onMouseMove={(event) => {
          if (!allowParallax) return;
          const { innerWidth, innerHeight } = window;
          const x = (event.clientX / innerWidth - 0.5) * 2;
          const y = (event.clientY / innerHeight - 0.5) * 2;
          setMouse({ x, y });
        }}
      >
        <motion.div
          className="globeAnimationWrapper pointer-events-none absolute inset-0 z-0"
          animate={globeOffset}
          transition={{ type: "spring", stiffness: 35, damping: 18, mass: 0.8 }}
        >
            <div className="absolute inset-y-0 right-[-10%] w-[88%] md:right-[-6%] md:w-[74%]">
            <div className="fallback-globe" aria-hidden="true">
              <div className="fallback-core" />
              <div className="fallback-ring fallback-ring-a" />
              <div className="fallback-ring fallback-ring-b" />
              <div className="fallback-dots" />
            </div>
            <GlobeCanvas reducedMotion={Boolean(reducedMotion)} explode={globeAnim.explode} cut={globeAnim.cut} />
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1240px] grid-cols-1 px-6 pb-14 pt-32 md:px-10 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-x-10 lg:pb-20">
          <div className="textWrapper max-w-[730px]">
            <motion.h1
              initial={
                reducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      y: 22,
                      filter: "blur(8px)"
                    }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-[clamp(2.25rem,4vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0f1218]"
            >
              A digital product studio that turns complexity into beautiful simplicity.
            </motion.h1>

            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: reducedMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <Link
                href="/book"
                onClick={(event) => event.stopPropagation()}
                className="group inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/70 px-5 py-2.5 text-sm font-medium text-[#16181f] outline-none backdrop-blur-sm transition hover:bg-white focus-visible:ring-2 focus-visible:ring-black/40"
              >
                <span>How we can help you</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRightIcon />
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="separatorWrapper hidden h-[48vh] w-px bg-black/10 lg:block" aria-hidden="true" />

          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </section>

      <section className="dark bg-[#0e0f13] py-10 text-[#f0f2f5] md:py-12">
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-8 px-6 md:px-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
          <h2 className="text-base font-medium tracking-[-0.01em]">Brands we collaborate with:</h2>
          <LogoMarquee />
        </div>
      </section>
    </main>
  );
}
