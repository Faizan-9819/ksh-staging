// "use client";

// import React from "react";

// // Separated into two columns to achieve the staggered offset
// const STAT_CARDS_COL_1 = [
//   { num: "04", unit: "Mn Sq.Ft.", label: "Developed (in Pune)" },
//   { num: "03", unit: "Mn Sq.Ft.", label: "Under Development" },
// ];

// const STAT_CARDS_COL_2 = [
//   { num: "07", unit: "Parks", label: "Assets Developed" },
//   { num: "10", unit: "Mn Sq.Ft.", label: "Planned Development" },
// ];

// function AboutPlatformSection() {
//   return (
//     <section className="relative  w-full bg-white text-[#212121] overflow-hidden">
//       {/* Main Container using Flexbox */}
//       <div className="fix relative z-10 py-[50px] lg:py-[80px]">
//         <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
//           {/* LEFT COLUMN (Flexbox) */}
//           <div className="w-full lg:w-[42%] flex flex-col gap-6 relative">
//             <div>
//               <p className="text-xs uppercase tracking-widest font-semibold text-[#6D6D6D] mb-3">
//                 // AN INTEGRATED INDUSTRIAL INFRASTRUCTURE PLATFORM
//               </p>
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] leading-tight tracking-tight mb-3">
//                 Inspiring Green Development
//               </h2>
//               <p className="text-sm sm:text-base font-bold text-[#6D6D6D] tracking-widest uppercase">
//                 CARE. QUALITY. INTEGRITY.
//               </p>
//             </div>

//             {/* Industrial Park Image Container (Higher z-index so image stays on top) */}
//             <div className="relative w-full z-10">
//               <div className="w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow-lg mt-2 relative z-10">
//                 <img
//                   src="/about/platform/platform1.jpg"
//                   alt="Industrial Park"
//                   className="w-full h-full object-cover"
//                   loading="lazy"
//                 />
//               </div>

//               {/* Overlapping Cross SVGs - Placed under the image with lower z-index */}
//               <div className="absolute top-[115%] left-0 w-full min-h-[700px]! pointer-events-none z-0 overflow-visible">
//                 {/* SVG 1: Moving Downward */}
//                 <svg
//                   className="absolute left-0 top-0 w-[280px] sm:w-[380px] md:w-[370px] opacity-40 lg:opacity-70"
//                   viewBox="70 0 482 294"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     opacity="0.7"
//                     d="M-1074.79 16.5593V718.098C-1074.79 718.098 -1089.16 912.5 -880.316 912.5C-671.468 912.5 -685.842 718.098 -685.842 718.098M-685.631 718.098V196.593C-685.631 196.593 -700.005 2.19045 -491.157 2.19045C-282.309 2.19045 -296.683 196.593 -296.683 196.593L-297.317 716.407C-297.317 716.407 -311.691 910.81 -102.843 910.81C106.005 910.81 91.8416 716.407 91.8416 716.407V194.902C91.8416 194.902 77.4676 0.5 286.316 0.5C495.164 0.5 480.79 194.902 480.79 194.902V904.893"
//                     stroke="url(#paint0_linear_1001_689)"
//                     strokeOpacity="0.3"
//                   />
//                   <defs>
//                     <linearGradient
//                       id="paint0_linear_1001_689"
//                       x1="-297"
//                       y1="0.5"
//                       x2="-297"
//                       y2="639"
//                       gradientUnits="userSpaceOnUse"
//                     >
//                       <stop stopColor="#24314E" stopOpacity="0.8" />
//                       <stop offset="1" stopColor="#24314E" stopOpacity="0" />
//                     </linearGradient>
//                   </defs>
//                 </svg>

