// "use client";

// import { useState, useEffect, useRef } from "react";

// const ITEMS = [
//   {
//     title: "Learn, Grow & Lead",
//     desc: "At KSH INFRA, growth goes beyond job titles. Through hands-on project exposure, mentorship, and continuous learning, we empower individuals to build expertise, take ownership, and advance their careers.",
//     img: "/home/Growth/grow1.jpg",
//   },
//   {
//     title: "Driven by Collaboration",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
//     img: "/home/Growth/grow3.jpg",
//   },
//   {
//     title: "Opportunities that Create Impact",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio",
//     img: "/home/Growth/grow2.jpg",
//   },
// ];

// const IMGS = [
//   "/home/Growth/grow1.jpg",
//   "/home/Growth/grow3.jpg",
//   "/home/Growth/grow2.jpg",
//   "/home/Growth/grow1.jpg",
//   "/home/Growth/grow3.jpg",
//   "/home/Growth/grow2.jpg",
// ];

// export default function GrowthSus() {
//   const [active, setActive] = useState(0);
//   const prevActiveRef = useRef(0);
//   const ringRef = useRef<HTMLDivElement>(null);
//   const angleRef = useRef(0);
//   const targetRef = useRef<number | null>(null);
//   const rafRef = useRef<number>(0);

//   // Track heights of accordion elements dynamically to prevent layout popping
//   const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // Capture the previous active index before updating state to sync transition calculations
//   useEffect(() => {
//     prevActiveRef.current = active;
//   }, [active]);

//   useEffect(() => {
//     const TILT = "rotateX(14deg) rotateZ(-10deg) ";
//     const loop = () => {
//       const el = ringRef.current;
//       if (el) {
//         if (targetRef.current !== null) {
//           const diff = targetRef.current - angleRef.current;
//           // Slowed down the gallery carousel rotation transition to match a 500ms feel (0.08 -> 0.045)
//           angleRef.current += diff * 0.045;
//           if (Math.abs(diff) < 0.05) {
//             angleRef.current = targetRef.current;
//             targetRef.current = null;
//           }
//         } else {
//           angleRef.current -= 0.12;
//         }
//         el.style.transform =
//           TILT + "rotateY(" + angleRef.current.toFixed(2) + "deg)";
//       }
//       rafRef.current = requestAnimationFrame(loop);
//     };
//     rafRef.current = requestAnimationFrame(loop);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, []);

//   const goTo = (i: number) => {
//     setActive(i);
//     const want = -i * 120;
//     const cur = angleRef.current;
//     targetRef.current = want + Math.round((cur - want) / 360) * 360;
//   };

//   const ringW = 240;
//   const R = Math.round(ringW * 0.92);

//   return (
//     <section className="relative w-full bg-white font-[var(--font-inter),sans-serif] overflow-hidden">
//       <div className="fix relative py-20 ">
//         {/* ─── MOBILE: image-card accordion, one item always open, no 3D ring ─── */}
//         <div className="lg:hidden">
//           <div className="flex items-center gap-[9px] mb-[14px]">
//             <span className="text-[#8C8C84] font-semibold text-[13px]">//</span>
//             <h5 className="text-[#8C8C84] font-medium text-[12px] tracking-[-2%]">
//               GROW WITH KSH INFRA
//             </h5>
//           </div>
//           <h2 className="font-semibold text-[16px] lg:text-[20px] leading-[1.08] tracking-[-0.015em]">
//       We are consciously aware of the effects that large projects can have on the community. Our goal is to ensure that these effects are beneficial for the people living around us. KSH INFRA Parks designed to have a positive influence, and all projects adhere to the best practices for social responsibility.
//           </h2>

