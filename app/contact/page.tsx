import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="section section-top">
      <div className="container split">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Share your current bottleneck</h1>
          <p className="lead">If Calendly is unavailable, use this direct intake form.</p>
        </div>
        <ContactForm source="contact-page" />
      </div>
    </section>
  );
}

