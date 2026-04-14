import { Button } from "@/components/ui/Button";
import { getPageContent } from "@/lib/content";
import { CONTACT_CALENDLY_URL, CONTACT_EMAIL, CONTACT_LINKEDIN_URL } from "@/lib/contact";
import styles from "./ContactPage.module.css";

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M4 6.8c0-1.55 1.25-2.8 2.8-2.8h10.4C18.75 4 20 5.25 20 6.8v10.4c0 1.55-1.25 2.8-2.8 2.8H6.8C5.25 20 4 18.75 4 17.2V6.8Zm2.8-.8a.8.8 0 0 0-.8.8v.34l6 3.85 6-3.85V6.8a.8.8 0 0 0-.8-.8H6.8Zm11.2 3.63-5.46 3.5a1 1 0 0 1-1.08 0L6 9.63V17.2c0 .44.36.8.8.8h10.4c.44 0 .8-.36.8-.8V9.63Z"
      />
    </svg>
  );
}

function ExternalArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14 5h5v5h-2V8.41l-7.29 7.3-1.42-1.42 7.3-7.29H14V5ZM5 7a2 2 0 0 1 2-2h4v2H7v10h10v-4h2v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z"
      />
    </svg>
  );
}

export default async function ContactPage() {
  const page = await getPageContent("contact");

  return (
    <main className={`section section-top ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <h1 className={styles.headline}>{page.title}</h1>
            <p className={styles.lead}>{page.description}</p>
          </div>

          <div className={styles.right}>
            <section className={`cta-panel ${styles.ctaPanel}`}>
              <h2 className={styles.panelTitle}>Book a working session</h2>
              <p className={styles.panelLead}>
                We’ll walk through the workflow, pressure test the constraints, and figure out what’s actually worth
                building.
              </p>

              <div className={styles.primaryCtaWrap}>
                <Button
                  href={CONTACT_CALENDLY_URL}
                  variant="primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a working session
                </Button>
              </div>

              <div className={styles.panelDivider} aria-hidden="true" />

              <div className={styles.panelBlock}>
                <p className={styles.panelKicker}>Best for:</p>
                <ul className={styles.panelList}>
                  <li>live workflow walkthroughs</li>
                  <li>non-obvious product/system decisions</li>
                  <li>figuring out if something should be built or killed</li>
                </ul>
              </div>

              <div className={styles.panelDivider} aria-hidden="true" />

              <div className={styles.panelBlock}>
                <p className={styles.panelKicker}>Not ready to book time?</p>
                <div className={styles.directLinks}>
                  <a className={styles.directLink} href={`mailto:${CONTACT_EMAIL}`}>
                    <span className={styles.directIcon} aria-hidden="true">
                      <MailIcon />
                    </span>
                    <span className={styles.directText}>Email: {CONTACT_EMAIL}</span>
                    <span className={styles.directArrow} aria-hidden="true">
                      <ExternalArrowIcon />
                    </span>
                  </a>
                  <a className={styles.directLink} href={CONTACT_LINKEDIN_URL} target="_blank" rel="noreferrer">
                    <span className={styles.directIcon} aria-hidden="true">
                      <ExternalArrowIcon />
                    </span>
                    <span className={styles.directText}>LinkedIn</span>
                    <span className={styles.directArrow} aria-hidden="true">
                      <ExternalArrowIcon />
                    </span>
                  </a>
                </div>
              </div>
            </section>
          </div>

          <section className={`card ${styles.leftCard}`}>
            <h2 className={styles.cardTitle}>Most conversations start here:</h2>
            <ul className={styles.bulletList}>
              <li>You’ve built something, but it’s not holding up under real use</li>
              <li>You’re scoping an AI or workflow system and want to get it right before building</li>
              <li>You need to make a product or system decision with real constraints</li>
            </ul>
            <p className={styles.panelLead}>Bring a real problem. We’ll work through it.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
