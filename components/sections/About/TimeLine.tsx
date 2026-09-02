// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import TimeCard from "./TimeCard";
// import Particlecom from "./Particlecom";
// import NavArrow from "@/components/ui/NavArrow";

// interface TimelineEntry {
//   id: number;
//   year: number;
//   content: string | string[];
//   image: string;
// }

// const timelineData: TimelineEntry[] = [
//   {
//     id: 1,
//     year: 1969,
//     content:
//       "Mr. Kushal Subbaya Hegde established his first business 'Kamal Motors', an exclusive Bosch products' distribution business in Ahmednagar District, Maharashtra",
//     image: "/t2.jpg",
//   },
//   {
//     id: 2,
//     year: 1979,
//     content:
//       "Expanded the Bosch products' distribution business into Pune city, Maharashtra by taking over the operations of 'Waterloo Motors'",
//     image: "/t4.jpg",
//   },
//   {
//     id: 3,
//     year: 1989,
//     content:
//       "Established 'Kushal Motors' in Pune city, Maharashtra to cater the original equipment customers of Bosch",
//     image: "/t5.jpg",
//   },
//   {
//     id: 4,
//     year: 1991,
//     content:
//       "Established 'Kushal Electricals' to distribute and service the Electrical Power Tools product line of Bosch",
//     image: "/t6.jpg",
//   },
//   {
//     id: 5,
//     year: 1999,
//     content:
//       "Inception of KSH Group with establishment of 'KSH Logistics' as a Third-party Logistics (3PL) company to service the captive requirements of Bosch in the Western Region of India and forayed into Logistics",
//     image: "/t7.jpg",
//   },
//   {
//     id: 6,
//     year: 2008,
//     content:
//       "Established 'KSH Distriparks' with the setting up of an Inland container Depot in Talegaon, Pune. The Dry Port facility was set up with a capacity of 120,000 TEUs per annum",
//     image: "/t8.jpg",
//   },
//   {
//     id: 7,
//     year: 2012,
//     content:
//       "Investment received from Pacific Century Group of HK/Singapore to expand KSH Logistics, KSH Distriparks and set up 'KSH INFRA' to expand into the INFRA space",
//     image: "/t9.jpg",
//   },
//   {
//     id: 8,
//     year: 2018,
//     content: [
//       "Established two projects under 'KSH INFRA' admeasuring 1 Mn. Sq. Ft.",
//       "Later, successfully exited these projects to Morgan Stanley Investment Fund, USA",
//     ],
//     image: "/t10.jpg",
//   },
//   {
//     id: 9,
//     year: 2018,
//     content: "KSH Group celebrates its Golden Jubilee Year",
//     image: "/t11.jpg",
//   },
//   {
//     id: 10,
//     year: 2021,
//     content:
//       "KSH INFRA partnered with Indospace Capital to invest INR 1000 crores in a joint venture (JV) and commenced construction on its first project under the JV of 1.6 Mn. Sq. Ft. with an aim to develop 10 Mn. Sq. Ft. across key markets in India",
//     image: "/t12.jpg",
//   },
//   {
//     id: 11,
//     year: 2022,
//     content:
//       "KSH INFRA launches KSH Chakan Park III, one of its biggest Industrial & Logistics Park spread over total area of 1.50 Mn. Sq. Ft., at Varale Chakan",
//     image: "/about/newTimeline.jpg",
//   },
//   {
//     id: 12,
//     year: 2023,
//     content:
//       "KSH INFRA launches KSH Chakan Park IV, its fourth Industrial & Logistics Park in the Chakan micro market",
//     image: "/t14.jpg",
//   },
//   {
//     id: 13,
//     year: 2025,
//     content:
//       "KSH International IPO launch on NSE, BSE - KSH International becomes the 3rd Largest manufacturer of Winding wires in India, Largest exporter of Winding wire in India, Largest CTC manufacturer in India",
//     image: "/t15.jpg",
//   },
//   {
//     id: 14,
//     year: 2025,
//     content: [
//       "Announced ₹550+ Cr investment in ~60-acre park in Tamil Nadu; Launch of KSH Hosur Park I",
//       "Cumulative Investment in Tamil Nadu goes beyond INR 1000 Cr.",
//       "Considerable contribution to the 3 Mn. Sq. Ft. Under development",
//     ],
//     image: "/t24.jpg",
//   },
//   {
//     id: 15,
//     year: 2026,
//     content: [
//       "Transition from developer to developer + fund manager",
//       "Entry into institutional capital platforms (Category II AIF)",
//       "Planned Launch of INR 1,250 Cr. Category II AIF",
//       "Focus on greenfield Grade A Industrial parks across Pune, Mumbai, Chennai, Bengaluru",
//     ],
//     image: "/2026Aif.jpg",
//   },
// ];

