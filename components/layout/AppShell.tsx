"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

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
