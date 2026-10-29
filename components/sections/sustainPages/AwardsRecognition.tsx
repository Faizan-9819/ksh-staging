"use client";

import { PRESSABLE } from "@/lib/pressable";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";
import NavArrow from "@/components/ui/NavArrow";
import ArrowUpRightIcon from "@/components/ui/ArrowUpRightIcon";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { stopLenis, startLenis } from "@/components/ui/LenisProvider";

interface AwardItem {
  id: number;
  shortName: string;
  title: string;
  subtitle: string;
  imgSrc: string;
}

const AWARDS_DATA: AwardItem[] = [
  {
    id: 1,
    shortName: "GRI AWARDS REAL ESTATE INDIA 2025",
    title: "GRI Awards Real Estate India 2025",
    subtitle: "3rd Industrial & Logistics Project of the Year.",
    imgSrc: "/sustainability/award0.png",
  },
  {
    id: 2,
    shortName: "EMERGING DEVELOPER OF THE YEAR",
    title: "Emerging Developer of the Year",
    subtitle:
      "Industrial & Warehousing at the Realty+ Conclave Excellence Awards 2025 (West).",
    imgSrc: "/sustainability/award2.png",
  },
  {
    id: 3,
    shortName: "REAL ESTATE",
    title: "Excellence in Industrial Real Estate",
    subtitle:
      "KSH INFRA has been recognized for its outstanding achievement in developing, designing, and delivering high-impact Industrial spaces. The company has set new benchmarks in operational efficiency, innovative design, and sustainable development.",
    imgSrc: "/sustainability/award3.png",
  },
  {
    id: 4,
    shortName: "INDUSTRIAL INFRASTRUCTURE",
    title: "Excellence in Sustainable Industrial Infrastructure",
    subtitle:
      "KSH INFRA has been honored for its exceptional commitment to building environmentally responsible Industrial parks. The team has prioritized sustainability, energy efficiency, and long-term ecological impact across all projects.",
    imgSrc: "/sustainability/award4.png",
  },
  {
    id: 5,
    shortName: "REALTY + CONCLAVE",
    title:
      "Realty + Conclave & Excellence Awards 2025 – Emerging Developer of the Year, Industrial & Warehousing",
    subtitle:
      "KSH INFRA has been celebrated as a rising force in the Industrial & Logistics sector. The organization has made significant strides through continuous innovation, timely execution, and the development of future-ready infrastructure.",
    imgSrc: "/sustainability/award5.png",
  },
  {
    id: 6,
    shortName: "ET EDGE",
    title: "ET Edge Best Realty Brands 2025",
    subtitle:
      "KSH INFRA has been recognized among the most trusted and visionary real estate brands in the country. The company has demonstrated excellence, credibility, and a strong customer-centric approach in all its developments.",
    imgSrc: "/sustainability/award6.png",
  },
];

