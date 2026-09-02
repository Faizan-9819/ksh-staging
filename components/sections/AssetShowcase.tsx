// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { LayoutGrid, Users, Layers, ChevronDown } from "lucide-react";
// import {
//   useMotionValueEvent,
//   useMotionValue,
//   animate,
//   motion,
//   AnimatePresence,
// } from "framer-motion";

// type CardItem = {
//   img: string;
//   label: string;
//   tag: string;
// };

// type FeatureItem = {
//   title: string;
//   desc: string;
//   icon: React.ReactNode;
// };

// const SVG = ({ src, className }: { src: string; className?: string }) => {
//   return <img src={src} className={className} alt="" />;
// };

// const FEATURES: FeatureItem[] = [
//   {
//     title: "Environment",
//     desc: "Designed to reduce environmental impact through energy-efficient infrastructure, resource conservation, and sustainable development practices.",
//     icon: <SVG src="/home/Asset/leaf.svg" className="scale-130" />,
//   },
//   {
//     title: "Social",
//     desc: "Creating safer workplaces, stronger communities, and better experiences for occupiers, employees, partners, and stakeholders.",
//     icon: <SVG src="/home/Asset/people.svg" className="scale-130" />,
//   },
//   {
//     title: "Governance",
//     desc: "Driven by transparency, accountability, and institutional-grade processes that support responsible long-term growth.",
//     icon: <SVG src="/home/Asset/leaf.svg" className="scale-130" />,
//   },
// ];

// const DESKTOP_BREAKPOINT = 900;
// const THUMB_SCALE = 0.4545;
// // Click-driven replacement for scroll speed — same premium ease-out used
// // elsewhere in this codebase for click-triggered slide/reveal transitions
// // (no bounce/overshoot). Fixed duration regardless of how many segments a
// // click spans, matching how a deliberate tab click (vs. a scroll scrub)
// // should feel — snappy and consistent rather than distance-proportional.
// const TAB_CLICK_TRANSITION = {
//   duration: 0.9,
//   ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
// };

// function getCardTransform(
//   cardIndex: number,
//   activeIndex: number,
//   progressInSegment: number,
//   totalCards: number,
// ) {
//   let transform = "";
//   let transformOrigin = "left bottom";

//   // CASE 1: Past cards
//   if (cardIndex < activeIndex) {
//     transform = `translate3d(20vw, 0px, 0) scale(0)`;
//     transformOrigin = "center top";
//   }
//   // CASE 2: Active card
//   else if (cardIndex === activeIndex) {
//     if (activeIndex === totalCards - 1) {
//       transform = `translate3d(20vw, 0px, 0) scale(1)`;
//       transformOrigin = "right bottom";
//     } else {
//       const currentScale = 1 - progressInSegment;
//       transform = `translate3d(20vw, 0px, 0) scale(${currentScale})`;
//       transformOrigin = "right bottom";
//     }
//   }
//   // CASE 3: Upcoming card
//   else if (cardIndex === activeIndex + 1) {
//     const currentScale = THUMB_SCALE + (1 - THUMB_SCALE) * progressInSegment;
//     const currentLeft = 1 + (20 - 1) * Math.pow(progressInSegment, 1.2);

//     transform = `translate3d(${currentLeft}vw, 0px, 0) scale(${currentScale})`;
//     transformOrigin = "left bottom";
//   }
//   // CASE 4: Next waiting card
//   else if (cardIndex === activeIndex + 2) {
//     const currentScale = THUMB_SCALE * progressInSegment;
//     transform = `translate3d(1vw, 0px, 0) scale(${currentScale})`;
//     transformOrigin = "left bottom";
//   }
//   // CASE 5: Rest of stack
//   else {
//     transform = `translate3d(1vw, 0px, 0) scale(0)`;
//     transformOrigin = "left bottom";
//   }

//   return {
//     transform,
//     transformOrigin,
//     zIndex: String(totalCards + 10 - cardIndex),
//   };
// }

// export default function AssetShowcase() {
//   const rootRef = useRef<HTMLElement>(null);
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const [active, setActive] = useState(0);
//   const [isWide, setIsWide] = useState(true);

