"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import ArrowUpRightIcon from "@/components/ui/ArrowUpRightIcon";
import type {
  SolutionButton,
  SolutionCardData,
  SolutionFeature,
} from "./solutionsData";
import SolutionAccordionItem from "./SolutionAccordionItem";

const ACTIVE_VIEWPORT_MARGIN = "-45% 0px -45% 0px";
const CARD_ANIMATE_DURATION_S = 0.6;
const CARD_ANIMATE_OFFSET_PX = 32;
const CARD_ANIMATE_VIEWPORT_AMOUNT = 0.3;
const TAB_CROSSFADE_DURATION_S = 0.35;
const HOVER_ACTIVATION_MIN_WIDTH_PX = 1024;

interface SolutionHoverListProps {
  items: SolutionFeature[];
  activeIndex: number;
  onActivate: (index: number) => void;
}

function SolutionHoverList({
  items,
  activeIndex,
  onActivate,
}: SolutionHoverListProps) {
  return (
    // <div className="flex flex-col">
    //   {items.map((item, itemIndex) => {
    //     const isActive = itemIndex === activeIndex;
    //     return (
    //       <div
    //         key={item.title}
    //         onClick={() => onActivate(itemIndex)}
    //         onMouseEnter={() => {
    //           if (
    //             typeof window !== "undefined" &&
    //             window.innerWidth >= HOVER_ACTIVATION_MIN_WIDTH_PX
    //           ) {
    //             onActivate(itemIndex);
    //           }
    //         }}
    //         className="flex cursor-pointer items-center justify-between gap-4 border-t border-[#E4E0D8] py-4 first:border-t-0"
    //       >
    //         <span
    //           className={`text-[15px] transition-colors duration-[350ms] ${
    //             isActive
    //               ? "font-semibold text-[#212121]"
    //               : "font-normal text-[#8C8C84]"
    //           }`}
    //         >
    //           {item.title}
    //         </span>
    //         <span
    //           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-[350ms] ${
    //             isActive
    //               ? "border-[#59624D] bg-[#59624D] text-white"
    //               : "border-[#D9D5CE] text-[#8C8C84]"
    //           }`}
    //         >
    //           <HiArrowUpRight size={16} />
    //         </span>
    //       </div>
    //     );
    //   })}
    // </div>
    <div className="flex flex-col">
      {items.map((item, itemIndex) => {
        const isActive = itemIndex === activeIndex;
        return (
          <div
            key={item.title}
            onClick={() => onActivate(itemIndex)}
            onMouseEnter={() => {
              if (
                typeof window !== "undefined" &&
                window.innerWidth >= HOVER_ACTIVATION_MIN_WIDTH_PX
              ) {
                onActivate(itemIndex);
              }
            }}
            className={`flex cursor-pointer items-center justify-between gap-4 border-b py-4 transition-colors duration-[350ms] ${
              isActive ? "border-[#212121]" : "border-[#979797]"
            }`}
          >
            <span
              className={`text-[15px] font-normal transition-colors duration-[350ms] ${
                isActive ? "text-[#212121]" : "text-[#8C8C84]"
              }`}
            >
              {item.title}
            </span>
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-[350ms] ${
                isActive ? "bg-[#59624D] text-white" : "bg-white text-[#59624D]"
              }`}
            >
              <ArrowUpRightIcon size={16} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface SolutionButtonGroupProps {
  buttons: SolutionButton[];
  activeLabel?: string;
  onSelect: (label: string) => void;
  className?: string;
}

function SolutionButtonGroup({
  buttons,
  activeLabel,
  onSelect,
  className = "",
}: SolutionButtonGroupProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {buttons.map((button) => {
        const isActive = button.label === activeLabel;
        return (
          <button
            key={button.label}
            type="button"
            onClick={() => onSelect(button.label)}
            aria-pressed={isActive}
            className={`cursor-pointer rounded-full border px-5 py-2.5 text-[13px] transition-colors duration-[350ms] ${
              isActive
                ? "border-[#59624D] bg-[#59624D] text-white"
                : "border-[#9E9E9E] bg-transparent text-[#9E9E9E]"
            }`}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
}

function FeatureList({ features }: { features: SolutionFeature[] }) {
  return (
    <div className="flex flex-col gap-6">
      {features.map((feature) => (
        <div key={feature.title}>
          <p className="mb-1 text-[18px] text-[#212121]">{feature.title}</p>
          <p className="text-[14px] leading-relaxed text-[#4A4A4A]">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}

interface SolutionCardProps {
  data: SolutionCardData;
  index: number;
  onActiveChange: (index: number) => void;
}

function SolutionCard({ data, index, onActiveChange }: SolutionCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isCentered = useInView(ref, {
    margin: ACTIVE_VIEWPORT_MARGIN,
    once: false,
  });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isCentered) onActiveChange(index);
  }, [isCentered, index, onActiveChange]);

  const [activeButtonLabel, setActiveButtonLabel] = useState(
    () =>
      data.buttons?.find((button) => button.active)?.label ??
      data.buttons?.[0]?.label,
  );
  const activeButton = data.buttons?.find(
    (button) => button.label === activeButtonLabel,
  );

  const [activeHoverIndex, setActiveHoverIndex] = useState(0);
  const activeHoverItem = data.hoverPanel?.[activeHoverIndex];

  const isBeige = data.background === "beige";
  const isImageRight = data.imagePosition === "right";
  const isFeaturePanel = data.layout === "feature-panel";

  const displayedImage = activeButton?.image ?? data.image;
  const displayedImageAlt = activeButton?.imageAlt ?? data.imageAlt;
  const displayedFeatures = activeButton?.features;

  const simpleLayoutImage = activeHoverItem?.image ?? data.image;
  const simpleLayoutImageAlt = activeHoverItem?.imageAlt ?? data.imageAlt;

  return (
    <motion.article
      ref={ref}
      id={`solution-${data.id}`}
      initial={
        prefersReducedMotion ? false : { opacity: 0, y: CARD_ANIMATE_OFFSET_PX }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: CARD_ANIMATE_VIEWPORT_AMOUNT }}
      transition={{ duration: CARD_ANIMATE_DURATION_S, ease: "easeOut" }}
      className={`scroll-mt-28 rounded-[28px] p-5 sm:p-8 md:p-10 lg:p-14 ${
        isBeige ? "bg-[#FBF2E8]" : "bg-white"
      }`}
    >
      {/* Mobile-only Eyebrow Heading */}
      <div className="mb-4 md:hidden">
        <p className="mb-2 text-[13px] font-medium tracking-[0.15em] text-[#8C8C84]">
          {data.index}/05
        </p>
        <h3 className="text-[26px] font-bold leading-tight text-[#212121]">
          {data.title}
        </h3>
      </div>

      {isFeaturePanel ? (
        <>
          <h3 className="mb-4 hidden text-[28px] font-bold leading-tight text-[#212121] md:block lg:text-[34px]">
            {data.title}
          </h3>
          <p className="mb-4 text-[16px] font-medium text-[#212121] lg:text-[18px]">
            {data.subtitle}
          </p>
          <div className="mb-8 flex flex-col gap-4 lg:mb-10">
            {data.description.map((paragraph, paragraphIndex) => (
              <p
                key={paragraphIndex}
                className="text-[14px] leading-relaxed text-[#4A4A4A] lg:text-[15px]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-10 lg:gap-14">
            <div className="relative min-h-[280px] w-full shrink-0 overflow-hidden rounded-[20px] md:aspect-auto md:min-h-[320px] md:w-[42%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: TAB_CROSSFADE_DURATION_S }}
                  className="absolute inset-0"
                >
                  <Image
                    src={displayedImage}
                    alt={displayedImageAlt}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex w-full flex-col gap-6 md:w-[58%]">
              {data.buttons && (
                <SolutionButtonGroup
                  buttons={data.buttons}
                  activeLabel={activeButtonLabel}
                  onSelect={setActiveButtonLabel}
                />
              )}

              <AnimatePresence mode="wait">
                {displayedFeatures && (
                  <motion.div
                    key={activeButtonLabel}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: TAB_CROSSFADE_DURATION_S }}
                  >
                    <FeatureList features={displayedFeatures} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`flex flex-col gap-8 md:items-stretch md:gap-10 lg:gap-14 ${
            isImageRight ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          {/* Image & Overlay */}
          <div className="w-full shrink-0 md:w-1/2">
            <div className="relative aspect-[4/3] min-h-[340px] w-full overflow-hidden rounded-[20px] sm:min-h-[400px] md:aspect-auto md:h-full md:min-h-[440px] lg:min-h-[560px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={simpleLayoutImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: TAB_CROSSFADE_DURATION_S }}
                  className="absolute inset-0"
                >
                  <Image
                    src={simpleLayoutImage}
                    alt={simpleLayoutImageAlt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {data.imageCaption && (
                <div className="absolute inset-x-3 bottom-3 flex flex-col gap-3 rounded-[16px] bg-black/55 p-4 backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:p-5 md:bottom-6 md:left-6 md:right-6 md:inset-x-auto md:max-w-[260px]">
                  {data.imageCaption.map((entry) => (
                    <div key={entry.title}>
                      <p className="mb-1 text-[14px] font-semibold text-white">
                        {entry.title}
                      </p>
                      <p className="text-[12px] leading-relaxed text-white/80 sm:text-[13px]">
                        {entry.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeHoverItem && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHoverItem.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: TAB_CROSSFADE_DURATION_S }}
                    className="absolute inset-x-3 bottom-3 max-h-[85%] overflow-y-auto rounded-[18px] border border-black/10 bg-[linear-gradient(160deg,rgba(0,0,0,0.30)_0%,rgba(0,0,0,0.15)_100%)] p-3.5 text-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.25)] backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)] sm:inset-x-4 sm:bottom-4 sm:p-5 md:bottom-6 md:inset-x-6"
                  >
                    <p className="mb-1 text-[14px] font-semibold text-white sm:text-[15px]">
                      {activeHoverItem.title}
                    </p>
                    <p className="whitespace-pre-line text-[11px] leading-relaxed text-white/90 sm:text-[13px]">
                      {activeHoverItem.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Content Column (Includes Subtitle, Description, Accordion & Hover List) */}
          {/* <div className="w-full md:w-1/2">
            <h3 className="mb-7 hidden text-[28px] font-bold leading-tight text-[#212121] md:block lg:text-[34px]">
              {data.title}
            </h3>
            <p className="mb-5 text-[16px] font-medium text-[#212121] lg:text-[18px]">
              {data.subtitle}
            </p>

            <div className="flex flex-col gap-4">
              {data.description.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="text-[14px] leading-relaxed text-[#4A4A4A] lg:text-[15px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {data.accordion && (
              <div className="mt-8 flex flex-col">
                {data.accordion.map((entry) => (
                  <SolutionAccordionItem key={entry.title} item={entry} />
                ))}
              </div>
            )}

            {data.hoverPanel && (
              <div className="mt-8">
                <SolutionHoverList
                  items={data.hoverPanel}
                  activeIndex={activeHoverIndex}
                  onActivate={setActiveHoverIndex}
                />
              </div>
            )}
          </div> */}
          <div className="flex w-full flex-col justify-center md:w-1/2">
            <h3 className="mb-7 hidden text-[32px] font-semibold leading-tight text-[#212121] md:block lg:text-[34px]">
              {data.title}
            </h3>
            <p className="mb-5 text-[16px] text-[#212121] lg:text-[20px]">
              {data.subtitle}
            </p>

            <div className="flex flex-col gap-4">
              {data.description.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="text-[14px] leading-relaxed text-[#4A4A4A] lg:text-[15px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {data.accordion && (
              <div className="mt-8 flex flex-col">
                {data.accordion.map((entry) => (
                  <SolutionAccordionItem key={entry.title} item={entry} />
                ))}
              </div>
            )}

            {data.hoverPanel && (
              <div className="mt-8">
                <SolutionHoverList
                  items={data.hoverPanel}
                  activeIndex={activeHoverIndex}
                  onActivate={setActiveHoverIndex}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </motion.article>
  );
}

export default React.memo(SolutionCard);
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import {
//   AnimatePresence,
//   motion,
//   useInView,
//   useReducedMotion,
// } from "framer-motion";
// import { HiArrowUpRight } from "react-icons/hi2";
// import type {
//   SolutionButton,
//   SolutionCardData,
//   SolutionFeature,
// } from "./solutionsData";
// import SolutionAccordionItem from "./SolutionAccordionItem";

// // Thin detection band centered on the viewport — a card only counts as
// // "active" once its box crosses this band, approximating "currently centered".
// const ACTIVE_VIEWPORT_MARGIN = "-45% 0px -45% 0px";
// const CARD_ANIMATE_DURATION_S = 0.6;
// const CARD_ANIMATE_OFFSET_PX = 32;
// const CARD_ANIMATE_VIEWPORT_AMOUNT = 0.3;
// const TAB_CROSSFADE_DURATION_S = 0.35;
// // Below this width, hover doesn't reliably exist (touch devices) — fall back to tap only
// const HOVER_ACTIVATION_MIN_WIDTH_PX = 1024;

// interface SolutionHoverListProps {
//   items: SolutionFeature[];
//   activeIndex: number;
//   onActivate: (index: number) => void;
// }

// function SolutionHoverList({
//   items,
//   activeIndex,
//   onActivate,
// }: SolutionHoverListProps) {
//   return (
//     <div className="flex flex-col">
//       {items.map((item, itemIndex) => {
//         const isActive = itemIndex === activeIndex;
//         return (
//           <div
//             key={item.title}
//             onClick={() => onActivate(itemIndex)}
//             onMouseEnter={() => {
//               if (
//                 typeof window !== "undefined" &&
//                 window.innerWidth >= HOVER_ACTIVATION_MIN_WIDTH_PX
//               ) {
//                 onActivate(itemIndex);
//               }
//             }}
//             className={`flex cursor-pointer items-center justify-between gap-4 border-t border-[#E4E0D8] py-4 first:border-t-0`}
//           >
//             <span
//               className={`text-[15px] transition-colors duration-[350ms] ${
//                 isActive
//                   ? "font-semibold text-[#212121]"
//                   : "font-normal text-[#8C8C84]"
//               }`}
//             >
//               {item.title}
//             </span>
//             <span
//               className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-[350ms] ${
//                 isActive
//                   ? "border-[#59624D] bg-[#59624D] text-white"
//                   : "border-[#D9D5CE] text-[#8C8C84]"
//               }`}
//             >
//               <HiArrowUpRight size={16} />
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// interface SolutionButtonGroupProps {
//   buttons: SolutionButton[];
//   activeLabel?: string;
//   onSelect: (label: string) => void;
//   className?: string;
// }

// function SolutionButtonGroup({
//   buttons,
//   activeLabel,
//   onSelect,
//   className = "",
// }: SolutionButtonGroupProps) {
//   return (
//     <div className={`flex flex-wrap items-center gap-3 ${className}`}>
//       {buttons.map((button) => {
//         const isActive = button.label === activeLabel;
//         return (
//           <button
//             key={button.label}
//             type="button"
//             onClick={() => onSelect(button.label)}
//             aria-pressed={isActive}
//             className={`cursor-pointer rounded-full border px-5 py-2.5 text-[13px] font-medium transition-colors duration-[350ms] ${
//               isActive
//                 ? "border-[#59624D] bg-[#59624D] text-white"
//                 : "border-[#D9D5CE] bg-transparent text-[#8C8C84]"
//             }`}
//           >
//             {button.label}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// function FeatureList({ features }: { features: SolutionFeature[] }) {
//   return (
//     <div className="flex flex-col gap-6">
//       {features.map((feature) => (
//         <div key={feature.title}>
//           <p className="mb-1 text-[15px] font-semibold text-[#212121]">
//             {feature.title}
//           </p>
//           <p className="text-[14px] leading-relaxed text-[#4A4A4A]">
//             {feature.description}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// interface SolutionCardProps {
//   data: SolutionCardData;
//   index: number;
//   onActiveChange: (index: number) => void;
// }

// function SolutionCard({ data, index, onActiveChange }: SolutionCardProps) {
//   const ref = useRef<HTMLElement>(null);
//   const isCentered = useInView(ref, {
//     margin: ACTIVE_VIEWPORT_MARGIN,
//     once: false,
//   });
//   const prefersReducedMotion = useReducedMotion();

//   useEffect(() => {
//     if (isCentered) onActiveChange(index);
//   }, [isCentered, index, onActiveChange]);

//   // Tabbed button groups (currently just Project Development) swap both the
//   // image and the feature list shown alongside it.
//   const [activeButtonLabel, setActiveButtonLabel] = useState(
//     () =>
//       data.buttons?.find((button) => button.active)?.label ??
//       data.buttons?.[0]?.label,
//   );
//   const activeButton = data.buttons?.find(
//     (button) => button.label === activeButtonLabel,
//   );

//   // Services.tsx-style hover list (currently just Property Management):
//   // hovering/clicking a row shows its title + description on the image.
//   const [activeHoverIndex, setActiveHoverIndex] = useState(0);
//   const activeHoverItem = data.hoverPanel?.[activeHoverIndex];

//   const isBeige = data.background === "beige";
//   const isImageRight = data.imagePosition === "right";
//   const isFeaturePanel = data.layout === "feature-panel";

//   const displayedImage = activeButton?.image ?? data.image;
//   const displayedImageAlt = activeButton?.imageAlt ?? data.imageAlt;
//   const displayedFeatures = activeButton?.features;

//   const simpleLayoutImage = activeHoverItem?.image ?? data.image;
//   const simpleLayoutImageAlt = activeHoverItem?.imageAlt ?? data.imageAlt;

//   return (
//     <motion.article
//       ref={ref}
//       id={`solution-${data.id}`}
//       initial={
//         prefersReducedMotion ? false : { opacity: 0, y: CARD_ANIMATE_OFFSET_PX }
//       }
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: CARD_ANIMATE_VIEWPORT_AMOUNT }}
//       transition={{ duration: CARD_ANIMATE_DURATION_S, ease: "easeOut" }}
//       className={`scroll-mt-28 rounded-[28px] ${
//         isBeige ? "bg-[#FBF2E8] p-6 sm:p-8 md:p-10 lg:p-14" : "bg-white"
//       }`}
//     >
//       {/* Mobile-only "0X/05 + title" eyebrow — sticky sidebar is hidden below md */}
//       <div className="mb-6 md:hidden">
//         <p className="mb-2 text-[13px] font-medium tracking-[0.15em] text-[#8C8C84]">
//           {data.index}/05
//         </p>
//         <h3 className="text-[26px] font-bold leading-tight text-[#212121]">
//           {data.title}
//         </h3>
//       </div>

//       {isFeaturePanel ? (
//         <>
//           {/* Full-width heading block */}
//           <h3 className="mb-4 hidden text-[28px] font-bold leading-tight text-[#212121] md:block lg:text-[34px]">
//             {data.title}
//           </h3>
//           <p className="mb-4 text-[16px] font-medium text-[#212121] lg:text-[18px]">
//             {data.subtitle}
//           </p>
//           <div className="mb-8 flex flex-col gap-4 lg:mb-10">
//             {data.description.map((paragraph, paragraphIndex) => (
//               <p
//                 key={paragraphIndex}
//                 className="text-[14px] leading-relaxed text-[#4A4A4A] lg:text-[15px]"
//               >
//                 {paragraph}
//               </p>
//             ))}
//           </div>

//           {/* Image (left) + tabbed buttons/features (right) */}
//           <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-10 lg:gap-14">
//             <div className="relative w-full overflow-hidden rounded-[20px] md:w-[42%] md:min-h-[320px] aspect-[4/3] md:aspect-auto shrink-0">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={displayedImage}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: TAB_CROSSFADE_DURATION_S }}
//                   className="absolute inset-0"
//                 >
//                   <Image
//                     src={displayedImage}
//                     alt={displayedImageAlt}
//                     fill
//                     loading="lazy"
//                     sizes="(min-width: 768px) 40vw, 100vw"
//                     className="object-cover"
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             <div className="flex w-full flex-col gap-6 md:w-[58%]">
//               {data.buttons && (
//                 <SolutionButtonGroup
//                   buttons={data.buttons}
//                   activeLabel={activeButtonLabel}
//                   onSelect={setActiveButtonLabel}
//                 />
//               )}

//               <AnimatePresence mode="wait">
//                 {displayedFeatures && (
//                   <motion.div
//                     key={activeButtonLabel}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: TAB_CROSSFADE_DURATION_S }}
//                   >
//                     <FeatureList features={displayedFeatures} />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div
//           className={`flex flex-col gap-8 md:items-stretch md:gap-10 lg:gap-14 ${
//             isImageRight ? "md:flex-row-reverse" : "md:flex-row"
//           }`}
//         >
//           {/* Image */}
//           <div className="w-full shrink-0 md:w-1/2">
//             <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] md:aspect-auto md:h-full md:min-h-[440px] lg:min-h-[560px]">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={simpleLayoutImage}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: TAB_CROSSFADE_DURATION_S }}
//                   className="absolute inset-0"
//                 >
//                   <Image
//                     src={simpleLayoutImage}
//                     alt={simpleLayoutImageAlt}
//                     fill
//                     loading="lazy"
//                     sizes="(min-width: 768px) 45vw, 100vw"
//                     className="object-cover"
//                   />
//                 </motion.div>
//               </AnimatePresence>

//               {data.imageCaption && (
//                 <div className="absolute inset-x-4 bottom-4 flex flex-col gap-4 rounded-[16px] bg-black/55 p-5 backdrop-blur-sm md:inset-x-auto md:left-6 md:right-6 md:bottom-6 md:max-w-[260px]">
//                   {data.imageCaption.map((entry) => (
//                     <div key={entry.title}>
//                       <p className="mb-1 text-[14px] font-semibold text-white">
//                         {entry.title}
//                       </p>
//                       <p className="text-[13px] leading-relaxed text-white/80">
//                         {entry.description}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {activeHoverItem && (
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={activeHoverItem.title}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: TAB_CROSSFADE_DURATION_S }}
//                     // className="absolute inset-x-4 bottom-4 rounded-[20px] border border-white/30 bg-[linear-gradient(160deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.55)_100%)] p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)] md:inset-x-6 md:bottom-6"
//                     className="absolute inset-x-4 bottom-4 rounded-[20px] border border-white/40 bg-[linear-gradient(160deg,rgba(255,255,255,0.40)_0%,rgba(255,255,255,0.15)_100%)] p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.15)] backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)] md:inset-x-6 md:bottom-6"
//                   >
//                     <p className="mb-1 text-[15px] font-semibold text-white">
//                       {activeHoverItem.title}
//                     </p>
//                     <p className="text-[13px] leading-relaxed text-white/80">
//                       {activeHoverItem.description}
//                     </p>
//                   </motion.div>
//                 </AnimatePresence>
//               )}
//             </div>
//           </div>

//           {/* Content */}
//           <div className="w-full md:w-1/2">
//             <h3 className="mb-4 hidden text-[28px] font-bold leading-tight text-[#212121] md:block lg:text-[34px]">
//               {data.title}
//             </h3>
//             <p className="mb-4 text-[16px] font-medium text-[#212121] lg:text-[18px]">
//               {data.subtitle}
//             </p>

//             <div className="flex flex-col gap-4">
//               {data.description.map((paragraph, paragraphIndex) => (
//                 <p
//                   key={paragraphIndex}
//                   className="text-[14px] leading-relaxed text-[#4A4A4A] lg:text-[15px]"
//                 >
//                   {paragraph}
//                 </p>
//               ))}
//             </div>

//             {data.accordion && (
//               <div className="mt-8 flex flex-col">
//                 {data.accordion.map((entry) => (
//                   <SolutionAccordionItem key={entry.title} item={entry} />
//                 ))}
//               </div>
//             )}

//             {data.hoverPanel && (
//               <div className="mt-8">
//                 <SolutionHoverList
//                   items={data.hoverPanel}
//                   activeIndex={activeHoverIndex}
//                   onActivate={setActiveHoverIndex}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </motion.article>
//   );
// }

// export default React.memo(SolutionCard);
