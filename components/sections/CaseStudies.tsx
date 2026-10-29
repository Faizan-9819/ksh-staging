// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoMdPlay } from "react-icons/io";
// import useEmblaCarousel from "embla-carousel-react";
// import NavArrow from "@/components/ui/NavArrow";
// import Btn from "../ui/Btn";
// import { CASE_STUDIES } from "@/components/sections/casestudies/data";
//
// const DEFS = [
//   {
//     brand: "Jabil",
//     slug: "jabil",
//     img: CASE_STUDIES.jabil.heroImage,
//     logo: "/casestud/jab.svg",
//     heading: "Done and Delivered. On Time — Jabil",
//     p: "Jabil is an American electronics manufacturing multinational with more than 140,000 employees in over 25 countries. They produce over 300 of the biggest brands in the world in every market from healthcare, clean energy, automotive, defence, aerospace, telecommunications and to packaging and smartphones.",
//   },
//   {
//     brand: "Hindalco",
//     slug: "hindalco",
//     img: CASE_STUDIES.hindalco.heroImage,
//     logo: "/casestud/hind.svg",
//     heading:
//       "Large-Scale, Built-to-Spec Facility — Delivered to Hindalco in Eight Months",
//     p: "Hindalco, a flagship company of the Aditya Birla Group, was setting up a new facility for a key business vertical with a fixed go-live deadline of eight months. This marked Hindalco's first-ever leased industrial facility, with all previous plants being company-owned.",
//   },

//   {
//     brand: "Kawasaki",
//     slug: "kawasaki",
//     img: CASE_STUDIES.kawasaki.heroImage,
//     logo: "/casestud/kawasakilogo.svg",
//     heading:
//       "Manufacturing, Assembly, and R&D — Delivered Kawasaki's First Indian Integrated Unit",
//     p: "Kawasaki is a global motorcycle brand known for high-performance bikes, commute vehicles, motors, energy and industrial equipment. Kawasaki Motors sought to establish its first Indian manufacturing plant at Chakan, Pune, requiring 250,000 sq. ft. dedicated to manufacturing, assembly, warehousing, and R&D.",
//   },
//   {
//     brand: "Barnes",
//     slug: "barnes",
//     img: CASE_STUDIES.barnes.heroImage,
//     logo: "/casestud/hub.svg",
//     heading:
//       "Crane-Ready, High-Capacity Manufacturing Facility — Delivered to Barnes",
//     p: "Barnes, a global moulding solutions manufacturer, partnered with KSH INFRA to develop a built-to-suit manufacturing facility for their heavy-duty operations. This greenfield project carried a fixed 12-month timeline. While the initial requirement was for 80,000 sq. ft., during the site visit Barnes selected Building B4, factoring in future expansion.",
//   },
// ];

// const N = DEFS.length;

// export default function CaseStudies() {
//   const [active, setActive] = useState(0);

//   // Desktop Navigation
//   const go = (i: number) => setActive(((i % N) + N) % N);

//   // Mobile Embla Carousel Setup
//   const [emblaRef, emblaApi] = useEmblaCarousel({
//     loop: false,
//     align: "center",
//     skipSnaps: false,
//   });
//   const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
//   const scrollNext = () => emblaApi && emblaApi.scrollNext();
//   return (
//     <section
//       className="relative w-full overflow-hidden"
//       style={{
//         background: "linear-gradient(185deg, #F8F8F8 6.45%, #FBF2E8 95.99%)",
//         backdropFilter: "blur(3px)",
//       }}
//     >
//       <div className="fix relative py-20 max-sm:py-12">
//         {/* Section Header */}
//         <div className="flex justify-between items-start gap-10 flex-wrap mb-[clamp(28px,3vw,42px)]">
//           <div>
//             <div className="flex items-center gap-[9px] mb-[clamp(12px,1.4vw,18px)]">
//               <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-semibold text-[13px]">
//                 {"//"}
//               </span>
//               <h5 className="text-[#59624D] font-normal text-[12px] uppercase tracking-[-0.24px]">
//                 CASE STUDIES
//               </h5>
//             </div>
//             <h2 className="section-title m-0 font-semibold text-[clamp(32px,3.9vw,48px)] leading-[1.05] tracking-[-0.015em]">
//               Built Around Operational Needs{" "}
//             </h2>
//           </div>
//         </div>