//   // Accordion state: Always keep one item open (default index 0)
//   const [openAccordion, setOpenAccordion] = useState<number>(0);

//   const CARDS: CardItem[] = [
//     {
//       img: "/home/Asset/asset1.jpg",
//       label: "Industrial Parks",
//       tag: "FLAGSHIP",
//     },
//     {
//       img: "/home/Asset/asset2.jpg",
//       label: "Logistics Hubs",
//       tag: "OPERATIONS",
//     },
//     {
//       img: "/home/governance.jpg",
//       label: "Grade A Warehouses",
//       tag: "PREMIUM",
//     },
//   ];

//   useEffect(() => {
//     const root = rootRef.current;
//     if (!root) return;

//     const update = (width: number) => {
//       setIsWide(width >= DESKTOP_BREAKPOINT);
//     };

//     const ro = new ResizeObserver((entries) => {
//       const entry = entries[0];
//       if (!entry) return;
//       update(entry.contentRect.width);
//     });

//     ro.observe(root);
//     update(root.getBoundingClientRect().width);

//     return () => ro.disconnect();
//   }, []);

//   // Continuous 0..maxSegments position — previously sampled from
//   // scrollYProgress, now driven by animate() on tab click. getCardTransform
//   // itself is untouched: it still only ever sees plain numbers
//   // (activeIndex, progressInSegment) and returns a transform string that we
//   // assign imperatively, exactly as the scroll version did. Framer only
//   // ever animates the single numeric `seg` value — never a CSS string.
//   const seg = useMotionValue(0);

//   const applyTransforms = useCallback(
//     (segValue: number) => {
//       const activeIndex = Math.min(
//         CARDS.length - 1,
//         Math.max(0, Math.floor(segValue)),
//       );
//       const progressInSegment = segValue - activeIndex;

//       cardRefs.current.forEach((el, i) => {
//         if (!el) return;

//         const styles = getCardTransform(
//           i,
//           activeIndex,
//           progressInSegment,
//           CARDS.length,
//         );

//         el.style.transform = styles.transform;
//         el.style.transformOrigin = styles.transformOrigin;
//         el.style.zIndex = styles.zIndex;
//       });
//     },
//     [CARDS.length],
//   );

//   useMotionValueEvent(seg, "change", (latest) => {
//     if (!isWide) return;

//     applyTransforms(latest);
//     setActive((prev) => {
//       const next = Math.min(
//         FEATURES.length - 1,
//         Math.max(0, Math.round(latest)),
//       );
//       return prev === next ? prev : next;
//     });
//   });

//   useEffect(() => {
//     if (!isWide) return;

//     seg.set(0);
//     applyTransforms(0);
//     setActive(0);
//   }, [isWide, seg, applyTransforms]);

//   // Tabs call this directly — animate() on an already-animating MotionValue
//   // retargets smoothly from its current live position, so rapid re-clicks
//   // (1 -> 2 -> 3 -> 2 -> 1) never snap, pop, or leave a broken in-between
//   // state; there's nothing to guard against a race on.
//   const goTo = useCallback(
//     (index: number) => {
//       const clamped = Math.max(0, Math.min(CARDS.length - 1, index));
//       animate(seg, clamped, TAB_CLICK_TRANSITION);
//     },
//     [seg, CARDS.length],
//   );

//   const selectAccordion = (index: number) => {
//     // Ensures always one accordion remains open
//     setOpenAccordion(index);
//   };

//   return (
//     <section ref={rootRef} className="relative w-full bg-[#FBF2E8]">
//       {/* ── DESKTOP: click-driven tabs (no scroll dependency) ── */}
//       {isWide && (
//         <div className="h-screen w-full flex flex-col lg:py-12 py-12 justify-between overflow-hidden">
//           {/* CONTENT TOP */}
//           <div className="1920:mt-28 w-full flex fix flex-col gap-3 shrink-0">
//             <h2 className="section-title m-0 font-[family-name:var(--font-sora),sans-serif] font-bold text-[clamp(28px,3.2vw,46px)] leading-[1.15] tracking-[-0.015em]">
//               Building <br /> Responsibly for <br /> the Long Term
//             </h2>
//             <p className="max-w-[340px]">
//               Sustainability is integrated into every stage of development—from
//               resource-efficient design and infrastructure planning to
//               responsible operations and governance.
//             </p>
//           </div>

