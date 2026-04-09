"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideSiteChrome = pathname.startsWith("/experiments/foundry-home");

  return (
    <>
      {hideSiteChrome ? null : <SiteHeader />}
      {children}
      {hideSiteChrome ? null : <SiteFooter />}
    </>
  );
}
