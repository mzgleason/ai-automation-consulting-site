import { getPageContent } from "@/lib/content";

export default async function PlaybooksPage() {
  const page = await getPageContent("playbooks");

  return (
    <main className="section section-top">
      <div className="container page-intro">
        <p className="eyebrow">Playbooks</p>
        <h1>{page.title}</h1>
        <p className="lead">{page.description}</p>
      </div>
      <div className="container prose-shell">
        <article className="prose-content" dangerouslySetInnerHTML={{ __html: page.html }} />
      </div>
    </main>
  );
}

