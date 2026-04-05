import { getPageContent } from "@/lib/content";

export default async function AboutPage() {
  const page = await getPageContent("about");

  return (
    <main className="section section-top">
      <div className="container page-intro">
        <p className="eyebrow">About</p>
        <h1>{page.title}</h1>
        <p className="lead">{page.description}</p>
      </div>
      <div className="container prose-shell">
        <article className="prose-content" dangerouslySetInnerHTML={{ __html: page.html }} />
      </div>
    </main>
  );
}
