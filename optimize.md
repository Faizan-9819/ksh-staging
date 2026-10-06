# KSH INFRA — Vercel Cost & Performance Optimization Plan

Written 2026-09-02, ahead of migrating this Next.js 16 app (previously running on a
Cloudways VPS via PM2) to Vercel. Updated same day after real traffic numbers were
confirmed and a first cleanup pass landed — see the REQUIRED/NOT REQUIRED table
below before reading anything else in this file.

## Confirmed traffic: 72,000 visits/year (~197/day) — READ THIS FIRST

Real bandwidth math against this site's actual measured page weight (worst case:
every visit a first-time desktop visitor hitting the video-heavy homepage) puts
72,000 visits/year at roughly **4.6TB/year ≈ 384GB/month** — comfortably under
Vercel Pro's 1TB/month included Fast Data Transfer, with real margin to spare even
in the worst case. **At this traffic level, this site stays at the flat $20/month
with zero further work.** That changes which sections below are load-bearing
(actually required to hit $20/mo) versus nice-to-have (speed/margin for future
growth, not needed to hit the budget today).

| # | Item | Status | Required at 72K/yr? |
|---|---|---|---|
| — | Remove unused videos/scripts/PM2 config from repo | **Done** (this session) | — |
| — | Reorganize homepage assets into `public/homeasset/`, fix all paths | **Done** (this session) | — |
| 1 | Move media (video/PDF) off Vercel to R2/CDN | Not done — still 100% on Vercel | **Not required** at this volume. Worth doing later for margin/speed as traffic grows past ~250K-500K/yr, not urgent now. |
| 2 | Remove/verify the `wp-image` Node proxy | Not done — proxy still active | Not required for the $20 cap at this volume (low Function-invocation cost at ~200 visits/day), but cheap to do and removes needless latency — do when convenient. |
| 3 | Lean WordPress `_embed` fetches | Not done | Not required at this volume — do opportunistically if touching `lib/wordpress.ts` anyway. |
| 4 | Verify no page renders dynamically | Not verified since migration | **Do this** — it's a free build-output check, catches a real cost/speed bug if one exists, costs nothing either way. |
| 5 | `next.config.ts` cache headers | Already correct, verify on deploy | Verify only, no code change needed. |
| 6 | Trim `next/image` device/image sizes | Not done — still Next defaults | Not required at this volume (nowhere near the ~10,000-transformation included allowance at ~200 visits/day), do later for margin. |
| 7 | Reduce client-bundle weight (duplicate carousel libs) | Not done — both `swiper` and `embla-carousel-react` still present | Not a cost item on Vercel at all (bundle size isn't billed) — a speed/maintenance cleanup only, do whenever convenient. |
| 8 | Bot/abuse rate limiting | Not done | **Do this before going live** regardless of traffic volume — a burst like the old Cloudways incident is a real risk independent of average daily traffic. |
| 9 | PM2/Cloudways deploy config | **Done** — `ecosystem.config.js`, `scripts/pm2-deploy.sh`, `.htaccess`, and the `postbuild` script are all already removed from this repo | — |
| 10 | Vercel spend guardrails | Not done — dashboard setting, no code | **Do this regardless of traffic** — it's the only thing that turns "should stay at $20" into "guaranteed to stay at $20" if traffic ever spikes unexpectedly (bot burst, viral post, etc.). Zero engineering cost. |
| 11 | Blog/news revalidate window → 120s | **Done** — every post fetch in `lib/wordpress.ts` now shares `revalidate: 120` + the `wp-posts` tag, and the webhook expires that tag. Webhook still needs `REVALIDATE_SECRET` set on Vercel + a WP webhook plugin pointed at `/api/revalidate` | Was causing a real bug: after a slug edit, `/blogs` linked the old (404) slug for 15+ min while the post page had already moved. |

**Bottom line at 72,000/yr: only two things are actually load-bearing for the $20
cap — Section 8 (bot/rate-limit protection) and Section 10 (Vercel spend cap),
because both protect against a *traffic spike*, not steady-state volume, and a
spike is the one scenario that could blow past $20 even at low average traffic.**
Everything else in this document is legitimate but optional polish at this
specific scale — valuable once traffic grows, not needed to hit the budget today.

## Ground rule for whoever implements this

**Do not add `loading="lazy"` to any image or video, and do not remove any existing
eager-loading logic.** Every fix below targets *bandwidth, Function invocations, and
Function duration* — the three things Vercel actually bills for — not perceived
load speed. Several of the biggest wins here (asset relocation, caching headers,
converting a Node Function proxy to a static redirect) make the site *faster*, not
slower, while cutting cost. Where a change could visually affect load order or
lazy-load anything, it is explicitly called out and should be skipped if in doubt —
ask before trading a bandwidth saving for a slower-feeling page.

## Confirmed plan: Vercel Pro, $20/month base

This changes the framing from "minimize a pay-as-you-go bill" to "stay inside
fixed monthly quotas, because every meter that overflows them bills extra on top
of the flat $20." Pro's included monthly allowances (verify exact current numbers
against Vercel's pricing page at deploy time, as these do shift, but the order of
magnitude below is what to design against):