//                 {/* SVG 2: Offset 50% Right & Flipped Upward (Cross Effect) */}
//                 <svg
//                   className="absolute left-[20%] top-[-100px] w-[280px] sm:w-[380px] md:w-[370px] opacity-40 lg:opacity-100 transform scale-y-[-1]"
//                   viewBox="0 0 482 244"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     opacity="0.7"
//                     d="M-1074.79 16.5593V718.098C-1074.79 718.098 -1089.16 912.5 -880.316 912.5C-671.468 912.5 -685.842 718.098 -685.842 718.098M-685.631 718.098V196.593C-685.631 196.593 -700.005 2.19045 -491.157 2.19045C-282.309 2.19045 -296.683 196.593 -296.683 196.593L-297.317 716.407C-297.317 716.407 -311.691 910.81 -102.843 910.81C106.005 910.81 91.8416 716.407 91.8416 716.407V194.902C91.8416 194.902 77.4676 0.5 286.316 0.5C495.164 0.5 480.79 194.902 480.79 194.902V904.893"
//                     stroke="url(#paint0_linear_1001_689_flipped)"
//                     strokeOpacity="0.3"
//                   />
//                   <defs>
//                     <linearGradient
//                       id="paint0_linear_1001_689_flipped"
//                       x1="-297"
//                       y1="0.5"
//                       x2="-297"
//                       y2="639"
//                       gradientUnits="userSpaceOnUse"
//                     >
//                       <stop stopColor="#24314E" stopOpacity="0.8" />
//                       <stop offset="1" stopColor="#24314E" stopOpacity="0" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN (Flexbox) */}
//           <div className="w-full lg:w-[58%] flex flex-col justify-between h-full pt-2">
//             {/* Paragraph Content */}
//             <div className="space-y-4 text-sm sm:text-base text-[#4A4A4A] leading-relaxed mb-8 sm:mb-10">
//               <p className="text-lg sm:text-xl font-medium text-[#111111] leading-snug">
//                 With over four million square feet of top-quality industrial and
//                 logistics spaces and counting, KSH INFRA is expanding across
//                 country's key markets with plans for 10 million square feet in
//                 the next five years.
//               </p>
//               <p>
//                 Our Industrial & Logistics Parks are green, lean, and efficient.
//                 We build with care for the environment and local communities,
//                 reducing the impact of infrastructure development.
//               </p>
//               <p>
//                 At KSH INFRA, our core belief drives everything: Inspiring a
//                 green industrial future with positive effect on people and
//                 planet. Your success matters - that is why we deliver complex
//                 projects on time while ensuring long-term savings.
//               </p>
//               <p>
//                 We don't just build assets. We drive your business success with
//                 a strong commitment to environmental sustainability.
//               </p>
//             </div>

//             {/* Staggered Cards Layout using Flexbox */}
//             <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-start">
//               {/* Column 1 (Flexbox - Left Side) */}
//               <div className="w-full sm:w-1/2 flex flex-col gap-4 lg:gap-6">
//                 {STAT_CARDS_COL_1.map((card, i) => (
//                   <div
//                     key={i}
//                     className="group relative overflow-hidden p-4 sm:p-6 bg-[#F7F7F7] hover:bg-[#D6C5A0] duration-500 cursor-pointer flex flex-col justify-between min-h-[110px] sm:min-h-[130px] rounded-2xl border border-black/5"
//                   >
//                     {/* Static Shine Lines on Hover */}
//                     <div className="absolute -top-20 right-full w-[20px] h-[600px] bg-white/30 blur-[8px] rotate-[25deg] opacity-0 group-hover:opacity-70 transition-all group-hover:right-[100px] duration-500" />
//                     <div className="absolute -top-20 right-full w-[20px] h-[600px] bg-white/30 blur-[8px] rotate-[25deg] opacity-0 group-hover:opacity-70 transition-all group-hover:right-[140px] duration-500" />

//                     <div className="relative z-10 flex flex-col h-full justify-between">
//                       <div className="flex items-baseline gap-1 lg:gap-2 mb-2">
//                         <h6 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#000] leading-none">
//                           {card.num}
//                         </h6>
//                         <span className="text-sm sm:text-lg lg:text-xl font-sora text-[#6D6D6D] group-hover:text-[#212121] transition-colors">
//                           {card.unit}
//                         </span>
//                       </div>

//                       <div className="w-full h-[1px] my-2 bg-[#B9B9B9] group-hover:bg-[#000]/20 transition-colors" />

