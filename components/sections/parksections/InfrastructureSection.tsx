// "use client";

// import { useState } from "react";

// type View = "Park Exterior" | "Park Interior";

// type Pill = { label: string; left: number; top: number; filled?: boolean };

// // Pill centers — % of the image box (top-left origin). Edit freely to
// // nudge a callout; each pill is centered on its own (left, top) point.
// const PILLS: Pill[] = [
//   { label: "Building Area", left: 24, top: 62, filled: true },
//   { label: "Statistics", left: 10, top: 90 },
//   { label: "Solar Roof", left: 62, top: 12 },
//   { label: "Truck Apron", left: 92, top: 46 },
// ];

// // Connector arrows — each SVG is pre-angled in its own file (no CSS
// // rotation applied). Each has a small dot baked in marking its pill-side
// // anchor point; `dot` says which corner of the rendered box that is, so
// // (left, top) can be derived from "where the dot should sit" instead of
// // hand-fitting the box corner:
// //   building-area / solar-roof / statistics: dot at bottom-left, line runs up-right
// //   truck-apron: dot at top-left, line runs straight down
// //
// // Each SVG is preserveAspectRatio="none", so it stretches to fill whatever
// // box it's given — only `height` is set per arrow here, and `width` is
// // derived from the SVG's own native aspect ratio, so the dot+line never
// // gets squashed into a generic straight stroke.
// type Arrow = {
//   key: string;
//   src: string;
//   dot: "bottom-left" | "top-left";
//   /** Where the SVG's dot should land — % of the image box. Pin this to the pill. */
//   anchorLeft: number;
//   anchorTop: number;
//   /** Native SVG size in px, from the file's own width/height attrs. */
//   nativeWidth: number;
//   nativeHeight: number;
//   /** Rendered height — % of the image box. Width is derived to match aspect ratio. */
//   height: number;
// };

// const ARROWS: Arrow[] = [
//   { key: "building-area", src: "/park2new/icons/arrow-building-area.svg", dot: "bottom-left", anchorLeft: 24, anchorTop: 62, nativeWidth: 74.17, nativeHeight: 411.17, height: 20 },
//   { key: "solar-roof", src: "/park2new/icons/arrow-solar-roof.svg", dot: "bottom-left", anchorLeft: 62, anchorTop: 12, nativeWidth: 205.17, nativeHeight: 300.17, height: 11 },
//   { key: "truck-apron", src: "/park2new/icons/arrow-truck-apron.svg", dot: "top-left", anchorLeft: 92, anchorTop: 46, nativeWidth: 5.33, nativeHeight: 194.67, height: 8 },
//   { key: "statistics", src: "/park2new/icons/arrow-statistics.svg", dot: "bottom-left", anchorLeft: 10, anchorTop: 90, nativeWidth: 169.17, nativeHeight: 472.67, height: 20 },
// ];

// // The image box is forced to the same 1154:550.5 ratio as the source PNG,
// // so a % width and a % height need different px-per-% scales to preserve
// // an SVG's aspect ratio — this constant converts between them.
// const IMAGE_BOX_ASPECT = 1154 / 550.5;

// function arrowBoxStyle(arrow: Arrow) {
//   const widthPct = (arrow.height * (arrow.nativeWidth / arrow.nativeHeight)) / IMAGE_BOX_ASPECT;
//   const top = arrow.dot === "bottom-left" ? arrow.anchorTop - arrow.height : arrow.anchorTop;
//   return { left: `${arrow.anchorLeft}%`, top: `${top}%`, width: `${widthPct}%`, height: `${arrow.height}%` };
// }

// function Eyebrow() {
//   return (
//     <div className="flex items-center gap-1.5">
//       <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="shrink-0">
//         <path d="M0 5h12M8 1l4 4-4 4" stroke="#59624d" strokeWidth="1.2" />
//       </svg>
//       <p className="font-sora font-normal text-[0.6em] tracking-[-0.02em] uppercase text-[#59624d] m-0">
//         An Integrated Industrial Infrastructure Platform
//       </p>
//     </div>
//   );
// }

