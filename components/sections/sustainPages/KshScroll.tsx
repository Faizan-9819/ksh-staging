// "use client";
// import React, { useRef, useState } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useInView,
//   useScroll,
//   useTransform,
//   MotionValue,
// } from "framer-motion";
// import { ReactLenis } from "lenis/react";
// import Btn from "@/components/ui/Btn";
// import EnvironmentalThoughtsPopup from "./EnvironmentalThoughtsPopup";

// type IconKey =
//   | "energy"
//   | "water"
//   | "recycle"
//   | "sourcing"
//   | "building"
//   | "biodiversity";

// interface SustainabilityData {
//   icon: IconKey;
//   title: string;
//   description: string;
// }

// interface IndicatorsFProps {
//   tag?: string;
//   headingLines?: string[];
//   description?: string;
//   data?: SustainabilityData[];
// }

// // Default mock data embedded directly inside the component file
// // const DEFAULT_SUSTAINABILITY_DATA: SustainabilityData[] = [
// //   {
// //     icon: "energy",
// //     title: "Intelligent Energy Management",
// //     description:
// //       "Optimizing energy consumption for efficiency and sustainability.",
// //   },
// //   {
// //     icon: "water",
// //     title: "Preserving Water Resources",
// //     description:
// //       "Robust solutions ensuring efficient supply chains and water conservation.",
// //   },
// //   {
// //     icon: "recycle",
// //     title: "Waste Reduction & Recycling",
// //     description:
// //       "Driving zero waste to landfill through responsible material recovery.",
// //   },
// //   {
// //     icon: "sourcing",
// //     title: "Sustainable Sourcing",
// //     description:
// //       "Partnering with eco-conscious suppliers across the value chain.",
// //   },
// //   {
// //     icon: "building",
// //     title: "Green Building Standards",
// //     description:
// //       "Designing high-quality parks aligned with green certification benchmarks.",
// //   },
// //   {
// //     icon: "biodiversity",
// //     title: "Community & Biodiversity",
// //     description:
// //       "Protecting local ecosystems while creating shared value for communities.",
// //   },
// // ];

// const DEFAULT_SUSTAINABILITY_DATA: SustainabilityData[] = [
//   {
//     icon: "energy",
//     title: "Intelligent Energy Management",
//     description:
//       "Optimizing energy consumption for efficiency and sustainability.",
//   },
//   {
//     icon: "water",
//     title: "Preserving Water Resources",
//     description: "Implementing smart water conservation and recycling systems.",
//   },
//   {
//     icon: "recycle",
//     title: "Waste Minimization and Segregation",
//     description: "Reducing, reusing, and recycling for a cleaner environment.",
//   },
//   {
//     icon: "sourcing",
//     title: "Well-being",
//     description:
//       "Prioritizing employee health, safety, and a balanced work environment.",
//   },
//   {
//     icon: "building",
//     title: "A Positive Environmental Effect",
//     description: "Reducing carbon footprint through eco-friendly initiatives.",
//   },
//   {
//     icon: "biodiversity",
//     title: "Sustainable Development Policy",
//     description:
//       "Building infrastructure with long-term environmental responsibility.",
//   },
// ];

// // Panel gradient background (right column)
// const PANEL_BACKGROUND =
//   "radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%), #F8F8F8";

// // Fixed vertical distance between the start of one card slot and the next on desktop
// const CARD_STEP = 280;
// // How much extra scroll (in vh) is consumed moving from one card to the next
// const SCROLL_VH_PER_STEP = 50;

// const ICON_IMAGE: Record<IconKey, string> = {
//   energy: "/sustainability/growth/bulb.png",
//   water: "/sustainability/growth/water-drop.png",
//   recycle: "/sustainability/growth/recycle.png",
//   sourcing: "/sustainability/growth/health.png",
//   building: "/sustainability/growth/green.png",
//   biodiversity: "/sustainability/growth/care1.png",
// };

// const SustainabilityIcon: React.FC<{ icon: IconKey }> = ({ icon }) => (
//   <img src={ICON_IMAGE[icon]} alt="" className="w-30 h-30 object-contain" />
// );

// /* ---------------------------------------------------------------------- */
// /* Desktop: pinned green panel, cards scroll-translate inside it           */
// /* ---------------------------------------------------------------------- */

// interface DesktopCardProps {
//   item: SustainabilityData;
//   index: number;
//   isLast: boolean;
//   progress: MotionValue<number>;
// }

