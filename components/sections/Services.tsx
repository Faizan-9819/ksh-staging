// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { SERVICES } from "./ServicesData";
// import ServicesModal from "./ServicesModal";
// import Btn from "@/components/ui/Btn";
// import { HiArrowUpRight } from "react-icons/hi2";

// export default function Services() {
//   const [active, setActive] = useState(0);
//   const [modalOpen, setModalOpen] = useState(false);
//   const svc = SERVICES[active];

//   // Clean, zero-scroll state update handler to eliminate overlapping shifts completely
//   const handleServiceSelect = (index: number) => {
//     setActive(index);
//   };

//   return (
//     <>
//       <section className="relative w-full bg-[#F8F8F6] overflow-hidden">
//         {/* decorative arcs */}
//         <div className="absolute pointer-events-none rounded-full border border-[#24314E]/10 -top-[180px] left-[8%] w-[620px] h-[620px]" />
//         <div className="absolute pointer-events-none rounded-full border border-[#24314E]/10 -bottom-[260px] right-[4%] w-[680px] h-[680px]" />

//         <div className="fix relative py-10 max-sm:py-6 px-4 sm:px-6 md:px-8 lg:px-0">
//           {/* ── STEP 1 FOR MOBILE: STATIC HEADING TITLE BLOCK ON TOP ── */}
//           {/* Positioned cleanly outside the flex columns to guarantee zero structural movement */}
//           <div className="w-full bg-white rounded-[14px] p-5 mb-5 shadow-[0_16px_40px_-32px_rgba(15,29,58,0.3)] lg:hidden">
//             <div className="flex items-center gap-[9px] mb-3">
//               <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-semibold text-[13px]">
//                 //
//               </span>
//               <h5 className="text-[#59624D] font-normal text-[12px] uppercase tracking-[-0.24px] whitespace-nowrap">
//                 OUR SERVICES
//               </h5>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               <h2 className="section-title m-0 font-semibold text-[28px] sm:text-[32px] leading-[1.14] tracking-[-0.012em] text-[#212121]">
//                 How We Create Value
//               </h2>
//               <div className="self-start sm:self-auto">
//                 <Btn label="View More" />
//               </div>
//             </div>
//           </div>

//           {/* Core Content Layout Structure */}
//           <div className="flex flex-col lg:flex-row gap-[clamp(18px,2vw,28px)] items-stretch">
//             {/* ── STEP 2 FOR MOBILE: IMAGE PANEL + CORRESPONDING ACTIVE CONTENT ── */}
//             <div className="relative overflow-hidden w-full lg:[flex:1_1_34%] min-w-[280px] rounded-[18px] min-h-[380px] sm:min-h-[460px] lg:min-h-[clamp(360px,38vw,548px)] shadow-md">
//               {SERVICES.map((s, i) => (
//                 <img
//                   key={s.name}
//                   src={s.src}
//                   alt={s.name}
//                   className="absolute inset-0 w-full h-full object-cover block [transition:opacity_.7s_ease,transform_1.2s_ease]"
//                   style={{
//                     opacity: i === active ? 1 : 0,
//                     transform: i === active ? "scale(1)" : "scale(1.04)",
//                   }}
//                 />
//               ))}

//               {/* Location pins */}
//               <AnimatePresence>
//                 {svc.markers.map((pin, pi) => (
//                   <motion.div
//                     key={`${active}-${pi}`}
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="absolute [filter:drop-shadow(0_3px_5px_rgba(0,0,0,0.35))] -translate-x-1/2 -translate-y-full"
//                     style={{ left: pin.left, top: pin.top }}
//                   >
//                     <svg width="26" height="34" viewBox="0 0 26 34" fill="none">
//                       <path
//                         d="M13 0C5.8 0 0 5.8 0 13c0 9 13 21 13 21s13-12 13-21C26 5.8 20.2 0 13 0z"
//                         fill="#FFFFFF"
//                       />
//                       <circle cx="13" cy="13" r="4.6" fill="#3E5C2C" />
//                     </svg>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>

