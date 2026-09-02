"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRevealOnView } from "@/components/ui/useRevealOnView";

const HEADING_WORDS = [
  "KSH",
  "INFRA",
  "Parks:",
  "New",
  "Benchmarks",
  "of",
  "Logistics",
  "Efficiency",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function OverviewAbout() {
  const containerRef = useRef<HTMLElement>(null);
  const greyRef = useRef<HTMLSpanElement>(null);
  const fixRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const leftImgReveal = useRevealOnView<HTMLDivElement>();
  const rightColReveal = useRevealOnView<HTMLDivElement>();
  const mobileImgReveal = useRevealOnView<HTMLDivElement>();

  // Scroll color fill effect for title text
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
        s.style.color = i < fill ? "#212121" : "#BDAEA6";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Left image bleed to the true viewport edge — measured directly off
  // .fix's actual rendered position instead of a CSS calc() re-derivation
  // (Tailwind's arbitrary-value calc() and a plain CSS var calc() both
  // proved unreliable inside this flex layout at wide viewports, so this
  // reads the real gap and applies it as plain pixels instead).
  useEffect(() => {
    const update = () => {
      const fixEl = fixRef.current;
      const wrap = imgWrapRef.current;
      if (!fixEl || !wrap) return;
      const gap = fixEl.getBoundingClientRect().left;
      wrap.style.marginLeft = `-${gap}px`;
      wrap.style.width = `calc(100% + ${gap}px)`;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-white overflow-hidden font-sora"
    >
      {/* Background SVG Curve Pattern */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 hidden lg:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="624"
          height="543"
          viewBox="0 0 624 543"
          fill="none"
          className="absolute left-[20%] top-[-10%] opacity-80"
        >
          <path
            opacity="0.7"
            d="M622.79 -353.941V347.598C622.79 347.598 637.164 542 428.316 542C219.468 542 233.842 347.598 233.842 347.598M233.631 347.598V-173.907C233.631 -173.907 248.005 -368.31 39.1573 -368.31C-169.691 -368.31 -155.317 -173.907 -155.317 -173.907L-154.683 345.907C-154.683 345.907 -140.309 540.31 -349.157 540.31C-558.005 540.31 -543.842 345.907 -543.842 345.907V-175.598C-543.842 -175.598 -529.468 -370 -738.316 -370C-947.164 -370 -932.79 -175.598 -932.79 -175.598"
            stroke="url(#paint0_linear_1124_398)"
            strokeOpacity="0.2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1124_398"
              x1="-155"
              y1="-370"
              x2="-155"
              y2="542"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#24314E" stopOpacity="0.2" />
              <stop offset="1" stopColor="#24314E" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Centre vertical divider line */}
      {/* <div className="absolute inset-y-0 left-1/2 w-px bg-gray-100 -translate-x-1/2 hidden lg:block z-0" /> */}

      {/* Global .fix container handling layout & spacing */}
      <div
        ref={fixRef}
        className="fix relative z-0! pt-[40px] sm:pt-[50px] lg:pt-[80px] pb-0 min-[1280px]:max-[1535px]:pb-[110px]"
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left Column: Eyebrow + Title + Image (Desktop only) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between self-stretch">
            <div>
              {/* Eyebrow: Scaled down gracefully for 360px mobile viewports */}
              {/* <motion.div
                variants={fadeUp}
                custom={0}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="flex items-center gap-2 text-[10px] sm:text-[12px] lg:text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B7280] mb-4"
              >
                <span className="text-[#9CA3AF]">//</span>
                <span>AN INTEGRATED INDUSTRIAL INFRASTRUCTURE PLATFORM</span>
              </motion.div> */}

              {/* Title Container: Optimized for 360px (mobile), 1280px (xl), and original 2xl desktop */}
              <h2 className="m-0 max-w-[439px] font-sora font-semibold text-[22px] xs:text-[26px] sm:text-[32px] xl:text-[34px] 2xl:text-[40px] leading-[1.15] tracking-[-0.8px]">
                <span ref={greyRef} className="block text-[#BDAEA6]">
                  {HEADING_WORDS.map((word, i) => (
                    <React.Fragment key={i}>
                      <span
                        data-w="1"
                        className="text-[#BDAEA6] [transition:color_.5s_ease] font-semibold inline-block"
                      >
                        {word}
                      </span>
                      {i === 2 ? <br /> : " "}
                    </React.Fragment>
                  ))}
                </span>
              </h2>
            </div>

            {/* Left Image Wrapper: Desktop Only — bleeds to the true viewport
                edge; marginLeft/width are set imperatively in the effect
                above from .fix's real measured position. Kept on a plain
                div, not the motion.div itself: Framer Motion re-applies its
                own inline style on the whileInView transition and was
                racily wiping marginLeft/width when they lived on the same
                node it animates. */}
            <div
              ref={imgWrapRef}
              className="hidden md:block overflow-hidden"
            >
              <motion.div
                ref={leftImgReveal.ref}
                variants={fadeUp}
                custom={1}
                initial="hidden"
                animate={leftImgReveal.animate}
              >
                <img
                  src="/overview/aboutleft.png"
                  alt="KSH INFRA Building"
                  className="w-full h-auto block object-cover object-left-bottom -mt-3"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Paragraph Content */}
          <motion.div
            ref={rightColReveal.ref}
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={rightColReveal.animate}
            className="w-full lg:w-1/2 flex flex-col gap-6 font-inter self-stretch sm:pt-[0px] lg:pt-[30px] 2x:pt-[50px] min-[1280px]:max-[1535px]:pt-[50px]"
          >
            {/* Lead Paragraph: Fluid scaling across 360px, 1280px (xl), and full desktop (2xl) */}
            <p className="m-0 text-[16px] sm:text-[20px] xl:text-[21px] 2xl:text-[24px] font-medium text-[#212121] leading-[140%] self-stretch">
              We're establishing new benchmarks for sustainable Industrial
              spaces and Logistics solutions. With major ready-to-move
              Industrial parks in Chakan & Talegaon (Pune), Hosur (Bengaluru),
              Sriperumbudur (Chennai), we're strengthening the strategic
              Industrial corridor as a manufacturing and Logistics hub.
            </p>

            {/* Body Paragraph 1 */}
            <p className="m-0 text-[14px] sm:text-[17px] xl:text-[18px] 2xl:text-[20px] font-normal leading-[140%] text-[#4A4A4A] self-stretch pr-0 2xl:pr-5">
              Every Industrial park we build focuses on three fundamentals:
              productivity, efficiency, and ergonomics. We construct to the
              highest Industrial standards with full ESG compliance.
            </p>

            {/* Body Paragraph 2 */}
            <p className="m-0 text-[14px] sm:text-[17px] xl:text-[18px] 2xl:text-[20px] font-normal leading-[140%] text-[#4A4A4A] self-stretch pr-0 2xl:pr-5">
              Our team stands firmly committed to building a reimagined green
              Industrial future. When you choose our facilities, you're getting
              spaces designed for both business success and environmental
              responsibility.
            </p>
          </motion.div>
        </div>

        {/* Mobile Image Wrapper: Placed after paragraphs column */}
        <motion.div
          ref={mobileImgReveal.ref}
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate={mobileImgReveal.animate}
          className="block md:hidden -ml-[24px] sm:-ml-[32px] w-[calc(100%+24px)] sm:w-[calc(100%+32px)] overflow-hidden mt-6"
        >
          <img
            src="/overview/aboutleft.png"
            alt="KSH INFRA Building"
            className="w-full h-auto block object-cover object-left-bottom -mt-3"
          />
        </motion.div>
      </div>
    </section>
  );
}

// "use client";

// import React, { useEffect, useRef } from "react";
// import { motion } from "framer-motion";

// const HEADING_WORDS = [
//   "KSH",
//   "INFRA",
//   "Parks:",
//   "New",
//   "Benchmarks",
//   "of",
//   "Logistics",
//   "Efficiency",
// ];

// const fadeUp = {
//   hidden: { opacity: 0, y: 28 },
//   show: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
//   }),
// };

// export default function OverviewAbout() {
//   const containerRef = useRef<HTMLElement>(null);
//   const greyRef = useRef<HTMLSpanElement>(null);

//   // Scroll color fill effect for title text
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
//         s.style.color = i < fill ? "#212121" : "#BDAEA6";
//       });
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     requestAnimationFrame(onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       id="about"
//       className="relative w-full bg-white overflow-hidden font-sora"
//     >
//       {/* Background SVG Curve Pattern */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 hidden lg:block">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="624"
//           height="543"
//           viewBox="0 0 624 543"
//           fill="none"
//           className="absolute left-[20%] top-[-10%] opacity-80"
//         >
//           <path
//             opacity="0.7"
//             d="M622.79 -353.941V347.598C622.79 347.598 637.164 542 428.316 542C219.468 542 233.842 347.598 233.842 347.598M233.631 347.598V-173.907C233.631 -173.907 248.005 -368.31 39.1573 -368.31C-169.691 -368.31 -155.317 -173.907 -155.317 -173.907L-154.683 345.907C-154.683 345.907 -140.309 540.31 -349.157 540.31C-558.005 540.31 -543.842 345.907 -543.842 345.907V-175.598C-543.842 -175.598 -529.468 -370 -738.316 -370C-947.164 -370 -932.79 -175.598 -932.79 -175.598"
//             stroke="url(#paint0_linear_1124_398)"
//             strokeOpacity="0.2"
//           />
//           <defs>
//             <linearGradient
//               id="paint0_linear_1124_398"
//               x1="-155"
//               y1="-370"
//               x2="-155"
//               y2="542"
//               gradientUnits="userSpaceOnUse"
//             >
//               <stop stopColor="#24314E" stopOpacity="0.2" />
//               <stop offset="1" stopColor="#24314E" stopOpacity="0.7" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </div>

//       {/* Centre vertical divider line */}
//       <div className="absolute inset-y-0 left-1/2 w-px bg-gray-100 -translate-x-1/2 hidden lg:block z-0" />

//       {/* Global .fix container handling layout & spacing */}
//       <div className="fix relative z-0! pt-[40px] sm:pt-[50px] lg:pt-[80px] pb-0 min-[1280px]:max-[1535px]:pb-[110px]">
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
//           {/* Left Column: Eyebrow + Title + Image */}
//           <div className="w-full lg:w-1/2 flex flex-col justify-between self-stretch">
//             <div>
//               {/* Eyebrow: Scaled down gracefully for 360px mobile viewports */}
//               <motion.div
//                 variants={fadeUp}
//                 custom={0}
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true, margin: "-80px" }}
//                 className="flex items-center gap-2 text-[10px] sm:text-[12px] lg:text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B7280] mb-4"
//               >
//                 <span className="text-[#9CA3AF]">//</span>
//                 <span>AN INTEGRATED INDUSTRIAL INFRASTRUCTURE PLATFORM</span>
//               </motion.div>

//               {/* Title Container: Optimized for 360px (mobile), 1280px (xl), and original 2xl desktop */}
//               <h2 className="m-0 max-w-[439px] font-sora font-semibold text-[22px] xs:text-[26px] sm:text-[32px] xl:text-[34px] 2xl:text-[40px] leading-[1.15] tracking-[-0.8px]">
//                 <span ref={greyRef} className="block text-[#BDAEA6]">
//                   {HEADING_WORDS.map((word, i) => (
//                     <React.Fragment key={i}>
//                       <span
//                         data-w="1"
//                         className="text-[#BDAEA6] [transition:color_.5s_ease] font-semibold inline-block"
//                       >
//                         {word}
//                       </span>
//                       {i === 2 ? <br /> : " "}
//                     </React.Fragment>
//                   ))}
//                 </span>
//               </h2>
//             </div>

//             {/* Left Image Wrapper */}
//             {/* <motion.div
//               variants={fadeUp}
//               custom={1}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, margin: "-80px" }}
//               className="-ml-[5vw] md:-ml-28! 2xl:xl:-ml-[calc((100vw-var(--container-max))/2)] xl:-ml-[calc((100vw-var(--container-max))/2)] w-[calc(100%+5vw)] xl:w-[calc(100%+(100vw-var(--container-max))/2)] hidden md:block overflow-hidden"
//             >
//               <img
//                 src="/overview/aboutleft.png"
//                 alt="KSH INFRA Building"
//                 className="w-full h-auto block object-cover object-left-bottom -mt-3"
//               />
//             </motion.div> */}
//            <motion.div
//   variants={fadeUp}
//   custom={1}
//   initial="hidden"
//   whileInView="show"
//   viewport={{ once: true, margin: "-80px" }}
//   className="block -ml-[24px] sm:-ml-[32px] w-[calc(100%+24px)] sm:w-[calc(100%+32px)] md:-ml-28! md:w-auto xl:-ml-[calc((100vw-var(--container-max))/2)] xl:w-[calc(100%+(100vw-var(--container-max))/2)] overflow-hidden"
// >
//   <img
//     src="/overview/aboutleft.png"
//     alt="KSH INFRA Building"
//     className="w-full h-auto block object-cover object-left-bottom -mt-3"
//   />
// </motion.div>
//           </div>

//           {/* Right Column: Paragraph Content */}
//           <motion.div
//             variants={fadeUp}
//             custom={2}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: "-80px" }}
//             className="w-full lg:w-1/2 flex flex-col gap-6 font-inter self-stretch pt-[30px] 2x:pt-[50px] min-[1280px]:max-[1535px]:pt-[50px]"
//           >
//             {/* Lead Paragraph: Fluid scaling across 360px, 1280px (xl), and full desktop (2xl) */}
//             <p className="m-0 text-[16px] sm:text-[20px] xl:text-[21px] 2xl:text-[24px] font-medium text-[#212121] leading-[140%] self-stretch">
//               We're establishing new benchmarks for sustainable industrial
//               spaces and logistics solutions. With major ready-to-move
//               industrial parks in Chakan & Talegaon (Pune), Hosur (Bengaluru),
//               Sriperumbudur (Chennai), we're strengthening the strategic
//               industrial corridor as a manufacturing and logistics hub.
//             </p>

//             {/* Body Paragraph 1 */}
//             <p className="m-0 text-[14px] sm:text-[17px] xl:text-[18px] 2xl:text-[20px] font-normal leading-[140%] text-[#4A4A4A] self-stretch pr-0 2xl:pr-5">
//               Every industrial park we build focuses on three fundamentals:
//               productivity, efficiency, and ergonomics. We construct to the
//               highest industrial standards with full ESG compliance.
//             </p>

//             {/* Body Paragraph 2 */}
//             <p className="m-0 text-[14px] sm:text-[17px] xl:text-[18px] 2xl:text-[20px] font-normal leading-[140%] text-[#4A4A4A] self-stretch pr-0 2xl:pr-5">
//               Our team stands firmly committed to building a reimagined green
//               industrial future. When you choose our facilities, you're getting
//               spaces designed for both business success and environmental
//               responsibility.
//             </p>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
