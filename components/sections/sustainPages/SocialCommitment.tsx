// "use client";

// import Image from "next/image";
// import React, { useRef, useState, useCallback } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
//   useSpring,
//   useMotionValue,
//   useMotionValueEvent,
//   type MotionValue,
// } from "framer-motion";

// export interface SocialCommitmentItem {
//   number: string;
//   title: string;
//   image: string;
//   bgImage: string;
//   points: string[];
// }

// export const SOCIAL_COMMITMENT_HEADING = "Driving Sustainable Impact";
// export const SOCIAL_COMMITMENT_PARAGRAPH =
//   "We are consciously aware of the effects that large projects can have on the community. Our goal is to ensure that these effects are beneficial for the people living around us. KSH INFRA Parks designed to have a positive influence, and all projects adhere to the best practices for social responsibility.";

// export const SOCIAL_COMMITMENT_ITEMS: SocialCommitmentItem[] = [
//   {
//     number: "01",
//     title: "Positive Community Engagement",
//     image: "/sustainability/social/social0.png",
//     bgImage: "/sustainability/social/solution1.webp",
//     points: [
//       "Advanced waste management systems to minimize environmental impact and maintain community hygiene.",
//       "Rainwater harvesting and water recycling to promote sustainable water use and support local water conservation efforts.",
//       "Stormwater drainage systems to prevent flooding, ensuring safer conditions for both our parks and neighboring communities.",
//     ],
//   },
//   {
//     number: "02",
//     title: "Employee Well-Being",
//     image: "/sustainability/social/person1.png",
//     bgImage: "/sustainability/social/solution2.webp",
//     points: [
//       "Improved accessibility and personnel amenities to create a better, more comfortable experience for employees and visitors.",
//       "Sustainable infrastructure designed to enhance workplace safety, efficiency, and overall employee satisfaction.",
//     ],
//   },
//   {
//     number: "03",
//     title: "Carbon Neutral Future",
//     image: "/sustainability/social/soc3.png",
//     bgImage: "/sustainability/social/newSocial.webp",
//     points: [
//       "Solar energy option available at all our Industrial & Logistics parks to reduce reliance on the national power grid.",
//       "Sustainable development practices integrated into all our future projects, ensuring long-term environmental responsibility.",
//     ],
//   },
// ];

// const EASE_OUT = [0.33, 1, 0.68, 1] as const;

// // Shared brand gradient for the green card — same on desktop and mobile.
// const CARD_GRADIENT =
//   "radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%), #F8F8F8";

// /* ------------------------------------------------------------------------ */
// /* Hysteresis thresholds for index detection (Schmitt-trigger pattern)      */
// /* ------------------------------------------------------------------------ */
// const ZONE = {
//   FORWARD_01: 0.2,
//   BACK_01: 0.17,
//   FORWARD_12: 0.6,
//   BACK_12: 0.57,
// };

// function computeIndex(progress: number, prevIndex: number): number {
//   if (prevIndex === 0) {
//     return progress >= ZONE.FORWARD_01 ? 1 : 0;
//   }
//   if (prevIndex === 1) {
//     if (progress < ZONE.BACK_01) return 0;
//     if (progress >= ZONE.FORWARD_12) return 2;
//     return 1;
//   }
//   return progress < ZONE.BACK_12 ? 1 : 2;
// }

// interface SlideState {
//   index: number;
//   direction: "down" | "up";
// }

// /* ------------------------------------------------------------------------ */
// /* Single Curtain Layer (Background + Green Card + Foreground Image)        */
// /* ------------------------------------------------------------------------ */
// interface CurtainLayerProps {
//   item: SocialCommitmentItem;
//   index: number;
//   activeIndex: number;
//   total: number;
//   clip: any; // MotionValue<string> | string
//   isPriority?: boolean;
//   bgParallaxY: MotionValue<string>;
//   bgScale: MotionValue<number>;
// }

