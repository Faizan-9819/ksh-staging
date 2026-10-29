// "use client";

// import Image from "next/image";
// import React, {
//   useRef,
//   useState,
//   useCallback,
//   useMemo,
//   useEffect,
// } from "react";
// import type { KeyboardEvent } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useMotionValueEvent,
// } from "framer-motion";
// import NavArrow from "@/components/ui/NavArrow";
// import { CERTIFICATIONS, type CertificationItem } from "./certificationsData";

// /* =========================================================
//    ANIMATION CONFIG & MATH HELPERS
// ========================================================= */
// const FADE_TRANSITION = { duration: 0.35, ease: "easeInOut" as const };
// const CARD_TRANSITION = {
//   duration: 0.35,
//   ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
// };

// const fadeVariants = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 },
// };

// const cardVariants = {
//   initial: { opacity: 0, y: 10 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -10 },
// };

// // Thumbnail Scale & Screen-relative offsets (matching VisionShowcase math)
// const THUMB_SCALE = 0.22;
// const PREV_THUMB = { x: -35, y: 0 };
// const NEXT_THUMB = { x: 35, y: 0 };

// function clamp(value: number, min = 0, max = 1) {
//   return Math.max(min, Math.min(max, value));
// }

// function easeInOutCubic(t: number) {
//   return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// }

// function lerp(a: number, b: number, t: number) {
//   return a + (b - a) * t;
// }

// interface CardStyle {
//   transform: string;
//   opacity: number;
//   zIndex: number;
//   transformOrigin?: string;
// }

// function getCardStyle(
//   cardIndex: number,
//   activeIndex: number,
//   rawProgress: number,
//   totalCards: number,
// ): CardStyle {
//   const t = easeInOutCubic(clamp(rawProgress));
//   const isLast = activeIndex >= totalCards - 1;

//   // Active Card: Moves to Top-Left Thumbnail
//   if (cardIndex === activeIndex) {
//     if (isLast) {
//       return {
//         transform: "translate3d(0, 0, 0) scale(1)",
//         opacity: 1,
//         zIndex: 40,
//         transformOrigin: "center center",
//       };
//     }
//     return {
//       transform: `translate3d(${lerp(0, PREV_THUMB.x, t)}%, 0, 0) scale(${lerp(
//         1,
//         THUMB_SCALE,
//         t,
//       )})`,
//       opacity: 1,
//       zIndex: 30,
//       transformOrigin: "top left",
//     };
//   }

//   // Next Card: Moves from Bottom-Right Thumbnail to Center Active
//   if (cardIndex === activeIndex + 1) {
//     return {
//       transform: `translate3d(${lerp(NEXT_THUMB.x, 0, t)}%, 0, 0) scale(${lerp(
//         THUMB_SCALE,
//         1,
//         t,
//       )})`,
//       opacity: 1,
//       zIndex: 45,
//       transformOrigin: "bottom right",
//     };
//   }

//   // Previous Thumbnail (Exits/Parked Left)
//   if (cardIndex === activeIndex - 1) {
//     return {
//       transform: `translate3d(${PREV_THUMB.x}%, 0, 0) scale(${lerp(
//         THUMB_SCALE,
//         0,
//         t,
//       )})`,
//       opacity: 1,
//       zIndex: 20,
//       transformOrigin: "top left",
//     };
//   }

//   // Upcoming Waiting Card (Enters/Parked Right)
//   if (cardIndex === activeIndex + 2) {
//     return {
//       transform: `translate3d(${NEXT_THUMB.x}%, 0, 0) scale(${lerp(
//         0,
//         THUMB_SCALE,
//         t,
//       )})`,
//       opacity: 1,
//       zIndex: 25,
//       transformOrigin: "bottom right",
//     };
//   }

