import type { InsightsContent } from "@/components/sections/parksections/InsightsSection";
import type { GalleryContent } from "@/components/sections/parksections/ConcavePanoramaSlider";
import type { ParkAboutContent } from "@/components/sections/parksections/ParkAbout";
import type { LocationOverviewContent } from "@/components/sections/parksections/LocationOverviewSection";
import type { ParkScrollContent } from "@/components/sections/parksections/ParkScroll";
import type { VideoHeroContent } from "@/components/sections/parksections/VideoHeroSection";
import type { InteractiveMapContent } from "@/components/sections/parksections/InteractiveMap";

// No Park Infrastructure section for this park — parkpagecontent/ksh-chakan-ii
// has no ParkInfra.jsx and its live page.jsx never renders one, per your
// instruction that only chakan-iv/chakan-iii/hosur-i get that section.

// Title/paragraph sourced from parkpagecontent/ksh-chakan-ii/componentsf/ParkinSpot.js;
// stat values sourced from parkpagecontent/ksh-chakan-ii/componentsf/ParkInfo.jsx
// (1.20 MN SQ.FT., 05 buildings, Chakan/Pune). Hero video reuses chakan-4's
// placeholder per your instruction, until a real chakan-2 hero asset is supplied.
export const heroContent: VideoHeroContent = {
  videoSrc: "/home/hero/Hero Section.mp4",
  title: "KSH Chakan Park II",
  subtitle: "Chakan, Pune",
  areaValue: "1.20 Mn.",
  areaUnit: "Sq. Ft.",
  areaLabel: "Total Area",
  buildingsValue: "05",
  buildingsLabel: "Total Buildings",
  locationValue: "Chakan,",
  locationUnit: "Pune",
  locationLabel: "Park Location",
  // ctaLabel: "Download Certificate",
  ctaLabel: "Download Brochure",
  ctaAction: "brochure",
};

// Sourced from parkpagecontent/ksh-chakan-ii/componentsf/ParkOverview.jsx — no
// chakan-2-specific "second section" image exists yet, so this borrows the
// chakan-4 placeholder image per your instruction (body images to follow
// under public/ParkPage/chakan-2/).
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
    "KSH Chakan Park II is our second landmark development in the Chakan region, thoughtfully designed to meet the evolving needs of modern industry. The park features state-of-the-art, sustainable, and ergonomic Industrial spaces, and is home to a strong ecosystem of global manufacturing companies, Logistics providers, and shipping operators.",
  bodyParagraph:
    "The park has received EDGE certification, showcasing our commitment to sustainability while ensuring operational cost-efficiency for our customers.",
};

// Paragraph text sourced verbatim from page.jsx's PDTab `para` prop (the
// block actually rendered live — componentsf/ParkOverview.jsx's different
// text is commented out / unused), identical across all 4 Chakan pages. No
// chakan-2-specific overview/popup images exist yet, so this borrows the
// shared chakan-4 placeholders for image and popup tabs (per your
// instruction — body images to follow under public/ParkPage/chakan-2/).
export const locationOverviewContent: LocationOverviewContent = {
  eyebrow: "Park Highlights",
  heading: "Chakan: A Thriving Industrial Hub in Pune",
  image: "/ParkPage/chakan-4/overviewimg.webp",
  imageAlt: "KSH Chakan Park overview",
  paragraph1:
    "Chakan, located near Pune, is one of India’s fastest-growing integrated Industrial zones, strategically developed by MIDC as a key manufacturing and Logistics corridor. Home to global automotive giants like Volkswagen, Mahindra & Mahindra, Bridgestone, Bajaj Auto, and Mercedes Benz, it offers ready infrastructure, robust connectivity, and a growing talent pool.",
  paragraph2:
    "With metro connectivity and rapid social infrastructure underway, Chakan is set to become a benchmark for modern Industrial development. KSH INFRA’s parks in Chakan further reinforce its position as a central hub driving India’s Industrial growth.",
  popupTabs: [
    {
      id: "ksh-infra-parks",
      label: "KSH INFRA Parks",
      media: {
        type: "image",
        src: "/ParkPage/chakan-4/parks.webp",
      },
    },
    {
      id: "notable-industries",
      label: "Notable Industries",
      media: {
        type: "image",
        src: "/ParkPage/chakan-4/chib.webp",
      },
    },
    {
      id: "connectivity",
      label: "Connectivity",
      media: {
        type: "image",
        src: "/ParkPage/chakan-4/ccb.webp",
      },
    },
  ],
};

