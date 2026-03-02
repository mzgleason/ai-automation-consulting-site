"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function TrackableButton({
  href,
  label,
  location,
  variant = "accent"
}: {
  href: string;
  label: string;
  location: string;
  variant?: "accent" | "ghost";
}) {
  return (
    <Link
      href={href}
      className={`button ${variant === "accent" ? "button-accent" : "button-ghost"}`}
      onClick={() => trackEvent("cta_click", { location, cta_type: label })}
    >
      {label}
    </Link>
  );
}

