import type { Metadata } from "next";
import Map from "@/components/sections/Map";
import CaseStudies from "@/components/sections/Overview/CaseStudies";
import Hero from "@/components/sections/Overview/Hero";
import OverviewAbout from "@/components/sections/Overview/overviewAbout";
import OverviewServices from "@/components/sections/Overview/overviewServices";
import TrustedPartner from "@/components/sections/Overview/TrustedPartner";
import Partners from "@/components/sections/Partners";
import React from "react";
import { parksListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title:
    "KSH INFRA | Premium Industrial and Logistics Parks & Modern Infrastructure",
  description:
    "KSH INFRA builds Grade A industrial and logistics parks with plug-and-play facilities, strategic connectivity, and scalable infrastructure.",
  alternates: { canonical: "https://www.kshinfra.com/parks" },
};

// Real per-park image paths — the live site's equivalent schema hardcoded a
// literal placeholder ("/path-to-your-park-image.jpg") for every park here;
// using each park's actual hero/spot image instead.
const PARKS_SCHEMA = parksListSchema([
  {
    slug: "ksh-chakan-i",
    name: "KSH Chakan Park I",
    description:
      "KSH INFRA's first large-scale green industrial park with 0.85 million sq.ft of industrial and logistics space across 4 buildings, located in Chakan, Pune.",
    address:
      "Gate no. 11/5, 11/4, 11/3 Chakan - Ambethan Road, Chakan, Biradvadi, Maharashtra 410501",
    latitude: "18.7602664",
    longitude: "73.8630346",
    image: "https://www.kshinfra.com/ParkPage/chakan-1/ch1spot.jpg",
    telephone: "02135256410",
  },
  {
    slug: "ksh-chakan-ii",
    name: "KSH Chakan Park II",
    description:
      "Discover Chakan Park II, a future-ready and sustainable industrial park in Pune, Maharashtra. With EDGE certification, it offers ergonomic design, cost savings, and easy access to key transportation hubs.",
    address:
      "Plot No. P-5 Phase II Chakan MIDC Post Khalumbre, Khed taluka, Maharashtra",
    latitude: "18.736086",
    longitude: "73.837652",
    image: "https://www.kshinfra.com/ParkPage/chakan-2/ch2spot.jpg",
    telephone: "02066083500",
  },
  {
    slug: "ksh-chakan-iii",
    name: "KSH Chakan Park III",
    description:
      "KSH Chakan III provides industrial park and warehouse in Pune with custom solutions, modern infrastructure, and strategic connectivity to industrial area in Chakan.",
    address: "Village- Varale, Tal- Khed, Pune, Maharashtra 410501",
    latitude: "18.736086",
    longitude: "73.837652",
    image: "https://www.kshinfra.com/ParkPage/chakan-3/ch3spot.jpg",
    telephone: "18002122030",
  },
  {
    slug: "ksh-chakan-iv",
    name: "KSH Chakan Park IV",
    description:
      "KSH Chakan IV offers Grade A industrial parks in Chakan with modern infrastructure, built-to-suit warehouses, and strategic connectivity near Pune.",
    address: "Shinde Rd, Industrial Area, Chakan, Pune, Maharashtra 410501",
    latitude: "18.736086",
    longitude: "73.837652",
    image:
      "https://www.kshinfra.com/NewHeaderParks/chakan_4_desktop_header.webp",
    telephone: "1800-212-2030",
  },
  {
    slug: "ksh-talegaon-i",
    name: "KSH Talegaon Park I",
    description:
      "KSH Talegaon is a premium industrial and logistics park in Pune, Maharashtra, offering scalable infrastructure, advanced connectivity, and customized Warehouse solutions",
    address:
      "A-18, Talegaon Floriculture & Industrial Park, MIDC, TalegaonDabhade, NavlakhUmbre PO, Pune, Maharashtra 410507",
    latitude: "18.732103",
    longitude: "73.676376",
    image: "https://www.kshinfra.com/ParkPage/talegaon-i/t1spot.jpg",
    telephone: "1800-212-2030",
  },
  {
    slug: "ksh-hosur-i",
    name: "KSH Hosur Park I",
    description:
      "Discover KSH Hosur Warehouse Park, the first of KSH INFRA's industrial parks attracting global investors. Setting the benchmark for green industrial infrastructure.",
    address: "JX22+HGG, Shoolagiri, Tamil Nadu 635119",
    latitude: "12.740900",
    longitude: "77.825300",
    image: "https://www.kshinfra.com/ParkPage/hosur-1/hspot.jpg",
    telephone: "1800-212-2030",
  },
]);

const page = () => {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PARKS_SCHEMA) }}
      />
      <Hero />
      <OverviewAbout />
      <div className="xl:-mt-56! z-1000">
        <Map hideEyebrow />
      </div>
      <OverviewServices />
      {/* <TrustedPartner /> */}

      <Partners />
      <CaseStudies />
    </div>
  );
};

export default page;
