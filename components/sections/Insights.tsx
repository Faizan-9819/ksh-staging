// "use client";

// import { useState, useEffect, useRef } from "react";
// import Btn from "@/components/ui/Btn";
// import NavArrow from "@/components/ui/NavArrow";

// const POSTS = [
//   { title: "Warehousing were evaluated for a smooth, stress-free import/export program", img: "/home/about-left.png", date: "23 MAR 2022" },
//   { title: "Port-side logistics hubs cut transit times across the eastern corridor", img: "/home/warehouse.png", date: "17 APR 2022" },
//   { title: "Inside the facilities engineered for round-the-clock operations", img: "/home/about-right.png", date: "05 MAY 2022" },
//   { title: "How smart docking is reshaping last-mile distribution", img: "/home/hero-bg.png", date: "12 JUN 2022" },
//   { title: "Sustainable park design that lowers operating costs", img: "/home/about-left.png", date: "28 JUL 2022" },
//   { title: "Strategic locations connecting industry to highways and ports", img: "/home/warehouse.png", date: "03 SEP 2022" },
//   { title: "Building future-ready infrastructure for growing businesses", img: "/home/about-right.png", date: "19 OCT 2022" },
// ];
// const N = POSTS.length;

// export default function Insights() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const [revealed, setRevealed] = useState(false);
//   const [page, setPage] = useState(0);
//   const [hovered, setHovered] = useState(-1);
//   const [perView, setPerView] = useState(3);

//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el) return;
//     const ro = new ResizeObserver((entries) => {
//       const w = entries[0].contentRect.width;
//       setPerView(w >= 980 ? 3 : w >= 640 ? 2 : 1);
//     });
//     ro.observe(el);
//     setPerView(el.getBoundingClientRect().width >= 980 ? 3 : el.getBoundingClientRect().width >= 640 ? 2 : 1);

//     const io = new IntersectionObserver((ents) => {
//       if (ents[0].isIntersecting) setRevealed(true);
//     }, { threshold: 0.15 });
//     io.observe(el);
//     setTimeout(() => {
//       const r = el.getBoundingClientRect();
//       if (r.top < (window.innerHeight || 800) * 0.92) setRevealed(true);
//     }, 140);

//     return () => { ro.disconnect(); io.disconnect(); };
//   }, []);

//   const prev = () => setPage((p) => (p - 1 + N) % N);
//   const next = () => setPage((p) => (p + 1) % N);

//   const cards = Array.from({ length: perView }, (_, k) => {
//     const idx = (page + k) % N;
//     return { ...POSTS[idx], k };
//   });

//   const colsStyle = `repeat(${perView}, 1fr)`;

//   return (
//     <section ref={sectionRef} className="relative w-full bg-[#F8F8F6] font-[var(--font-inter),sans-serif] overflow-hidden">
//       <div className="fix relative py-10 max-sm:py-6">

//         {/* Header */}
//         <div className="flex items-center gap-2.25 mb-[clamp(14px,1.5vw,20px)]">
//           <span className="text-[#8C8C84] font-semibold text-[13px]">//</span>
//           <span className="text-[#8C8C84] font-medium text-[12px] tracking-[-2%]">NEWS</span>
//         </div>
//         <h2 className="m-0 mb-[clamp(16px,1.8vw,24px)] font-[family-name:var(--font-sora),sans-serif] font-bold text-[#24314E] text-[clamp(32px,3.8vw,52px)] leading-none tracking-[-0.015em]">Latest Insights</h2>
//         <p className="m-0 mb-[clamp(30px,3.5vw,48px)] font-normal text-[clamp(14px,1.12vw,16px)] leading-[1.6] text-[#6E6E68] max-w-[1280px]">
//           At KSH INFRA, we invest in your career growth. Our structured career paths, mentorship programs, and skill-building opportunities, ensure that every team member has the tools to succeed and grow.
//         </p>