// const CurtainLayer: React.FC<CurtainLayerProps> = React.memo(
//   ({
//     item,
//     index,
//     activeIndex,
//     total,
//     clip,
//     isPriority = false,
//     bgParallaxY,
//     bgScale,
//   }) => {
//     return (
//       <motion.div
//         style={{
//           clipPath: clip,
//           transform: "translateZ(0)",
//           willChange: "clip-path",
//           contain: "paint",
//         }}
//         className="absolute inset-0 w-full h-full pointer-events-none"
//       >
//         {/* Dynamic Full-Width Background */}
//         <div className="absolute inset-0 z-0 overflow-hidden">
//           <motion.div
//             style={{ y: bgParallaxY, scale: bgScale }}
//             className="absolute inset-y-[-8%] inset-x-0 will-change-transform"
//           >
//             <Image
//               src={item.bgImage}
//               alt=""
//               fill
//               priority={isPriority}
//               sizes="100vw"
//               className="object-cover object-center"
//             />
//           </motion.div>
//           <div className="absolute inset-0 bg-white/20" />
//         </div>

//         {/* Card Layer Content Positioned within Sticky Viewport */}
//         <div className="fix relative z-10 w-full h-full flex flex-col justify-end pb-14">
//           <div className="grid grid-cols-12 1920:mt-40 gap-8 lg:gap-14 items-center">
//             {/* Left Container: Green Card & Overlapping Subject Image */}
//             <div className="col-span-12 lg:col-span-6 relative h-[340px] lg:h-[400px]">
//               {/* Green Gradient Box */}
//               <div
//                 style={{ background: CARD_GRADIENT }}
//                 className="absolute inset-0 rounded-[24px] shadow-lg overflow-hidden"
//               >
//                 {/* Visual Dash Marks */}
//                 <div className="absolute top-8 left-8 flex items-center gap-1.5 z-10">
//                   {Array.from({ length: total }).map((_, i) => {
//                     const isActive = i === activeIndex;
//                     return (
//                       <motion.span
//                         key={i}
//                         initial={false}
//                         animate={{
//                           width: isActive ? 40 : 12,
//                           backgroundColor: isActive
//                             ? "rgba(255,255,255,0.8)"
//                             : "rgba(255,255,255,0)",
//                           borderColor: isActive
//                             ? "rgba(255,255,255,0)"
//                             : "rgba(255,255,255,0.6)",
//                         }}
//                         transition={{
//                           duration: 0.5,
//                           ease: [0.22, 1, 0.36, 1],
//                         }}
//                         className="h-2 rounded-full border block"
//                       />
//                     );
//                   })}
//                 </div>

//                 {/* Watermark Number */}
//                 <span
//                   className="absolute top-6 right-6 text-[160px] font-thin leading-none select-none pointer-events-none tracking-tighter"
//                   style={{
//                     fontFamily: "var(--font-sora), 'Sora', sans-serif",
//                     background:
//                       "linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.26) 65%, rgba(255,255,255,0.08) 92%, rgba(255,255,255,0) 100%)",
//                     WebkitBackgroundClip: "text",
//                     backgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     WebkitMaskImage:
//                       "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0) 100%)",
//                     maskImage:
//                       "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0) 100%)",
//                   }}
//                 >
//                   {item.number}
//                 </span>
//               </div>

//               {/* Overlapping Subject Image */}
//               <div className="absolute inset-0 z-20 pointer-events-none">
//                 <div
//                   className={
//                     index === 1
//                       ? "absolute lg:-bottom-14! -left-12 lg:-left-16 w-[130%] lg:w-[165%] h-[140%] lg:h-[168%] 1920:h-[1200px]!"
//                       : index === 2
//                         ? "absolute -bottom-14 -left-20 lg:-left-12 1920:-left-60! w-[130%] lg:w-[115%] h-[135%] lg:h-[105%]"
//                         : "relative w-full h-[120%] bottom-5 flex items-end justify-center"
//                   }
//                 >
//                   <Image
//                     src={item.image}
//                     alt={item.title}
//                     fill
//                     priority={isPriority}
//                     sizes="60vw"
//                     className={
//                       index === 1 || index === 2
//                         ? "object-contain object-bottom-left"
//                         : "object-contain object-bottom"
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="col-span-12 lg:col-span-6 min-h-[260px] opacity-0 pointer-events-none" />
//           </div>
//         </div>
//       </motion.div>
//     );
//   },
// );
// CurtainLayer.displayName = "CurtainLayer";

