"use client";
// "use client";
// import { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/free-mode";

// const ParkSlider = () => {
//   const [acbtn, setAcBtn] = useState("Photos");

//   const swiperRef1 = useRef(null);
//   const swiperRef2 = useRef(null);

//   useEffect(() => {
//     setTimeout(() => {
//       if (acbtn === "Photos" && swiperRef1.current) {
//         swiperRef1.current.update();
//       } else if (acbtn === "Videos" && swiperRef2.current) {
//         swiperRef2.current.update();
//       }
//     }, 200); // Delay to ensure Swiper has mounted
//   }, [acbtn]);

//   return (
//     <div className="py-[65px] flex sm:hidden overflow-hidden w-full">
//       {/* Sliders Wrapper */}
//       <div className="ml-[max(5%,calc((100vw-1250px)/2))] min-h-[420px]">
//         <AnimatePresence mode="wait">
//           {acbtn === "Photos" && (
//             <motion.div
//               key="photos-slider"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5, ease: "easeInOut" }}
//             >
//               <Swiper
//                 onSwiper={(swiper) => (swiperRef1.current = swiper)}
//                 modules={[Navigation, FreeMode]}
//                 spaceBetween={4}
//                 slidesPerView={1.5}
//                 speed={300}
//                 freeMode={true}
//                 preventInteractionOnTransition={true}
//                 navigation={{
//                   prevEl: ".swiper-button-prev-slider1",
//                   nextEl: ".swiper-button-next-slider1",
//                 }}
//                 breakpoints={{
//                   320: { slidesPerView: 1 },
//                   1024: { slidesPerView: 1.3, },
//                   1280: { slidesPerView: 1.6 },
//                   1440: { slidesPerView: 1.8 },
//                   1920: { slidesPerView: 2.1 },
//                 }}
//               >
//                 {[
//                   "/chakan-1/chakan-1-1.jpg",
//                   "/chakan-1/chakan-1-2.jpg",
//                   "/chakan-1/chakan-1-3.jpg",
//                   "/chakan-1/chakan-1-4.jpg",
//                   "/chakan-1/chakan-1-5.jpg",
//                   "/chakan-1/chakan-1-6.jpg",
//                   "/chakan-1/chakan-1-7.jpg",
//                   "/chakan-1/chakan-1-8.jpg",
//                   "/chakan-1/chakan-1-9.jpg",
//                   "/chakan-1/chakan-1-10.jpg",
//                   "/chakan-1/chakan-1-11.jpg",
//                 ].map((img, index) => (
//                   <SwiperSlide key={index}>
//                     <img
//                       className="w-[690px] select-none h-[380px] max-w-[100%]"
//                       src={`/ParkPage/${img}`}
//                       alt=""
//                     />
//                   </SwiperSlide>
//                 ))}
//               </Swiper>

