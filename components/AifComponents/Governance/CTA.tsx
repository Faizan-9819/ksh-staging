import Btn from "@/components/ui/Btn";

export default function CTA() {
  return (
    <section className="bg-[#212121]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-6 py-14 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-[60px] lg:py-[72px]">
        <div>
          <h2 className="m-0 max-w-[34ch] font-sora text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[32px] lg:text-[40px]">
            Request the governance and Fund information relevant to your
            diligence.
          </h2>
          <p className="m-0 mt-5 max-w-[80%] border-l border-[#C5BDAC] pl-4 font-inter text-sm italic leading-[1.5] text-[#C5BDAC] lg:text-[15px]">
            *Nothing on this website constitutes an offer, solicitation or
            recommendation to invest in the Fund. Access and participation are
            subject to eligibility, documentation and applicable law.
          </p>
        </div>
        <Btn
          label="Contact Fund Team"
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
