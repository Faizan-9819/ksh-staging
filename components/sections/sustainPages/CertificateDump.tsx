// "use client";

// import Image from "next/image";
// import React, { useRef, useState, useCallback } from "react";
// import type { KeyboardEvent } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useMotionValueEvent,
// } from "framer-motion";
// import { CERTIFICATIONS, type CertificationItem } from "./certificationsData";

// const FADE_TRANSITION = { duration: 0.45, ease: "easeInOut" as const };
// const CARD_TRANSITION = {
//   duration: 0.45,
//   ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
// };

// const fadeVariants = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 },
// };

// const cardVariants = {
//   initial: { opacity: 0, y: 10 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -10 },
// };

// /* ---------------------------------------------------------------------- */
// /* Desktop Sub-components                                                  */
// /* ---------------------------------------------------------------------- */

// interface ActiveThumbnailProps {
//   item: CertificationItem;
//   nextIndex: number;
// }

// /** Top-left card showing the NEXT tab/certification item */
// function ActiveThumbnail({ item, nextIndex }: ActiveThumbnailProps) {
//   return (
//     <div className="w-32 h-24 lg:w-44 lg:h-32 rounded-2xl bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] flex items-center justify-center p-3 overflow-hidden">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={nextIndex}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           variants={fadeVariants}
//           transition={FADE_TRANSITION}
//           className="relative w-full h-full flex items-center justify-center"
//         >
//           {item.badgeImage ? (
//             <Image
//               src={item.badgeImage}
//               alt={item.badgeLabel || "Next Certification Logo"}
//               fill
//               className="object-contain p-1"
//             />
//           ) : item.image ? (
//             <Image
//               src={item.image}
//               alt={item.title.replace(/\n/g, " ")}
//               fill
//               className="object-contain p-1"
//             />
//           ) : (
//             <span
//               style={{ color: item.badgeColor }}
//               className="font-semibold text-[12px] tracking-[0.02em] uppercase text-center"
//             >
//               {item.badgeLabel}
//             </span>
//           )}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }

// interface ActiveHeadingProps {
//   item: CertificationItem;
//   activeIndex: number;
//   className: string;
// }

// function ActiveHeading({ item, activeIndex, className }: ActiveHeadingProps) {
//   return (
//     <AnimatePresence mode="wait">
//       <motion.h2
//         key={activeIndex}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         variants={fadeVariants}
//         transition={FADE_TRANSITION}
//         className={className}
//       >
//         {item.title}
//       </motion.h2>
//     </AnimatePresence>
//   );
// }

// interface ImageStackProps {
//   data: CertificationItem[];
//   imageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
//   sizes: string;
// }

// /**
//  * All certification images are stacked in the same card, permanently mounted.
//  * Their opacity is written directly to the DOM node from the scroll handler
//  * below (same technique as AssetShowcase's card refs) instead of going
//  * through React state + AnimatePresence — so the crossfade is glued 1:1 to
//  * scroll position every frame, with no mount/unmount pop and no queued,
//  * fixed-duration animation fighting fast or reversed scrolling.
//  */
// function ImageStack({ data, imageRefs, sizes }: ImageStackProps) {
//   return (
//     <div className="relative w-full h-full overflow-hidden rounded-[28px] bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] flex items-center justify-center p-8 lg:p-14">
//       {data.map((item, i) => (
//         <div
//           key={i}
//           ref={(el) => {
//             imageRefs.current[i] = el;
//           }}
//           style={{ opacity: i === 0 ? 1 : 0 }}
//           className="absolute inset-0 flex items-center justify-center will-change-[opacity]"
//         >
//           <Image
//             src={item.image}
//             alt={item.title.replace(/\n/g, " ")}
//             fill
//             sizes={sizes}
//             priority={i === 0}
//             className="object-contain p-4 lg:p-8"
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// interface DescriptionCardProps {
//   item: CertificationItem;
//   activeIndex: number;
//   className?: string;
// }

