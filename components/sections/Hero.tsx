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

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Navbar from "@/components/ui/Navbar";
// import Btn from "@/components/ui/Btn";

// const TOTAL_SLIDES = 5;

// const SLIDES_DATA = [
//   {
//     id: 0,
//     heading: (
//       <>
//         Investing, Developing <br /> and Operating Industrial
//         <br /> Infrastructure at Scale
//       </>
//     ),
//     paragraph:
//       "An integrated platform for industrial infrastructure, from capital deployment to asset operations.",
//   },
//   {
//     id: 1,
//     heading: (
//       <>
//         Launching - <br />
//         KSH INFRA Park <br />
//         in Bengaluru
//       </>
//     ),
//     paragraph:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
//   },
//   {
//     id: 2,
//     heading: (
//       <>
//         Lorem ipsum, sit <br /> amet consectetur elit. <br /> Lorem ipsum dolor
//         sit amet.
//       </>
//     ),
//     paragraph:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
//   },
//   {
//     id: 3,
//     heading: (
//       <>
//         Lorem ipsum, sit <br /> amet consectetur elit. <br /> Lorem ipsum dolor
//         sit amet.
//       </>
//     ),
//     paragraph:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
//   },
//   {
//     id: 4,
//     heading: (
//       <>
//         Lorem ipsum, sit <br /> amet consectetur elit. <br /> Lorem ipsum dolor
//         sit amet.
//       </>
//     ),
//     paragraph:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
//   },
// ];

// // Array of images mapped for slides 1 through 4
// const imgs = [
//   "/casestud/images/case1.webp",
//   "/casestud/images/case2.jpg",
//   "/home/warehouse.png",
//   "/home/hero-bg.png",
// ];

// export default function Hero() {
//   const [slide, setSlide] = useState(0);
//   const [isRevealed, setIsRevealed] = useState(false);

//   const prevSlide = () =>
//     setSlide((s) => (s + TOTAL_SLIDES - 1) % TOTAL_SLIDES);
//   const nextSlide = () => setSlide((s) => (s + 1) % TOTAL_SLIDES);

//   const currentSlideData = SLIDES_DATA[slide];

//   // Calculate index for the next preview slide
//   const nextSlideIndex = (slide + 1) % TOTAL_SLIDES;
//   const nextSlideData = SLIDES_DATA[nextSlideIndex];

//   // Determine active background image (slide 0 uses the video)
//   const currentImgSrc = imgs[(slide - 1) % imgs.length] || imgs[0];

//   // Determine thumbnail image for the next slide preview box
//   // If next slide is 0 (the video), we fallback to the last asset image as preview
//   const nextImgSrc =
//     nextSlideIndex === 0
//       ? imgs[imgs.length - 1]
//       : imgs[(nextSlideIndex - 1) % imgs.length];

//   return (
//     <section
//       className="relative w-full overflow-hidden bg-[#0F1D3A] font-[family:var(--font-inter),sans-serif] h-screen"
//       style={{
//         // Dynamically provide the exact margin formula as a CSS variable for the subcomponents
//         // @ts-ignore
//         "--margin": "clamp(16px, 5.7vw, 80px)",
//       }}
//     >
//       {/* Scene: BG + GROWTH + Cutout */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           initial={{ scale: 1 }}
//           animate={{ scale: 1.055 }}
//           transition={{ duration: 20, ease: "easeOut" }}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-[1630/815] min-w-full min-h-full w-auto h-auto object-cover origin-center flex items-center justify-center"
//         >
//           {/* AnimatePresence allows smooth fade cross-transitions for background assets */}
//           <AnimatePresence mode="popLayout">
//             {slide === 0 ? (
//               <motion.video
//                 key="hero-video"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.6, ease: "easeInOut" }}
//                 src="/home/hero/Hero Section.mp4"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="absolute inset-0 w-full h-full object-cover pointer-events-none"
//               />
//             ) : (
//               <motion.img
//                 key={`hero-img-${slide}`}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.6, ease: "easeInOut" }}
//                 src={currentImgSrc}
//                 alt="KSH INFRA industrial park aerial view"
//                 className="absolute inset-0 w-full h-full object-cover pointer-events-none"
//               />
//             )}
//           </AnimatePresence>

