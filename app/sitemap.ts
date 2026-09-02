import type { MetadataRoute } from "next";
import { WORDPRESS_API, isNewsPost } from "@/lib/wordpress";

const SITE_URL = "https://www.kshinfra.com";

// Real public routes under app/ — kept as an explicit, commented list rather
// than derived from the filesystem at request time (Next's route tree isn't
// introspectable at runtime without extra tooling). Audited against app/
// directly; update this list when a page is added, renamed, or removed.
// Excludes: app/park2 (internal template/demo reusing placeholder content),
// app/preview-exterior (internal preview page) — neither is public-facing.
const STATIC_ROUTES: { path: string; priority: number; changefreq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/about-ksh", priority: 0.6, changefreq: "monthly" },
  { path: "/blogs", priority: 0.8, changefreq: "daily" },
  { path: "/careers", priority: 0.5, changefreq: "monthly" },
  { path: "/case-studies", priority: 0.6, changefreq: "monthly" },
  { path: "/case-studies/jabil", priority: 0.5, changefreq: "yearly" },
  { path: "/case-studies/hindalco", priority: 0.5, changefreq: "yearly" },
  { path: "/case-studies/kawasaki", priority: 0.5, changefreq: "yearly" },
  { path: "/case-studies/barnes", priority: 0.5, changefreq: "yearly" },
  { path: "/contact-us", priority: 0.6, changefreq: "monthly" },
  { path: "/investors", priority: 0.5, changefreq: "monthly" },
  { path: "/investors/contact", priority: 0.5, changefreq: "monthly" },
  { path: "/investors/fund-I-details", priority: 0.5, changefreq: "monthly" },
  { path: "/investors/governance", priority: 0.5, changefreq: "monthly" },
  { path: "/investors/institutional-investors", priority: 0.5, changefreq: "monthly" },
  { path: "/parks", priority: 0.6, changefreq: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/solutions", priority: 0.6, changefreq: "monthly" },
  { path: "/sustainability", priority: 0.5, changefreq: "monthly" },
  { path: "/our-team", priority: 0.4, changefreq: "monthly" },
  { path: "/ksh-chakan-i", priority: 0.7, changefreq: "monthly" },
  { path: "/ksh-chakan-ii", priority: 0.7, changefreq: "monthly" },
  { path: "/ksh-chakan-iii", priority: 0.7, changefreq: "monthly" },
  { path: "/ksh-chakan-iv", priority: 0.7, changefreq: "monthly" },
  { path: "/ksh-hosur-i", priority: 0.7, changefreq: "monthly" },
  { path: "/ksh-talegaon-i", priority: 0.7, changefreq: "monthly" },
];

interface SitemapPostEntry {
  slug: string;
  categories: number[];
  lastModified: string;
}

async function fetchAllPostsPaginated(): Promise<SitemapPostEntry[]> {
  const perPage = 31;
  let currentPage = 1;
  let totalPages = 1;
  const posts: SitemapPostEntry[] = [];

  try {
    do {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(
        `${WORDPRESS_API}/posts?per_page=${perPage}&page=${currentPage}`,
        { next: { revalidate: 3600 }, signal: controller.signal },
      );
      clearTimeout(timeout);

      if (!res.ok) {
        console.error(`[sitemap] WordPress fetch failed on page ${currentPage}: ${res.status}`);
        break;
      }

      const pagePosts = await res.json();
      const totalPagesHeader = res.headers.get("X-WP-TotalPages");
      totalPages = parseInt(totalPagesHeader || "1", 10) || totalPages;

      posts.push(
        ...pagePosts.map((post: { slug: string; categories: number[]; modified: string }) => ({
          slug: post.slug,
          categories: post.categories || [],
          lastModified: post.modified ? new Date(post.modified).toISOString() : new Date().toISOString(),
        })),
      );

      currentPage++;
    } while (currentPage <= totalPages);
  } catch (err) {
    console.error("[sitemap] WordPress fetch threw — shipping sitemap with static routes only:", err);
  }

  return posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchAllPostsPaginated();

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const section = isNewsPost(post.categories) ? "news" : "blogs";
    return {
      url: `${SITE_URL}/${section}/${post.slug}`,
      lastModified: post.lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    };
  });

  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));

  return [...staticRoutes, ...postRoutes];
}
