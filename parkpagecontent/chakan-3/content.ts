import type { InteractiveMapContent } from "@/components/sections/parksections/InteractiveMap";
import type { InsightsContent } from "@/components/sections/parksections/InsightsSection";
import type { GalleryContent } from "@/components/sections/parksections/ConcavePanoramaSlider";
import type { InfrastructureContent } from "@/components/sections/parksections/InfrastructureSection";
import type { ParkAboutContent } from "@/components/sections/parksections/ParkAbout";
import type { LocationOverviewContent } from "@/components/sections/parksections/LocationOverviewSection";
import type { ParkScrollContent } from "@/components/sections/parksections/ParkScroll";
import type { VideoHeroContent } from "@/components/sections/parksections/VideoHeroSection";

// Title sourced from parkpagecontent/ksh-chakan-iii/componentsf/ParkinSpot.js;
// stat values sourced from parkpagecontent/ksh-chakan-iii/componentsf/ParkInfo.jsx
// (1.50 MN SQ.FT., 08 buildings, Chakan/Pune). Hero video reuses chakan-4's
// placeholder per your instruction, until a real chakan-3 hero asset is supplied.
export const heroContent: VideoHeroContent = {
  videoSrc: "/home/hero/Hero Section.mp4",
  title: "KSH Chakan Park III",
  subtitle: "Chakan, Pune",
  areaValue: "1.50 Mn.",
  areaUnit: "Sq. Ft.",
  areaLabel: "Total Area",
  buildingsValue: "08",
  buildingsLabel: "Total Buildings",
  locationValue: "Chakan,",
  locationUnit: "Pune",
  locationLabel: "Park Location",
  ctaLabel: "Download Brochure",
  ctaAction: "brochure",
};

// Sourced from parkpagecontent/ksh-chakan-iii/componentsf/ParkinSpot.js (hero
// paragraph — this is the block actually rendered live; ParkOverview.jsx's
// different, generic-region text was wrongly used here before). No
// chakan-3-specific "second section" image exists yet, so this borrows the
// chakan-4 placeholder image per your instruction (body images to follow
// under public/ParkPage/chakan-3/).
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
    "Our largest Chakan development yet, KSH Chakan Park III sets a new standard for eco-conscious, sustainable Industrial spaces. Its superior design and utilities create an Industrial environment where nothing is compromised.",
  bodyParagraph:
    "This customizable, ready-to-occupy facility ensures your operations run smoothly with maximum productivity and efficiency while keeping your team safe. We've created a space where your business can perform at its absolute best.",
};

// No chakan-3-specific overview/popup images exist yet, so this borrows the
// shared chakan-4 placeholders for image and popup tabs (per your
// instruction — body images to follow under public/ParkPage/chakan-3/).
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

// Sourced from parkpagecontent/ksh-chakan-iii/componentsf/MapCard.jsx —
// distances and destination differ from chakan-4 (this park's own site
// coordinates/distances).
export const interactiveMapContent: InteractiveMapContent = {
  destination: {
    name: "KSH INFRA Chakan Industrial Park 3",
    coords: [18.7870954, 73.7935248],
  },
  locations: [
    {
      id: 0,
      // title: "Pune International Airport",
      title: "Pune Central",
      distance: "37 km",
      // coords: [18.579343, 73.908917],
      coords: [18.528745094173022, 73.87456476750066],

      // coordText: "18.579343, 73.908917",
      coordText: "18.528745, 73.874564",
      googleMapUrl:
        // "https://www.google.com/maps/dir/Pune+International+Airport/18.7870954,73.7935248",
        "https://www.google.com/maps/dir/Pune+Maharashtra+411001/18.7870954,73.7935248",
    },
    {
      id: 1,
      title: "Mumbai International Airport",
      distance: "148 km",
      coords: [19.090218, 72.862812],
      coordText: "19.090218, 72.862812",
      googleMapUrl:
        "https://www.google.com/maps/dir/Chhatrapati+Shivaji+Maharaj+International+Airport+Mumbai/18.7870954,73.7935248",
    },
    {
      id: 2,
      title: "Seaport",
      distance: "148 km",
      coords: [18.945433, 72.848985],
      coordText: "18.945433, 72.848985",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.9454327,72.8489853/18.7870954,73.7935248",
    },
    {
      id: 3,
      title: "National Highways",
      distance: "110 km",
      coords: [18.980688, 73.087506],
      coordText: "18.980688, 73.087506",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.9806882,73.087506/18.7870954,73.7935248",
    },
    {
      id: 4,
      title: "City Center",
      distance: "33 km",
      coords: [18.588259, 73.737246],
      coordText: "18.588259, 73.737246",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.5882594,73.7372457/18.7870954,73.7935248",
    },
  ],
  viewOnMapLabel: "View on Map",
};

