// "use client";

// import React, { useEffect, useRef } from "react";
// import { useScroll } from "framer-motion";
// import Btn from "@/components/ui/Btn";

// const GREY_WORDS = [
//   "A",
//   "Team",
//   "of",
//   "Visionaries,",
//   "Engineers,",
//   "and",
//   "Leaders",
//   "Building",
//   "Tomorrow's",
//   "Infrastructure",
// ];

// const BOLD_WORDS = [
//   "A",
//   "Team",
//   "of",
//   "Visionaries,",
//   "Engineers,",
//   "and",
//   "Leaders",
//   "Building",
//   "Tomorrow's",
//   "Infrastructure",
// ];

// export default function TeamSection() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const greyRef = useRef<HTMLSpanElement>(null);

//   // Hook into scroll progress of container
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   // Scroll color fill effect for title
//   useEffect(() => {
//     const onScroll = () => {
//       const el = greyRef.current;
//       if (!el) return;
//       const r = el.getBoundingClientRect();
//       const vh = window.innerHeight || 800;
//       const p = Math.max(
//         0,
//         Math.min(1, (vh * 1.02 - r.top) / (r.height + vh * 0.5)),
//       );
//       const spans = el.querySelectorAll<HTMLSpanElement>("span[data-w]");
//       const fill = p * spans.length;
//       spans.forEach((s, i) => {
//         s.style.color = i < fill ? "#212121" : "#64635D";
//       });
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     requestAnimationFrame(onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-full bg-white text-[#212121] overflow-hidden"
//     >
//       {/* Global .fix Container with exact responsive padding (50px mobile, 80px desktop) */}
//       <div className="fix relative z-10 py-[50px] lg:py-[80px]">
//         {/* Header Block */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-12">
//           {/* Animated Title */}
//           <div className="">
//             <h2 className="m-0 font-[family-name:var(--font-sora),sans-serif] leading-[1.2] lg:leading-[1.18] tracking-[-0.012em] text-[22px] sm:text-[30px] lg:text-[38px] xl:text-[46px]">
//               <span ref={greyRef} className="block text-[#64635D]">
//                 {GREY_WORDS.map((word, i) => {
//                   const cleanWord = word.replace(/[^a-zA-Z]/g, "");
//                   const isBold = BOLD_WORDS.includes(cleanWord) && i < 7;

//                   return (
//                     <span
//                       key={i}
//                       data-w="1"
//                       className={`text-[#64635D] [transition:color_.5s_ease] ${
//                         isBold ? "font-semibold" : "font-normal"
//                       }`}
//                     >
//                       {word}{" "}
//                     </span>
//                   );
//                 })}
//               </span>
//             </h2>
//           </div>

//           {/* View All Button (Using original Btn component) */}
//           <div className="flex-shrink-0">
//             <Btn
//               label="View All"
//               textColor="text-[#6D6D6D]"
//               hoverTextColor="text-white"
//               borderColor="border-[#D3D3D3]"
//               bgColor="bg-transparent"
//               hoverBgColor="bg-[#24314E]"
//               arrowColor="stroke-[#6D6D6D]"
//               hoverArrowColor="stroke-white"
//             />
//           </div>
//         </div>

//         {/* Team Image Container */}
//         <div className="w-full h-[300px] sm:h-[450px] lg:h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-black/5">
//           <img
//             src="" // Put your image path here
//             alt="A Team of Visionaries, Engineers, and Leaders"
//             className="w-full h-full object-cover"
//             loading="lazy"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

//
//
//
"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Btn from "@/components/ui/Btn";

const GREY_WORDS = [
  "A",
  "Team",
  "of",
  "Visionaries,",
  "Engineers,",
  "and",
  "Leaders",
  "Building",
  "Tomorrow's",
  "Infrastructure",
];

const BOLD_WORDS = [
  "A",
  "Team",
  "of",
  "Visionaries,",
  "Engineers,",
  "and",
  "Leaders <br/>",
  "Building",
  "Tomorrow's",
  "Infrastructure",
];

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const greyRef = useRef<HTMLSpanElement>(null);

  // Scroll color fill effect for title
  useEffect(() => {
    const onScroll = () => {
      const el = greyRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const p = Math.max(
        0,
        Math.min(1, (vh * 1.02 - r.top) / (r.height + vh * 0.5)),
      );
      const spans = el.querySelectorAll<HTMLSpanElement>("span[data-w]");
      const fill = p * spans.length;
      spans.forEach((s, i) => {
        s.style.color = i < fill ? "#212121" : "#64635D";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f8f8f8] text-[#212121] overflow-hidden"
    >
      {/* Global .fix Container with exact responsive padding (50px mobile, 80px desktop) */}
      <div className="fix relative z-10 py-[50px] lg:py-[80px]">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 lg:mb-12">
          {/* Animated Title */}
          <div className="">
            <h2 className="m-0 font-[family-name:var(--font-sora),sans-serif] leading-[1.2] lg:leading-[1.18] tracking-[-0.012em] text-[20px] sm:text-[30px] lg:text-[40px]">
              <span
                ref={greyRef}
                className="block  lg:max-w-[900px] text-[#64635D]"
              >
                {GREY_WORDS.map((word, i) => {
                  return (
                    <React.Fragment key={i}>
                      <span
                        data-w="1"
                        className="text-[#64635D] [transition:color_.5s_ease] tracking-[-0.8px] leading-nomal font-semibold"
                      >
                        {word}{" "}
                      </span>
                      {word === "Leaders" && <br className="hidden md:block" />}
                    </React.Fragment>
                  );
                })}
              </span>
            </h2>
          </div>

          {/* View All Button (Using original Btn component) */}
          <div className="flex-shrink-0">
            <Btn
              label="View All"
              href="/our-team"
              textColor="#515F44"
              hoverTextColor="text-white"
              borderColor="border-[#515F44]"
              bgColor="bg-transparent"
              hoverBgColor="bg-[#515F44]"
              arrowColor="stroke-[#6D6D6D]"
              hoverArrowColor="stroke-white"
            />
          </div>
        </div>

        {/* Team Image Container */}
        <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-black/5">
          <Image
            src="/about/Teamsection/teambg.png"
            alt="A Team of Visionaries, Engineers, and Leaders"
            fill
            sizes="(min-width: 1024px) 90vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        {/*  */}
      </div>
    </section>
  );
}
//
