// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { ReactLenis } from "lenis/react";

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
//   subtitle: string;
//   description: string;
//   image?: string;
//   link?: string;
// }

// interface IndicatorsFProps {
//   tag?: string;
//   headingLines?: string[];
//   description?: string;
//   data?: SustainabilityData[];
// }

// const DEFAULT_SUSTAINABILITY_DATA: SustainabilityData[] = [
//   {
//     icon: "energy",
//     title: "KSH DISTRIPARKS",
//     subtitle: "ROBUST SOLUTIONS. ENHANCED SUPPLY CHAINS.",
//     description:
//       "Enhancing supply chains through cost-effective solutions. The company has 2 container depots located at Talegaon spread over combined 32 acres with a capacity of 3,50,000 TEU’s.",
//     image: "/about/kshscroll/ksh.svg",
//     link: "https://kshdistriparks.com/",
//   },
//   {
//     icon: "water",
//     title: "KSH INTEGRATED\nLOGISTICS",
//     subtitle: "SETTING UP MULTI-CLIENT WAREHOUSING SOLUTIONS PAN-INDIA",
//     description:
//       "Setting up multi-client warehousing solutions pan-India. The company has over 1.50 million square feet of warehousing across key Indian markets. The facilities are plug-and- play, effectively and efficiently adaptive to all our clients' needs.",
//     image: "/about/kshscroll/ksh-integrated.svg",
//     link: "https://www.kshlogistics.com/",
//   },
//   {
//     icon: "water",
//     title: "KSH INTERNATIONAL",
//     subtitle: "A LEADING MAKER OF INSULATED CONDUCTORS ACROSS THE GLOBE.",
//     description:
//       "The company is a leading provider of insulated/covered conductors across the globe and is a leading manufacturer of bare and insulated rectangular & round winding wires and transposed cables in India.",
//     image: "/about/kshscroll/ksh-international.svg",
//     link: "https://kshinternational.com/",
//   },
// ];

// const PANEL_BACKGROUND = "#F8F8F8";

// const HEAVY_WORDS = [
//   "The",
//   "KSH",
//   "Group",
//   "-",
//   "A",
//   "diversified",
//   "portfolio",
//   "of",
//   "businesses",
//   "shaping",
//   "industrial,",
//   "logistics",
//   "and",
//   "allied",
//   "sectors",
//   "through",
//   "innovation,",
//   "expertise",
//   "and",
//   "long-term",
//   "vision.",
// ];

// const LIGHT_WORDS = [""];

// /* ---------------------------------------------------------------------- */
// /* Desktop Panel (accordion)                                              */
// /* ---------------------------------------------------------------------- */

// const DesktopPanel: React.FC<{ data: SustainabilityData[] }> = ({ data }) => {
//   const [active, setActive] = useState(0);
//   const greyRef = useRef<HTMLHeadingElement>(null);