//         {/* ========================================== */}
//         {/* DESKTOP VIEW (Unchanged)                   */}
//         {/* ========================================== */}
//         <div className="hidden lg:flex gap-[clamp(12px,1.4vw,20px)] items-stretch h-[clamp(380px,30.5vw,440px)] w-full">
//           {DEFS.map((cd, i) => {
//             const on = i === active;
//             return (
//               <div
//                 key={cd.brand}
//                 onMouseEnter={() => setActive(i)}
//                 className={`relative h-full transition-all duration-500 ease-[0.4,0,0.2,1] rounded-[20px] overflow-hidden cursor-pointer shadow-[0_24px_55px_-38px_rgba(15,29,58,0.5)] ${
//                   on ? "w-[65%] min-w-[50%]" : "w-[10%] min-w-[7%]"
//                 }`}
//               >
//                 {/* Background Image */}
//                 <img
//                   src={cd.img}
//                   alt={cd.brand}
//                   className="absolute inset-0 w-full h-full brightness-50 object-cover"
//                 />

//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,35,0.78)_0%,rgba(12,20,35,0.28)_34%,rgba(12,20,35,0.18)_55%,rgba(10,16,28,0.82)_100%)]" />

//                 {/* Inner Padding Container */}
//                 <div className="absolute inset-0 p-[clamp(24px,2.6vw,38px)]">
//                   {/* Logo Area */}
//                   <div
//                     className={`absolute transition-all duration-500 ease-[0.4,0,0.2,1] ${
//                       on
//                         ? "top-[clamp(24px,2.6vw,38px)] left-[clamp(24px,2.6vw,38px)] translate-x-0 translate-y-0"
//                         : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//                     }`}
//                   >
//                     <img
//                       src={cd.logo}
//                       alt={cd.brand}
//                       className="w-auto h-[clamp(24px,3.5vw,32px)] object-contain"
//                     />
//                   </div>

//                   {/* Bottom Left Content Area split using Flexbox */}
//                   <AnimatePresence mode="wait">
//                     {on && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 25 }}
//                         animate={{
//                           opacity: 1,
//                           y: 0,
//                           transition: {
//                             duration: 0.4,
//                             delay: 0.25,
//                             ease: [0.4, 0, 0.2, 1],
//                           },
//                         }}
//                         exit={{
//                           opacity: 0,
//                           y: 15,
//                           transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
//                         }}
//                         className="absolute bottom-[35px] left-[clamp(24px,2.6vw,38px)] right-[clamp(24px,2.6vw,38px)] h-[72%] flex flex-col justify-between max-w-[630px]"
//                       >
//                         {/* Text stays at the top of this container */}
//                         <div>
//                           <h3 className="text-[clamp(20px,2vw,24px)] font-semibold mt-5 leading-[1.22] text-white tracking-[-0.01em]">
//                             {cd.heading}
//                           </h3>
//                           {cd.p && (
//                             <p className="font-inter text-[16px] leading-[1.4] mt-2 font-normal text-white tracking-normal">
//                               {cd.p}
//                             </p>
//                           )}
//                         </div>