//           {/* CONTENT BOTTOM */}
//           <div className="w-full flex flex-row items-end justify-between flex-1 min-h-0 gap-[4vw]">
//             {/* CENTER COLUMN */}
//             <div className="mlcont mlcont-1900 flex-1 h-[70vh] min-[1900px]:h-[55vh] min-w-0 z-30 pointer-events-none overflow-visible grid grid-cols-1 grid-rows-1">
//               {CARDS.map((card, i) => (
//                 <div
//                   key={card.label}
//                   ref={(el) => {
//                     cardRefs.current[i] = el;
//                   }}
//                   className="col-start-1 row-start-1 ml-26 self-end justify-self-start overflow-hidden will-change-transform max-w-full relative"
//                   style={{
//                     width: "25vw",
//                     height: "100%",
//                     borderRadius: "clamp(12px,1.3vw,20px)",
//                   }}
//                 >
//                   <img
//                     src={card.img}
//                     alt={card.label}
//                     className="w-full h-full object-cover block"
//                     draggable={false}
//                   />

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                 </div>
//               ))}
//             </div>

//             {/* RIGHT COLUMN — interactive tabs */}
//             <div className="mrcont w-[30%] 1920:w-[25%] shrink-0 flex flex-col justify-end gap-2 z-50">
//               {FEATURES.map((feature, i) => {
//                 const on = i === active;

//                 return (
//                   <div
//                     key={feature.title}
//                     role="button"
//                     tabIndex={0}
//                     aria-pressed={on}
//                     aria-label={`Show ${feature.title}`}
//                     onClick={() => goTo(i)}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" || e.key === " ") {
//                         e.preventDefault();
//                         goTo(i);
//                       }
//                     }}
//                     className={`rounded-[clamp(12px,1.2vw,18px)] transition-all duration-500 ease-out cursor-pointer hover:bg-white ${
//                       on
//                         ? "bg-white py-[30px] px-[20px] my-[6px] shadow-[0_20px_50px_-24px_rgba(28,42,72,0.16)]"
//                         : "bg-transparent py-[20px] px-[20px] my-[10px] shadow-none"
//                     }`}
//                   >
//                     <div>
//                       <div className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)] mb-5 flex items-center justify-center">
//                         {feature.icon}
//                       </div>

//                       <h3 className="m-0 mb-1 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(13px,1.1vw,17px)] text-[#1C2A48] leading-tight">
//                         {feature.title}
//                       </h3>

//                       <p className="m-0 text-[clamp(11px,0.8vw,12.5px)] leading-[1.55] text-[#6B6B63]">
//                         {feature.desc}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── MOBILE: Accordion (Always 1 open) ── */}
//       {!isWide && (
//         <div className="px-[clamp(20px,5vw,36px)] py-[clamp(40px,8vw,60px)]">
//           <div className="flex items-center gap-2.25 mb-4">
//             <span className="font-[family-name:var(--font-sora),sans-serif] text-[#8C8C84] font-semibold text-[13px]">
//               //
//             </span>
//             <span className="font-[family-name:var(--font-sora),sans-serif] text-[#8C8C84] font-medium text-[11px] tracking-[0.18em] uppercase">
//               Building Responsibly
//             </span>
//           </div>

//           <h2 className="m-0 mb-3 font-[family-name:var(--font-sora),sans-serif] font-bold text-[#1C2A48] text-[clamp(28px,8vw,40px)] leading-[1.15]">
//             Building Responsibly for the Long Term
//           </h2>

//           <p className="m-0 mb-8 text-[15px] text-[#6B6B63] leading-[1.6]">
//             Sustainability is integrated into every stage of development—from
//             resource-efficient design and infrastructure planning to responsible
//             operations and governance.
//           </p>

