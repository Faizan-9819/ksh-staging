"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ANCHOR_TRANSFORM,
  Arrow,
  Direction,
  ExpandOrigin,
  FLEX_DIRECTION,
  HotspotArrow,
  HotspotChip,
} from "./Hotspot";

type InteriorHotspot = {
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

const HOTSPOTS: InteriorHotspot[] = [
  {
    id: "fire-protection",
    label: "Fire Protection",
    lines: [
      "Fire detection, alarms, fire escape",
      "doors, sprinklers, external hydrants",
    ],
    parentLeft: "left-[23%]",
    parentTop: "top-[12%]",
    direction: "row-reverse",
    expandFrom: "top-left",
    align: "items-start",
    justify: "justify-start",
    gap: "gap-1.5 2xl:gap-2",
    defaultWClass: "w-[92px] sm:w-[115px] md:w-[135px] 2xl:w-[161px]",
    activeWClass: "w-[160px] sm:w-[200px] md:w-[270px]",
    defaultHClass: "h-[26px] sm:h-[32px] md:h-[36px] 2xl:h-[42px]",
    activeHClass: "h-[80px] sm:h-[100px] md:h-[100px]",
    marginClass: "-mt-5",
    arrow: {
      src: "/ParkPage/interior/fire.svg",
    },
  },
  {
    id: "wall",
    label: "Wall",
    lines: ["Pre-cast concrete walls/block", "walls with 9.2M clear height"],
    parentLeft: "left-[8%]",
    parentTop: "top-[57%]",
    direction: "row-reverse",
    expandFrom: "top-left",
    align: "items-center",
    justify: "justify-start",
    gap: "gap-1.5 2xl:gap-2",
    defaultWClass: "w-[76px] sm:w-[95px] md:w-[110px] 2xl:w-[75px]",
    activeWClass: "w-[160px] sm:w-[200px] md:w-[230px]",
    defaultHClass: "h-[26px] sm:h-[32px] md:h-[36px] 2xl:h-[42px]",
    activeHClass: "h-[80px] sm:h-[100px] md:h-[100px]",
    marginClass: "mt-5",
    arrow: {
      src: "/ParkPage/interior/wall.svg",
      widthClass: "mt-7",
    },
  },
  {
    id: "efficient-lighting",
    label: "LED LIGHTS",
    lines: [
      "Exterior & Interior LED lighting",
      "ensuring efficient after-dark illumination",
    ],
    parentLeft: "left-[37%]",
    parentTop: "top-[6%]",
    direction: "row",
    expandFrom: "top-left",
    align: "items-start",
    justify: "justify-start",
    gap: "gap-1.5 2xl:gap-2",
    defaultWClass: "w-[110px] sm:w-[130px]",
    activeWClass: "w-[260px]  2xl:w-[287px]",
    defaultHClass: "h-[26px] sm:h-[32px] md:h-[36px] 2xl:h-[42px]",
    activeHClass: "h-[80px] sm:h-[100px] z-[100]!",
    marginClass: "-mt-2 2xl:-mt-3",
    arrow: {
      src: "/ParkPage/interior/light.svg",
      widthClass: " 2xl:w-[600px] w-[470px] mt-3 2xl:mt-5",
    },
  },
  {
    id: "dock-area",
    label: "Dock Area",
    lines: ["Access to dock area with", "rolling shutters and dock pits"],
    parentLeft: "left-[95%]",
    parentTop: "top-[59%]",
    direction: "col",
    expandFrom: "top-left",
    align: "items-end",
    justify: "justify-start",
    gap: "gap-1.5 2xl:gap-2",
    defaultWClass: "w-[83px] sm:w-[103px] md:w-[123px] 2xl:w-[120px]",
    activeWClass: "w-[160px] sm:w-[200px] md:w-[230px]",
    defaultHClass: "h-[26px] sm:h-[32px] md:h-[36px] 2xl:h-[42px]",
    activeHClass: "h-[80px] sm:h-[100px]",
    marginClass: "ml-[60px]",
    arrow: {
      src: "/ParkPage/interior/dock.svg",
      widthClass: "w-[35px] sm:w-[44px] md:w-[52px] 2xl:w-[60px]",
      aspectRatio: "60/67",
    },
  },
  {
    id: "floor",
    label: "Floor",
    lines: ["6 TO 8 Tons UDL Floor Design"],
    parentLeft: "left-[46.5%]",
    parentTop: "top-[77%]",
    direction: "col",
    expandFrom: "top-left",
    align: "items-center",
    justify: "justify-start",
    gap: "gap-1.5 2xl:gap-2",
    defaultWClass: "w-[50px] sm:w-[63px] md:w-[74px]",
    activeWClass: "w-[160px] sm:w-[200px] md:w-[240px]",
    defaultHClass: "h-[26px] sm:h-[32px] md:h-[36px] 2xl:h-[42px]",
    activeHClass: "h-[80px] sm:h-[80px]",
    marginClass: "",
    arrow: {
      src: "/ParkPage/interior/floor.svg",
      widthClass: "w-[3px] sm:w-[4px] md:w-[5px] 2xl:w-[6px]",
      aspectRatio: "6/121",
    },
  },
  {
    id: "ventilation",
    label: "Ventilation",
    lines: ["Ventilation through louvers", "and roof monitors"],
    parentLeft: "left-[21%]",
    parentTop: "top-[57%]",
    direction: "col",
    expandFrom: "top-left",
    align: "items-center",
    justify: "justify-start",
    gap: "gap-1.5 2xl:gap-2",
    defaultWClass: "w-[80px] sm:w-[100px] md:w-[125px]",
    activeWClass: "w-[160px] sm:w-[200px] md:w-[220px]",
    defaultHClass: "h-[26px] sm:h-[32px] md:h-[36px] 2xl:h-[42px]",
    activeHClass: "h-[80px] sm:h-[100px] md:h-[98px]",
    marginClass: "",
    arrow: {
      src: "/ParkPage/interior/vent.svg",
      widthClass: "w-[3px] sm:w-[4px] md:w-[5px] 2xl:w-[6px]",
      aspectRatio: "6/227",
    },
  },
  {
    id: "windows",
    label: "Windows",
    lines: ["Windows for natural daylight", "and cross ventilation"],
    parentLeft: "left-[15.5%]",
    parentTop: "top-[47.5%]",
    direction: "row-reverse",
    expandFrom: "top-left",
    align: "items-center",
    justify: "justify-start",
    gap: "gap-1.5 2xl:gap-2",
    defaultWClass: "w-[76px] sm:w-[95px] md:w-[110px] 2xl:w-[115px]",
    activeWClass: "w-[160px] sm:w-[200px] md:w-[230px]",
    defaultHClass: "h-[26px] sm:h-[32px] md:h-[36px] 2xl:h-[42px]",
    activeHClass: "h-[80px] sm:h-[100px] md:h-[100px]",
    marginClass: "lg:-mt-7 2xl:-mt-11",
    arrow: {
      src: "/ParkPage/interior/windows.svg",
      widthClass: "2xl:w-[250px] w-[180px] mt-3 2xl:mt-1",
    },
  },
];

function MobileAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full px-4 py-6 flex flex-col gap-3 bg-[#f8f7f4]">
      <h3 className="font-sora text-lg font-bold text-[#59624d] mb-1">
        Key Interior Features
      </h3>
      {HOTSPOTS.map((spot) => {
        const isOpen = openId === spot.id;
        return (
          <div
            key={spot.id}
            className="border border-[#59624d]/30 rounded-xl bg-white overflow-hidden shadow-sm transition-all duration-300"
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
                  transition={{ duration: 0.3, ease: [0.7, 0, 0.4, 1] }}
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

export default function Interior() {
  return (
    <>
      {/* Mobile View: Accordion (Hidden above 1200px) */}
      <div className="block min-[1200px]:hidden">
        <MobileAccordion />
      </div>

      {/* Desktop / Tablet View: Interactive Hotspots on Image */}
      <div className="hidden min-[1200px]:block relative aspect-[19.20/8.73] mx-auto w-[880px] 2xl:w-[1080px] select-none mb-48">
        <img
          src="/ParkPage/interior/interior.webp"
          alt="Park interior view"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          draggable={false}
        />

        {HOTSPOTS.map((spot) => (
          <div
            key={spot.id}
            className={`absolute flex pointer-events-none ${spot.parentLeft} ${spot.parentTop} ${
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
