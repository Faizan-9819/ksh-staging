// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { LayoutGrid, Users, Layers } from "lucide-react";
// import { useMotionValueEvent, useScroll } from "framer-motion";

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

// const CARDS: CardItem[] = [
//   {
//     img: "/home/Asset/asset1.jpg",
//     label: "Industrial Parks",
//     tag: "FLAGSHIP",
//   },
//   {
//     img: "/home/Asset/asset2.jpg",
//     label: "Logistics Hubs",
//     tag: "OPERATIONS",
//   },
//   {
//     img: "/home/Asset/asset3.jpg",
//     label: "Grade A Warehouses",
//     tag: "PREMIUM",
//   },
// ];
// const SVG = ({ src, className }) => {
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

// function clamp(value: number, min = 0, max = 1) {
//   return Math.max(min, Math.min(max, value));
// }

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
//     if (activeIndex === totalCards - 1 && cardIndex === activeIndex - 1) {
//       transform = `translate3d(1vw, 0px, 0) scale(${THUMB_SCALE})`;
//       transformOrigin = "left bottom";
//     } else {
//       transform = `translate3d(20vw, 0px, 0) scale(0)`;
//       transformOrigin = "center top";
//     }
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

//   const { scrollYProgress } = useScroll({
//     target: rootRef,
//     offset: ["start start", "end end"],
//   });

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

//   const maxSegments = useMemo(() => Math.max(CARDS.length - 1, 1), []);

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     if (!isWide) return;

//     const progress = clamp(latest);
//     const seg = progress * maxSegments;
//     const activeIndex = Math.floor(seg);
//     const progressInSegment = seg - activeIndex;

//     cardRefs.current.forEach((el, i) => {
//       if (!el) return;

//       const styles = getCardTransform(
//         i,
//         activeIndex,
//         progressInSegment,
//         CARDS.length,
//       );

//       el.style.transform = styles.transform;
//       el.style.transformOrigin = styles.transformOrigin;
//       el.style.zIndex = styles.zIndex;
//     });

//     setActive(Math.min(FEATURES.length - 1, Math.round(seg)));
//   });

//   useEffect(() => {
//     if (!isWide) return;

//     const activeIndex = 0;
//     const progressInSegment = 0;

//     cardRefs.current.forEach((el, i) => {
//       if (!el) return;

//       const styles = getCardTransform(
//         i,
//         activeIndex,
//         progressInSegment,
//         CARDS.length,
//       );

//       el.style.transform = styles.transform;
//       el.style.transformOrigin = styles.transformOrigin;
//       el.style.zIndex = styles.zIndex;
//     });

//     setActive(0);
//   }, [isWide]);

//   return (
//     <section ref={rootRef} className="relative w-full bg-[#F5EDE0]">
//       {/* ── DESKTOP: sticky scrub ── */}
//       {isWide && (
//         <div className="h-[400vh]">
//           <div className="sticky top-0 h-screen w-full flex flex-col lg:py-12 py-12 justify-between overflow-hidden">
//             {/* CONTENT TOP */}
//             <div className="w-full flex fix flex-col gap-3 shrink-0">
//               <h2 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-bold text-[#C65C23] text-[clamp(28px,3.2vw,46px)] leading-[1.15] tracking-[-0.015em]">
//                 Building <br /> Responsibly for <br /> the Long Term
//               </h2>
//               <p className="max-w-[400px]">
//                 Sustainability is integrated into every stage of
//                 development—from resource-efficient design and infrastructure
//                 planning to responsible operations and governance.
//               </p>
//             </div>

//             {/* CONTENT BOTTOM */}
//             <div className="w-full flex flex-row items-end justify-between flex-1 min-h-0 gap-[4vw]">
//               {/* CENTER COLUMN */}
//               <div className="mlcont flex-1 h-[70vh] min-w-0 z-30 pointer-events-none overflow-hidden grid grid-cols-1 grid-rows-1">
//                 {CARDS.map((card, i) => (
//                   <div
//                     key={card.label}
//                     ref={(el) => {
//                       cardRefs.current[i] = el;
//                     }}
//                     className="col-start-1 row-start-1 self-end justify-self-start overflow-hidden will-change-transform max-w-full relative"
//                     style={{
//                       width: "32vw",
//                       height: "70vh",
//                       borderRadius: "clamp(12px,1.3vw,20px)",
//                       boxShadow: "0 28px 64px -28px rgba(20,18,10,0.42)",
//                     }}
//                   >
//                     <img
//                       src={card.img}
//                       alt={card.label}
//                       className="w-full h-full object-cover block"
//                       draggable={false}
//                     />

//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

