"use client";

import CharCard from "./CharCard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CardContent = [
  {
    charTitle: "Automotive Hub",
    charnum: "01",
    charcont:
      " Chakan houses major automotive brands like Volkswagen, Bajaj Auto, Mercedes Benz, and Hyundai Construction, positioning it as a central hub for automotive manufacturing and engineering excellence.",
  },
  {
    charTitle: "Talent Magnet",
    charnum: "02",
    charcont:
      "The presence of prestigious automotive and manufacturing companies has made Chakan a significant draw for engineering talent, attracting skilled professionals from across India and globally.",
  },
  {
    charTitle: "Strategic Location",
    charnum: "03",
    charcont:
      "Situated between the KHED SEZ and the Talegaon I industrial belt, Chakan benefits from a strategically advantageous location that supports extensive industrial activity and development.",
  },
  {
    charTitle: "Robust Infrastructure",
    charnum: "04",
    charcont:
      "Chakan is experiencing rapid infrastructure growth, enhancing its attractiveness as an industrial location. This development supports a wide range of industries and contributes to the area’s overall economic expansion.",
  },
  {
    charTitle: "Excellent Connectivity",
    charnum: "05",
    charcont:
      "With well-planned connectivity options, Chakan offers seamless access to major transportation networks, making it an ideal choice for industries looking to optimize logistics and supply chain operations.",
  },
];
const CharSlide = () => {
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
            Chakan, Maharashtra
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
              centeredSlides={false} // Avoids unwanted shifts
              watchSlidesProgress={true} // Helps track progress
              breakpoints={{
                250: { slidesPerView: 1, spaceBetween: 40 },
                400: { slidesPerView: 1.1, spaceBetween: 10 },
                768: { slidesPerView: 1.8, spaceBetween: 20 },
                800: { slidesPerView: 2.2, spaceBetween: 20 },
                1279: { slidesPerView: 2.5, spaceBetween: 20 },
                1366: { slidesPerView: 2.5, spaceBetween: 40 },
                1440: { slidesPerView: 3.2, spaceBetween: 40 },
                1920: { slidesPerView: 4, spaceBetween: 40 },
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