// /* ------------------------------------------------------------------------ */
// /* Desktop Component (Sticky Scroll Track)                                  */
// /* ------------------------------------------------------------------------ */
// const DesktopSocialCommitment: React.FC = () => {
//   const items = SOCIAL_COMMITMENT_ITEMS;
//   const containerRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 260,
//     damping: 36,
//     mass: 0.4,
//   });

//   const clipTab2 = useTransform(
//     smoothProgress,
//     [0.1, 0.45],
//     ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
//   );
//   const clipTab3 = useTransform(
//     smoothProgress,
//     [0.55, 0.9],
//     ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
//   );

//   const bgStill = useMotionValue("0%");
//   const bgScaleStill = useMotionValue(1);
//   const bgParallax2 = useTransform(smoothProgress, [0.1, 0.45], ["6%", "0%"]);
//   const bgParallax3 = useTransform(smoothProgress, [0.55, 0.9], ["6%", "0%"]);
//   const bgScale2 = useTransform(smoothProgress, [0.1, 0.45], [1.12, 1]);
//   const bgScale3 = useTransform(smoothProgress, [0.55, 0.9], [1.12, 1]);

//   const [slide, setSlide] = useState<SlideState>({
//     index: 0,
//     direction: "down",
//   });

//   useMotionValueEvent(smoothProgress, "change", (latest) => {
//     setSlide((prev) => {
//       const newIndex = computeIndex(latest, prev.index);
//       if (newIndex === prev.index) return prev;
//       const direction: "down" | "up" = newIndex > prev.index ? "down" : "up";
//       return { index: newIndex, direction };
//     });
//   });

//   const active = items[slide.index];

//   return (
//     <div
//       ref={containerRef}
//       className="relative hidden md:block w-full h-[300vh]"
//     >
//       <div
//         className="sticky top-0 h-screen w-full flex flex-col justify-end pb-14 overflow-hidden"
//         style={{ contain: "layout paint" }}
//       >
//         {/* Layer 1: Base Layer (Tab 1) */}
//         <CurtainLayer
//           item={items[0]}
//           index={0}
//           activeIndex={slide.index}
//           total={items.length}
//           clip="inset(0% 0% 0% 0%)"
//           isPriority
//           bgParallaxY={bgStill}
//           bgScale={bgScaleStill}
//         />

//         {/* Layer 2: Curtain Layer (Tab 2) */}
//         <CurtainLayer
//           item={items[1]}
//           index={1}
//           activeIndex={slide.index}
//           total={items.length}
//           clip={clipTab2}
//           isPriority
//           bgParallaxY={bgParallax2}
//           bgScale={bgScale2}
//         />

//         {/* Layer 3: Curtain Layer (Tab 3) */}
//         <CurtainLayer
//           item={items[2]}
//           index={2}
//           activeIndex={slide.index}
//           total={items.length}
//           bgParallaxY={bgParallax3}
//           bgScale={bgScale3}
//           clip={clipTab3}
//         />

//         {/* Static Header & Dynamic Text Overlay Layer */}
//         <div className="fix relative z-20 w-full pointer-events-auto">
//           <div className="grid grid-cols-12 gap-8 mb-10 lg:mb-14 items-start">
//             <div className="col-span-12 lg:col-span-5">
//               <h2 className="font-semibold text-[32px] lg:text-[40px] leading-normal tracking-[-0.8px] text-[#212121]">
//                 {SOCIAL_COMMITMENT_HEADING}
//               </h2>
//             </div>
//             <div className="col-span-12 lg:col-span-7">
//               <p className="font-normal text-[14px] lg:text-[16px] leading-[1.6] text-[#4A4A4A] max-w-[620px] ml-auto">
//                 {SOCIAL_COMMITMENT_PARAGRAPH}
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-12 1920:mt-40 gap-8 lg:gap-14 items-center">
//             <div className="col-span-12 lg:col-span-6 relative h-[340px] lg:h-[400px] pointer-events-none" />

