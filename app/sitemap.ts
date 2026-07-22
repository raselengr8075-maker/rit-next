import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://raselinnovation.com";

  const routes = [
    "",
    "/about",
    "/achievements",
    "/apps",
    "/contact",
    "/divisions",
    "/founder",
    "/gallery",
    "/media",
    "/news",
    "/partners",
    "/privacy",
    "/projects",
    "/research",
    "/resources",
    "/search",
    "/services",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}