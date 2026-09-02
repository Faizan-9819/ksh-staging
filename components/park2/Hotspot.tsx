"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export type Direction = "row" | "row-reverse" | "col" | "col-reverse";
export type ExpandOrigin =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type HotspotArrow = {
  src: string;
  widthClass: string;
  aspectRatio?: string;
};

export const FLEX_DIRECTION: Record<Direction, string> = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  col: "flex-col",
  "col-reverse": "flex-col-reverse",
};

/**
 * The group's fixed anchor is the arrow's outer tip, not its center — only the edge
 * opposite the chip's growth direction gets translated by 50%/100%; the other axis/edge
 * stays pinned at the hotspot's (left, top) position, so the arrow never shifts as the
 * chip grows on hover.
 */
export const ANCHOR_TRANSFORM: Record<Direction, string> = {
  row: "-translate-y-1/2",
  "row-reverse": "-translate-x-full -translate-y-1/2",
  col: "-translate-x-1/2",
  "col-reverse": "-translate-x-1/2 -translate-y-full",
};

export const EXPAND_ORIGIN: Record<ExpandOrigin, string> = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

export const DEFAULT_EXPAND: Record<Direction, ExpandOrigin> = {
  row: "top-left",
  "row-reverse": "top-right",
  col: "top-left",
  "col-reverse": "bottom-left",
};

export function Arrow({ src, widthClass, aspectRatio }: HotspotArrow) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className={`pointer-events-none shrink-0 select-none relative z-0 ${widthClass} h-auto`}
      style={{ aspectRatio }}
    />
  );
}

export function HotspotChip({
  label,
  lines,
  defaultWClass,
  activeWClass,
  defaultHClass,
  activeHClass,
  direction,
  expandFrom,
  marginClass = "",
}: {
  label: string;
  lines: string[];
  defaultWClass: string;
  activeWClass: string;
  defaultHClass: string;
  activeHClass: string;
  direction: Direction;
  expandFrom?: ExpandOrigin;
  marginClass?: string;
}) {
  const [hovered, setHovered] = useState(false);

  const originKey = expandFrom || DEFAULT_EXPAND[direction] || "top-left";
  const alignmentClass = EXPAND_ORIGIN[originKey];

  return (
    <div
      className={`relative shrink-0 pointer-events-auto ${defaultWClass} ${defaultHClass}`}
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial={false}
        animate={{
          backgroundColor: hovered
            ? "rgba(197, 189, 172, 1)"
            : "rgba(255, 255, 255, 0.5)",
          borderColor: hovered ? "rgba(89, 98, 77, 0)" : "rgba(89, 98, 77, 1)",
          borderRadius: hovered ? 80 : 80,
          paddingLeft: hovered ? "24px" : "16px",
          paddingTop: hovered ? "16px" : "12px",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ borderWidth: 1, borderStyle: "solid" }}
        className={`absolute box-border flex flex-col items-start overflow-hidden px-[8px] sm:px-[10px] md:px-[14px] 2xl:px-[16px] pt-[4px] sm:pt-[6px] md:pt-[8px] 2xl:pt-[10px] pb-[4px] sm:pb-[6px] md:pb-[8px] 2xl:pb-[10px] backdrop-blur-[4px] cursor-pointer select-none pointer-events-auto transition-all duration-300 ease-out ${alignmentClass} ${marginClass} ${
          hovered
            ? `z-50 ${activeWClass} ${activeHClass}`
            : `z-20 ${defaultWClass} ${defaultHClass}`
        }`}
      >
        <motion.p
          animate={{ color: hovered ? "#212121" : "#59624d" }}
          transition={{ duration: 0.2 }}
          className="m-0 shrink-0 font-sora text-[9px] sm:text-[11px] md:text-[13px] 2xl:text-[15px] font-semibold leading-tight whitespace-nowrap"
        >
          {label}
        </motion.p>

        <motion.div
          animate={{
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : 4,
          }}
          transition={{ duration: 0.3, delay: hovered ? 0.05 : 0 }}
          className="mt-[3px] sm:mt-[4px] md:mt-[6px] 2xl:mt-[8px] shrink-0 pointer-events-none"
        >
          <p className="m-0 font-inter text-[8px] sm:text-[10px] md:text-[11px] 2xl:text-[13px] font-normal leading-[1.3] md:leading-[1.4] text-[#212121] whitespace-nowrap">
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
