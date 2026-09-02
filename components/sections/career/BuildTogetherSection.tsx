// "use client";

// import React from "react";
// import Btn from "../../ui/Btn"; // Adjust path if needed

// export default function BuildTogetherSection() {
//   return (
//     <section
//       className="w-full relative flex items-center justify-between min-h-[260px] sm:min-h-[300px] lg:min-h-[328px] overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(0deg, #C5BDAC 0%, #C5BDAC 100%), radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%)",
//         paddingLeft: "var(--margin, clamp(16px, 5.7vw, 80px))",
//         paddingRight: "var(--margin, clamp(16px, 5.7vw, 80px))",
//         paddingTop: "clamp(32px, 4vw, 48px)",
//         paddingBottom: "clamp(32px, 4vw, 48px)",
//       }}
//     >
//       {/* Background Decorative Rings */}
//       <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
//         <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full border border-white/50 absolute -right-20" />
//         <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full border border-white/50 absolute right-20 sm:right-40" />
//       </div>

//       <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 z-10">

//         {/* Main Heading Text */}
//         <h2
//           className="max-w-[519px] w-full"
//           style={{
//             color: "#212121",
//             fontFamily: "var(--font-sora), Sora, sans-serif",
//             fontSize: "clamp(26px, 3.33vw, 48px)",
//             fontStyle: "normal",
//             fontWeight: 600,
//             lineHeight: "1.15",
//             letterSpacing: "-0.96px",
//           }}
//         >
//           Let&apos;s build something great together.
//         </h2>

//         {/* Join Us Button Component */}
//         <Btn
//           label="Join Us"
//           onClick={() => {
//             // handle click logic
//           }}
//           className="w-full sm:w-auto max-w-[373px] !h-[clamp(54px,5.2vw,75px)] !px-[clamp(20px,2.1vw,30px)] !gap-[clamp(24px,4.1vw,60px)] border-none shrink-0"
//           textColor="text-[#59624D]"
//           hoverTextColor="text-[#FFFFFF]"
//           bgColor="bg-white"
//           hoverBgColor="bg-[#59624D]"
//           borderColor="border-transparent"
//           arrowColor="stroke-[#59624D]"
//           hoverArrowColor="stroke-white"
//           textSize="text-[16px] sm:text-[18px] lg:text-[20px]"
//           arrowClassName="rotate-90 !w-[22px] !h-[22px] sm:!w-[26px] sm:!h-[26px] lg:!w-[30px] lg:!h-[30px]"
//         />

//       </div>
//     </section>
//   );
// }
"use client";

import React from "react";
import Btn from "../../ui/Btn"; // Adjust path if needed
import { lenisScrollTo } from "@/components/ui/LenisProvider";

export default function BuildTogetherSection() {
  return (
    <section
      className="w-full relative flex items-center justify-between min-h-[260px] sm:min-h-[300px] lg:min-h-[328px] overflow-hidden"
      style={{
        background:
          "linear-gradient(0deg, #C5BDAC 0%, #C5BDAC 100%), radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%)",
        paddingLeft: "var(--margin, clamp(16px, 5.7vw, 80px))",
        paddingRight: "var(--margin, clamp(16px, 5.7vw, 80px))",
        paddingTop: "clamp(32px, 4vw, 48px)",
        paddingBottom: "clamp(32px, 4vw, 48px)",
      }}
    >
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
        <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full border border-white/50 absolute -right-20" />
        <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full border border-white/50 absolute right-20 sm:right-40" />
      </div>

      <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 z-10">
        {/* Main Heading Text */}
        <h2
          className="max-w-[519px] w-full"
          style={{
            color: "#212121",
            fontFamily: "var(--font-sora), Sora, sans-serif",
            fontSize: "clamp(26px, 3.33vw, 48px)",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "1.15",
            letterSpacing: "-0.96px",
          }}
        >
          Let&apos;s build something great together.
        </h2>

        {/* Join Us Button Container */}
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <Btn
            label="Join Us"
            onClick={() => lenisScrollTo("#career-form")}
            className="mx-auto w-full max-w-full sm:max-w-[373px] lg:!w-[373px] lg:!min-w-[373px] !h-[45px] !min-h-[55px] !rounded-[60px] !px-[30px] !py-0 gap-[40px] sm:!gap-[60px] !flex !items-center !justify-center !border-0 !shrink-0"
            style={{
              height: "75px",
              minHeight: "75px",
              padding: "0 30px",
              borderRadius: "60px",
              background: "#FFFFFF",
              flexShrink: 0,
            }}
            textColor="text-[#59624D]"
            hoverTextColor="text-[#FFFFFF]"
            bgColor="bg-white"
            hoverBgColor="bg-[#59624D]"
            borderColor="border-transparent"
            arrowColor="stroke-[#59624D]"
            hoverArrowColor="stroke-white"
            textSize="text-[20px]"
            arrowClassName="rotate-90 !w-[30px]  py-2! !h-[50px]"
          />
        </div>
      </div>
    </section>
  );
}
// "use client";

// import React from "react";
// import Btn from "../../ui/Btn"; // Adjust path if needed

// export default function BuildTogetherSection() {
//   return (
//     <section
//       className="w-full relative flex items-center justify-between min-h-[328px] overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(0deg, #C5BDAC 0%, #C5BDAC 100%), radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%)",
//         paddingLeft: "var(--margin, clamp(24px, 5.7vw, 80px))",
//         paddingRight: "var(--margin, clamp(24px, 5.7vw, 80px))",
//         paddingTop: "48px",
//         paddingBottom: "48px",
//       }}
//     >
//       {/* Background Decorative Rings */}
//       <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
//         <div className="w-[600px] h-[600px] rounded-full border border-white/50 absolute -right-20" />
//         <div className="w-[600px] h-[600px] rounded-full border border-white/50 absolute right-40" />
//       </div>

//       <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 z-10">

//         {/* Main Heading Text */}
//         <h2
//           className="max-w-[519px] w-full"
//           style={{
//             color: "#212121",
//             fontFamily: "var(--font-sora), Sora, sans-serif",
//             fontSize: "clamp(28px, 3.33vw, 48px)",
//             fontStyle: "normal",
//             fontWeight: 600,
//             lineHeight: "1.15",
//             letterSpacing: "-0.96px",
//           }}
//         >
//           Let&apos;s build something great together.
//         </h2>

//         {/* Join Us Button Component */}
//         <Btn
//           label="Join Us"
//           onClick={() => {
//             // handle click logic
//           }}
//           className="w-full max-w-[373px] !h-[75px] !px-[30px] !gap-[60px] border-none"
//           textColor="text-[#59624D]"
//           hoverTextColor="text-[#FFFFFF]"
//           bgColor="bg-white"
//           hoverBgColor="bg-[#59624D]"
//           borderColor="border-transparent"
//           arrowColor="stroke-[#59624D]"
//           hoverArrowColor="stroke-white"
//           textSize="text-[20px]"
//           arrowClassName="rotate-90 !w-[30px] !h-[30px]"
//         />

//       </div>
//     </section>
//   );
// }
