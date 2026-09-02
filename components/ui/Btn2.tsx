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

export default function Btn2({
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

      <svg
        width="19"
        height="42"
        viewBox="0 0 19 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative z-10 flex-shrink-0 ${arrowClassName}`}
      >
        <path
          d="M9.30664 0L9.30664 33.5"
          className={`transition-colors duration-300 ${
            active ? hoverArrowColor : arrowColor
          }`}
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <path
          d="M18.3066 33.5L9.30664 40.5L0.306641 33.5"
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