// // TimeCard renders whatever node it's given as `content` — pass a plain
// // string through, or an auto-numbered list for entries with multiple points.
// const renderTimelineContent = (content: string | string[]) =>
//   Array.isArray(content) ? (
//     <ol className="list-decimal text-[13px] 2xl:text-[13px] list-outside pl-4 space-y-0.5 2xl:space-y-1">
//       {content.map((point, i) => (
//         <li key={i}>{point}</li>
//       ))}
//     </ol>
//   ) : (
//     content
//   );

// const Timeline = () => {
//   // Mobile Swiper state
//   const [isSlidingMobile, setIsSlidingMobile] = useState(false);
//   const [isBeginningMobile, setIsBeginningMobile] = useState(true);
//   const [isEndMobile, setIsEndMobile] = useState(false);

//   // Desktop Swiper state
//   const [isSlidingDesktop, setIsSlidingDesktop] = useState(false);
//   const [isBeginningDesktop, setIsBeginningDesktop] = useState(true);
//   const [isEndDesktop, setIsEndDesktop] = useState(false);

//   // Mobile: measure the badge-row Y offset so the shared axis line aligns behind badges
//   const mobileWrapperRef = useRef<HTMLDivElement>(null);
//   const mobileBadgeRowRef = useRef<HTMLDivElement>(null);
//   const [mobileLineTop, setMobileLineTop] = useState<number | null>(null);

//   const handleMobileSwiperUpdate = (swiper: any) => {
//     setIsBeginningMobile(swiper.isBeginning);
//     setIsEndMobile(swiper.isEnd);
//   };

//   const handleDesktopSwiperUpdate = (swiper: any) => {
//     setIsBeginningDesktop(swiper.isBeginning);
//     setIsEndDesktop(swiper.isEnd);
//   };

//   // Measure badge row position relative to the mobile swiper wrapper
//   useEffect(() => {
//     const measure = () => {
//       if (mobileWrapperRef.current && mobileBadgeRowRef.current) {
//         const wrapperRect = mobileWrapperRef.current.getBoundingClientRect();
//         const badgeRect = mobileBadgeRowRef.current.getBoundingClientRect();
//         // Center of badge row relative to the wrapper's top
//         setMobileLineTop(
//           badgeRect.top - wrapperRect.top + badgeRect.height / 2,
//         );
//       }
//     };
//     // Measure after paint so layout is settled
//     const raf = requestAnimationFrame(measure);
//     window.addEventListener("resize", measure);
//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("resize", measure);
//     };
//   }, []);

//   return (
//     <div id="growth-timeline">
//       {/* =================================================================
//           1. MOBILE VIEW (Visible under 1024px)
//          ================================================================= */}
//       <div className="block lg:hidden h-fit relative">
//         <div className="relative py-10 overflow-hidden">
//           <h2 className="w-fit text-4xl font-sora font-bold ml-[20px] md:ml-[40px] pt-4 relative z-10 text-[#212121]">
//             The KSH Legacy
//           </h2>

//           {/* Swiper Container */}
//           <div
//             ref={mobileWrapperRef}
//             className="relative flex flex-col items-center z-10 pt-6"
//           >
//             {/* Horizontal axis line */}
//             <div
//               aria-hidden="true"
//               className="absolute left-0 right-0 h-[1px] bg-[#9e9e93] pointer-events-none"
//               style={{
//                 top: mobileLineTop !== null ? `${mobileLineTop}px` : undefined,
//                 zIndex: 0,
//               }}
//             />

