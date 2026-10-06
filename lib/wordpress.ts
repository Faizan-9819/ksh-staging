// Shared WordPress REST API contract for blog/news content.
// This is the live CMS backing the current site — do not change this host.
export const WORDPRESS_URL = "https://wordpress-819107-5295407.cloudwaysapps.com";
export const WORDPRESS_API = `${WORDPRESS_URL}/wp-json/wp/v2`;

// Category IDs are real, live WordPress data — posts carry one pair or the
// other depending on when they were created. Both pairs must keep being checked.
export const BLOG_CATEGORY_IDS = [6, 17];
export const NEWS_CATEGORY_IDS = [7, 18];

// Every post fetch shares one cache tag and one revalidate window. They used
// to differ — listings at 900s, the single-post lookup at 60s — so after a
// slug was edited in WordPress, /blogs/new-slug resolved within a minute while
// the /blogs listing kept linking the old slug (now a 404) for 15+ minutes.
// app/api/revalidate expires WP_POSTS_TAG on publish/update, so every page
// showing post data refreshes on its next visit; the window is the backstop
// for when that webhook doesn't fire.
export const WP_POSTS_TAG = "wp-posts";
const POSTS_CACHE = { revalidate: 120, tags: [WP_POSTS_TAG] };

export interface WPRenderedField {
  rendered: string;
}

export interface WPYoastHeadJson {
  title?: string;
  description?: string;
}

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  categories: number[];
  title: WPRenderedField;
  excerpt: WPRenderedField;
  content: WPRenderedField;
  yoast_head_json?: WPYoastHeadJson;
  featured_media?: number;
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string }[];
  };
}

export interface WPPostWithImage extends WPPost {
  featuredImage: string;
}

export function isNewsPost(categories: number[]): boolean {
  return categories.some((id) => NEWS_CATEGORY_IDS.includes(id));
}

export function isBlogPost(categories: number[]): boolean {
  return categories.some((id) => BLOG_CATEGORY_IDS.includes(id));
}

