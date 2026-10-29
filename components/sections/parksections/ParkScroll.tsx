"use client";

import { PRESSABLE } from "@/lib/pressable";
import React, { useState } from "react";

type Item = {
  key: string;
  title: string;
  description: string;
  icon:
    | "automotive"
    | "logistics"
    | "talent"
    | "strategic-location"
    | "robust-infrastructure"
    | "excellent-connectivity";
};

export interface ParkScrollContent {
  eyebrow: string;
  heading: string;
  /** Longer intro shown on desktop only — mobile shows introMobile instead. */
  intro: string;
  introMobile: string;
  items: Item[];
}

const DEFAULT_CONTENT: ParkScrollContent = {
  eyebrow: "Grow With KSH INFRA",
  heading: "Defining Characteristics of Chakan, Maharashtra",
  intro:
    "Chakan has emerged as one of India's most prominent Industrial destinations, driven by world-class infrastructure, strategic connectivity, a skilled workforce, and a thriving manufacturing ecosystem. Its strong Logistics network and business-friendly environment continue to attract leading global and domestic enterprises.",
  introMobile:
    "Chakan has emerged as one of India's most prominent Industrial destinations, driven by world-class infrastructure, strategic connectivity, a skilled workforce, and a thriving manufacturing ecosystem.",
  items: [
    {
      key: "automotive",
      title: "Automotive Hub",
      description:
        "Chakan houses major automotive brands like Volkswagen, Mahindra & Mahindra, Mercedes Benz, and Bridgestone, positioning it as a central hub for automotive manufacturing and engineering excellence.",
      icon: "automotive",
    },
    {
      key: "talent",
      title: "Talent Magnet",
      description:
        "The presence of prestigious automotive and manufacturing companies has made Chakan a significant draw for engineering talent, attracting skilled professionals from across India and globally.",
      icon: "talent",
    },
    {
      key: "strategic-location",
      title: "Strategic Location",
      description:
        "Situated between the KHED SEZ and the Talegaon Industrial belt, Chakan benefits from a strategically advantageous location that supports extensive Industrial activity and development.",
      icon: "strategic-location",
    },
    {
      key: "robust-infrastructure",
      title: "Robust Infrastructure",
      description:
        "Chakan is experiencing rapid infrastructure growth, enhancing its attractiveness as an Industrial location. This development supports a wide range of industries and contributes to the area's overall economic expansion.",
      icon: "robust-infrastructure",
    },
    {
      key: "excellent-connectivity",
      title: "Excellent Connectivity",
      description:
        "With well-planned connectivity options, Chakan offers seamless access to major transportation networks, making it an ideal choice for industries looking to optimize Logistics and supply chain operations.",
      icon: "excellent-connectivity",
    },
  ],
};

