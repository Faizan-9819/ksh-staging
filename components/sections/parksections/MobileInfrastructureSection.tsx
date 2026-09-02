// "use client";
// import { useState, useEffect, useCallback } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import NavArrow from "@/components/ui/NavArrow";
// import type { InfrastructureContent } from "./InfrastructureSection";

// /**
//  * Mobile-only Park Infrastructure carousel — each hotspot becomes a slide
//  * with its exterior video on top and its label pinned at the video's bottom.
//  * Exterior only (no interior toggle) per content direction. Desktop/tablet
//  * keeps the isometric hotspot-map UI in InfrastructureSection instead — this
//  * component is meant to be shown only below the md breakpoint by the caller.
//  */
// export default function MobileInfrastructureSection({
//   content,
// }: {
//   content: InfrastructureContent;
// }) {
//   const hotspots = content.hotspots;

//   const [emblaRef, emblaApi] = useEmblaCarousel({
//     align: "start",
//     loop: false,
//     containScroll: "trimSnaps",
//   });

//   const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
//   const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

//   const scrollPrev = useCallback(
//     () => emblaApi && emblaApi.scrollPrev(),
//     [emblaApi],
//   );
//   const scrollNext = useCallback(
//     () => emblaApi && emblaApi.scrollNext(),
//     [emblaApi],
//   );
//   const scrollTo = useCallback(
//     (index: number) => emblaApi && emblaApi.scrollTo(index),
//     [emblaApi],
//   );

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     setSelectedIndex(emblaApi.selectedScrollSnap());
//     setPrevBtnDisabled(!emblaApi.canScrollPrev());
//     setNextBtnDisabled(!emblaApi.canScrollNext());
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;
//     setScrollSnaps(emblaApi.scrollSnapList());
//     onSelect();
//     emblaApi.on("select", onSelect);
//     emblaApi.on("reInit", onSelect);
//   }, [emblaApi, onSelect]);

//   return (
//     <section
//       id="park-infrastructure-mobile"
//       className="relative w-full bg-white py-12 md:hidden"
//       data-name="Mobile Infrastructure Section"
//     >
//       <div className="fix">
//         {/* Header */}
//         <div className="flex flex-col gap-3 pb-8">
//           <div className="flex items-center gap-2">
//             <span className="text-[#59624d] font-mono text-sm tracking-widest uppercase">
//               //
//             </span>
//             <p
//               className="font-sora font-semibold text-xs tracking-wider uppercase text-[#59624d] m-0"
//               dangerouslySetInnerHTML={{ __html: content.eyebrow }}
//             />
//           </div>
//           <h2
//             className="font-sora font-semibold text-2xl leading-tight tracking-tight text-[#212121] m-0"
//             dangerouslySetInnerHTML={{ __html: content.heading }}
//           />
//         </div>

//         {/* Carousel */}
//         <div className="overflow-hidden" ref={emblaRef}>
//           <div className="flex">
//             {hotspots.map((hotspot, index) => (
//               <div
//                 key={hotspot.id}
//                 className={`flex-[0_0_85%] min-w-0 pr-4 ${
//                   index !== 0 ? "pl-0" : ""
//                 }`}
//               >
//                 <div className="relative w-full aspect-auto rounded-2xl overflow-hidden bg-black/5">
//                   <video
//                     src={hotspot.exteriorMedia.src}
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                     className="absolute inset-0 w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
//                     <span
//                       className="inline-block px-5 py-2 rounded-full text-xs font-sora font-medium bg-[#59624d] text-white shadow-md"
//                       dangerouslySetInnerHTML={{ __html: hotspot.label }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Navigation & Pagination Controls */}
//         <div className="flex items-center justify-between mt-8">
//           <div className="flex items-center gap-2">
//             <NavArrow
//               direction="prev"
//               tone="dark"
//               onClick={scrollPrev}
//               disabled={prevBtnDisabled}
//               className={`transition-opacity duration-300 ${
//                 prevBtnDisabled
//                   ? "opacity-40 cursor-not-allowed pointer-events-none"
//                   : "opacity-100 cursor-pointer"
//               }`}
//             />
//             <NavArrow
//               direction="next"
//               tone="dark"
//               onClick={scrollNext}
//               disabled={nextBtnDisabled}
//               className={`transition-opacity duration-300 ${
//                 nextBtnDisabled
//                   ? "opacity-40 cursor-not-allowed pointer-events-none"
//                   : "opacity-100 cursor-pointer"
//               }`}
//             />
//           </div>

