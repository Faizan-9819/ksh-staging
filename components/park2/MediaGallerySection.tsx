"use client";

import { useEffect, useRef, useState } from "react";

type Filter = "Photos" | "Videos" | "Renders";

const SLIDES: Record<Filter, { src: string; title: string; caption: string }[]> = {
  Photos: [
    { src: "/park2new/gallery-1.webp", title: "Warehouse Exterior", caption: "Grade-A warehouse facade glowing at dusk." },
    { src: "/park2new/gallery-2.webp", title: "Facility Street View", caption: "Wide internal roads built for heavy vehicle movement." },
    { src: "/park2new/gallery-3.webp", title: "Park Entrance", caption: "Secure gated entry point at the park boundary." },
    { src: "/park2new/gallery-4.webp", title: "Aerial Overview", caption: "Three warehouse blocks viewed from above." },
  ],
  Videos: [
    { src: "/park2new/gallery-night.webp", title: "Night Aerial", caption: "Aerial walkthrough of the park after dark." },
    { src: "/park2new/gallery-3.webp", title: "Gate Flyover", caption: "Drone flyover of the main entrance." },
    { src: "/park2new/gallery-1.webp", title: "Facility Tour", caption: "A walk-through tour of the facility." },
  ],
  Renders: [
    { src: "/park2new/infra-building.webp", title: "Isometric Render", caption: "Isometric render of the warehouse layout." },
    { src: "/park2new/gallery-2.webp", title: "Exterior Render", caption: "Rendered concept of the exterior facade." },
    { src: "/park2new/gallery-4.webp", title: "Aerial Render", caption: "Rendered concept of the full park aerial." },
  ],
};

// Concave Curve Parameters
const angleStep = 24; // Degrees between adjacent cards
const radius = 900; // Arc radius in pixels

function Eyebrow() {
  return (
    <div className="flex items-center gap-[6px]">
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="shrink-0">
        <path d="M0 5h12M8 1l4 4-4 4" stroke="#59624d" strokeWidth="1.2" />
      </svg>
      <p className="font-sora font-normal text-[9.6px] tracking-[-0.192px] uppercase text-[#59624d] m-0">
        An Integrated Industrial Infrastructure Platform
      </p>
    </div>
  );
}

