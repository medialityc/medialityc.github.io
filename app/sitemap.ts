import type { MetadataRoute } from "next";

// For static export compatibility
export const dynamic = "force-static";

// Basic sitemap generator. Extend with dynamic routes if needed.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mdialityc.com";
  const now = new Date();
  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
