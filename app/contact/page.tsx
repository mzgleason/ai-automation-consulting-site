import { Button } from "@/components/ui/Button";
import { CONTACT_CALENDLY_URL, CONTACT_EMAIL, CONTACT_LINKEDIN_URL } from "@/lib/contact";
import styles from "./ContactPage.module.css";

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7m0-3h20v16H2z"
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

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 382 382" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889 C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806 c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1 s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73 c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079 c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426 c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472 L341.91,330.654L341.91,330.654z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M7 2h2v2h6V2h2v2h2a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h2V2Zm12 8H5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9ZM6 6a1 1 0 0 0-1 1v1h14V7a1 1 0 0 0-1-1H6Z"
      />
    </svg>
  );
}

function WorkflowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect width="8" height="8" x="3" y="3" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 11v4a2 2 0 0 0 2 2h4"
      />
      <rect width="8" height="8" x="13" y="13" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3m13 4 5 5m-5 0 5-5"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 12H3m8 6 6-6-6-6m10-1v14"
      />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main className={`section section-top ${styles.page}`}>
      <div className={`container ${styles.container}`}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Start a conversation</p>
            <h1 className={styles.headline}>Bring the workflow apart.</h1>
            <p className={styles.lead}>
              We&apos;ll walk through the real constraints, pressure test the system, and figure out what&apos;s actually worth
              building.
            </p>
            <Button href={CONTACT_CALENDLY_URL} variant="primary" target="_blank" rel="noreferrer" className={styles.ctaButton}>
              <span className={styles.ctaInner}><CalendarIcon />Pressure-test the workflow</span>
            </Button>
          </div>
          <div className={styles.heroVisual} aria-label="Workflow visual placeholder">
            <div className={styles.placeholderBadge}>Placeholder 1</div>
            <span className={styles.visualChip} style={{ top: "18%", left: "26%" }}>Inputs</span>
            <span className={styles.visualChip} style={{ top: "42%", left: "52%" }}>Decisions</span>
            <span className={styles.visualChip} style={{ top: "65%", left: "32%" }}>Bottlenecks</span>
            <span className={styles.visualChip} style={{ top: "54%", left: "78%" }}>Outputs</span>
          </div>
        </section>

        <section className={styles.proofRow}>
          <div className={styles.proofBlock}>
            <p className={styles.kicker}>Teams usually reach out when</p>
            <ul className={styles.hyphenList}>
              <li>You&apos;ve built something, but it&apos;s not holding up under real use.</li>
              <li>You&apos;re scoping an AI or workflow system and want to get it right before building.</li>
              <li>You need to make a product or system decision with real constraints.</li>
            </ul>
            <p className={styles.proofNote}>Bring a real problem. We&apos;ll work through it.</p>
          </div>
          <div className={styles.proofBlock}>
            <p className={styles.kicker}>What a working session looks like</p>
            <ul className={styles.featureList}>
              <li><span className={styles.featureIcon}><WorkflowIcon /></span><div><strong>Workflow walkthrough</strong><p>We map the current state and stress the weak points.</p></div></li>
              <li><span className={styles.featureIcon}><GridIcon /></span><div><strong>Constraint analysis</strong><p>We identify what&apos;s actually limiting progress.</p></div></li>
              <li><span className={styles.featureIcon}><ArrowIcon /></span><div><strong>Clear recommendations</strong><p>You leave with clarity on what to change, build, or kill.</p></div></li>
            </ul>
            <p className={styles.proofNote}>No pitch. No fluff. Just a practical conversation.</p>
          </div>
        </section>

        <section className={styles.connectRow}>
          <div className={styles.connectBlock}>
            <p className={styles.kicker}>Start a conversation</p>
            <h2 className={styles.subHeadline}>Pick a time that works. We&apos;ll take it from there.</h2>
            <p className={styles.lead}>A focused session to pressure-test the system and find the leverage.</p>
            <Button href={CONTACT_CALENDLY_URL} variant="primary" target="_blank" rel="noreferrer" className={styles.ctaButton}>
              <span className={styles.ctaInner}><CalendarIcon />View availability</span>
            </Button>
          </div>

          <div className={styles.connectBlock}>
            <p className={styles.kicker}>Other ways to connect</p>
            <div className={styles.directLinks}>
              <a className={styles.directLink} href={`mailto:${CONTACT_EMAIL}`}>
                <span className={styles.directIcon}><MailIcon /></span>
                <span className={styles.directText}>Email: {CONTACT_EMAIL}</span>
                <span className={styles.directArrow}><ExternalArrowIcon /></span>
              </a>
              <a className={styles.directLink} href={CONTACT_LINKEDIN_URL} target="_blank" rel="noreferrer">
                <span className={styles.directIcon}><LinkedInIcon /></span>
                <span className={styles.directText}>LinkedIn</span>
                <span className={styles.directArrow}><ExternalArrowIcon /></span>
              </a>
            </div>
          </div>
        </section>

        <section className={styles.quoteBand}>
          <p className={styles.quote}>Good systems don&apos;t break at launch. They break under real use.</p>
          <p className={styles.quoteSub}>Let&apos;s find what&apos;s actually broken.</p>
        </section>
      </div>
    </main>
  );
}
