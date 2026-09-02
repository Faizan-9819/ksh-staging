// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Hotspot = ({ title, description, position, iwidth, fwidth }) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className="relative inline-flex items-center cursor-pointer"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Fixed Dot */}

//       <motion.div
//         initial={false}
//         animate={{
//           borderWidth: hovered ? "0px" : "8px",
//           borderColor: hovered ? "#ffffff00" : "#8F53A1",
//           height: hovered ? "15px" : "25px",
//           width: hovered ? "15px" : "25px",
//           backgroundColor: hovered ? "#8F53A1" : "#FFFFFF",
//         }}
//         transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//         // className="rounded-full border-solid z-10 w-[30px] h-[30px] box-border"
//         className={`rounded-full border-solid z-10 box-border`}
//       />

//       <motion.div
//         style={{ border: "none", outline: "none" }}
//         initial={false}
//         animate={{
//           width: hovered ? "250px" : "140px",
//           height: "auto",
//           left: hovered ? "-20px" : "25px",
//           paddingLeft: hovered ? "48px" : "12px",
//           borderRadius: hovered ? "60px" : "40px",
//         }}
//         transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//         className={`absolute top-1/2 -translate-y-1/2 p-2 bg-white/70 backdrop-blur-md overflow-hidden border-0 outline-none ${
//           position === "left" ? "hidden" : "block"
//         }`}
//       >
//         {/* Title */}
//         <p
//           className="text-[14px] bw-sb text-black leading-tight overflow-hidden"
//           dangerouslySetInnerHTML={{ __html: title }}
//         />

//         {/* Description (only shows when hovered) */}
//         <AnimatePresence>
//           {hovered && (
//             <motion.div
//               key="desc"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="text-[13px] mt-1 whitespace-nowrap leading-[120%] overflow-hidden pr-[25px]"
//               dangerouslySetInnerHTML={{ __html: description }}
//             />
//           )}
//         </AnimatePresence>
//       </motion.div>
//       {/* left */}
//       <motion.div
//         style={{ border: "none", outline: "none" }}
//         initial={false}
//         animate={{
//           width: hovered ? "250px" : "140px",
//           height: "auto",
//           left: hovered ? "-210px" : "-140px",
//           paddingLeft: hovered ? "28px" : "12px",
//           borderRadius: hovered ? "60px" : "40px",
//         }}
//         transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//         className={`absolute top-1/2 -translate-y-1/2 p-2 bg-white/70 backdrop-blur-md overflow-hidden border-0 outline-none ${
//           position === "left" ? "block" : "hidden"
//         }`}
//       >
//         {/* Title */}
//         <p
//           className="text-[14px] bw-sb text-black leading-tight overflow-hidden"
//           dangerouslySetInnerHTML={{ __html: title }}
//         />

//         {/* Description (only shows when hovered) */}
//         <AnimatePresence>
//           {hovered && (
//             <motion.div
//               key="desc"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="text-[13px] mt-1 whitespace-nowrap leading-[120%] overflow-hidden pr-[25px]"
//               dangerouslySetInnerHTML={{ __html: description }}
//             />
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// export default Hotspot;
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
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const HotspotF = ({ title, description, position, iwidth, fwidth }) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className="relative inline-flex items-center cursor-pointer"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Fixed Dot */}
//       <motion.div
//         initial={false}
//         animate={{
//           borderWidth: hovered ? "0px" : "8px",
//           borderColor: hovered ? "#ffffff00" : "#8F53A1",
//           height: hovered ? "15px" : "25px",
//           width: hovered ? "15px" : "25px",
//           backgroundColor: hovered ? "#8F53A1" : "#FFFFFF",
//           zIndex: hovered ? 30 : 10,
//         }}
//         transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//         className="rounded-full border-solid z-10 box-border"
//       />

//       {/* Right side tooltip */}
//       <motion.div
//         style={{ border: "none", outline: "none" }}
//         initial={false}
//         animate={{
//           width: hovered ? `${fwidth}px` : `${iwidth}px`,
//           height: "auto",
//           left: hovered ? "-20px" : "25px",
//           paddingLeft: hovered ? "48px" : "12px",
//           borderRadius: hovered ? "60px" : "40px",
//           zIndex: hovered ? 20 : 0,
//         }}
//         transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//         className={`absolute top-1/2 -translate-y-1/2 p-2 bg-white/70 backdrop-blur-md overflow-hidden border-0 outline-none ${
//           position === "left" ? "hidden" : "block"
//         }`}
//       >
//         <p
//           className="text-[14px] bw-sb whitespace-nowrap text-black leading-tight overflow-hidden"
//           dangerouslySetInnerHTML={{ __html: title }}
//         />
//         <AnimatePresence>
//           {hovered && (
//             <motion.div
//               key="desc"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="text-[13px] mt-1 whitespace-nowrap leading-[120%] overflow-hidden pr-[25px]"
//               dangerouslySetInnerHTML={{ __html: description }}
//             />
//           )}
//         </AnimatePresence>
//       </motion.div>

