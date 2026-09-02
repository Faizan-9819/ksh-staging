// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { AnimatePresence } from "framer-motion";
// import ESGPopForm from "./ESGPopForm";

// export default function ESGReports() {
//   const [hovered, setHovered] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 1024);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const active = isMobile || hovered;

//   return (
//     <section
//       className="w-full overflow-x-hidden px-6 sm:px-8 py-16 md:py-20"
//       style={{
//         background:
//           "radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%)",
//       }}
//     >
//       <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-12">
//         {/* Left: Text + Button */}
//         <div className="flex flex-col items-start gap-8 lg:w-1/2">
//           <h2 className="text-white text-[30px] lg:text-[48px] font-semibold leading-[1.2] tracking-tight">
//             Download Our
//             <br />
//             ESG Reports
//           </h2>

//           <button
//             onClick={() => setShowForm(true)}
//             onMouseEnter={() => {
//               if (!isMobile) setHovered(true);
//             }}
//             onMouseLeave={() => {
//               if (!isMobile) setHovered(false);
//             }}
//             className="relative cursor-pointer inline-flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full border bg-white! border-white px-6 sm:px-10 gap-6 transition-colors duration-300"
//           >
//             {/* Label */}
//             <span
//               className={`relative z-10 pr-7 text-[#59624D] whitespace-nowrap font-[family-name:var(--font-sora),sans-serif] font-medium text-[15px] leading-[1.4] transition-colors duration-300`}
//             >
//               Download ESG Report
//             </span>

//             {/* Down arrow SVG Image */}
//             <div
//               className={`relative z-10 flex-shrink-0 transition-[filter] duration-300`}
//             >
//               <Image
//                 src="/sustainability/downarrow.svg"
//                 alt="Arrow Down"
//                 width={16}
//                 height={20}
//               />
//             </div>
//           </button>
//         </div>

//         {/* Right: Two Report Cards */}
//         <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 w-full lg:w-auto">
//           {/* Card 1 */}
//           {/* <div className="relative w-[180px] lg:w-[188px] aspect-[3/4] overflow-hidden shadow-2xl">
//             <div className="w-full h-full bg-white/10" />
//             <Image
//               src="/sustainability/esg1.webp"
//               alt="ESG Report 1"
//               fill
//               className="object-cover"
//             />
//           </div> */}
//           {/* <div className="flex flex-col items-center gap-2">
//             <div className="relative w-[180px] lg:w-[188px] aspect-[3/4] overflow-hidden shadow-2xl">
//               <div className="w-full h-full bg-white/10" />
//               <Image
//                 src="/sustainability/esg1.webp"
//                 alt="ESG Report 1"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <p className="text-center text-white font-medium">2023</p>
//           </div> */}
//           <div className="flex flex-col items-center gap-2">
//             <div className="relative w-[180px] lg:w-[188px] aspect-[3/4] overflow-hidden shadow-2xl">
//               <div className="w-full h-full bg-white/10" />
//               <Image
//                 src="/sustainability/esg2.webp"
//                 alt="ESG Report 2"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <p className="text-center text-white font-medium">2024-2025</p>
//           </div>
//           <div className="flex flex-col items-center gap-2">
//             <div className="relative w-[180px] lg:w-[188px] aspect-[3/4] overflow-hidden shadow-2xl">
//               <div className="w-full h-full bg-white/10" />
//               <Image
//                 src="/sustainability/esg1.webp"
//                 alt="ESG Report 1"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <p className="text-center text-white font-medium">2023-2024</p>
//           </div>
//           {/* Card 2 */}
//           {/* <div className="relative w-[180px] lg:w-[188px] aspect-[3/4] overflow-hidden shadow-2xl">
//             <div className="w-full h-full bg-white/10" />
//             <Image
//               src="/sustainability/esg2.webp"
//               alt="ESG Report 2"
//               fill
//               className="object-cover"
//             />
//           </div> */}
//           {/* <div className="flex flex-col items-center gap-2">
//             <div className="relative w-[180px] lg:w-[188px] aspect-[3/4] overflow-hidden shadow-2xl">
//               <div className="w-full h-full bg-white/10" />
//               <Image
//                 src="/sustainability/esg2.webp"
//                 alt="ESG Report 2"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <p className="text-center text-white font-medium">2024-2025</p>
//           </div> */}
//         </div>
//       </div>

//       <AnimatePresence>
//         {showForm && <ESGPopForm onClose={() => setShowForm(false)} />}
//       </AnimatePresence>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import ESGPopForm, { DEFAULT_ESG_REPORTS } from "./ESGPopForm";
import CertDownloadModal from "../parksections/CertDownloadModal";

// Single source of truth for the year list — always mirrors whatever years
// ESGPopForm itself offers, so this outer dropdown can never drift out of
// sync with the popup's own options.
const ESG_REPORT_YEARS = Object.keys(DEFAULT_ESG_REPORTS);

