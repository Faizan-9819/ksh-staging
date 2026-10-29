// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import NavArrow from "@/components/ui/NavArrow";

// const DATA = [
//   {
//     id: 1,
//     name: "Mr. Amitabh Mathur",
//     role: "Managing Director & CEO, GEDIA India Automotive Components Pvt. Ltd.",
//     img: "/home/testimonial/test1.jpg",
//     desc: "Our experience with KSH INFRA has been outstanding in every aspect. From the very beginning, their team showed a deep understanding of our requirements. Since our customer is one of the most reputed automotive OEMs a number of special requirements need to be executed in the factory floor for our production equipment. KSH willingly accepted to make all such changes and delivered a facility that reflects the highest standards of construction quality. The entire project was executed with remarkable timeliness, and the transaction process was smooth, transparent, and highly professional. KSH INFRA has truly performed beyond our expectations — not just as a developer, but as a trusted partner who enabled us to set up a world-class manufacturing facility with complete peace of mind. We deeply value this association and look forward to future collaborations.",
//   },
//   {
//     id: 2,
//     name: "Mr. Shyam Datye",
//     role: "India Head, CTC Global",
//     img: "/home/testimonial/test2.jpg",
//     desc: "Working with KSH INFRA on their latest project, KSH INFRA Chakan Park III at Varale, has been an excellent experience. We are amazed at the speed and proficiency with which all the works were carried out and it was ensured that we got our building according to our plan, apart from the timely possession all other infrastructure works were also completed in time so as not to have any disturbance to our operations and there has been no delay in our project timelines, KSH INFRA has also been very flexible to making adjustments to our changing project plans and scope! In a nut shell I will say that KSH INFRA is extremely customer centric  and understands and fulfils the needs of the clients. The quality of work has been good and KSH INFRA was very open to making any changes that we needed in order to suit our production & machine requirements. The entire Park layout is good and attention to details such as broad roads, parking, security etc is good. We look forward to continuing our partnership with them in future endeavours.",
//   },
//   {
//     id: 3,
//     name: "Mr. Yogesh Barve",
//     role: "Managing Director, Klingspor",
//     img: "/home/testimonial/test3.jpg",
//     desc: "Our experience at KSH Talegaon Park I has been truly exceptional. We chose this facility after it successfully met our rigorous standards for infrastructure quality, as well as our comprehensive safety and security requirements. What set this collaboration apart was the outstanding support and responsiveness of the KSH INFRA team—extending well beyond our initial move-in period. Their commitment to service and professionalism has been evident throughout our journey. We deeply value the partnership we have forged through this project.",
//   },
//   {
//     id: 4,
//     name: "Mr. Inder Aurora",
//     role: "Director, Unisource",
//     img: "/home/testimonial/test4.jpg",
//     desc: "We were in search of a well-located and high-quality industrial infrastructure space for our business in Talegaon, and KSH INFRA emerged as the perfect partner. Even though KSH Talegaon I Park was their first project, we were impressed by the exceptional quality of construction and their professional, solution-oriented approach. The team's positive attitude and commitment to delivery made it a great experience collaborating with them. We are pleased to see KSH INFRA rapidly expanding its footprint across India, and we extend our best wishes for continued success and growth.",
//   },
//   {
//     id: 5,
//     name: "Naoki Matsumoto",
//     role: "Chairman, India (Kawasaki)",
//     img: "/home/testimonial/test5.jpg",
//     desc: "TEAM KSH has provided us a world-class facility in Chakan Industrial area for our manufacturing operations. Team KSH was extremely supportive and professional in developing the facility for us. We were able to commence operations within two months from moving-in which was very beneficial for us.",
//   },
//   {
//     id: 6,
//     name: "Raj Ghogale",
//     role: "Managing Director, Callisons",
//     img: "/feedb/feed6.png",
//     desc: "KSH has been very instrumental during our facility setup and with their expertise in construction and understanding of our manufacturing needs, their collaborative approach allowed them to capture critical requirements to deliver our factory on time.",
//   },
// ];

// const N = DATA.length;

// export default function Testimonials() {
//   const [active, setActive] = useState(0);
//   const go = (i: number) => setActive(((i % N) + N) % N);
//   const current = DATA[active];

