// import Eyebrow from "@/components/AifComponents/Eyebrow";

const HIGHLIGHTS = [
  {
    icon: "/aif/keyHigh/first.svg",
    text: "Access to India’s high-growth Industrial infrastructure sector, supported by strong consumption trends and manufacturing-led demand",
  },
  {
    icon: "/aif/keyHigh/second.svg",
    text: "Backed by an established platform with an experienced leadership team and a proven track record across the investment lifecycle, with ~7 Mn. Sq. Ft. portfolio over 10+ years",
  },
  {
    icon: "/aif/keyHigh/third.svg",
    text: "Demonstrated track record of delivering over 23% IRR across marquee institutional partnerships",
  },
  {
    icon: "/aif/keyHigh/fourth.svg",
    text: "INR 1,250 Cr. Fund with 10% Sponsor commitment",
  },
  {
    icon: "/aif/keyHigh/fifth.svg",
    text: "Backed by a pipeline of high-quality, pre-identified assets with clear visibility on capital deployment",
  },
];

// Row 1 (3 items) and row 2 (2 items) are two independent grids stacked on
// top of each other, NOT one 3-col grid with auto-placed leftovers — row 2's
// divider sits at the halfway mark (its own 2-col grid), not at the 1/3 mark
// row 1's 3-col grid would produce.
//
// Row 1's cards have no top rule at all — nothing above the icons. Only
// row 2's cards get border-t, which forms the row1/row2 divider (2 cells
// @ 1/2 width each = a full-width line) plus their own border-b to close
// the bottom.
function HighlightCard({
  item,
  showTopBorder,
  showLeftBorder,
  showBottomBorder,
}: {
  item: { icon: string; text: string };
  showTopBorder: boolean;
  showLeftBorder: boolean;
  showBottomBorder: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-4 px-5 py-8 text-center sm:gap-5 sm:py-9 lg:py-10 ${
        showTopBorder ? "border-t border-[#000]" : ""
      } ${showLeftBorder ? "lg:border-l lg:border-[#000]" : ""} ${
        showBottomBorder ? "" : ""
      }`}
    >
      <img
        src={item.icon}
        alt=""
        className="h-12 w-12 flex-none object-contain sm:h-14 sm:w-14 lg:h-25 lg:w-25"
      />
      <p className="m-0 max-w-[280px] font-inter text-[16px] leading-[1.5] text-[#212121] lg:max-w-[300px]">
        {item.text}
      </p>
    </div>
  );
}

const ROW_1 = HIGHLIGHTS.slice(0, 3);
const ROW_2 = HIGHLIGHTS.slice(3);

export default function KeyHighlights() {
  return (
    <section className="bg-[#fff]">
      <div className="fix py-16 lg:pb-[88px] lg:pt-20">
        {/* <Eyebrow>Key Highlights</Eyebrow> */}
        <h2 className="mb-8 text-center font-sora text-[28px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#212121] sm:text-[36px] lg:mb-12 lg:text-[48px]">
          Key Highlights
        </h2>

        {/* Mobile/tablet: single stacked column — every item gets its own
            top divider (matches how a single-column list should read),
            container closes with a bottom rule under the last item */}
        <div className="grid grid-cols-1  lg:hidden">
          {HIGHLIGHTS.map((item) => (
            <HighlightCard
              key={item.text}
              item={item}
              showTopBorder
              showLeftBorder={false}
              showBottomBorder={false}
            />
          ))}
        </div>

        {/* Desktop: row 1 (3-col) stacked above row 2 (2-col, full width) */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3">
            {ROW_1.map((item, i) => (
              <HighlightCard
                key={item.text}
                item={item}
                showTopBorder={false}
                showLeftBorder={i !== 0}
                showBottomBorder={false}
              />
            ))}
          </div>
          <div className="grid grid-cols-2">
            {ROW_2.map((item, i) => (
              <HighlightCard
                key={item.text}
                item={item}
                showTopBorder
                showLeftBorder={i !== 0}
                showBottomBorder
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
