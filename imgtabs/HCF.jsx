// "use client";
// import React, { useState } from "react";
// import Tabs from "./Tabs";
// import ImgHotspot from "./ImgHotspot";
// import { AnimatePresence, motion } from "framer-motion";
// import AccordionTab from "../imgacc/AccordionTab";
// import clsx from "clsx";
// // import { hotspotsData } from "./HData";   // <-- removed – we build it from props

// const HCF = ({ exterior_block = [], interior_block = [] }) => {
//   const [activeTab, setActiveTab] = useState(1);

//   /* --------------------------------------------------------------
//      Build the same shape that ImgHotspot / AccordionTab expect
//      -------------------------------------------------------------- */
//   const buildHotspots = () => {
//     const mapBlock = (b, isExterior) => ({
//       id: isExterior ? b.exterior_block_id : b.interior_id,
//       x: `${isExterior ? b.exterior_x_value : b.interior_x_value}%`,
//       y: `${isExterior ? b.exterior_y_value : b.interior_y_value}%`,
//       position: isExterior ? b.exterior_position : b.interior_position,
//       title: isExterior ? b.exterior_title : b.interior_title,
//       description: (isExterior
//         ? b.exterior_description
//         : b.interior_description
//       )
//         .replace(/<p[^>]*>/gi, "")
//         .replace(/<\/p>/gi, "")
//         .replace(/<br\s*\/?>/gi, "<br/>"),
//       iwidth: parseInt(isExterior ? b.exterior_iwidth : b.interior_iwidth, 10),
//       fwidth: parseInt(isExterior ? b.exterior_fwidth : b.interior_fwidth, 10),
//     });

//     return {
//       1: exterior_block.map((b) => mapBlock(b, true)),
//       2: interior_block.map((b) => mapBlock(b, false)),
//     };
//   };

//   const hotspotsData = buildHotspots(); // <-- dynamic, same shape as before

//   return (
//     <div className="w-full h-fit bg-[#F5F5F5] overflow-hidden relative">
//       <img
//         className="purple_vctr hidden md:block absolute top-0 right-0 md:top-[-70px] md:right-[50px] lg:w-[450px] md:w-[350px] w-[300px]"
//         src="/purple_vector.svg"
//       />
//       <img
//         className="orange_vctr hidden md:block absolute top-0 right-0 md:top-[-100px] md:right-[-100px] lg:w-[450px] md:w-[350px] w-[300px]"
//         src="/orange_vector.svg"
//       />
//       <img
//         className="green_vctr hidden md:block absolute top-auto left-0 md:bottom-[-270px] md:left-[-200px] lg:w-[800px] md:w-[350px] w-[300px]"
//         src="/green_vector.svg"
//       />
//       <div className="fix flex flex-col gap-[40px] xl:py-24 py-12">
//         <div>
//           <h2 className="bw-r lg:text-[64px] md:text-[45px] text-[32px] leading-[120%] tracking-[-2.56px] xl:tracking-[-2.56px]">
//             <span>Engineered to Meet </span>
//             <span className="bw-m lg:items-center flex lg:flex-row flex-col lg:gap-5 gap-2">
//               Global Benchmarks
//               <img
//                 src="/abstract_pattern.svg"
//                 className="abstract_svg"
//                 alt=""
//               />
//             </span>
//           </h2>
//         </div>

//         {/* Desktop View */}
//         <div className="w-full xl:!flex !hidden h-auto 1440:h-[600px]">
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

//         {/* Mobile View */}
//         <div className="!block xl:!hidden mt-4">
//           <div className="w-full bg-transparent flex">
//             <motion.div
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.2, ease: [1, 0, 0.3, 1] }}
//               viewport={{ once: true, amount: 0.2 }}
//               className="h-[55px] bg-white sm:w-fit w-full grid grid-cols-2 border border-[#00000060] rounded-xl overflow-hidden mb-4"
//             >
//               {/* Exterior Block */}
//               <motion.button
//                 onClick={() => setActiveTab(1)}
//                 initial={false}
//                 animate={{
//                   backgroundImage:
//                     activeTab === 1
//                       ? "linear-gradient(110deg, #8F53A1 24.35%, #F47922 107.33%)"
//                       : "linear-gradient(to right, #ffffff, #ffffff)",
//                 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//                 className={clsx(
//                   "relative flex sm:w-fit w-full items-center justify-center px-4 py-2 border-r border-[#CDCDCD] cursor-pointer focus:outline-none"
//                 )}
//               >
//                 <motion.h2
//                   animate={{ color: activeTab === 1 ? "#ffffff" : "#000000" }}
//                   transition={{ duration: 0.2, ease: "easeInOut" }}
//                   className="text-[14px] md:text-[16px] bw-m text-center leading-[24px]"
//                 >
//                   Exterior Block
//                 </motion.h2>
//               </motion.button>