export function postPath(post: Pick<WPPost, "categories" | "slug">): string {
  const section = isNewsPost(post.categories) ? "news" : "blogs";
  return `/${section}/${post.slug}`;
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

// On the live Cloudways deployment, WORDPRESS_URL's host resolves to
// 127.0.0.1 — WordPress and this app share the same Cloudways account/
// server, and Cloudways' own DNS routes their subdomains to loopback when
// queried from another app on that same account. next/image refuses to
// fetch any upstream URL that resolves to a private/loopback IP (its
// built-in SSRF guard), which made every blog/post image 400 in production
// while working fine locally (a normal machine resolves that domain via
// public DNS instead, never hitting loopback). Rewriting every WordPress
// media URL to route through app/api/wp-image/route.ts — a server-side
// proxy that fetches with plain `fetch()` (no such restriction) — sidesteps
// that: next/image only ever sees a same-origin /api/wp-image URL, so its
// guard has nothing to reject.
function toProxiedImageUrl(sourceUrl: string): string {
  if (!sourceUrl.startsWith(WORDPRESS_URL)) return sourceUrl;
  const path = sourceUrl.slice(WORDPRESS_URL.length);
  return `/api/wp-image?path=${encodeURIComponent(path)}`;
}

/** Resolves the featured image, with the same fallback chain the live site uses. */
export async function resolveFeaturedImage(post: WPPost): Promise<string> {
  const embedded = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (embedded) return toProxiedImageUrl(embedded);

  if (post.featured_media) {
    try {
      const res = await fetchWithTimeout(`${WORDPRESS_API}/media/${post.featured_media}`, {
        next: POSTS_CACHE,
      });
      if (res.ok) {
        const media = await res.json();
        if (media?.source_url) return toProxiedImageUrl(media.source_url as string);
      }
    } catch {
      // fall through to default
    }
  }

  return "/default-image.jpg";
}

/** Fetch a single post by slug, with featured image resolved. Returns null on any failure or 404. */
export async function fetchPostBySlug(slug: string): Promise<WPPostWithImage | null> {
  try {
    const res = await fetchWithTimeout(
      `${WORDPRESS_API}/posts?slug=${encodeURIComponent(slug)}&_embed`,
      { next: POSTS_CACHE },
    );
    if (!res.ok) return null;

    const data: WPPost[] = await res.json();
    if (!data.length) return null;

    const post = data[0];
    const featuredImage = await resolveFeaturedImage(post);
    return { ...post, featuredImage };
  } catch {
    return null;
  }
}

// Large _embed queries (fetchAllPosts/fetchPostsPage) return every post's
// featured-media object inline and have been observed taking ~9s against
// the live WordPress instance — well past a "fast lookup" timeout.
const BULK_FETCH_TIMEOUT_MS = 15000;

/** Fetch all posts (paginated up to `perPage`), embedding featured media. Returns [] on failure. */
export async function fetchAllPosts(perPage = 100): Promise<WPPost[]> {
  try {
    const res = await fetchWithTimeout(
      `${WORDPRESS_API}/posts?_embed&per_page=${perPage}`,
      { next: POSTS_CACHE },
      BULK_FETCH_TIMEOUT_MS,
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

/** Fetch one page of posts for the blog list, embedding featured media. */
export async function fetchPostsPage(page: number, perPage = 31): Promise<WPPost[]> {
  try {
    const res = await fetchWithTimeout(
      `${WORDPRESS_API}/posts?per_page=${perPage}&page=${page}&_embed`,
      { next: POSTS_CACHE },
      BULK_FETCH_TIMEOUT_MS,
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// WordPress ORs comma-separated category IDs, so this asks the server to do the
// category filtering that fetchAllPosts() callers were doing client-side after
// downloading every post's embedded media — a much smaller, faster response.
/** Fetch posts filtered by category IDs (matches any), embedding featured media. Returns [] on failure. */
export async function fetchPostsByCategories(categoryIds: number[], perPage = 100): Promise<WPPost[]> {
  try {
    const res = await fetchWithTimeout(
      `${WORDPRESS_API}/posts?categories=${categoryIds.join(",")}&_embed&per_page=${perPage}`,
      { next: POSTS_CACHE },
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

/** SEO metadata source: Yoast precomputed fields, falling back to raw title / stripped excerpt. */
export function resolveMeta(post: WPPost) {
  const title = post.yoast_head_json?.title || post.title.rendered;
  const description =
    post.yoast_head_json?.description ||
    post.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ||
    "Read the latest insights from KSH INFRA.";
  return { title, description };
}

/** Strips WordPress' stray empty/whitespace-only tags left over from &nbsp;-only paragraphs. */
export function cleanPostHtml(html: string): string {
  if (!html) return "";
  let cleaned = html;
  cleaned = cleaned.replace(/(&nbsp;| )+/g, " ");
  cleaned = cleaned.replace(/<(\w+)([^>]*)>\s*<\/\1>/g, "");
  cleaned = cleaned.replace(/<(\w+)([^>]*)>\s+<\/\1>/g, "");
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, "");
  // Site-wide lazy-loading is disabled — WordPress bakes loading="lazy" (or
  // loading='lazy' / loading=lazy) directly into <img> tags inside post
  // body HTML, so it can't be controlled via a next/image prop like the
  // rest of the site. Strip it here so every body image loads eagerly too.
  cleaned = cleaned.replace(/\s+loading=["']?lazy["']?/gi, "");
  return cleaned;
}

// Fixed display order for specific News posts, requested independent of
// publish date. Each post is matched against a short, distinctive keyword
// from its title (case-insensitive, tags stripped); anything that doesn't
// match keeps its existing relative order, appended after the pinned ones.
const PINNED_NEWS_KEYWORDS = [
  "aif",
  "sriperumbudur",
  "bengaluru",
  "indospace",
  "mapletree",
  "morgan stanley",
];

export function sortPinnedNews<T extends WPPost>(posts: T[]): T[] {
  return posts
    .map((post, index) => {
      const title = post.title.rendered.replace(/<[^>]+>/g, "").toLowerCase();
      const pinnedRank = PINNED_NEWS_KEYWORDS.findIndex((keyword) => title.includes(keyword));
      return { post, rank: pinnedRank === -1 ? PINNED_NEWS_KEYWORDS.length + index : pinnedRank };
    })
    .sort((a, b) => a.rank - b.rank)
    .map((entry) => entry.post);
}

export function formatPostDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
