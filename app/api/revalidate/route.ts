import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { WP_POSTS_TAG } from "@/lib/wordpress";

// WordPress webhook — call on post publish/update/trash instead of waiting out
// the ISR window. Configure this URL + REVALIDATE_SECRET as a WP Webhooks
// (or similar plugin) action: POST { secret }. Any other fields (slug,
// categories) are ignored. Expiring the shared posts tag refreshes every page
// that shows post data — /blogs, /news, the home page, post pages' related
// lists, the sitemap — not just a hand-picked list of paths.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret } = body || {};

    if (!process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { success: false, error: "Revalidation secret is not configured." },
        { status: 500 },
      );
    }

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ success: false, error: "Invalid secret." }, { status: 401 });
    }

    // expire: 0 makes the next visit wait for fresh data. The recommended
    // "max" profile would serve the stale copy once more first — after a slug
    // edit, that copy still links the old (now 404) URL.
    revalidateTag(WP_POSTS_TAG, { expire: 0 });

    return NextResponse.json({ success: true, revalidated: [WP_POSTS_TAG] });
  } catch (error) {
    console.error("Revalidate webhook error:", error);
    return NextResponse.json({ success: false, error: "Failed to revalidate." }, { status: 500 });
  }
}
