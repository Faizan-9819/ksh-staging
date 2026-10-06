"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import NavArrow from "@/components/ui/NavArrow";
import Btn from "@/components/ui/Btn";
import { motion } from "framer-motion";
// import { useVideoModal } from "../ui/VideoModalContext";
//
const DEFS = [
  {
    brand: "Jabil",
    img: "/casestudies/newcase1.jpg",
    logo: "/casestud/jab.svg",
    heading: "Done and Delivered. On Time — Jabil",
    p: "Jabil is an American electronics manufacturing multinational with more than 140,000 employees in over 25 countries. They needed a 75,000 sq. ft. facility in Chakan, Pune for manufacturing Nacelle, an aircraft component.",
    href: "/case-studies/jabil",
  },
  //
  {
    brand: "Hindalco",
    img: "/casestudies/hindalco.webp",
    logo: "/casestud/hindal.svg",
    heading:
      "Large-Scale, Built-to-Spec Facility — Delivered to Hindalco in Eight Months",
    p: "Hindalco, a flagship company of the Aditya Birla Group, was setting up a new facility for a key business vertical with a fixed go-live deadline of eight months. This marked Hindalco's first-ever leased Industrial facility, with all previous plants being company-owned.",
    href: "/case-studies/hindalco",
  },
  {
    brand: "Kawasaki",
    img: "/casestudies/kawasaki.webp",
    logo: "/casestud/kawasakilogo.svg",
    heading:
      "Manufacturing, Assembly, and R&D — Delivered Kawasaki's First Indian Integrated Unit",
    p: "Kawasaki is a global motorcycle brand known for high-performance bikes, commute vehicles, motors, energy and Industrial equipment. Kawasaki Motors sought to establish its first Indian manufacturing plant at Chakan, Pune, requiring 250,000 sq. ft. dedicated to manufacturing, assembly, warehousing, and R&D.",
    href: "/case-studies/kawasaki",
  },
  {
    brand: "Barnes",
    img: "/casestudies/bernes.webp",
    logo: "/casestud/newbar.svg",
    heading:
      "Crane-Ready, High-Capacity Manufacturing Facility — Delivered to SPECTRIX (formerly Barnes)",
    p: "Barnes, a global moulding solutions manufacturer, partnered with KSH INFRA to develop a built-to-suit manufacturing facility for their heavy-duty operations. This greenfield project carried a fixed 12-month timeline. While the initial requirement was for 80,000 sq. ft., during the site visit Barnes selected Building B4, factoring in future expansion.",
    href: "/case-studies/barnes",
  },
];