//   // Parked Off-screen
//   const parkLeft = cardIndex < activeIndex;
//   const park = parkLeft ? PREV_THUMB : NEXT_THUMB;
//   return {
//     transform: `translate3d(${park.x}%, 0, 0) scale(0)`,
//     opacity: 0,
//     zIndex: 0,
//     transformOrigin: parkLeft ? "top left" : "bottom right",
//   };
// }

// /* =========================================================
//    DESKTOP HELPER COMPONENTS
// ========================================================= */

// interface ActiveHeadingProps {
//   item: CertificationItem;
//   activeIndex: number;
//   className: string;
// }

// function ActiveHeading({ item, activeIndex, className }: ActiveHeadingProps) {
//   return (
//     <AnimatePresence mode="wait">
//       <motion.h2
//         key={activeIndex}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         variants={fadeVariants}
//         transition={FADE_TRANSITION}
//         className={className}
//       >
//         {item.title}
//       </motion.h2>
//     </AnimatePresence>
//   );
// }

// interface ImageStackProps {
//   data: CertificationItem[];
//   cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
//   sizes: string;
// }

// function ImageStack({ data, cardRefs, sizes }: ImageStackProps) {
//   return (
//     <div className="relative w-full h-full overflow-visible grid grid-cols-1 grid-rows-1">
//       {data.map((item, i) => (
//         <div
//           key={i}
//           ref={(el) => {
//             cardRefs.current[i] = el;
//           }}
//           style={{
//             width: "73%",
//             height: "100%",
//             borderRadius: "clamp(16px, 1.5vw, 28px)",
//             transform: "translate3d(0,0,0) scale(1)",
//             willChange: "transform, opacity",
//           }}
//           className="col-start-1 row-start-1 1463:translate-x-8 self-start justify-self-start overflow-hidden max-w-full relative bg-white transition-shadow duration-300"
//         >
//           <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-10">
//             <Image
//               src={item.image}
//               alt={item.title.replace(/\n/g, " ")}
//               fill
//               sizes={sizes}
//               priority={i === 0}
//               className="object-contain p-2 lg:p-4"
//               draggable={false}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// interface DescriptionCardProps {
//   item: CertificationItem;
//   activeIndex: number;
//   className?: string;
// }

// function DescriptionCard({
//   item,
//   activeIndex,
//   className = "",
// }: DescriptionCardProps) {
//   return (
//     <div
//       className={`overflow-hidden rounded-[24px] bg-[#FBF2E8] py-8! p-6 lg:p-7 w-[400px]! h-[170px] lg:h-[250px] flex items-center ${className}`}
//     >
//       <AnimatePresence mode="wait">
//         <motion.p
//           key={activeIndex}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           variants={cardVariants}
//           transition={CARD_TRANSITION}
//           className="text-[13px] w-[380px]! py-7 lg:text-[15px] leading-relaxed text-gray-600 font-normal"
//         >
//           {item.description}
//         </motion.p>
//       </AnimatePresence>
//     </div>
//   );
// }

// interface NavIndicatorsProps {
//   items: CertificationItem[];
//   activeIndex: number;
//   onSelect: (index: number) => void;
// }

// function NavIndicators({ items, activeIndex, onSelect }: NavIndicatorsProps) {
//   const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
//     if (event.key === "ArrowRight") {
//       event.preventDefault();
//       onSelect((activeIndex + 1) % items.length);
//     } else if (event.key === "ArrowLeft") {
//       event.preventDefault();
//       onSelect((activeIndex - 1 + items.length) % items.length);
//     }
//   };

//   return (
//     <div
//       role="tablist"
//       aria-label="Certification showcase navigation"
//       onKeyDown={handleKeyDown}
//       className="flex items-center gap-2"
//     >
//       {items.map((_, index) => {
//         const isActive = index === activeIndex;
//         return (
//           <button
//             key={index}
//             type="button"
//             role="tab"
//             aria-selected={isActive}
//             aria-label={`Show certification ${index + 1}`}
//             onClick={() => onSelect(index)}
//             className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
//               isActive
//                 ? "w-10 bg-[#5D5D5D]"
//                 : "w-2 bg-transparent border border-[#B7B7B7] hover:border-[#5D5D5D]"
//             }`}
//           />
//         );
//       })}
//     </div>
//   );
// }