- **Fast Data Transfer: ~1TB/month included**, then billed per extra GB.
- **Image Optimization: ~10,000 source images (transformations) included**, then
  billed per extra 1,000.
- **Function Invocations + Function Duration (Active CPU/GB-hours)**: a fixed
  included allowance, then billed per extra unit — this is the meter most exposed
  to a traffic burst like the August 24 2026 incident in `cloudways.txt`.
- Every one of these is a **hard cap that converts to real overage dollars the
  moment it's crossed** — unlike the Cloudways VPS this is migrating from, where a
  traffic spike meant slowness/downtime but not a bigger invoice, on Pro it means
  both a real risk of a slow month *and* a bill that can multiply past $20 with no
  warning unless spend alerts are configured (see the new Section 10 below).

Concretely for this site: the ~1TB transfer allowance sounds large until multiplied
by the media sizes in this repo. A single visitor loading the homepage hero
(desktop, both video slides at `preload="auto"`, per Section 1's numbers) pulls
several MB before they interact with anything. At a few thousand monthly visitors
hitting media-heavy pages, 1TB is reachable well before month-end — which is the
core reason Section 1 (move video/PDF off Vercel's own bandwidth meter) is not
optional polish on the Pro plan, it is what keeps the bill at $20 instead of $20 +
overage.

## Why this matters specifically for this project

Vercel's Pro billing is dominated by three meters, in order of how easily this
project could blow through its included Pro-plan allowance:

1. **Fast Data Transfer / Origin Transfer (bandwidth)** — billed per GB served from
   `/public`, from Image Optimization output, and from Function responses, once the
   ~1TB/month included allowance is exceeded.
2. **Function Invocations + Function Duration (GB-hours)** — every request to an API
   route or any dynamically-rendered page that isn't served from cache, once the
   included allowance is exceeded.
3. **Image Optimization transformations** — billed per unique `(src, width, quality)`
   combination `next/image` generates on first request, once the ~10,000-image
   included allowance is exceeded.

This repo currently has **`public/` at 618MB** (down from an initial 785MB after
this session's cleanup removed 18 confirmed-unused video files and other dead
weight — see the "Done this session" table entries above), of which:
- **~179MB is video** — the homepage hero alone loads 2 files on desktop
  (`public/homeasset/Hero_Section.mp4` at 27.1MB + `Hero_Section2.mp4` at 35.7MB,
  ≈63MB combined per desktop visit before the frame sequence below even starts),
  plus the mobile hero video and every park page's hero video
- **~143MB is PDFs** (brochures + ESG reports, `KSH_ESG_Report_2023.pdf` is 54MB)
- **218 files (~37MB)** is a scroll-scrubbed frame sequence, now at
  `public/homeasset/frames2/frame_*.webp`, driven by `components/sections/Hero.tsx`
  and `components/sections/ScrollFrames.tsx`

None of this is a coding mistake — the current implementation is already carefully
tuned for perceived performance (viewport-conditional video sources,
`fetchPriority`, `requestIdleCallback`-deferred frame preloading, stripped
WordPress lazy-loading). The problem is purely that **large static media served
directly from Vercel's CDN is the single most expensive thing you can host there**
— though at this site's confirmed 72,000 visits/year, the math above shows this
isn't yet an active cost problem, just a future one if traffic grows. A single bad
actor or bot burst is a separate, live risk regardless of average traffic (see the
August 24 2026 Cloudways CPU-spike incident in `cloudways.txt` — 3,345 requests
from one IP in ~3 seconds, hitting `/`, `/about-ksh`, `/parks`, etc. — which is why
Section 8/10 below are the two genuinely required items, not the media-size
sections).

---

## 1. Move large media off Vercel's own bandwidth meter (NOT required at 72K/yr — future-proofing only)

**Status: not required to hit $20/month at this site's confirmed 72,000
visits/year — see the table at the top of this document.** This section is kept
for when traffic grows; skip it for now unless you specifically want the
future-proofing done early or want R2's global CDN speed benefit regardless of
cost. Do not treat this as blocking or urgent at current traffic.

**Where:** everything under `public/` referenced by `<video>` tags in:
`components/sections/Hero.tsx`, `components/sections/parksections/VideoHeroSection.tsx`,
`components/sections/About/Hero.tsx`, `components/sections/Overview/Hero.tsx`,
`components/sections/solutions/HeroSolut.tsx`, `components/sections/sustainPages/SusHero.tsx`,
`components/sections/Testimonials/Hero.tsx`, `components/sections/parksections/InfrastructureSection.tsx`,
`components/sections/parksections/LocationOverviewSection.tsx`,
`components/sections/parksections/MobileInfrastructureSection.tsx`,
`components/park2/LocationSection.tsx`, `components/ui/VideoModal.tsx`, and
`components/sections/Hero.tsx`'s frame sequence — plus everything under
`public/brochure/*.pdf` and the two `public/KSH_ESG_Report_*.pdf` files.

**What to do:**
- Upload every video, PDF, and the 218-file frame sequence to a dedicated object
  storage / CDN that is *not* billed through Vercel's Fast Data Transfer meter —
  Cloudflare R2 (zero egress fee) is the standard pairing for a Vercel app, Bunny
  Stream/CDN is a good alternative if adaptive video streaming is wanted later.
  Vercel Blob is also an option but still bills egress like normal bandwidth, so it
  does **not** solve the cost problem by itself — only use it if egress-free R2/Bunny
  is not acceptable for another reason.
- Update every `<video src="...">`, `<source src="...">`, and PDF `href`/download
  link to point at the new CDN URL instead of a `/public`-relative path. Keep every
  existing `autoPlay muted loop playsInline preload="auto"` and `fetchPriority`
  attribute exactly as-is — this is a URL swap, not a loading-behavior change.
- Keep the existing viewport-conditional source-switching logic in `Hero.tsx` (the
  `isDesktopViewport` gate that renders only one `<video>` per slide) — that logic is
  what stops the site from downloading all 4 hero video variants on every load, and
  it must survive the URL swap unchanged.
- For the `frame_*.webp` sequence in `ScrollFrames`/`Hero.tsx`: same move to
  CDN/R2, same eager `img.fetchPriority = "low"` + `requestIdleCallback` prefetch
  logic kept intact — only the base URL changes from `/homeasset/frames2/frame_...`
  (its current location, already reorganized this session) to the CDN path.
- Leave small, above-the-fold images (logos, icons, small hero stills) in `public/`
  — they're cheap and benefit from being same-origin with no extra DNS/TLS
  handshake. This move is specifically for the large video/PDF/sequence assets.

**Why this is the highest-priority item:** at current sizes, a single visitor
loading the homepage hero (desktop, both video slides preloaded) pulls down
tens of MB from Vercel's own bandwidth allocation. At any real traffic volume this
is where the bill actually comes from — moving it off-platform is worth more than
every other optimization in this document combined.

---

## 2. Eliminate the Node Function image proxy for WordPress media (not required at 72K/yr — do when convenient)

**Status: not urgent.** At ~200 visits/day this proxy's Function-invocation cost is
small and won't threaten the $20 cap. Worth doing eventually since it removes a
real latency hop and is basically free to implement once verified safe on Vercel
— but it's cleanup, not a budget requirement right now.

**Where:** `app/api/wp-image/route.ts`, called from `lib/wordpress.ts`'s
`toProxiedImageUrl()`.

**Current behavior:** every blog/news post's featured image and in-body image is
rewritten to `/api/wp-image?path=...`, which is a `runtime = "nodejs"` Function
that does `fetch()` to WordPress and streams the response back. This exists to
work around WordPress's hostname resolving to `127.0.0.1` **on the Cloudways
server specifically** (SSRF guard in `next/image`) — see the comment block in
`lib/wordpress.ts` above `toProxiedImageUrl`.

**What to do once on Vercel:**
- Confirm the WordPress hostname (`wordpress-819107-5295407.cloudwaysapps.com`)
  resolves to a normal public IP from Vercel's network (it will — the loopback
  resolution was a Cloudways-account-specific DNS quirk, not something that follows
  the domain itself). If confirmed, **delete the proxy route and
  `toProxiedImageUrl()`**, and point `next/image`/`<img>` directly at the WordPress
  `source_url` — it's already in `remotePatterns` in `next.config.ts`.
- This removes a Function invocation + Function duration cost (proportional to
  every image byte streamed) for every single blog/news image view, replacing it
  with what `next/image`'s own Image Optimization pipeline (or a direct
  same-origin-to-WordPress fetch) already does more cheaply.