const DesktopAccordionItem = ({
  item,
  isActive,
  isLast,
  onToggle,
}: {
  item: Item;
  isActive: boolean;
  isLast: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className={isLast ? "" : "border-b border-gray-300"}>
      <div
        {...PRESSABLE}
        onClick={onToggle}
        className={`flex items-center justify-between gap-4 cursor-pointer py-4 lg:py-5`}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <h3
            className="font-sora font-normal text-[24px] tracking-[-0.48px] uppercase text-[#212121]"
            dangerouslySetInnerHTML={{ __html: item.title }}
          />
        </div>

        {/* Accordion toggle indicator */}
        <span
          className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-full border transition-colors duration-500 ease-in-out ${
            isActive
              ? "bg-[#212121] border-[#212121]"
              : "bg-transparent border-gray-300"
          }`}
        >
          {isActive ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line
                x1="3"
                y1="7"
                x2="11"
                y2="7"
                stroke="#6d6d6d"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="7"
                y1="3"
                x2="7"
                y2="11"
                stroke="#6d6d6d"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
      </div>

      {/* grid-template-rows 0fr -> 1fr: height is always correct on first
          paint, resize, and font load, so it never jumps and never gets
          stuck collapsed. */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-in-out"
        style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="pb-6 transition-opacity duration-500 ease-in-out"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            <p
              className="text-[14px] text-[#6d6d6d] font-inter font-normal leading-[1.4] max-w-[425px]"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DesktopPanel = ({ content }: { content: ParkScrollContent }) => {
  const [active, setActive] = useState(0);
  const items = content.items;

  return (
    <div className="w-full min-h-fit flex flex-row items-stretch justify-between bg-white">
      {/* Left column */}
      <div className="w-[60%] plcont pr-6 flex flex-col justify-center py-12">
        {/* <div className="flex items-center gap-2 mb-4">
          <span className="text-[#59624d] font-mono text-sm tracking-widest uppercase">
            //
          </span>
          <p
            className="font-sora font-normal text-[12px] tracking-[-0.24px] uppercase text-[#59624d] m-0"
            dangerouslySetInnerHTML={{ __html: content.eyebrow }}
          />
        </div> */}
        <h2
          className="font-sora font-semibold text-[32px] lg:text-[48px] leading-[1.15] tracking-[-0.64px] lg:tracking-[-0.8px] text-[#212121] m-0"
          dangerouslySetInnerHTML={{ __html: content.heading }}
        />
        <p
          className="mt-8 font-inter font-normal text-[16px] lg:text-[20px] leading-[1.4] text-[#4a4a4a] max-w-[500px]"
          dangerouslySetInnerHTML={{ __html: content.intro }}
        />
      </div>

      {/* Right column */}
      <div className="w-[40%] lg:w-[50%] bg-[#f8f8f8] flex lg:py-24 py-12 flex-col justify-center px-12 lg:pl-24 lg:pr-16">
        {items.map((item, idx) => (
          <DesktopAccordionItem
            key={item.key}
            item={item}
            isActive={idx === active}
            isLast={idx === items.length - 1}
            onToggle={() => setActive(idx)}
          />
        ))}
      </div>
    </div>
  );
};

const MobileAccordionItem = ({
  item,
  isActive,
  isLast,
  onToggle,
}: {
  item: Item;
  isActive: boolean;
  isLast: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className={isLast ? "" : "border-b border-gray-300"}>
      <div
        {...PRESSABLE}
        onClick={onToggle}
        className={`flex items-center justify-between gap-3 cursor-pointer ${
          isActive ? "py-5" : "py-3.5"
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <h3
            className="font-sora font-normal text-[20px] tracking-[-0.4px] uppercase text-[#212121]"
            dangerouslySetInnerHTML={{ __html: item.title }}
          />
        </div>

        {/* Accordion toggle indicator */}
        <span
          className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-500 ease-in-out ${
            isActive
              ? "bg-[#212121] border-[#212121]"
              : "bg-transparent border-gray-300"
          }`}
        >
          {isActive ? (
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
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
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <line
                x1="3"
                y1="7"
                x2="11"
                y2="7"
                stroke="#6d6d6d"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="7"
                y1="3"
                x2="7"
                y2="11"
                stroke="#6d6d6d"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
      </div>

      {/* grid-template-rows 0fr -> 1fr: height is always correct on first
          paint, resize, and font load, so it never jumps and never gets
          stuck collapsed. */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-in-out"
        style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="pb-4 transition-opacity duration-500 ease-in-out"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            <p
              className="text-[13px] text-[#6d6d6d] font-inter font-normal leading-[1.4]"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MobilePanel = ({ content }: { content: ParkScrollContent }) => {
  const [active, setActive] = useState(0);
  const items = content.items;
  return (
    <div className="w-full flex flex-col gap-[32px] px-4 py-[45px]">
      <div className="flex flex-col gap-4">
        {/* <div className="flex items-center gap-2">
          <span className="text-[#59624d] font-mono text-sm tracking-widest uppercase">
            //
          </span>
          <p
            className="font-sora font-normal text-[12px] tracking-[-0.24px] uppercase text-[#59624d] m-0"
            dangerouslySetInnerHTML={{ __html: content.eyebrow }}
          />
        </div> */}
        <h2
          className="font-sora font-semibold text-[26px] leading-[1.2] tracking-[-0.52px] text-[#212121] m-0"
          dangerouslySetInnerHTML={{ __html: content.heading }}
        />
      </div>
      <p
        className="font-inter font-normal text-[15px] leading-[1.4] text-[#4a4a4a]"
        dangerouslySetInnerHTML={{ __html: content.introMobile }}
      />

      <div className="w-full bg-[#f8f8f8] rounded-[20px] p-6 flex flex-col">
        {items.map((item, idx) => (
          <MobileAccordionItem
            key={item.key}
            item={item}
            isActive={idx === active}
            isLast={idx === items.length - 1}
            onToggle={() => setActive(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default function ParkScroll({
  content = DEFAULT_CONTENT,
}: {
  content?: ParkScrollContent;
  // Accepted (unused) for backward compatibility — existing per-park pages
  // still pass this, but the accordion no longer renders icons.
  svgImages?: string[];
} = {}) {
  return (
    <div className="w-full bg-white">
      <section className="relative w-full">
        <div className="hidden md:block">
          <DesktopPanel content={content} />
        </div>
        <div className="md:hidden">
          <MobilePanel content={content} />
        </div>
      </section>
    </div>
  );
}
