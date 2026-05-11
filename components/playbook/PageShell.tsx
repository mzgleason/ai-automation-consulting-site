import "@/styles/playbook.css";

export function PageShell({ children }: { children: React.ReactNode }) {
  return <main className="pb-page-shell">{children}</main>;
}
