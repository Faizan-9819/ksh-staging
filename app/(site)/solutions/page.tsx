import type { Metadata } from "next";
import HeroSolut from "@/components/sections/solutions/HeroSolut";
import OverlayReveal from "@/components/sections/solutions/OverlayReveal";
import SolutionsTimeline from "@/components/sections/solutions/SolutionsTimeline";
import SolutionsCTA from "@/components/sections/solutions/SolutionsCTA";
import React from "react";

export const metadata: Metadata = {
  title: "KSH INFRA Solutions | Industrial & Logistics Infrastructure",
  description:
    "Explore KSH INFRA's end-to-end industrial infrastructure solutions, from land acquisition and development to leasing and property management.",
  alternates: { canonical: "https://www.kshinfra.com/solutions" },
};

const page = () => {
  return (
    <>
      <HeroSolut />
      <OverlayReveal />
      <SolutionsTimeline />
      <SolutionsCTA />
    </>
  );
};

export default page;
