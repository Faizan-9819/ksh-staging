// "use client";
// import { useEffect, useRef, useState, useCallback } from "react";
// import { createPortal } from "react-dom";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   useMotionValueEvent,
//   useTransform,
// } from "framer-motion";
// import Image from "next/image";
// import { GoArrowUpRight } from "react-icons/go";
// import { X } from "lucide-react";
// import {
//   subscribeLenisScroll,
//   stopLenis,
//   startLenis,
// } from "@/components/ui/LenisProvider";

// interface InvestorItem {
//   name: string;
//   src: string;
//   title: string;
//   desc: string[];
// }

// const investors: InvestorItem[] = [
//   {
//     name: "IndoSpace",
//     src: "/Investor/indo.jpg",
//     title: "90:10 JV Partnership – 2022 – ongoing*",
//     desc: [
//       "1.5 Mn. Sq. Ft. – Developed under KSH INFRA Brand",
//       "Indospace holds 90% stake, will become fully operational by Q2FY27",
//     ],
//   },
//   {
//     name: "WSB",
//     src: "/Investor/wsb.jpg",
//     title:
//       "74:26 JV Partnership (along with 20 co-investors) – 2024 – ongoing*",
//     desc: ["1.3 Mn. Sq. Ft. – 1st Park in Bengaluru", "WSB holds 74% stake"],
//   },
// ];

// const newInvestors: InvestorItem[] = [
//   {
//     name: "Mapletree Industrial",
//     src: "/Investor/GrowthWithKSHInfra/growth1.png",
//     title: "Forward Sale Transaction – 2019 - 2022",
//     desc: [
//       "1.2 Mn. Sq. Ft. – Developed & Leased",
//       "Completed during peak COVID-19",
//     ],
//   },
//   {
//     name: "Morgan Stanley",
//     src: "/Investor/GrowthWithKSHInfra/growth2.png",
//     title: "Core Asset Divestment – 2019 - 2021",
//     desc: [
//       "1 Mn. Sq. Ft. – Designed, Developed & Leased",
//       "Divested 95% to Morgan Stanley in 2018 post stabilization",
//     ],
//   },
//   {
//     name: "Pacific Century Group",
//     src: "/Investor/GrowthWithKSHInfra/growth3.png",
//     title: "JV with KSH INFRA – 2007 - 2019",
//     desc: [
//       "Invested in KSH's first two industrial parks (1 Mn. Sq. Ft.)",
//       "Invested in KSH Distriparks as well; partners for 11+ years",
//     ],
//   },
// ];

// export default function ExistingInvestorsSection() {
//   return (
//     <>
//       <DesktopExistingInvestors />
//       <MobileExistingInvestors />
//     </>
//   );
// }

// function DesktopExistingInvestors() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const scrollYProgress = useMotionValue(0);

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const computeProgress = () => {
//       const rect = el.getBoundingClientRect();
//       const total = rect.height - window.innerHeight;
//       if (total <= 0) return 0;
//       const raw = -rect.top / total;
//       return Math.min(1, Math.max(0, raw));
//     };

//     scrollYProgress.set(computeProgress());

//     const unsubscribeLenis = subscribeLenisScroll(() => {
//       scrollYProgress.set(computeProgress());
//     });

//     // Fallback so this still works before Lenis mounts / if it's ever removed.
//     const onScroll = () => scrollYProgress.set(computeProgress());
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll);

//     return () => {
//       unsubscribeLenis();
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//     };
//   }, [scrollYProgress]);

//   /* Sequential crossfade with a hard buffer in the middle so the outgoing
//      and incoming sets are never simultaneously visible:
//        0.00 -> 0.35 : Existing fully visible
//        0.35 -> 0.45 : Existing fades out (opacity 1 -> 0, y 0 -> -24)
//        0.45 -> 0.55 : buffer — both sets held at opacity 0
//        0.55 -> 0.65 : Past fades in (opacity 0 -> 1, y 24 -> 0)
//        0.65 -> 1.00 : Past fully visible
//      useTransform clamps outside its input range by default, so each set
//      stays pinned at 0/1 past its window instead of drifting back up. */
//   const existingOpacity = useTransform(
//     scrollYProgress,
//     [0, 0.35, 0.45],
//     [1, 1, 0],
//   );
//   const existingPointerEvents = useTransform(scrollYProgress, (val) =>
//     val > 0.45 ? "none" : "auto",
//   );

//   const pastOpacity = useTransform(scrollYProgress, [0.55, 0.65, 1], [0, 1, 1]);
//   const pastPointerEvents = useTransform(scrollYProgress, (val) =>
//     val < 0.55 ? "none" : "auto",
//   );

