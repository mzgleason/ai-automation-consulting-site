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
  metadataBase: new URL("https://markgleason.ai"),
  title: {
    default: "Mark Gleason | Builder-led AI systems",
    template: "%s | Mark Gleason"
  },
  description:
    "Builder-led site for AI workflows, prototypes, product systems, and practical writing about turning ideas into systems that ship.",
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
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  );
}
