import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type ProjectMetric = {
  value: string;
  label: string;
};

type ProjectSectionProps = {
  title: string;
  description: string;
  eyebrow?: string;
  proofLine?: string;
  metrics?: ProjectMetric[];
  imageSrc?: string;
  imageAlt?: string;
  visual?: ReactNode;
  ctaHref: string;
  ctaLabel: string;
  layout: "imageLeft" | "imageRight";
};

export function ProjectSection({
  title,
  description,
  eyebrow = "Project",
  proofLine,
  metrics = [],
  imageSrc,
  imageAlt,
  visual,
  ctaHref,
  ctaLabel,
  layout
}: ProjectSectionProps) {
  const resolvedAlt = imageAlt ?? `${title} visual`;

  return (
    <article className={`project-section ${layout === "imageRight" ? "project-section-image-right" : ""}`.trim()}>
      {visual ? (
        <div className="project-section-media">{visual}</div>
      ) : imageSrc ? (
        <div className="project-section-media">
          <Image src={imageSrc} alt={resolvedAlt} width={1400} height={840} />
        </div>
      ) : null}

      <div className="project-section-copy">
        <p className="project-section-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="project-section-summary">{description}</p>
        {proofLine ? <p className="project-section-proof">{proofLine}</p> : null}
        {metrics.length > 0 ? (
          <dl className="project-section-metrics" aria-label={`${title} outcomes`}>
            {metrics.map((metric) => (
              <div key={`${metric.value}-${metric.label}`}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <Link href={ctaHref} className="text-link build-link">
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