// /* =========================================================
//    DESKTOP COMPONENT (STICKY SCROLL TRACK)
// ========================================================= */

// const DesktopCertifications: React.FC<{ data: CertificationItem[] }> = ({
//   data,
// }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const total = data.length;
//   const maxSegments = useMemo(() => Math.max(total - 1, 1), [total]);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   const applyTransforms = useCallback(
//     (seg: number) => {
//       const activeIdx = Math.min(total - 1, Math.floor(seg));
//       const progressInSegment = seg - activeIdx;

//       cardRefs.current.forEach((el, i) => {
//         if (!el) return;

//         const style = getCardStyle(i, activeIdx, progressInSegment, total);

//         el.style.transform = style.transform;
//         el.style.opacity = String(style.opacity);
//         el.style.zIndex = String(style.zIndex);
//         if (style.transformOrigin) {
//           el.style.transformOrigin = style.transformOrigin;
//         }
//         el.style.pointerEvents = style.opacity < 0.05 ? "none" : "auto";
//       });
//     },
//     [total],
//   );

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const progress = clamp(latest);
//     const seg = progress * maxSegments;

//     applyTransforms(seg);

//     const nextActive = Math.min(total - 1, Math.round(seg));
//     setActiveIndex((prev) => (prev === nextActive ? prev : nextActive));
//   });

//   useEffect(() => {
//     applyTransforms(0);
//   }, [applyTransforms]);

//   const goTo = useCallback(
//     (index: number) => {
//       setActiveIndex(((index % total) + total) % total);
//     },
//     [total],
//   );

//   const active = data[activeIndex] || data[0];

//   return (
//     <div
//       ref={containerRef}
//       style={{ height: `${Math.max(total, 1) * 160}vh` }}
//       className="hidden lg:block relative w-full bg-[#FBF2E8]"
//     >
//       <div className="sticky top-0 h-screen w-full flex py-14! items-center justify-center overflow-hidden">
//         {/* CENTER TOP TITLE */}
//         <h2 className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-[40px] font-semibold text-[#101010] tracking-[-0.02em]">
//           Certificates
//         </h2>

//         <div className="fix flex items-center justify-between gap-4 lg:gap-0 relative">
//           {/* LEFT COLUMN */}
//           <div className="relative z-10 w-[280px] lg:w-[300px] shrink-0 flex flex-col justify-between h-[420px] lg:h-[480px] pt-2">
//             <div className="relative z-[200]">
//               <div className="w-32 h-24 lg:w-44 lg:h-32 mb-8 relative z-50" />

//               <ActiveHeading
//                 item={active}
//                 activeIndex={activeIndex}
//                 className="relative font-semibold text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.02em] text-[#101010] whitespace-pre-line xl:translate-x-18.5 1366:translate-x-14.5 1440:translate-x-12 2xl:translate-x-4"
//               />
//             </div>

//             <div>
//               <NavIndicators
//                 items={data}
//                 activeIndex={activeIndex}
//                 onSelect={goTo}
//               />
//             </div>
//           </div>

//           {/* CENTER STAGE */}
//           <div className="relative z-0 flex-1 h-[420px] lg:h-[500px]">
//             <ImageStack
//               data={data}
//               cardRefs={cardRefs}
//               sizes="(min-width: 1024px) 60vw, 80vw"
//             />

//             {/* Description Card */}
//             <div className="absolute top-[37%] -translate-y-1/2 right-[14%] w-[260px] lg:w-[320px] z-50">
//               <DescriptionCard item={active} activeIndex={activeIndex} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* =========================================================
//    MOBILE COMPONENT
// ========================================================= */

