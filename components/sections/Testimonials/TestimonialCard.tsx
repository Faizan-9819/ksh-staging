// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import {
//   AnimatePresence,
//   motion,
//   useInView,
//   useReducedMotion,
// } from "framer-motion";
// import { isScrollJumpInProgress } from "@/components/ui/LenisProvider";
// import type { SolutionCardData } from "./TestiData";

// const ACTIVE_VIEWPORT_MARGIN = "-45% 0px -45% 0px";
// const CARD_ANIMATE_DURATION_S = 0.6;
// const CARD_ANIMATE_OFFSET_PX = 32;
// const CARD_ANIMATE_VIEWPORT_AMOUNT = 0.3;
// const NAME_DESIGNATION_SEPARATOR = " — ";
// const SCROLLBAR_IDLE_HIDE_DELAY_MS = 800;

// interface TestimonialCardProps {
//   data: SolutionCardData;
//   index: number;
//   onActiveChange: (index: number) => void;
// }

// function TestimonialCard({
//   data,
//   index,
//   onActiveChange,
// }: TestimonialCardProps) {
//   const ref = useRef<HTMLElement>(null);
//   const isCentered = useInView(ref, {
//     margin: ACTIVE_VIEWPORT_MARGIN,
//     once: false,
//   });
//   const prefersReducedMotion = useReducedMotion();

//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const [isHovering, setIsHovering] = useState(false);
//   // JS-driven rather than a plain CSS `:hover` selector on the scrollbar
//   // pseudo-elements — browser support for re-evaluating
//   // ::-webkit-scrollbar-thumb / scrollbar-color off a container's :hover
//   // state is inconsistent, so this class is the one source of truth for
//   // "should the thumb be visible right now" in globals.css.
//   const showScrollbar = isScrolling || isHovering;

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;
//     let hideTimeoutId: ReturnType<typeof setTimeout>;
//     const onScroll = () => {
//       setIsScrolling(true);
//       clearTimeout(hideTimeoutId);
//       hideTimeoutId = setTimeout(
//         () => setIsScrolling(false),
//         SCROLLBAR_IDLE_HIDE_DELAY_MS,
//       );
//     };
//     el.addEventListener("scroll", onScroll, { passive: true });
//     return () => {
//       el.removeEventListener("scroll", onScroll);
//       clearTimeout(hideTimeoutId);
//     };
//   }, []);

//   useEffect(() => {
//     // Skip updates for cards the sidebar-click scroll is just passing
//     // through — otherwise every card that crosses the center band during
//     // the jump re-renders the sidebar, which is what reads as the active
//     // item flickering and the sticky sidebar itself stuttering.
//     if (isCentered && !isScrollJumpInProgress()) onActiveChange(index);
//   }, [isCentered, index, onActiveChange]);

//   const isBeige = data.background === "beige";
//   const isImageRight = data.imagePosition === "right";

//   const separatorIndex = data.subtitle.indexOf(NAME_DESIGNATION_SEPARATOR);
//   const name =
//     separatorIndex === -1
//       ? data.subtitle
//       : data.subtitle.slice(0, separatorIndex);
//   const designation =
//     separatorIndex === -1
//       ? ""
//       : data.subtitle.slice(separatorIndex + NAME_DESIGNATION_SEPARATOR.length);

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
//       className={`scroll-mt-28 rounded-[28px] p-5 sm:p-8 md:p-10 lg:p-14 ${
//         isBeige ? "bg-[#FBF2E8]" : "bg-white"
//       }`}
//     >
//       {/* Mobile-only Eyebrow Heading */}
//       {/* <div className="mb-4 md:hidden">
//         <p className="mb-2 text-[13px] font-medium tracking-[0.15em] text-[#8C8C84]">
//           {data.index}/07
//         </p>
//         <h3 className="text-[26px] font-bold leading-tight text-[#212121]">
//           {data.title}
//         </h3>
//       </div> */}

