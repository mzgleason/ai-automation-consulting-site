import "@/styles/playbook.css";

export function PageShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={className ? `pb-page-shell ${className}` : "pb-page-shell"}>{children}</main>;
}
