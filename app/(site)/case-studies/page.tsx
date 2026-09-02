import type { Metadata } from "next";
import type { InsightPost } from "@/components/sections/Insights";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import TrustedOccupiers from "@/components/sections/TrustedOccupiers";
import { CASE_STUDIES } from "@/components/sections/casestudies/data";

export const metadata: Metadata = {
  title: "KSH INFRA Case Studies | Real-World Success in Industrial Infrastructure",
  description:
    "Explore KSH INFRA's case studies showcasing successful partnerships with global brands like Jabil, Kawasaki, and Hindalco in industrial infrastructure projects.",
  alternates: { canonical: "https://www.kshinfra.com/case-studies" },
};

const CASE_STUDY_POSTS: InsightPost[] = [
  {
    title: "Done and Delivered. On Time — Jabil",
    img: CASE_STUDIES.jabil.heroImage,
    date: "JABIL",
    href: "/case-studies/jabil",
  },
  {
    title:
      "Large-Scale, Built-to-Spec Facility — Delivered to Hindalco in Eight Months",
    img: CASE_STUDIES.hindalco.heroImage,
    date: "HINDALCO",
    href: "/case-studies/hindalco",
  },
  {
    title:
      "Manufacturing, Assembly, and R&D — Delivered Kawasaki's first integrated unit.",
    img: CASE_STUDIES.kawasaki.heroImage,
    date: "KAWASAKI",
    href: "/case-studies/kawasaki",
  },
  {
    title:
      "Crane-Ready, High-Capacity Manufacturing Facility — Delivered to SPECTRIX (formerly Barnes)",
    img: CASE_STUDIES.barnes.heroImage,
    date: "SPECTRIX",
    href: "/case-studies/barnes",
  },
];

const Page = () => {
  return (
    <>
      <CaseStudiesGrid posts={CASE_STUDY_POSTS} />
      <TrustedOccupiers />
    </>
  );
};

export default Page;
