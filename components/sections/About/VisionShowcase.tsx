"use client";

import Image from "next/image";
import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import type { KeyboardEvent } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  type MotionValue,
  useTransform,
} from "framer-motion";
import { visionSlides, type VisionSlide } from "./visionData";
import NavArrow from "@/components/ui/NavArrow";

/* =========================================================
   ANIMATION CONFIG & MATH HELPERS
========================================================= */
// const FADE_TRANSITION = { duration: 0.35, ease: "easeInOut" as const };
const FADE_TRANSITION = { duration: 0.35, ease: "easeInOut" as const };

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Thumbnail Scale (22% of main card size)
const THUMB_SCALE = 0.22;
const VALUES_CARD_RADIUS = "clamp(16px, 1.5vw, 28px)";

// Offset coordinates
const PREV_THUMB = { x: -35, y: 0 };
const NEXT_THUMB = { x: 35, y: 0 };

// Side-thumbnail fades happen within this fraction of the transition — the
// outgoing left-thumb fades out during the FIRST slice (fully gone well
// before "Active Card" gets anywhere near that corner). The incoming
// right-thumb fades in during the LAST slice instead of the first: it starts
// at nearly the same spot/size as "Next Main Card" (which sits above it,
// z-index-wise), so fading it in early just hid it behind Next Main Card
// until Next Main Card moved away — which read as an abrupt pop instead of a
// smooth reveal. Waiting until Next Main Card has already cleared the
// corner avoids that occlusion entirely.
const FADE_FRACTION = 0.4;

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Floating description-card visibility — a discrete on/off trigger, NOT a
// value continuously scrubbed by scroll position. Thresholds are measured
// against the big image's own eased transform progress (the same `t` used
// to move/scale it in getCardStyle below), NOT raw scroll fraction — so the
// card's fade genuinely lines up with how far the image has visually moved,
// regardless of scroll speed:
//   image progress < BOX_HIDE_AT  → still visible (image hasn't moved yet)
//   image progress >= BOX_SHOW_AT → visible again (incoming image is ~80%
//                                    of the way to full-screen rest)
//   otherwise                     → hidden (image is mid-transition)
// The instant either threshold is crossed, React state flips once and a
// fixed-duration Framer Motion transition animates fully to completion on
// its own timeline — it does not partially track further scrolling.
const BOX_HIDE_AT = 0.25; // box gone once the image has moved 25% of the way
const BOX_SHOW_AT = 0.8; // box starts back in once the image is ~80% arrived
const BOX_SLIDE_OFFSET = 30; // px — slide-in-from-right distance
const BOX_TRANSITION_DURATION = 0.5; // seconds
// On hide, the box waits for the content to clear first; on reveal, the
// content waits for the box to land first — "very short" stagger, not
// simultaneous.
const BOX_CONTENT_STAGGER = 0.15; // seconds

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
  // Autoplay-only: when true, the "next"/"previous"/"waiting" roles wrap
  // around modulo totalCards instead of stopping dead at the last card, so
  // advancing past the last card slides card 0 in from the right exactly
  // like any other forward step — never a reverse sweep back through the
  // deck. The manual arrows/dots never pass this, so their behavior
  // (stopping at the last card) is completely unchanged.
  loop = false,
): CardStyle {
  // The big image's own shrink/grow (Active Card + Next Main Card) moves
  // from the very first pixel of scroll — the floating card's hide/show is
  // driven off this same `t`, not off raw scroll, so it lines up with how
  // far the image has actually moved (see BOX_HIDE_AT / BOX_SHOW_AT above).
  const t = easeInOutCubic(clamp(rawProgress));
  const fadeOutT = easeInOutCubic(clamp(rawProgress / FADE_FRACTION));
  const fadeInT = easeInOutCubic(
    clamp((rawProgress - (1 - FADE_FRACTION)) / FADE_FRACTION),
  );
  const isLast = !loop && activeIndex >= totalCards - 1;

  const nextIndex = loop ? (activeIndex + 1) % totalCards : activeIndex + 1;
  const prevIndex = loop
    ? (activeIndex - 1 + totalCards) % totalCards
    : activeIndex - 1;
  const waitIndex = loop ? (activeIndex + 2) % totalCards : activeIndex + 2;

  // Active Card
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

  // Next Main Card
  if (cardIndex === nextIndex) {
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

  // Previous Thumbnail — fades out in place, early in the transition
  // (see FADE_FRACTION) instead of shrinking away or lingering
  if (cardIndex === prevIndex) {
    return {
      transform: `translate3d(${PREV_THUMB.x}%, 0, 0) scale(${THUMB_SCALE})`,
      opacity: lerp(1, 0, fadeOutT),
      zIndex: 20,
      transformOrigin: "top left",
    };
  }

  // Upcoming Waiting Card — fades in in place, late in the transition
  // (see FADE_FRACTION) instead of growing from nothing or lingering
  if (cardIndex === waitIndex) {
    return {
      transform: `translate3d(${NEXT_THUMB.x}%, 0, 0) scale(${THUMB_SCALE})`,
      opacity: lerp(0, 1, fadeInT),
      zIndex: 25,
      transformOrigin: "bottom right",
    };
  }

  // Parked Cards
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
   VALUES CONTENT DATA
========================================================= */
const VALUES_ITEMS = [
  {
    title: "Leadership",
    description:
      "We lead with vision, innovation, and excellence, setting industry standards while empowering our people to drive meaningful change.",
  },
  {
    title: "Teamwork",
    description:
      "Collaboration is at the heart of everything we do. We leverage diverse strengths to achieve success together.",
  },
  //
  {
    title: "Responsible",
    description:
      "We uphold ethical business practices, sustainability, and accountability, creating positive outcomes for our stakeholders and the environment.",
  },
  {
    title: "Care",
    description:
      "We care for our people, communities, and the planet, fostering an inclusive workplace while contributing to a better future.",
  },
];

/* =========================================================
   DESKTOP HELPER COMPONENTS
========================================================= */

interface ActiveHeadingProps {
  slide: VisionSlide;
  activeIndex: number;
  className: string;
}

function ActiveHeading({ slide, activeIndex, className }: ActiveHeadingProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.h2
        key={activeIndex}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeVariants}
        transition={FADE_TRANSITION}
        className={className}
      >
        {slide.title}
      </motion.h2>
    </AnimatePresence>
  );
}