//           {/* Internal elements sized predictably inside the aspect ratio box */}
//           <div className="absolute left-[58%] top-[34%] w-[62%] pb-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 pointer-events-none" />
//           <div className="absolute left-[58%] top-[34%] w-[44%] pb-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] pointer-events-none" />
//         </motion.div>
//       </div>

//       {/* Legibility scrim */}
//       <motion.div
//         initial={false}
//         animate={{ opacity: isRevealed ? 1 : 0.35 }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//         className="absolute left-0 right-0 bottom-0 h-[62%] bg-[linear-gradient(to_top,rgba(11,18,32,0.72)_0%,rgba(11,18,32,0.30)_38%,rgba(11,18,32,0)_100%)] pointer-events-none z-[2]"
//       />

//       {/* Hairlines */}
//       <div
//         className="absolute top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-[1]"
//         style={{ left: "var(--margin)" }}
//       />
//       <div
//         className="absolute top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-[1]"
//         style={{ right: "var(--margin)" }}
//       />

//       {/* Navbar receives the fluid margin style dynamically */}
//       <Navbar margin="var(--margin)" />

//       {/* Hover wrapper: full-width flex row containing both the left content and right widget */}
//       <div
//         className="absolute inset-x-0 bottom-0 z-[4] w-full h-[45%] flex items-end justify-between pointer-events-auto"
//         onMouseEnter={() => setIsRevealed(true)}
//         onMouseLeave={() => setIsRevealed(false)}
//       >
//         {/* Hero content */}
//         <motion.div
//           initial={false}
//           animate={{ y: isRevealed ? 0 : 60, opacity: isRevealed ? 1 : 0.45 }}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//           className="absolute bottom-[clamp(22px,2.4vw,35px)] z-[4] mlcont w-full max-w-[60%] pointer-events-auto"
//         >
//           <div className="flex items-center gap-2 mb-[clamp(14px,2vw,26px)]">
//             {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setSlide(i)}
//                 aria-label={`Go to slide ${i + 1}`}
//                 className={`block h-[7px] rounded-[99px] transition-[width,background] duration-300 ease border-none p-0 cursor-pointer ${
//                   i === slide
//                     ? "w-[44px] bg-white shadow-none"
//                     : "w-[22px] bg-transparent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]"
//                 }`}
//               />
//             ))}
//           </div>

//           {/* Dynamic content wrapper with Fade Up sequence on slide change */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={slide}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] }}
//             >
//               <h1 className="m-0 font-[family:var(--font-sora),sans-serif] font-semibold text-[45px] leading-[1.1] tracking-[-0.02em] text-white overflow-hidden">
//                 {currentSlideData.heading}
//               </h1>

//               {/* <p className="mt-[clamp(16px,1.4vw,22px)] mx-0 mb-0 font-[family:var(--font-inter),sans-serif] font-normal text-[clamp(13px,1.05vw,16px)] leading-[1.5] text-white/82 max-w-[clamp(280px,30vw,440px)]">
//                 {currentSlideData.paragraph}
//               </p> */}
//             </motion.div>
//           </AnimatePresence>

//           <div className="mt-[clamp(18px,2vw,28px)]">
//             <Btn
//               label="Explore Our Platform"
//               bgColor="bg-transparent"
//               arrowColor="stroke-[#fff]"
//               textColor="text-[#fff]"
//               hoverArrowColor="stroke-[#000]"
//               hoverBgColor="bg-[#fff]"
//               hoverTextColor="text-[#000]"
//               borderColor="border-white"
//               className="cursor-pointer"
//             />
//           </div>
//         </motion.div>

