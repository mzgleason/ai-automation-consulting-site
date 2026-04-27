import { promises as fs } from "fs";
import path from "path";

const root = process.cwd();

type BaseEntry = {
  slug: string;
  title: string;
  description: string;
  html: string;
};

export type PageEntry = BaseEntry;

export type ProjectEntry = BaseEntry & {
  summary: string;
  date: string;
  status: string;
  featured: boolean;
  tags: string[];
  category: string;
  tools: string[];
  outcomes: string[];
  clientType?: string;
  serviceType?: string;
  coverImage?: string;
  heroImage?: string;
  ctaLabel?: string;
  ctaHref?: string;
  link?: string;
  published: boolean;
  problem: string;
  sections: ProjectContentSections;
  metrics: ProjectMetric[];
};

export type ProjectMetric = {
  value: string;
  label: string;
  context?: string;
};

export type ProjectContentSection = {
  heading: string;
  html: string;
};

export type ProjectContentSections = {
  problem?: ProjectContentSection;
  context?: ProjectContentSection;
  approach?: ProjectContentSection;
  system?: ProjectContentSection;
  shipped?: ProjectContentSection;
  results?: ProjectContentSection;
  insights?: ProjectContentSection;
};

export type WritingEntry = BaseEntry & {
  excerpt: string;
  date: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  readingTime: string;
  kind: string;
};

type ParsedFile = {
  data: Record<string, string | string[] | boolean>;
  content: string;
};

function parseValue(value: string): string | boolean {
  if (value === "true") return true;
  if (value === "false") return false;
  return value.replace(/^"(.*)"$/, "$1").trim();
}

