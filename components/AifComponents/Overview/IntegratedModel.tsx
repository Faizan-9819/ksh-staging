// // import Eyebrow from "@/components/AifComponents/Eyebrow";

// const MODEL_COLUMNS = [
//   "Fund Raise",
//   "Investments and Land Acquisition",
//   "Asset Management and Exits",
//   "Design & Plan",
//   "Development",
//   "Leasing",
//   "Rent Collection & Maintenance",
// ];

// const VALUE_POINTS = [
//   "End-to-end responsibility <br/> and control",
//   "Robust underwriting with reliable <br/> inputs from the execution team (DM)",
//   "Zero dependence on <br/> third-party developers",
//   "Tighter control on cost, <br/> timeline and quality",
// ];

// export default function IntegratedModel() {
//   return (
//     <section className="bg-white">
//       <div className="fix py-16 lg:py-20">
//         {/* <Eyebrow>Fund&rsquo;s integrated model</Eyebrow> */}
//         <h2 className="mb-3 font-sora text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#212121] sm:text-[36px] lg:whitespace-nowrap lg:text-[44px]">
//           One platform. Connected decisions.
//         </h2>
//         <p className="mb-10 max-w-[80ch] font-inter text-lg leading-[1.4] text-[#4a4a4a] lg:mb-12 lg:text-xl">
//           KSH INFRA: An integrated Fund &amp; Development Management Platform
//           capturing value across the lifecycle.
//         </p>

//         {/* Diagram — grid columns shrink to fit instead of scrolling, so
//             nothing on the left ever gets clipped behind a scrollbar */}
//         <div>
//           <div className="mb-3.5 grid grid-cols-[minmax(120px,200px)_repeat(7,minmax(0,1fr))] items-stretch gap-2 sm:gap-3.5">
//             <div />
//             <div className="col-span-3 flex h-10 items-center justify-center rounded-full bg-[#212121] px-2 text-center font-sora text-[13px] font-medium tracking-[-0.02em] text-white sm:text-[15px]">
//               Fund Management
//             </div>
//             <div className="col-span-4 flex h-10 items-center justify-center rounded-full bg-[#212121] px-2 text-center font-sora text-[13px] font-medium tracking-[-0.02em] text-white sm:text-[15px]">
//               Development Management (DM)
//             </div>
//           </div>
//           <div className="mb-7 grid grid-cols-[minmax(120px,200px)_repeat(7,minmax(0,1fr))] items-stretch gap-2 sm:gap-3.5">
//             <div />
//             {MODEL_COLUMNS.map((col) => (
//               <div
//                 key={col}
//                 className="box-border flex min-h-[76px] min-w-0 items-center justify-center overflow-hidden rounded-2xl bg-[#fbf2e8] p-[18px_10px] text-center font-sora text-[13px] 2xl:text-[15px] font-medium leading-[1.25] tracking-[-0.02em] text-[#212121] shadow-[inset_0_0_0_1px_#e9e9e9]"
//                 style={{ overflowWrap: "anywhere" }}
//               >
//                 {col}
//               </div>
//             ))}
//           </div>
//           <div className="mb-3.5 grid grid-cols-[minmax(120px,200px)_repeat(7,minmax(0,1fr))] items-stretch gap-2 sm:gap-3.5">
//             <div className="flex flex-col justify-center">
//               <span className="font-sora text-base font-semibold leading-[1.25] tracking-[-0.02em] text-[#212121] sm:text-lg">
//                 Typical Fund Model
//               </span>
//             </div>
//             <div className="col-span-3 flex h-14 items-center justify-center rounded-full bg-[#4a4a4a] font-sora text-base font-medium tracking-[-0.02em] text-white">
//               Inhouse
//             </div>
//             <div className="col-span-4 flex h-14 items-center justify-center rounded-full bg-[#d8d8d8] font-sora text-base font-medium tracking-[-0.02em] text-[#4a4a4a]">
//               Outsourced
//             </div>
//           </div>
//           {/* Mobile/tablet: Inhouse bar + KSH INFRA tag, its own small grid — unchanged from before */}
//           <div className="mb-0 grid grid-cols-[minmax(120px,200px)_repeat(7,minmax(0,1fr))] items-stretch gap-2 sm:gap-3.5 lg:hidden">
//             <div className="relative flex flex-col items-center justify-end">
//               <span className="translate-y-1/2 flex flex-col items-center justify-center gap-0.5 rounded-2xl bg-[#c5bdac] px-6 py-5 font-sora text-xl font-medium leading-none tracking-[0.02em] text-[#212121]">
//                 <span>KSH</span>
//                 <span>INFRA</span>
//               </span>
//             </div>
//             <div
//               className="col-span-7 flex h-14 items-center justify-center rounded-full font-sora text-base font-medium tracking-[-0.02em] text-[#212121]"
//               style={{
//                 backgroundColor: "#c5bdac",
//                 backgroundImage:
//                   "linear-gradient(152deg, rgba(219,212,195,0) 40%, rgba(219,212,195,.75) 50%, rgba(219,212,195,0) 60%), linear-gradient(152deg, rgba(219,212,195,0) 58%, rgba(219,212,195,.6) 68%, rgba(219,212,195,0) 78%)",
//               }}
//             >
//               Inhouse
//             </div>
//           </div>

