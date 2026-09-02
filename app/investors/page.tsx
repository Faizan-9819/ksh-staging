import type { Metadata } from "next";
import Hero from "@/components/AifComponents/Overview/Hero";
import Intro from "@/components/AifComponents/Overview/Intro";
import Lifecycle from "@/components/AifComponents/Overview/Lifecycle";
import TrackRecord from "@/components/AifComponents/Overview/TrackRecord";
import IntegratedModel from "@/components/AifComponents/Overview/IntegratedModel";
import PositioningSnapshot from "@/components/AifComponents/Overview/PositioningSnapshot";
import StrategicPartners from "@/components/AifComponents/Overview/StrategicPartners";
import CTA from "@/components/AifComponents/Overview/CTA";

export const metadata: Metadata = {
  title: "KSH INFRA Investors | Industrial & Logistics Investments",
  description:
    "Explore KSH INFRA's investment platform, Fund I, institutional partnerships and proven track record in developing Grade A Industrial & Logistics assets.",
  alternates: { canonical: "https://www.kshinfra.com/investors" },
};

export default function AifOverviewPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Hero />

      <main className="flex-1">
        <Intro />
        <Lifecycle />
        <TrackRecord />
        <IntegratedModel />
        <PositioningSnapshot />
        {/* <StrategicPartners /> */}
        {/* <CTA /> */}
      </main>
    </div>
  );
}
