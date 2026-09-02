"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";

const TABS = ["Photos", "Videos", "Renders"];

const SLIDES = [
  { src: "/park/panorama-gate.jpg", alt: "KSH Chakan Park IV gate view" },
  { src: "/park/panorama-cam.jpg", alt: "KSH Chakan Park IV facility view" },
  { src: "/park/panorama-night.jpg", alt: "KSH Chakan Park IV at night" },
  { src: "/park/panorama-aerial.jpg", alt: "KSH Chakan Park IV aerial view" },
];

export default function ParkPanoramaSwiper() {
  const [tab, setTab] = useState(TABS[0]);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="download-brochure" className="relative w-full bg-[#fbf2e8] overflow-hidden">
      <div className="relative py-[85px]">
        <div className="fix flex flex-col items-center gap-[30px] text-center mb-[60px]">
          <div className="flex items-center gap-2">
            <span className="text-[#59624d] text-[12px] font-sora">//</span>
            <p className="font-sora text-[12px] tracking-[-0.24px] uppercase text-[#59624d]">
              An Integrated Industrial Infrastructure Platform
            </p>
          </div>
          <h2 className="font-sora font-semibold text-[32px] lg:text-[48px] tracking-[-0.96px] text-[#212121] m-0">
            Chakan: A Thriving Industrial Hub in Pune
          </h2>

          <div className="flex gap-3">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-[20px] py-[10px] rounded-[60px] text-[15px] lg:text-[20px] font-sora cursor-pointer transition-colors whitespace-nowrap ${
                  tab === t
                    ? "bg-[#59624d] text-white"
                    : "border border-[#9e9e9e] text-[#9e9e9e] bg-transparent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <Swiper
          slidesPerView={1.3}
          centeredSlides
          spaceBetween={24}
          breakpoints={{
            768: { slidesPerView: 2.3, spaceBetween: 28 },
            1280: { slidesPerView: 3.3, spaceBetween: 32 },
          }}
          onSwiper={(s) => (swiperRef.current = s)}
          className="park-panorama-swiper"
        >
          {SLIDES.map((s) => (
            <SwiperSlide key={s.src} className="!h-[340px] lg:!h-[480px]">
              <img
                src={s.src}
                alt={s.alt}
                className="w-full h-full object-cover rounded-[16px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev / next controls */}
        <div className="flex items-center justify-center gap-3 mt-[50px]">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous"
            className="flex items-center justify-center w-[70px] h-[34px] rounded-[30px] bg-black/10 cursor-pointer transition-opacity hover:opacity-70"
          >
            <svg width="9" height="18" viewBox="0 0 9 18" fill="none">
              <path
                d="M8 1 1 9l7 8"
                stroke="#212121"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next"
            className="flex items-center justify-center w-[70px] h-[34px] rounded-[30px] bg-black/10 cursor-pointer transition-opacity hover:opacity-70"
          >
            <svg width="9" height="18" viewBox="0 0 9 18" fill="none">
              <path
                d="M1 1l7 8-7 8"
                stroke="#212121"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .park-panorama-swiper {
          padding: 10px 0 20px;
          overflow: visible;
        }
        .park-panorama-swiper .swiper-slide {
          transition: transform 0.4s ease, opacity 0.4s ease;
          opacity: 0.45;
          transform: scale(0.92);
        }
        .park-panorama-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </section>
  );
}
