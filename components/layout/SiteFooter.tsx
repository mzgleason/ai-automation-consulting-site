import Link from "next/link";

const footerLinks = [
  { href: "/projects", label: "Case Studies" },
  { href: "/playbooks", label: "Playbooks" },
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
            Operator-led product consulting for teams improving strategy, systems, and workflows—with selective AI
            automation where it fits.
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

