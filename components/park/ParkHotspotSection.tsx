"use client";

import { useState } from "react";

const TABS = ["Park Exterior", "Park Interior"];

const HOTSPOTS = [
  { label: "Solar Roof", top: "18%", left: "78%", filled: false },
  { label: "Truck Apron", top: "52%", left: "88%", filled: false },
  { label: "Building Area", top: "34%", left: "6%", filled: true },
  { label: "Statistics", top: "88%", left: "16%", filled: false },
];
//
export default function ParkHotspotSection() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="fix relative py-[88px] max-lg:py-[60px]">
        <div className="flex items-start justify-between gap-6 flex-wrap mb-10">
          <div className="flex flex-col gap-4 max-w-[674px]">
            <div className="flex items-center gap-2">
              <span className="text-[#59624d] text-[12px] font-sora">//</span>
              <p className="font-sora text-[12px] tracking-[-0.24px] uppercase text-[#59624d]">
                An Integrated Industrial Infrastructure Platform
              </p>
            </div>
            <h2 className="font-sora font-semibold text-[32px] lg:text-[48px] tracking-[-0.96px] text-[#212121] m-0">
              Chakan: A Thriving Industrial Hub in Pune
            </h2>
          </div>

          <div className="flex gap-3 shrink-0">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-[20px] py-[10px] rounded-[50px] text-[15px] lg:text-[20px] font-sora cursor-pointer transition-colors whitespace-nowrap ${
                  tab === t
                    ? "bg-[#59624d] text-white"
                    : "border border-[#9e9e9e] text-[#9e9e9e] bg-transparent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full aspect-[1154/551] max-w-[1154px] mx-auto">
          <img
            src="/park/hotspot-park.jpg"
            alt={tab}
            className="w-full h-full object-contain"
          />

          {HOTSPOTS.map((h) => (
            <span
              key={h.label}
              className={`absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-[20px] py-[10px] rounded-[80px] text-[14px] lg:text-[16px] font-sora whitespace-nowrap ${
                h.filled
                  ? "bg-[#59624d] text-white"
                  : "border border-[#59624d] text-[#59624d] bg-white/80"
              }`}
              style={{ top: h.top, left: h.left }}
            >
              {h.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