//             <Swiper
//               modules={[Navigation, Pagination, Autoplay]}
//               speed={1000}
//               slidesPerView={1}
//               slidesPerGroup={1}
//               spaceBetween={20}
//               draggable={false}
//               simulateTouch={false}
//               allowTouchMove={false}
//               navigation={{
//                 nextEl: ".arrowright-mobile",
//                 prevEl: ".arrowleft-mobile",
//               }}
//               onInit={handleMobileSwiperUpdate}
//               onSlideChange={(swiper) => handleMobileSwiperUpdate(swiper)}
//               onSlideChangeTransitionStart={() => setIsSlidingMobile(true)}
//               onSlideChangeTransitionEnd={() => setIsSlidingMobile(false)}
//               className="relative w-full"
//               breakpoints={{
//                 768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
//               }}
//             >
//               {timelineData.map(({ id, year, content, image }) => {
//                 return (
//                   <SwiperSlide key={id} className="h-auto">
//                     <div className="flex flex-col items-center relative w-[90%] sm:w-auto mx-auto ">
//                       {/* Card Container */}
//                       <div className="z-10 w-full flex justify-center tl-connector tl-connector-above-mobile mb-4">
//                         <TimeCard
//                           content={renderTimelineContent(content)}
//                           isAbove={true}
//                           image={image}
//                         />
//                       </div>

//                       {/* Year Badge row */}
//                       <div
//                         ref={
//                           id === timelineData[0].id
//                             ? mobileBadgeRowRef
//                             : undefined
//                         }
//                         className="relative w-full flex justify-center items-center py-2 mt-2"
//                       >
//                         <div className="relative z-10">
//                           <div className="w-[70px] h-[28px] rounded-md bg-[#59624D] flex items-center justify-center shadow-md">
//                             <h2 className="text-[18px] font-semibold text-white leading-none">
//                               {year}
//                             </h2>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 );
//               })}
//             </Swiper>

//             {/* Navigation Arrows */}
//             <div className="relative z-10 flex items-center justify-center gap-3 mt-[20px]">
//               <div
//                 className={`arrowleft-mobile shrink-0 transition-opacity ${
//                   isSlidingMobile || isBeginningMobile
//                     ? "opacity-40 cursor-not-allowed pointer-events-none"
//                     : "cursor-pointer"
//                 }`}
//                 role="button"
//                 tabIndex={isSlidingMobile || isBeginningMobile ? -1 : 0}
//                 aria-disabled={isSlidingMobile || isBeginningMobile}
//                 aria-label="Previous slide"
//               >
//                 <NavArrow direction="prev" tone="dark" />
//               </div>
//               <div
//                 className={`arrowright-mobile shrink-0 transition-opacity ${
//                   isSlidingMobile || isEndMobile
//                     ? "opacity-40 cursor-not-allowed pointer-events-none"
//                     : "cursor-pointer"
//                 }`}
//                 role="button"
//                 tabIndex={isSlidingMobile || isEndMobile ? -1 : 0}
//                 aria-disabled={isSlidingMobile || isEndMobile}
//                 aria-label="Next slide"
//               >
//                 <NavArrow direction="next" tone="dark" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =================================================================
//           2. DESKTOP VIEW (Visible on 1024px and above)
//          ================================================================= */}
//       <section className="hidden lg:block relative bg-transparent py-16">
//         <Particlecom id="particles-js-desktop" />

//         <div className="w-full relative z-10 overflow-hidden">
//           <h2 className="fix text-4xl font-sora font-bold pt-6 relative z-10 text-[#212121]">
//             The KSH Legacy
//           </h2>

//           <div className="relative h-[650px] flex items-center z-10 mt-10">
//             {/* Center horizontal axis line */}
//             <div className="absolute w-[200vw] -left-[100%] right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#9e9e93] z-0" />

//             {/* Desktop Swiper Carousel */}
//             <Swiper
//               modules={[Navigation, Pagination, Autoplay]}
//               speed={800}
//               slidesPerView={3.5}
//               slidesPerGroup={4}
//               spaceBetween={30}
//               navigation={{
//                 nextEl: ".arrowright-desktop",
//                 prevEl: ".arrowleft-desktop",
//               }}
//               onInit={handleDesktopSwiperUpdate}
//               onSlideChange={(swiper) => handleDesktopSwiperUpdate(swiper)}
//               onSlideChangeTransitionStart={() => setIsSlidingDesktop(true)}
//               onSlideChangeTransitionEnd={() => setIsSlidingDesktop(false)}
//               className="w-full !px-10"
//               breakpoints={{
//                 1024: { slidesPerView: 3, slidesPerGroup: 4, spaceBetween: 20 },
//                 1280: {
//                   slidesPerView: 3.5,
//                   slidesPerGroup: 4,
//                   spaceBetween: 30,
//                 },
//                 1536: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 40 },
//               }}
//             >
//               {timelineData.map(({ id, year, content, image }, index) => {
//                 const isAbove = index % 2 === 0;