//   return (
//     <section className="relative w-full font-[var(--font-inter),sans-serif] overflow-hidden bg-[#fff]">
//       <div className="absolute pointer-events-none rounded-full border border-white/[0.06] w-[560px] h-[560px] -right-[160px] -bottom-[220px]" />
//       <div className="absolute pointer-events-none rounded-full border border-white/[0.05] w-[360px] h-[360px] right-[60px] -bottom-[120px]" />
//       <div className="absolute inset-y-0 w-px bg-white/[0.05] pointer-events-none left-[40.7%]" />
//       <div className="absolute inset-y-0 w-px bg-white/[0.05] pointer-events-none left-[77.7%]" />

//       <div className="fix relative py-10 max-sm:py-6">
//         <div className="flex justify-between items-start gap-10 flex-wrap mb-[clamp(32px,3.6vw,52px)]">
//           <div>
//             <div className="flex items-center gap-[9px] mb-[clamp(12px,1.4vw,18px)]"></div>
//             <h2 className="section-title m-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(32px,3.9vw,55px)] leading-[1.05] tracking-[-0.015em]">
//               What our Clients says!
//             </h2>
//           </div>
//         </div>

//         <div className="flex gap-[85px] items-start flex-wrap lg:flex-nowrap relative">
//           <div className="relative w-full aspect-[562/434] rounded-[20px] overflow-hidden [flex:0_0_clamp(280px,48%,562px)]">
//             {DATA.map((d, i) => (
//               <img
//                 key={d.name}
//                 src={d.img}
//                 alt={d.name}
//                 className="absolute inset-0 w-full h-full object-cover [transition:opacity_700ms_ease,transform_1100ms_ease]"
//                 style={{
//                   opacity: i === active ? 1 : 0,
//                   transform: i === active ? "scale(1)" : "scale(1.05)",
//                 }}
//               />
//             ))}
//           </div>

//           <div className="relative min-w-0 flex-1">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={`t-${active}`}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -6 }}
//                 transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//               >
//                 <img src="/homeasset/quote.svg" className="mb-6" alt="" />

//                 {/* Fade Out Mask Container */}
//                 <div className="relative lg:w-[80%] mt-0 mb-[clamp(24px,2.6vw,34px)]">
//                   <div
//                     className="custom-scrollbar h-[150px] overflow-y-auto overscroll-contain pr-4"
//                     onWheel={(e) => {
//                       const currentTarget = e.currentTarget;
//                       const scrollTop = currentTarget.scrollTop;
//                       const scrollHeight = currentTarget.scrollHeight;
//                       const clientHeight = currentTarget.clientHeight;

//                       // Stop event propagating outwards if container has a scrollable content area
//                       if (scrollHeight > clientHeight) {
//                         e.stopPropagation();
//                       }
//                     }}
//                   >
//                     <p className="m-0 font-normal text-[clamp(15px,1.25vw,18px)] pb-5 leading-[1.6] text-[#000]">
//                       {current.desc}
//                     </p>
//                   </div>
//                   {/* Visual Fade-out cue at the bottom of the content container */}
//                   <div className="absolute bottom-0 left-0 right-4 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
//                 </div>

//                 <h3 className="mt-0 mb-[6px] text-[clamp(22px,1.9vw,24px)] text-[#000] tracking-[-0.01em]">
//                   {current.name}
//                 </h3>
//                 <p className="m-0 text-[16px] w-[70%] tracking-[0.13em] h-[44px] leading-[140%] text-[#5F6678]">
//                   {current.role}
//                 </p>
//               </motion.div>
//             </AnimatePresence>

//             <div className="flex gap-1 mt-[clamp(26px,3vw,18px)]">
//               <NavArrow
//                 direction="prev"
//                 tone="dark"
//                 onClick={() => go(active - 1)}
//                 ariaLabel="Previous testimonial"
//               />
//               <NavArrow
//                 direction="next"
//                 tone="dark"
//                 onClick={() => go(active + 1)}
//                 ariaLabel="Next testimonial"
//               />
//             </div>
//           </div>

