"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./SiteHeader.module.css";

type NavItem = {
  href: string;
  label: string;
  matchPrefixes: string[];
  mobileFullWidth?: boolean;
};

const navItems: NavItem[] = [
  { href: "/projects", label: "Case Studies", matchPrefixes: ["/projects"] },
  { href: "/playbooks", label: "Playbooks", matchPrefixes: ["/playbooks"] },
  { href: "/about", label: "About", matchPrefixes: ["/about"] },
  { href: "/contact", label: "Contact", matchPrefixes: ["/contact"], mobileFullWidth: true }
];

const DESKTOP_BREAKPOINT = 981;
const SCROLL_THRESHOLD = 50;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isItemActive(pathname: string, item: NavItem) {
  return item.matchPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function HeaderCorners() {
  return (
    <span className={styles.corners} aria-hidden="true">
      <span className={styles.cornerTl} />
      <span className={styles.cornerTr} />
      <span className={styles.cornerBl} />
      <span className={styles.cornerBr} />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const lastScrollY = useRef(0);
  const viewportHeight = useRef(0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [indicator, setIndicator] = useState({ width: 0, offset: 0, visible: false });

  const activeIndex = useMemo(() => navItems.findIndex((item) => isItemActive(pathname, item)), [pathname]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const syncIndicator = (index: number | null) => {
      if (index === null || index < 0) {
        setIndicator((current) => (current.visible ? { ...current, visible: false } : current));
        return;
      }

      const node = itemRefs.current[index];
      if (!node) {
        return;
      }

      setIndicator({
        width: node.offsetWidth,
        offset: node.offsetLeft,
        visible: true
      });
    };

    syncIndicator(hoveredIndex ?? activeIndex);

    const handleResize = () => {
      viewportHeight.current = window.innerHeight;
      syncIndicator(hoveredIndex ?? activeIndex);

      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex, hoveredIndex]);

  useEffect(() => {
    viewportHeight.current = window.innerHeight;
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (isMenuOpen) {
        return;
      }

      const currentScrollY = window.scrollY;
      const pastQuarterViewport = currentScrollY > viewportHeight.current / 4;
      const pastFullViewport = currentScrollY > viewportHeight.current;
      const scrollDelta = currentScrollY - lastScrollY.current;
      const scrollingDown = scrollDelta > SCROLL_THRESHOLD;
      const scrollingUp = scrollDelta < -SCROLL_THRESHOLD;

      setIsScrolled(pastQuarterViewport);

      if (pastFullViewport) {
        if (scrollingDown) {
          setIsHidden(true);
        } else if (scrollingUp) {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }

      if (Math.abs(scrollDelta) > SCROLL_THRESHOLD) {
        lastScrollY.current = currentScrollY;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsHidden(false);
    setHoveredIndex(null);
    lastScrollY.current = 0;
  }, [pathname]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      setIsHidden(false);
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const stickyVisible = isMenuOpen || isScrolled;

  const renderHeaderShell = ({
    variant,
    scrolled,
    hidden
  }: {
    variant: "rail" | "sticky";
    scrolled: boolean;
    hidden: boolean;
  }) => (
    <header
      className={variant === "sticky" ? styles.stickyHeader : styles.railHeader}
      data-variant={variant}
      data-hydrated={isHydrated ? "true" : undefined}
      data-hidden={hidden ? "true" : undefined}
      data-menu-open={isMenuOpen ? "true" : undefined}
      data-scrolled={scrolled ? "true" : undefined}
      data-visible={variant === "sticky" && stickyVisible ? "true" : undefined}
      aria-hidden={
        variant === "rail"
          ? stickyVisible
            ? "true"
            : undefined
          : stickyVisible
            ? undefined
            : "true"
      }
    >
      <div className={styles.frame}>
        <div className={cx("container", styles.headerContainer)}>
          <div className={styles.shell}>
            <Link
              href="/"
              className={styles.brand}
              aria-label="Mark Z Gleason home"
              onBlur={() => setHoveredIndex(null)}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.brandFull}>Mark Z Gleason</span>
              <span className={styles.brandCompact} aria-hidden="true">
                MZG
              </span>
            </Link>

            <nav className={styles.nav} aria-label="Primary">
              <div className={styles.navTrack}>
                <ul className={styles.navList} onMouseLeave={() => setHoveredIndex(null)}>
                  {navItems.map((item, index) => {
                    const isActive = activeIndex === index;

                    return (
                      <li
                        key={`${variant}-${item.href}`}
                        ref={(node) => {
                          itemRefs.current[index] = node;
                        }}
                        className={styles.navItem}
                        onMouseEnter={() => setHoveredIndex(index)}
                      >
                        <Link
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cx(styles.navLink, isActive && styles.navLinkActive)}
                          onBlur={() => setHoveredIndex(null)}
                          onFocus={() => setHoveredIndex(index)}
                        >
                          <span className={styles.navText}>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div
                  className={cx(styles.navHighlight, indicator.visible && styles.navHighlightVisible)}
                  style={{
                    width: indicator.visible ? `${indicator.width}px` : undefined,
                    transform: `translateX(${indicator.offset}px)`
                  }}
                >
                  <HeaderCorners />
                </div>
              </div>
            </nav>

            <button
              type="button"
              className={styles.mobileToggle}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-panel"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className={styles.mobileToggleCore} />
              <HeaderCorners />
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  return (
    <>
      <div className={styles.rail}>
        {renderHeaderShell({ variant: "rail", scrolled: false, hidden: false })}
      </div>

      {renderHeaderShell({ variant: "sticky", scrolled: stickyVisible, hidden: stickyVisible && isHidden })}

      {isMenuOpen ? (
        <div className={styles.mobileBackdrop} onClick={() => setIsMenuOpen(false)}>
          <div className={cx("container", styles.mobileFrame)}>
            <div id="mobile-nav-panel" className={styles.mobilePanel} onClick={(event) => event.stopPropagation()}>
              <ul className={styles.mobileGrid}>
                {navItems.map((item) => {
                  const isActive = isItemActive(pathname, item);

                  return (
                    <li key={item.href} className={cx(styles.mobileItem, item.mobileFullWidth && styles.mobileItemFull)}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cx(styles.mobileLink, isActive && styles.mobileLinkActive)}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className={styles.mobileLinkLabel}>{item.label}</span>
                        <HeaderCorners />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
