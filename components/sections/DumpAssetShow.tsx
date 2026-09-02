// "use client";

// import { useState, useEffect, useRef } from "react";
// import { LayoutGrid, Users, Layers } from "lucide-react";

// const CARDS = [
//   { img: "/services/service1.jpg", label: "Industrial Parks", tag: "FLAGSHIP" },
//   { img: "/services/service2.jpg", label: "Logistics Hubs", tag: "OPERATIONS" },
//   {
//     img: "/services/service3.jpg",
//     label: "Grade A Warehouses",
//     tag: "PREMIUM",
//   },
//   {
//     img: "/services/service4.jpg",
//     label: "Green Development",
//     tag: "SUSTAINABLE",
//   },
// ];

// const FEATURES = [
//   {
//     title: "Interior design",
//     desc: "Creating modern architecture focused on clarity, purpose, and lasting impact.",
//     icon: <LayoutGrid className="w-5 h-5 text-[#222B3D]" strokeWidth={1.6} />,
//   },
//   {
//     title: "Consultation",
//     desc: "Innovative architecture driven by creativity, precision, and thoughtful design.",
//     icon: <Users className="w-5 h-5 text-[#222B3D]" strokeWidth={1.6} />,
//   },
//   {
//     title: "3D Modeling",
//     desc: "Thoughtful architecture creating meaningful environments with clarity and purpose.",
//     icon: <Layers className="w-5 h-5 text-[#222B3D]" strokeWidth={1.6} />,
//   },
// ];

// export default function AssetShowcase() {
//   const rootRef = useRef<HTMLElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const rafRef = useRef(0);
//   const [active, setActive] = useState(0);
//   const [isWide, setIsWide] = useState(true);

//   // Responsive break gate
//   useEffect(() => {
//     const ro = new ResizeObserver((e) =>
//       setIsWide(e[0].contentRect.width >= 900),
//     );
//     if (rootRef.current) {
//       ro.observe(rootRef.current);
//       setIsWide(rootRef.current.getBoundingClientRect().width >= 900);
//     }
//     return () => ro.disconnect();
//   }, []);

//   // Frame scroll loop handler
//   useEffect(() => {
//     const tick = () => {
//       rafRef.current = 0;
//       const root = rootRef.current;
//       if (!root || !isWide) return;

//       const vh = window.innerHeight || 800;
//       const rect = root.getBoundingClientRect();
//       const total = root.offsetHeight - vh;
//       const progress =
//         total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;

//       // Calculate continuous progress frame through segments (0 to CARDS.length - 1)
//       const seg = progress * (CARDS.length - 1);
//       const index = Math.floor(seg);
//       const progressInSegment = seg - index; // Float value 0 -> 1 within the current step

//       // Scale calculations based on uniform base height (77vh)
//       const thumbScale = 0.4545;

//       cardRefs.current.forEach((el, i) => {
//         if (!el) return;

//         let transform = "";

//         // CASE 1: Past cards that scaled out completely from the top baseline
//         if (i < index) {
//           // If we are on the last frame, keep the second-to-last card visible as a small thumbnail
//           if (index === CARDS.length - 1 && i === index - 1) {
//             transform = `translate3d(2vw, 12vh, 0) scale(${thumbScale})`;
//             el.style.transformOrigin = "left bottom";
//           } else {
//             transform = `translate3d(30vw, 12vh, 0) scale(0)`;
//             el.style.transformOrigin = "center top";
//           }
//         }
//         // CASE 2: Currently Active Card (Scaling down from Large to 0 anchored cleanly to Bottom Right)
//         else if (i === index) {
//           if (index === CARDS.length - 1) {
//             transform = `translate3d(30vw, 12vh, 0) scale(1)`;
//             el.style.transformOrigin = "right bottom";
//           } else {
//             const currentScale = 1 - progressInSegment;
//             transform = `translate3d(30vw, 12vh, 0) scale(${currentScale})`;
//             el.style.transformOrigin = "right bottom";
//           }
//         }
//         // CASE 3: The Upcoming Card (Scaling up from Small size to Large size keeping baseline locked)
//         else if (i === index + 1) {
//           const currentScale =
//             thumbScale + (1 - thumbScale) * progressInSegment;

//           // Enhanced tracking formula to maintain a visually constant gap during scale shifts
//           const currentLeft = 2 + (30 - 2) * Math.pow(progressInSegment, 1.2);

//           transform = `translate3d(${currentLeft}vw, 12vh, 0) scale(${currentScale})`;
//           el.style.transformOrigin = "left bottom";
//         }
//         // CASE 4: The Next Waiting Card (Scaling from absolute 0 up to Small thumbnail size)
//         else if (i === index + 2) {
//           const currentScale = 0 + thumbScale * progressInSegment;

