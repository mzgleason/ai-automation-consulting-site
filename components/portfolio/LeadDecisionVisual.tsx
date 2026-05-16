"use client";

import { useEffect, useMemo, useState } from "react";

function calcPrice(score: number) {
  if (score === 0) return "0.00";
  const base = 42.75;
  const adjusted = base + (score - 82) * 0.42;
  return Math.max(18, adjusted).toFixed(2);
}

export function LeadDecisionVisual() {
  const [score, setScore] = useState(82);
  const [cycle, setCycle] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);
  const [pulseTarget, setPulseTarget] = useState<"accept" | "reject">("accept");
  const [acceptFlash, setAcceptFlash] = useState(false);
  const [rejectFlash, setRejectFlash] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setCycle((prev) => {
        const next = prev + 1;
        const zeroCycle = next % 5 === 0;
        const nextScore = zeroCycle ? 0 : Math.floor(65 + Math.random() * 26);
        setScore(nextScore);
        setPulseTarget(zeroCycle ? "reject" : "accept");
        setPulseKey((k) => k + 1);
        return next;
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      if (pulseTarget === "accept") {
        setAcceptFlash(true);
        setTimeout(() => setAcceptFlash(false), 220);
      } else {
        setRejectFlash(true);
        setTimeout(() => setRejectFlash(false), 220);
      }
    }, 1650);
    return () => clearTimeout(id);
  }, [pulseKey, pulseTarget]);

  const price = useMemo(() => calcPrice(score), [score]);

  return (
    <svg viewBox="0 0 760 300" className="h-full w-full overflow-visible" role="img" aria-label="Lead bidding decision flow" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="signalLine" x1="80" y1="150" x2="705" y2="150">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="36%" stopColor="#6366f1" />
          <stop offset="68%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id="scoreRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="55%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="blur16"><feGaussianBlur stdDeviation="16" /></filter>
        <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      <g transform="translate(-12 18)">
        <text x="42" y="139" fill="#e5edf8" fontSize="13" fontWeight="650">Lead</text>
        <text x="34" y="157" fill="#e5edf8" fontSize="13" fontWeight="650">sources</text>

        <g filter="url(#glow)" opacity="0.9">
          {[
            ["M48 118 C86 124 120 138 170 148 C186 150 197 150 204 150", "2.6s", "0s", "#38bdf8", 2.4],
            ["M34 166 C76 160 116 154 168 151 C185 150 198 150 204 150", "2.3s", "-0.9s", "#2563eb", 1.8],
            ["M62 96 C92 108 128 130 172 145 C188 150 199 150 204 150", "2.9s", "-1.6s", "#818cf8", 2.1]
          ].map(([path, dur, begin, color, r], i) => (
            <circle key={i} r={r as number} fill={color as string}>
              <animateMotion dur={dur as string} begin={begin as string} repeatCount="indefinite" path={path as string} />
              <animate attributeName="opacity" values="0;0.9;0.9;0" dur={dur as string} begin={begin as string} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        <path d="M92 150 C142 150 150 150 190 150 H532" stroke="url(#signalLine)" strokeWidth="15" strokeLinecap="round" opacity="0.16" filter="url(#blur16)" />
        <path d="M92 150 C142 150 150 150 190 150 H532" stroke="url(#signalLine)" strokeWidth="2" strokeLinecap="round" opacity="0.8" filter="url(#glow)" />
        <path d="M294 150 H304M410 150 H420" stroke="#7ab4ff" strokeOpacity="0.24" strokeWidth="1.4" strokeLinecap="round" />

        <g transform="translate(190 98)">
          <animateTransform attributeName="transform" type="translate" values="190 98;190 92;190 98" dur="2.2s" begin="0s" repeatCount="indefinite" />
          <rect width="104" height="104" rx="9" fill="#071426" stroke="#3151d4" strokeOpacity="0.82" />
          <text x="52" y="30" textAnchor="middle" fill="#f8fafc" fontSize="13.5" fontWeight="750">Enrich</text>
          <text x="52" y="49" textAnchor="middle" fill="#8190aa" fontSize="10">Address</text>
          <text x="52" y="62" textAnchor="middle" fill="#8190aa" fontSize="10">Income</text>
          <text x="52" y="75" textAnchor="middle" fill="#8190aa" fontSize="10">Debt</text>
        </g>

        <g transform="translate(306 98)">
          <animateTransform attributeName="transform" type="translate" values="306 98;306 92;306 98" dur="2.2s" begin="0.7s" repeatCount="indefinite" />
          <rect width="104" height="104" rx="9" fill="#071426" stroke="#4853e8" strokeOpacity="0.82" />
          <text x="52" y="30" textAnchor="middle" fill="#f8fafc" fontSize="13.5" fontWeight="750">Score</text>
          <circle cx="52" cy="70" r="28" stroke="#334155" strokeWidth="4" opacity="0.75" />
          <path d="M28 70A24 24 0 1 1 66 90" stroke="url(#scoreRing)" strokeWidth="5" strokeLinecap="round" fill="none" filter="url(#glow)" />
          <text x="52" y="76" textAnchor="middle" fill="#f8fafc" fontSize="17" fontWeight="800">{score}</text>
        </g>

        <g transform="translate(422 98)">
          <animateTransform attributeName="transform" type="translate" values="422 98;422 92;422 98" dur="2.2s" begin="1.4s" repeatCount="indefinite" />
          <rect width="104" height="104" rx="9" fill="#071426" stroke="#2563eb" strokeOpacity="0.74" />
          <text x="52" y="30" textAnchor="middle" fill="#f8fafc" fontSize="13.5" fontWeight="750">Price</text>
          <text x="52" y="67" textAnchor="middle" fill="#f8fafc" fontSize="18" fontWeight="750">${price}</text>
          <path d="M28 88 C40 73 50 92 62 79 S80 76 89 59" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#glow)" />
        </g>

        <path d="M546 150 C574 150 580 115 606 106" stroke="#22c55e" strokeWidth="2.4" strokeLinecap="round" fill="none" filter="url(#glow)" />
        <path d="M546 150 C574 150 580 185 606 194" stroke="#ef4444" strokeWidth="2.4" strokeLinecap="round" fill="none" filter="url(#glow)" />

        <circle key={`pulse-${pulseKey}`} r="3.2" fill={pulseTarget === "accept" ? "#34d399" : "#fb7185"} filter="url(#glow)">
          <animateMotion
            dur="1.65s"
            begin="0s"
            repeatCount="1"
            path={pulseTarget === "accept" ? "M546 150 C574 150 580 115 606 106" : "M546 150 C574 150 580 185 606 194"}
          />
          <animate attributeName="opacity" values="0;1;1;0" dur="1.65s" repeatCount="1" />
        </circle>

        <g transform="translate(608 96)">
          <circle r="19" fill="#052e2b" stroke="#22c55e" strokeOpacity={acceptFlash ? "1" : "0.68"} strokeWidth={acceptFlash ? "3" : "1"} />
          <path d="M-7 0L-2 7L9 -9" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="31" y="-3" fill="#f8fafc" fontSize="11.5" fontWeight="750">Accept</text>
        </g>

        <g transform="translate(608 204)">
          <circle r="19" fill="#2a0b14" stroke="#ef4444" strokeOpacity={rejectFlash ? "1" : "0.58"} strokeWidth={rejectFlash ? "3" : "1"} />
          <path d="M-7 -7L7 7M7 -7L-7 7" stroke="#fb7185" strokeWidth="3" strokeLinecap="round" />
          <text x="31" y="-3" fill="#f8fafc" fontSize="11.5" fontWeight="750">Reject</text>
        </g>
      </g>
    </svg>
  );
}
