// import React from "react";
// import Tabs from "./Tabs";
// import ImgHotspot from "./ImgHotspot";

// const HotspotContainer = () => {
//   return (
//     <div className="w-full h-fit  bg-[#F5F5F5]">
//       <div className="fix flex flex-col gap-12 py-24">
//         <div>
//           <h2 className="bw-r lg:text-[64px] md:text-[45px] text-[32px] leading-[120%]">
//             <span>Infrastructure Designed</span>
//             <span className="bw-m lg:items-center flex lg:flex-row flex-col lg:gap-5 gap-2">
//               To Global Standards
//               <img
//                 src="/abstract_pattern.svg"
//                 className="lg:w-[226px] w-[40%] h-auto lg:h-[58px]"
//                 alt=""
//               />
//             </span>
//           </h2>
//         </div>
//         <div className="w-full flex">
//           <Tabs />
//           <ImgHotspot />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotspotContainer;
//
//
//
//
//
//
//
//
//
//
//
// "use client";
// import React, { useState } from "react";
// import Tabs from "./Tabs";
// import ImgHotspot from "./ImgHotspot";
// import { AnimatePresence, motion } from "framer-motion";

// const HotspotContainer = () => {
//   const [activeTab, setActiveTab] = useState(1);

//   return (
//     <div className="w-full h-fit bg-[#F5F5F5]">
//       <div className="fix flex flex-col gap-12 py-24">
//         <div>
//           <h2 className="bw-r lg:text-[64px] md:text-[45px] text-[32px] leading-[120%]">
//             <span>Infrastructure Designed</span>
//             <span className="bw-m lg:items-center flex lg:flex-row flex-col lg:gap-5 gap-2">
//               To Global Standards
//               <img
//                 src="/abstract_pattern.svg"
//                 className="lg:w-[226px] w-[40%] h-auto lg:h-[58px]"
//                 alt=""
//               />
//             </span>
//           </h2>
//         </div>

//         {/* Tabs + Image */}
//         <div className="w-full h-[600px] flex">
//           <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
//           <AnimatePresence mode="wait">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               key={activeTab}
//             >
//               <ImgHotspot activeTab={activeTab} />
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotspotContainer;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// "use client";
// import React, { useState } from "react";
// import Tabs from "./Tabs";
// import ImgHotspot from "./ImgHotspot";
// import { AnimatePresence, motion } from "framer-motion";
// import AccordionTab from "../imgacc/AccordionTab";
// const hotspotsData = {
//   1: [
//     {
//       id: "h1",
//       x: "30%",
//       y: "40%",
//       title: "Main Gate",
//       description: "Secure entry and exit <br/>point with surveillance.",
//     },
//     {
//       id: "h5",
//       x: "60%",
//       y: "25%",
//       title: "Roof",
//       description: "Standing seam roof with <br/>sturdy bare galvalume sheets",
//     },
//     {
//       id: "h6",
//       x: "20%",
//       y: "65%",
//       title: "Building Height",
//       description: "12m at eaves",
//     },
//     {
//       id: "h2",
//       x: "70%",
//       y: "60%",
//       title: "Parking",
//       description:
//         "2 and 4-wheeler parking, <br/>truck parking designed for<br/>peak period load",
//     },
//     {
//       id: "h7",
//       x: "45%",
//       y: "75%",
//       title: "Building Structure",
//       description:
//         "Pre-engineered buildings with <br/>optimized column spacing",
//     },
//     {
//       id: "h8",
//       x: "45%",
//       y: "60%",
//       title: "Office Area",
//       description:
//         "Ground and bare-shell <br/>mezzanine floor <br/>on 2.5% of total area",
//     },
//     {
//       id: "h9",
//       x: "80%",
//       y: "35%",
//       title: "Truck Apron",
//       description: "16.5m concrete apron with <br/>12m wide roads",
//     },
//     {
//       id: "h10",
//       x: "50%",
//       y: "90%",
//       title: "Security",
//       description: "24/7 CCTV surveillance<br/>at main gate",
//     },
//   ],
//   2: [
//     {
//       id: "h11",
//       x: "5%",
//       y: "25%",
//       title: "Fire Protection",
//       description:
//         "Fire detection, alarms, fire escape doors,<br/>K160 and K80 sprinklers,<br/>external hydrants",
//     },
//     {
//       id: "h12",
//       x: "50%",
//       y: "10%",
//       title: "Efficient Lighting",
//       description:
//         "Skylights covering 3-5% of<br/>roof areas, LED light fixtures",
//     },
//     {
//       id: "h13",
//       x: "20%",
//       y: "85%",
//       title: "Wall",
//       description: "Pre-cast concrete walls/block<br/>walls up to 3.6 m height",
//     },
//     {
//       id: "h14",
//       x: "40%",
//       y: "95%",
//       title: "Floor",
//       description: "UDL 5T/sqm,<br/>FM2-compliant design",
//     },
//     {
//       id: "h15",
//       x: "60%",
//       y: "80%",
//       title: "Ventilation",
//       description:
//         "3-6 air changes, passive<br/>ventilation through louvers,<br/>and roof monitor",
//     },
//     {
//       id: "h16",
//       x: "80%",
//       y: "85%",
//       title: "Dock Area",
//       description: "Dock height 1.2m<br/>with rolling shutters,<br/>dock pits",
//     },
//   ],
// };