- If for some reason the loopback issue turns out to follow the domain even from
  Vercel (verify this with a real deploy before assuming), the proxy can be kept
  as a fallback — it already sets an outer response header (line 45:
  `"Cache-Control": "public, max-age=604800, stale-while-revalidate=86400"`), not
  just the inner `next: { revalidate: 3600 }` data-cache directive on the
  `fetch()` call. No new caching header needs to be added in that case; the only
  remaining step is confirming on a real deploy that Vercel's CDN actually caches
  the response at the edge based on that existing header rather than
  re-invoking the Function on every request.

---

## 3. Convert the WordPress `_embed` blog fetches from bandwidth-heavy to lean (not required at 72K/yr)

**Status: not urgent.** Do opportunistically if you're already editing
`lib/wordpress.ts` for another reason — not worth a dedicated pass at current
traffic.

**Where:** `lib/wordpress.ts` — `fetchAllPosts()`, `fetchPostsPage()`,
`fetchPostsByCategories()`.

**What to do:**
- These already use `next: { revalidate: 900 }` (blog listing pages) and
  `revalidate: 60` (single post + featured-media lookup) — keep these as ISR, do
  not switch any of these routes to `force-dynamic`. Static/ISR pages cost nothing
  per-visitor on Vercel beyond the periodic background revalidation; dynamic
  rendering would turn every single page view into a Function invocation.
