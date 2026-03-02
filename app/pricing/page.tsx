import { TrackableButton } from "@/components/TrackableButton";
import { pricingTiers } from "@/content/siteContent";

const investmentGuide: Record<string, string> = {
  starter: "Typical investment: $2k-$6k",
  growth: "Typical investment: $6k-$15k",
  scale: "Typical investment: from $2k/month"
};

export default function PricingPage() {
  return (
    <section className="section section-top">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Pricing</p>
            <h1>Transparent scopes with clear operational boundaries</h1>
            <p className="lead">
              Choose based on workflow complexity and ownership capacity, then scale only after measurable wins.
            </p>
          </div>
        </div>

        <div className="card-grid three tier-grid">
          {pricingTiers.map((tier) => (
            <article className="card tier-card pricing-card" key={tier.id}>
              <p className="eyebrow">Timeline: {tier.timeline}</p>
              <h2>{tier.name}</h2>
              <p className="muted">{investmentGuide[tier.id]}</p>
              <p>{tier.summary}</p>
              <ul className="micro-list">
                {tier.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
              <TrackableButton href="/book" label={tier.ctaLabel} location={`pricing-${tier.id}`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}