// const MobileCertifications: React.FC<{ data: CertificationItem[] }> = ({
//   data,
// }) => {
//   const trackRef = useRef<HTMLDivElement>(null);
//   const [active, setActive] = useState(0);

//   const handleScroll = () => {
//     const el = trackRef.current;
//     if (!el) return;
//     const children = Array.from(el.children) as HTMLElement[];
//     if (!children.length) return;

//     const viewportCenter = el.scrollLeft + el.clientWidth / 2;
//     let closestIndex = 0;
//     let closestDistance = Infinity;

//     children.forEach((child, i) => {
//       const childCenter = child.offsetLeft + child.offsetWidth / 2;
//       const distance = Math.abs(childCenter - viewportCenter);
//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestIndex = i;
//       }
//     });

//     setActive((prev) => (prev === closestIndex ? prev : closestIndex));
//   };

//   const scrollTo = (index: number) => {
//     const el = trackRef.current;
//     if (!el) return;
//     const children = Array.from(el.children) as HTMLElement[];
//     const child = children[Math.max(0, Math.min(index, children.length - 1))];
//     if (!child) return;

//     el.scrollTo({
//       left: child.offsetLeft,
//       behavior: "smooth",
//     });
//     setActive(index);
//   };

//   const activeItem = data[active] || data[0];

//   return (
//     <div className="lg:hidden w-full py-12">
//       <div className="px-6 mb-6">
//         <h2 className="font-semibold text-[26px] leading-[1.15] h-[90px] lg:h-auto tracking-[-0.02em] text-[#212121] whitespace-pre-line">
//           {activeItem.title}
//         </h2>
//       </div>

//       <div
//         ref={trackRef}
//         onScroll={handleScroll}
//         className="relative no-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-4"
//         style={{ scrollSnapStop: "always" }}
//       >
//         {data.map((item, i) => (
//           <div key={i} className="snap-center shrink-0 w-[85vw]">
//             <div className="relative w-full h-[240px] rounded-[24px] overflow-hidden bg-white p-6 shadow-sm mb-4 flex items-center justify-center">
//               <Image
//                 src={item.image}
//                 alt={item.title.replace(/\n/g, " ")}
//                 fill
//                 sizes="85vw"
//                 className="object-contain p-4"
//               />
//             </div>
//             <div className="bg-[#FBF2E8] rounded-[16px] p-5 border border-black/5">
//               <p className="text-[13px] leading-[1.6] text-[#555555]">
//                 {item.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center justify-center gap-3 mt-6">
//         <NavArrow
//           direction="prev"
//           className="h-10! w-18! rounded-4xl!"
//           tone="dark"
//           onClick={() => scrollTo(Math.max(0, active - 1))}
//           disabled={active === 0}
//           ariaLabel="Previous Certification"
//         />
//         <NavArrow
//           direction="next"
//           tone="dark"
//           className="h-10! w-18! rounded-4xl!"
//           onClick={() => scrollTo(Math.min(data.length - 1, active + 1))}
//           disabled={active === data.length - 1}
//           ariaLabel="Next Certification"
//         />
//       </div>
//     </div>
//   );
// };

// /* =========================================================
//    MAIN EXPORT
// ========================================================= */

// const CertificationSection: React.FC = () => {
//   return (
//     <section className="w-full bg-[#FBF2E8]">
//       <DesktopCertifications data={CERTIFICATIONS} />
//       <MobileCertifications data={CERTIFICATIONS} />
//     </section>
//   );
// };

// export default CertificationSection;

"use client";

import Image from "next/image";
import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import type { KeyboardEvent } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import NavArrow from "@/components/ui/NavArrow";
import { CERTIFICATIONS, type CertificationItem } from "./certificationsData";

