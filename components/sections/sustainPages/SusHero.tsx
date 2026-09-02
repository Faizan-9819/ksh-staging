import React, { memo } from "react";

function About() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-[#CBC4B5] flex items-center justify-center">
      {/* 1a. Desktop Video Container (lg and above) */}
      <div className="absolute inset-0 z-0 hidden lg:block overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        >
          <source
            src="/sustainability/Sustainability Desktop.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* 1b. Mobile Video Container (< lg) */}
      <div className="absolute inset-0 z-0 lg:hidden overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        >
          <source
            src="/sustainability/Sustainability Mobile.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Watermark */}
      <h1
        className="absolute z-0 md:-bottom-15 lg:-bottom-15 -bottom-5 right-0 sm:right-4 lg:right-0 select-none pointer-events-none font-black z-10 text-[52px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[180px] 2xl:text-[200px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px] text-white/80 lg:text-white/60 opacity-95 lg:opacity-85"
        aria-hidden="true"
      >
        Sustainability
      </h1>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 w-full z-20 lg:h-[120px]! h-[20px]! left-0 bg-linear-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
}

export default memo(About);

//
// import React, { memo } from "react";

// function About() {
//   return (
//     <section className="relative w-full h-[80vh] overflow-hidden bg-slate-950 flex items-center justify-center">
//       {/* 1. Main Image Container */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src="/sustainability/hero-sus.webp"
//           alt="put ur image here"
//           className="w-full h-full object-cover object-center pointer-events-none select-none"
//           draggable={false}
//           loading="eager"
//         />
//         {/* Subtle Dark Gradient Overlay for Vignette Effect */}
//         {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" /> */}
//       </div>

//       <div
//         className="absolute z-0 md:-bottom-7 -bottom-5 right-0 sm:right-4 lg:right-0 select-none pointer-events-none font-black z-10 text-[52px] sm:text-9xl md:text-[140px] lg:text-[230px] xl:text-[230px] 2xl:text-[200px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px] text-white/60 opacity-85"
//         aria-hidden="true"
//       >
//         Sustainability
//       </div>
//       <div className="absolute bottom-0 w-full z-20 h-40 left-0 bg-linear-to-t from-black to-transparent"></div>
//     </section>
//   );
// }

// export default memo(About);
// {
//   /* 2. ABOUT Watermark Text (Pixel Perfect Exact Gradient) */
// }
// {
//   /* <div
//         className="absolute md:-bottom-10 bottom-0 right-0 sm:right-4 lg:right-0 select-none pointer-events-none font-black z-10 text-[52px] sm:text-9xl md:text-[140px] lg:text-[230px] xl:text-[230px] 2xl:text-[200px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px]"
//         style={{
//           fontFamily: "var(--font-sora), 'Sora', sans-serif",
//           background:
//             "linear-gradient(180deg, rgba(229, 229, 229, 0.60) 25%, rgba(255, 255, 255, 0.08) 75%)",
//           WebkitBackgroundClip: "text",
//           backgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//         aria-hidden="true"
//       >
//         Sustainability
//       </div> */
// }
// {
//   /* <div
//         className="absolute md:-bottom-7 bottom-0 right-0 sm:right-4 lg:right-0 select-none pointer-events-none font-black z-10 text-[52px] sm:text-9xl md:text-[140px] lg:text-[230px] xl:text-[230px] 2xl:text-[200px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px]"
//         style={{
//           fontFamily: "var(--font-sora), 'Sora', sans-serif",
//           background:
//             "linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.40) 50%, rgba(255, 255, 255, 0.10) 75%, rgba(255, 255, 255, 0.00) 85%, rgba(255, 255, 255, 0.00) 100%)",
//           WebkitBackgroundClip: "text",
//           backgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//         aria-hidden="true"
//       >
//         Sustainability
//       </div> */
// }
