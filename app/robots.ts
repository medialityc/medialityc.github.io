import type { MetadataRoute } from "next";

// For static export compatibility
export const dynamic = "force-static";

// Next.js App Router robots configuration
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://mdialityc.com/sitemap.xml",
  };
}
