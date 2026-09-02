// "use client";

// import React, { useState } from "react";

// interface CareerData {
//   title: string;
//   paragraphs: string[];
//   bullets?: string[];
// }

// const CAREER_DATA: CareerData[] = [
//   {
//     title: "CAREER GROWTH & LEARNING OPPORTUNITIES",
//     paragraphs: [
//       "We give our team clear paths to advance their careers, mentorship from top industry experts, and specialized training programs.",
//       "Our employees benefit from well-defined professional growth opportunities. They learn directly from experienced leaders and gain new skills through targeted training designed for their specific needs. We encourage professional development through:",
//     ],
//     bullets: [
//       "Leadership and Management Training",
//       "Industry Certifications and Sponsored Learning",
//       "Cross-Functional Learning Opportunities",
//       "Internal Promotion Avenues.",
//     ],
//   },
//   {
//     title: "COLLABORATION & INCLUSION",
//     paragraphs: [
//       "We thrive on teamwork, transparency, and respect. We welcome diverse viewpoints at KSH INFRA and value what each employee brings to the table. Our inclusive policies give everyone equal chances to grow, no matter their background.",
//       "Through open conversations and supportive leadership, we help our people bring their full potential to work daily. We believe diverse, inclusive teams create better solutions and stronger results.",
//     ],
//   },
//   {
//     title: "WORK-LIFE BALANCE INITIATIVES",
//     paragraphs: [
//       "We understand that a meaningful career cannot thrive without personal well-being. Our commitment to work-life balance enables employees to excel professionally while also making time for family, personal development, and wellness. We promote:",
//     ],
//     bullets: [
//       "Flexible Work Policies",
//       "Mental Health and Wellness Programs",
//       "Employee Engagement Activities and Recreational Initiatives",
//       "Paid Time off and Leave Benefits to Recharge and Refresh",
//     ],
//   },
//   {
//     title: "EMPLOYEE BENEFITS & PERKS",
//     paragraphs: [
//       "We provide a comprehensive benefits package that ensures financial security, health coverage, and performance-driven rewards. Employees at KSH INFRA enjoy:",
//     ],
//     bullets: [
//       "Competitive Salary Packages with Performance Incentives",
//       "Comprehensive Health and Wellness Benefits",
//       "Retirement and Financial Planning Support",
//       "Recognition Programs and Awards for Outstanding Contributions",
//     ],
//   },
//   {
//     title: "COMMITTED TO SUSTAINABILITY",
//     paragraphs: [
//       "Sustainability is integral to everything we do—from our business practices to our workplace initiatives. We practice and promote eco-conscious efforts, corporate social responsibility, and green initiatives that contribute to a better world for future generations.",
//     ],
//   },
// ];

// // Panel background for the right side
// const PANEL_BACKGROUND = "#F8F8F8";

// /* ---------------------------------------------------------------------- */
// /* Accordion Item (shared markup for desktop and mobile panels)           */
// /* ---------------------------------------------------------------------- */

// interface AccordionItemProps {
//   item: CareerData;
//   isActive: boolean;
//   isLast: boolean;
//   onToggle: () => void;
//   variant: "desktop" | "mobile";
// }

// const AccordionItem: React.FC<AccordionItemProps> = ({
//   item,
//   isActive,
//   isLast,
//   onToggle,
//   variant,
// }) => {
//   const isDesktop = variant === "desktop";

//   return (
//     <div className={!isLast ? "border-b border-[#E5E0D8]" : ""}>
//       <div
//         onClick={onToggle}
//         className={`flex items-center justify-between gap-4 cursor-pointer ${
//           isDesktop
//             ? isActive
//               ? "py-6 lg:py-7"
//               : "py-4 lg:py-5"
//             : isActive
//               ? "py-5"
//               : "py-3.5"
//         }`}
//       >
//         <div className="flex items-center gap-4 min-w-0">
//           <h3
//             className="uppercase"
//             style={{
//               color: isActive ? "#212121" : "#6D6D6D",
//               fontFamily: "var(--font-sora), Sora, sans-serif",
//               fontSize: isDesktop ? "clamp(16px, 1.4vw, 20px)" : "16px",
//               fontStyle: "normal",
//               fontWeight: 400,
//               lineHeight: "1.3",
//               letterSpacing: "-0.4px",
//               transition: "color 0.4s ease",
//             }}
//           >
//             {item.title}
//           </h3>
//         </div>

