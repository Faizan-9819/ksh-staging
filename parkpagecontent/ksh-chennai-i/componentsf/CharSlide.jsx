"use client";
// "use client";
// import React, { useState, useEffect } from "react";
// import CharCard from "./CharCard";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const CardContent = [
//   {
//     charTitle: "Hosur: Built for Industrial Success",
//     charnum: "01",
//     charcont:
//       "Hosur now thrives across multiple industries—automotive, electronics, engineering, precision manufacturing, and textiles.   This diversity makes it a resilient and future-ready foundation for industrial growth.",
//   },
//   {
//     charTitle: "The Dual Talent Advantage",
//     charnum: "02",
//     charcont:
//       "With its proximity to Bengaluru, Hosur draws from a vast, skilled talent pool across Tamil Nadu and Karnataka, making it an attractive base for industries requiring specialized manpower.",
//   },
//   {
//     charTitle: "The Best of Two States",
//     charnum: "03",
//     charcont:
//       "Hosur's strategic location offers direct access to one of India's most dynamic industrial and tech hubs. The region benefits from progressive industrial policies while delivering unmatched cost efficiency and world-class infrastructure - creating the ideal environment for business growth and innovation.",
//   },
//   {
//     charTitle: "Ready Industrial Ecosystem",
//     charnum: "04",
//     charcont:
//       "The region offers a mature industrial infrastructure with established supply chains, reliable power, and a strong presence of MSMEs supporting large-scale manufacturers.",
//   },
//   {
//     charTitle: "Connected to India and the World",
//     charnum: "05",
//     charcont:
//       "Hosur offers excellent road connectivity via NH 44 with direct routes to Bengaluru Airport, Chennai Port and Krishnapatnam Port.  Move your goods efficiently throughout India and to global markets with these well-established transportation links.",
//   },
// ];

// function useOffsetAfter() {
//   const [offset, setOffset] = useState(null); // null until mounted

//   useEffect(() => {
//     const calc = () => (window.innerWidth >= 1024 ? 130 : 0);

//     setOffset(calc());

//     const onResize = () => {
//       setOffset(calc());
//     };

//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   return offset;
// }
// const CharSlide = () => {
//   const slidesOffsetAfter = useOffsetAfter();

//   // Skip render until we know the offset (ensures SSR safety)
//   if (slidesOffsetAfter === null) return null;
//   return (
//     <div className="bg-[#212121] pt-[70px] pb-[100px] overflow-hidden">
//       <div className="ml-[max(5%,calc((100vw-1250px)/2))] bg-[url(/ParkPage/csbgwhite.webp)] pt-[55px] pb-[10%] lg:pb-[65px] gap-[54px] flex flex-col lg:pr-0 pr-[5%] pl-[5%] lg:pl-[70px] relative">
//         {/* Header */}
//         <div className="lg:mr-[133px]">
//           <motion.h1
//             initial={{ width: 0 }}
//             whileInView={{ width: "100%" }}
//             transition={{ duration: 1.8, ease: [0.7, 0, 0.4, 1] }}
//             viewport={{ amount: 0.1, once: true }}
//             className="fsans-600 text-[#092241] pb-2 text-2xl md:text-3xl whitespace-nowrap overflow-hidden leading-[33px] border-b-[#092241] border-opacity-[0.34] border-b-[1px]"
//           >
//             Defining Characteristics of <br className="lg:hidden flex" />
//             Hosur, Bengaluru
//           </motion.h1>
//         </div>