//   useEffect(() => {
//     const onScroll = () => {
//       const el = greyRef.current;
//       if (!el) return;
//       const r = el.getBoundingClientRect();
//       const vh = window.innerHeight || 800;
//       const p = Math.max(
//         0,
//         Math.min(1, (vh * 1.02 - r.top) / (r.height + vh * 0.5)),
//       );
//       const spans = el.querySelectorAll<HTMLSpanElement>("span[data-w]");
//       const fill = p * spans.length;
//       spans.forEach((s, i) => {
//         s.style.color = i < fill ? "#212121" : "#BDAEA6";
//       });
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     requestAnimationFrame(onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const staticImage = data[0]?.image || DEFAULT_SUSTAINABILITY_DATA[0].image;

//   return (
//     <div className="relative w-full">
//       <div className="w-full min-h-screen flex flex-row justify-between gap-10">
//         <div className="plcont w-[45%] pr-6 flex flex-col justify-between py-12">
//           <div>
//             <p className="eyebrow mb-6">// GROW WITH KSH INFRA</p>
//             <h2
//               ref={greyRef}
//               className="text-[28px] lg:text-[32px] leading-[1.2] font-sora font-semibold tracking-[-0.64px]"
//             >
//               {HEAVY_WORDS.map((word, i) => (
//                 <span
//                   key={`heavy-${i}`}
//                   data-w="1"
//                   className="text-[#BDAEA6] [transition:color_.5s_ease] font-bold inline-block mr-2"
//                 >
//                   {word}
//                 </span>
//               ))}
//               {LIGHT_WORDS.map((word, i) => (
//                 <span
//                   key={`light-${i}`}
//                   data-w="1"
//                   className="text-[#BDAEA6] [transition:color_.5s_ease] font-normal inline-block mr-2"
//                 >
//                   {word}
//                 </span>
//               ))}
//             </h2>
//           </div>

//           <div className="relative w-full h-[220px] xl:h-[230px] 2xl:h-[320px] min-[1900px]:h-[350px]! flex items-center justify-center my-auto">
//             <img
//               src={staticImage}
//               alt={data[0]?.title || "KSH INFRA"}
//               className="w-auto h-[220px] xl:h-[270px] 2xl:h-[300px] min-[1900px]:h-[350px]! object-contain max-w-full"
//             />
//           </div>
//         </div>

//         <div
//           className="w-[52%] lg:w-[50%] relative flex items-center"
//           style={{ background: PANEL_BACKGROUND }}
//         >
//           <div className="flex flex-col min-h-[500px] min-w-[680px] max-w-[790px] lg:pl-[72px] px-12 lg:px-14">
//             {data.map((item, i) => {
//               const on = i === active;
//               return (
//                 <div key={item.title} className="border-b border-[#E3E2DD]">
//                   <div
//                     onClick={() => setActive(i)}
//                     className="flex items-start justify-between gap-2 py-[clamp(20px,2.2vw,30px)] cursor-pointer"
//                   >
//                     <div className="flex-1 min-w-0">
//                       <h3
//                         className={`m-0 whitespace-nowrap font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(20px,2vw,27px)] tracking-[-0.01em] uppercase [transition:color_.5s_ease] ${on ? "text-[#212121]" : "text-[#868686]"}`}
//                       >
//                         {item.title}
//                       </h3>

//                       {/* Smooth height calculation via grid-template-rows */}
//                       <div
//                         className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
//                         style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
//                       >
//                         <div className="overflow-hidden min-h-0">
//                           <div
//                             className="pt-4 transition-opacity duration-300 ease-in-out"
//                             style={{ opacity: on ? 1 : 0 }}
//                           >
//                             {item.subtitle && (
//                               <p className="m-0 font-semibold text-[clamp(13px,1.08vw,14px)] uppercase tracking-wide text-[#212121] max-w-[480px]">
//                                 {item.subtitle}
//                               </p>
//                             )}
//                             {item.description && (
//                               <p className="m-0 pt-3 font-normal text-[clamp(13px,1.08vw,14px)] leading-[1.62] text-[#6D6D6D] max-w-[480px] whitespace-pre-line">
//                                 {item.description}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <span
//                       className={`shrink-0 mt-1 flex items-center justify-center w-[clamp(36px,3vw,42px)] h-[clamp(36px,3vw,42px)] rounded-full [transition:background_.50s_ease,border-color_.50s_ease] ${on ? "bg-[#5E6E4E] border border-[#5E6E4E]" : "bg-transparent border border-[#C9C6BD]"}`}
//                     >
//                       {on ? (
//                         <svg
//                           width="14"
//                           height="14"
//                           viewBox="0 0 14 14"
//                           fill="none"
//                         >
//                           <line
//                             x1="3"
//                             y1="7"
//                             x2="11"
//                             y2="7"
//                             stroke="#FFFFFF"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                           />
//                         </svg>
//                       ) : (
//                         <svg
//                           width="14"
//                           height="14"
//                           viewBox="0 0 14 14"
//                           fill="none"
//                         >
//                           <line
//                             x1="3"
//                             y1="7"
//                             x2="11"
//                             y2="7"
//                             stroke="#8A8A82"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                           />
//                           <line
//                             x1="7"
//                             y1="3"
//                             x2="7"
//                             y2="11"
//                             stroke="#8A8A82"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                           />
//                         </svg>
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------------------------- */
// /* Mobile Panel                                                           */
// /* ---------------------------------------------------------------------- */

// const MobilePanel: React.FC<{ data: SustainabilityData[] }> = ({ data }) => {
//   const [active, setActive] = useState(0);
//   const staticImage = data[0]?.image || DEFAULT_SUSTAINABILITY_DATA[0].image;

//   return (
//     <div className="w-full flex flex-col gap-6 sm:gap-8 px-4 sm:px-6">
//       <div className="w-full">
//         <p className="text-[11px] tracking-[0.15em] text-gray-500 uppercase mb-3 sm:mb-4">
//           {"// GROW WITH KSH INFRA"}
//         </p>
//         <h2 className="text-[22px] sm:text-[26px] leading-[1.3] font-semibold text-black mb-6">
//           The KSH Group - A diversified portfolio of businesses shaping
//           industrial, logistics and allied sectors through innovation, expertise
//           and long-term vision.
//         </h2>

//         <div className="sticky top-4 z-10 w-full h-[180px] sm:h-[220px] bg-white/90 flex items-center justify-center p-4">
//           <img
//             src={staticImage}
//             alt={data[0]?.title || "KSH INFRA"}
//             className="w-auto h-auto max-h-[140px] sm:max-h-[160px] max-w-[85%] object-contain"
//           />
//         </div>
//       </div>

//       <div
//         className="w-full overflow-hidden relative p-5 sm:p-6 rounded-lg"
//         style={{ background: PANEL_BACKGROUND }}
//       >
//         <div className="flex flex-col divide-y divide-gray-300">
//           {data.map((item, i) => {
//             const on = i === active;
//             return (
//               <div
//                 key={item.title}
//                 onClick={() => setActive(i)}
//                 className="cursor-pointer"
//               >
//                 <div className="flex items-start justify-between gap-3 py-4">
//                   <h3
//                     className={`flex-1 min-w-0 whitespace-pre-line font-[family-name:var(--font-sora),sans-serif] text-[16px] tracking-[-0.64px] leading-snug uppercase font-semibold [transition:color_.5s_ease] ${on ? "text-[#212121]" : "text-[#868686]"}`}
//                   >
//                     {item.title}
//                   </h3>
//                   <span
//                     className={`shrink-0 mt-1 flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors duration-500 ease-in-out ${on ? "bg-[#5E6E4E] border border-[#5E6E4E]" : "bg-transparent border border-[#C9C6BD]"}`}
//                   >
//                     {on ? (
//                       <svg
//                         width="14"
//                         height="14"
//                         viewBox="0 0 14 14"
//                         fill="none"
//                       >
//                         <line
//                           x1="3"
//                           y1="7"
//                           x2="11"
//                           y2="7"
//                           stroke="#FFFFFF"
//                           strokeWidth="1.5"
//                           strokeLinecap="round"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         width="14"
//                         height="14"
//                         viewBox="0 0 14 14"
//                         fill="none"
//                       >
//                         <line
//                           x1="3"
//                           y1="7"
//                           x2="11"
//                           y2="7"
//                           stroke="#8A8A82"
//                           strokeWidth="1.5"
//                           strokeLinecap="round"
//                         />
//                         <line
//                           x1="7"
//                           y1="3"
//                           x2="7"
//                           y2="11"
//                           stroke="#8A8A82"
//                           strokeWidth="1.5"
//                           strokeLinecap="round"
//                         />
//                       </svg>
//                     )}
//                   </span>
//                 </div>

//                 {/* Grid Template Rows Accordion */}
//                 <div
//                   className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
//                   style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
//                 >
//                   <div className="overflow-hidden min-h-0">
//                     <div
//                       className="pb-4 transition-opacity duration-300 ease-in-out"
//                       style={{ opacity: on ? 1 : 0 }}
//                     >
//                       {item.subtitle && (
//                         <p className="m-0 text-[12px] sm:text-[13px] font-semibold text-[#212121] uppercase tracking-wide leading-snug">
//                           {item.subtitle}
//                         </p>
//                       )}

//                       {item.description && (
//                         <p className="m-0 text-[13px] sm:text-[14px] text-gray-600 leading-relaxed pt-2 whitespace-pre-line">
//                           {item.description}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
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

//   return (
//     <ReactLenis root>
//       <div className="w-full bg-white">
//         <section className="relative w-full">
//           <div className="hidden md:block">
//             <DesktopPanel data={activeData} />
//           </div>
//           <div className="md:hidden py-8 sm:py-[45px]">
//             <MobilePanel data={activeData} />
//           </div>
//         </section>
//       </div>
//     </ReactLenis>
//   );
// };

// export default IndicatorsF;

//
//
//
//
//
//
"use client";

import React, { useRef, useEffect, useState } from "react";

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
  subtitle: string;
  description: string;
  image?: string;
  link?: string;
}