//           <div>
//             {ITEMS.map((it, i) => {
//               const on = i === active;
//               return (
//                 <div key={it.title} className="border-b border-[#E3E2DD]">
//                   <div
//                     onClick={() => setActive(i)}
//                     className="flex items-start justify-between gap-4 py-5 cursor-pointer"
//                   >
//                     <h3
//                       className={`m-0 flex-1 min-w-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[20px] tracking-[-0.01em] transition-colors duration-500 ease-in-out ${on ? "text-[#212121]" : "text-[#868686]"}`}
//                     >
//                       {it.title}
//                     </h3>
//                     <span
//                       className={`shrink-0 mt-1 flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors duration-500 ease-in-out ${on ? "bg-[#5E6E4E] border border-[#5E6E4E]" : "bg-transparent border border-[#C9C6BD]"}`}
//                     >
//                       {on ? (
//                         <svg
//                           width="14"
//                           height="14"
//                           viewBox="0 0 14 14"
//                           fill="none"
//                         >
//                           <line
//                             x1="3"
//                             y1="7"
//                             x2="11"
//                             y2="7"
//                             stroke="#FFFFFF"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                           />
//                         </svg>
//                       ) : (
//                         <svg
//                           width="14"
//                           height="14"
//                           viewBox="0 0 14 14"
//                           fill="none"
//                         >
//                           <line
//                             x1="3"
//                             y1="7"
//                             x2="11"
//                             y2="7"
//                             stroke="#8A8A82"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                           />
//                           <line
//                             x1="7"
//                             y1="3"
//                             x2="7"
//                             y2="11"
//                             stroke="#8A8A82"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                           />
//                         </svg>
//                       )}
//                     </span>
//                   </div>

//                   {/*
//                     grid-template-rows 0fr -> 1fr technique: no scrollHeight
//                     measuring, no setTimeout hacks, no layout thrashing.
//                     The row track itself animates, so height is always
//                     correct on first paint, on resize, and on font load —
//                     this is what eliminates the jump/jerk bugs.
//                   */}
//                   <div
//                     className="grid transition-[grid-template-rows] duration-500 ease-in-out"
//                     style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
//                   >
//                     <div className="overflow-hidden">
//                       <div
//                         className="pb-6 transition-opacity duration-500 ease-in-out"
//                         style={{ opacity: on ? 1 : 0 }}
//                       >
//                         <div className="w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-4">
//                           <img
//                             src={it.img}
//                             alt={it.title}
//                             className="w-full h-full object-cover block"
//                           />
//                         </div>
//                         <p className="m-0 font-normal text-[14px] leading-[1.62] text-[#4A4A4A]">
//                           {it.desc}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ─── DESKTOP: unchanged ─── */}
//         <div className="hidden lg:flex gap-[clamp(24px,3vw,48px)] items-start lg:flex-nowrap">
//           {/* ─── LEFT ─── */}
//           <div className="[flex:1_1_400px] min-w-0">
//             <div className="flex items-center gap-[9px] mb-[clamp(14px,1.5vw,20px)]">
//               <span className="text-[#8C8C84] font-semibold text-[13px]">
//                 //
//               </span>
//               <h5 className="text-[#8C8C84] font-medium text-[12px] tracking-[-2%]">
//                 GROW WITH KSH INFRA
//               </h5>
//             </div>
//             <h2 className="section-title m-0 mb-[clamp(18px,2vw,22px)] w-[88%] font-semibold lg:text-[20px] leading-[1.04] tracking-[-0.015em]">
//             We are consciously aware of the effects that large projects can have on the community. Our goal is to ensure that these effects are beneficial for the people living around us. KSH INFRA Parks designed to have a positive influence, and all projects adhere to the best practices for social responsibility.
//             </h2>

//             <div>
//               {ITEMS.map((it, i) => {
//                 const on = i === active;

//                 // Safely fetch dynamic content height via refs
//                 const element = contentRefs.current[i];
//                 let maxHeightValue = "0px";

//                 if (on) {
//                   // If it's turning on, use its current scrollHeight
//                   maxHeightValue = element
//                     ? `${element.scrollHeight}px`
//                     : "auto";
//                 } else if (prevActiveRef.current === i) {
//                   // If it was just active and is now turning off, look inside its paragraph child
//                   // to safely pull the explicit layout height for a flawless collapse matching the 500ms timing
//                   const pElement = element?.querySelector("p");
//                   maxHeightValue = pElement
//                     ? `${pElement.offsetHeight + 16}px`
//                     : "0px"; // 16px matches pt-4

//                   // Force a quick layout pass to register the closing transition starting height cleanly
//                   setTimeout(() => {
//                     if (element) element.style.maxHeight = "0px";
//                   }, 0);
//                 }