//         {/* Latest News widget / Navigation Hub */}
//         <motion.aside
//           initial={{ y: 16, opacity: 0 }}
//           animate={{ y: isRevealed ? 0 : 12, opacity: isRevealed ? 1 : 0.45 }}
//           transition={{
//             duration: 0.5,
//             ease: "easeInOut",
//             delay: isRevealed ? 0 : 0.1,
//           }}
//           className="hidden md:flex md:flex-col absolute bottom-[clamp(20px,2vw,28px)] right-0 z-[4] w-[clamp(312px,17vw,450px)] bg-[linear-gradient(180deg,rgba(40,46,58,0.42),rgba(20,26,38,0.5))] backdrop-blur-[2px] border border-white/18 rounded-[14px] overflow-hidden mrcont pointer-events-auto"
//         >
//           <div className="flex items-center gap-[10px] bg-white/8 p-[10px]">
//             {/* Animated thumbnail container to cross-fade next images seamlessly */}
//             <div className="shrink-0 rounded-[8px] overflow-hidden w-[81px] h-[81px] relative">
//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={nextSlideIndex}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.35, ease: "easeInOut" }}
//                   src={nextImgSrc}
//                   alt="Next slide preview thumbnail"
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />
//               </AnimatePresence>
//             </div>

//             {/* AnimatePresence facilitates smooth cross-fade animation for changing widget text preview labels */}
//             <div className="relative min-h-[40px] flex-1">
//               <AnimatePresence mode="wait">
//                 <motion.p
//                   key={nextSlideIndex}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.35, ease: "easeInOut" }}
//                   className="absolute inset-x-0 top-1/2 -translate-y-1/2 m-0 font-[family:var(--font-sora),sans-serif] font-semibold text-[clamp(13px,1vw,15px)] leading-[1.32] text-white line-clamp-2 overflow-hidden"
//                 >
//                   {nextSlideData.heading}
//                 </motion.p>
//               </AnimatePresence>
//             </div>
//           </div>
//           <div className="flex items-stretch border-t border-white">
//             <button
//               onClick={prevSlide}
//               aria-label="Previous slide"
//               className="flex-1 flex items-center justify-center h-8 bg-white/8 border-r border-white cursor-pointer transition-colors hover:bg-transparent"
//             >
//               <ChevronLeft size={30} strokeWidth={1} color="#fff" />
//             </button>
//             <button
//               onClick={nextSlide}
//               aria-label="Next slide"
//               className="flex-1 flex items-center justify-center h-8 bg-white/8 border-none cursor-pointer transition-colors hover:bg-transparent"
//             >
//               <ChevronRight size={30} strokeWidth={1} color="#fff" />
//             </button>
//           </div>
//         </motion.aside>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Btn from "@/components/ui/Btn";
import HeroVideoToggle from "@/components/ui/HeroVideoToggle";

const TOTAL_SLIDES = 3;

const SLIDES_DATA = [
  {
    id: 0,
    heading: (
      <>
        Investing, Developing <br /> and Operating Industrial
        <br /> Infrastructure at Scale
      </>
    ),
    paragraph:
      "An integrated platform for Industrial Infrastructure, from capital deployment to asset operations.",
  },
  {
    id: 1,
    heading: (
      <>
        Enabling India's
        <br /> next era of <br /> Industrial growth.
      </>
    ),
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
  },
  {
    id: 2,
    heading: (
      <>
        KSH INFRA brings <br /> its next Industrial <br /> destination to
        Chennai
      </>
    ),
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
  },
  // {
  //   id: 3,
  //   heading: (
  //     <>
  //       Lorem ipsum, sit <br /> amet consectetur elit. <br /> Lorem ipsum dolor
  //       sit amet.
  //     </>
  //   ),
  //   paragraph:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
  // },
  // {
  //   id: 4,
  //   heading: (
  //     <>
  //       Lorem ipsum, sit <br /> amet consectetur elit. <br /> Lorem ipsum dolor
  //       sit amet.
  //     </>
  //   ),
  //   paragraph:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
  // },
];

// CTA destination per slide: slide 0 → About, slide 1 → Case Studies, slide 2 → no-op link.
const CTA_LINKS = ["/about-ksh", "/case-studies", "/parks"];

// CTA button label per slide.
const CTA_LABELS = [
  "Explore Our Platform",
  "Explore Proven Results",
  "Explore Our Parks",
];

// One image per slide index (slides 0 and 1 use dedicated videos above and
// only ever show these as the "next slide" preview thumbnail; slide 2 uses
// its entry as the live background too).
const imgs = [
  "/homeasset/firstSlide.jpg",
  "/homeasset/2ndslide.jpg",
  "/homeasset/home3.jpg",
];

