// import Eyebrow from "@/components/AifComponents/Eyebrow";

const LIFECYCLE = [
  {
    title: "Invest",
    body: "Identify and underwrite opportunities through geographical focus, local market intelligence and on ground inputs through development team",
    hasArrow: true,
  },
  {
    title: "Develop",
    body: "Plan and build Grade A Industrial & Logistics Infrastructure with disciplined execution and control of cost, quality and timelines",
    hasArrow: true,
  },
  {
    title: "Lease",
    body: "Translate market understanding and client relationships to deliver best-in-class customised Grade A Industrial facilities",
    hasArrow: true,
  },
  {
    title: "Operate",
    body: "Disciplined asset management with clear focus on sustainable operations, high-quality occupier experiences, and long-term asset performance",
    hasArrow: true,
  },
  {
    title: "Realise value",
    body: "Position mature assets for long-term ownership, partnership or exit in line with the Fund's strategy",
    hasArrow: false,
  },
];

export default function Lifecycle() {
  return (
    <section className="bg-[#fbf2e8]">
      <div className="fix py-16 lg:pb-[90px] lg:pt-20">
        {/* <Eyebrow>Investment Lifecycle</Eyebrow> */}
        <h2 className="mb-10 font-sora text-[28px] font-semibold leading-none tracking-[-0.02em] text-[#212121] sm:text-[36px] lg:mb-14 lg:text-[48px]">
          Operating experience across <br /> the Industrial Infrastructure
          lifecycle.
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-7 lg:gap-y-0">
          {LIFECYCLE.map((step) => (
            <div key={step.title} className="flex flex-col gap-5">
              <div className="flex h-3 items-center gap-0">
                <span className="h-3 w-3 flex-none rounded-full bg-[#59624D]" />
                <span className="h-px flex-1 bg-[#d8d3c7]" />
                {step.hasArrow && (
                  <span className="-ml-1 h-2 w-2 flex-none rotate-45 border-r border-t border-[#b4ab97]" />
                )}
              </div>
              <div className="font-sora text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-[#212121]">
                {step.title}
              </div>
              <p className="m-0 font-inter text-base leading-[1.45] text-[#4a4a4a]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
