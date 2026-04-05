import Link from "next/link";
import { formatDisplayDate, getPosts, getWritingKinds } from "@/lib/content";

function getWritingLinkLabel(kind: string) {
  if (kind === "Essay") return "Read essay";
  if (kind === "Case study") return "Read case study";
  return "Read note";
}

function getWritingCollectionLabel(kind: string) {
  if (kind === "Essay") return "More essays";
  if (kind === "Case study") return "More case studies";
  return "More notes";
}

export default async function WritingPage({
  searchParams
}: {
  searchParams: Promise<{ kind?: string | string[] }>;
}) {
  const [posts, kinds, params] = await Promise.all([getPosts(), getWritingKinds(), searchParams]);
  const requestedKind = Array.isArray(params.kind) ? params.kind[0] : params.kind;
  const activeKind = requestedKind && kinds.includes(requestedKind) ? requestedKind : "All";
  const filteredPosts = activeKind === "All" ? posts : posts.filter((post) => post.kind === activeKind);
  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const featuredLead = featuredPosts[0] ?? filteredPosts[0];
  const supportingFeatured = filteredPosts
    .filter((post) => post.slug !== featuredLead?.slug)
    .slice(0, 2);
  const recentPosts = filteredPosts.filter(
    (post) => post.slug !== featuredLead?.slug && !supportingFeatured.some((entry) => entry.slug === post.slug)
  );

  return (
    <main className="section section-top">
      <div className="container page-intro writing-page-intro">
        <p className="eyebrow">Writing</p>
        <h1>Writing that helps buyers think more clearly about AI systems</h1>
        <p className="lead">
          Notes, essays, and build-backed perspective for teams deciding what to shape, what to automate, and what is
          actually worth shipping.
        </p>
      </div>

      <div className="container filter-row writing-filter-row">
        <Link href="/writing" className={`chip project-filter-chip ${activeKind === "All" ? "chip-active" : ""}`}>
          All writing
        </Link>
        {kinds.map((kind) => (
          <Link
            key={kind}
            href={`/writing?kind=${encodeURIComponent(kind)}`}
            className={`chip project-filter-chip ${activeKind === kind ? "chip-active" : ""}`}
          >
            {kind}
          </Link>
        ))}
      </div>

      {featuredLead ? (
        <section className="section section-compact">
          <div className="container">
            <div className="section-head writing-index-head">
              <div>
                <p className="eyebrow">Featured writing</p>
                <h2>{activeKind === "All" ? "Strongest points of view and build lessons" : `${activeKind} highlights`}</h2>
              </div>
            </div>
            <div className="writing-feature-grid">
              <article className="card writing-feature-card writing-feature-primary">
                <div className="card-meta writing-meta writing-feature-meta">
                  <span>{featuredLead.kind}</span>
                  <span>{formatDisplayDate(featuredLead.date)}</span>
                  <span>{featuredLead.readingTime}</span>
                </div>
                <h2>{featuredLead.title}</h2>
                <p className="writing-summary writing-feature-summary">{featuredLead.excerpt}</p>
                <div className="chip-wrap writing-tag-row">
                  {featuredLead.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/writing/${featuredLead.slug}`} className="text-link build-link">
                  {getWritingLinkLabel(featuredLead.kind)}
                </Link>
              </article>

              <div className="writing-feature-stack">
                {supportingFeatured.map((post) => (
                  <article
                    key={post.slug}
                    className={`card writing-card writing-card-${post.kind.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <p className="card-kicker">{post.kind}</p>
                    <h3>{post.title}</h3>
                    <p className="writing-summary">{post.excerpt}</p>
                    <div className="card-meta writing-meta">
                      <span>{formatDisplayDate(post.date)}</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <Link href={`/writing/${post.slug}`} className="text-link build-link">
                      {getWritingLinkLabel(post.kind)}
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section section-compact">
        <div className="container">
          <div className="section-head writing-index-head">
            <div>
              <p className="eyebrow">Recent writing</p>
              <h2>{activeKind === "All" ? "Notes, essays, and case studies" : getWritingCollectionLabel(activeKind)}</h2>
            </div>
          </div>
          <div className="card-grid three writing-grid">
            {recentPosts.map((post) => (
              <article
                key={post.slug}
                className={`card writing-card writing-card-${post.kind.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <p className="card-kicker">{post.kind}</p>
                <h3>{post.title}</h3>
                <p className="writing-summary">{post.excerpt}</p>
                <div className="card-meta writing-meta">
                  <span>{formatDisplayDate(post.date)}</span>
                  <span>{post.readingTime}</span>
                </div>
                <div className="chip-wrap writing-tag-row">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/writing/${post.slug}`} className="text-link build-link">
                  {getWritingLinkLabel(post.kind)}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
