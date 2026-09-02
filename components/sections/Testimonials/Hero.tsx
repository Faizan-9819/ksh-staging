// import React, { memo } from "react";

// function Hero() {
//   return (
//     <section className="relative w-full h-[80vh] overflow-hidden bg-[#CBC4B5] flex items-center justify-center">
//       {/* 1a. Desktop Video Container (lg and above) */}
//       <div className="absolute inset-0 z-0 hidden lg:block overflow-hidden">
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="auto"
//           disablePictureInPicture
//           controlsList="nodownload noplaybackrate noremoteplayback"
//           className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
//         >
//           <source
//             src="/sustainability/Sustainability Desktop.mp4"
//             type="video/mp4"
//           />
//         </video>
//       </div>

//       {/* 1b. Mobile Video Container (< lg) */}
//       <div className="absolute inset-0 z-0 lg:hidden overflow-hidden">
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="auto"
//           disablePictureInPicture
//           controlsList="nodownload noplaybackrate noremoteplayback"
//           className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
//         >
//           <source
//             src="/sustainability/Sustainability Mobile.mp4"
//             type="video/mp4"
//           />
//         </video>
//       </div>

//       {/* Watermark */}
//       <h1
//         className="absolute z-0 md:-bottom-15 lg:-bottom-15 -bottom-5 right-0 sm:right-4 lg:right-0 select-none pointer-events-none font-black z-10 text-[52px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[180px] 2xl:text-[200px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px] text-white/80 lg:text-white/60 opacity-95 lg:opacity-85"
//         aria-hidden="true"
//       >
//         Testimonial
//       </h1>

//       {/* Bottom Gradient Overlay */}
//       <div className="absolute bottom-0 w-full z-20 lg:h-[120px]! h-[20px]! left-0 bg-linear-to-t from-black to-transparent pointer-events-none"></div>
//     </section>
//   );
// }

// export default memo(Hero);
//
//
//
//
import React, { memo } from "react";

function Hero() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-[#CBC4B5] flex items-center justify-center">
      {/* 1a. Desktop Image Container (lg and above) */}
      <div className="absolute inset-0 z-0 hidden lg:block overflow-hidden">
        <img
          src="home/testimonial/testibg.webp"
          alt="Desktop Hero"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />
      </div>

      {/* 1b. Mobile Image Container (< lg) */}
      <div className="absolute inset-0 z-0 lg:hidden overflow-hidden">
        <img
          src="home/testimonial/testimobbg.webp"
          alt="Mobile Hero"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />
      </div>

      {/* Watermark */}
      <h1
        className="absolute z-0 md:-bottom-15 lg:-bottom-18 -bottom-5 right-0 sm:right-4 lg:right-0 select-none pointer-events-none font-black z-10 text-[52px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[180px] 2xl:text-[200px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px] text-white/80 lg:text-white/60 opacity-95 lg:opacity-85"
        aria-hidden="true"
      >
        Testimonials
      </h1>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 w-full z-20 lg:h-[120px]! h-[20px]! left-0 bg-linear-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
}

export default memo(Hero);
