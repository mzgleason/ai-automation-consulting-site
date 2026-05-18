import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use - markzgleason.com",
  description: "Terms of Use for markzgleason.com, including permitted use, intellectual property, and liability limitations.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  const legalSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Use",
    url: "https://markzgleason.com/terms",
    datePublished: "2026-05-17",
    dateModified: "2026-05-17"
  };

  return (
    <section className="section section-top">
      <div className="container prose">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalSchema) }} />
        <h1>Terms of Use</h1>
        <p>
          <strong>Last updated:</strong> May 17, 2026
        </p>
        <p>Welcome to markzgleason.com. By using this website, you agree to these Terms of Use.</p>

        <h2>1. About this site</h2>
        <p>
          This site shares my work, writing, portfolio projects, case studies, and ways to contact me about
          consulting or professional opportunities.
        </p>
        <p>
          The content is provided for general informational purposes only. It should not be treated as legal,
          financial, technical, or business advice for your specific situation.
        </p>

        <h2>2. Use of the site</h2>
        <p>
          You agree not to use this site in a way that could damage, disable, overload, or interfere with the site or
          its visitors.
        </p>
        <p>
          You also agree not to copy, scrape, misuse, or republish site content in a way that violates intellectual
          property rights or applicable laws.
        </p>

        <h2>3. Intellectual property</h2>
        <p>
          Unless otherwise noted, the content on this site, including text, visuals, design, and portfolio materials,
          belongs to Mark Gleason.
        </p>
        <p>
          You may view and share links to this site for personal or professional reference. You may not copy,
          reproduce, or reuse the content for commercial purposes without written permission.
        </p>

        <h2>4. Portfolio and case study content</h2>
        <p>
          Some work examples may be generalized, anonymized, or simplified to protect confidential business
          information.
        </p>
        <p>
          Any references to past projects are shared to explain the type of work performed, not to disclose private
          company data or promise specific outcomes.
        </p>

        <h2>5. Third-party links</h2>
        <p>
          This site may link to third-party websites, tools, or services. I am not responsible for the content,
          security, privacy practices, or accuracy of those external sites.
        </p>

        <h2>6. No guarantees</h2>
        <p>
          I do my best to keep the site accurate and available, but I do not guarantee that all content will always be
          complete, current, error-free, or uninterrupted.
        </p>
        <p>The site is provided &ldquo;as is&rdquo; without warranties of any kind.</p>

        <h2>7. Limitation of liability</h2>
        <p>
          To the fullest extent allowed by law, I am not liable for any damages that may result from your use of this
          site or reliance on its content.
        </p>

        <h2>8. Changes to these terms</h2>
        <p>
          I may update these Terms of Use from time to time. Any updates will be posted on this page with a new
          &ldquo;Last updated&rdquo; date.
        </p>

        <h2>9. Contact</h2>
        <p>
          If you have questions about these terms, contact me through the contact form or contact method listed on
          this site.
        </p>
        <p>
          <small>Review with legal counsel before relying on this as final legal language.</small>
        </p>
      </div>
    </section>
  );
}