// const DesktopCard: React.FC<DesktopCardProps> = ({
//   item,
//   index,
//   isLast,
//   progress,
// }) => {
//   // Expanded active zone so the active card stays sharp and clear for longer near center
//   const opacity = useTransform(
//     progress,
//     [index - 0.75, index - 0.25, index, index + 0.25, index + 0.75],
//     [0.35, 1, 1, 1, 0.35],
//   );

//   const filter = useTransform(
//     progress,
//     [index - 0.75, index - 0.25, index, index + 0.25, index + 0.75],
//     ["blur(5px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(5px)"],
//   );

//   return (
//     <motion.div
//       style={{ height: CARD_STEP, opacity, filter }}
//       className="flex flex-col justify-center shrink-0"
//     >
//       <div className="mb-5">
//         <SustainabilityIcon icon={item.icon} />
//       </div>
//       <h3 className="text-[22px] lg:text-[24px] tracking-[0.02em] uppercase text-white">
//         {item.title}
//       </h3>
//       <p className="text-[13px] lg:text-[14px] pb-3 text-white leading-relaxed mt-3 max-w-full">
//         {item.description}
//       </p>
//       {!isLast && <div className="w-[80%] h-px bg-[#9E9E9E] mt-12" />}
//     </motion.div>
//   );
// };

// const DesktopPanel: React.FC<{
//   data: SustainabilityData[];
//   onLearnMore: () => void;
// }> = ({ data, onLearnMore }) => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });
//   const activeIndex = useTransform(
//     scrollYProgress,
//     [0, 1],
//     [0, data.length - 1],
//   );
//   const translateY = useTransform(activeIndex, (v) => -v * CARD_STEP);

//   return (
//     <div
//       ref={sectionRef}
//       style={{ height: `${100 + (data.length - 1) * SCROLL_VH_PER_STEP}vh` }}
//       className="relative w-full"
//     >
//       <div className="sticky plcont top-0 h-screen w-full flex flex-row items-center justify-between">
//         {/* Left column - vertically centered against the full-height panel */}
//         <div className="w-[42%]">
//           {/* <p className="text-[12px] tracking-[0.15em] text-gray-500 uppercase mb-4">
//             {"// GROW WITH KSH INFRA"}
//           </p> */}
//           <h2 className="text-[36px] lg:text-[42px] leading-[1.15] font-semibold text-black mb-6">
//             KSH INFRA Parks:
//             <br /> Committed to the Environment
//           </h2>
//           <p className="text-[20px] text-[#4A4A4A] leading-relaxed max-w-[690px]">
//             KSH INFRA Parks are a great example of how KSH INFRA is driving
//             sustainable environmental practices while creating modern,
//             high-quality warehousing and industrial parks.
//           </p>
//           <div className="mt-8 ">
//             <Btn
//               textColor="text-[#59624D]"
//               className="overflow-hidden"
//               textSize="text-[11px] lg:text-[14px]"
//               label="Learn more about our environmental thoughts"
//               onClick={onLearnMore}
//             />
//           </div>
//         </div>

//         {/* Right column - fully green, full viewport height */}
//         <div
//           className="w-[52%] lg:w-[50%] h-screen overflow-hidden relative"
//           style={{ background: PANEL_BACKGROUND }}
//         >
//           {/* Top/bottom vertical padding centers the first and last cards in view */}
//           <motion.div
//             style={{ y: translateY }}
//             className="flex flex-col lg:pl-[60px] px-12 lg:px-14 pt-[calc(50vh-140px)] pb-[calc(50vh-140px)]"
//           >
//             {data.map((item, idx) => (
//               <DesktopCard
//                 key={idx}
//                 item={item}
//                 index={idx}
//                 isLast={idx === data.length - 1}
//                 progress={activeIndex}
//               />
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------------------------- */
// /* Mobile: simple stacked list, blur driven by in-view state              */
// /* ---------------------------------------------------------------------- */

// const MobileCard: React.FC<{ item: SustainabilityData; isLast: boolean }> = ({
//   item,
//   isLast,
// }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { margin: "-30% 0px -30% 0px", once: false });

