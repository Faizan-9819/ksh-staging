// "use client";

// import React from "react";

// interface InsightPoint {
//   number: string;
//   title: string;
//   description: string;
//   imageSrc: string;
//   link?: string;
// }

// const INSIGHTS_POINTS: InsightPoint[] = [
//   {
//     number: "02",
//     title: "INVESTOR RELATIONS",
//     description:
//       "Building strong investor partnerships through transparency, communication, and strategic business opportunities",
//     imageSrc: "/insights/investor-relations.jpg",
//     link: "#",
//   },
//   {
//     number: "01",
//     title: "SUSTAINABILITY",
//     description: "A core value, a guiding principle",
//     imageSrc: "/insights/sustainability.jpg",
//     link: "#",
//   },
//   {
//     number: "03",
//     title: "CAREERS @KSH INFRA",
//     description:
//       "Grow with a team that values innovation, collaboration, and professional development",
//     imageSrc: "/insights/careers.jpg",
//     link: "#",
//   },
// ];

// export default function InsightsSection() {
//   return (
//     <section
//       className="w-full font-[var(--font-inter),sans-serif]"
//       style={{
//         background: "linear-gradient(0deg, #FFF 0%, #FFF 100%), #F8F8F8",
//       }}
//     >
//       <div className="fix py-12 md:py-20">
//         {/* Header Tag */}
//         <div className="flex items-center gap-[6px] mb-3">
//           <span className="text-[#8C8C84] font-semibold text-[13px]">//</span>
//           <span className="text-[#8C8C84] font-medium text-[12px] tracking-[0.05em] uppercase">
//             INSIGHTS
//           </span>
//         </div>

//         {/* Title */}
//         <h2 className="font-semibold text-[32px] sm:text-[40px] lg:text-[48px] text-[#212121] tracking-[-0.02em] leading-[1.1] mb-12 lg:mb-16">
//           Trust Growth Opportunity
//         </h2>

//         {/* Points List */}
//         <div className="flex flex-col">
//           {INSIGHTS_POINTS.map((item) => (
//             <a
//               key={item.number}
//               href={item.link || "#"}
//               className="group border-t border-[#E0E0E0] py-6 lg:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-8 transition-colors duration-300"
//             >
//               {/* Left Column (50% Width on Desktop): Number + Text Content */}
//               <div className="w-full md:w-1/2 flex items-start gap-4 sm:gap-8 lg:gap-10 pr-0 md:pr-6 shrink-0">
//                 {/* Item Number */}
//                 <span className="font-medium text-[20px] lg:text-[22px] text-[#8C8C84] leading-tight shrink-0">
//                   {item.number}
//                 </span>

//                 {/* Text Block */}
//                 <div className="w-full max-w-[350px]">
//                   <h3 className="font-semibold text-[18px] sm:text-[20px] lg:text-[24px] text-[#212121] tracking-[-0.01em] uppercase mb-2 leading-[1.2]">
//                     {item.title}
//                   </h3>
//                   <p className="font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] text-[#4A4A4A]">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>

//               {/* Right Column (50% Width on Desktop): Image + Arrow Container */}
//               <div className="w-full  flex items-center justify-between md:justify-start gap-6 lg:gap-8 shrink-0">
//                 {/* Image (Takes remaining space within the right 50%) */}
//                 <div className="flex-1 max-w-[420px] h-[160px] sm:h-[180px] lg:h-[200px] rounded-[20px] overflow-hidden bg-[#F0F0F0] shrink-0">
//                   <img
//                     src={item.imageSrc}
//                     alt={item.title}
//                     className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
//                   />
//                 </div>

//                 {/* Arrow Button */}
//                 <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-[#D0D0D0] bg-transparent group-hover:bg-[#4D5745] group-hover:border-[#4D5745] flex items-center justify-center transition-all duration-300 shrink-0">
//                   <svg
//                     className="w-4 h-4 text-[#212121] group-hover:text-white transition-colors duration-300"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.8}
//                       d="M7 17L17 7M17 7H7M17 7V17"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";

interface InsightPoint {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  link?: string;
}

const INSIGHTS_POINTS: InsightPoint[] = [
  {
    number: "01",
    title: "SUSTAINABILITY",
    description: "A core value, a guiding principle",
    imageSrc: "/about/gov/gov2.jpg",
    link: "/sustainability",
  },
  {
    number: "02",
    title: "INVESTOR RELATIONS",
    description:
      "Building strong investor partnerships through transparency, communication, and strategic business opportunities",
    imageSrc: "/about/gov/gov1.jpg",
    link: "/investors/institutional-investors",
  },
  {
    number: "03",
    title: "CAREERS @KSH INFRA",
    description:
      "Grow with a team that values innovation, collaboration, and professional development",
    imageSrc: "/about/gov/gov3.jpg",
    link: "/careers",
  },
];