// const HotspotContainer = () => {
//   const [activeTab, setActiveTab] = useState(1);

//   return (
//     <div className="w-full h-fit bg-[#F5F5F5]">
//       <div className="fix flex flex-col gap-12 py-24">
//         <div>
//           <h2 className="bw-r lg:text-[64px] md:text-[45px] text-[32px] leading-[120%]">
//             <span>Infrastructure Designed</span>
//             <span className="bw-m lg:items-center flex lg:flex-row flex-col lg:gap-5 gap-2">
//               To Global Standards
//               <img
//                 src="/abstract_pattern.svg"
//                 className="lg:w-[226px] w-[40%] h-auto lg:h-[58px]"
//                 alt=""
//               />
//             </span>
//           </h2>
//         </div>

//         {/* Tabs + Image */}
//         <div className="w-full xl:!flex !hidden h-[600px]">
//           <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
//           <AnimatePresence mode="wait">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               key={activeTab}
//               className="flex-1"
//             >
//               <ImgHotspot activeTab={activeTab} hotspots={hotspotsData} />
//             </motion.div>
//           </AnimatePresence>
//         </div>
//         <div className="!block xl:!hidden mt-6">
//           <AccordionTab data={hotspotsData[activeTab]} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotspotContainer;
"use client";
import React, { useState } from "react";
import Tabs from "./Tabs";
import ImgHotspot from "./ImgHotspot";
import { AnimatePresence, motion } from "framer-motion";
import AccordionTab from "../imgacc/AccordionTab";
import clsx from "clsx";
const hotspotsData = {
  1: [
    {
      id: "h1",
      x: "30%",
      y: "40%",
      title: "Main Gate",
      description: "Secure entry and exit <br/>point with surveillance.",
    },
    {
      id: "h5",
      x: "40%",
      y: "32%",
      title: "Roof",
      description: "Standing seam roof with <br/>sturdy bare galvalume sheets",
    },
    {
      id: "h6",
      x: "10%",
      y: "42%",
      title: "Building Height",
      description: "12m at eaves",
    },
    {
      id: "h2",
      x: "87%",
      y: "50%",
      title: "Parking",
      description:
        "2 and 4-wheeler parking, <br/>truck parking designed for<br/>peak period load",
    },
    {
      id: "h7",
      x: "25%",
      y: "55%",
      title: "Building Structure",
      description:
        "Pre-engineered buildings with <br/>optimized column spacing",
    },
    {
      id: "h8",
      x: "50%",
      y: "60%",
      title: "Office Area",
      description:
        "Ground and bare-shell <br/>mezzanine floor <br/>on 2.5% of total area",
    },
    {
      id: "h9",
      x: "70%",
      y: "60%",
      title: "Truck Apron",
      description: "16.5m concrete apron with <br/>12m wide roads",
    },
    {
      id: "h10",
      x: "85%",
      y: "37%",
      title: "Security",
      description: "24/7 CCTV surveillance<br/>at main gate",
    },
  ],
  2: [
    {
      id: "h11",
      x: "12%",
      y: "20%",
      title: "Fire Protection",
      description:
        "Fire detection, alarms, fire escape doors,<br/>K160 and K80 sprinklers,<br/>external hydrants",
    },
    {
      id: "h12",
      x: "50%",
      y: "10%",
      title: "Efficient Lighting",
      description:
        "Skylights covering 3-5% of<br/>roof areas, LED light fixtures",
    },
    {
      id: "h13",
      x: "20%",
      y: "85%",
      title: "Wall",
      description: "Pre-cast concrete walls/block<br/>walls up to 3.6 m height",
    },
    {
      id: "h14",
      x: "40%",
      y: "95%",
      title: "Floor",
      description: "UDL 5T/sqm,<br/>FM2-compliant design",
    },
    {
      id: "h15",
      x: "60%",
      y: "80%",
      title: "Ventilation",
      description:
        "3-6 air changes, passive<br/>ventilation through louvers,<br/>and roof monitor",
    },
    {
      id: "h16",
      x: "80%",
      y: "85%",
      title: "Dock Area",
      description: "Dock height 1.2m<br/>with rolling shutters,<br/>dock pits",
    },
  ],
};
const hotspotsDataMob = {
  1: [
    {
      id: "h1",
      x: "30%",
      y: "40%",
      title: "Main Gate",
      description: "Secure entry and exit point with surveillance.",
    },
    {
      id: "h5",
      x: "60%",
      y: "25%",
      title: "Roof",
      description: "Standing seam roof with sturdy bare galvalume sheets",
    },
    {
      id: "h6",
      x: "20%",
      y: "25%",
      title: "Building Height",
      description: "12m at eaves",
    },
    {
      id: "h2",
      x: "70%",
      y: "60%",
      title: "Parking",
      description:
        "2 and 4-wheeler parking, truck parking designed for peak period load",
    },
    {
      id: "h7",
      x: "25%",
      y: "55%",
      title: "Building Structure",
      description: "Pre-engineered buildings with optimized column spacing",
    },
    {
      id: "h8",
      x: "45%",
      y: "60%",
      title: "Office Area",
      description:
        "Ground and bare-shell mezzanine floor on 2.5% of total area",
    },
    {
      id: "h9",
      x: "80%",
      y: "35%",
      title: "Truck Apron",
      description: "16.5m concrete apron with 12m wide roads",
    },
    {
      id: "h10",
      x: "50%",
      y: "90%",
      title: "Security",
      description: "24/7 CCTV surveillance at main gate",
    },
  ],
  2: [
    {
      id: "h11",
      x: "5%",
      y: "25%",
      title: "Fire Protection",
      description:
        "Fire detection, alarms, fire escape doors, K160 and K80 sprinklers, external hydrants",
    },
    {
      id: "h12",
      x: "50%",
      y: "10%",
      title: "Efficient Lighting",
      description: "Skylights covering 3-5% of roof areas, LED light fixtures",
    },
    {
      id: "h13",
      x: "20%",
      y: "85%",
      title: "Wall",
      description: "Pre-cast concrete walls/block walls up to 3.6 m height",
    },
    {
      id: "h14",
      x: "40%",
      y: "95%",
      title: "Floor",
      description: "UDL 5T/sqm, FM2-compliant design",
    },
    {
      id: "h15",
      x: "60%",
      y: "80%",
      title: "Ventilation",
      description:
        "3-6 air changes, passive ventilation through louvers, and roof monitor",
    },
    {
      id: "h16",
      x: "80%",
      y: "85%",
      title: "Dock Area",
      description: "Dock height 1.2m with rolling shutters, dock pits",
    },
  ],
};

