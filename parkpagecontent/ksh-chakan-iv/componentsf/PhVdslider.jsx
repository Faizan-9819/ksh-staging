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
  // Determine the first available tab based on visibility props

  // Visibility props for tabs
  const showPhotos = true; // Example: Photos tab is hidden
  const showRenders = true;
  const showVids = true;
  const getInitialTab = () => {
    if (showPhotos) return "Photos";
    if (showRenders) return "Renders";
    if (showVids) return "Videos";
    return "Renders"; // Fallback, though at least one should be true
  };
  const [acbtn, setAcBtn] = useState(getInitialTab);
  const swiperRef1 = useRef(null);
  const swiperRef2 = useRef(null);

  // Image arrays for Renders & Photos
  const renderImages = [
    "chakan-4/Chakan-4.jpg",
    "chakan-4/Chakan-4-11.jpg",
    "chakan-4/chakan-4-1.png",
    "chakan-4/chakan-4-2.jpg",
    "chakan-4/chakan-4-3.jpg",
    "chakan-4/chakan-4-4.jpg",
    "chakan-4/chakan-4-7.png",
    "chakan-4/chakan-4-8.png",
  ];
  const photoImages = [
    "chakan-4/chakan-4-p1.jpg",
    "chakan-4/chakan-4-p2.jpg",
    "chakan-4/chakan-4-p3.jpg",
    "chakan-4/chakan-4-p4.jpg",
    "chakan-4/chakan-4-p5.jpg",
    "chakan-4/chakan-4-p6.jpg",
  ];

  // Video array
  const videoUrls = [
    { labl: "3D Walkthrough", vid: "https://player.vimeo.com/video/908122558" },
    {
      labl: "KSH Chakan Park IV Construction Update July 2025",
      vid: "https://player.vimeo.com/video/1115054878",
    },
  ];
  // Flags to determine if navigation should render
  const hasMultipleRenders = renderImages.length > 1;
  const hasMultiplePhotos = photoImages.length > 1;
  const hasMultipleVideos = videoUrls.length > 1;

  // Ensure Swiper updates when switching tabs
  useEffect(() => {
    const ref = acbtn === "Videos" ? swiperRef2.current : swiperRef1.current;
    if (ref) {
      setTimeout(() => ref.update(), 200);
    }
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
          showPhotos={showPhotos}
          showRenders={showRenders}
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
                slidesOffsetAfter={offsetAfter}
                speed={300}
                // freeMode={true}
                allowTouchMove={false}
                preventInteractionOnTransition
                navigation={
                  hasMultipleRenders
                    ? {
                        prevEl: ".swiper-button-prev-slider1",
                        nextEl: ".swiper-button-next-slider1",
                      }
                    : false
                }
                breakpoints={{
                  320: { slidesPerView: 1 },
                  1024: { slidesPerView: 1.3 },
                  1280: { slidesPerView: 1.6 },
                  1366: { slidesPerView: 2.1 },
                }}
              >
                {photoImages.map((img, idx) => (
                  <SwiperSlide key={`render-${idx}`}>
                    <img
                      className="w-[690px] select-none h-[200px] sm:h-[380px] max-w-[100%]"
                      src={`/ParkPage/${img}`}
                      alt={`Render ${idx + 1}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {hasMultipleRenders && (
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
                slidesOffsetAfter={offsetAfter}
                speed={300}
                // freeMode={true}
                allowTouchMove={false}
                preventInteractionOnTransition
                navigation={
                  hasMultipleRenders
                    ? {
                        prevEl: ".swiper-button-prev-slider1",
                        nextEl: ".swiper-button-next-slider1",
                      }
                    : false
                }
                breakpoints={{
                  320: { slidesPerView: 1 },
                  1024: { slidesPerView: 1.3 },
                  1280: { slidesPerView: 1.6 },
                  1366: { slidesPerView: 2.1 },
                }}
              >
                {renderImages.map((img, idx) => (
                  <SwiperSlide key={`render-${idx}`}>
                    <img
                      className="w-[690px] select-none h-[200px] sm:h-[380px] max-w-[100%]"
                      src={`/ParkPage/${img}`}
                      alt={`Render ${idx + 1}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {hasMultipleRenders && (
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
                slidesOffsetAfter={offsetAfter}
                speed={300}
                // freeMode={true}
                allowTouchMove={false}
                preventInteractionOnTransition
                navigation={
                  hasMultipleVideos
                    ? {
                        prevEl: ".swiper-button-prev-slider2",
                        nextEl: ".swiper-button-next-slider2",
                      }
                    : false
                }
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