// export default function InfrastructureSection() {
//   const [view, setView] = useState<View>("Park Exterior");

//   return (
//     <section
//       id="park-infrastructure"
//       className="relative w-full bg-white py-[80px] lg:py-[120px]"
//       data-name="Infrastructure Section"
//     >
//       <div className="w-full">
//         <div className="fix flex flex-col gap-8">
//           {/* Header row */}
//           <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
//             <div className="flex flex-col gap-6">
//               <Eyebrow />
//               <h2 className="font-sora font-semibold text-[1.6em] sm:text-[1.9em] lg:text-[2.2em] leading-[1.15] tracking-[-0.02em] text-[#212121] m-0 max-w-[600px]">
//                 Chakan: A Thriving Industrial Hub in Pune
//               </h2>
//             </div>

//             <div className="flex items-center gap-4 w-full sm:w-auto shrink-0">
//               {(["Park Exterior", "Park Interior"] as View[]).map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setView(tab)}
//                   className={`px-6 py-2 rounded-full text-[1em] font-sora leading-[1.4] whitespace-nowrap cursor-pointer transition-colors ${
//                     view === tab
//                       ? "bg-[#59624d] text-white"
//                       : "border border-[#9e9e9e] text-[#9e9e9e] bg-transparent"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Isometric image + hotspots + connector arrows */}
//           <div className="relative w-full max-w-[900px] mx-auto aspect-[1154/550.5]">
//             <img
//               src="/park2new/infra-building-figma.png"
//               alt={view}
//               className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
//               draggable={false}
//             />

//             {ARROWS.map((arrow) => (
//               <img
//                 key={arrow.key}
//                 src={arrow.src}
//                 alt=""
//                 aria-hidden
//                 draggable={false}
//                 className="absolute pointer-events-none"
//                 style={arrowBoxStyle(arrow)}
//               />
//             ))}

//             {PILLS.map((pill) => (
//               <span
//                 key={pill.label}
//                 style={{ left: `${pill.left}%`, top: `${pill.top}%` }}
//                 className={`absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-[0.8em] font-sora leading-[1.4] whitespace-nowrap transition-transform hover:scale-105 ${
//                   pill.filled
//                     ? "bg-[#59624d] text-white"
//                     : "border border-[#59624d] text-[#59624d] bg-white/90"
//                 }`}
//               >
//                 {pill.label}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
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
//
//
//
// "use client";

// import { useState } from "react";

// type View = "Park Exterior" | "Park Interior";

// export default function InfrastructureSection() {
//   const [view, setView] = useState<View>("Park Exterior");

//   return (
//     <section
//       id="park-infrastructure"
//       className="relative w-full bg-white py-12 lg:py-20 text-[#212121]"
//       data-name="Infrastructure Section"
//     >
//       <div className="fix flex flex-col gap-8 lg:gap-12">
//         {/* Header Row */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
//           <div className="flex flex-col gap-3">
//             {/* Eyebrow */}
//             <div className="flex items-center gap-2">
//               <span className="text-[#59624d] font-mono text-sm tracking-widest uppercase">
//                 //
//               </span>
//               <p className="font-sora font-semibold text-xs tracking-wider uppercase text-[#59624d] m-0">
//                 An Integrated Industrial Infrastructure Platform
//               </p>
//             </div>

//             <h2 className="font-sora font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-[#212121] m-0 max-w-[600px]">
//               Chakan: A Thriving Industrial Hub in Pune
//             </h2>
//           </div>

//           {/* Toggle Buttons */}
//           <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
//             {(["Park Exterior", "Park Interior"] as View[]).map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setView(tab)}
//                 className={`px-6 py-2.5 rounded-full text-sm font-sora font-medium transition-all duration-200 cursor-pointer ${
//                   view === tab
//                     ? "bg-[#59624d] text-white shadow-sm"
//                     : "border border-[#9e9e9e]/40 text-[#616161] hover:border-[#59624d] bg-transparent"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Isometric View Container */}
//         <div className="relative w-full fix aspect-[1154/550.5] select-none">
//           {/* Main Background Image */}
//           <img
//             src="/park2new/infra-building-figma.png"
//             alt={view}
//             className="absolute inset-0 w-full h-full object-contain pointer-events-none"
//             draggable={false}
//           />

