# Accessibility audit fixes — LIVE KSH INFRA website

**For use in the LIVE project repo** (this file was prepared in the staging repo `ksh3oct` by mistake — copy it into the live project). The live site has **no case-study video pop-ups**, so every pop-up/caption item from the staging plan is removed here.

- **Source:** `vapt.pdf` — ITE Software Solutions "Developer Remediation Report", audit date 21-10-2026, home page of https://www.kshinfra.com. Despite the file name it is an **accessibility audit** (SEBI Circular SEBI/HO/ITD-1/ITD_VIAP/P/CIR/2025/131, WCAG 2.1 AA), not a security VAPT. Score: 0 / Non-Compliant. Marked "Not for external publication".
- **Re-check:** the live site was re-scanned on 23-10-2026 with the auditor's tool (axe-core 4.11) — the home page result matched the audit (25 of 26), plus 17 more spots on other pages.
- **Code locations:** paths below are from the staging repo. The live repo may differ — find each spot with the **search hint** (visible text or colour value).
- **Working rules:** don't start the dev server (the user runs it). Check the live repo's Next.js version and its bundled docs before Next-specific changes.

---

## 1. Task list (client-facing, plain language)

One developer · working day 7 hours 30 minutes, max 6 hours of task work · tasks of 6 hours or less stay within one day · Sunday off, Saturday 31-10-2026 is a working day · times are the doubled estimates.

| # | Change | Time (hh:mm:ss) | Start | Finish | Status | Notes |
|---|---|---|---|---|---|---|
| 1 | Add a shortcut that lets people who use a keyboard instead of a mouse jump past the top menu straight to the page content | 02:00:00 | 26-10-2026 | 26-10-2026 | Not started | |
| 2 | Label the main parts of every page (top menu, page content, footer) so screen-reading software used by blind visitors can find them | 04:00:00 | 26-10-2026 | 26-10-2026 | Not started | Applies to every page. No visible change |
| 3 | Make faded, light-grey text darker so everyone can read it easily, across the whole website | 12:00:00 | 27-10-2026 | 28-10-2026 | Not started | Applies to every page |
| 4 | Tidy up the page headings so visitors using screen-reading software get a clear outline of each page | 04:00:00 | 29-10-2026 | 29-10-2026 | Not started | Applies to every page. No visible change |
| 5 | Confirm with the auditor which part of the page they flagged for "reading order", and correct it | 02:00:00 | 29-10-2026 | 29-10-2026 | Waiting on auditor | The auditor's report does not say which part |
| 6 | Make every button, card and menu usable without a mouse, and clearly highlight the item that is selected | 12:00:00 | 30-10-2026 | 31-10-2026 | Not started | Applies to every page |
| 7 | Add an "Accessibility Statement" page (which standard the website follows and how to report a problem) and link it from the footer | 06:00:00 | 02-11-2026 | 02-11-2026 | Not started | We prepare the draft; KSH approves the wording |
| 8 | Add a Pause button to the moving video at the top of the home page, and remove its unused hidden sound | 04:00:00 | 03-11-2026 | 03-11-2026 | Not started | |
| 9 | Show the name and contact details of KSH's Accessibility Officer (Nodal Officer) in the website footer | 01:00:00 | 03-11-2026 | 03-11-2026 | Waiting on KSH | Needs the officer's name, designation, email and phone number |
| 10 | Final testing of all changes on desktop and mobile | 08:00:00 | 03-11-2026 | 05-11-2026 | Not started | |
| 11 | Send the updated website to the auditor to test again | 01:00:00 | 05-11-2026 | 05-11-2026 | Not started | |
| 12 | Sign-language versions of key videos (an Indian Sign Language interpreter shown in a corner of the video, for deaf visitors) | TBD | TBD | TBD | Waiting on KSH | Likely not needed: the live site's only videos are silent background videos (see task 8). Confirm with the auditor |
| | **Total** | **56:00:00** | | | | |

