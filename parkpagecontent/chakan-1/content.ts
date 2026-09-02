import type { InsightsContent } from "@/components/sections/parksections/InsightsSection";
import type { GalleryContent } from "@/components/sections/parksections/ConcavePanoramaSlider";
import type { ParkAboutContent } from "@/components/sections/parksections/ParkAbout";
import type { LocationOverviewContent } from "@/components/sections/parksections/LocationOverviewSection";
import type { ParkScrollContent } from "@/components/sections/parksections/ParkScroll";
import type { VideoHeroContent } from "@/components/sections/parksections/VideoHeroSection";
import type { InteractiveMapContent } from "@/components/sections/parksections/InteractiveMap";

// No Park Infrastructure section for this park — parkpagecontent/ksh-chakan-i's
// own page.jsx never imports/renders ParkInfra (a stray ParkInfra.jsx file
// exists in the folder but is unused), per your instruction that only
// chakan-iv/chakan-iii/hosur-i get that section.

// Title/paragraph sourced from parkpagecontent/ksh-chakan-i/componentsf/ParkinSpot.js;
// stat values sourced from parkpagecontent/ksh-chakan-i/componentsf/ParkInfo.jsx
// (0.85 MN SQ.FT., 04 buildings, Chakan/Pune). Hero video reuses chakan-4's
// placeholder per your instruction, until a real chakan-1 hero asset is supplied.
export const heroContent: VideoHeroContent = {
  videoSrc: "/home/hero/Hero Section.mp4",
  title: "KSH Chakan Park I",
  subtitle: "Chakan, Pune",
  areaValue: "0.85 Mn.",
  areaUnit: "Sq. Ft.",
  areaLabel: "Total Area",
  buildingsValue: "04",
  buildingsLabel: "Total Buildings",
  locationValue: "Chakan,",
  locationUnit: "Pune",
  locationLabel: "Park Location",
  ctaLabel: "Download Brochure",
  ctaAction: "brochure",
  hideCta: true,
};

// Sourced from parkpagecontent/ksh-chakan-i/componentsf/ParkOverview.jsx — no
// chakan-1-specific "second section" image exists yet, so this borrows the
// chakan-4 placeholder image per your instruction (body images to follow
// under public/ParkPage/chakan-1/).
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
    "Our first major development, KSH Chakan Park I, established our reputation as a world-class green Industrial developer in India. KSH Chakan Park I now serves as a thriving manufacturing, Logistics, and warehousing hub for several major multinational companies.",
  bodyParagraph:
    "The park showcases our ability to create Industrial spaces that meet global standards while maintaining strong environmental credentials.",
};

// Paragraph text sourced verbatim from page.jsx's PDTab `para` prop (the
// block actually rendered live — componentsf/ParkOverview.jsx's different
// text is commented out / unused), identical across all 4 Chakan pages.
// Image is the shared Maharashtra-state map graphic, same as every other
// Chakan/Talegaon page — ch1spot.webp is this park's own hero photo (used in
// ParkinSpot.js), not the region map, so it doesn't belong here. Unlike
// chakan-4/chakan-3/chakan-2, real popup images DO exist for this park —
// cpb.webp (KSH INFRA Parks), cib.webp (Notable Industries), and ccb.webp
// (Connectivity) at public/ParkPage/chakan-1/ — so those are used instead of
// the shared chakan-4 placeholders.
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
        src: "/ParkPage/chakan-1/cpb.webp",
      },
    },
    {
      id: "notable-industries",
      label: "Notable Industries",
      media: {
        type: "image",
        src: "/ParkPage/chakan-1/cib.webp",
      },
    },
    {
      id: "connectivity",
      label: "Connectivity",
      media: {
        type: "image",
        src: "/ParkPage/chakan-1/ccb.webp",
      },
    },
  ],
};

