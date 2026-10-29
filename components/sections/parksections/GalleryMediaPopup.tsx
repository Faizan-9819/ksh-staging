"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import NavArrow from "@/components/ui/NavArrow";
import { stopLenis, startLenis } from "@/components/ui/LenisProvider";
import { useDialogA11y } from "@/components/ui/useDialogA11y";

export interface GalleryPopupSlide {
  src: string;
  alt: string;
  title: string;
  type?: "image" | "video";
}

export interface GalleryPopupTab {
  label: string;
  slides: GalleryPopupSlide[];
}

/**
 * Shared gallery lightbox — used identically by ConcavePanoramaSlider
 * (desktop) and GallerySlider (mobile) so both share the exact same popup:
 * tab switcher, sliding track, NavArrow prev/next, auto-height (no-crop)
 * media, Escape/arrow-key navigation, and Lenis scroll lock while open.
 */
export default function GalleryMediaPopup({
  tabs,
  initialTabIndex,
  initialSlideIndex,
  onClose,
}: {
  tabs: GalleryPopupTab[];
  /** Non-null opens the popup on that tab/slide; null keeps it closed. */
  initialTabIndex: number | null;
  initialSlideIndex: number;
  onClose: () => void;
}) {
  const isOpen = initialTabIndex !== null;
  const [isAnimating, setIsAnimating] = useState(false);
  const [popupTab, setPopupTab] = useState(initialTabIndex ?? 0);
  const [popupSlide, setPopupSlide] = useState(initialSlideIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  // Escape is handled below (it animates the close), so no onClose here.
  useDialogA11y(dialogRef, isOpen);

  useEffect(() => {
    if (initialTabIndex === null) return;
    setPopupTab(initialTabIndex);
    setPopupSlide(initialSlideIndex);
    requestAnimationFrame(() => setIsAnimating(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTabIndex]);

  const popupSlides = tabs[popupTab]?.slides ?? [];

  const goToPopupSlide = useCallback(
    (index: number) => {
      if (!popupSlides.length) return;
      setPopupSlide(
        ((index % popupSlides.length) + popupSlides.length) %
          popupSlides.length,
      );
    },
    [popupSlides.length],
  );

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    // Early-return guard rather than an if/open-else-closed startLenis() —
    // that shape calls startLenis() twice for one stopLenis() (once from
    // the close transition's own body, again from the prior render's
    // cleanup), which can zero out a completely unrelated lock still held
    // elsewhere (e.g. the navbar's open mobile menu/dropdown) and resume
    // scroll while that overlay is still up.
    if (!isOpen) return;
    stopLenis();
    return () => startLenis();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") goToPopupSlide(popupSlide - 1);
      if (e.key === "ArrowRight") goToPopupSlide(popupSlide + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, popupSlide, goToPopupSlide, handleClose]);

  const popupPrevDisabled = popupSlides.length <= 1;
  const popupNextDisabled = popupSlides.length <= 1;

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999999999999999]! flex items-center justify-center p-4 backdrop-blur-md transition-all duration-200 ease-out ${
        isAnimating ? "bg-black/70 opacity-100" : "bg-black/0 opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-popup-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl bg-white rounded-3xl pt-16 px-3 pb-6 sm:p-8 flex flex-col justify-center items-center shadow-2xl transition-all duration-200 ease-out overflow-hidden ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <h2 id="gallery-popup-title" className="sr-only">
          Park gallery
        </h2>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {popupSlides[popupSlide]
            ? `Slide ${popupSlide + 1} of ${popupSlides.length}: ${popupSlides[popupSlide].title}`
            : ""}
        </p>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-[#f2f2f2] text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors z-10 cursor-pointer"
          aria-label="Close popup"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Popup Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 mt-2 max-w-full flex-wrap">
          {tabs.map((tab, idx) => (
            <button
              type="button"
              key={`popup-tab-${tab.label}`}
              aria-pressed={popupTab === idx}
              onClick={() => {
                setPopupTab(idx);
                setPopupSlide(0);
              }}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-sora font-medium transition-colors cursor-pointer ${
                popupTab === idx
                  ? "bg-[#59624d] text-white underline underline-offset-4 font-semibold"
                  : "border border-gray-300 text-gray-500 bg-transparent"
              }`}
              dangerouslySetInnerHTML={{ __html: tab.label }}
            />
          ))}
        </div>

        {/* Slider Outer Frame */}
        <div className="relative w-full overflow-hidden rounded-2xl">
          <div
            className="flex w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${popupSlide * 100}%)` }}
          >
            {popupSlides.map((slide, idx) => (
              <div
                key={`popup-slide-${slide.src}-${idx}`}
                inert={idx !== popupSlide}
                aria-hidden={idx !== popupSlide}
                className="w-full min-w-full flex-shrink-0 flex items-center justify-center px-2 sm:px-3"
              >
                {slide.type === "video" ? (
                  <div className="w-full aspect-video overflow-hidden rounded-2xl">
                    <iframe
                      src={slide.src}
                      title={slide.title}
                      loading="lazy"
                      allow="autoplay; fullscreen; picture-in-picture"
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  </div>
                ) : (
                  <div className="w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Popup Bottom Centered Nav Arrows */}
        <div className="flex items-center gap-3 mt-6">
          <NavArrow
            direction="prev"
            tone="dark"
            onClick={() => goToPopupSlide(popupSlide - 1)}
            disabled={popupPrevDisabled}
          />
          <NavArrow
            direction="next"
            tone="dark"
            onClick={() => goToPopupSlide(popupSlide + 1)}
            disabled={popupNextDisabled}
          />
        </div>
      </div>
    </div>
  );
}
