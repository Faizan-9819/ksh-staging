// "use client";

// import { AnimatePresence, motion } from "framer-motion";

// const TimeCard = ({ image, content, isAbove }) => {
//   return (
//     <div>
//       <motion.div
//         className={`${
//           isAbove ? "topcard" : "bcard"
//         } relative w-[320px] 2xl:w-[320px] sm:block hidden h-[200px] 2xl:h-[220px] overflow-hidden cursor-pointer`}
//         initial="rest"
//         whileHover="hover"
//         animate="rest"
//       >
//         {/* Image: covers the entire card */}
//         <img
//           src={image || "/time/t1.png"}
//           alt="Time Card"
//           className="absolute inset-0 w-full rounded-lg h-full object-cover"
//         />

//         {/* Animated overlay for content */}
//         <motion.div
//           className="absolute inset-0 rounded-lg bg-[#C5BDAC] flex items-center"
//           variants={{
//             rest: { y: "100%" }, // Hidden below the card initially
//             hover: { y: "0%" }, // Slides up to reveal the content on hover
//           }}
//           transition={{ duration: 0.6, ease: [0.7, 0, 0.4, 1] }}
//         >
//           <div className="p-4 text-black text-[14px] fsans-400">
//             {content ||
//               "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem "}
//           </div>
//         </motion.div>
//       </motion.div>
//       <div
//         className={`sm:hidden border-[2px] border-[#C5BDAC] ${
//           isAbove ? "topcard" : "bcard"
//         } min-w-full h-[400px] overflow-hidden flex it
//         ems-center flex-col cursor-pointer`}
//       >
//         {/* Image */}
//         <div className="w-full h-[200px]">
//           <img
//             src={image || "/time/t1.png"}
//             alt="Time Card"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Static Content Below Image */}
//         <div className="h-full w-full flex items-center p-4 text-black text-[14px] fsans-400 bg-white">
//           {content ||
//             "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet"}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeCard;

// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// interface TimeCardProps {
//   image?: string;
//   content?: React.ReactNode;
//   isAbove?: boolean;
// }

// const TimeCard: React.FC<TimeCardProps> = ({ image, content, isAbove }) => {
//   // Mobile view click toggle state
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       {/* =================================================================
//           DESKTOP VIEW (sm:block hidden) - Hover Effect
//          ================================================================= */}
//       <motion.div
//         className={`${
//           isAbove ? "topcard" : "bcard"
//         } relative w-[320px] 2xl:w-[320px] sm:block hidden h-[200px] 2xl:h-[220px] overflow-hidden cursor-pointer`}
//         initial="rest"
//         whileHover="hover"
//         animate="rest"
//       >
//         {/* Full Image */}
//         <img
//           src={image || "/time/t1.png"}
//           alt="Time Card"
//           className="absolute inset-0 w-full rounded-lg h-full object-cover"
//         />

//         {/* Animated Overlay */}
//         <motion.div
//           className="absolute inset-0 rounded-lg bg-[#C5BDAC] flex items-center"
//           variants={{
//             rest: { y: "100%" },
//             hover: { y: "0%" },
//           }}
//           transition={{ duration: 0.6, ease: [0.7, 0, 0.4, 1] }}
//         >
//           <div className="p-4 text-black text-[14px] fsans-400">
//             {content ||
//               "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem "}
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* =================================================================
//           MOBILE VIEW (sm:hidden) — full-bleed image; tap anywhere on the
//           card to slide the content overlay up over the image (same variant
//           timing as the desktop hover above), tap again to slide it back
//           down. Card footprint (400px, min-w-full) is unchanged from before.
//          ================================================================= */}
//       <div
//         onClick={() => setIsOpen((prev) => !prev)}
//         className={`${
//           isAbove ? "topcard" : "bcard"
//         } sm:hidden relative border-[2px] border-[#C5BDAC] rounded-lg min-w-full h-[400px] overflow-hidden cursor-pointer select-none`}
//       >
//         {/* Full Cover Image */}
//         <img
//           src={image || "/time/t1.png"}
//           alt="Time Card"
//           className="absolute inset-0 w-full h-full object-cover"
//         />

//         {/* Top-Right Plus (+) SVG Icon — rotates into a close (×) cue when open */}
//         <div className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className={`h-4 w-4 transition-transform duration-300 ${
//               isOpen ? "rotate-45" : "rotate-0"
//             }`}
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2.5}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 4.5v15m7.5-7.5h-15"
//             />
//           </svg>
//         </div>

//         {/* Sliding Content Overlay — same slide-up-over-the-image effect as
//             the desktop hover variant above, driven by tap instead of hover */}
//         <motion.div
//           className="absolute inset-0 z-10 bg-[#C5BDAC] flex items-center p-4 text-black text-[14px] fsans-400"
//           initial={false}
//           animate={{ y: isOpen ? "0%" : "100%" }}
//           transition={{ duration: 0.6, ease: [0.7, 0, 0.4, 1] }}
//         >
//           <div className="w-full max-h-full overflow-y-auto">
//             {content ||
//               "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet"}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default TimeCard;

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface TimeCardProps {
  image?: string;
  content?: React.ReactNode;
  isAbove?: boolean;
}

const TimeCard: React.FC<TimeCardProps> = ({ image, content, isAbove }) => {
  // Mobile view click toggle state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center">
      {/* =================================================================
          DESKTOP VIEW (lg:block hidden) - Hover Effect (Unchanged)
         ================================================================= */}
      <motion.div
        className={`${
          isAbove ? "topcard" : "bcard"
        } relative w-[320px] 2xl:w-[320px] lg:block hidden h-[200px] 2xl:h-[220px] overflow-hidden cursor-pointer`}
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* Full Image */}
        <img
          src={image || "/time/t1.png"}
          alt="Time Card"
          className="absolute inset-0 w-full rounded-lg h-full object-cover"
        />

        {/* Animated Overlay */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-[#C5BDAC] flex items-center"
          variants={{
            rest: { y: "100%" },
            hover: { y: "0%" },
          }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.4, 1] }}
        >
          <div className="p-4 text-black text-[14px] fsans-400">
            {content ||
              "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem "}
          </div>
        </motion.div>
      </motion.div>

      {/* =================================================================
          MOBILE + TABLET VIEW (lg:hidden) - Full Image with Click Slide-Up Overlay
         ================================================================= */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${
          isAbove ? "topcard" : "bcard"
        } lg:hidden relative border-[2px] border-[#C5BDAC] rounded-lg w-full h-[400px] overflow-hidden cursor-pointer select-none`}
      >
        {/* Full Cover Image */}
        <img
          src={image || "/time/t1.png"}
          alt="Time Card"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top-Right Plus (+) SVG Icon - Rotates to (x) when open */}
        <div className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>

        {/* Sliding Content Overlay - Exact Desktop Easing & Duration */}
        <motion.div
          className="absolute inset-0 z-10 bg-[#C5BDAC] flex items-center p-4 text-black text-[14px] fsans-400"
          initial={false}
          animate={{ y: isOpen ? "0%" : "100%" }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.4, 1] }}
        >
          <div className="w-full max-h-full overflow-y-auto">
            {content ||
              "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet"}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TimeCard;
