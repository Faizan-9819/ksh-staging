import { InvestorsDisclaimer } from "@/components/sections/Investor/ExistingInvestorsSection";

const PARTNERS = [
  {
    logo: "logo-wsb.png",
    name: "WSB Real Estate Partners",
    place: "India",
    lines: [
      "74:26 JV partnership for Hosur Park I, along with 19 co-investors",
      "1.3 Mn. Sq. Ft. in Hosur near Bengaluru",
      "Proven capability in managing complex multi-investor structures",
    ],
    tag: "Under development",
  },
  {
    logo: "logo-indospace.png",
    name: "IndoSpace",
    place: "Singapore",
    lines: [
      "90:10 JV partnership for Chakan Park III",
      "1.5 Mn. Sq. Ft. developed and leased under the KSH INFRA brand",
      "Expected IRR of >30% on exit",
    ],
    tag: "Fully operational",
  },
  {
    logo: "logo-mapletree.png",
    name: "Mapletree",
    place: "Singapore",
    lines: [
      "Forward sale transaction for Chakan Park II",
      "1.2 Mn. Sq. Ft. developed and leased.",
      "Demonstrated resilience and execution excellence, delivering through unprecedented challenges (delivered during peak COVID-19)",
    ],
    tag: "Successfully exited",
  },
  {
    logo: "logo-morgan-stanley.png",
    name: "Morgan Stanley Real Estate Investing",
    place: "USA",
    lines: [
      "95:5 JV partnership in operating assets for Chakan Park I",
      "30% IRR at exit to Mapletree",
      "Proven asset management and value creation capability across the asset lifecycle",
    ],
    tag: "Successfully exited",
  },
  {
    logo: "logo-pacific-century.png",
    name: "Pacific Century Group",
    place: "Hong Kong",
    lines: [
      "Strategic Long Term JV",
      "Invested in KSH's first two industrial parks (~1 Mn. Sq. Ft.)",
      "11+ years partnership with 23% IRR at exit",
    ],
    tag: "Long Term partnership",
  },
];

export default function StrategicPartners() {
  return (
    <section className="bg-[#FBF5EE]">
      <div className="fix py-16 lg:pb-20 lg:pt-[72px]">
        <h2 className="mb-5 font-sora text-[28px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#212121] sm:text-[36px] lg:text-[44px]">
          Strategic Partners
        </h2>
        <p className="mb-9 max-w-[80ch] font-inter text-lg leading-[1.4] text-[#4a4a4a] lg:text-xl">
          KSH INFRA has successfully traversed the journey from development to
          exit with global institutional investors, across varied JV structures,
          delivering attractive returns.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col rounded-[20px] bg-white"
            >
              <div className=" bg-white p-5 rounded-t-2xl w-full flex items-center justify-center">
                <div className="relative bg-[#FBF5EE] py-6 w-full rounded-2xl px-2 h-fit">
                  <img
                    src={`/aif/overview/${partner.logo}`}
                    alt={`${partner.name} logo`}
                    className="block h-fit w-auto object-contain object-left"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 px-4 pb-6 min-[1441px]:gap-[17px] min-[1441px]:px-5 min-[1441px]:pb-7">
                {/* Glassmorphic Location Badge */}
                <div className="w-fit rounded-full bg-[#5E6E4E]/20 px-3 pt-[3px] pb-1 backdrop-blur-md border border-black/10 min-[1441px]:px-[15px]">
                  <span className="font-inter text-[11px] font-normal tracking-wider text-[#4a4a4a] uppercase min-[1441px]:text-xs">
                    {partner.place}
                  </span>
                </div>

                {/* Bulleted List */}
                <ul className="space-y-2.5 font-inter text-[12px] leading-[1.35] text-[#4a4a4a] min-[1441px]:space-y-4 min-[1441px]:text-[13.5px] min-[1441px]:leading-[1.4]">
                  {partner.lines.map((line, i) => (
                    <li
                      key={i}
                      className="relative pl-3.5 before:absolute before:left-0 before:top-[6px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#4a4a4a] min-[1441px]:pl-4"
                    >
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2 font-sora text-[11px] uppercase tracking-[-0.02em] text-[#5E6E4E] min-[1441px]:text-xs">
                  {partner.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
        <InvestorsDisclaimer />
      </div>
    </section>
  );
}