/* =========================================================
   ANIMATION CONFIG & MATH HELPERS
========================================================= */
const FADE_TRANSITION = { duration: 0.35, ease: "easeInOut" as const };
const CARD_TRANSITION = {
  duration: 0.35,
  ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
};
// Click-triggered slide (the image-stack tween in DesktopCertifications) —
// same easing as CARD_TRANSITION, just slower, since a click-driven jump
// reads as an abrupt cut at the old scroll-scrubbed duration.
const CLICK_SLIDE_TRANSITION = {
  duration: 1.5,
  ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
};

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// Thumbnail Scale & Screen-relative offsets (matching VisionShowcase math)
const THUMB_SCALE = 0.22;
const PREV_THUMB = { x: -35, y: 0 };
const NEXT_THUMB = { x: 35, y: 0 };

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface CardStyle {
  transform: string;
  opacity: number;
  zIndex: number;
  transformOrigin?: string;
}

function getCardStyle(
  cardIndex: number,
  activeIndex: number,
  rawProgress: number,
  totalCards: number,
): CardStyle {
  const t = easeInOutCubic(clamp(rawProgress));
  const isLast = activeIndex >= totalCards - 1;

  // Active Card: Moves to Top-Left Thumbnail
  if (cardIndex === activeIndex) {
    if (isLast) {
      return {
        transform: "translate3d(0, 0, 0) scale(1)",
        opacity: 1,
        zIndex: 40,
        transformOrigin: "center center",
      };
    }
    return {
      transform: `translate3d(${lerp(0, PREV_THUMB.x, t)}%, 0, 0) scale(${lerp(
        1,
        THUMB_SCALE,
        t,
      )})`,
      opacity: 1,
      zIndex: 30,
      transformOrigin: "top left",
    };
  }

  // Next Card: Moves from Bottom-Right Thumbnail to Center Active
  if (cardIndex === activeIndex + 1) {
    return {
      transform: `translate3d(${lerp(NEXT_THUMB.x, 0, t)}%, 0, 0) scale(${lerp(
        THUMB_SCALE,
        1,
        t,
      )})`,
      opacity: 1,
      zIndex: 45,
      transformOrigin: "bottom right",
    };
  }

  // Previous Thumbnail (Exits/Parked Left)
  if (cardIndex === activeIndex - 1) {
    return {
      transform: `translate3d(${PREV_THUMB.x}%, 0, 0) scale(${lerp(
        THUMB_SCALE,
        0,
        t,
      )})`,
      opacity: 1,
      zIndex: 20,
      transformOrigin: "top left",
    };
  }

  // Upcoming Waiting Card (Enters/Parked Right)
  if (cardIndex === activeIndex + 2) {
    return {
      transform: `translate3d(${NEXT_THUMB.x}%, 0, 0) scale(${lerp(
        0,
        THUMB_SCALE,
        t,
      )})`,
      opacity: 1,
      zIndex: 25,
      transformOrigin: "bottom right",
    };
  }

  // Parked Off-screen
  const parkLeft = cardIndex < activeIndex;
  const park = parkLeft ? PREV_THUMB : NEXT_THUMB;
  return {
    transform: `translate3d(${park.x}%, 0, 0) scale(0)`,
    opacity: 0,
    zIndex: 0,
    transformOrigin: parkLeft ? "top left" : "bottom right",
  };
}

/* =========================================================
   DESKTOP HELPER COMPONENTS
========================================================= */

interface ActiveHeadingProps {
  item: CertificationItem;
  activeIndex: number;
  className: string;
}

function ActiveHeading({ item, activeIndex, className }: ActiveHeadingProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.h3
        key={activeIndex}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeVariants}
        transition={FADE_TRANSITION}
        className={className}
      >
        {item.title}
      </motion.h3>
    </AnimatePresence>
  );
}

interface ImageStackProps {
  data: CertificationItem[];
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  sizes: string;
}