// function DescriptionCard({
//   item,
//   activeIndex,
//   className = "",
// }: DescriptionCardProps) {
//   return (
//     <div
//       className={`overflow-hidden rounded-[16px] bg-[#FBF2E8]/90 backdrop-blur-sm p-6 lg:p-7  ${className}`}
//     >
//       <AnimatePresence mode="wait">
//         <motion.p
//           key={activeIndex}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           variants={cardVariants}
//           transition={CARD_TRANSITION}
//           className="text-[13px] lg:text-[14px] leading-[1.65] text-[#555555] font-normal"
//         >
//           {item.description}
//         </motion.p>
//       </AnimatePresence>
//     </div>
//   );
// }

// interface NavIndicatorsProps {
//   items: CertificationItem[];
//   activeIndex: number;
//   onSelect: (index: number) => void;
// }

// function NavIndicators({ items, activeIndex, onSelect }: NavIndicatorsProps) {
//   const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
//     if (event.key === "ArrowRight") {
//       event.preventDefault();
//       onSelect((activeIndex + 1) % items.length);
//     } else if (event.key === "ArrowLeft") {
//       event.preventDefault();
//       onSelect((activeIndex - 1 + items.length) % items.length);
//     }
//   };

//   return (
//     <div
//       role="tablist"
//       aria-label="Certification navigation"
//       onKeyDown={handleKeyDown}
//       className="flex items-center gap-2"
//     >
//       {items.map((_, index) => {
//         const isActive = index === activeIndex;
//         return (
//           <button
//             key={index}
//             type="button"
//             role="tab"
//             aria-selected={isActive}
//             aria-label={`Show certification ${index + 1}`}
//             onClick={() => onSelect(index)}
//             className={`h-[4px] rounded-full transition-all duration-300 cursor-pointer ${
//               isActive
//                 ? "w-8 bg-[#2D2D2D]"
//                 : "w-3 bg-[#2D2D2D]/20 hover:bg-[#2D2D2D]/40"
//             }`}
//           />
//         );
//       })}
//     </div>
//   );
// }

// /* ---------------------------------------------------------------------- */
// /* Desktop Component (Sticky Scroll Track)                                 */
// /* ---------------------------------------------------------------------- */

// const DesktopCertifications: React.FC<{ data: CertificationItem[] }> = ({
//   data,
// }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const total = data.length;
//   // N items -> N-1 equal transition windows, so every reveal gets the same
//   // scroll distance and the last item settles exactly at progress === 1
//   // (matches AssetShowcase's `maxSegments = CARDS.length - 1`).
//   const maxSegments = Math.max(total - 1, 1);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Same technique as AssetShowcase: read the scroll value once per frame and
//   // write each image layer's opacity straight to the DOM via refs — no React
//   // re-render for the crossfade itself, so it never lags or pops. React state
//   // (`activeIndex`) only drives the text/nav and updates once per tab change.
//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const progress = Math.max(0, Math.min(1, latest));
//     const seg = progress * maxSegments;
//     const outgoingIdx = Math.min(Math.floor(seg), Math.max(total - 2, 0));
//     const progressInSegment = seg - outgoingIdx;

//     imageRefs.current.forEach((el, i) => {
//       if (!el) return;
//       let opacity: number;
//       if (i === outgoingIdx) opacity = 1 - progressInSegment;
//       else if (i === outgoingIdx + 1) opacity = progressInSegment;
//       else opacity = 0;
//       el.style.opacity = String(opacity);
//     });

//     setActiveIndex(Math.min(total - 1, Math.round(seg)));
//   });

//   const goTo = useCallback(
//     (index: number) => {
//       setActiveIndex(((index % total) + total) % total);
//     },
//     [total],
//   );

//   const active = data[activeIndex] || data[0];
//   const nextIndex = (activeIndex + 1) % total;
//   const nextItem = data[nextIndex] || data[0];

//   return (
//     <div ref={containerRef} className="hidden md:block relative h-[220vh]">
//       <div className="sticky top-0 h-screen w-full flex items-center justify-center px-8 lg:px-16 overflow-hidden">
//         {/*
//           This wrapper's max-w-[...] is the class that controls the overall
//           section width, and its gap-[...] controls the space between the
//           left text column and the right image card.
//         */}
//         <div className="w-full max-w-[1240px] flex items-center justify-between gap-4 lg:gap-0">
//           {/* LEFT COLUMN — relative + z-10 so the heading renders on top
//               of the image card inside the overlap zone created by the
//               image card's negative left margin below. */}
//           <div className="relative z-10 w-[280px] lg:w-[300px] lg:pl-8 shrink-0 flex flex-col justify-between h-[420px] lg:h-[480px] py-2">
//             <div>
//               {/* Top-left card showing the NEXT tab image */}
//               <div className="mb-8">
//                 <ActiveThumbnail item={nextItem} nextIndex={nextIndex} />
//               </div>