//           <div className="flex items-center gap-[13px]">
//             {scrollSnaps.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => scrollTo(index)}
//                 aria-label={`Go to slide ${index + 1}`}
//                 className="h-[5px] p-0 border-none bg-transparent cursor-pointer flex items-center justify-center"
//               >
//                 <span
//                   className="block h-[5px] rounded-[99px]"
//                   style={{
//                     transition:
//                       "width .4s cubic-bezier(.4,0,.2,1), background .4s ease",
//                     width: index === selectedIndex ? 46 : 9,
//                     background:
//                       index === selectedIndex ? "#A9A7B2" : "transparent",
//                     border:
//                       index === selectedIndex ? "none" : "1px solid #C5C5BE",
//                   }}
//                 />
//               </button>
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
// "use client";
// import { useState, useEffect, useCallback } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import NavArrow from "@/components/ui/NavArrow";
// import type { InfrastructureContent } from "./InfrastructureSection";

// /**
//  * Mobile-only Park Infrastructure carousel — each hotspot becomes a slide
//  * with its exterior video on top and its label pinned at the video's bottom.
//  * Exterior only (no interior toggle) per content direction. Desktop/tablet
//  * keeps the isometric hotspot-map UI in InfrastructureSection instead — this
//  * component is meant to be shown only below the md breakpoint by the caller.
//  */
// export default function MobileInfrastructureSection({
//   content,
// }: {
//   content: InfrastructureContent;
// }) {
//   const hotspots = content.hotspots;

//   const [emblaRef, emblaApi] = useEmblaCarousel({
//     align: "start",
//     loop: false,
//     containScroll: "trimSnaps",
//   });

//   const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
//   const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

//   const scrollPrev = useCallback(
//     () => emblaApi && emblaApi.scrollPrev(),
//     [emblaApi],
//   );
//   const scrollNext = useCallback(
//     () => emblaApi && emblaApi.scrollNext(),
//     [emblaApi],
//   );
//   const scrollTo = useCallback(
//     (index: number) => emblaApi && emblaApi.scrollTo(index),
//     [emblaApi],
//   );

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     setSelectedIndex(emblaApi.selectedScrollSnap());
//     setPrevBtnDisabled(!emblaApi.canScrollPrev());
//     setNextBtnDisabled(!emblaApi.canScrollNext());
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;
//     setScrollSnaps(emblaApi.scrollSnapList());
//     onSelect();
//     emblaApi.on("select", onSelect);
//     emblaApi.on("reInit", onSelect);
//   }, [emblaApi, onSelect]);

//   return (
//     <section
//       id="park-infrastructure-mobile"
//       className="relative w-full bg-white py-12 md:hidden"
//       data-name="Mobile Infrastructure Section"
//     >
//       <div className="fix">
//         {/* Header */}
//         <div className="flex flex-col gap-3 pb-8">
//           <div className="flex items-center gap-2">
//             <span className="text-[#59624d] font-mono text-sm tracking-widest uppercase">
//               //
//             </span>
//             <p
//               className="font-sora font-semibold text-xs tracking-wider uppercase text-[#59624d] m-0"
//               dangerouslySetInnerHTML={{ __html: content.eyebrow }}
//             />
//           </div>
//           <h2
//             className="font-sora font-semibold text-2xl leading-tight tracking-tight text-[#212121] m-0"
//             dangerouslySetInnerHTML={{ __html: content.heading }}
//           />
//         </div>

//         {/* Carousel */}
//         <div className="overflow-hidden" ref={emblaRef}>
//           <div className="flex">
//             {hotspots.map((hotspot, index) => (
//               <div
//                 key={hotspot.id}
//                 className={`flex-[0_0_85%] min-w-0 pr-4 ${
//                   index !== 0 ? "pl-0" : ""
//                 }`}
//               >
//                 {/*
//                   1. Set aspect ratio to match video shape (e.g., aspect-[16/9] or aspect-[4/3]).
//                   2. Use object-contain on the video so it scales down without cropping.
//                 */}
//                 <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center">
//                   <video
//                     src={hotspot.exteriorMedia.src}
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                     className="w-full h-full object-contain"
//                   />
//                   <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
//                     <span
//                       className="inline-block px-5 py-2 rounded-full text-xs font-sora font-medium bg-[#59624d] text-white shadow-md"
//                       dangerouslySetInnerHTML={{ __html: hotspot.label }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Navigation & Pagination Controls */}
//         <div className="flex items-center justify-between mt-8">
//           <div className="flex items-center gap-2">
//             <NavArrow
//               direction="prev"
//               tone="dark"
//               onClick={scrollPrev}
//               disabled={prevBtnDisabled}
//               className={`transition-opacity duration-300 ${
//                 prevBtnDisabled
//                   ? "opacity-40 cursor-not-allowed pointer-events-none"
//                   : "opacity-100 cursor-pointer"
//               }`}
//             />
//             <NavArrow
//               direction="next"
//               tone="dark"
//               onClick={scrollNext}
//               disabled={nextBtnDisabled}
//               className={`transition-opacity duration-300 ${
//                 nextBtnDisabled
//                   ? "opacity-40 cursor-not-allowed pointer-events-none"
//                   : "opacity-100 cursor-pointer"
//               }`}
//             />
//           </div>

