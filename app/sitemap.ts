import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";

const siteUrl = "https://markzgleason.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/about", "/contact", "/playbooks", "/portfolio", "/privacy", "/terms"];
  const projects = await getProjects();
  const projectRoutes = projects
    .filter((project) => project.slug !== "pdpTemp")
    .map((project) => `/portfolio/${project.slug}`);

  const allRoutes = [...staticRoutes, ...projectRoutes];

  return allRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route.startsWith("/portfolio/") || route.startsWith("/playbooks/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route === "/portfolio" ? 0.9 : 0.8,
    lastModified: new Date()
  }));
}