//           transform = `translate3d(2vw, 12vh, 0) scale(${currentScale})`;
//           el.style.transformOrigin = "left bottom";
//         }
//         // CASE 5: All subsequent elements hidden deep in stack queue
//         else {
//           transform = `translate3d(2vw, 12vh, 0) scale(0)`;
//           el.style.transformOrigin = "left bottom";
//         }

//         el.style.transform = transform;
//         el.style.zIndex = String(CARDS.length + 10 - i);
//       });

//       setActive(Math.min(FEATURES.length - 1, Math.round(seg)));
//     };

//     const onScroll = () => {
//       if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll, { passive: true });
//     requestAnimationFrame(tick);

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [isWide]);

//   return (
//     <section ref={rootRef} className="relative w-full bg-[#F5EDE0]">
//       {/* ── DESKTOP: sticky scrub ── */}
//       {isWide && (
//         <div className="h-[400vh]">
//           <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
//             <div ref={containerRef} className="relative w-full h-full">
//               {/* LEFT — static copy */}
//               <div className="absolute left-0 plcont top-[9vh] w-[26vw] z-50 flex flex-col gap-[clamp(12px,1.2vw,18px)]">
//                 <div className="flex items-center gap-2.25">
//                   <span className="text-[#8C8C84] font-semibold text-[13px]">
//                     //
//                   </span>
//                   <span className="text-[#8C8C84] font-medium text-[11px] tracking-[0.18em] uppercase">
//                     Our Assets
//                   </span>
//                 </div>

//                 <h2 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-bold text-[#1C2A48] text-[clamp(26px,3vw,46px)] leading-[1.1] tracking-[-0.015em]">
//                   Building
//                   <br />
//                   documentation
//                 </h2>

//                 <p className="m-0 text-[clamp(12px,1vw,15px)] text-[#6B6B63] leading-[1.6] max-w-60">
//                   Architecture focused on simplicity, balance, and timeless
//                   design excellence.
//                 </p>

//                 <button className="w-fit flex items-center gap-2 bg-[#1C2A48] text-white text-[clamp(11px,0.85vw,13px)] font-medium px-[clamp(14px,1.3vw,20px)] py-[clamp(9px,0.85vw,13px)] rounded-full hover:bg-[#C75D21] transition-colors duration-300">
//                   Learn more
//                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//                     <path
//                       d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
//                       stroke="currentColor"
//                       strokeWidth="1.4"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* CARDS CONTAINER — Normalized baseline tracking */}
//               <div className="absolute inset-0 z-30 pointer-events-none mlcont w-fit">
//                 {CARDS.map((c, i) => (
//                   <div
//                     key={c.label}
//                     ref={(el) => {
//                       cardRefs.current[i] = el;
//                     }}
//                     className="absolute top-0 left-0 overflow-hidden will-change-transform"
//                     style={{
//                       width: "36vw",
//                       height: "77vh",
//                       borderRadius: "clamp(12px,1.3vw,20px)",
//                       boxShadow: "0 28px 64px -28px rgba(20,18,10,0.42)",
//                     }}
//                   >
//                     <img
//                       src={c.img}
//                       alt={c.label}
//                       className="w-full h-full object-cover block"
//                       draggable={false}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//                     <div className="absolute bottom-6 left-6">
//                       <span className="text-[clamp(9px,0.7vw,11px)] font-semibold tracking-[0.16em] text-white/75 uppercase">
//                         {c.tag}
//                       </span>
//                       <div className="text-[clamp(13px,1vw,18px)] font-semibold text-white leading-tight mt-1">
//                         {c.label}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* RIGHT — feature list */}
//               <div className="absolute right-0 mrcont top-[10vh] w-[28vw] z-50 flex flex-col pb-[12vh]">
//                 {FEATURES.map((f, i) => {
//                   const on = i === active;
//                   return (
//                     <div
//                       key={f.title}
//                       className="rounded-[clamp(12px,1.2vw,18px)] transition-all duration-500 ease-out"
//                       style={{
//                         padding: on
//                           ? "clamp(16px,1.8vw,24px)"
//                           : "0 clamp(16px,1.8vw,24px)",
//                         marginTop: on ? "12px" : "18px",
//                         marginBottom: on ? "12px" : "18px",
//                         background: on ? "#FFFFFF" : "transparent",
//                         boxShadow: on
//                           ? "0 20px 50px -24px rgba(28,42,72,0.20)"
//                           : "none",
//                       }}
//                     >
//                       <div style={{ transform: "none" }}>
//                         <div className="w-[clamp(28px,2.2vw,38px)] h-[clamp(28px,2.2vw,38px)] mb-[clamp(8px,0.8vw,12px)] flex items-center justify-center">
//                           {f.icon}
//                         </div>
//                         <h3 className="m-0 mb-[clamp(5px,0.5vw,8px)] font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(14px,1.3vw,19px)] text-[#1C2A48] leading-tight">
//                           {f.title}
//                         </h3>
//                         <p className="m-0 text-[clamp(11px,0.9vw,13px)] leading-[1.55] text-[#6B6B63] max-w-60">
//                           {f.desc}
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
//             {CARDS.map((c, i) => (
//               <div key={c.label}>
//                 <div className="w-full aspect-4/3 rounded-[18px] overflow-hidden mb-5 shadow-[0_16px_40px_-20px_rgba(20,18,10,0.3)]">
//                   <img
//                     src={c.img}
//                     alt={c.label}
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { LayoutGrid, Users, Layers } from "lucide-react";