function ImageStack({ data, cardRefs, sizes }: ImageStackProps) {
  return (
    <div className="relative w-full h-full overflow-visible grid grid-cols-1 grid-rows-1">
      {data.map((item, i) => (
        <div
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          style={{
            width: "73%",
            height: "100%",
            borderRadius: "clamp(16px, 1.5vw, 28px)",
            transform: "translate3d(0,0,0) scale(1)",
            willChange: "transform, opacity",
          }}
          className="col-start-1 row-start-1 1463:translate-x-8 2xl:translate-x-0 self-start justify-self-start overflow-hidden max-w-full relative bg-white transition-shadow duration-300"
        >
          <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-10">
            <Image
              src={item.image}
              alt={item.title.replace(/\n/g, " ")}
              fill
              sizes={sizes}
              priority={i === 0}
              className={`object-contain lg:scale-80 ${i == 1 ? "lg:-translate-x-7" : "lg:translate-x-0"} 2xl:translate-x-0 2xl:scale-100 p-2 lg:p-4`}
              draggable={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface DescriptionCardProps {
  item: CertificationItem;
  activeIndex: number;
  className?: string;
}

function DescriptionCard({
  item,
  activeIndex,
  className = "",
}: DescriptionCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-[24px] bg-[#FBF2E8] py-8! p-6 lg:p-7 w-[400px]! h-[170px] lg:h-[250px] flex items-center ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={activeIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={cardVariants}
          transition={CARD_TRANSITION}
          className="text-[13px] w-[380px]! py-7 lg:text-[15px] leading-relaxed text-gray-600 font-normal"
        >
          {item.description}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

interface NavIndicatorsProps {
  items: CertificationItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

function NavIndicators({ items, activeIndex, onSelect }: NavIndicatorsProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onSelect((activeIndex + 1) % items.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onSelect((activeIndex - 1 + items.length) % items.length);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Certification showcase navigation"
      onKeyDown={handleKeyDown}
      className="flex items-center gap-2"
    >
      {items.map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Show certification ${index + 1}`}
            onClick={() => onSelect(index)}
            className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
              isActive
                ? "w-10 bg-[#5D5D5D]"
                : "w-2 bg-transparent border border-[#B7B7B7] hover:border-[#5D5D5D]"
            }`}
          />
        );
      })}
    </div>
  );
}

/* =========================================================
   DESKTOP COMPONENT (CLICK-DRIVEN & AUTO-PLAY)
========================================================= */

const DesktopCertifications: React.FC<{ data: CertificationItem[] }> = ({
  data,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const total = data.length;

  const seg = useMotionValue(0);

  const applyTransforms = useCallback(
    (segValue: number) => {
      const activeIdx = Math.min(total - 1, Math.floor(segValue));
      const progressInSegment = segValue - activeIdx;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        const style = getCardStyle(i, activeIdx, progressInSegment, total);

        el.style.transform = style.transform;
        el.style.opacity = String(style.opacity);
        el.style.zIndex = String(style.zIndex);
        if (style.transformOrigin) {
          el.style.transformOrigin = style.transformOrigin;
        }
        el.style.pointerEvents = style.opacity < 0.05 ? "none" : "auto";
      });
    },
    [total],
  );

  useMotionValueEvent(seg, "change", (latest) => {
    applyTransforms(latest);

    const nextActive = Math.min(total - 1, Math.max(0, Math.round(latest)));
    setActiveIndex((prev) => (prev === nextActive ? prev : nextActive));
  });

  useEffect(() => {
    applyTransforms(0);
  }, [applyTransforms]);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      animate(seg, clamped, CLICK_SLIDE_TRANSITION);
    },
    [total, seg],
  );

  // 10 seconds auto-slide effect for Desktop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % total;
        goTo(nextIndex);
        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [total, goTo]);

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const active = data[activeIndex] || data[0];

  return (
    <div className="hidden lg:block relative w-full bg-[#FBF2E8]">
      <div className="h-fit 2xl:h-[100%]  w-full flex py-12! 2xl:py-18! items-center justify-center overflow-hidden">
        {/* CENTER TOP TITLE */}
        <h2 className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-[40px] font-semibold text-[#101010] tracking-[-0.02em]">
          Certificates
        </h2>

        <div className="fix flex items-center my-20 2xl:mt-10 justify-between gap-4 lg:gap-0 relative">
          {/* LEFT COLUMN */}
          <div className="relative z-10 w-[280px] lg:w-[300px] shrink-0 flex flex-col justify-between h-[420px] lg:h-[480px] pt-2">
            <div className="relative z-[200]">
              <div className="w-32 h-24 lg:w-44 lg:h-32 mb-8 relative z-50" />
              <ActiveHeading
                item={active}
                activeIndex={activeIndex}
                className="relative font-semibold text-[32px] lg:text-[50px] h-[165px] leading-[1.1] tracking-[-0.02em] text-[#101010] whitespace-pre-line xl:translate-x-[clamp(16px,calc(327.5px_-_20.28vw),74px)]"
              />{" "}
              <div className="flex pt-7 items-center gap-3 xl:translate-x-[clamp(16px,calc(327.5px_-_20.28vw),74px)]">
                <NavArrow
                  direction="prev"
                  tone="dark"
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  ariaLabel="Previous certification"
                />
                <NavArrow
                  direction="next"
                  tone="dark"
                  onClick={goNext}
                  disabled={activeIndex === total - 1}
                  ariaLabel="Next certification"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <NavIndicators
                items={data}
                activeIndex={activeIndex}
                onSelect={goTo}
              />
            </div>
          </div>

          {/* CENTER STAGE */}
          <div className="relative z-0 flex-1 h-[420px] lg:h-[500px]">
            <ImageStack
              data={data}
              cardRefs={cardRefs}
              sizes="(min-width: 1024px) 60vw, 80vw"
            />

            {/* Description Card */}
            <div className="absolute top-[37%] -translate-y-1/2 right-[14%] w-[260px] lg:w-[320px] z-50">
              <DescriptionCard item={active} activeIndex={activeIndex} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MOBILE COMPONENT (ACCORDION VIEW & AUTO-PLAY)
========================================================= */

const MobileCertifications: React.FC<{ data: CertificationItem[] }> = ({
  data,
}) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    if (openIndex !== index) {
      setOpenIndex(index);
    }
  };

  return (
    <div className="lg:hidden w-full px-6 py-10">
      <h2 className="text-[28px] font-semibold text-[#101010] tracking-[-0.02em] mb-6">
        Certificates
      </h2>

      <div className="flex flex-col gap-4">
        {data.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              className="border border-black/10 rounded-[20px] bg-white overflow-hidden transition-all duration-300"
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => toggleAccordion(i)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-[18px] leading-tight text-[#212121]"
              >
                <span className="whitespace-pre-line">{item.title}</span>
                <span
                  className={`ml-4 transform transition-transform duration-300 text-xl text-gray-500 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ↓
                </span>
              </button>

              {/* Accordion Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 flex flex-col gap-4">
                      {/* Image Container */}
                      <div className="relative w-full h-[220px] rounded-[16px] overflow-hidden bg-[#fff] p-4 flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt={item.title.replace(/\n/g, " ")}
                          fill
                          sizes="100vw"
                          className="object-contain scale-150 p-2"
                          priority
                        />
                      </div>

                      {/* Description Container */}
                      <div className="bg-[#FBF2E8] rounded-[16px] p-4 border border-black/5">
                        <p className="text-[14px] leading-[1.6] text-[#555555] font-normal">
                          {item.description}
                        </p>
                      </div>
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

/* =========================================================
   MAIN EXPORT
========================================================= */

const CertificationSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FBF2E8]">
      <DesktopCertifications data={CERTIFICATIONS} />
      <MobileCertifications data={CERTIFICATIONS} />
    </section>
  );
};

export default CertificationSection;