//         {/* Accordion toggle indicator */}
//         <span
//           className={`shrink-0 flex items-center justify-center rounded-full transition-colors duration-300 ease-in-out ${
//             isDesktop
//               ? "w-[clamp(32px,2.6vw,38px)] h-[clamp(32px,2.6vw,38px)]"
//               : "w-8 h-8"
//           } ${
//             isActive
//               ? "bg-[#212121] border border-[#212121]"
//               : "bg-transparent border border-[#E5E0D8]"
//           }`}
//         >
//           {isActive ? (
//             <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//               <line
//                 x1="3"
//                 y1="7"
//                 x2="11"
//                 y2="7"
//                 stroke="#FBF5EE"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//             </svg>
//           ) : (
//             <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//               <line
//                 x1="3"
//                 y1="7"
//                 x2="11"
//                 y2="7"
//                 stroke="#6D6D6D"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//               <line
//                 x1="7"
//                 y1="3"
//                 x2="7"
//                 y2="11"
//                 stroke="#6D6D6D"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//             </svg>
//           )}
//         </span>
//       </div>

//       {/* grid-template-rows 0fr -> 1fr: height is always correct on first
//           paint, resize, and font load, so it never jumps and never gets
//           stuck collapsed. */}
//       <div
//         className="grid transition-[grid-template-rows] duration-500 ease-in-out"
//         style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
//       >
//         <div className="overflow-hidden">
//           <div
//             className={`transition-opacity duration-500 ease-in-out ${
//               isDesktop ? "pb-6 lg:pb-7" : "pb-5"
//             }`}
//             style={{ opacity: isActive ? 1 : 0 }}
//           >
//             {item.paragraphs.map((paragraph, pIdx) => (
//               <p
//                 key={pIdx}
//                 className={pIdx > 0 ? "mt-4" : ""}
//                 style={{
//                   color: "#6D6D6D",
//                   fontFamily: "var(--font-inter), Inter, sans-serif",
//                   fontSize: "16px",
//                   fontStyle: "normal",
//                   fontWeight: 400,
//                   lineHeight: "140%",
//                 }}
//               >
//                 {paragraph}
//               </p>
//             ))}

//             {item.bullets && (
//               <ul
//                 className="list-disc list-inside flex flex-col mt-4 gap-1"
//                 style={{
//                   color: "#6D6D6D",
//                   fontFamily: "var(--font-inter), Inter, sans-serif",
//                   fontSize: "16px",
//                   fontStyle: "normal",
//                   fontWeight: 400,
//                   lineHeight: "140%",
//                 }}
//               >
//                 {item.bullets.map((bullet, bIdx) => (
//                   <li key={bIdx}>{bullet}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------------------------- */
// /* Desktop Panel Container                                                */
// /* ---------------------------------------------------------------------- */

// const DesktopPanel: React.FC<{ data: CareerData[] }> = ({ data }) => {
//   const [active, setActive] = useState(0);

//   return (
//     <div
//       className="w-full bg-[#f8f8f8]"
//       style={{
//         paddingLeft: "var(--margin, clamp(16px, 5.7vw, 80px))",
//         paddingRight: "var(--margin, clamp(16px, 5.7vw, 80px))",
//       }}
//     >
//       <div className="max-w-[1440px] bg-white  mx-auto flex flex-row items-stretch justify-between min-h-screen">
//         {/* Left column - Centered grid alignment matching 1920px spec */}
//         <div className="w-[45%] xl:w-[42%] bg-white! flex flex-col justify-center gap-6 sm:gap-8 pr-8 py-16 lg:py-24">
//           <h2
//             className="self-stretch"
//             style={{
//               color: "#212121",
//               fontFamily: "var(--font-sora), Sora, sans-serif",
//               fontSize: "clamp(28px, 3.75vw, 48px)",
//               fontStyle: "normal",
//               fontWeight: 600,
//               lineHeight: "1.15",
//               letterSpacing: "-0.96px",
//             }}
//           >
//             Commitment to Employee Well-Being & Growth
//           </h2>

