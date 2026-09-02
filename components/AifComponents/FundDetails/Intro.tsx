import Btn from "@/components/ui/Btn";

export default function Intro() {
  return (
    // <section className="bg-[#FBF2E8]">
    <section className="bg-[#fff]">
      <div className="fix py-16 lg:pb-[72px] lg:pt-[88px]">
        {/* <div className=""> */}
        {/* <div className="mb-6 flex items-center gap-2 lg:mb-[30px]">
          <span className="font-sora text-xs text-[#59624D]">{"//"}</span>
          <span className="font-sora text-xs uppercase tracking-[-0.02em] text-[#59624D]">
            Fund Details
          </span>
        </div> */}
        <h1 className="mb-7 max-w-full font-sora text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#212121] sm:text-[40px] lg:mb-8 lg:text-[52px]">
          Dedicated Industrial Logistics &amp; Warehousing Development AIF
        </h1>
        <p className="mb-7 font-inter text-lg font-medium leading-[1.4] text-[#212121] sm:text-xl lg:mb-8 lg:text-2xl">
          A Category II Alternative Investment Fund (AIF) with a target corpus
          of INR 1,250 Cr. focused on delivering stable, long-term returns
          through strategic investments in the development of Grade A Industrial
          Parks. The Fund is designed to capitalise on the growth of key
          Industrial ecosystems across Pune, Chennai, Bengaluru, and Mumbai,
          pioneering in the creation of high-quality, future-ready
          infrastructure that supports India’s expanding manufacturing and
          Industrial landscape.
        </p>
      </div>
    </section>
  );
}