//                 return (
//                   <SwiperSlide key={id}>
//                     <div className="relative w-full h-[600px] flex flex-col justify-center items-center mx-auto">
//                       {/* TOP HALF CONTAINER */}
//                       <div className="h-1/2 w-full flex flex-col justify-end items-center mb-[80px]">
//                         {isAbove && (
//                           <div className="tl-connector tl-connector-above z-10">
//                             <TimeCard
//                               content={renderTimelineContent(content)}
//                               isAbove={isAbove}
//                               image={image}
//                             />
//                           </div>
//                         )}
//                       </div>

//                       {/* CENTER YEAR BADGE */}
//                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
//                         <div className="w-[70px] h-[28px] rounded-md bg-[#59624D] flex items-center justify-center shadow-md">
//                           <h2 className="text-[18px] font-semibold text-white leading-none">
//                             {year}
//                           </h2>
//                         </div>
//                       </div>

//                       {/* BOTTOM HALF CONTAINER */}
//                       <div className="h-1/2 w-full flex flex-col justify-start items-center mt-[24px]">
//                         {!isAbove && (
//                           <div className="tl-connector tl-connector-below z-10">
//                             <TimeCard
//                               content={renderTimelineContent(content)}
//                               isAbove={isAbove}
//                               image={image}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 );
//               })}
//             </Swiper>
//           </div>

//           {/* Desktop Carousel Navigation Arrows Below Timeline */}
//           <div className="relative z-10 flex items-center justify-center gap-3 px-10 mt-6">
//             <div
//               className={`arrowleft-desktop shrink-0 transition-opacity ${
//                 isSlidingDesktop || isBeginningDesktop
//                   ? "opacity-40 cursor-not-allowed pointer-events-none"
//                   : "cursor-pointer"
//               }`}
//               role="button"
//               tabIndex={isSlidingDesktop || isBeginningDesktop ? -1 : 0}
//               aria-disabled={isSlidingDesktop || isBeginningDesktop}
//               aria-label="Previous slide"
//             >
//               <NavArrow direction="prev" tone="dark" />
//             </div>
//             <div
//               className={`arrowright-desktop shrink-0 transition-opacity ${
//                 isSlidingDesktop || isEndDesktop
//                   ? "opacity-40 cursor-not-allowed pointer-events-none"
//                   : "cursor-pointer"
//               }`}
//               role="button"
//               tabIndex={isSlidingDesktop || isEndDesktop ? -1 : 0}
//               aria-disabled={isSlidingDesktop || isEndDesktop}
//               aria-label="Next slide"
//             >
//               <NavArrow direction="next" tone="dark" />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Timeline;

"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import TimeCard from "./TimeCard";
import Particlecom from "./Particlecom";
import NavArrow from "@/components/ui/NavArrow";

interface TimelineEntry {
  id: number;
  year: number;
  content: string | string[];
  image: string;
}

