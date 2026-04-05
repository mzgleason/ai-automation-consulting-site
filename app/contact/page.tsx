import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { getPageContent } from "@/lib/content";
import { offers } from "@/lib/offers";

export default async function ContactPage() {
  const page = await getPageContent("contact");

  return (
    <main className="section section-top">
      <div className="container split contact-page-grid">
        <div className="contact-page-copy">
          <p className="eyebrow">Contact</p>
          <h1>{page.title}</h1>
          <p className="lead">{page.description}</p>

          <section className="card contact-fit-card">
            <p className="card-kicker">Best fit</p>
            <p className="contact-fit-copy">
              Best fit if you are trying to structure a workflow, scope an AI-powered product or prototype, or move
              from vague idea to a real system without wasting months.
            </p>
          </section>

          <section className="card contact-fit-card">
            <p className="card-kicker">Direct options</p>
            <div className="contact-direct">
              <p>
                Email:{" "}
                <a href="mailto:hello@markgleason.ai" className="text-link">
                  hello@markgleason.ai
                </a>
              </p>
              <p>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/markgleason/"
                  className="text-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  markgleason
                </a>
              </p>
            </div>
          </section>

          <section className="card contact-fit-card">
            <p className="card-kicker">Useful context to send</p>
            <ul className="plain-list compact-list">
              <li>The current workflow, product idea, or system problem</li>
              <li>The main constraint or bottleneck</li>
              <li>What success would look like</li>
              <li>Which of the three engagement shapes seems closest right now</li>
            </ul>
          </section>

          <section className="card contact-fit-card">
            <p className="card-kicker">Engagement paths</p>
            <div className="contact-offer-list">
              {offers.map((offer) => (
                <div key={offer.slug} className="contact-offer-item">
                  <h2>{offer.title}</h2>
                  <p>{offer.summary}</p>
                  <Link href={`/services/${offer.slug}`} className="text-link build-link">
                    See how I help
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="contact-form-column">
          <ContactForm source="contact-page" />
        </div>
      </div>
    </main>
  );
}