function parseFrontmatter(raw: string): ParsedFile {
  if (!raw.startsWith("---")) {
    return { data: {}, content: raw.trim() };
  }

  const lines = raw.split(/\r?\n/);
  const data: Record<string, string | string[] | boolean> = {};
  let index = 1;

  while (index < lines.length && lines[index] !== "---") {
    const line = lines[index];
    const arrayMatch = /^([A-Za-z0-9]+):\s*$/.exec(line);
    const scalarMatch = /^([A-Za-z0-9]+):\s*(.+)$/.exec(line);

    if (arrayMatch) {
      const key = arrayMatch[1];
      const values: string[] = [];
      index += 1;

      while (index < lines.length && /^\s*-\s+/.test(lines[index])) {
        values.push(lines[index].replace(/^\s*-\s+/, "").trim());
        index += 1;
      }

      data[key] = values;
      continue;
    }

    if (scalarMatch) {
      data[scalarMatch[1]] = parseValue(scalarMatch[2]);
    }

    index += 1;
  }

  const content = lines.slice(index + 1).join("\n").trim();
  return { data, content };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineMarkdown(value: string): string {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

function markdownToHtml(markdown: string): string {
  const blocks = markdown.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);

  return blocks
    .map((block) => {
      if (block.startsWith("## ")) {
        return `<h2>${escapeHtml(block.slice(3))}</h2>`;
      }

      if (block.startsWith("### ")) {
        return `<h3>${escapeHtml(block.slice(4))}</h3>`;
      }

      if (/^- /m.test(block)) {
        const items = block
          .split("\n")
          .filter((line) => line.startsWith("- "))
          .map((line) => `<li>${inlineMarkdown(line.slice(2))}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }

      if (/^\d+\. /m.test(block)) {
        const items = block
          .split("\n")
          .filter((line) => /^\d+\. /.test(line))
          .map((line) => `<li>${inlineMarkdown(line.replace(/^\d+\. /, ""))}</li>`)
          .join("");
        return `<ol>${items}</ol>`;
      }

      return `<p>${inlineMarkdown(block)}</p>`;
    })
    .join("");
}

function normalizeSectionHeading(value: string): keyof ProjectContentSections | undefined {
  const normalized = value.trim().toLowerCase();

  if (normalized === "challenge" || normalized === "problem") return "problem";
  if (normalized === "context") return "context";
  if (normalized === "approach") return "approach";
  if (normalized === "system" || normalized === "system / workflow design" || normalized === "workflow design") {
    return "system";
  }
  if (normalized === "what shipped") return "shipped";
  if (normalized === "outcomes" || normalized === "results") return "results";
  if (normalized === "lessons learned" || normalized === "key insights" || normalized === "why this matters") {
    return "insights";
  }

  return undefined;
}

function markdownToProjectSections(markdown: string): ProjectContentSections {
  const sections: ProjectContentSections = {};
  const matches = Array.from(markdown.matchAll(/^##\s+(.+)$/gm));

  matches.forEach((match, index) => {
    const heading = match[1].trim();
    const sectionKey = normalizeSectionHeading(heading);

    if (!sectionKey || sections[sectionKey]) {
      return;
    }

    const contentStart = (match.index ?? 0) + match[0].length;
    const contentEnd = matches[index + 1]?.index ?? markdown.length;
    const sectionMarkdown = markdown.slice(contentStart, contentEnd).trim();

    if (sectionMarkdown.length > 0) {
      sections[sectionKey] = {
        heading,
        html: markdownToHtml(sectionMarkdown)
      };
    }
  });

  return sections;
}

function optionalStringArray(data: ParsedFile["data"], key: string): string[] {
  const value = data[key];
  return Array.isArray(value) ? value : [];
}

function parseProjectMetrics(data: ParsedFile["data"]): ProjectMetric[] {
  const metrics: ProjectMetric[] = [];

  optionalStringArray(data, "metrics").forEach((metric) => {
      const [value, label, context] = metric.split("|").map((part) => part.trim());

      if (value && label) {
        metrics.push(context ? { value, label, context } : { value, label });
      }
    });

  return metrics;
}

const writingKindOrder = ["Essay", "Note", "Build log"];

function normalizeWritingKind(value: string): string {
  const normalized = value.trim().toLowerCase();

  if (normalized === "essay") return "Essay";
  if (normalized === "note") return "Note";
  if (normalized === "build log" || normalized === "build-log" || normalized === "buildlog") return "Build log";

  return value.trim();
}

function scoreRelatedPost(source: WritingEntry, candidate: WritingEntry): number {
  let score = 0;

  if (source.kind === candidate.kind) {
    score += 3;
  }

  if (candidate.featured) {
    score += 1;
  }

  const sharedTags = candidate.tags.filter((tag) => source.tags.includes(tag)).length;
  score += sharedTags * 2;

  return score;
}

async function readCollection(directory: string) {
  const fullPath = path.join(root, "content", directory);
  const files = await fs.readdir(fullPath);

  return Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(fullPath, file), "utf8");
        return parseFrontmatter(raw);
      })
  );
}

function optionalString(data: ParsedFile["data"], key: string): string | undefined {
  const value = data[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function requireString(data: ParsedFile["data"], key: string): string {
  const value = data[key];
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing ${key} in content entry.`);
  }
  return value;
}

function requireStringArray(data: ParsedFile["data"], key: string): string[] {
  const value = data[key];
  if (!Array.isArray(value)) {
    throw new Error(`Missing ${key} array in content entry.`);
  }
  return value;
}

function requireBoolean(data: ParsedFile["data"], key: string): boolean {
  const value = data[key];
  if (typeof value !== "boolean") {
    throw new Error(`Missing ${key} boolean in content entry.`);
  }
  return value;
}

export async function getProjects(): Promise<ProjectEntry[]> {
  const files = await readCollection("projects");

  return files
    .map(({ data, content }) => {
      const summary = requireString(data, "summary");

      return {
        slug: requireString(data, "slug"),
        title: requireString(data, "title"),
        description: summary,
        summary,
        date: requireString(data, "date"),
        status: requireString(data, "status"),
        featured: requireBoolean(data, "featured"),
        tags: requireStringArray(data, "tags"),
        category: requireString(data, "category"),
        tools: requireStringArray(data, "tools"),
        outcomes: requireStringArray(data, "outcomes"),
        clientType: optionalString(data, "clientType"),
        serviceType: optionalString(data, "serviceType"),
        coverImage: optionalString(data, "coverImage"),
        heroImage: optionalString(data, "heroImage"),
        ctaLabel: optionalString(data, "ctaLabel"),
        ctaHref: optionalString(data, "ctaHref"),
        link: optionalString(data, "link"),
        published: requireBoolean(data, "published"),
        problem: requireString(data, "problem"),
        sections: markdownToProjectSections(content),
        metrics: parseProjectMetrics(data),
        html: markdownToHtml(content)
      };
    })
    .filter((project) => project.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getFeaturedProjects(limit = 3) {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, limit);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}

export async function getProjectCategories() {
  const projects = await getProjects();
  return Array.from(new Set(projects.map((project) => project.category))).sort((a, b) => a.localeCompare(b));
}

export async function getPosts(): Promise<WritingEntry[]> {
  const files = await readCollection("writing");

  return files
    .map(({ data, content }) => ({
      slug: requireString(data, "slug"),
      title: requireString(data, "title"),
      description: requireString(data, "excerpt"),
      excerpt: requireString(data, "excerpt"),
      date: requireString(data, "date"),
      tags: requireStringArray(data, "tags"),
      featured: requireBoolean(data, "featured"),
      published: requireBoolean(data, "published"),
      readingTime: requireString(data, "readingTime"),
      kind: normalizeWritingKind(requireString(data, "kind")),
      html: markdownToHtml(content)
    }))
    .filter((post) => post.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getFeaturedPosts(limit = 3) {
  const posts = await getPosts();
  return posts.filter((post) => post.featured).slice(0, limit);
}

export async function getPostBySlug(slug: string) {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getWritingKinds() {
  const posts = await getPosts();

  return Array.from(new Set(posts.map((post) => post.kind))).sort((a, b) => {
    const aIndex = writingKindOrder.indexOf(a);
    const bIndex = writingKindOrder.indexOf(b);

    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

export async function getRelatedPosts(slug: string, limit = 3) {
  const posts = await getPosts();
  const source = posts.find((post) => post.slug === slug);

  if (!source) {
    return [];
  }

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({ post, score: scoreRelatedPost(source, post) }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return b.post.date.localeCompare(a.post.date);
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

export function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

export async function getPageContent(slug: string): Promise<PageEntry> {
  const filePath = path.join(root, "content", "pages", `${slug}.md`);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = parseFrontmatter(raw);

  return {
    slug,
    title: requireString(data, "title"),
    description: requireString(data, "description"),
    html: markdownToHtml(content)
  };
}
