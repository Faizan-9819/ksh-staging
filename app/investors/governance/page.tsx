import type { Metadata } from "next";
import Hero from "@/components/AifComponents/Governance/Hero";
import InvestmentCommittee from "@/components/AifComponents/Governance/InvestmentCommittee";
import CTA from "@/components/AifComponents/Governance/CTA";

export const metadata: Metadata = {
  title: "KSH INFRA Governance | Independent Investment Oversight",
  description:
    "Explore KSH INFRA Fund I's governance framework, independent Investment Committee, risk controls and disciplined investment oversight.",
  alternates: { canonical: "https://www.kshinfra.com/investors/governance" },
};

export default function AifGovernancePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Hero />

      <main className="flex-1">
        {/* 1. Intro — currently disabled, see components/AifComponents/Governance/Intro.tsx */}
        <InvestmentCommittee />
        {/* <CTA /> */}
      </main>
    </div>
  );
}