//           <p
//             className="self-stretch"
//             style={{
//               color: "#4A4A4A",
//               fontFamily: "var(--font-inter), Inter, sans-serif",
//               fontSize: "clamp(16px, 1.56vw, 20px)",
//               fontStyle: "normal",
//               fontWeight: 400,
//               lineHeight: "140%",
//             }}
//           >
//             We invest in our people&apos;s well-rounded development. We provide
//             clear career paths and personal growth programs so everyone on our
//             team has the tools to succeed. Our approach focuses on building real
//             skills, developing strong leaders, and encouraging continuous
//             learning.
//           </p>

//           <p
//             className="self-stretch"
//             style={{
//               color: "#4A4A4A",
//               fontFamily: "var(--font-inter), Inter, sans-serif",
//               fontSize: "16px",
//               fontStyle: "normal",
//               fontWeight: 400,
//               lineHeight: "140%",
//             }}
//           >
//             This helps our employees advance professionally while achieving
//             their personal goals. We believe that when our people grow, our
//             company grows too. That&apos;s why we make sure everyone has the
//             support they need to reach their full potential.
//           </p>
//         </div>

//         {/* Right column - Bleeds beige background to screen edge */}
//         <div
//           className="
//             w-[52%]
//             lg:py-12

//             lg:w-[50%]
//             overflow-visible
//             relative
//             bg-[#f8f8f8]!
//             border-l
//             border-[#E5E0D8]
//             before:content-['']
//             before:absolute
//             before:top-0
//             before:bottom-0
//             before:left-0
//             before:w-[200vw]
//             before:bg-[#F8F8F8]!
//             before:pointer-events-none
//             before:-z-10
//           "
//         >
//           {/* Grid-stack trick: an invisible copy of the list with item 0
//               permanently "open" sits in the same grid cell as the real,
//               interactive list. CSS Grid sizes the cell to the taller of the
//               two, so the panel's height is always pinned to at least the
//               item-0-open height — switching to a shorter item can never
//               shrink the section and shift the left column. No JS height
//               measurement involved, so it can't get stuck like the old
//               scrollHeight-ref approach did. */}
//           <div className="relative z-10 grid">
//             <div
//               aria-hidden="true"
//               className="invisible pointer-events-none flex flex-col items-center lg:pl-[60px] px-12 lg:px-14  [grid-area:1/1]"
//             >
//               {data.map((item, idx) => (
//                 <AccordionItem
//                   key={idx}
//                   item={item}
//                   isActive={idx === 0}
//                   isLast={idx === data.length - 1}
//                   onToggle={() => {}}
//                   variant="desktop"
//                 />
//               ))}
//             </div>
//             <div className="flex flex-col lg:pl-[60px] px-12 lg:px-14 [grid-area:1/1]">
//               {data.map((item, idx) => (
//                 <AccordionItem
//                   key={idx}
//                   item={item}
//                   isActive={active === idx}
//                   isLast={idx === data.length - 1}
//                   onToggle={() => setActive(idx)}
//                   variant="desktop"
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------------------------- */
// /* Mobile Panel Container                                                 */
// /* ---------------------------------------------------------------------- */

// const MobilePanel: React.FC<{ data: CareerData[] }> = ({ data }) => {
//   const [active, setActive] = useState(0);

//   return (
//     <div className="w-full flex flex-col gap-[32px]">
//       <div className="w-full px-6">
//         <span
//           className="text-[#868686] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 block"
//           style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
//         >
//           // GROW WITH KSH INFRA
//         </span>

//         <h2
//           className="self-stretch mb-5"
//           style={{
//             color: "#212121",
//             fontFamily: "var(--font-sora), Sora, sans-serif",
//             fontSize: "clamp(28px, 3.75vw, 48px)",
//             fontStyle: "normal",
//             fontWeight: 600,
//             lineHeight: "1.15",
//             letterSpacing: "-0.96px",
//           }}
//         >
//           Commitment to Employee Well-Being & Growth
//         </h2>

