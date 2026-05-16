"use client";

import { motion } from "framer-motion";

type SignalFlowProps = {
  steps: string[];
  accentColor?: string;
  animated?: boolean;
};

const MAX_NODES = 5;

export function SignalFlow({
  steps,
  accentColor = "#58C7FF",
  animated = true
}: SignalFlowProps) {
  const nodes = steps.slice(0, MAX_NODES);
  const count = Math.max(nodes.length, 2);
  const leftPad = 78;
  const rightPad = 78;
  const topY = 82;
  const width = 960;
  const height = 480;
  const gap = (width - leftPad - rightPad) / (count - 1);
  const points = Array.from({ length: count }, (_, i) => ({ x: leftPad + i * gap, y: topY }));

  return (
    <div style={{ width: "100%", aspectRatio: "16 / 8" }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" role="img" aria-label="Signal flow visualization">
        <defs>
          <linearGradient id="sf-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#050B17" />
            <stop offset="100%" stopColor="#061127" />
          </linearGradient>
          <linearGradient id="sf-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A4E7F" stopOpacity="0.25" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.75" />
            <stop offset="100%" stopColor="#2A4E7F" stopOpacity="0.25" />
          </linearGradient>
          <filter id="sf-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="1" y="1" width={width - 2} height={height - 2} rx="18" fill="url(#sf-bg)" stroke="#1B3658" strokeOpacity="0.55" />

        <motion.rect
          x="0"
          y="0"
          width={width}
          height={height}
          rx="18"
          fill="url(#sf-bg)"
          opacity="0.25"
          animate={animated ? { opacity: [0.18, 0.3, 0.18] } : undefined}
          transition={animated ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : undefined}
        />

        {points.slice(0, -1).map((p, i) => {
          const next = points[i + 1];
          return (
            <g key={`link-${i}`}>
              <line x1={p.x + 62} y1={p.y + 34} x2={next.x - 62} y2={next.y + 34} stroke="url(#sf-line)" strokeWidth="2" />
              <line x1={p.x + 62} y1={p.y + 34} x2={next.x - 62} y2={next.y + 34} stroke={accentColor} strokeOpacity="0.3" strokeWidth="4" filter="url(#sf-glow)" />
              {animated && (
                <motion.circle
                  r="3.2"
                  fill={accentColor}
                  filter="url(#sf-glow)"
                  animate={{ cx: [p.x + 62, next.x - 62], cy: [p.y + 34, next.y + 34], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: i * 0.24 }}
                />
              )}
            </g>
          );
        })}

        {points.map((p, i) => (
          <g key={`node-${i}`}>
            <motion.rect
              x={p.x - 62}
              y={p.y}
              width="124"
              height="68"
              rx="10"
              fill="#071A34"
              stroke="#3A5E8D"
              strokeOpacity="0.8"
              animate={animated ? { strokeOpacity: [0.55, 0.9, 0.55] } : undefined}
              transition={animated ? { duration: 3.2, repeat: Infinity, delay: i * 0.18 } : undefined}
            />
            <motion.circle
              cx={p.x}
              cy={p.y + 34}
              r="6"
              fill={accentColor}
              fillOpacity="0.9"
              filter="url(#sf-glow)"
              animate={animated ? { r: [5.4, 7.2, 5.4], fillOpacity: [0.7, 1, 0.7] } : undefined}
              transition={animated ? { duration: 2.6, repeat: Infinity, delay: i * 0.2 } : undefined}
            />
            <text x={p.x} y={p.y + 94} textAnchor="middle" fill="#D9E7F5" fontSize="14" fontFamily="var(--font-body), sans-serif">
              {nodes[i] ?? `Step ${i + 1}`}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
