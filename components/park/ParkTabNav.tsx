"use client";

import { useState } from "react";
import { lenisScrollTo } from "@/components/ui/LenisProvider";

const TABS = [
  { label: "Overview", id: "overview" },
  { label: "Park Highlights", id: "park-highlights" },
  { label: "Location & Connectivity", id: "location-connectivity" },
  { label: "Park Infrastructure", id: "park-infrastructure" },
  { label: "Download Brochure", id: "download-brochure" },
];

export default function ParkTabNav() {
  const [active, setActive] = useState("overview");

  const handleClick = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) lenisScrollTo(el);
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-cream overflow-hidden">
      {/* Tick marks spanning the full width */}
      <div className="absolute inset-x-0 top-0 flex justify-between px-4">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className="w-px h-[18px] bg-[rgba(33,33,33,0.18)]" />
        ))}
      </div>

      <div className="fix flex items-center justify-between gap-6 overflow-x-auto no-scrollbar pt-[24px] pb-[22px]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className={`relative font-sora text-[18px] whitespace-nowrap transition-colors cursor-pointer bg-transparent border-none pt-[10px] ${
              active === tab.id ? "text-[#212121]" : "text-[#bdaea6]"
            }`}
          >
            {active === tab.id && (
              <span className="absolute left-0 top-0 w-px h-[18px] bg-[#212121]" />
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