**Removed vs the staging sheet** (case-study videos don't exist on live): "Make the video pop-up usable without a mouse…" (04:00:00) and "Add subtitles to the case study videos" (06:00:00). Total drops from 66:00:00 to 56:00:00; finish moves from 06-11-2026 to 05-11-2026.

### Day by day (max 6 hours of task work per day)

| Date | Tasks | Task time |
|---|---|---|
| 26-10-2026 (Mon) | #1 (02:00:00), #2 (04:00:00) | 06:00:00 |
| 27-10-2026 (Tue) | #3 (06:00:00) | 06:00:00 |
| 28-10-2026 (Wed) | #3 (06:00:00) | 06:00:00 |
| 29-10-2026 (Thu) | #4 (04:00:00), #5 (02:00:00) | 06:00:00 |
| 30-10-2026 (Fri) | #6 (06:00:00) | 06:00:00 |
| 31-10-2026 (Sat) | #6 (06:00:00) | 06:00:00 |
| 02-11-2026 (Mon) | #7 (06:00:00) | 06:00:00 |
| 03-11-2026 (Tue) | #8 (04:00:00), #9 (01:00:00), #10 (01:00:00) | 06:00:00 |
| 04-11-2026 (Wed) | #10 (06:00:00) | 06:00:00 |
| 05-11-2026 (Thu) | #10 (01:00:00), #11 (01:00:00) | 02:00:00 |

To rebuild the client sheet in the live project: same columns as above; write times and dates **as plain text** (`06:00:00`, `26-10-2026`) — the user's spreadsheet viewer ignores Excel number formats and shows raw date serials otherwise.

---

## 2. Where each fix goes on the live site

Refs match `KSH-Accessibility-Audit-Fix-Guide.docx` (built from live-site screenshots; its row **M7 — video pop-up captions — does not apply to live**). Shared grey that passes on all the light backgrounds below: **`#707070`** (4.6:1 or better on white, `#F8F8F6`, `#F9F7F2`, `#FAF8F5`).

### From the audit (home page)

| Ref | Page | Section as it appears | Problem | Fix | Search hint (staging file) |
|---|---|---|---|---|---|
| A1 | / | Intro text below the banner: "KSH INFRA delivers expertise across every stage…" | Unread scroll-fill words `#C3C3BC` on white, 1.8:1 (audit items 1–12) | Unread colour → `#707070` (set in JS **and** the `text-[#BDAEA6]` class) | `#C3C3BC`, `data-w` (About.tsx) |
| A2 | / | "How We Create Value" list (Capital Deployment, Project Development, Leasing Management, Property Management) | Inactive items `#868686`, 3.6:1 (13–16) | `#707070` | `"How We Create Value"`, `#868686` (Services.tsx) |
| A3 | / | "What our Clients Say!" job title line | `#8A91A3`, 3.2:1 (17) | `#707070` | `#8A91A3` (Testimonials.tsx) |
| A4 | every page | Footer "Explore KSH INFRA" + "Resources" menus | `#8F8F8F` on `#F9F7F2`, 3.0:1 (18–26) | `#707070`, keep black hover | `text-[#8F8F8F]` in the footer (Footer.tsx) |
| M1 | every page | Top bar | No "Skip to main content" link (WCAG 2.4.1) | Hidden skip link as first Tab stop → `<main id="main-content">` | shared layout that renders Navbar/Footer |
| M2 | every page | Top bar + footer | Live has `<nav>` and one `<main>` but **no `<header>`, no `<footer>`** (footer is a `<section>`) (1.3.1) | Wrap top bar in `<header>`, footer root → `<footer>`, `aria-label` "Main"/"Footer" on navs; one `<main>` per page | Footer root `<section … bg-[#F9F7F2]>` |
| M3 | / | "Our Portfolio by the Numbers" figures (07 Parks, 10 Mn. Sq. Ft., 04 Mn., 03 Mn.) + footer menu links | Figures are `<h6>` straight after `<h2>`; footer links are `<h4>` (1.3.1) | Make them plain text (`<p>`/`<span>`, same classes) | `<h6` (ScrollFrames.tsx), `<h4` in footer |
| M4 | / | "Built Around Operational Needs" cards; also "How We Create Value", "Building Responsibly for the Long Term", "Market Perspectives & Updates" | Open only on mouse hover — keyboard can't reach/open (2.4.3, 2.1.1) | Mirror `onMouseEnter` with focus (`onFocus`/focusable card or real `<button>`); restore visible focus outlines (remove `focus:outline-none`) | `onMouseEnter` in CaseStudies/Services/Growth/Insights |
| M5 | / (phone) | "Market Perspectives & Updates" View More / arrows | Reading order flagged, no detail; on phones visual order ≠ code order (1.3.2) | Ask the auditor first; then align DOM order | `order-1`/`order-2`/`order-3` (Insights.tsx) |
| M6 | / | Hero banner: "Investing, Developing and Operating Industrial Infrastructure at Scale" | 2 autoplaying muted looping videos, no captions, no pause (1.2.2, 2.2.2) | `aria-hidden="true"` (decorative), strip the unused audio track (`ffmpeg -i in.mp4 -c copy -an out.mp4`, **new filenames** for cache), add a visible Pause/Play button | `<video` + `muted` (Hero.tsx) |
| M8 | — | Key videos | No Indian Sign Language versions (SEBI; mapped to 1.2.5) | On live the only videos are silent decorative ones — ask the auditor whether ISL still applies | — |
| M9 | every page | Footer "Connect" column (email, toll-free number) | No nodal officer contact (SEBI row 11) | Add "Nodal Officer (Accessibility): name, designation, email, phone" — **details from KSH** | `"Connect"` in footer |
| M10 | every page | Footer "Policies" column (next to Privacy Policy) | No accessibility statement page (SEBI row 10) | New page `/accessibility-statement` (one `<h1>`, metadata) + link under "Policies" + add to sitemap. Content: WCAG 2.1 AA target, scope, known gaps + dates, how to report (contact + nodal officer), SEBI SCORES complaint route, last reviewed date. KSH approves wording | `"Privacy Policy"` in footer |

### Same contrast problem on other live pages (not in the audited page; same standard)

| Ref | Page | Section as it appears | Problem | Fix | Search hint (staging file) |
|---|---|---|---|---|---|
| P1 | /about-ksh | "A Team of Visionaries, Engineers, and Leaders Building Tomorrow's Infrastructure" | Unread words `#BDAEA6` on `#F8F8F8`, 2.0:1 | `#707070` | TeamSection.tsx |
| P2 | /about-ksh | "The KSH Group – A diversified portfolio…" + "FIND OUT MORE" link | `#BDAEA6` 2.1:1; link `#8F8F8F` 3.0:1 | `#707070` | KshScroll.tsx |
| P3 | /parks | "KSH INFRA Parks: New Benchmarks of Logistics Efficiency" | `#BDAEA6` 2.1:1 | `#707070` | overviewAbout.tsx |
| P4 | /parks | Feature list under "KSH INFRA builds solutions…" | `#868686` 3.6:1 | `#707070` | overviewServices.tsx |
| P5 | /solutions | Left side menu | `#8A8A82` 3.5:1 | `#707070` | SolutionsSidebar.tsx |
| P6 | /testimonials | Left side menu of clients | `#8A8A82` 3.5:1 | same component as P5 | SolutionsSidebar.tsx |
| P7 | /careers | "We Make Leaders" | `#BDAEA6` 2.1:1 | `#707070` | WeMakeLeadersSection.tsx |
| P8 | /careers | Form placeholders ("Select Department") | `#868686` 3.6:1 | `#707070` | CareerFormSection.tsx |
| P9 | /blogs | Banner breadcrumb "Home > Blogs" | `text-white/40` on `#212121`, 3.8:1 | `text-white/70` (8.5:1) | BlogHero.tsx |
| P10 | /blogs | "Explore" tabs + card dates | `#868686` 3.6:1 | `#707070` | BlogTabs.tsx, BlogCard.tsx |
| P11 | /contact-us | "(Toll-Free)", office addresses, "Type of Enquiry" | `#868686` 3.6:1 | `#707070` | ContactFormSection.tsx |
| P12 | /contact-us | "Connect with us" Mumbai/Pune switch | `#868686` on `#FAF8F5` 3.4:1 | `#707070` | ConnectWithUsSection.tsx |
| P13 | /ksh-chakan-i (+ other parks) | Tab bar "Park Highlights", "Location & Connectivity" | `#BDAEA6` on `#FBF2E8` 1.9:1 | `#6E6E6E` or darker | TabNavSection.tsx |
| P14 | /ksh-chakan-i | "Building the Future of Industrial Infrastructure" + paragraph | `#BDAEA6` 2.1:1 | `#707070` | ParkAbout.tsx |
| P15 | /ksh-chakan-i | Map distance units "km" + coordinates label | `#6D6D6D` on map grey/beige 3.0–3.3:1 | `#505050` or darker | InteractiveMap.tsx |
| P16 | /ksh-chakan-i | "Infrastructure" Exterior/Interior switch | `#9E9E9E` 2.7:1 | `#707070` | ExteriorInteriorWrapper.tsx |
| P17 | /ksh-chakan-i, -ii | "Park Gallery" note "*Successfully exited to Mapletree…" | `text-black/20` on `#F9F7F2` 1.5:1 | `#707070` | ConcavePanoramaSlider.tsx |

Also seen (unflagged but failing): section labels `text-[#8C8C84]` (3.2:1), governance card text `#8F8F8F` on `#ECEAE4` (2.7:1 → use `#666666`), form placeholders `#868686`.

---

## 3. Technical notes

- **Skip link** (in the shared layout, before the navbar):
  `<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[2147483647] …">Skip to main content</a>` — the navbar is fixed with a huge z-index and hides on scroll, so the skip link must sit above it. If the site uses Lenis smooth scroll, make sure the hash jump still works and focus lands on `<main>` (`tabIndex={-1}`).
- **One `<main>`:** if the layout adds `<main id="main-content">`, change page-level `<main>` elements to `<div>` (keep their classes).
- **Video pause button:** WCAG 2.2.2 — any moving content longer than 5 s needs a way to pause it.
- **Contrast helper** (node):
  ```js
  const hex = h => [1,3,5].map(i => parseInt(h.slice(i, i+2), 16) / 255);
  const lum = h => { const [r,g,b] = hex(h).map(c => c <= 0.03928 ? c/12.92 : ((c+0.055)/1.055)**2.4); return 0.2126*r + 0.7152*g + 0.0722*b; };
  const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  ```
- **Verify:** re-run axe (color-contrast) on the live/staging URL of each page above; keyboard-only pass (every button reachable, focus always visible); screen reader (NVDA): landmarks list shows header, navigation, main, footer; headings list has one `h1`, no skipped levels; repeat on a phone-sized window.

## 4. Open items

- **KSH:** nodal officer name, designation, email, phone (#9); approval of the accessibility statement wording (#7); confirm the hero videos are meant to be silent (#8); is a separate security VAPT also required?
- **Auditor (ITE):** which section the reading-order finding refers to (#5); whether ISL still applies when the only videos are silent background videos (#12); whether the retest covers pages beyond the home page (P1–P17).
