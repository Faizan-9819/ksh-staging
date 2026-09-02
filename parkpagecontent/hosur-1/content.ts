import type { InteractiveMapContent } from "@/components/sections/parksections/InteractiveMap";
import type { InsightsContent } from "@/components/sections/parksections/InsightsSection";
import type { GalleryContent } from "@/components/sections/parksections/ConcavePanoramaSlider";
import type { InfrastructureContent } from "@/components/sections/parksections/InfrastructureSection";
import type { ParkAboutContent } from "@/components/sections/parksections/ParkAbout";
import type { LocationOverviewContent } from "@/components/sections/parksections/LocationOverviewSection";
import type { ParkScrollContent } from "@/components/sections/parksections/ParkScroll";
import type { VideoHeroContent } from "@/components/sections/parksections/VideoHeroSection";

// Title/paragraph sourced from parkpagecontent/ksh-hosur-i/componentsf/ParkinSpot.js;
// stat values sourced from parkpagecontent/ksh-hosur-i/componentsf/ParkInfo.jsx
// (1.26 MN SQ.FT., 04 buildings, Hosur/Bengaluru). Hero video reuses chakan-4's
// placeholder per your instruction, until a real hosur-1 hero asset is supplied.
export const heroContent: VideoHeroContent = {
  videoSrc: "/home/hero/Hero Section.mp4",
  title: "KSH Hosur Park I",
  subtitle: "Hosur, Bengaluru",
  areaValue: "1.26 Mn.",
  areaUnit: "Sq. Ft.",
  areaLabel: "Total Area",
  buildingsValue: "04",
  buildingsLabel: "Total Buildings",
  locationValue: "Hosur,",
  locationUnit: "Bengaluru",
  locationLabel: "Park Location",
  ctaLabel: "Download Brochure",
  ctaAction: "brochure",
};

// Sourced from parkpagecontent/ksh-hosur-i/componentsf/ParkinSpot.js (hero
// paragraph — this is the block actually rendered live; ParkOverview.jsx is
// never imported by page.jsx at all, and its text also carried a factual
// error calling Hosur, Tamil Nadu, part of "Bengaluru's progressive
// industrial policies"). No hosur-1-specific "second section" image exists
// yet, so this borrows the chakan-4 placeholder image per your instruction
// (body images to follow under public/ParkPage/hosur-1/).
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
    "Located near Bengaluru, KSH Hosur Park I puts you right in India's thriving Industrial and tech corridor. The Hosur region is growing fast, making this the perfect location for companies ready to expand across South India.",
  bodyParagraph:
    "We built these facilities with your needs in mind—sustainable, efficient, and adaptable. Move in and start operating immediately in spaces designed for safety and long-term success. Your business can hit the ground running from day one.",
};

// Sourced from parkpagecontent/ksh-hosur-i/componentsf/ParkOverview.jsx (main
// paragraph) plus TabsMenu.jsx's tab labels. Unlike chakan-4/chakan-3, real
// popup images DO exist for this park — hib(f).webp (Notable Industries) and
// hcb(f).webp (Connectivity) at public/ParkPage/hosur-1/ — so those are used
// instead of the shared chakan-4 placeholders. No "KSH INFRA Parks" tab
// equivalent exists in hosur-1's own source (only 2 tabs: Notable Industries,
// Connectivity), so that first tab is dropped rather than faked.
export const locationOverviewContent: LocationOverviewContent = {
  eyebrow: "Park Highlights",
  heading: "Hosur: The Next Industrial Powerhouse",
  image: "/ParkPage/hosur-1/hosurmap.webp",
  imageAlt: "KSH Hosur Park overview",
  paragraph1:
    "Hosur, located on the outskirts of Bengaluru, is fast becoming a leading destination for manufacturing and Industrial expansion. Its strategic location, seamless connectivity, and access to a skilled workforce have attracted major players like Tata Electronics and a thriving network of companies in automotive, electronics, and engineering.",
  paragraph2:
    "With Bengaluru's innovation ecosystem next door and robust infrastructure on the rise, Hosur offers the perfect blend of scale, speed, and future-readiness for modern Industrial growth.",
  popupTabs: [
    {
      id: "notable-industries",
      label: "Notable Industries",
      media: {
        type: "image",
        src: "/ParkPage/hosur-1/hibf.webp",
      },
    },
    {
      id: "connectivity",
      label: "Connectivity",
      media: {
        type: "image",
        src: "/ParkPage/hosur-1/hcbf.webp",
      },
    },
  ],
};

