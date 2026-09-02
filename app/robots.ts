import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        "/static/",
        "/server-sitemap.xml",
        "/thank-you",
        "/preview-exterior",
        "/park2",
        "/home",
      ],
    },
    sitemap: "https://www.kshinfra.com/sitemap.xml",
  };
}
