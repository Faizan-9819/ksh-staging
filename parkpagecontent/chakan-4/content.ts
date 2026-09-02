import type { InteractiveMapContent } from "@/components/sections/parksections/InteractiveMap";
import type { InsightsContent } from "@/components/sections/parksections/InsightsSection";
import type { GalleryContent } from "@/components/sections/parksections/ConcavePanoramaSlider";
import type { InfrastructureContent } from "@/components/sections/parksections/InfrastructureSection";
import type { ParkAboutContent } from "@/components/sections/parksections/ParkAbout";
import type { LocationOverviewContent } from "@/components/sections/parksections/LocationOverviewSection";
import type { VideoHeroContent } from "@/components/sections/parksections/VideoHeroSection";

// Matches VideoHeroSection's own DEFAULT_CONTENT (this page previously
// rendered the hero with no `content` prop at all), only overriding the CTA
// to match every other park page.
export const heroContent: VideoHeroContent = {
  videoSrc: "/home/hero/Hero Section.mp4",
  title: "KSH Chakan Park IV",
  subtitle: "Pune, Maharashtra",
  areaValue: "0.36 Mn.",
  areaUnit: "Sq. Ft.",
  areaLabel: "Total Area",
  buildingsValue: "02",
  buildingsLabel: "Total Buildings",
  locationValue: "Chakan,",
  locationUnit: "Pune",
  locationLabel: "Park Location",
  ctaLabel: "Download Brochure",
  ctaAction: "brochure",
};

// Same as park2's default ParkAbout content, but pointing at this park's own
// copy of the image under public/ParkPage/chakan-4/ instead of the shared
// /park2new/ asset.
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
    "KSH Chakan Park IV in Shinde, Pune exemplifies high-quality sustainable Industrial & Logistics infrastructure, setting new standards for environmental responsibility. The Industrial park has earned IGBC pre-certified Platinum status, showcasing our deep commitment to green Industrial development. Its thoughtful design and premium utilities create a workspace where your team can thrive.",
  bodyParagraph:
    "This customizable, move-in ready facility ensures excellent productivity, efficiency, and safety for your workforce. We've considered every detail so you can focus on what matters most—running your business successfully.",
};

// Same as park2's default LocationOverviewSection content, but pointing at
// this park's own copies of the hero/popup images under
// public/ParkPage/chakan-4/ instead of the shared /park/ assets.
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

// Sourced from parkpagecontent/ksh-chakan-iv/componentsf/MapCard.jsx —
// destination name/coords are this park's own real staticItem (its actual
// Google Maps place), not the shared park2 placeholder "Ksh Infra Park 6".
// Per-location distances agree with park2's own hardcoded values except City
// Center, corrected below.
export const interactiveMapContent: InteractiveMapContent = {
  destination: {
    name: "KSH INFRA Chakan Industrial Park 4",
    coords: [18.7728356, 73.7504697],
  },
  locations: [
    {
      id: 0,
      // title: "Pune International Airport",
      title: "Pune Central",
      distance: "39 km",
      // coords: [18.579343, 73.908917],
      coords: [18.528745094173022, 73.87456476750066],

      // coordText: "18.579343, 73.908917",
      coordText: "18.528745, 73.874564",
      googleMapUrl:
        // "https://www.google.com/maps/dir/Pune+International+Airport/18.7728356,73.7504697",
        "https://www.google.com/maps/dir/Pune+Maharashtra+411001/18.7728356,73.7504697",
    },
    //
    {
      id: 1,
      title: "Mumbai International Airport",
      distance: "143 km",
      coords: [19.090218, 72.862812],
      coordText: "19.090218, 72.862812",
      googleMapUrl:
        "https://www.google.com/maps/dir/Chhatrapati+Shivaji+Maharaj+International+Airport+Mumbai/18.7728356,73.7504697",
    },
    {
      id: 2,
      title: "Seaport",
      distance: "141 km",
      coords: [18.945433, 72.848985],
      coordText: "18.945433, 72.848985",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.9454327,72.8489853/18.7728356,73.7504697",
    },
    {
      id: 3,
      title: "National Highways",
      distance: "103 km",
      coords: [18.980688, 73.087506],
      coordText: "18.980688, 73.087506",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.9806882,73.087506/18.7728356,73.7504697",
    },
    {
      // park2's default hardcodes "103 km" here too (duplicating National
      // Highways) — corrected using the real value from componentsf/MapCard.jsx.
      id: 4,
      title: "City Center",
      distance: "33 km",
      coords: [18.588259, 73.737246],
      coordText: "18.588259, 73.737246",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.5882594,73.7372457/18.7728356,73.7504697",
    },
  ],
  viewOnMapLabel: "View on Map",
};