//       <div
//         className={`flex flex-col gap-8 md:items-stretch md:gap-10 lg:gap-14 ${
//           isImageRight ? "md:flex-row-reverse" : "md:flex-row"
//         }`}
//       >
//         {/* Image */}
//         <div className="w-full shrink-0 md:w-1/2">
//           <div className="relative aspect-[4/3] min-h-[260px] w-full overflow-hidden rounded-[20px] sm:min-h-[300px] md:aspect-auto md:h-full md:min-h-auto 2xl:min-h-[480px]">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={data.image}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.35 }}
//                 className="absolute inset-0"
//               >
//                 <Image
//                   src={data.image}
//                   alt={data.imageAlt}
//                   fill
//                   loading="lazy"
//                   sizes="(min-width: 768px) 45vw, 100vw"
//                   className="object-cover"
//                 />
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Content Column: description, then name, then designation */}
//         <div className="flex w-full flex-col justify-center md:w-auto md:flex-1">
//           <div className="relative">
//             <div
//               ref={scrollRef}
//               onMouseEnter={() => setIsHovering(true)}
//               onMouseLeave={() => setIsHovering(false)}
//               className={`testimonial-scroll mb-5 flex max-h-[220px] flex-col gap-4 overflow-y-auto pr-3 sm:max-h-[240px] md:max-h-[250px] ${
//                 showScrollbar ? "is-scrolling" : ""
//               }`}
//             >
//               {data.description.map((paragraph, paragraphIndex) => (
//                 <p
//                   key={paragraphIndex}
//                   className="text-[14px] leading-[1.4] text-[#4A4A4A] lg:text-[16px]"
//                 >
//                   {paragraph}
//                 </p>
//               ))}
//             </div>

//             {/* Subtle bottom fade hinting at scrollable content — always
//                 shown, regardless of whether the description overflows */}
//             <div
//               aria-hidden
//               className={`pointer-events-none absolute inset-x-0 bottom-0 block h-8 bg-gradient-to-t to-transparent ${
//                 isBeige ? "from-[#FBF2E8]" : "from-white"
//               }`}
//             />
//           </div>

//           <p className="text-[25px] font-sora tracking-[-0.64px] font-semibold text-[#212121] 2xl:text-[32px]">
//             {name}
//           </p>
//           {designation && (
//             <p className="mt-1 max-w-[350px] text-[14px] text-[#8C8C84] lg:text-[16px]">
//               {designation}
//             </p>
//           )}
//         </div>
//       </div>
//     </motion.article>
//   );
// }

// export default React.memo(TestimonialCard);

//
//
//

"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { isScrollJumpInProgress } from "@/components/ui/LenisProvider";
import type { SolutionCardData } from "./TestiData";

const ACTIVE_VIEWPORT_MARGIN = "-45% 0px -45% 0px";
const CARD_ANIMATE_DURATION_S = 0.6;
const CARD_ANIMATE_OFFSET_PX = 32;
const CARD_ANIMATE_VIEWPORT_AMOUNT = 0.3;
const NAME_DESIGNATION_SEPARATOR = " — ";

interface TestimonialCardProps {
  data: SolutionCardData;
  index: number;
  onActiveChange: (index: number) => void;
}

function TestimonialCard({
  data,
  index,
  onActiveChange,
}: TestimonialCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isCentered = useInView(ref, {
    margin: ACTIVE_VIEWPORT_MARGIN,
    once: false,
  });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isCentered && !isScrollJumpInProgress()) onActiveChange(index);
  }, [isCentered, index, onActiveChange]);

  const isBeige = data.background === "beige";
  const isImageRight = data.imagePosition === "right";

  const separatorIndex = data.subtitle.indexOf(NAME_DESIGNATION_SEPARATOR);
  const name =
    separatorIndex === -1
      ? data.subtitle
      : data.subtitle.slice(0, separatorIndex);
  const designation =
    separatorIndex === -1
      ? ""
      : data.subtitle.slice(separatorIndex + NAME_DESIGNATION_SEPARATOR.length);

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
      <div
        className={`flex flex-col gap-8 md:items-center md:gap-10 lg:gap-14 ${
          isImageRight ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Image */}
        <div className="w-full shrink-0 md:w-1/2 2xl:w-[420px]">
          <div className="relative aspect-[4/3] min-h-[260px] w-full overflow-hidden rounded-[20px] sm:min-h-[300px] 2xl:h-[440px] 2xl:w-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={data.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={data.image}
                  alt={data.imageAlt}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/*  */}
        {/* Content Column */}
        <div className="flex w-full flex-col justify-center md:w-auto md:flex-1">
          <div className="mb-5 flex flex-col gap-4">
            {data.description.map((paragraph, paragraphIndex) => (
              <p
                key={paragraphIndex}
                className="text-[14px] leading-[1.4] text-[#4A4A4A] lg:text-[16px]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <p className="text-[25px] font-sora tracking-[-0.64px] font-semibold text-[#212121] 2xl:text-[32px]">
            {name}
          </p>
          {designation && (
            <p className="mt-1 max-w-[350px] text-[14px] text-[#8C8C84] lg:text-[16px]">
              {designation}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default React.memo(TestimonialCard);
