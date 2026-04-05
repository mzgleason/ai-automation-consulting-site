import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOfferBySlug, offers, processSteps } from "@/lib/offers";

export async function generateStaticParams() {
  return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);

  if (!offer) {
    return {};
  }

  return {
    title: offer.title,
    description: offer.summary
  };
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);

  if (!offer) {
    notFound();
  }

  return (
    <main className="section section-top">
      <div className="container detail-hero service-hero">
        <Link href="/work-with-me" className="text-link">
          Back to Work With Me
        </Link>
        <p className="eyebrow">{offer.eyebrow}</p>
        <h1>{offer.title}</h1>
        <p className="lead service-lead">{offer.summary}</p>
        <div className="detail-meta-strip service-meta">
          <span>Builder-led engagement</span>
          <span>Scoped for business outcomes</span>
          <span>Designed to ship</span>
        </div>
      </div>

      <div className="container detail-grid service-detail-grid">
        <aside className="detail-sidebar service-sidebar">
          <div className="card service-sidebar-card">
            <p className="card-kicker">Best fit</p>
            <p className="service-fit-copy">{offer.fit}</p>
          </div>

          <div className="card service-sidebar-card">
            <p className="card-kicker">Typical outcomes</p>
            <ul className="plain-list">
              {offer.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="service-main">
          <section className="card service-surface">
            <p className="card-kicker">What this includes</p>
            <div className="service-columns">
              <div>
                <h2>Deliverables</h2>
                <ul className="plain-list">
                  {offer.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Good fit examples</h2>
                <ul className="plain-list">
                  {offer.examples.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="card service-surface">
            <p className="card-kicker">How the work moves</p>
            <p className="service-process-note">{offer.processNote}</p>
            <div className="service-process-grid">
              {processSteps.map((step, index) => (
                <article key={step.title} className="service-process-card">
                  <p className="service-process-mark">0{index + 1}</p>
                  <h3>{step.title}</h3>
                  <p>{step.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="card cta-panel service-cta-panel">
            <p className="eyebrow">Next step</p>
            <h2>Need help deciding if this is the right engagement shape?</h2>
            <p className="lead">
              The first conversation is for clarifying fit, current constraints, and what a useful first milestone would
              be.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="button button-accent">
                Start a conversation
              </Link>
              <Link href="/projects" className="button button-ghost">
                View case studies
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