//                         {/* Buttons stay anchored to the bottom of this container */}
//                         <div className="flex items-center justify-start gap-4">
//                           {/* <div
//                             onClick={openModal}
//                             className="w-50 h-12 rounded-[10px] border border-white/30 bg-white/10 backdrop-blur-sm hover:backdrop-blur-3xl hover:bg-transparent transition-[background-color,backdrop-filter] duration-500 ease-out transform-gpu will-change-[backdrop-filter] flex items-center justify-center text-white shrink-0 cursor-pointer"
//                           >
//                             <span className="pr-3 text-[14px] font-[family-name:var(--font-sora),sans-serif]">
//                               Watch the Video
//                             </span>
//                             <IoMdPlay size={22} fill="white" />
//                           </div> */}
//                           <Btn
//                             href={`/case-studies/${cd.slug}`}
//                             className="overflow-hidden cursor-pointer border-white!"
//                             arrowColor="stroke-white"
//                             hoverArrowColor="stroke-black"
//                             hoverTextColor="text-black"
//                             hoverBgColor="bg-white"
//                             textColor="text-white!"
//                             label="Read Case Study"
//                           />
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="hidden lg:flex gap-1 mt-[clamp(20px,2vw,30px)]">
//           <NavArrow
//             direction="prev"
//             tone="dark"
//             onClick={() => go(active - 1)}
//           />
//           <NavArrow
//             direction="next"
//             tone="dark"
//             onClick={() => go(active + 1)}
//           />
//         </div>

//         {/* ========================================== */}
//         {/* MOBILE VIEW (Clean Single-Card Embla)      */}
//         {/* ========================================== */}
//         <div className="block lg:hidden w-full">
//           <div className="overflow-hidden w-full" ref={emblaRef}>
//             <div className="flex">
//               {DEFS.map((cd) => (
//                 <div key={cd.brand} className="flex-[0_0_100%] min-w-0 px-1">
//                   <div className="relative h-[480px] w-full rounded-[20px] overflow-hidden shadow-[0_16px_36px_-20px_rgba(15,29,58,0.4)]">
//                     {/* Background Image */}
//                     <img
//                       src={cd.img}
//                       alt={cd.brand}
//                       className="absolute inset-0 w-full h-full object-cover"
//                     />

//                     {/* Gradient Overlay Optimized for Content Readability */}
//                     <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,35,0.65)_0%,rgba(12,20,35,0.2)_30%,rgba(10,16,28,0.85)_100%)]" />

//                     {/* Content Container */}
//                     <div className="absolute inset-0 p-6 flex flex-col justify-between">
//                       {/* Brand Logo Top Left */}
//                       <div>
//                         <img
//                           src={cd.logo}
//                           alt={cd.brand}
//                           className="w-auto h-6 object-contain"
//                         />
//                       </div>

//                       {/* Bottom Copy and CTA Controls */}
//                       <div className="flex flex-col gap-5">
//                         <div>
//                           <h3 className="text-[20px] font-semibold leading-[1.25] text-white tracking-[-0.01em]">
//                             {cd.heading}
//                           </h3>
//                           {cd.p && (
//                             <p className="font-inter text-[14px] leading-[1.4] mt-2 font-normal text-white/90">
//                               {cd.p}
//                             </p>
//                           )}
//                         </div>

