import Image from "next/image";
import Link from "next/link";
import type { ProjectEntry } from "@/lib/content";

type ProjectMetric = {
  value: string;
  label: string;
};

type ProjectSectionProps = {
  project: ProjectEntry;
  proofLine?: string;
  metrics: ProjectMetric[];
  layout: "imageLeft" | "imageRight";
};

export function ProjectSection({ project, proofLine, metrics, layout }: ProjectSectionProps) {
  return (
    <article className={`project-section ${layout === "imageRight" ? "project-section-image-right" : ""}`.trim()}>
      {project.coverImage ? (
        <div className="project-section-media">
          <Image
            src={project.coverImage}
            alt={`${project.title} case study visual`}
            width={1400}
            height={840}
            priority={project.featured}
          />
        </div>
      ) : null}

      <div className="project-section-copy">
        <p className="project-section-eyebrow">Case study</p>
        <h2>{project.title}</h2>
        <p className="project-section-summary">{project.summary}</p>
        {proofLine ? <p className="project-section-proof">{proofLine}</p> : null}
        {metrics.length > 0 ? (
          <dl className="project-section-metrics" aria-label={`${project.title} outcomes`}>
            {metrics.slice(0, 2).map((metric) => (
              <div key={`${metric.value}-${metric.label}`}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <Link href={`/projects/${project.slug}`} className="text-link build-link">
          Read case study
        </Link>
      </div>
    </article>
  );
}
