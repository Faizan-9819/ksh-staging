import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isNewsPost } from "@/lib/wordpress";

// WordPress webhook — call on post publish/update instead of waiting out the
// fixed ISR TTLs. Configure this URL + REVALIDATE_SECRET as a WP Webhooks
// (or similar plugin) action: POST { secret, slug, categories }.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret, slug, categories } = body || {};

    if (!process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { success: false, error: "Revalidation secret is not configured." },
        { status: 500 },
      );
    }

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ success: false, error: "Invalid secret." }, { status: 401 });
    }

    if (!slug) {
      return NextResponse.json({ success: false, error: "Missing slug." }, { status: 400 });
    }

    const section = isNewsPost(Array.isArray(categories) ? categories : []) ? "news" : "blogs";

    revalidatePath(`/${section}/${slug}`);
    revalidatePath("/blogs");
    revalidatePath("/news");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ success: true, revalidated: [`/${section}/${slug}`, "/blogs", "/news"] });
  } catch (error) {
    console.error("Revalidate webhook error:", error);
    return NextResponse.json({ success: false, error: "Failed to revalidate." }, { status: 500 });
  }
}