//               {/* Interior Block */}
//               <motion.button
//                 onClick={() => setActiveTab(2)}
//                 initial={false}
//                 animate={{
//                   backgroundImage:
//                     activeTab === 2
//                       ? "linear-gradient(110deg, #8F53A1 24.35%, #F47922 107.33%)"
//                       : "linear-gradient(to right, #ffffff, #ffffff)",
//                 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//                 className={clsx(
//                   "relative sm:w-fit w-full flex items-center justify-center px-4 py-2 cursor-pointer focus:outline-none"
//                 )}
//               >
//                 <motion.h2
//                   animate={{ color: activeTab === 2 ? "#ffffff" : "#000000" }}
//                   transition={{ duration: 0.2, ease: "easeInOut" }}
//                   className="text-[14px] md:text-[16px] bw-m text-center leading-[24px]"
//                 >
//                   Interior Block
//                 </motion.h2>
//               </motion.button>
//             </motion.div>
//           </div>

//           {/* Accordion */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               key={activeTab}
//               className="flex-1"
//             >
//               <AccordionTab data={hotspotsData[activeTab]} />
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HCF;
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
// import clsx from "clsx";
// // import { hotspotsData } from "./HData";   // <-- removed – we build it from props

// const HCF = ({ exterior_block = [], interior_block = [] }) => {
//   const [activeTab, setActiveTab] = useState(1);

//   /* --------------------------------------------------------------
//      Build the same shape that ImgHotspot / AccordionTab expect
//      -------------------------------------------------------------- */
//   const buildHotspots = () => {
//     const mapBlock = (b, isExterior) => {
//       const getPositionValue = (val) => {
//         if (typeof val === "string" && val.endsWith("%")) {
//           return val;
//         }
//         return `${val}%`;
//       };

//       return {
//         id: isExterior ? b.exterior_block_id : b.interior_id,
//         x: getPositionValue(
//           isExterior ? b.exterior_x_value : b.interior_x_value
//         ),
//         y: getPositionValue(
//           isExterior ? b.exterior_y_value : b.interior_y_value
//         ),
//         position: isExterior ? b.exterior_position : b.interior_position,
//         title: isExterior ? b.exterior_title : b.interior_title,
//         description: (isExterior
//           ? b.exterior_description
//           : b.interior_description
//         )
//           .replace(/<p[^>]*>/gi, "")
//           .replace(/<\/p>/gi, "")
//           .replace(/<br\s*\/?>/gi, "<br/>"),
//         iwidth: parseInt(
//           isExterior ? b.exterior_iwidth : b.interior_iwidth,
//           10
//         ),
//         fwidth: parseInt(
//           isExterior ? b.exterior_fwidth : b.interior_fwidth,
//           10
//         ),
//       };
//     };

//     return {
//       1: exterior_block.map((b) => mapBlock(b, true)),
//       2: interior_block.map((b) => mapBlock(b, false)),
//     };
//   };

//   const hotspotsData = buildHotspots(); // <-- dynamic, same shape as before

