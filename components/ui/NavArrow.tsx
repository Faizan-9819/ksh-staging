"use client";

interface NavArrowProps {
  direction: "prev" | "next";
  tone?: "light" | "dark";
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

export default function NavArrow({
  direction,
  tone = "light",
  disabled = false,
  onClick,
  ariaLabel,
  className = "",
}: NavArrowProps) {
  const isPrev = direction === "prev";
  const isDark = tone === "dark";

  /* Exact chevron paths from NavArrow.dc.html */
  const chevron = isPrev ? "M44 8L35 17L44 26" : "M35 8L44 17L35 26";

  const stroke = isDark ? "#24314E" : "#FFFFFF";
  const baseBg = isDark ? "rgba(36,49,78,0.04)" : "rgba(255,255,255,0.10)";
  const baseBorder = isDark ? "rgba(36,49,78,0.22)" : "rgba(255,255,255,0.18)";

  const label = ariaLabel || (isPrev ? "Previous" : "Next");

  function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    const el = e.currentTarget;
    el.style.background = isDark
      ? "rgba(36,49,78,0.10)"
      : "rgba(255,255,255,0.18)";
    el.style.borderColor = isDark
      ? "rgba(36,49,78,0.4)"
      : "rgba(255,255,255,0.34)";
    el.style.filter = "brightness(1.06)";
    el.style.transform = "translateY(-1px)";
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    const el = e.currentTarget;
    el.style.background = baseBg;
    el.style.borderColor = baseBorder;
    el.style.filter = "";
    el.style.transform = "";
  }

  const commonClasses = `items-center justify-center p-0 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] border border-solid shrink-0 [transition:background_.25s_ease,border-color_.25s_ease,filter_.25s_ease,transform_.25s_ease] ${
    disabled
      ? "cursor-default opacity-40 pointer-events-none"
      : "cursor-pointer opacity-100 pointer-events-auto"
  } ${className}`;

  return (
    <>
      {/* DESKTOP BUTTON (Only visible on lg screens and up) */}
      <button
        onClick={disabled ? undefined : onClick}
        aria-label={label}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`hidden lg:flex w-[78px] h-[34px] rounded-[17px] ${commonClasses}`}
        style={{
          background: baseBg,
          borderColor: baseBorder,
        }}
      >
        <svg
          width="78"
          height="34"
          viewBox="0 0 78 34"
          fill="none"
          className="block w-full h-full"
        >
          <path
            d={chevron}
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* MOBILE BUTTON (Only visible on screens smaller than lg) */}
      <button
        onClick={disabled ? undefined : onClick}
        aria-label={label}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex lg:hidden w-[40px] h-[28px] rounded-[14px] ${commonClasses}`}
        style={{
          background: baseBg,
          borderColor: baseBorder,
        }}
      >
        <svg
          width="58"
          height="38"
          viewBox="0 0 78 34"
          fill="none"
          className="block w-full h-full"
        >
          <path
            d={chevron}
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
