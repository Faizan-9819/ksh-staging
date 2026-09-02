"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import Btn from "@/components/ui/Btn"; // Adjust path if needed
import NavArrow from "@/components/ui/NavArrow";

// Mock data matching the design layout
// const PARKS_DATA = [
//   {
//     id: 1,
//     number: "01",
//     title: "KSH Chakan Park I",
//     bgImage: "about/park/parkbg1.webp",
//     totalAreaNum: "0.85",
//     totalAreaUnit: "Mn. Sq. Ft.",
//     noOfBuildings: "04",
//     locationMain: "Chakan,",
//     locationSub: "Pune",
//   },
//   {
//     id: 2,
//     number: "04",
//     title: "KSH Chakan Park I",
//     bgImage: "about/park/parkbg2.webp",
//     totalAreaNum: "1.20",
//     totalAreaUnit: "Mn. Sq. Ft.",
//     noOfBuildings: "05",
//     locationMain: "Chakan,",
//     locationSub: "Pune",
//   },
//   {
//     id: 3,
//     number: "04",
//     title: "KSH Chakan Park I",
//     bgImage: "about/park/parkbg2.webp",
//     totalAreaNum: "1.20",
//     totalAreaUnit: "Mn. Sq. Ft.",
//     noOfBuildings: "05",
//     locationMain: "Chakan,",
//     locationSub: "Pune",
//   },
//   {
//     id: 4,
//     number: "04",
//     title: "KSH Chakan Park I",
//     bgImage: "about/park/kshhosur.webp",
//     totalAreaNum: "1.20",
//     totalAreaUnit: "Mn. Sq. Ft.",
//     noOfBuildings: "05",
//     locationMain: "Chakan,",
//     locationSub: "Pune",
//   },
// ];
const PARKS_DATA = [
  {
    id: 4,
    number: "01",
    title: "KSH Chakan Park IV",
    href: "/ksh-chakan-iv",
    bgImage: "/ParkPage/chakan-4/heroCh4/NewChakan4Spot.webp",
    totalAreaNum: "0.36",
    totalAreaUnit: "Mn. Sq. Ft.",
    noOfBuildings: "02",
    locationMain: "Chakan,",
    locationSub: "Pune",
  },
  {
    id: 3,
    number: "02",
    title: "KSH Chakan Park III",
    href: "/ksh-chakan-iii",
    bgImage: "/ParkPage/chakan-3/ch3spot.jpg",
    totalAreaNum: "1.50",
    totalAreaUnit: "Mn. Sq. Ft.",
    noOfBuildings: "08",
    locationMain: "Chakan,",
    locationSub: "Pune",
  },
  {
    id: 2,
    number: "03",
    title: "KSH Chakan Park II",
    href: "/ksh-chakan-ii",
    bgImage: "/ParkPage/chakan-2/ch2spot.jpg",
    totalAreaNum: "1.20",
    totalAreaUnit: "Mn. Sq. Ft.",
    noOfBuildings: "05",
    locationMain: "Chakan,",
    locationSub: "Pune",
  },
  {
    id: 1,
    number: "04",
    title: "KSH Chakan Park I",
    href: "/ksh-chakan-i",
    bgImage: "/ParkPage/chakan-1/ch1spot.jpg",
    totalAreaNum: "0.85",
    totalAreaUnit: "Mn. Sq. Ft.",
    noOfBuildings: "04",
    locationMain: "Chakan,",
    locationSub: "Pune",
  },
  {
    id: 6,
    number: "05",
    title: "KSH Talegaon Park I",
    href: "/ksh-talegaon-i",
    bgImage: "/ParkPage/talegaon-i/t1spot.jpg",
    totalAreaNum: "0.14",
    totalAreaUnit: "Mn. Sq. Ft.",
    noOfBuildings: "02",
    locationMain: "Talegaon,",
    locationSub: "Pune",
  },
  {
    id: 5,
    number: "06",
    title: "KSH Hosur Park I",
    href: "/ksh-hosur-i",
    bgImage: "/ParkPage/hosur-1/hspot.jpg",
    totalAreaNum: "1.26",
    totalAreaUnit: "Mn. Sq. Ft.",
    noOfBuildings: "04",
    locationMain: "Hosur,",
    locationSub: "Bengaluru",
  },
];