//   const [activeSlide, setActiveSlide] = useState(0);
//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     setActiveSlide(latest < 0.5 ? 0 : 1);
//   });

//   return (
//     <section
//       ref={containerRef}
//       className="hidden lg:block relative h-[200vh] bg-[#fbf5ee] text-[#1a1a1a]"
//     >
//       <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
//         <div className="w-full fix flex flex-row items-center justify-between">
//           {/* Left Column: Titles & Pagination */}
//           <div className="w-[40%] flex flex-col justify-center relative min-h-[180px]">
//             <div className="relative min-h-[130px] md:min-h-[176px]">
//               {/* Existing Investors Heading */}
//               <motion.h2
//                 style={{
//                   opacity: existingOpacity,
//                   pointerEvents: existingPointerEvents,
//                   willChange: "opacity, transform",
//                 }}
//                 className="absolute inset-0 font-sora font-semibold text-[#212121] tracking-[-1.6px] leading-[1.1] text-[clamp(32px,5.5vw,80px)]"
//               >
//                 Existing <br /> Investors
//               </motion.h2>

//               {/* Past Investors Heading */}
//               <motion.h2
//                 style={{
//                   opacity: pastOpacity,
//                   pointerEvents: pastPointerEvents,
//                   willChange: "opacity, transform",
//                 }}
//                 className="absolute inset-0 font-sora font-semibold text-[#212121] tracking-[-1.6px] leading-[1.1] text-[clamp(32px,5.5vw,80px)]"
//               >
//                 Past <br /> Investors
//               </motion.h2>
//             </div>

//             {/* Pagination Dots — matches Insights section's slider dots */}
//             <div className="mt-48 flex items-center gap-2">
//               {[0, 1].map((i) => {
//                 const isActive = i === activeSlide;
//                 return (
//                   <span
//                     key={i}
//                     className={`h-2 rounded-full transition-all duration-300 ${
//                       isActive
//                         ? "w-10 bg-[#5D5D5D]"
//                         : "w-3 border border-[#5D5D5D]/30 bg-transparent"
//                     }`}
//                   />
//                 );
//               })}
//             </div>
//           </div>

//           <div className="w-[60%] relative items-end min-h-[320px]">
//             <motion.div
//               style={{
//                 opacity: existingOpacity,
//                 pointerEvents: existingPointerEvents,
//                 willChange: "opacity, transform",
//               }}
//               className="absolute inset-0 flex flex-wrap justify-start items-start! gap-[20px] content-end"
//             >
//               {investors.map((investor) => (
//                 <InvestorCard key={investor.name} investor={investor} />
//               ))}
//             </motion.div>