export default function InsightsSection() {
  return (
    <section
      className="w-full font-[var(--font-inter),sans-serif]"
      style={{
        background: "linear-gradient(0deg, #FFF 0%, #FFF 100%), #F8F8F8",
      }}
    >
      <div className="fix py-12 md:py-20">
        {/* Header Tag */}
        {/* <div className="flex items-center gap-[6px] mb-3">
          <span className="text-[#8C8C84] font-semibold text-[13px]">//</span>
          <span className="text-[#8C8C84] font-medium text-[12px] tracking-[0.05em] uppercase">
            INSIGHTS
          </span>
        </div> */}

        {/* Title */}
        <h2 className="font-semibold text-[32px] sm:text-[40px] lg:text-[48px] text-[#212121] tracking-[-0.02em] leading-[1.1] mb-12 lg:mb-16">
          Trust Growth Opportunity
        </h2>

        {/* Points List */}
        {/* <div className="flex flex-col">
          {INSIGHTS_POINTS.map((item) => (
            <a
              key={item.number}
              href={item.link || "#"}
              className="group border-t border-[#E0E0E0] py-6 lg:py-8 flex flex-col md:flex-row items-start md:items-center justify-between transition-colors duration-300"
            > */}
        {/* Left Column (Exact 50% Width): Number + Text */}
        {/* <div className="w-full md:w-1/2 flex items-start gap-6 lg:gap-12 pr-4 md:pr-10 shrink-0"> */}
        {/* Item Number */}
        {/* <span className="font-medium text-[20px] lg:text-[22px] text-[#8C8C84] leading-tight shrink-0">
                  {item.number}
                </span> */}

        {/* Text Block */}
        {/* <div className="max-w-[420px]">
                  <h3 className="font-semibold text-[18px] sm:text-[20px] lg:text-[24px] text-[#212121] tracking-[-0.01em] uppercase mb-2 leading-[1.2]">
                    {item.title}
                  </h3>
                  <p className="font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] text-[#4A4A4A]">
                    {item.description}
                  </p>
                </div>
              </div> */}

        {/* Right Column (Exact 50% Width): Image placed on left side of this box, Arrow pushed to the right */}
        {/* <div className="w-full md:w-1/2 flex items-center justify-between shrink-0"> */}
        {/* Image (Takes up ~65-70% of the right 50% container) */}
        {/* <div className="w-[65%] sm:w-[70%] h-[160px] sm:h-[180px] lg:h-[210px] rounded-[20px] overflow-hidden bg-[#F0F0F0] shrink-0">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                  />
                </div> */}

        {/* Gap (~30%) pushes Arrow to far right corner matching design */}
        {/* <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-[#D0D0D0] bg-transparent group-hover:bg-[#4D5745] group-hover:border-[#4D5745] flex items-center justify-center transition-all duration-300 shrink-0 ml-auto">
                  <svg
                    className="w-4 h-4 text-[#212121] group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </div> */}

        {/* </div>
            </a>
          ))}
        </div> */}
        <div className="flex flex-col">
          {INSIGHTS_POINTS.map((item) => (
            <a
              key={item.number}
              href={item.link || "#"}
              className="group border-t border-[#E0E0E0] py-6 lg:py-8 flex flex-col md:flex-row items-stretch md:items-center justify-between transition-colors duration-300"
            >
              {/* --- MOBILE ONLY TOP HEADER (Number + Title + Arrow) --- */}
              <div className="flex md:hidden items-center justify-between w-full mb-4">
                <div className="flex items-center gap-4">
                  <span className="font-light text-[40px] text-[#E0E0E0] leading-none shrink-0">
                    {item.number}
                  </span>
                  <h3 className="font-semibold text-[22px] text-[#212121] tracking-[-0.01em] uppercase leading-[1.2]">
                    {item.title}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full border border-[#D0D0D0] bg-transparent group-hover:bg-[#4D5745] group-hover:border-[#4D5745] flex items-center justify-center transition-all duration-300 shrink-0 ml-2">
                  <svg
                    className="w-4 h-4 text-[#212121] group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </div>
              </div>

              {/* --- DESKTOP ONLY LEFT COLUMN (Unchanged) --- */}
              <div className="hidden md:flex w-1/2 items-start gap-6 lg:gap-12 pr-10 shrink-0">
                <span className="font-medium text-[20px] lg:text-[24px] text-[#8C8C84] leading-tight shrink-0">
                  {item.number}
                </span>
                <div className="max-w-[420px]">
                  <h3 className="font-normal text-[20px] sm:text-[22px] lg:text-[28px] text-[#212121] tracking-[-0.01em] uppercase mb-2 leading-[1.2]">
                    {item.title}
                  </h3>
                  <p className="font-normal text-[14px] sm:text-[16px] lg:text-[20px] leading-[1.6] text-[#4A4A4A]">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* --- RIGHT COLUMN / MOBILE CONTENT AREA --- */}
              <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center justify-between shrink-0 gap-4 md:gap-0">
                {/* Image Container: Full width on mobile, 65-70% on desktop */}
                <div className="w-full md:w-[65%] sm:w-[70%] h-[200px] sm:h-[180px] lg:h-[210px] rounded-[16px] md:rounded-[20px] overflow-hidden bg-[#F0F0F0] shrink-0">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Desktop Arrow Button (Hidden on Mobile) */}
                <div className="hidden md:flex w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-[#D0D0D0] bg-transparent group-hover:bg-[#4D5745] group-hover:border-[#4D5745] items-center justify-center transition-all duration-300 shrink-0 ml-auto">
                  <svg
                    className="w-[20px] h-[20px] text-[#212121] group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </div>
              </div>

              {/* --- MOBILE ONLY DESCRIPTION (Placed below image) --- */}
              <p className="block md:hidden font-normal text-[14px] leading-[1.6] text-[#4A4A4A] mt-3">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
