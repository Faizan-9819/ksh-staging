// "use client";

// import { useRef, useEffect, useState } from "react";
// import NextImage from "next/image";

// // Frame numbers present in public/about/ourpurpose/frames — a contiguous
// // 1..184 range.
// const FRAME_NUMBERS = Array.from({ length: 184 }, (_, i) => i + 1);

// // Matches Tailwind's `md` breakpoint — below this the scroll-scrubbed canvas
// // is skipped entirely in favor of the static ourpurpose.jpg graphic.
// const MOBILE_BREAKPOINT = 768;

// const totalFrames = FRAME_NUMBERS.length;
// const pixelsPerFrame = 5;
// // Desktop scroll-track height, in px, before adding the viewport-height
// // runway — expressed as a CSS calc() (see the section's inline style below)
// // instead of a window.innerHeight-derived state so the track has its final
// // height on the very first paint. Setting it later via a mount effect (the
// // previous approach) briefly rendered the section at a fallback height, and
// // growing it afterwards while it holds a `position: sticky` child is exactly
// // the layout-shift shape that trips Chrome's scroll-anchoring heuristics —
// // which is what read as the page suddenly jerking/jumping on scroll.
// const DESKTOP_SCROLL_PX = totalFrames * pixelsPerFrame * 1.5;

// function padNum(n: number) {
//   return String(n).padStart(4, "0");
// }

// const OurPurpose = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const imagesRef = useRef<HTMLImageElement[]>([]);
//   const lastFrame = useRef(0);
//   // Decided once at mount from the initial viewport — the frame set a page
//   // load commits to shouldn't swap out from under an in-flight image queue.
//   const isMobileRef = useRef(false);
//   const [shouldLoad, setShouldLoad] = useState(false);
//   const [textVisible, setTextVisible] = useState(false);
//   const textVisibleRef = useRef(false);

//   const drawFrame = (index: number) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");
//     if (!canvas || !ctx) return;
//     const img = imagesRef.current[index];
//     // naturalWidth is 0 for a failed/broken load even though `complete`
//     // reports true — relying on `complete` alone let a broken image reach
//     // drawImage and throw.
//     if (!img || !img.complete || img.naturalWidth === 0) return;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//   };

//   // Size the canvas bitmap off its own box's actual rendered rect (not
//   // window.innerWidth/innerHeight) so it always exactly matches the CSS
//   // size — any mismatch there is what makes `object-cover` crop into the
//   // frame instead of just filling it. Re-runs on mount, on resize, and
//   // right before the frame images start loading (belt-and-braces against
//   // the box not having its final layout yet on the very first mount tick).
//   const sizeCanvas = () => {
//     if (isMobileRef.current) return;
//     const canvas = canvasRef.current;
//     const box = canvas?.parentElement;
//     if (canvas && box) {
//       const rect = box.getBoundingClientRect();
//       if (rect.width > 0 && rect.height > 0) {
//         // Setting width/height wipes the canvas bitmap, so the last drawn
//         // frame has to be re-painted right after — otherwise a resize (which
//         // mobile browsers fire constantly mid-scroll as the address bar
//         // collapses) blanks the frame with nothing to bring it back.
//         canvas.width = rect.width;
//         canvas.height = rect.height;
//         drawFrame(lastFrame.current);
//       }
//     }
//   };

//   useEffect(() => {
//     isMobileRef.current = window.innerWidth < MOBILE_BREAKPOINT;
//     sizeCanvas();
//     window.addEventListener("resize", sizeCanvas);
//     if (isMobileRef.current) {
//       // Mobile just shows the static graphic — heading/description are
//       // visible immediately, no scroll-triggered reveal.
//       setTextVisible(true);
//     }
//     return () => window.removeEventListener("resize", sizeCanvas);
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
//     // Mobile shows the static ourpurpose.jpg graphic directly (see the JSX
//     // below) — no frame sequence to load.
//     if (!shouldLoad || isMobileRef.current) return;
//     sizeCanvas();
//     const imgs: HTMLImageElement[] = [];
//     FRAME_NUMBERS.forEach((n, i) => {
//       const img = new window.Image();
//       img.src = `/about/ourpurpose/frames/frame_${padNum(n)}.webp`;
//       img.onload = () => {
//         if (i === 0) {
//           sizeCanvas();
//           drawFrame(0);
//         }
//       };
//       imgs.push(img);
//     });
//     imagesRef.current = imgs;
//   }, [shouldLoad]);

