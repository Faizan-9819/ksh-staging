"use client";

import dynamic from "next/dynamic";

const LeafletMapCanvas = dynamic(() => import("./LeafletMapCanvas"), {
  ssr: false,
});

const DISTANCES = [
  { label: "Pune International Airport", value: "39", active: true },
  { label: "Mumbai International Airport", value: "143" },
  { label: "Seaport", value: "141" },
  { label: "National Highways", value: "103" },
  { label: "City Center", value: "33" },
];

const MAP_COORDINATES = "18.7728356, 73.7504697";
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/KSH+INFRA+Chakan+Industrial+Park+4/@18.7728356,73.7478948,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b500280e43b1:0xaa7df7414683ae36!8m2!3d18.7728356!4d73.7504697!16s%2Fg%2F11ybdty61x?hl=en&entry=ttu";

export default function ParkLeafletMap() {
  return (
    <section id="park-infrastructure" className="relative w-full bg-white overflow-hidden">
      <div className="relative h-[500px] lg:h-[759px] w-full">
        <LeafletMapCanvas />

        {/* Legibility scrim so the distance pills stay readable over map tiles */}
        <div className="absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none z-[401]" />

        {/* Tick-mark ruler, matching the tab-nav pattern */}
        <div className="absolute inset-x-0 top-0 flex justify-between px-4 z-[401] pointer-events-none">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} className="w-px h-[18px] bg-[rgba(33,33,33,0.18)]" />
          ))}
        </div>

        {/* Distance pills */}
        <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-full px-4 z-[401] pointer-events-none">
          <div className="fix flex items-center gap-3 overflow-x-auto no-scrollbar">
            {DISTANCES.map((d) => (
              <div
                key={d.label}
                className={`flex items-center justify-between gap-3 shrink-0 h-[60px] lg:h-[70px] px-5 rounded-[46px] w-[220px] lg:w-[250px] ${
                  d.active ? "bg-[#cbc4b5]" : "border border-black/10 bg-white/70 backdrop-blur-sm"
                }`}
              >
                <p className="text-[11px] lg:text-[12px] tracking-[-0.24px] text-[#212121] font-inter max-w-[65%]">
                  {d.label}
                </p>
                <div className="flex items-end gap-[3px] shrink-0">
                  <span className="text-[14px] lg:text-[16px] tracking-[-0.32px] text-[#212121] font-sora">
                    {d.value}
                  </span>
                  <span className="text-[11px] lg:text-[12px] text-[#6d6d6d] font-inter">
                    km
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View on map pill */}
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-[24px] right-[6%] max-lg:hidden bg-white/85 backdrop-blur-sm px-10 py-5 rounded-[46px] z-[401] shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-opacity hover:opacity-80"
        >
          <p className="font-sora text-[16px] text-[#212121]">View on Map</p>
          <p className="font-inter text-[16px] text-[#6d6d6d]">
            {MAP_COORDINATES}
          </p>
        </a>
      </div>
    </section>
  );
}
