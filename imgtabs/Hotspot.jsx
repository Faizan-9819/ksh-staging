// "use client";
// import React, { useState } from "react";

// const Hotspot = ({ title, description }) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className="relative inline-flex items-center cursor-pointer"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Circle */}
//       <div className="w-5 h-5 rounded-full bg-purple-600 border-4 border-white flex-shrink-0"></div>

//       {/* Content bubble */}
//       <div
//         className={`ml-2 px-3 py-2 bg-white transition-all duration-300 overflow-hidden ${
//           hovered ? "max-w-xs" : "max-w-[120px]"
//         }`}
//       >
//         <p className="text-sm font-semibold text-black leading-tight">
//           {title}
//         </p>
//         <p
//           className={`text-sm text-gray-600 transition-opacity duration-300 ${
//             hovered ? "opacity-100 mt-1" : "opacity-0 h-0"
//           }`}
//         >
//           {description}
//         </p>
//       </div>
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
// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Hotspot = ({ title, description }) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className="relative inline-flex items-center cursor-pointer"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Circle */}
//       <div className="w-5 h-5 rounded-full bg-purple-600 border-4 border-white flex-shrink-0"></div>

//       {/* Content bubble */}
//       <motion.div
//         initial={false}
//         animate={{
//           width: hovered ? "250px" : "100px",
//           height: hovered ? "100px" : "40px",
//         }}
//         transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//         className="ml-2 px-3 py-2 bg-white overflow-hidden rounded shadow"
//       >
//         {/* Title with HTML */}
//         <p
//           className="text-sm font-semibold text-black leading-tight whitespace-nowrap overflow-hidden"
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
//               className="text-sm text-gray-600 mt-1 whitespace-nowrap"
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
// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Hotspot = ({ title, description }) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className="relative inline-flex items-center cursor-pointer"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div className="hover:bg-white relative">
//         {/* Fixed Dot */}
//         <div className="w-5 h-5 rounded-full bg-purple-600 border-4 border-white flex-shrink-0 z-10"></div>

//         {/* Expanding Bubble */}
//         <motion.div
//           initial={false}
//           animate={{
//             width: hovered ? "250px" : "100px",
//             height: hovered ? "100px" : "40px",
//           }}
//           transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//           className="absolute left-7 top-1/2 -translate-y-1/2 px-3 py-2 bg-white overflow-hidden rounded shadow origin-left"
//         >
//           <p
//             className="text-sm font-semibold text-black leading-tight whitespace-nowrap overflow-hidden"
//             dangerouslySetInnerHTML={{ __html: title }}
//           />

//           <AnimatePresence>
//             {hovered && (
//               <motion.div
//                 key="desc"
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="text-sm text-gray-600 mt-1 whitespace-nowrap"
//                 dangerouslySetInnerHTML={{ __html: description }}
//               />
//             )}
//           </AnimatePresence>
//         </motion.div>
//       </div>
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
// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Hotspot = ({ title, description }) => {
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
//           borderColor: hovered ? "#ffffff" : "#8F53A1",
//           backgroundColor: hovered ? "#8F53A1" : "#FFFFFF",
//           width: hovered ? 30 : 20,
//           height: hovered ? 30 : 20,
//         }}
//         transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//         className="w-5 h-5 rounded-full bg-white border-4 border-[#8F53A1] z-10"
//       ></motion.div>

//       {/* Expanding Bubble */}
//       <motion.div
//         initial={false}
//         animate={{
//           width: hovered ? 250 : 100,
//           height: hovered ? "auto" : "auto",
//           left: hovered ? "-10px" : "28px",
//           paddingLeft: hovered ? "48px" : "12px",
//           borderRadius: hovered ? "60px" : "40px",
//         }}
//         transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//         className="absolute top-1/2 -translate-y-1/2 px-3 py-4 bg-white  overflow-hidden"
//       >
//         {/* Title */}
//         <p
//           className="text-[12px] bw-sb text-black leading-tight overflow-hidden"
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
//               className="text-[12px] mt-1 whitespace-nowrap overflow-hidden pr-[25px]"
//               dangerouslySetInnerHTML={{ __html: description }}
//             />
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// export default Hotspot;
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Hotspot = ({ title, description }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-flex items-center cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Fixed Dot */}
      {/* <motion.div
        initial={false}
        animate={{
          borderColor: hovered ? "#ffffff00" : "#8F53A1",
          backgroundColor: hovered ? "#8F53A1" : "#FFFFFF",
          borderWidth: hovered ? "8px" : "0px",
          width: hovered ? 30 : 30,
          height: hovered ? 30 : 30,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="rounded-full bg-white  z-10"
      ></motion.div> */}
      <motion.div
        initial={false}
        animate={{
          borderWidth: hovered ? "0px" : "8px",
          borderColor: hovered ? "#ffffff00" : "#8F53A1",
          height: hovered ? "15px" : "25px",
          width: hovered ? "15px" : "25px",
          backgroundColor: hovered ? "#8F53A1" : "#FFFFFF",
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        // className="rounded-full border-solid z-10 w-[30px] h-[30px] box-border"
        className={`rounded-full border-solid z-10 box-border`}
      />

      {/* Expanding Bubble with Glassmorphism */}
      {/* <motion.div
        initial={false}
        animate={{
          width: hovered ? "250px" : "140px",
          height: hovered ? "auto" : "auto",
          left: hovered ? "-20px" : "25px",
          paddingLeft: hovered ? "48px" : "12px",
          borderRadius: hovered ? "60px" : "40px",
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="absolute top-1/2 -translate-y-1/2 p-2 bg-white/70 backdrop-blur-md overflow-hidden"
      > */}
      <motion.div
        style={{ border: "none", outline: "none" }}
        initial={false}
        animate={{
          width: hovered ? "250px" : "140px",
          height: "auto",
          left: hovered ? "-20px" : "25px",
          paddingLeft: hovered ? "48px" : "12px",
          borderRadius: hovered ? "60px" : "40px",
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="absolute top-1/2 -translate-y-1/2 p-2 bg-white/70 backdrop-blur-md overflow-hidden border-0 outline-none"
      >
        {/* Title */}
        <p
          className="text-[14px] bw-sb text-black leading-tight overflow-hidden"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {/* Description (only shows when hovered) */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="desc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[13px] mt-1 whitespace-nowrap leading-[120%] overflow-hidden pr-[25px]"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Hotspot;
