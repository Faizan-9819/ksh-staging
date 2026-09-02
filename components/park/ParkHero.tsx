"use client";

import Navbar from "@/components/ui/Navbar";
import { lenisScrollTo } from "@/components/ui/LenisProvider";

export default function ParkHero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-navy min-h-[100svh] lg:h-screen flex flex-col justify-between"
      style={{
        // @ts-ignore
        "--margin": "clamp(16px, 5.7vw, 80px)",
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/park/hero-bg.png"
          alt="KSH Chakan Park IV aerial view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(201deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.32) 69%), linear-gradient(90deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2))",
          }}
        />
      </div>

      {/* Legibility scrim */}
      <div className="absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(to_top,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_65%)] pointer-events-none z-[2]" />

      {/* Navbar */}
      <div className="relative w-full z-[5] pt-safe-top">
        <Navbar margin="var(--margin)" />
      </div>

      {/* Title block */}
      <div className="relative z-[4] fix mlcont mrcont w-full pb-[100px] lg:pb-[130px]">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="text-white">
            <h1 className="font-sora font-semibold text-[32px] sm:text-[44px] lg:text-[60px] leading-[1.1] tracking-[-1.2px] m-0">
              KSH Chakan Park IV
            </h1>
            <p className="font-inter text-[16px] lg:text-[24px] leading-[1.4] mt-1">
              Pune, Maharashtra
            </p>
          </div>

          <button
            aria-label="Scroll down"
            onClick={() => lenisScrollTo(window.innerHeight)}
            className="hidden sm:flex items-center justify-center size-[64px] rounded-full border border-white text-white shrink-0 cursor-pointer transition-opacity hover:opacity-80"
          >
            <svg width="15" height="33" viewBox="0 0 15 33" fill="none">
              <path
                d="M7.5 0v31M1 24.5 7.5 31l6.5-6.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
