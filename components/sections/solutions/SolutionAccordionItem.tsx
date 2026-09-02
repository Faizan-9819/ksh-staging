"use client";

import React, { useId, useState } from "react";
import type { SolutionAccordionItemData } from "./solutionsData";

const ACCORDION_TRANSITION_MS = 350;

interface SolutionAccordionItemProps {
  item: SolutionAccordionItemData;
}

function SolutionAccordionItem({ item }: SolutionAccordionItemProps) {
  const [open, setOpen] = useState(Boolean(item.defaultOpen));
  const panelId = useId();

  return (
    <div className="border-t border-[#E4E0D8] first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-[13px] tracking-[0.08em] text-[#212121] uppercase">
          {item.title}
        </span>
        <span
          aria-hidden
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[15px] leading-none transition-colors ${
            open
              ? "border-[#59624D] bg-[#59624D] text-white"
              : "border-[#D9D5CE] text-[#8C8C84]"
          }`}
          style={{ transitionDuration: `${ACCORDION_TRANSITION_MS}ms` }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        id={panelId}
        className="grid transition-[grid-template-rows] ease-in-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transitionDuration: `${ACCORDION_TRANSITION_MS}ms`,
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-[14px] leading-relaxed text-[#4A4A4A]">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SolutionAccordionItem;