const timelineData: TimelineEntry[] = [
  {
    id: 1,
    year: 1969,
    content:
      "Mr. Kushal Subbaya Hegde established his first business 'Kamal Motors', an exclusive Bosch products' distribution business in Ahmednagar District, Maharashtra",
    image: "/t2.jpg",
  },
  {
    id: 2,
    year: 1979,
    content:
      "Expanded the Bosch products' distribution business into Pune city, Maharashtra by taking over the operations of 'Waterloo Motors'",
    image: "/t4.jpg",
  },
  {
    id: 3,
    year: 1989,
    content:
      "Established 'Kushal Motors' in Pune city, Maharashtra to cater the original equipment customers of Bosch",
    image: "/t5.jpg",
  },
  {
    id: 4,
    year: 1991,
    content:
      "Established 'Kushal Electricals' to distribute and service the Electrical Power Tools product line of Bosch",
    image: "/t6.jpg",
  },
  {
    id: 5,
    year: 1999,
    content:
      "Inception of KSH Group with establishment of 'KSH Logistics' as a Third-party Logistics (3PL) company to service the captive requirements of Bosch in the Western Region of India and forayed into Logistics",
    image: "/t7.jpg",
  },
  {
    id: 6,
    year: 2008,
    content:
      "Established 'KSH Distriparks' with the setting up of an Inland container Depot in Talegaon, Pune. The Dry Port facility was set up with a capacity of 120,000 TEUs per annum",
    image: "/t8.jpg",
  },
  {
    id: 7,
    year: 2012,
    content:
      "Investment received from Pacific Century Group of HK/Singapore to expand KSH Logistics, KSH Distriparks and set up 'KSH INFRA' to expand into the INFRA space",
    image: "/t9.jpg",
  },
  {
    id: 8,
    year: 2018,
    content: [
      "Established two projects under 'KSH INFRA' admeasuring 1 Mn. Sq. Ft.",
      "Later, successfully exited these projects to Morgan Stanley Investment Fund, USA",
    ],
    image: "/t10.jpg",
  },
  {
    id: 9,
    year: 2018,
    content: "KSH Group celebrates its Golden Jubilee Year",
    image: "/t11.jpg",
  },
  {
    id: 10,
    year: 2021,
    content:
      "KSH INFRA partnered with Indospace Capital to invest INR 1000 crores in a joint venture (JV) and commenced construction on its first project under the JV of 1.6 Mn. Sq. Ft. with an aim to develop 10 Mn. Sq. Ft. across key markets in India",
    image: "/t12.jpg",
  },
  {
    id: 11,
    year: 2022,
    content:
      "KSH INFRA launches KSH Chakan Park III, one of its biggest Industrial & Logistics Park spread over total area of 1.50 Mn. Sq. Ft., at Varale Chakan",
    image: "/about/newTimeline.jpg",
  },
  {
    id: 12,
    year: 2023,
    content:
      "KSH INFRA launches KSH Chakan Park IV, its fourth Industrial & Logistics Park in the Chakan micro market",
    image: "/t14.jpg",
  },
  {
    id: 13,
    year: 2025,
    content:
      "KSH International IPO launch on NSE, BSE - KSH International becomes the 3rd Largest manufacturer of Winding wires in India, Largest exporter of Winding wire in India, Largest CTC manufacturer in India",
    image: "/t15.jpg",
  },
  {
    id: 14,
    year: 2025,
    content: [
      "Announced ₹550+ Cr. investment in ~60-acre park in Tamil Nadu; Launch of KSH Hosur Park I",
      "Cumulative Investment in Tamil Nadu goes beyond INR 1000 Cr.",
      "Considerable contribution to the 3 Mn. Sq. Ft. Under development",
    ],
    image: "/t24.jpg",
  },
  {
    id: 15,
    year: 2026,
    content: [
      "Transition from developer to developer + fund manager",
      "Entry into institutional capital platforms (Category II AIF)",
      "Planned Launch of INR 1,250 Cr. Category II AIF",
      "Focus on greenfield Grade A Industrial parks across Pune, Mumbai, Chennai, Bengaluru",
    ],
    image: "/2026Aif.jpg",
  },
];

