import type { Metadata } from "next";
import BuildTogetherSection from "@/components/sections/career/BuildTogetherSection";
import CareerFormSection from "@/components/sections/career/CareerFormSection";
import CareerHeroSection from "@/components/sections/career/CareerHeroSection";
import CommitmentWellBeingSection from "@/components/sections/career/CommitmentWellBeingSection";
import WeMakeLeadersSection from "@/components/sections/career/WeMakeLeadersSection";
// import ContactFormSection from "@/components/sections/career/ContactFormSection";
// import ConnectWithUsSection from "@/components/sections/career/ConnectWithUsSection";

export const metadata: Metadata = {
  title:
    "Careers at KSH INFRA Join Experts in Industrial & Logistics Park,Warehouse Development In India",
  description:
    "Join KSH INFRA and build your career in industrial and logistics park development, infrastructure design, and Warehouse Development In India.",
  alternates: { canonical: "https://www.kshinfra.com/careers" },
};

export default function ContactPage() {
  return (
    <main
      className="min-h-screen bg-white"
      style={{
        // Match the fluid margin formula used across your main hero component
        // @ts-ignore
        "--margin": "clamp(16px, 5.7vw, 80px)",
      }}
    >
      <CareerHeroSection />
      <WeMakeLeadersSection />
      <CommitmentWellBeingSection />
      <BuildTogetherSection />
      <CareerFormSection />
    </main>
  );
}