interface ImageStackProps {
  data: VisionSlide[];
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  sizes: string;
}

function ImageStack({ data, cardRefs, sizes }: ImageStackProps) {
  return (
    <div className="relative w-full h-full overflow-visible grid grid-cols-1 grid-rows-1">
      {data.map((item, i) => {
        return (
          <div
            key={item.id || i}
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
            className="col-start-1 row-start-1 self-start justify-self-start overflow-hidden max-w-full relative bg-white transition-shadow duration-300"
          >
            {/* Image Component */}
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                alt={`${item.title} — ${item.label}`}
                fill
                sizes={sizes}
                priority={i === 0}
                className="object-cover"
                draggable={false}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface FloatingCardProps {
  slide: VisionSlide;
  contentVisible: boolean;
  className?: string;
}

function FloatingCard({
  slide,
  contentVisible,
  className = "",
}: FloatingCardProps) {
  const isValuesCard = slide.id === "values";

  return (
    <div
      className={`overflow-hidden rounded-[24px] bg-[#FBF2E8] p-6 lg:p-7 h-fit ${className}`}
    >
      {/* Discrete trigger, not scroll-scrubbed: content follows the box in
          on reveal (delayed), but leads the box out on hide (no delay) —
          see BOX_CONTENT_STAGGER. */}
      <motion.div
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{
          duration: BOX_TRANSITION_DURATION,
          ease: "easeInOut",
          delay: contentVisible ? BOX_CONTENT_STAGGER : 0,
        }}
      >
        {isValuesCard ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {VALUES_ITEMS.map((val, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <h4 className="text-[13px] lg:text-[15px] font-medium leading-[1.4] text-[#101010]">
                  {val.title}
                </h4>
                <p className="text-[11px] lg:text-[13px] leading-[1.4] text-gray-600 font-normal">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[13px] lg:text-[15px] leading-relaxed text-gray-600 font-normal">
            {slide.description}
          </p>
        )}
      </motion.div>
    </div>
  );
}

interface NavIndicatorsProps {
  slides: VisionSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

function NavIndicators({ slides, activeIndex, onSelect }: NavIndicatorsProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onSelect((activeIndex + 1) % slides.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onSelect((activeIndex - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Vision showcase navigation"
      onKeyDown={handleKeyDown}
      className="flex items-center gap-2"
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={slide.id || index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Show ${slide.title}`}
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
   MOBILE COMPONENT
========================================================= */
const COLLAPSED = 94;
const EXPANDED = 420;
const BRAND_ACCENT = { bg: "#FFF", text: "#0F1D3A" };
const CROSSFADE_HALF_WIDTH = 0.18;

function MissionMobileF() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] block lg:hidden">
      <div className="sticky top-0 bg-[#FBF2E8] px-[5%]  pb-[50px] overflow-hidden">
        <div className="flex flex-col gap-[10px]">
          {visionSlides.map((slide, index) => (
            <MobileSlideCard
              key={slide.id}
              slide={slide}
              index={index}
              total={visionSlides.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface MobileSlideCardProps {
  slide: VisionSlide;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function MobileSlideCard({
  slide,
  index,
  total,
  scrollYProgress,
}: MobileSlideCardProps) {
  const accent = BRAND_ACCENT;
  const isValuesCard = slide.id === "values";
  const contentRef = useRef<HTMLDivElement>(null);
  // Cards used to expand to a fixed EXPANDED px value, which clipped the
  // Values card once it grew a 4-item list instead of one short paragraph —
  // measure the content's real height instead so nothing gets cut off.
  const [expandedHeight, setExpandedHeight] = useState(EXPANDED);

  useLayoutEffect(() => {
    const measure = () => {
      if (contentRef.current) {
        setExpandedHeight(contentRef.current.scrollHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const segment = 1 / total;
  const halfWidth = segment * CROSSFADE_HALF_WIDTH;

  const riseWindow: [number, number] = [
    index / total - halfWidth,
    index / total + halfWidth,
  ];

  const fallWindow: [number, number] = [
    (index + 1) / total - halfWidth,
    (index + 1) / total + halfWidth,
  ];

  const heightInput = isFirst
    ? isLast
      ? [0, 1]
      : [0, fallWindow[0], fallWindow[1], 1]
    : isLast
      ? [0, riseWindow[0], riseWindow[1], 1]
      : [0, riseWindow[0], riseWindow[1], fallWindow[0], fallWindow[1], 1];

  const heightOutput = isFirst
    ? isLast
      ? [expandedHeight, expandedHeight]
      : [expandedHeight, expandedHeight, COLLAPSED, COLLAPSED]
    : isLast
      ? [COLLAPSED, COLLAPSED, expandedHeight, expandedHeight]
      : [
          COLLAPSED,
          COLLAPSED,
          expandedHeight,
          expandedHeight,
          COLLAPSED,
          COLLAPSED,
        ];

  const maxHeight = useTransform(scrollYProgress, heightInput, heightOutput);

  return (
    <motion.div
      style={{ maxHeight, backgroundColor: accent.bg }}
      className="overflow-hidden relative rounded-2xl"
    >
      <div ref={contentRef}>
        <div className="p-5 relative overflow-hidden">
          <h3 style={{ color: accent.text }} className="text-[36px]">
            {slide.title}
          </h3>

          {isValuesCard ? (
            <ul className="mt-4 flex flex-col gap-3 list-disc pl-5">
              {VALUES_ITEMS.map((val, idx) => (
                <li
                  key={idx}
                  style={{ color: accent.text }}
                  className="text-[18px] leading-[140%] font-medium"
                >
                  {val.title}
                  <span className="block text-[14px] mt-1 text-[#4A4A4A]">
                    {val.description}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p
              style={{ color: accent.text }}
              className="text-[18px] mt-4 leading-[140%]"
            >
              {slide.description}
            </p>
          )}
        </div>

        <div className="relative w-full h-[280px]">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   DESKTOP STICKY STACK COMPONENT
========================================================= */

function DesktopVisionShowcase({ data }: { data: VisionSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Which slide the floating description card shows. Only ever updated the
  // instant the card BECOMES visible (never while hidden or already
  // visible) — see the boxVisibleRef check below. Swapping at any other
  // point would race the real-time opacity animation: a scroll-position-
  // based swap threshold has no guaranteed relationship to when the CSS
  // fade has actually finished, so at high scroll speed the content could
  // swap while still partially visible.
  const [boxIndex, setBoxIndex] = useState(0);
  // Discrete visibility trigger for the floating card — see BOX_HIDE_AT /
  // BOX_SHOW_AT above.
  const [boxVisible, setBoxVisible] = useState(true);
  const boxVisibleRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const total = data.length;

  // Latest applied segment (float), written by the button/dot-driven
  // animation below — the single source of truth it resumes from, since
  // activeIndex itself is only ever an integer.
  const segRef = useRef(0);
  const manualAnimRef = useRef<number | null>(null);

  const applyTransforms = useCallback(
    (seg: number, loop = false) => {
      const activeIdx = Math.min(total - 1, Math.floor(seg));
      const progressInSegment = seg - activeIdx;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        const style = getCardStyle(
          i,
          activeIdx,
          progressInSegment,
          total,
          loop,
        );

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

  // Shared by scroll and button navigation so both drive the exact same
  // card transforms / heading / floating-card logic off a segment value —
  // only where that segment value comes from differs. `loop` is only ever
  // true for the autoplay wrap step (see animateLoopAdvance below) — it
  // makes the "next card"/"reveal" math wrap modulo total instead of
  // clamping at the last card, so activeIndex/box state land on card 0
  // instead of getting stuck reporting the last card.
  const updateFromSeg = useCallback(
    (seg: number, loop = false) => {
      applyTransforms(seg, loop);

      const activeIdx = Math.min(total - 1, Math.floor(seg));
      const progressInSegment = seg - activeIdx;
      // Same eased curve as getCardStyle's `t` — the box hide/show thresholds
      // are measured against how far the image has actually moved, not raw
      // scroll fraction (see BOX_HIDE_AT / BOX_SHOW_AT above).
      const imageT = easeInOutCubic(clamp(progressInSegment));

      const nextActive = loop
        ? Math.round(seg) % total
        : Math.min(total - 1, Math.round(seg));
      setActiveIndex((prev) => (prev === nextActive ? prev : nextActive));

      const nextBoxVisible = imageT < BOX_HIDE_AT || imageT >= BOX_SHOW_AT;

      // boxIndex is only ever touched the instant the card BECOMES visible —
      // computed correctly for whichever direction triggered that reveal —
      // never while hidden or while already visible. A scroll-position-based
      // swap partway through the hidden window would race the real-time
      // opacity animation: at high scroll speed the content could swap while
      // still partially visible, showing the wrong slide mid-fade.
      if (boxVisibleRef.current !== nextBoxVisible) {
        boxVisibleRef.current = nextBoxVisible;
        setBoxVisible(nextBoxVisible);
        if (nextBoxVisible) {
          const revealedIndex =
            imageT >= BOX_SHOW_AT
              ? loop
                ? (activeIdx + 1) % total // forward reveal, wrapped: incoming card
                : Math.min(total - 1, activeIdx + 1) // forward reveal: incoming card
              : activeIdx; // reverse reveal: returning to the settled card
          setBoxIndex(revealedIndex);
        }
      }

      segRef.current = seg;
    },
    [applyTransforms, total],
  );

  useEffect(() => {
    applyTransforms(0);
  }, [applyTransforms]);

  useEffect(() => {
    return () => {
      if (manualAnimRef.current !== null) {
        cancelAnimationFrame(manualAnimRef.current);
      }
    };
  }, []);

  // Slider-button/dot navigation — the section no longer tracks scroll at
  // all, so this is the only thing driving the card stack now. Still reuses
  // the exact same getCardStyle transforms and easing.
  const animateToSegment = useCallback(
    (targetIndex: number) => {
      const target = Math.min(total - 1, Math.max(0, targetIndex));

      if (manualAnimRef.current !== null) {
        cancelAnimationFrame(manualAnimRef.current);
        manualAnimRef.current = null;
      }

      const startSeg = segRef.current;
      if (startSeg === target) return;

      const duration = 1000; // ms
      const startTime = performance.now();

      // Advance the segment at a constant rate — getCardStyle already
      // applies its own easeInOutCubic to the fractional part (the same
      // curve scroll drives it through), so easing this too would stack a
      // second ease-in-out on top and read as slow-then-rushed instead of
      // one smooth, consistently-paced motion.
      const step = (now: number) => {
        const linearT = clamp((now - startTime) / duration);
        updateFromSeg(lerp(startSeg, target, linearT));
        manualAnimRef.current =
          linearT < 1 ? requestAnimationFrame(step) : null;
      };

      manualAnimRef.current = requestAnimationFrame(step);
    },
    [total, updateFromSeg],
  );

  const handlePrevSlide = useCallback(
    () => animateToSegment(Math.round(segRef.current) - 1),
    [animateToSegment],
  );
  const handleNextSlide = useCallback(
    () => animateToSegment(Math.round(segRef.current) + 1),
    [animateToSegment],
  );

  // Autoplay-only forward step. Unlike animateToSegment (which clamps its
  // target to totalCards - 1, so wrapping from the last card back to card 0
  // would animate backward through the whole deck), this always advances
  // by exactly +1 and never clamps — going past the last card lands on
  // "totalCards", which getCardStyle/updateFromSeg's `loop` flag renders as
  // card 0 arriving from the right, i.e. the exact same forward slide-in
  // used for every other step. Once the step finishes past the end, the
  // segment is folded back into 0..totalCards-1 — a visual no-op, since
  // loop mode already rendered that position identically to the folded
  // one — just so the ref doesn't grow forever across many autoplay
  // cycles. Manual arrows/dots only ever call animateToSegment above, so
  // their stop-at-the-last-card behavior is untouched.
  const animateLoopAdvance = useCallback(() => {
    if (manualAnimRef.current !== null) {
      cancelAnimationFrame(manualAnimRef.current);
      manualAnimRef.current = null;
    }

    const startSeg = segRef.current;
    const target = Math.round(startSeg) + 1;

    const duration = 1000; // ms — same pacing as animateToSegment
    const startTime = performance.now();

    const step = (now: number) => {
      const linearT = clamp((now - startTime) / duration);
      updateFromSeg(lerp(startSeg, target, linearT), true);
      if (linearT < 1) {
        manualAnimRef.current = requestAnimationFrame(step);
        return;
      }
      manualAnimRef.current = null;
      if (target >= total) {
        segRef.current = target - total;
      }
    };

    manualAnimRef.current = requestAnimationFrame(step);
  }, [total, updateFromSeg]);

  // Auto-advance every 10s. The clock restarts on every slide change,
  // manual or automatic, so a manual click is never contradicted by an
  // auto-advance moments later.
  useEffect(() => {
    if (total <= 1) return;
    const timer = setTimeout(() => {
      animateLoopAdvance();
    }, 10000);
    return () => clearTimeout(timer);
  }, [activeIndex, total, animateLoopAdvance]);

  const activeSlide = data[activeIndex] || data[0];
  const boxSlide = data[boxIndex] || data[0];

  return (
    <div
      ref={containerRef}
      className="hidden lg:block relative w-full bg-[#FBF2E8]"
    >
      <div className="h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="fix flex items-center justify-between gap-4 lg:gap-0 relative">
          {/* LEFT COLUMN */}
          <div className="relative z-10 w-[280px] lg:w-[300px] shrink-0 flex flex-col justify-between h-[420px] lg:h-[480px] pt-2">
            <div className="relative z-[200]">
              <div className="w-32 h-24 lg:w-44 lg:h-32 mb-8 relative z-50" />

              <ActiveHeading
                slide={activeSlide}
                activeIndex={activeIndex}
                className="relative font-semibold text-[42px] lg:text-[100px] leading-[1.05] tracking-[-0.02em] text-[#101010] whitespace-pre-line"
              />

              <div className="relative mt-6 flex items-center gap-3">
                <NavArrow
                  direction="prev"
                  tone="dark"
                  disabled={activeIndex === 0}
                  onClick={handlePrevSlide}
                  ariaLabel="Previous slide"
                />
                <NavArrow
                  direction="next"
                  tone="dark"
                  disabled={activeIndex === total - 1}
                  onClick={handleNextSlide}
                  ariaLabel="Next slide"
                />
              </div>
            </div>

            <div>
              <NavIndicators
                slides={data}
                activeIndex={activeIndex}
                onSelect={animateToSegment}
              />
            </div>
          </div>

          {/* CENTER STAGE & DYNAMIC STACK */}
          <div className="relative z-0 flex-1 h-[420px] lg:h-[500px]">
            <ImageStack
              data={data}
              cardRefs={cardRefs}
              sizes="(min-width: 1024px) 60vw, 80vw"
            />

            {/* Floating Card — same position for every slide; Values renders
                its content as a grid instead of one paragraph, so it gets a
                fixed size that's kept fully inside the image's own bounds.
                Visibility is a discrete on/off trigger (see BOX_HIDE_AT /
                BOX_SHOW_AT), not a value scrubbed continuously by scroll:
                the card is only shown while the big image is at rest, and
                the instant that flips, it slides/fades fully in or out on
                its own fixed timeline — scrolling further doesn't partially
                freeze it mid-fade. */}
            <motion.div
              animate={{
                opacity: boxVisible ? 1 : 0,
                x: boxVisible ? 0 : BOX_SLIDE_OFFSET,
              }}
              transition={{
                duration: BOX_TRANSITION_DURATION,
                ease: "easeInOut",
                delay: boxVisible ? 0 : BOX_CONTENT_STAGGER,
              }}
              style={{
                willChange: "transform, opacity",
                pointerEvents: boxVisible ? "auto" : "none",
              }}
              className={
                boxSlide?.id === "values"
                  ? "absolute top-1/2 -translate-y-1/2 right-[0%] w-[469px] h-fit z-50"
                  : "absolute top-[37%] -translate-y-1/2 right-[14%] w-[260px] lg:w-[320px] z-50"
              }
            >
              <FloatingCard slide={boxSlide} contentVisible={boxVisible} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN EXPORT
========================================================= */
export default function VisionShowcase() {
  return (
    <section id="vision-mission" className="w-full bg-[#FBF2E8]">
      <MissionMobileF />
      <DesktopVisionShowcase data={visionSlides} />
    </section>
  );
}
// fajds
