"use client";

const BASE_LOGOS = [
  "/call.svg",
  "/uni.svg",
  "/apm.svg",
  "/htl.svg",
  "/mgh.svg",
  "/env.svg",
  "/jcb.svg",
  "/partners/row1/r12.png",
  "/partners/row1/r15.png",
  "/partners/row2/r21.png",
  "/partners/row2/r23.png",
  "/partners/row2/r24.png",
  "/partners/row2/r25.png",
  "/partners/row2/r26.png",
  "/partners/row2/r27.png",
  "/partners/row3/r32.png",
  "/partners/row3/r34.png",
  "/partners/row3/r35.png",
  "/partners/row3/r36.png",
  "/partners/row3/r37.png",
];
const MARQUEE = [...BASE_LOGOS, ...BASE_LOGOS];

export default function CaseStudiesMarquee() {
  return (
    <div className="ksh-marquee-wrap relative bg-white w-full border-t border-t-[#EDEDEA] border-b border-b-[#EDEDEA] overflow-hidden ">
      <div className="ksh-marquee-track flex w-max">
        {MARQUEE.map((logo, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[clamp(170px,14.2vw,205px)] h-[clamp(96px,9.3vw,134px)] flex items-center justify-center border-r border-r-[#EDEDEA]"
          >
            {/* <span className="font-[family-name:var(--font-sora),sans-serif] font-bold text-[clamp(16px,1.5vw,21px)] tracking-[0.04em] text-[#B6B6B0]">
              {logo}
            </span> */}
            <img src={logo} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
