// "use client";

// // Square marquee tile size matching the flat desktop aspect ratios across phone viewports fluidly.
// const TILE_SIZE_W = "clamp(150px, 42vw, 200px)";
// const TILE_SIZE_H = "clamp(95px, 26vw, 120px)";

// // Full loop durations (seconds) for each marquee row
// const ROW_DURATIONS: Record<"ltr" | "rtl", number> = {
//   ltr: 24,
//   rtl: 22,
// };

// function MarqueeRow({
//   icons,
//   direction,
//   isRowEven,
// }: {
//   icons: string[];
//   direction: "ltr" | "rtl";
//   isRowEven: boolean;
// }) {
//   // Duplicate the row so a -50% translate lines up perfectly with the start
//   // of the second copy — no visible gap or jump when the loop restarts.
//   const track = [...icons, ...icons];

//   return (
//     <div className="relative w-full overflow-hidden">
//       <div
//         className={`flex flex-nowrap items-stretch justify-start w-max ${
//           direction === "ltr" ? "animate-marquee-ltr" : "animate-marquee-rtl"
//         }`}
//         style={{ animationDuration: `${ROW_DURATIONS[direction]}s` }}
//       >
//         {track.map((icon, i) => {
//           // Checkerboard calculation matching the grid mapping logic
//           const isEvenCol = i % 2 === 0;
//           const isWhite = isRowEven ? isEvenCol : !isEvenCol;

//           return (
//             <div
//               key={`${icon}-${i}`}
//               className={`flex shrink-0 grow-0 items-center justify-center p-0 transition-colors ${
//                 isWhite ? "bg-white" : "bg-transparent"
//               }`}
//               style={{ width: TILE_SIZE_W, height: TILE_SIZE_H }}
//             >
//               <img
//                 src={icon}
//                 alt=""
//                 draggable={false}
//                 className="max-w-[105%] max-h-[100%] w-auto h-auto object-contain select-none pointer-events-none"
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default function TrustedOccupiersGrid({ rows }: { rows: string[][] }) {
//   // Mobile marquee data is derived from the same ICON_ROWS source split evenly across two rows.
//   const allIcons = rows.flat();
//   const marqueeRowA = allIcons.filter((_, i) => i % 2 === 0);
//   const marqueeRowB = allIcons.filter((_, i) => i % 2 !== 0);

//   // Chunk all icons into rows of 7 items for desktop
//   const desktopRows: string[][] = [];
//   for (let i = 0; i < allIcons.length; i += 7) {
//     desktopRows.push(allIcons.slice(i, i + 7));
//   }

//   return (
//     <>
//       {/* Desktop (lg+): 7-column checkerboard grid with centered last row */}
//       <div className="hidden lg:flex flex-col w-full">
//         {desktopRows.map((row, rowIdx) => {
//           const isLastRow = rowIdx === desktopRows.length - 1;

//           return (
//             <div
//               key={rowIdx}
//               className={`flex w-full flex-wrap ${
//                 isLastRow ? "justify-center" : "justify-start"
//               }`}
//             >
//               {row.map((icon, colIdx) => {
//                 const isEvenRow = rowIdx % 2 === 0;
//                 const isEvenCol = colIdx % 2 === 0;
//                 const isWhite = isEvenRow ? isEvenCol : !isEvenCol;

//                 return (
//                   <div
//                     key={`${icon}-${rowIdx}-${colIdx}`}
//                     className={`flex w-[calc(100%/7)] items-center justify-center transition-transform duration-300 ease-in-out ${
//                       isWhite ? "bg-white" : "bg-transparent"
//                     }`}
//                   >
//                     <img
//                       src={icon}
//                       alt=""
//                       className="max-w-[95%] h-auto object-contain"
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         })}
//       </div>

//       {/* Mobile (below lg): two checkerboard layout infinite marquee rows alternating cleanly */}
//       <div className="flex lg:hidden flex-col w-full overflow-hidden border-y border-[#24314E]/5 bg-[#F8F8F6]">
//         <MarqueeRow icons={marqueeRowA} direction="ltr" isRowEven={true} />
//         <MarqueeRow icons={marqueeRowB} direction="rtl" isRowEven={false} />
//       </div>