//           {/* Desktop: Inhouse bar + ticks row share ONE grid (2 rows) so the KSH
//               INFRA box can row-span both and stretch to their combined height —
//               this changes the box's height only; the gap between the two rows
//               is still whatever this grid's own (zero) row-gap renders as, same
//               as the mt-0 that used to sit between them. */}
//           <div className="hidden lg:grid lg:grid-cols-[minmax(120px,200px)_repeat(7,minmax(0,1fr))] lg:grid-rows-[auto_auto] lg:items-stretch lg:gap-x-3.5">
//             <div className="row-span-2 flex items-center justify-center rounded-2xl bg-[#c5bdac] px-4 text-center font-sora text-xl font-medium leading-none tracking-[0.02em] text-[#212121]">
//               <img
//                 src="/about/kshscroll/aboutKSH.png"
//                 className="scale-50"
//                 alt=""
//               />
//               {/*  */}
//             </div>
//             <div
//               className="col-span-7 flex h-14 items-center justify-center rounded-full font-sora text-base font-medium tracking-[-0.02em] text-[#212121]"
//               style={{
//                 backgroundColor: "#c5bdac",
//                 backgroundImage:
//                   "linear-gradient(152deg, rgba(219,212,195,0) 40%, rgba(219,212,195,.75) 50%, rgba(219,212,195,0) 60%), linear-gradient(152deg, rgba(219,212,195,0) 58%, rgba(219,212,195,.6) 68%, rgba(219,212,195,0) 78%)",
//               }}
//             >
//               Inhouse
//             </div>
//             <div className="col-span-7 mt-5 grid grid-cols-4 gap-x-11 gap-y-7">
//               {VALUE_POINTS.map((point) => (
//                 <div key={point} className="flex flex-col items-center gap-3">
//                   <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full bg-[#59624D] font-inter text-[20px] text-white">
//                     ✓
//                   </span>
//                   <span
//                     className="font-inter text-base w-full text-center leading-[1.4] text-[#212121]"
//                     dangerouslySetInnerHTML={{ __html: point }}
//                   ></span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Mobile/tablet: ticks row, plain stacked block — unchanged from before */}
//         <div className="mt-0 lg:hidden">
//           <div className="grid grid-cols-1 gap-7 sm:grid-cols-4 sm:gap-x-11 sm:gap-y-7">
//             {VALUE_POINTS.map((point) => (
//               <div key={point} className="flex items-center gap-3 flex-col">
//                 <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full bg-[#59624D] font-inter text-[20px] text-white">
//                   ✓
//                 </span>
//                 <span
//                   className="font-inter text-base w-full text-center leading-[1.4] text-[#212121]"
//                   dangerouslySetInnerHTML={{ __html: point }}
//                 ></span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

//
//
//
//
// import Eyebrow from "@/components/AifComponents/Eyebrow";

const MODEL_COLUMNS = [
  "Fund Raise",
  "Investments and Land Acquisition",
  "Asset Management and Exits",
  "Design & Plan",
  "Development",
  "Leasing",
  "Rent Collection & Maintenance",
];