// Distances sourced from parkpagecontent/ksh-hosur-i/componentsf/MapCard.jsx;
// precise origin coordinates sourced from componentsf/MapSection.jsx's Google
// Maps embed URLs (each embed names its real origin place — Kempegowda
// Airport, Chennai Airport, Chennai Port, "Hosur toll NH 48", "SH 17C"). The
// destination is this park's own real site.
export const interactiveMapContent: InteractiveMapContent = {
  destination: {
    name: "KSH Hosur Park I",
    coords: [12.6014382, 77.9513134],
  },
  locations: [
    {
      id: 0,
      title: "Bengaluru International Airport",
      distance: "90 km",
      coords: [13.198909, 77.7068926],
      coordText: "13.198909, 77.7068926",
      googleMapUrl:
        "https://www.google.com/maps/dir/Kempegowda+International+Airport/12.6014382,77.9513134",
    },
    {
      id: 1,
      title: "Chennai International Airport",
      distance: "286 km",
      coords: [12.9939595, 80.1706653],
      coordText: "12.9939595, 80.1706653",
      googleMapUrl:
        "https://www.google.com/maps/dir/Chennai+International+Airport/12.6014382,77.9513134",
    },
    {
      id: 2,
      title: "Chennai Seaport",
      distance: "300 km",
      coords: [13.0815305, 80.292059],
      coordText: "13.0815305, 80.292059",
      googleMapUrl:
        "https://www.google.com/maps/dir/Chennai+Port/12.6014382,77.9513134",
    },
    {
      id: 3,
      title: "National Highway",
      distance: "30 km",
      coords: [12.7762672, 77.7772461],
      coordText: "12.7762672, 77.7772461",
      googleMapUrl:
        "https://www.google.com/maps/dir/12.7762672,77.7772461/12.6014382,77.9513134",
    },
    {
      id: 4,
      title: "State Highway",
      distance: "37 km",
      coords: [12.8171452, 77.9185358],
      coordText: "12.8171452, 77.9185358",
      googleMapUrl:
        "https://www.google.com/maps/dir/12.8171452,77.9185358/12.6014382,77.9513134",
    },
  ],
  viewOnMapLabel: "View on Map",
};

// Sourced from parkpagecontent/ksh-hosur-i/componentsf/CharSlide.jsx (5
// characteristics, all Hosur-specific copy). Icons reuse the shared chakan-4
// SVGs (generic icons, not park-specific photography) with the closest
// matching icon key per item.
export const parkScrollContent: ParkScrollContent = {
  eyebrow: "Grow With KSH INFRA",
  heading: "Defining Characteristics of Hosur, Bengaluru",
  intro:
    "Hosur now thrives across multiple industries—automotive, electronics, engineering, precision manufacturing, and textiles. This diversity makes it a resilient and future-ready foundation for Industrial growth, backed by a dual-state talent pool and connectivity to India and the world.",
  introMobile:
    "Hosur now thrives across multiple industries—automotive, electronics, engineering, precision manufacturing, and textiles—a resilient, future-ready foundation for Industrial growth.",
  items: [
    {
      key: "automotive",
      title: "Hosur: Built for Industrial Success",
      description:
        "Hosur now thrives across multiple industries—automotive, electronics, engineering, precision manufacturing, and textiles. This diversity makes it a resilient and future-ready foundation for Industrial growth.",
      icon: "automotive",
      // icon: "hosur1",
    },
    {
      key: "talent",
      title: "The Dual Talent Advantage",
      description:
        "With its proximity to Bengaluru, Hosur draws from a vast, skilled talent pool across Tamil Nadu and Karnataka, making it an attractive base for industries requiring specialized manpower.",
      icon: "talent",
    },
    {
      key: "strategic-location",
      title: "The Best of Two States",
      description:
        "Hosur's strategic location offers direct access to one of India's most dynamic Industrial and tech hubs. The region benefits from progressive Industrial policies while delivering unmatched cost efficiency and world-class infrastructure - creating the ideal environment for business growth and innovation.",
      icon: "strategic-location",
    },
    {
      key: "robust-infrastructure",
      title: "Ready Industrial Ecosystem",
      description:
        "The region offers a mature Industrial infrastructure with established supply chains, reliable power, and a strong presence of MSMEs supporting large-scale manufacturers.",
      icon: "robust-infrastructure",
    },
    {
      key: "excellent-connectivity",
      title: "Connected to India and the World",
      description:
        "Hosur offers excellent road connectivity via NH 44 with direct routes to Bengaluru Airport, Chennai Port and Krishnapatnam Port. Move your goods efficiently throughout India and to global markets with these well-established transportation links.",
      icon: "excellent-connectivity",
    },
  ],
};