// const CARDS = [
//   { img: "/services/service1.jpg", label: "Industrial Parks", tag: "FLAGSHIP" },
//   { img: "/services/service2.jpg", label: "Logistics Hubs", tag: "OPERATIONS" },
//   {
//     img: "/services/service3.jpg",
//     label: "Grade A Warehouses",
//     tag: "PREMIUM",
//   },
//   {
//     img: "/services/service4.jpg",
//     label: "Green Development",
//     tag: "SUSTAINABLE",
//   },
// ];

// const FEATURES = [
//   {
//     title: "Interior design",
//     desc: "Creating modern architecture focused on clarity, purpose, and lasting impact.",
//     icon: <LayoutGrid className="w-5 h-5 text-[#222B3D]" strokeWidth={1.6} />,
//   },
//   {
//     title: "Consultation",
//     desc: "Innovative architecture driven by creativity, precision, and thoughtful design.",
//     icon: <Users className="w-5 h-5 text-[#222B3D]" strokeWidth={1.6} />,
//   },
//   {
//     title: "3D Modeling",
//     desc: "Thoughtful architecture creating meaningful environments with clarity and purpose.",
//     icon: <Layers className="w-5 h-5 text-[#222B3D]" strokeWidth={1.6} />,
//   },
// ];

// export default function AssetShowcase() {
//   const rootRef = useRef<HTMLElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const rafRef = useRef(0);
//   const [active, setActive] = useState(0);
//   const [isWide, setIsWide] = useState(true);

//   // Responsive break gate
//   useEffect(() => {
//     const ro = new ResizeObserver((e) =>
//       setIsWide(e[0].contentRect.width >= 900),
//     );
//     if (rootRef.current) {
//       ro.observe(rootRef.current);
//       setIsWide(rootRef.current.getBoundingClientRect().width >= 900);
//     }
//     return () => ro.disconnect();
//   }, []);

//   // Frame scroll loop handler
//   useEffect(() => {
//     const tick = () => {
//       rafRef.current = 0;
//       const root = rootRef.current;
//       if (!root || !isWide) return;

//       const vh = window.innerHeight || 800;
//       const rect = root.getBoundingClientRect();
//       const total = root.offsetHeight - vh;
//       const progress =
//         total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;

//       // Calculate continuous progress frame through segments (0 to CARDS.length - 1)
//       const seg = progress * (CARDS.length - 1);
//       const index = Math.floor(seg);
//       const progressInSegment = seg - index; // Float value 0 -> 1 within the current step

//       // Scale calculations based on uniform base height (77vh)
//       const thumbScale = 0.4545;

//       cardRefs.current.forEach((el, i) => {
//         if (!el) return;

//         let transform = "";

//         // CASE 1: Past cards that scaled out completely from the top baseline
//         if (i < index) {
//           // If we are on the last frame, keep the second-to-last card visible as a small thumbnail
//           if (index === CARDS.length - 1 && i === index - 1) {
//             transform = `translate3d(2vw, 12vh, 0) scale(${thumbScale})`;
//             el.style.transformOrigin = "left bottom";
//           } else {
//             transform = `translate3d(30vw, 12vh, 0) scale(0)`;
//             el.style.transformOrigin = "center top";
//           }
//         }
//         // CASE 2: Currently Active Card (Scaling down from Large to 0 anchored cleanly to Bottom Right)
//         else if (i === index) {
//           if (index === CARDS.length - 1) {
//             transform = `translate3d(30vw, 12vh, 0) scale(1)`;
//             el.style.transformOrigin = "right bottom";
//           } else {
//             const currentScale = 1 - progressInSegment;
//             transform = `translate3d(30vw, 12vh, 0) scale(${currentScale})`;
//             el.style.transformOrigin = "right bottom";
//           }
//         }
//         // CASE 3: The Upcoming Card (Scaling up from Small size to Large size keeping baseline locked)
//         else if (i === index + 1) {
//           const currentScale =
//             thumbScale + (1 - thumbScale) * progressInSegment;

//           // Enhanced tracking formula to maintain a visually constant gap during scale shifts
//           const currentLeft = 2 + (30 - 2) * Math.pow(progressInSegment, 1.2);