const VALUE_POINTS = [
  "End-to-end responsibility <br/> and control",
  "Robust underwriting with reliable <br/> inputs from the execution team (DM)",
  "Zero dependence on <br/> third-party developers",
  "Tighter control on cost, <br/> timeline and quality",
];

export default function IntegratedModel() {
  return (
    <section className="bg-white">
      <div className="fix py-10 sm:py-16 lg:py-20">
        {/* Header Section */}
        <h2 className="mb-3 font-sora text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#212121] sm:text-[36px] lg:whitespace-nowrap lg:text-[44px]">
          One platform. Connected decisions.
        </h2>
        <p className="mb-8 max-w-[80ch] font-inter text-base sm:text-lg leading-[1.4] text-[#4a4a4a] lg:mb-12 lg:text-xl">
          KSH INFRA: An integrated Fund &amp; Development Management Platform
          capturing value across the lifecycle.
        </p>

        {/* =========================================================================
            MOBILE & TABLET VIEW (< lg): STACKED ROADMAP DESIGN (NO HORIZONTAL SCROLL)
           ========================================================================= */}
        <div className="block lg:hidden">
          {/* Section 1: Fund Management (First 3 Steps) */}
          <div className="mb-6 rounded-2xl bg-[#f8f6f0] p-4 sm:p-6 border border-[#e5ded0]">
            <div className="mb-4 inline-flex items-center rounded-full bg-[#212121] px-4 py-1.5 font-sora text-sm font-semibold text-white">
              Fund Management
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {MODEL_COLUMNS.slice(0, 3).map((col, idx) => (
                <div
                  key={col}
                  className="flex items-center gap-3 rounded-xl bg-white p-3.5 shadow-sm border border-[#eaeaea]"
                >
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#212121] font-sora text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <span className="font-sora text-sm font-medium text-[#212121]">
                    {col}
                  </span>
                </div>
              ))}
            </div>

            {/* Typical Fund Model tag */}
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#e2d9c8] pt-3 text-xs font-medium text-[#4a4a4a]">
              <span>Typical Fund Model:</span>
              <span className="rounded-full bg-[#4a4a4a] px-3 py-1 font-semibold text-white">
                Inhouse
              </span>
            </div>
          </div>

          {/* Section 2: Development Management (Next 4 Steps) */}
          <div className="mb-8 rounded-2xl bg-[#f8f6f0] p-4 sm:p-6 border border-[#e5ded0]">
            <div className="mb-4 inline-flex items-center rounded-full bg-[#212121] px-4 py-1.5 font-sora text-sm font-semibold text-white">
              Development Management (DM)
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {MODEL_COLUMNS.slice(3).map((col, idx) => (
                <div
                  key={col}
                  className="flex items-center gap-3 rounded-xl bg-white p-3.5 shadow-sm border border-[#eaeaea]"
                >
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#212121] font-sora text-xs font-bold text-white">
                    {idx + 4}
                  </span>
                  <span className="font-sora text-sm font-medium text-[#212121]">
                    {col}
                  </span>
                </div>
              ))}
            </div>

            {/* Typical Fund Model tag */}
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#e2d9c8] pt-3 text-xs font-medium text-[#4a4a4a]">
              <span>Typical Fund Model:</span>
              <span className="rounded-full bg-[#d8d8d8] px-3 py-1 font-semibold text-[#4a4a4a]">
                Outsourced
              </span>
            </div>
          </div>

          {/* Section 3: KSH INFRA Full Lifecycle Banner */}
          <div
            className="mb-8 rounded-2xl p-5 text-center shadow-md"
            style={{
              backgroundColor: "#c5bdac",
              backgroundImage:
                "linear-gradient(152deg, rgba(219,212,195,0) 40%, rgba(219,212,195,.75) 50%, rgba(219,212,195,0) 60%), linear-gradient(152deg, rgba(219,212,195,0) 58%, rgba(219,212,195,.6) 68%, rgba(219,212,195,0) 78%)",
            }}
          >
            <img
              src="/ksh2.svg"
              className="mx-auto h-12 w-auto"
              alt="KSH INFRA"
            />
            {/* <div className="mt-1 font-sora text-sm font-medium text-[#212121]/80">
              100% Inhouse Execution Across All 07 Lifecycle Stages
            </div> */}
          </div>

          {/* Section 4: Value Points Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {VALUE_POINTS.map((point) => (
              <div
                key={point}
                className="flex items-center gap-3.5 rounded-2xl bg-[#fbf2e8] p-4 border border-[#eee3d5]"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#59624D] font-inter text-base text-white">
                  ✓
                </span>
                <span
                  className="font-inter text-sm leading-[1.35] text-[#212121]"
                  dangerouslySetInnerHTML={{ __html: point }}
                ></span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            DESKTOP LAYOUT (lg and above) - EXACTLY AS ORIGINAL (100% UNCHANGED)
           ========================================================================= */}
        <div className="hidden lg:block">
          <div className="mb-3.5 grid grid-cols-[minmax(120px,200px)_repeat(7,minmax(0,1fr))] items-stretch gap-3.5">
            <div />
            <div className="col-span-3 flex h-10 items-center justify-center rounded-full bg-[#212121] px-2 text-center font-sora text-[15px] font-medium tracking-[-0.02em] text-white">
              Fund Management
            </div>
            <div className="col-span-4 flex h-10 items-center justify-center rounded-full bg-[#212121] px-2 text-center font-sora text-[15px] font-medium tracking-[-0.02em] text-white">
              Development Management (DM)
            </div>
          </div>

          <div className="mb-7 grid grid-cols-[minmax(120px,200px)_repeat(7,minmax(0,1fr))] items-stretch gap-3.5">
            <div />
            {MODEL_COLUMNS.map((col) => (
              <div
                key={col}
                className="box-border flex min-h-[76px] min-w-0 items-center justify-center overflow-hidden rounded-2xl bg-[#fbf2e8] p-[18px_10px] text-center font-sora text-[13px] 2xl:text-[15px] font-medium leading-[1.25] tracking-[-0.02em] text-[#212121] shadow-[inset_0_0_0_1px_#e9e9e9]"
                style={{ overflowWrap: "anywhere" }}
              >
                {col}
              </div>
            ))}
          </div>

          <div className="mb-3.5 grid grid-cols-[minmax(120px,200px)_repeat(7,minmax(0,1fr))] items-stretch gap-3.5">
            <div className="flex flex-col justify-center">
              <span className="font-sora text-lg font-semibold leading-[1.25] tracking-[-0.02em] text-[#212121]">
                Typical Fund Model
              </span>
            </div>
            <div className="col-span-3 flex h-14 items-center justify-center rounded-full bg-[#4a4a4a] font-sora text-base font-medium tracking-[-0.02em] text-white">
              Inhouse
            </div>
            <div className="col-span-4 flex h-14 items-center justify-center rounded-full bg-[#d8d8d8] font-sora text-base font-medium tracking-[-0.02em] text-[#4a4a4a]">
              Outsourced
            </div>
          </div>

          <div className="grid grid-cols-[minmax(120px,200px)_repeat(7,minmax(0,1fr))] grid-rows-[auto_auto] items-stretch gap-x-3.5">
            <div className="row-span-2 flex items-center justify-center rounded-2xl bg-[#c5bdac] px-4 text-center font-sora text-xl font-medium leading-none tracking-[0.02em] text-[#212121]">
              <img src="/ksh2.svg" className="scale-50" alt="" />
            </div>
            <div
              className="col-span-7 flex h-14 items-center justify-center rounded-full font-sora text-base font-medium tracking-[-0.02em] text-[#212121]"
              style={{
                backgroundColor: "#c5bdac",
                backgroundImage:
                  "linear-gradient(152deg, rgba(219,212,195,0) 40%, rgba(219,212,195,.75) 50%, rgba(219,212,195,0) 60%), linear-gradient(152deg, rgba(219,212,195,0) 58%, rgba(219,212,195,.6) 68%, rgba(219,212,195,0) 78%)",
              }}
            >
              Inhouse
            </div>
            <div className="col-span-7 mt-5 grid grid-cols-4 gap-x-11 gap-y-7">
              {VALUE_POINTS.map((point) => (
                <div key={point} className="flex flex-col items-center gap-3">
                  <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full bg-[#59624D] font-inter text-[20px] text-white">
                    ✓
                  </span>
                  <span
                    className="font-inter text-base w-full text-center leading-[1.4] text-[#212121]"
                    dangerouslySetInnerHTML={{ __html: point }}
                  ></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