//         {/* Cards */}
//         <div className="grid gap-[clamp(16px,1.55vw,22px)]" style={{ gridTemplateColumns: colsStyle }}>
//           {cards.map(({ title, img, date, k }) => {
//             const on = hovered === k;
//             return (
//               <div
//                 key={`${page}-${k}`}
//                 onMouseEnter={() => setHovered(k)}
//                 onMouseLeave={() => setHovered(-1)}
//                 className={`relative rounded-[20px] overflow-hidden aspect-[413/452] cursor-pointer transition-[transform,opacity,box-shadow] duration-500 ease-[ease] ${revealed ? (on ? "-translate-y-2" : "translate-y-0") : "translate-y-[26px]"} ${revealed ? "opacity-100" : "opacity-0"} ${on ? "shadow-[0_34px_60px_-32px_rgba(15,29,58,0.5)]" : "shadow-[0_22px_50px_-36px_rgba(15,29,58,0.4)]"}`}
//                 style={{ transitionDelay: revealed ? "0s" : (0.08 + k * 0.12).toFixed(2) + "s" }}
//               >
//                 <img
//                   src={img}
//                   alt={title}
//                   className={`absolute inset-0 w-full h-full object-cover block transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] ${on ? "scale-[1.06]" : "scale-100"}`}
//                 />
//                 {/* Gradient overlay */}
//                 <div className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(10,16,30,0.28)_0%,rgba(10,16,30,0)_26%,rgba(10,16,30,0)_50%,rgba(8,13,25,0.82)_100%)] transition-opacity duration-[450ms] ease-[ease] ${on ? "opacity-100" : "opacity-0"}`} />
//                 {/* Date pill */}
//                 <div className="absolute top-[clamp(16px,1.6vw,24px)] left-[clamp(16px,1.6vw,24px)] px-[18px] py-[9px] rounded-full bg-[rgba(255,255,255,0.16)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)] border border-[rgba(255,255,255,0.35)]">
//                   <span className="font-medium text-[clamp(12px,1vw,14px)] tracking-[0.06em] text-white">{date}</span>
//                 </div>
//                 {/* Title + arrow */}
//                 <div className={`absolute left-0 right-0 bottom-0 p-[clamp(20px,2vw,28px)] flex items-end justify-between gap-4 transition-[opacity,transform] duration-[450ms] ease-[ease] ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[14px]"}`}>
//                   <h3 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(17px,1.5vw,21px)] leading-[1.32] text-white max-w-[78%]">{title}</h3>
//                   <span className={`flex-shrink-0 flex items-center justify-center w-[clamp(44px,3.6vw,52px)] h-[clamp(44px,3.6vw,52px)] rounded-full bg-white transition-transform duration-[400ms] ease-[ease] ${on ? "scale-[1.06]" : "scale-100"}`}>
//                     <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M7 17 L17 7 M9 7 H17 V15" stroke="#1C2A48" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Controls */}
//         <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5 mt-[clamp(34px,3.6vw,52px)]">
//           {/* Dots */}
//           <div className="flex items-center gap-2.25">
//             {POSTS.map((_, i) => {
//               const on = i === page;
//               return (
//                 <button
//                   key={i}
//                   onClick={() => setPage(i)}
//                   aria-label={`Go to page ${i + 1}`}
//                   className="h-1.5 p-0 border-none bg-transparent cursor-pointer"
//                 >
//                   <span className={`block h-1.5 rounded-[99px] transition-[width,background] duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] ${on ? "w-[46px] bg-[#24314E] border-none" : "w-[15px] bg-transparent border border-[#C5C5BE]"}`} />
//                 </button>
//               );
//             })}
//           </div>
//           {/* View More */}
//           <div className="justify-self-center"><Btn label="View More" /></div>
//           {/* Nav */}
//           <div className="flex gap-2.5 justify-self-end">
//             <NavArrow direction="prev" tone="dark" onClick={prev} ariaLabel="Previous insights" />
//             <NavArrow direction="next" tone="dark" onClick={next} ariaLabel="Next insights" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useState, useCallback, useEffect } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import Btn from "@/components/ui/Btn";
// import NavArrow from "@/components/ui/NavArrow";
// const POSTSnum = [{}, {}, {}, {}, {}];