//               <ActiveHeading
//                 item={active}
//                 activeIndex={activeIndex}
//                 className="font-semibold text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.02em] text-[#212121] whitespace-pre-line"
//               />
//             </div>

//             <div>
//               <NavIndicators
//                 items={data}
//                 activeIndex={activeIndex}
//                 onSelect={goTo}
//               />
//             </div>
//           </div>

//           {/* CENTER DISPLAY & FLOATING DESCRIPTION — pulled left with a
//               negative margin so the card edge slides under the heading,
//               matching the reference screenshot's slight overlap. */}
//           <div className="relative flex-1 h-[420px] lg:h-[500px] -ml-6 md:-ml-8 lg:-ml-10">
//             <ImageStack
//               data={data}
//               imageRefs={imageRefs}
//               sizes="(min-width: 1024px) 60vw, 80vw"
//             />

//             {/* Overlapping Bottom-Right Description Card */}
//             <div className="absolute -bottom-6 -right-4 lg:-right-12 2xl:-right-25 lg:-bottom-10 w-[300px] lg:w-[440px] z-10">
//               <DescriptionCard item={active} activeIndex={activeIndex} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------------------------- */
// /* Mobile Component                                                       */
// /* ---------------------------------------------------------------------- */

// const MobileCertifications: React.FC<{ data: CertificationItem[] }> = ({
//   data,
// }) => {
//   const trackRef = useRef<HTMLDivElement>(null);
//   const [active, setActive] = useState(0);

//   // Precise, gap-aware active-index detection: find the child whose
//   // center is closest to the track's current viewport center, instead of
//   // dividing by clientWidth (which ignores the gap-4 between slides and
//   // was the source of the snap "jump" on the second/third slide).
//   const handleScroll = () => {
//     const el = trackRef.current;
//     if (!el) return;
//     const children = Array.from(el.children) as HTMLElement[];
//     if (!children.length) return;

//     const viewportCenter = el.scrollLeft + el.clientWidth / 2;
//     let closestIndex = 0;
//     let closestDistance = Infinity;

//     children.forEach((child, i) => {
//       const childCenter = child.offsetLeft + child.offsetWidth / 2;
//       const distance = Math.abs(childCenter - viewportCenter);
//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestIndex = i;
//       }
//     });

//     setActive((prev) => (prev === closestIndex ? prev : closestIndex));
//   };

//   // Scroll to a slide's actual offset (accounting for the gap) rather than
//   // an approximated index * clientWidth, which drifted out of sync with
//   // the CSS scroll-snap points and caused the visible jump/correction.
//   const scrollTo = (index: number) => {
//     const el = trackRef.current;
//     if (!el) return;
//     const children = Array.from(el.children) as HTMLElement[];
//     const child = children[Math.max(0, Math.min(index, children.length - 1))];
//     if (!child) return;

//     el.scrollTo({
//       left: child.offsetLeft,
//       behavior: "smooth",
//     });
//     setActive(index);
//   };

//   const activeItem = data[active] || data[0];
//   const nextItem = data[(active + 1) % data.length] || data[0];

//   return (
//     <div className="md:hidden w-full py-12">
//       <div className="px-6 mb-6">
//         <div className="w-24 h-16 rounded-xl bg-white hidden shadow-sm flex items-center justify-center p-2 mb-5 overflow-hidden">
//           {nextItem.badgeImage ? (
//             <Image
//               src={nextItem.badgeImage}
//               alt={nextItem.badgeLabel || "Next Logo"}
//               width={80}
//               height={50}
//               className="object-contain"
//             />
//           ) : (
//             <span
//               style={{ color: nextItem.badgeColor }}
//               className="font-semibold text-[11px] tracking-[0.02em] uppercase"
//             >
//               {nextItem.badgeLabel}
//             </span>
//           )}
//         </div>
//         <h2 className="font-semibold text-[26px] leading-[1.15] h-[90px] lg:h-auto tracking-[-0.02em] text-[#212121] whitespace-pre-line">
//           {activeItem.title}
//         </h2>
//       </div>

