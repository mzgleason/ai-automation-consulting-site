import { PageShell } from "@/components/playbook/PageShell";
import { SectionContainer } from "@/components/playbook/SectionContainer";
import { SystemContainer } from "@/components/playbook/SystemContainer";
import Link from "next/link";

const featuredTags = ["Discovery", "Systems Thinking", "Engineering Alignment"];

const inProgress = [
  {
    title: "Customer Interview System",
    description: "Plan, run, and synthesize customer interviews into clear patterns, priority problems, and product decisions.",
    icon: "/images/icons/carbon/chart-relationship.svg",
  },
  {
    title: "Voice-of-Customer Loop",
    description: "Turn ongoing customer feedback into ranked themes and concrete roadmap inputs.",
    icon: "/images/icons/carbon/chat.svg",
  },
  {
    title: "Customer Onboarding System",
    description: "Standardize the first 30 days to reduce time-to-value and increase expansion readiness.",
    icon: "/images/icons/carbon/user-multiple.svg",
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
              <h1 className="pb-library-title">Practical playbooks for real-world systems.</h1>
              <p className="pb-body pb-library-subhead">
                Short, reusable frameworks to help teams move faster, make better decisions, and build with
                confidence.
              </p>
            </div>

            <aside className="pb-card pb-library-hero-points" aria-label="Playbook principles">
              <article className="pb-library-point">
                <img src="/images/icons/carbon/document.svg" alt="" aria-hidden="true" />
                <div>
                  <h2>Actionable by design</h2>
                  <p>Step-by-step frameworks you can apply immediately.</p>
                </div>
              </article>

              <article className="pb-library-point">
                <img src="/images/icons/carbon/location-current.svg" alt="" aria-hidden="true" />
                <div>
                  <h2>Built from experience</h2>
                  <p>Real-world lessons from systems and workflows in the wild.</p>
                </div>
              </article>

              <article className="pb-library-point">
                <img src="/images/icons/carbon/rocket.svg" alt="" aria-hidden="true" />
                <div>
                  <h2>Evolving library</h2>
                  <p>New playbooks added as the systems and challenges evolve.</p>
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
                  <p>Playbook / 01</p>
                  <strong>AI-Assisted Technical Discovery</strong>
                </div>
              </div>

              <div className="pb-library-featured-copy">
                <h2>AI-Assisted Technical Discovery</h2>
                <p>
                  Reduce discovery loops by giving product workflows system-level context before engineering
                  refinement begins.
                </p>
                <ul>
                  {featuredTags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>

              <div className="pb-library-featured-cta">
                <Link href="/playbooks/ai-assisted-technical-discovery">View playbook <span aria-hidden="true">?</span></Link>
              </div>
            </article>
          </section>
        </SystemContainer>
      </SectionContainer>

      <SectionContainer>
        <SystemContainer>
          <section aria-label="Playbooks in progress">
            <p className="pb-label pb-library-section-label">Playbooks In Progress</p>
            <div className="pb-library-progress-grid">
              {inProgress.map((playbook) => (
                <article key={playbook.title} className="pb-card pb-library-progress-card">
                  <img src={playbook.icon} alt="" aria-hidden="true" />
                  <h2>{playbook.title}</h2>
                  <p>{playbook.description}</p>
                  <span>Coming soon</span>
                </article>
              ))}
            </div>
          </section>
        </SystemContainer>
      </SectionContainer>
    </PageShell>
  );
}
