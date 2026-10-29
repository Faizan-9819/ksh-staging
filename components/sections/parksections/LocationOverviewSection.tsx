// "use client";

// function Eyebrow() {
//   return (
//     <div className="flex items-center gap-[6px]">
//       <svg
//         width="14"
//         height="10"
//         viewBox="0 0 14 10"
//         fill="none"
//         className="shrink-0"
//       >
//         <path d="M0 5h12M8 1l4 4-4 4" stroke="#59624d" strokeWidth="1.2" />
//       </svg>
//       <p className="font-sora font-normal text-[9.6px] tracking-[-0.192px] uppercase text-[#59624d] m-0">
//         An Integrated Industrial Infrastructure Platform
//       </p>
//     </div>
//   );
// }

// export default function LocationOverviewSection() {
//   return (
//     <section
//       id="location-overview"
//       className="relative w-full bg-white overflow-hidden py-[48px] lg:py-[68px]"
//       data-name="Location Overview Section"
//     >
//       <div className="fix relative flex flex-col gap-[40px]">
//         <div className="flex flex-col gap-[24px]">
//           <Eyebrow />
//           <h2 className="font-sora font-semibold text-[28px] sm:text-[32px] lg:text-[38.4px] tracking-[-0.768px] text-[#212121] m-0">
//             Chakan: A Thriving Industrial Hub in Pune
//           </h2>
//         </div>

//         <div className="flex flex-col lg:flex-row items-start justify-between gap-[40px] lg:gap-[24px]">
//           {/* Left column — image */}
//           <div className="relative w-fit rounded-[20px] overflow-hidden shrink-0">
//             <img
//               src="/park/overviewimg.webp"
//               alt="KSH Chakan Park overview"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Right column — text */}
//           <div className="flex flex-col gap-[8px] w-full lg:max-w-[520px] font-inter font-medium text-[16px] lg:text-[19.2px] leading-[1.4]">
//             <p className="text-[#212121] m-0">
//               Chakan, located near Pune, is one of India&rsquo;s fastest-growing
//               integrated industrial zones, strategically developed by MIDC as a
//               key manufacturing and logistics corridor. Home to global
//               automotive giants like Volkswagen, Mahindra &amp; Mahindra,
//               Bridgestone, Bajaj Auto, and Mercedes Benz, it offers ready
//               infrastructure, robust connectivity, and a growing talent pool.
//             </p>
//             <p className="text-[#bdaea6] m-0">
//               With metro connectivity and rapid social infrastructure underway,
//               Chakan is set to become a benchmark for modern industrial
//               development. KSH INFRA&rsquo;s parks in Chakan further reinforce
//               its position as a central hub driving India&rsquo;s industrial
//               growth.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { useDialogA11y } from "@/components/ui/useDialogA11y";
import { motion, AnimatePresence } from "framer-motion";
import { stopLenis, startLenis } from "@/components/ui/LenisProvider";

export interface MediaItem {
  type: "image" | "video";
  src: string;
}

export interface PopupTab {
  id: string;
  label: string;
  media: MediaItem;
}

export interface LocationOverviewContent {
  eyebrow: string;
  heading: string;
  image: string;
  imageAlt: string;
  paragraph1: string;
  paragraph2: string;
  popupTabs: PopupTab[];
}

const DEFAULT_CONTENT: LocationOverviewContent = {
  eyebrow: "Park Highlights",
  heading: "Chakan: A Thriving Industrial Hub in Pune",
  image: "/park/overviewimg.webp",
  imageAlt: "KSH Chakan Park overview",
  paragraph1:
    "Chakan, located near Pune, is one of India’s fastest-growing integrated Industrial zones, strategically developed by MIDC as a key manufacturing and Logistics corridor. Home to global automotive giants like Volkswagen, Mahindra & Mahindra, Bridgestone, Bajaj Auto, and Mercedes Benz, it offers ready infrastructure, robust connectivity, and a growing talent pool. With metro connectivity and rapid social infrastructure underway, Chakan is set to become a benchmark for modern Industrial development. KSH INFRA’s parks in Chakan further reinforce its position as a central hub driving India’s Industrial growth.",
  // paragraph2:
  //   "With metro connectivity and rapid social infrastructure underway, Chakan is set to become a benchmark for modern industrial development. KSH INFRA&rsquo;s parks in Chakan further reinforce its position as a central hub driving India&rsquo;s industrial growth.",
  popupTabs: [
    {
      id: "ksh-infra-parks",
      label: "KSH INFRA Parks",
      media: {
        type: "image",
        src: "/park/parks.webp",
      },
    },
    {
      id: "notable-industries",
      label: "Notable Industries",
      media: {
        type: "image",
        src: "/ParkPage/chakan-4/chib.webp",
      },
    },
    {
      id: "connectivity",
      label: "Connectivity",
      media: {
        type: "image",
        src: "/ParkPage/chakan-4/ccb.webp",
      },
    },
  ],
};

// Helper to determine if a URL/media is a video
const isVideoFile = (media: MediaItem): boolean => {
  if (media.type === "video") return true;
  return /\.(mp4|webm|ogg|mov)$/i.test(media.src);
};

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#59624d] font-mono text-sm tracking-widest uppercase">
        //
      </span>
      <p
        className="font-sora font-normal text-[12px] tracking-[-0.24px] uppercase text-[#59624d] m-0"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