//                         {/* Action Buttons stacked in individual rows for Mobile */}
//                         <div className="flex flex-col gap-3 w-full">
//                           {/* <div
//                             onClick={openModal}
//                             className="lg:h-12 h-9 w-full rounded-[10px] border border-white/30 bg-white/10 backdrop-blur-sm active:bg-white/20 transition-all duration-300 flex items-center justify-center text-white cursor-pointer"
//                           >
//                             <span className="lg:pr-3 text-[14px] lg:text-[14px] font-[family-name:var(--font-sora),sans-serif]">
//                               Watch the Video
//                             </span>
//                             <IoMdPlay size={18} fill="white" />
//                           </div> */}
//                           {/* <Btn
//                             onClick={openModal}
//                             className="overflow-hidden cursor-pointer border-white! w-full justify-center [&>span]:!text-[11px] [&>span]:lg:!text-[9px]"
//                             arrowColor="stroke-white"
//                             hoverArrowColor="stroke-black"
//                             hoverTextColor="text-black"
//                             hoverBgColor="bg-white"
//                             textSize="text-[10px] lg:text-[14px]"
//                             textColor="text-white!"
//                             label="Read Case Study"
//                           /> */}
//                           <Btn
//                             href={`/case-studies/${cd.slug}`}
//                             className="overflow-hidden cursor-pointer border-white! w-full justify-center"
//                             arrowColor="stroke-white"
//                             hoverArrowColor="stroke-black"
//                             hoverTextColor="text-black"
//                             hoverBgColor="bg-white"
//                             textSize="text-[14px]"
//                             textColor="text-white!"
//                             label="Read Case Study"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Controls for Mobile Carousel — matches AwardsRecognition's mobile nav */}
//           <div className="flex items-center justify-center gap-x-3 mt-6 px-4">
//             <NavArrow
//               direction="prev"
//               className="h-10! w-18! rounded-4xl!"
//               tone="dark"
//               onClick={scrollPrev}
//               ariaLabel="Previous Case Study"
//             />
//             <NavArrow
//               direction="next"
//               tone="dark"
//               className="h-10! w-18! rounded-4xl!"
//               onClick={scrollNext}
//               ariaLabel="Next Case Study"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdPlay } from "react-icons/io";
import useEmblaCarousel from "embla-carousel-react";
import NavArrow from "@/components/ui/NavArrow";
import Btn from "../ui/Btn";
import { CASE_STUDIES } from "@/components/sections/casestudies/data";

const DEFS = [
  {
    brand: "Jabil",
    slug: "jabil",
    img: CASE_STUDIES.jabil.heroImage,
    logo: "/casestud/jabul.svg",
    heading: "Done and Delivered. On Time — Jabil",
    p: "Jabil is an American electronics manufacturing multinational with more than 140,000 employees in over 25 countries. They produce over 300 of the biggest brands in the world in every market from healthcare, clean energy, automotive, defence, aerospace, telecommunications and to packaging and smartphones.",
  },
  {
    brand: "Hindalco",
    slug: "hindalco",
    img: CASE_STUDIES.hindalco.heroImage,
    logo: "/casestud/hindal.svg",
    heading:
      "Large-Scale, Built-to-Spec Facility — Delivered to Hindalco in Eight Months",
    p: "Hindalco, a flagship company of the Aditya Birla Group, was setting up a new facility for a key business vertical with a fixed go-live deadline of eight months. This marked Hindalco's first-ever leased Industrial facility, with all previous plants being company-owned.",
  },

  {
    brand: "Kawasaki",
    slug: "kawasaki",
    img: CASE_STUDIES.kawasaki.heroImage,
    logo: "/casestud/kawasakilogo.svg",
    heading:
      "Manufacturing, Assembly, and R&D — Delivered Kawasaki's First Indian Integrated Unit",
    p: "Kawasaki is a global motorcycle brand known for high-performance bikes, commute vehicles, motors, energy and Industrial equipment. Kawasaki Motors sought to establish its first Indian manufacturing plant at Chakan, Pune, requiring 250,000 sq. ft. dedicated to manufacturing, assembly, warehousing, and R&D.",
  },
  {
    brand: "Barnes",
    slug: "barnes",
    img: CASE_STUDIES.barnes.heroImage,
    logo: "/casestud/newbar.svg",
    heading:
      "Crane-Ready, High-Capacity Manufacturing Facility — Delivered to SPECTRIX (formerly Barnes)",
    p: "Barnes, a global moulding solutions manufacturer, partnered with KSH INFRA to develop a built-to-suit manufacturing facility for their heavy-duty operations. This greenfield project carried a fixed 12-month timeline. While the initial requirement was for 80,000 sq. ft., during the site visit Barnes selected Building B4, factoring in future expansion.",
  },
];

const N = DEFS.length;

