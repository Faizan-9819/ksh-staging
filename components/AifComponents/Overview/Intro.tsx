import Btn from "@/components/ui/Btn";

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-white">
      <img
        src="/aif/shared/brand-element-2.svg"
        alt=""
        className="pointer-events-none absolute -right-[200px] top-10 hidden w-[1100px] max-w-none opacity-35 sm:block lg:-right-[340px] lg:w-[1556px]"
      />
      <div className="relative fix py-16 sm:py-20 lg:pb-[100px] lg:pt-[88px]">
        {/* <div className="mb-6 flex items-center gap-2 lg:mb-[30px]">
          <span className="font-sora text-xs text-[#59624D]">{"//"}</span>
          <span className="font-sora text-xs uppercase tracking-[-0.02em] text-[#59624D]">
            An Integrated Fund &amp; Industrial Development Platform
          </span>
        </div> */}
        <h1 className="mb-10 font-sora text-[32px] font-semibold leading-none tracking-[-0.02em] text-[#212121] sm:text-[40px] lg:mb-[50px] lg:text-[52px]">
          Investing in India&rsquo;s Industrial Growth
        </h1>
        <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[550px_1fr] lg:gap-[72px]">
          <div className="h-[320px] w-full overflow-hidden rounded-[20px] bg-[#d5d5d5] shadow-[inset_0_0_0_1px_#e5e5e5] sm:h-[400px] lg:h-[480px] lg:w-[550px]">
            <img
              src="/aif/newSecondOverview.jpg"
              alt=""
              className="block h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 lg:pt-11">
            <p className="m-0 font-inter text-lg font-medium leading-[1.4] text-[#212121] sm:text-xl lg:text-2xl">
              KSH INFRA brings together capital strength and operational
              expertise across the entire Industrial Infrastructure lifecycle.
              Through an integrated platform spanning Fund Management,
              Investments, Development, Leasing, and Asset Management, we create
              and manage Grade A Industrial Parks with precision and purpose —
              from opportunity identification to asset stabilisation and value
              realisation.
            </p>
            <div className="mt-1.5 flex flex-wrap gap-3.5">
              <Btn
                label="Explore Fund Details"
                href="/investors/fund-I-details"
                bgColor="bg-[#212121]"
                hoverBgColor="bg-[#3a3a3a]"
                textColor="text-white!"
                hoverTextColor="text-white!"
                borderColor="border-[#212121]"
                arrowColor="stroke-white"
                hoverArrowColor="stroke-white"
                fontWeight="font-normal"
                filled
              />
              <Btn
                label="Contact Fund Team"
                href="/contact-us?enquiry=investor-relations#contact-form"
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
      </div>
    </section>
  );
}
