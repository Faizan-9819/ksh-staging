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
      title: "Hosur: Built for Industrial Success",
      content:
        "Hosur now thrives across multiple industries—automotive, electronics, engineering, precision manufacturing, and textiles.   This diversity makes it a resilient and future-ready foundation for industrial growth.",
    },
    {
      title: "The Dual Talent Advantage",
      content:
        "With its proximity to Bengaluru, Hosur draws from a vast, skilled talent pool across Tamil Nadu and Karnataka, making it an attractive base for industries requiring specialized manpower.",
    },
    {
      title: "The Best of Two States",
      content:
        "Hosur's strategic location offers direct access to one of India's most dynamic industrial and tech hubs. The region benefits from progressive industrial policies while delivering unmatched cost efficiency and world-class infrastructure - creating the ideal environment for business growth and innovation.",
    },
    {
      title: "Ready Industrial Ecosystem",
      content:
        "The region offers a mature industrial infrastructure with established supply chains, reliable power, and a strong presence of MSMEs supporting large-scale manufacturers.",
    },
    {
      title: "Connected to India and the World",
      content:
        "Hosur offers excellent road connectivity via NH 44 with direct routes to Bengaluru Airport, Chennai Port and Krishnapatnam Port.  Move your goods efficiently throughout India and to global markets with these well-established transportation links.",
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
                Hosur, Bengaluru
              </h2>
            </div>
          </div>
        </div>

        <div className="flex xl:flex-row flex-col-reverse md:p-0 px-5 pt-0 max-h-fit h-fit lg:gap-0 gap-5 relative">
          <div className="xl:flex hidden items-end lg:top-[10%] xl-1366:top-[5%] justify-center mt-0 xl:absolute relative lg:left-[-100px] xl-1366:left-[-150px] w-full lg:w-[800px] xl-1366:w-[875px] hidden">
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