//           <div className="flex items-center gap-[13px]">
//             {scrollSnaps.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => scrollTo(index)}
//                 aria-label={`Go to slide ${index + 1}`}
//                 className="h-[5px] p-0 border-none bg-transparent cursor-pointer flex items-center justify-center"
//               >
//                 <span
//                   className="block h-[5px] rounded-[99px]"
//                   style={{
//                     transition:
//                       "width .4s cubic-bezier(.4,0,.2,1), background .4s ease",
//                     width: index === selectedIndex ? 46 : 9,
//                     background:
//                       index === selectedIndex ? "#A9A7B2" : "transparent",
//                     border:
//                       index === selectedIndex ? "none" : "1px solid #C5C5BE",
//                   }}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import NavArrow from "@/components/ui/NavArrow";
import type { InfrastructureContent } from "./InfrastructureSection";

/**
 * Mobile-only Park Infrastructure carousel — each hotspot becomes a single full-width slide
 * with its exterior video on top and its label pinned at the video's bottom.
 * Exterior only (no interior toggle) per content direction. Desktop/tablet
 * keeps the isometric hotspot-map UI in InfrastructureSection instead — this
 * component is meant to be shown only below the md breakpoint by the caller.
 */
export default function MobileInfrastructureSection({
  content,
}: {
  content: InfrastructureContent;
}) {
  const hotspots = content.hotspots;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      id="park-infrastructure-mobile"
      className="relative w-full bg-white py-12 md:hidden"
      data-name="Mobile Infrastructure Section"
    >
      <div className="fix">
        {/* Header */}
        <div className="flex flex-col gap-4 pb-8">
          <div className="flex items-center gap-2">
            <span className="text-[#59624d] font-mono text-sm tracking-widest uppercase">
              //
            </span>
            <p
              className="font-sora font-normal text-xs tracking-[-0.02em] uppercase text-[#59624d] m-0"
              dangerouslySetInnerHTML={{ __html: content.eyebrow }}
            />
          </div>
          <h2
            className="font-sora font-semibold text-2xl leading-tight tracking-tight text-[#212121] m-0"
            dangerouslySetInnerHTML={{ __html: content.heading }}
          />
        </div>

        {/* Carousel — one full-width video per view, bigger with a gap between slides */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {hotspots.map((hotspot) => (
              <div key={hotspot.id} className="flex-[0_0_100%] min-w-0 pr-4 last:pr-0">
                {/* Full-bleed video container */}
                <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center">
                  <video
                    src={hotspot.exteriorMedia.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
                    <span
                      className="inline-block px-5 py-2 rounded-full text-sm font-sora font-normal bg-[#59624d] text-white shadow-md"
                      dangerouslySetInnerHTML={{ __html: hotspot.label }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation & Pagination Controls */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-2">
            <NavArrow
              direction="prev"
              tone="dark"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className={`transition-opacity duration-300 ${
                prevBtnDisabled
                  ? "opacity-40 cursor-not-allowed pointer-events-none"
                  : "opacity-100 cursor-pointer"
              }`}
            />
            <NavArrow
              direction="next"
              tone="dark"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className={`transition-opacity duration-300 ${
                nextBtnDisabled
                  ? "opacity-40 cursor-not-allowed pointer-events-none"
                  : "opacity-100 cursor-pointer"
              }`}
            />
          </div>

          {/* Custom Pill Pagination */}
          <div className="flex items-center gap-[13px]">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="h-[5px] p-0 border-none bg-transparent cursor-pointer flex items-center justify-center"
              >
                <span
                  className="block h-[5px] rounded-[99px]"
                  style={{
                    transition:
                      "width .4s cubic-bezier(.4,0,.2,1), background .4s ease",
                    width: index === selectedIndex ? 46 : 9,
                    background:
                      index === selectedIndex ? "#A9A7B2" : "transparent",
                    border:
                      index === selectedIndex ? "none" : "1px solid #C5C5BE",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