export default function MediaGallerySection() {
  const [filter, setFilter] = useState<Filter>("Photos");

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const dotRefs = useRef<HTMLDivElement[]>([]);
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);

  const currentIndexRef = useRef(0);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragOffsetRef = useRef(0);

  const slides = SLIDES[filter];

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const cards = cardRefs.current.filter(Boolean);
    const dots = dotRefs.current.filter(Boolean);
    const total = cards.length;
    currentIndexRef.current = 0;

    function renderConcaveArc() {
      const currentIndex = currentIndexRef.current;

      cards.forEach((card, idx) => {
        // Calculate shortest wrapped index difference for continuous looping
        let diff = (idx - currentIndex) % total;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        const angle = diff * angleStep;
        const rad = (angle * Math.PI) / 180;

        // CONCAVE MATH:
        // X moves along arc sine
        // Z moves AWAY (-Z) as angle increases, pushing side cards back so
        // the row curves away from the viewer like the inside of a cylinder
        // rotateY turns cards inward (-angle) to face center camera
        const x = radius * Math.sin(rad);
        const z = radius * (1 - Math.cos(rad)); // magnitude of recession
        const rotateY = -angle; // Inward tilt

        card.style.transform = `translate3d(${x}px, 0px, ${-z}px) rotateY(${rotateY}deg)`;

        // Depth effects (focus active card, dim/blur side cards)
        const absDiff = Math.abs(diff);
        const isActive = absDiff < 0.5;

        card.classList.toggle("active", isActive);

        if (isActive) {
          card.style.opacity = "1";
          card.style.filter = "brightness(100%) blur(0px)";
          card.style.zIndex = "10";
        } else if (absDiff <= 1.5) {
          card.style.opacity = "0.75";
          card.style.filter = "brightness(70%) blur(1px)";
          card.style.zIndex = "5";
        } else {
          card.style.opacity = "0.35";
          card.style.filter = "brightness(40%) blur(3px)";
          card.style.zIndex = "1";
        }
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentIndex);
      });
    }

    function goToSlide(index: number) {
      currentIndexRef.current = ((index % total) + total) % total;
      renderConcaveArc();
      resetAutoplay();
    }

    function nextSlide() {
      goToSlide(currentIndexRef.current + 1);
    }

    function prevSlide() {
      goToSlide(currentIndexRef.current - 1);
    }

    function startAutoplay() {
      autoPlayTimerRef.current = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      startAutoplay();
    }

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    }

    function handlePointerDown(e: PointerEvent) {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      cards.forEach((card) => (card.style.transition = "none"));
    }

    function handlePointerMove(e: PointerEvent) {
      if (!isDraggingRef.current) return;
      const dragOffset = (e.clientX - startXRef.current) / 250;
      dragOffsetRef.current = dragOffset;

      const originalIndex = currentIndexRef.current;
      currentIndexRef.current = (originalIndex - dragOffset + total) % total;
      renderConcaveArc();
      currentIndexRef.current = originalIndex;
    }

    function handlePointerUp() {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      cards.forEach((card) => {
        card.style.transition =
          "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, filter 0.6s ease";
      });

      const dragOffset = dragOffsetRef.current;
      if (Math.abs(dragOffset) > 0.3) {
        if (dragOffset > 0) prevSlide();
        else nextSlide();
      } else {
        renderConcaveArc();
      }
      dragOffsetRef.current = 0;
      startAutoplay();
    }

    function handleMouseEnter() {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }

    function handleMouseLeave() {
      startAutoplay();
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => goToSlide(idx));
    });

    (nextBtnRef.current as HTMLButtonElement | null)?.addEventListener("click", nextSlide);
    (prevBtnRef.current as HTMLButtonElement | null)?.addEventListener("click", prevSlide);
    window.addEventListener("keydown", handleKeydown);
    viewport.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    viewport.addEventListener("mouseenter", handleMouseEnter);
    viewport.addEventListener("mouseleave", handleMouseLeave);

    renderConcaveArc();
    startAutoplay();

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      nextBtnRef.current?.removeEventListener("click", nextSlide);
      prevBtnRef.current?.removeEventListener("click", prevSlide);
      window.removeEventListener("keydown", handleKeydown);
      viewport.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      viewport.removeEventListener("mouseenter", handleMouseEnter);
      viewport.removeEventListener("mouseleave", handleMouseLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <section
      id="media-gallery"
      className="relative w-full bg-[#fbf2e8] overflow-hidden py-[48px] lg:py-[68px]"
      data-name="Media Gallery Section"
    >
      <div className="relative flex flex-col items-center gap-[32px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-[24px] px-[16px]">
          <Eyebrow />
          <h2 className="font-sora font-semibold text-[28px] sm:text-[32px] lg:text-[38.4px] tracking-[-0.768px] text-[#212121] text-center m-0">
            Media Gallery
          </h2>

          {/* Filter pill tabs */}
          <div className="flex items-center justify-center gap-[16px]">
            {(["Photos", "Videos", "Renders"] as Filter[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-[16px] py-[8px] rounded-[48px] text-[16px] font-sora leading-[1.4] whitespace-nowrap cursor-pointer transition-colors ${
                  filter === tab
                    ? "bg-[#59624d] text-white"
                    : "border-[0.8px] border-[#9e9e9e] text-[#9e9e9e] bg-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Perspective Viewport */}
        <div
          ref={viewportRef}
          className="viewport-3d relative w-full h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {/* Concave Stage */}
          <div className="concave-stage relative w-[340px] sm:w-[340px] max-sm:w-[270px] h-[440px] max-sm:h-[380px]">
            {slides.map((slide, i) => (
              <div
                key={`${filter}-${i}`}
                ref={(node) => {
                  if (node) cardRefs.current[i] = node;
                }}
                className="slide-card absolute inset-0 rounded-[20px] overflow-hidden bg-[#CBC4B5] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.15)] will-change-transform"
                style={{ transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, filter 0.6s ease" }}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
                <div className="card-caption absolute bottom-0 left-0 right-0 px-[24px] pb-[24px] pt-[30px] bg-[linear-gradient(to_top,rgba(3,7,18,0.95),transparent)]">
                  <h3 className="text-white font-sora font-semibold text-[1.35rem] mb-[4px] m-0">{slide.title}</h3>
                  <p className="text-[#9ca3af] font-inter text-[0.85rem] m-0">{slide.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            ref={prevBtnRef}
            aria-label="Previous"
            className="nav-btn prev absolute top-1/2 -translate-y-1/2 left-[15px] sm:left-[40px] w-[52px] h-[52px] rounded-full bg-white/[0.08] backdrop-blur-[12px] border border-white/20 text-white flex items-center justify-center cursor-pointer z-30 transition-all duration-250 hover:bg-white/25 hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            ref={nextBtnRef}
            aria-label="Next"
            className="nav-btn next absolute top-1/2 -translate-y-1/2 right-[15px] sm:right-[40px] w-[52px] h-[52px] rounded-full bg-white/[0.08] backdrop-blur-[12px] border border-white/20 text-white flex items-center justify-center cursor-pointer z-30 transition-all duration-250 hover:bg-white/25 hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="dots-container absolute bottom-[40px] flex gap-[10px] z-30">
            {slides.map((_, i) => (
              <div
                key={i}
                ref={(node) => {
                  if (node) dotRefs.current[i] = node;
                }}
                className="dot w-[10px] h-[10px] rounded-full bg-white/30 cursor-pointer transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