//       <style jsx global>{`
//         @keyframes marquee-ltr {
//           from {
//             transform: translateX(-50%);
//           }
//           to {
//             transform: translateX(0%);
//           }
//         }
//         @keyframes marquee-rtl {
//           from {
//             transform: translateX(0%);
//           }
//           to {
//             transform: translateX(-50%);
//           }
//         }
//         .animate-marquee-ltr {
//           animation-name: marquee-ltr;
//           animation-timing-function: linear;
//           animation-iteration-count: infinite;
//         }
//         .animate-marquee-rtl {
//           animation-name: marquee-rtl;
//           animation-timing-function: linear;
//           animation-iteration-count: infinite;
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .animate-marquee-ltr,
//           .animate-marquee-rtl {
//             animation: none;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

"use client";

// Square marquee tile size matching the flat desktop aspect ratios across phone viewports fluidly.
const TILE_SIZE_W = "clamp(150px, 42vw, 200px)";
const TILE_SIZE_H = "clamp(95px, 26vw, 120px)";

// Full loop durations (seconds) for each marquee row
const ROW_DURATIONS: Record<"ltr" | "rtl", number> = {
  ltr: 24,
  rtl: 22,
};

function MarqueeRow({
  icons,
  direction,
  isRowEven,
}: {
  icons: string[];
  direction: "ltr" | "rtl";
  isRowEven: boolean;
}) {
  // Duplicate the row so a -50% translate lines up perfectly with the start
  // of the second copy — no visible gap or jump when the loop restarts.
  const track = [...icons, ...icons];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex flex-nowrap items-stretch justify-start w-max ${
          direction === "ltr" ? "animate-marquee-ltr" : "animate-marquee-rtl"
        }`}
        style={{ animationDuration: `${ROW_DURATIONS[direction]}s` }}
      >
        {track.map((icon, i) => {
          // Checkerboard calculation matching the grid mapping logic
          const isEvenCol = i % 2 === 0;
          const isWhite = isRowEven ? isEvenCol : !isEvenCol;

          return (
            <div
              key={`${icon}-${i}`}
              className={`flex shrink-0 grow-0 items-center justify-center p-0 transition-colors ${
                isWhite ? "bg-white" : "bg-transparent"
              }`}
              style={{ width: TILE_SIZE_W, height: TILE_SIZE_H }}
            >
              <img
                src={icon}
                alt=""
                draggable={false}
                className="max-w-[105%] max-h-[100%] w-auto h-auto object-contain select-none pointer-events-none"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TrustedOccupiersGrid({ rows }: { rows: string[][] }) {
  // Mobile marquee data is derived from the same ICON_ROWS source split evenly across two rows.
  const allIcons = rows.flat();
  const marqueeRowA = allIcons.filter((_, i) => i % 2 === 0);
  const marqueeRowB = allIcons.filter((_, i) => i % 2 !== 0);

  // Chunk all icons into rows of COLS items for desktop.
  const COLS = 5;
  const desktopRows: string[][] = [];
  for (let i = 0; i < allIcons.length; i += COLS) {
    desktopRows.push(allIcons.slice(i, i + COLS));
  }

  return (
    <>
      {/* Desktop (lg+): COLS-column checkerboard grid, shorter last row centered as-is */}
      <div className="hidden lg:flex flex-col w-full">
        {desktopRows.map((row, rowIdx) => {
          const isEvenRow = rowIdx % 2 === 0;
          const isLastRow = rowIdx === desktopRows.length - 1;
          // When only 2 logos are left over in the final row, don't shrink +
          // center them as a pair — place them in the checkerboard's usual
          // white slots (2nd and 4th of 5 columns) so the row still reads as
          // a continuation of the checkerboard, with the other 3 columns
          // left blank (transparent, showing the section's own beige/white
          // gradient background) instead of white or empty space at the ends.
          const isPairLastRow = isLastRow && row.length === 2;
          // Same idea for exactly 3 leftover logos: center them in slots
          // 2/3/4 of 5, outer two white and the middle one transparent
          // (beige), instead of falling through to the plain column-parity
          // checkerboard math below.
          const isTripletLastRow = isLastRow && row.length === 3;

          return (
            <div
              key={rowIdx}
              className={`flex w-full ${isLastRow && !isPairLastRow && !isTripletLastRow ? "justify-center" : ""}`}
            >
              {isPairLastRow
                ? [0, 1, 2, 3, 4].map((slot) => {
                    const icon =
                      slot === 1 ? row[0] : slot === 3 ? row[1] : null;

                    return (
                      <div
                        key={slot}
                        className={`flex w-[calc(100%/5)] items-center justify-center transition-transform duration-300 ease-in-out ${
                          icon ? "bg-white" : "bg-transparent"
                        }`}
                      >
                        {icon && (
                          <img
                            src={icon}
                            alt=""
                            className="max-w-[95%] h-auto object-contain"
                          />
                        )}
                      </div>
                    );
                  })
                : isTripletLastRow
                  ? [0, 1, 2, 3, 4].map((slot) => {
                      const icon =
                        slot === 1
                          ? row[0]
                          : slot === 2
                            ? row[1]
                            : slot === 3
                              ? row[2]
                              : null;
                      const isWhite = slot === 1 || slot === 3;

                      return (
                        <div
                          key={slot}
                          className={`flex w-[calc(100%/5)] items-center justify-center transition-transform duration-300 ease-in-out ${
                            icon
                              ? isWhite
                                ? "bg-white"
                                : "bg-transparent"
                              : "bg-transparent"
                          }`}
                        >
                          {icon && (
                            <img
                              src={icon}
                              alt=""
                              className="max-w-[95%] h-auto object-contain"
                            />
                          )}
                        </div>
                      );
                    })
                  : row.map((icon, colIdx) => {
                      const isEvenCol = colIdx % 2 === 0;
                      const isWhite = isEvenRow ? isEvenCol : !isEvenCol;

                      return (
                        <div
                          key={`${icon}-${rowIdx}-${colIdx}`}
                          className={`flex w-[calc(100%/5)] items-center justify-center transition-transform duration-300 ease-in-out ${
                            isWhite ? "bg-white" : "bg-transparent"
                          }`}
                        >
                          <img
                            src={icon}
                            alt=""
                            className="max-w-[95%] h-auto object-contain"
                          />
                        </div>
                      );
                    })}
            </div>
          );
        })}
      </div>

      <div className="lg:flex flex-col hidden">
        <div className="pb-0 lg:pb-10 "></div>
        <p className="text-center text-[12px] mt-0 leading-[1.5] text-[#868686] mb-6">
          <span className="font-semibold text-[#868686]">Disclaimer:</span> All
          the logos featured above are owned by the respective organizations and
          KSH INFRA holds no claim or copyrights on them. They are indicative of
          past and present clients only.
        </p>
      </div>

      {/* Mobile (below lg): two checkerboard layout infinite marquee rows alternating cleanly */}
      <div className="flex lg:hidden flex-col w-full overflow-hidden border-y border-[#24314E]/5 bg-[#F8F8F6]">
        <MarqueeRow icons={marqueeRowA} direction="ltr" isRowEven={true} />
        <MarqueeRow icons={marqueeRowB} direction="rtl" isRowEven={false} />
      </div>
      <div className="lg:hidden flex-col flex">
        <div className="pt-5 "></div>
        <p className="text-center text-[12px] mt-0 leading-[1.5] text-[#868686] mb-6">
          <span className="font-semibold text-[#868686]">Disclaimer:</span> All
          the logos featured above are owned by the respective organizations and
          KSH INFRA holds no claim or copyrights on them. They are indicative of
          past and present clients only.
        </p>
      </div>
      <style jsx global>{`
        @keyframes marquee-ltr {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0%);
          }
        }
        @keyframes marquee-rtl {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-ltr {
          animation-name: marquee-ltr;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-marquee-rtl {
          animation-name: marquee-rtl;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-ltr,
          .animate-marquee-rtl {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