export default function AwardsRecognition() {
  // Setup Embla Carousel for Mobile View
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reinit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full bg-white">
      <div className="fix py-12 md:py-20">
        <h2 className="font-semibold text-[28px] sm:text-[40px] text-[#212121] tracking-[-0.02em] mb-8 md:mb-12">
          Awards &amp; Industry Recognition
        </h2>

        {/* ─── DESKTOP GRID (3 columns) ─── */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {AWARDS_DATA.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>

        {/* ─── MOBILE CAROUSEL (Embla - 1 slide per view with controls) ─── */}
        <div className="lg:hidden w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {AWARDS_DATA.map((award) => (
                <div
                  key={award.id}
                  className="flex-[0_0_100%] min-w-0 px-2 flex justify-center"
                >
                  <div className="w-full max-w-[360px]">
                    <AwardCard award={award} isMobile />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center justify-center gap-x-3 mt-6 px-4">
            <NavArrow
              direction="prev"
              className="h-10! w-18! rounded-4xl!"
              tone="dark"
              onClick={scrollPrev}
              ariaLabel="Previous Award"
            />
            <NavArrow
              direction="next"
              tone="dark"
              className="h-10! w-18! rounded-4xl!"
              onClick={scrollNext}
              ariaLabel="Next Award"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CARD COMPONENT WITH ANIMATED MOBILE POPUP ───
function AwardCard({
  award,
  isMobile = false,
}: {
  award: AwardItem;
  isMobile?: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scroll via Lenis (not body.style.overflow) — this page's scroll is
  // driven by Lenis, and toggling native overflow fights it mid-frame,
  // causing the scroll-stopping/jerk bug elsewhere on the site.
  useEffect(() => {
    if (!isModalOpen) return;
    stopLenis();
    return () => startLenis();
  }, [isModalOpen]);

  // Keyboard support for the mobile popup: Escape closes it, and focus goes
  // back to the card that opened it.
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isModalOpen) return;
    const card = cardRef.current;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      card?.focus();
    };
  }, [isModalOpen]);

  const handleCardClick = () => {
    if (isMobile) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        // Mobile: the card opens the details popup, so it's a button.
        // Desktop: nothing to activate, but it still takes Tab focus so
        // keyboard users can reveal the hover overlay (group-focus-visible).
        {...(isMobile
          ? { ...PRESSABLE, "aria-haspopup": "dialog" as const }
          : { tabIndex: 0 })}
        onClick={handleCardClick}
        className={`group relative w-full h-[320px] rounded-[24px] overflow-hidden select-none bg-[#F8F8F8] ${
          isMobile ? "cursor-pointer" : ""
        }`}
      >
        {/* ─── BASE FRONT SIDE (IMAGE & MOBILE SHORT TITLE BUTTON) ─── */}
        <div className="absolute inset-0 w-full h-full p-6 pb-6 flex flex-col items-center justify-between">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={award.imgSrc}
              alt={award.title}
              className="max-w-full max-h-[200px] object-contain block pointer-events-none"
            />
          </div>

          {/* Short Award Name Button (Mobile Only) */}
          {isMobile && (
            // Not separately focusable: the whole card is already the button.
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="flex justify-between items-center w-[90%] border-b pb-3 border-black/80 pb-2 pt-2 mt-2 gap-x-2"
            >
              <span className="text-[#212121] text-[12px] font-semibold tracking-wide uppercase text-left">
                {award.shortName}
              </span>
              <ArrowUpRightIcon size={18} className="shrink-0 text-[#212121]" />
            </div>
          )}
        </div>

        {/* ─── DESKTOP HOVER OVERLAY (NO CHANGES) ─── */}
        {!isMobile && (
          <div
            className="absolute inset-0 w-full h-full rounded-[24px] p-8 flex flex-col items-center justify-center text-center transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none group-hover:pointer-events-auto"
            style={{
              background:
                "radial-gradient(circle at center, #F7F4EC 0%, #E3DDD0 45%, rgba(197, 189, 172, 1) 100%)",
            }}
          >
            <h3 className="font-[family-name:var(--font-sora),sans-serif] font-medium text-[15px] lg:text-[20px] sm:text-[24px] leading-[1.25] text-[#212121] tracking-[-0.01em] uppercase mb-3">
              {award.title}
            </h3>
            <p className="font-normal text-[14px] sm:text-[15px] leading-[1.4] text-[#4A4A4A]">
              {award.subtitle}
            </p>
          </div>
        )}
      </div>

      {/* ─── MOBILE FADE/EASE MODAL POPUP ─── */}
      {isMobile &&
        mounted &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label={award.title}
                  data-lenis-prevent
                  className="relative w-full max-w-[380px] max-h-[85vh] overflow-y-auto rounded-[28px] p-6 sm:p-8 flex flex-col items-center text-center"
                  style={{
                    background:
                      "radial-gradient(circle at center, #F7F4EC 0%, #E3DDD0 50%, rgba(197, 189, 172, 1) 100%)",
                  }}
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    autoFocus
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 w-9 h-9 cursor-pointer rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-[#212121] transition-colors"
                    aria-label="Close details"
                  >
                    <X size={20} />
                  </button>

                  {/* Award Image */}
                  <div className="w-full flex items-center justify-center my-3 py-2">
                    <img
                      src={award.imgSrc}
                      alt={award.title}
                      className="max-w-[180px] max-h-[160px] object-contain"
                    />
                  </div>

                  {/* Full Title & Subtitle */}
                  <h3 className="font-[family-name:var(--font-sora),sans-serif] font-semibold text-[17px] leading-[1.25] text-[#212121] tracking-[-0.01em] uppercase mb-3 mt-1">
                    {award.title}
                  </h3>
                  <p className="font-normal text-[13px] leading-[1.5] text-[#3D3D3D]">
                    {award.subtitle}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