//           {/* Vertical dots (desktop) */}
//           <div className="hidden lg:flex flex-col items-center gap-[13px] absolute top-0 right-0">
//             {DATA.map((dat, i) => (
//               <button
//                 key={dat.id}
//                 onClick={() => go(i)}
//                 aria-label={`Go to testimonial ${i + 1}`}
//                 className="w-[5px] p-0 border-none bg-transparent cursor-pointer flex items-center justify-center"
//               >
//                 <span
//                   className="block w-[5px] rounded-[99px]"
//                   style={{
//                     transition:
//                       "height .4s cubic-bezier(.4,0,.2,1), background .4s ease",
//                     height: i === active ? 46 : 9,
//                     background: i === active ? "#C75D21" : "#E0E0E0",
//                     border:
//                       i === active
//                         ? "none"
//                         : "1px solid rgba(255,255,255,0.45)",
//                   }}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Horizontal dots (mobile) */}
//         <div className="flex lg:hidden justify-center gap-[10px] mt-[30px]">
//           {DATA.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => go(i)}
//               aria-label={`Go to testimonial ${i + 1}`}
//               className="h-[5px] p-0 border-none bg-transparent cursor-pointer"
//             >
//               <span
//                 className="block h-[5px] rounded-[99px]"
//                 style={{
//                   transition: "width .4s ease, background .4s ease",
//                   width: i === active ? 40 : 9,
//                   background: i === active ? "#fff" : "transparent",
//                   border: i === active ? "none" : "1px solid #C75D21",
//                 }}
//               />
//             </button>
//           ))}
//         </div>
//       </div>

