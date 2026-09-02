"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCard from "../../Components/USPF/SwiperCard";
import { motion } from "framer-motion";
import Accordion from "../../Components/USPF/USPAcc";

const CharAcc = () => {
  const [cheight, setCHeight] = useState("440px");

  useEffect(() => {
    // Function to update cheight based on window height
    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      if (windowHeight < 700) {
        setCHeight("400px");
      } else if (windowHeight > 800) {
        setCHeight("500px");
      } else {
        setCHeight("440px");
      }
    };

    // Initial check
    updateHeight();

    // Add event listener for window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const CardContent = [
    {
      title: "Automotive Hub",
      // charnum: "01",
      content:
        "Chakan houses major automotive brands like Volkswagen, Mahindra & Mahindra, Mercedes Benz, and Bridgestone, positioning it as a central hub for automotive manufacturing and engineering excellence.",
    },
    {
      title: "Talent Magnet",
      // charnum: "02",
      content:
        "The presence of prestigious automotive and manufacturing companies has made Chakan a significant draw for engineering talent, attracting skilled professionals from across India and globally.",
    },
    {
      title: "Strategic Location",
      // charnum: "03",
      content:
        "Situated between the KHED SEZ and the Talegaon industrial belt, Chakan benefits from a strategically advantageous location that supports extensive industrial activity and development.",
    },
    {
      title: "Robust Infrastructure",
      // charnum: "04",
      content:
        "Chakan is experiencing rapid infrastructure growth, enhancing its attractiveness as an industrial location. This development supports a wide range of industries and contributes to the area’s overall economic expansion.",
    },
    {
      title: "Excellent Connectivity",
      // charnum: "05",
      content:
        "With well-planned connectivity options, Chakan offers seamless access to major transportation networks, making it an ideal choice for industries looking to optimize logistics and supply chain operations.",
    },
  ];

  return (
    <div className="bg-white uspcontainer w-full flex items-center justify-center flex-col overflow-hidden">
      <div className="flex flex-col max-w-[100vw] h-fit">
        <div className="relative z-10 pt-[50px] max-w-[1250px] w-[90%] mx-auto lg:pt-[92px] h-fit flex flex-col">
          <div className="overflow-x-hidden h-fit w-full">
            <div className="overflow-x-hidden h-fit whitespace-nowrap">
              <h2 className="md:text-[44px] text-[22px] leading-[111%] w-full pb-[10px] border-b xl:mb-[66px] mb-[36px] text-[#092241] border-[#d7d7d7]">
                Defining Characteristics of <br className="lg:hidden flex" />
                Chakan, Maharashtra
              </h2>
            </div>
          </div>
        </div>

        <div className="flex xl:flex-row flex-col-reverse md:p-0 px-5 pt-0 max-h-fit h-fit lg:gap-0 gap-5 relative">
          <div className="xl:flex min-1920:scale-125 items-end lg:top-[10%] xl-1366:top-[5%] justify-center mt-0 xl:absolute relative lg:left-[-100px] xl-1366:left-[-150px] w-full lg:w-[800px] xl-1366:w-[875px] hidden">
            <img
              // initial={{ opacity: 0 }}
              // whileInView={{ opacity: 1 }}
              // transition={{ ease: [0.7, 0, 0.4, 1], duration: 1.4 }}
              // viewport={{ once: true, amount: 0.3 }}
              src="/ParkPage/chakan-1/parkinf.png"
              alt="Sus"
              className=""
            />
          </div>

          <div className="xl:w-full mx-auto flex flex-col h-fit max-w-full justify-center items-start gap-[33px] xl:pb-[110px] min-1280:pl-[540px] min-1366:pl-[600px] min-1440:pl-[665px] pb-14">
            <Accordion accw={90} acch={650} accordionData={CardContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharAcc;
