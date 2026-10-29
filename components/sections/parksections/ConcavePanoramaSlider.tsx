"use client";

import { useEffect, useRef, useState } from "react";
import NavArrow from "@/components/ui/NavArrow";
import GalleryMediaPopup from "./GalleryMediaPopup";

type Slide = {
  src: string;
  alt: string;
  title: string;
  description: string;
  type?: "image" | "video";
};
//
type TabConfig = {
  label: string;
  slides: Slide[];
};

export interface GalleryVideo {
  label: string;
  vid: string;
}

export interface GalleryContent {
  eyebrow: string;
  heading: string;
  photosLabel: string;
  videosLabel: string;
  rendersLabel: string;
  /** Paths relative to /ParkPage/ */
  photoImages: string[];
  /** Paths relative to /ParkPage/ */
  renderImages: string[];
  videos: GalleryVideo[];
}

const DEFAULT_CONTENT: GalleryContent = {
  eyebrow: "An Integrated Industrial Infrastructure Platform",
  heading: "Chakan: A Thriving Industrial Hub in Pune",
  photosLabel: "Photos",
  videosLabel: "Videos",
  rendersLabel: "Renders",
  photoImages: [
    "chakan-4/chakan4-1.jpg",
    "chakan-4/chakan4-2.jpg",
    "chakan-4/chakan4-3.jpg",
    "chakan-4/chakan4-4.jpg",
    "chakan-4/chakan4-5.jpg",
    "chakan-4/chakan4-6.jpg",
  ],
  renderImages: [
    "chakan-4/renders/chakan4-render-1.jpg",
    "chakan-4/renders/chakan4-render-2.jpg",
    "chakan-4/renders/chakan4-render-3.jpg",
    "chakan-4/renders/chakan4-render-4.jpg",
    "chakan-4/renders/chakan4-render-5.jpg",
    "chakan-4/renders/chakan4-render-6.jpg",
  ],
  videos: [
    {
      label: "3D Walkthrough",
      vid: "https://player.vimeo.com/video/908122558",
    },
    {
      label: "",
      vid: "https://player.vimeo.com/video/1217900700",
    },
  ],
};

const imagesToSlides = (images: string[]): Slide[] =>
  images.map((img, idx) => ({
    src: `/ParkPage/${img}`,
    alt: `Image ${idx + 1}`,
    title: `Image ${idx + 1}`,
    description: "",
    type: "image",
  }));

const videosToSlides = (videos: GalleryVideo[]): Slide[] =>
  videos.map((v) => ({
    src: v.vid,
    alt: v.label,
    title: v.label,
    description: "",
    type: "video",
  }));

const buildTabs = (content: GalleryContent): TabConfig[] =>
  [
    { label: content.photosLabel, slides: imagesToSlides(content.photoImages) },
    { label: content.videosLabel, slides: videosToSlides(content.videos) },
    {
      label: content.rendersLabel,
      slides: imagesToSlides(content.renderImages),
    },
  ].filter((tab) => tab.slides.length > 0);

/** Fixed visual gap between flat marquee cards, in px. */
const CARD_GAP_PX = 32;
/** Autoplay speed in slides-per-second — slow, continuous, premium feel. */
const MARQUEE_SPEED = 0.12;