//       <style jsx global>{`
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: rgba(199, 93, 33, 0.35) transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-button {
//           display: none;
//           height: 0;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//           border-radius: 9999px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(199, 93, 33, 0.35);
//           border-radius: 9999px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(199, 93, 33, 0.6);
//         }
//       `}</style>
//     </section>
//   );
// }
//

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavArrow from "@/components/ui/NavArrow";

// const DATA = [
//   {
//     id: 1,
//     name: "Mr. Amitabh Mathur",
//     role: "Managing Director & CEO, GEDIA India Automotive Components Pvt. Ltd.",
//     img: "/home/testimonial/test1.jpg",
//     desc: "Our experience with KSH INFRA has been outstanding in every aspect. From the very beginning, their team showed a deep understanding of our requirements. Since our customer is one of the most reputed automotive OEMs a number of special requirements need to be executed in the factory floor for our production equipment. KSH willingly accepted to make all such changes and delivered a facility that reflects the highest standards of construction quality. The entire project was executed with remarkable timeliness, and the transaction process was smooth, transparent, and highly professional. KSH INFRA has truly performed beyond our expectations — not just as a developer, but as a trusted partner who enabled us to set up a world-class manufacturing facility with complete peace of mind. We deeply value this association and look forward to future collaborations.",
//   },
//   {
//     id: 2,
//     name: "Mr. Shyam Datye",
//     role: "India Head, CTC Global",
//     img: "/home/testimonial/test2.jpg",
//     desc: "Working with KSH INFRA on their latest project, KSH INFRA Chakan Park III at Varale, has been an excellent experience. We are amazed at the speed and proficiency with which all the works were carried out and it was ensured that we got our building according to our plan, apart from the timely possession all other infrastructure works were also completed in time so as not to have any disturbance to our operations and there has been no delay in our project timelines, KSH INFRA has also been very flexible to making adjustments to our changing project plans and scope! In a nut shell I will say that KSH INFRA is extremely customer centric  and understands and fulfils the needs of the clients. The quality of work has been good and KSH INFRA was very open to making any changes that we needed in order to suit our production & machine requirements. The entire Park layout is good and attention to details such as broad roads, parking, security etc is good. We look forward to continuing our partnership with them in future endeavours.",
//   },
//   {
//     id: 3,
//     name: "Mr. Yogesh Barve",
//     role: "Managing Director, Klingspor",
//     img: "/home/testimonial/test3.jpg",
//     desc: "Our experience at KSH Talegaon Park I has been truly exceptional. We chose this facility after it successfully met our rigorous standards for infrastructure quality, as well as our comprehensive safety and security requirements. What set this collaboration apart was the outstanding support and responsiveness of the KSH INFRA team—extending well beyond our initial move-in period. Their commitment to service and professionalism has been evident throughout our journey. We deeply value the partnership we have forged through this project.",
//   },
//   {
//     id: 4,
//     name: "Mr. Inder Aurora",
//     role: "Director, Unisource",
//     img: "/home/testimonial/test4.jpg",
//     desc: "We were in search of a well-located and high-quality industrial infrastructure space for our business in Talegaon, and KSH INFRA emerged as the perfect partner. Even though KSH Talegaon I Park was their first project, we were impressed by the exceptional quality of construction and their professional, solution-oriented approach. The team's positive attitude and commitment to delivery made it a great experience collaborating with them. We are pleased to see KSH INFRA rapidly expanding its footprint across India, and we extend our best wishes for continued success and growth.",
//   },
//   {
//     id: 5,
//     name: "Naoki Matsumoto",
//     role: "Chairman, India (Kawasaki)",
//     img: "/home/testimonial/test5.jpg",
//     desc: "TEAM KSH has provided us a world-class facility in Chakan Industrial area for our manufacturing operations. Team KSH was extremely supportive and professional in developing the facility for us. We were able to commence operations within two months from moving-in which was very beneficial for us.",
//   },
//   {
//     id: 6,
//     name: "Raj Ghogale",
//     role: "Managing Director, Callisons",
//     img: "/feedb/feed6.png",
//     desc: "KSH has been very instrumental during our facility setup and with their expertise in construction and understanding of our manufacturing needs, their collaborative approach allowed them to capture critical requirements to deliver our factory on time.",
//   },
// ];
const DATA = [
  {
    id: 1,
    name: "Mr. Amitabh Mathur",
    role: "Managing Director & CEO, GEDIA India Automotive Components Pvt. Ltd.",
    img: "/homeasset/test2.jpg",
    desc: "KSH INFRA delivered a world-class manufacturing facility with precision, speed, and transparency—proving to be not just a developer, but a trusted partner who exceeds expectations at every step.",
  },
  {
    id: 2,
    name: "Mr. Shyam Datye",
    role: "India Head, CTC Global",
    img: "/homeasset/test4.jpg",
    desc: "KSH INFRA is flexible when it comes to client needs and delivers excellent quality in every project.",
  },
  {
    id: 3,
    name: "Mr. Yogesh Barve",
    role: "Managing Director, Klingspor",
    img: "/homeasset/test3.jpg",
    desc: "KSH INFRA’s responsiveness, commitment to service and professionalism is exceptional.",
  },
  {
    id: 4,
    name: "Mr. Inder Aurora",
    role: "Director, Unisource",
    img: "/homeasset/test5.jpg",
    desc: "KSH INFRA’s exceptional quality of construction and professional, solution-oriented approach makes collaborating with them a great experience.",
  },
  {
    id: 5,
    name: "Naoki Matsumoto",
    role: "Chairman, India (Kawasaki)",
    img: "/homeasset/test6.jpg",
    desc: "Team KSH INFRA was extremely supportive and professional in developing the facility for us.",
  },
  {
    id: 6,
    name: "Todd Renner",
    role: "Global Business Unit Manager, Jabil",
    img: "/homeasset/test1.jpg",
    desc: "KSH INFRA has been very instrumental during our facility setup and with their expertise in construction and understanding of our manufacturing needs.",
  },
  {
    id: 7,
    name: "Raj Ghogale",
    role: "Managing Director, Callisons",
    img: "/homeasset/test7.jpg",
    desc: "KSH INFRA helped us set up a world class Industrial facility; the workers, Infrastructure and service provided by KSH INFRA is unparalleled.",
  },
];

const N = DATA.length;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const go = (i: number) => setActive(((i % N) + N) % N);
  const current = DATA[active];

  return (
    <section
      id="testimonials"
      className="relative w-full font-[var(--font-inter),sans-serif] overflow-hidden bg-[#fff]"
    >
      <div className="absolute pointer-events-none rounded-full border border-white/[0.06] w-[560px] h-[560px] -right-[160px] -bottom-[220px]" />
      <div className="absolute pointer-events-none rounded-full border border-white/[0.05] w-[360px] h-[360px] right-[60px] -bottom-[120px]" />
      <div className="absolute inset-y-0 w-px bg-white/[0.05] pointer-events-none left-[40.7%]" />
      <div className="absolute inset-y-0 w-px bg-white/[0.05] pointer-events-none left-[77.7%]" />

      <div className="fix relative py-10 max-sm:py-6">
        <div className="flex justify-between items-start gap-10 flex-wrap mb-6 lg:mb-[clamp(32px,3.6vw,52px)]">
          <div>
            <div className="flex items-center gap-[9px] mb-[clamp(12px,1.4vw,18px)]"></div>
            <h2 className="section-title m-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[28px] leading-[1.15] lg:text-[clamp(32px,3.9vw,55px)] lg:leading-[1.05] tracking-[-0.015em]">
              What our Clients Say!
            </h2>
          </div>
        </div>

        {/* Mobile: stacked column (image, then content). Desktop: original side-by-side row */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[85px] items-start relative">
          <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden lg:aspect-[562/434] lg:rounded-[20px] lg:[flex:0_0_clamp(280px,48%,562px)]">
            {DATA.map((d, i) => (
              <img
                key={d.name}
                src={d.img}
                alt={d.name}
                className="absolute inset-0 w-full h-full object-cover [transition:opacity_700ms_ease,transform_1100ms_ease]"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : "scale(1.05)",
                }}
              />
            ))}
          </div>

          <div className="relative min-w-0 w-full flex-1 flex flex-col justify-between self-stretch">
            {/* Height reservation container */}
            <div className="relative w-full">
              {/* Invisible grid stack that calculates height of the longest testimonial dynamically */}
              <div
                aria-hidden="true"
                className="grid grid-cols-1 invisible pointer-events-none select-none"
              >
                {DATA.map((item) => (
                  <div key={`ghost-${item.id}`} className="[grid-area:1/1]">
                    <img
                      src="/homeasset/quote.svg"
                      className="mb-4 w-16 lg:mb-6 lg:w-auto"
                      alt=""
                    />
                    <div className="relative w-full mt-0 mb-3 lg:w-[80%] lg:mb-[clamp(24px,2.6vw,34px)]">
                      <p className="m-0 font-normal text-[14px] leading-[1.55] lg:text-[clamp(15px,1.25vw,18px)]         lg:leading-[1.6] pb-5 text-[#000]">
                        {item.desc}
                      </p>
                    </div>
                    <h3 className="mt-0 mb-[6px] text-[19px] lg:text-[clamp(22px,1.9vw,24px)] text-[#000] tracking-[-0.01em]">
                      {item.name}
                    </h3>
                    <p className="m-0 w-full tracking-[0.06em] h-auto leading-[150%] xl:text-[16px] lg:w-[70%] lg:tracking-[0.13em] lg:h-[44px] lg:leading-[140%] text-[#5F6678]">
                      {item.role}
                    </p>
                  </div>
                ))}
              </div>

              {/* Animated active slide positioned over the reserved container height */}
              <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`t-${active}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src="/homeasset/quote.svg"
                      className="mb-4 w-16 lg:mb-6 lg:w-auto"
                      alt=""
                    />

                    <div className="relative w-full mt-0 mb-2 lg:w-[80%] lg:mb-[clamp(24px,2.6vw,34px)]">
                      <p className="m-0 font-normal text-[14px] leading-[1.55] lg:text-[clamp(15px,1.25vw,18px)] lg:leading-[1.6] pb-5 text-[#000]">
                        {current.desc}
                      </p>
                    </div>

                    <h3 className="mt-0 mb-[6px] text-[19px] lg:text-[clamp(22px,1.9vw,24px)] text-[#000] tracking-[-0.01em]">
                      {current.name}
                    </h3>
                    <p className="m-0 text-[13px] w-full tracking-[0.06em] h-auto leading-[150%] 2xl:text-[16px] lg:w-[70%] lg:tracking-[0.13em] lg:h-[44px] lg:leading-[140%] text-[#5F6678]">
                      {current.role}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation buttons fixed below the max-height content block */}
            {/* Mobile — matches AwardsRecognition's mobile nav */}
            <div className="lg:hidden flex items-center justify-center gap-x-3 mt-6 px-4">
              <NavArrow
                direction="prev"
                className="h-10! w-18! rounded-4xl!"
                tone="dark"
                onClick={() => go(active - 1)}
                ariaLabel="Previous testimonial"
              />
              <NavArrow
                direction="next"
                tone="dark"
                className="h-10! w-18! rounded-4xl!"
                onClick={() => go(active + 1)}
                ariaLabel="Next testimonial"
              />
            </div>

            {/* Desktop — unchanged */}
            <div className="hidden lg:flex gap-1 mt-[clamp(26px,3vw,18px)]">
              <NavArrow
                direction="prev"
                tone="dark"
                onClick={() => go(active - 1)}
                ariaLabel="Previous testimonial"
              />
              <NavArrow
                direction="next"
                tone="dark"
                onClick={() => go(active + 1)}
                ariaLabel="Next testimonial"
              />
            </div>
          </div>

          {/* Vertical dots (desktop) */}
          <div className="hidden lg:flex flex-col items-center gap-[13px] absolute top-0 right-0">
            {DATA.map((dat, i) => (
              <button
                key={dat.id}
                onClick={() => go(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="w-[5px] p-0 border-none bg-transparent cursor-pointer flex items-center justify-center"
              >
                <span
                  className="block w-[5px] rounded-[99px]"
                  style={{
                    transition:
                      "height .4s cubic-bezier(.4,0,.2,1), background .4s ease",
                    height: i === active ? 46 : 9,
                    background: i === active ? "#c19b5e" : "#E0E0E0",
                    border:
                      i === active
                        ? "none"
                        : "1px solid rgba(255,255,255,0.45)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(199, 93, 33, 0.35) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none;
          height: 0;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(199, 93, 33, 0.35);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(199, 93, 33, 0.6);
        }
      `}</style>
    </section>
  );
}
// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import NavArrow from "@/components/ui/NavArrow";