//   return (
//     <motion.div
//       ref={ref}
//       className="flex flex-col"
//       animate={inView ? "visible" : "hidden"}
//       initial="hidden"
//       variants={{
//         visible: { opacity: 1, filter: "blur(0px)" },
//         hidden: { opacity: 0.45, filter: "blur(4px)" },
//       }}
//       transition={{ duration: 0.5, ease: [0.7, 0, 0.4, 1] }}
//     >
//       <div className="mb-5">
//         <SustainabilityIcon icon={item.icon} />
//       </div>
//       <h3 className="text-[18px] tracking-[0.02em] font-semibold uppercase text-white">
//         {item.title}
//       </h3>
//       <p className="text-[13px] text-white/70 leading-relaxed mt-3">
//         {item.description}
//       </p>
//       {!isLast && <div className="border-t border-white/20 mt-8" />}
//     </motion.div>
//   );
// };

// const MobilePanel: React.FC<{
//   data: SustainabilityData[];
//   onLearnMore: () => void;
// }> = ({ data, onLearnMore }) => {
//   return (
//     <div className="w-full flex flex-col gap-[32px]">
//       <div className="w-full px-6">
//         {/* <p className="text-[11px] tracking-[0.15em] text-gray-500 uppercase mb-4">
//           {"// GROW WITH KSH INFRA"}
//         </p> */}
//         <h2 className="text-[32px] leading-[1.15] font-semibold text-black mb-5">
//           KSH INFRA
//           <br />
//           Parks: Committed
//           <br />
//           to the Environment
//         </h2>
//         <p className="text-[15px] w-full text-[#4A4A4A] leading-relaxed">
//           KSH INFRA Parks are a great example of how KSH INFRA is driving
//           sustainable environmental practices while creating modern,
//           high-quality warehousing and industrial parks.
//         </p>
//         <div className="mt-6">
//           <Btn
//             className="py-3!"
//             label="Learn more about our environmental thoughts"
//             onClick={onLearnMore}
//           />
//         </div>
//       </div>

//       <div
//         className="w-full overflow-hidden relative pb-14 p-8"
//         style={{ background: PANEL_BACKGROUND }}
//       >
//         <div className="flex flex-col gap-10">
//           {data.map((item, idx) => (
//             <MobileCard
//               key={idx}
//               item={item}
//               isLast={idx === data.length - 1}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------------------------- */

// const IndicatorsF: React.FC<IndicatorsFProps> = ({
//   data = DEFAULT_SUSTAINABILITY_DATA,
// }) => {
//   const activeData = data.length > 0 ? data : DEFAULT_SUSTAINABILITY_DATA;
//   const [showPopup, setShowPopup] = useState(false);

//   return (
//     <div className="w-full bg-[##5F6953]! lg:bg-white">
//       <section className="relative w-full">
//         <div className="hidden md:block">
//           <DesktopPanel
//             data={activeData}
//             onLearnMore={() => setShowPopup(true)}
//           />
//         </div>
//         <div className="md:hidden pt-[45px]">
//           <MobilePanel
//             data={activeData}
//             onLearnMore={() => setShowPopup(true)}
//           />
//         </div>
//       </section>

//       <AnimatePresence>
//         {showPopup && (
//           <EnvironmentalThoughtsPopup onClose={() => setShowPopup(false)} />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default IndicatorsF;
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
"use client";

import { PRESSABLE } from "@/lib/pressable";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Btn from "@/components/ui/Btn";
import EnvironmentalThoughtsPopup from "./EnvironmentalThoughtsPopup";

type IconKey =
  | "energy"
  | "water"
  | "recycle"
  | "sourcing"
  | "building"
  | "biodiversity";

interface SustainabilityData {
  icon: IconKey;
  title: string;
  description: string;
}

interface IndicatorsFProps {
  tag?: string;
  headingLines?: string[];
  description?: string;
  data?: SustainabilityData[];
}

const DEFAULT_SUSTAINABILITY_DATA: SustainabilityData[] = [
  {
    icon: "energy",
    title: "Intelligent Energy Management",
    description:
      "Optimizing energy consumption for efficiency and sustainability.",
  },
  {
    icon: "water",
    title: "Preserving Water Resources",
    description: "Implementing smart water conservation and recycling systems.",
  },
  {
    icon: "recycle",
    title: "Waste Minimization and Segregation",
    description: "Reducing, reusing, and recycling for a cleaner environment.",
  },
  {
    icon: "sourcing",
    title: "Well-being",
    description:
      "Prioritizing employee health, safety, and a balanced work environment.",
  },
  {
    icon: "building",
    title: "A Positive Environmental Effect",
    description: "Reducing carbon footprint through eco-friendly initiatives.",
  },
  {
    icon: "biodiversity",
    title: "Sustainable Development Policy",
    description:
      "Building infrastructure with long-term environmental responsibility.",
  },
];

