import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// Default OG/Twitter card image for every page that doesn't set its own
// `openGraph.images` (blog/news posts override this via their own
// generateMetadata — see app/(site)/blogs/[slug]/page.tsx and
// app/(site)/news/[slug]/page.tsx, which use the post's own featured image
// instead). Requires the Node runtime (not edge, next/og's default) so
// readFileSync can read the real logo out of public/ at request time.
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  // logom.svg — the black wordmark, matching the site's own beige surfaces
  // (page loader, mobile nav, tooltips all use this same #FBF2E8) instead of
  // a dark-navy background this brand doesn't otherwise use.
  const logoSvg = readFileSync(join(process.cwd(), "public/logom.svg"), "utf-8");
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FBF2E8",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders via Satori, not the DOM; next/image isn't usable here. */}
        <img src={logoSrc} width={490} height={168} alt="" />
      </div>
    ),
    { ...size },
  );
}
