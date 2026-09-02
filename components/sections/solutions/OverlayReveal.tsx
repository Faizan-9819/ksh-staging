// "use client";

// import React, { useRef } from "react";
// import Image from "next/image";
// import { motion, useScroll, useTransform } from "framer-motion";

// export default function OverlayReveal() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Track scroll progress across the 260vh container height
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Replicate GSAP's counter-directional translation:
//   // Overlay moves UP (-100%), Inner Image moves DOWN (+100%) to stay stationary.
//   const overlayY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
//   const innerY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

//   return (
//     // Outer scroll section acting as the pinning track (100vh viewport + 160vh scroll distance = 260vh)
//     <section ref={containerRef} className="relative h-[260vh] w-full bg-black">
//       {/* Sticky container replacing ScrollTrigger pin */}
//       <div className="sticky top-0 h-screen w-full overflow-hidden">
//         {/* Layer 1: Colored Image (Base Layer - Bottom) */}
//         <div className="absolute inset-0 z-0 h-full w-full">
//           {/* Mobile Colored Image */}
//           <Image
//             src="/solutions/mob2.jpg"
//             alt="Realized Building Mobile"
//             fill
//             priority
//             sizes="100vw"
//             className="object-cover object-center md:hidden"
//           />
//           {/* Desktop Colored Image */}
//           <Image
//             src="/solutions/bgoverlay.jpg"
//             alt="Realized Building Desktop"
//             fill
//             priority
//             sizes="100vw"
//             className="hidden object-cover object-center md:block"
//           />
//         </div>

//         {/* Layer 2: Blueprint Image Overlay Wrapper (Top Layer) */}
//         <motion.div
//           style={{ y: overlayY }}
//           className="absolute inset-0 z-10 h-full w-full overflow-hidden will-change-transform"
//         >
//           {/* Inner Container moving counter-directionally to stay aligned */}
//           <motion.div
//             style={{ y: innerY }}
//             className="relative h-full w-full will-change-transform"
//           >
//             {/* Mobile Blueprint Image */}
//             <Image
//               src="/solutions/mob1.jpg"
//               alt="Blueprint Architectural Sketch Mobile"
//               fill
//               priority
//               sizes="100vw"
//               className="object-cover object-center md:hidden"
//             />
//             {/* Desktop Blueprint Image */}
//             <Image
//               src="/solutions/overlay.webp"
//               alt="Blueprint Architectural Sketch Desktop"
//               fill
//               priority
//               sizes="100vw"
//               className="hidden object-cover object-center md:block"
//             />
//           </motion.div>
//         </motion.div>

//         {/* Layer 3: Fixed Content Overlay (Heading + Paragraph) */}
//         <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-start px-4 pt-12 sm:px-6 sm:pt-16 md:px-8 md:pt-20 lg:pt-16">
//           <div className="max-w-3xl text-center">
//             <h2 className="text-2xl font-semibold tracking-tight text-[#111111] sm:text-3xl md:text-4xl lg:text-5xl">
//               Sustainable Growth
//             </h2>
//             <p className="mt-3 text-xs leading-relaxed text-[#4A4A4A] sm:mt-4 sm:text-sm md:text-base md:leading-[140%] lg:text-lg">
//               We combine deep market knowledge with hands-on expertise to
//               deliver complete success for your industrial real estate needs.
//               From finding the right land to managing every aspect of the
//               property, we don&apos;t just meet industry standards — we set
//               them.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { lenisScrollTo } from "@/components/ui/LenisProvider";