//       <div
//         ref={trackRef}
//         onScroll={handleScroll}
//         className="relative no-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-4"
//         style={{ scrollSnapStop: "always" }}
//       >
//         {data.map((item, i) => (
//           <div key={i} className="snap-center shrink-0 w-[85vw]">
//             <div className="relative w-full h-[240px] rounded-[24px] overflow-hidden bg-white p-6 shadow-sm mb-4 flex items-center justify-center">
//               <Image
//                 src={item.image}
//                 alt={item.title.replace(/\n/g, " ")}
//                 fill
//                 sizes="85vw"
//                 className="object-contain p-4"
//               />
//             </div>
//             <div className="bg-[#FBF2E8] rounded-[16px] p-5 border border-black/5">
//               <p className="text-[13px] leading-[1.6] text-[#555555]">
//                 {item.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Mobile Navigation Controls — dot indicators removed; only the
//           prev/next buttons remain, placed close together and centered. */}
//       <div className="flex items-center justify-center gap-3 mt-6">
//         <button
//           type="button"
//           onClick={() => scrollTo(Math.max(0, active - 1))}
//           disabled={active === 0}
//           className="p-2 rounded-full bg-white/80 shadow-sm disabled:opacity-30 border border-black/5"
//           aria-label="Previous Certification"
//         >
//           <svg
//             className="w-5 h-5 text-[#212121]"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>

//         <button
//           type="button"
//           onClick={() => scrollTo(Math.min(data.length - 1, active + 1))}
//           disabled={active === data.length - 1}
//           className="p-2 rounded-full bg-white/80 shadow-sm disabled:opacity-30 border border-black/5"
//           aria-label="Next Certification"
//         >
//           <svg
//             className="w-5 h-5 text-[#212121]"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------------------------- */
// /* Main Export                                                            */
// /* ---------------------------------------------------------------------- */

// const CertificationSection: React.FC = () => {
//   return (
//     <section className="w-full bg-[#FBF2E8]">
//       <DesktopCertifications data={CERTIFICATIONS} />
//       <MobileCertifications data={CERTIFICATIONS} />
//     </section>
//   );
// };

// export default CertificationSection;

// "use client";

// import Image from "next/image";
// import React, {
//   useRef,
//   useState,
//   useCallback,
//   useMemo,
//   useEffect,
// } from "react";
// import type { KeyboardEvent } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useSpring,
//   useMotionValueEvent,
// } from "framer-motion";
// import { CERTIFICATIONS, type CertificationItem } from "./certificationsData";

// const FADE_TRANSITION = { duration: 0.45, ease: "easeInOut" as const };
// const CARD_TRANSITION = {
//   duration: 0.45,
//   ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
// };

// const fadeVariants = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 },
// };

// const cardVariants = {
//   initial: { opacity: 0, y: 10 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -10 },
// };

// /* ---------------------------------------------------------------------- */
// /* Sliding Stack Transform Math                                           */
// /*                                                                        */
// /* Only 3 visual roles ever exist at once:                               */
// /*   PREV  — small thumbnail, top-left (empty if activeIndex === 0)      */
// /*   ACTIVE — big card, dead center                                      */
// /*   NEXT  — small thumbnail, bottom-right (empty if last card active)   */
// /*                                                                        */
// /* During a scroll-driven transition from activeIdx -> activeIdx + 1:    */
// /*   card[activeIdx]     : ACTIVE  -> PREV   (shrinks, slides top-left)  */
// /*   card[activeIdx + 1] : NEXT    -> ACTIVE (grows, slides to center)   */
// /*   card[activeIdx - 1] : PREV    -> gone   (fades out, slides further) */
// /*   card[activeIdx + 2] : gone    -> NEXT   (fades in, slides into slot)*/
// /* Everything else stays fully hidden.                                   */
// /* ---------------------------------------------------------------------- */

