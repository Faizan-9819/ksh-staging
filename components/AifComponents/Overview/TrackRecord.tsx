const TRACK_RECORD_STATS = [
  {
    value: "~07 Mn. Sq. Ft.",
    label: "Across 07 projects",
    footnote:
      "<ul class='flex flex-col gap-2 '><li>> INR 2,000 Cr. Invested</li><li>04 Mn. Sq. Ft. Delivered</li></ul>",
  },
  {
    value: "25+ Clients",
    label: "",
    footnote:
      "Strong relationships across major manufacturing & Industrial tenants",
  },
  {
    value: ">23%",
    label: "IRR on delivered projects",
    footnote: "04 successful exits",
  },
  {
    value: "05",
    label: "Institutional partnerships",
    footnote: "Pacific Century, Morgan Stanley REI, Mapletree, IndoSpace, WSB",
  },
];

export default function TrackRecord() {
  return (
    <section className="">
      <div className="bg-[#fbf2e8]">
        <div className="fix border-t-2 border-gray-300 py-14 lg:py-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRACK_RECORD_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-[26px_24px_28px]"
                style={{
                  backgroundColor: "#c5bdac",
                  backgroundImage:
                    "linear-gradient(152deg, rgba(219,212,195,0) 40%, rgba(219,212,195,.75) 50%, rgba(219,212,195,0) 60%), linear-gradient(152deg, rgba(219,212,195,0) 58%, rgba(219,212,195,.6) 68%, rgba(219,212,195,0) 78%)",
                }}
              >
                <div className="font-sora text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#212121]">
                  {stat.value}
                </div>
                <div className="mt-2 font-inter text-base leading-[1.4] text-[#3a3a3a] h-[22.4px]">
                  {stat.label}
                </div>
                <div
                  className="mt-4 border-t border-[rgba(33,33,33,0.28)] pt-3 font-inter text-sm leading-[1.4] text-[#4a4335]"
                  dangerouslySetInnerHTML={{ __html: stat.footnote }}
                ></div>
              </div>
            ))}
          </div>
          {/* <p className="m-0 mt-7 max-w-[130ch] font-inter text-sm leading-[1.5] text-[#6d6d6d]">
            Basis of preparation: gross deal level returns, pre-fund level fee,
            promote and taxes; deal level returns are net of all project level
            costs including approval costs, construction costs and fees which
            may be paid to vendors, consultants or brokers, including an
            affiliate of KSH INFRA. Returns are subject to market risks and
            there is no guarantee of achieving target returns or protection of
            capital; please refer scheme documentation for a detailed account of
            risks. Estimated IRR based on KSH INFRA&rsquo;s underwriting.
          </p> */}
        </div>
      </div>
    </section>
  );
}
