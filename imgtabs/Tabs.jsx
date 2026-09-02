// "use client";
// import React, { useState } from "react";

// const tabsData = [
//   {
//     id: 1,
//     title: "Exterior Block",
//     img: "/ind/hspot/t1.png",
//   },
//   {
//     id: 2,
//     title: "Interior Block",
//     img: "/ind/hspot/t2.png",
//   },
// ];

// const Tabs = () => {
//   const [activeTab, setActiveTab] = useState(1);

//   return (
//     <div className="flex flex-col gap-2 items-center w-full h-[600px] max-w-[360px]">
//       {tabsData.map((tab) => (
//         <div
//           key={tab.id}
//           onClick={() => setActiveTab(tab.id)}
//           className="relative w-full !flex-1 cursor-pointer bg-white transition-all duration-300 flex flex-col"
//         >
//           {/* Arrow notch in top-right */}
//           <div className="absolute top-0 right-0 transition-all duration-300">
//             {activeTab === tab.id ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="46"
//                 height="46"
//                 viewBox="0 0 46 46"
//                 fill="none"
//                 className="transition-all duration-300"
//               >
//                 <path
//                   d="M46 0H0L15.6495 15.0974H30.8247V30.1949L46 46V0Z"
//                   fill="#8F53A1"
//                   className="transition-all duration-300"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="46"
//                 height="46"
//                 viewBox="0 0 46 46"
//                 fill="none"
//                 className="transition-all duration-300"
//               >
//                 <path
//                   d="M46 0H0L15.6495 15.0974H30.8247V30.1949L46 46V0Z"
//                   fill="#D1D5DB"
//                   className="transition-all duration-300"
//                 />
//               </svg>
//             )}
//           </div>

//           {/* Card Content */}
//           <div className="p-10 flex flex-col h-full gap-y-10 items-start justify-center flex-1 transition-all duration-300">
//             <h3
//               className={`text-[32px] bw-r transition-all duration-300 ${
//                 activeTab === tab.id ? "text-[#8F53A1]" : "text-black"
//               }`}
//             >
//               {tab.title}
//             </h3>

//             {/* Parent div with gradient border */}
//             <div
//               className={`border-[3px] p-2 transition-all duration-300 ${
//                 activeTab === tab.id
//                   ? "border-transparent"
//                   : "border-transparent"
//               }`}
//               style={
//                 activeTab === tab.id
//                   ? {
//                       borderImage: "linear-gradient(90deg, #8E45D0, #E1833F) 1",
//                       transition: "all 300ms ease",
//                     }
//                   : { transition: "all 300ms ease" }
//               }
//             >
//               <img
//                 src={tab.img}
//                 alt={tab.title}
//                 className="w-[141px] h-auto transition-all duration-300"
//               />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Tabs;
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
"use client";
import React from "react";

const tabsData = [
  {
    id: 1,
    title: "Exterior Block",
    img: "/ind/hspot/t1.png",
  },
  {
    id: 2,
    title: "Interior Block",
    img: "/ind/hspot/t2.png",
  },
];

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col gap-[2px] items-center w-full 1280:h-[550px] 1366:h-[550px] 1440:h-[600px]  1280:max-w-[220px] 1366:max-w-[330px] max-w-[220px] 1440:max-w-[360px]">
      {tabsData.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className="relative w-full flex-1 cursor-pointer bg-white transition-all duration-300 flex flex-col"
        >
          {/* Arrow notch in top-right */}
          <div className="absolute top-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
              className="transition-all duration-300"
            >
              <path
                className="transition-all duration-300"
                d="M46 0H0L15.6495 15.0974H30.8247V30.1949L46 46V0Z"
                fill={activeTab === tab.id ? "#8F53A1" : "#D1D5DB"}
              />
            </svg>
          </div>

          {/* Card Content */}
          <div className="p-5 1440:p-10 flex flex-col h-full gap-y-2 1440:gap-y-10 items-start justify-center flex-1">
            <h3
              className={`text-[24px] 1440:text-[32px] bw-r transition-colors duration-300 ${activeTab === tab.id ? "text-[#8F53A1]" : "text-black"
                }`}
            >
              {tab.title}
            </h3>

            {/* Gradient border using wrapper */}
            <div className="relative p-[3px] ">
              {/* Gradient border layer */}
              <div
                className={`absolute inset-0  bg-gradient-to-r from-[#8E45D0] to-[#E1833F] transition-opacity duration-300 ${activeTab === tab.id ? "opacity-100" : "opacity-0"
                  }`}
              />
              {/* Inner content (white background) */}
              <div className="relative bg-white p-2 ">
                <img
                  src={tab.img}
                  alt={tab.title}
                  className="w-[141px] h-auto transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
// "use client";
// import React from "react";

// const tabsData = [
//   {
//     id: 1,
//     title: "Exterior Block",
//     img: "/ind/hspot/t1.png",
//   },
//   {
//     id: 2,
//     title: "Interior Block",
//     img: "/ind/hspot/t2.png",
//   },
// ];

// const Tabs = ({ activeTab, setActiveTab }) => {
//   return (
//     <div className="flex 1440:flex-col flex-row gap-2  pb-2 1440:pb-0 items-center w-full h-fit 1440:h-[600px] max-w-full 1440:max-w-[360px]">
//       {tabsData.map((tab) => (
//         <div
//           key={tab.id}
//           onClick={() => setActiveTab(tab.id)}
//           className="relative w-full 1440:h-auto h-full flex-1 cursor-pointer bg-white transition-all duration-300 flex flex-col"
//         >
//           {/* Arrow notch in top-right */}
//           <div className="absolute top-0 right-0">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="46"
//               height="46"
//               viewBox="0 0 46 46"
//               fill="none"
//               className="transition-all duration-300"
//             >
//               <path
//                 className="transition-all duration-300"
//                 d="M46 0H0L15.6495 15.0974H30.8247V30.1949L46 46V0Z"
//                 fill={activeTab === tab.id ? "#8F53A1" : "#D1D5DB"}
//               />
//             </svg>
//           </div>

//           {/* Card Content */}
//           <div className="1440:p-10 gap-x-10 1440:gap-x-0 p-4 flex flex-row 1440:flex-col h-full 1440:gap-y-10 items-end 1440:items-start 1440:justify-center flex-1">
//             <h3
//               className={`text-[24px] whitespace-nowrap 1440:text-[32px] bw-r transition-colors duration-300 ${
//                 activeTab === tab.id ? "text-[#8F53A1]" : "text-black"
//               }`}
//             >
//               {tab.title}
//             </h3>

//             {/* Gradient border using wrapper */}
//             <div className="relative p-[3px] 1440:flex hidden">
//               {/* Gradient border layer */}
//               <div
//                 className={`absolute inset-0  bg-gradient-to-r from-[#8E45D0] to-[#E1833F] transition-opacity duration-300 ${
//                   activeTab === tab.id ? "opacity-100" : "opacity-0"
//                 }`}
//               />
//               {/* Inner content (white background) */}
//               <div className="relative bg-white p-2 ">
//                 <img
//                   src={tab.img}
//                   alt={tab.title}
//                   className="1440:w-[141px] w-[100px] h-auto transition-transform duration-300"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Tabs;
