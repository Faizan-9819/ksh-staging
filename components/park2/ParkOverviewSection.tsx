"use client";

import { useState } from "react";

type View = "Park Exterior" | "Park Interior";

type Hotspot = {
  label: string;
  /** pill position, % of the image box */
  pillLeft: number;
  pillTop: number;
  /** point on the building the leader line connects to, % of the image box */
  targetLeft: number;
  targetTop: number;
  /** which side of the pill the line leaves from */
  side: "left" | "right";
  filled?: boolean;
};

const HOTSPOTS: Hotspot[] = [
  {
    label: "Building Area",
    pillLeft: 10,
    pillTop: 50,
    targetLeft: 35,
    targetTop: 55,
    side: "right",
    filled: true,
  },
  {
    label: "Solar Roof",
    pillLeft: 88,
    pillTop: 27,
    targetLeft: 68,
    targetTop: 22,
    side: "left",
  },
  {
    label: "Truck Apron",
    pillLeft: 88,
    pillTop: 58,
    targetLeft: 85,
    targetTop: 58,
    side: "left",
  },
  {
    label: "Statistics",
    pillLeft: 11,
    pillTop: 93,
    targetLeft: 44,
    targetTop: 84,
    side: "right",
  },
];

function Eyebrow() {
  return (
    <div className="flex items-center gap-[6px]">
      <svg
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        className="shrink-0"
      >
        <path d="M0 5h12M8 1l4 4-4 4" stroke="#59624d" strokeWidth="1.2" />
      </svg>
      <p className="font-sora font-normal text-[9.6px] tracking-[-0.192px] uppercase text-[#59624d] m-0">
        An Integrated Industrial Infrastructure Platform
      </p>
    </div>
  );
}

/**
 * Renders an angled leader line as two CSS-border segments (horizontal stub off
 * the pill + diagonal run to the target). Pure %-based positioning so it never
 * needs runtime measurement and can't be squashed by a non-square SVG viewBox.
 */
function LeaderLine({ spot }: { spot: Hotspot }) {
  const bendLeft =
    spot.side === "right" ? spot.pillLeft + 5 : spot.pillLeft - 5;

  const dx = spot.targetLeft - bendLeft;
  const dy = spot.targetTop - spot.pillTop;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <>
      {/* Horizontal stub leaving the pill */}
      <span
        className="absolute h-0 border-t border-[#9e9e9e]"
        style={{
          left: `${Math.min(spot.pillLeft, bendLeft)}%`,
          top: `${spot.pillTop}%`,
          width: `${Math.abs(bendLeft - spot.pillLeft)}%`,
        }}
      />
      {/* Diagonal run to the target point on the building */}
      <span
        className="absolute h-0 border-t border-[#9e9e9e] origin-left"
        style={{
          left: `${bendLeft}%`,
          top: `${spot.pillTop}%`,
          width: `${length}%`,
          transform: `rotate(${angle}deg)`,
        }}
      />
    </>
  );
}

export default function ParkOverviewSection() {
  const [view, setView] = useState<View>("Park Exterior");

  return (
    <section
      className="relative w-full bg-white overflow-hidden py-[48px] lg:py-[68px]"
      data-name="Park Overview Section"
    >
      <div className="fix flex flex-col gap-[32px]">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[24px]">
          <div className="flex flex-col gap-[24px]">
            <Eyebrow />
            <h2 className="font-sora font-semibold text-[28px] sm:text-[32px] lg:text-[38.4px] tracking-[-0.768px] text-[#212121] m-0 max-w-[540px]">
              Popup trigger 2
              <br />
              Lorem Ipsum Dolor Set Amit
            </h2>
          </div>

          <div className="flex items-center gap-[16px] w-full sm:w-[343px] shrink-0">
            {(["Park Exterior", "Park Interior"] as View[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setView(tab)}
                className={`flex-1 px-[16px] py-[8px] rounded-[40px] text-[16px] font-sora leading-[1.4] whitespace-nowrap cursor-pointer transition-colors ${
                  view === tab
                    ? "bg-[#59624d] text-white"
                    : "border border-[0.8px] border-[#9e9e9e] text-[#9e9e9e] bg-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/*  */}

        {/* Isometric image + hotspots + connector lines */}
        <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[560px] px-[90px] sm:px-[110px] lg:px-[130px]">
          <img
            src="/ParkPage/chakan-4/intext.webp"
            alt={view}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />

          {HOTSPOTS.map((spot) => (
            <LeaderLine key={spot.label} spot={spot} />
          ))}

          {HOTSPOTS.map((spot) => (
            <span
              key={spot.label}
              style={{ left: `${spot.pillLeft}%`, top: `${spot.pillTop}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 px-[16px] py-[8px] rounded-[64px] text-[12.8px] font-sora leading-[1.4] whitespace-nowrap transition-transform hover:scale-105 ${
                spot.filled
                  ? "bg-[#59624d] text-white"
                  : "border border-[0.8px] border-[#59624d] text-[#59624d] bg-white/80"
              }`}
            >
              {spot.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
