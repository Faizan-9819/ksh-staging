// import Eyebrow from "@/components/AifComponents/Eyebrow";

// const WHY_KSH = [
//   "Extensive experience across the industrial infrastructure asset lifecycle",
//   "Development capabilities closely integrated with investment evaluation and asset strategy",
//   "Deep leasing and occupier insights driving product design, location selection, and stabilisation strategies",
//   "Asset management capabilities focussed on high-quality occupier experiences, and long-term asset performance",
//   "Proven experience collaborating with strategic institutional investors through diverse investment structures",
//   "Governance and oversight frameworks aligned with institutional capital requirements",
// ];

// export default function VehicleAndWhyKsh() {
//   return (
//     <section className="bg-[#fff]">
//       <div className="fix flex flex-col py-16 lg:py-[90px] lg:flex-row lg:gap-[107px]">
//         <div className="lg:flex-1">
//           <Eyebrow>Fund I</Eyebrow>
//           <h2 className="mb-6 font-sora text-[28px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#212121] sm:text-[32px] lg:text-[40px]">
//             Dedicated Industrial Logistics & Warehousing Development AIF
//           </h2>
//           <p className="m-0 font-inter text-lg leading-[1.4] text-[#4a4a4a] lg:text-xl">
//             A Category II Alternative Investment Fund (AIF) with a target corpus
//             of INR 1,250 Cr. focused on delivering stable, long-term returns
//             through strategic investments in the development of Grade A
//             industrial parks. The Fund is designed to capitalise on the growth
//             of key industrial ecosystems across Pune, Chennai, Bengaluru, and
//             Mumbai, partnering in the creation of high-quality, future-ready
//             infrastructure that supports India’s expanding manufacturing and
//             industrial landscape.
//           </p>
//           {/* 2. Fund Manager */}
//           <section className="pt-10 mt-10 border-t-2 border-black/10">
//             <div className="w-fit flex-col-reverse flex">
//               <div className="flex flex-col items-start gap-9 lg:flex-row lg:gap-10">
//                 <div className="overflow-hidden w-fit shrink-0">
//                   <img
//                     src="/aif/fund-details/shailesh-agrawal.png"
//                     alt="Shailesh R Agrawal"
//                     className="h-auto w-[200px] rounded-[20px]"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-7 lg:pt-3">
//                   <div>
//                     <div className="font-sora text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-[#212121]">
//                       Shailesh R Agrawal
//                     </div>
//                     <div className="mt-1 font-inter text-base leading-[1.4] text-[#59624D]">
//                       Head &ndash; Fund Management, KSH INFRA
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//         <div className="mt-12 lg:mt-0 lg:flex-1">
//           <Eyebrow>KSH INFRA - Where Capital Meets Capability</Eyebrow>
//           <ul className="m-0 list-none p-0">
//             {WHY_KSH.map((item, i) => (
//               <li
//                 key={item}
//                 className={`border-t border-[#ded9cf] py-4 font-inter text-base leading-[1.4] text-[#212121] ${
//                   i === WHY_KSH.length - 1 ? "border-b" : ""
//                 }`}
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MemberCard2 from "@/components/AifComponents/Governance/MemberCard2";
import Popup from "@/components/sections/team/popup";
import { stopLenis, startLenis } from "@/components/ui/LenisProvider";

const SHAILESH_NAME = "Shailesh Agrawal";
const SHAILESH_ROLE = "Head – Fund Management, KSH INFRA";
const SHAILESH_LINKEDIN = "https://www.linkedin.com/in/shaileshragrawal/";
const SHAILESH_ACADEMICS = ["MBA – IIM Ahmedabad", "B.Tech. – IIT Madras"];
const SHAILESH_DESCRIPTION =
  "Shailesh R Agrawal leads Fund Management at KSH INFRA, where he is responsible for building the institutional investment platform and driving its investment strategy, capital allocation and value creation approach. He brings over 15 years of experience across fund management, private equity, corporate strategy and real estate, having held leadership roles at Welspun One and worked with leading global investors and businesses through Bain & Company, Alvarez & Marsal, Tata Group and Deloitte.<br />An alumnus of IIM Ahmedabad and IIT Madras, Shailesh brings extensive experience across investment evaluation, capital deployment, portfolio strategy, fundraising and institutional partnerships. At KSH INFRA, he leads the development of strategic capital & investor partnerships, and deployment of capital into high-quality Industrial and Logistics infrastructure.<br />He is instrumental in KSH INFRA's ambition to build a differentiated, institutionally managed investment platform focused on creating sustainable, Grade A Industrial and Logistics infrastructure across India's high-growth economic corridors.";

const WHY_KSH = [
  "Extensive experience across the Industrial infrastructure asset lifecycle",
  "Development capabilities closely integrated with investment evaluation and asset strategy",
  "Deep leasing and occupier insights driving product design, location selection, and stabilisation strategies",
  "Asset management capabilities focussed on high-quality occupier experiences, and long-term asset performance",
  "Proven capital management experience with strategic institutional investors through diverse investment structures",
  "Governance and oversight frameworks aligned with institutional capital requirements",
];

export default function VehicleAndWhyKsh() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    stopLenis();
    return () => startLenis();
  }, [open]);

  return (
    <section className="bg-[#FBF2E8]">
      <div className="fix flex flex-col py-16 lg:py-[90px] lg:flex-row lg:gap-[50px]">
        <div className="w-full lg:w-[580px]">
          <h3 className="font-sora text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-[#212121] sm:text-[28px]">
            Meet the Fund Manager
          </h3>

          {/* 2. Fund Manager */}
          <section className="mt-6 max-w-[580px]">
            <MemberCard2
              // photo="/aif/fund-I-details/shailesh-agrawal.png"
              photo="/aif/fund-details/shailesh-agrawal.png"
              name={SHAILESH_NAME}
              role={SHAILESH_ROLE}
              onClick={() => setOpen(true)}
              linkedin={SHAILESH_LINKEDIN}
            />
          </section>
        </div>
        <div className="mt-12 lg:mt-0 lg:flex-1">
          <h4 className="mb-4 font-sora text-lg font-semibold leading-[1.2] tracking-[-0.02em] text-[#212121] sm:text-xl">
            KSH INFRA - Where Capital Meets Capability
          </h4>
          <ul className="m-0 list-none p-0">
            {WHY_KSH.map((item, i) => (
              <li
                key={item}
                className={`border-t border-[#ded9cf] py-[19px] font-inter text-base leading-[1.4] text-[#212121] ${
                  i === WHY_KSH.length - 1 ? "border-b" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <Popup
            key="shailesh-popup"
            open={open}
            onClose={() => setOpen(false)}
            member={{
              name: SHAILESH_NAME,
              designation: SHAILESH_ROLE,
              linkedin: SHAILESH_LINKEDIN,
              academics: SHAILESH_ACADEMICS,
              description: SHAILESH_DESCRIPTION,
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