//   useEffect(() => {
//     // Native scroll events can fire more often than the browser paints
//     // (especially with precision trackpads), so running the measurement +
//     // canvas draw directly on every event can pile up more work than a
//     // single frame budget allows — that pile-up is what reads as a jerk.
//     // Coalescing to one measure+draw per animation frame keeps the work in
//     // step with paint, the same fix used to smooth scroll-scrubbed canvases.
//     let ticking = false;

//     const update = () => {
//       ticking = false;
//       if (
//         isMobileRef.current ||
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

//       // Heading + description fade in once the frame sequence is mostly
//       // through (55%) rather than waiting for it to fully finish.
//       const isDone = progress >= 0.55;
//       if (isDone && !textVisibleRef.current) {
//         textVisibleRef.current = true;
//         setTextVisible(true);
//       } else if (!isDone && textVisibleRef.current) {
//         textVisibleRef.current = false;
//         setTextVisible(false);
//       }
//     };

//     const onScroll = () => {
//       if (ticking) return;
//       ticking = true;
//       requestAnimationFrame(update);
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [shouldLoad]);

//   // Mobile shows the heading/description plainly, with no scroll-tied
//   // animation; desktop keeps the fade+rise tied to scroll/frame progress.
//   const textStyle = isMobileRef.current
//     ? { opacity: 1 }
//     : {
//         opacity: textVisible ? 1 : 0,
//         transform: textVisible ? "translateY(0)" : "translateY(20px)",
//         transition: "opacity 0.8s ease, transform 0.8s ease",
//       };

//   return (
//     <>
//       {/* =================================================================
//           MOBILE — sized to ourpurpose.jpg's own aspect ratio (square), not
//           stretched/cropped to fill the screen the way `fill` + `object-cover`
//           inside a 100dvh box was doing.
//          ================================================================= */}
//       <div
//         className="relative w-full md:hidden"
//         style={{
//           background: "linear-gradient(180deg, #FFF 0%, #FBF2E8 100%), #F8F8F8",
//         }}
//       >
//         <div className="relative w-full aspect-square overflow-hidden">
//           <NextImage
//             src="/about/ourpurpose/ourpurpose.jpg"
//             alt="Our Purpose"
//             fill
//             priority
//             className="object-contain"
//           />

//           <div
//             className="absolute top-0 left-0 right-0 z-10 pt-0 sm:pt-14 px-4 flex justify-center"
//             style={textStyle}
//           >
//             <h2 className="text-3xl sm:text-4xl font-semibold text-[#212121] tracking-tight text-center">
//               Our Purpose
//             </h2>
//           </div>

//           <div
//             className="absolute bottom-20 left-0 right-0 z-10 pb-0 sm:pb-14 px-4 flex justify-center"
//             style={textStyle}
//           >
//             <p className="max-w-xs sm:max-w-xl text-center text-sm sm:text-base text-[#333333] leading-relaxed font-normal">
//               Reimagining and inspiring a green industrial future by focusing
//               efforts on developing sustainable Industrial & Logistics
//               infrastructure
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* =================================================================
//           DESKTOP — unchanged scroll-scrubbed frame-sequence canvas
//          ================================================================= */}
//       <section
//         ref={containerRef}
//         style={{
//           height: `calc(${DESKTOP_SCROLL_PX}px + 150vh)`,
//           background: "linear-gradient(180deg, #FFF 0%, #FBF2E8 100%), #F8F8F8",
//         }}
//         className="relative w-full hidden md:block"
//       >
//         <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
//           <canvas
//             ref={canvasRef}
//             className="absolute inset-0 w-full h-full object-cover"
//           />

//           {/* Heading — pinned near the top, fades in once the frames are mostly through */}
//           <div
//             className="absolute top-0 left-0 right-0 z-10 pt-16 px-10 lg:px-20 flex justify-center"
//             style={textStyle}
//           >
//             <h2 className="text-4xl lg:text-5xl font-semibold text-[#212121] tracking-tight text-center">
//               Our Purpose
//             </h2>
//           </div>

//           {/* Description — sits below the frame's circle graphic, near the bottom */}
//           <div
//             className="absolute bottom-20 left-0 right-0 z-10 pb-16 px-10 lg:px-20 flex justify-center"
//             style={textStyle}
//           >
//             <p className="max-w-2xl text-center text-lg lg:text-xl text-[#333333] leading-relaxed font-normal">
//               Reimagining and inspiring a green industrial future by focusing
//               efforts on developing sustainable Industrial & Logistics
//               infrastructure
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default OurPurpose;