//             <div className="col-span-12 lg:col-span-6 relative min-h-[260px]">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={slide.index}
//                   initial={{
//                     opacity: 0,
//                     y: slide.direction === "down" ? 12 : -12,
//                   }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{
//                     opacity: 0,
//                     y: slide.direction === "down" ? -12 : 12,
//                   }}
//                   transition={{ duration: 0.35, ease: EASE_OUT }}
//                   className="w-full"
//                 >
//                   <h3 className="font-semibold text-[32px] lg:text-[48px] leading-[1.15] tracking-[-0.01em] text-[#212121] mb-6">
//                     {active.title}
//                   </h3>
//                   <ul className="flex flex-col gap-4">
//                     {active.points.map((point, i) => (
//                       <li
//                         key={i}
//                         className="flex items-start pl-3! gap-3 font-normal text-[15px] lg:text-[16px] leading-[1.6] text-[#212121]"
//                       >
//                         <span className="mt-[10px] w-2 h-2 rounded-full bg-[#212121] shrink-0" />
//                         <span className="text-[16px] text-[#212121]">
//                           {point}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------------ */
// /* Mobile Accordion Component                                               */
// /* ------------------------------------------------------------------------ */
// export const MobileSocialCommitment: React.FC = () => {
//   const [openIndex, setOpenIndex] = useState<number>(0); // Always keep one accordion open

//   const handleToggle = useCallback((index: number) => {
//     setOpenIndex(index);
//   }, []);

//   return (
//     <div className="md:hidden relative w-full px-5 py-10 bg-white">
//       {/* Header Section */}
//       <div className="mb-8">
//         <h2 className="font-semibold text-[26px] leading-[1.2] tracking-[-0.02em] text-[#212121] mb-3">
//           {SOCIAL_COMMITMENT_HEADING}
//         </h2>
//         <p className="font-normal text-[14px] leading-[1.6] text-[#4A4A4A]">
//           {SOCIAL_COMMITMENT_PARAGRAPH}
//         </p>
//       </div>

//       {/* Accordion Container */}
//       <div className="flex flex-col gap-3">
//         {SOCIAL_COMMITMENT_ITEMS.map((item, index) => {
//           const isOpen = openIndex === index;

//           return (
//             <div
//               key={item.number}
//               className="rounded-[20px] bg-[#F8F8F8] border border-black/5 overflow-hidden transition-all duration-300"
//             >
//               {/* Accordion Trigger/Header (Title + Number + Arrow, no image overlapping) */}
//               <button
//                 type="button"
//                 onClick={() => handleToggle(index)}
//                 className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
//               >
//                 <div className="flex items-center gap-3">
//                   <span className="text-[14px] font-semibold text-[#59624D] bg-[#59624D]/10 px-2.5 py-1 rounded-md">
//                     {item.number}
//                   </span>
//                   <h3 className="font-semibold text-[18px] leading-[1.3] text-[#212121]">
//                     {item.title}
//                   </h3>
//                 </div>
//                 <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0 text-[#212121]">
//                   <motion.span
//                     animate={{ rotate: isOpen ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="block text-sm font-bold"
//                   >
//                     ↓
//                   </motion.span>
//                 </div>
//               </button>

//               {/* Accordion Expandable Content (Image displays ONLY when open) */}
//               <AnimatePresence initial={false}>
//                 {isOpen && (
//                   <motion.div
//                     key="content"
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
//                     className="overflow-hidden"
//                   >
//                     <div className="px-5 pb-6 pt-2 flex flex-col gap-5">
//                       {/* Green Card Image Container */}
//                       <div
//                         style={{ background: CARD_GRADIENT }}
//                         className="relative h-[240px] w-full rounded-[16px] overflow-hidden p-4 flex flex-col justify-between"
//                       >
//                         {/* Background Image Layer */}
//                         <div className="absolute inset-0 z-0 pointer-events-none">
//                           <Image
//                             src={item.bgImage}
//                             alt=""
//                             fill
//                             sizes="100vw"
//                             className="object-cover object-center opacity-30"
//                           />
//                         </div>

//                         {/* Watermark Number */}
//                         <div className="relative z-10 flex justify-end">
//                           <span
//                             className="text-[80px] font-thin leading-none select-none pointer-events-none tracking-tighter text-white/40 -mt-2 -mr-1"
//                             style={{
//                               fontFamily:
//                                 "var(--font-sora), 'Sora', sans-serif",
//                               WebkitMaskImage:
//                                 "linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 80%)",
//                               maskImage:
//                                 "linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 80%)",
//                             }}
//                           >
//                             {item.number}
//                           </span>
//                         </div>