//   return (
//     <div className="w-full h-fit bg-[#F5F5F5] overflow-hidden relative">
//       <img
//         className="purple_vctr hidden md:block absolute top-0 right-0 md:top-[-70px] md:right-[50px] lg:w-[450px] md:w-[350px] w-[300px]"
//         src="/purple_vector.svg"
//       />
//       <img
//         className="orange_vctr hidden md:block absolute top-0 right-0 md:top-[-100px] md:right-[-100px] lg:w-[450px] md:w-[350px] w-[300px]"
//         src="/orange_vector.svg"
//       />
//       <img
//         className="green_vctr hidden md:block absolute top-auto left-0 md:bottom-[-270px] md:left-[-200px] lg:w-[800px] md:w-[350px] w-[300px]"
//         src="/green_vector.svg"
//       />
//       <div className="fix flex flex-col gap-[40px] xl:py-24 py-12">
//         <div>
//           <h2 className="bw-r lg:text-[64px] md:text-[45px] text-[32px] leading-[120%] tracking-[-2.56px] xl:tracking-[-2.56px]">
//             <span>Engineered to Meet </span>
//             <span className="bw-m lg:items-center flex lg:flex-row flex-col lg:gap-5 gap-2">
//               Global Benchmarks
//               <img
//                 src="/abstract_pattern.svg"
//                 className="abstract_svg"
//                 alt=""
//               />
//             </span>
//           </h2>
//         </div>

//         {/* Desktop View */}
//         <div className="w-full xl:!flex !hidden h-auto 1440:h-[600px]">
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

//         {/* Mobile View */}
//         <div className="!block xl:!hidden mt-4">
//           <div className="w-full bg-transparent flex">
//             <motion.div
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.2, ease: [1, 0, 0.3, 1] }}
//               viewport={{ once: true, amount: 0.2 }}
//               className="h-[55px] bg-white sm:w-fit w-full grid grid-cols-2 border border-[#00000060] rounded-xl overflow-hidden mb-4"
//             >
//               {/* Exterior Block */}
//               <motion.button
//                 onClick={() => setActiveTab(1)}
//                 initial={false}
//                 animate={{
//                   backgroundImage:
//                     activeTab === 1
//                       ? "linear-gradient(110deg, #8F53A1 24.35%, #F47922 107.33%)"
//                       : "linear-gradient(to right, #ffffff, #ffffff)",
//                 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//                 className={clsx(
//                   "relative flex sm:w-fit w-full items-center justify-center px-4 py-2 border-r border-[#CDCDCD] cursor-pointer focus:outline-none"
//                 )}
//               >
//                 <motion.h2
//                   animate={{ color: activeTab === 1 ? "#ffffff" : "#000000" }}
//                   transition={{ duration: 0.2, ease: "easeInOut" }}
//                   className="text-[14px] md:text-[16px] bw-m text-center leading-[24px]"
//                 >
//                   Exterior Block
//                 </motion.h2>
//               </motion.button>

//               {/* Interior Block */}
//               <motion.button
//                 onClick={() => setActiveTab(2)}
//                 initial={false}
//                 animate={{
//                   backgroundImage:
//                     activeTab === 2
//                       ? "linear-gradient(110deg, #8F53A1 24.35%, #F47922 107.33%)"
//                       : "linear-gradient(to right, #ffffff, #ffffff)",
//                 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//                 className={clsx(
//                   "relative sm:w-fit w-full flex items-center justify-center px-4 py-2 cursor-pointer focus:outline-none"
//                 )}
//               >
//                 <motion.h2
//                   animate={{ color: activeTab === 2 ? "#ffffff" : "#000000" }}
//                   transition={{ duration: 0.2, ease: "easeInOut" }}
//                   className="text-[14px] md:text-[16px] bw-m text-center leading-[24px]"
//                 >
//                   Interior Block
//                 </motion.h2>
//               </motion.button>
//             </motion.div>
//           </div>

//           {/* Accordion */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               key={activeTab}
//               className="flex-1"
//             >
//               <AccordionTab data={hotspotsData[activeTab]} />
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HCF;
"use client";
import React, { useState } from "react";
import Tabs from "./Tabs";
import ImgHotspot from "./ImgHotspot";
import { AnimatePresence, motion } from "framer-motion";
import AccordionTab from "../imgacc/AccordionTab";
import clsx from "clsx";
import { hotspotsData } from "./HData"; // <-- uncommented – now used as fallback

