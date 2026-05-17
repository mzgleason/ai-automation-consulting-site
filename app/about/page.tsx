import styles from "./about.module.css";

const principles = [
  {
    title: "Learn Fast",
    body: "I care less about credentials and more about adaptability."
  },
  {
    title: "Own the Outcome",
    body: "I naturally operate end-to-end. Strategy means very little without execution."
  },
  {
    title: "Build Real Things",
    body: "I learn best by shipping, testing, and refining in the real world."
  },
  {
    title: "Stay Curious",
    body: "Whether it's AI systems, marketplaces, or hiking trails, curiosity drives almost everything I do."
  }
];

function Placeholder({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`${styles.placeholder} ${className ?? ""}`} role="img" aria-label={label}>
      {label}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <section className={`${styles.band} ${styles.heroBand}`}>
        <div className={styles.contentCol}>
          <p className={styles.sectionLabel}>About Me</p>
          <h1>I’ve always been obsessed with systems.</h1>
          <div className={styles.copyStack}>
            <p>Not just software systems.</p>
            <p>Business systems. Human systems. Operational systems. Learning systems.</p>
            <p>I like understanding how things work underneath the surface.</p>
            <p>Today I build products, workflows, automations, and operational tools.</p>
          </div>
        </div>
        <div className={styles.mediaCol}>
          <Placeholder label="placeholder 1" />
        </div>
      </section>

      <section className={`${styles.band} ${styles.lightBand}`}>
        <div className={styles.mediaCol}>
          <Placeholder label="placeholder 2" />
        </div>
        <div className={styles.contentCol}>
          <p className={styles.indexLabel}>01</p>
          <h2>I thought I was going to spend my life in science.</h2>
          <div className={styles.copyStack}>
            <p>I studied biochemistry because I loved understanding how complex systems behaved.</p>
            <p>There was something addictive about patterns, structure, constraints, and problem solving.</p>
            <p>Eventually I realized I wanted a life spent building, solving, and shipping.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.darkBand}`}>
        <div className={styles.contentCol}>
          <p className={styles.indexLabel}>02</p>
          <h2>My career started with a reporting tool and a spreadsheet.</h2>
          <div className={styles.copyStack}>
            <p>My dad spent his life building businesses. I saw that up close.</p>
            <p>Growing up around that environment changed how I saw work.</p>
            <p>I started freelancing, then consulting, then building products.</p>
            <p>The specific tools matter less than the ability to learn quickly and adapt.</p>
          </div>
        </div>
        <div className={styles.mediaCol}>
          <Placeholder label="placeholder 3" />
        </div>
      </section>

      <section className={`${styles.principlesBand}`}>
        <div className={styles.principlesInner}>
          <p className={styles.indexLabel}>03</p>
          <h2>How I work.</h2>
          <div className={styles.principlesGrid}>
            {principles.map((principle, index) => (
              <article key={principle.title} className={styles.principleCard}>
                <span className={styles.principleIcon} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.lightBand}`}>
        <div className={styles.contentCol}>
          <p className={styles.indexLabel}>04</p>
          <h2>Outside of work, I try to stay close to the real world.</h2>
          <div className={styles.copyStack}>
            <p>I love hiking. I love Colorado. My wife and I are moving there soon.</p>
            <p>Some of my favorite moments are disconnected from screens.</p>
            <p>Real life slows you down enough to notice what actually matters.</p>
          </div>
        </div>
        <div className={styles.collage}>
          <Placeholder label="placeholder 4" className={styles.collageLarge} />
          <Placeholder label="placeholder 5" className={styles.collageTopRight} />
          <Placeholder label="placeholder 6" className={styles.collageBottomRight} />
        </div>
      </section>

      <section className={`${styles.finalBand}`}>
        <div className={styles.finalInner}>
          <div className={styles.finalLeft}>
            <p className={styles.indexLabel}>05</p>
            <h2>What I care about most now is helping people realize they can reinvent themselves.</h2>
            <p className={styles.signature}>mzg</p>
          </div>
          <div className={styles.finalRight}>
            <p>You do not need permission to learn something new.</p>
            <p>You do not need the perfect background.</p>
            <p>You do not need to stay inside the lane you started in.</p>
            <p>Technology changes quickly. The people who win are usually the ones willing to learn faster.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