//                     <div className="absolute bottom-6 left-6 pointer-events-auto">
//                       <span className="text-[clamp(9px,0.7vw,11px)] font-semibold tracking-[0.16em] text-white/75 uppercase">
//                         {card.tag}
//                       </span>
//                       <div className="text-[clamp(13px,1vw,18px)] font-semibold text-white leading-tight mt-1">
//                         {card.label}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* RIGHT COLUMN */}
//               <div className="mrcont w-[30%] shrink-0 flex flex-col justify-end gap-2 z-50">
//                 {FEATURES.map((feature, i) => {
//                   const on = i === active;

//                   return (
//                     <div
//                       key={feature.title}
//                       className="rounded-[clamp(12px,1.2vw,18px)] transition-all duration-500 ease-out"
//                       style={{
//                         padding: on ? "30px 20px" : "20px 20px",
//                         marginTop: on ? "6px" : "10px",
//                         marginBottom: on ? "6px" : "10px",
//                         background: on ? "#FFFFFF" : "transparent",
//                       }}
//                     >
//                       <div>
//                         <div className="w-[clamp(24px,2vw,32px)] mb-5 h-[clamp(24px,2vw,32px)] mb-2 flex items-center justify-center">
//                           {feature.icon}
//                         </div>

//                         <h3 className="m-0 mb-1 text-[clamp(13px,1.1vw,20px)] text-[#212121] leading-normal">
//                           {feature.title}
//                         </h3>

//                         <p className="m-0 text-[14px] leading-[140%] text-[#4A4A4A]">
//                           {feature.desc}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── MOBILE: stacked ── */}
//       {!isWide && (
//         <div className="px-[clamp(20px,5vw,36px)] py-[clamp(40px,8vw,60px)]">
//           <div className="flex items-center gap-2.25 mb-4">
//             <span className="text-[#8C8C84] font-semibold text-[13px]">//</span>
//             <span className="text-[#8C8C84] font-medium text-[11px] tracking-[0.18em] uppercase">
//               Our Assets
//             </span>
//           </div>

//           <h2 className="m-0 mb-3 font-[family-name:var(--font-sora),sans-serif] font-bold text-[#1C2A48] text-[clamp(30px,9vw,46px)] leading-[1.1]">
//             Building documentation
//           </h2>

//           <p className="m-0 mb-8 text-[15px] text-[#6B6B63] leading-[1.6] max-w-95">
//             Architecture focused on simplicity, balance, and timeless design
//             excellence.
//           </p>

//           <div className="flex flex-col gap-8">
//             {CARDS.map((card, i) => (
//               <div key={card.label}>
//                 <div className="w-full aspect-4/3 rounded-[18px] overflow-hidden mb-5 shadow-[0_16px_40px_-20px_rgba(20,18,10,0.3)]">
//                   <img
//                     src={card.img}
//                     alt={card.label}
//                     className="w-full h-full object-cover block"
//                   />
//                 </div>

//                 {FEATURES[i] && (
//                   <>
//                     <div className="w-8 h-8 mb-3 flex items-center justify-center">
//                       {FEATURES[i].icon}
//                     </div>

//                     <h3 className="m-0 mb-2 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[19px] text-[#1C2A48]">
//                       {FEATURES[i].title}
//                     </h3>

