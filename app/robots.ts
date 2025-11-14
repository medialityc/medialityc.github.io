import type { MetadataRoute } from "next";

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
