"use client";

import React, { useCallback, useRef, useState } from "react";
import { SOLUTIONS_TIMELINE_DATA } from "./solutionsData";
import SolutionsSidebar, {
  solutionPanelId,
  solutionTabId,
} from "./SolutionsSidebar";
import SolutionCard from "./SolutionCard";
import { lenisScrollTo } from "@/components/ui/LenisProvider";

// Keeps the panel's top just below the navbar, level with the sticky sidebar.
const PANEL_SCROLL_OFFSET_PX = -128;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const isVisible = (el: HTMLElement) => el.getClientRects().length > 0;

const getFocusables = (root: HTMLElement) =>
  Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    isVisible,
  );

function SolutionsTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  // Desktop behaves as tabs: the sidebar swaps which card is shown on the
  // right. If the user had scrolled down into a long card, bring the panel's
  // top back into view so the newly selected card starts from its heading.
  const handleSelect = useCallback((index: number) => {
    if (!SOLUTIONS_TIMELINE_DATA[index]) return;
    setActiveIndex(index);
    const panel = panelRef.current;
    if (panel && panel.getBoundingClientRect().top < -PANEL_SCROLL_OFFSET_PX) {
      lenisScrollTo(panel, { offset: PANEL_SCROLL_OFFSET_PX, force: true });
    }
  }, []);

  // Tab order on desktop: Land Acquisition → Capital Deployment → Project
  // Development → Built-to-Suit → Ready-to-Move → Leasing Management → …
  // i.e. after a tab, Tab visits that tab's own panel buttons (if any)
  // before moving on to the next tab, instead of running through all five
  // tabs first. Shift+Tab mirrors it. Focusing a tab selects it.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key !== "Tab") return;
    const target = e.target as HTMLElement;
    const items = SOLUTIONS_TIMELINE_DATA;
    const tabAt = (i: number) =>
      items[i] ? document.getElementById(solutionTabId(items[i].id)) : null;
    const ownTab = tabAt(activeIndex);
    if (!ownTab || !isVisible(ownTab)) return; // mobile: sidebar hidden

    const panel = document.getElementById(
      solutionPanelId(items[activeIndex].id),
    );
    const focusables = panel ? getFocusables(panel) : [];

    if (target === ownTab) {
      if (!e.shiftKey && focusables.length) {
        e.preventDefault();
        focusables[0].focus();
      }
      return;
    }

    if (!panel?.contains(target)) return;
    const nextTab = tabAt(activeIndex + 1);
    if (!e.shiftKey && target === focusables[focusables.length - 1] && nextTab) {
      e.preventDefault();
      nextTab.focus();
    } else if (e.shiftKey && target === focusables[0]) {
      e.preventDefault();
      ownTab.focus();
    }
  };

  return (
    <section
      aria-label="Our solutions"
      className="relative w-full bg-[#f8f8f8] py-16 md:py-24 lg:py-32"
      onKeyDown={handleKeyDown}
    >
      <div className="fix flex flex-col gap-10 md:flex-row md:items-start md:gap-10 lg:gap-14">
        <SolutionsSidebar
          items={SOLUTIONS_TIMELINE_DATA}
          activeIndex={activeIndex}
          onSelect={handleSelect}
          asTabs
        />

        {/* Below md the sidebar is hidden, so every card stays stacked */}
        <div
          ref={panelRef}
          className="flex w-full flex-col gap-16 md:gap-[40px] lg:gap-[50px]"
        >
          {SOLUTIONS_TIMELINE_DATA.map((item, index) => (
            <SolutionCard
              key={item.id}
              data={item}
              isActive={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SolutionsTimeline;