// // const DATA = [
// //   {
// //     id: 1,
// //     name: "Mr. Amitabh Mathur",
// //     role: "Managing Director & CEO, GEDIA India Automotive Components Pvt. Ltd.",
// //     img: "/home/testimonial/test1.jpg",
// //     desc: "Our experience with KSH INFRA has been outstanding in every aspect. From the very beginning, their team showed a deep understanding of our requirements. Since our customer is one of the most reputed automotive OEMs a number of special requirements need to be executed in the factory floor for our production equipment. KSH willingly accepted to make all such changes and delivered a facility that reflects the highest standards of construction quality. The entire project was executed with remarkable timeliness, and the transaction process was smooth, transparent, and highly professional. KSH INFRA has truly performed beyond our expectations — not just as a developer, but as a trusted partner who enabled us to set up a world-class manufacturing facility with complete peace of mind. We deeply value this association and look forward to future collaborations.",
// //   },
// //   {
// //     id: 2,
// //     name: "Mr. Shyam Datye",
// //     role: "India Head, CTC Global",
// //     img: "/home/testimonial/test2.jpg",
// //     desc: "Working with KSH INFRA on their latest project, KSH INFRA Chakan Park III at Varale, has been an excellent experience. We are amazed at the speed and proficiency with which all the works were carried out and it was ensured that we got our building according to our plan, apart from the timely possession all other infrastructure works were also completed in time so as not to have any disturbance to our operations and there has been no delay in our project timelines, KSH INFRA has also been very flexible to making adjustments to our changing project plans and scope! In a nut shell I will say that KSH INFRA is extremely customer centric  and understands and fulfils the needs of the clients. The quality of work has been good and KSH INFRA was very open to making any changes that we needed in order to suit our production & machine requirements. The entire Park layout is good and attention to details such as broad roads, parking, security etc is good. We look forward to continuing our partnership with them in future endeavours.",
// //   },
// //   {
// //     id: 3,
// //     name: "Mr. Yogesh Barve",
// //     role: "Managing Director, Klingspor",
// //     img: "/home/testimonial/test3.jpg",
// //     desc: "Our experience at KSH Talegaon Park I has been truly exceptional. We chose this facility after it successfully met our rigorous standards for infrastructure quality, as well as our comprehensive safety and security requirements. What set this collaboration apart was the outstanding support and responsiveness of the KSH INFRA team—extending well beyond our initial move-in period. Their commitment to service and professionalism has been evident throughout our journey. We deeply value the partnership we have forged through this project.",
// //   },
// //   {
// //     id: 4,
// //     name: "Mr. Inder Aurora",
// //     role: "Director, Unisource",
// //     img: "/home/testimonial/test4.jpg",
// //     desc: "We were in search of a well-located and high-quality industrial infrastructure space for our business in Talegaon, and KSH INFRA emerged as the perfect partner. Even though KSH Talegaon I Park was their first project, we were impressed by the exceptional quality of construction and their professional, solution-oriented approach. The team's positive attitude and commitment to delivery made it a great experience collaborating with them. We are pleased to see KSH INFRA rapidly expanding its footprint across India, and we extend our best wishes for continued success and growth.",
// //   },
// //   {
// //     id: 5,
// //     name: "Naoki Matsumoto",
// //     role: "Chairman, India (Kawasaki)",
// //     img: "/home/testimonial/test5.jpg",
// //     desc: "TEAM KSH has provided us a world-class facility in Chakan Industrial area for our manufacturing operations. Team KSH was extremely supportive and professional in developing the facility for us. We were able to commence operations within two months from moving-in which was very beneficial for us.",
// //   },
// //   {
// //     id: 6,
// //     name: "Raj Ghogale",
// //     role: "Managing Director, Callisons",
// //     img: "/feedb/feed6.png",
// //     desc: "KSH has been very instrumental during our facility setup and with their expertise in construction and understanding of our manufacturing needs, their collaborative approach allowed them to capture critical requirements to deliver our factory on time.",
// //   },
// // ];

