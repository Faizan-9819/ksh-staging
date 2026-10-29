"use client";

import React, { useRef } from "react";
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
  /** Accessible name of the <nav> landmark. */
  ariaLabel?: string;
  /**
   * Render as an ARIA tablist (Solutions page, where each item swaps the
   * panel beside it). Every tab stays in the Tab order and selects itself on
   * focus; Arrow keys / Home / End also move between tabs. Hopping from a
   * tab into its panel's buttons is handled by SolutionsTimeline. Panels
   * must use the id from `solutionPanelId`.
   */
  asTabs?: boolean;
}

export const solutionTabId = (id: string) => `solution-tab-${id}`;
export const solutionPanelId = (id: string) => `solution-${id}`;

function SolutionsSidebar({
  items,
  activeIndex,
  onSelect,
  topOffset = SIDEBAR_STICKY_TOP_PX,
  tickSpacingClassName = "mb-7",
  contentClassName = "p-5 lg:p-6 mt-2",
  navClassName = SIDEBAR_NAV_CLASS_NAME,
  ariaLabel = "Solutions timeline",
  asTabs = false,
}: SolutionsSidebarProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = items.length - 1;
    let next: number;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      next = index === last ? 0 : index + 1;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      next = index === 0 ? last : index - 1;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = last;
    } else {
      return;
    }
    e.preventDefault();
    onSelect(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <nav
      aria-label={ariaLabel}
      className={navClassName}
      style={{ top: topOffset }}
    >
      <div
        className={`rounded-[28px] bg-white ${contentClassName}`}
        {...(asTabs
          ? {
              role: "tablist",
              "aria-label": ariaLabel,
              "aria-orientation": "vertical" as const,
            }
          : {})}
      >
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
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                onClick={() => onSelect(index)}
                {...(asTabs
                  ? {
                      id: solutionTabId(item.id),
                      role: "tab",
                      "aria-selected": isActive,
                      "aria-controls": solutionPanelId(item.id),
                      onFocus: () => {
                        if (!isActive) onSelect(index);
                      },
                      onKeyDown: (e: React.KeyboardEvent) =>
                        handleTabKeyDown(e, index),
                    }
                  : { "aria-current": isActive ? ("step" as const) : undefined })}
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
