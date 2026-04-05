import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDisplayDate, getPostBySlug, getPosts, getRelatedPosts } from "@/lib/content";

function getWritingUseCase(kind: string) {
  if (kind === "Essay") {
    return "Buyer-facing perspective for teams deciding what is actually worth building with AI.";
  }

  if (kind === "Case study") {
    return "Operator lessons drawn from real systems, handoffs, and delivery quality bars.";
  }

  return "Shorter field notes for teams tightening product, workflow, and implementation decisions.";
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function WritingDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([getPostBySlug(slug), getRelatedPosts(slug, 3)]);

  if (!post) {
    notFound();
  }

  return (
    <main className="section section-top">
      <div className="container detail-hero writing-detail-hero">
        <Link href="/writing" className="text-link">
          Back to writing
        </Link>
        <p className="eyebrow">{post.kind}</p>
        <h1>{post.title}</h1>
        <p className="lead writing-detail-lead">{post.excerpt}</p>
        <div className="detail-meta-strip writing-detail-meta">
          <span>{formatDisplayDate(post.date)}</span>
          <span>{post.readingTime}</span>
          <span>{post.kind}</span>
        </div>
        <div className="chip-wrap writing-tag-row">
          {post.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="container detail-grid writing-detail-grid">
        <aside className="detail-sidebar writing-sidebar">
          <div className="card writing-sidebar-card">
            <p className="card-kicker">Why this piece exists</p>
            <p className="writing-sidebar-copy">{getWritingUseCase(post.kind)}</p>
            <div className="hero-actions writing-sidebar-actions">
              <Link href="/contact" className="button button-accent button-sm">
                Start a conversation
              </Link>
              <Link href="/projects" className="button button-ghost button-sm">
                View case studies
              </Link>
            </div>
          </div>

          {relatedPosts.length > 0 ? (
            <div className="card writing-sidebar-card related-posts">
              <p className="card-kicker">Related posts</p>
              <div className="related-post-list">
                {relatedPosts.map((entry) => (
                  <article key={entry.slug} className="related-post-item">
                    <p className="related-post-kind">{entry.kind}</p>
                    <h2>{entry.title}</h2>
                    <p>{entry.excerpt}</p>
                    <div className="card-meta writing-meta">
                      <span>{formatDisplayDate(entry.date)}</span>
                      <span>{entry.readingTime}</span>
                    </div>
                    <Link href={`/writing/${entry.slug}`} className="text-link build-link">
                      Keep reading
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </aside>

        <div className="writing-article-shell">
          <article className="prose-content card writing-article" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    </main>
  );
}