// // Tune these to match your exact design — values are vw/vh offsets from
// // the stage's own center, applied with a "center center" transform-origin.
// // PREV/NEXT share one offset magnitude and one scale, so the top-left and
// // bottom-right thumbnails always end up the same size with the same gap
// // to the active card.
// const THUMB_SCALE = 0.22;
// const THUMB_OFFSET = { x: 32, y: 28 };
// const EXIT_DELTA = { x: 10, y: 10 }; // extra distance a thumbnail parks beyond its settled slot while fading
// const PREV_THUMB = { x: -THUMB_OFFSET.x, y: -THUMB_OFFSET.y }; // settled top-left thumbnail slot
// const NEXT_THUMB = { x: THUMB_OFFSET.x, y: THUMB_OFFSET.y }; // settled bottom-right thumbnail slot
// const PREV_EXIT = {
//   x: PREV_THUMB.x - EXIT_DELTA.x,
//   y: PREV_THUMB.y - EXIT_DELTA.y,
// }; // where an outgoing prev-thumb fades to
// const NEXT_ENTER = {
//   x: NEXT_THUMB.x + EXIT_DELTA.x,
//   y: NEXT_THUMB.y + EXIT_DELTA.y,
// }; // where an incoming next-thumb fades from

// function clamp(value: number, min = 0, max = 1) {
//   return Math.max(min, Math.min(max, value));
// }

// // Spatial easing applied to the scroll-progress fraction within a segment —
// // gives the slide a gentle ease-in/ease-out feel even though it is 1:1
// // driven by scroll distance, instead of a mechanical linear slide.
// function easeInOutCubic(t: number) {
//   return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// }

// function lerp(a: number, b: number, t: number) {
//   return a + (b - a) * t;
// }

// interface CardStyle {
//   transform: string;
//   opacity: number;
//   zIndex: number;
// }

// function getCardStyle(
//   cardIndex: number,
//   activeIndex: number,
//   rawProgress: number,
//   totalCards: number,
// ): CardStyle {
//   const t = easeInOutCubic(clamp(rawProgress));
//   const isLast = activeIndex >= totalCards - 1;

//   // CASE: this card is the currently active card, animating OUT to become
//   // the new prev-thumbnail (or staying put if it's the final card).
//   if (cardIndex === activeIndex) {
//     if (isLast) {
//       return {
//         transform: "translate3d(0, 0, 0) scale(1)",
//         opacity: 1,
//         zIndex: 40,
//       };
//     }
//     return {
//       transform: `translate3d(${lerp(0, PREV_THUMB.x, t)}vw, ${lerp(
//         0,
//         PREV_THUMB.y,
//         t,
//       )}vh, 0) scale(${lerp(1, THUMB_SCALE, t)})`,
//       opacity: 1,
//       zIndex: 30,
//     };
//   }

//   // CASE: this card is the next-thumbnail, animating IN to become the new
//   // active/center card.
//   if (cardIndex === activeIndex + 1) {
//     return {
//       transform: `translate3d(${lerp(NEXT_THUMB.x, 0, t)}vw, ${lerp(
//         NEXT_THUMB.y,
//         0,
//         t,
//       )}vh, 0) scale(${lerp(THUMB_SCALE, 1, t)})`,
//       opacity: 1,
//       zIndex: 45,
//     };
//   }

//   // CASE: this card was the prev-thumbnail and is exiting for good — fades
//   // and slides a little further out of frame so it never pops.
//   if (cardIndex === activeIndex - 1) {
//     return {
//       transform: `translate3d(${lerp(PREV_THUMB.x, PREV_EXIT.x, t)}vw, ${lerp(
//         PREV_THUMB.y,
//         PREV_EXIT.y,
//         t,
//       )}vh, 0) scale(${lerp(THUMB_SCALE, THUMB_SCALE * 0.7, t)})`,
//       opacity: lerp(1, 0, t),
//       zIndex: 20,
//     };
//   }

