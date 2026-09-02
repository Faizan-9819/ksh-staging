import type { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

export const metadata: Metadata = {
  title:
    "KSH INFRA | Leading Developer of Grade A Industrial and Logistics Parks in India",
  description:
    "KSH INFRA develops world-class industrial and logistics parks, offering scalable solutions as leading logistics park developers in India.",
  alternates: { canonical: "https://www.kshinfra.com/about-ksh" },
};

const Hero = dynamic(() => import("@/components/sections/About/Hero"));
const AboutPlatformSection = dynamic(
  () => import("@/components/sections/About/AboutPlatformSection"),
);
const OurPurpose = dynamic(
  () => import("@/components/sections/About/OurPurpose"),
);
const VisionShowcase = dynamic(
  () => import("@/components/sections/About/VisionShowcase"),
);
const TeamSection = dynamic(
  () => import("@/components/sections/About/TeamSection"),
);
const TimeLine = dynamic(() => import("@/components/sections/About/TimeLine"));
const ParksSection = dynamic(
  () => import("@/components/sections/About/ParksSection"),
);
const KshScroll = dynamic(() => import("@/components/sections/About/KshScroll"));
const GovernanceSection = dynamic(
  () => import("@/components/sections/About/GovernanceSection"),
);

const page = () => {
  return (
    <div>
      <Hero />
      <AboutPlatformSection />
      <OurPurpose />
      <VisionShowcase />
      <TeamSection />
      <TimeLine />
      <ParksSection />
      <KshScroll />
      <GovernanceSection />
    </div>
  );
};

export default page;