// const DATA = [
//   {
//     id: 1,
//     name: "Mr. Amitabh Mathur",
//     role: "Managing Director & CEO, GEDIA India Automotive Components Pvt. Ltd.",
//     img: "/home/testimonial/test1.jpg",
//     desc: "KSH INFRA delivered a world-class manufacturing facility with precision, speed, and transparency—proving to be not just a developer, but a trusted partner who exceeds expectations at every step.",
//   },
//   {
//     id: 2,
//     name: "Mr. Shyam Datye",
//     role: "India Head, CTC Global",
//     img: "/home/testimonial/test2.jpg",
//     desc: "KSH INFRA is flexible when it comes to client needs and delivers excellent quality in every project.",
//   },
//   {
//     id: 3,
//     name: "Mr. Yogesh Barve",
//     role: "Managing Director, Klingspor",
//     img: "/home/testimonial/test3.jpg",
//     desc: "KSH INFRA’s responsiveness, commitment to service and professionalism is exceptional.",
//   },
//   {
//     id: 4,
//     name: "Mr. Inder Aurora",
//     role: "Director, Unisource",
//     img: "/home/testimonial/test4.jpg",
//     desc: "KSH INFRA’s exceptional quality of construction and professional, solution-oriented approach makes collaborating with them a great experience.",
//   },
//   {
//     id: 5,
//     name: "Naoki Matsumoto",
//     role: "Chairman, India (Kawasaki)",
//     img: "/home/testimonial/test5.jpg",
//     desc: "Team KSH INFRA was extremely supportive and professional in developing the facility for us.",
//   },
//   {
//     id: 6,
//     name: "Todd Renner",
//     role: "Global Business Unit Manager, Jabil",
//     img: "/feedb/feed6.png",
//     desc: "KSH INFRA has been very instrumental during our facility setup and with their expertise in construction and understanding of our manufacturing needs.",
//   },
//   {
//     id: 7,
//     name: "Raj Ghogale",
//     role: "Managing Director, Callisons",
//     img: "/home/testimonial/test7.jpg",
//     desc: "KSH INFRA helped us set up a world class industrial facility; the workers, infrastructure and service provided by KSH INFRA is unparalleled.",
//   },
// ];