//           {/* Unified Vector Lines Layer */}
//           <svg
//             viewBox="0 0 1154 550.5"
//             className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {/* 1. Building Area Line (Badge Left -> Horizontal Right -> Up to target) */}
//             <path
//               d="M 195 260 H 512 V 222"
//               stroke="#9E9E9E"
//               strokeWidth="1.2"
//             />
//             <circle cx="512" cy="222" r="3" fill="#9E9E9E" />

//             {/* 2. Solar Roof Line (Badge Right -> Horizontal Left -> Down to Solar Panels) */}
//             <path
//               d="M 938 152 H 687 V 270"
//               stroke="#9E9E9E"
//               strokeWidth="1.2"
//             />
//             <circle cx="687" cy="270" r="3" fill="#9E9E9E" />

//             {/* 3. Truck Apron Line (Badge Right -> Straight Horizontal Left to Apron) */}
//             <path d="M 932 325 H 785" stroke="#9E9E9E" strokeWidth="1.2" />
//             <circle cx="785" cy="325" r="3" fill="#9E9E9E" />

//             {/* 4. Statistics Line (Badge Bottom-Left -> Horizontal Right -> Up to Front Gate) */}
//             <path
//               d="M 205 505 H 595 V 430"
//               stroke="#9E9E9E"
//               strokeWidth="1.2"
//             />
//             <circle cx="595" cy="430" r="3" fill="#9E9E9E" />
//           </svg>

//           {/* Interactive Badges / Pills (Positioned in percentage overlay) */}

//           {/* Building Area */}
//           <div
//             style={{ left: "11.5%", top: "47.2%" }}
//             className="absolute -translate-y-1/2 -translate-x-1/2 z-10"
//           >
//             <span className="inline-block px-5 py-2 rounded-full text-xs sm:text-sm font-sora font-medium bg-[#59624d] text-white shadow-md transition-transform hover:scale-105 cursor-pointer">
//               Building Area
//             </span>
//           </div>

//           {/* Solar Roof */}
//           <div
//             style={{ left: "86.5%", top: "27.6%" }}
//             className="absolute -translate-y-1/2 -translate-x-1/2 z-10"
//           >
//             <span className="inline-block px-5 py-2 rounded-full text-xs sm:text-sm font-sora font-medium border border-[#9e9e9e]/60 text-[#59624d] bg-white/95 backdrop-blur-sm shadow-sm transition-transform hover:scale-105 cursor-pointer">
//               Solar Roof
//             </span>
//           </div>

//           {/* Truck Apron */}
//           <div
//             style={{ left: "86%", top: "59%" }}
//             className="absolute -translate-y-1/2 -translate-x-1/2 z-10"
//           >
//             <span className="inline-block px-5 py-2 rounded-full text-xs sm:text-sm font-sora font-medium border border-[#9e9e9e]/60 text-[#59624d] bg-white/95 backdrop-blur-sm shadow-sm transition-transform hover:scale-105 cursor-pointer">
//               Truck Apron
//             </span>
//           </div>

//           {/* Statistics */}
//           <div
//             style={{ left: "13.5%", top: "91.7%" }}
//             className="absolute -translate-y-1/2 -translate-x-1/2 z-10"
//           >
//             <span className="inline-block px-5 py-2 rounded-full text-xs sm:text-sm font-sora font-medium border border-[#9e9e9e]/60 text-[#59624d] bg-white/95 backdrop-blur-sm shadow-sm transition-transform hover:scale-105 cursor-pointer">
//               Statistics
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stopLenis, startLenis } from "@/components/ui/LenisProvider";

type View = "Park Exterior" | "Park Interior";

export interface MediaItem {
  type: "image" | "video";
  src: string;
}

export interface Hotspot {
  id: string;
  label: string;
  position: { left: string; top: string };
  // Connection line settings matching the isometric canvas
  pathD: string;
  circleCoords: { cx: number; cy: number };
  // Media configuration for each view
  exteriorMedia: MediaItem;
  interiorMedia: MediaItem;
}