// Matches Tailwind's `lg` (1024px), same convention used throughout this
// codebase (Btn.tsx, ScrollFrames.tsx, OurPurpose.tsx).
const MOBILE_BREAKPOINT = 1024;

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  // Only the video matching the real viewport is ever mounted (see the two
  // video wrappers below) — mounting both desktop AND mobile variants for
  // every slide, hidden via CSS, still downloads all of them: `<video
  // preload="auto">` fetches its source regardless of display/visibility
  // CSS, so that shape was silently pulling down every variant's full file
  // (~130MB combined across 4 files) on every single page load regardless
  // of which the visitor could actually see.
  //
  // Starts as `null` ("not yet determined") rather than defaulting to
  // desktop/true: the server-rendered HTML is what the browser starts
  // fetching a <video src> from — a <video> tag's source begins downloading
  // as soon as that markup is parsed, well before React hydrates and any
  // client-side useLayoutEffect correction can run. Defaulting to true
  // would still bake a real desktop .mp4 URL into the server HTML, so a
  // mobile visitor's browser would start fetching the multi-MB desktop file
  // immediately on page load, before the correction ever had a chance to
  // apply. Rendering no <video> at all (see below) until this resolves
  // client-side is the only way to guarantee only the right file's URL
  // ever reaches the DOM.
  const [isDesktopViewport, setIsDesktopViewport] = useState<boolean | null>(
    null,
  );
  // The slide being left, kept one render behind `slide` via the ref below.
  // Its layer needs to stay on top for the fade-OUT to be visible over the
  // incoming layer — without this, the incoming slide's zIndex switched to
  // the top the instant `slide` changed, while its own opacity was still
  // ramping up from 0, which hid the outgoing layer's fade-out underneath a
  // still-transparent incoming layer and read as a hard cut instead of a
  // crossfade.
  const [outgoingSlide, setOutgoingSlide] = useState<number | null>(null);
  const prevSlideRef = useRef(0);

  useEffect(() => {
    if (prevSlideRef.current === slide) return;
    setOutgoingSlide(prevSlideRef.current);
    prevSlideRef.current = slide;
    const t = setTimeout(() => setOutgoingSlide(null), 700);
    return () => clearTimeout(t);
  }, [slide]);

  useLayoutEffect(() => {
    const checkWidth = () =>
      setIsDesktopViewport(window.innerWidth >= MOBILE_BREAKPOINT);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const prevSlide = () =>
    setSlide((s) => (s + TOTAL_SLIDES - 1) % TOTAL_SLIDES);
  const nextSlide = () => setSlide((s) => (s + 1) % TOTAL_SLIDES);

  const currentSlideData = SLIDES_DATA[slide];
  const currentCtaHref = CTA_LINKS[slide];
  const currentCtaLabel = CTA_LABELS[slide];

  // Calculate index for the next preview slide
  const nextSlideIndex = (slide + 1) % TOTAL_SLIDES;
  const nextSlideData = SLIDES_DATA[nextSlideIndex];

  // Determine active background image (slides 0 and 1 use dedicated videos)
  const currentImgSrc = imgs[slide] ?? imgs[imgs.length - 1];

  // Determine thumbnail image for the next slide preview box
  const nextImgSrc = imgs[nextSlideIndex] ?? imgs[imgs.length - 1];
  //
  return (
    // <section
    //   className="relative w-full overflow-hidden bg-[#0F1D3A] font-[family:var(--font-inter),sans-serif] min-h-[100svh] lg:h-screen flex flex-col justify-between pb-safe-bottom"
    <section
      className="relative w-full overflow-hidden bg-[#CBC4B5] font-[family:var(--font-inter),sans-serif] min-h-[100svh] lg:h-screen flex flex-col justify-between pb-safe-bottom"
      style={{
        // Dynamically provide the exact margin formula as a CSS variable for the subcomponents
        // @ts-ignore
        "--margin": "clamp(16px, 5.7vw, 80px)",
      }}
    >
      {/* Scene: BG + GROWTH + Cutout */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          // initial={{ scale: 1 }}
          // animate={{ scale: 1.055 }}
          // transition={{ duration: 20, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-[3/5] lg:aspect-[1630/815] min-w-full min-h-full w-auto h-auto object-cover origin-center flex items-center justify-center"
        >
          {/* Slide 0 and slide 1's videos are both mounted unconditionally
              from first paint (visibility toggled via opacity, not React
              conditional rendering) so BOTH start fetching/buffering the
              instant the page loads — not just whichever slide happens to
              be active. Previously slide 1's <video> elements didn't exist
              in the DOM at all until the user clicked to that slide, so
              their `preload="auto"` was meaningless (nothing to preload):
              the browser couldn't fetch a single byte of a video tag that
              hadn't been created yet, which is what actually caused the
              "hero video looks lazy-loaded" symptom — clicking to slide 1
              started the video's fetch from zero, right as it needed to
              already be playing.

              Only ONE <video> per slide is ever rendered — the one matching
              the real viewport (isDesktopViewport) — instead of mounting
              both the desktop and mobile source and hiding one with
              `hidden`/`lg:hidden`. A `<video preload="auto">` fetches its
              full source regardless of display/visibility CSS, so the
              previous "mount both, hide one" shape was downloading all 4
              files (~130MB combined) on every load no matter the device.
              The active slide's video also gets fetchPriority="high" so it
              competes for bandwidth ahead of everything else on the page,
              since it's what the visitor is looking at right now. */}
          <motion.div
            initial={false}
            animate={{ opacity: slide === 0 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: outgoingSlide === 0 ? 2 : slide === 0 ? 1 : 0 }}
          >
            {isDesktopViewport !== null && (
              <video
                key={isDesktopViewport ? "hero0-desktop" : "hero0-mobile"}
                src={
                  isDesktopViewport
                    ? "/homeasset/Hero_Section.mp4"
                    : "/homeasset/home_sectionmob.mp4"
                }
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                // @ts-expect-error -- fetchPriority is valid on <video>
                // (Chrome honors it), but not yet in React's DOM typings.
                fetchPriority={slide === 0 ? "high" : "auto"}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            )}
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: slide === 1 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: outgoingSlide === 1 ? 2 : slide === 1 ? 1 : 0 }}
          >
            {isDesktopViewport !== null && (
              <video
                key={isDesktopViewport ? "hero1-desktop" : "hero1-mobile"}
                src={
                  isDesktopViewport
                    ? "/homeasset/Hero_Section2.mp4"
                    : "/homeasset/home_sectionmob2.mp4"
                }
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                // @ts-expect-error -- see fetchPriority note above.
                fetchPriority={slide === 1 ? "high" : "auto"}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            )}
          </motion.div>

          {/* Slide 2 (and any future non-video slide) keeps the original
              AnimatePresence crossfade — plain images have no
              fetch-ahead-of-time concern the way autoplaying video does. */}
          <AnimatePresence mode="popLayout">
            {slide !== 0 && slide !== 1 && (
              <motion.div
                key="hero-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <motion.img
                  key={`hero-img-${slide}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  src={currentImgSrc}
                  alt="KSH INFRA Industrial park aerial view"
                  className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                {/*  */}
                <motion.img
                  key={`hero-img-mobile-${slide}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  src="/homeasset/homespot3.jpg"
                  alt="KSH INFRA Industrial park aerial view"
                  className="lg:hidden absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Internal elements sized predictably inside the aspect ratio box - Hidden completely on mobile */}
          <div className="hidden lg:block absolute left-[58%] top-[34%] w-[62%] pb-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 pointer-events-none" />
          <div className="hidden lg:block absolute left-[58%] top-[34%] w-[44%] pb-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] pointer-events-none" />
        </motion.div>
      </div>

      {/* Legibility scrim */}
      {/* Desktop Overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: isRevealed ? 1 : 0.35 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="hidden lg:block absolute left-0 right-0 bottom-0 h-[62%] bg-[linear-gradient(to_top,rgba(11,18,32,0.72)_0%,rgba(11,18,32,0.30)_38%,rgba(11,18,32,0)_100%)] pointer-events-none z-[2]"
      />
      {/* Mobile Darker Overlay */}
      <div className="block lg:hidden absolute inset-0 bg-[linear-gradient(to_top,rgba(11,18,32,0.95)_0%,rgba(11,18,32,0.65)_50%,rgba(11,18,32,0.2)_100%)] pointer-events-none z-[2]" />

      {/* Hairlines - Kept for desktop alignment */}
      <div
        className="absolute top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-[1]"
        style={{ left: "var(--margin)" }}
      />
      <div
        className="absolute top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-[1]"
        style={{ right: "var(--margin)" }}
      />

      {/* Navbar receives the fluid margin style dynamically */}

      {/* ----------------- MOBILE CONTENT LAYOUT ----------------- */}
      <div className="lg:hidden relative z-[4] w-[91%] mx-auto flex-1 flex flex-col justify-end pt-[40px] pb-[0px] pointer-events-auto">
        {/* Upper wrapper for stacked items */}
        <div className="flex flex-col items-start w-full">
          {/* Slide Indicators */}
          <div className="flex items-center justify-center gap-[10px] mb-[20px]">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`block h-[7px] rounded-[99px] transition-[width,background] duration-300 ease border-none p-0 cursor-pointer min-w-[22px] min-h-[7px] ${
                  i === slide
                    ? "w-[44px] bg-white shadow-none"
                    : "w-[22px] bg-transparent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]"
                }`}
              />
            ))}
          </div>

          {/* Dynamic text reveal sequence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] }}
              className="lg:w-[60%] flex flex-col items-start"
            >
              <h1 className="m-0 font-[family:var(--font-sora),sans-serif] font-semibold text-[24px] sm:text-[36px] leading-[1.1] tracking-[-0.02em] text-left text-white">
                {currentSlideData.heading}
              </h1>
              {/* 
              <p className="mt-[10px] mx-0 mb-0 font-[family:var(--font-inter),sans-serif] font-normal text-[13px] sm:text-[16px] leading-[1.5] text-white/80 text-left max-w-[440px]">
                {currentSlideData.paragraph}
              </p> */}
            </motion.div>
          </AnimatePresence>

          {/* CTA Button */}
          <div className="mt-[16px] min-h-[48px] flex items-center justify-center gap-3">
            <HeroVideoToggle inline />
            <Btn
              label={currentCtaLabel}
              href={currentCtaHref}
              bgColor="bg-transparent"
              arrowColor="stroke-[#fff]"
              textColor="text-[#fff]"
              hoverArrowColor="stroke-[#000]"
              hoverBgColor="bg-[#fff]"
              hoverTextColor="text-[#000]"
              borderColor="border-white"
              className="cursor-pointer py-1 px-6 h-[40px] flex items-center justify-center"
            />
          </div>
        </div>

        {/* Simplified Mobile Widget */}
        <div className="mt-[20px] w-full bg-[linear-gradient(180deg,rgba(40,46,58,0.5),rgba(20,26,38,0.6))] backdrop-blur-[4px] border border-white/18 rounded-t-[12px] overflow-hidden flex flex-col shadow-lg">
          <div className="flex items-center gap-[10px] p-[8px]">
            {/* Compressed Thumbnail */}
            <div className="shrink-0 rounded-[6px] overflow-hidden w-[48px] h-[48px] relative bg-[#bb985f]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={nextSlideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  src={nextImgSrc}
                  alt="Next slide preview thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Next Heading Preview */}
            <div className="relative min-h-[36px] flex-1 flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={nextSlideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="m-0 font-[family:var(--font-sora),sans-serif] font-semibold text-[13px] leading-[1.25] text-white line-clamp-2 text-left"
                >
                  {nextSlideData?.heading}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Compact Mobile Interactive Buttons */}
          <div className="flex items-stretch border-t border-white/15">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex-1 flex items-center justify-center h-[35px] lg:h-[42px] bg-white/5 border-r border-white/20 cursor-pointer active:bg-white/10 transition-colors"
            >
              <ChevronLeft size={20} strokeWidth={1.5} color="#fff" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex-1 flex items-center justify-center h-[35px] lg:h-[42px] bg-white/5 border-none cursor-pointer active:bg-white/10 transition-colors"
            >
              <ChevronRight size={20} strokeWidth={1.5} color="#fff" />
            </button>
          </div>
        </div>
      </div>

      {/* ----------------- DESKTOP CONTENT LAYOUT ----------------- */}
      <div
        className="hidden lg:flex absolute inset-x-0 bottom-0 z-[4] w-full h-[45%] items-end justify-between pointer-events-auto"
        onMouseEnter={() => setIsRevealed(true)}
        onMouseLeave={() => setIsRevealed(false)}
        // Keyboard users get the same reveal when tabbing into its links.
        onFocus={() => setIsRevealed(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setIsRevealed(false);
          }
        }}
      >
        {/* Hero content */}
        <motion.div
          initial={false}
          animate={{ y: isRevealed ? 0 : 60, opacity: isRevealed ? 1 : 0.45 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute bottom-[clamp(22px,2.4vw,35px)] z-[4] mlcont w-full max-w-[60%] pointer-events-auto"
          // style={{ left: "var(--margin)" }}
        >
          <div className="flex items-center gap-2 mb-[clamp(14px,2vw,26px)]">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`block h-[7px] rounded-[99px] transition-[width,background] duration-300 ease border-none p-0 cursor-pointer ${
                  i === slide
                    ? "w-[44px] bg-white shadow-none"
                    : "w-[22px] bg-transparent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]"
                }`}
              />
            ))}
          </div>

          {/* Dynamic content wrapper with Fade Up sequence on slide change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] }}
            >
              <h1 className="m-0 font-[family:var(--font-sora),sans-serif] font-semibold text-[45px] leading-[1.1] tracking-[-0.02em] text-white overflow-hidden">
                {currentSlideData.heading}
              </h1>
            </motion.div>
          </AnimatePresence>

          <div className="mt-[clamp(18px,2vw,28px)] flex items-center gap-4">
            <HeroVideoToggle inline />
            <Btn
              label={currentCtaLabel}
              href={currentCtaHref}
              bgColor="bg-transparent"
              arrowColor="stroke-[#fff]"
              textColor="text-[#fff]"
              hoverArrowColor="stroke-[#000]"
              hoverBgColor="bg-[#fff]"
              hoverTextColor="text-[#000]"
              borderColor="border-white"
              className="cursor-pointer"
            />
          </div>
        </motion.div>

        {/* Latest News widget / Navigation Hub */}
        <motion.aside
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: isRevealed ? 0 : 12, opacity: isRevealed ? 1 : 0.45 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            delay: isRevealed ? 0 : 0.1,
          }}
          className="absolute bottom-[clamp(20px,2vw,28px)] z-[4] w-[clamp(312px,17vw,450px)] bg-[linear-gradient(180deg,rgba(40,46,58,0.42),rgba(20,26,38,0.5))] backdrop-blur-[2px] border border-white/18 rounded-[14px] overflow-hidden  pointer-events-auto"
          style={{ right: "var(--margin)" }}
        >
          <div className="flex items-center gap-[10px] bg-white/8 p-[10px]">
            <div className="shrink-0 rounded-[8px] overflow-hidden w-[81px] h-[81px] relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={nextSlideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  src={nextImgSrc}
                  alt="Next slide preview thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            <div className="relative min-h-[40px] flex-1">
              <AnimatePresence mode="wait">
                <motion.p
                  key={nextSlideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 m-0 font-[family:var(--font-sora),sans-serif] font-semibold text-[clamp(13px,1vw,15px)] leading-[1.32] text-white line-clamp-2 md:line-clamp-4 overflow-hidden"
                >
                  {nextSlideData.heading}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-stretch border-t border-white/15">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex-1 flex items-center justify-center h-8 bg-white/8 border-r border-white/15 cursor-pointer transition-colors hover:bg-transparent"
            >
              <ChevronLeft size={30} strokeWidth={1} color="#fff" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex-1 flex items-center justify-center h-8 bg-white/8 border-none cursor-pointer transition-colors hover:bg-transparent"
            >
              <ChevronRight size={30} strokeWidth={1} color="#fff" />
            </button>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