- The comment at line 158-160 already notes a prior fix (server-side category
  filtering instead of client-side post-download-then-filter) — that pattern is
  correct and should be the template for any *new* WordPress queries added later:
  always let WordPress's REST API filter (`categories=`, `_fields=` to trim
  response payload) rather than fetching everything and filtering in JS.
- Consider adding `_fields=id,slug,date,modified,categories,title,excerpt,yoast_head_json,_links`
  to the listing queries (`fetchAllPosts`/`fetchPostsPage`) — WordPress's `_embed`
  returns full post `content.rendered` for every post in the list even though list
  pages only render title/excerpt/featured image, which is unnecessary payload
  pulled through a Function on every ISR revalidation.

---

## 4. Confirm every marketing page is statically generated, not dynamically rendered — DO THIS

**Status: required, and free.** This is a build-output check, not a code change —
costs nothing to run and catches a real hidden-Function-cost bug if one exists,
regardless of traffic volume. Do this once as part of the actual Vercel cutover.

**Where:** every route under `app/(site)/*` — `about-ksh`, `parks`, `solutions`,
`sustainability`, `testimonials`, `case-studies`, `careers`, `contact-us`,
`ksh-chakan-i` through `iv`, `ksh-hosur-i`, `ksh-talegaon-i`, `investors/*`, etc.

**What to do:**
- None of these currently export `force-dynamic`, `revalidate = 0`, or read
  request-specific data (cookies/headers) at the page level (verified — no matches
  in the codebase), which is good: by default these should already build as static
  HTML at `next build` time and cost nothing per-visit beyond CDN bandwidth for the
  HTML itself.
- After migrating, run `next build` and check the build output's route table (the
  `○`/`●`/`ƒ` symbols Next prints per route) to confirm every one of these pages is
  marked static (`○`) or ISR (`●`), not dynamic (`ƒ`). Any page unexpectedly marked
  `ƒ` is a hidden Function-invocation cost on every single visit and should be
  investigated — likely an accidental dynamic API (`cookies()`, `headers()`,
  `searchParams` read without `generateStaticParams`, or an uncached `fetch`) sneaking
  into a component that page imports.
- The only pages that *should* be dynamic/Function-backed are the API routes under
  `app/api/*` (forms, brochure lead capture, OTP/cert verification) — those are
  low-traffic, request-driven, and appropriately server-rendered as-is.

---

## 5. Fix the `next.config.ts` cache headers for the post-Vercel-migration reality

**Where:** `next.config.ts`, the `headers()` function (lines 47-73).

**What to do:**
- The current `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`
  on static assets was written for the Cloudways/Apache setup, where the comment
  notes Next's own default for `public/` was `max-age=0`. On Vercel, static assets
  under `public/` are served from Vercel's Edge Network/CDN by default with strong
  caching already — verify this custom header still applies correctly (Vercel
  respects custom `headers()` config) and isn't now fighting Vercel's own CDN
  defaults. Keep the explicit header; it's harmless and makes the intent explicit
  regardless of platform, just confirm via response headers on the deployed preview
  that `Cache-Control` is actually reaching the browser as configured.