// Per-location distances sourced from parkpagecontent/ksh-chakan-i/componentsf/MapCard.jsx.
// No destination staticItem exists in that MapCard.jsx itself, but the real
// park coordinates are given by componentsf/MapSection.jsx's Google Maps
// embed URLs, which all end at the same place pin: "KSH INFRA, QQ3J+PQ5,
// Sawardari, Maharashtra 410507" (18.7540148, 73.7822271). Each origin's
// coords/googleMapUrl below are that same file's real named place per stop —
// Seaport is "Mumbai Port Trust, Mazgaon" and City Center is "City Centre -
// Kolte Patil, Hinjawadi" (not the New Dock Rd / different-Hinjawadi-pin
// values chakan-3/chakan-4 use — each park's own MapSection.jsx embeds a
// different real place for these two stops).
export const interactiveMapContent: InteractiveMapContent = {
  destination: {
    name: "KSH INFRA Chakan Industrial Park 1",
    coords: [18.7540148, 73.7822271],
  },
  locations: [
    {
      id: 0,
      // title: "Pune International Airport",
      title: "Pune Central",
      distance: "35 km",
      // coords: [18.579343, 73.908917],
      coords: [18.528745094173022, 73.87456476750066],

      // coordText: "18.579343, 73.908917",
      coordText: "18.528745, 73.874564",
      googleMapUrl:
        // "https://www.google.com/maps/dir/Pune+International+Airport/18.7540148,73.7822271",
        "https://www.google.com/maps/dir/Pune+Maharashtra+411001/18.7540148,73.7822271",
    },
    {
      id: 1,
      title: "Mumbai International Airport",
      distance: "142 km",
      coords: [19.090218, 72.862812],
      coordText: "19.090218, 72.862812",
      googleMapUrl:
        "https://www.google.com/maps/dir/Chhatrapati+Shivaji+Maharaj+International+Airport+Mumbai/18.7540148,73.7822271",
    },
    {
      id: 2,
      title: "Seaport",
      distance: "141 km",
      coords: [18.9482881, 72.8441629],
      coordText: "18.9482881, 72.8441629",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.9482881,72.8441629/18.7540148,73.7822271",
    },
    {
      id: 3,
      title: "National Highways",
      distance: "103 km",
      coords: [18.980688, 73.087506],
      coordText: "18.980688, 73.087506",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.9806882,73.087506/18.7540148,73.7822271",
    },
    {
      id: 4,
      title: "City Center",
      distance: "28 km",
      coords: [18.5862547, 73.7385029],
      coordText: "18.5862547, 73.7385029",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.5862547,73.7385029/18.7540148,73.7822271",
    },
  ],
  viewOnMapLabel: "View on Map",
};

// Sourced from parkpagecontent/ksh-chakan-i/componentsf/CharAcc.jsx — the
// accordion component actually rendered live by page.jsx (CharSlide.jsx also
// exists in this folder with slightly different, wrong text — Hyundai
// Construction, "Talegaon I industrial belt" — but is never imported).
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

// Sourced from parkpagecontent/ksh-chakan-i/componentsf/PhVdslider.jsx — its
// image paths there were broken (double-prefixed "/ParkPage/" + "/chakan-1/",
// resolving to a folder that doesn't exist); the real files live at
// public/ParkPage/chakan-1/. Its source only shows Photos + Videos tabs
// (showRenders: false) with one shared image list under "Photos", so mapped
// to photoImages here. The source list also duplicated chakan-1-11.jpg at
// both ends — de-duplicated below. renderImages populated separately with
// the Renders tab images supplied afterward.
export const galleryContent: GalleryContent = {
  eyebrow: "An Integrated Industrial Infrastructure Platform",
  heading: "Park Gallery",
  photosLabel: "Photos",
  videosLabel: "Videos",
  rendersLabel: "Renders",
  photoImages: [
    "chakan-1/newimgs/chakan1-1.jpg",
    "chakan-1/newimgs/chakan1-2.jpg",
    "chakan-1/newimgs/chakan1-3.jpg",
    "chakan-1/newimgs/chakan1-4.jpg",
    "chakan-1/newimgs/chakan1-5.jpg",
    "chakan-1/newimgs/chakan1-6.jpg",
  ],
  renderImages: [
    "chakan-1/renders/chakan1-render-1.jpg",
    "chakan-1/renders/chakan1-render-2.jpg",
    "chakan-1/renders/chakan1-render-3.jpg",
    "chakan-1/renders/chakan1-render-4.jpg",
    "chakan-1/renders/chakan1-render-5.jpg",
    "chakan-1/renders/chakan1-render-6.jpg",
  ],
  videos: [
    {
      label: "Park Tour Video",
      vid: "https://player.vimeo.com/video/753844721",
    },
  ],
};

// Sourced from parkpagecontent/ksh-chakan-i/componentsf/LastSw.jsx, with
// Chakan I itself dropped (a page shouldn't link to itself in its own trust
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
      image: "/ParkPage/talegaon-i/t1spot.jpg",
      title: "KSH TALEGAON PARK I",
      city: "Talegaon | Pune",
      potential: "0.14 Mn. Sq. Ft.",
      totalBuildings: "02 Buildings",
      link: "/ksh-talegaon-i",
    },
  ],
};