//                       <div className="text-xs sm:text-sm lg:text-base text-[#212121] font-sora leading-tight font-medium">
//                         {card.label}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Column 2 (Flexbox - Right Side with Downward Shift) */}
//               <div className="w-full sm:w-1/2 flex flex-col gap-4 lg:gap-6 sm:translate-y-8 lg:mt-20">
//                 {STAT_CARDS_COL_2.map((card, i) => (
//                   <div
//                     key={i}
//                     className="group relative overflow-hidden p-4 sm:p-6 bg-[#F7F7F7] hover:bg-[#D6C5A0] duration-500 cursor-pointer flex flex-col justify-between min-h-[110px] sm:min-h-[130px] rounded-2xl border border-black/5"
//                   >
//                     {/* Static Shine Lines on Hover */}
//                     <div className="absolute -top-20 right-full w-[20px] h-[600px] bg-white/30 blur-[8px] rotate-[25deg] opacity-0 group-hover:opacity-70 transition-all group-hover:right-[100px] duration-500" />
//                     <div className="absolute -top-20 right-full w-[20px] h-[600px] bg-white/30 blur-[8px] rotate-[25deg] opacity-0 group-hover:opacity-70 transition-all group-hover:right-[140px] duration-500" />

//                     <div className="relative z-10 flex flex-col h-full justify-between">
//                       <div className="flex items-baseline gap-1 lg:gap-2 mb-2">
//                         <h6 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#000] leading-none">
//                           {card.num}
//                         </h6>
//                         <span className="text-sm sm:text-lg lg:text-xl font-sora text-[#6D6D6D] group-hover:text-[#212121] transition-colors">
//                           {card.unit}
//                         </span>
//                       </div>

//                       <div className="w-full h-[1px] my-2 bg-[#B9B9B9] group-hover:bg-[#000]/20 transition-colors" />

//                       <div className="text-xs sm:text-sm lg:text-base text-[#212121] font-sora leading-tight font-medium">
//                         {card.label}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default AboutPlatformSection;

"use client";

import React from "react";

// Separated into two columns to achieve the staggered offset
const STAT_CARDS_COL_1 = [
  { num: "04 Mn.", unit: "Sq. Ft.", label: "Developed (in Pune)" },
  { num: "03 Mn.", unit: "Sq. Ft.", label: "Under Development" },
];

const STAT_CARDS_COL_2 = [
  { num: "07", unit: "Parks", label: "Total" },
  { num: "10 Mn.", unit: "Sq. Ft.", label: "of Planned Development" },
];