- Once large media is moved to R2/Bunny (Section 1), this header block will apply
  to a much smaller set of files (logos, icons, small stills) — no change needed
  to the header logic itself, just note the blast radius shrinks.
- Do **not** add `immutable` to this directive unless filenames become
  content-hashed on every change (they aren't currently — see the existing comment
  explaining why `stale-while-revalidate` was chosen deliberately over
  `immutable`). Leave this exactly as-is.

---

## 6. Audit `next/image` usage for Image Optimization transformation cost (not required at 72K/yr)

**Status: not urgent.** At ~200 visits/day this site is nowhere near Vercel's
~10,000-transformation included allowance even with `next/image` left at default
`deviceSizes`/`imageSizes`. Worth trimming for margin once traffic grows, not a
current requirement.

**Where:** 29 files already use `next/image` (good); 14 files use raw `<img>` tags
— find them with `grep -rl "<img " app components --include="*.tsx"` — and decide
per-file whether that's intentional (e.g., inside `cleanPostHtml()`-rendered
WordPress body HTML via `dangerouslySetInnerHTML`, where `next/image` can't apply
anyway) or should be converted.

**What to do:**
- Every unique `(src, width, quality)` triple `next/image` generates counts as one
  billed Image Optimization transformation on Vercel. Audit `next.config.ts`'s
  `images` config for `deviceSizes`/`imageSizes` — if these are left at Next's
  defaults (8 device widths × multiple image widths), a single image rendered
  responsively can generate many transformations. Trim `deviceSizes`/`imageSizes`
  in `next.config.ts` to only the breakpoints this site's Tailwind config actually
  uses (check `tailwind.config`/`globals.css` for the real breakpoint set — likely
  just the `lg: 1024px` cutoff referenced throughout the codebase, e.g.
  `MOBILE_BREAKPOINT = 1024` in `Hero.tsx`) rather than the full default array.
- **Do not add `loading="lazy"` anywhere as part of this audit.** Every `next/image`
  instance currently either has explicit `priority` (56 occurrences — keep every
  one) or no explicit loading strategy; leave non-priority images on `next/image`'s
  own eager default behavior as they are now. The goal here is only trimming the
  *number of generated sizes*, never deferring *when* an image loads.
- The `localPatterns` config (lines 40-45) is already correctly scoped per the
  detailed comment explaining a prior incident — do not touch this without
  re-reading that comment in full; it explains a subtle Next.js behavior
  (`localPatterns` flips from "allow all" to "allowlist" the moment it's defined at
  all) that previously broke every local image in production.
- `sharp` is already a dependency (used for local image processing/build-time
  optimization) — good, this is required for `next/image` to run its own
  optimization efficiently rather than falling back to a slower path.

---

## 7. Reduce client-bundle weight from heavy libraries (not a cost item — speed/hygiene only)

**Status: never a Vercel cost item** — Vercel doesn't meter JS bundle size at all,
so this section has zero relationship to the $20 cap at any traffic level. Do this
purely for page-load speed and codebase hygiene, whenever convenient — not part
of the cost-control plan.

**Where:** `package.json` dependencies — `framer-motion`, `@vis.gl/react-google-maps`,
`swiper`, `embla-carousel-react`, `lenis`.

**What to do:**
- This doesn't affect Vercel billing directly (Vercel doesn't meter JS bundle
  size), but a lighter client bundle reduces Time-to-Interactive and total page
  weight served — which does count toward Fast Data Transfer on every page load,
  at smaller scale than the video assets but multiplied across every visitor to
  every page.
- The map stack has already been consolidated onto a single library —
  `@vis.gl/react-google-maps` (Google Maps JS API + Directions API) — used by
  all five map components (`components/park/LeafletMapCanvas.tsx`,
  `components/sections/contact/ConnectMap.tsx`,
  `components/sections/parksections/InteractiveMap.tsx`,
  `components/sections/contact/ConnectWithUsSection.tsx`,
  `components/sections/team/Connectus.tsx`; the former dual `leaflet`/
  `maplibre-gl` setup no longer exists in `package.json`). No duplicate-library
  decision remains here — the only thing to verify is that each of these five
  components stays behind the same `next/dynamic({ ssr: false })` wrapping
  already in place per-page (`ParkLeafletMap`, `ConnectMapClient`,
  `ConnectWithUsSectionClient`, `InteractiveMapClient`), so the Google Maps JS
  bundle only loads on pages that actually render a map, not globally.
