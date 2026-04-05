import Link from "next/link";
import { getPageContent } from "@/lib/content";
import { offers, processSteps, qualificationFaq } from "@/lib/offers";

const audiences = [
  "Small businesses trying to operationalize AI in real workflows",
  "Founders and operators who need to move from idea to testable system",
  "Teams exploring internal tools, intake automation, support triage, or decision systems",
  "Decision makers who know AI matters but need help shaping the right first move"
];

const conversationTopics = [
  "What the current workflow or product idea looks like today",
  "Where the friction, ambiguity, or manual effort is showing up",
  "What a useful first milestone would look like",
  "Which engagement shape is the best fit right now"
];

export default async function WorkWithMePage() {
  const page = await getPageContent("work-with-me");

  return (
    <main className="section section-top">
      <div className="container page-intro work-page-intro">
        <p className="eyebrow">Work With Me</p>
        <h1>{page.title}</h1>
        <p className="lead">{page.description}</p>
      </div>

      <section className="section section-compact">
        <div className="container split-layout qualification-grid">
          <section className="card qualification-card">
            <p className="card-kicker">Who I help</p>
            <h2>Best fit for teams that need more than an AI idea</h2>
            <p className="qualification-copy">
              Best fit if you are trying to structure a workflow, scope an AI-powered product or prototype, or move
              from vague idea to a real system without wasting months.
            </p>
            <ul className="plain-list">
              {audiences.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>
          </section>

          <section className="card qualification-card">
            <p className="card-kicker">What a first conversation covers</p>
            <h2>Enough context to choose the right engagement shape</h2>
            <ul className="plain-list">
              {conversationTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
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
      </section>

      <section className="section section-compact">
        <div className="container">
          <div className="section-head services-index-head">
            <div>
              <p className="eyebrow">Engagement types</p>
              <h2>Three clear ways to work together</h2>
            </div>
          </div>
          <div className="card-grid three offer-grid">
            {offers.map((offer) => (
              <article key={offer.slug} className="card offer-card">
                <p className="card-kicker">{offer.title}</p>
                <h3>{offer.summary}</h3>
                <p className="offer-fit">{offer.fit}</p>
                <ul className="plain-list compact-list">
                  {offer.deliverables.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="hero-actions offer-actions">
                  <Link href={`/services/${offer.slug}`} className="button button-ghost button-sm">
                    See how I help
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-compact">
        <div className="container">
          <div className="section-head services-index-head">
            <div>
              <p className="eyebrow">Process</p>
              <h2>How the work usually moves</h2>
            </div>
          </div>
          <div className="service-process-grid">
            {processSteps.map((step, index) => (
              <article key={step.title} className="card service-process-card">
                <p className="service-process-mark">0{index + 1}</p>
                <h3>{step.title}</h3>
                <p>{step.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-compact">
        <div className="container">
          <div className="section-head services-index-head">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2>Common objections and fit questions</h2>
            </div>
          </div>
          <div className="faq-grid">
            {qualificationFaq.map((item) => (
              <article key={item.question} className="card faq-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta-section">
        <div className="container cta-panel">
          <p className="eyebrow">Next step</p>
          <h2>Need help figuring out what to build, prototype, or operationalize with AI?</h2>
          <p className="lead">
            Start with the problem, the workflow, or the idea that keeps coming up. We can decide the right engagement
            shape from there.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="button button-accent">
              Start a conversation
            </Link>
            <Link href="/projects" className="button button-ghost">
              View case studies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
