import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { AppShell } from "@/components";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "800"]
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://markzgleason.com"),
  title: {
    default: "Mark Gleason | Operator-led AI systems",
    template: "%s | Mark Gleason"
  },
  description:
    "Operator-led consulting for AI-enabled workflows, marketplace operations, and executable product systems.",
  alternates: { canonical: "/" }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Mark Gleason",
              url: "https://markzgleason.com",
              sameAs: ["https://www.linkedin.com/in/markzgleason", "https://github.com/mzgleason"]
            })
          }}
        />
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  );
}