interface IndicatorsFProps {
  tag?: string;
  headingLines?: string[];
  description?: string;
  data?: SustainabilityData[];
}

const DEFAULT_SUSTAINABILITY_DATA: SustainabilityData[] = [
  {
    icon: "water",
    title: "KSH INTERNATIONAL",
    subtitle: "A LEADING MAKER OF INSULATED CONDUCTORS ACROSS THE GLOBE.",
    description:
      "KSH International is a publicly listed company and a leading manufacturer of insulated and covered conductors, serving customers across global markets. The company is also one of India's leading manufacturers of bare and insulated rectangular and round winding wires and transposed cables.",
    image: "/about/kshscroll/aboutKSH.png",
    link: "https://kshinternational.com/",
  },
  {
    icon: "energy",
    title: "KSH DISTRIPARKS",
    subtitle: "ROBUST SOLUTIONS. ENHANCED SUPPLY CHAINS.",
    description:
      "Enhancing supply chains through cost-effective Logistics solutions, KSH Distriparks has been in a strategic partnership with Pacific Century Group since 2010. The company operates two container depots in Talegaon, spread across a combined 32 acres with a handling capacity of 350,000 TEUs, supporting efficient and reliable Logistics operations.",
    image: "/about/kshscroll/aboutKSH.svg",
    link: "https://kshdistriparks.com/",
  },
  {
    icon: "water",
    title: "KSH INTEGRATED\nLOGISTICS",
    subtitle: "SETTING UP MULTI-CLIENT WAREHOUSING SOLUTIONS PAN-INDIA",
    description:
      "Backed by a strategic partnership with Pacific Century Group since 2010, KSH Integrated Logistics delivers multi-client warehousing solutions across India. With over 1.5 million sq. ft. of warehousing in key markets, the company provides plug-and-play facilities designed to efficiently adapt to diverse customer requirements.",
    image: "/about/kshscroll/ksh-integrated.svg",
    link: "https://www.kshlogistics.com/",
  },
];

