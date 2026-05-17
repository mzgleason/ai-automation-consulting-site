import { PageShell } from "@/components/playbook/PageShell";
import { SectionContainer } from "@/components/playbook/SectionContainer";
import { SystemContainer } from "@/components/playbook/SystemContainer";
import Image from "next/image";
import Link from "next/link";

const featuredTags = ["Discovery", "Systems Thinking", "Engineering Alignment"];

const inProgress = [
  {
    title: "Discovery Ops System",
    description: "Turn customer conversations into operational signals, recurring patterns, and clearer product direction.",
    icon: "/images/icons/carbon/network-chart.svg",
  },
  {
    title: "Customer Signal Routing",
    description: "Convert fragmented customer feedback into prioritized operational insights and roadmap signals.",
    icon: "/images/icons/carbon/network.svg",
  },
  {
    title: "Customer Activation Framework",
    description: "Design early lifecycle workflows that reduce friction, improve activation, and speed up time-to-value.",
    icon: "/images/icons/carbon/network-wired.svg",
  },
];

export default function PlaybooksPage() {
  return (
    <PageShell>
      <SectionContainer>
        <SystemContainer>
          <section className="pb-library-hero" aria-label="Playbooks hero">
            <div className="pb-library-hero-copy">
              <p className="pb-label">Playbooks</p>
              <h1 className="pb-library-title">Operational playbooks for modern product systems.</h1>
              <p className="pb-body pb-library-subhead">
                Frameworks built from real marketplace operations, AI workflows, routing systems, and execution
                bottlenecks.
              </p>
            </div>

            <aside className="pb-card pb-library-hero-points" aria-label="Playbook principles">
              <article className="pb-library-point">
                <Image src="/images/icons/carbon/network.svg" alt="" aria-hidden="true" width={20} height={20} />
                <div>
                  <h2>Built from operational systems</h2>
                  <p>Frameworks shaped by real workflows, routing systems, customer operations, and AI-enabled execution.</p>
                </div>
              </article>

              <article className="pb-library-point">
                <Image src="/images/icons/carbon/stacked-scrolling-1.svg" alt="" aria-hidden="true" width={20} height={20} />
                <div>
                  <h2>Designed for implementation</h2>
                  <p>Focused on systems teams can actually deploy instead of theoretical process diagrams.</p>
                </div>
              </article>

              <article className="pb-library-point">
                <Image src="/images/icons/carbon/compass.svg" alt="" aria-hidden="true" width={20} height={20} />
                <div>
                  <h2>Continuously refined</h2>
                  <p>Updated as tooling, workflows, and operational constraints evolve.</p>
                </div>
              </article>
            </aside>
          </section>
        </SystemContainer>
      </SectionContainer>

      <SectionContainer>
        <SystemContainer>
          <section aria-label="Featured playbook">
            <p className="pb-label pb-library-section-label">Featured Playbook</p>
            <article className="pb-card pb-library-featured">
              <div className="pb-library-featured-media" aria-hidden="true">
                <div className="pb-library-featured-media-inner">
                  <Image
                    src="/images/playbooks/tech-discovery-visual.png"
                    alt="AI-assisted technical discovery network visual"
                    width={1280}
                    height={1280}
                    className="pb-library-featured-media-image"
                  />
                </div>
              </div>

              <div className="pb-library-featured-copy">
                <h2>AI-Assisted Technical Discovery</h2>
                <p>
                  Use AI to accelerate technical discovery without losing system-level thinking and operational clarity.
                </p>
                <ul>
                  {featuredTags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>

              <div className="pb-library-featured-cta">
                <Link href="/playbooks/ai-assisted-technical-discovery">Open playbook</Link>
              </div>
            </article>
          </section>
        </SystemContainer>
      </SectionContainer>

      <SectionContainer>
        <SystemContainer>
          <section aria-label="Who these playbooks help">
            <p className="pb-label pb-library-section-label">Who These Playbooks Help</p>
            <ul className="pb-library-audience-list">
              <li>Product leaders building operational systems</li>
              <li>Teams integrating AI into execution workflows</li>
              <li>Marketplace and workflow-heavy businesses</li>
              <li>Operators scaling customer and routing systems</li>
            </ul>
          </section>
        </SystemContainer>
      </SectionContainer>

      <SectionContainer>
        <SystemContainer>
          <section aria-label="Playbooks in progress">
            <p className="pb-label pb-library-section-label">Operational Frameworks</p>
            <div className="pb-library-progress-grid">
              {inProgress.map((playbook) => (
                <article key={playbook.title} className="pb-card pb-library-progress-card">
                  <Image src={playbook.icon} alt="" aria-hidden="true" width={20} height={20} />
                  <h2>{playbook.title}</h2>
                  <p>{playbook.description}</p>
                </article>
              ))}
            </div>
          </section>
        </SystemContainer>
      </SectionContainer>
    </PageShell>
  );
}