//                         {/* Subject Image Layer */}
//                         <div className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none">
//                           <div className="relative w-full h-[110%]">
//                             <Image
//                               src={item.image}
//                               alt={item.title}
//                               fill
//                               sizes="100vw"
//                               className="object-contain object-bottom"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Bullet Points */}
//                       <ul className="flex flex-col gap-3">
//                         {item.points.map((point, i) => (
//                           <li
//                             key={i}
//                             className="flex items-start gap-3 font-normal text-[14px] leading-[1.55] text-[#4A4A4A]"
//                           >
//                             <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#59624D] shrink-0" />
//                             <span>{point}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------------ */
// /* Main Export                                                              */
// /* ------------------------------------------------------------------------ */
// export default function SocialCommitment() {
//   return (
//     <section className="w-full bg-white relative">
//       <DesktopSocialCommitment />
//       <MobileSocialCommitment />
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavArrow from "@/components/ui/NavArrow";

export interface SocialCommitmentItem {
  number: string;
  title: string;
  image: string;
  bgImage: string;
  points: string[];
}

export const SOCIAL_COMMITMENT_HEADING = "Driving Sustainable Impact";
export const SOCIAL_COMMITMENT_PARAGRAPH =
  "We are consciously aware of the effects that large projects can have on the community. Our goal is to ensure that these effects are beneficial for the people living around us. KSH INFRA Parks are designed to have a positive influence, and all projects adhere to the best practices for social responsibility.";

export const SOCIAL_COMMITMENT_ITEMS: SocialCommitmentItem[] = [
  {
    number: "01",
    title: "Positive Community Engagement",
    image: "/sustainability/social/social0.png",
    bgImage: "/sustainability/social/solution1.webp",
    points: [
      "Advanced waste management systems to minimize environmental impact and maintain community hygiene.",
      "Rainwater harvesting and water recycling to promote sustainable water use and support local water conservation efforts.",
      "Stormwater drainage systems to prevent flooding, ensuring safer conditions for both our parks and neighboring communities.",
    ],
  },
  {
    number: "02",
    title: "Employee Well-Being",
    image: "/sustainability/social/person1.png",
    bgImage: "/sustainability/social/solution2.webp",
    points: [
      "Improved accessibility and personnel amenities to create a better, more comfortable experience for employees and visitors.",
      "Sustainable infrastructure designed to enhance workplace safety, efficiency, and overall employee satisfaction.",
    ],
  },
  {
    number: "03",
    title: "Carbon Neutral Future",
    image: "/sustainability/social/soc3.png",
    bgImage: "/sustainability/social/newSocial.webp",
    points: [
      "Solar energy option available at all our Industrial & Logistics parks to reduce reliance on the national power grid.",
      "Sustainable development practices integrated into all our future projects, ensuring long-term environmental responsibility.",
    ],
  },
];

const EASE_OUT = [0.33, 1, 0.68, 1] as const;
const CURTAIN_EASE = [0.22, 1, 0.36, 1] as const;

// Shared brand gradient for the green card — same on desktop and mobile.
const CARD_GRADIENT =
  "radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%), #F8F8F8";

interface SlideState {
  index: number;
  direction: "down" | "up";
}

interface OutgoingSlide {
  index: number;
  direction: "down" | "up";
}

/* ------------------------------------------------------------------------ */
/* Slide Canvas — background + green card + subject image for ONE item.     */
/* Pulled out so the curtain track below can mount two of these at once     */
/* (current + next) instead of swapping a single one via AnimatePresence.   */
/* ------------------------------------------------------------------------ */
interface SlideCanvasProps {
  itemIndex: number;
  total: number;
  animateBgIn: boolean;
  parallaxDirection: "down" | "up";
}