function MarqueeSlider({
  slides,
  onExpand,
}: {
  slides: Slide[];
  /** Opt-in only — when provided, drag is disabled (cursor becomes a plain pointer) and the whole card is clickable, opening that slide index in the shared popup. */
  onExpand?: (index: number) => void;
}) {
  const total = slides.length;
  // Two (or fewer) cards can't meaningfully slide — render them as a static,
  // centered pair/single card instead: no drag, no autoplay, no nav arrows.
  const isStatic = total <= 2;

  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prevDiffsRef = useRef<number[]>([]);

  // Continuous floating position reference for smooth marquee movement.
  // Exactly 2 cards start at 0.5 so they sit centered as a symmetric pair
  // instead of one active card with the other offset to the side.
  const progressPosRef = useRef(total === 2 ? 0.5 : 0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Measured card width (+ gap) in px — the fixed horizontal distance between
  // adjacent slots in the flat row. Re-measured on resize since card width is
  // responsive (Tailwind breakpoints), so cards never overlap or gap unevenly.
  const cardStepRef = useRef(0);

  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);

  const startXRef = useRef(0);
  const startPosRef = useRef(0);

  // Velocity tracking
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);

  const measureStep = () => {
    const sample = cardRefs.current.find((card) => card !== null);
    if (sample) {
      cardStepRef.current = sample.getBoundingClientRect().width + CARD_GAP_PX;
    }
  };

  const positionCards = (position: number, isDirectDrag = false) => {
    const step = cardStepRef.current;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;

      let diff = idx - position;
      let isWrapping = false;

      if (total >= 4) {
        diff = ((diff % total) + total) % total;
        if (diff > total / 2) {
          diff -= total;
        }

        const prevDiff = prevDiffsRef.current[idx];
        if (prevDiff !== undefined && Math.abs(diff - prevDiff) > total / 2) {
          isWrapping = true;
        }
      }

      // Smooth continuous transitions without jump glitching
      if (isDirectDrag || isWrapping) {
        card.style.transition = "none";
      } else {
        card.style.transition = "transform 0.1s linear";
      }

      const x = diff * step;
      card.style.transform = `translate3d(${x}px, 0, 0)`;

      const isActive = Math.abs(diff) < 0.5;
      card.classList.toggle("active", isActive);

      prevDiffsRef.current[idx] = diff;
    });
  };

  const tick = (timestamp: number) => {
    if (lastTimestampRef.current !== null) {
      const delta = (timestamp - lastTimestampRef.current) / 1000;

      if (total > 4 && !isDraggingRef.current && !isHoveredRef.current) {
        progressPosRef.current =
          (progressPosRef.current + delta * MARQUEE_SPEED) % total;
        positionCards(progressPosRef.current);
        const roundedIdx =
          ((Math.round(progressPosRef.current) % total) + total) % total;
        setCurrentIndex(roundedIdx);
      }
    }

    lastTimestampRef.current = timestamp;
    animationFrameRef.current = requestAnimationFrame(tick);
  };

  const snapToNearest = (durationSec = 0.4) => {
    const target =
      ((Math.round(progressPosRef.current) % total) + total) % total;
    progressPosRef.current = target;
    setCurrentIndex(target);

    cardRefs.current.forEach((card) => {
      if (card) {
        card.style.transition = `transform ${durationSec}s cubic-bezier(0.22, 1, 0.36, 1)`;
      }
    });

    positionCards(target);
  };

  const goToSlide = (targetIdx: number) => {
    const normalized = ((targetIdx % total) + total) % total;
    progressPosRef.current = normalized;
    setCurrentIndex(normalized);

    cardRefs.current.forEach((card) => {
      if (card) {
        card.style.transition = `transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)`;
      }
    });

    positionCards(normalized);
  };

  useEffect(() => {
    measureStep();
    positionCards(progressPosRef.current);

    if (total > 4) {
      animationFrameRef.current = requestAnimationFrame(tick);
    }

    const handleResize = () => {
      measureStep();
      positionCards(progressPosRef.current, true);
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (isStatic) return;
      // Only react while focus is inside this gallery, never while a
      // dialog (e.g. the gallery popup) is open on top of the page.
      const root = viewportRef.current?.parentElement;
      if (!root || !root.contains(document.activeElement)) return;
      if (document.querySelector('[aria-modal="true"]')) return;
      if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
      if (e.key === "ArrowLeft") goToSlide(currentIndex - 1);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || isStatic) return;

      const now = performance.now();
      const dt = now - lastTimeRef.current;
      const step = cardStepRef.current;

      if (dt > 10) {
        const dx = (e.clientX - lastXRef.current) / step;
        velocityRef.current = dx / (dt / 1000);
        lastXRef.current = e.clientX;
        lastTimeRef.current = now;
      }

      const dragOffset = (e.clientX - startXRef.current) / step;
      let livePos = startPosRef.current - dragOffset;

      if (total >= 4) {
        livePos = ((livePos % total) + total) % total;
      }

      progressPosRef.current = livePos;
      positionCards(livePos, true);
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current || isStatic) return;
      isDraggingRef.current = false;

      if (total <= 4) {
        snapToNearest();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isStatic) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startPosRef.current = progressPosRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      if (total <= 4) snapToNearest();
    }
  };

  return (
    <div className="relative -mt-20 w-full flex flex-col justify-center items-center bg-[#f9f7f2] font-sans overflow-hidden text-[#111827] select-none">
      <div
        className={`relative w-full h-[380px] md:h-[420px] xl:h-[460px] flex justify-center items-center ${
          onExpand
            ? "cursor-pointer"
            : !isStatic
              ? "cursor-grab active:cursor-grabbing"
              : "cursor-default"
        }`}
        ref={viewportRef}
        onPointerDown={onExpand ? undefined : handlePointerDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {slides.map((slide, idx) => (
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[320px] md:w-[380px] xl:w-[420px] 2xl:w-[450px] aspect-[16/10] overflow-hidden bg-[#CBC4B5] will-change-transform"
              key={`${slide.title}-${idx}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={onExpand ? () => onExpand(idx) : undefined}
              {...(onExpand
                ? {
                    role: "button",
                    tabIndex: 0,
                    "aria-haspopup": "dialog" as const,
                    "aria-label": `Open in gallery: ${slide.title}`,
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onExpand(idx);
                      }
                    },
                  }
                : {})}
            >
              {slide.type === "video" ? (
                <iframe
                  src={slide.src}
                  title={slide.title}
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture"
                  tabIndex={onExpand ? -1 : undefined}
                  aria-hidden={onExpand ? true : undefined}
                  className={`w-full h-full object-cover ${onExpand ? "" : "pointer-events-none"}`}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={`w-full h-full object-cover ${onExpand ? "" : "pointer-events-none"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows — omitted entirely when there's nothing to slide to */}
      {!isStatic && (
        <div className="hidden lg:flex gap-1 -mt-10! z-30">
          <NavArrow
            direction="prev"
            tone="dark"
            onClick={() => goToSlide(currentIndex - 1)}
          />
          <NavArrow
            direction="next"
            tone="dark"
            onClick={() => goToSlide(currentIndex + 1)}
          />
        </div>
      )}
    </div>
  );
}

export default function ConcavePanoramaSlider({
  content = DEFAULT_CONTENT,
  hideOnMobile = false,
  enablePopup = false,
  exitNote,
}: {
  content?: GalleryContent;
  /** Opt-in only — park2 must keep showing the panorama gallery at every breakpoint. When true, hidden below md in favor of a plain mobile slider (GallerySlider). */
  hideOnMobile?: boolean;
  /** Opt-in only — park2 must keep its exact current drag-only cards. When true, drag is disabled and clicking a card opens it in the same shared popup GallerySlider uses. */
  enablePopup?: boolean;
  /** Optional footnote (e.g. an exit/completion disclaimer) shown under the heading — omitted on pages that don't need it. */
  exitNote?: string;
} = {}) {
  const [activeTab, setActiveTab] = useState(0);
  const [popupTab, setPopupTab] = useState<number | null>(null);
  const [popupSlideIndex, setPopupSlideIndex] = useState(0);
  const TABS = buildTabs(content);

  if (TABS.length === 0) return null;
  const safeActiveTab = TABS[activeTab] ? activeTab : 0;

  return (
    <div
      className={`relative w-full bg-[#f9f7f2] lg:py-24 py-12 flex-col ${
        hideOnMobile ? "hidden md:flex" : "flex"
      }`}
    >
      <div className="flex flex-col fix items-center gap-[20px] pb-5">
        {/* Eyebrow */}
        {/* <div className="flex items-center gap-2">
          <span className="text-[#59624d] font-mono text-sm tracking-widest uppercase">
            //
          </span>
          <p
            className="font-sora font-normal text-xs tracking-[-0.02em] uppercase text-[#59624d] m-0"
            dangerouslySetInnerHTML={{ __html: content.eyebrow }}
          />
        </div> */}

        <h2
          className="font-sora font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-[#212121]"
          dangerouslySetInnerHTML={{ __html: content.heading }}
        />
        {exitNote && (
          <p
            className="font-inter text-black/20 font-normal text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.4]"
            dangerouslySetInnerHTML={{ __html: exitNote }}
          />
        )}
      </div>
      {/* Tabs */}
      <div className="flex items-center justify-center gap-[16px] mb-8 sm:mb-12 relative z-20">
        {TABS.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            className={`px-8 sm:px-12 py-3 sm:py-4 rounded-[48px] text-[16px] sm:text-[20px] font-sora font-normal leading-[1.4] whitespace-nowrap cursor-pointer transition-colors ${
              safeActiveTab === idx
                ? "bg-[#59624d] text-white"
                : "border-[0.8px] border-[#9e9e9e] text-[#9e9e9e] bg-transparent"
            }`}
            dangerouslySetInnerHTML={{ __html: tab.label }}
          />
        ))}
      </div>

      {/* Remount per tab so progress/drag state resets cleanly */}
      <MarqueeSlider
        key={TABS[safeActiveTab].label}
        slides={TABS[safeActiveTab].slides}
        onExpand={
          enablePopup
            ? (index) => {
                setPopupTab(safeActiveTab);
                setPopupSlideIndex(index);
              }
            : undefined
        }
      />

      {enablePopup && (
        <GalleryMediaPopup
          tabs={TABS}
          initialTabIndex={popupTab}
          initialSlideIndex={popupSlideIndex}
          onClose={() => setPopupTab(null)}
        />
      )}
    </div>
  );
}
