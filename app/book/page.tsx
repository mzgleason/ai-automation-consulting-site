import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { TrackableButton } from "@/components/TrackableButton";

export default function BookPage() {
  return (
    <section className="section section-top">
      <div className="container">
        <p className="eyebrow">Book</p>
        <h1>Book a discovery call</h1>
        <p className="lead">Bring one operational bottleneck. Leave with a concrete 30-day automation plan.</p>
        <CalendlyEmbed page="book-page" />
        <p className="muted">
          If the scheduler does not load, use the contact form.
          <span className="inline-button">
            <TrackableButton href="/contact" label="Open Contact Form" location="book-fallback" variant="ghost" />
          </span>
        </p>
      </div>
    </section>
  );
}

