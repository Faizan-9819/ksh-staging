import type { Metadata } from "next";
import SusHero from "@/components/sections/sustainPages/SusHero";
import SustainabilityAbout from "@/components/sections/sustainPages/SustainabilityAbout";
import ESGReports from "@/components/sections/sustainPages/ESGReports";
import CertificationSection from "@/components/sections/sustainPages/CertificationSection";
import GrowthSus from "@/components/sections/sustainPages/GrowthSus";
import KshScroll from "@/components/sections/sustainPages/KshScroll";
import AwardsRecognition from "@/components/sections/sustainPages/AwardsRecognition";
import GovernanceSection from "@/components/sections/sustainPages/GovernanceSection";
import SocialCommitment from "@/components/sections/sustainPages/SocialCommitment";

export const metadata: Metadata = {
  title:
    "Green Industrial & Logistics Park Development in India | Sustainable Infrastructure by KSH INFRA",
  description:
    "KSH INFRA leads green industrial and logistics park development through sustainable infrastructure, eco-friendly design, and energy-efficient Park in India.",
  alternates: { canonical: "https://www.kshinfra.com/sustainability" },
};

const page = () => {
  return (
    <>
      <SusHero />
      <SustainabilityAbout />
      <ESGReports />
      <CertificationSection />
      <AwardsRecognition />
      <KshScroll />
      <SocialCommitment />
      <GovernanceSection />
      {/* <GrowthSus /> */}
    </>
  );
};

export default page;
