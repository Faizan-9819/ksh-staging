import Eyebrow from "@/components/AifComponents/Eyebrow";
import Btn from "@/components/ui/Btn";

const INVESTMENT_CRITERIA = [
  "Focus on Grade A Industrial & Logistics infrastructure assets",
  "Investments aligned with priority markets defined within the Fund Mandate",
  "Sites demonstrating credible access, supporting infrastructure, clear entitlements, and viable development pathways",
  "Demand underpinned by manufacturing, logistics, and broader supply chain activity",
  "Opportunities where KSH INFRA’s development and operating capabilities can add meaningful value",
  "Risk-return profiles aligned with the Fund’s stated objectives and formal documentation",
];

export default function InvestmentCriteria() {
  return (
    <section className="bg-[#fbf2e8]">
      <div className="fix py-16 lg:py-[90px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-[107px]">
          <div>
            <Eyebrow>Investment criteria</Eyebrow>
            <ul className="m-0 mt-6 list-none p-0 lg:mt-4">
              {INVESTMENT_CRITERIA.map((item, i) => (
                <li
                  key={item}
                  className={`border-t border-[#e9e9e9] py-4 font-inter text-base leading-[1.4] text-[#212121] ${
                    i === INVESTMENT_CRITERIA.length - 1 ? "border-b" : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="relative mb-9 h-[240px] overflow-hidden rounded-[20px] bg-[#d5d5d5] shadow-[inset_0_0_0_1px_#e5e5e5] sm:h-[320px]">
              <div className="flex h-full w-full items-center justify-center px-6 text-center font-inter text-sm text-[#8f8f8f]">
                Minimal India map &mdash; Pune, Mumbai, Chennai, Bengaluru
              </div>
            </div>
            <Eyebrow>Risk and governance</Eyebrow>
            <h2 className="mb-4 font-sora text-2xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#212121] lg:text-[32px]">
              Disciplined investment decisions
            </h2>
            <p className="mb-6 font-inter text-lg leading-[1.4] text-[#4a4a4a] lg:text-xl">
              Each opportunity follows a clear and structured process for
              evaluation, approval, monitoring, and conflict management.
              While an overview of the governance framework is shared
              publicly, detailed roles, authorities, and thresholds are
              outlined within the Fund’s formal documentation, ensuring
              transparency and clarity for investors.
            </p>
            <Btn
              label="Understand Governance"
              href="/investors/governance"
              bgColor="bg-transparent"
              hoverBgColor="bg-[#f5f4f0]"
              textColor="text-[#212121]!"
              hoverTextColor="text-[#212121]!"
              borderColor="border-[#212121]"
              arrowColor="stroke-[#212121]"
              hoverArrowColor="stroke-[#212121]"
              fontWeight="font-normal"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
