"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Direction = "row" | "row-reverse" | "col" | "col-reverse";
export type ExpandOrigin =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type HotspotArrow = {
  src: string;
  widthClass: string;
  aspectRatio: string;
};

export type HotspotConfig = {
  id: string;
  label: string;
  lines: string[];
  parentLeft: string;
  parentTop: string;
  direction: Direction;
  expandFrom?: ExpandOrigin;
  align?: string;
  justify?: string;
  gap: string;
  defaultWClass: string;
  activeWClass: string;
  defaultHClass: string;
  activeHClass: string;
  marginClass?: string;
  arrow: HotspotArrow | null;
};

export const FLEX_DIRECTION: Record<Direction, string> = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  col: "flex-col",
  "col-reverse": "flex-col-reverse",
};

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
      className={`pointer-events-none shrink-0 select-none ${widthClass} h-auto`}
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
    <div className={`relative shrink-0 ${defaultWClass} ${defaultHClass}`}>
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
        className={`absolute z-20 box-border flex flex-col items-start overflow-hidden px-[8px] sm:px-[10px] md:px-[14px] 2xl:px-[16px] pt-[4px] sm:pt-[6px] md:pt-[8px] 2xl:pt-[10px] pb-[4px] sm:pb-[6px] md:pb-[8px] 2xl:pb-[10px] backdrop-blur-[4px] pointer-events-auto cursor-pointer select-none transition-all duration-300 ease-out ${alignmentClass} ${marginClass} ${
          hovered
            ? `${activeWClass} ${activeHClass}`
            : `${defaultWClass} ${defaultHClass}`
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

export function MobileAccordion({
  title,
  hotspots,
}: {
  title: string;
  hotspots: HotspotConfig[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full px-4 py-6 flex flex-col gap-3 bg-[#f8f7f4]">
      <h3 className="font-sora text-lg font-bold text-[#59624d] mb-1">
        {title}
      </h3>
      {hotspots.map((spot) => {
        const isOpen = openId === spot.id;
        return (
          <div
            key={spot.id}
            className="border border-[#59624d]/30 rounded-xl bg-white overflow-hidden shadow-sm transition-all duration-500"
          >
            <button
              onClick={() => toggle(spot.id)}
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
            >
              <span className="font-sora text-sm font-semibold text-[#212121]">
                {spot.label}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[#59624d] font-bold text-lg leading-none"
              >
                ↓
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.7, 0, 0.4, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-1 font-inter text-xs text-[#59624d] leading-relaxed border-t border-[#59624d]/10">
                    {spot.lines.join(" ")}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function HotspotImageMap({
  imageSrc,
  imageAlt,
  hotspots,
  mobileTitle,
}: {
  imageSrc: string;
  imageAlt: string;
  hotspots: HotspotConfig[];
  mobileTitle: string;
}) {
  return (
    <>
      {/* Mobile View: Accordion (Hidden above 1200px) */}
      <div className="block min-[1200px]:hidden">
        <MobileAccordion title={mobileTitle} hotspots={hotspots} />
      </div>

      {/* Desktop / Tablet View: Interactive Hotspots on Image */}
      <div className="hidden min-[1200px]:block relative aspect-[19.20/8.73] fix select-none">
        <div className="bg-linear-to-b from-white to-transparent z-10 h-40 2xl:h-5 top-0 left-0 w-full absolute" />
        <div className="bg-linear-to-b from-transparent to-white z-10 h-40 2xl:h-20 bottom-0 left-0 w-full absolute" />
        <img
          src={imageSrc}
          alt={imageAlt}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover z-0"
          draggable={false}
        />

        {hotspots.map((spot) => (
          <div
            key={spot.id}
            className={`absolute z-10 flex pointer-events-none ${spot.parentLeft} ${spot.parentTop} ${
              spot.arrow
                ? ANCHOR_TRANSFORM[spot.direction]
                : "-translate-x-1/2 -translate-y-1/2"
            } ${FLEX_DIRECTION[spot.direction]} ${spot.align || "items-start"} ${
              spot.justify || "justify-start"
            } ${spot.gap}`}
          >
            {spot.arrow && (
              <Arrow
                src={spot.arrow.src}
                widthClass={spot.arrow.widthClass}
                aspectRatio={spot.arrow.aspectRatio}
              />
            )}
            <HotspotChip
              label={spot.label}
              lines={spot.lines}
              defaultWClass={spot.defaultWClass}
              activeWClass={spot.activeWClass}
              defaultHClass={spot.defaultHClass}
              activeHClass={spot.activeHClass}
              direction={spot.direction}
              expandFrom={spot.expandFrom}
              marginClass={spot.marginClass}
            />
          </div>
        ))}
      </div>
    </>
  );
}
