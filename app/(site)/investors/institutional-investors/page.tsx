import type { Metadata } from "next";
import InvestorHeroSection from "@/components/sections/Investor/InvestorHeroSection";
import ValueVisionWealthSection from "@/components/sections/Investor/ValueVisionWealthSection";
import ExistingInvestorsSection from "@/components/sections/Investor/ExistingInvestorsSection";
import StrategicPartners from "@/components/AifComponents/Overview/StrategicPartners";
// import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "KSH INFRA Institutional Investors | Strategic Partnerships",
  description:
    "Explore KSH INFRA's institutional investor partnerships, investment track record and expertise in developing Grade A Industrial & Logistics assets.",
  alternates: {
    canonical: "https://www.kshinfra.com/investors/institutional-investors",
  },
};

export default function ContactPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{
        // Match the fluid margin formula used across your main hero component
        // @ts-ignore
        "--margin": "clamp(16px, 5.7vw, 80px)",
      }}
    >
      <InvestorHeroSection />
      <ValueVisionWealthSection />
      {/* <ExistingInvestorsSection /> */}
      <StrategicPartners />
    </div>
  );
}
