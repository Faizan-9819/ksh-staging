// "use client";

// import React from "react";

// interface GovernancePoint {
//   number: string;
//   title: string;
//   description: string;
//   imageSrc: string;
// }

// const GOVERNANCE_POINTS: GovernancePoint[] = [
//   {
//     number: "01",
//     title: "ETHICS & COMPLIANCE",
//     description:
//       "The KSH INFRA Code of Conduct Handbook, which we follow meticulously, sets a high standard for compliance. This encompasses every aspect of how our team interacts with internal and external stakeholders to how our projects are commissioned and managed.",
//     imageSrc:
//       "/sustainability/gov1.jpg",
//   },
//   {
//     number: "02",
//     title: "SAFETY",
//     description:
//       "KSH INFRA parks offer top-notch amenities, prioritise safety protocols and facilities. Safety is integral to our operations, allowing us to deliver reliable, compliant and sustainable infrastructure.",
//     imageSrc:
//       "/sustainability/gov2.jpg",
//   },
//   {
//     number: "03",
//     title: "VALUE CREATION",
//     description:
//       "We create value for society and our stakeholders in many ways, including job opportunities, tax payment support, participation in the supply chain, and investment in local communities.",
//     imageSrc:
//       "/sustainability/gov3.jpg",
//   },
// ];

// export default function GovernanceSection() {
//   return (
//     <section
//       className="w-full font-[var(--font-inter),sans-serif]"
//       style={{
//         background:
//           "linear-gradient(0deg, #FFF 0%, #FFF 100%), #F8F8F8",
//       }}
//     >
//       <div className="fix py-12 md:py-20">
//         {/* Header Tag */}
//         <div className="flex items-center gap-[6px] mb-3">
//           <span className="text-[#8C8C84] font-semibold text-[13px]">//</span>
//           <span className="text-[#8C8C84] font-medium text-[12px] tracking-[0.05em] uppercase">
//             INSIGHTS
//           </span>
//         </div>

//         {/* Title */}
//         <h2 className="font-semibold text-[32px] sm:text-[40px] lg:text-[48px] text-[#212121] tracking-[-0.02em] leading-[1.1] mb-6">
//           Governance
//         </h2>

//         {/* Section Description */}
//         <p className="max-w-[1040px] font-normal text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.55] text-[#4A4A4A] mb-12 lg:mb-16">
//           At KSH INFRA, governance starts from our rigorous procurement processes
//           that extends to every aspect of our supply chain. Complete
//           transparency, efficiency, and clear accountability are essential
//           components of our development strategy. Our governance protects your
//           investment while delivering high growth.
//         </p>

//         {/* Points List */}
//         <div className="flex flex-col">
//           {GOVERNANCE_POINTS.map((item) => (
//             <div
//               key={item.number}
//               className="border-t border-[#E0E0E0] py-4 lg:py-6 flex flex-col md:flex-row items-start justify-between gap-6 lg:gap-12"
//             >
//               {/* Left Column: Number + Content */}
//               <div className="flex-1 flex flex-col sm:flex-row items-start gap-4 sm:gap-8 lg:gap-12">
//                 {/* Item Number */}
//                 <span className="font-medium text-[20px] lg:text-[22px] text-[#8C8C84] leading-tight shrink-0">
//                   {item.number}
//                 </span>

//                 {/* Text Block */}
//                 <div className="flex-1 max-w-[580px]">
//                   <h3 className=" font-semibold text-[18px] sm:text-[20px] lg:text-[28px] text-[#212121] tracking-[-0.01em] uppercase mb-4 leading-[1.2]">
//                     {item.title}
//                   </h3>
//                   <p className="font-normal text-[14px] sm:text-[15px] lg:text-[20px] leading-[1.6] text-[#4A4A4A]">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>

//               {/* Right Column: Image */}
//               <div className="w-full md:w-[320px] lg:w-[420px] shrink-0 h-[200px] sm:h-[220px] lg:h-[240px] rounded-[20px] overflow-hidden bg-[#F0F0F0]">
//                 <img
//                   src={item.imageSrc}
//                   alt={item.title}
//                   className="w-full h-full object-cover block"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GovernancePoint {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
}