export default function OverlayReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayWrapperRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the 260vh container height (Desktop)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Drives every transform below. Unlike scrollYProgress, this only ever
  // moves forward — scrolling back up holds the reveal at its furthest
  // point instead of rewinding it — and it permanently stops being updated
  // once the section settles (see below), so the frozen frame can never be
  // replayed by scrolling back into it.
  const progress = useMotionValue(0);

  const [isSettled, setIsSettled] = useState(false);
  const hasSettledRef = useRef(false);
  const scrollFixRef = useRef<number | null>(null);

  // Same mechanism as OurPurpose.tsx/ScrollFrames.tsx: advance `progress`
  // with scroll, but only forward, and the instant it first reaches the
  // end, settle permanently and unsubscribe entirely — nothing left for
  // this handler to do, and it keeps the section from ever being
  // re-pinned or re-driven by scroll again.
  useEffect(() => {
    if (isSettled) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (hasSettledRef.current) return;

      if (latest > progress.get()) {
        progress.set(latest);
      }

      if (latest >= 0.999) {
        hasSettledRef.current = true;
        progress.set(1);

        // Measure the still-tall container before React collapses it to a
        // single viewport, so the scroll position can be corrected by the
        // exact same amount once that collapse commits.
        const rect = containerRef.current?.getBoundingClientRect();
        scrollFixRef.current = rect ? rect.height - window.innerHeight : null;

        setIsSettled(true);
      }
    });

    return () => unsubscribe();
  }, [isSettled, scrollYProgress, progress]);

  // Collapsing the section from its tall scroll-runway height down to a
  // single viewport pulls everything below it upward by the runway's
  // height. useLayoutEffect runs after that height actually commits to the
  // DOM but before the browser paints, so the correction below lands
  // before the user ever sees the shift.
  //
  // A plain window.scrollBy/scrollTo isn't enough here: Lenis drives real
  // scroll on its own independent rAF loop and tracks its own internal
  // *target* separately from the current position — a native scroll call
  // only nudges the current position, and Lenis's very next tick resumes
  // easing toward the old, stale (taller) target and overrides the
  // correction, which is what reads as the page jumping into the next
  // section. lenisScrollTo(..., { immediate: true }) goes through Lenis
  // itself and overwrites both the current position AND that target in one
  // shot, so there's nothing stale left for the next tick to chase.
  useLayoutEffect(() => {
    if (!isSettled || scrollFixRef.current == null) return;
    lenisScrollTo(window.scrollY - scrollFixRef.current, { immediate: true });
    scrollFixRef.current = null;
  }, [isSettled]);

  // Replicate GSAP's counter-directional translation:
  // Overlay moves UP (-100%), Inner Image moves DOWN (+100%) to stay stationary.
  const overlayY = useTransform(progress, [0, 1], ["0%", "-100%"]);
  const innerY = useTransform(progress, [0, 1], ["0%", "100%"]);

  // The blueprint layer covers the full viewport and slides straight up, so it
  // uncovers the sticky viewport from the BOTTOM edge upward — the boundary
  // only reaches the text (pinned near the TOP) very close to the end of the
  // scroll. Interpolating color across the full [0, 1] range therefore looks
  // "slow": the text starts fading long before the curtain has actually
  // reached it. Instead we measure exactly when that boundary sweeps past the
  // text block and confine the color change to that narrow window, so it
  // flips right as the reveal passes over it instead of drifting the whole
  // scroll.
  const [revealWindow, setRevealWindow] = useState<[number, number]>([
    0.9, 0.97,
  ]);

  useEffect(() => {
    function measure() {
      const wrapper = overlayWrapperRef.current;
      const textBlock = textBlockRef.current;
      if (!wrapper || !textBlock) return;

      const viewportHeight = window.innerHeight;
      const textTop = parseFloat(getComputedStyle(wrapper).paddingTop || "0");
      const textBottom = textTop + textBlock.offsetHeight;

      const start = Math.min(0.98, Math.max(0, 1 - textBottom / viewportHeight));
      const end = Math.min(1, Math.max(start + 0.01, 1 - textTop / viewportHeight));
      setRevealWindow([start, end]);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Text starts dark (readable over the blueprint layer) and snaps to white
  // exactly as the sliding curtain's edge passes over its own position.
  const headingColor = useTransform(
    progress,
    revealWindow,
    ["#111111", "#ffffff"],
  );
  const paragraphColor = useTransform(
    progress,
    revealWindow,
    ["#4A4A4A", "#ffffff"],
  );

  return (
    <>
      {/* ========================================================================= */}
      {/* MOBILE VIEW (Static, 75vh height, bottom-clipped image, white text)      */}
      {/* ========================================================================= */}
      <section className="relative h-[75vh] w-full overflow-hidden bg-black md:hidden">
        {/* Static Mobile Image Container */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Image
            src="/solutions/solu3.webp"
            alt="Sustainable Growth Mobile"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          {/* Subtle overlay to ensure high readability for white text */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content Overlay (White Text for Mobile) */}
        <div className="relative z-10 flex h-full flex-col items-center justify-start px-5 pt-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Sustainable Growth
          </h2>
          <p className="mt-3 text-[15px] leading-normal text-white/90 sm:mt-4 sm:text-sm">
            We combine deep market knowledge with hands-on expertise to deliver
            complete success for your Industrial real estate needs. From finding
            the right land to managing every aspect of the property, we
            don&apos;t just meet industry standards — we set them.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (Pinning Scroll-Reveal Animation — plays once, then settles */}
      {/* into a normal, non-sticky static section, per isSettled above)          */}
      {/* ========================================================================= */}
      <section
        ref={containerRef}
        className={`relative hidden w-full bg-black md:block ${
          isSettled ? "h-screen" : "h-[260vh]"
        }`}
      >
        {/* Sticky container replacing ScrollTrigger pin — drops the pin for
            good once isSettled (see the settle effect above). */}
        <div
          className={`${
            isSettled ? "relative" : "sticky top-0"
          } h-screen w-full overflow-hidden`}
        >
          {/* Layer 1: Colored Image (Base Layer - Bottom) */}
          <div className="absolute inset-0 z-0 h-full w-full">
            <Image
              src="/solutions/bgoverlay.jpg"
              alt="Realized Building Desktop"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Layer 2: Blueprint Image Overlay Wrapper (Top Layer) */}
          <motion.div
            style={{ y: overlayY }}
            className="absolute inset-0 z-10 h-full w-full overflow-hidden will-change-transform"
          >
            {/* Inner Container moving counter-directionally to stay aligned */}
            <motion.div
              style={{ y: innerY }}
              className="relative h-full w-full will-change-transform"
            >
              <Image
                src="/solutions/overlay.webp"
                alt="Blueprint Architectural Sketch Desktop"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>

          {/* Layer 3: Fixed Content Overlay (Heading + Paragraph) */}
          <div
            ref={overlayWrapperRef}
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-start px-4 pt-12 sm:px-6 sm:pt-16 md:px-8 md:pt-20 lg:pt-16"
          >
            <div ref={textBlockRef} className="max-w-3xl text-center">
              <motion.h2
                style={{ color: headingColor }}
                className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
              >
                Sustainable Growth
              </motion.h2>
              <motion.p
                style={{ color: paragraphColor }}
                className="mt-3 text-xs leading-relaxed sm:mt-4 sm:text-sm md:text-base md:leading-[140%] lg:text-lg"
              >
                We combine deep market knowledge with hands-on expertise to
                deliver complete success for your Industrial real estate needs.
                From finding the right land to managing every aspect of the
                property, we don&apos;t just meet industry standards — we set
                them.
              </motion.p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