export default function ParksSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 10 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const currentPark = PARKS_DATA[selectedIndex] || PARKS_DATA[0];

  return (
    <section className="relative w-full overflow-hidden md:h-screen font-sora bg-[#0D1117] text-white">
      {/* Decorative SVG - Left */}
      {/* <div className="absolute top-0 left-0 pointer-events-none z-0 overflow-hidden max-w-[50%] opacity-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="482"
          height="224"
          viewBox="0 0 482 224"
          fill="none"
          className="w-full h-auto"
        >
          <path
            opacity="0.7"
            d="M-1074.79 16.5593V718.098C-1074.79 718.098 -1089.16 912.5 -880.316 912.5C-671.468 912.5 -685.842 718.098 -685.842 718.098M-685.631 718.098V196.593C-685.631 196.593 -700.005 2.19045 -491.157 2.19045C-282.309 2.19045 -296.683 196.593 -296.683 196.593L-297.317 716.407C-297.317 716.407 -311.691 910.81 -102.843 910.81C106.005 910.81 91.8416 716.407 91.8416 716.407V194.902C91.8416 194.902 77.4676 0.5 286.316 0.5C495.164 0.5 480.79 194.902 480.79 194.902V904.893"
            stroke="url(#paint0_linear_1001_689)"
            strokeOpacity="0.2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1001_689"
              x1="-297"
              y1="0.5"
              x2="-297"
              y2="639"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#24314E" stopOpacity="0.8" />
              <stop offset="1" stopColor="#24314E" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div> */}

      {/* Decorative SVG - Right */}
      {/* <div className="absolute bottom-0 right-0 pointer-events-none z-0 overflow-hidden max-w-[50%] opacity-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="624"
          height="913"
          viewBox="0 0 624 913"
          fill="none"
          className="w-full h-auto"
        >
          <path
            opacity="0.7"
            d="M622.79 16.5593V718.098C622.79 718.098 637.164 912.5 428.316 912.5C219.468 912.5 233.842 718.098 233.842 718.098M233.631 718.098V196.593C233.631 196.593 248.005 2.19045 39.1573 2.19045C-169.691 2.19045 -155.317 196.593 -155.317 196.593L-154.683 716.407C-154.683 716.407 -140.309 910.81 -349.157 910.81C-558.005 910.81 -543.842 716.407 -543.842 716.407V194.902C-543.842 194.902 -529.468 0.5 -738.316 0.5C-947.164 0.5 -932.79 194.902 -932.79 194.902"
            stroke="url(#paint0_linear_1001_690)"
            strokeOpacity="0.2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1001_690"
              x1="-155"
              y1="0.5"
              x2="-155"
              y2="912.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#24314E" stopOpacity="0.2" />
              <stop offset="1" stopColor="#24314E" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>
      </div> */}

      {/* Full Width Wrapper */}
      <div className="relative w-full z-10 ">
        {/* Main Carousel Wrapper Container */}
        <div className="relative w-full overflow-hidden min-h-[550px] lg:min-h-[620px]">
          <div className="absolute inset-x-0 bottom-6 sm:bottom-6 2xl:bottom-13 z-30 pointer-events-none">
            <div className="fix flex justify-end">
              <div className="inline-flex items-center gap-1 pointer-events-auto">
                <div
                  onClick={scrollPrev}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      scrollPrev();
                    }
                  }}
                  aria-label="Previous Slide"
                  className="rounded-full flex items-center justify-center text-white bg-black/30 hover:bg-black/50 backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  {/* <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg> */}
                  <NavArrow
                    direction="prev"
                    // tone="dark"
                    // onClick={() => emblaApi?.scrollNext()}
                  />
                </div>

                <div
                  onClick={scrollNext}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      scrollNext();
                    }
                  }}
                  aria-label="Next Slide"
                  className="rounded-full flex items-center justify-center text-white bg-black/30 hover:bg-black/50 backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  {/* <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  /> */}
                  {/* </svg> */}
                  <NavArrow
                    direction="next"
                    // tone="dark"
                    // onClick={() => emblaApi?.scrollNext()}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Static Glassmorphic Navigation Buttons (Fixed in layout) */}
          {/* <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 pointer-events-auto">
            <div className="inline-flex items-center gap-2"> */}
          {/* Prev Button */}
          {/* <button
                onClick={scrollPrev}
                aria-label="Previous Slide"
                className="w-24 h-12 rounded-full flex items-center justify-center text-white bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/30 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button> */}

          {/* Next Button */}
          {/* <button
                onClick={scrollNext}
                aria-label="Next Slide"
                className="w-24 h-12 rounded-full flex items-center justify-center text-white bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/30 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button> */}
          {/* </div>
          </div> */}

          {/* Embla Viewport */}
          <div className="overflow-hidden w-full h-full" ref={emblaRef}>
            <div className="flex touch-pan-y w-full h-full">
              {PARKS_DATA.map((park) => (
                <div
                  key={park.id}
                  className="relative flex-[0_0_100%] min-w-0 min-h-[550px] lg:h-screen bg-cover bg-center overflow-hidden flex flex-col justify-between py-6 sm:py-10 lg:py-14"
                  style={{ backgroundImage: `url(${park.bgImage})` }}
                >
                  {/* Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50 z-0" />

                  {/* Top Header Section — same fade+slide crossfade as the
                      middle title/button below, instead of snapping */}

                  <div className="relative z-10 fix">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPark.id + "-header"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex items-center justify-between"
                      >
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-white/90 ">
                          {currentPark.number}
                        </span>

                        {/* View All KSH Parks Button using global Btn */}
                        <Btn
                          label="View All KSH Parks"
                          href="/parks"
                          textColor="text-white"
                          hoverTextColor="text-[#515F44]"
                          bgColor="bg-white/10"
                          hoverBgColor="bg-[#D6C5A0]"
                          borderColor="border-white/40"
                          arrowColor="stroke-white"
                          hoverArrowColor="stroke-[#515F44]"
                          textSize="text-xs sm:text-sm"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Middle Content Section */}
                  <div className="relative z-10 my-auto py-8 fix">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPark.id + "-title"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                          {currentPark.title}
                        </h2>

                        {/* View Park Button using global Btn */}
                        <Btn
                          label="View Park"
                          href={currentPark.href}
                          textColor="text-white"
                          hoverTextColor="text-[#515F44]"
                          bgColor="bg-white/10"
                          hoverBgColor="bg-[#D6C5A0]"
                          borderColor="border-white/40"
                          arrowColor="stroke-white"
                          hoverArrowColor="stroke-[#515F44]"
                          textSize="text-xs sm:text-sm"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Bottom Stats Grid */}
                  {/* <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pr-28 sm:pr-36">
                    <div className="lg:col-span-12 grid grid-cols-2 sm:grid-cols-3 gap-6 items-end"> */}
                  {/* Stat 1: Total Area */}
                  {/* <AnimatePresence mode="wait">
                        <motion.div
                          key={currentPark.id + "-area"}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.35, delay: 0.05 }}
                        >
                          <p className="text-[11px] sm:text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">
                            Total Area
                          </p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl sm:text-4xl font-bold text-white">
                              {currentPark.totalAreaNum}
                            </span>
                            <span className="text-sm sm:text-base text-white/80">
                              {currentPark.totalAreaUnit}
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence> */}

                  {/* Stat 2: No. of Buildings */}
                  {/* <AnimatePresence mode="wait">
                        <motion.div
                          key={currentPark.id + "-buildings"}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.35, delay: 0.1 }}
                        >
                          <p className="text-[11px] sm:text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">
                            No. of Buildings
                          </p>
                          <span className="text-2xl sm:text-4xl font-bold text-white">
                            {currentPark.noOfBuildings}
                          </span>
                        </motion.div>
                      </AnimatePresence> */}

                  {/* Stat 3: Park Location */}
                  {/* <AnimatePresence mode="wait">
                        <motion.div
                          key={currentPark.id + "-location"}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.35, delay: 0.15 }}
                          className="col-span-2 sm:col-span-1"
                        >
                          <p className="text-[11px] sm:text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">
                            Park Location
                          </p>
                          <div className="text-xl sm:text-3xl font-semibold text-white leading-tight">
                            <span>{currentPark.locationMain} </span>
                            <span className="text-white/70 font-normal">
                              {currentPark.locationSub}
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div> */}
                  {/* Bottom Stats Grid */}
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end fix">
                    <div className="lg:col-span-12 grid grid-cols-2 sm:grid-cols-3 gap-6 items-end">
                      {/* Stat 1: Total Area */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentPark.id + "-area"}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.35, delay: 0.05 }}
                        >
                          <p className="text-[11px] lg:text-[16px] uppercase tracking-wider text-white/70 font-normal mb-1">
                            Total Area
                          </p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl lg:text-[40px] font-normal text-white">
                              {currentPark.totalAreaNum}
                            </span>
                            <span className="text-sm lg:text-[24px] text-white/80">
                              {currentPark.totalAreaUnit}
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Stat 2: No. of Buildings */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentPark.id + "-buildings"}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.35, delay: 0.1 }}
                          className="pl-6 sm:pl-0"
                        >
                          <p className="text-[11px] lg:text-[16px] uppercase tracking-wider text-white/70 font-normal mb-1">
                            No. of Buildings
                          </p>
                          <span className="text-2xl lg:text-[40px] font-normal text-white">
                            {currentPark.noOfBuildings}
                          </span>
                        </motion.div>
                      </AnimatePresence>

                      {/* Stat 3: Park Location */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentPark.id + "-location"}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.35, delay: 0.15 }}
                          className="col-span-2 sm:col-span-1"
                        >
                          <p className="text-[11px] lg:text-[16px] uppercase tracking-wider text-white/70 font-normal mb-1">
                            Park Location
                          </p>
                          <div className="text-xl lg:text-[40px] font-normal text-white leading-tight">
                            <span>{currentPark.locationMain} </span>
                            <span className="text-white/70 font-normal text-[14px] lg:text-[24px]">
                              {currentPark.locationSub}
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
