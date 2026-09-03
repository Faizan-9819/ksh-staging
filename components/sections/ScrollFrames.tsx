// "use client";

// import { useRef, useEffect, useState } from "react";

// const CARDS = [
//   { num: "07", unit: "Parks", label: "Assets Developed" },
//   { num: "10Mn", unit: "Sq.Ft.", label: "Planned Development" },
//   { num: "04Mn", unit: "Sq.Ft.", label: "Developed (in Pune)" },
//   { num: "03Mn", unit: "Sq.Ft.", label: "Under Development" },
// ];

// const startFrame = 1;
// const endFrame = 218;
// const totalFrames = endFrame - startFrame + 1;
// const pixelsPerFrame = 5;

// function padNum(n: number) {
//   return String(n).padStart(6, "0");
// }

// export default function ScrollFrames() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const imagesRef = useRef<HTMLImageElement[]>([]);
//   const lastFrame = useRef(0);
//   const [shouldLoad, setShouldLoad] = useState(false);
//   const [scrollHeight, setScrollHeight] = useState(0);
//   const [revealedCount, setRevealedCount] = useState(0);
//   const revealedRef = useRef(0);
//   const staggerTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

//   const drawFrame = (index: number) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");
//     if (!canvas || !ctx) return;
//     const img = imagesRef.current[index];
//     if (!img || !img.complete) return;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (canvasRef.current) {
//         canvasRef.current.width = window.innerWidth;
//         canvasRef.current.height = window.innerHeight;
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     const total = totalFrames * pixelsPerFrame + window.innerHeight;
//     setScrollHeight(total * 1.5);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setShouldLoad(true);
//           observer.disconnect();
//         }
//       },
//       { rootMargin: "500px" },
//     );
//     if (containerRef.current) observer.observe(containerRef.current);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!shouldLoad) return;
//     const imgs: HTMLImageElement[] = [];
//     for (let i = startFrame; i <= endFrame; i++) {
//       const img = new Image();
//       img.src = `/homeasset/frames2/frame_${padNum(i)}.webp`;
//       img.onload = () => {
//         if (i === startFrame) drawFrame(0);
//       };
//       imgs.push(img);
//     }
//     imagesRef.current = imgs;
//   }, [shouldLoad]);

//   useEffect(() => {
//     const onScroll = () => {
//       if (
//         !containerRef.current ||
//         !shouldLoad ||
//         imagesRef.current.length === 0
//       )
//         return;
//       const rect = containerRef.current.getBoundingClientRect();
//       const scrollTop = -rect.top;
//       const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
//       const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
//       const frameIndex = Math.floor(progress * (imagesRef.current.length - 1));
//       if (frameIndex !== lastFrame.current) {
//         lastFrame.current = frameIndex;
//         drawFrame(frameIndex);
//       }
//       const isPinned = rect.top <= 0;
//       if (isPinned && revealedRef.current === 0) {
//         staggerTimers.current.forEach(clearTimeout);
//         staggerTimers.current = [];
//         CARDS.forEach((_, i) => {
//           const t = setTimeout(() => {
//             revealedRef.current = i + 1;
//             setRevealedCount(i + 1);
//           }, i * 200);
//           staggerTimers.current.push(t);
//         });
//       } else if (!isPinned && revealedRef.current > 0) {
//         staggerTimers.current.forEach(clearTimeout);
//         staggerTimers.current = [];
//         revealedRef.current = 0;
//         setRevealedCount(0);
//       }
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [shouldLoad]);

//   return (
//     <section
//       ref={containerRef}
//       style={{ height: scrollHeight ? `${scrollHeight}px` : "100vh" }}
//       className="relative w-full bg-[#]"
//     >
//       <style jsx global>{`
//         @keyframes shine-anim {
//           0% {
//             transform: translateX(-100%);
//           }
//           100% {
//             transform: translateX(330%);
//           }
//         }
//         .group:hover .shine-line {
//           animation: shine-anim 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
//         }
//       `}</style>