- Both `swiper` and `embla-carousel-react` are present — same question: if both are
  in active use for different carousels, that's fine, but if one has fully replaced
  the other in recent work, remove the unused one from `package.json` and its
  imports.
- Confirm all of these are already dynamically imported (`next/dynamic`) wherever
  they're only needed below the fold or behind interaction (map components,
  carousels) rather than bundled into the initial JS payload for pages that render
  above-the-fold content first. This affects load speed, not lazy-loading of
  visual content — a dynamic *component* import is different from an image/video
  `loading="lazy"` attribute and is fine to use.

---

## 8. Bot/abuse protection to prevent a repeat of the August 24 CPU-spike incident — DO THIS

**Status: required, regardless of traffic volume.** This is one of only two
sections in this document that's actually load-bearing for the $20 cap at
72,000 visits/year — steady low traffic doesn't threaten the budget, but a burst
(bot, scraper, or a repeat of the August 24 incident) can spike bandwidth/Function
costs in minutes independent of the yearly average. Do this before going live.

**Where:** new addition — Vercel project settings + optionally `proxy.ts`
(currently only handles the `kshinfra.com` → `www.kshinfra.com` redirect).

**What to do:**
- The Cloudways incident (`cloudways.txt`) traced a burst of 3,345 requests in ~3
  seconds from one IP hitting `/`, `/about-ksh`, `/parks`, `/investors/*`, etc. to
  100% CPU. On Vercel, static/ISR pages absorb request bursts far better (served
  from CDN cache, no origin compute per request) — but the WordPress-backed blog
  pages and every `app/api/*` route are still real compute, and a burst there
  becomes a real Function-invocation bill, not just a CPU graph spike.
- Enable Vercel's built-in Attack Challenge Mode / Web Application Firewall (Pro
  plan and above) so a burst like this gets challenged at the edge before it
  reaches any Function.
- Add basic rate limiting to the `app/api/*` POST routes (`contact`, `newsletter`,
  `career`, `brochure`, `chakan-*-brochure`, `hosur-brochure`, `talegaon-i-brochure`,
  `cert-otp`, `cert-verify`, `esgr`) — these all send email via `lib/mailer.ts`
  and/or write to a Google Sheet, so an abusive burst here costs both Function
  invocations and (for the OTP/cert routes especially) potential SMTP-provider
  rate-limit or reputation damage. Use Vercel's `@vercel/firewall` rate-limiting
  primitives or a lightweight in-Function check keyed on IP.

---

## 9. PM2-specific config — DONE, no action needed

**Status: complete.** `ecosystem.config.js`, `scripts/pm2-deploy.sh`, `.htaccess`,
and the `"postbuild": "bash scripts/pm2-deploy.sh"` line in `package.json` have all
already been removed from this repo. `package.json`'s scripts are now just `dev`,
`build`, `start`, `lint` — nothing PM2/Cloudways-specific remains that could break
a Vercel build.

`proxy.ts`'s `kshinfra.com` → `www.kshinfra.com` redirect is platform-agnostic
(Next.js proxy runs the same way on Vercel) — left as-is, no change was needed
there.

No further action required for this section.

---

## 10. Set up spend guardrails on the Pro plan before going live — DO THIS

**Status: required, regardless of traffic volume.** This is the other one of the
two genuinely load-bearing sections for the $20 cap — it's the only thing that
turns "traffic math says we should stay at $20" into "guaranteed to never exceed
$20," covering the case a burst/spike gets past Section 8's rate limiting too.
Zero engineering cost, dashboard-only, do this before or during cutover.

**Where:** Vercel dashboard → project/team Billing settings (no code change).

**What to do:**
- On the $20/mo Pro plan, every meter in the "Why this matters" section converts
  to real overage dollars the instant it crosses its included allowance, with no
  automatic cutoff by default — traffic keeps being served and the bill keeps
  growing unless a spend limit is set. Configure **Spend Management** (Vercel's
  built-in monthly spend cap) so a traffic spike like the August 24 2026 incident
  (Section 8) caps out rather than silently producing a surprise invoice.
- Separately, set up **usage/billing alert notifications** (email/Slack via
  Vercel's dashboard) at meaningful thresholds (e.g. 50%/80% of the bandwidth and
  Function-duration allowances) so there's warning before a cap is hit, not just
  after.
- Check the **Vercel Usage dashboard** weekly for the first month post-migration
  specifically for Fast Data Transfer and Function Duration trending — this is the
  fastest way to confirm Section 1 (media relocation) and Section 2 (image proxy
  removal) actually landed before the next billing cycle closes, rather than
  finding out from the invoice.