//   // CASE: this card is about to become the new next-thumbnail — fades and
//   // slides in from a touch further out, so it never pops into place.
//   if (cardIndex === activeIndex + 2) {
//     return {
//       transform: `translate3d(${lerp(NEXT_ENTER.x, NEXT_THUMB.x, t)}vw, ${lerp(
//         NEXT_ENTER.y,
//         NEXT_THUMB.y,
//         t,
//       )}vh, 0) scale(${lerp(THUMB_SCALE * 0.7, THUMB_SCALE, t)})`,
//       opacity: lerp(0, 1, t),
//       zIndex: 25,
//     };
//   }

//   // Everything else: fully hidden, parked on whichever side it belongs to
//   // so it never has to "jump" into position when it eventually enters.
//   const parkLeft = cardIndex < activeIndex;
//   const park = parkLeft ? PREV_EXIT : NEXT_ENTER;
//   return {
//     transform: `translate3d(${park.x}vw, ${park.y}vh, 0) scale(${THUMB_SCALE * 0.7})`,
//     opacity: 0,
//     zIndex: 0,
//   };
// }

// /* ---------------------------------------------------------------------- */
// /* Desktop Sub-components                                                 */
// /* ---------------------------------------------------------------------- */

// interface ActiveHeadingProps {
//   item: CertificationItem;
//   activeIndex: number;
//   className: string;
// }

// function ActiveHeading({ item, activeIndex, className }: ActiveHeadingProps) {
//   return (
//     <AnimatePresence mode="wait">
//       <motion.h2
//         key={activeIndex}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         variants={fadeVariants}
//         transition={FADE_TRANSITION}
//         className={className}
//       >
//         {item.title}
//       </motion.h2>
//     </AnimatePresence>
//   );
// }

// interface ImageStackProps {
//   data: CertificationItem[];
//   cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
//   sizes: string;
// }

// /**
//  * Stack of cards styled with transform values computed dynamically on
//  * scroll — imperative style writes (no React re-render per frame), driven
//  * entirely by `applyTransforms` in the parent.
//  */
// function ImageStack({ data, cardRefs, sizes }: ImageStackProps) {
//   return (
//     <div className="relative w-full h-full overflow-visible grid grid-cols-1 grid-rows-1">
//       {data.map((item, i) => (
//         <div
//           key={i}
//           ref={(el) => {
//             cardRefs.current[i] = el;
//           }}
//           style={{
//             width: "100%",
//             height: "100%",
//             borderRadius: "clamp(16px,1.5vw,28px)",
//             transform: "translate3d(0,0,0) scale(1)",
//             willChange: "transform, opacity",
//           }}
//           className="col-start-1 row-start-1 self-center justify-self-center mr-10! overflow-hidden max-w-full relative bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] p-6 lg:p-10 transition-shadow duration-300"
//         >
//           <div className="relative w-full h-full flex items-center justify-center">
//             <Image
//               src={item.image}
//               alt={item.title.replace(/\n/g, " ")}
//               fill
//               sizes={sizes}
//               priority={i === 0}
//               className="object-contain p-2 lg:p-4"
//               draggable={false}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// interface DescriptionCardProps {
//   item: CertificationItem;
//   activeIndex: number;
//   className?: string;
// }

// function DescriptionCard({
//   item,
//   activeIndex,
//   className = "",
// }: DescriptionCardProps) {
//   return (
//     <div
//       className={`overflow-hidden rounded-[16px] bg-[#FBF2E8]/90 backdrop-blur-sm p-6 lg:p-7 ${className}`}
//     >
//       <AnimatePresence mode="wait">
//         <motion.p
//           key={activeIndex}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           variants={cardVariants}
//           transition={CARD_TRANSITION}
//           className="text-[13px] lg:text-[14px] leading-[1.65] text-[#555555] font-normal"
//         >
//           {item.description}
//         </motion.p>
//       </AnimatePresence>
//     </div>
//   );
// }

// interface NavIndicatorsProps {
//   items: CertificationItem[];
//   activeIndex: number;
//   onSelect: (index: number) => void;
// }

// function NavIndicators({ items, activeIndex, onSelect }: NavIndicatorsProps) {
//   const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
//     if (event.key === "ArrowRight") {
//       event.preventDefault();
//       onSelect((activeIndex + 1) % items.length);
//     } else if (event.key === "ArrowLeft") {
//       event.preventDefault();
//       onSelect((activeIndex - 1 + items.length) % items.length);
//     }
//   };

