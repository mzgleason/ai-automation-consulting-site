import Link from "next/link";
import styles from "./HomepageClosingSection.module.css";

export function HomepageClosingSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container split">
        <div className={styles.column}>
          <div>
            <p className="eyebrow">Decision point</p>
            <h2 className={styles.headline}>If the workflow is messy and the stakes are real, we should talk.</h2>
          </div>

          <div className={styles.block}>
            <h3>Who this is for</h3>
            <ul className="plain-list compact-list">
              <li>A workflow that eats time, quality, or follow-through every week</li>
              <li>Unclear where AI/automation actually belongs (and where it does not)</li>
              <li>A team shipping, but without a crisp decision surface or measurable leverage</li>
              <li>Need structured choices and a first move—not another deck</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h3>Engagement style</h3>
            <ul className="plain-list compact-list">
              <li>Operator-led: close to the real work, not abstract advice</li>
              <li>Inside decisions: we test, cut scope, and keep what holds</li>
              <li>Fast cycles: prototype or restructure quickly, then iterate</li>
              <li>Practical outcomes: fewer ideas, more usable systems</li>
            </ul>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.block}>
            <h3>How work typically starts</h3>
            <ul className="plain-list compact-list">
              <li>Map the workflow and the decision points that matter</li>
              <li>Find leverage: where clarity, automation, or product shape actually changes outcomes</li>
              <li>Choose the right move: prototype, restructure, automate, or stop</li>
              <li>Ship a tight first version with clear checkpoints and constraints</li>
            </ul>
          </div>

          <div className={`cta-panel ${styles.ctaPanel}`}>
            <h3>Book a working session</h3>
            <p>Walk through the workflow. Get a direct read on fit and the best next step.</p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="button button-accent">
                Book the session
              </Link>
              <Link href="/work-with-me" className="button button-ghost">
                See engagement paths
              </Link>
            </div>
            <p className={styles.microcopy}>I’ll tell you quickly if it’s worth pursuing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