// const N = DATA.length;

// export default function Testimonials() {
//   const [active, setActive] = useState(0);
//   const go = (i: number) => setActive(((i % N) + N) % N);
//   const current = DATA[active];

//   return (
//     <section className="relative w-full font-[var(--font-inter),sans-serif] overflow-hidden bg-[#fff]">
//       <div className="absolute pointer-events-none rounded-full border border-white/[0.06] w-[560px] h-[560px] -right-[160px] -bottom-[220px]" />
//       <div className="absolute pointer-events-none rounded-full border border-white/[0.05] w-[360px] h-[360px] right-[60px] -bottom-[120px]" />
//       <div className="absolute inset-y-0 w-px bg-white/[0.05] pointer-events-none left-[40.7%]" />
//       <div className="absolute inset-y-0 w-px bg-white/[0.05] pointer-events-none left-[77.7%]" />

//       <div className="fix relative py-10 max-sm:py-6">
//         <div className="flex justify-between items-start gap-10 flex-wrap mb-6 lg:mb-[clamp(32px,3.6vw,52px)]">
//           <div>
//             <div className="flex items-center gap-[9px] mb-[clamp(12px,1.4vw,18px)]"></div>
//             <h2 className="section-title m-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[28px] leading-[1.15] lg:text-[clamp(32px,3.9vw,55px)] lg:leading-[1.05] tracking-[-0.015em]">
//               What our Clients says!
//             </h2>
//           </div>
//         </div>

//         {/* Mobile: stacked column (image, then content). Desktop: original side-by-side row, untouched via lg: */}
//         <div className="flex flex-col lg:flex-row gap-6 lg:gap-[85px] items-start relative">
//           <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden lg:aspect-[562/434] lg:rounded-[20px] lg:[flex:0_0_clamp(280px,48%,562px)]">
//             {DATA.map((d, i) => (
//               <img
//                 key={d.name}
//                 src={d.img}
//                 alt={d.name}
//                 className="absolute inset-0 w-full h-full object-cover [transition:opacity_700ms_ease,transform_1100ms_ease]"
//                 style={{
//                   opacity: i === active ? 1 : 0,
//                   transform: i === active ? "scale(1)" : "scale(1.05)",
//                 }}
//               />
//             ))}
//           </div>

