import Link from "next/link";
import { resourcePosts } from "@/content/siteContent";

export default function ResourcesPage() {
  return (
    <section className="section section-top">
      <div className="container">
        <p className="eyebrow">Resources</p>
        <h1>Operator-first guides for AI automation</h1>
        <div className="card-grid">
          {resourcePosts.map((post) => (
            <article className="card" key={post.slug}>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <p className="muted">
                {post.publishedAt} - {post.readingTime}
              </p>
              <Link href={`/resources/${post.slug}`} className="text-link">
                Read Guide
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

