// export default function SustainabilityAbout() {
//   return (
//     <section
//       className="relative w-full min-h-screen py-12 md:py-20 bg-cover bg-center bg-no-repeat overflow-hidden"
//       style={{
//         height: "100vh",
//         minHeight: "600px",
//         backgroundImage: "url('/sustainability/sus-about.webp')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Content Container leveraging your custom .fix class */}
//       <div className="fix relative z-10 w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
//         {/* Left Column: Subtitle & Heading */}
//         <div className="w-full lg:w-1/2  flex flex-col justify-start items-start">
//           {/* Subtitle / Tagline */}
//           <p className="text-xs md:text-sm tracking-[2px] font-semibold text-[#666666] uppercase mb-6 flex items-center gap-2">
//             <span className="text-[#888888] font-normal">//</span>
//             INSPIRING GREEN DEVELOPMENT
//           </p>

//           {/* Main Heading (#212121, 40px on Desktop) */}
//           <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#212121] leading-[1.2] tracking-tight">
//             Where Profit Meets Planet.
//           </h2>
//         </div>

//         {/* Right Column: Paragraph Content */}
//         <div className="w-full lg:w-1/2 mt-[2.5%] flex flex-col gap-6">
//           {/* First Paragraph (24px, font-weight 500, line-height 140%, color #212121) */}
//           <p
//             className="text-[18px] sm:text-[21px] lg:text-[24px] font-medium text-[#212121]"
//             style={{ lineHeight: "140%" }}
//           >
//             At KSH INFRA, Inspiring Green Development is more than a
//             promise—it’s the foundation of everything we build. We believe that
//             business success and environmental responsibility must go hand in
//             hand. That’s why every project we undertake adheres to stringent
//             Green Building standards, ensuring long-term value for our partners
//             and minimal impact on the environment.
//           </p>

//           {/* Second Paragraph (20px, font-weight 400 normal, color #4A4A4A) */}
//           <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal text-[#4A4A4A] leading-relaxed">
// We are proud of our EDGE and IGBC Platinum Certifications —
// it&apos;s how we bring you industrial parks that are high-quality,
// efficient, and kind to our planet at the same time. When you choose
// KSH INFRA, you join our commitment to making a sustainable tomorrow.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";

const Profit = () => {
  return (
    <section className="relative w-full overflow-hidden pt-12 sm:pt-20 lg:pt-22 xl:pt-26 2xl:pt-34 pb-12 sm:pb-16 lg:pb-[160px] xl:pb-[200px] 2xl:pb-[300px] 1920:pb-[350px]">
      {/* Content Container */}
      <div className="fix relative z-10">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          {/* Left Content */}
          <div className="w-full">
            <h2 className=" font-semibold leading-[1.05] tracking-[-0.015em] text-[#111111] lg:text-[40px] 2xl:text-[48px]">
              Where Profit Meets Planet.
            </h2>
          </div>

          {/* Right Content */}
          <div className="flex w-full flex-col gap-4 sm:gap-5">
            <p className="font-medium leading-[1.4] text-[#212121] text-[clamp(1rem,1vw+0.75rem,1.5rem)]">
              At KSH INFRA, Inspiring Green Development is more than a
              promise—it’s the foundation of everything we build. We believe
              that business success and environmental responsibility must go
              hand in hand. That’s why every project we undertake adheres to
              stringent Green Building standards, ensuring long-term value for
              our partners and minimal impact on the environment.
            </p>

            <p className="leading-[1.4] text-[#4A4A4A] text-[clamp(0.875rem,0.9vw+0.65rem,1.25rem)]">
              We are proud of our EDGE and IGBC Platinum Pre-Certifications —
              it&apos;s how we bring you Industrial parks that are high-quality,
              efficient, and kind to our planet at the same time. When you
              choose KSH INFRA, you join our commitment to making a sustainable
              tomorrow.
            </p>
          </div>
        </div>
      </div>

      {/* Full Width Background Image */}
      {/* Desktop Image (Positioned Absolute Bottom) */}
      <img
        src="/sustainability/sbout.webp"
        alt="Profit Background"
        className="hidden lg:block absolute bottom-0 left-0 w-full object-cover object-bottom z-0 pointer-events-none max-h-[750px] 2xl:max-h-[850px]"
      />

      {/* Mobile / Tablet Image */}
      <img
        src="/sustainability/mobilesusimg.png"
        alt="Profit Background"
        className="block lg:hidden w-full object-contain mt-8 pointer-events-none"
      />
    </section>
  );
};

export default Profit;
