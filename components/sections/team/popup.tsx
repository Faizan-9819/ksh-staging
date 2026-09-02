// "use client";

// import { motion } from "framer-motion";
// import { X } from "lucide-react";
// import { FaLinkedinIn } from "react-icons/fa";

// type PopupProps = {
//   open: boolean;
//   onClose: () => void;
//   member: {
//     name: string;
//     designation: string;
//     linkedin?: string;
//     description: string;
//   } | null;
// };

// export default function Popup({ onClose, member }: PopupProps) {
//   if (!member) return null;

//   return (
//     <motion.div
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-5"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 60,
//           scale: 0.96,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//           scale: 1,
//         }}
//         exit={{
//           opacity: 0,
//           y: 60,
//           scale: 0.96,
//         }}
//         transition={{
//           duration: 0.45,
//           ease: [0.22, 1, 0.36, 1],
//         }}
//         className="relative w-full max-w-[780px] rounded-[20px] bg-white px-10 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-md bg-[#F5F5F5] text-[#A8A8A8] transition-colors hover:bg-[#EBEBEB]"
//         >
//           <X size={18} />
//         </button>

//         {/* Name */}
//         <h2 className="text-[33px] font-medium leading-[140%] text-[#212121]">
//           {member.name}
//         </h2>

//         {/* Designation */}
//         <p className="mt-3 text-[19px] font-medium leading-[140%] text-[#59624D]">
//           {member.designation}
//         </p>

//         {/* Description */}
//         <p className="mt-4 text-[16px] leading-[170%] text-[#3F3F3F]">
//           {member.description}
//         </p>

//         {/* LinkedIn */}
//         {member.linkedin && (
//           <a
//             href={member.linkedin}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-8 inline-flex items-center gap-4"
//           >
//             <div className="flex h-12 w-12 items-center justify-center rounded bg-[#59624D] text-white">
//               <FaLinkedinIn size={20} />
//             </div>

//             <span className="text-[18px] font-medium text-[#212121]">
//               Connect on LinkedIn
//             </span>
//           </a>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

type PopupProps = {
  open: boolean;
  onClose: () => void;
  member: {
    name: string;
    designation: string;
    linkedin?: string;
    academics?: string[];
    description: string;
  } | null;
};

export default function Popup({ onClose, member }: PopupProps) {
  const descRef = useRef<HTMLParagraphElement>(null);
  const [showFade, setShowFade] = useState(false);

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const isScrollable = el.scrollHeight > el.clientHeight + 1;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      setShowFade(isScrollable && !atBottom);
    };

    checkOverflow();
    el.addEventListener("scroll", checkOverflow);
    window.addEventListener("resize", checkOverflow);
    return () => {
      el.removeEventListener("scroll", checkOverflow);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [member]);

  useEffect(() => {
    if (!member) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [member, onClose]);

  if (!member) return null;

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
        initial={{
          opacity: 0,
          y: 60,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 60,
          scale: 0.96,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[860px] rounded-[20px] bg-white px-6 pt-16 pb-8 lg:px-10 lg:py-10 shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-[#F5F5F5] text-[#A8A8A8] transition-colors hover:bg-[#EBEBEB] lg:right-6 lg:top-6"
        >
          <X size={18} />
        </button>

        {/* Name */}
        <h2 className="text-[28px] font-medium leading-[140%] text-[#212121] lg:text-[33px]">
          {member.name}
        </h2>

        {/* Designation */}
        <p className="mt-3 text-[17px] font-medium leading-[140%] text-[#59624D] lg:text-[19px]">
          {member.designation}
        </p>

        {/* Academics */}
        {member.academics && member.academics.length > 0 && (
          <div className="mt-2 rounded-[14px] py-2">
            <ul className="m-0 list-none space-y-1.5 p-0">
              {member.academics.map((line, i) => (
                <li
                  key={i}
                  className="text-[15px] leading-[1.5] text-[#767676]"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Description — the only part of the popup that scrolls */}
        <div className="relative mt-4">
          <p
            ref={descRef}
            className="popup-scrollbar max-h-[240px] overflow-y-auto pr-3 text-[16px] leading-[170%] text-[#3F3F3F]"
            dangerouslySetInnerHTML={{ __html: member.description }}
            data-lenis-prevent
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-10.25 bg-linear-to-t from-white to-transparent transition-opacity duration-300 ${
              showFade ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* LinkedIn */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded bg-[#0069B7] text-white">
              <FaLinkedinIn size={20} />
            </div>

            <span className="text-[18px] font-medium text-[#212121]">
              Connect on LinkedIn
            </span>
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}