//   return (
//     <div
//       role="tablist"
//       aria-label="Certification navigation"
//       onKeyDown={handleKeyDown}
//       className="flex items-center gap-2"
//     >
//       {items.map((_, index) => {
//         const isActive = index === activeIndex;
//         return (
//           <button
//             key={index}
//             type="button"
//             role="tab"
//             aria-selected={isActive}
//             aria-label={`Show certification ${index + 1}`}
//             onClick={() => onSelect(index)}
//             className={`h-[4px] rounded-full transition-all duration-300 cursor-pointer ${
//               isActive
//                 ? "w-8 bg-[#2D2D2D]"
//                 : "w-3 bg-[#2D2D2D]/20 hover:bg-[#2D2D2D]/40"
//             }`}
//           />
//         );
//       })}
//     </div>
//   );
// }

// /* ---------------------------------------------------------------------- */
// /* Desktop Component (Sticky Scroll Track)                                */
// /* ---------------------------------------------------------------------- */

// const DesktopCertifications: React.FC<{ data: CertificationItem[] }> = ({
//   data,
// }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const total = data.length;
//   const maxSegments = useMemo(() => Math.max(total - 1, 1), [total]);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Spring-smoothed progress irons out trackpad/wheel scroll noise so the
//   // stack never stutters, while staying responsive enough to feel glued
//   // to the user's scroll input.
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 260,
//     damping: 38,
//     mass: 0.4,
//   });

//   const applyTransforms = useCallback(
//     (seg: number) => {
//       const activeIdx = Math.min(total - 1, Math.floor(seg));
//       const progressInSegment = seg - activeIdx;

//       cardRefs.current.forEach((el, i) => {
//         if (!el) return;

//         const style = getCardStyle(i, activeIdx, progressInSegment, total);

//         el.style.transform = style.transform;
//         el.style.opacity = String(style.opacity);
//         el.style.zIndex = String(style.zIndex);
//         el.style.pointerEvents = style.opacity < 0.05 ? "none" : "auto";
//       });
//     },
//     [total],
//   );

//   useMotionValueEvent(smoothProgress, "change", (latest) => {
//     const progress = clamp(latest);
//     const seg = progress * maxSegments;

//     applyTransforms(seg);

//     const nextActive = Math.min(total - 1, Math.round(seg));
//     setActiveIndex((prev) => (prev === nextActive ? prev : nextActive));
//   });

//   useEffect(() => {
//     applyTransforms(0);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [applyTransforms]);

//   const goTo = useCallback(
//     (index: number) => {
//       setActiveIndex(((index % total) + total) % total);
//     },
//     [total],
//   );

//   const active = data[activeIndex] || data[0];

//   return (
//     <div ref={containerRef} className="hidden md:block relative h-[400vh]">
//       <div className="sticky top-0 h-screen w-full flex items-center justify-center px-8 lg:px-16 overflow-hidden">
//         <div className="w-full max-w-[1240px] flex items-center justify-between gap-4 lg:gap-0">
//           {/* LEFT COLUMN */}
//           <div className="relative z-10 w-[280px] lg:w-[300px] lg:pl-8 shrink-0 flex flex-col justify-between h-[420px] lg:h-[480px] py-2">
//             <div>
//               {/* Reserved spacing for the prev-thumbnail so the heading below
//                   never jumps, whether or not a thumbnail is present. Stays
//                   empty by design when activeIndex === 0. */}
//               <div className="w-32 h-24 lg:w-44 lg:h-32 mb-8" />

//               <ActiveHeading
//                 item={active}
//                 activeIndex={activeIndex}
//                 className="font-semibold text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.02em] text-[#212121] whitespace-pre-line"
//               />
//             </div>

//             <div>
//               <NavIndicators
//                 items={data}
//                 activeIndex={activeIndex}
//                 onSelect={goTo}
//               />
//             </div>
//           </div>

//           {/* CENTER STAGE */}
//           <div className="relative flex-1 h-[420px] lg:h-[500px] -ml-6 md:-ml-8 lg:-ml-10">
//             <ImageStack
//               data={data}
//               cardRefs={cardRefs}
//               sizes="(min-width: 1024px) 60vw, 80vw"
//             />