// Panel gradient background
const PANEL_BACKGROUND =
  "radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%), #F8F8F8";

const ICON_IMAGE: Record<IconKey, string> = {
  energy: "/sustainability/growth/bulb.png",
  water: "/sustainability/growth/water-drop.png",
  recycle: "/sustainability/growth/recycle.png",
  sourcing: "/sustainability/growth/health.png",
  building: "/sustainability/growth/green.png",
  biodiversity: "/sustainability/growth/care1.png",
};

const SustainabilityIcon: React.FC<{ icon: IconKey }> = ({ icon }) => (
  <img src={ICON_IMAGE[icon]} alt="" className="w-16 h-16 object-contain" />
);

const AccordionItem: React.FC<{
  item: SustainabilityData;
  index: number;
  isActive: boolean;
  isLast: boolean;
  onToggle: () => void;
}> = ({ item, isActive, isLast, onToggle }) => {
  return (
    <div className={`${!isLast ? "border-b border-white/20" : ""}`}>
      <div
        {...PRESSABLE}
        onClick={onToggle}
        className="flex items-center justify-between gap-4 py-4 lg:py-5 cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <h3 className="text-[14px] lg:text-[22px] tracking-[0.02em] uppercase font-medium text-white">
            {item.title}
          </h3>
        </div>

        {/* Accordion toggle indicator button */}
        <span
          className={`shrink-0 flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors duration-500 ease-in-out ${
            isActive
              ? "bg-white/20 border border-white/40"
              : "bg-transparent border border-white/20"
          }`}
        >
          {isActive ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line
                x1="3"
                y1="7"
                x2="11"
                y2="7"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line
                x1="3"
                y1="7"
                x2="11"
                y2="7"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="7"
                y1="3"
                x2="7"
                y2="11"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
      </div>

      {/* grid-template-rows 0fr -> 1fr: height is always correct on first
          paint, resize, and font load, so it never jumps */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-in-out"
        style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="pb-6 transition-opacity duration-500 ease-in-out"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            <p className="text-[13px] lg:text-[14px] text-white/80 leading-relaxed max-w-full">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndicatorsF: React.FC<IndicatorsFProps> = ({
  data = DEFAULT_SUSTAINABILITY_DATA,
}) => {
  const activeData = data.length > 0 ? data : DEFAULT_SUSTAINABILITY_DATA;
  const [activeAccordion, setActiveAccordion] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <div className="w-full bg-white">
      <section className="relative w-full py-12 lg:py-0">
        <div className="plcont pr-[5vw] lg:pr-0 w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="w-full lg:w-[42%] lg:py-20">
            <h2 className="text-[32px] lg:text-[42px] leading-[1.15] font-semibold text-black mb-6">
              KSH INFRA Parks:
              <br /> Committed to the Environment
            </h2>
            <p className="text-[16px] lg:text-[20px] text-[#4A4A4A] leading-relaxed max-w-[690px]">
              KSH INFRA Parks are a great example of how KSH INFRA is driving
              sustainable environmental practices while creating modern Grade A
              Industrial & Logistics Parks.
            </p>
            <div className="mt-8">
              <Btn
                textColor="text-[#59624D]"
                className="overflow-hidden"
                textSize="text-[13px] py-3! lg:text-[14px]"
                label="Learn more about our environmental thoughts"
                onClick={() => setShowPopup(true)}
              />
            </div>
          </div>

          {/* Right Column - Accordion Container */}
          <div
            className="w-full lg:w-[52%] overflow-hidden rounded-[20px] lg:rounded-none px-6 py-6 sm:px-8 lg:px-12 lg:py-20"
            style={{ background: PANEL_BACKGROUND }}
          >
            <div className="flex flex-col">
              {activeData.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  item={item}
                  index={idx}
                  isActive={activeAccordion === idx}
                  isLast={idx === activeData.length - 1}
                  onToggle={() => setActiveAccordion(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      <AnimatePresence>
        {showPopup && (
          <EnvironmentalThoughtsPopup onClose={() => setShowPopup(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default IndicatorsF;