// const POSTS = [
//   {
//     title:
//       "Warehousing were evaluated for a smooth, stress-free import/export program",
//     img: "/home/about-left.png",
//     date: "23 MAR 2022",
//   },
//   {
//     title:
//       "Port-side logistics hubs cut transit times across the eastern corridor",
//     img: "/home/warehouse.png",
//     date: "17 APR 2022",
//   },
//   {
//     title: "Inside the facilities engineered for round-the-clock operations",
//     img: "/home/about-right.png",
//     date: "05 MAY 2022",
//   },
//   {
//     title: "How smart docking is reshaping last-mile distribution",
//     img: "/home/hero-bg.png",
//     date: "12 JUN 2022",
//   },
//   {
//     title: "Sustainable park design that lowers operating costs",
//     img: "/home/about-left.png",
//     date: "28 JUL 2022",
//   },
//   {
//     title: "Strategic locations connecting industry to highways and ports",
//     img: "/home/warehouse.png",
//     date: "03 SEP 2022",
//   },
//   {
//     title: "Building future-ready infrastructure for growing businesses",
//     img: "/home/about-right.png",
//     date: "19 OCT 2022",
//   },
// ];

// export default function Insights() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({
//     loop: false,
//     align: "start",
//     dragFree: false,
//   });
//   const [active, setActive] = useState(0);
//   const [hovered, setHovered] = useState(-1);

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     setActive(emblaApi.selectedScrollSnap());
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;
//     emblaApi.on("select", onSelect);
//     onSelect();
//   }, [emblaApi, onSelect]);

//   return (
//     <section className="relative w-full bg-[#F8F8F6] py-16 overflow-hidden">
//       <div className="fix relative">
//         <div className="flex items-center gap-2.5 mb-2">
//           <span className="text-[#8C8C84] font-semibold text-[13px]">//</span>
//           <span className="text-[#8C8C84] font-medium text-[12px] tracking-[-2%]">
//             INSIGHTS
//           </span>
//         </div>
//         <h2 className="mb-8 font-semibold text-[#C55C25] text-[48px]">
//           Market Perspectives & Updates{" "}
//         </h2>

//         <div className="overflow-hidden" ref={emblaRef}>
//           <div className="flex gap-6">
//             {POSTS.map((post, k) => {
//               const on = hovered === k;
//               return (
//                 <div
//                   key={k}
//                   onMouseEnter={() => setHovered(k)}
//                   onMouseLeave={() => setHovered(-1)}
//                   className="flex-[0_0_calc(33.333%-16px)] relative rounded-[30px] overflow-hidden aspect-[413/452] cursor-pointer shadow-lg group"
//                 >
//                   {/* Background Image */}
//                   <img
//                     src={post.img}
//                     alt={post.title}
//                     className={`w-full h-full object-cover transition-transform duration-700 ${on ? "scale-105" : "scale-100"}`}
//                   />