//             {/* Floating description card — right edge, vertically centered
//                 over the stage, matching the reference layout. */}
//             <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-14 2xl:-right-24 w-[280px] lg:w-[380px] z-50">
//               <DescriptionCard item={active} activeIndex={activeIndex} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------------------------- */
// /* Mobile Component                                                       */
// /* ---------------------------------------------------------------------- */

// const MobileCertifications: React.FC<{ data: CertificationItem[] }> = ({
//   data,
// }) => {
//   const trackRef = useRef<HTMLDivElement>(null);
//   const [active, setActive] = useState(0);

//   const handleScroll = () => {
//     const el = trackRef.current;
//     if (!el) return;
//     const children = Array.from(el.children) as HTMLElement[];
//     if (!children.length) return;

//     const viewportCenter = el.scrollLeft + el.clientWidth / 2;
//     let closestIndex = 0;
//     let closestDistance = Infinity;

//     children.forEach((child, i) => {
//       const childCenter = child.offsetLeft + child.offsetWidth / 2;
//       const distance = Math.abs(childCenter - viewportCenter);
//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestIndex = i;
//       }
//     });

//     setActive((prev) => (prev === closestIndex ? prev : closestIndex));
//   };

//   const scrollTo = (index: number) => {
//     const el = trackRef.current;
//     if (!el) return;
//     const children = Array.from(el.children) as HTMLElement[];
//     const child = children[Math.max(0, Math.min(index, children.length - 1))];
//     if (!child) return;

//     el.scrollTo({
//       left: child.offsetLeft,
//       behavior: "smooth",
//     });
//     setActive(index);
//   };

//   const activeItem = data[active] || data[0];

//   return (
//     <div className="md:hidden w-full py-12">
//       <div className="px-6 mb-6">
//         <h2 className="font-semibold text-[26px] leading-[1.15] h-[90px] lg:h-auto tracking-[-0.02em] text-[#212121] whitespace-pre-line">
//           {activeItem.title}
//         </h2>
//       </div>

//       <div
//         ref={trackRef}
//         onScroll={handleScroll}
//         className="relative no-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-4"
//         style={{ scrollSnapStop: "always" }}
//       >
//         {data.map((item, i) => (
//           <div key={i} className="snap-center shrink-0 w-[85vw]">
//             <div className="relative w-full h-[240px] rounded-[24px] overflow-hidden bg-white p-6 shadow-sm mb-4 flex items-center justify-center">
//               <Image
//                 src={item.image}
//                 alt={item.title.replace(/\n/g, " ")}
//                 fill
//                 sizes="85vw"
//                 className="object-contain p-4"
//               />
//             </div>
//             <div className="bg-[#FBF2E8] rounded-[16px] p-5 border border-black/5">
//               <p className="text-[13px] leading-[1.6] text-[#555555]">
//                 {item.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Mobile Navigation Controls */}
//       <div className="flex items-center justify-center gap-3 mt-6">
//         <button
//           type="button"
//           onClick={() => scrollTo(Math.max(0, active - 1))}
//           disabled={active === 0}
//           className="p-2 rounded-full bg-white/80 shadow-sm disabled:opacity-30 border border-black/5"
//           aria-label="Previous Certification"
//         >
//           <svg
//             className="w-5 h-5 text-[#212121]"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>

//         <button
//           type="button"
//           onClick={() => scrollTo(Math.min(data.length - 1, active + 1))}
//           disabled={active === data.length - 1}
//           className="p-2 rounded-full bg-white/80 shadow-sm disabled:opacity-30 border border-black/5"
//           aria-label="Next Certification"
//         >
//           <svg
//             className="w-5 h-5 text-[#212121]"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------------------------- */
// /* Main Export                                                            */
// /* ---------------------------------------------------------------------- */

// const CertificationSection: React.FC = () => {
//   return (
//     <section className="w-full bg-[#FBF2E8]">
//       <DesktopCertifications data={CERTIFICATIONS} />
//       <MobileCertifications data={CERTIFICATIONS} />
//     </section>
//   );
// };

// export default CertificationSection;