//               {/* Navigation Buttons for Photos */}
//               <div className="flex items-start pt-[20px] w-full">
//                 <div className="flex gap-[12px] md:gap-[14px] items-center w-full justify-start">
//                   <button className="swiper-button-prev-slider1 h-[41px] w-[41px]">
//                     <img
//                       className="h-[41px] w-[41px]"
//                       src="/ParkPage/parrowp.svg"
//                       alt="ArrowLeft"
//                     />
//                   </button>
//                   <button className="swiper-button-next-slider1 h-[41px] w-[41px]">
//                     <img
//                       className="h-[41px] w-[41px]"
//                       src="/ParkPage/parrown.svg"
//                       alt="ArrowRight"
//                     />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {acbtn === "Videos" && (
//             <motion.div
//               key="videos-slider"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5, ease: "easeInOut" }}
//             >
//               <Swiper
//                 onSwiper={(swiper) => (swiperRef2.current = swiper)}
//                 modules={[Navigation, FreeMode]}
//                 spaceBetween={4}
//                 slidesPerView={1.5}
//                 speed={300}
//                 freeMode={true}
//                 preventInteractionOnTransition={true}
//                 navigation={{
//                   prevEl: ".swiper-button-prev-slider2",
//                   nextEl: ".swiper-button-next-slider2",
//                 }}
//                 breakpoints={{
//                   320: { slidesPerView: 1 },
//                   1024: { slidesPerView: 1.3, },
//                   1280: { slidesPerView: 1.6 },
//                   1440: { slidesPerView: 1.8 },
//                   1920: { slidesPerView: 2.1 },
//                 }}
//               >
//                 {[
//                   "/chakan-1/chakan-1-1.jpg",
//                   "/chakan-1/chakan-1-2.jpg",
//                   "/chakan-1/chakan-1-3.jpg",
//                   "/chakan-1/chakan-1-4.jpg",
//                   "/chakan-1/chakan-1-5.jpg",
//                   "/chakan-1/chakan-1-6.jpg",
//                   "/chakan-1/chakan-1-7.jpg",
//                   "/chakan-1/chakan-1-8.jpg",
//                   "/chakan-1/chakan-1-9.jpg",
//                   "/chakan-1/chakan-1-10.jpg",
//                   "/chakan-1/chakan-1-11.jpg",
//                 ].map((img, index) => (
//                   <SwiperSlide key={index}>
//                     <img
//                       className="w-[690px] select-none h-[380px] max-w-[100%]"
//                       src={`/ParkPage/${img}`}
//                       alt=""
//                     />
//                   </SwiperSlide>
//                 ))}
//               </Swiper>

//               {/* Navigation Buttons for Videos */}
//               <div className="flex items-start pt-[20px] w-full">
//                 <div className="flex gap-[12px] md:gap-[14px] items-center w-full justify-start">
//                   <button className="swiper-button-prev-slider2 h-[41px] w-[41px]">
//                     <img
//                       className="h-[41px] w-[41px]"
//                       src="/ParkPage/parrowp.svg"
//                       alt="ArrowLeft"
//                     />
//                   </button>
//                   <button className="swiper-button-next-slider2 h-[41px] w-[41px]">
//                     <img
//                       className="h-[41px] w-[41px]"
//                       src="/ParkPage/parrown.svg"
//                       alt="ArrowRight"
//                     />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default ParkSlider;

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

const ParkSlider = ({ videos, onSelectVideo, selectedVideo }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Delay update to ensure the Swiper instance is mounted
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.update();
      }
    }, 200);
  }, [videos]);

  return (
    <div className=" flex sm:hidden overflow-hidden w-full">
      <div className="sm:ml-[max(5%,calc((100vw-1250px)/2))] sm:min-h-[420px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={Date.now()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Navigation, FreeMode]}
              spaceBetween={20}
              slidesPerView={1.2}
              speed={300}
              freeMode={true}
              navigation={{
                prevEl: ".swiper-button-prev-video",
                nextEl: ".swiper-button-next-video",
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 1.2, spaceBetween: 10 },
                1024: { slidesPerView: 1.5, spaceBetween: 20 },
              }}
            >
              {videos.map((videoObj) => (
                <SwiperSlide key={videoObj.id}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex flex-col h-full min-h-[260px] items-center justify-center"
                  >
                    <video
                      src={videoObj.video}
                      // controls
                      muted
                      loop
                      preload="metadata"
                      className="w-full h-full min-h-full md:h-auto object-contain"
                      onClick={() => onSelectVideo(videoObj.video)}
                    />
                    <h3 className="text-center text-[#092241] bg-white w-full flex px-4 py-3 text-lg font-semibold mb-2">
                      {videoObj.title}
                    </h3>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-start w-full">
          <div className="flex gap-[12px] md:gap-[14px] items-center w-full mt-5 justify-start">
            <button className="swiper-button-prev-video h-[41px] w-[41px]">
              <img
                className="h-[41px] w-[41px]"
                src="/AboutPage/timeline/whitearrowleft.svg"
                alt="ArrowLeft"
              />
            </button>
            <button className="swiper-button-next-video h-[41px] w-[41px]">
              <img
                className="h-[41px] w-[41px]"
                src="/AboutPage/timeline/whitearrowright.svg"
                alt="ArrowRight"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkSlider;