//           transform = `translate3d(${currentLeft}vw, 12vh, 0) scale(${currentScale})`;
//           el.style.transformOrigin = "left bottom";
//         }
//         // CASE 4: The Next Waiting Card (Scaling from absolute 0 up to Small thumbnail size)
//         else if (i === index + 2) {
//           const currentScale = 0 + thumbScale * progressInSegment;

//           transform = `translate3d(2vw, 12vh, 0) scale(${currentScale})`;
//           el.style.transformOrigin = "left bottom";
//         }
//         // CASE 5: All subsequent elements hidden deep in stack queue
//         else {
//           transform = `translate3d(2vw, 12vh, 0) scale(0)`;
//           el.style.transformOrigin = "left bottom";
//         }

//         el.style.transform = transform;
//         el.style.zIndex = String(CARDS.length + 10 - i);
//       });

//       setActive(Math.min(FEATURES.length - 1, Math.round(seg)));
//     };

//     const onScroll = () => {
//       if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll, { passive: true });
//     requestAnimationFrame(tick);

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [isWide]);

//   return (
//     <section ref={rootRef} className="relative w-full bg-[#F5EDE0]">
//       {/* ── DESKTOP: sticky scrub ── */}
//       {isWide && (
//         <div className="h-[400vh]">
//           <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
//             {/*
//               Three-column flex row that mirrors the original absolute layout:
//                 col-1 (left copy)  → w-[26vw]  — was: absolute left-0 w-[26vw]
//                 col-2 (cards)      → flex-1     — was: absolute inset-0 (fills the gap)
//                 col-3 (features)   → w-[28vw]  — was: absolute right-0 w-[28vw]

//               The cards column keeps `position:relative` so the card divs can
//               still be positioned with translate3d from top-0/left-0 exactly as
//               before — the animation math is completely untouched.
//             */}
//             <div
//               ref={containerRef}
//               className="flex flex-col items-stretch w-full h-full"
//             >
//               {/* LEFT — static copy */}
//               <div className="plcont shrink-0 flex flex-col justify-start gap-[clamp(12px,1.2vw,18px)] pt-[9vh] z-50">
//                 <div className="flex items-center gap-2.25">
//                   <span className="text-[#8C8C84] font-semibold text-[13px]">
//                     //
//                   </span>
//                   <span className="text-[#8C8C84] font-medium text-[11px] tracking-[0.18em] uppercase">
//                     Our Assets
//                   </span>
//                 </div>

//                 <h2 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-bold text-[#1C2A48] text-[clamp(26px,3vw,46px)] leading-[1.1] tracking-[-0.015em]">
//                   Building
//                   <br />
//                   documentation
//                 </h2>

//                 <p className="m-0 text-[clamp(12px,1vw,15px)] text-[#6B6B63] leading-[1.6] max-w-60">
//                   Architecture focused on simplicity, balance, and timeless
//                   design excellence.
//                 </p>

//                 <button className="w-fit flex items-center gap-2 bg-[#1C2A48] text-white text-[clamp(11px,0.85vw,13px)] font-medium px-[clamp(14px,1.3vw,20px)] py-[clamp(9px,0.85vw,13px)] rounded-full hover:bg-[#C75D21] transition-colors duration-300">
//                   Learn more
//                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//                     <path
//                       d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
//                       stroke="currentColor"
//                       strokeWidth="1.4"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               <div className="flex -mt-80 gap-20">
//                 {/* CARDS COLUMN — flex-1 so it fills the space between left and right panels.
//                   Cards themselves stay absolute inside this relative container so the
//                   translate3d animation logic is completely unchanged. */}
//                 <div className="mlcont relative flex-1 min-w-0 z-30 pointer-events-none">
//                   {CARDS.map((c, i) => (
//                     <div
//                       key={c.label}
//                       ref={(el) => {
//                         cardRefs.current[i] = el;
//                       }}
//                       className="absolute top-0 left-0 overflow-hidden will-change-transform"
//                       style={{
//                         width: "36vw",
//                         height: "77vh",
//                         borderRadius: "clamp(12px,1.3vw,20px)",
//                         boxShadow: "0 28px 64px -28px rgba(20,18,10,0.42)",
//                       }}
//                     >
//                       <img
//                         src={c.img}
//                         alt={c.label}
//                         className="w-full h-full object-cover block"
//                         draggable={false}
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//                       <div className="absolute bottom-6 left-6">
//                         <span className="text-[clamp(9px,0.7vw,11px)] font-semibold tracking-[0.16em] text-white/75 uppercase">
//                           {c.tag}
//                         </span>
//                         <div className="text-[clamp(13px,1vw,18px)] font-semibold text-white leading-tight mt-1">
//                           {c.label}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* RIGHT — feature list */}
//                 <div className="mrcont w-[30%] shrink-0 flex flex-col justify-start z-50 mt-20">
//                   {FEATURES.map((f, i) => {
//                     const on = i === active;
//                     return (
//                       <div
//                         key={f.title}
//                         className="rounded-[clamp(12px,1.2vw,18px)] transition-all duration-500 ease-out"
//                         style={{
//                           padding: on
//                             ? "clamp(16px,1.8vw,24px)"
//                             : "0 clamp(16px,1.8vw,24px)",
//                           marginTop: on ? "12px" : "18px",
//                           marginBottom: on ? "12px" : "18px",
//                           background: on ? "#FFFFFF" : "transparent",
//                           boxShadow: on
//                             ? "0 20px 50px -24px rgba(28,42,72,0.20)"
//                             : "none",
//                         }}
//                       >
//                         <div style={{ transform: "none" }}>
//                           <div className="w-[clamp(28px,2.2vw,38px)] h-[clamp(28px,2.2vw,38px)] mb-[clamp(8px,0.8vw,12px)] flex items-center justify-center">
//                             {f.icon}
//                           </div>
//                           <h3 className="m-0 mb-[clamp(5px,0.5vw,8px)] font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(14px,1.3vw,19px)] text-[#1C2A48] leading-tight">
//                             {f.title}
//                           </h3>
//                           <p className="m-0 text-[clamp(11px,0.9vw,13px)] leading-[1.55] text-[#6B6B63] max-w-60">
//                             {f.desc}
//                           </p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
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
//             {CARDS.map((c, i) => (
//               <div key={c.label}>
//                 <div className="w-full aspect-4/3 rounded-[18px] overflow-hidden mb-5 shadow-[0_16px_40px_-20px_rgba(20,18,10,0.3)]">
//                   <img
//                     src={c.img}
//                     alt={c.label}
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { LayoutGrid, Users, Layers } from "lucide-react";

