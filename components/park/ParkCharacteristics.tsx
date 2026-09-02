"use client";

import { useState } from "react";
// 
const FEATURES = [
  {
    icon: "wheel",
    title: "AUTOMOTIVE HUB",
    body: "Chakan houses major automotive brands like Volkswagen, Mahindra & Mahindra, Mercedes Benz, and Bridgestone, positioning it as a central hub for automotive manufacturing and engineering excellence.",
  },
  {
    icon: "triangle",
    title: "KSH INTEGRATED LOGISTICS",
    subtitle: "ROBUST SOLUTIONS. ENHANCED SUPPLY CHAINS.",
    body: "At KSH INFRA, growth goes beyond job titles. Through hands-on project exposure, mentorship, and continuous learning, we empower individuals to build expertise, take ownership, and advance their careers.",
  },
  {
    icon: "wheel",
    title: "SKILLED WORKFORCE",
    body: "A deep talent pool across engineering, manufacturing, and logistics ensures tenants have consistent access to skilled labor for round-the-clock operations.",
  },
  {
    icon: "triangle",
    title: "CONNECTIVITY & ACCESS",
    body: "Proximity to national highways, Pune International Airport, and key seaports keeps supply chains fast, predictable, and cost-efficient.",
  },
];

function FeatureIcon({ type }: { type: string }) {
  if (type === "wheel") {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="26" stroke="#212121" strokeWidth="1.2" />
        <circle cx="28" cy="28" r="8" stroke="#212121" strokeWidth="1.2" />
        <path
          d="M28 2v18M28 36v18M2 28h18M36 28h18M9 9l13 13M34 34l13 13M47 9 34 22M22 34 9 47"
          stroke="#212121"
          strokeWidth="1.2"
        />
      </svg>
    );
  }
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path
        d="M28 8 50 46H6L28 8Z"
        stroke="#212121"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ParkCharacteristics() {
  const [active, setActive] = useState(0);

  return (
    <section id="park-highlights" className="relative w-full bg-white overflow-hidden">
      <div className="fix relative py-[88px] max-lg:py-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[60px] gap-y-10 items-stretch">
          <div className="flex flex-col gap-4 max-w-[568px]">
            <div className="flex items-center gap-2">
              <span className="text-[#59624d] text-[12px] font-sora">//</span>
              <p className="font-sora text-[12px] tracking-[-0.24px] uppercase text-[#59624d]">
                Grow With KSH INFRA
              </p>
            </div>
            <h2 className="font-sora font-semibold text-[32px] lg:text-[48px] tracking-[-0.96px] leading-[1.1] text-[#212121] m-0">
              The Defining Characteristics That Make Chakan, Maharashtra a
              Premier Industrial Destination
            </h2>
            <p className="font-inter text-[16px] lg:text-[20px] leading-[1.4] text-[#4a4a4a] mt-6 max-w-[520px]">
              Chakan has emerged as one of India's most prominent industrial
              destinations, driven by world-class infrastructure, strategic
              connectivity, a skilled workforce, and a thriving manufacturing
              ecosystem. Its strong logistics network and business-friendly
              environment continue to attract leading global and domestic
              enterprises.
            </p>
          </div>

          <div className="bg-[#f8f8f8] rounded-[var(--radius-card)] max-h-[600px] overflow-y-auto custom-scrollbar">
            <div className="flex flex-col gap-[40px] px-[40px] lg:px-[61px] py-[50px]">
              {FEATURES.map((f, i) => {
                const on = active === i;
                return (
                  <div key={f.title}>
                    <button
                      onClick={() => setActive(on ? -1 : i)}
                      className={`flex flex-col gap-[10px] items-start text-left bg-transparent border-none cursor-pointer w-full transition-opacity duration-300 ${
                        on ? "opacity-100" : "opacity-40 blur-[1.5px] hover:opacity-70 hover:blur-0"
                      }`}
                    >
                      <FeatureIcon type={f.icon} />
                      <p className="font-sora text-[20px] lg:text-[24px] tracking-[-0.48px] uppercase text-[#212121] m-0">
                        {f.title}
                      </p>
                      {f.subtitle && (
                        <p className="font-inter text-[16px] text-[#212121] m-0">
                          {f.subtitle}
                        </p>
                      )}
                      <p className="font-inter text-[14px] leading-[1.4] text-[#6d6d6d] m-0 max-w-[425px]">
                        {f.body}
                      </p>
                    </button>
                    {i < FEATURES.length - 1 && (
                      <div className="mt-[40px] h-px w-full bg-[rgba(0,0,0,0.1)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