//
//
//
//

"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import NextImage from "next/image";
import {
  lenisScrollTo,
  isScrollJumpInProgress,
  onScrollJumpEnd,
} from "@/components/ui/LenisProvider";

// Frame numbers present in public/about/ourpurpose/frames — a contiguous 1..184 range.
const startFrame = 1;
const endFrame = 184;
const totalFrames = endFrame - startFrame + 1;
const pixelsPerFrame = 5;

// Matches Tailwind's `md` breakpoint — OurPurpose's own existing mobile/desktop split.
const MOBILE_BREAKPOINT = 768;

function padNum(n: number) {
  return String(n).padStart(4, "0");
}

const OurPurpose = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrame = useRef(0);
  // High-water mark: frames only ever move forward. Scrolling back up
  // never rotates them backward — there is no reverse animation at all,
  // by design.
  const maxFrameRef = useRef(0);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const textVisibleRef = useRef(false);
  // Default to desktop so the initial (pre-hydration) render never shows the
  // mobile branch on a real desktop screen — corrected synchronously below,
  // before paint, via useLayoutEffect.
  const [isDesktop, setIsDesktop] = useState(true);
  // Once the scrubbed animation completes on its first forward pass, the
  // section permanently stops being sticky/scroll-scrubbed for the rest of
  // the page load — scrolling back up (or down again) never re-pins it or
  // replays the reveal. hasSettledRef guards the scroll handler itself
  // (synchronous, no re-render delay); isSettled drives the actual
  // sticky -> static style swap. Same mechanism as ScrollFrames.tsx.
  const hasSettledRef = useRef(false);
  const [isSettled, setIsSettled] = useState(false);
  // True only when the resync effect below (not the organic onScroll path)
  // is the one settling the section — set right before setIsSettled(true)
  // there, read (and cleared) by the height-collapse useLayoutEffect further
  // down. That effect's scroll correction assumes the collapsing region is
  // still under/near the user's current viewport (true for an organic
  // scroll-through), but the resync path only ever settles because a hash
  // jump landed the user PAST this section entirely — their viewport is
  // already somewhere else on the page, so applying that same correction
  // yanks an unrelated scroll position by the collapse's height delta,
  // which is exactly the "page jerks on its own, seconds after a hash
  // landing, with no scroll input at all" bug this flag prevents.
  const settledViaResyncRef = useRef(false);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    // All 184 frames start loading at once, so the exact requested index
    // isn't necessarily done yet — fall back to the nearest earlier frame
    // that already is, so scrolling faster than the images can load still
    // shows visible progress instead of freezing on a stale frame.
    let i = index;
    while (
      i >= 0 &&
      (!imagesRef.current[i] || !imagesRef.current[i].complete)
    ) {
      i -= 1;
    }
    if (i < 0) return;
    const img = imagesRef.current[i];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // Runs synchronously before the browser paints, so neither device ever
  // flashes the other's version — this is the only thing that needs to run
  // unconditionally; everything else below is desktop-only and skips
  // entirely on mobile.
  useLayoutEffect(() => {
    const checkWidth = () =>
      setIsDesktop(window.innerWidth >= MOBILE_BREAKPOINT);
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
    setScrollHeight(total);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDesktop]);

  useEffect(() => {
    // Frame downloads used to wait for an IntersectionObserver to fire
    // (500px before the section entered view) before even starting — on a
    // cold cache that left no time for 184 webp requests to land before the
    // user actually scrolled in, so the canvas sat on frame 0 (or blank)
    // until they trickled in. Kicking the fetch off right after mount
    // instead (idle, low-priority, well behind the hero's own load) gives
    // it the maximum head start while never competing with anything above
    // the fold for bandwidth.
    if (!isDesktop) return;
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(() => setShouldLoad(true), {
        timeout: 2000,
      });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = setTimeout(() => setShouldLoad(true), 0);
    return () => clearTimeout(timeoutId);
  }, [isDesktop]);

  // Heading + description reveal — tied to how much of the section has
  // scrolled into view (30% up from the bottom of the viewport), not to the
  // frame-scrub progress used for the canvas animation below. rootMargin's
  // negative bottom value shrinks the observed viewport up by 30%, so
  // `isIntersecting` only flips true once the section's top has risen to
  // that 30%-from-bottom line.
  useEffect(() => {
    if (!isDesktop) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          textVisibleRef.current = true;
          setTextVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isDesktop]);

  useEffect(() => {
    if (!shouldLoad) return;
    const imgs: HTMLImageElement[] = [];
    for (let i = startFrame; i <= endFrame; i++) {
      const img = new Image();
      // Deliberately below the hero's/LCP's own fetch priority — this is
      // 184 requests' worth of background work that should never delay
      // anything already competing for the connection pool above the fold.
      img.fetchPriority = "low";
      img.src = `/about/ourpurpose/frames/frame_${padNum(i)}.webp`;
      // All 184 requests fire at once, so any frame can finish loading
      // well after the user has already scrolled past it — re-attempt the
      // current target (maxFrameRef only ever increases) on every single
      // image's load, not just the first, so the canvas keeps catching up
      // to the true frame instead of getting stuck on whatever fallback
      // was available at the last scroll event (see drawFrame's own
      // nearest-loaded fallback above).
      img.onload = () => {
        if (i === startFrame) drawFrame(0);
        // Only redraw when the frame that just finished loading is the
        // exact one currently wanted — redrawing on every one of the 184
        // onloads (regardless of relevance) forced that many needless
        // canvas repaints right as the user scrolls into the section,
        // competing with scroll rendering and reading as jank.
        else if (i === maxFrameRef.current) drawFrame(i);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [shouldLoad]);

  useEffect(() => {
    // Once settled, stop listening entirely — nothing left for this handler
    // to do, and it keeps the section from ever being re-driven by scroll.
    // Same mechanism as ScrollFrames.tsx: a direct synchronous handler, not
    // batched through requestAnimationFrame — batching added a one-frame
    // lag between the real scroll position and when settle/correction ran,
    // which is what let the corrected position drift past VisionShowcase
    // and land on TeamSection instead.
    if (!isDesktop || isSettled) return;
    const onScroll = () => {
      if (
        hasSettledRef.current ||
        !containerRef.current ||
        !shouldLoad ||
        imagesRef.current.length === 0 ||
        // A hash-link jump (e.g. navbar About dropdown -> #vision-mission or
        // #growth-timeline) landing at/past this section is passing through
        // its scroll range in one instant jump, with none of the incremental
        // scroll events this handler expects — ignore it so settle/collapse
        // logic never fires off that jump and instead "catches up" violently
        // on the user's next real scroll. Same guard as ScrollFrames.tsx.
        isScrollJumpInProgress()
      )
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = -rect.top;
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      const rawFrameIndex = Math.floor(
        progress * (imagesRef.current.length - 1),
      );

      // High-water mark — never decreases, so scrolling back up doesn't
      // rotate frames backward (no reverse animation, by design).
      const frameIndex = Math.max(maxFrameRef.current, rawFrameIndex);
      maxFrameRef.current = frameIndex;

      if (frameIndex !== lastFrame.current) {
        lastFrame.current = frameIndex;
        drawFrame(frameIndex);
      }

      // Reached the last frame on this first forward pass — settle
      // permanently. Forcing text visible here (rather than relying only on
      // the 50%-progress check above, which should already be done) covers
      // a fast-scroll/fling edge case.
      if (progress >= 1 && !hasSettledRef.current) {
        hasSettledRef.current = true;
        textVisibleRef.current = true;
        setTextVisible(true);
        setIsSettled(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDesktop, isSettled, shouldLoad]);

  // A hash-link jump guarded above (isScrollJumpInProgress) can land the
  // page at/past this section without ever driving the settle logic in
  // onScroll — left alone, that only gets discovered on the user's next
  // real scroll. Resyncing once, right as the guard lifts, catches that up:
  // if the jump already landed past this section, settle its DOM state now
  // (matching what an organic scroll-through would have produced) so it's
  // not left visually stale; if not, there's nothing to correct and
  // onScroll continues driving it normally. settledViaResyncRef tells the
  // height-collapse effect below to skip its scroll-position correction —
  // the user's viewport already moved on past this section entirely (that's
  // why rect.bottom <= 0 here), so there is nothing under them to correct.
  useEffect(() => {
    if (!isDesktop || isSettled) return;
    return onScrollJumpEnd(() => {
      if (hasSettledRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom <= 0) {
        hasSettledRef.current = true;
        maxFrameRef.current = imagesRef.current.length - 1;
        textVisibleRef.current = true;
        setTextVisible(true);
        settledViaResyncRef.current = true;
        setIsSettled(true);
      }
    });
  }, [isDesktop, isSettled]);

  // Keyboard focus landing on something below this section (Tab from here to
  // VisionShowcase's buttons) jumps the page past the pinned runway in one
  // go. Settle immediately, skip the height correction (like the resync
  // above), then bring the focused element back on screen through Lenis —
  // otherwise the page stays parked on Our Purpose.
  useEffect(() => {
    if (!isDesktop || isSettled) return;
    const onFocusIn = (e: FocusEvent) => {
      const c = containerRef.current;
      const el = e.target;
      if (hasSettledRef.current || !c || !(el instanceof Element)) return;
      if (c.contains(el)) return;
      if (!(c.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING))
        return;
      hasSettledRef.current = true;
      maxFrameRef.current = imagesRef.current.length - 1;
      textVisibleRef.current = true;
      setTextVisible(true);
      settledViaResyncRef.current = true;
      setIsSettled(true);
      requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        lenisScrollTo(
          window.scrollY + r.top - (window.innerHeight - r.height) / 2,
          { immediate: true, force: true },
        );
      });
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [isDesktop, isSettled]);

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
  // page suddenly jumping past extra sections. lenisScrollTo(..., {
  // immediate: true }) goes through Lenis itself and overwrites both the
  // current position AND that target in one shot, so there's nothing stale
  // left for the next tick to chase. Identical fix to ScrollFrames.tsx.
  useLayoutEffect(() => {
    if (!isSettled) return;
    // Settling via the hash-jump resync (see the effect above) means the
    // user's viewport was already past this section when it collapsed —
    // there's nothing under them to compensate for, and applying this
    // correction anyway is what caused the page to jerk on its own, several
    // seconds after a hash landing, with no scroll input at all.
    if (settledViaResyncRef.current) {
      settledViaResyncRef.current = false;
      return;
    }
    const delta = scrollHeight - window.innerHeight;
    if (delta > 0) {
      lenisScrollTo(window.scrollY - delta, { immediate: true });
    }
  }, [isSettled, scrollHeight]);

  // Mobile: no scroll-driven frame animation — static graphic + text shown
  // immediately, matching ScrollFrames.tsx's mobile branch shape (no video
  // asset for OurPurpose, so a static image takes its place).
  if (!isDesktop) {
    return (
      <section
        className="relative w-full"
        style={{
          background: "linear-gradient(180deg, #FFF 0%, #FBF2E8 100%), #F8F8F8",
        }}
      >
        <div className="relative w-full aspect-square overflow-hidden">
          <NextImage
            src="/about/ourpurpose/ourpurpose.jpg"
            alt="Our Purpose"
            fill
            priority
            className="object-contain"
          />

          <div className="absolute top-0 left-0 right-0 z-10 pt-0 sm:pt-14 px-4 flex justify-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#212121] tracking-tight text-center">
              Our Purpose
            </h2>
          </div>

          <div className="absolute bottom-20 left-0 right-0 z-10 pb-0 sm:pb-14 px-4 flex justify-center">
            <p className="max-w-xs sm:max-w-xl text-center text-sm sm:text-base text-[#333333] leading-relaxed font-normal">
              Reimagining and inspiring a green Industrial future by focusing
              efforts on developing sustainable Industrial & Logistics
              Infrastructure
            </p>
          </div>
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
        background: "linear-gradient(180deg, #FFF 0%, #FBF2E8 100%), #F8F8F8",
      }}
      className="relative w-full"
    >
      <div
        className={`${isSettled ? "relative" : "sticky top-0"} h-screen w-full overflow-hidden`}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Heading */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pt-16 px-10 lg:px-20 flex justify-center"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#212121] tracking-tight text-center">
            Our Purpose
          </h2>
        </div>

        {/* Description */}
        <div
          className="absolute bottom-20 left-0 right-0 z-10 pb-16 px-10 lg:px-20 flex justify-center"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="max-w-2xl text-center text-lg lg:text-xl text-[#333333] leading-relaxed font-normal">
            Reimagining and inspiring a green Industrial future by focusing
            efforts on developing sustainable Industrial & Logistics
            Infrastructure
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurPurpose;