//         <p
//           className="self-stretch mb-4"
//           style={{
//             color: "#4A4A4A",
//             fontFamily: "var(--font-inter), Inter, sans-serif",
//             fontSize: "clamp(16px, 1.56vw, 20px)",
//             fontStyle: "normal",
//             fontWeight: 400,
//             lineHeight: "140%",
//           }}
//         >
//           We invest in our people&apos;s well-rounded development. We provide
//           clear career paths and personal growth programs so everyone on our
//           team has the tools to succeed. Our approach focuses on building real
//           skills, developing strong leaders, and encouraging continuous
//           learning.
//         </p>

//         <p
//           className="self-stretch"
//           style={{
//             color: "#4A4A4A",
//             fontFamily: "var(--font-inter), Inter, sans-serif",
//             fontSize: "16px",
//             fontStyle: "normal",
//             fontWeight: 400,
//             lineHeight: "140%",
//           }}
//         >
//           This helps our employees advance professionally while achieving their
//           personal goals. We believe that when our people grow, our company
//           grows too. That&apos;s why we make sure everyone has the support they
//           need to reach their full potential.
//         </p>
//       </div>

//       <div
//         className="w-full overflow-hidden relative pb-8 p-8"
//         style={{ background: PANEL_BACKGROUND }}
//       >
//         <div className="flex flex-col">
//           {data.map((item, idx) => (
//             <AccordionItem
//               key={idx}
//               item={item}
//               isActive={active === idx}
//               isLast={idx === data.length - 1}
//               onToggle={() => setActive(idx)}
//               variant="mobile"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------------------------------- */
// /* Main Exported Section                                                  */
// /* ---------------------------------------------------------------------- */

// export default function CommitmentWellBeingSection() {
//   return (
//     <div className="w-full bg-white">
//       <section className="relative w-full overflow-x-clip">
//         <div className="hidden md:block">
//           <DesktopPanel data={CAREER_DATA} />
//         </div>
//         <div className="md:hidden pt-[45px]">
//           <MobilePanel data={CAREER_DATA} />
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";

