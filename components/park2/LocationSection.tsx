// "use client";

// const HOTSPOTS = [
//   { label: "KSH INFRA Parks", left: "0%", top: "15%", filled: true },
//   { label: "Notable Industries", left: "37%", top: "0%", filled: false },
//   { label: "Connectivity", left: "71%", top: "18%", filled: false },
// ];

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

// export default function LocationSection() {
//   return (
//     <section
//       id="location-connectivity"
//       className="relative w-full bg-white overflow-hidden py-[48px] lg:py-[68px] "
//       data-name="Location Section"
//     >
//       {/* Decorative brand element vector, centered behind content */}
//       <svg
//         aria-hidden
//         className="pointer-events-none absolute left-1/2 top-[-360px] -translate-x-1/2 w-[420px] sm:w-[520px] lg:w-[622px] opacity-70"
//         viewBox="0 0 621.978 1313.05"
//         fill="none"
//       >
//         <path
//           d="M0 1.75236C167.078 1.75236 155.579 157.274 155.579 157.274L155.073 1157.13C155.073 1157.13 143.573 1312.65 310.652 1312.65C477.73 1312.65 466.399 1157.13 466.399 1157.13V155.922C466.399 155.922 454.9 0.4 621.978 0.4"
//           stroke="#24314E"
//           strokeOpacity="0.1"
//           strokeWidth="0.8"
//         />
//       </svg>

//       <div className="fix relative flex flex-col lg:flex-row items-start justify-between gap-[40px] lg:gap-[24px]">
//         {/* Left column — header + map w/ hotspots */}
//         <div className="flex flex-col gap-[24px] w-full lg:w-[458px] shrink-0">
//           <Eyebrow />

//           <h2 className="font-sora font-semibold text-[28px] sm:text-[32px] lg:text-[38.4px] tracking-[-0.768px] text-[#212121] m-0">
//             Strategically Positioned in Chakan, Pune
//           </h2>

//           <div className="relative flex flex-col gap-[16px]">
//             <div className="relative w-full max-w-[458px] aspect-[458/281]">
//               <img
//                 src="/park2new/mh-map.webp"
//                 alt="Maharashtra map showing Chakan location"
//                 className="absolute inset-0 w-full h-full object-contain pointer-events-none"
//               />

//               {HOTSPOTS.map((spot) => (
//                 <button
//                   key={spot.label}
//                   style={{ left: spot.left, top: spot.top }}
//                   className={`absolute px-[16px] py-[8px] rounded-[32px] text-[12.8px] font-sora leading-[1.4] whitespace-nowrap cursor-pointer transition-transform hover:scale-105 ${
//                     spot.filled
//                       ? "bg-[#59624d] text-white"
//                       : "border border-[0.8px] border-[#9e9e9e] text-[#9e9e9e] bg-white"
//                   }`}
//                 >
//                   {spot.label}
//                 </button>
//               ))}
//             </div>

//             <div className="flex justify-center lg:justify-start">
//               <button className="px-[16px] py-[8px] rounded-[32px] border border-[0.8px] border-[#59624d] text-[#59624d] text-[14.4px] font-sora leading-[1.4] whitespace-nowrap cursor-pointer transition-colors hover:bg-[#59624d] hover:text-white">
//                 View Overview
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right column — text */}
//         <div className="flex flex-col gap-[8px] w-full lg:max-w-[520px] font-inter font-medium text-[16px] lg:text-[19.2px] leading-[1.4]">
//           <p className="text-[#212121] m-0">
//             Chakan, located near Pune, is one of India&rsquo;s fastest-growing
//             integrated industrial zones, strategically developed by MIDC as a
//             key manufacturing and logistics corridor. Home to global automotive
//             giants like Volkswagen, Mahindra &amp; Mahindra, Bridgestone, Bajaj
//             Auto, and Mercedes Benz, it offers ready infrastructure, robust
//             connectivity, and a growing talent pool.
//           </p>
//           <p className="text-[#bdaea6] m-0">
//             With metro connectivity and rapid social infrastructure underway,
//             Chakan is set to become a benchmark for modern industrial
//             development. KSH INFRA&rsquo;s parks in Chakan further reinforce its
//             position as a central hub driving India&rsquo;s industrial growth.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type View = "Park Exterior" | "Park Interior";

