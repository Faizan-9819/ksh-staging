import type { InsightsContent } from "@/components/sections/parksections/InsightsSection";
import type { GalleryContent } from "@/components/sections/parksections/ConcavePanoramaSlider";
import type { ParkAboutContent } from "@/components/sections/parksections/ParkAbout";
import type { LocationOverviewContent } from "@/components/sections/parksections/LocationOverviewSection";
import type { VideoHeroContent } from "@/components/sections/parksections/VideoHeroSection";
import type { InteractiveMapContent } from "@/components/sections/parksections/InteractiveMap";

// No Park Infrastructure section for this park — parkpagecontent/ksh-talegaon-i
// has no ParkInfra.jsx, per your instruction that only chakan-iv/chakan-iii/
// hosur-i get that section.
//
// No ParkScroll (characteristics carousel) either — talegaon-i's live page.jsx
// never renders CharSlide or CharAcc at all (both imports are commented out).
// Its own componentsf/CharSlide.jsx does exist but its content is leftover,
// unedited Chakan boilerplate ("Chakan houses major automotive brands...",
// wrong city entirely) — not real Talegaon copy, so it's skipped rather than
// shown with wrong data.

// Title/paragraph sourced from parkpagecontent/ksh-talegaon-i/componentsf/ParkinSpot.js;
// stat values sourced from parkpagecontent/ksh-talegaon-i/componentsf/ParkInfo.jsx
// (0.14 MN SQ.FT., 02 buildings, Talegaon/Pune). Hero video reuses chakan-4's
// placeholder per your instruction, until a real talegaon-i hero asset is supplied.
export const heroContent: VideoHeroContent = {
  videoSrc: "/home/hero/Hero Section.mp4",
  title: "KSH Talegaon Park I",
  subtitle: "Talegaon, Pune",
  areaValue: "0.14 Mn.",
  areaUnit: "Sq. Ft.",
  areaLabel: "Total Area",
  buildingsValue: "02",
  buildingsLabel: "Total Buildings",
  locationValue: "Talegaon,",
  locationUnit: "Pune",
  locationLabel: "Park Location",
  ctaLabel: "Download Brochure",
  ctaAction: "brochure",
};

// Sourced from parkpagecontent/ksh-talegaon-i/componentsf/ParkinSpot.js (hero
// paragraph). No talegaon-i-specific "second section" image exists yet, so
// this borrows the chakan-4 placeholder image per your instruction (body
// images to follow under public/ParkPage/talegaon-i/).
export const parkAboutContent: ParkAboutContent = {
  eyebrow: "Park Overview",
  headingWords: [
    "Building",
    "the",
    "Future",
    "of",
    "Industrial",
    "Infrastructure",
  ],
  image: "/ParkPage/chakan-4/secondsection.png",
  imageAlt: "KSH INFRA Building",
  leadParagraph:
    "KSH Talegaon I was the first Industrial park developed by KSH INFRA. The exceptional warehousing and manufacturing facilities at this park caught the eye of global infrastructure investors.",
  bodyParagraph:
    "KSH Talegaon I created the foundation for our future Parks, that now represent the gold standard in green Industrial development—a legacy we take great pride in.",
};

// Sourced verbatim from page.jsx's PDTab `para`/`title` props (the block
// actually rendered live — componentsf/ParkOverview.jsx exists but is
// commented out in page.jsx, and its different text was wrongly blended in
// here before; this is now the exact PDTab sentence, just split in two).
// Image is the shared Maharashtra-state map graphic, same as every Chakan
// page (chakan-1/2/3/4) — Talegaon is in Maharashtra near Pune, so it gets
// the same regional graphic, not its own park photo. Real popup images DO
// exist for this park — tps/tib/tcb.webp at public/ParkPage/talegaon-i/ (KSH
// Infra Parks / Notable Industries / Connectivity) — so those are used
// instead of the shared chakan-4 placeholders, matching hosur-i/chakan-1's
// pattern. Only Hosur (different state/region) gets a genuinely different
// image for this section.
export const locationOverviewContent: LocationOverviewContent = {
  eyebrow: "Park Highlights",
  heading: "Talegaon: A Strategic Hub for Modern Industry",
  image: "/ParkPage/chakan-4/overviewimg.webp",
  imageAlt: "KSH Talegaon Park overview",
  paragraph1:
    "Strategically located along the Mumbai–Pune National Highway, Talegaon is fast emerging as a key Industrial & Logistics hub in Western India.",
  paragraph2:
    "KSH INFRA has established a strong presence at the heart of this Industrial corridor, tapping into a thriving ecosystem of sectors including automotive, pharmaceuticals, chemicals, engineering, and food processing.",
  popupTabs: [
    {
      id: "ksh-infra-parks",
      label: "KSH INFRA Parks",
      media: {
        type: "image",
        src: "/ParkPage/talegaon-i/tps.webp",
      },
    },
    {
      id: "notable-industries",
      label: "Notable Industries",
      media: {
        type: "image",
        src: "/ParkPage/talegaon-i/tib.webp",
      },
    },
    {
      id: "connectivity",
      label: "Connectivity",
      media: {
        type: "image",
        src: "/ParkPage/talegaon-i/tcb.webp",
      },
    },
  ],
};