interface CareerData {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

const CAREER_DATA: CareerData[] = [
  {
    title: "CAREER GROWTH & LEARNING OPPORTUNITIES",
    paragraphs: [
      "We give our team clear paths to advance their careers, mentorship from top industry experts, and specialized training programs.",
      "Our employees benefit from well-defined professional growth opportunities. They learn directly from experienced leaders and gain new skills through targeted training designed for their specific needs. We encourage professional development through:",
    ],
    bullets: [
      "Leadership and Management Training",
      "Industry Certifications and Sponsored Learning",
      "Cross-Functional Learning Opportunities",
      "Internal Promotion Avenues.",
    ],
  },
  {
    title: "COLLABORATION & INCLUSION",
    paragraphs: [
      "We thrive on teamwork, transparency, and respect. We welcome diverse viewpoints at KSH INFRA and value what each employee brings to the table. Our inclusive policies give everyone equal chances to grow, no matter their background.",
      "Through open conversations and supportive leadership, we help our people bring their full potential to work daily. We believe diverse, inclusive teams create better solutions and stronger results.",
    ],
  },
  {
    title: "WORK-LIFE BALANCE INITIATIVES",
    paragraphs: [
      "We understand that a meaningful career cannot thrive without personal well-being. Our commitment to work-life balance enables employees to excel professionally while also making time for family, personal development, and wellness. We promote:",
    ],
    bullets: [
      "Flexible Work Policies",
      "Mental Health and Wellness Programs",
      "Employee Engagement Activities and Recreational Initiatives",
      "Paid Time off and Leave Benefits to Recharge and Refresh",
    ],
  },
  {
    title: "EMPLOYEE BENEFITS & PERKS",
    paragraphs: [
      "We provide a comprehensive benefits package that ensures financial security, health coverage, and performance-driven rewards. Employees at KSH INFRA enjoy:",
    ],
    bullets: [
      "Competitive Salary Packages with Performance Incentives",
      "Comprehensive Health and Wellness Benefits",
      "Retirement and Financial Planning Support",
      "Recognition Programs and Awards for Outstanding Contributions",
    ],
  },
  {
    title: "COMMITTED TO SUSTAINABILITY",
    paragraphs: [
      "Sustainability is integral to everything we do—from our business practices to our workplace initiatives. We practice and promote eco-conscious efforts, corporate social responsibility, and green initiatives that contribute to a better world for future generations.",
    ],
  },
];

// Panel background for the right side
const PANEL_BACKGROUND = "#F8F8F8";

/* ---------------------------------------------------------------------- */
/* Accordion Item (shared markup for desktop and mobile panels)           */
/* ---------------------------------------------------------------------- */

interface AccordionItemProps {
  item: CareerData;
  isActive: boolean;
  isLast: boolean;
  onToggle: () => void;
  variant: "desktop" | "mobile";
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isActive,
  isLast,
  onToggle,
  variant,
}) => {
  const isDesktop = variant === "desktop";

  return (
    <div className={!isLast ? "border-b border-[#E5E0D8]" : ""}>
      <div
        onClick={onToggle}
        className={`flex items-center justify-between gap-4 cursor-pointer ${
          isDesktop
            ? isActive
              ? "py-6 lg:py-7"
              : "py-4 lg:py-5"
            : isActive
              ? "py-5"
              : "py-3.5"
        }`}
      >
        <div className="flex items-center gap-4 min-w-0">
          <h3
            className="uppercase"
            style={{
              color: isActive ? "#212121" : "#6D6D6D",
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontSize: isDesktop ? "clamp(16px, 1.4vw, 20px)" : "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1.3",
              letterSpacing: "-0.4px",
              transition: "color 0.4s ease",
            }}
          >
            {item.title}
          </h3>
        </div>

        {/* Accordion toggle indicator */}
        <span
          className={`shrink-0 flex items-center justify-center rounded-full transition-colors duration-300 ease-in-out ${
            isDesktop
              ? "w-[clamp(32px,2.6vw,38px)] h-[clamp(32px,2.6vw,38px)]"
              : "w-8 h-8"
          } ${
            isActive
              ? "bg-[#212121] border border-[#212121]"
              : "bg-transparent border border-[#E5E0D8]"
          }`}
        >
          {isActive ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line
                x1="3"
                y1="7"
                x2="11"
                y2="7"
                stroke="#FBF5EE"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line
                x1="3"
                y1="7"
                x2="11"
                y2="7"
                stroke="#6D6D6D"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="7"
                y1="3"
                x2="7"
                y2="11"
                stroke="#6D6D6D"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-in-out"
        style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              isDesktop ? "pb-6 lg:pb-7" : "pb-5"
            }`}
            style={{ opacity: isActive ? 1 : 0 }}
          >
            {item.paragraphs.map((paragraph, pIdx) => (
              <p
                key={pIdx}
                className={pIdx > 0 ? "mt-4" : ""}
                style={{
                  color: "#6D6D6D",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "140%",
                }}
              >
                {paragraph}
              </p>
            ))}

            {item.bullets && (
              <ul
                className="list-disc list-inside flex flex-col mt-4 gap-1"
                style={{
                  color: "#6D6D6D",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "140%",
                }}
              >
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/* Desktop Panel Container                                                */
/* ---------------------------------------------------------------------- */

const DesktopPanel: React.FC<{ data: CareerData[] }> = ({ data }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full bg-white relative">
      <div className="flex flex-row items-stretch gap-20 justify-between min-h-screen">
        {/* Left column - Solid White background */}
        <div
          className="w-[48%] xl:w-[45%] plcont bg-white flex flex-col justify-center gap-6 sm:gap-8 py-16 lg:py-24"
          // style={{
          //   paddingLeft: "var(--margin, clamp(16px, 5.7vw, 80px))",
          //   paddingRight: " clamp(24px, 3vw, 48px)",
          // }}
        >
          <h2
            className="self-stretch"
            style={{
              color: "#212121",
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontSize: "clamp(28px, 3.75vw, 48px)",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "1.15",
              letterSpacing: "-0.96px",
            }}
          >
            Commitment to Employee Well-Being & Growth
          </h2>

          <p
            className="self-stretch"
            style={{
              color: "#4A4A4A",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "clamp(16px, 1.56vw, 20px)",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "140%",
            }}
          >
            We invest in our people&apos;s well-rounded development. We provide
            clear career paths and personal growth programs so everyone on our
            team has the tools to succeed. Our approach focuses on building real
            skills, developing strong leaders, and encouraging continuous
            learning.
          </p>

          <p
            className="self-stretch"
            style={{
              color: "#4A4A4A",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "140%",
            }}
          >
            This helps our employees advance professionally while achieving
            their personal goals. We believe that when our people grow, our
            company grows too. That&apos;s why we make sure everyone has the
            support they need to reach their full potential.
          </p>
        </div>

        {/* Right column - Clean full #F8F8F8 split bleeding to edge */}
        <div
          className="
            w-[52%]
            xl:w-[55%]
            lg:py-16
            overflow-visible
            relative
            bg-[#F8F8F8]
            border-l
            border-[#E5E0D8]
            before:content-['']
            before:absolute
            before:top-0
            before:bottom-0 before:left-0 before:w-[200vw] before:bg-[#F8F8F8] before:pointer-events-none before:-z-10 prcont"
        >
          <div className="relative z-10 grid">
            <div
              aria-hidden="true"
              className="invisible pointer-events-none flex flex-col items-center lg:pl-[60px] pl-10 [grid-area:1/1]"
            >
              {data.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  item={item}
                  isActive={idx === 0}
                  isLast={idx === data.length - 1}
                  onToggle={() => {}}
                  variant="desktop"
                />
              ))}
            </div>
            <div className="flex flex-col lg:pl-[60px] pl-10 [grid-area:1/1]">
              {data.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  item={item}
                  isActive={active === idx}
                  isLast={idx === data.length - 1}
                  onToggle={() => setActive(idx)}
                  variant="desktop"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/* Mobile Panel Container                                                 */
/* ---------------------------------------------------------------------- */

const MobilePanel: React.FC<{ data: CareerData[] }> = ({ data }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full flex flex-col gap-[32px] bg-white">
      <div className="w-full px-6">
        <span
          className="text-[#868686] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 block"
          style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
        >
          // GROW WITH KSH INFRA
        </span>

        <h2
          className="self-stretch mb-5"
          style={{
            color: "#212121",
            fontFamily: "var(--font-sora), Sora, sans-serif",
            fontSize: "clamp(28px, 3.75vw, 48px)",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "1.15",
            letterSpacing: "-0.96px",
          }}
        >
          Commitment to Employee Well-Being & Growth
        </h2>

        <p
          className="self-stretch mb-4"
          style={{
            color: "#4A4A4A",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "clamp(16px, 1.56vw, 20px)",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "140%",
          }}
        >
          We invest in our people&apos;s well-rounded development. We provide
          clear career paths and personal growth programs so everyone on our
          team has the tools to succeed. Our approach focuses on building real
          skills, developing strong leaders, and encouraging continuous
          learning.
        </p>

        <p
          className="self-stretch"
          style={{
            color: "#4A4A4A",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "140%",
          }}
        >
          This helps our employees advance professionally while achieving their
          personal goals. We believe that when our people grow, our company
          grows too. That&apos;s why we make sure everyone has the support they
          need to reach their full potential.
        </p>
      </div>

      <div
        className="w-full overflow-hidden relative py-10 plcont prcont"
        style={{ background: PANEL_BACKGROUND }}
      >
        <div className="flex flex-col">
          {data.map((item, idx) => (
            <AccordionItem
              key={idx}
              item={item}
              isActive={active === idx}
              isLast={idx === data.length - 1}
              onToggle={() => setActive(idx)}
              variant="mobile"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/* Main Exported Section                                                  */
/* ---------------------------------------------------------------------- */

export default function CommitmentWellBeingSection() {
  return (
    <div className="w-full bg-white">
      <section className="relative w-full overflow-x-clip">
        <div className="hidden md:block">
          <DesktopPanel data={CAREER_DATA} />
        </div>
        <div className="md:hidden pt-[45px]">
          <MobilePanel data={CAREER_DATA} />
        </div>
      </section>
    </div>
  );
}
//
//