//                     <p className="m-0 text-[14px] leading-[1.6] text-[#6B6B63]">
//                       {FEATURES[i].desc}
//                     </p>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutGrid, Users, Layers } from "lucide-react";
import { useMotionValueEvent, useScroll } from "framer-motion";

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
    img: "/home/Asset/asset3.jpg",
    label: "Grade A Warehouses",
    tag: "PREMIUM",
  },
];
const SVG = ({ src, className }) => {
  return <img src={src} className={className} alt="" />;
};
const FEATURES: FeatureItem[] = [
  {
    title: "Environment",
    desc: "Designed to reduce environmental impact through energy-efficient infrastructure, resource conservation, and sustainable development practices.",
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

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

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
    if (activeIndex === totalCards - 1 && cardIndex === activeIndex - 1) {
      transform = `translate3d(1vw, 0px, 0) scale(${THUMB_SCALE})`;
      transformOrigin = "left bottom";
    } else {
      transform = `translate3d(20vw, 0px, 0) scale(0)`;
      transformOrigin = "center top";
    }
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

export default function AssetShowcase2() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [isWide, setIsWide] = useState(true);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

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

  const maxSegments = useMemo(() => Math.max(CARDS.length - 1, 1), []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isWide) return;

    const progress = clamp(latest);
    const seg = progress * maxSegments;
    const activeIndex = Math.floor(seg);
    const progressInSegment = seg - activeIndex;

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

    setActive(Math.min(FEATURES.length - 1, Math.round(seg)));
  });

  useEffect(() => {
    if (!isWide) return;

    const activeIndex = 0;
    const progressInSegment = 0;

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

    setActive(0);
  }, [isWide]);

  return (
    <section ref={rootRef} className="relative w-full bg-[#F5EDE0]">
      {/* ── DESKTOP: sticky scrub ── */}
      {isWide && (
        <div className="h-[400vh]">
          <div className="sticky top-0 h-screen w-full flex flex-col lg:py-12 py-12 justify-between overflow-hidden">
            {/* CONTENT TOP */}
            <div className="w-full flex fix flex-col gap-3 shrink-0">
              <h2 className="section-title m-0 font-[family-name:var(--font-sora),sans-serif] font-bold text-[clamp(28px,3.2vw,46px)] leading-[1.15] tracking-[-0.015em]">
                Building <br /> Responsibly for <br /> the Long Term
              </h2>
              <p className="max-w-[400px]">
                Sustainability is integrated into every stage of
                development—from resource-efficient design and infrastructure
                planning to responsible operations and governance.
              </p>
            </div>

            {/* CONTENT BOTTOM */}
            <div className="w-full flex flex-row items-end gap-3 flex-1 min-h-0">
              {/* CENTER COLUMN */}
              <div className="mlcont flex-1 h-fit min-w-0 z-30 pointer-events-none overflow-hidden grid grid-cols-1 grid-rows-1">
                {CARDS.map((card, i) => (
                  <div
                    key={card.label}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="col-start-1 ml-20 row-start-1 self-end justify-self-start overflow-hidden will-change-transform max-w-full relative"
                    style={{
                      width: i === 1 ? "55%" : "50%",
                      height: i === 1 ? "85vh" : "80vh",
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

              {/* RIGHT COLUMN */}
              <div className="mrcont w-[30%] shrink-0 flex flex-col justify-end gap-2 z-50">
                {FEATURES.map((feature, i) => {
                  const on = i === active;

                  return (
                    <div
                      key={feature.title}
                      className="rounded-[clamp(12px,1.2vw,18px)] transition-all duration-500 ease-out"
                      style={{
                        padding: on ? "30px 20px" : "20px 20px",
                        marginTop: on ? "6px" : "10px",
                        marginBottom: on ? "6px" : "10px",
                        background: on ? "#FFFFFF" : "transparent",
                      }}
                    >
                      <div>
                        <div className="w-[clamp(24px,2vw,32px)] mb-5 h-[clamp(24px,2vw,32px)] mb-2 flex items-center justify-center">
                          {feature.icon}
                        </div>

                        <h3 className="m-0 mb-1 text-[clamp(13px,1.1vw,20px)] text-[#212121] leading-normal">
                          {feature.title}
                        </h3>

                        <p className="m-0 text-[14px] leading-[140%] text-[#4A4A4A]">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE: stacked ── */}
      {!isWide && (
        <div className="px-[clamp(20px,5vw,36px)] py-[clamp(40px,8vw,60px)]">
          <div className="flex items-center gap-2.25 mb-4">
            <span className="text-[#8C8C84] font-semibold text-[13px]">//</span>
            <span className="text-[#8C8C84] font-medium text-[11px] tracking-[0.18em] uppercase">
              Our Assets
            </span>
          </div>

          <h2 className="m-0 mb-3 font-[family-name:var(--font-sora),sans-serif] font-bold text-[#1C2A48] text-[clamp(30px,9vw,46px)] leading-[1.1]">
            Building documentation
          </h2>

          <p className="m-0 mb-8 text-[15px] text-[#6B6B63] leading-[1.6] max-w-95">
            Architecture focused on simplicity, balance, and timeless design
            excellence.
          </p>

          <div className="flex flex-col gap-8">
            {CARDS.map((card, i) => (
              <div key={card.label}>
                <div className="w-full aspect-4/3 rounded-[18px] overflow-hidden mb-5 shadow-[0_16px_40px_-20px_rgba(20,18,10,0.3)]">
                  <img
                    src={card.img}
                    alt={card.label}
                    className="w-full h-full object-cover block"
                  />
                </div>

                {FEATURES[i] && (
                  <>
                    <div className="w-8 h-8 mb-3 flex items-center justify-center">
                      {FEATURES[i].icon}
                    </div>

                    <h3 className="m-0 mb-2 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[19px] text-[#1C2A48]">
                      {FEATURES[i].title}
                    </h3>

                    <p className="m-0 text-[14px] leading-[1.6] text-[#6B6B63]">
                      {FEATURES[i].desc}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