- This section has no code to write, but it should be done **before** or
  **immediately alongside** cutover — it's the safety net for every other section
  in this document, not a replacement for doing them.

---

## 11. Caching strategy: serve every page from cache, not from a Function (not required for the $20 cap at 72K/yr — worth doing for speed)

**Status: not a budget requirement at current traffic** (static/ISR pages already
cost nothing per-visit regardless of the 900s/60s vs 120s revalidate window at
~200 visits/day), **but the revalidate-window change is cheap, safe, and worth
doing anyway** since it makes blog/news content feel more current — do it
whenever convenient, not urgently.

This is the single biggest lever for **both** cost and PageSpeed at once — a
request served from Vercel's CDN cache never invokes a Function (zero
Function-duration cost, ~instant TTFB) and never re-runs a WordPress fetch. The
goal is that steady-state traffic to this site should almost never execute
server code at all; it should be near-100% cache hits.

**Where:** every route under `app/(site)/*` and `app/investors/*`, plus
`lib/wordpress.ts`, `app/sitemap.ts`, and `next.config.ts`'s static-asset headers
(Section 5).

**What to do:**

- **Every marketing page stays fully static (ISR with no forced dynamic APIs).**
  This is already true today (confirmed in Section 4 — no `force-dynamic`,
  `revalidate = 0`, `cookies()`/`headers()` reads found anywhere in `app/(site)`).
  Static pages are built once at deploy time and then served straight from
  Vercel's CDN on every request with **zero Function invocation** — this is what
  "cached" actually means for a page that has no live data dependency (About,
  Solutions, Sustainability, Testimonials, Case Studies, park pages, Investors,
  etc.). Nothing needs to change here except *verifying* it stays true (Section 4's
  build-output check) as new pages get added.

- **Blog/news content: switch the ISR window from 900s/60s down to 120s
  (2 minutes), matched to the existing webhook so both mechanisms agree.**
  `lib/wordpress.ts` currently has three different revalidate windows:
  `fetchPostsPage`/`fetchPostsByCategories`/`fetchAllPosts` at `revalidate: 900`
  (15 min) and the single-post/featured-media lookups in `fetchPostBySlug`/
  `resolveFeaturedImage` at `revalidate: 60` (1 min). Change every one of these to
  `revalidate: 120` so a new or edited WordPress post is reflected within 2
  minutes everywhere it appears (post page, `/blogs`, `/news`), even on the rare
  case the publish webhook (`app/api/revalidate/route.ts`) doesn't fire (WP
  plugin misconfigured, webhook request fails, etc.) — the 2-minute TTL is the
  guaranteed backstop, the webhook is the fast path that makes updates feel
  instant when it does fire. **This does not mean re-fetching WordPress every 2
  minutes regardless of traffic** — ISR only re-runs the fetch on the *first*
  request after the window expires; if nobody visits `/blogs` in a given 2-minute
  window, no fetch happens and no Function runs. Old, unchanged posts already
  serve from the same cached HTML — a 2-minute window on unread content costs
  nothing extra because nothing re-fetches until someone actually requests it
  after expiry.
  - Also drop `app/api/wp-image/route.ts`'s inner `next: { revalidate: 3600 }`
    to `120` for consistency, *if* Section 2's recommendation (delete this proxy
    entirely once on Vercel) isn't taken — otherwise this line goes away with the
    whole route.
  - Leave `app/sitemap.ts`'s `revalidate: 3600` as-is — the sitemap doesn't need
    to reflect a new post within 2 minutes; search engines re-crawl on their own
    schedule regardless, and `revalidatePath("/sitemap.xml")` in the webhook
    already forces it fresh on publish anyway.