// const CARDS = [
//   { img: "/services/service1.jpg", label: "Industrial Parks", tag: "FLAGSHIP" },
//   { img: "/services/service2.jpg", label: "Logistics Hubs", tag: "OPERATIONS" },
//   {
//     img: "/services/service3.jpg",
//     label: "Grade A Warehouses",
//     tag: "PREMIUM",
//   },
//   {
//     img: "/services/service4.jpg",
//     label: "Green Development",
//     tag: "SUSTAINABLE",
//   },
// ];

// const FEATURES = [
//   {
//     title: "Interior design",
//     desc: "Creating modern architecture focused on clarity, purpose, and lasting impact.",
//     icon: <LayoutGrid className="w-5 h-5 text-[#222B3D]" strokeWidth={1.6} />,
//   },
//   {
//     title: "Consultation",
//     desc: "Innovative architecture driven by creativity, precision, and thoughtful design.",
//     icon: <Users className="w-5 h-5 text-[#222B3D]" strokeWidth={1.6} />,
//   },
//   {
//     title: "3D Modeling",
//     desc: "Thoughtful architecture creating meaningful environments with clarity and purpose.",
//     icon: <Layers className="w-5 h-5 text-[#222B3D]" strokeWidth={1.6} />,
//   },
// ];

// export default function AssetShowcase() {
//   const rootRef = useRef<HTMLElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const rafRef = useRef(0);
//   const [active, setActive] = useState(0);
//   const [isWide, setIsWide] = useState(true);

//   // Responsive break gate
//   useEffect(() => {
//     const ro = new ResizeObserver((e) =>
//       setIsWide(e[0].contentRect.width >= 900),
//     );
//     if (rootRef.current) {
//       ro.observe(rootRef.current);
//       setIsWide(rootRef.current.getBoundingClientRect().width >= 900);
//     }
//     return () => ro.disconnect();
//   }, []);

//   // Frame scroll loop handler
//   useEffect(() => {
//     const tick = () => {
//       rafRef.current = 0;
//       const root = rootRef.current;
//       if (!root || !isWide) return;

//       const vh = window.innerHeight || 800;
//       const rect = root.getBoundingClientRect();
//       const total = root.offsetHeight - vh;
//       const progress =
//         total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;

//       // Segments translation loop calculations
//       const seg = progress * (CARDS.length - 1);
//       const index = Math.floor(seg);
//       const progressInSegment = seg - index;

//       const thumbScale = 0.4545;

//       cardRefs.current.forEach((el, i) => {
//         if (!el) return;

//         let transform = "";

