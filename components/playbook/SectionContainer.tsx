export function SectionContainer({ children }: { children: React.ReactNode }) {
  return (
    <section className="pb-section">
      <div className="pb-main">{children}</div>
    </section>
  );
}