- **Image caching is already close to correct — verify it survives the Vercel
  move.** `next.config.ts`'s `headers()` sets `Cache-Control: public,
  max-age=604800, stale-while-revalidate=86400` on every image/video/font
  extension under `public/`. On Vercel this should be confirmed (not assumed) via
  the deployed preview's actual response headers, since Vercel's own static-asset
  serving has its own default caching behavior that this config either
  reinforces or could conflict with (see Section 5 — this was already flagged,
  restating here because it's directly part of "why does PageSpeed care about
  caching"). `next/image`-optimized output is cached by Vercel's Image
  Optimization CDN automatically once generated — no config needed there beyond
  what Section 6 already covers (trimming `deviceSizes`/`imageSizes` so fewer
  variants get generated and cached in the first place).

- **Do not lower any of this below what's safe for correctness.** 2 minutes is
  the floor requested for blog/news; nothing else in this document should be
  pushed to a shorter window than currently set — the WordPress `_embed` bulk
  queries are already noted (`lib/wordpress.ts` comment, ~9s observed response
  time) as slow upstream calls, so a very short TTL that causes frequent
  revalidation would reintroduce exactly the CPU/latency problem this migration
  is trying to avoid. 120 seconds keeps the update speed you asked for without
  going low enough to cause repeated slow upstream fetches under real traffic.

### On "PageSpeed must show 100"

Caching (this section) removes *server* latency — it gets Time to First Byte
close to zero for a cache hit. But Google PageSpeed Insights / Lighthouse scores
are dominated by **client-side, per-page rendering metrics** (Largest
Contentful Paint, Cumulative Layout Shift, Total Blocking Time, Interaction to
Next Paint) that caching alone does not fix. A perfectly cached page can still
score below 100 if, for example, an image has no explicit width/height (causes
layout shift), a large hero video blocks LCP, or a heavy client bundle
(framer-motion, two map libraries, two carousel libraries — see Section 7) delays
interactivity. Concretely, hitting 100 on top of everything else in this
document requires, page by page:

- Every `next/image` (and any remaining raw `<img>`) has explicit `width`/
  `height` (or `fill` with a sized parent) so the browser reserves layout space
  before the image loads — prevents CLS. Spot-check this against the 14 raw
  `<img>` files flagged in Section 6.
- The LCP element on each page's initial viewport (usually the hero video/image)
  is prioritized correctly — already true here via the existing `priority` /
  `fetchPriority="high"` usage on hero media (Hero.tsx, VideoHeroSection.tsx,
  etc.), which should be preserved exactly as Section 6 already requires.
- Total JS shipped to the client is kept in check per Section 7 (dynamic-import
  anything below the fold or behind interaction; resolve the duplicate
  map-library and duplicate carousel-library situation once, in either
  direction).
- Run Lighthouse/PageSpeed against the actual deployed Vercel preview (not
  `localhost`) once Sections 1–7 and this section are in place, per-template
  (home, a park page, a blog post, the blog listing) rather than assuming one
  page's score represents the whole site — a 100 on the homepage doesn't
  guarantee a 100 on a WordPress-content-heavy blog post page, since that page's
  score also depends on the actual content WordPress returns (image dimensions
  editors upload at, etc.), which this codebase doesn't fully control.

Caching (this section) is necessary for a 100 score — it removes server-side
delay entirely — but it is not sufficient on its own; treat it as one of several
prerequisites, alongside Sections 1, 6, and 7, rather than the single fix.

---

## Summary — what to actually do, given confirmed 72,000 visits/year

**Required before going live (protects the $20 cap against a traffic spike,
independent of steady-state volume):**
1. **Section 8 — bot/abuse rate limiting.** A burst (bot, scraper, repeat of the
   August 24 incident) can spike cost in minutes regardless of the yearly average.
2. **Section 10 — Vercel Spend Management, with the pause-on-limit option
   explicitly enabled** (not just notifications — see the discussion earlier in
   this conversation about that default trap). This is the only true hard
   guarantee against exceeding $20.
3. **Section 4 — verify no page renders dynamically.** Free, one-time build-output
   check, catches a real hidden-cost bug if one exists.

**Already done this session — no action needed:**
- Section 9 — PM2/Cloudways deploy config fully removed.
- 18 unused video files (166.7MB) + debug scripts/screenshots/notes + duplicate
  SVGs moved to `_unused_backup/` (git-ignored, recoverable).
- Homepage assets reorganized into `public/homeasset/`, all references fixed.

**Not required to hit $20/month at 72,000 visits/year — genuinely optional at
this traffic level, worth revisiting once traffic grows meaningfully (roughly
past 250K-500K visits/year, where Vercel's 1TB bandwidth allowance starts being
a real constraint):**
- Section 1 — moving media to R2/CDN
- Section 2 — removing the `wp-image` Node proxy
- Section 3 — leaner WordPress `_embed` queries
- Section 6 — trimming `next/image` device/size arrays
- Section 11 — dropping blog/news revalidate to 120s (safe and cheap to do
  anyway, just not cost-driven at this volume)

**Never a cost item on Vercel at any traffic level, pure speed/hygiene:**
- Section 7 — client bundle size (Vercel doesn't meter JS bundle size)

Every recommendation in this document preserves current eager-loading behavior
for images and videos — nothing here should make any page feel slower.
