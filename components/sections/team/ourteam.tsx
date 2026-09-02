"use client";

import Image from "next/image";
import Navbar from "@/components/ui/Navbar";

export default function TeamSpot() {
  return (
    <section
      className="relative w-full h-[80dvh] overflow-hidden bg-[#CBC4B5] font-[family:var(--font-inter),sans-serif] flex flex-col justify-between"
      style={{
        // @ts-ignore
        "--margin": "clamp(16px, 5.7vw, 80px)",
      }}
    >
      {/* Background Image Container */}

      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <Image
          src="/ourteam/teambg.webp"
          alt="KSH INFRA Investors"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom sm:object-fill pointer-events-none w-full h-full"
        />
        {/* Concentric Geometric Arcs */}

        <div className="hidden lg:block absolute left-[58%] top-[34%] w-[62%] pb-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 pointer-events-none" />

        <div className="hidden lg:block absolute left-[58%] top-[34%] w-[44%] pb-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] pointer-events-none" />
      </div>
      {/* Scrim Overlay */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none z-[2]" />
      {/* Side Hairline Guides */}

      <div
        className="absolute top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-[1]"
        style={{ left: "var(--margin)" }}
      />

      <div
        className="absolute top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-[1]"
        style={{ right: "var(--margin)" }}
      />
      {/* Navigation */}

      <div className="relative w-full z-[5] pt-safe-top">
        <Navbar margin="var(--margin)" />
      </div>

      {/* Watermark Text Container - Flush Right with Exact Linear Gradient Fade Style */}

      <div
        className="relative z-[3] w-full flex items-end justify-end pointer-events-none overflow-hidden -mb-2 sm:-mb-4 lg:-mb-6"
        style={{ paddingRight: "var(--margin)" }}
      >
        <h1
          className="text-right uppercase select-none pointer-events-none whitespace-nowrap font-black text-[52px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[180px] 2xl:text-[200px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px] text-white/80 lg:text-white/60 opacity-95 lg:opacity-85"
          style={{
            lineHeight: "0.85",
          }}
        >
          OUR TEAM
        </h1>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full z-20 h-[20px]! lg:h-[120px]! bg-linear-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