// Per-location distances sourced from parkpagecontent/ksh-talegaon-i/componentsf/MapCard.jsx.
// No destination staticItem exists in that MapCard.jsx itself, but the real
// park coordinates are given by componentsf/MapSection.jsx's Google Maps
// embed URLs, which all end at the same bare-coordinate place pin
// (18.769926, 73.689631) — the park's real site, not the chakan-4 leftover
// "Ksh Infra Park 6" placeholder. Each origin's coords/googleMapUrl below
// match that same file's real named place per stop — Seaport is "Mumbai Port
// Trust, Mazgaon" and City Center is "Terrace Garden, Sangamvadi, Pune" (a
// completely different place from the Hinjawadi pin every Chakan page uses —
// this park's own MapSection.jsx never mentions Hinjawadi at all).
export const interactiveMapContent: InteractiveMapContent = {
  destination: {
    name: "KSH INFRA Talegaon Industrial Park 1",
    coords: [18.769926, 73.689631],
  },
  locations: [
    {
      id: 0,
      // title: "Pune International Airport",
      title: "Pune Central",
      distance: "45 km",
      // coords: [18.579343, 73.908917],
      coords: [18.528745094173022, 73.87456476750066],

      // coordText: "18.579343, 73.908917",
      coordText: "18.528745, 73.874564",
      googleMapUrl:
        // "https://www.google.com/maps/dir/Pune+International+Airport/18.769926,73.689631",
        "https://www.google.com/maps/dir/Pune+Maharashtra+411001/18.769926,73.689631",
    },
    {
      id: 1,
      title: "Mumbai International Airport",
      distance: "130 km",
      coords: [19.090218, 72.862812],
      coordText: "19.090218, 72.862812",
      googleMapUrl:
        "https://www.google.com/maps/dir/Chhatrapati+Shivaji+Maharaj+International+Airport+Mumbai/18.769926,73.689631",
    },
    {
      id: 2,
      title: "Seaport",
      distance: "130 km",
      coords: [18.9482881, 72.8441629],
      coordText: "18.9482881, 72.8441629",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.9482881,72.8441629/18.769926,73.689631",
    },
    {
      id: 3,
      title: "National Highways",
      distance: "95 km",
      coords: [18.980688, 73.087506],
      coordText: "18.980688, 73.087506",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.9806882,73.087506/18.769926,73.689631",
    },
    {
      id: 4,
      title: "City Center",
      distance: "43 km",
      coords: [18.5305912, 73.8775853],
      coordText: "18.5305912, 73.8775853",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.5305912,73.8775853/18.769926,73.689631",
    },
  ],
  viewOnMapLabel: "View on Map",
};

// Sourced from parkpagecontent/ksh-talegaon-i/componentsf/PhVdslider.jsx —
// its source only shows Photos + Videos tabs (showRenders: false), with
// these 14 images displayed under "Photos". Mapped to photoImages here to
// match what actually showed on the original page; renderImages left empty
// (the empty-tabs filter added to GallerySlider/ConcavePanoramaSlider hides
// the Renders tab entirely since it has no slides).
export const galleryContent: GalleryContent = {
  eyebrow: "An Integrated Industrial Infrastructure Platform",
  heading: "Park Gallery",
  photosLabel: "Photos",
  videosLabel: "Videos",
  rendersLabel: "Renders",
  photoImages: [
    "talegaon-i/tale1.jpg",
    "talegaon-i/tale2.jpg",
    "talegaon-i/tale3.jpg",
    "talegaon-i/tale4.jpg",
    "talegaon-i/tale5.jpg",
    "talegaon-i/tale6.jpg",
  ],
  renderImages: [],
  videos: [
    {
      label: "Park Tour Video",
      vid: "https://player.vimeo.com/video/752903523",
    },
  ],
};

// Sourced from parkpagecontent/ksh-talegaon-i/componentsf/LastSw.jsx, with
// Talegaon I itself dropped (a page shouldn't link to itself in its own trust
// carousel) — same asset-availability caveats as the other park pages: only
// Hosur I and Chakan IV have a real matching thumbnail. Chennai I removed —
// no /ksh-chennai-i route exists in this app.
export const insightsContent: InsightsContent = {
  eyebrow: "INSIGHTS",
  heading: "Other Parks",
  cards: [
    {
      id: 1,
      image: "/ParkPage/hosur-1/hspot.jpg",
      title: "KSH HOSUR PARK I",
      city: "Hosur | Bengaluru",
      potential: "1.26 Mn. Sq. Ft.",
      totalBuildings: "04 Buildings",
      link: "/ksh-hosur-i",
    },
    {
      id: 3,
      image: "/ParkPage/chakan-4/ch4spot.jpg",
      title: "KSH CHAKAN PARK IV",
      city: "Chakan | Pune",
      potential: "0.36 Mn. Sq. Ft.",
      totalBuildings: "02 Buildings",
      link: "/ksh-chakan-iv",
    },
    {
      id: 4,
      image: "/ParkPage/chakan-3/ch3spot.jpg",
      title: "KSH CHAKAN PARK III",
      city: "Chakan | Pune",
      potential: "1.50 Mn. Sq. Ft.",
      totalBuildings: "08 Buildings",
      link: "/ksh-chakan-iii",
    },
    {
      id: 5,
      image: "/ParkPage/chakan-2/ch2spot.jpg",
      title: "KSH CHAKAN PARK II",
      city: "Chakan | Pune",
      potential: "1.20 Mn. Sq. Ft.",
      totalBuildings: "05 Buildings",
      link: "/ksh-chakan-ii",
    },
    {
      id: 6,
      image: "/ParkPage/chakan-1/ch1spot.jpg",
      title: "KSH CHAKAN PARK I",
      city: "Chakan | Pune",
      potential: "0.85 Mn. Sq. Ft.",
      totalBuildings: "04 Buildings",
      link: "/ksh-chakan-i",
    },
  ],
};
