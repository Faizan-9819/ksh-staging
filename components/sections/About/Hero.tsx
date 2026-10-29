import React from "react";
import HeroVideoToggle from "@/components/ui/HeroVideoToggle";

function About() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-[#CBC4B5] flex items-center justify-center">
      {/* 1. Main Media Container */}
      <div className="absolute inset-0 z-0">
        {/* Desktop / Tablet Video (md and above) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          className="hidden md:block w-full h-full object-cover object-center pointer-events-none select-none"
        >
          <source src="/about/About Desktop banner Video.mp4" type="video/mp4" />
        </video>

        {/* Mobile Video (< md) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          className="block md:hidden w-full h-full object-cover object-center pointer-events-none select-none"
        >
          <source src="/about/About mobile Banner video.mp4" type="video/mp4" />
        </video>

        {/* Subtle Dark Gradient Overlay for Vignette Effect */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" /> */}
      </div>

      {/* 2. ABOUT Watermark Text (Pixel Perfect Exact Gradient) */}
      <h1
        // className="absolute md:-bottom-9 bottom-0 right-0 sm:right-4 lg:right-8 select-none pointer-events-none font-black z-10 text-7xl sm:text-9xl md:text-[140px] lg:text-[230px] xl:text-[230px] 2xl:text-[280px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px]"
        className="absolute md:-bottom-10 bottom-0 right-0 sm:right-4 lg:right-8 select-none pointer-events-none font-black z-10 text-7xl sm:text-9xl md:text-[140px] lg:text-[230px] xl:text-[230px] 2xl:text-[280px]  tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px]"
        style={{
          fontFamily: "var(--font-sora), 'Sora', sans-serif",
          background:
            "linear-gradient(180deg, rgba(229, 229, 229, 0.60) 27.25%, rgba(255, 255, 255, 0.08) 69.98%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        aria-hidden="true"
      >
        About
      </h1>

      <HeroVideoToggle />
    </section>
  );
}

export default About;
// import React from "react";

// function About() {
//   return (
//     <section className="relative w-full h-[80vh] overflow-hidden bg-slate-950 flex items-center justify-center">
//       {/* 1. Main Image Container */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src="/about/herobg.webp"
//           alt="put ur image here"
//           className="hidden md:block w-full h-full object-cover object-center pointer-events-none select-none"
//           draggable={false}
//           loading="eager"
//         />
//         {/*  */}
//         <img
//           src="/about/mobherobg.webp"
//           alt="About Hero Mobile"
//           className="block md:hidden w-full h-full object-cover object-center pointer-events-none select-none"
//           draggable={false}
//           loading="eager"
//         />
//         {/* Subtle Dark Gradient Overlay for Vignette Effect */}
//         {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" /> */}
//       </div>

//       {/* 2. ABOUT Watermark Text (Pixel Perfect Exact Gradient) */}
//       <div
//         className="absolute md:-bottom-9 bottom-0 right-0 sm:right-4 lg:right-8 select-none pointer-events-none font-black  z-10 text-7xl sm:text-9xl md:text-[140px] lg:text-[230px] xl:text-[230px] 2xl:text-[280px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px]"
//         style={{
//           fontFamily: "var(--font-sora), 'Sora', sans-serif",
//           background:
//             "linear-gradient(180deg, rgba(229, 229, 229, 0.60) 27.25%, rgba(255, 255, 255, 0.08) 69.98%)",
//           WebkitBackgroundClip: "text",
//           backgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//         aria-hidden="true"
//       >
//         About
//       </div>
//     </section>
//   );
// }

// export default About;