//         // CASE 1: Past cards
//         if (i < index) {
//           if (index === CARDS.length - 1 && i === index - 1) {
//             transform = `translate3d(1vw, 0px, 0) scale(${thumbScale})`;
//             el.style.transformOrigin = "left bottom";
//           } else {
//             transform = `translate3d(20vw, 0px, 0) scale(0)`;
//             el.style.transformOrigin = "center top";
//           }
//         }
//         // CASE 2: Active Card
//         else if (i === index) {
//           if (index === CARDS.length - 1) {
//             transform = `translate3d(20vw, 0px, 0) scale(1)`;
//             el.style.transformOrigin = "right bottom";
//           } else {
//             const currentScale = 1 - progressInSegment;
//             transform = `translate3d(20vw, 0px, 0) scale(${currentScale})`;
//             el.style.transformOrigin = "right bottom";
//           }
//         }
//         // CASE 3: Upcoming Card
//         else if (i === index + 1) {
//           const currentScale =
//             thumbScale + (1 - thumbScale) * progressInSegment;
//           const currentLeft = 1 + (20 - 1) * Math.pow(progressInSegment, 1.2);

//           transform = `translate3d(${currentLeft}vw, 0px, 0) scale(${currentScale})`;
//           el.style.transformOrigin = "left bottom";
//         }
//         // CASE 4: Next Waiting Card
//         else if (i === index + 2) {
//           const currentScale = 0 + thumbScale * progressInSegment;
//           transform = `translate3d(1vw, 0px, 0) scale(${currentScale})`;
//           el.style.transformOrigin = "left bottom";
//         }
//         // CASE 5: Rest of stack
//         else {
//           transform = `translate3d(1vw, 0px, 0) scale(0)`;
//           el.style.transformOrigin = "left bottom";
//         }

//         el.style.transform = transform;
//         el.style.zIndex = String(CARDS.length + 10 - i);
//       });

//       setActive(Math.min(FEATURES.length - 1, Math.round(seg)));
//     };

//     const onScroll = () => {
//       if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll, { passive: true });
//     requestAnimationFrame(tick);

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [isWide]);

//   return (
//     <section ref={rootRef} className="relative w-full bg-[#F5EDE0]">
//       {/* ── DESKTOP: sticky scrub ── */}
//       {isWide && (
//         <div className="h-[400vh]">
//           {/* Main parent flex container running entirely in a Flex Column layout */}
//           <div className="sticky top-0 h-screen w-full flex flex-col lg:py-20 py-12 justify-between overflow-hidden">
//             {/* CONTENT TOP: Document headers */}
//             <div className="w-full flex fix flex-col gap-3 shrink-0">
//               <div className="flex items-center gap-2">
//                 <span className="text-[#8C8C84] font-semibold text-[13px]">
//                   //
//                 </span>
//                 <span className="text-[#8C8C84] font-medium text-[11px] tracking-[0.18em] uppercase">
//                   Our Assets
//                 </span>
//               </div>

//               <h2 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-bold text-[#1C2A48] text-[clamp(28px,3.2vw,46px)] leading-[1.15] tracking-[-0.015em]">
//                 Building documentation
//               </h2>
//               {/* LEFT COLUMN: Fixed copy descriptors */}
//               <div className="w-[22vw] shrink-0 flex flex-col gap-[clamp(16px,1.5vw,24px)] pb-2">
//                 <p className="m-0 text-[clamp(12px,0.95vw,14.5px)] text-[#6B6B63] leading-[1.65]">
//                   Architecture focused on simplicity, balance, and timeless
//                   design excellence.
//                 </p>

