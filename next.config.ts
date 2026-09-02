import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "wordpress-819107-5295407.cloudwaysapps.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
    // Next only restricts local image URLs once `localPatterns` is defined
    // AT ALL — leaving it undefined allows every local path by default (see
    // hasLocalMatch in next/dist/shared/lib/match-local-pattern.js: "if the
    // user didn't define localPatterns, we allow all local images"). An
    // earlier version of this file added a `localPatterns` array containing
    // ONLY the /api/wp-image entry below, not realizing that defining the
    // array AT ALL flips it from "no restriction" to "allowlist" — which
    // silently 400'd next/image for every other local asset on the entire
    // site (logos, section images, everything under public/), the "url
    // parameter is not allowed" error reported in production. The `**`
    // entry below restores the original "allow everything local" default
    // explicitly, so this array's only actual effect is adding the
    // wp-image route's query-string exception (still required, separately
    // from remotePatterns, for a local URL that carries a query string —
    // see lib/wordpress.ts's toProxiedImageUrl for why that route exists:
    // WordPress's own host resolves to 127.0.0.1 on the live server, and
    // next/image's SSRF guard refuses to fetch anything resolving to a
    // private IP directly).
    localPatterns: [
      { pathname: "/**" },
      {
        pathname: "/api/wp-image",
      },
    ],
  },
  async headers() {
    return [
      {
        // Every static image/video/font under public/, matched by
        // extension rather than directory — assets live scattered across
        // dozens of public/ subfolders (public/home, public/ParkPage,
        // public/about, ...) with no single common path prefix. Next's
        // default for public/ files is `Cache-Control: public, max-age=0`
        // (revalidate every single request), and .htaccess set no caching
        // headers of its own either — combined, browsers never actually
        // cached these, so every visit re-fetched every video/image from
        // scratch. None of these filenames are content-hashed, so this
        // uses a long max-age + stale-while-revalidate (serves the cached
        // copy instantly, revalidates in the background) rather than
        // `immutable` — replacing a file at the same path without renaming
        // it still eventually reaches visitors, just not on their very
        // next request.
        source: "/:path*.(mp4|webm|mov|jpg|jpeg|png|webp|avif|gif|svg|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Case studies — ported from legacy .htaccess
      { source: "/kawasaki", destination: "/case-studies/kawasaki", permanent: true },
      { source: "/jabil", destination: "/case-studies/jabil", permanent: true },

      // /capabilities was this page's URL briefly during a rename; reverted
      // back to /solutions — redirect so old links/bookmarks still resolve.
      { source: "/capabilities", destination: "/solutions", permanent: true },

      // Talegaon slug change
      { source: "/ksh-talegaon", destination: "/ksh-talegaon-i", permanent: true },

      // Investor Institutional -> Institutional Investors slug change
      {
        source: "/investors/investor-institutional",
        destination: "/investors/institutional-investors",
        permanent: true,
      },

      // Old WordPress permalink structure still floating around search results
      { source: "/category/news", destination: "/blogs?tab=news", permanent: true },
      { source: "/category/blogs", destination: "/blogs", permanent: true },
      { source: "/blogs/page/:num", destination: "/blogs", permanent: true },
      { source: "/category/blogs/page/:num", destination: "/blogs", permanent: true },

      // Singular → plural, in case bookmarked/linked anywhere externally
      { source: "/blog", destination: "/blogs", permanent: true },

      // Old direct PDF links (backlinks / cached search results)
      {
        source: "/wp-content/uploads/2022/12/KSH-Chakan-Park-3-Brochure.pdf",
        destination: "/brochure/KSH-Chakan-Park-3-Brochure.pdf",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/2022/12/KSH-Infra-Chakan-Park-2-Brochure.pdf",
        destination: "/brochure/KSH-Infra-Chakan-Park-2-Brochure.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