//       <div className="sticky top-0 h-screen w-full overflow-hidden">
//         <canvas
//           ref={canvasRef}
//           className="absolute inset-0 w-full h-full object-cover"
//         />

//         {/* Sticky Title Block */}
//         <div className="absolute top-0 left-0 right-0 z-10 pt-10 md:pt-16 px-4 md:px-10 lg:px-20">
//           <h2 className="section-title w-full text-center text-[30px] md:text-[40px] font-bold tracking-tight">
//             Our Portfolio by the Numbers
//           </h2>
//         </div>

//         {/* Bottom Pinning Section */}
//         <div className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-10 lg:px-20 grid grid-cols-2 lg:grid-cols-4 gap-x-[30px]">
//           {CARDS.map((card, i) => {
//             const visible = i < revealedCount;
//             return (
//               <div
//                 key={i}
//                 className="group relative overflow-hidden p-[30px] bg-white hover:bg-[#D6C5A0] duration-500 cursor-pointer"
//                 style={{
//                   borderRadius: "20px 20px 0 0",
//                   opacity: visible ? 1 : 0,
//                   transform: visible ? "translateY(0)" : "translateY(100%)",
//                   transition:
//                     "all 0.5s cubic-bezier(.22,.61,.36,1), opacity 0.5s ease",
//                 }}
//               >
//                 {/* Static Shine Lines - Fixed position on the right */}
//                 {/* We use opacity-0 by default and group-hover:opacity-100 to fade them in */}
//                 <div className="absolute -top-20 right-full w-[20px] h-[600px] bg-white/20 blur-[8px] rotate-[25deg] opacity-0 group-hover:opacity-70 transition-all group-hover:right-[100px] duration-500" />
//                 <div className="absolute -top-20 right-full w-[20px] h-[600px] bg-white/20 blur-[8px] rotate-[25deg] opacity-0 group-hover:opacity-70 transition-all group-hover:right-[140px] duration-500" />
//                 <div className="relative z-10 flex flex-col h-full">
//                   <div className="h-[80px] mb-3 flex items-end">
//                     <div className="flex items-baseline gap-1.5">
//                       {/* <h6 className="2xl:text-[40px] text-[36px] group-hover:text-[44px] 2xl:group-hover:text-[54px] transition-all duration-300 leading-none tracking-[-0.02em] text-[#000]"> */}
//                       <h6 className="2xl:text-[40px] text-[36px] tracking-[-0.02em] text-[#000]">
//                         {card.num}
//                       </h6>

//                       <span className="text-[24px] leading-none font-[family-name:var(--font-sora),sans-serif] text-[#6D6D6D]">
//                         {card.unit}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="w-full h-[1px] mb-3 bg-[#B9B9B9]" />

//                   <div className="text-[18px] text-[#212121] font-[family-name:var(--font-sora),sans-serif]">
//                     {card.label}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import {
  lenisScrollTo,
  isScrollJumpInProgress,
} from "@/components/ui/LenisProvider";

const CARDS = [
  { num: "07", unit: "Parks", label: "Assets Developed" },
  { num: "10 Mn.", unit: "Sq. Ft.", label: "Planned Development" },
  { num: "04 Mn.", unit: "Sq. Ft.", label: "Developed (in Pune)" },
  { num: "03 Mn.", unit: "Under Dev.", label: "Under Development" }, // Shortened unit for tight mobile viewports
];

const startFrame = 1;
const endFrame = 218;
const totalFrames = endFrame - startFrame + 1;
const pixelsPerFrame = 5;

function padNum(n: number) {
  return String(n).padStart(6, "0");
}