//                 return (
//                   <div key={it.title} className="border-b border-[#E3E2DD]">
//                     <div
//                       onClick={() => goTo(i)}
//                       onMouseEnter={() => goTo(i)}
//                       className="flex items-start justify-between gap-5 py-[clamp(20px,2.2vw,30px)] cursor-pointer"
//                     >
//                       <div className="flex-1 min-w-0">
//                         <h3
//                           className={`m-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(20px,2vw,27px)] tracking-[-0.01em] [transition:color_.5s_ease] ${on ? "text-[#212121]" : "text-[#868686]"}`}
//                         >
//                           {it.title}
//                         </h3>

//                         {/* Clean inline transition tracking precisely measured DOM heights */}
//                         <div
//                           ref={(el) => {
//                             contentRefs.current[i] = el;
//                           }}
//                           className="overflow-hidden [transition:max-height_500ms_cubic-bezier(0.4,0,0.2,1),opacity_500ms_ease]"
//                           style={{
//                             maxHeight: maxHeightValue,
//                             opacity: on ? 1 : 0,
//                           }}
//                         >
//                           <p className="m-0 pt-4 font-normal text-[clamp(13px,1.08vw,14px)] leading-[1.62] text-[#4A4A4A] max-w-[520px]">
//                             {it.desc}
//                           </p>
//                         </div>
//                       </div>
//                       <span
//                         className={`shrink-0 mt-1 flex items-center justify-center w-[clamp(36px,3vw,42px)] h-[clamp(36px,3vw,42px)] rounded-full [transition:background_.50s_ease,border-color_.50s_ease] ${on ? "bg-[#5E6E4E] border border-[#5E6E4E]" : "bg-transparent border border-[#C9C6BD]"}`}
//                       >
//                         {on ? (
//                           <svg
//                             width="14"
//                             height="14"
//                             viewBox="0 0 14 14"
//                             fill="none"
//                           >
//                             <line
//                               x1="3"
//                               y1="7"
//                               x2="11"
//                               y2="7"
//                               stroke="#FFFFFF"
//                               strokeWidth="1.5"
//                               strokeLinecap="round"
//                             />
//                           </svg>
//                         ) : (
//                           <svg
//                             width="14"
//                             height="14"
//                             viewBox="0 0 14 14"
//                             fill="none"
//                           >
//                             <line
//                               x1="3"
//                               y1="7"
//                               x2="11"
//                               y2="7"
//                               stroke="#8A8A82"
//                               strokeWidth="1.5"
//                               strokeLinecap="round"
//                             />
//                             <line
//                               x1="7"
//                               y1="3"
//                               x2="7"
//                               y2="11"
//                               stroke="#8A8A82"
//                               strokeWidth="1.5"
//                               strokeLinecap="round"
//                             />
//                           </svg>
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* ─── RIGHT: 3D RING ─── */}
//           <div className="[flex:1_1_380px] min-w-[320px] 2xl:h-[470px] h-[490px] flex items-center justify-center self-center lg:mt-12">
//             <div className="[perspective:1200px] w-full h-full flex items-center justify-center">
//               <div
//                 ref={ringRef}
//                 className="relative [transform-style:preserve-3d]"
//                 style={{
//                   width: ringW,
//                   height: Math.round(ringW * 1.31),
//                   transform: "rotateX(14deg) rotateZ(-10deg) rotateY(0deg)",
//                 }}
//               >
//                 {IMGS.map((src, i) => (
//                   <div
//                     key={i}
//                     className="absolute inset-0 rounded-[18px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(20,25,40,0.5)] [backface-visibility:hidden]"
//                     style={{
//                       transform: `rotateY(${i * 60}deg) translateZ(${R}px)`,
//                     }}
//                   >
//                     <img
//                       src={src}
//                       alt=""
//                       className="w-full h-full object-cover block"
//                     />
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

"use client";

import { useState, useEffect, useRef } from "react";

const ITEMS = [
  {
    title: "TOWARD A CARBON NEUTRAL FUTURE",
    bullets: [
      "Solar energy option available at all our Industrial & Logistics parks to reduce reliance on the national power grid.",
      "Sustainable development practices integrated into all our future projects, ensuring long-term environmental responsibility.",
    ],
    img: "/home/Growth/grow1.jpg",
  },
  {
    title: "POSITIVE COMMUNITY ENGAGEMENT",
    bullets: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    img: "/home/Growth/grow3.jpg",
  },
  {
    title: "EMPLOYEE WELL-BEING",
    bullets: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ],
    img: "/home/Growth/grow2.jpg",
  },
];

