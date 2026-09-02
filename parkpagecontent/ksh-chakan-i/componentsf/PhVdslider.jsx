"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GenLineHead from "../../Components/Heading/GenLineHead";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

const PhVdslider = () => {
  // Determine the first available tab based on visibility props

  const [offsetAfter, setOffsetAfter] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      // replicate max(5%, calc((100vw - 1250px)/2))
      const fivePercent = vw * 0.05;
      const halfExtra = (vw - 1250) / 2;
      const calcVal = Math.max(fivePercent, halfExtra);
      setOffsetAfter(calcVal > 0 ? calcVal : 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Visibility props for tabs
  const showRenders = false;
  const showPhotos = true; // Example: Photos tab is hidden
  const showVids = true;
  const getInitialTab = () => {
    if (showRenders) return "Renders";
    if (showPhotos) return "Photos";
    if (showVids) return "Videos";
    return "Photos"; // Fallback, though at least one should be true
  };
  const [acbtn, setAcBtn] = useState(getInitialTab);
  const swiperRef1 = useRef(null);
  const swiperRef2 = useRef(null);

  // Shared image list for Renders & Photos
  const imageUrls = [
    "/chakan-1/chakan-1-11.jpg",
    "/chakan-1/Chakan-1-12.jpg",
    "/chakan-1/Chakan-1-13.jpg",
    "/chakan-1/Chakan-1-14.jpg",
    "/chakan-1/chakan-1-5.jpg",
    "/chakan-1/chakan-1-6.jpg",
    "/chakan-1/chakan-1-7.jpg",
    "/chakan-1/chakan-1-8.jpg",
    "/chakan-1/chakan-1-9.jpg",
    "/chakan-1/chakan-1-10.jpg",
    "/chakan-1/chakan-1-11.jpg",
  ];
  const hasMultipleImages = imageUrls.length > 1;

  // Video list
  // const videoUrls = [""];
  const videoUrls = [
    {
      labl: "Park Tour Video",
      vid: "https://player.vimeo.com/video/753844721",
    },
  ];
  const hasMultipleVideos = videoUrls.length > 1;
  useEffect(() => {
    setTimeout(() => {
      if (acbtn === "Photos" && swiperRef1.current) {
        swiperRef1.current.update();
      } else if (acbtn === "Videos" && swiperRef2.current) {
        swiperRef2.current.update();
      } else if (acbtn === "Renders" && swiperRef1.current) {
        swiperRef1.current.update();
      }
    }, 200);
  }, [acbtn]);
  // Ensure acbtn is valid when props change
  useEffect(() => {
    const availableTabs = [
      showPhotos && "Photos",
      showRenders && "Renders",
      showVids && "Videos",
    ].filter(Boolean);
    if (!availableTabs.includes(acbtn)) {
      setAcBtn(availableTabs[0] || "Photos"); // Set to first available tab or fallback
    }
  }, [showRenders, showPhotos, showVids, acbtn]);

  return (
    <div className="lg:py-[65px] py-10 overflow-hidden w-full">
      <div className="fix12">
        <GenLineHead
          heading="Park Gallery"
          showRenders={showRenders}
          showPhotos={showPhotos}
          showVids={showVids}
          acbtn={acbtn}
          setAcBtn={setAcBtn}
        />
      </div>

      {/* Sliders Wrapper */}
      <div className="ml-[max(5%,calc((100vw-1250px)/2))] sm:mr-0 mr-[5%] min-h-fit h-fit sm:min-h-[420px]">
        <AnimatePresence mode="wait">
          {acbtn === "Photos" && (
            <motion.div
              key="photos-slider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Swiper
                onSwiper={(swiper) => (swiperRef1.current = swiper)}
                modules={[Navigation, FreeMode]}
                spaceBetween={20}
                speed={300}
                slidesOffsetAfter={offsetAfter} // dynamic now
                // freeMode={true}
                allowTouchMove={false}
                preventInteractionOnTransition={true}
                navigation={{
                  prevEl: ".swiper-button-prev-slider1",
                  nextEl: ".swiper-button-next-slider1",
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  1024: { slidesPerView: 1.3 },
                  1280: { slidesPerView: 1.6 },
                  1366: { slidesPerView: 2.1 },
                }}
              >
                {imageUrls.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="w-[690px] select-none h-[200px] sm:h-[380px] max-w-[100%]"
                      src={`/ParkPage/${img}`}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="w-full flex justify-start">
                <p className="text-[#B9B9B9] text-[14px] fsans-400 leading-[26px] pt-[12px]">
                  *Successfully exited to Mapletree in 2021
                </p>
              </div>
              {hasMultipleImages && (
                <div className="flex items-start pt-[20px] w-full">
                  <div className="flex gap-[12px] md:gap-[14px] items-center w-full justify-start">
                    <button className="swiper-button-prev-slider1 h-[41px] w-[41px]">
                      <img
                        className="h-[41px] w-[41px]"
                        src="/ParkPage/parrowp.svg"
                        alt="ArrowLeft"
                      />
                    </button>
                    <button className="swiper-button-next-slider1 h-[41px] w-[41px]">
                      <img
                        className="h-[41px] w-[41px]"
                        src="/ParkPage/parrown.svg"
                        alt="ArrowRight"
                      />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {acbtn === "Renders" && (
            <motion.div
              key="renders-slider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Swiper
                onSwiper={(swiper) => (swiperRef1.current = swiper)}
                modules={[Navigation, FreeMode]}
                spaceBetween={20}
                slidesOffsetAfter={offsetAfter} // dynamic now
                speed={300}
                // freeMode={true}
                allowTouchMove={false}
                preventInteractionOnTransition={true}
                navigation={{
                  prevEl: ".swiper-button-prev-slider1",
                  nextEl: ".swiper-button-next-slider1",
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  1024: { slidesPerView: 1.3 },
                  1280: { slidesPerView: 1.6 },
                  1366: { slidesPerView: 2.1 },
                }}
              >
                {imageUrls.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="w-[690px] select-none h-[200px] sm:h-[380px] max-w-[100%]"
                      src={`/ParkPage/${img}`}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="w-full flex justify-start">
                <p className="text-[#B9B9B9] text-[14px] fsans-400 leading-[26px] pt-[12px]">
                  *Successfully exited to Mapletree in 2021
                </p>
              </div>
              {hasMultipleImages && (
                <div className="flex items-start pt-[20px] w-full">
                  <div className="flex gap-[12px] md:gap-[14px] items-center w-full justify-start">
                    <button className="swiper-button-prev-slider1 h-[41px] w-[41px]">
                      <img
                        className="h-[41px] w-[41px]"
                        src="/ParkPage/parrowp.svg"
                        alt="ArrowLeft"
                      />
                    </button>
                    <button className="swiper-button-next-slider1 h-[41px] w-[41px]">
                      <img
                        className="h-[41px] w-[41px]"
                        src="/ParkPage/parrown.svg"
                        alt="ArrowRight"
                      />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {acbtn === "Videos" && (
            <motion.div
              key="videos-slider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Swiper
                onSwiper={(swiper) => (swiperRef2.current = swiper)}
                modules={[Navigation, FreeMode]}
                spaceBetween={20}
                speed={300}
                slidesOffsetAfter={offsetAfter} // dynamic now
                // freeMode={true}
                allowTouchMove={false}
                preventInteractionOnTransition={true}
                navigation={{
                  prevEl: ".swiper-button-prev-slider2",
                  nextEl: ".swiper-button-next-slider2",
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  1024: { slidesPerView: 1.3 },
                  1280: { slidesPerView: 1.6 },
                  1440: { slidesPerView: 2.1 },
                }}
              >
                {videoUrls.map((videl, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-[690px] select-none h-[200px] sm:h-[380px] max-w-[100%]">
                      <iframe
                        loading="lazy"
                        src={videl.vid}
                        width="1192"
                        height="400"
                        frameBorder="0"
                        allow="autoplay"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    <div className="">
                      <p className="gradinetText2 fsans-600 md:pt-3 pt-2 text-[16px]">
                        {videl.labl}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="w-full flex justify-start">
                <p className="text-[#B9B9B9] text-[14px] fsans-400 leading-[26px] pt-[12px]">
                  *Successfully exited to Mapletree in 2021
                </p>
              </div>
              {hasMultipleVideos && (
                <div className="flex items-start pt-[20px] w-full">
                  <div className="flex gap-[12px] md:gap-[14px] items-center w-full justify-start">
                    <button className="swiper-button-prev-slider2 h-[41px] w-[41px]">
                      <img
                        className="h-[41px] w-[41px]"
                        src="/ParkPage/parrowp.svg"
                        alt="ArrowLeft"
                      />
                    </button>
                    <button className="swiper-button-next-slider2 h-[41px] w-[41px]">
                      <img
                        className="h-[41px] w-[41px]"
                        src="/ParkPage/parrown.svg"
                        alt="ArrowRight"
                      />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PhVdslider;