const renderTimelineContent = (content: string | string[]) =>
  Array.isArray(content) ? (
    <ol className="list-decimal text-[13px] 2xl:text-[13px] list-outside pl-4 space-y-0.5 2xl:space-y-1">
      {content.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ol>
  ) : (
    content
  );

const Timeline = () => {
  // Mobile Swiper state
  const [isSlidingMobile, setIsSlidingMobile] = useState(false);
  const [isBeginningMobile, setIsBeginningMobile] = useState(true);
  const [isEndMobile, setIsEndMobile] = useState(false);

  // Desktop Swiper state
  const [isSlidingDesktop, setIsSlidingDesktop] = useState(false);
  const [isBeginningDesktop, setIsBeginningDesktop] = useState(true);
  const [isEndDesktop, setIsEndDesktop] = useState(false);

  // Mobile: measure the badge-row Y offset so the shared axis line aligns behind badges
  const mobileWrapperRef = useRef<HTMLDivElement>(null);
  const mobileBadgeRowRef = useRef<HTMLDivElement>(null);
  const [mobileLineTop, setMobileLineTop] = useState<number | null>(null);

  const handleMobileSwiperUpdate = (swiper: any) => {
    setIsBeginningMobile(swiper.isBeginning);
    setIsEndMobile(swiper.isEnd);
  };

  const handleDesktopSwiperUpdate = (swiper: any) => {
    setIsBeginningDesktop(swiper.isBeginning);
    setIsEndDesktop(swiper.isEnd);
  };

  useEffect(() => {
    const measure = () => {
      if (mobileWrapperRef.current && mobileBadgeRowRef.current) {
        const wrapperRect = mobileWrapperRef.current.getBoundingClientRect();
        const badgeRect = mobileBadgeRowRef.current.getBoundingClientRect();
        setMobileLineTop(
          badgeRect.top - wrapperRect.top + badgeRect.height / 2,
        );
      }
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div id="growth-timeline">
      {/* =================================================================
          1. MOBILE VIEW (Visible under 1024px)
         ================================================================= */}
      <div className="block lg:hidden h-fit relative">
        <div className="relative py-10 overflow-hidden">
          <h2 className="w-fit text-4xl font-sora font-bold ml-[20px] md:ml-[40px] pt-4 relative z-10 text-[#212121]">
            The KSH Legacy
          </h2>

          <div
            ref={mobileWrapperRef}
            className="relative flex flex-col items-center z-10 pt-6"
          >
            {/* Horizontal axis line */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 h-[1px] bg-[#9e9e93] pointer-events-none"
              style={{
                top: mobileLineTop !== null ? `${mobileLineTop}px` : undefined,
                zIndex: 0,
              }}
            />

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              speed={1000}
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={20}
              draggable={false}
              simulateTouch={false}
              allowTouchMove={false}
              navigation={{
                nextEl: ".arrowright-mobile",
                prevEl: ".arrowleft-mobile",
              }}
              onInit={handleMobileSwiperUpdate}
              onSlideChange={(swiper) => handleMobileSwiperUpdate(swiper)}
              onSlideChangeTransitionStart={() => setIsSlidingMobile(true)}
              onSlideChangeTransitionEnd={() => setIsSlidingMobile(false)}
              className="relative w-full"
              breakpoints={{
                768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
              }}
            >
              {timelineData.map(({ id, year, content, image }) => {
                return (
                  <SwiperSlide key={id} className="h-auto">
                    <div className="flex flex-col items-center relative w-[90%] sm:w-auto mx-auto ">
                      {/* Card Container */}
                      <div className="z-10 w-full flex justify-center tl-connector tl-connector-above-mobile mb-4">
                        <TimeCard
                          content={renderTimelineContent(content)}
                          isAbove={true}
                          image={image}
                        />
                      </div>

                      {/* Year Badge row */}
                      <div
                        ref={
                          id === timelineData[0].id
                            ? mobileBadgeRowRef
                            : undefined
                        }
                        className="relative w-full flex justify-center items-center py-2 mt-2"
                      >
                        <div className="relative z-10">
                          <div className="w-[70px] h-[28px] rounded-md bg-[#59624D] flex items-center justify-center shadow-md">
                            <h2 className="text-[18px] font-semibold text-white leading-none">
                              {year}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Navigation Arrows */}
            <div className="relative z-10 flex items-center justify-center gap-3 mt-[20px]">
              <div
                className={`arrowleft-mobile shrink-0 transition-opacity ${
                  isSlidingMobile || isBeginningMobile
                    ? "opacity-40 cursor-not-allowed pointer-events-none"
                    : "cursor-pointer"
                }`}
                role="button"
                tabIndex={isSlidingMobile || isBeginningMobile ? -1 : 0}
                aria-disabled={isSlidingMobile || isBeginningMobile}
                aria-label="Previous slide"
              >
                <NavArrow direction="prev" tone="dark" />
              </div>
              <div
                className={`arrowright-mobile shrink-0 transition-opacity ${
                  isSlidingMobile || isEndMobile
                    ? "opacity-40 cursor-not-allowed pointer-events-none"
                    : "cursor-pointer"
                }`}
                role="button"
                tabIndex={isSlidingMobile || isEndMobile ? -1 : 0}
                aria-disabled={isSlidingMobile || isEndMobile}
                aria-label="Next slide"
              >
                <NavArrow direction="next" tone="dark" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================
          2. DESKTOP VIEW (Visible on 1024px and above)
         ================================================================= */}
      <section className="hidden lg:block relative bg-transparent py-16">
        <Particlecom id="particles-js-desktop" />

        <div className="w-full relative z-10 overflow-hidden">
          <h2 className="fix text-4xl font-sora font-bold pt-6 relative z-10 text-[#212121]">
            The KSH Legacy
          </h2>

          <div className="relative h-[650px] flex items-center z-10 mt-10">
            {/* Center horizontal axis line */}
            <div className="absolute w-[200vw] -left-[100%] right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#9e9e93] z-0" />

            {/* Desktop Swiper Carousel */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              speed={800}
              slidesPerView={3.5}
              slidesPerGroup={4}
              spaceBetween={30}
              navigation={{
                nextEl: ".arrowright-desktop",
                prevEl: ".arrowleft-desktop",
              }}
              onInit={handleDesktopSwiperUpdate}
              onSlideChange={(swiper) => handleDesktopSwiperUpdate(swiper)}
              onSlideChangeTransitionStart={() => setIsSlidingDesktop(true)}
              onSlideChangeTransitionEnd={() => setIsSlidingDesktop(false)}
              className="w-full !px-10"
              breakpoints={{
                1024: { slidesPerView: 3, slidesPerGroup: 4, spaceBetween: 20 },
                1280: {
                  slidesPerView: 3.5,
                  slidesPerGroup: 4,
                  spaceBetween: 30,
                },
                1536: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 40 },
              }}
            >
              {timelineData.map(({ id, year, content, image }, index) => {
                const isAbove = index % 2 === 0;

                return (
                  <SwiperSlide key={id}>
                    <div className="relative w-full h-[600px] flex flex-col justify-center items-center mx-auto">
                      {/* TOP HALF CONTAINER */}
                      <div className="h-1/2 w-full flex flex-col justify-end items-center mb-[80px]">
                        {isAbove && (
                          <div className="tl-connector tl-connector-above z-10">
                            <TimeCard
                              content={renderTimelineContent(content)}
                              isAbove={isAbove}
                              image={image}
                            />
                          </div>
                        )}
                      </div>

                      {/* CENTER YEAR BADGE */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="w-[70px] h-[28px] rounded-md bg-[#59624D] flex items-center justify-center shadow-md">
                          <h2 className="text-[18px] font-semibold text-white leading-none">
                            {year}
                          </h2>
                        </div>
                      </div>

                      {/* BOTTOM HALF CONTAINER */}
                      <div className="h-1/2 w-full flex flex-col justify-start items-center mt-[24px]">
                        {!isAbove && (
                          <div className="tl-connector tl-connector-below z-10">
                            <TimeCard
                              content={renderTimelineContent(content)}
                              isAbove={isAbove}
                              image={image}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Desktop Carousel Navigation Arrows */}
          <div className="relative z-10 flex items-center justify-center gap-3 px-10 mt-6">
            <div
              className={`arrowleft-desktop shrink-0 transition-opacity ${
                isSlidingDesktop || isBeginningDesktop
                  ? "opacity-40 cursor-not-allowed pointer-events-none"
                  : "cursor-pointer"
              }`}
              role="button"
              tabIndex={isSlidingDesktop || isBeginningDesktop ? -1 : 0}
              aria-disabled={isSlidingDesktop || isBeginningDesktop}
              aria-label="Previous slide"
            >
              <NavArrow direction="prev" tone="dark" />
            </div>
            <div
              className={`arrowright-desktop shrink-0 transition-opacity ${
                isSlidingDesktop || isEndDesktop
                  ? "opacity-40 cursor-not-allowed pointer-events-none"
                  : "cursor-pointer"
              }`}
              role="button"
              tabIndex={isSlidingDesktop || isEndDesktop ? -1 : 0}
              aria-disabled={isSlidingDesktop || isEndDesktop}
              aria-label="Next slide"
            >
              <NavArrow direction="next" tone="dark" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Timeline;
