import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const paths = ["/", "/about", "/services", "/process", "/pricing", "/book", "/track", "/certificate", "/locations", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1.0 : 0.8,
  }));
}