export default function LocationOverviewSection({
  content = DEFAULT_CONTENT,
}: {
  content?: LocationOverviewContent;
} = {}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTabId, setActiveTabId] = useState<string>(
    content.popupTabs[0].id,
  );
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const openModal = (tabId?: string) => {
    setActiveTabId(tabId || content.popupTabs[0].id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMobileDropdownOpen(false);
  };
  useDialogA11y(dialogRef, isOpen, closeModal);

  useEffect(() => {
    // Early-return guard rather than an if/open-else-closed startLenis() —
    // that shape calls startLenis() twice for one stopLenis() (once from
    // the close transition's own body, again from the prior render's
    // cleanup), which can zero out a completely unrelated lock still held
    // elsewhere (e.g. the navbar's open mobile menu/dropdown) and resume
    // scroll while that overlay is still up.
    if (!isOpen) return;
    stopLenis();
    return () => startLenis();
  }, [isOpen]);

  const activeTab =
    content.popupTabs.find((tab) => tab.id === activeTabId) ||
    content.popupTabs[0];

  return (
    <section
      id="location-overview"
      className="relative w-full bg-white overflow-hidden py-[48px] lg:py-[68px]"
      data-name="Location Overview Section"
    >
      <div className="fix relative flex flex-col gap-[40px]">
        {/* <div className="flex flex-col gap-[20px]">
          <Eyebrow text={content.eyebrow} />
          <h2
            className="font-sora font-semibold text-[28px] sm:text-[38px] lg:text-[48px] tracking-[-0.96px] text-[#212121] m-0"
            dangerouslySetInnerHTML={{ __html: content.heading }}
          />
        </div> */}
        <h2 className="sr-only">Park Highlights</h2>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-[40px] lg:gap-[24px]">
          {/* Left column — image (Clickable trigger for popup) */}
          <div
            onClick={() => openModal()}
            className="relative w-fit rounded-[20px] lg:w-[40%] overflow-hidden shrink-0 cursor-pointer group"
          >
            <img
              src={content.image}
              alt={content.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="w-full flex justify-end -mt-10 relative z-[400]">
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
                className="py-3 border rounded-4xl px-7 cursor-pointer! hover:bg-[#59624D] transition-all duration-[300ms] border-[#59624D] text-[#59624D] hover:text-[#ffffff]">
                View Overview
              </button>
            </div>
          </div>

          {/* Right column — text */}
          <div className="flex flex-col gap-[10px] w-full lg:max-w-[650px] font-inter font-medium text-[16px] sm:text-[20px] lg:text-[24px] leading-[1.4]">
            <p
              className="text-[#212121] m-0"
              dangerouslySetInnerHTML={{ __html: content.paragraph1 }}
            />
            <p
              className="text-[#bdaea6] m-0"
              dangerouslySetInnerHTML={{ __html: content.paragraph2 }}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Modal Popup matched to Screenshot Design */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[8000]! flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Park overview"
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-white rounded-3xl px-3 pb-5 pt-16 sm:p-8 shadow-2xl z-[8000]! flex flex-col gap-6 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-5 lg:right-8 top-5 lg:top-9 z-50 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                {/*  */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {/* Header with Switcher & Close Button */}
              <div className="relative flex items-center justify-center w-full min-h-[40px]">
                {/* Tabs Switcher — pill buttons from sm upward */}
                <div className="hidden sm:flex items-center justify-center gap-3">
                  {content.popupTabs.map((tab) => (
                    <button
                      type="button"
                      key={tab.id}
                      aria-pressed={activeTabId === tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-sora font-medium transition-all duration-200 cursor-pointer ${
                        activeTabId === tab.id
                          ? "bg-[#59624d] text-white shadow-sm underline underline-offset-4"
                          : "border border-[#9e9e9e]/60 text-[#616161] hover:border-[#59624d] bg-white"
                      }`}
                      dangerouslySetInnerHTML={{ __html: tab.label }}
                    />
                  ))}
                </div>

                {/* Custom green dropdown below sm, matching the map section's mobile selector */}
                <div className="relative w-full sm:hidden px-8">
                  <button
                    type="button"
                    aria-expanded={mobileDropdownOpen}
                    onClick={() => setMobileDropdownOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-5 py-2.5 text-xs font-sora font-medium cursor-pointer rounded-full bg-[#59624d] text-white shadow-sm"
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: activeTab.label }}
                    />
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      className={`shrink-0 transition-transform duration-200 ${
                        mobileDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {mobileDropdownOpen && (
                    <div className="absolute left-8 right-8 top-full mt-2 z-30 overflow-hidden rounded-[20px] border border-[#59624d]/20 bg-white shadow-lg">
                      {content.popupTabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTabId(tab.id);
                            setMobileDropdownOpen(false);
                          }}
                          className={`w-full flex items-center px-5 py-3 text-xs font-sora font-medium transition-colors duration-200 cursor-pointer ${
                            activeTabId === tab.id
                              ? "bg-[#59624d] text-white"
                              : "text-[#616161] hover:bg-[#59624d]/10"
                          }`}
                          dangerouslySetInnerHTML={{ __html: tab.label }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Media Container */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[1154/550] bg-black/5 rounded-2xl overflow-hidden flex items-center justify-center">
                {isVideoFile(activeTab.media) ? (
                  <video
                    key={activeTab.media.src}
                    src={activeTab.media.src}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    key={activeTab.media.src}
                    src={activeTab.media.src}
                    alt={activeTab.label}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
