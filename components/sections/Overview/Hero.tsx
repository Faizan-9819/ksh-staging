import React from "react";
import HeroVideoToggle from "@/components/ui/HeroVideoToggle";

function Hero() {
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
          src="/overview/PO Desktop.mp4"
          className="hidden lg:block w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Mobile & Tablet Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/overview/PO Mobile.mp4"
          className="block lg:hidden w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Subtle Dark Gradient Overlay for Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* 2. OVERVIEW Watermark Text (Moved to Rightmost Edge) */}
      <h1
        className="absolute md:-bottom-9 bottom-0 right-0 select-none pointer-events-none font-black z-10 text-7xl sm:text-9xl md:text-[130px] lg:text-[180px] xl:text-[200px] 2xl:text-[230px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px]"
        style={{
          fontFamily: "var(--font-sora), 'Sora', sans-serif",
          background:
            "linear-gradient(180deg, rgba(229, 229, 229, 0.60) 27.25%, rgba(255, 255, 255, 0.03) 69.98%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        aria-hidden="true"
      >
        Overview
      </h1>

      <HeroVideoToggle />
    </section>
  );
}

export default Hero;
// import React from "react";

// function Hero() {
//   return (
//       <div className="absolute inset-0 z-0">
//         <img
//           src="/overview/overviewbg.webp"
//           alt="put ur image here"
//           className="w-full h-full object-cover object-center pointer-events-none select-none"
//           draggable={false}
//           loading="eager"
//         />
//         {/* Subtle Dark Gradient Overlay for Vignette Effect */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
//       </div>

//       {/* 2. ABOUT Watermark Text (Pixel Perfect Exact Gradient) */}
//       <div
//         className="absolute md:-bottom-9 bottom-0 right-0 sm:right-4 lg:right-8 select-none pointer-events-none font-black  z-10 text-7xl sm:text-9xl md:text-[130px] lg:text-[180px] xl:text-[200px] 2xl:text-[230px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px]"
//         style={{
//           fontFamily: "var(--font-sora), 'Sora', sans-serif",
//           background:
//             "linear-gradient(180deg, rgba(229, 229, 229, 0.60) 27.25%, rgba(255, 255, 255, 0.03) 69.98%)",
//           WebkitBackgroundClip: "text",
//           backgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//         aria-hidden="true"
//       >
//         Overview
//       </div>
//     </section>
//   );
// }

// export default Hero;