// Per-location distances sourced from parkpagecontent/ksh-chakan-ii/componentsf/MapCard.jsx.
// No destination staticItem exists in that MapCard.jsx itself, but the real
// park coordinates are given by componentsf/MapSection.jsx's Google Maps
// embed URLs, which all end at the same place pin: "QQVH+23X, Chakan Rd,
// Phase 2, Bhamboli, Maharashtra 410507" (18.7921896, 73.7778466). Each
// origin's coords/googleMapUrl below match that same file's real named place
// per stop — Seaport is "Mumbai Port Trust, Mazgaon" and City Center is "City
// Center Building, Hinjawadi" (not the New Dock Rd / Kolte Patil values
// chakan-3/chakan-4 use).
export const interactiveMapContent: InteractiveMapContent = {
  destination: {
    name: "KSH INFRA Chakan Industrial Park 2",
    coords: [18.7921896, 73.7778466],
  },
  locations: [
    {
      id: 0,
      // title: "Pune International Airport",
      title: "Pune Central",
      distance: "40 km",
      // coords: [18.579343, 73.908917],
      coords: [18.528745094173022, 73.87456476750066],

      // coordText: "18.579343, 73.908917",
      coordText: "18.528745, 73.874564",
      googleMapUrl:
        // "https://www.google.com/maps/dir/Pune+International+Airport/18.7921896,73.7778466",
        "https://www.google.com/maps/dir/Pune+Maharashtra+411001/18.7921896,73.7778466",
    },
    {
      id: 1,
      title: "Mumbai International Airport",
      distance: "146 km",
      coords: [19.090218, 72.862812],
      coordText: "19.090218, 72.862812",
      googleMapUrl:
        "https://www.google.com/maps/dir/Chhatrapati+Shivaji+Maharaj+International+Airport+Mumbai/18.7921896,73.7778466",
    },
    {
      id: 2,
      title: "Seaport",
      distance: "145 km",
      coords: [18.9482881, 72.8441629],
      coordText: "18.9482881, 72.8441629",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.9482881,72.8441629/18.7921896,73.7778466",
    },
    {
      id: 3,
      title: "National Highways",
      distance: "107 km",
      coords: [18.980688, 73.087506],
      coordText: "18.980688, 73.087506",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.9806882,73.087506/18.7921896,73.7778466",
    },
    {
      id: 4,
      title: "City Center",
      distance: "31 km",
      coords: [18.5863131, 73.7386378],
      coordText: "18.5863131, 73.7386378",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.5863131,73.7386378/18.7921896,73.7778466",
    },
  ],
  viewOnMapLabel: "View on Map",
};

