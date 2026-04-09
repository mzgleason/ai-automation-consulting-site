import Link from "next/link";

const footerLinks = [
  { href: "/projects", label: "Case Studies" },
  { href: "/writing", label: "Insights" },
  { href: "/work-with-me", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" }
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-copy">
          <p className="footer-title">Mark Gleason</p>
          <p className="muted">
            AI consulting for business owners and teams who want to save time, improve service, and make operations run
            better.
          </p>
        </div>
        <ul className="footer-links">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