// Park options for the certificate dropdown. `value` must match a key in
// CERT_FILES (app/api/cert-verify/route.ts) so the right .rar gets attached:
// ksh-chakan-iv -> KSH-Chakan-IV-Certificates.rar, ksh-chakan-iii ->
// KSH-Chakan-III-Certificates.rar, ksh-hosur-i -> Goldberg_certificates.rar.
const CERT_PARK_OPTIONS = [
  { value: "ksh-chakan-iv", label: "KSH Chakan IV" },
  { value: "ksh-chakan-iii", label: "KSH Chakan III" },
  { value: "ksh-hosur-i", label: "KSH Hosur I" },
];

interface DownloadButtonProps {
  label: string;
  onClick: () => void;
}

function DownloadButton({ label, onClick }: DownloadButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative cursor-pointer inline-flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full border bg-white! border-white px-6 sm:px-10 gap-6 transition-colors duration-300"
    >
      <span className="relative z-10 pr-7 text-[#59624D] whitespace-nowrap font-[family-name:var(--font-sora),sans-serif] font-medium text-[15px] leading-[1.4]">
        {label}
      </span>
      <div className="relative z-10 shrink-0">
        <Image
          src="/sustainability/downarrow.svg"
          alt="Arrow Down"
          width={16}
          height={20}
          priority
        />
      </div>
    </button>
  );
}

export default function ESGReports() {
  const [selectedYear, setSelectedYear] = useState("");
  const [showEsgForm, setShowEsgForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const [selectedPark, setSelectedPark] = useState("");
  const [certError, setCertError] = useState("");
  const [esgError, setEsgError] = useState("");

  const handleEsgDownloadClick = () => {
    if (!selectedYear) {
      setEsgError("Please select a year");
      return;
    }
    setEsgError("");
    setShowEsgForm(true);
  };

  const handleCertDownloadClick = () => {
    if (!selectedPark) {
      setCertError("Please select a park");
      return;
    }
    setCertError("");
    setShowCertForm(true);
  };

  return (
    <section
      className="w-full overflow-x-hidden px-6 sm:px-8 py-16 md:pb-20 md:pt-17"
      style={{
        background:
          "radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10 lg:gap-14">
        <h2 className="text-white text-[30px] lg:text-[48px] font-semibold leading-[1.2] tracking-tight text-center">
          Downloads
        </h2>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-14 lg:gap-x-24">
          {/* Vertical white partition between the two columns (desktop only — the columns stack on mobile, so a vertical line has nothing to divide there). */}
          <div
            aria-hidden="true"
            className="hidden sm:block absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/40"
          />

          {/* Left column: ESG Reports */}
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-white text-[22px] lg:text-[26px] font-semibold leading-[1.2]">
              ESG Reports
            </h3>

            <div className="w-full flex justify-center">
              <Image
                src="/sustainability/reports.svg"
                alt=""
                width={96}
                height={96}
                aria-hidden="true"
                className="w-20 h-20 lg:w-24 lg:h-24"
                priority
              />
            </div>

            <div className="relative w-full max-w-55">
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setEsgError("");
                }}
                aria-label="Select ESG report year"
                className="w-full bg-black/15 text-white border-b border-white/30 py-2 px-4 outline-none appearance-none pr-8 font-[family-name:var(--font-inter),sans-serif] text-[15px]"
              >
                <option className="bg-[#58614E] text-white" value="" disabled>
                  Select a Year
                </option>
                {ESG_REPORT_YEARS.map((y) => (
                  <option className="bg-[#58614E] text-white" key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
              {esgError && (
                <p className="mt-1 text-xs text-red-300">{esgError}</p>
              )}
            </div>

            <div className="mt-auto w-full sm:w-auto">
              <DownloadButton
                label="Download ESG Report"
                onClick={handleEsgDownloadClick}
              />
            </div>
          </div>

          {/* Right column: Certificates */}
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-white text-[22px] text-center lg:text-[26px] font-semibold leading-[1.2]">
              Certificates
            </h3>

            <div className="w-full flex justify-center">
              <Image
                src="/sustainability/certificate%201x.svg"
                alt=""
                width={96}
                height={96}
                aria-hidden="true"
                className="w-20 h-20 lg:w-24 lg:h-24"
                priority
              />
            </div>

            <div className="relative w-full max-w-55">
              <select
                value={selectedPark}
                onChange={(e) => {
                  setSelectedPark(e.target.value);
                  setCertError("");
                }}
                aria-label="Select park for certificate"
                className="w-full bg-black/15 text-white border-b border-white/30 py-2 px-4 outline-none appearance-none pr-8 font-[family-name:var(--font-inter),sans-serif] text-[15px]"
              >
                <option className="bg-[#58614E] text-white" value="" disabled>
                  Select a Park
                </option>
                {CERT_PARK_OPTIONS.map((p) => (
                  <option
                    className="bg-[#58614E] text-white"
                    key={p.value}
                    value={p.value}
                  >
                    {p.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
              {certError && (
                <p className="mt-1 text-xs text-red-300">{certError}</p>
              )}
            </div>

            <div className="mt-auto w-full sm:w-auto">
              <DownloadButton
                label="Download Compliance Report"
                onClick={handleCertDownloadClick}
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showEsgForm && (
          <ESGPopForm
            onClose={() => setShowEsgForm(false)}
            initialYear={selectedYear}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCertForm && (
          <CertDownloadModal
            onClose={() => setShowCertForm(false)}
            source={selectedPark}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