const HotspotContainer = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-full h-fit bg-[#F5F5F5]">
      <div className="fix flex flex-col gap-12 xl:py-24 py-12">
        <div>
          <h2 className="bw-r lg:text-[64px] md:text-[45px] text-[32px] leading-[120%]">
            <span>Infrastructure Designed</span>
            <span className="bw-m lg:items-center flex lg:flex-row flex-col lg:gap-5 gap-2">
              To Global Standards
              <img
                src="/abstract_pattern.svg"
                className="lg:w-[226px] w-[40%] h-auto lg:h-[58px]"
                alt=""
              />
            </span>
          </h2>
        </div>

        {/* Desktop View */}
        <div className="w-full xl:!flex !hidden h-[600px]">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={activeTab}
              className="flex-1"
            >
              <ImgHotspot activeTab={activeTab} hotspots={hotspotsData} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile View */}
        <div className="!block xl:!hidden mt-0">
          {/* Mobile Tabs */}
          {/* <div className="flex gap-4 mb-4">
            <button
              onClick={() => setActiveTab(1)}
              className={`px-4 py-2 rounded-md text-sm uppercase ${
                activeTab === 1
                  ? "bg-[#E30613] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Exterior Block
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`px-4 py-2 rounded-md text-sm uppercase ${
                activeTab === 2
                  ? "bg-[#E30613] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Interior Block
            </button>
          </div> */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [1, 0, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className="h-[55px] bg-white grid grid-cols-2 border border-[#CDCDCD] rounded-xl overflow-hidden mb-4"
          >
            {/* Exterior Block */}
            <motion.button
              onClick={() => setActiveTab(1)}
              initial={false}
              animate={{
                backgroundImage:
                  activeTab === 1
                    ? "linear-gradient(110deg, #8F53A1 24.35%, #F47922 107.33%)"
                    : "linear-gradient(to right, #ffffff, #ffffff)",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={clsx(
                "relative flex items-center justify-center px-4 py-2 border-r border-[#CDCDCD] cursor-pointer focus:outline-none",
              )}
            >
              <motion.h2
                animate={{ color: activeTab === 1 ? "#ffffff" : "#000000" }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="text-[14px] md:text-[16px] font-medium text-center leading-[24px]"
              >
                Exterior Block
              </motion.h2>
            </motion.button>

            {/* Interior Block */}
            <motion.button
              onClick={() => setActiveTab(2)}
              initial={false}
              animate={{
                backgroundImage:
                  activeTab === 2
                    ? "linear-gradient(110deg, #8F53A1 24.35%, #F47922 107.33%)"
                    : "linear-gradient(to right, #ffffff, #ffffff)",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={clsx(
                "relative flex items-center justify-center px-4 py-2 cursor-pointer focus:outline-none",
              )}
            >
              <motion.h2
                animate={{ color: activeTab === 2 ? "#ffffff" : "#000000" }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="text-[14px] md:text-[16px] font-medium text-center leading-[24px]"
              >
                Interior Block
              </motion.h2>
            </motion.button>
          </motion.div>

          {/* Accordion */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={activeTab}
              className="flex-1"
            >
              <AccordionTab data={hotspotsDataMob[activeTab]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HotspotContainer;
