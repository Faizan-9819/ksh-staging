const SNAPSHOT_ACCENT_CARDS = [
  {
    label: "Fund size",
    value: "INR 1,250 Cr.",
    footnote: "INR 750 Cr. + INR 500 Cr. Greenshoe",
  },
  {
    label: "Fund tenure",
    value: "5.5 years",
    // footnote: "From initial close, extendable by 1+1 years",
    footnote: "From initial close",
  },
];

export default function FundSnapshot() {
  return (
    <section className="bg-[#FBF2E8]">
      <div className="fix py-16 lg:pb-20 lg:pt-[72px] border-b-2 border-gray-200">
        <h2 className="mb-8 font-sora text-[28px] font-bold leading-[1.05] tracking-[-0.02em] text-[#212121] sm:text-[36px] lg:mb-10 lg:text-[44px]">
          The Fund at a Glance
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SNAPSHOT_ACCENT_CARDS.map((card) => (
            <div
              key={card.label}
              className="rounded-[20px] p-[30px_28px_32px]"
              style={{
                backgroundColor: "#c5bdac",
                backgroundImage:
                  "linear-gradient(152deg, rgba(219,212,195,0) 40%, rgba(219,212,195,.75) 50%, rgba(219,212,195,0) 60%), linear-gradient(152deg, rgba(219,212,195,0) 58%, rgba(219,212,195,.6) 68%, rgba(219,212,195,0) 78%)",
              }}
            >
              <div className="mb-4 font-sora text-xs uppercase tracking-[-0.02em] text-[#4a4335]">
                {card.label}
              </div>
              <div className="font-sora text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-[#212121]">
                {card.value}
              </div>
              <div className="mt-2.5 border-t border-[rgba(33,33,33,0.28)] pt-2.5 font-inter text-base leading-[1.4] text-[#3a3a3a]">
                {card.footnote}
              </div>
            </div>
          ))}

          <div
            className="rounded-[20px] p-[30px_28px_32px]"
            style={{
              backgroundColor: "#c5bdac",
              backgroundImage:
                "linear-gradient(152deg, rgba(219,212,195,0) 40%, rgba(219,212,195,.75) 50%, rgba(219,212,195,0) 60%), linear-gradient(152deg, rgba(219,212,195,0) 58%, rgba(219,212,195,.6) 68%, rgba(219,212,195,0) 78%)",
            }}
          >
            <div className="mb-4 font-sora text-xs uppercase tracking-[-0.02em] text-[#4a4335]">
              Target returns (indicative)
            </div>
            <div className="font-sora text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-[#212121]">
              ~25% IRR
            </div>
            <div className="mt-2.5 border-t border-[rgba(33,33,33,0.28)] pt-2.5 font-inter text-base leading-[1.4] text-[#3a3a3a]">
              Gross Asset Level
            </div>
          </div>

          <div
            className="rounded-[20px] p-[30px_28px_32px]"
            style={{
              backgroundColor: "#c5bdac",
              backgroundImage:
                "linear-gradient(152deg, rgba(219,212,195,0) 40%, rgba(219,212,195,.75) 50%, rgba(219,212,195,0) 60%), linear-gradient(152deg, rgba(219,212,195,0) 58%, rgba(219,212,195,.6) 68%, rgba(219,212,195,0) 78%)",
            }}
          >
            <div className="mb-4 font-sora text-xs uppercase tracking-[-0.02em] text-[#4a4335]">
              Vehicle
            </div>
            <div className="font-sora text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-[#212121]">
              KSH INFRA Industrial, Logistics and Warehousing AIF
            </div>
          </div>

          <div
            className="rounded-[20px] p-[30px_28px_32px]"
            style={{
              backgroundColor: "#c5bdac",
              backgroundImage:
                "linear-gradient(152deg, rgba(219,212,195,0) 40%, rgba(219,212,195,.75) 50%, rgba(219,212,195,0) 60%), linear-gradient(152deg, rgba(219,212,195,0) 58%, rgba(219,212,195,.6) 68%, rgba(219,212,195,0) 78%)",
            }}
          >
            <div className="mb-4 font-sora text-xs uppercase tracking-[-0.02em] text-[#4a4335]">
              Category
            </div>
            <div className="font-sora text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-[#212121]">
              Category II AIF
            </div>
            <div className="mt-3 font-inter text-sm leading-[1.4] text-[#4a4a4a]">
              SEBI Registration Number: IN/AIF2/26-27/2209
            </div>
          </div>

          <div
            className="rounded-[20px] p-[30px_28px_32px]"
            style={{
              backgroundColor: "#c5bdac",
              backgroundImage:
                "linear-gradient(152deg, rgba(219,212,195,0) 40%, rgba(219,212,195,.75) 50%, rgba(219,212,195,0) 60%), linear-gradient(152deg, rgba(219,212,195,0) 58%, rgba(219,212,195,.6) 68%, rgba(219,212,195,0) 78%)",
            }}
          >
            <div className="mb-4 font-sora text-xs uppercase tracking-[-0.02em] text-[#4a4335]">
              Target markets
            </div>
            <div className="font-sora text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-[#212121]">
              Pune, Chennai, Bengaluru and Mumbai
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