//             {/* Past Investors Cards */}
//             <motion.div
//               style={{
//                 opacity: pastOpacity,
//                 pointerEvents: pastPointerEvents,
//                 willChange: "opacity, transform",
//               }}
//               className="absolute inset-0 flex flex-wrap justify-start gap-[20px]"
//             >
//               {newInvestors.map((investor) => (
//                 <InvestorCard key={investor.name} investor={investor} />
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function InvestorCard({ investor }: { investor: InvestorItem }) {
//   return (

//     <div className="group relative w-[calc(50%-80px)] h-[300px] xl:h-[220px] rounded-[24px] cursor-pointer overflow-hidden select-none bg-white">
//       {/* Front: logo */}
//       <div className="absolute inset-0 w-full h-full flex items-center justify-center p-8">
//         <div className="relative w-full h-full">
//           <Image
//             src={investor.src}
//             alt={investor.name}
//             fill
//             className="object-contain opacity-80 transition-all duration-300"
//           />
//         </div>
//       </div>

//       {/* Hover overlay: name, title, desc bullets */}
//       <div
//         className="absolute inset-0 w-full h-full rounded-[24px] p-6 xl:py-8 flex flex-col items-center justify-center text-center transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
//         style={{
//           background:
//             "radial-gradient(circle at center, #F7F4EC 0%, #E3DDD0 45%, rgba(197, 189, 172, 1) 100%)",
//         }}
//       >
//         <h3 className="font-[family-name:var(--font-sora),sans-serif] font-semibold text-[17px] xl:text-[20px] leading-[1.25] text-[#212121] tracking-[-0.01em] mb-3.5 text-left!">
//           {investor.title}
//         </h3>

//         <ul className="space-y-1.5 w-full flex flex-col items-start! text-left!">
//           {investor.desc.map((line, i) => (
//             <li
//               key={i}
//               className="flex gap-1.5 text-[12px] xl:text-[13px] w-full justify-start! leading-[1.4] text-[#4A4A4A]"
//             >
//               <span className="text-[#59624D] shrink-0">➢</span>
//               <span>{line}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// function MobileExistingInvestors() {
//   return (
//     <section className="lg:hidden w-full bg-[#fbf5ee] text-[#1a1a1a] py-16 sm:py-20">
//       <div className="fix flex flex-col gap-14">
//         <MobileInvestorGroup heading="Existing Investors" items={investors} />
//         <MobileInvestorGroup heading="Past Investors" items={newInvestors} />
//       </div>
//     </section>
//   );
// }

// function MobileInvestorGroup({
//   heading,
//   items,
// }: {
//   heading: string;
//   items: InvestorItem[];
// }) {
//   return (
//     <div>
//       <h2 className="font-sora font-semibold text-[#212121] tracking-[-1px] text-[clamp(28px,8vw,40px)] leading-[1.1] mb-6">
//         {heading}
//       </h2>
//       <div className="grid grid-cols-2 gap-4">
//         {items.map((investor) => (
//           <MobileInvestorCard key={investor.name} investor={investor} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function MobileInvestorCard({ investor }: { investor: InvestorItem }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!isModalOpen) return;
//     stopLenis();
//     return () => startLenis();
//   }, [isModalOpen]);

//   const openModal = useCallback(() => setIsModalOpen(true), []);
//   const closeModal = useCallback(() => setIsModalOpen(false), []);

//   return (
//     <>
//       <div
//         onClick={openModal}
//         className="group relative w-full h-[160px] lg:h-[200px] rounded-[20px] cursor-pointer overflow-hidden select-none bg-white flex flex-col items-center justify-between p-4"
//       >
//         <div className="relative w-full flex-1">
//           <Image
//             src={investor.src}
//             alt={investor.name}
//             fill
//             className="object-contain opacity-80"
//           />
//         </div>

//         <div className="flex justify-between items-center w-full border-t border-black/10 pt-2 gap-x-2">
//           <span className="text-[#212121] text-[11px] font-semibold tracking-wide uppercase text-left truncate">
//             {investor.name}
//           </span>
//           <GoArrowUpRight size={16} className="shrink-0 text-[#212121]" />
//         </div>
//       </div>

//       {mounted &&
//         createPortal(
//           <AnimatePresence>
//             {isModalOpen && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3, ease: "easeInOut" }}
//                 className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
//                 onClick={closeModal}
//               >
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.92, y: 10 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.92, y: 10 }}
//                   transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//                   onClick={(e) => e.stopPropagation()}
//                   data-lenis-prevent
//                   className="relative w-full max-w-[380px] max-h-[85vh] overflow-y-auto rounded-[28px] p-6 sm:p-8 flex flex-col items-center text-center"
//                   style={{
//                     background:
//                       "radial-gradient(circle at center, #F7F4EC 0%, #E3DDD0 50%, rgba(197, 189, 172, 1) 100%)",
//                   }}
//                 >
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-[#212121] transition-colors"
//                     aria-label="Close details"
//                   >
//                     <X size={20} />
//                   </button>

//                   <div className="relative w-full h-[120px] my-3">
//                     <Image
//                       src={investor.src}
//                       alt={investor.name}
//                       fill
//                       className="object-contain"
//                     />
//                   </div>

//                   <h3 className="font-[family-name:var(--font-sora),sans-serif] text-start! font-semibold text-[17px] leading-[1.25] text-[#212121] tracking-[-0.01em] mb-1.5 mt-1">
//                     {investor.name}
//                   </h3>
//                   <p className="font-medium text-[13px] text-left! leading-[1.4] text-[#59624D] mb-3">
//                     {investor.title}
//                   </p>
//                   <ul className="space-y-1.5 text-left w-full">
//                     {investor.desc.map((line, i) => (
//                       <li
//                         key={i}
//                         className="flex gap-1.5 text-[13px] leading-[1.5] text-[#3D3D3D]"
//                       >
//                         <span className="text-[#59624D] shrink-0">➢</span>
//                         <span>{line}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>,
//           document.body,
//         )}
//     </>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { stopLenis, startLenis } from "@/components/ui/LenisProvider";
import { div } from "framer-motion/client";

interface InvestorItem {
  logo: string;
  name: string;
  place: string;
  lines: string[];
  tag: string;
}

const PRIOR_INVESTMENTS_DISCLAIMER =
  " The partners mentioned above are from prior investments for KSH INFRA and are not current investors in KSH INFRA Fund I.";

// Shown once, after both the Existing and Past Investors groups.
export function InvestorsDisclaimer() {
  return (
    <div>
      <div className="pb-14 lg:pb-10 border-b-2 border-gray-300"></div>
      <p className="text-center text-[12px] mt-10 leading-[1.5] text-[#868686]">
        <span className="font-semibold text-[#868686]">Disclaimer:</span>{" "}
        {PRIOR_INVESTMENTS_DISCLAIMER}
      </p>
    </div>
  );
}

const investors: InvestorItem[] = [
  {
    logo: "logo-indospace.png",
    name: "IndoSpace",
    place: "Singapore",
    lines: [
      "90:10 JV partnership for Chakan Park III",
      "1.5 Mn. Sq. Ft. developed and leased under the KSH INFRA brand",
      "Expected IRR of >30%",
    ],
    tag: "Fully operational",
  },
  {
    logo: "logo-wsb.png",
    name: "WSB Real Estate Partners",
    place: "India",
    lines: [
      "74:26 JV partnership for Hosur Park I, along with 19 co-investors",
      "1.3 Mn. Sq. Ft. in Hosur near Bengaluru",
    ],
    tag: "Under development",
  },
];

const newInvestors: InvestorItem[] = [
  {
    logo: "logo-mapletree.png",
    name: "Mapletree",
    place: "Singapore",
    lines: [
      "Forward sale transaction for Chakan Park II",
      "1.2 Mn. Sq. Ft. developed and leased. Completed during peak COVID-19.",
    ],
    tag: "Successfully exited",
  },
  {
    logo: "logo-morgan-stanley.png",
    name: "Morgan Stanley Real Estate Investing",
    place: "USA",
    lines: [
      "Core asset divestment",
      "95:5 JV partnership in operating assets for Chakan Park I",
      "30% IRR at exit",
    ],
    tag: "Successfully exited",
  },
  {
    logo: "logo-pacific-century.png",
    name: "Pacific Century Group",
    place: "Hong Kong",
    lines: [
      "Strategic Long Term JV including Chakan Park I",
      "Invested in KSH's first two industrial parks (1 Mn. Sq. Ft.)",
      "11+ years partnership with 23% exit IRR",
    ],
    tag: "Long Term partnership",
  },
];

export default function ExistingInvestorsSection() {
  const [selected, setSelected] = useState<InvestorItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!selected) return;
    stopLenis();
    return () => startLenis();
  }, [selected]);

  return (
    <>
      <DesktopExistingInvestors onSelect={setSelected} />
      <MobileExistingInvestors onSelect={setSelected} />

      {mounted &&
        createPortal(
          <AnimatePresence>
            {selected && (
              <InvestorPopup
                key="investor-popup"
                investor={selected}
                onClose={() => setSelected(null)}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function DesktopExistingInvestors({
  onSelect,
}: {
  onSelect: (investor: InvestorItem) => void;
}) {
  return (
    // e9c79e
    <section className="hidden lg:block relative border-b-1 border-[#d6d1c0] bg-[#fbf5ee] text-[#1a1a1a] py-24">
      <div className="fix flex flex-col gap-20">
        <DesktopInvestorGroup
          heading="Existing Investors"
          items={investors}
          onSelect={onSelect}
          withDivider
        />
        <DesktopInvestorGroup
          heading="Past Investors"
          items={newInvestors}
          onSelect={onSelect}
        />
        <InvestorsDisclaimer />
      </div>
    </section>
  );
}

function DesktopInvestorGroup({
  heading,
  items,
  onSelect,
  withDivider = false,
}: {
  heading: string;
  items: InvestorItem[];
  onSelect: (investor: InvestorItem) => void;
  withDivider?: boolean;
}) {
  return (
    <div
      className={`w-full flex flex-row items-start justify-between gap-10 ${
        withDivider ? "border-b-2 border-gray-300 pb-20" : ""
      }`}
    >
      <h2 className="w-[35%] shrink-0 font-sora font-semibold text-[#212121] tracking-[-1.2px] leading-[1.1] text-[clamp(32px,3.2vw,56px)]">
        {heading}
      </h2>

      <div className="w-[60%] flex flex-wrap justify-start items-start gap-5">
        {items.map((investor) => (
          <InvestorCard
            key={investor.name}
            investor={investor}
            onSelect={onSelect}
            className="w-[calc(50%-10px)] h-[220px]"
          />
        ))}
      </div>
    </div>
  );
}

// Matches the accent-card background used on the Fund Snapshot section
// (components/AifComponents/FundDetails/FundSnapshot.tsx) so both places
// share the same beige diagonal-sheen look.
const CARD_BG_STYLE = {
  backgroundColor: "#c5bdac",
  backgroundImage:
    "linear-gradient(152deg, rgba(219,212,195,0) 40%, rgba(219,212,195,.75) 50%, rgba(219,212,195,0) 60%), linear-gradient(152deg, rgba(219,212,195,0) 58%, rgba(219,212,195,.6) 68%, rgba(219,212,195,0) 78%)",
};

function InvestorCard({
  investor,
  onSelect,
  className = "",
}: {
  investor: InvestorItem;
  onSelect: (investor: InvestorItem) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(investor)}
      className={`group relative flex flex-col cursor-pointer items-center overflow-hidden rounded-[20px] bg-white p-4 lg:p-8 shadow-[inset_0_0_0_1px_#e9e9e9] ${className}`}
    >
      <div className="flex flex-1 min-h-0 w-full items-center justify-center overflow-hidden">
        <img
          src={`/aif/overview/${investor.logo}`}
          alt={investor.name}
          className="h-auto max-h-[180px] w-auto max-w-full scale-150 object-contain transition-transform duration-300 group-hover:scale-[1.65] lg:scale-100 lg:group-hover:scale-110"
        />
      </div>
      <div className="mt-1 lg:mt-2 w-full shrink-0 text-center font-sora text-[10px] lg:text-xs uppercase tracking-[-0.02em] text-[#59624D]">
        {investor.tag}
      </div>
      <img
        src="/aif/Expand1.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-4 right-4 h-6 w-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:h-9 lg:w-9"
      />
    </button>
  );
}

function MobileExistingInvestors({
  onSelect,
}: {
  onSelect: (investor: InvestorItem) => void;
}) {
  return (
    <section className="lg:hidden w-full bg-[#fbf5ee] text-[#1a1a1a] py-16 sm:py-20">
      <div className="fix flex flex-col gap-14">
        <MobileInvestorGroup
          heading="Existing Investors"
          items={investors}
          onSelect={onSelect}
          withDivider
        />
        <MobileInvestorGroup
          heading="Past Investors"
          items={newInvestors}
          onSelect={onSelect}
        />
        <InvestorsDisclaimer />
      </div>
    </section>
  );
}

function MobileInvestorGroup({
  heading,
  items,
  onSelect,
  withDivider = false,
}: {
  heading: string;
  items: InvestorItem[];
  onSelect: (investor: InvestorItem) => void;
  withDivider?: boolean;
}) {
  return (
    <div className={withDivider ? "border-b-2 border-gray-300 pb-14" : ""}>
      <h2 className="font-sora font-semibold text-[#212121] tracking-[-1px] text-[clamp(28px,8vw,40px)] leading-[1.1] mb-6">
        {heading}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((investor) => (
          <InvestorCard
            key={investor.name}
            investor={investor}
            onSelect={onSelect}
            className="w-full h-[120px]"
          />
        ))}
      </div>
    </div>
  );
}

function InvestorPopup({
  investor,
  onClose,
}: {
  investor: InvestorItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999999999999] flex items-center justify-center bg-black/60 p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.96 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={CARD_BG_STYLE}
        className="relative w-full max-w-[600px] max-h-[85vh] overflow-hidden rounded-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
      >
        {/* Close Button — stays pinned outside the scroll area */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-[#F5F5F5] text-[#A8A8A8] transition-colors hover:bg-[#EBEBEB] lg:right-6 lg:top-6"
        >
          <X size={18} />
        </button>

        {/* Scrollable content — the outer card's overflow-hidden + rounded
            corners clip this box's native scrollbar to match, otherwise the
            (rectangular) scrollbar track pokes out past the rounded corners. */}
        <div
          className="popup-scrollbar my-3 max-h-[calc(85vh-24px)] overflow-y-auto px-6 pt-16 pb-8 lg:px-10 lg:py-10"
          data-lenis-prevent
        >
          {/* Name */}
          <h2 className="text-[26px] font-medium leading-[140%] text-[#212121] lg:text-[30px]">
            {investor.name}
          </h2>

          {/* Place */}
          <p className="mt-2 text-[15px] font-medium leading-[140%] text-[#59624D] lg:text-[17px]">
            {investor.place}
          </p>

          {/* Details */}
          <ul className="mt-5 space-y-2 text-left">
            {investor.lines.map((line, i) => (
              <li
                key={i}
                className="flex gap-2 text-[15px] leading-[1.6] text-[#3F3F3F]"
              >
                <span className="shrink-0 text-[#59624D]">➢</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 inline-block font-sora text-xs uppercase tracking-[-0.02em] text-[#59624D]">
            {investor.tag}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
