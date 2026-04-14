import styles from "./HomepageClosingSection.module.css";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/lib/contact";

export function HomepageClosingSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container split ${styles.split}`}>
        <div className={styles.column}>
          <div>
            <p className="eyebrow">Decision point</p>
            <h2 className={styles.headline}>
              If you’re working through a messy workflow or a real product decision, I’ll take a look.
            </h2>
          </div>

          <p className={styles.processLine}>
            We’ll walk through the workflow, pressure test the constraints, and decide what’s actually worth building
            (or what to kill).
          </p>
        </div>

        <div className={styles.column}>
          <div className={`cta-panel ${styles.ctaPanel}`}>
            <h3>Book a working session</h3>
            <p className={styles.supportingLine}>
              Walk through the workflow. Pressure test constraints. Leave with a clean next step.
            </p>
            <div className={styles.ctaActions}>
              <Button href="/contact" variant="primary">
                Pressure-test the workflow
              </Button>
            </div>

            <p className={styles.supportingLine}>
              Not ready to book time?{" "}
              <a className="text-link" href={`mailto:${CONTACT_EMAIL}`}>
                Send a note
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