const GOVERNANCE_POINTS: GovernancePoint[] = [
  {
    number: "01",
    title: "ETHICS & COMPLIANCE",
    description:
      "The KSH INFRA Code of Conduct Handbook, which we follow meticulously, sets a high standard for compliance. This encompasses every aspect of how our team interacts with internal and external stakeholders to how our projects are commissioned and managed.",
    imageSrc: "/sustainability/gov1.jpg",
  },
  {
    number: "02",
    title: "SAFETY",
    description:
      "KSH INFRA parks offer top-notch amenities, prioritise safety protocols and facilities. Safety is integral to our operations, allowing us to deliver reliable, compliant and sustainable infrastructure.",
    imageSrc: "/sustainability/gov2.jpg",
  },
  {
    number: "03",
    title: "VALUE CREATION",
    description:
      "We create value for society and our stakeholders in many ways, including job opportunities, tax payment support, participation in the supply chain, and investment in local communities.",
    imageSrc: "/sustainability/gov3.jpg",
  },
];

export default function GovernanceSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleAccordion = (index: number) => {
    if (index !== openIndex) {
      setOpenIndex(index);
    }
  };

  return (
    <section
      className="w-full font-[var(--font-inter),sans-serif]"
      style={{
        background: "linear-gradient(0deg, #FFF 0%, #FFF 100%), #F8F8F8",
      }}
    >
      <div className="fix py-12 md:py-20">
        {/* Header Tag */}
        <div className="flex items-center gap-[6px] mb-3">
          {/* <span className="text-[#8C8C84] font-semibold text-[13px]">//</span>
          <span className="text-[#8C8C84] font-medium text-[12px] tracking-[0.05em] uppercase">
            INSIGHTS
          </span> */}
        </div>

        {/* Title */}
        <h2 className="font-semibold text-[32px] sm:text-[40px] lg:text-[48px] text-[#212121] tracking-[-0.02em] leading-[1.1] mb-6">
          Governance
        </h2>

        {/* Section Description */}
        <p className="max-w-[1500px] font-normal text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.55] text-[#4A4A4A] mb-12 lg:mb-16">
          At KSH INFRA, governance starts from our rigorous procurement
          processes that extends to every aspect of our supply chain. Complete
          transparency, efficiency, and clear accountability are essential
          components of our development strategy. Our governance protects your
          investment while delivering high growth.
        </p>

        {/* ================================================================= */}
        {/* DESKTOP VIEW (Unchanged original vertical layout)                 */}
        {/* ================================================================= */}
        <div className="hidden md:flex flex-col">
          {GOVERNANCE_POINTS.map((item) => (
            <div
              key={item.number}
              className="border-t border-[#E0E0E0] py-4 lg:py-6 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-12"
            >
              {/* Left Column: Number + Content */}
              <div className="flex-1 flex flex-col sm:flex-row items-start gap-4 sm:gap-8 lg:gap-12">
                {/* Item Number */}
                <span className="text-[20px] lg:text-[22px] text-[#8C8C84] leading-tight shrink-0">
                  {item.number}
                </span>

                {/* Text Block */}
                <div className="flex-1 max-w-[580px]">
                  <h3 className=" text-[18px] sm:text-[20px] lg:text-[28px] text-[#212121] tracking-[-0.01em] uppercase mb-4 leading-[1.2]">
                    {item.title}
                  </h3>
                  <p className="font-normal text-[14px] sm:text-[15px] lg:text-[20px] leading-[1.6] text-[#4A4A4A]">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="w-full md:w-[320px] lg:w-[420px] shrink-0 h-[200px] sm:h-[220px] lg:h-[240px] rounded-[20px] overflow-hidden bg-[#F0F0F0]">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover block"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ================================================================= */}
        {/* MOBILE VIEW (< md: Framer Motion Accordion Layout)               */}
        {/* ================================================================= */}
        <div className="block md:hidden w-full flex flex-col gap-y-4">
          {GOVERNANCE_POINTS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.number}
                onClick={() => handleAccordion(index)}
                className="bg-white border border-[#E0E0E0] rounded-[20px] p-6 transition-all cursor-pointer select-none"
              >
                {/* Header Row: Number + Chevron Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[18px] text-[#8C8C84]">
                    {item.number}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#212121] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Card Title */}
                <h3 className="font-semibold text-[20px] text-[#212121] tracking-[-0.01em] uppercase mt-2 leading-[1.2]">
                  {item.title}
                </h3>

                {/* Animated Body (Image first, then Description) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 flex flex-col gap-y-4">
                        {/* Image */}
                        <div className="w-full h-[200px] rounded-[14px] overflow-hidden bg-[#F0F0F0]">
                          <img
                            src={item.imageSrc}
                            alt={item.title}
                            className="w-full h-full object-cover block"
                          />
                        </div>

                        {/* Description */}
                        <p className="font-normal text-[14px] leading-[1.6] text-[#4A4A4A]">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import useEmblaCarousel from "embla-carousel-react";

// interface GovernancePoint {
//   number: string;
//   title: string;
//   description: string;
//   imageSrc: string;
// }

// const GOVERNANCE_POINTS: GovernancePoint[] = [
//   {
//     number: "01",
//     title: "ETHICS & COMPLIANCE",
//     description:
//       "The KSH INFRA Code of Conduct Handbook, which we follow meticulously, sets a high standard for compliance. This encompasses every aspect of how our team interacts with internal and external stakeholders to how our projects are commissioned and managed.",
//     imageSrc: "/sustainability/gov1.jpg",
//   },
//   {
//     number: "02",
//     title: "SAFETY",
//     description:
//       "KSH INFRA parks offer top-notch amenities, prioritise safety protocols and facilities. Safety is integral to our operations, allowing us to deliver reliable, compliant and sustainable infrastructure.",
//     imageSrc: "/sustainability/gov2.jpg",
//   },
//   {
//     number: "03",
//     title: "VALUE CREATION",
//     description:
//       "We create value for society and our stakeholders in many ways, including job opportunities, tax payment support, participation in the supply chain, and investment in local communities.",
//     imageSrc: "/sustainability/gov3.jpg",
//   },
// ];

// export default function GovernanceSection() {
//   // Setup Embla Carousel for Mobile View
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [canScrollPrev, setCanScrollPrev] = useState(false);
//   const [canScrollNext, setCanScrollNext] = useState(false);

//   const scrollPrev = useCallback(() => {
//     if (emblaApi) emblaApi.scrollPrev();
//   }, [emblaApi]);

//   const scrollNext = useCallback(() => {
//     if (emblaApi) emblaApi.scrollNext();
//   }, [emblaApi]);

//   const scrollTo = useCallback(
//     (index: number) => {
//       if (emblaApi) emblaApi.scrollTo(index);
//     },
//     [emblaApi],
//   );

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     setSelectedIndex(emblaApi.selectedScrollSnap());
//     setCanScrollPrev(emblaApi.canScrollPrev());
//     setCanScrollNext(emblaApi.canScrollNext());
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;
//     onSelect();
//     emblaApi.on("select", onSelect);
//     emblaApi.on("reinit", onSelect);
//   }, [emblaApi, onSelect]);

//   return (
//     <section
//       className="w-full font-[var(--font-inter),sans-serif]"
//       style={{
//         background: "linear-gradient(0deg, #FFF 0%, #FFF 100%), #F8F8F8",
//       }}
//     >
//       <div className="fix py-12 md:py-20">
//         {/* Header Tag */}
//         <div className="flex items-center gap-[6px] mb-3">
//           <span className="text-[#8C8C84] font-semibold text-[13px]">//</span>
//           <span className="text-[#8C8C84] font-medium text-[12px] tracking-[0.05em] uppercase">
//             INSIGHTS
//           </span>
//         </div>

//         {/* Title */}
//         <h2 className="font-semibold text-[32px] sm:text-[40px] lg:text-[48px] text-[#212121] tracking-[-0.02em] leading-[1.1] mb-6">
//           Governance
//         </h2>

//         {/* Section Description */}
//         <p className="max-w-[1040px] font-normal text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.55] text-[#4A4A4A] mb-12 lg:mb-16">
//           At KSH INFRA, governance starts from our rigorous procurement
//           processes that extends to every aspect of our supply chain. Complete
//           transparency, efficiency, and clear accountability are essential
//           components of our development strategy. Our governance protects your
//           investment while delivering high growth.
//         </p>

//         {/* ================================================================= */}
//         {/* DESKTOP VIEW (Unchanged original vertical layout)                 */}
//         {/* ================================================================= */}
//         <div className="hidden md:flex flex-col">
//           {GOVERNANCE_POINTS.map((item) => (
//             <div
//               key={item.number}
//               className="border-t border-[#E0E0E0] py-4 lg:py-6 flex flex-col md:flex-row items-start justify-between gap-6 lg:gap-12"
//             >
//               {/* Left Column: Number + Content */}
//               <div className="flex-1 flex flex-col sm:flex-row items-start gap-4 sm:gap-8 lg:gap-12">
//                 {/* Item Number */}
//                 <span className="text-[20px] lg:text-[22px] text-[#8C8C84] leading-tight shrink-0">
//                   {item.number}
//                 </span>

//                 {/* Text Block */}
//                 <div className="flex-1 max-w-[580px]">
//                   <h3 className=" text-[18px] sm:text-[20px] lg:text-[28px] text-[#212121] tracking-[-0.01em] uppercase mb-4 leading-[1.2]">
//                     {item.title}
//                   </h3>
//                   <p className="font-normal text-[14px] sm:text-[15px] lg:text-[20px] leading-[1.6] text-[#4A4A4A]">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>

//               {/* Right Column: Image */}
//               <div className="w-full md:w-[320px] lg:w-[420px] shrink-0 h-[200px] sm:h-[220px] lg:h-[240px] rounded-[20px] overflow-hidden bg-[#F0F0F0]">
//                 <img
//                   src={item.imageSrc}
//                   alt={item.title}
//                   className="w-full h-full object-cover block"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ================================================================= */}
//         {/* MOBILE VIEW (Embla Carousel - One card at a time with Nav Controls)*/}
//         {/* ================================================================= */}
//         <div className="block md:hidden w-full">
//           {/* Carousel Viewport */}
//           <div className="overflow-hidden w-full" ref={emblaRef}>
//             <div className="flex w-full">
//               {GOVERNANCE_POINTS.map((item) => (
//                 <div
//                   key={item.number}
//                   className="flex-[0_0_100%] min-w-0 w-full pr-1"
//                 >
//                   <div className="bg-white border border-[#E0E0E0] rounded-[20px] p-6 flex flex-col justify-between h-full">
//                     {/* Top Info */}
//                     <div>
//                       <div className="flex items-center justify-between mb-4">
//                         <span className="font-medium text-[18px] text-[#8C8C84]">
//                           {item.number}
//                         </span>
//                       </div>

//                       <h3 className="font-semibold text-[20px] text-[#212121] tracking-[-0.01em] uppercase mb-3 leading-[1.2]">
//                         {item.title}
//                       </h3>

//                       <p className="font-normal text-[14px] leading-[1.6] text-[#4A4A4A] mb-6">
//                         {item.description}
//                       </p>
//                     </div>

//                     {/* Card Image */}
//                     <div className="w-full h-[200px] rounded-[14px] overflow-hidden bg-[#F0F0F0]">
//                       <img
//                         src={item.imageSrc}
//                         alt={item.title}
//                         className="w-full h-full object-cover block"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Controls & Pagination Dots */}
//           <div className="flex items-center justify-center gap-x-3 mt-6 px-2">
//             {/* Prev Button */}
//             <button
//               type="button"
//               onClick={scrollPrev}
//               disabled={!canScrollPrev}
//               aria-label="Previous Slide"
//               className="w-10 h-10 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center text-[#212121] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             </button>

//             {/* Next Button */}
//             <button
//               type="button"
//               onClick={scrollNext}
//               disabled={!canScrollNext}
//               aria-label="Next Slide"
//               className="w-10 h-10 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center text-[#212121] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
