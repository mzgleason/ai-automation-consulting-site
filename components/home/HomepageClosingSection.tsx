import Link from "next/link";
import styles from "./HomepageClosingSection.module.css";
import { Button } from "@/components/ui/Button";

export function HomepageClosingSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container split ${styles.split}`}>
        <div className={styles.column}>
          <div>
            <p className="eyebrow">Decision point</p>
            <h2 className={styles.headline}>If the workflow is messy and the stakes are real, we should talk.</h2>
          </div>

          <p className={styles.processLine}>
            We map the workflow, find the pressure points, and decide what’s actually worth doing.
          </p>
        </div>

        <div className={styles.column}>
          <div className={`cta-panel ${styles.ctaPanel}`}>
            <h3>Book a working session</h3>
            <p className={styles.supportingLine}>I’ll tell you quickly if it’s worth pursuing.</p>
            <div className={styles.ctaActions}>
              <Button href="/contact" variant="primary">
                Book the session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

