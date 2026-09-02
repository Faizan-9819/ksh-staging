// "use client";

// import React, { useCallback, useState } from "react";
// import { SOLUTIONS_TIMELINE_DATA } from "./TestiData";
// import SolutionsSidebar from "../solutions/SolutionsSidebar";
// import SolutionCard from "../solutions/SolutionCard";
// import { lenisScrollTo } from "@/components/ui/LenisProvider";

// function TestiScroll() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleSelect = useCallback((index: number) => {
//     const target = SOLUTIONS_TIMELINE_DATA[index];
//     if (!target) return;
//     lenisScrollTo(`#solution-${target.id}`);
//   }, []);

//   return (
//     <section
//       aria-label="Our solutions"
//       className="relative w-full bg-[#f8f8f8] py-16 md:py-24 lg:py-32"
//     >
//       <div className="fix flex flex-col gap-10 md:flex-row md:items-start md:gap-10 lg:gap-14">
//         <SolutionsSidebar
//           items={SOLUTIONS_TIMELINE_DATA}
//           activeIndex={activeIndex}
//           onSelect={handleSelect}
//         />

//         <div className="flex w-full flex-col gap-16 md:gap-[40px] lg:gap-[50px]">
//           {SOLUTIONS_TIMELINE_DATA.map((item, index) => (
//             <SolutionCard
//               key={item.id}
//               data={item}
//               index={index}
//               onActiveChange={setActiveIndex}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default TestiScroll;

//
//
//

"use client";

import React, { useCallback, useState } from "react";
import { SOLUTIONS_TIMELINE_DATA } from "./TestiData";
import SolutionsSidebar from "../solutions/SolutionsSidebar";
import TestimonialCard from "./TestimonialCard";
import {
  lenisScrollTo,
  suppressScrollHijack,
} from "@/components/ui/LenisProvider";

function TestiScroll() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = useCallback((index: number) => {
    const target = SOLUTIONS_TIMELINE_DATA[index];
    if (!target) return;
    // A click can jump across several cards at once — suppress their
    // viewport-based onActiveChange calls for the duration of the jump so
    // the sidebar snaps straight to the clicked item instead of flickering
    // through every card it scrolls past (which also stutters the sticky
    // sidebar itself, since each intermediate update re-renders the tree).
    suppressScrollHijack();
    setActiveIndex(index);
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
          topOffset={100}
          tickSpacingClassName="mb-3"
          contentClassName="p-5 pt-10 lg:p-6 lg:pt-12"
          navClassName="sticky hidden shrink-0 flex-col h-full self-start md:flex md:w-[80px] lg:w-[180px] 2xl:w-[220px]"
        />

        <div className="flex w-full flex-col gap-8 md:gap-[40px] lg:gap-[50px]">
          {SOLUTIONS_TIMELINE_DATA.map((item, index) => (
            <TestimonialCard
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

export default TestiScroll;
