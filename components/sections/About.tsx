// "use client";

// import Image from "next/image";
// import { useEffect, useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import AboutAccordion from "./AboutAccordion";
// import Btn from "@/components/ui/Btn";

// const GREY_WORDS =
//   "KSH INFRA delivers expertise across every stage of the industrial infrastructure lifecycle, helping shape India’s next generation of Grade A industrial assets.".split(
//     " ",
//   );

// // The exact words we want to boldify
// const BOLD_WORDS = [
//   "KSH",
//   "INFRA",
//   "delivers",
//   "expertise",
//   "across",
//   "every",
//   "stage",
// ];

// export default function About() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const greyRef = useRef<HTMLSpanElement>(null);

//   // Hook into the scroll progress of this container section
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   // Create subtle parallax offsets based on scroll progress
//   const yLeftImage = useTransform(scrollYProgress, [0, 1], [100, -80]);
//   const yRightImage = useTransform(scrollYProgress, [0, 1], [-100, 80]);

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
//         // Keeps the text color changing naturally on scroll
//         s.style.color = i < fill ? "var(--color-section-title)" : "#C3C3BC";
//       });
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     requestAnimationFrame(onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-full bg-[#] font-[var(--font-inter),sans-serif] overflow-hidden"
//     >
//       <div className=" pt-20">
//         {/* ── INTRODUCTION ── */}
//         <div className="relative fix pb-10">
//           {/* decorative circles */}
//           <div className="absolute pointer-events-none rounded-full border border-[rgba(15,29,58,0.06)] -top-[300px] -right-[40px] w-[520px] h-[520px]" />
//           <div className="absolute pointer-events-none rounded-full border border-[rgba(15,29,58,0.05)] -top-[100px] right-[300px] w-[360px] h-[360px]" />

//           {/* eyebrow */}
//           <div className="flex items-center gap-[10px] mb-[clamp(16px,2vw,26px)]">
//             <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-semibold text-[clamp(12px,0.95vw,13px)] tracking-[0.04em]">
//               //
//             </span>
//             <h5 className="text-[#59624D] leading-normal font-[family-name:var(--font-sora)] text-[12px] uppercase tracking-[-0.24px]">
//               An Integrated Industrial Infrastructure Platform
//             </h5>
//           </div>

//           <h2 className="m-0 font-[family-name:var(--font-sora),sans-serif] leading-[1.18] tracking-[-0.012em] lg:text-[38px] xl:text-[48px] 2xl:text-[48px]">
//             <span ref={greyRef} className="block text-[#BDAEA6]">
//               {GREY_WORDS.map((word, i) => {
//                 // Clean the word string of punctuation (like commas) just for matching
//                 const cleanWord = word.replace(/[^a-zA-Z]/g, "");
//                 // Check if this word falls within the first 7 target words
//                 const isBold = BOLD_WORDS.includes(cleanWord) && i < 7;

//                 return (
//                   <span
//                     key={i}
//                     data-w="1"
//                     className={`text-[#BDAEA6] [transition:color_.5s_ease] ${
//                       isBold ? "font-semibold" : "font-normal"
//                     }`}
//                   >
//                     {word}{" "}
//                   </span>
//                 );
//               })}
//             </span>
//           </h2>
//         </div>

//         {/* ── CONTENT ROW (desktop) ── */}
//         <div className="flex items-start justify-between relative w-full plcont">
//           {/* Left col: Small overlapping decorative image block */}
//           <div className="flex flex-col pt-[63px] shrink-0 relative z-10 min-h-full justify-between">
//             <motion.div
//               style={{ y: yLeftImage }}
//               className="w-full overflow-hidden rounded-[20px]"
//             >
//               <img
//                 src="/homeasset/manimg.jpg"
//                 alt="KSH INFRA logistics professional"
//                 className="w-full object-cover"
//               />
//             </motion.div>
//             <div className="lg:pt-[50px] xl:pt-[100px] 2xl:pt-[150px] 2xl:pb-[75px] xl:pb-[50px] lg:pb-[25px]">
//               <div className="inline-flex gap-[9px] mb-[clamp(10px,1.3vw,16px)]">
//                 <span className="text-[#59624D] font-[family-name:var(--font-sora),sans-serif] font-semibold text-[13px] tracking-[0.04em]">
//                   //
//                 </span>
//                 <h5 className="text-[#59624D] font-[family-name:var(--font-sora)] text-[12px] tracking-[-0.24px]">
//                   ABOUT US
//                 </h5>
//               </div>
//               <h2 className="section-title m-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(28px,3vw,40px)] tracking-[-0.016em]">
//                 Who are we?
//               </h2>
//             </div>
//           </div>

//           {/* Right col: Massive prominent image spanning off-screen right edge */}
//           <motion.div
//             initial={{ y: 0 }}
//             className="hidden lg:flex absolute right-0 bottom-0 max-w-[60%] 2xl:max-w-[55%] z-0 justify-end w-full"
//           >
//             <motion.div className="hidden lg:flex relative z-0 justify-end w-full">
//               <img
//                 src="/homeasset/about.webp"
//                 alt="KSH INFRA logistics professional"
//                 className="w-auto h-full object-contain"
//               />
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* ── ACCORDION ── */}
//       <AboutAccordion />
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AboutAccordion from "./AboutAccordion";
import Btn from "@/components/ui/Btn";

const GREY_WORDS =
  "KSH INFRA delivers expertise across every stage of the Industrial Infrastructure lifecycle, helping shape India’s next generation of Grade A Industrial assets.".split(
    " ",
  );

const BOLD_WORDS = [
  "KSH",
  "INFRA",
  "delivers",
  "expertise",
  "across",
  "every",
  "stage",
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const greyRef = useRef<HTMLSpanElement>(null);

  // Hook into the scroll progress of this container section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create subtle parallax offsets based on scroll progress (Desktop Only)
  const yLeftImage = useTransform(scrollYProgress, [0, 1], [100, -80]);

  useEffect(() => {
    const el = greyRef.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLSpanElement>("span[data-w]");

    let ticking = false;
    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const p = Math.max(
        0,
        Math.min(1, (vh * 1.02 - r.top) / (r.height + vh * 0.5)),
      );
      const fill = p * spans.length;
      spans.forEach((s, i) => {
        s.style.color = i < fill ? "var(--color-section-title)" : "#C3C3BC";
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent font-[var(--font-inter),sans-serif] overflow-hidden"
    >
      <div className="pt-10 lg:pt-20 ">
        {/* ── INTRODUCTION ── */}
        <div className="relative fix pb-6 lg:pb-10 ">
          {/* decorative circles - Hidden on Mobile */}
          <div className="hidden lg:block absolute pointer-events-none rounded-full border border-[rgba(15,29,58,0.06)] -top-[300px] -right-[40px] w-[520px] h-[520px]" />
          <div className="hidden lg:block absolute pointer-events-none rounded-full border border-[rgba(15,29,58,0.05)] -top-[100px] right-[300px] w-[360px] h-[360px]" />

          {/* eyebrow */}
          {/* <div className="flex items-center gap-[10px] mb-[clamp(16px,2vw,26px)]">
            <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-semibold text-[clamp(12px,0.95vw,13px)] tracking-[0.04em]">
              //
            </span>
            <h5 className="text-[#59624D] leading-normal font-[family-name:var(--font-sora)] text-[11px] sm:text-[12px] uppercase tracking-[-0.24px]">
              An Integrated Industrial Infrastructure Platform
            </h5>
          </div> */}

          <h2 className="m-0 font-[family-name:var(--font-sora),sans-serif] leading-[1.2] lg:leading-[1.18] tracking-[-0.012em text-[20px] sm:text-[30px] lg:text-[38px] xl:text-[48px] 2xl:text-[48px]">
            <span ref={greyRef} className="block text-[#BDAEA6]">
              {GREY_WORDS.map((word, i) => {
                const cleanWord = word.replace(/[^a-zA-Z]/g, "");
                const isBold = BOLD_WORDS.includes(cleanWord) && i < 7;

                return (
                  <span
                    key={i}
                    data-w="1"
                    className={`text-[#BDAEA6] [transition:color_.5s_ease] ${
                      isBold ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </span>
          </h2>
        </div>

        {/* ── CONTENT ROW ── */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-start justify-between relative w-full plcont max-w-[92%] pl-5 lg:pl-0 lg:max-w-none lg:mx-auto lg:mx-0 gap-8 lg:gap-0">
          {/* Left col: Small image block & text section */}
          <div className="flex flex-col pt-4 lg:pt-[63px] shrink-0 relative lg:z-10 w-full lg:w-auto justify-between">
            {/* Parallax style ignored completely on mobile using !transform-none layout utilities */}
            <motion.div
              style={{ y: yLeftImage }}
              className="w-full max-w-sm lg:max-w-none mx-auto lg:mx-0 overflow-hidden rounded-[20px] !transform-none lg:!transform-stretch"
            >
              <img
                src="/homeasset/manimg.jpg"
                alt="KSH INFRA Logistics professional"
                className="w-full object-cover aspect-[4/3] lg:aspect-auto"
              />
            </motion.div>
            <div className="pt-6 lg:pt-[50px] xl:pt-[100px] 2xl:pt-[150px] 2xl:pb-[75px] xl:pb-[50px] lg:pb-[25px] text-center lg:text-left">
              {/* <div className="inline-flex gap-[9px] mb-[clamp(10px,1.3vw,16px)]">
                <span className="text-[#59624D] font-[family-name:var(--font-sora),sans-serif] font-semibold text-[13px] tracking-[0.04em]">
                  //
                </span>
                <h5 className="text-[#59624D] font-[family-name:var(--font-sora)] text-[12px] tracking-[-0.24px]">
                  ABOUT US
                </h5>
              </div> */}
              <h2 className="section-title m-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[26px] sm:text-[32px] lg:text-[clamp(28px,3vw,40px)] tracking-[-0.016em]">
                Who are we?
              </h2>
            </div>
          </div>

          {/* Right col: Desktop Background Image Asset (Hidden entirely on mobile layout flow) */}
          <div className="hidden lg:flex absolute right-0 bottom-0 max-w-[60%] 2xl:max-w-[55%] z-0 justify-end w-full">
            <div className="relative z-0 justify-end w-full">
              <img
                src="/homeasset/about.webp"
                alt="KSH INFRA Logistics professional"
                className="w-auto h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── ACCORDION ── */}
      <AboutAccordion />
    </section>
  );
}
