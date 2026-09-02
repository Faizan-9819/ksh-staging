"use client";

import React, { useCallback, useState } from "react";
import { SOLUTIONS_TIMELINE_DATA } from "./solutionsData";
import SolutionsSidebar from "./SolutionsSidebar";
import SolutionCard from "./SolutionCard";
import { lenisScrollTo } from "@/components/ui/LenisProvider";

function SolutionsTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = useCallback((index: number) => {
    const target = SOLUTIONS_TIMELINE_DATA[index];
    if (!target) return;
    lenisScrollTo(`#solution-${target.id}`);
  }, []);

  return (
    <section
      aria-label="Our solutions"
      className="relative w-full bg-[#f8f8f8] py-16 md:py-24 lg:py-32"
    >
      <div className="fix flex flex-col gap-10 md:flex-row md:items-start md:gap-10 lg:gap-14">
        <SolutionsSidebar
          items={SOLUTIONS_TIMELINE_DATA}
          activeIndex={activeIndex}
          onSelect={handleSelect}
        />

        <div className="flex w-full flex-col gap-16 md:gap-[40px] lg:gap-[50px]">
          {SOLUTIONS_TIMELINE_DATA.map((item, index) => (
            <SolutionCard
              key={item.id}
              data={item}
              index={index}
              onActiveChange={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SolutionsTimeline;