// Sourced from parkpagecontent/ksh-chakan-i/componentsf/CharAcc.jsx — the
// accordion component actually rendered live by ksh-chakan-iii/page.jsx
// (`import CharAcc from "../ksh-chakan-i/componentsf/CharAcc"`). This
// folder's own CharSlide.jsx has slightly different, wrong text (Hyundai
// Construction, "Talegaon I industrial belt") and is never used. Icons reuse
// the shared chakan-4 SVGs (generic icons, not park-specific photography).
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

// Sourced from parkpagecontent/ksh-chakan-iii/componentsf/ParkInfra.jsx — 5
// real exterior videos at public/ParkPage/chakan-3/videos/exterior/. Interior
// videos exist too (flooring, column-to-column, internal facilities, internal
// height) but InfrastructureSection's interiorMedia is a single image per
// hotspot, so the shared placeholder image is kept for interior (matching
// chakan-4's pattern) until interior video support is added.
export const infrastructureContent: InfrastructureContent = {
  eyebrow: "An Integrated Industrial Infrastructure Platform",
  heading: "Park Infrastructure",
  image: "/ParkPage/chakan-4/infra-building-figma.png",
  hotspots: [
    {
      id: "building-area",
      label: "Building Area",
      position: { left: "11.5%", top: "47.2%" },
      pathD: "M 195 260 H 512 V 222",
      circleCoords: { cx: 512, cy: 222 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/chakan-3/videos/exterior/totalarea.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
    {
      id: "building-details",
      label: "Building Details",
      position: { left: "86.5%", top: "27.6%" },
      pathD: "M 938 152 H 687 V 270",
      circleCoords: { cx: 687, cy: 270 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/chakan-3/videos/exterior/buildingnames.mp4",
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
        src: "/ParkPage/chakan-3/videos/exterior/roads.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
    {
      id: "solar-roof",
      label: "Solar Roof",
      position: { left: "55%", top: "66%" },
      pathD: "M 635 363 H 700 V 480",
      circleCoords: { cx: 700, cy: 480 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/chakan-3/videos/exterior/sroof.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
    {
      id: "parking-truck-apron",
      label: "Parking & Truck Apron",
      position: { left: "86%", top: "59%" },
      pathD: "M 932 325 H 785",
      circleCoords: { cx: 785, cy: 325 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/chakan-3/videos/exterior/tparkingapron.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
  ],
};

// Sourced from parkpagecontent/ksh-chakan-iii/componentsf/PhVdslider.jsx —
// real render/photo images at public/ParkPage/chakan-3/, plus its own
// "Site Video" vimeo embed.
export const galleryContent: GalleryContent = {
  eyebrow: "An Integrated Industrial Infrastructure Platform",
  heading: "Park Gallery",
  photosLabel: "Photos",
  videosLabel: "Videos",
  rendersLabel: "Renders",
  photoImages: [
    "chakan-3/newimgs/chakan3-1.jpg",
    "chakan-3/newimgs/chakan3-2.jpg",
    "chakan-3/newimgs/chakan3-3.jpg",
    "chakan-3/newimgs/chakan3-4.jpg",
    "chakan-3/newimgs/chakan3-5.jpg",
    "chakan-3/newimgs/chakan3-6.jpg",
  ],
  renderImages: [
    "chakan-3/renders/chakan3-render-1.jpg",
    "chakan-3/renders/chakan3-render-2.jpg",
    "chakan-3/renders/chakan3-render-3.jpg",
    "chakan-3/renders/chakan3-render-4.jpg",
    "chakan-3/renders/chakan3-render-5.jpg",
    "chakan-3/renders/chakan3-render-6.jpg",
  ],
  videos: [
    { label: "Site Video", vid: "https://player.vimeo.com/video/1217900699" },
  ],
};

// Sourced from parkpagecontent/ksh-chakan-iii/componentsf/LastSw.jsx, with
// Chakan III itself dropped (a page shouldn't link to itself in its own
// trust carousel) — same asset-availability caveats as chakan-4's version:
// only Hosur I and Chakan IV have a real matching thumbnail; the rest borrow
// park2's generic leftover thumbnails. Chennai I removed — no
// /ksh-chennai-i route exists in this app.
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