//         {/* Swiper & Controls */}
//         <div className="flex lg:flex-row flex-col-reverse gap-[20px] lg:gap-[40px] items-end">
//           {/* Navigation Buttons */}
//           <motion.div
//             initial={{ y: 100, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 1.4, ease: [0.7, 0, 0.4, 1] }}
//             viewport={{ amount: 0.5, once: true }}
//             className="flex gap-[10px] md:gap-[15px]"
//           >
//             <button
//               id="chl"
//               className="w-10 h-10 flex items-center justify-center"
//             >
//               <img className="h-10 w-10" src="/ParkPage/chl.svg" alt="Prev" />
//             </button>
//             <button
//               id="chr"
//               className="w-10 h-10 flex items-center justify-center"
//             >
//               <img className="h-10 w-10" src="/ParkPage/chr.svg" alt="Next" />
//             </button>
//           </motion.div>

//           {/* Swiper Container */}
//           <motion.div
//             initial={{ x: 100, opacity: 0 }}
//             whileInView={{ x: 0, opacity: 1 }}
//             transition={{ duration: 1.4, ease: [0.7, 0, 0.4, 1] }}
//             viewport={{ amount: 0.5, once: true }}
//             className="w-full max-w-[100%] overflow-hidden"
//           >
//             <Swiper
//               slidesPerView={1} // Ensure correct initial behavior
//               slidesPerGroup={1} // Move only 1 slide at a time
//               spaceBetween={20}
//               modules={[Navigation]}
//               navigation={{ nextEl: "#chr", prevEl: "#chl" }}
//               speed={500}
//               grabCursor={true}
//               touchMoveStopPropagation={false}
//               allowTouchMove={true}
//               slidesOffsetAfter={slidesOffsetAfter}
//               centeredSlides={false} // Avoids unwanted shifts
//               watchSlidesProgress={true} // Helps track progress
//               breakpoints={{
//                 250: { slidesPerView: 1, spaceBetween: 10 },
//                 400: { slidesPerView: 1.1, spaceBetween: 10 },
//                 768: { slidesPerView: 1.8, spaceBetween: 20 },
//                 800: { slidesPerView: 2.2, spaceBetween: 20 },
//                 1279: { slidesPerView: 2.5, spaceBetween: 20 },
//                 1366: { slidesPerView: 2.5, spaceBetween: 40 },
//                 1440: { slidesPerView: 3.2, spaceBetween: 40 },
//                 1920: { slidesPerView: 3.5, spaceBetween: 40 },
//               }}
//             >
//               {/* Slides */}
//               {CardContent.map((index) => (
//                 <SwiperSlide key={index.charnum}>
//                   <CharCard
//                     charTitle={index.charTitle}
//                     charnum={index.charnum}
//                     charcont={index.charcont}
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CharSlide;

import React, { useState, useEffect } from "react";
import CharCard from "./CharCard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CardContent = [
  {
    charTitle: "Hosur: Built for Industrial Success",
    charnum: "01",
    charcont:
      "Hosur now thrives across multiple industries—automotive, electronics, engineering, precision manufacturing, and textiles.   This diversity makes it a resilient and future-ready foundation for industrial growth.",
  },
  {
    charTitle: "The Dual Talent Advantage",
    charnum: "02",
    charcont:
      "With its proximity to Bengaluru, Hosur draws from a vast, skilled talent pool across Tamil Nadu and Karnataka, making it an attractive base for industries requiring specialized manpower.",
  },
  {
    charTitle: "The Best of Two States",
    charnum: "03",
    charcont:
      "Hosur's strategic location offers direct access to one of India's most dynamic industrial and tech hubs. The region benefits from progressive industrial policies while delivering unmatched cost efficiency and world-class infrastructure - creating the ideal environment for business growth and innovation.",
  },
  {
    charTitle: "Ready Industrial Ecosystem",
    charnum: "04",
    charcont:
      "The region offers a mature industrial infrastructure with established supply chains, reliable power, and a strong presence of MSMEs supporting large-scale manufacturers.",
  },
  {
    charTitle: "Connected to India and the World",
    charnum: "05",
    charcont:
      "Hosur offers excellent road connectivity via NH 44 with direct routes to Bengaluru Airport, Chennai Port and Krishnapatnam Port.  Move your goods efficiently throughout India and to global markets with these well-established transportation links.",
  },
];

