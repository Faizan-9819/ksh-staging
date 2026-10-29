import React, { memo } from "react";
import HeroVideoToggle from "@/components/ui/HeroVideoToggle";

function HeroSolut() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-[#CBC4B5] flex items-center justify-center">
      {/* 1. Main Video Container */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/solutions/Solutions Desktop.mp4"
          className="hidden lg:block w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Mobile & Tablet Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/solutions/Solutions Mobile.mp4"
          className="block lg:hidden w-full h-full object-cover object-center pointer-events-none select-none"
        />
        {/* Subtle Dark Gradient Overlay for Vignette Effect */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" /> */}
      </div>

      <h1
        className="absolute z-0 md:-bottom-7 -bottom-5 right-0 sm:right-4 lg:right-0 select-none pointer-events-none font-black z-10 text-[52px] sm:text-9xl md:text-[140px] lg:text-[230px] xl:text-[230px] 2xl:text-[200px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px] text-white/60 opacity-85"
        aria-hidden="true"
      >
        Solutions
      </h1>
      <div className="absolute bottom-0 w-full z-20 lg:h-40 h-[30px] left-0 bg-linear-to-t from-black to-transparent"></div>

      <HeroVideoToggle />
    </section>
  );
}

export default memo(HeroSolut);