//                   {/* Dark Gradient Overlay - Only visible on hover */}
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-t from-[#0a101e]/90 to-transparent transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}
//                   />

//                   {/* Date Pill - ALWAYS VISIBLE */}
//                   <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
//                     <span className="text-xs font-medium text-white tracking-wider">
//                       {post.date}
//                     </span>
//                   </div>

//                   {/* Title & Arrow Button - ONLY VISIBLE ON HOVER */}
//                   <div
//                     className={`absolute bottom-0 w-full p-8 flex items-end justify-between transition-all duration-500 transform ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
//                   >
//                     <h3 className="text-[18px] text-white max-w-[75%] leading-snug">
//                       {post.title}
//                     </h3>

//                     {/* Right Arrow Button */}
//                     <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-0">
//                       <img src="/homeasset/leftup.png" alt="" />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Controls Layout */}
//         <div className="flex justify-between items-center mt-12">
//           {/* Horizontal Pagination Dots */}
//           <div className="flex items-center gap-[13px]">
//             {POSTSnum.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => emblaApi?.scrollTo(i)}
//                 aria-label={`Go to slide ${i + 1}`}
//                 className="h-[5px] p-0 border-none bg-transparent cursor-pointer flex items-center justify-center"
//               >
//                 <span
//                   className="block h-[5px] rounded-[99px]"
//                   style={{
//                     transition:
//                       "width .4s cubic-bezier(.4,0,.2,1), background .4s ease",
//                     width: i === active ? 46 : 9,
//                     background: i === active ? "#24314E" : "transparent",
//                     border: i === active ? "none" : "1px solid #C5C5BE",
//                   }}
//                 />
//               </button>
//             ))}
//           </div>

//           <Btn label="View More" />

//           <div className="flex gap-4">
//             <NavArrow
//               direction="prev"
//               tone="dark"
//               onClick={() => emblaApi?.scrollPrev()}
//             />
//             <NavArrow
//               direction="next"
//               tone="dark"
//               onClick={() => emblaApi?.scrollNext()}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// Date:15 July 2026
// "use client";

// import { useState, useCallback, useEffect } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import Btn from "@/components/ui/Btn";
// import NavArrow from "@/components/ui/NavArrow";

// const POSTSnum = [{}, {}, {}, {}, {}];

// const POSTS = [
//   {
//     title: "Industrial Park Common-Area Amenities: What Tenants Actually Use",
//     img: "/homeasset/insights1.webp",
//     date: "23 MAR 2022",
//   },
//   {
//     title:
//       "The Hosur-Chennai Industrial Corridor: How Infrastructure Developers Are Shaping South India’s Supply Chain Future",
//     img: "/homeasset/insights2.webp",
//     date: "17 APR 2022",
//   },
//   {
//     title:
//       "Navigating Risks in India’s Industrial Landscapes: The KSH INFRA Blueprint for Resilient Industrial Parks",
//     img: "/homeasset/insights3.webp",
//     date: "05 MAY 2022",
//   },
//   {
//     title:
//       "Tamil Nadu’s Infrastructure Boom Meets Industrial Real Estate: The Rise of Integrated Industrial & Logistics Ecosystems",
//     img: "/homeasset/insights4.webp",
//     date: "12 JUN 2022",
//   },
//   {
//     title:
//       "Hosur's Industrial Surge: Why Infrastructure Developers Are Powering the Next Manufacturing Hub",
//     img: "/homeasset/insights5.webp",
//     date: "28 JUL 2022",
//   },
//   {
//     title:
//       "The Next Wave of Growth: Why Grade A Industrial Parks are the Future for MSMEs in Hosur and Tamil Nadu",
//     img: "/homeasset/insights6.webp",
//     date: "03 SEP 2022",
//   },
//   {
//     title:
//       "Fueling the Future: How Industrial Parks are the Backbone of India’s Make-in-India Mission",
//     img: "/homeasset/insights7.webp",
//     date: "19 OCT 2022",
//   },
// ];

// export default function Insights() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({
//     loop: false,
//     align: "start",
//     dragFree: false,
//   });
//   const [active, setActive] = useState(0);
//   const [hovered, setHovered] = useState(-1);

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     setActive(emblaApi.selectedScrollSnap());
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;
//     emblaApi.on("select", onSelect);
//     onSelect();
//   }, [emblaApi, onSelect]);

//   return (
//     <section className="relative w-full bg-[#F8F8F6] py-16 overflow-hidden">
//       <div className="fix relative">
//         <div className="flex items-center gap-2.5 mb-2">
//           <span className="text-[#8C8C84] font-semibold text-[13px]">//</span>
//           <h5 className="text-[#8C8C84] font-medium text-[12px] tracking-[-2%]">
//             INSIGHTS
//           </h5>
//         </div>
//         <h2 className="section-title mb-8 font-semibold text-[48px]">
//           Market Perspectives & Updates{" "}
//         </h2>

//         <div className="overflow-hidden" ref={emblaRef}>
//           <div className="flex gap-6">
//             {POSTS.map((post, k) => {
//               const on = hovered === k;
//               return (
//                 <div
//                   key={k}
//                   onMouseEnter={() => setHovered(k)}
//                   onMouseLeave={() => setHovered(-1)}
//                   className="flex-[0_0_calc(33.333%-16px)] relative rounded-[30px] overflow-hidden aspect-[413/452] cursor-pointer shadow-lg group"
//                 >
//                   {/* Background Image */}
//                   <img
//                     src={post.img}
//                     alt={post.title}
//                     className={`w-full h-full object-cover transition-transform duration-700 ${on ? "scale-110" : "scale-105"}`}
//                   />

//                   {/* Dark Gradient Overlay - Always visible to read content clearly */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#0a101e]/90 via-[#0a101e]/40 to-transparent" />

//                   {/* Date Pill - ALWAYS VISIBLE */}
//                   <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
//                     <span className="text-xs font-medium text-white tracking-wider">
//                       {post.date}
//                     </span>
//                   </div>

//                   {/* Bottom Content Wrapper - Static Position */}
//                   <div className="absolute bottom-0 w-full p-8 flex items-center justify-between">
//                     {/* Title Text - Always Visible & Static */}
//                     <h3 className="text-[18px] text-white max-w-[75%] leading-snug m-0 line-clamp-3">
//                       {post.title}
//                     </h3>

//                     {/* Right Arrow Button - Fade in Effect on Hover */}
//                     <div
//                       className={`w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-opacity duration-500 ${
//                         on ? "opacity-100" : "opacity-0"
//                       }`}
//                     >
//                       <img src="/homeasset/leftup.png" alt="" />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Controls Layout */}
//         <div className="flex justify-between items-center mt-12">
//           {/* Horizontal Pagination Dots */}
//           <div className="flex items-center gap-[13px]">
//             {POSTSnum.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => emblaApi?.scrollTo(i)}
//                 aria-label={`Go to slide ${i + 1}`}
//                 className="h-[5px] p-0 border-none bg-transparent cursor-pointer flex items-center justify-center"
//               >
//                 <span
//                   className="block h-[5px] rounded-[99px]"
//                   style={{
//                     transition:
//                       "width .4s cubic-bezier(.4,0,.2,1), background .4s ease",
//                     width: i === active ? 46 : 9,
//                     background: i === active ? "#A9A7B2" : "transparent",
//                     border: i === active ? "none" : "1px solid #C5C5BE",
//                   }}
//                 />
//               </button>
//             ))}
//           </div>

//           <Btn label="View More" />

//           <div className="flex gap-1">
//             <NavArrow
//               direction="prev"
//               tone="dark"
//               onClick={() => emblaApi?.scrollPrev()}
//             />
//             <NavArrow
//               direction="next"
//               tone="dark"
//               onClick={() => emblaApi?.scrollNext()}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// Date: 15 July 2026 (Updated)

"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "@/components/ui/Link";
import useEmblaCarousel from "embla-carousel-react";
import Btn from "@/components/ui/Btn";
import NavArrow from "@/components/ui/NavArrow";

export interface InsightPost {
  title: string;
  img: string;
  date: string;
  /** When set, the card links here (e.g. a case study's own page) instead of being a plain hover card. */
  href?: string;
}

const DEFAULT_POSTS: InsightPost[] = [
  {
    title: "Industrial Park Common-Area Amenities: What Tenants Actually Use",
    img: "/homeasset/insights1.webp",
    date: "23 MAR 2022",
  },
  {
    title:
      "The Hosur-Chennai Industrial Corridor: How Infrastructure Developers Are Shaping South India’s Supply Chain Future",
    img: "/homeasset/insights2.webp",
    date: "17 APR 2022",
  },
  {
    title:
      "Navigating Risks in India’s Industrial Landscapes: The KSH INFRA Blueprint for Resilient Industrial Parks",
    img: "/homeasset/insights3.webp",
    date: "05 MAY 2022",
  },
  {
    title:
      "Tamil Nadu’s Infrastructure Boom Meets Industrial Real Estate: The Rise of Integrated Industrial & Logistics Ecosystems",
    img: "/homeasset/insights4.webp",
    date: "12 JUN 2022",
  },
  {
    title:
      "Hosur's Industrial Surge: Why Infrastructure Developers Are Powering the Next Manufacturing Hub",
    img: "/homeasset/insights5.webp",
    date: "28 JUL 2022",
  },
  {
    title:
      "The Next Wave of Growth: Why Grade A Industrial Parks are the Future for MSMEs in Hosur and Tamil Nadu",
    img: "/homeasset/insights6.webp",
    date: "03 SEP 2022",
  },
  {
    title:
      "Fueling the Future: How Industrial Parks are the Backbone of India’s Make-in-India Mission",
    img: "/homeasset/insights7.webp",
    date: "19 OCT 2022",
  },
];

interface InsightsProps {
  topPaddingClassName?: string;
  posts?: InsightPost[];
  showEyebrow?: boolean;
}

export default function Insights({
  topPaddingClassName = "pt-16",
  posts = DEFAULT_POSTS,
  showEyebrow = true,
}: InsightsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
  });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(-1);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActive(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect();
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section
      className={`relative w-full bg-[#F8F8F6] pb-16 ${topPaddingClassName} overflow-hidden`}
    >
      <div className="fix relative px-4 sm:px-0">
        {/* {showEyebrow && (
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-[#8C8C84] font-semibold text-[13px]">
              {"//"}
            </span>
            <h5 className="text-[#8C8C84] font-medium text-[12px] tracking-[-2%]">
              INSIGHTS
            </h5>
          </div>
        )} */}
        <h2 className="mb-8 leading-[110%] font-semibold text-[32px] sm:text-[48px]">
          Market Perspectives & Updates{" "}
        </h2>

        {/* Embla Viewport */}
        <div className="overflow-hidden w-full" ref={emblaRef}>
          {/* Embla Container */}
          <div className="flex sm:gap-6">
            {posts.map((post, k) => {
              const on = hovered === k;
              const cardContent = (
                <>
                  {/* Background Image */}
                  <img
                    src={post.img}
                    alt={post.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${on ? "scale-110" : "scale-105"}`}
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a101e]/90 via-[#0a101e]/40 to-transparent" />

                  {/* Date Pill */}
                  <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/20">
                    <span className="text-xs font-medium text-white tracking-wider">
                      {post.date}
                    </span>
                  </div>

                  {/* Bottom Content Wrapper */}
                  <div className="absolute bottom-0 w-full p-8 flex items-center justify-between">
                    <h3 className="text-[18px] text-white max-w-[75%] leading-snug m-0 line-clamp-3">
                      {post.title}
                    </h3>

                    <div
                      className={`w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-opacity duration-500 ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img src="/homeasset/leftup.png" alt="" />
                    </div>
                  </div>
                </>
              );

              return (
                /* The outer slide container handles the 100% boundary width and mobile layout padding */
                <div
                  key={k}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(33.333%-16px)] px-2 sm:px-0 relative aspect-[413/452] select-none"
                >
                  {/* Inner element carries the actual visual presentation and card bounds */}
                  {post.href ? (
                    <Link
                      href={post.href}
                      onMouseEnter={() => setHovered(k)}
                      onMouseLeave={() => setHovered(-1)}
                      onFocus={() => setHovered(k)}
                      onBlur={() => setHovered(-1)}
                      className="block w-full h-full relative rounded-[30px] overflow-hidden cursor-pointer shadow-lg group"
                    >
                      {cardContent}
                    </Link>
                  ) : (
                    <div
                      onMouseEnter={() => setHovered(k)}
                      onMouseLeave={() => setHovered(-1)}
                      className="w-full h-full relative rounded-[30px] overflow-hidden cursor-pointer shadow-lg group"
                    >
                      {cardContent}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls Layout */}

        <div className="flex flex-col gap-6 sm:flex-row justify-between items-center mt-6 lg:mt-12">
          {/* Horizontal Pagination Dots — hidden on mobile; matches CertificationSection's dots on desktop */}
          <div className="hidden sm:flex items-center gap-2 order-2 sm:order-1">
            {scrollSnaps.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-10 bg-[#5D5D5D]"
                      : "w-3 border border-[#5D5D5D]/30 bg-transparent hover:border-[#2D2D2D]/50"
                  }`}
                />
              );
            })}
          </div>

          <div className="order-1 sm:order-2">
            <Btn label="View More" href="/blogs" />
          </div>

          <div className="flex items-center gap-1 max-lg:gap-x-3 order-3">
            <NavArrow
              direction="prev"
              tone="dark"
              className="max-lg:h-10! max-lg:w-18! max-lg:rounded-4xl!"
              onClick={() => emblaApi?.scrollPrev()}
            />
            <NavArrow
              direction="next"
              tone="dark"
              className="max-lg:h-10! max-lg:w-18! max-lg:rounded-4xl!"
              onClick={() => emblaApi?.scrollNext()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