const PANEL_BACKGROUND = "#F8F8F8";
//de
const HEAVY_WORDS = [
  "The",
  "KSH",
  "Group",
  "-",
  "A",
  "diversified",
  "portfolio",
  "of",
  "businesses",
  "shaping",
  "Industrial,",
  "Logistics",
  "and",
  "Allied",
  "Sectors",
  "through",
  "innovation,",
  "expertise",
  "and",
  "long-term",
  "vision.",
];

const LIGHT_WORDS = [""];

/* ---------------------------------------------------------------------- */
/* Desktop Panel (accordion)                                              */
/* ---------------------------------------------------------------------- */

const DesktopPanel: React.FC<{ data: SustainabilityData[] }> = ({ data }) => {
  const [active, setActive] = useState(0);
  const greyRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = greyRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const p = Math.max(
        0,
        Math.min(1, (vh * 1.02 - r.top) / (r.height + vh * 0.5)),
      );
      const spans = el.querySelectorAll<HTMLSpanElement>("span[data-w]");
      const fill = p * spans.length;
      spans.forEach((s, i) => {
        s.style.color = i < fill ? "#212121" : "#BDAEA6";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const staticImage = data[0]?.image || DEFAULT_SUSTAINABILITY_DATA[0].image;

  return (
    <div className="relative w-full">
      <div className="w-full min-h-screen flex flex-row justify-between gap-10">
        <div className="plcont w-[45%] pr-6 flex flex-col justify-between py-12">
          <div>
            {/* <p className="eyebrow mb-6">// GROW WITH KSH INFRA</p> */}
            <h2
              ref={greyRef}
              className="text-[28px] lg:text-[32px] leading-[1.2] font-sora font-semibold tracking-[-0.64px]"
            >
              {HEAVY_WORDS.map((word, i) => (
                <span
                  key={`heavy-${i}`}
                  data-w="1"
                  className="text-[#BDAEA6] [transition:color_.5s_ease] font-bold inline-block mr-2"
                >
                  {word}
                </span>
              ))}
              {LIGHT_WORDS.map((word, i) => (
                <span
                  key={`light-${i}`}
                  data-w="1"
                  className="text-[#BDAEA6] [transition:color_.5s_ease] font-normal inline-block mr-2"
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>

          <div className="relative w-full h-[220px] xl:h-[230px] 2xl:h-[320px] min-[1900px]:h-[350px]! flex items-center justify-center my-auto">
            <img
              src={staticImage}
              alt={data[0]?.title || "KSH INFRA"}
              className="w-auto h-[160px] xl:h-[180px] 2xl:h-[220px] min-[1900px]:h-[250px]! object-contain max-w-full"
            />
          </div>
        </div>

        <div
          className="w-[52%] prcont lg:w-[50%] relative flex items-center"
          style={{ background: PANEL_BACKGROUND }}
        >
          <div className="flex flex-col min-h-[500px] w-full 1366:min-w-[680px] max-w-[790px] lg:pl-[72px] px-12 lg:pr-0 xl:pr-12 lg:pl-10 2xl:px-14">
            {data.map((item, i) => {
              const on = i === active;
              return (
                <div key={item.title} className="border-b border-[#E3E2DD]">
                  <div
                    onClick={() => setActive(i)}
                    className="flex items-start justify-between gap-2 py-[clamp(20px,2.2vw,30px)] cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`m-0 whitespace-nowrap font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(20px,2vw,27px)] tracking-[-0.01em] uppercase [transition:color_.5s_ease] ${on ? "text-[#212121]" : "text-[#868686]"}`}
                      >
                        {item.title}
                      </h3>

                      {/* Smooth height calculation via grid-template-rows */}
                      <div
                        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                        style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden min-h-0">
                          <div
                            className="pt-4 transition-opacity duration-300 ease-in-out"
                            style={{ opacity: on ? 1 : 0 }}
                          >
                            {item.subtitle && (
                              <p className="m-0 font-semibold text-[clamp(13px,1.08vw,14px)] uppercase tracking-wide text-[#212121] max-w-[480px]">
                                {item.subtitle}
                              </p>
                            )}
                            {item.description && (
                              <p className="m-0 pt-3 w-full xl:w-[80%] 2xl:w-full font-normal text-[clamp(13px,1.08vw,14px)] leading-[1.62] text-[#6D6D6D] max-w-[480px] whitespace-pre-line">
                                {item.description}
                              </p>
                            )}

                            {/* Dynamic URL display with FIND OUT MORE prefix */}
                            {item.link && (
                              <div className="pt-5 pb-1">
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-[16px] tracking-[-0.32px] transition-colors text-[#8F8F8F]! hover:text-[#111]! font-normal"
                                >
                                  FIND OUT MORE : {item.link}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 mt-1 flex items-center justify-center w-[clamp(36px,3vw,42px)] h-[clamp(36px,3vw,42px)] rounded-full [transition:background_.50s_ease,border-color_.50s_ease] ${on ? "bg-[#5E6E4E] border border-[#5E6E4E]" : "bg-transparent border border-[#C9C6BD]"}`}
                    >
                      {on ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
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
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <line
                            x1="3"
                            y1="7"
                            x2="11"
                            y2="7"
                            stroke="#8A8A82"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <line
                            x1="7"
                            y1="3"
                            x2="7"
                            y2="11"
                            stroke="#8A8A82"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/* Mobile Panel                                                           */
/* ---------------------------------------------------------------------- */

const MobilePanel: React.FC<{ data: SustainabilityData[] }> = ({ data }) => {
  const [active, setActive] = useState(0);
  const staticImage = data[0]?.image || DEFAULT_SUSTAINABILITY_DATA[0].image;

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8 px-4 sm:px-6">
      <div className="w-full">
        {/* <p className="text-[11px] tracking-[0.15em] text-gray-500 uppercase mb-3 sm:mb-4">
          {"// GROW WITH KSH INFRA"}
        </p> */}
        <h2 className="text-[22px] sm:text-[26px] leading-[1.3] font-semibold text-black mb-6">
          The KSH Group - A diversified portfolio of businesses shaping
          Industrial, Logistics and allied sectors through innovation, expertise
          and long-term vision.
        </h2>

        <div className="sticky top-4 z-10 w-full h-[180px] sm:h-[220px] bg-white/90 flex items-center justify-center p-4">
          <img
            src={staticImage}
            alt={data[0]?.title || "KSH INFRA"}
            className="w-auto h-auto max-h-[140px] sm:max-h-[160px] max-w-[85%] object-contain"
          />
        </div>
      </div>

      <div
        className="w-full overflow-hidden relative p-5 sm:p-6 rounded-lg"
        style={{ background: PANEL_BACKGROUND }}
      >
        <div className="flex flex-col divide-y divide-gray-300">
          {data.map((item, i) => {
            const on = i === active;
            return (
              <div
                key={item.title}
                onClick={() => setActive(i)}
                className="cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 py-4">
                  <h3
                    className={`flex-1 min-w-0 whitespace-pre-line font-[family-name:var(--font-sora),sans-serif] text-[16px] tracking-[-0.64px] leading-snug uppercase font-semibold [transition:color_.5s_ease] ${on ? "text-[#212121]" : "text-[#868686]"}`}
                  >
                    {item.title}
                  </h3>
                  <span
                    className={`shrink-0 mt-1 flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors duration-500 ease-in-out ${on ? "bg-[#5E6E4E] border border-[#5E6E4E]" : "bg-transparent border border-[#C9C6BD]"}`}
                  >
                    {on ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
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
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <line
                          x1="3"
                          y1="7"
                          x2="11"
                          y2="7"
                          stroke="#8A8A82"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <line
                          x1="7"
                          y1="3"
                          x2="7"
                          y2="11"
                          stroke="#8A8A82"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </span>
                </div>

                {/* Grid Template Rows Accordion */}
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden min-h-0">
                    <div
                      className="pb-4 transition-opacity duration-300 ease-in-out"
                      style={{ opacity: on ? 1 : 0 }}
                    >
                      {item.subtitle && (
                        <p className="m-0 text-[12px] sm:text-[14px] font-semibold text-[#212121] uppercase tracking-wide leading-snug">
                          {item.subtitle}
                        </p>
                      )}

                      {item.description && (
                        <p className="m-0 text-[13px] sm:text-[14px] text-gray-600 leading-relaxed pt-2 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}

                      {/* Dynamic URL display with FIND OUT MORE prefix */}
                      {item.link && (
                        <div className="pt-4">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="lg:text-[16px] text-[12px] tracking-[-0.32px] transition-colors text-[#8F8F8F] hover:text-black font-normal break-all"
                          >
                            FIND OUT MORE : {item.link}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const IndicatorsF: React.FC<IndicatorsFProps> = ({
  data = DEFAULT_SUSTAINABILITY_DATA,
}) => {
  const activeData = data.length > 0 ? data : DEFAULT_SUSTAINABILITY_DATA;

  return (
    <div className="w-full bg-white">
      <section className="relative w-full">
        <div className="hidden md:block">
          <DesktopPanel data={activeData} />
        </div>
        <div className="md:hidden py-8 sm:py-[45px]">
          <MobilePanel data={activeData} />
        </div>
      </section>
    </div>
  );
};

export default IndicatorsF;
//
