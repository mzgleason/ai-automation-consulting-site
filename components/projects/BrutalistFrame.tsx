import { ReactNode } from "react";

type BrutalistFrameProps = {
  marker: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function BrutalistFrame({
  marker,
  title,
  children,
  className,
}: BrutalistFrameProps) {
  return (
    <div className={`brutalist-frame ${className ?? ""}`.trim()}>
      <div className="brutalist-frame-utility" aria-hidden="true">
        <span>{marker}</span>
        <span>{title}</span>
      </div>
      <div className="brutalist-frame-divider" aria-hidden="true" />
      <div className="brutalist-frame-content">{children}</div>
    </div>
  );
}