function AboutPlatformSection() {
  return (
    <section className="relative  w-full bg-white text-[#212121] overflow-hidden">
      {/* Main Container using Flexbox */}
      <div className="fix relative z-10 py-[50px] lg:pt-[80px] lg:pb-[50px]">
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-20">
          {/* LEFT COLUMN (Flexbox) */}
          <div className="w-full lg:w-[50%] flex flex-col gap-[16px] relative">
            <div>
              {/* <p className="  mb-5 font-sora eyebrow">
                // AN INTEGRATED INDUSTRIAL INFRASTRUCTURE PLATFORM
              </p> */}
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-semibold text-[#212121] leading-auto  tracking-[-0.96px] mb-[16px]">
                Inspiring Green <br /> Development
              </h2>
              <p className="text-sm sm:text-[28px] font-inter text-[#4A4A4A] leading-[1.4] uppercase">
                CARE. QUALITY. INTEGRITY.
              </p>
            </div>

            {/* Industrial Park Image Container (Higher z-index so image stays on top) */}
            <div className="relative w-full z-10">
              <div className="w-full aspect-[1.2/1]! rounded-3xl overflow-hidden shadow-lg mt-2 relative z-10">
                <img
                  src="/about/platform/platform1.jpg"
                  alt="Industrial Park"
                  className="w-full h-full object-cover!  "
                />
              </div>

              {/* Overlapping Cross SVGs - Placed under the image with lower z-index */}
            </div>
          </div>

          {/* RIGHT COLUMN (Flexbox) */}
          <div className="w-full ml-auto lg:w-[50%] flex flex-col justify-between h-full pt-2 gap-[50px]">
            {/* Paragraph Content */}
            <div className="md:mt-16   font-inter space-y-3 text-sm sm:text-base text-[#4A4A4A] leading-relaxed ">
              <p className="text-lg lg:[18px] 2xl:text-[24px] font-medium text-[#212121] leading-[1.4]">
                With over 4 Mn. Sq. Ft. of top-quality Industrial and Logistics
                space and counting, KSH INFRA is expanding across the country's
                key markets with plans for 10 Mn. Sq. Ft. in the next 5 years.
              </p>
              <p className="text-[16px] leading-[1.4] text-[#4A4A4A]">
                Our Industrial & Logistics Parks are green, lean, and efficient.
                We build with care for the environment and local communities,
                reducing the impact of Infrastructure development.
              </p>
              <p className="text-[16px] leading-[1.4] text-[#4A4A4A]">
                At KSH INFRA, our core belief drives everything: Inspiring a
                green Industrial future with a positive impact on people and the
                planet. Your success matters - that is why we deliver complex
                projects on time while ensuring long-term savings.
              </p>
              <p className="text-[16px] leading-[1.4] text-[#4A4A4A]">
                We don't just build assets. We drive your business success with
                a strong commitment to environmental sustainability.
              </p>
            </div>

            {/* Staggered Cards Layout using Flexbox */}
            <div className="flex flex-row gap-3 sm:gap-4 lg:gap-6 items-start">
              {/* Column 1 (Flexbox - Left Side) */}
              <div className="w-1/2 flex flex-col gap-3 sm:gap-4 lg:gap-5">
                {STAT_CARDS_COL_1.map((card, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden p-4 sm:p-[30px] bg-[#F7F7F7] hover:bg-[#C5BDAC] duration-500 cursor-pointer flex flex-col justify-between min-h-[110px] sm:min-h-[130px] rounded-2xl border border-black/5"
                  >
                    {/* Static Shine Lines on Hover */}
                    <div className="absolute -top-20 right-full w-[20px] h-[600px] bg-white/30 blur-[8px] rotate-[25deg] opacity-0 group-hover:opacity-70 transition-all group-hover:right-[100px] duration-500" />
                    <div className="absolute -top-20 right-full w-[20px] h-[600px] bg-white/30 blur-[8px] rotate-[25deg] opacity-0 group-hover:opacity-70 transition-all group-hover:right-[140px] duration-500" />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex items-baseline gap-1 lg:gap-1 font-inter ">
                        <h6 className="text-2xl sm:text-[40px] lg:text-[24px]  min-[1300px]:text-[40px]!  font-inter tracking-[-0.8px] text-[#212121] leading-[-0.8px]">
                          {card.num}
                        </h6>
                        <span className="text-sm sm:text-lg tracking-[-0.48px] lg:text-[24px] font-inter leading-[1.2] text-[#6D6D6D] group-hover:text-[#212121] transition-colors">
                          {card.unit}
                        </span>
                      </div>

                      <div className="w-full h-[1px] my-3 bg-[#B9B9B9]  group-hover:bg-[#000]/20 transition-colors" />

                      <div className="text-xs sm:text-[18px]! lg:text-base text-[#212121] font-sora leading-tight font-medium">
                        {card.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2 (Flexbox - Right Side with Downward Shift) */}
              <div className="w-1/2 flex flex-col gap-3 sm:gap-4 lg:gap-6 translate-y-6 sm:translate-y-8 lg:mt-20">
                {STAT_CARDS_COL_2.map((card, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden p-4 sm:p-[30px] bg-[#F7F7F7] hover:bg-[#C5BDAC] duration-500 cursor-pointer flex flex-col justify-between min-h-[110px] sm:min-h-[130px] rounded-2xl border border-black/5"
                  >
                    {/* Static Shine Lines on Hover */}
                    <div className="absolute -top-20 right-full w-[20px] h-[600px] bg-white/30 blur-[8px] rotate-[25deg] opacity-0 group-hover:opacity-70 transition-all group-hover:right-[100px] duration-500" />
                    <div className="absolute -top-20 right-full w-[20px] h-[600px] bg-white/30 blur-[8px] rotate-[25deg] opacity-0 group-hover:opacity-70 transition-all group-hover:right-[140px] duration-500" />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex items-baseline gap-1 lg:gap-1 ">
                        <h6 className="text-2xl lg:text-[24px] min-[1300px]:text-[40px]!  font-inter tracking-[-0.8px] text-[#212121] leading-[1.2]">
                          {card.num}
                        </h6>
                        <span className="text-sm sm:text-lg lg:text-[24px] font-inter text-[#6D6D6D] group-hover:text-[#212121] transition-colors">
                          {card.unit}
                        </span>
                      </div>

                      <div className="w-full h-[1px] my-3 bg-[#B9B9B9] group-hover:bg-[#000]/20 transition-colors" />

                      <div className="text-xs sm:text-[18px]! lg:text-base text-[#212121] font-sora leading-tight font-medium">
                        {card.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPlatformSection;