export default function CaseStudies() {
  const [active, setActive] = useState(0);

  // Desktop Navigation
  const go = (i: number) => setActive(((i % N) + N) % N);

  // Mobile Embla Carousel Setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    skipSnaps: false,
  });
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        // backdrop-filter is one of the most expensive properties for scroll
        // compositing — the browser has to re-sample whatever's behind this
        // element on every frame it's on/near screen, which is what read as
        // jitter scrolling past this section. It was also invisible either
        // way: the gradient below is fully opaque, so there was never
        // anything behind this section for the blur to actually show.
        background: "linear-gradient(185deg, #F8F8F8 6.45%, #FBF2E8 95.99%)",
      }}
    >
      <div className="fix relative py-20 max-sm:py-12">
        {/* Section Header */}
        <div className="flex justify-between items-start gap-10 flex-wrap mb-[clamp(28px,3vw,42px)]">
          <div>
            {/* <div className="flex items-center gap-[9px] mb-[clamp(12px,1.4vw,18px)]">
              <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-semibold text-[13px]">
                {"//"}
              </span>
              <h5 className="text-[#59624D] font-normal text-[12px] uppercase tracking-[-0.24px]">
                CASE STUDIES
              </h5>
            </div> */}
            <h2 className="section-title m-0 font-semibold text-[clamp(32px,3.9vw,48px)] leading-[1.05] tracking-[-0.015em]">
              Built Around Operational Needs{" "}
            </h2>
          </div>
        </div>

        {/* ========================================== */}
        {/* DESKTOP VIEW (Unchanged)                   */}
        {/* ========================================== */}
        <div className="hidden lg:flex gap-[clamp(12px,1.4vw,20px)] items-stretch h-[clamp(380px,30.5vw,440px)] w-full">
          {DEFS.map((cd, i) => {
            const on = i === active;
            return (
              <div
                key={cd.brand}
                // Focusable so keyboard users can expand a collapsed card the
                // same way hover does (plain tabIndex, not role="button" —
                // the expanded card contains its own link button).
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`relative h-full transition-all duration-500 ease-[0.4,0,0.2,1] rounded-[20px] overflow-hidden cursor-pointer shadow-[0_24px_55px_-38px_rgba(15,29,58,0.5)] ${
                  on ? "w-[65%] min-w-[50%]" : "w-[10%] min-w-[7%]"
                }`}
              >
                {/* Background Image — promoted to its own GPU layer so the
                    brightness filter's result gets cached/composited
                    instead of being re-rasterized on every scroll frame. */}
                <img
                  src={cd.img}
                  alt={cd.brand}
                  className="absolute inset-0 w-full h-full brightness-50 object-cover will-change-transform"
                  style={{ transform: "translateZ(0)" }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,35,0.78)_0%,rgba(12,20,35,0.28)_34%,rgba(12,20,35,0.18)_55%,rgba(10,16,28,0.82)_100%)]" />

                {/* Inner Padding Container */}
                <div className="absolute inset-0 p-[clamp(24px,2.6vw,38px)]">
                  {/* Logo Area */}
                  <div
                    className={`absolute transition-all duration-500 ease-[0.4,0,0.2,1] ${
                      on
                        ? "top-[clamp(24px,2.6vw,38px)] left-[clamp(24px,2.6vw,38px)] translate-x-0 translate-y-0"
                        : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    }`}
                  >
                    <img
                      src={cd.logo}
                      alt={cd.brand}
                      className={`w-auto object-contain ${
                        i === 1
                          ? "h-[clamp(32px,5vw,48px)]"
                          : "h-[clamp(24px,3.5vw,32px)]"
                      }`}
                    />
                  </div>

                  {/* Bottom Left Content Area split using Flexbox */}
                  <AnimatePresence mode="wait">
                    {on && (
                      <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.4,
                            delay: 0.25,
                            ease: [0.4, 0, 0.2, 1],
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: 15,
                          transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                        }}
                        className="absolute bottom-[35px] left-[clamp(24px,2.6vw,38px)] right-[clamp(24px,2.6vw,38px)] h-[72%] flex flex-col justify-between max-w-[630px]"
                      >
                        {/* Text stays at the top of this container */}
                        <div>
                          <h3 className="text-[clamp(20px,2vw,24px)] font-semibold mt-5 leading-[1.22] text-white tracking-[-0.01em]">
                            {cd.heading}
                          </h3>
                          {/* {cd.p && (
                            <p className="font-inter text-[16px] leading-[1.4] mt-2 font-normal text-white tracking-normal">
                              {cd.p}
                            </p>
                          )} */}
                        </div>

                        {/* Buttons stay anchored to the bottom of this container */}
                        <div className="flex items-center justify-start gap-4">
                          <Btn
                            href={`/case-studies/${cd.slug}`}
                            className="overflow-hidden cursor-pointer border-white!"
                            arrowColor="stroke-white"
                            hoverArrowColor="stroke-black"
                            hoverTextColor="text-black"
                            hoverBgColor="bg-white"
                            textColor="text-white!"
                            label="Read Case Study"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
        <div className="hidden lg:flex gap-1 mt-[clamp(20px,2vw,30px)]">
          <NavArrow
            direction="prev"
            tone="dark"
            onClick={() => go(active - 1)}
          />
          <NavArrow
            direction="next"
            tone="dark"
            onClick={() => go(active + 1)}
          />
        </div>

        {/* ========================================== */}
        {/* MOBILE VIEW (Clean Single-Card Embla)      */}
        {/* ========================================== */}
        <div className="block lg:hidden w-full">
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex">
              {DEFS.map((cd, i) => (
                <div key={cd.brand} className="flex-[0_0_100%] min-w-0 px-1">
                  <div className="relative h-[480px] w-full rounded-[20px] overflow-hidden shadow-[0_16px_36px_-20px_rgba(15,29,58,0.4)]">
                    {/* Background Image — promoted to its own GPU layer, same
                        reasoning as the desktop card above. */}
                    <img
                      src={cd.img}
                      alt={cd.brand}
                      className="absolute brightness-50 inset-0 w-full h-full object-cover will-change-transform"
                      style={{ transform: "translateZ(0)" }}
                    />

                    {/* Gradient Overlay Optimized for Content Readability */}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,35,0.65)_0%,rgba(12,20,35,0.2)_30%,rgba(10,16,28,0.85)_100%)]" />

                    {/* Content Container */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      {/* Brand Logo Top Left */}
                      <div>
                        <img
                          src={cd.logo}
                          alt={cd.brand}
                          className={`w-auto object-contain ${
                            i === 1 ? "h-9" : "h-6"
                          }`}
                        />
                      </div>

                      {/* Bottom Copy and CTA Controls */}
                      <div className="flex flex-col gap-5">
                        <div>
                          <h3 className="text-[20px] font-semibold leading-[1.25] text-white tracking-[-0.01em]">
                            {cd.heading}
                          </h3>
                          {cd.p && (
                            <p className="font-inter text-[14px] leading-[1.4] mt-2 font-normal text-white/90">
                              {cd.p}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons stacked in individual rows for Mobile */}
                        <div className="flex flex-col gap-3 w-full">
                          <Btn
                            href={`/case-studies/${cd.slug}`}
                            className="overflow-hidden cursor-pointer border-white! w-full justify-center"
                            arrowColor="stroke-white"
                            hoverArrowColor="stroke-black"
                            hoverTextColor="text-black"
                            hoverBgColor="bg-white"
                            textSize="text-[14px]"
                            textColor="text-white!"
                            label="Read Case Study"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls for Mobile Carousel */}
          <div className="flex items-center justify-center gap-x-3 mt-6 px-4">
            <NavArrow
              direction="prev"
              className="h-10! w-18! rounded-4xl!"
              tone="dark"
              onClick={scrollPrev}
              ariaLabel="Previous Case Study"
            />
            <NavArrow
              direction="next"
              tone="dark"
              className="h-10! w-18! rounded-4xl!"
              onClick={scrollNext}
              ariaLabel="Next Case Study"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
