# KSH INFRA website — 7 accessibility fixes, checked page by page

- **Source:** `accessibility.pdf`, the ITE Software Solutions "Developer Remediation Report" for https://www.kshinfra.com, audited 21-10-2026 (SEBI circular SEBI/HO/ITD-1/ITD_VIAP/P/CIR/2025/131, WCAG 2.1). Score: 0, Non-Compliant.
- **Scope:** only the 7 points below. This file does not cover colour contrast (the 26 axe items), captions, Indian Sign Language, reading order or the hero-video pause button.
- **How it was checked:** code review of every route in this repo (branch `ayaan`, 27-10-2026), following every component each page renders. No code was changed. Nothing was checked in a browser or screen reader yet. Section 6 is the test script for that.
- **Before coding:** this project runs Next.js 16.2.9. Per `AGENTS.md`, read the matching guide in `node_modules/next/dist/docs/` before any Next-specific change (new route, layout, metadata).

Status key: ❌ missing or broken · ⚠️ partly done · ✅ OK · — not applicable · **S** = fixed by the site-wide change in section 3; nothing extra to do on that page.

---

## 1. The 7 points at a glance

| # | Point (client wording) | Audit item in the PDF | Standard | Where the fix lives | State today |
|---|---|---|---|---|---|
| 1 | Add a shortcut that lets people who use a keyboard instead of a mouse jump past the top menu straight to the page content | Manual #1 `skip_to_main_link` | WCAG 2.4.1 | Root layout (link) + both route-group layouts (target) | ❌ No skip link on any page |
| 2 | Label the main parts of every page (top menu, page content, footer) so screen-reading software used by blind visitors can find them | Manual #5 `aria_landmarks_present` | WCAG 1.3.1 | `Navbar`, `Footer`, both layouts, plus 16 page files | ❌ No `<header>` or `<footer>` landmark anywhere. 16 of 22 page templates have no `<main>` or leave part of the page outside it. 3 pages render the top menu twice. |
| 3 | Tidy up the page headings so visitors using screen-reading software get a clear outline of each page | Manual #2 `heading_hierarchy` | WCAG 1.3.1 | Footer + individual sections | ❌ 8 URLs have no `<h1>`, 5 URLs have two, and several pages skip levels |
| 4 | Make every button, card and menu usable without a mouse, and clearly highlight the item that is selected | Manual #8 `focus_order_logical` ("Tab to all buttons not working") | WCAG 2.1.1, 2.4.3, 2.4.7 | Global focus style, `Navbar`, `Btn`, pop-ups + individual sections | ❌ Many cards and rows are mouse-only; focus rings removed in 20+ places; selected tabs shown by colour only |
| 5 | Add an "Accessibility Statement" page (which standard the website follows and how to report a problem) and link it from the footer | Manual #10 `accessibility_statement_present` | SEBI circular, row 10 | New route + `Footer` + `app/sitemap.ts` | ❌ Page does not exist |
| 6 | Make the video pop-up usable without a mouse and readable by screen-reading software | Manual #8 remediation ("move focus into the dialog; restore focus to the trigger on close") | WCAG 2.1.1, 2.4.3, 4.1.2 | `GalleryMediaPopup` + its two openers; same pattern in `LocationOverviewSection` | ❌ Desktop: pop-up can't be opened by keyboard. Pop-up is not announced as a dialog, and focus is never moved in or trapped. |
| 7 | Show the name and contact details of KSH's Accessibility Officer (Nodal Officer) in the website footer | Manual #3 `nodal_officer_contact_in_footer` | SEBI circular, row 11 | `Footer` | ❌ Not shown. **Needs details from KSH.** |

---

## 2. Pages covered

