"use client";

import React from "react";
import type { SolutionCardData } from "./solutionsData";

const SIDEBAR_TICK_TRANSITION_MS = 350;
const SIDEBAR_STICKY_TOP_PX = 128;

const SIDEBAR_NAV_CLASS_NAME =
  "sticky hidden shrink-0 flex-col h-full self-start md:flex md:w-[170px] lg:w-[220px] xl:w-[318px]";

interface SolutionsSidebarProps {
  items: SolutionCardData[];
  activeIndex: number;
  onSelect: (index: number) => void;
  topOffset?: number;
  tickSpacingClassName?: string;
  contentClassName?: string;
  navClassName?: string;
}

function SolutionsSidebar({
  items,
  activeIndex,
  onSelect,
  topOffset = SIDEBAR_STICKY_TOP_PX,
  tickSpacingClassName = "mb-7",
  contentClassName = "p-5 lg:p-6 mt-2",
  navClassName = SIDEBAR_NAV_CLASS_NAME,
}: SolutionsSidebarProps) {
  return (
    <nav
      aria-label="Solutions timeline"
      className={navClassName}
      style={{ top: topOffset }}
    >
      <div className={`rounded-[28px] bg-white ${contentClassName}`}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div key={item.id} className="flex flex-col items-start">
              {/* Two minor ruler ticks above each item */}
              <span
                aria-hidden
                className={`ml-2 ${tickSpacingClassName} h-px w-3 bg-[#E4E0D8]`}
              />
              <span
                aria-hidden
                className={`ml-2 ${tickSpacingClassName} h-px w-3 bg-[#E4E0D8]`}
              />

              {/* Major item button with longer tick mark */}
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isActive ? "step" : undefined}
                className="mb-3 flex cursor-pointer items-center gap-3 text-left"
              >
                <span
                  aria-hidden
                  className={`h-px w-6 shrink-0 transition-colors ${
                    isActive ? "bg-[#111111]" : "bg-[#B5B5AD]"
                  }`}
                  style={{
                    transitionDuration: `${SIDEBAR_TICK_TRANSITION_MS}ms`,
                  }}
                />
                <h3
                  className={`text-[20px] transition-colors whitespace-nowrap ${
                    isActive ? " text-[#111111]" : "font-normal text-[#8A8A82]"
                  }`}
                  style={{
                    transitionDuration: `${SIDEBAR_TICK_TRANSITION_MS}ms`,
                  }}
                >
                  {item.title}
                </h3>
              </button>
            </div>
          );
        })}

        {/* Trailing minor ticks at the very end of the list */}
        <div className="flex flex-col items-start">
          <span aria-hidden className="ml-2 mb-3 h-px w-3 bg-[#E4E0D8]" />
          <span aria-hidden className="ml-2 h-px w-3 bg-[#E4E0D8]" />
        </div>
      </div>
    </nav>
  );
}

export default React.memo(SolutionsSidebar);
