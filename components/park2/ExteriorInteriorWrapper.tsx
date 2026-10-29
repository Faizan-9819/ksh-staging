"use client";

import { useState } from "react";
import Link from "@/components/ui/Link";
import Exterior from "./Exterior";
import Interior from "./Interior";

type View = "Park Exterior" | "Park Interior";

const TABS: { value: View; label: string }[] = [
  { value: "Park Exterior", label: "Exterior" },
  { value: "Park Interior", label: "Interior" },
];

export default function ExteriorInteriorWrapper({
  parkName = "Chakan",
}: {
  parkName?: string;
}) {
  const [view, setView] = useState<View>("Park Exterior");

  return (
    <section
      id="park-infrastructure"
      className="relative w-full bg-white pt-[48px] lg:pt-[68px]"
      data-name="Exterior Interior Wrapper"
    >
      <div className="flex flex-col gap-20">
        {/* Title + tabs row */}
        <div className="flex fix flex-col items-start justify-between gap-[24px] min-[1200px]:flex-row min-[1200px]:items-center">
          <div className="flex flex-col gap-[8px]">
            <h2 className="m-0 font-sora text-[32px] font-semibold leading-[1.1] tracking-[-0.96px] text-[#212121] sm:text-[40px] lg:text-[48px]">
              Infrastructure
            </h2>
          </div>

          <div className="flex w-full items-center gap-[20px] sm:w-[429px]">
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab.value}
                aria-pressed={view === tab.value}
                onClick={() => setView(tab.value)}
                className={`flex-1 cursor-pointer whitespace-nowrap rounded-[50px] px-[20px] py-[10px] text-center font-sora text-[16px] leading-[1.4] transition-colors sm:text-[20px] ${
                  view === tab.value
                    ? "bg-[#59624d] text-white underline underline-offset-4"
                    : "border border-[#9e9e9e] bg-transparent text-[#9e9e9e]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Isometric image + hotspots */}
        {view === "Park Exterior" ? <Exterior /> : <Interior />}
      </div>
    </section>
  );
}
