import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components";
import { getPageContent } from "@/lib/content";
import { CONTACT_CALENDLY_URL, CONTACT_EMAIL, CONTACT_LINKEDIN_URL } from "@/lib/contact";
import styles from "./ContactPage.module.css";

export default async function ContactPage() {
  const page = await getPageContent("contact");

  return (
    <main className={`section section-top ${styles.section}`}>
      <div className={`container split ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Decision point</p>
          <h1 className={styles.headline}>{page.title}</h1>
          <p className={styles.lead}>{page.description}</p>

          <div className={styles.detailsGrid}>
            <section className={`card ${styles.detailsCard}`}>
              <h2>Best fit</h2>
              <p>
                Best fit if you are trying to structure a workflow, scope an AI-powered product or prototype, or move
                from vague idea to a real system without wasting months.
              </p>
            </section>

            <section className={`card ${styles.detailsCard}`}>
              <h2>Useful context</h2>
              <ul className="plain-list compact-list">
                <li>The current workflow, product idea, or system problem</li>
                <li>The main constraint or bottleneck</li>
                <li>What success would look like</li>
                <li>Which of the three engagement shapes seems closest right now</li>
              </ul>
            </section>

            <section className={`card ${styles.detailsCard}`}>
              <h2>If you want to browse first</h2>
              <p>
                If you can, include a short workflow map (even bullets), what feels stuck, and what outcome you need.
              </p>
              <Link href="/playbooks" className="text-link build-link">
                Browse playbooks
              </Link>
            </section>
          </div>
        </div>

        <div>
          <section className={`cta-panel ${styles.ctaPanel}`}>
            <h2>Book a working session</h2>
            <p className={styles.ctaCopy}>Fastest way to align on the workflow, constraints, and a sensible next step.</p>
            <div className={styles.ctaActions}>
              <Button href={CONTACT_CALENDLY_URL} variant="primary" target="_blank" rel="noreferrer">
                Book on Calendly
              </Button>
              <Button href={`mailto:${CONTACT_EMAIL}`} variant="secondary">
                Email
              </Button>
              <Button href={CONTACT_LINKEDIN_URL} variant="secondary" target="_blank" rel="noreferrer">
                LinkedIn
              </Button>
            </div>
            <p className={styles.ctaMeta}>
              Prefer async? Email works well. If you send a workflow + constraint, I can respond with a tight
              recommendation.
            </p>
            <div className={styles.divider} aria-hidden="true" />
            <section className={`card ${styles.formWrap}`}>
              <h2>Or send the details</h2>
              <p>
                If you have enough context to share now, send it here. I read every message and reply with either a
                clear next step or a quick “not a fit” to save time.
              </p>
              <div className={styles.formInner}>
                <ContactForm source="contact-page" />
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