// Sourced from parkpagecontent/ksh-hosur-i/componentsf/ParkInfra.jsx — 4 real
// exterior videos at public/ParkPage/hosur-1/videos/exterior/. Interior videos
// exist too (column-to-column, internal facilities, internal height) but
// InfrastructureSection's interiorMedia is a single image per hotspot, so the
// shared placeholder image is kept for interior (matching chakan-4's pattern).
export const infrastructureContent: InfrastructureContent = {
  eyebrow: "An Integrated Industrial Infrastructure Platform",
  heading: "Park Infrastructure",
  image: "/ParkPage/chakan-4/infra-building-figma.png",
  hotspots: [
    {
      id: "statistics",
      label: "Statistics",
      position: { left: "13.5%", top: "91.7%" },
      pathD: "M 205 505 H 595 V 430",
      circleCoords: { cx: 595, cy: 430 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/hosur-1/videos/exterior/stats.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
    {
      id: "building-names",
      label: "Building Names",
      position: { left: "86.5%", top: "27.6%" },
      pathD: "M 938 152 H 687 V 270",
      circleCoords: { cx: 687, cy: 270 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/hosur-1/videos/exterior/buildingnames.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
    {
      id: "roads",
      label: "Roads",
      position: { left: "5%", top: "70%" },
      pathD: "M 58 385 H 220 V 420",
      circleCoords: { cx: 220, cy: 420 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/hosur-1/videos/exterior/roads.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
    {
      id: "truck-apron",
      label: "Truck Apron",
      position: { left: "86%", top: "59%" },
      pathD: "M 932 325 H 785",
      circleCoords: { cx: 785, cy: 325 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/hosur-1/videos/exterior/trap.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
  ],
};

// Real images at public/ParkPage/hosur-1/ — the park's actual photos
// (hosur1–hosur6, previously shown under Renders) populate the "Photos" tab;
// hosur-render-1–6 (public/ParkPage/hosur-1/renders/) are the "Renders" tab.
// The old hs1–hs10 placeholder renders are no longer referenced here.
export const galleryContent: GalleryContent = {
  eyebrow: "An Integrated Industrial Infrastructure Platform",
  heading: "Park Gallery",
  photosLabel: "Photos",
  videosLabel: "Videos",
  rendersLabel: "Renders",
  photoImages: [
    "hosur-1/hosur1.jpg",
    "hosur-1/hosur2.jpg",
    "hosur-1/hosur3.jpg",
    "hosur-1/hosur4.jpg",
    "hosur-1/hosur5.jpg",
    "hosur-1/hosur6.jpg",
  ],
  renderImages: [
    "hosur-1/renders/hosur-render-1.jpg",
    "hosur-1/renders/hosur-render-2.jpg",
    "hosur-1/renders/hosur-render-3.jpg",
    "hosur-1/renders/hosur-render-4.jpg",
    "hosur-1/renders/hosur-render-5.jpg",
    "hosur-1/renders/hosur-render-6.jpg",
  ],
  videos: [
    {
      label: "Route Video- Silk Board to KSH Hosur I",
      vid: "https://player.vimeo.com/video/1089053663",
    },
    {
      label: "Route Video- Bengaluru International Airport to KSH Hosur I",
      vid: "https://player.vimeo.com/video/1081769476",
    },
  ],
};

// Sourced from parkpagecontent/ksh-hosur-i/componentsf/LastSw.jsx, with Hosur
// I itself dropped (a page shouldn't link to itself in its own trust
// carousel). Chennai I removed — no /ksh-chennai-i route exists in this app.
// The remaining cards borrow park2's generic leftover thumbnails as
// chakan-4/chakan-3 do.
export const insightsContent: InsightsContent = {
  eyebrow: "INSIGHTS",
  heading: "Other Parks",
  cards: [
    {
      id: 2,
      image: "/ParkPage/chakan-4/ch4spot.jpg",
      title: "KSH CHAKAN PARK IV",
      city: "Chakan | Pune",
      potential: "0.36 Mn. Sq. Ft.",
      totalBuildings: "02 Buildings",
      link: "/ksh-chakan-iv",
    },
    {
      id: 3,
      image: "/ParkPage/chakan-3/ch3spot.jpg",
      title: "KSH CHAKAN PARK III",
      city: "Chakan | Pune",
      potential: "1.50 Mn. Sq. Ft.",
      totalBuildings: "08 Buildings",
      link: "/ksh-chakan-iii",
    },
    {
      id: 4,
      image: "/ParkPage/chakan-2/ch2spot.jpg",
      title: "KSH CHAKAN PARK II",
      city: "Chakan | Pune",
      potential: "1.20 Mn. Sq. Ft.",
      totalBuildings: "05 Buildings",
      link: "/ksh-chakan-ii",
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