interface MediaItem {
  type: "image" | "video";
  src: string;
}

interface Hotspot {
  id: string;
  label: string;
  left: string;
  top: string;
  filled: boolean;
  exteriorMedia: MediaItem;
  interiorMedia: MediaItem;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "ksh-infra-parks",
    label: "KSH INFRA Parks",
    left: "0%",
    top: "15%",
    filled: true,
    // Custom media for tab 1
    exteriorMedia: {
      type: "image",
      src: "/park/parks.webp",
    },
    interiorMedia: {
      type: "image",
      src: "/sustainability/gov2.jpg",
    },
  },
  {
    id: "notable-industries",
    label: "Notable Industries",
    left: "37%",
    top: "0%",
    filled: false,
    exteriorMedia: {
      type: "image",
      src: "/sustainability/hero-sus.webp",
    },
    interiorMedia: {
      type: "image",
      src: "/sustainability/gov2.jpg",
    },
  },
  {
    id: "connectivity",
    label: "Connectivity",
    left: "71%",
    top: "18%",
    filled: false,
    exteriorMedia: {
      type: "image",
      src: "/sustainability/hero-sus.webp",
    },
    interiorMedia: {
      type: "image",
      src: "/sustainability/gov2.jpg",
    },
  },
];

// Dynamic check for video formats vs standard images
const isVideoFile = (media: MediaItem): boolean => {
  if (media.type === "video") return true;
  return /\.(mp4|webm|ogg|mov)$/i.test(media.src);
};

function Eyebrow() {
  return (
    <div className="flex items-center gap-[6px]">
      <svg
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        className="shrink-0"
      >
        <path d="M0 5h12M8 1l4 4-4 4" stroke="#59624d" strokeWidth="1.2" />
      </svg>
      <p className="font-sora font-normal text-[9.6px] tracking-[-0.192px] uppercase text-[#59624d] m-0">
        An Integrated Industrial Infrastructure Platform
      </p>
    </div>
  );
}

