"use client";

export function PortfolioHeroScrollCta() {
  const handleClick = () => {
    const offset = Math.round(window.innerHeight * 0.8);
    window.scrollBy({ top: offset, behavior: "smooth" });
  };

  return (
    <button type="button" className="portfolio-hero-scroll" onClick={handleClick}>
      Scroll for more
    </button>
  );
}