const HCF = ({ exterior_block = [], interior_block = [] }) => {
  const [activeTab, setActiveTab] = useState(1);

  /* --------------------------------------------------------------
     Build the same shape that ImgHotspot / AccordionTab expect
     -------------------------------------------------------------- */
  const buildHotspots = () => {
    const mapBlock = (b, isExterior) => {
      const getPositionValue = (val) => {
        if (typeof val === "string" && val.endsWith("%")) {
          return val;
        }
        return `${val}%`;
      };

      return {
        id: isExterior ? b.exterior_block_id : b.interior_id,
        x: getPositionValue(
          isExterior ? b.exterior_x_value : b.interior_x_value
        ),
        y: getPositionValue(
          isExterior ? b.exterior_y_value : b.interior_y_value
        ),
        position: isExterior ? b.exterior_position : b.interior_position,
        title: isExterior ? b.exterior_title : b.interior_title,
        description: (isExterior
          ? b.exterior_description
          : b.interior_description
        )
          .replace(/<p[^>]*>/gi, "")
          .replace(/<\/p>/gi, "")
          .replace(/<br\s*\/?>/gi, "<br/>"),
        iwidth: parseInt(
          isExterior ? b.exterior_iwidth : b.interior_iwidth,
          10
        ),
        fwidth: parseInt(
          isExterior ? b.exterior_fwidth : b.interior_fwidth,
          10
        ),
      };
    };

    // Use dynamic data if provided for each tab; fallback to static otherwise
    const exteriorHotspots =
      exterior_block.length > 0
        ? exterior_block.map((b) => mapBlock(b, true))
        : hotspotsData[1];

    const interiorHotspots =
      interior_block.length > 0
        ? interior_block.map((b) => mapBlock(b, false))
        : hotspotsData[2];

    return {
      1: exteriorHotspots,
      2: interiorHotspots,
    };
  };

  const hotspotsDataDynamic = buildHotspots(); // <-- renamed for clarity; dynamic or static fallback

  return (
    <div className="w-full h-fit bg-[#F5F5F5] overflow-hidden relative">
      <img
        className="purple_vctr hidden md:block absolute top-0 right-0 md:top-[-70px] md:right-[50px] lg:w-[450px] md:w-[350px] w-[300px]"
        src="/purple_vector.svg"
      />
      <img
        className="orange_vctr hidden md:block absolute top-0 right-0 md:top-[-100px] md:right-[-100px] lg:w-[450px] md:w-[350px] w-[300px]"
        src="/orange_vector.svg"
      />
      <img
        className="green_vctr hidden md:block absolute top-auto left-0 md:bottom-[-270px] md:left-[-200px] lg:w-[800px] md:w-[350px] w-[300px]"
        src="/green_vector.svg"
      />
      <div className="fix flex flex-col gap-[40px] xl:py-24 py-12">
        <div>
          <h2 className="bw-r lg:text-[64px] md:text-[45px] text-[32px] leading-[120%] tracking-[-2.56px] xl:tracking-[-2.56px]">
            <span>Engineered to Meet </span>
            <span className="bw-m lg:items-center flex lg:flex-row flex-col lg:gap-5 gap-2">
              Global Benchmarks
              <img
                src="/abstract_pattern.svg"
                className="abstract_svg"
                alt=""
              />
            </span>
          </h2>
        </div>

        {/* Desktop View */}
        <div className="w-full xl:!flex !hidden h-auto 1440:h-[600px]">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={activeTab}
              className="flex-1"
            >
              <ImgHotspot
                activeTab={activeTab}
                hotspots={hotspotsDataDynamic}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile View */}
        <div className="!block xl:!hidden mt-4">
          <div className="w-full bg-transparent flex">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [1, 0, 0.3, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-[55px] bg-white sm:w-fit w-full grid grid-cols-2 border border-[#00000060] rounded-xl overflow-hidden mb-4"
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
                  "relative flex sm:w-fit w-full items-center justify-center px-4 py-2 border-r border-[#CDCDCD] cursor-pointer focus:outline-none"
                )}
              >
                <motion.h2
                  animate={{ color: activeTab === 1 ? "#ffffff" : "#000000" }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="text-[14px] md:text-[16px] bw-m text-center leading-[24px]"
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
                  "relative sm:w-fit w-full flex items-center justify-center px-4 py-2 cursor-pointer focus:outline-none"
                )}
              >
                <motion.h2
                  animate={{ color: activeTab === 2 ? "#ffffff" : "#000000" }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="text-[14px] md:text-[16px] bw-m text-center leading-[24px]"
                >
                  Interior Block
                </motion.h2>
              </motion.button>
            </motion.div>
          </div>

          {/* Accordion */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={activeTab}
              className="flex-1"
            >
              <AccordionTab data={hotspotsDataDynamic[activeTab]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HCF;
