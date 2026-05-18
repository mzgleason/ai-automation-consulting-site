"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const DESKTOP_BARS = 64;
const MOBILE_BARS = 36;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function waveformAt(x: number, t: number) {
  const phaseA = x * 7.2 - t * 0.5;
  const phaseB = x * 13.4 + t * 0.29;
  const phaseC = x * 3.6 - t * 0.14;
  const core = Math.sin(phaseA) * 0.56 + Math.sin(phaseB) * 0.27 + Math.sin(phaseC) * 0.17;
  const envelope = Math.exp(-Math.pow((x - 0.52) / 0.34, 2));
  const conversationalCadence = 0.83 + 0.17 * Math.sin(t * 0.27);
  return core * envelope * conversationalCadence;
}

export default function SignalBarHeroBackground() {
  const reducedMotion = useReducedMotion();
  const [tick, setTick] = useState(0);
  const [pointer, setPointer] = useState({ x: 0.74, y: 0.5 });
  const [barCount, setBarCount] = useState(DESKTOP_BARS);

  useEffect(() => {
    const syncCount = () => setBarCount(window.innerWidth <= 760 ? MOBILE_BARS : DESKTOP_BARS);
    syncCount();
    window.addEventListener("resize", syncCount);
    return () => window.removeEventListener("resize", syncCount);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    let start = performance.now();
    const frame = (now: number) => {
      const elapsed = (now - start) / 1000;
      setTick(elapsed);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  const bars = useMemo(
    () =>
      Array.from({ length: barCount }, (_, i) => {
        const x = i / (barCount - 1);
        const edgeFade = smoothstep(0.02, 0.13, x) * (1 - smoothstep(0.84, 0.98, x));
        return { i, x, edgeFade };
      }),
    [barCount]
  );

  return (
    <div
      className="signal-bars-bg"
      onMouseMove={(event) => {
        if (reducedMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
          y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
        });
      }}
      onMouseLeave={() => setPointer({ x: 0.74, y: 0.5 })}
    >
      <div className="signal-bars-core">
        {bars.map(({ i, x, edgeFade }) => {
          const nearby = Math.max(0, 1 - Math.abs(pointer.x - x) * 6.4);
          const pointerHeightBoost = 0.9 + (1 - pointer.y) * 0.6;
          const localEmphasis = 1 + nearby * 0.42;
          const waveValue = waveformAt(x, tick);
          const amp = Math.abs(waveValue) * edgeFade * localEmphasis * pointerHeightBoost;
          const scaleY = 0.28 + amp * 1.4;
          const opacity = 0.14 + amp * 0.21;
          const peak = amp > 0.5;

          return (
            <motion.span
              key={i}
              className={`signal-bar${peak ? " is-peak" : ""}`}
              style={{
                left: `${x * 100}%`,
                height: "210px",
                opacity: reducedMotion ? 0.12 : opacity,
                transform: "translate3d(-50%, -50%, 0)",
                scaleY: reducedMotion ? 0.32 : scaleY
              }}
              transition={reducedMotion ? undefined : { duration: 0.55, ease: "easeInOut" }}
            />
          );
        })}
      </div>
    </div>
  );
}