// Sourced from parkpagecontent/ksh-chakan-iv/componentsf/LastSw.jsx, which
// lists 7 real KSH parks (including a self-referencing "Chakan Park IV" card,
// dropped here since a page shouldn't link to itself in its own trust
// carousel). Chennai I removed — no /ksh-chennai-i route exists in this app,
// so that card had no live page to link to. Of the remaining 5, each now
// uses that park's own real hero photo (chakan-1/2/3, hosur-1) — Talegaon I
// has no dedicated hero photo yet, so it borrows chakan-4's.
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

// park2's default repeats "Chakan: A Thriving Industrial Hub in Pune" as the
// heading for LocationOverviewSection, InfrastructureSection, AND this
// gallery section (all three, verbatim, in the original source) — likely a
// copy-paste artifact, but out of scope to fix on /park2 itself. For this
// page specifically, the old componentsf/PhVdslider.jsx has its own real,
// distinct heading via <GenLineHead heading="Park Gallery" />, so that's used
// here instead of repeating the mismatched default a third time.
export const galleryContent: GalleryContent = {
  eyebrow: "An Integrated Industrial Infrastructure Platform",
  heading: "Park Gallery",
  photosLabel: "Photos",
  videosLabel: "Videos",
  rendersLabel: "Renders",
  photoImages: [
    "chakan-4/chakan4-1.jpg",
    "chakan-4/chakan4-2.jpg",
    "chakan-4/chakan4-3.jpg",
    "chakan-4/chakan4-4.jpg",
    "chakan-4/chakan4-5.jpg",
    "chakan-4/chakan4-6.jpg",
  ],
  renderImages: [
    "chakan-4/renders/chakan4-render-1.jpg",
    "chakan-4/renders/chakan4-render-2.jpg",
    "chakan-4/renders/chakan4-render-3.jpg",
    "chakan-4/renders/chakan4-render-4.jpg",
    "chakan-4/renders/chakan4-render-5.jpg",
    "chakan-4/renders/chakan4-render-6.jpg",
  ],
  videos: [
    {
      label: "3D Walkthrough",
      vid: "https://player.vimeo.com/video/908122558",
    },
    {
      label: "KSH Chakan Park IV Construction Update July 2025",
      vid: "https://player.vimeo.com/video/1217900700",
    },
  ],
};

// Real exterior videos sourced from parkpagecontent/ksh-chakan-i/componentsf/ParkInfra.jsx
// (the actual infra-hotspot content lives under ksh-chakan-i, not ksh-chakan-iv —
// nothing infra-related exists in ksh-chakan-iv's own folder), pointing at the
// shared public/ParkPage/parkinfra/parkexterior/ video set (not chakan-4-specific,
// but the only real infrastructure videos available anywhere in this repo).
// That source lists exactly 4 exterior videos matching park2's existing 4
// hotspots (Building Area, Solar Roof, Truck Apron, Statistics) — those get real
// video media below. 3 more real videos exist in the same folder but were unused
// (Parking, Roadways, Structure), so 3 new hotspots are added for them, positioned
// to avoid overlapping the original 4 (verified against the isometric image).
// Interior media is left untouched per your instruction — exterior only, for now.
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
        src: "/ParkPage/chakan-4/Building Area.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
    {
      id: "solar-roof",
      label: "Solar Roof",
      position: { left: "86.5%", top: "27.6%" },
      pathD: "M 938 152 H 687 V 270",
      circleCoords: { cx: 687, cy: 270 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/chakan-4/Building Roof.mp4",
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
        src: "/ParkPage/chakan-4/Docking Apron.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
    {
      id: "statistics",
      label: "Statistics",
      position: { left: "13.5%", top: "91.7%" },
      pathD: "M 205 505 H 595 V 430",
      circleCoords: { cx: 595, cy: 430 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/chakan-4/Statistics.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
    {
      id: "parking",
      label: "Parking",
      position: { left: "8%", top: "22%" },
      pathD: "M 92 121 H 300 V 160",
      circleCoords: { cx: 300, cy: 160 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/chakan-4/Parking.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
    {
      id: "roadways",
      label: "Roadways",
      position: { left: "5%", top: "70%" },
      pathD: "M 58 385 H 220 V 420",
      circleCoords: { cx: 220, cy: 420 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/chakan-4/Roadways.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
    {
      id: "structure",
      label: "Structure",
      position: { left: "55%", top: "66%" },
      pathD: "M 635 363 H 700 V 480",
      circleCoords: { cx: 700, cy: 480 },
      exteriorMedia: {
        type: "video",
        src: "/ParkPage/chakan-4/Structure.mp4",
      },
      interiorMedia: { type: "image", src: "/sustainability/gov2.jpg" },
    },
  ],
};
