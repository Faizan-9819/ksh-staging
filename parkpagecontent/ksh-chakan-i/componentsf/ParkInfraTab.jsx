"use client";
// "use client";
//
// import { motion } from "framer-motion";

// const ParkInfraTab = ({ heading, activeTab, setActiveTab }) => {
//   const tabs = ["Park Exterior", "Park Interior"];

//   return (
//     <div className="relative max-w-[1280px] pb-[20px] lg:mb-[66px] mb-[36px] overflow-hidden whitespace-nowrap ParkInfraTab">
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true, amount: 0.1 }}
//         transition={{ duration: 2, ease: [0.7, 0, 0.4, 1] }}
//         className="flex items-center justify-between w-full lg:gap-0 gap-[20px]"
//       >
//         <h2 className="leading-[26px] text-[20px] fsans-600 text-[#ffffff] tbhead">
//           {heading}
//         </h2>
//         <div
//           className="flex gap-[5px] overflow-x-auto scrollbar"
//           style={{
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//           }}
//         >
//           {tabs.map((tab, index) => (
//             <button
//               onClick={() => setActiveTab(tab)}
//               key={tab + index}
//               className={`px-[12px] py-[10px] flex-1 flex items-center justify-center rounded-[10px] border-[#d7d7d7] border-opacity-30 text-white border ${
//                 activeTab === tab ? "bg-[#E30613] border-[#E30613]" : ""
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </motion.div>
//       <motion.div
//         className="absolute bottom-0 left-0 w-full h-[2px] opacity-[0.34] bg-[#D7D7D7]"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 0.34 }}
//         viewport={{ once: true, amount: 0.1 }}
//         transition={{ duration: 2, ease: [0.7, 0, 0.4, 1] }}
//       />
//     </div>
//   );
// };

// export default ParkInfraTab;

// "use client";
//
// import { motion } from "framer-motion";

// const ParkInfraTab = ({ heading, activeTab, setActiveTab }) => {
//   const tabs = [
//     { title: "Park Exterior", id: 1 },
//     { title: "Park Interior", id: 2 },
//   ];

//   return (
//     <div className="relative max-w-[1280px] pb-[20px] lg:mb-[66px] mb-[36px] overflow-hidden whitespace-nowrap ParkInfraTab">
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true, amount: 0.1 }}
//         transition={{ duration: 2, ease: [0.7, 0, 0.4, 1] }}
//         className="flex items-center justify-between w-full lg:gap-0 gap-[20px]"
//       >
//         <h2 className="leading-[26px] text-[20px] fsans-600 text-[#ffffff] tbhead">
//           {heading}
//         </h2>
//         <div
//           className="flex gap-[5px] overflow-x-auto scrollbar"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           {tabs.map((tab, index) => (
//             <button
//               onClick={() => setActiveTab(tab.id)}
//               key={tab.id}
//               className={`px-[12px] py-[10px] flex-1 flex items-center justify-center rounded-[10px] border-[#d7d7d7] border-opacity-30 text-white border ${
//                 activeTab === tab.id ? "bg-[#E30613] border-[#E30613]" : ""
//               }`}
//             >
//               {tab.title}
//             </button>
//           ))}
//         </div>
//       </motion.div>
//       <motion.div
//         className="absolute bottom-0 left-0 w-full h-[2px] opacity-[0.34] bg-[#D7D7D7]"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 0.34 }}
//         viewport={{ once: true, amount: 0.1 }}
//         transition={{ duration: 2, ease: [0.7, 0, 0.4, 1] }}
//       />
//     </div>
//   );
// };

// export default ParkInfraTab;


import { motion } from "framer-motion";

const ParkInfraTab = ({ heading, activeTab, setActiveTab }) => {
  const tabs = [
    { title: "Park Exterior", id: 1 },
    { title: "Park Interior", id: 2 },
  ];

  return (
    <div className="relative max-w-[1280px] sm:pb-[20px] lg:mb-[66px] sm:mb-[36px] overflow-hidden ParkInfraTab">
      {/* Desktop Layout */}
      <div
        // initial={{ opacity: 0 }}
        // whileInView={{ opacity: 1 }}
        // viewport={{ once: true, amount: 0.1 }}
        // transition={{ duration: 2, ease: [0.7, 0, 0.4, 1] }}
        className="hidden lg:flex items-center justify-between w-full lg:gap-0 gap-[20px]"
      >
        <h2 className="leading-[26px] text-[20px] fsans-600 text-[#ffffff] tbhead">
          {heading}
        </h2>
        <div
          className="flex gap-[5px] overflow-x-auto scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab) => (
            <button
              onClick={() => setActiveTab(tab.id)}
              key={tab.id}
              className={`px-[12px] fsans-600 leading-[26px] py-[10px] flex items-center justify-center rounded-[10px] border border-[#d7d7d7] border-opacity-30 text-white ${
                activeTab === tab.id ? "bg-[#E30613] border-[#E30613]" : ""
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col lg:hidden">
        <div
        // initial={{ opacity: 0 }}
        // whileInView={{ opacity: 1 }}
        // viewport={{ once: true, amount: 0.1 }}
        // transition={{ duration: 2, ease: [0.7, 0, 0.4, 1] }}
        >
          <h2 className="leading-[26px] text-[20px] fsans-600 text-[#ffffff] tbhead">
            {heading}
          </h2>
        </div>
        {/* Non-absolute horizontal line for mobile */}
        <div
          className="w-full h-[2px] opacity-[0.34] bg-[#D7D7D7] my-2"
          // initial={{ opacity: 0 }}
          // whileInView={{ opacity: 0.34 }}
          // viewport={{ once: true, amount: 0.1 }}
          // transition={{ duration: 2, ease: [0.7, 0, 0.4, 1] }}
        />

        <div
          className="flex overflow-x-auto scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab) => (
            <button
              onClick={() => setActiveTab(tab.id)}
              key={tab.id}
              className={`sm:px-[12px] mt-[30px] mb-4 px-[6px] border-b-4 py-[5px] sm:py-[10px] flex-1 flex items-center justify-center text-white ${
                activeTab === tab.id
                  ? "sm:bg-[#E30613] bg-transparent border-[#E30613]"
                  : "border-[#d7d7d7] border-opacity-30"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Keep the desktop horizontal line */}
      <div
        className="hidden lg:block absolute bottom-0 left-0 w-full h-[2px] opacity-[0.34] bg-[#D7D7D7]"
        // initial={{ opacity: 0 }}
        // whileInView={{ opacity: 0.34 }}
        // viewport={{ once: true, amount: 0.1 }}
        // transition={{ duration: 2, ease: [0.7, 0, 0.4, 1] }}
      />
    </div>
  );
};

export default ParkInfraTab;