//       {/* Left side tooltip */}
//       <motion.div
//         style={{ border: "none", outline: "none" }}
//         initial={false}
//         animate={{
//           width: hovered ? `${fwidth}px` : `${iwidth}px`,
//           height: "auto",
//           left: hovered ? `-${fwidth - 40}px` : `-${iwidth}px`,
//           paddingLeft: hovered ? "28px" : "12px",
//           paddingRight: hovered ? "48px" : "12px",
//           borderRadius: hovered ? "60px" : "40px",
//           zIndex: hovered ? 20 : 0,
//         }}
//         transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//         className={`absolute top-1/2 -translate-y-1/2 p-2 bg-white/70 backdrop-blur-md overflow-hidden border-0 outline-none ${
//           position === "left" ? "block" : "hidden"
//         }`}
//       >
//         <p
//           className="text-[14px] bw-sb text-black leading-tight overflow-hidden whitespace-nowrap"
//           dangerouslySetInnerHTML={{ __html: title }}
//         />
//         <AnimatePresence>
//           {hovered && (
//             <motion.div
//               key="desc"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="text-[13px] mt-1 whitespace-nowrap leading-[120%] overflow-hidden pr-[25px]"
//               dangerouslySetInnerHTML={{ __html: description }}
//             />
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// export default HotspotF;

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HotspotF = ({ title, description, position, iwidth, fwidth }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center cursor-pointer`}
      style={{ zIndex: hovered ? 50 : 1 }} // ⬅ container zIndex so hovered hotspot is always on top
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Fixed Dot */}
      <motion.div
        initial={false}
        animate={{
          borderWidth: hovered ? "0px" : "8px",
          borderColor: hovered ? "#ffffff00" : "#8F53A1",
          height: hovered ? "15px" : "25px",
          width: hovered ? "15px" : "25px",
          backgroundColor: hovered ? "#8F53A1" : "#FFFFFF",
          zIndex: hovered ? 60 : 0, // ⬅ dot on top while hovered
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="rounded-full border-solid box-border"
      />

      {/* Right side tooltip */}
      <motion.div
        style={{ border: "none", outline: "none" }}
        initial={false}
        animate={{
          width: hovered ? `${fwidth}px` : `${iwidth}px`,
          height: "auto",
          left: hovered ? "-20px" : "25px",
          paddingLeft: hovered ? "48px" : "12px",
          borderRadius: hovered ? "60px" : "40px",
          zIndex: hovered ? 55 : 0, // ⬅ tooltip behind dot but above others
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={`absolute top-1/2 -translate-y-1/2 p-2 bg-white/70 backdrop-blur-md overflow-hidden border-0 outline-none ${position === "left" ? "hidden" : "block"
          }`}
      >
        <p
          className="text-[14px] bw-sb whitespace-nowrap text-black leading-tight overflow-hidden"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="desc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[12px] mt-1 whitespace-nowrap leading-[120%] overflow-hidden pr-[25px]"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Left side tooltip */}
      <motion.div
        style={{ border: "none", outline: "none" }}
        initial={false}
        animate={{
          width: hovered ? `${fwidth}px` : `${iwidth}px`,
          height: "auto",
          left: hovered ? `-${fwidth - 40}px` : `-${iwidth}px`,
          paddingLeft: hovered ? "28px" : "12px",
          paddingRight: hovered ? "48px" : "12px",
          borderRadius: hovered ? "60px" : "40px",
          zIndex: hovered ? 55 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={`absolute top-1/2 -translate-y-1/2 p-2 bg-white/70 backdrop-blur-md overflow-hidden border-0 outline-none ${position === "left" ? "block" : "hidden"
          }`}
      >
        <p
          className="text-[14px] bw-sb text-black leading-tight overflow-hidden whitespace-nowrap"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="desc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[12px] mt-1 whitespace-nowrap leading-[120%] overflow-hidden pr-[25px]"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default HotspotF;
