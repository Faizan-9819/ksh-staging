"use client";

import { useState, useEffect, useCallback } from "react";
import NavArrow from "@/components/ui/NavArrow";
import GalleryMediaPopup from "./GalleryMediaPopup";
import type { GalleryContent } from "./ConcavePanoramaSlider";

type Slide = {
  src: string;
  alt: string;
  title: string;
  type: "image" | "video";
};

type TabConfig = {
  label: string;
  slides: Slide[];
};

const imagesToSlides = (images: string[]): Slide[] =>
  images.map((img, idx) => ({
    src: `/ParkPage/${img}`,
    alt: `Image ${idx + 1}`,
    title: `Image ${idx + 1}`,
    type: "image",
  }));

const videosToSlides = (videos: { label: string; vid: string }[]): Slide[] =>
  videos.map((v) => ({
    src: v.vid,
    alt: v.label,
    title: v.label,
    type: "video",
  }));

/**
 * Simple 1-up gallery slider for /ksh-chakan-iv mobile — replaces the concave
 * panorama effect with one image/video at a time, prev/next NavArrow
 * controls, and the same pagination-dot style used elsewhere on this page.
 * Clicking a slide opens the same shared GalleryMediaPopup used by
 * ConcavePanoramaSlider on desktop.
 */
export default function GallerySlider({
  content,
}: {
  content: GalleryContent;
}) {
  const TABS: TabConfig[] = [
    { label: content.photosLabel, slides: imagesToSlides(content.photoImages) },
    { label: content.videosLabel, slides: videosToSlides(content.videos) },
    {
      label: content.rendersLabel,
      slides: imagesToSlides(content.renderImages),
    },
  ].filter((tab) => tab.slides.length > 0);

  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [popupTab, setPopupTab] = useState<number | null>(null);

  const slides = TABS[activeTab]?.slides ?? [];

  const goToSlide = useCallback(
    (index: number) => {
      if (!slides.length) return;
      setActiveSlide(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  // Reset to the first slide whenever the active tab changes
  useEffect(() => {
    setActiveSlide(0);
  }, [activeTab]);

  if (TABS.length === 0) return null;

  const prevDisabled = slides.length <= 1;
  const nextDisabled = slides.length <= 1;

  return (
    <div className="relative w-full bg-[#f9f7f2] py-12 flex flex-col md:hidden">
      <div className="flex flex-col fix items-start gap-[20px] pb-10">
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
        {/*  */}
        <h2
          className="font-sora font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-[#212121] text-left"
          dangerouslySetInnerHTML={{ __html: content.heading }}
        />
      </div>

      {/* Tabs — full width on mobile per content direction */}
      <div className="fix flex items-center justify-center gap-[8px] sm:gap-[16px] mb-8 sm:mb-12 relative z-20">
        {TABS.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            className={`flex-1 sm:flex-none px-2 sm:px-12 py-2.5 sm:py-4 rounded-[48px] text-[13px] sm:text-[20px] font-sora font-normal leading-[1.4] whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === idx
                ? "bg-[#59624d] text-white"
                : "border-[0.8px] border-[#9e9e9e] text-[#9e9e9e] bg-transparent"
            }`}
            dangerouslySetInnerHTML={{ __html: tab.label }}
          />
        ))}
      </div>

      {/* Sliding track — click active slide to open the shared popup */}
      <div className="fix w-full">
        <div className="relative w-full aspect-video overflow-hidden">
          <div
            className="flex w-full h-full transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(-${activeSlide * 100}% - ${activeSlide * 16}px))`,
            }}
          >
            {slides.map((slide, idx) => (
              <div
                key={slide.src}
                className="w-full h-full shrink-0 cursor-pointer rounded-2xl overflow-hidden bg-[#CBC4B5]"
                style={{ marginRight: idx === slides.length - 1 ? 0 : 16 }}
                onClick={() => setPopupTab(activeTab)}
              >
                {slide.type === "video" ? (
                  <iframe
                    src={slide.src}
                    title={slide.title}
                    loading="lazy"
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls — only when there's more than one slide to navigate between */}
        {slides.length > 1 && (
          <div className="flex items-center mt-8">
            <div className="flex items-center gap-2">
              <NavArrow
                direction="prev"
                tone="dark"
                onClick={() => goToSlide(activeSlide - 1)}
                disabled={prevDisabled}
                className={`transition-opacity duration-300 ${
                  prevDisabled
                    ? "opacity-40 cursor-not-allowed pointer-events-none"
                    : "opacity-100 cursor-pointer"
                }`}
              />
              <NavArrow
                direction="next"
                tone="dark"
                onClick={() => goToSlide(activeSlide + 1)}
                disabled={nextDisabled}
                className={`transition-opacity duration-300 ${
                  nextDisabled
                    ? "opacity-40 cursor-not-allowed pointer-events-none"
                    : "opacity-100 cursor-pointer"
                }`}
              />
            </div>
          </div>
        )}
      </div>

      <GalleryMediaPopup
        tabs={TABS}
        initialTabIndex={popupTab}
        initialSlideIndex={activeSlide}
        onClose={() => setPopupTab(null)}
      />
    </div>
  );
}