const IMGS = [
  "/home/Growth/grow1.jpg",
  "/home/Growth/grow3.jpg",
  "/home/Growth/grow2.jpg",
  "/home/Growth/grow1.jpg",
  "/home/Growth/grow3.jpg",
  "/home/Growth/grow2.jpg",
];

export default function GrowthSus() {
  const [active, setActive] = useState(0);
  const prevActiveRef = useRef(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const targetRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  // Track heights of accordion elements dynamically to prevent layout popping
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Capture the previous active index before updating state to sync transition calculations
  useEffect(() => {
    prevActiveRef.current = active;
  }, [active]);

  useEffect(() => {
    const TILT = "rotateX(14deg) rotateZ(-10deg) ";
    const loop = () => {
      const el = ringRef.current;
      if (el) {
        if (targetRef.current !== null) {
          const diff = targetRef.current - angleRef.current;
          angleRef.current += diff * 0.045;
          if (Math.abs(diff) < 0.05) {
            angleRef.current = targetRef.current;
            targetRef.current = null;
          }
        } else {
          angleRef.current -= 0.12;
        }
        el.style.transform =
          TILT + "rotateY(" + angleRef.current.toFixed(2) + "deg)";
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    const want = -i * 120;
    const cur = angleRef.current;
    targetRef.current = want + Math.round((cur - want) / 360) * 360;
  };

  const ringW = 240;
  const R = Math.round(ringW * 0.92);

  return (
    <section className="relative w-full bg-white font-[var(--font-inter),sans-serif] overflow-hidden">
      <div className="fix relative py-20">
        {/* ─── MOBILE: image-card accordion, one item always open, no 3D ring ─── */}
        <div className="lg:hidden">
          <div className="flex items-center gap-[9px] mb-[14px]">
            <span className="text-[#8C8C84] font-semibold text-[13px]">//</span>
            <h5 className="text-[#8C8C84] font-medium text-[12px] tracking-[-2%]">
              GROW WITH KSH INFRA
            </h5>
          </div>
          <h2 className="font-semibold text-[16px] lg:text-[20px] pb-5 lg:pb-0 leading-[1.08] tracking-[-0.015em]">
            We are consciously aware of the effects that large projects can have
            on the community. Our goal is to ensure that these effects are
            beneficial for the people living around us. KSH INFRA Parks designed
            to have a positive influence, and all projects adhere to the best
            practices for social responsibility.
          </h2>

          <div>
            {ITEMS.map((it, i) => {
              const on = i === active;
              return (
                <div key={it.title} className="border-b border-[#E3E2DD]">
                  <div
                    onClick={() => setActive(i)}
                    className="flex items-start justify-between gap-4 py-5 cursor-pointer"
                  >
                    <h3
                      className={`m-0 flex-1 min-w-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[18px] sm:text-[20px] tracking-[-0.01em] uppercase transition-colors duration-500 ease-in-out ${
                        on ? "text-[#212121]" : "text-[#868686]"
                      }`}
                    >
                      {it.title}
                    </h3>
                    <span
                      className={`shrink-0 mt-1 flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors duration-500 ease-in-out ${
                        on
                          ? "bg-[#5E6E4E] border border-[#5E6E4E]"
                          : "bg-transparent border border-[#C9C6BD]"
                      }`}
                    >
                      {on ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <line
                            x1="3"
                            y1="7"
                            x2="11"
                            y2="7"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <line
                            x1="3"
                            y1="7"
                            x2="11"
                            y2="7"
                            stroke="#8A8A82"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <line
                            x1="7"
                            y1="3"
                            x2="7"
                            y2="11"
                            stroke="#8A8A82"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </span>
                  </div>

                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                    style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="pb-6 transition-opacity duration-500 ease-in-out"
                        style={{ opacity: on ? 1 : 0 }}
                      >
                        <div className="w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-4">
                          <img
                            src={it.img}
                            alt={it.title}
                            className="w-full h-full object-cover block"
                          />
                        </div>
                        <ul className="m-0 pl-5 list-disc space-y-2 font-normal text-[14px] leading-[1.62] text-[#4A4A4A]">
                          {it.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── DESKTOP ─── */}
        <div className="hidden lg:flex gap-[clamp(24px,3vw,48px)] items-start lg:flex-nowrap">
          {/* ─── LEFT ─── */}
          <div className="[flex:1_1_400px] min-w-0">
            <div className="flex items-center gap-[9px] mb-[clamp(14px,1.5vw,20px)]">
              <span className="text-[#8C8C84] font-semibold text-[13px]">
                //
              </span>
              <h5 className="text-[#8C8C84] font-medium text-[12px] tracking-[-2%]">
                GROW WITH KSH INFRA
              </h5>
            </div>
            <h2 className="section-title m-0 mb-[clamp(18px,2vw,22px)] w-[88%] font-semibold lg:text-[20px] leading-[1.04] tracking-[-0.015em]">
              We are consciously aware of the effects that large projects can
              have on the community. Our goal is to ensure that these effects
              are beneficial for the people living around us. KSH INFRA Parks
              designed to have a positive influence, and all projects adhere to
              the best practices for social responsibility.
            </h2>

            <div>
              {ITEMS.map((it, i) => {
                const on = i === active;

                const element = contentRefs.current[i];
                let maxHeightValue = "0px";

                if (on) {
                  maxHeightValue = element
                    ? `${element.scrollHeight}px`
                    : "auto";
                } else if (prevActiveRef.current === i) {
                  const ulElement = element?.querySelector("ul");
                  maxHeightValue = ulElement
                    ? `${ulElement.offsetHeight + 16}px`
                    : "0px";

                  setTimeout(() => {
                    if (element) element.style.maxHeight = "0px";
                  }, 0);
                }

                return (
                  <div key={it.title} className="border-b border-[#E3E2DD]">
                    <div
                      onClick={() => goTo(i)}
                      onMouseEnter={() => goTo(i)}
                      className="flex items-start justify-between gap-5 py-[clamp(20px,2.2vw,30px)] cursor-pointer"
                    >
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`m-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(18px,1.8vw,24px)] tracking-[-0.01em] uppercase [transition:color_.5s_ease] ${
                            on ? "text-[#212121]" : "text-[#868686]"
                          }`}
                        >
                          {it.title}
                        </h3>

                        <div
                          ref={(el) => {
                            contentRefs.current[i] = el;
                          }}
                          className="overflow-hidden [transition:max-height_500ms_cubic-bezier(0.4,0,0.2,1),opacity_500ms_ease]"
                          style={{
                            maxHeight: maxHeightValue,
                            opacity: on ? 1 : 0,
                          }}
                        >
                          <ul className="m-0 pt-4 pl-5 list-disc space-y-2 font-normal text-[clamp(13px,1.08vw,14px)] leading-[1.62] text-[#4A4A4A] max-w-[520px]">
                            {it.bullets.map((bullet, idx) => (
                              <li key={idx}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 mt-1 flex items-center justify-center w-[clamp(36px,3vw,42px)] h-[clamp(36px,3vw,42px)] rounded-full [transition:background_.50s_ease,border-color_.50s_ease] ${
                          on
                            ? "bg-[#5E6E4E] border border-[#5E6E4E]"
                            : "bg-transparent border border-[#C9C6BD]"
                        }`}
                      >
                        {on ? (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <line
                              x1="3"
                              y1="7"
                              x2="11"
                              y2="7"
                              stroke="#FFFFFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <line
                              x1="3"
                              y1="7"
                              x2="11"
                              y2="7"
                              stroke="#8A8A82"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <line
                              x1="7"
                              y1="3"
                              x2="7"
                              y2="11"
                              stroke="#8A8A82"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── RIGHT: 3D RING ─── */}
          <div className="[flex:1_1_380px] min-w-[320px] 2xl:h-[470px] h-[490px] flex items-center justify-center self-center lg:mt-12">
            <div className="[perspective:1200px] w-full h-full flex items-center justify-center">
              <div
                ref={ringRef}
                className="relative [transform-style:preserve-3d]"
                style={{
                  width: ringW,
                  height: Math.round(ringW * 1.31),
                  transform: "rotateX(14deg) rotateZ(-10deg) rotateY(0deg)",
                }}
              >
                {IMGS.map((src, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-[18px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(20,25,40,0.5)] [backface-visibility:hidden]"
                    style={{
                      transform: `rotateY(${i * 60}deg) translateZ(${R}px)`,
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover block"
                    />
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