function useOffsetAfter() {
  const [offset, setOffset] = useState(null); // null until mounted

  useEffect(() => {
    const calc = () => (window.innerWidth >= 1024 ? 130 : 0);

    setOffset(calc());

    const onResize = () => {
      setOffset(calc());
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return offset;
}
const CharSlide = () => {
  const slidesOffsetAfter = useOffsetAfter();

  // Skip render until we know the offset (ensures SSR safety)
  if (slidesOffsetAfter === null) return null;
  return (
    <div className="bg-[#212121] pt-[70px] pb-[100px] overflow-hidden">
      <div className="ml-[max(5%,calc((100vw-1250px)/2))] bg-[url(/ParkPage/csbgwhite.webp)] pt-[55px] pb-[10%] lg:pb-[65px] gap-[54px] flex flex-col lg:pr-0 pr-[5%] pl-[5%] lg:pl-[70px] relative">
        {/* Header */}
        <div className="lg:mr-[133px]">
          <motion.h1
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.8, ease: [0.7, 0, 0.4, 1] }}
            viewport={{ amount: 0.1, once: true }}
            className="fsans-600 text-[#092241] pb-2 text-2xl md:text-3xl whitespace-nowrap overflow-hidden leading-[33px] border-b-[#092241] border-opacity-[0.34] border-b-[1px]"
          >
            Defining Characteristics of <br className="lg:hidden flex" />
            Hosur, Bengaluru
          </motion.h1>
        </div>

        {/* Swiper & Controls */}
        <div className="flex lg:flex-row flex-col-reverse gap-[20px] lg:gap-[40px] items-end">
          {/* Navigation Buttons */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.7, 0, 0.4, 1] }}
            viewport={{ amount: 0.5, once: true }}
            className="flex gap-[10px] md:gap-[15px]"
          >
            <button
              id="chl"
              className="w-10 h-10 flex items-center justify-center"
            >
              <img className="h-10 w-10" src="/ParkPage/chl.svg" alt="Prev" />
            </button>
            <button
              id="chr"
              className="w-10 h-10 flex items-center justify-center"
            >
              <img className="h-10 w-10" src="/ParkPage/chr.svg" alt="Next" />
            </button>
          </motion.div>

          {/* Swiper Container */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.7, 0, 0.4, 1] }}
            viewport={{ amount: 0.5, once: true }}
            className="w-full max-w-[100%] overflow-hidden"
          >
            <Swiper
              slidesPerView={1} // Ensure correct initial behavior
              slidesPerGroup={1} // Move only 1 slide at a time
              spaceBetween={20}
              modules={[Navigation]}
              navigation={{ nextEl: "#chr", prevEl: "#chl" }}
              speed={500}
              grabCursor={true}
              touchMoveStopPropagation={false}
              allowTouchMove={true}
              // slidesOffsetAfter={slidesOffsetAfter}
              centeredSlides={false} // Avoids unwanted shifts
              watchSlidesProgress={true} // Helps track progress
              breakpoints={{
                250: { slidesPerView: 1, spaceBetween: 10 },
                400: { slidesPerView: 1.1, spaceBetween: 10 },
                768: { slidesPerView: 1.8, spaceBetween: 20 },
                800: { slidesPerView: 2.2, spaceBetween: 20 },
                1279: { slidesPerView: 2.5, spaceBetween: 20 },
                1366: { slidesPerView: 2.5, spaceBetween: 40 },
                1440: { slidesPerView: 3.2, spaceBetween: 40 },
                1920: { slidesPerView: 3.5, spaceBetween: 40 },
              }}
            >
              {/* Slides */}
              {CardContent.map((index) => (
                <SwiperSlide key={index.charnum}>
                  <CharCard
                    charTitle={index.charTitle}
                    charnum={index.charnum}
                    charcont={index.charcont}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CharSlide;