const SlideCanvas: React.FC<SlideCanvasProps> = ({
  itemIndex,
  total,
  animateBgIn,
  parallaxDirection,
}) => {
  const item = SOCIAL_COMMITMENT_ITEMS[itemIndex];

  return (
    <>
      {/* Dynamic Full-Width Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={
            animateBgIn
              ? {
                  scale: 1.12,
                  y: parallaxDirection === "down" ? "6%" : "-6%",
                }
              : false
          }
          animate={{ scale: 1, y: "0%" }}
          transition={{ duration: 1.5, ease: CURTAIN_EASE }}
          className="absolute inset-y-[-8%] inset-x-0 will-change-transform"
        >
          <Image
            src={item.bgImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* Card Layer Content Positioned within Viewport */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-14 px-6 lg:px-16">
        <div className="grid grid-cols-12 1920:mt-40 gap-8 lg:gap-14 items-center">
          {/* Left Container: Green Card & Overlapping Subject Image */}
          <div className="col-span-12 lg:col-span-6 relative h-[340px] lg:h-[400px]">
            {/* Green Gradient Box */}
            <div
              style={{ background: CARD_GRADIENT }}
              className="absolute inset-0 rounded-[24px] shadow-lg overflow-hidden"
            >
              {/* Visual Dash Marks — this canvas is always frozen at its own
                  itemIndex's dash state; the curtain sweeping over it is
                  what makes it read as "changing", not an internal tween. */}
              <div className="absolute top-8 left-8 flex items-center gap-1.5 z-10">
                {Array.from({ length: total }).map((_, i) => {
                  const isActive = i === itemIndex;
                  return (
                    <span
                      key={i}
                      style={{
                        width: isActive ? 40 : 12,
                        backgroundColor: isActive
                          ? "rgba(255,255,255,0.8)"
                          : "rgba(255,255,255,0)",
                        borderColor: isActive
                          ? "rgba(255,255,255,0)"
                          : "rgba(255,255,255,0.6)",
                      }}
                      className="h-2 rounded-full border block"
                    />
                  );
                })}
              </div>

              {/* Watermark Number */}
              <span
                className="absolute top-6 right-6 text-[160px] font-thin leading-none select-none pointer-events-none tracking-tighter"
                style={{
                  fontFamily: "var(--font-sora), 'Sora', sans-serif",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.26) 65%, rgba(255,255,255,0.08) 92%, rgba(255,255,255,0) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  WebkitMaskImage:
                    "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0) 100%)",
                  maskImage:
                    "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0) 100%)",
                }}
              >
                {item.number}
              </span>
            </div>

            {/* Overlapping Subject Image */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div
                className={
                  itemIndex === 1
                    ? "absolute lg:-bottom-14! -left-12 lg:-left-16 w-[130%] lg:w-[165%] h-[140%] lg:h-[168%] 1920:h-[1200px]!"
                    : itemIndex === 2
                      ? "absolute -bottom-14 -left-20 lg:-left-12 1920:-left-60! w-[130%] lg:w-[115%] h-[135%] lg:h-[105%]"
                      : "relative w-full h-[120%] bottom-5 flex items-end justify-center"
                }
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority
                  sizes="60vw"
                  className={
                    itemIndex === 1 || itemIndex === 2
                      ? "object-contain object-bottom-left"
                      : "object-contain object-bottom"
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 min-h-[260px] opacity-0 pointer-events-none" />
        </div>
      </div>
    </>
  );
};

/* ------------------------------------------------------------------------ */
/* Desktop Component (Click Navigation Track with true Curtain Reveal)      */
/*                                                                          */
/* Both the outgoing and incoming slide stay mounted for the full duration */
/* of a transition — the incoming slide sits underneath at rest, fully     */
/* exposed, and the outgoing slide sits on top with an animated clip-path  */
/* that shrinks away in the direction of travel. Since nothing ever        */
/* unmounts mid-flight (the old AnimatePresence-swap approach unmounted    */
/* the outgoing slide instantly, which is what exposed the section's own   */
/* background as a white flash), there is never a gap where neither slide  */
/* is visible.                                                             */
/* ------------------------------------------------------------------------ */
const DesktopSocialCommitment: React.FC = () => {
  const items = SOCIAL_COMMITMENT_ITEMS;
  const total = items.length;

  const [targetIndex, setTargetIndex] = useState(0);
  const [direction, setDirection] = useState<SlideState["direction"]>("down");
  const [outgoing, setOutgoing] = useState<OutgoingSlide | null>(null);

  const goTo = useCallback(
    (nextIndex: number, dir: "down" | "up") => {
      if (nextIndex === targetIndex || outgoing) return;
      setOutgoing({ index: targetIndex, direction: dir });
      setDirection(dir);
      setTargetIndex(nextIndex);
    },
    [targetIndex, outgoing],
  );

  const handlePrev = useCallback(() => {
    if (outgoing) return;
    goTo((targetIndex - 1 + total) % total, "up");
  }, [targetIndex, total, outgoing, goTo]);

  const handleNext = useCallback(() => {
    if (outgoing) return;
    goTo((targetIndex + 1) % total, "down");
  }, [targetIndex, total, outgoing, goTo]);

  // 10 seconds auto-slide effect for Desktop
  useEffect(() => {
    const interval = setInterval(() => {
      goTo((targetIndex + 1) % total, "down");
    }, 10000);

    return () => clearInterval(interval);
  }, [targetIndex, total, goTo]);

  const active = items[targetIndex];

  // "down" (Next) reveals bottom -> top, so the outgoing layer's visible
  // area recedes from its own bottom edge upward. "up" (Prev) reveals
  // top -> bottom, so it recedes from the top edge downward.
  const outgoingClip =
    outgoing?.direction === "down"
      ? "inset(0% 0% 100% 0%)"
      : "inset(100% 0% 0% 0%)";

  return (
    <div className="relative hidden md:block w-full py-16 overflow-hidden min-h-[700px] bg-[#F8F8F8]">
      {/* Curtain Canvas */}
      <div
        style={{ contain: "paint" }}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      >
        {/* Incoming / settled layer — always fully exposed underneath.
            Promoted to its own GPU compositor layer (translateZ0 + paint
            containment) so the outgoing layer's clip-path repaints don't
            force this static layer to repaint too — that cross-layer
            repaint is what read as jitter during a transition. */}
        <div
          key={targetIndex}
          style={{
            clipPath: "inset(0% 0% 0% 0%)",
            transform: "translateZ(0)",
            contain: "paint",
          }}
          className="absolute inset-0 w-full h-full"
        >
          <SlideCanvas
            itemIndex={targetIndex}
            total={total}
            animateBgIn={outgoing !== null}
            parallaxDirection={direction}
          />
        </div>

        {/* Outgoing layer — clips itself away to reveal the layer beneath it.
            Only unmounts once its own clip-path animation has fully
            finished (onAnimationComplete), per the "never destroy the
            previous slide mid-animation" requirement. Same GPU-layer
            promotion as above, isolating its own repaint as the clip moves. */}
        {outgoing && (
          <motion.div
            key={`outgoing-${outgoing.index}`}
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            animate={{ clipPath: outgoingClip }}
            transition={{ duration: 1.05, ease: CURTAIN_EASE }}
            onAnimationComplete={() => setOutgoing(null)}
            style={{
              willChange: "clip-path",
              transform: "translateZ(0)",
              contain: "paint",
            }}
            className="absolute inset-0 w-full h-full"
          >
            <SlideCanvas
              itemIndex={outgoing.index}
              total={total}
              animateBgIn={false}
              parallaxDirection={outgoing.direction}
            />
          </motion.div>
        )}
      </div>

      {/* Static Header & Dynamic Text Overlay Layer */}
      <div className="relative z-20 w-full px-6 lg:px-16 pointer-events-auto">
        <div className="grid grid-cols-12 gap-8 mb-10 lg:mb-14 items-start">
          <div className="col-span-12 lg:col-span-5">
            <h2 className="font-semibold text-[32px] lg:text-[40px] leading-normal tracking-[-0.8px] text-[#212121]">
              {SOCIAL_COMMITMENT_HEADING}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <p className="font-normal text-[14px] lg:text-[16px] leading-[1.6] text-[#4A4A4A] max-w-[620px] ml-auto">
              {SOCIAL_COMMITMENT_PARAGRAPH}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 1920:mt-40 gap-8 lg:gap-14 items-stretch">
          {/* Left Column Spacer */}
          <div className="col-span-12 lg:col-span-6 relative h-[340px] lg:h-[400px] pointer-events-none" />

          {/* Right Column: Dynamic Text Content + Fixed Bottom Nav Buttons */}
          <div className="col-span-12 lg:col-span-6 relative min-h-[380px] lg:min-h-[420px] flex flex-col justify-between">
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={targetIndex}
                  initial={{
                    y: direction === "down" ? 16 : -16,
                  }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  className="w-full"
                >
                  <h3 className="font-semibold text-[22px] sm:text-[32px] xl:text-[48px] leading-[1.15] tracking-[-0.01em] text-[#212121] mb-6">
                    {active.title}
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {active.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start pl-3! gap-3 font-normal text-[15px] lg:text-[16px] leading-[1.6] text-[#212121]"
                      >
                        <span className="mt-[10px] w-2 h-2 rounded-full bg-[#212121] shrink-0" />
                        <span className="text-[13px] lg:text-[16px] text-[#212121]">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav Arrows Placed Strictly at Bottom */}
            <div className="absolute lg:bottom-0 left-0 z-30 flex items-center gap-3 pointer-events-auto">
              <NavArrow
                direction="prev"
                tone="dark"
                disabled={outgoing !== null}
                onClick={handlePrev}
                ariaLabel="Previous Slide"
              />
              <NavArrow
                direction="next"
                tone="dark"
                disabled={outgoing !== null}
                onClick={handleNext}
                ariaLabel="Next Slide"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------ */
/* Mobile Accordion Component                                                */
/* ------------------------------------------------------------------------ */
export const MobileSocialCommitment: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(index);
  }, []);

  return (
    <div className="md:hidden relative w-full px-5 py-10 bg-white">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="font-semibold text-[26px] leading-[1.2] tracking-[-0.02em] text-[#212121] mb-3">
          {SOCIAL_COMMITMENT_HEADING}
        </h2>
        <p className="font-normal text-[14px] leading-[1.6] text-[#4A4A4A]">
          {SOCIAL_COMMITMENT_PARAGRAPH}
        </p>
      </div>

      {/* Accordion Container */}
      <div className="flex flex-col gap-3">
        {SOCIAL_COMMITMENT_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.number}
              className="rounded-[20px] bg-[#F8F8F8] border border-black/5 overflow-hidden transition-all duration-300"
            >
              {/* Accordion Trigger/Header */}
              <button
                type="button"
                onClick={() => handleToggle(index)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-semibold text-[#59624D] bg-[#59624D]/10 px-2.5 py-1 rounded-md">
                    {item.number}
                  </span>
                  <h3 className="font-semibold text-[18px] leading-[1.3] text-[#212121]">
                    {item.title}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0 text-[#212121]">
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="block text-sm font-bold"
                  >
                    ↓
                  </motion.span>
                </div>
              </button>

              {/* Accordion Expandable Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pt-2 flex flex-col gap-5">
                      {/* Green Card Image Container */}
                      <div
                        style={{ background: CARD_GRADIENT }}
                        className="relative h-[240px] w-full rounded-[16px] overflow-hidden p-4 flex flex-col justify-between"
                      >
                        {/* Background Image Layer */}
                        <div className="absolute inset-0 z-0 pointer-events-none">
                          <Image
                            src={item.bgImage}
                            alt=""
                            fill
                            sizes="100vw"
                            className="object-cover object-center opacity-30"
                            priority
                          />
                        </div>

                        {/* Watermark Number */}
                        <div className="relative z-10 flex justify-end">
                          <span
                            className="text-[80px] font-thin leading-none select-none pointer-events-none tracking-tighter text-white/40 -mt-2 -mr-1"
                            style={{
                              fontFamily:
                                "var(--font-sora), 'Sora', sans-serif",
                              WebkitMaskImage:
                                "linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 80%)",
                              maskImage:
                                "linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 80%)",
                            }}
                          >
                            {item.number}
                          </span>
                        </div>

                        {/* Subject Image Layer */}
                        <div className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none">
                          <div className="relative w-full h-[110%]">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="100vw"
                              className="object-contain object-bottom"
                              priority
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bullet Points */}
                      <ul className="flex flex-col gap-3">
                        {item.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 font-normal text-[14px] leading-[1.55] text-[#4A4A4A]"
                          >
                            <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#59624D] shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------ */
/* Main Export                                                              */
/* ------------------------------------------------------------------------ */
export default function SocialCommitment() {
  return (
    <section className="w-full bg-white relative">
      <DesktopSocialCommitment />
      <MobileSocialCommitment />
    </section>
  );
}