export interface InfrastructureContent {
  eyebrow: string;
  heading: string;
  image: string;
  hotspots: Hotspot[];
}

const DEFAULT_CONTENT: InfrastructureContent = {
  eyebrow: "An Integrated Industrial Infrastructure Platform",
  heading: "Chakan: A Thriving Industrial Hub in Pune",
  image: "/park2new/infra-building-figma.png",
  hotspots: [
    {
      id: "building-area",
      label: "Building Area",
      position: { left: "11.5%", top: "47.2%" },
      pathD: "M 195 260 H 512 V 222",
      circleCoords: { cx: 512, cy: 222 },
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
      id: "solar-roof",
      label: "Solar Roof",
      position: { left: "86.5%", top: "27.6%" },
      pathD: "M 938 152 H 687 V 270",
      circleCoords: { cx: 687, cy: 270 },
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
      id: "truck-apron",
      label: "Truck Apron",
      position: { left: "86%", top: "59%" },
      pathD: "M 932 325 H 785",
      circleCoords: { cx: 785, cy: 325 },
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
      id: "statistics",
      label: "Statistics",
      position: { left: "13.5%", top: "91.7%" },
      pathD: "M 205 505 H 595 V 430",
      circleCoords: { cx: 595, cy: 430 },
      exteriorMedia: {
        type: "image",
        src: "/sustainability/hero-sus.webp",
      },
      interiorMedia: {
        type: "image",
        src: "/sustainability/gov2.jpg",
      },
    },
  ],
};

// Helper to determine if a URL/path is a video based on extension or media object
const isVideoFile = (media: MediaItem): boolean => {
  if (media.type === "video") return true;
  return /\.(mp4|webm|ogg|mov)$/i.test(media.src);
};

