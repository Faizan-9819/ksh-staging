import Btn from "@/components/ui/Btn";

export default function CTA() {
  return (
    <section className="bg-[#212121]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-[60px] lg:py-20">
        <div>
          <h2 className="mb-4 font-sora text-[28px] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-[36px] lg:mb-[18px] lg:text-[44px]">
            Request information about Fund I
          </h2>
          <p className="m-0 max-w-[62ch] font-inter text-lg leading-[1.4] text-[#b7b7b7] lg:text-xl">
            Access to detailed Fund information may be limited to eligible
            investors and authorised advisors. Submit your details to begin the
            qualification process.
          </p>
          <p className="m-0 mt-5 max-w-[80%] border-l border-[#C5BDAC] pl-4 font-inter text-sm italic leading-[1.5] text-[#C5BDAC] lg:text-[15px]">
            *Nothing on this website constitutes an offer, solicitation or
            recommendation to invest in the Fund. Access and participation are
            subject to eligibility, documentation and applicable law.
          </p>
        </div>
        <Btn
          label="Request Fund Information"
          href="/contact-us?enquiry=investor-relations#contact-form"
          bgColor="bg-[#C5BDAC]"
          hoverBgColor="bg-[#d4cec1]"
          textColor="text-[#212121]!"
          hoverTextColor="text-[#212121]!"
          borderColor="border-[#C5BDAC]"
          arrowColor="stroke-[#212121]"
          hoverArrowColor="stroke-[#212121]"
          fontWeight="font-normal"
          className="flex-none"
          filled
        />
      </div>
    </section>
  );
}