Public pages: the 26 routes in [app/sitemap.ts](app/sitemap.ts#L12-L38), plus `/testimonials` (linked from the Capabilities menu), every blog post (`/blogs/[slug]`), every news post (`/news/[slug]`) and `/thank-you`. That makes 22 page templates.

All public pages use one of two layouts, and both render the same `Navbar` and `Footer`:
- [app/(site)/layout.tsx](app/(site)/layout.tsx): every page except the four below
- [app/investors/layout.tsx](app/investors/layout.tsx): `/investors`, `/investors/fund-I-details`, `/investors/governance`, `/investors/contact`

So points 1, 2 (top menu and footer), 5 and 7 are fixed once and appear on every page. Points 2 (page content), 3, 4 and 6 also need work inside individual pages (section 4).

Internal routes (`/home`, `/park2`, `/preview-exterior`, `/test1`) are listed in Appendix A.

---

## 3. Site-wide fixes (do once; they apply to every page)

### 3.1 Point 1: Skip link

**Today**
- No skip link exists. A search for `skip`, `sr-only` and `main-content` finds nothing.
- On every page, the first Tab stop is the logo link in the fixed top menu ([Navbar.tsx:252](components/ui/Navbar.tsx#L252)). After it come 7 menu items and the Contact button.

**Fix**
1. As the first child of `<body>` in [app/layout.tsx](app/layout.tsx#L67), add a link reading "Skip to main content" that points to `#main-content`.
   - It is visually hidden until focused (`sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 …`).
   - It must sit above the navbar. The navbar uses `z-[999999999999]` ([Navbar.tsx:248](components/ui/Navbar.tsx#L248)) and the dropdown layer uses `z-[9999999999999]` ([Navbar.tsx:372](components/ui/Navbar.tsx#L372)), so use e.g. `z-[2147483647]`.
2. The target is the single `<main id="main-content" tabIndex={-1}>` added in section 3.2.
3. **Watch out for Lenis.** [LenisProvider.tsx:383-418](components/ui/LenisProvider.tsx#L383-L418) intercepts same-page `#hash` clicks. It works out the link's path as `href.slice(0, hashIndex) || "/"`, so it treats a bare `#main-content` as `/`:
   - On the home page, the click is taken over (`preventDefault`, `pushState`, smooth scroll). **Focus does not move.**
   - On every other page, the browser's native jump runs.

   Give the skip link its own `onClick` that calls `document.getElementById("main-content")?.focus()`. The interceptor deliberately does not `stopPropagation`, so React's `onClick` still runs. This needs a small client component.

**Done when:** on every page, the first Tab press shows "Skip to main content" at the top left. Enter moves focus past the menu, and the next Tab lands on the first link or button in the page content (also on `/`).

### 3.2 Point 2: Landmarks (top menu, page content, footer)

**Today**
- **Top menu:** `Navbar` renders a `<motion.nav>` directly ([Navbar.tsx:240](components/ui/Navbar.tsx#L240)).
  - There is no `<header>`, so there is no "banner" landmark, and the `<nav>` has no `aria-label`.
  - The desktop dropdown layer, which repeats the whole menu row and holds all submenu links, sits outside the `<nav>` ([Navbar.tsx:370-545](components/ui/Navbar.tsx#L370-L545)).
  - The mobile menu is `role="dialog"`, but its links are not inside a `<nav>` ([Navbar.tsx:609](components/ui/Navbar.tsx#L609)).
- **Footer:** the root element is a `<section>` ([Footer.tsx:371](components/sections/Footer.tsx#L371)), so there is no "contentinfo" landmark. The link columns are not inside a `<nav>`.
- **Page content:** this varies by page; see the matrix in section 4. 16 of 22 templates have no `<main>` or leave the hero outside it.
- **Duplicate top menu:** three pages render a second full `<Navbar />` inside their hero, on top of the one the layout already renders. That means two identical navigation landmarks, and every menu item appears twice in the Tab order:
  - [ContactHero.tsx:45](components/sections/contact/ContactHero.tsx#L45) (`/contact-us`)
  - [ourteam.tsx:49](components/sections/team/ourteam.tsx#L49) (`/our-team`)
  - [InvestorHeroSection.tsx:46](components/sections/Investor/InvestorHeroSection.tsx#L46) (`/investors/institutional-investors`)

**Fix**
1. **Header:** in both layouts, wrap `<Navbar />` in `<header>`.
   - In [app/(site)/layout.tsx:11](app/(site)/layout.tsx#L11), the existing `<div className="w-full pt-safe-top">` can simply become `<header>`.
   - In [app/investors/layout.tsx:13](app/investors/layout.tsx#L13), wrap `<Navbar />`.
   - This also puts the dropdown layer and mobile menu inside the header.
2. **Navigation:** add `aria-label="Main"` to the `<motion.nav>`, and wrap the mobile menu's links in `<nav aria-label="Main">`.
3. **Main:** in both layouts, wrap `{children}` in `<main id="main-content" tabIndex={-1}>`. Then change every page-level `<main>` to `<div>` (same classes) so each page has exactly one. The pages are listed in section 4.
4. **Footer:** change the root `<section>` to `<footer>` ([Footer.tsx:371](components/sections/Footer.tsx#L371)). Wrap the two link columns ([Footer.tsx:461-491](components/sections/Footer.tsx#L461-L491)) in `<nav aria-label="Footer">`.
5. **Duplicate menus:** remove the extra `<Navbar />` from the three heroes listed above. Check that each hero's spacing doesn't depend on it.
6. **Other `<nav>` elements need their own names:**
   - The park sub-menu `<nav>` ([TabNavSection.tsx:115](components/sections/parksections/TabNavSection.tsx#L115)) needs `aria-label="Park sections"`.
   - `SolutionsSidebar` is hard-coded to `aria-label="Solutions timeline"` ([SolutionsSidebar.tsx:33](components/sections/solutions/SolutionsSidebar.tsx#L33)), but it is reused on `/testimonials` for the client list. Pass the label as a prop.
7. Several pop-up forms use `<header>`: [BrochurePopForm.tsx:156](components/sections/parksections/BrochurePopForm.tsx#L156), [CertDownloadFormStep1.tsx:151](components/sections/parksections/CertDownloadFormStep1.tsx#L151), [CertDownloadFormStep2.tsx:198](components/sections/parksections/CertDownloadFormStep2.tsx#L198) and [ESGPopForm.tsx:137](components/sections/sustainPages/ESGPopForm.tsx#L137). Outside `<main>` these count as extra "banner" landmarks. Once all page content sits inside `<main>` they stop counting, so no extra work is needed.

**Done when:** in NVDA (Insert+F7 → Landmarks), every page lists exactly one banner, one navigation "Main", one main and one content info. "Footer" navigation and page-specific navigations (such as "Park sections") may appear too.

### 3.3 Point 3: Headings (shared part and rule)

**Rule for every page:** exactly one `<h1>` (the page title), `<h2>` for each section, and `<h3>` for items inside a section. No skipped levels. Numbers, stat figures and link labels are not headings.

**Footer (every page)**
- The menu link labels are `<h4>` ([Footer.tsx:480](components/sections/Footer.tsx#L480)). Change them to `<span>` with the same classes.
- The column titles are `<h3>`: "Explore KSH INFRA", "Resources", the two office names, "Connect", "Policies" and "Registration Details" ([Footer.tsx:464](components/sections/Footer.tsx#L464), [513](components/sections/Footer.tsx#L513), [524](components/sections/Footer.tsx#L524), [543](components/sections/Footer.tsx#L543), [563](components/sections/Footer.tsx#L563), [585](components/sections/Footer.tsx#L585)). In the outline they appear to belong under the newsletter `<h2>` "Join Our Newsletter" ([Footer.tsx:399](components/sections/Footer.tsx#L399)). Make them `<h2>`, peers of the newsletter title.

**Styling caveat:** [app/globals.css:54-60](app/globals.css#L54-L60) forces the Sora font on every `h1`–`h6` (`!important`). Tailwind's reset keeps size and weight unchanged when you swap tags, but the font does change:
- Turning a heading into `<p>` or `<span>` drops it to Inter unless you add `font-sora`.
- Turning a `<p>` into a heading switches it to Sora.

**Done when:** NVDA's heading list (Insert+F7 → Headings) or the HeadingsMap browser extension shows one `h1` and no level jumps on each page.

### 3.4 Point 4: Keyboard use and visible selection (shared part)

**a. Visible focus everywhere**
- [app/globals.css](app/globals.css) has no focus styles.
- Many components remove the browser's focus ring with `outline-none`, `focus:outline-none` or `focus:outline-hidden`:
  - Footer newsletter inputs ([Footer.tsx:427](components/sections/Footer.tsx#L427), [436](components/sections/Footer.tsx#L436))
  - Section buttons: [Services.tsx:276](components/sections/Services.tsx#L276), [AssetShowcase.tsx:758](components/sections/AssetShowcase.tsx#L758), [HotspotShared.tsx:183](components/park2/HotspotShared.tsx#L183), [Interior.tsx:211](components/park2/Interior.tsx#L211), [SocialCommitment.tsx:982](components/sections/sustainPages/SocialCommitment.tsx#L982)
  - Selects and forms: [ESGReports.tsx:266](components/sections/sustainPages/ESGReports.tsx#L266), [331](components/sections/sustainPages/ESGReports.tsx#L331), `ESGPopForm`, `BrochurePopForm`, `OtpInput`, `CareerFormSection`, `ContactFormSection`
  - Member cards: [MemberCard.tsx:17](components/AifComponents/Governance/MemberCard.tsx#L17), [MemberCard2.tsx:17](components/AifComponents/Governance/MemberCard2.tsx#L17)
  - All three Google Map wrappers (`**:focus:outline-none **:focus-visible:outline-none`): [ConnectWithUsSection.tsx:120](components/sections/contact/ConnectWithUsSection.tsx#L120), [ConnectMap.tsx:56](components/sections/contact/ConnectMap.tsx#L56), [InteractiveMap.tsx:371](components/sections/parksections/InteractiveMap.tsx#L371)
- **Fix:**
  - Add one `:focus-visible` rule in `globals.css`, for example a 2px solid `#59624D` outline with a 2px offset, plus a white variant for the dark navbar and video heroes.
  - Remove the outline removals above, or replace them with `focus-visible:ring-2`.
  - Note: the form fields currently show focus only as a thin border colour change ([CareerFormSection.tsx:374](components/sections/career/CareerFormSection.tsx#L374)). That is not enough on its own.

**b. Desktop menu dropdowns** (About, Parks, Investors, Capabilities, Media; [Navbar.tsx:274-301](components/ui/Navbar.tsx#L274-L301))
- Already OK: triggers are real buttons with `aria-expanded`, and Escape closes the panel.
- Problem: when a panel opens, the white layer covers the dark menu, but focus stays on the now-hidden trigger.
  - The next Tab goes to hidden items in the dark bar.
  - The panel's links come only after the dark bar, its Contact button and the white bar's own logo, 7 items and Contact.
- **Fix:**
  - On open, move focus to the first link in the panel. Add `aria-controls`.
  - Close the panel when focus leaves it.
  - On Escape, return focus to the trigger.

**c. Mobile menu** ([Navbar.tsx:590-891](components/ui/Navbar.tsx#L590-L891))
- Already OK: `role="dialog"` and `aria-modal`.
- Problem: focus is not moved into the menu, Tab can leave it and reach the page behind, and closing does not return focus to the menu button.
- **Fix:** focus the Close button on open, keep Tab inside the menu, and return focus to the menu button on close.

**d. Menu hides while scrolling** ([Navbar.tsx:151-166](components/ui/Navbar.tsx#L151-L166))
- After scrolling down, Shift+Tab back into the menu focuses items that are off-screen.
- **Fix:** add `onFocusCapture={() => setHidden(false)}` on the nav.

**e. Show the current page in the menu**
- `Navbar`, the dropdowns and `Footer` never mark the current page: there is no `usePathname` and no `aria-current`.
- **Fix:** add `aria-current="page"` and a visible non-colour cue (for example, a permanent underline) to the matching link.

**f. Mouse-only highlight effects**
- `Btn` fills on hover only ([Btn.tsx:178-187](components/ui/Btn.tsx#L178-L187)). Add `onFocus`/`onBlur` with the same behaviour.
- `NavArrow` has the same issue ([NavArrow.tsx:62-65](components/ui/NavArrow.tsx#L62-L65), [91-94](components/ui/NavArrow.tsx#L91-L94)).
- The Parks dropdown preview image changes on hover only ([ParksDropdown.tsx:139](components/ui/ParksDropdown.tsx#L139), [156](components/ui/ParksDropdown.tsx#L156), [164](components/ui/ParksDropdown.tsx#L164)).
- The "Coming Soon" park is a non-focusable `<div>` whose label exists only as a hover tooltip ([ParksDropdown.tsx:138-154](components/ui/ParksDropdown.tsx#L138-L154)). Keyboard and screen-reader users never get "Coming Soon". Show it as text.

**g. Pattern for clickable cards and rows**
- A `<div onClick>` cannot be reached with Tab. Replace it with:
  - `<button type="button">` plus `aria-expanded` for accordion rows
  - `<button>` plus `aria-haspopup="dialog"` for cards that open a pop-up
  - `<Link>` when the element navigates
- Anything that opens or expands on hover must also do so on focus.
- Every instance is listed per page in section 4.

**h. Pattern for pop-ups**
- None of the pop-ups below has `role="dialog"` or moves focus. Only `GalleryMediaPopup` and the team bio pop-up close with Escape among the ones visitors can open.
  - Park gallery: [GalleryMediaPopup.tsx](components/sections/parksections/GalleryMediaPopup.tsx)
  - Park "View Overview": [LocationOverviewSection.tsx:238-373](components/sections/parksections/LocationOverviewSection.tsx#L238-L373)
  - [CertDownloadModal.tsx](components/sections/parksections/CertDownloadModal.tsx)
  - [BrochurePopForm.tsx](components/sections/parksections/BrochurePopForm.tsx)
  - [ESGPopForm.tsx](components/sections/sustainPages/ESGPopForm.tsx)
  - [EnvironmentalThoughtsPopup.tsx](components/sections/sustainPages/EnvironmentalThoughtsPopup.tsx)
  - Awards pop-up in [AwardsRecognition.tsx:238-246](components/sections/sustainPages/AwardsRecognition.tsx#L238-L246)
  - Team bio: [popup.tsx](components/sections/team/popup.tsx)
  - [ServicesModal.tsx](components/sections/ServicesModal.tsx)
- **Fix:** build one shared accessible dialog wrapper and use it in all of them. It should:
  - set `role="dialog"`, `aria-modal="true"` and `aria-labelledby` pointing at the pop-up's visible title
  - move focus inside on open and keep Tab inside
  - close on Escape and return focus to the button that opened it
  - make the page behind `inert`
  - give every icon-only close button an `aria-label`
- Point 6 is the first user of this wrapper.

**i. Selected state that is shown by colour only**
- These tabs and switches show the current choice only by colour:
  - Park sub-menu ([TabNavSection.tsx](components/sections/parksections/TabNavSection.tsx))
  - Gallery tabs: [ConcavePanoramaSlider.tsx](components/sections/parksections/ConcavePanoramaSlider.tsx), [GallerySlider.tsx](components/sections/parksections/GallerySlider.tsx), [GalleryMediaPopup.tsx](components/sections/parksections/GalleryMediaPopup.tsx)
  - "View Overview" pop-up tabs
  - Exterior/Interior switch ([ExteriorInteriorWrapper.tsx:39-41](components/park2/ExteriorInteriorWrapper.tsx#L39-L41))
  - Blog "Explore" tabs ([BlogTabs.tsx](components/sections/blog/BlogTabs.tsx))
  - Mumbai/Pune switch ([ConnectWithUsSection.tsx:76-104](components/sections/contact/ConnectWithUsSection.tsx#L76-L104))
- **Fix:**
  - Add `aria-pressed` for toggle buttons, or `role="tablist"`/`role="tab"` with `aria-selected`. Use `aria-current` for the park sub-menu.
  - Add a non-colour cue such as an underline, border or bolder text.
- [SolutionsSidebar.tsx:57](components/sections/solutions/SolutionsSidebar.tsx#L57) (`aria-current="step"`) is already a good model.

**j. Custom dropdowns**
- The Careers "Department" and Contact "Type of Enquiry" dropdowns open by keyboard, but their options are `<li role="option" onClick>` with no keyboard handling, so nothing can be chosen.
- **Fix:** use a styled native `<select>`, or implement the full listbox keyboard pattern (arrow keys, Enter, Escape, `aria-activedescendant`).
- Several mobile dropdown buttons also need `aria-expanded`: the park sub-menu, the "View Overview" pop-up and "Location & Connectivity".

**k. Carousels**
- These Swiper instances have no `Keyboard` or `A11y` module: [TimeLine.tsx:654](components/sections/About/TimeLine.tsx#L654), [TimeLine.tsx:761](components/sections/About/TimeLine.tsx#L761), [RelatedPostsSlider.tsx:46](components/sections/blog/RelatedPostsSlider.tsx#L46).
- Tracks that only slide slides off-screen leave hidden slides in the Tab order (gallery, see 3.6). Mark non-active slides `inert`.

**l. Page-wide key listeners**
- [ConcavePanoramaSlider.tsx:252-256](components/sections/parksections/ConcavePanoramaSlider.tsx#L252-L256): the gallery listens for ← and → on `window`, so arrow keys anywhere on the park page move it, including while its own pop-up is open.
- [Map.tsx:769-813](components/sections/Map.tsx#L769-L813): while the map section is capturing scroll, it consumes Space, the arrow keys, Page Up/Down and Home/End.
- **Fix:** only react when focus is inside that section.

**Done when:** with the mouse unplugged, on every page:
- Every link, button, tab, card, accordion row, carousel and pop-up can be reached with Tab and Shift+Tab, operated with Enter or Space (arrow keys inside tabs and carousels), and closed with Escape.
- Focus is always clearly visible.
- The selected tab or menu item is announced as selected or current by NVDA.

### 3.5 Point 5: Accessibility Statement page + footer link

**Today:** there is no such page.
- The footer "Policies" column lists only "Privacy Policy" ([Footer.tsx:567-570](components/sections/Footer.tsx#L567-L570); the "Disclaimer" entry is commented out).
- The sitemap has no entry for it ([app/sitemap.ts:12-38](app/sitemap.ts#L12-L38)).

**Fix**
1. Add a new route `app/(site)/accessibility-statement/page.tsx`, built like [privacy-policy/page.tsx](app/(site)/privacy-policy/page.tsx): a server component with `export const metadata` (title, description, canonical), one `<h1>`, `<h2>` per section and real text. It inherits the skip link, header, main and footer from the layout.
2. Add `{ label: "Accessibility Statement", href: "/accessibility-statement" }` to the Policies list in [Footer.tsx:567-570](components/sections/Footer.tsx#L567-L570).
3. Add `/accessibility-statement` to `STATIC_ROUTES` in [app/sitemap.ts](app/sitemap.ts#L12-L38).

**Page content** (we draft it; KSH approves the wording):
1. **Commitment:** KSH INFRA Investment Managers Private Limited's commitment to an accessible website.
2. **Standard followed:** WCAG 2.1 Level AA, as required by SEBI circular SEBI/HO/ITD-1/ITD_VIAP/P/CIR/2025/131.
3. **Scope:** www.kshinfra.com, including third-party content (Google Maps, Vimeo videos, blog content from WordPress, links to social media).
4. **Conformance status:** partially conformant, with a list of known limitations and target dates (for example, captions and sign-language versions of videos).
5. **How it is tested:** audited by ITE Software Solutions on 21-10-2026, plus the date of the next re-test.
6. **How to report a problem:** the Nodal Officer's name, designation, email and phone (same as the footer, point 7) and a response time decided by KSH.
7. **Escalation:** the SEBI SCORES portal. The audit report names SCORES as the route for accessibility complaints.
8. **Dates:** published and last reviewed.

**Done when:** "Accessibility Statement" appears under Policies in the footer on every page, `/accessibility-statement` loads with one `<h1>`, and it is listed in `/sitemap.xml`.

### 3.6 Point 6: The video pop-up

**Which pop-up this is**
- **The park gallery pop-up** ([GalleryMediaPopup.tsx](components/sections/parksections/GalleryMediaPopup.tsx)) is the only video pop-up visitors can open today.
  - It appears on all 6 park pages and opens from the gallery section: [ConcavePanoramaSlider.tsx](components/sections/parksections/ConcavePanoramaSlider.tsx) on screens 768px and wider, [GallerySlider.tsx](components/sections/parksections/GallerySlider.tsx) on phones.
  - Each park's gallery includes 1–2 Vimeo videos, such as "Park Tour Video", shown in an `<iframe>`.
- **The "View Overview" pop-up** on park pages ([LocationOverviewSection.tsx:238-373](components/sections/parksections/LocationOverviewSection.tsx#L238-L373)) uses its own modal with a `<video>` player whenever a tab's media is an `.mp4`.
  - Today all 6 parks feed it only images, but it has the same problems and no Escape key at all. Fix it the same way.
- **The global `VideoModal`** ([VideoModal.tsx](components/ui/VideoModal.tsx)) is mounted on every page ([app/layout.tsx:82](app/layout.tsx#L82)), but nothing opens it: the case-study video buttons in `CaseStudies.tsx` are commented out.
  - Delete it, or apply the same fixes before re-enabling it. It also has an unlabelled close button ([VideoModal.tsx:43](components/ui/VideoModal.tsx#L43)) and a hard-coded video.

**Problems: opening the pop-up**
- **Desktop/tablet:** gallery cards are `<div onClick>` ([ConcavePanoramaSlider.tsx:347-354](components/sections/parksections/ConcavePanoramaSlider.tsx#L347-L354)), so a keyboard user cannot open the pop-up at all. The Vimeo iframe inside a video card is itself a Tab stop, so Tab lands inside a small inline player instead.
- **Phone:** slides are `<div onClick>` ([GallerySlider.tsx:126-131](components/sections/parksections/GallerySlider.tsx#L126-L131)). Off-screen slides and their iframes stay in the Tab order.

**Problems: inside the pop-up** ([GalleryMediaPopup.tsx](components/sections/parksections/GalleryMediaPopup.tsx))
- No `role="dialog"`, `aria-modal` or accessible name ([GalleryMediaPopup.tsx:97-110](components/sections/parksections/GalleryMediaPopup.tsx#L97-L110)), so screen readers don't announce that a pop-up opened.
- Focus stays on the page behind. Tab walks through the page under the overlay, and closing does not return focus.
- Already OK: Escape, ← and → ([GalleryMediaPopup.tsx:82-86](components/sections/parksections/GalleryMediaPopup.tsx#L82-L86)). However, the gallery behind also moves on ← and → (see 3.4 l).
- Tabs ([GalleryMediaPopup.tsx:135-147](components/sections/parksections/GalleryMediaPopup.tsx#L135-L147)) show the active tab by colour only.
- All slides are rendered side by side and moved with `translateX` ([GalleryMediaPopup.tsx:157-183](components/sections/parksections/GalleryMediaPopup.tsx#L157-L183)). Hidden slides' iframes are still focusable and read out.
- Nothing announces which slide is showing.
- Already OK: the close button has `aria-label` ([GalleryMediaPopup.tsx:115](components/sections/parksections/GalleryMediaPopup.tsx#L115)), the arrows have labels, and the iframes get `title={slide.title}`. Check that the titles in `parkpagecontent/*/content.ts` are descriptive, for example "KSH Chakan Park I, park tour video".

**Problems: the "View Overview" pop-up** ([LocationOverviewSection.tsx](components/sections/parksections/LocationOverviewSection.tsx))
- The opener is the image `<div onClick>` ([LocationOverviewSection.tsx:208-211](components/sections/parksections/LocationOverviewSection.tsx#L208-L211)). It wraps a "View Overview" `<button>` that has no handler or `type` of its own (line 218) and only works because the click bubbles up. Put the handler on the button.
- The modal ([LocationOverviewSection.tsx:241-259](components/sections/parksections/LocationOverviewSection.tsx#L241-L259)) has no dialog role or name, no Escape and no focus handling.
- The mobile tab dropdown button (line 301) has no `aria-expanded`.
- The `<video>` (lines 352-360) autoplays in a loop with sound. Make it start paused or muted. This touches the out-of-scope pause item, but it matters for screen-reader users, whose speech the video would talk over.

**Fix**
1. Render both pop-ups inside the shared dialog wrapper from 3.4 h.
   - Give the gallery pop-up a visible or screen-reader title, for example "<Park name> gallery".
   - Focus the first tab or the video on open, keep Tab inside, close on Escape, and return focus to the card that opened it.
2. Make each gallery card a real `<button>`, for example `aria-label="Open in gallery: Park Tour Video"` with `aria-haspopup="dialog"`.
3. In card previews, show a poster image instead of a live iframe, or set `tabIndex={-1}` on the preview iframe, so the card button is the only Tab stop.
4. Inside the pop-up:
   - Mark non-active slides `inert` and `aria-hidden`, or render only the active slide.
   - Add a polite live region such as "Slide 2 of 5: Park Tour Video".
   - Expose the selected tab (see 3.4 i).
5. Scope the slider's ← and → listener to the gallery, so the page behind doesn't move while the pop-up is open.

Captions and sign-language versions of the Vimeo videos are outside this point; enable CC in Vimeo separately.

**Done when:** on each park page, keyboard only, at desktop and phone width:
- Tab reaches the gallery and Enter opens the pop-up.
- NVDA says "dialog, <name>" and focus is inside.
- Tab cycles only through the pop-up's tabs, video, arrows and Close.
- ← and → change slides, and only the pop-up moves.
- Escape closes the pop-up and focus returns to the card that opened it.
- The same works for "View Overview".

### 3.7 Point 7: Nodal Officer in the footer

**Today:** the footer "Connect" column ([Footer.tsx:542-560](components/sections/Footer.tsx#L542-L560)) shows `leasing@kshinfra.com` and the toll-free number 1800-212-2030. There is no Accessibility (Nodal) Officer.

**Fix**
- Add a block titled "Accessibility (Nodal Officer)", either under "Connect" or in its own column, showing the name, designation, email (`mailto:` link) and phone (`tel:` link) as real text, not an image.
- Repeat the same details on the Accessibility Statement page.
- Because `Footer` is shared by both layouts, this covers every page, including the investor pages.

**Needs from KSH:** the officer's name, designation, email and phone number.

**Done when:** the details are visible in the footer on every page at desktop and phone width, and the email and phone links work.

---

## 4. Page by page

Points 1, 5 and 7 have no page-specific work: once section 3 is done they appear on every page through the layout and footer. Check them on each page during testing.

### 4.0 Matrix

| Page | URL | 1 Skip | 2 Landmarks | 3 Headings | 4 Keyboard | 5 Statement link | 6 Video pop-up | 7 Nodal officer |
|---|---|---|---|---|---|---|---|---|
| Home | `/` | ❌ S | ⚠️ own `<main>` → `<div>` | ⚠️ | ❌ | ❌ S | — | ❌ S |
| About | `/about-ksh` | ❌ S | ❌ no `<main>` | ⚠️ | ❌ | ❌ S | — | ❌ S |
| Our Team | `/our-team` | ❌ S | ❌ no `<main>`, 2nd menu | ✅ | ❌ | ❌ S | — | ❌ S |
| Parks overview | `/parks` | ❌ S | ❌ no `<main>` | ✅ | ❌ | ❌ S | — | ❌ S |
| Park pages (6) | `/ksh-chakan-i`, `-ii`, `-iii`, `-iv`, `/ksh-hosur-i`, `/ksh-talegaon-i` | ❌ S | ⚠️ own `<main>`, sub-menu unnamed | ❌ no `<h1>` | ❌ | ❌ S | ❌ | ❌ S |
| Investors overview | `/investors` | ❌ S | ⚠️ hero outside `<main>` | ❌ two `<h1>` | ⚠️ S only | ❌ S | — | ❌ S |
| Fund I details | `/investors/fund-I-details` | ❌ S | ⚠️ hero outside `<main>` | ⚠️ | ❌ | ❌ S | — | ❌ S |
| Governance | `/investors/governance` | ❌ S | ⚠️ hero outside `<main>` | ❌ no `<h1>` | ❌ | ❌ S | — | ❌ S |
| Investor contact | `/investors/contact` | ❌ S | ⚠️ hero outside `<main>` | ✅ | ⚠️ S only | ❌ S | — | ❌ S |
| Institutional investors | `/investors/institutional-investors` | ❌ S | ❌ 2nd menu | ✅ | ❌ | ❌ S | — | ❌ S |
| Solutions | `/solutions` | ❌ S | ❌ no `<main>` | ✅ | ❌ | ❌ S | — | ❌ S |
| Sustainability | `/sustainability` | ❌ S | ❌ no `<main>` | ⚠️ | ❌ | ❌ S | — | ❌ S |
| Careers | `/careers` | ❌ S | ⚠️ own `<main>` | ✅ | ❌ | ❌ S | — | ❌ S |
| Media (Blogs / News / Press) | `/blogs`, `?tab=news`, `?tab=press` | ❌ S | ⚠️ own `<main>` | ✅ | ⚠️ | ❌ S | — | ❌ S |
| Blog post / News post | `/blogs/[slug]`, `/news/[slug]` | ❌ S | ❌ no `<main>` | ✅ (check WordPress body) | ⚠️ | ❌ S | — | ❌ S |
| Case studies | `/case-studies` | ❌ S | ❌ no `<main>` | ❌ no `<h1>` | ⚠️ S only | ❌ S | — | ❌ S |
| Case study (4) | `/case-studies/jabil`, `hindalco`, `kawasaki`, `barnes` | ❌ S | ❌ no `<main>` | ❌ two `<h1>` | ⚠️ S only | ❌ S | — | ❌ S |
| Contact | `/contact-us` | ❌ S | ❌ 2nd menu | ⚠️ | ❌ | ❌ S | — | ❌ S |
| Testimonials | `/testimonials` | ❌ S | ❌ no `<main>`, nav mislabelled | ⚠️ | ⚠️ | ❌ S | — | ❌ S |
| Privacy Policy | `/privacy-policy` | ❌ S | ❌ no `<main>` | ⚠️ | ⚠️ S only | ❌ S | — | ❌ S |
| Thank you | `/thank-you` | ❌ S | ❌ no `<main>` | ✅ | ⚠️ S only | ❌ S | — | ❌ S |
| **New:** Accessibility Statement | `/accessibility-statement` | built in | built in | build with one `<h1>` | — | is the target | — | repeat details |

"Own `<main>` → `<div>`" means the page already has a `<main>`, which must become a `<div>` once the layout provides the single `<main>` (3.2). "No `<main>`" pages need nothing extra beyond the layout change. In both cases the footer and top menu also need the shared fixes.

### 4.1 Home: `/`

[app/(site)/page.tsx](app/(site)/page.tsx)

- **2. Landmarks:** change the page's `<main>` ([page.tsx:105](app/(site)/page.tsx#L105)) to `<div>`.
- **3. Headings:**
  - The `<h1>` is the hero slide heading ([Hero.tsx:673](components/sections/Hero.tsx#L673) mobile, [794](components/sections/Hero.tsx#L794) desktop; only one renders per screen size). Its text changes with every slide, so screen-reader users get a different page title each time. Prefer a fixed `<h1>`, for example the first slide's text, with the other slides' headings as `<p>`. **Needs a decision.**
  - "Our Portfolio by the Numbers" figures are `<h6>` directly after an `<h2>` ([ScrollFrames.tsx:486](components/sections/ScrollFrames.tsx#L486), [578](components/sections/ScrollFrames.tsx#L578)). Change them to `<p>`.
  - Optional: the long sentence under the banner ("KSH INFRA delivers expertise…") is an `<h2>` ([About.tsx:245](components/sections/About.tsx#L245)), while the real section title "Who are we?" is another `<h2>` ([About.tsx:291](components/sections/About.tsx#L291)). Make the sentence a `<p>`.
  - Target outline: H1 hero → H2 Who are we? → H3 accordion items → H2 Our Portfolio by the Numbers → H2 Explore Our Parks → H3 parks → H2 How We Create Value → H3 → H2 Built Around Operational Needs → H3 → H2 What our Clients Say! → H3 → H2 Trusted by Leading Occupiers → H2 Building Responsibly for the Long Term → H3 → H2 Build Industry. Build Careers. → H3 → H2 Market Perspectives & Updates → H3 → footer.
- **4. Keyboard:**
  - **Hero:** the desktop text panel brightens only on mouse hover ([Hero.tsx:757-759](components/sections/Hero.tsx#L757-L759)). Mirror it with `onFocusCapture`/`onBlurCapture`.
  - **Who are we? accordion:** rows are `<div onClick>` ([AboutAccordion.tsx:59-60](components/sections/AboutAccordion.tsx#L59-L60)). Make them `<button aria-expanded>`.
  - **Explore Our Parks map (desktop):** the state shapes are `<svg onClick>` ([Map.tsx:1628-1650](components/sections/Map.tsx#L1628-L1650)), so a state can't be opened by keyboard. On phones they are already buttons ([Map.tsx:1315](components/sections/Map.tsx#L1315)). Also see the key capture in 3.4 l.
  - **How We Create Value:**
    - The desktop list updates the preview only on hover ([Services.tsx:482-490](components/sections/Services.tsx#L482-L490)); add `onFocus`.
    - The mobile accordion removes the focus ring ([Services.tsx:276](components/sections/Services.tsx#L276)).
    - "View More" ([Services.tsx:260](components/sections/Services.tsx#L260)) opens `ServicesModal`, which has no dialog role, no Escape and no focus handling ([ServicesModal.tsx:15-34](components/sections/ServicesModal.tsx#L15-L34)).
  - **Built Around Operational Needs (desktop):** cards expand only on hover ([CaseStudies.tsx:420-424](components/sections/CaseStudies.tsx#L420-L424)), and the case-study link exists only inside the expanded card ([CaseStudies.tsx:463](components/sections/CaseStudies.tsx#L463), [497](components/sections/CaseStudies.tsx#L497)). **A keyboard user can reach only the first case study.** Make each card a button that expands on focus or Enter, or render the link in every card.
  - **Building Responsibly for the Long Term:** buttons remove the focus ring ([AssetShowcase.tsx:758](components/sections/AssetShowcase.tsx#L758)).
  - **Build Industry. Build Careers.:** rows are `<div onClick>` ([Growth.tsx:156](components/sections/Growth.tsx#L156) mobile; [295-297](components/sections/Growth.tsx#L295-L297) desktop, also hover). Make them buttons.
  - **Market Perspectives & Updates:** the cards are links (good), but their highlight is hover-only ([Insights.tsx:664-676](components/sections/Insights.tsx#L664-L676)). Add focus.
- **6. Video pop-up:** none. The hero and "Portfolio" videos are background videos, not pop-ups.

### 4.2 About: `/about-ksh`

[app/(site)/about-ksh/page.tsx](app/(site)/about-ksh/page.tsx)

- **2. Landmarks:** no `<main>`; the root is a `<div>` ([page.tsx:37](app/(site)/about-ksh/page.tsx#L37)). Covered by the layout change.
- **3. Headings:** the H1 "About" ([About/Hero.tsx:41](components/sections/About/Hero.tsx#L41)) is fine.
  - "Inspiring Green Development" figures are `<h6>` ([AboutPlatformSection.tsx:298](components/sections/About/AboutPlatformSection.tsx#L298), [329](components/sections/About/AboutPlatformSection.tsx#L329)). Change to `<p>`.
  - The Values items are `<h4>` directly under an `<h2>` ([VisionShowcase.tsx:324](components/sections/About/VisionShowcase.tsx#L324)). Change to `<h3>`.
  - "The KSH Legacy" year badges are `<h2>` ([TimeLine.tsx:700](components/sections/About/TimeLine.tsx#L700), [808](components/sections/About/TimeLine.tsx#L808)). Change to `<h3>`.
- **4. Keyboard:**
  - "The KSH Group" rows are `<div onClick>` ([KshScroll.tsx:591](components/sections/About/KshScroll.tsx#L591) desktop, [738](components/sections/About/KshScroll.tsx#L738) mobile). Make them buttons.
  - The timeline Swipers have no Keyboard/A11y modules ([TimeLine.tsx:654](components/sections/About/TimeLine.tsx#L654), [761](components/sections/About/TimeLine.tsx#L761)).
  - On phones and tablets, timeline cards open details via `<div onClick>` ([TimeCard.tsx:230-231](components/sections/About/TimeCard.tsx#L230-L231)). Make them buttons.
- **6. Video pop-up:** none.

### 4.3 Our Team: `/our-team`

[app/(site)/our-team/page.tsx](app/(site)/our-team/page.tsx)

- **2. Landmarks:** no `<main>` ([page.tsx:15](app/(site)/our-team/page.tsx#L15)). Remove the second `<Navbar />` from the hero ([ourteam.tsx:49](components/sections/team/ourteam.tsx#L49)).
- **3. Headings:** ✅ H1 "OUR TEAM" ([ourteam.tsx:58](components/sections/team/ourteam.tsx#L58)) → H2 "Meet Our Team" → H3 names. The bio pop-up's H2 is fine inside a dialog.
- **4. Keyboard:**
  - Member photos open the bio via `<div onClick>` ([memberssec.tsx:261-266](components/sections/team/memberssec.tsx#L261-L266)). Make them buttons, for example "Read bio: <name>".
  - LinkedIn icon links have no accessible name ([memberssec.tsx:249-257](components/sections/team/memberssec.tsx#L249-L257)). Add `aria-label="<name> on LinkedIn"`.
  - Bio pop-up ([popup.tsx:149-181](components/sections/team/popup.tsx#L149-L181)): Escape already works. It has no dialog role, the close button has no label (line 181), and focus is not moved in, trapped or returned. Use the shared dialog wrapper.
  - The duplicate menu doubles the Tab stops at the top of the page.
- **6. Video pop-up:** none.

### 4.4 Parks overview: `/parks`

[app/(site)/parks/page.tsx](app/(site)/parks/page.tsx)

- **2. Landmarks:** no `<main>` ([page.tsx:98](app/(site)/parks/page.tsx#L98)).
- **3. Headings:** ✅ H1 "Overview" ([Overview/Hero.tsx:35](components/sections/Overview/Hero.tsx#L35)) → H2 per section. Optional: "Parks Overview" would be a clearer `<h1>`.
- **4. Keyboard:**
  - The map has the same desktop issue as on the home page.
  - "KSH INFRA builds solutions…" rows are `<div onClick>` ([overviewServices.tsx:97](components/sections/Overview/overviewServices.tsx#L97) mobile; [223](components/sections/Overview/overviewServices.tsx#L223) desktop, also hover). Make them buttons.
- **6. Video pop-up:** none.

### 4.5 Park pages (6): `/ksh-chakan-i`, `/ksh-chakan-ii`, `/ksh-chakan-iii`, `/ksh-chakan-iv`, `/ksh-hosur-i`, `/ksh-talegaon-i`

All six use the same components, so one fix covers all. Differences: `/ksh-talegaon-i` has no `ParkScroll`, and `/ksh-chakan-iv` uses `ParkScroll`'s default content.

- **2. Landmarks:**
  - Change each page's `<main>` to `<div>` (for example [ksh-chakan-i/page.tsx:46](app/(site)/ksh-chakan-i/page.tsx#L46)).
  - Add `aria-label="Park sections"` to the sub-menu `<nav>` ([TabNavSection.tsx:115](components/sections/parksections/TabNavSection.tsx#L115)).
- **3. Headings:** ❌
  - **There is no `<h1>`.** The park name in the hero is a `<p>` ([VideoHeroSection.tsx:351-353](components/sections/parksections/VideoHeroSection.tsx#L351-L353)). Make it `<h1>`.
  - The "Park Highlights" section has no heading; its `<h2>` is commented out ([LocationOverviewSection.tsx:198-204](components/sections/parksections/LocationOverviewSection.tsx#L198-L204)). Restore it, or add a visually hidden `<h2>Park Highlights</h2>`.
  - "Location & Connectivity" ([InteractiveMap.tsx](components/sections/parksections/InteractiveMap.tsx)) has no heading. Add an `<h2>`.
  - Target outline: H1 park name → H2 about → H2 Park Highlights → H2 Location & Connectivity → H2 (ParkScroll) → H3 items → H2 Infrastructure → H3 → H2 gallery → H2 insights → H3.
- **4. Keyboard:**
  - **Sub-menu:** the items are buttons (good). The current section is shown only by colour and a tick; add `aria-current`. The mobile dropdown button ([TabNavSection.tsx:147](components/sections/parksections/TabNavSection.tsx#L147)) needs `aria-expanded`.
  - **Brochure and certificate pop-ups:** neither has Escape, a dialog role or focus handling ([BrochurePopForm.tsx](components/sections/parksections/BrochurePopForm.tsx), [CertDownloadModal.tsx:35-43](components/sections/parksections/CertDownloadModal.tsx#L35-L43)). Their inputs remove the focus ring ([BrochurePopForm.tsx:188](components/sections/parksections/BrochurePopForm.tsx#L188), [207](components/sections/parksections/BrochurePopForm.tsx#L207); [OtpInput.tsx:79](components/sections/parksections/OtpInput.tsx#L79)).
  - **Location & Connectivity:**
    - The map wrapper hides focus on every map control ([InteractiveMap.tsx:371](components/sections/parksections/InteractiveMap.tsx#L371)).
    - The mobile location dropdown ([InteractiveMap.tsx:242](components/sections/parksections/InteractiveMap.tsx#L242)) needs `aria-expanded`.
  - **ParkScroll** (not on Talegaon): rows are `<div onClick>` ([ParkScroll.tsx:86](components/sections/parksections/ParkScroll.tsx#L86), [221](components/sections/parksections/ParkScroll.tsx#L221)). Make them buttons.
  - **Infrastructure:**
    - Hotspot labels on the Exterior/Interior image appear only on mouse hover ([HotspotShared.tsx:107-108](components/park2/HotspotShared.tsx#L107-L108), [Hotspot.tsx:96-97](components/park2/Hotspot.tsx#L96-L97)). Make each hotspot a focusable button that shows its text on focus.
    - The mobile accordion removes the focus ring ([HotspotShared.tsx:183](components/park2/HotspotShared.tsx#L183), [Interior.tsx:211](components/park2/Interior.tsx#L211)).
    - The Exterior/Interior switch needs `aria-pressed` ([ExteriorInteriorWrapper.tsx:39-41](components/park2/ExteriorInteriorWrapper.tsx#L39-L41)).
- **6. Video pop-up:** ❌ the gallery pop-up and "View Overview" pop-up. See 3.6. Test on all six pages.

### 4.6 Investors overview: `/investors`

[app/investors/page.tsx](app/investors/page.tsx)

- **2. Landmarks:** the hero sits outside the page's `<main>` ([page.tsx:21-23](app/investors/page.tsx#L21-L23)). The layout `<main>` fixes this; change the page `<main>` to `<div>`.
- **3. Headings:** ❌ there are two `<h1>` on desktop:
  - Intro "Investing in India's Industrial Growth" ([Overview/Intro.tsx:18](components/AifComponents/Overview/Intro.tsx#L18))
  - "KSH INFRA is well positioned…" ([PositioningSnapshot.tsx:1236](components/AifComponents/Overview/PositioningSnapshot.tsx#L1236)). Change this one to `<h2>`; the mobile version already uses `<h2>` (line 1260).
- **4. Keyboard:** shared fixes only.
- **6. Video pop-up:** none.

### 4.7 Fund I details: `/investors/fund-I-details`

[app/investors/fund-I-details/page.tsx](app/investors/fund-I-details/page.tsx)

- **2. Landmarks:** same as 4.6 ([page.tsx:20-22](app/investors/fund-I-details/page.tsx#L20-L22)).
- **3. Headings:** the H1 ([FundDetails/Intro.tsx:15](components/AifComponents/FundDetails/Intro.tsx#L15)) is followed by H3 "Meet the Fund Manager" ([VehicleAndWhyKsh.tsx:112](components/AifComponents/FundDetails/VehicleAndWhyKsh.tsx#L112)) and H4 "KSH INFRA – Where Capital Meets Capability" ([VehicleAndWhyKsh.tsx:129](components/AifComponents/FundDetails/VehicleAndWhyKsh.tsx#L129)), then the `<h2>` sections. Make both of these `<h2>`.
- **4. Keyboard:**
  - The fund-manager card has `tabIndex={0}` but no Enter/Space handler, so it can be focused but not opened, and `outline-none` hides the focus ([MemberCard2.tsx:17-24](components/AifComponents/Governance/MemberCard2.tsx#L17-L24)). Make it a `<button>`.
  - The LinkedIn icon link has no name ([MemberCard2.tsx:44](components/AifComponents/Governance/MemberCard2.tsx#L44)).
  - The bio pop-up has the same issues as 4.3.
- **6. Video pop-up:** none.

### 4.8 Governance: `/investors/governance`

[app/investors/governance/page.tsx](app/investors/governance/page.tsx)

- **2. Landmarks:** same as 4.6 ([page.tsx:16-18](app/investors/governance/page.tsx#L16-L18)).
- **3. Headings:** ❌ **there is no `<h1>`.**
  - The Intro that held it is disabled ([page.tsx:19](app/investors/governance/page.tsx#L19)).
  - The big "GOVERNANCE" word in the hero is a decorative `<span>` ([Governance/Hero.tsx:32](components/AifComponents/Governance/Hero.tsx#L32)).
  - Add an `<h1>`, either by turning that word into the `<h1>` or with a visually hidden `<h1>Governance</h1>`. Then H2 ([InvestmentCommittee.tsx:122](components/AifComponents/Governance/InvestmentCommittee.tsx#L122)) → H3 (line 154) is fine.
- **4. Keyboard:** member cards have the same issue as 4.7 ([MemberCard.tsx:17-24](components/AifComponents/Governance/MemberCard.tsx#L17-L24), LinkedIn at [line 44](components/AifComponents/Governance/MemberCard.tsx#L44)), plus the bio pop-up.
- **6. Video pop-up:** none.

### 4.9 Investor contact: `/investors/contact`

[app/investors/contact/page.tsx](app/investors/contact/page.tsx)

- **2. Landmarks:** same as 4.6 ([page.tsx:8-10](app/investors/contact/page.tsx#L8-L10)). The `<aside>` ([OtherEnquiries.tsx:5](components/AifComponents/Contact/OtherEnquiries.tsx#L5)) inside `<main>` is fine.
- **3. Headings:** ✅ one H1 ([Contact/Intro.tsx:11](components/AifComponents/Contact/Intro.tsx#L11)).
- **4. Keyboard:** shared fixes only.
- **6. Video pop-up:** none.

### 4.10 Institutional investors: `/investors/institutional-investors`

[app/(site)/investors/institutional-investors/page.tsx](app/(site)/investors/institutional-investors/page.tsx)

- **2. Landmarks:** ❌ remove the second `<Navbar />` ([InvestorHeroSection.tsx:46](components/sections/Investor/InvestorHeroSection.tsx#L46)). Change the page `<main>` ([page.tsx:19](app/(site)/investors/institutional-investors/page.tsx#L19)) to `<div>`.
- **3. Headings:** ✅ H1 "INVESTORS" ([InvestorHeroSection.tsx:51](components/sections/Investor/InvestorHeroSection.tsx#L51)) → H2 sections.
- **4. Keyboard:** the duplicate menu doubles the Tab stops; otherwise shared fixes only.
- **6. Video pop-up:** none.

### 4.11 Solutions: `/solutions`

[app/(site)/solutions/page.tsx](app/(site)/solutions/page.tsx)

- **2. Landmarks:** no `<main>`; the page is a fragment ([page.tsx:17](app/(site)/solutions/page.tsx#L17)).
- **3. Headings:** ✅ H1 "Solutions" ([HeroSolut.tsx:33](components/sections/solutions/HeroSolut.tsx#L33)) → H2 "Sustainable Growth" → H3 sidebar and card titles → H2 CTA.
- **4. Keyboard:**
  - Solution cards are `<div onClick>` with hover ([SolutionCard.tsx:81-90](components/sections/solutions/SolutionCard.tsx#L81-L90)). Make them buttons with `aria-expanded`.
  - The sidebar is already correct (buttons with `aria-current`).
- **6. Video pop-up:** none.

### 4.12 Sustainability: `/sustainability`

[app/(site)/sustainability/page.tsx](app/(site)/sustainability/page.tsx)

- **2. Landmarks:** no `<main>`; the page is a fragment ([page.tsx:22](app/(site)/sustainability/page.tsx#L22)).
- **3. Headings:** the H1 "Sustainability" ([SusHero.tsx:45](components/sections/sustainPages/SusHero.tsx#L45)) is fine. In "Certificates", each certificate name is an animated `<h2>` ([CertificationSection.tsx:699-702](components/sections/sustainPages/CertificationSection.tsx#L699-L702), used at line 921) directly under H2 "Certificates" (line 912). Change it to `<h3>`. The other sections are fine.
- **4. Keyboard:**
  - **Downloads:**
    - The year selects remove the focus ring ([ESGReports.tsx:266](components/sections/sustainPages/ESGReports.tsx#L266), [331](components/sections/sustainPages/ESGReports.tsx#L331)).
    - The download form pop-up has no Escape, dialog role or focus handling, and its inputs remove the ring ([ESGPopForm.tsx:169](components/sections/sustainPages/ESGPopForm.tsx#L169), [218](components/sections/sustainPages/ESGPopForm.tsx#L218), [237](components/sections/sustainPages/ESGPopForm.tsx#L237)).
    - The certificate pop-up has the same issues as on the park pages.
  - **Awards & Industry Recognition:**
    - Cards are `<div onClick>` ([AwardsRecognition.tsx:182-183](components/sections/sustainPages/AwardsRecognition.tsx#L182-L183)), and the award description appears only on hover ([line 216](components/sections/sustainPages/AwardsRecognition.tsx#L216)).
    - The mobile title is a `<div onClick>` ([line 198](components/sections/sustainPages/AwardsRecognition.tsx#L198)).
    - The award pop-up ([lines 238-246](components/sections/sustainPages/AwardsRecognition.tsx#L238-L246)) has no Escape or dialog role.
  - **KSH INFRA Parks: Committed to the Environment:** rows are `<div onClick>` ([sustainPages/KshScroll.tsx:478](components/sections/sustainPages/KshScroll.tsx#L478)), and its pop-up has no Escape or dialog role ([EnvironmentalThoughtsPopup.tsx:31-39](components/sections/sustainPages/EnvironmentalThoughtsPopup.tsx#L31-L39)).
  - **Social commitment:** buttons remove the focus ring ([SocialCommitment.tsx:982](components/sections/sustainPages/SocialCommitment.tsx#L982)).
  - **Governance:** accordion rows are `<div onClick>` ([sustainPages/GovernanceSection.tsx:234-235](components/sections/sustainPages/GovernanceSection.tsx#L234-L235)).
- **6. Video pop-up:** none.

### 4.13 Careers: `/careers`

[app/(site)/careers/page.tsx](app/(site)/careers/page.tsx)

- **2. Landmarks:** change the page `<main>` ([page.tsx:20](app/(site)/careers/page.tsx#L20)) to `<div>`.
- **3. Headings:** ✅ H1 "Careers" ([CareerHeroSection.tsx:41](components/sections/career/CareerHeroSection.tsx#L41)) → H2 → H3.
- **4. Keyboard:**
  - "Commitment to Employee Well-Being & Growth" rows are `<div onClick>` ([CommitmentWellBeingSection.tsx:556-557](components/sections/career/CommitmentWellBeingSection.tsx#L556-L557)). Make them buttons.
  - **The "Department" dropdown can't be used by keyboard.** The trigger opens the list ([CareerFormSection.tsx:76-82](components/sections/career/CareerFormSection.tsx#L76-L82)), but the options are `<li role="option" onClick>` ([lines 120-124](components/sections/career/CareerFormSection.tsx#L120-L124)). See 3.4 j.
  - The inputs remove the focus ring ([lines 367-455](components/sections/career/CareerFormSection.tsx#L367-L455)).
- **6. Video pop-up:** none.

### 4.14 Media: `/blogs` (also `?tab=news`, `?tab=press`)

[app/(site)/blogs/page.tsx](app/(site)/blogs/page.tsx)

- **2. Landmarks:** change the page `<main>` ([page.tsx:62](app/(site)/blogs/page.tsx#L62)) to `<div>`.
- **3. Headings:** ✅ H1 "Blogs" ([BlogHero.tsx:16](components/sections/blog/BlogHero.tsx#L16)) → H2 "Featured" → H3 → H2 "Explore" → H3 cards.
- **4. Keyboard:** the "Explore" tabs are buttons ([BlogTabs.tsx:137](components/sections/blog/BlogTabs.tsx#L137) onwards), but the active tab isn't exposed. See 3.4 i. Slider arrows are already labelled.
- **6. Video pop-up:** none.

### 4.15 Blog post and news post: `/blogs/[slug]`, `/news/[slug]`

[PostContent.tsx](components/sections/blog/PostContent.tsx)

- **2. Landmarks:** no `<main>`; the root is a `<div>` ([PostContent.tsx:44](components/sections/blog/PostContent.tsx#L44)). The layout fixes this. Also wrap the post in `<article>`.
- **3. Headings:** H1 is the post title ([PostContent.tsx:77](components/sections/blog/PostContent.tsx#L77)), then H2 "Related" and H3 cards.
  - The body headings come from WordPress, and `globals.css` styles `.blog-content h1` ([line 1121](app/globals.css#L1121)), so some posts likely contain a second `<h1>`.
  - Editors should use H2 and below in WordPress, or the site should map body `h1` to `h2`.
- **4. Keyboard:** the related-posts Swiper has no Keyboard/A11y modules ([RelatedPostsSlider.tsx:46](components/sections/blog/RelatedPostsSlider.tsx#L46)). The share icons are already labelled.
- **6. Video pop-up:** none.

### 4.16 Case studies: `/case-studies`

[app/(site)/case-studies/page.tsx](app/(site)/case-studies/page.tsx)

- **2. Landmarks:** no `<main>`; the page is a fragment ([page.tsx:46](app/(site)/case-studies/page.tsx#L46)).
- **3. Headings:** ❌ **there is no `<h1>`.** Change "Built Around Operational Needs" from `<h2>` to `<h1>` ([CaseStudiesGrid.tsx:20](components/sections/CaseStudiesGrid.tsx#L20)). The H3 cards and H2 "Trusted by Leading Occupiers" are fine.
- **4. Keyboard:** shared fixes only; the cards are links.
- **6. Video pop-up:** none.

### 4.17 Case study: `/case-studies/jabil`, `/hindalco`, `/kawasaki`, `/barnes`

[app/(site)/case-studies/[slug]/page.tsx](app/(site)/case-studies/[slug]/page.tsx)

- **2. Landmarks:** no `<main>`; the page is a fragment ([page.tsx:36](app/(site)/case-studies/[slug]/page.tsx#L36)).
- **3. Headings:** ❌ **there are two `<h1>`:** the company name in the hero ([CaseHero.tsx:34](components/sections/casestudies/CaseHero.tsx#L34)) and the About heading ([CaseAbout.tsx:39](components/sections/casestudies/CaseAbout.tsx#L39)). Keep one `<h1>` and make the other `<h2>`. H2 "CHALLENGES", "SOLUTION" and "Outcome" are fine.
- **4. Keyboard:** shared fixes only.
- **6. Video pop-up:** none. The old case-study video pop-up is disabled (see 3.6).

### 4.18 Contact: `/contact-us`

[app/(site)/contact-us/page.tsx](app/(site)/contact-us/page.tsx)

- **2. Landmarks:** ❌ remove the second `<Navbar />` ([ContactHero.tsx:45](components/sections/contact/ContactHero.tsx#L45)). Change the page `<main>` ([page.tsx:18](app/(site)/contact-us/page.tsx#L18)) to `<div>`.
- **3. Headings:** H1 "Contact" ([ContactHero.tsx:49](components/sections/contact/ContactHero.tsx#L49)) jumps to H3 office names ([ContactFormSection.tsx:388](components/sections/contact/ContactFormSection.tsx#L388), [416](components/sections/contact/ContactFormSection.tsx#L416)), then H2 "Connect with us" ([ConnectWithUsSection.tsx:59](components/sections/contact/ConnectWithUsSection.tsx#L59)). Make the office names `<h2>`, or add an `<h2>` above them.
- **4. Keyboard:**
  - **The "Type of Enquiry" dropdown can't be used by keyboard** ([ContactFormSection.tsx:165](components/sections/contact/ContactFormSection.tsx#L165) trigger, [210](components/sections/contact/ContactFormSection.tsx#L210) `<li onClick>`). See 3.4 j.
  - The inputs and textarea remove the focus ring ([lines 530-643](components/sections/contact/ContactFormSection.tsx#L530-L643)).
  - The Mumbai/Pune switch needs `aria-pressed` ([ConnectWithUsSection.tsx:76-104](components/sections/contact/ConnectWithUsSection.tsx#L76-L104)).
  - The map wrapper hides focus ([ConnectWithUsSection.tsx:120](components/sections/contact/ConnectWithUsSection.tsx#L120)).
  - The duplicate menu doubles the Tab stops.
- **6. Video pop-up:** none.

### 4.19 Testimonials: `/testimonials`

[app/(site)/testimonials/page.tsx](app/(site)/testimonials/page.tsx)

- **2. Landmarks:** no `<main>` ([page.tsx:15](app/(site)/testimonials/page.tsx#L15)). The sidebar `<nav>` is labelled "Solutions timeline" but lists clients ([SolutionsSidebar.tsx:33](components/sections/solutions/SolutionsSidebar.tsx#L33)). Pass a label such as "Clients".
- **3. Headings:** H1 "Testimonials" ([Testimonials/Hero.tsx:87](components/sections/Testimonials/Hero.tsx#L87)) jumps to H3 client names in the sidebar ([SolutionsSidebar.tsx:69](components/sections/solutions/SolutionsSidebar.tsx#L69)). Testimonial card names are `<p>` ([TestimonialCard.tsx:305](components/sections/Testimonials/TestimonialCard.tsx#L305)). The CTA is an H2. Fix: add an `<h2>` for the list (it can be visually hidden, for example "Client testimonials") and make the card names `<h3>`.
- **4. Keyboard:** the sidebar is already correct (buttons with `aria-current`). Shared fixes otherwise.
- **6. Video pop-up:** none.

### 4.20 Privacy Policy: `/privacy-policy`

[app/(site)/privacy-policy/page.tsx](app/(site)/privacy-policy/page.tsx)

- **2. Landmarks:** no `<main>`; the root is a `<section>` ([page.tsx:8](app/(site)/privacy-policy/page.tsx#L8)).
- **3. Headings:** H1 (line 11) and H2 "Also for Cookies" (line 176) are fine. The sub-titles "What Are Cookies", "How We Use Cookies", "Managing Cookies" and "Further Information about Cookies" are `<p><strong>` ([lines 189](app/(site)/privacy-policy/page.tsx#L189), 195, 205, 212). Change them to `<h3>`.
- **4. Keyboard:** shared fixes only.

### 4.21 Thank you: `/thank-you`

[app/(site)/thank-you/page.tsx](app/(site)/thank-you/page.tsx)

- **2. Landmarks:** no `<main>`; the root is a `<div>` ([page.tsx:36](app/(site)/thank-you/page.tsx#L36)).
- **3. Headings:** ✅ one H1 (line 40).
- **4. Keyboard:** shared fixes only. The "Return Home" button is a real button.

### 4.22 New: Accessibility Statement: `/accessibility-statement`

Build it as described in 3.5. Because it uses the site layout, it gets points 1, 2, 4 (shared) and 7 automatically. Give it one `<h1>` and `<h2>` sections.

---

## 5. Information needed from KSH

1. **Nodal Officer:** name, designation, email and phone number (point 7, also used on the statement page).
2. **Accessibility Statement:** approval of the wording, the response time for reported problems, and agreement on the "known limitations" list and target dates.
3. **Home page `<h1>`:** which text should be the permanent page title (see 4.1).
4. **Case-study video pop-up:** will it come back? If not, delete `VideoModal` (see 3.6).

---

## 6. How to check each point after the changes

Use Chrome and NVDA (free screen reader), plus the axe DevTools extension (the auditor used axe-core 4.11). Run every check at desktop width and at phone width (about 375px).

| Point | Test |
|---|---|
| 1 | Load the page and press Tab once: "Skip to main content" appears top-left. Press Enter, then Tab: focus lands in the page content, not the menu. Test on `/` and at least one other page (Lenis behaves differently on `/`). |
| 2 | NVDA, Insert+F7 → Landmarks: one banner, navigation "Main", one main, content info. No duplicate "Main" navigation on `/contact-us`, `/our-team` or `/investors/institutional-investors`. |
| 3 | NVDA, Insert+F7 → Headings (or the HeadingsMap extension): exactly one level-1 heading, which is the page title, and no jumps such as 1→3 or 2→4. |
| 4 | Mouse unplugged: Tab through the whole page. Every interactive item is reached in a sensible order, is operable with Enter or Space, and always shows a clear focus ring. Tabs and switches are read as "selected" or "pressed". The current page is marked in the menu. Pop-ups trap focus, close on Escape, and return focus to their opener. |
| 5 | The footer shows "Accessibility Statement" on every page, and the page opens and passes checks 1–4. `/sitemap.xml` lists it. |
| 6 | On each of the 6 park pages, run the steps in 3.6 "Done when", at desktop and phone width. |
| 7 | The footer shows the Nodal Officer's name, designation, email and phone on every page, including `/investors/*`. |

---

## Appendix A: internal routes

These routes are not in the sitemap and are not linked from the site. Either delete them or give them the same fixes; the auditor only reviews public pages.

- `/home` ([app/(site)/home/page.tsx](app/(site)/home/page.tsx)) duplicates `/` and is blocked in `robots.ts`.
- `/park2` ([app/(site)/park2/page.tsx](app/(site)/park2/page.tsx)) is a park template demo. It also renders `InfrastructureSection`, which has its own hotspot video pop-up. It is blocked in `robots.ts`.
- `/preview-exterior` is an internal preview, blocked in `robots.ts`.
- `/test1` ([app/test1/page.tsx](app/test1/page.tsx)) has no site layout at all and is **not** blocked in [app/robots.ts](app/robots.ts).

## Appendix B: noticed while checking, outside the 7 points

These are not in this task. They are listed so they don't get lost.

- **Colour contrast:** the 26 axe items in the PDF plus similar ones on other pages. See [LIVE-accessibility-audit-fixes.md](LIVE-accessibility-audit-fixes.md) section 2.
- **Captions and Indian Sign Language** for the Vimeo park videos.
- **Moving content without a pause control:** the autoplaying background videos and the auto-rotating home hero (WCAG 2.2.2).
- **Form fields labelled only by placeholder text**, for example the footer newsletter "NAME" and "EMAIL" ([Footer.tsx:420-437](components/sections/Footer.tsx#L420-L437)) and the brochure, contact and career forms. They need a `<label>` or `aria-label`. The audit's remediation text for manual #2 and #5 mentions this.
- **Reading order** (manual #9): the auditor gave no detail and needs to be asked.