export default function LocationSection() {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [modalView, setModalView] = useState<View>("Park Exterior");

  const openModal = (hotspot?: Hotspot) => {
    setSelectedHotspot(hotspot || HOTSPOTS[0]);
    setModalView("Park Exterior"); // Reset view to Exterior tab whenever modal opens
  };

  const closeModal = () => {
    setSelectedHotspot(null);
  };

  const currentMedia = selectedHotspot
    ? modalView === "Park Exterior"
      ? selectedHotspot.exteriorMedia
      : selectedHotspot.interiorMedia
    : null;

  return (
    <section
      id="location-connectivity"
      className="relative w-full bg-white overflow-hidden py-[48px] lg:py-[68px]"
      data-name="Location Section"
    >
      {/* Decorative brand element vector, centered behind content */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-360px] -translate-x-1/2 w-[420px] sm:w-[520px] lg:w-[622px] opacity-70"
        viewBox="0 0 621.978 1313.05"
        fill="none"
      >
        <path
          d="M0 1.75236C167.078 1.75236 155.579 157.274 155.579 157.274L155.073 1157.13C155.073 1157.13 143.573 1312.65 310.652 1312.65C477.73 1312.65 466.399 1157.13 466.399 1157.13V155.922C466.399 155.922 454.9 0.4 621.978 0.4"
          stroke="#24314E"
          strokeOpacity="0.1"
          strokeWidth="0.8"
        />
      </svg>

      <div className="fix relative flex flex-col lg:flex-row items-start justify-between gap-[40px] lg:gap-[24px]">
        {/* Left column — header + map w/ hotspots */}
        <div className="flex flex-col gap-[24px] w-full lg:w-[458px] shrink-0">
          {/* <Eyebrow />

          <h2 className="font-sora font-semibold text-[28px] sm:text-[32px] lg:text-[38.4px] tracking-[-0.768px] text-[#212121] m-0">
            Strategically Positioned in Chakan, Pune
          </h2> */}

          <div className="relative flex flex-col gap-[16px]">
            <div className="relative w-full max-w-[458px] aspect-[458/281]">
              {/* Left Map Image — Clickable trigger for the popup */}
              <img
                src="/park2new/mh-map.webp"
                alt="Maharashtra map showing Chakan location"
                onClick={() => openModal(HOTSPOTS[0])}
                className="absolute inset-0 w-full h-full object-contain cursor-pointer transition-opacity hover:opacity-90"
              />

              {/* Dynamic Hotspot Buttons */}
              {HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => openModal(spot)}
                  style={{ left: spot.left, top: spot.top }}
                  className={`absolute px-[16px] py-[8px] rounded-[32px] text-[12.8px] font-sora leading-[1.4] whitespace-nowrap cursor-pointer transition-transform hover:scale-105 z-10 ${
                    spot.filled
                      ? "bg-[#59624d] text-white"
                      : "border border-[0.8px] border-[#9e9e9e] text-[#9e9e9e] bg-white"
                  }`}
                >
                  {spot.label}
                </button>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => openModal(HOTSPOTS[0])}
                className="px-[16px] py-[8px] rounded-[32px] border border-[0.8px] border-[#59624d] text-[#59624d] text-[14.4px] font-sora leading-[1.4] whitespace-nowrap cursor-pointer transition-colors hover:bg-[#59624d] hover:text-white"
              >
                View Overview
              </button>
            </div>
          </div>
        </div>

        {/* Right column — text */}
        <div className="flex flex-col gap-[8px] w-full lg:max-w-[520px] font-inter font-medium text-[16px] lg:text-[19.2px] leading-[1.4]">
          <p className="text-[#212121] m-0">
            {" "}
            Chakan, located near Pune, is one of India&rsquo;s fastest-growing
            integrated industrial zones, strategically developed by MIDC as a
            key manufacturing and logistics corridor. Home to global automotive
            giants like Volkswagen, Mahindra &amp; Mahindra, Bridgestone, Bajaj
            Auto, and Mercedes Benz, it offers ready infrastructure, robust
            connectivity, and a growing talent pool.
          </p>
          <p className="text-[#bdaea6] m-0">
            With metro connectivity and rapid social infrastructure underway,
            Chakan is set to become a benchmark for modern industrial
            development. KSH INFRA&rsquo;s parks in Chakan further reinforce its
            position as a central hub driving India&rsquo;s industrial growth.
          </p>
        </div>
      </div>

      {/* Styled Animated Popup Modal */}
      <AnimatePresence>
        {selectedHotspot && currentMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
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
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-white rounded-3xl p-3 sm:p-8 shadow-2xl z-10 flex flex-col gap-6 overflow-hidden"
            >
              {/* Header with Switcher & Close Button */}
              <div className="relative flex items-center justify-center w-full min-h-[40px]">
                {/* View Switcher Tabs */}
                <div className="flex items-center gap-3">
                  {(["Park Exterior", "Park Interior"] as View[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setModalView(tab)}
                      className={`px-6 py-2 rounded-full text-xs sm:text-sm font-sora font-medium transition-all duration-200 cursor-pointer ${
                        modalView === tab
                          ? "bg-[#59624d] text-white shadow-sm"
                          : "border border-[#9e9e9e]/60 text-[#616161] hover:border-[#59624d] bg-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
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
              </div>

              {/* Media Renderer Container */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[1154/550] bg-black/5 rounded-2xl overflow-hidden flex items-center justify-center">
                {isVideoFile(currentMedia) ? (
                  <video
                    key={currentMedia.src}
                    src={currentMedia.src}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    key={currentMedia.src}
                    src={currentMedia.src}
                    alt={`${selectedHotspot.label} - ${modalView}`}
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