//                 <button className="w-fit flex items-center gap-2 bg-[#1C2A48] text-white text-[clamp(11px,0.8vw,13px)] font-medium px-[clamp(16px,1.4vw,22px)] py-[clamp(9px,0.8vw,13px)] rounded-full hover:bg-[#C75D21] transition-colors duration-300">
//                   Learn more
//                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//                     <path
//                       d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
//                       stroke="currentColor"
//                       strokeWidth="1.4"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* CONTENT BOTTOM: Three column workspace aligns strictly row-wise under headers */}
//             <div
//               ref={containerRef}
//               className="w-full flex flex-row items-end justify-between flex-1 min-h-0 gap-[4vw]"
//             >
//               {/* CENTER COLUMN: Containment box limits animation transformations from breaking parent boundary sizes */}
//               <div className="mlcont relative flex-1 h-[70vh] min-w-0 z-30 pointer-events-none overflow-hidden">
//                 {CARDS.map((c, i) => (
//                   <div
//                     key={c.label}
//                     ref={(el) => {
//                       cardRefs.current[i] = el;
//                     }}
//                     className="absolute bottom-0 left-0 overflow-hidden will-change-transform max-w-full"
//                     style={{
//                       width: "32vw",
//                       height: "70vh",
//                       borderRadius: "clamp(12px,1.3vw,20px)",
//                       boxShadow: "0 28px 64px -28px rgba(20,18,10,0.42)",
//                     }}
//                   >
//                     <img
//                       src={c.img}
//                       alt={c.label}
//                       className="w-full h-full object-cover block"
//                       draggable={false}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                     <div className="absolute bottom-6 left-6 pointer-events-auto">
//                       <span className="text-[clamp(9px,0.7vw,11px)] font-semibold tracking-[0.16em] text-white/75 uppercase">
//                         {c.tag}
//                       </span>
//                       <div className="text-[clamp(13px,1vw,18px)] font-semibold text-white leading-tight mt-1">
//                         {c.label}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* RIGHT COLUMN: Active stacked feature details */}
//               <div className="mrcont w-[26vw] shrink-0 flex flex-col justify-end gap-1 z-50">
//                 {FEATURES.map((f, i) => {
//                   const on = i === active;
//                   return (
//                     <div
//                       key={f.title}
//                       className="rounded-[clamp(12px,1.2vw,18px)] transition-all duration-500 ease-out"
//                       style={{
//                         padding: on
//                           ? "clamp(14px,1.5vw,20px)"
//                           : "0 clamp(14px,1.5vw,20px)",
//                         marginTop: on ? "6px" : "10px",
//                         marginBottom: on ? "6px" : "10px",
//                         background: on ? "#FFFFFF" : "transparent",
//                         boxShadow: on
//                           ? "0 20px 50px -24px rgba(28,42,72,0.16)"
//                           : "none",
//                       }}
//                     >
//                       <div>
//                         <div className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)] mb-2 flex items-center justify-center">
//                           {f.icon}
//                         </div>
//                         <h3 className="m-0 mb-1 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(13px,1.1vw,17px)] text-[#1C2A48] leading-tight">
//                           {f.title}
//                         </h3>
//                         <p className="m-0 text-[clamp(11px,0.8vw,12.5px)] leading-[1.55] text-[#6B6B63]">
//                           {f.desc}
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
//             {CARDS.map((c, i) => (
//               <div key={c.label}>
//                 <div className="w-full aspect-4/3 rounded-[18px] overflow-hidden mb-5 shadow-[0_16px_40px_-20px_rgba(20,18,10,0.3)]">
//                   <img
//                     src={c.img}
//                     alt={c.label}
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
//     img: "/services/service1.jpg",
//     label: "Industrial Parks",
//     tag: "FLAGSHIP",
//   },
//   {
//     img: "/services/service2.jpg",
//     label: "Logistics Hubs",
//     tag: "OPERATIONS",
//   },
//   {
//     img: "/services/service3.jpg",
//     label: "Grade A Warehouses",
//     tag: "PREMIUM",
//   },
//   {
//     img: "/services/service4.jpg",
//     label: "Green Development",
//     tag: "SUSTAINABLE",
//   },
// ];

// const FEATURES: FeatureItem[] = [
//   {
//     title: "Interior design",
//     desc: "Creating modern architecture focused on clarity, purpose, and lasting impact.",
//     icon: <LayoutGrid className="w-5 h-5 text-[#222B3D]" strokeWidth={1.6} />,
//   },
//   {
//     title: "Consultation",
//     desc: "Innovative architecture driven by creativity, precision, and thoughtful design.",
//     icon: <Users className="w-5 h-5 text-[#222B3D]" strokeWidth={1.6} />,
//   },
//   {
//     title: "3D Modeling",
//     desc: "Thoughtful architecture creating meaningful environments with clarity and purpose.",
//     icon: <Layers className="w-5 h-5 text-[#222B3D]" strokeWidth={1.6} />,
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

//   // Responsive breakpoint gate
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

//   // Apply initial desktop state on mount / layout mode switch
//   useEffect(() => {
//     if (!isWide) return;

//     const seg = 0;
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
//               <h2 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-bold text-[#1C2A48] text-[clamp(28px,3.2vw,46px)] leading-[1.15] tracking-[-0.015em]">
//                 Building documentation
//               </h2>
//             </div>

//             {/* CONTENT BOTTOM */}
//             <div className="w-full flex flex-row items-end justify-between flex-1 min-h-0 gap-[4vw]">
//               {/* CENTER COLUMN */}
//               <div className="mlcont relative flex-1 h-[70vh] min-w-0 z-30 pointer-events-none overflow-hidden">
//                 {CARDS.map((card, i) => (
//                   <div
//                     key={card.label}
//                     ref={(el) => {
//                       cardRefs.current[i] = el;
//                     }}
//                     className="absolute bottom-0 left-0 overflow-hidden will-change-transform max-w-full"
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
//               <div className="mrcont w-[26vw] shrink-0 flex flex-col justify-end gap-1 z-50">
//                 {FEATURES.map((feature, i) => {
//                   const on = i === active;