//           {/* Accordion Container */}
//           <div className="flex flex-col gap-4">
//             {FEATURES.map((feature, i) => {
//               const isOpen = openAccordion === i;
//               const card = CARDS[i];

//               return (
//                 <div
//                   key={feature.title}
//                   className="rounded-[18px] bg-white border border-[#1C2A48]/10 overflow-hidden shadow-sm transition-all"
//                 >
//                   {/* Accordion Header */}
//                   <button
//                     onClick={() => selectAccordion(i)}
//                     className="w-full p-5 flex items-center justify-between text-left focus:outline-none bg-white"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 flex items-center justify-center shrink-0">
//                         {feature.icon}
//                       </div>
//                       <h3 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[18px] text-[#1C2A48]">
//                         {feature.title}
//                       </h3>
//                     </div>
//                     <ChevronDown
//                       className={`w-5 h-5 text-[#1C2A48] transition-transform duration-300 ${
//                         isOpen ? "rotate-180" : "rotate-0"
//                       }`}
//                     />
//                   </button>

//                   {/* Accordion Content */}
//                   <AnimatePresence initial={false}>
//                     {isOpen && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                         className="overflow-hidden"
//                       >
//                         <div className="px-5 pb-5 pt-1 flex flex-col gap-4">
//                           {card && (
//                             <div className="w-full h-[280px] rounded-[14px] overflow-hidden shadow-inner">
//                               <img
//                                 src={card.img}
//                                 alt={card.label}
//                                 className="w-full h-full object-cover block"
//                               />
//                             </div>
//                           )}
//                           <p className="m-0 text-[14px] leading-[1.6] text-[#6B6B63]">
//                             {feature.desc}
//                           </p>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  useMotionValueEvent,
  useMotionValue,
  animate,
  motion,
  AnimatePresence,
} from "framer-motion";

type CardItem = {
  img: string;
  label: string;
  tag: string;
};

type FeatureItem = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const SVG = ({ src, className }: { src: string; className?: string }) => {
  return <img src={src} className={className} alt="" />;
};

const FEATURES: FeatureItem[] = [
  {
    title: "Environment",
    desc: "Designed to reduce environmental impact through energy-efficient Infrastructure, resource conservation, and sustainable development practices.",
    icon: <SVG src="/home/Asset/leaf.svg" className="scale-130" />,
  },
  {
    title: "Social",
    desc: "Creating safer workplaces, stronger communities, and better experiences for occupiers, employees, partners, and stakeholders.",
    icon: <SVG src="/home/Asset/people.svg" className="scale-130" />,
  },
  {
    title: "Governance",
    desc: "Driven by transparency, accountability, and institutional-grade processes that support responsible long-term growth.",
    icon: <SVG src="/home/Asset/leaf.svg" className="scale-130" />,
  },
];

const DESKTOP_BREAKPOINT = 900;
const THUMB_SCALE = 0.4545;

const TAB_CLICK_TRANSITION = {
  duration: 0.9,
  ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
};

function getCardTransform(
  cardIndex: number,
  activeIndex: number,
  progressInSegment: number,
  totalCards: number,
) {
  let transform = "";
  let transformOrigin = "left bottom";

  // CASE 1: Past cards
  if (cardIndex < activeIndex) {
    transform = `translate3d(20vw, 0px, 0) scale(0)`;
    transformOrigin = "center top";
  }
  // CASE 2: Active card
  else if (cardIndex === activeIndex) {
    if (activeIndex === totalCards - 1) {
      transform = `translate3d(20vw, 0px, 0) scale(1)`;
      transformOrigin = "right bottom";
    } else {
      const currentScale = 1 - progressInSegment;
      transform = `translate3d(20vw, 0px, 0) scale(${currentScale})`;
      transformOrigin = "right bottom";
    }
  }
  // CASE 3: Upcoming card
  else if (cardIndex === activeIndex + 1) {
    const currentScale = THUMB_SCALE + (1 - THUMB_SCALE) * progressInSegment;
    const currentLeft = 1 + (20 - 1) * Math.pow(progressInSegment, 1.2);

    transform = `translate3d(${currentLeft}vw, 0px, 0) scale(${currentScale})`;
    transformOrigin = "left bottom";
  }
  // CASE 4: Next waiting card
  else if (cardIndex === activeIndex + 2) {
    const currentScale = THUMB_SCALE * progressInSegment;
    transform = `translate3d(1vw, 0px, 0) scale(${currentScale})`;
    transformOrigin = "left bottom";
  }
  // CASE 5: Rest of stack
  else {
    transform = `translate3d(1vw, 0px, 0) scale(0)`;
    transformOrigin = "left bottom";
  }

  return {
    transform,
    transformOrigin,
    zIndex: String(totalCards + 10 - cardIndex),
  };
}

