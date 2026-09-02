"use client";
import { motion } from "framer-motion";
// import LineHead from "@/app/Components/Heading/LineHead";
import LineHead from "../../Components/Heading/LineHead";
import Link from "next/link";
const ParkOverview = () => {
  return (
    <div
      className="w-full h-fit lg:h-[594px] pt-[70px] bg-white"
      id="park-overview"
      style={{
        background: "linear-gradient(to bottom, #141D28 70%, #EEF0F3 30%)",
      }}
    >
      <div
        className="md:mr-[max(5%,calc((100vw-1250px)/2))] lg:py-0 py-[70px] mr-0 
h-fit lg:h-[502px] flex flex-col overflow-hidden bg-white"
      >
        <div className="flex lg:flex-row flex-col w-full h-full items-center gap-10">
          <div className="min-h-full justify-start ml-[max(5%,calc((100vw-1250px)/2))] md:mr-0 mr-[max(5%,calc((100vw-1250px)/2))]  flex flex-col w-auto lg:w-[75%] xl:w-[40%] py-0 lg:py-[70px]">
            <LineHead heading="About Chakan, Pune" />
            <motion.h3 className="xl-1280:text-[22px] gradinetText3 leading-[130%] spotlightheaddd fsans-400 text-[20px] mt-[-20px] xl:1024:mt-[-40px] xl-1280:mt-[-20px]">
              Chakan, near Pune, is one of India’s fastest-growing integrated
              industrial hubs. With excellent connectivity and a thriving
              ecosystem of global manufacturers and logistics providers, it has
              become a preferred destination for large-scale industrial
              development and investment.
            </motion.h3>
          </div>
          <div className="w-fit">
            <img
              className="h-auto w-[500px] max-w-full"
              src="/ParkPage/cpov.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkOverview;