export default function CaseStudies() {
  // const { openModal } = useVideoModal();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full bg-[#F5F5F7] py-[50px] lg:py-[80px] font-sora overflow-hidden">
      {/* Header Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        <div className="mb-8 lg:mb-10">
          {/* <div className="flex items-center gap-2 mb-3">
            <span className="text-[#888888] font-semibold text-[12px] sm:text-[13px] tracking-wide uppercase">
              // KSH CHAKAN PARK IV CASE STUDIES
            </span>
          </div> */}
          <h2 className="text-[#111111] font-bold text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.1] tracking-[-0.02em]">
            Built Around Operational Needs
          </h2>
        </div>
      </div>

      {/* Full-Width Carousel Wrapper — bleeds off the right edge from sm up
          (peeking next slide); on phones each slide is 100% wide, so it gets
          a matching right gutter instead of running flush to the screen edge. */}
      <div className="w-full pl-[max(1rem,calc((100vw-1440px)/2+1rem))] sm:pl-[max(1.5rem,calc((100vw-1440px)/2+1.5rem))] lg:pl-[max(2rem,calc((100vw-1440px)/2+2rem))] xl:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] pr-4 sm:pr-0">
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex gap-5 sm:gap-6">
            {DEFS.map((cd, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] sm:flex-[0_0_58%] lg:flex-[0_0_54%] xl:flex-[0_0_52%] 2xl:flex-[0_0_64%] min-w-0"
              >
                <div className="relative h-[380px] sm:h-[420px] lg:h-[450px] w-full rounded-[24px] overflow-hidden group">
                  {/* Background Image */}
                  <img
                    src={cd.img}
                    alt={cd.brand}
                    className="absolute inset-0 w-full h-full object-cover brightness-50 transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

                  {/* Card Content Container */}
                  <div className="absolute inset-0 p-6  sm:p-8 lg:p-10 flex flex-col justify-between z-10">
                    {/* Logo Top Left */}
                    <div>
                      <img
                        src={cd.logo}
                        alt={cd.brand}
                        className="h-7 sm:h-8 w-auto object-contain brightness-0 invert"
                      />
                    </div>

                    {/* Bottom Details & Buttons */}
                    <div className="flex flex-col gap-5">
                      <div>
                        <h3 className="text-white text-[20px] sm:text-[22px] lg:text-[24px] font-semibold leading-[1.25] tracking-[-0.01em]">
                          {cd.heading}
                        </h3>
                        {/* {cd.p && (
                          <p className="text-white/80 text-[13px] sm:text-[14px] leading-[1.5] mt-2 font-normal max-w-[92%]">
                            {cd.p}
                          </p>
                        )} */}
                      </div>

                      {/* Action Buttons Row */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {/* Read Case Study Btn Component */}
                        <Btn
                          href={cd.href}
                          className="!h-11 overflow-hidden cursor-pointer !border-white/30"
                          arrowColor="stroke-white"
                          hoverArrowColor="stroke-black"
                          hoverTextColor="text-black"
                          hoverBgColor="bg-white"
                          textColor="text-white!"
                          label="Read Case Study"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* End-of-track spacer element for right-side breathing room —
                hidden on phones, where the wrapper's pr-4 already provides it
                and a spacer would leave the last slide scrolled off-center. */}
            <div className="hidden sm:block flex-none w-8 lg:w-12 xl:w-16 h-full pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar within standard container bounds */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        <div className="flex items-center justify-between mt-8 lg:mt-12">
          {/* Left: Custom Capsule Pagination */}
          <div
            role="tablist"
            aria-label="Case studies carousel navigation"
            className="hidden sm:flex items-center gap-[13px]"
          >
            {scrollSnaps.map((_, index) => {
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => scrollTo(index)}
                  className="h-[5px] p-0 border-none bg-transparent cursor-pointer flex items-center justify-center"
                >
                  <motion.span
                    layout
                    transition={{
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="block h-[5px] rounded-[99px]"
                    animate={{
                      width: isSelected ? 46 : 9,
                      backgroundColor: isSelected ? "#A9A7B2" : "transparent",
                      borderColor: isSelected ? "transparent" : "#C5C5BE",
                      borderWidth: isSelected ? 0 : 1,
                    }}
                    style={{
                      borderStyle: "solid",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Center: View More Button */}
          <div className="hidden sm:block">
            <Btn
              label="View More"
              href="/case-studies"
              arrowColor="stroke-[#59624D]"
              hoverArrowColor="stroke-white"
              hoverTextColor="text-white"
              hoverBgColor="bg-[#59624D]"
              textColor="text-[#111111]"
              borderColor="border-[#59624D]"
              className="border-gray-300 bg-transparent px-8"
            />
          </div>

          {/* Right: Slider Arrow Controls with Disabled State */}
          <div className="flex items-center gap-2">
            <NavArrow
              direction="prev"
              tone="dark"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className={`transition-opacity duration-300 ${
                prevBtnDisabled
                  ? "opacity-40 cursor-not-allowed pointer-events-none"
                  : "opacity-100 cursor-pointer"
              }`}
            />
            <NavArrow
              direction="next"
              tone="dark"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className={`transition-opacity duration-300 ${
                nextBtnDisabled
                  ? "opacity-40 cursor-not-allowed pointer-events-none"
                  : "opacity-100 cursor-pointer"
              }`}
            />
          </div>
        </div>

        {/* Center View More for Mobile Screens */}
        <div className="sm:hidden flex justify-center mt-6">
          <Btn
            label="View More"
            href="/case-studies"
            arrowColor="stroke-[#59624D]"
            hoverArrowColor="stroke-white"
            hoverTextColor="text-white"
            hoverBgColor="bg-[#59624D]"
            textColor="text-[#59624D]"
            className="border-gray-300 bg-transparent w-full justify-center"
          />
        </div>
      </div>
    </section>
  );
}