export default function AssetShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [isWide, setIsWide] = useState(true);

  // Accordion state: Always keep one item open (default index 0)
  const [openAccordion, setOpenAccordion] = useState<number>(0);

  const CARDS: CardItem[] = [
    {
      img: "/home/Asset/asset1.jpg",
      label: "Industrial Parks",
      tag: "FLAGSHIP",
    },
    {
      img: "/home/Asset/asset2.jpg",
      label: "Logistics Hubs",
      tag: "OPERATIONS",
    },
    {
      img: "/home/governance.jpg",
      label: "Grade A Warehouses",
      tag: "PREMIUM",
    },
  ];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const update = (width: number) => {
      setIsWide(width >= DESKTOP_BREAKPOINT);
    };

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      update(entry.contentRect.width);
    });

    ro.observe(root);
    update(root.getBoundingClientRect().width);

    return () => ro.disconnect();
  }, []);

  const seg = useMotionValue(0);

  const applyTransforms = useCallback(
    (segValue: number) => {
      const activeIndex = Math.min(
        CARDS.length - 1,
        Math.max(0, Math.floor(segValue)),
      );
      const progressInSegment = segValue - activeIndex;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        const styles = getCardTransform(
          i,
          activeIndex,
          progressInSegment,
          CARDS.length,
        );

        el.style.transform = styles.transform;
        el.style.transformOrigin = styles.transformOrigin;
        el.style.zIndex = styles.zIndex;
      });
    },
    [CARDS.length],
  );

  useMotionValueEvent(seg, "change", (latest) => {
    if (!isWide) return;
    applyTransforms(latest);
  });

  useEffect(() => {
    if (!isWide) return;

    seg.set(0);
    applyTransforms(0);
    setActive(0);
  }, [isWide, seg, applyTransforms]);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(CARDS.length - 1, index));
      setActive(clamped);
      animate(seg, clamped, TAB_CLICK_TRANSITION);
    },
    [seg, CARDS.length],
  );

  const selectAccordion = (index: number) => {
    setOpenAccordion(index);
  };

  // Auto slide effect (Loops every 10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isWide) {
        const next = (active + 1) % CARDS.length;
        goTo(next);
      } else {
        setOpenAccordion((prev) => (prev + 1) % FEATURES.length);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isWide, active, openAccordion, goTo, CARDS.length]);

  return (
    <section ref={rootRef} className="relative w-full bg-[#FBF2E8]">
      {/* ── DESKTOP: click-driven tabs (no scroll dependency) ── */}
      {isWide && (
        <div className="h-screen w-full flex flex-col xl:py-12 py-12 justify-between overflow-hidden">
          {/* CONTENT TOP */}
          <div className="1920:mt-28 w-full flex fix flex-col gap-3 shrink-0">
            <h2 className="section-title m-0 font-[family-name:var(--font-sora),sans-serif] font-bold text-[clamp(28px,3.2vw,46px)] leading-[1.15] tracking-[-0.015em]">
              Building <br /> Responsibly for <br /> the Long Term
            </h2>
            <p className="max-w-[340px]">
              Sustainability is integrated into every stage of development—from
              resource-efficient design and Infrastructure planning to
              responsible operations and governance.
            </p>
          </div>

          {/* CONTENT BOTTOM */}
          <div className="w-full flex flex-row items-end justify-between flex-1 min-h-0 gap-[4vw]">
            {/* CENTER COLUMN */}
            <div className="mlcont mlcont-1900 flex-1 h-[70vh] min-[1900px]:h-[55vh] min-w-0 z-30 pointer-events-none overflow-visible grid grid-cols-1 grid-rows-1">
              {CARDS.map((card, i) => (
                <div
                  key={card.label}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="col-start-1 lg:h-[80%] xl:h-[100%] row-start-1 ml-26 self-end justify-self-start overflow-hidden will-change-transform max-w-full relative"
                  style={{
                    width: "25vw",

                    borderRadius: "clamp(12px,1.3vw,20px)",
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.label}
                    className="w-full h-full object-cover block"
                    draggable={false}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN — interactive tabs */}
            <div className="mrcont w-[30%] 1920:w-[25%] shrink-0 flex flex-col justify-end gap-2 z-50">
              {FEATURES.map((feature, i) => {
                const on = i === active;

                return (
                  <div
                    key={feature.title}
                    role="button"
                    tabIndex={0}
                    aria-pressed={on}
                    aria-label={`Show ${feature.title}`}
                    onClick={() => goTo(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        goTo(i);
                      }
                    }}
                    className={`rounded-[clamp(12px,1.2vw,18px)] transition-all duration-500 ease-out cursor-pointer hover:bg-white ${
                      on
                        ? "bg-white py-[30px] px-[20px] my-[6px] shadow-[0_20px_50px_-24px_rgba(28,42,72,0.16)]"
                        : "bg-transparent xl:py-[20px] px-[20px] my-[10px] shadow-none"
                    }`}
                  >
                    <div>
                      <div className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)] mb-5 flex items-center justify-center">
                        {feature.icon}
                      </div>

                      <h3 className="m-0 mb-1 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(13px,1.1vw,17px)] text-[#1C2A48] leading-tight">
                        {feature.title}
                      </h3>

                      <p className="m-0 text-[clamp(11px,0.8vw,12.5px)] leading-[1.55] text-[#6B6B63]">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE: Accordion (Always 1 open) ── */}
      {!isWide && (
        <div className="px-[clamp(20px,5vw,36px)] py-[clamp(40px,8vw,60px)]">
          {/* <div className="flex items-center gap-2.25 mb-4">
            <span className="font-[family-name:var(--font-sora),sans-serif] text-[#8C8C84] font-semibold text-[13px]">
              //
            </span>
            <span className="font-[family-name:var(--font-sora),sans-serif] text-[#8C8C84] font-medium text-[11px] tracking-[0.18em] uppercase">
              Building Responsibly
            </span>
          </div> */}

          <h2 className="m-0 mb-3 font-[family-name:var(--font-sora),sans-serif] font-bold text-[#1C2A48] text-[clamp(28px,8vw,40px)] leading-[1.15]">
            Building Responsibly for the Long Term
          </h2>

          <p className="m-0 mb-8 text-[15px] text-[#6B6B63] leading-[1.6]">
            Sustainability is integrated into every stage of development—from
            resource-efficient design and Infrastructure planning to responsible
            operations and governance.
          </p>

          {/* Accordion Container */}
          <div className="flex flex-col gap-4">
            {FEATURES.map((feature, i) => {
              const isOpen = openAccordion === i;
              const card = CARDS[i];

              return (
                <div
                  key={feature.title}
                  className="rounded-[18px] bg-white border border-[#1C2A48]/10 overflow-hidden shadow-sm transition-all"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => selectAccordion(i)}
                    className="w-full p-5 flex items-center justify-between text-left focus:outline-none bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center shrink-0">
                        {feature.icon}
                      </div>
                      <h3 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[18px] text-[#1C2A48]">
                        {feature.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#1C2A48] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
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
                          {card && (
                            <div className="w-full h-[280px] rounded-[14px] overflow-hidden shadow-inner">
                              <img
                                src={card.img}
                                alt={card.label}
                                className="w-full h-full object-cover block"
                              />
                            </div>
                          )}
                          <p className="m-0 text-[14px] leading-[1.6] text-[#6B6B63]">
                            {feature.desc}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
