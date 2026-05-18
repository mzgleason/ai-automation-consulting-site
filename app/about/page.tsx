import Image from "next/image";
import type { Metadata } from "next";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "About Mark Gleason, an operator-led builder focused on AI-enabled workflows and operational systems.",
  alternates: { canonical: "/about" }
};

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

function Placeholder({ label, className, imageSrc }: { label: string; className?: string; imageSrc?: string }) {
  return (
    <div className={`${styles.placeholder} ${className ?? ""}`} role="img" aria-label={label}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={label}
          fill
          sizes="(max-width: 1080px) 100vw, 50vw"
          className={styles.placeholderImage}
          priority
        />
      ) : (
        label
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Mark Gleason",
            url: "https://markzgleason.com/about",
            jobTitle: "Operator-led Product Consultant",
            worksFor: { "@type": "Organization", name: "Mark Gleason Consulting" },
            sameAs: ["https://www.linkedin.com/in/markzgleason", "https://github.com/mzgleason"]
          })
        }}
      />
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
          <Placeholder label="placeholder 1" imageSrc="/images/about/placeholder-1.jpg" />
        </div>
      </section>

      <section className={`${styles.band} ${styles.lightBand}`}>
        <div className={styles.mediaCol}>
          <Placeholder label="placeholder 2" imageSrc="/images/about/placeholder-2.jpg" />
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
          <Placeholder label="placeholder 3" imageSrc="/images/about/placeholder-3.jpg" />
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
          <Placeholder label="placeholder 4" className={styles.collageLarge} imageSrc="/images/about/placeholder-4.HEIC" />
          <Placeholder label="placeholder 5" className={styles.collageTopRight} imageSrc="/images/about/placeholder-5.jpg" />
          <Placeholder label="placeholder 6" className={styles.collageBottomRight} imageSrc="/images/about/placeholder-6.jpg" />
        </div>
      </section>

      <section className={`${styles.finalBand}`}>
        <div className={styles.finalInner}>
          <div className={styles.finalLeft}>
            <p className={styles.indexLabel}>05</p>
            <h2>Most people are far more adaptable than they think.</h2>
            <p className={styles.signature}>mzg</p>
          </div>
          <div className={styles.finalRight}>
            <p>I’ve changed directions multiple times in my life.</p>
            <p>Science.</p>
            <p>Consulting.</p>
            <p>Product.</p>
            <p>Automation.</p>
            <p>AI systems.</p>
            <p>None of it happened because I had a perfect plan.</p>
            <p>I just kept learning, adapting, and moving forward.</p>
            <p>Most things are not as complicated as they first appear.</p>
            <p>The people who move fastest are usually the ones willing to figure things out themselves.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