//           <div className="relative min-w-0 w-full flex-1">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={`t-${active}`}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -6 }}
//                 transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//               >
//                 <img
//                   src="/homeasset/quote.svg"
//                   className="mb-4 w-9 lg:mb-6 lg:w-auto"
//                   alt=""
//                 />

//                 {/* Fade Out Mask Container */}
//                 <div className="relative w-full mt-0 mb-5 lg:w-[80%] lg:mb-[clamp(24px,2.6vw,34px)]">
//                   {/* <div
//                     className="custom-scrollbar h-[130px] lg:h-[150px] overflow-y-auto overscroll-contain pr-4"
//                     onWheel={(e) => {
//                       const currentTarget = e.currentTarget;
//                       const scrollTop = currentTarget.scrollTop;
//                       const scrollHeight = currentTarget.scrollHeight;
//                       const clientHeight = currentTarget.clientHeight;

//                       // Stop event propagating outwards if container has a scrollable content area
//                       if (scrollHeight > clientHeight) {
//                         e.stopPropagation();
//                       }
//                     }}
//                   > */}
//                   <p className="m-0 font-normal text-[14px] leading-[1.55] lg:text-[clamp(15px,1.25vw,18px)] lg:leading-[1.6] pb-5 text-[#000]">
//                     {current.desc}
//                   </p>
//                   {/* </div> */}
//                   {/* Visual Fade-out cue at the bottom of the content container */}
//                   <div className="absolute bottom-0 left-0 right-4 h-14 lg:h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
//                 </div>

//                 <h3 className="mt-0 mb-[6px] text-[19px] lg:text-[clamp(22px,1.9vw,24px)] text-[#000] tracking-[-0.01em]">
//                   {current.name}
//                 </h3>
//                 <p className="m-0 text-[13px] w-full tracking-[0.06em] h-auto leading-[150%] lg:text-[16px] lg:w-[70%] lg:tracking-[0.13em] lg:h-[44px] lg:leading-[140%] text-[#5F6678]">
//                   {current.role}
//                 </p>
//               </motion.div>
//             </AnimatePresence>

//             <div className="flex gap-1 mt-5 lg:mt-[clamp(26px,3vw,18px)]">
//               <NavArrow
//                 direction="prev"
//                 tone="dark"
//                 onClick={() => go(active - 1)}
//                 ariaLabel="Previous testimonial"
//               />
//               <NavArrow
//                 direction="next"
//                 tone="dark"
//                 onClick={() => go(active + 1)}
//                 ariaLabel="Next testimonial"
//               />
//             </div>
//           </div>

//           {/* Vertical dots (desktop) */}
//           <div className="hidden lg:flex flex-col items-center gap-[13px] absolute top-0 right-0">
//             {DATA.map((dat, i) => (
//               <button
//                 key={dat.id}
//                 onClick={() => go(i)}
//                 aria-label={`Go to testimonial ${i + 1}`}
//                 className="w-[5px] p-0 border-none bg-transparent cursor-pointer flex items-center justify-center"
//               >
//                 <span
//                   className="block w-[5px] rounded-[99px]"
//                   style={{
//                     transition:
//                       "height .4s cubic-bezier(.4,0,.2,1), background .4s ease",
//                     height: i === active ? 46 : 9,
//                     background: i === active ? "#C75D21" : "#E0E0E0",
//                     border:
//                       i === active
//                         ? "none"
//                         : "1px solid rgba(255,255,255,0.45)",
//                   }}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Horizontal dots (mobile) */}
//         <div className="flex lg:hidden justify-center gap-[10px] mt-6">
//           {DATA.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => go(i)}
//               aria-label={`Go to testimonial ${i + 1}`}
//               className="h-[5px] p-0 border-none bg-transparent cursor-pointer"
//             >
//               <span
//                 className="block h-[5px] rounded-[99px]"
//                 style={{
//                   transition: "width .4s ease, background .4s ease",
//                   width: i === active ? 40 : 9,
//                   background: i === active ? "#C75D21" : "transparent",
//                   border: i === active ? "none" : "1px solid #C75D21",
//                 }}
//               />
//             </button>
//           ))}
//         </div>
//       </div>

//       <style jsx global>{`
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: rgba(199, 93, 33, 0.35) transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-button {
//           display: none;
//           height: 0;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//           border-radius: 9999px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(199, 93, 33, 0.35);
//           border-radius: 9999px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(199, 93, 33, 0.6);
//         }
//       `}</style>
//     </section>
//   );
// }
