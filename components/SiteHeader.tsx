import Link from "next/link";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/industries", label: "Industries" },
  { href: "/locations", label: "Locations" },
  { href: "/case-approach", label: "Case Approach" },
  { href: "/book", label: "Book" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          Iris Automation Consulting
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/book" className="button button-sm button-accent">
          Book Discovery Call
        </Link>
      </div>
    </header>
  );
}