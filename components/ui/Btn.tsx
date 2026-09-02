// "use client";

// import { useEffect, useState } from "react";

// interface BtnProps {
//   label?: string;
//   onClick?: () => void;
//   className?: string;
//   arrowClassName?: string;

//   textColor?: string;
//   hoverTextColor?: string;
//   bgColor?: string;
//   hoverBgColor?: string;
//   borderColor?: string;
//   arrowColor?: string;
//   hoverArrowColor?: string;

//   filled?: boolean;
//   textSize?: string;
// }

// export default function Btn({
//   label = "Learn More",
//   onClick,
//   className = "",
//   arrowClassName = "",
//   textColor = "text-[#212121]",
//   hoverTextColor = "text-white",
//   bgColor = "bg-transparent",
//   hoverBgColor = "bg-[#5E6E4E]",
//   borderColor = "border-[rgba(36,49,78,0.20)]",
//   arrowColor = "stroke-[#212121]",
//   hoverArrowColor = "stroke-white",
//   filled = false,
//   textSize = "text-[14px]",
// }: BtnProps) {
//   const [hovered, setHovered] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };

//     checkMobile();

//     window.addEventListener("resize", checkMobile);

//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const active = isMobile || filled || hovered;

//   return (
//     <button
//       onClick={onClick}
//       onMouseEnter={() => {
//         if (!isMobile && !filled) setHovered(true);
//       }}
//       onMouseLeave={() => {
//         if (!isMobile && !filled) setHovered(false);
//       }}
//       className={`relative cursor-pointer inline-flex min-h-10 overflow-hidden items-center text-wrap max-w-full justify-center rounded-full border ${borderColor} ${bgColor} px-6 gap-6 transition-colors duration-300 ${className}`}
//     >
//       {/* Background Layer */}
//       <span
//         aria-hidden
//         className={`absolute inset-0 rounded-full ${hoverBgColor} transition-transform duration-[360ms] ease-[cubic-bezier(0.33,0,0.2,1)] origin-left ${
//           active ? "scale-x-100" : "scale-x-0"
//         }`}
//       />

//       {/* Text */}
//       <span
//         style={{ color: hovered ? undefined : "#212121" }}
//         className={`relative z-10 text-left font-[family-name:var(--font-sora),sans-serif] font-normal leading-[1.4] transition-colors duration-300 ${textSize} ${
//           active ? hoverTextColor : textColor
//         }`}
//       >
//         {label}
//       </span>

//       {/* Arrow */}
//       <svg
//         width="42"
//         height="20"
//         viewBox="159 10 42 20"
//         fill="none"
//         className={`relative z-10 flex-shrink-0 ${arrowClassName}`}
//       >
//         <path
//           d="M159.5 20H193"
//           style={{ stroke: hovered ? undefined : "#212121" }}
//           className={`transition-colors duration-300 ${
//             active ? hoverArrowColor : arrowColor
//           }`}
//           strokeWidth="1.2"
//           strokeLinecap="round"
//         />

//         <path
//           d="M193 11C193 11 200 12.5 200 20C200 27.5 193 29 193 29"
//           style={{ stroke: hovered ? undefined : "#212121" }}
//           className={`transition-colors duration-300 ${
//             active ? hoverArrowColor : arrowColor
//           }`}
//           strokeWidth="1.2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     </button>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "@/components/ui/Link";

interface BtnProps {
  label?: string;
  onClick?: () => void;
  /** When provided, the button renders as a Link to this href instead of a <button> — same visual styling and hover behavior either way. */
  href?: string;
  className?: string;
  arrowClassName?: string;

  textColor?: string;
  hoverTextColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  borderColor?: string;
  arrowColor?: string;
  hoverArrowColor?: string;

  filled?: boolean;
  textSize?: string;
  /** Tailwind font-weight class for the label, e.g. "font-normal". The label span sets its own weight directly, so `className`'s "font-normal!" on the outer button can never reach it — this is the real way to change it. */
  fontWeight?: string;
}

export default function Btn({
  label = "Learn More",
  onClick,
  href,
  className = "",
  arrowClassName = "",
  textColor = "text-[#24314E]",
  hoverTextColor = "text-white",
  bgColor = "bg-transparent",
  hoverBgColor = "bg-[#59624D]",
  borderColor = "border-[#24314E]",
  arrowColor = "stroke-[#24314E]",
  hoverArrowColor = "stroke-white",
  filled = false,
  textSize = "text-[14px]",
  fontWeight = "",
}: BtnProps) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const active = isMobile || filled || hovered;

  const sharedProps = {
    onClick,
    onMouseEnter: () => {
      if (!isMobile && !filled) setHovered(true);
    },
    onMouseLeave: () => {
      if (!isMobile && !filled) setHovered(false);
    },
    className: `relative cursor-pointer inline-flex min-h-10 overflow-hidden items-center text-wrap max-w-full justify-center rounded-full border ${borderColor} ${bgColor} px-6 gap-6 transition-colors duration-300 ${className}`,
  };

  const content = (
    <>
      {/* Background Layer (Full inset to eliminate light leaks/whitespace gaps) */}
      <span
        aria-hidden
        className={`absolute inset-0 rounded-full ${hoverBgColor} transition-transform duration-[360ms] ease-[cubic-bezier(0.33,0,0.2,1)] origin-left ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />

      {/* Text */}
      <span
        className={`relative lg:z-10 text-left font-[family-name:var(--font-sora),sans-serif] ${fontWeight} leading-[1.4] transition-colors duration-300 ${textSize} ${
          active ? hoverTextColor : textColor
        }`}
      >
        {label}
      </span>

      {/* Arrow */}
      <svg
        width="42"
        height="20"
        viewBox="159 10 42 20"
        fill="none"
        className={`relative z-10 flex-shrink-0 ${arrowClassName}`}
      >
        <path
          d="M159.5 20H193"
          className={`transition-colors duration-300 ${
            active ? hoverArrowColor : arrowColor
          }`}
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <path
          d="M193 11C193 11 200 12.5 200 20C200 27.5 193 29 193 29"
          className={`transition-colors duration-300 ${
            active ? hoverArrowColor : arrowColor
          }`}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        {content}
      </Link>
    );
  }

  return <button {...sharedProps}>{content}</button>;
}