export default function ScrollFrames() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrame = useRef(0);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  // Default to desktop so the initial (pre-hydration) render never shows the
  // mobile branch on a real desktop screen — corrected synchronously below,
  // before paint, via useLayoutEffect.
  const [isDesktop, setIsDesktop] = useState(true);
  const revealedRef = useRef(0);
  const staggerTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  // Once the scrubbed animation completes on its first forward pass, the
  // section permanently stops being sticky/scroll-scrubbed for the rest of
  // the page load — scrolling back up (or down again) never re-pins it or
  // replays the reveal. hasSettledRef guards the scroll handler itself
  // (synchronous, no re-render delay); isSettled drives the actual
  // sticky -> static style swap.
  const hasSettledRef = useRef(false);
  const [isSettled, setIsSettled] = useState(false);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    // On a cold cache not every frame up to `index` has finished downloading
    // yet — fall back to the nearest earlier frame that has, so scrolling
    // ahead of the download still shows visible progress instead of holding
    // on a blank canvas (same fallback already used by OurPurpose.tsx).
    let i = index;
    while (
      i >= 0 &&
      (!imagesRef.current[i] ||
        !imagesRef.current[i].complete ||
        imagesRef.current[i].naturalWidth === 0)
    ) {
      i -= 1;
    }
    if (i < 0) return;
    const img = imagesRef.current[i];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // Runs synchronously before the browser paints, so neither device ever
  // flashes the other's version — this is the only thing that needs to run
  // unconditionally; everything else below is desktop-only and skips
  // entirely on mobile (mobile just plays a plain looping video instead).
  useLayoutEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 1024);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    const total = totalFrames * pixelsPerFrame + window.innerHeight;
    setScrollHeight(total * 1.5);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDesktop]);

  useEffect(() => {
    // Frame downloads used to wait for an IntersectionObserver to fire
    // (500px before the section entered view) before even starting — on a
    // cold cache that left no time for 218 webp requests to land before the
    // user actually scrolled in, so the canvas sat blank/frozen until they
    // trickled in. Kicking the fetch off right after mount instead (idle,
    // low-priority, well behind the hero's own load) gives it the maximum
    // head start while never competing with anything above the fold for
    // bandwidth — same trade-off already proven out in OurPurpose.tsx.
    if (!isDesktop) return;
    // requestIdleCallback isn't implemented in Safari — fall back to a
    // macrotask so this still runs just as reliably there, only without
    // the "wait for actual browser idle time" refinement.
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(() => setShouldLoad(true), {
        timeout: 2000,
      });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = setTimeout(() => setShouldLoad(true), 0);
    return () => clearTimeout(timeoutId);
  }, [isDesktop]);

  useEffect(() => {
    if (!shouldLoad) return;
    const imgs: HTMLImageElement[] = [];
    for (let i = startFrame; i <= endFrame; i++) {
      const img = new Image();
      // Deliberately below the hero's/LCP's own fetch priority — this is
      // 218 requests' worth of background work that should never delay
      // anything already competing for the connection pool above the fold.
      img.fetchPriority = "low";
      img.src = `/homeasset/frames2/frame_${padNum(i)}.webp`;
      img.onload = () => {
        const idx = i - startFrame;
        // All 218 requests fire at once, so any frame can finish loading
        // well after the user has already scrolled past it — redrawing
        // whenever the frame that just landed is the one currently wanted
        // (not on every single onload) keeps the canvas catching up without
        // forcing 218 needless repaints right as the section scrolls in.
        if (idx === 0 || idx === lastFrame.current) drawFrame(lastFrame.current);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [shouldLoad]);

  useEffect(() => {
    // Once settled, stop listening entirely — nothing left for this handler
    // to do, and it keeps the section from ever being re-driven by scroll.
    if (!isDesktop || isSettled) return;

    // Native scroll events can fire more often than the browser paints
    // (especially with precision trackpads), so running the canvas redraw
    // directly on every event can pile up more work than a single frame
    // budget allows — that pile-up is what reads as a jerk. Coalescing to
    // one measure+draw per animation frame keeps the work in step with
    // paint (same fix used for the scroll-scrubbed canvas in OurPurpose).
    let ticking = false;

    const update = () => {
      ticking = false;
      if (
        hasSettledRef.current ||
        !containerRef.current ||
        !shouldLoad ||
        imagesRef.current.length === 0 ||
        // A hash-link jump (e.g. navbar -> Testimonials) is passing through
        // this section's scroll range — ignore it so the pin/settle logic
        // never engages mid-flight and strands the jump here.
        isScrollJumpInProgress()
      )
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = -rect.top;
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      const frameIndex = Math.floor(progress * (imagesRef.current.length - 1));
      if (frameIndex !== lastFrame.current) {
        lastFrame.current = frameIndex;
        drawFrame(frameIndex);
      }
      const isPinned = rect.top <= 0;
      if (isPinned && revealedRef.current === 0) {
        staggerTimers.current.forEach(clearTimeout);
        staggerTimers.current = [];
        CARDS.forEach((_, i) => {
          const t = setTimeout(() => {
            revealedRef.current = i + 1;
            setRevealedCount(i + 1);
          }, i * 200);
          staggerTimers.current.push(t);
        });
      } else if (!isPinned && revealedRef.current > 0) {
        staggerTimers.current.forEach(clearTimeout);
        staggerTimers.current = [];
        revealedRef.current = 0;
        setRevealedCount(0);
      }

      // Reached the last frame on this first forward pass — settle
      // permanently. Guaranteeing all cards are revealed here (rather than
      // relying on the stagger timers, which fire early in the pin range
      // and should already be done) covers a fast-scroll/fling edge case.
      if (progress >= 1 && !hasSettledRef.current) {
        hasSettledRef.current = true;
        staggerTimers.current.forEach(clearTimeout);
        staggerTimers.current = [];
        revealedRef.current = CARDS.length;
        setRevealedCount(CARDS.length);
        setIsSettled(true);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDesktop, isSettled, shouldLoad]);

  // Shrinking the section from its tall scroll-runway height down to a
  // single viewport pulls everything below it upward by exactly that
  // difference. useLayoutEffect runs after the height actually commits to
  // the DOM but before the browser paints, so this lands before the user
  // ever sees the shift.
  //
  // A plain window.scrollBy isn't enough here: Lenis drives real scroll on
  // its own independent rAF loop, and it tracks its own internal *target*
  // separately from the current position — after a fast scroll/fling that
  // target is already primed to keep gliding well past this section on
  // momentum alone. A native scrollBy only nudges the current position;
  // Lenis's very next tick then resumes easing toward that stale, further-
  // down target and overrides the correction — which is what read as the
  // page suddenly jumping past two more sections. lenisScrollTo(..., {
  // immediate: true }) goes through Lenis itself and overwrites both the
  // current position AND that target in one shot, so there's nothing stale
  // left for the next tick to chase.
  useLayoutEffect(() => {
    if (!isSettled) return;
    const delta = scrollHeight - window.innerHeight;
    if (delta > 0) {
      lenisScrollTo(window.scrollY - delta, { immediate: true });
    }
  }, [isSettled, scrollHeight]);

  // Mobile: no scroll-driven frame animation — just a plain looping video,
  // playing normally, with the same title + stats cards shown statically.
  if (!isDesktop) {
    return (
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        >
          <source
            src="/homeasset/final home mobile  white v3.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute top-0 left-0 right-0 z-10 pt-8 sm:pt-10 px-4">
          <h2 className="section-title w-full text-center text-[24px] sm:text-[30px] font-semibold tracking-tight text-white drop-shadow-sm">
            Our Portfolio by the Numbers
          </h2>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-10 sm:pb-6 grid grid-cols-2 gap-3 sm:gap-4 max-h-[50vh] sm:max-h-[40vh] overflow-y-auto">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="relative overflow-hidden py-2 px-2 sm:py-10 sm:px-5 bg-white flex flex-col justify-between min-h-[110px] sm:min-h-[140px] rounded-[16px]"
            >
              <div className="relative z-10 flex flex-col h-full justify-around">
                <div className="h-auto mb-1 flex items-end">
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <h6 className="text-[18px] sm:text-[14px] tracking-[-0.02em] text-[#000] leading-none">
                      {card.num}
                    </h6>
                    <span className="text-[14px] sm:text-[18px] leading-none font-[family-name:var(--font-sora),sans-serif] text-[#6D6D6D]">
                      {card.unit}
                    </span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#B9B9B9]" />

                <div className="text-[12px] sm:text-[14px] text-[#212121] font-[family-name:var(--font-sora),sans-serif] leading-tight font-medium">
                  {card.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      style={{
        height: isSettled
          ? "100vh"
          : scrollHeight
            ? `${scrollHeight}px`
            : "100vh",
      }}
      className="relative w-full bg-[#]"
    >
      <style jsx global>{`
        @keyframes shine-anim {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(330%);
          }
        }
        .group:hover .shine-line {
          animation: shine-anim 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div
        className={`${isSettled ? "relative" : "sticky top-0"} h-screen w-full overflow-hidden flex flex-col justify-between`}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Responsive Sticky Title Block */}
        <div className="absolute top-0 left-0 right-0 z-10 pt-8 sm:pt-10 md:pt-16 px-4 md:px-10 lg:px-20">
          <h2 className="section-title w-full text-center text-[24px] sm:text-[30px] md:text-[40px] font-semibold tracking-tight text-white drop-shadow-sm">
            Our Portfolio by the Numbers
          </h2>
        </div>

        {/* Fully Responsive Card Layout Engine */}
        {/* On desktop/large devices, matches your legacy configuration layout grid rules */}
        {/* On mobile devices, switches to an auto-flowing grid with safe boundaries and tailored scale properties */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-10 lg:px-20 pb-10 sm:pb-6 lg:pb-0 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-x-[30px] max-h-[50vh] sm:max-h-[40vh] lg:max-h-none overflow-y-auto lg:overflow-visible">
          {CARDS.map((card, i) => {
            const visible = i < revealedCount;
            return (
              <div
                key={i}
                className="group relative overflow-hidden py-2 px-2 sm:py-10 sm:px-5 lg:py-[60px] lg:px-[20px] 2xl:px-[30px] bg-white hover:bg-[#D6C5A0] duration-500 cursor-pointer flex flex-col justify-between min-h-[110px] sm:min-h-[140px] lg:min-h-0"
                style={{
                  borderRadius: "12px 12px 12px 12px",
                  // Reapplies your default desktop bottom border radius behavior for wide screens
                  borderRadius: isDesktop ? "20px 20px 0 0" : "16px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition:
                    "all 0.5s cubic-bezier(.22,.61,.36,1), opacity 0.5s ease",
                }}
              >
                {/* Static Shine Lines - Safe across scales */}
                <div className="absolute -top-20 right-full w-[20px] h-[600px] bg-white/20 blur-[8px] rotate-[25deg] opacity-0 group-hover:opacity-70 transition-all group-hover:right-[100px] duration-500" />
                <div className="absolute -top-20 right-full w-[20px] h-[600px] bg-white/20 blur-[8px] rotate-[25deg] opacity-0 group-hover:opacity-70 transition-all group-hover:right-[140px] duration-500" />

                <div className="relative z-10 flex flex-col h-full justify-around">
                  <div className="h-auto mb-1 lg:mb-3 flex items-end">
                    <div
                      className={`flex items-baseline gap-1 flex-wrap ${i == 3 ? "lg:gap-0.5" : "lg:gap-1.5"}`}
                    >
                      <h6 className="text-[24px] sm:text-[30px] lg:text-[30px] 2xl:text-[40px] tracking-[-0.02em] text-[#000] leading-none">
                        {card.num}
                      </h6>
                      <span
                        className={`text-[14px] sm:text-[18px] ${i == 3 ? "lg:text-[18px] 2xl:text-[20px]" : "lg:text-[20px]"} leading-none font-[family-name:var(--font-sora),sans-serif] text-[#6D6D6D]`}
                      >
                        {card.unit}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-[1px] lg:mb-3 bg-[#B9B9B9]" />

                  <div className="text-[12px] sm:text-[14px] lg:text-[18px] text-[#212121] font-[family-name:var(--font-sora),sans-serif] leading-tight font-medium">
                    {card.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
