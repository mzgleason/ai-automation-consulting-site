import type { SVGProps } from "react";

type PortfolioIconProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function ModelOpsLoopIcon({ title = "Retraining loop", ...props }: PortfolioIconProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label={title} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
        <path d="M33.2 10.8a16 16 0 0 1 5.6 12.2" />
        <path d="M38.8 25a16 16 0 0 1-7.3 10.7" />
        <path d="M29 36.9A16 16 0 0 1 9.2 28.1" />
        <path d="M10.1 24.8A16 16 0 0 1 24 8" />
        <path d="M32.5 11.6l4.4-.9-1-4.3" />
        <path d="M31.7 36l-.4 4.5 4.5-.4" />
      </g>
    </svg>
  );
}

export function ContentEngineBlocksIcon({ title = "Publishing pipeline", ...props }: PortfolioIconProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label={title} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinejoin="round">
        <path d="M14 33h9v7h-9z" />
        <path d="M24 25h10v15H24z" />
        <path d="M14 18h10v14H14z" />
        <path d="M24 12h14v12H24z" />
        <path d="M10 12h6v5h-6z" />
      </g>
    </svg>
  );
}

export function IntakeFunnelNodeIcon({ title = "Intake qualification", ...props }: PortfolioIconProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label={title} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12h24l-10 12v9" />
        <path d="M26 33l7 5" />
        <path d="M26 33l-7 5" />
        <path d="M26 33v-9" />
        <circle cx="33" cy="38" r="2.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

