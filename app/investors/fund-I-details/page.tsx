import type { Metadata } from "next";
import Hero from "@/components/AifComponents/FundDetails/Hero";
import Intro from "@/components/AifComponents/FundDetails/Intro";
import VehicleAndWhyKsh from "@/components/AifComponents/FundDetails/VehicleAndWhyKsh";
import KeyHighlights from "@/components/AifComponents/FundDetails/KeyHighlights";
import FundSnapshot from "@/components/AifComponents/FundDetails/FundSnapshot";
import Lifecycle from "@/components/AifComponents/FundDetails/Lifecycle";
import CTA from "@/components/AifComponents/FundDetails/CTA";

export const metadata: Metadata = {
  title: "KSH INFRA Fund I | ₹1,250 Cr Industrial & Logistics AIF",
  description:
    "Explore KSH INFRA Fund I, a ₹1,250 Cr Category II AIF focused on Grade A Industrial & Logistics development across India's key growth markets.",
  alternates: { canonical: "https://www.kshinfra.com/investors/fund-I-details" },
};

export default function AifFundDetailsPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Hero />

      <div className="flex-1">
        <Intro />
        <VehicleAndWhyKsh />
        <KeyHighlights />
        {/* <TheVehicle /> — see components/AifComponents/FundDetails, currently disabled */}
        <FundSnapshot />
        <Lifecycle />
        {/* 6. Investment criteria + Risk & governance — currently disabled, see components/AifComponents/FundDetails/InvestmentCriteria.tsx */}
        {/* <CTA /> */}
      </div>
    </div>
  );
}