export default function InfrastructureSection({
  content = DEFAULT_CONTENT,
  hideOnMobile = false,
  autoHeightModal = false,
}: {
  content?: InfrastructureContent;
  /** Opt-in only — park2 must keep showing this isometric hotspot-map UI at every breakpoint. When true, hidden below md in favor of MobileInfrastructureSection. */
  hideOnMobile?: boolean;
  /** Opt-in only — park2's modal keeps its fixed 16:9 aspect ratio. When true, the modal sizes to the media's natural aspect ratio instead, so videos never get cropped. */
  autoHeightModal?: boolean;
} = {}) {
  const HOTSPOTS = content.hotspots;
  const [view, setView] = useState<View>("Park Exterior");
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [modalView, setModalView] = useState<View>("Park Exterior");

  const openModal = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    setModalView("Park Exterior"); // Reset to Exterior tab by default when opened
  };

  const closeModal = () => {
    setSelectedHotspot(null);
  };

  useEffect(() => {
    // Early-return guard rather than an if/open-else-closed startLenis() —
    // that shape calls startLenis() twice for one stopLenis() (once from
    // the close transition's own body, again from the prior render's
    // cleanup), which can zero out a completely unrelated lock still held
    // elsewhere (e.g. the navbar's open mobile menu/dropdown) and resume
    // scroll while that overlay is still up.
    if (!selectedHotspot) return;
    stopLenis();
    return () => startLenis();
  }, [selectedHotspot]);

  // Get active media item inside modal depending on active tab
  const currentMedia = selectedHotspot
    ? modalView === "Park Exterior"
      ? selectedHotspot.exteriorMedia
      : selectedHotspot.interiorMedia
    : null;

  return (
    <section
      id="park-infrastructure"
      className={`relative w-full bg-white py-12 lg:py-20 text-[#212121] ${
        hideOnMobile ? "hidden md:block" : ""
      }`}
      data-name="Infrastructure Section"
    >
      <div className="fix flex flex-col gap-8 lg:gap-12">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-4">
            {/* Eyebrow */}
            {/* <div className="flex items-center gap-2">
              <span className="text-[#59624d] font-mono text-sm tracking-widest uppercase">
                //
              </span>
              <p
                className="font-sora font-normal text-xs tracking-[-0.02em] uppercase text-[#59624d] m-0"
                dangerouslySetInnerHTML={{ __html: content.eyebrow }}
              />
            </div> */}

            <h2
              className="font-sora font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-[#212121] m-0 max-w-[600px]"
              dangerouslySetInnerHTML={{ __html: content.heading }}
            />
          </div>

          {/* Main Toggle Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            {(["Park Exterior", "Park Interior"] as View[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setView(tab)}
                className={`px-6 py-2.5 rounded-full text-base font-sora font-normal transition-all duration-200 cursor-pointer ${
                  view === tab
                    ? "bg-[#59624d] text-white shadow-sm"
                    : "border border-[#9e9e9e]/40 text-[#616161] hover:border-[#59624d] bg-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Isometric View Container */}
        <div className="relative w-full fix aspect-[1154/550.5] select-none">
          {/* Main Background Image */}
          <img
            src={content.image}
            alt={view}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            draggable={false}
          />

          {/* Unified Vector Lines Layer mapped dynamically */}
          <svg
            viewBox="0 0 1154 550.5"
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {HOTSPOTS.map((hotspot) => (
              <g key={hotspot.id}>
                <path d={hotspot.pathD} stroke="#9E9E9E" strokeWidth="1.2" />
                <circle
                  cx={hotspot.circleCoords.cx}
                  cy={hotspot.circleCoords.cy}
                  r="3"
                  fill="#9E9E9E"
                />
              </g>
            ))}
          </svg>

          {/* Dynamically Mapped Hotspot Badges / Pills */}
          {HOTSPOTS.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;

            return (
              <div
                key={hotspot.id}
                style={{
                  left: hotspot.position.left,
                  top: hotspot.position.top,
                }}
                className="absolute -translate-y-1/2 -translate-x-1/2 z-10"
              >
                <button
                  onClick={() => openModal(hotspot)}
                  className={`inline-block px-5 py-2 rounded-full text-sm sm:text-base font-sora font-normal transition-transform hover:scale-105 cursor-pointer outline-none ${
                    isSelected
                      ? "bg-[#59624d] text-white shadow-md"
                      : "border border-[#9e9e9e]/60 text-[#59624d] bg-white/95 backdrop-blur-sm shadow-sm"
                  }`}
                  dangerouslySetInnerHTML={{ __html: hotspot.label }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal / Popup with Smooth Transition */}
      <AnimatePresence>
        {selectedHotspot && currentMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-white rounded-3xl p-3 sm:p-8 shadow-2xl z-10 flex flex-col gap-6 overflow-hidden"
            >
              {/* Top Bar: Tabs & Close Button */}
              <div className="relative flex items-center justify-center w-full min-h-[40px]">
                {/* Modal View Toggle */}
                <div className="flex items-center gap-3">
                  {(["Park Exterior", "Park Interior"] as View[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setModalView(tab)}
                      className={`px-6 py-2 rounded-full text-xs sm:text-sm font-sora font-normal transition-all duration-200 cursor-pointer ${
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
                  aria-label="Close dialog"
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

              {/* Media Display Area (Video/Image Auto-Checker) */}
              <div
                className={
                  autoHeightModal
                    ? "relative w-full max-h-[80vh] bg-black/5 rounded-2xl overflow-hidden flex items-center justify-center"
                    : "relative w-full aspect-[16/9] sm:aspect-[1154/550] bg-black/5 rounded-2xl overflow-hidden flex items-center justify-center"
                }
              >
                {isVideoFile(currentMedia) ? (
                  <video
                    key={currentMedia.src}
                    src={currentMedia.src}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className={
                      autoHeightModal
                        ? "w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                        : "w-full h-full object-cover rounded-2xl"
                    }
                  />
                ) : (
                  <img
                    key={currentMedia.src}
                    src={currentMedia.src}
                    alt={`${selectedHotspot.label} - ${modalView}`}
                    className={
                      autoHeightModal
                        ? "w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                        : "w-full h-full object-cover rounded-2xl"
                    }
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