//                   return (
//                     <div
//                       key={feature.title}
//                       className="rounded-[clamp(12px,1.2vw,18px)] transition-all duration-500 ease-out"
//                       style={{
//                         padding: on
//                           ? "clamp(14px,1.5vw,20px)"
//                           : "0 clamp(14px,1.5vw,20px)",
//                         marginTop: on ? "6px" : "10px",
//                         marginBottom: on ? "6px" : "10px",
//                         background: on ? "#FFFFFF" : "transparent",
//                         boxShadow: on
//                           ? "0 20px 50px -24px rgba(28,42,72,0.16)"
//                           : "none",
//                       }}
//                     >
//                       <div>
//                         <div className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)] mb-2 flex items-center justify-center">
//                           {feature.icon}
//                         </div>

//                         <h3 className="m-0 mb-1 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(13px,1.1vw,17px)] text-[#1C2A48] leading-tight">
//                           {feature.title}
//                         </h3>

//                         <p className="m-0 text-[clamp(11px,0.8vw,12.5px)] leading-[1.55] text-[#6B6B63]">
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
//
//
//
//
//
//
//
//
//
//
//
//

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
//     img: "/services/service1.jpg",
//     label: "Industrial Parks",
//     tag: "FLAGSHIP",
//   },
//   {
//     img: "/services/service2.jpg",
//     label: "Logistics Hubs",
//     tag: "OPERATIONS",
//   },
//   {
//     img: "/services/service3.jpg",
//     label: "Grade A Warehouses",
//     tag: "PREMIUM",
//   },
//   {
//     img: "/services/service4.jpg",
//     label: "Green Development",
//     tag: "SUSTAINABLE",
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
//       img: "/home/Asset/asset3.jpg",
//       label: "Grade A Warehouses",
//       tag: "PREMIUM",
//     },
//   ];

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
//     <section ref={rootRef} className="relative w-full bg-[#FBF2E8]">
//       {/* ── DESKTOP: sticky scrub ── */}
//       {isWide && (
//         <div className="h-[400vh]">
//           <div className="sticky top-0 h-screen w-full flex flex-col lg:py-12 py-12 justify-between overflow-hidden">
//             {/* CONTENT TOP */}
//             <div className="w-full flex fix flex-col gap-3 shrink-0">
//               <h2 className="section-title m-0 font-[family-name:var(--font-sora),sans-serif] font-bold text-[clamp(28px,3.2vw,46px)] leading-[1.15] tracking-[-0.015em]">
//                 Building <br /> Responsibly for <br /> the Long Term
//               </h2>
//               <p className="max-w-[300px]">
//                 Sustainability is integrated into every stage of
//                 development—from resource-efficient design and infrastructure
//                 planning to responsible operations and governance.
//               </p>
//             </div>

//             {/* CONTENT BOTTOM */}
//             <div className="w-full flex flex-row items-end justify-between flex-1 min-h-0 gap-[4vw]">
//               {/* CENTER COLUMN */}
//               <div className="mlcont mlcont-1900 flex-1 h-[70vh] min-[1900px]:h-[55vh] min-w-0 z-30 pointer-events-none overflow-hidden grid grid-cols-1 grid-rows-1">
//                 {CARDS.map((card, i) => (
//                   <div
//                     key={card.label}
//                     ref={(el) => {
//                       cardRefs.current[i] = el;
//                     }}
//                     className="col-start-1 row-start-1 ml-26 self-end justify-self-start overflow-hidden will-change-transform max-w-full relative"
//                     style={{
//                       width: "25vw",
//                       // height: "70vh",
//                       height: "100%",
//                       borderRadius: "clamp(12px,1.3vw,20px)",
//                     }}
//                   >
//                     <img
//                       src={card.img}
//                       alt={card.label}
//                       className="w-full h-full object-cover block"
//                       draggable={false}
//                     />

//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                   </div>
//                 ))}
//               </div>

//               {/* RIGHT COLUMN */}
//               {/* <div className="mrcont w-[30%] shrink-0 flex flex-col justify-end gap-2 z-50"> */}
//               <div className="mrcont w-[30%] 1920:w-[25%] shrink-0 flex flex-col justify-end gap-2 z-50">
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
//                         boxShadow: on
//                           ? "0 20px 50px -24px rgba(28,42,72,0.16)"
//                           : "none",
//                       }}
//                     >
//                       <div>
//                         <div className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)] mb-5 flex items-center justify-center">
//                           {feature.icon}
//                         </div>

//                         <h3 className="m-0 mb-1 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(13px,1.1vw,17px)] text-[#1C2A48] leading-tight">
//                           {feature.title}
//                         </h3>

//                         <p className="m-0 text-[clamp(11px,0.8vw,12.5px)] leading-[1.55] text-[#6B6B63]">
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
//             <span className="font-[family-name:var(--font-sora),sans-serif] text-[#8C8C84] font-semibold text-[13px]">
//               //
//             </span>
//             <span className="font-[family-name:var(--font-sora),sans-serif] text-[#8C8C84] font-medium text-[11px] tracking-[0.18em] uppercase">
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
