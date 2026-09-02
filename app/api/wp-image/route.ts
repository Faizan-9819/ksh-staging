import { NextResponse } from "next/server";
import { WORDPRESS_URL } from "@/lib/wordpress";

export const runtime = "nodejs";

// On the live Cloudways deployment, DNS for WORDPRESS_URL's host resolves to
// 127.0.0.1 — the WordPress site and this Next.js app share the same
// Cloudways account/server, and Cloudways' own DNS routes their subdomains
// to loopback when queried from another app on that same account. next/image
// refuses to fetch any upstream URL that resolves to a private/loopback IP
// (its built-in SSRF guard), which surfaced as every blog/post image on the
// live site 400ing with "url parameter is not allowed" while working fine
// locally (a normal machine resolves that domain via public DNS instead).
//
// Routing through this server-side proxy sidesteps that: a plain `fetch()`
// here has no such restriction, so it can reach the image over that same
// loopback path just fine — then next/image is pointed at THIS route's URL
// (always same-origin) instead of the WordPress URL directly, so its guard
// never has anything to reject.
//
// Only ever proxies WORDPRESS_URL's own /wp-content/uploads/ media — never
// an arbitrary caller-supplied host — so this can't become an open SSRF
// relay itself.
export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path");
  if (!path || !path.startsWith("/wp-content/uploads/")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${WORDPRESS_URL}${path}`, {
      next: { revalidate: 3600 },
    });
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: "Upstream image fetch failed" },
        { status: 502 },
      );
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Upstream image fetch failed" },
      { status: 502 },
    );
  }
}