//               {/* Dynamic Glass overlay description panel */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={active}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.25 }}
//                   className="absolute rounded-[16px] bg-[linear-gradient(160deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.50)_100%)] backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)] border border-[rgba(255,255,255,0.45)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]"
//                   style={{
//                     left: "clamp(12px,1.6vw,22px)",
//                     right: "clamp(12px,1.6vw,22px)",
//                     bottom: "clamp(12px,1.6vw,22px)",
//                     padding: "clamp(16px,1.9vw,28px)",
//                   }}
//                 >
//                   <h3 className="m-0 mb-2 font-semibold text-[17px] sm:text-[19px] lg:text-[clamp(18px,1.5vw,20px)] text-[#fff]">
//                     {svc.title}
//                   </h3>

//                   {svc.paras.map((p, pi) => (
//                     <p
//                       key={pi}
//                       className="m-0 mb-2 last:mb-0 font-inter font-normal text-[13px] sm:text-[14px] lg:text-[clamp(13px,1.04vw,14px)] leading-[1.5] text-[#fff]"
//                     >
//                       {p}
//                     </p>
//                   ))}
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* ── RIGHT COLUMN: LAYOUT DESKTOP VIEWS ── */}
//             <div className="w-full lg:[flex:1_1_60%] min-w-[300px] flex flex-col gap-[clamp(16px,1.6vw,22px)]">
//               {/* Top heading card (Desktop Only version matching constraints) */}
//               <div className="hidden lg:block bg-white rounded-[14px] p-5 shadow-[0_16px_40px_-32px_rgba(15,29,58,0.3)]">
//                 <div className="flex items-center gap-[9px] mb-[clamp(14px,1.4vw,20px)]">
//                   <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-semibold text-[13px]">
//                     //
//                   </span>
//                   <h5 className="text-[#59624D] font-normal text-[12px] uppercase tracking-[-0.24px] whitespace-nowrap">
//                     OUR SERVICES
//                   </h5>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <h2 className="section-title m-0 font-semibold text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.012em] text-[#212121]">
//                     How We Create Value
//                   </h2>
//                   <Btn label="View More" />
//                 </div>
//               </div>

//               {/* ── STEP 3 FOR MOBILE: BOTTOM INTERACTIVE SERVICE SELECTION LIST LINKS ── */}
//               <div className="bg-white rounded-[14px] p-5 sm:p-6 lg:py-0 lg:pl-[30px] lg:pr-0 shadow-[0_16px_40px_-32px_rgba(15,29,58,0.3)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between overflow-hidden">
//                 <div className="w-full lg:w-[55%] flex flex-col">
//                   {SERVICES.map((s, i) => {
//                     const on = i === active;
//                     return (
//                       <div
//                         key={s.name}
//                         onClick={() => handleServiceSelect(i)}
//                         onMouseEnter={() => {
//                           if (
//                             typeof window !== "undefined" &&
//                             window.innerWidth >= 1024
//                           ) {
//                             setActive(i);
//                           }
//                         }}
//                         className="flex items-center justify-between gap-4 group cursor-pointer"
//                         style={{
//                           padding: "clamp(14px,1.5vw,15px) 0",
//                           borderBottom: `1px solid ${on ? "#243150" : "#E4E3DD"}`,
//                         }}
//                       >
//                         <span
//                           className="font-[family-name:var(--font-sora),sans-serif] text-[15px] sm:text-[17px] lg:text-[clamp(16px,1.3vw,19px)] whitespace-nowrap [transition:color_.35s_ease]"
//                           style={{
//                             color: on ? "#212121" : "#868686",
//                           }}
//                         >
//                           {s.name}
//                         </span>
//                         <span
//                           className="shrink-0 flex items-center justify-center rounded-full [transition:background_.35s_ease,border-color_.35s_ease,color_.35s_ease] w-[36px] h-[36px] lg:w-[clamp(38px,3vw,44px)] lg:h-[clamp(38px,3vw,44px)]"
//                           style={{
//                             background: on ? "#59624D" : "transparent",
//                             border: on
//                               ? "1px solid #59624D"
//                               : "1px solid #C9C6BD",
//                             color: on ? "#ffffff" : "#000000",
//                           }}
//                         >
//                           <HiArrowUpRight size={16} />
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* Decorative Graphics (Hidden completely on mobile layouts) */}
//                 <div className="hidden lg:flex items-end -ml-36 justify-end">
//                   <img
//                     src="/service.png"
//                     className="w-[100%] object-contain"
//                     alt=""
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <ServicesModal open={modalOpen} onClose={() => setModalOpen(false)} />
//     </>
//   );
// }