// Sourced from parkpagecontent/ksh-chakan-i/componentsf/CharAcc.jsx — the
// accordion component chakan-ii's page.jsx actually imports/renders
// (`import CharAcc from "../ksh-chakan-i/componentsf/CharAcc"`). This
// folder's own CharSlide.jsx has slightly different, wrong text (Hyundai
// Construction, "Talegaon I industrial belt") and is never used.
export const parkScrollContent: ParkScrollContent = {
  eyebrow: "Grow With KSH INFRA",
  heading: "Defining Characteristics of Chakan, Maharashtra",
  intro:
    "Chakan has emerged as one of India's most prominent Industrial destinations, driven by world-class infrastructure, strategic connectivity, a skilled workforce, and a thriving manufacturing ecosystem. Its strong Logistics network and business-friendly environment continue to attract leading global and domestic enterprises.",
  introMobile:
    "Chakan has emerged as one of India's most prominent Industrial destinations, driven by world-class infrastructure, strategic connectivity, a skilled workforce, and a thriving manufacturing ecosystem.",
  items: [
    {
      key: "automotive",
      title: "Automotive Hub",
      description:
        "Chakan houses major automotive brands like Volkswagen, Mahindra & Mahindra, Mercedes Benz, and Bridgestone, positioning it as a central hub for automotive manufacturing and engineering excellence.",
      icon: "automotive",
    },
    {
      key: "talent",
      title: "Talent Magnet",
      description:
        "The presence of prestigious automotive and manufacturing companies has made Chakan a significant draw for engineering talent, attracting skilled professionals from across India and globally.",
      icon: "talent",
    },
    {
      key: "strategic-location",
      title: "Strategic Location",
      description:
        "Situated between the KHED SEZ and the Talegaon Industrial belt, Chakan benefits from a strategically advantageous location that supports extensive Industrial activity and development.",
      icon: "strategic-location",
    },
    {
      key: "robust-infrastructure",
      title: "Robust Infrastructure",
      description:
        "Chakan is experiencing rapid infrastructure growth, enhancing its attractiveness as an Industrial location. This development supports a wide range of industries and contributes to the area's overall economic expansion.",
      icon: "robust-infrastructure",
    },
    {
      key: "excellent-connectivity",
      title: "Excellent Connectivity",
      description:
        "With well-planned connectivity options, Chakan offers seamless access to major transportation networks, making it an ideal choice for industries looking to optimize Logistics and supply chain operations.",
      icon: "excellent-connectivity",
    },
  ],
};

// Sourced from parkpagecontent/ksh-chakan-ii/componentsf/PhVdslider.jsx — its
// source only shows Photos + Videos tabs (showRenders: false), with these 13
// images displayed under "Photos". Mapped to photoImages here to match what
// actually showed on the original page. renderImages populated separately
// with the Renders tab images supplied afterward.
export const galleryContent: GalleryContent = {
  eyebrow: "An Integrated Industrial Infrastructure Platform",
  heading: "Park Gallery",
  photosLabel: "Photos",
  videosLabel: "Videos",
  rendersLabel: "Renders",
  photoImages: [
    "chakan-2/newimgs/chakan2-1.jpg",
    "chakan-2/newimgs/chakan2-2.jpg",
    "chakan-2/newimgs/chakan2-3.jpg",
    "chakan-2/newimgs/chakan2-4.jpg",
    "chakan-2/newimgs/chakan2-5.jpg",
    "chakan-2/newimgs/chakan2-6.jpg",
  ],
  renderImages: [
    "chakan-2/renders/chakan2-render-1.jpg",
    "chakan-2/renders/chakan2-render-2.jpg",
    "chakan-2/renders/chakan2-render-3.jpg",
    "chakan-2/renders/chakan2-render-4.jpg",
    "chakan-2/renders/chakan2-render-5.jpg",
    "chakan-2/renders/chakan2-render-6.jpg",
  ],
  videos: [
    {
      label: "Park Tour Video",
      vid: "https://player.vimeo.com/video/754203151",
    },
  ],
};

// Sourced from parkpagecontent/ksh-chakan-ii/componentsf/LastSw.jsx, with
// Chakan II itself dropped (a page shouldn't link to itself in its own trust
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
      image: "/ParkPage/chakan-1/ch1spot.jpg",
      title: "KSH CHAKAN PARK I",
      city: "Chakan | Pune",
      potential: "0.85 Mn. Sq. Ft.",
      totalBuildings: "04 Buildings",
      link: "/ksh-chakan-i",
    },
    {
      id: 6,
      image: "/ParkPage/talegaon-i/t1spot.jpg",
      title: "KSH TALEGAON PARK I",
      city: "Talegaon | Pune",
      potential: "0.14 Mn. Sq. Ft.",
      totalBuildings: "02 Buildings",
      link: "/ksh-talegaon-i",
    },
  ],
};
