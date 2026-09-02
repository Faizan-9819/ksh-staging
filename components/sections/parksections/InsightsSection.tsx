"use client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import NavArrow from "@/components/ui/NavArrow";

export interface InsightsCard {
  id: number;
  image: string;
  title: string;
  city: string;
  potential: string;
  totalBuildings: string;
  /** Optional — when present the card links out; when absent it renders as a plain (non-clickable) card, matching the original design. */
  link?: string;
}

export interface InsightsContent {
  eyebrow: string;
  heading: string;
  cards: InsightsCard[];
}

// Dummy content — placeholder slides for the "Trust Growth Opportunity" slider
const DEFAULT_CONTENT: InsightsContent = {
  eyebrow: "INSIGHTS",
  heading: "Trust Growth Opportunity",
  cards: [
    {
      id: 1,
      image: "/ParkPage/hosurpov.png",
      title: "KSH HOSUR PARK I",
      city: "Hosur | Bengaluru",
      potential: "1.26 Mn. Sq. Ft.",
      totalBuildings: "04 Buildings",
    },
    {
      id: 3,
      image: "/ParkPage/chakanpov.png",
      title: "KSH CHAKAN PARK III",
      city: "Chakan | Pune",
      potential: "1.50 Mn. Sq. Ft.",
      totalBuildings: "08 Buildings",
    },
    {
      id: 4,
      image: "/ParkPage/hospov.png",
      title: "KSH HOSUR PARK II",
      city: "Hosur | Bengaluru",
      potential: "1.10 Mn. Sq. Ft.",
      totalBuildings: "03 Buildings",
    },
    {
      id: 5,
      image: "/ParkPage/cpov.png",
      title: "KSH CHAKAN PARK V",
      city: "Chakan | Pune",
      potential: "1.35 Mn. Sq. Ft.",
      totalBuildings: "05 Buildings",
    },
    {
      id: 6,
      image: "/ParkPage/hpov.png",
      title: "KSH HYDERABAD PARK I",
      city: "Hyderabad | Telangana",
      potential: "1.20 Mn. Sq. Ft.",
      totalBuildings: "04 Buildings",
    },
  ],
};

export default function InsightsSection({
  content = DEFAULT_CONTENT,
}: {
  content?: InsightsContent;
} = {}) {
  const cardData = content.cards;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-[#FBF2E8] py-12 md:py-16">
      <div className="fix">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          {/* <div className="flex items-center gap-2 mb-4">
            <span className="text-[#59624d] font-mono text-sm tracking-widest uppercase">
              //
            </span>
            <p
              className="font-sora font-normal text-xs uppercase tracking-[-0.02em] text-[#59624d] m-0"
              dangerouslySetInnerHTML={{ __html: content.eyebrow }}
            />
          </div> */}
          <h2
            className="font-sora text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#212121]"
            dangerouslySetInnerHTML={{ __html: content.heading }}
          />
        </div>

        {/* Carousel / Card List */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {cardData.map((item, index) => {
              const CardTag = item.link ? "a" : "div";
              const cardTagProps = item.link ? { href: item.link } : {};
              return (
                <div
                  key={item.id}
                  className={`flex-[0_0_88%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] min-w-0 pr-4 sm:px-0 lg:px-3 xl:px-6 first:pl-0 last:pr-0 relative ${
                    index !== 0 ? "lg:border-l lg:border-[#9E9E9E]" : ""
                  }`}
                >
                  {/* Card Container */}
                  <CardTag className="flex flex-col h-full" {...cardTagProps}>
                    {/* Card Image */}
                    <div className="overflow-hidden rounded-2xl mb-6 h-[220px] sm:h-[240px] lg:h-[190px] xl:h-[240px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Card Content */}
                    <div>
                      <h3
                        className="font-sora text-xl sm:text-2xl lg:text-[22px] xl:text-[28px] font-normal uppercase tracking-[-0.02em] text-[#212121] mb-4"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />

                      {/* Meta Rows */}
                      <div className="font-inter space-y-2 text-[#4a4a4a] text-base sm:text-lg lg:text-[16px] xl:text-[20px]">
                        <div className="flex justify-between items-center">
                          <span>City</span>
                          <span
                            dangerouslySetInnerHTML={{ __html: item.city }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="">Potential</span>
                          <span
                            className="font-medium"
                            dangerouslySetInnerHTML={{ __html: item.potential }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Total Buildings</span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item.totalBuildings,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardTag>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation & Pagination Controls */}
        <div className="flex items-center justify-between mt-8 md:mt-12">
          {/* Navigation Buttons */}
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

          {/* Pagination dots, matching Insights.tsx on the homepage — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-[13px]">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="h-[5px] p-0 border-none bg-transparent cursor-pointer flex items-center justify-center"
              >
                <span
                  className="block h-[5px] rounded-[99px]"
                  style={{
                    transition:
                      "width .4s cubic-bezier(.4,0,.2,1), background .4s ease",
                    width: index === selectedIndex ? 46 : 9,
                    background:
                      index === selectedIndex ? "#A9A7B2" : "transparent",
                    border:
                      index === selectedIndex ? "none" : "1px solid #C5C5BE",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