"use client";

import { useState } from "react";
import Link from "@/components/ui/Link";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "./ServicesData";
import ServicesModal from "./ServicesModal";
import Btn from "@/components/ui/Btn";
import ArrowUpRightIcon from "@/components/ui/ArrowUpRightIcon";
import { HiChevronDown } from "react-icons/hi2";

export default function Services() {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Controls which mobile accordion is open (defaults to index 0 so 1 is always open)
  const [mobileAccordion, setMobileAccordion] = useState<number>(0);

  const svc = SERVICES[active];

  // Switch accordion item, enforcing that at least one item stays open at all times
  const handleAccordionClick = (index: number) => {
    if (mobileAccordion !== index) {
      setMobileAccordion(index);
    }
  };

  return (
    <>
      <section className="relative w-full bg-[#F8F8F6] overflow-hidden">
        {/* Decorative background arcs
        <div className="absolute pointer-events-none rounded-full border border-[#24314E]/10 -top-[180px] left-[8%] w-[620px] h-[620px]" />
        <div className="absolute pointer-events-none rounded-full border border-[#24314E]/10 -bottom-[260px] right-[4%] w-[680px] h-[680px]" /> */}
        <div className="fix relative py-10! max-sm:py-6 px-4 sm:px-6 md:px-8 lg:px-0">
          {/* ========================================================= */}
          {/* MOBILE VIEW ACCORDION LAYOUT (< lg)                         */}
          {/* ========================================================= */}
          <div className="block lg:hidden w-full">
            {/* Mobile Header Card */}
            <div className="w-full bg-white rounded-[14px] p-5 mb-5 shadow-[0_16px_40px_-32px_rgba(15,29,58,0.3)]">
              {/* <div className="flex items-center gap-[9px] mb-3">
                <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-semibold text-[13px]">
                  //
                </span>
                <h5 className="text-[#59624D] font-normal text-[12px] uppercase tracking-[-0.24px] whitespace-nowrap">
                  OUR SERVICES
                </h5>
              </div> */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="section-title m-0 font-semibold text-[22px] sm:text-[32px] leading-[1.14] tracking-[-0.012em] text-[#212121]">
                  How We Create Value
                </h2>
                <div className="self-start sm:self-auto">
                  <Btn label="View More" onClick={() => setModalOpen(true)} />
                </div>
              </div>
            </div>

            {/* Mobile Accordion List */}
            <div className="flex flex-col gap-3">
              {SERVICES.map((s, index) => {
                const isOpen = mobileAccordion === index;

                return (
                  <div
                    key={s.name}
                    className="bg-white rounded-[14px] border border-[#E4E3DD] overflow-hidden shadow-[0_10px_30px_-20px_rgba(15,29,58,0.15)] transition-colors duration-300"
                  >
                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => handleAccordionClick(index)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-black/5 focus:outline-none cursor-pointer"
                    >
                      <span
                        className={`font-[family-name:var(--font-sora),sans-serif] text-[16px] sm:text-[18px] transition-colors duration-300 ${
                          isOpen
                            ? "font-semibold text-[#212121]"
                            : "font-medium text-[#777]"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span
                        className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#C9C6BD] text-[#212121] transition-all duration-500 ease-out ${
                          isOpen
                            ? "rotate-180 bg-[#59624D] text-white border-[#59624D]"
                            : ""
                        }`}
                      >
                        <HiChevronDown size={18} />
                      </span>
                    </button>

                    {/* Accordion Smooth Expandable Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                            opacity: { duration: 0.35, ease: "easeInOut" },
                          }}
                        >
                          <div className="p-4 sm:p-5 pt-0 border-t border-[#E4E3DD]">
                            {/* Service Image Block with Markers */}
                            <div className="relative w-full h-[220px] sm:h-[280px] rounded-[12px] overflow-hidden my-3 shadow-inner">
                              <img
                                src={s.src}
                                alt={s.name}
                                className="w-full h-full object-cover"
                              />

                              {/* Location Pins */}
                              {s.markers?.map((pin, pi) => (
                                <div
                                  key={pi}
                                  className="absolute [filter:drop-shadow(0_3px_5px_rgba(0,0,0,0.35))] -translate-x-1/2 -translate-y-full"
                                  style={{ left: pin.left, top: pin.top }}
                                >
                                  <svg
                                    width="22"
                                    height="28"
                                    viewBox="0 0 26 34"
                                    fill="none"
                                  >
                                    <path
                                      d="M13 0C5.8 0 0 5.8 0 13c0 9 13 21 13 21s13-12 13-21C26 5.8 20.2 0 13 0z"
                                      fill="#FFFFFF"
                                    />
                                    <circle
                                      cx="13"
                                      cy="13"
                                      r="4.6"
                                      fill="#3E5C2C"
                                    />
                                  </svg>
                                </div>
                              ))}
                            </div>

                            {/* Service Details */}
                            <div className="pt-2">
                              <h3 className="m-0 mb-2 font-semibold text-[17px] text-[#212121]">
                                {s.title}
                              </h3>
                              {s.paras.map((p, pi) => (
                                <p
                                  key={pi}
                                  className="m-0 mb-2 last:mb-0 font-inter font-normal text-[13px] sm:text-[14px] leading-[1.5] text-[#555]"
                                >
                                  {p}
                                </p>
                              ))}
                              <div className="mt-3">
                                <Btn
                                  label="Learn More"
                                  href={s.href}
                                  className="py-2.5 px-5 text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* DESKTOP VIEW LAYOUT (>= lg)                                */}
          {/* ========================================================= */}
          <div className="hidden lg:flex flex-col lg:flex-row gap-[clamp(18px,2vw,28px)] items-stretch">
            {/* LEFT COLUMN: Image Panel + Glass Overlay Description */}
            <div className="relative overflow-hidden w-full lg:[flex:1_1_34%] min-w-[280px] rounded-[18px] min-h-[380px] sm:min-h-[460px] lg:min-h-[clamp(360px,38vw,548px)] shadow-md">
              {SERVICES.map((s, i) => (
                <img
                  key={s.name}
                  src={s.src}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover block [transition:opacity_.7s_ease,transform_1.2s_ease]"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "scale(1)" : "scale(1.04)",
                  }}
                />
              ))}

              {/* Location pins */}
              <AnimatePresence>
                {svc.markers.map((pin, pi) => (
                  <motion.div
                    key={`${active}-${pi}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute [filter:drop-shadow(0_3px_5px_rgba(0,0,0,0.35))] -translate-x-1/2 -translate-y-full"
                    style={{ left: pin.left, top: pin.top }}
                  >
                    <svg width="26" height="34" viewBox="0 0 26 34" fill="none">
                      <path
                        d="M13 0C5.8 0 0 5.8 0 13c0 9 13 21 13 21s13-12 13-21C26 5.8 20.2 0 13 0z"
                        fill="#FFFFFF"
                      />
                      <circle cx="13" cy="13" r="4.6" fill="#3E5C2C" />
                    </svg>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Dynamic Glass overlay description panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute rounded-[16px] bg-[linear-gradient(160deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.50)_100%)] backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)] border border-[rgba(255,255,255,0.45)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]"
                  style={{
                    left: "clamp(12px,1.6vw,22px)",
                    right: "clamp(12px,1.6vw,22px)",
                    bottom: "clamp(12px,1.6vw,22px)",
                    padding: "clamp(16px,1.9vw,28px)",
                  }}
                >
                  <h3 className="m-0 mb-2 font-semibold text-[17px] sm:text-[19px] lg:text-[clamp(18px,1.5vw,20px)] text-[#fff]">
                    {svc.title}
                  </h3>

                  {svc.paras.map((p, pi) => (
                    <p
                      key={pi}
                      className="m-0 mb-2 last:mb-0 font-inter font-normal text-[13px] sm:text-[14px] lg:text-[clamp(13px,1.04vw,14px)] leading-[1.5] text-[#fff]"
                    >
                      {p}
                    </p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: Desktop Layout */}
            <div className="w-full lg:[flex:1_1_60%] min-w-[300px] flex flex-col gap-[clamp(16px,1.6vw,22px)]">
              {/* Top heading card */}
              <div className="bg-white rounded-[14px] p-5 shadow-[0_16px_40px_-32px_rgba(15,29,58,0.3)]">
                {/* <div className="flex items-center gap-[9px] mb-[clamp(14px,1.4vw,20px)]">
                  <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-semibold text-[13px]">
                    //
                  </span>
                  <h5 className="text-[#59624D] font-normal text-[12px] uppercase tracking-[-0.24px] whitespace-nowrap">
                    OUR SERVICES
                  </h5>
                </div> */}
                <div className="flex justify-between items-center">
                  <h2 className="section-title m-0 font-semibold text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.012em] text-[#212121]">
                    How We Create Value
                  </h2>
                  <Btn label="View More" href="/solutions" />
                </div>
              </div>

              {/* Bottom interactive service selection list links */}
              <div className="bg-white rounded-[14px] p-5 sm:p-6 lg:py-0 lg:pl-[30px] lg:pr-0 shadow-[0_16px_40px_-32px_rgba(15,29,58,0.3)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between overflow-hidden">
                <div className="w-full lg:w-[55%] flex flex-col">
                  {SERVICES.map((s, i) => {
                    const on = i === active;
                    return (
                      <Link
                        key={s.name}
                        href={s.href}
                        onMouseEnter={() => {
                          if (
                            typeof window !== "undefined" &&
                            window.innerWidth >= 1024
                          ) {
                            setActive(i);
                          }
                        }}
                        className="flex items-center justify-between gap-4 group cursor-pointer"
                        style={{
                          padding: "clamp(14px,1.5vw,15px) 0",
                          borderBottom: `1px solid ${on ? "#243150" : "#E4E3DD"}`,
                        }}
                      >
                        <span
                          className="font-[family-name:var(--font-sora),sans-serif] text-[15px] sm:text-[17px] lg:text-[clamp(16px,1.3vw,19px)] whitespace-nowrap [transition:color_.35s_ease]"
                          style={{
                            color: on ? "#212121" : "#868686",
                          }}
                        >
                          {s.name}
                        </span>
                        <span
                          className="shrink-0 flex items-center justify-center rounded-full [transition:background_.35s_ease,border-color_.35s_ease,color_.35s_ease] w-[36px] h-[36px] lg:w-[clamp(38px,3vw,44px)] lg:h-[clamp(38px,3vw,44px)]"
                          style={{
                            background: on ? "#59624D" : "#ffffff",
                            color: on ? "#ffffff" : "#59624D",
                          }}
                        >
                          <ArrowUpRightIcon size={16} />
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Decorative Graphics */}
                <div className="hidden lg:flex items-end -ml-36 justify-end">
                  <img
                    src="/service.png"
                    className="w-[100%] object-contain"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ServicesModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
