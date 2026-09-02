"use client";

import Image from "next/image";
import { usePageTransition } from "@/components/ui/PageTransitionContext";
import Btn from "@/components/ui/Btn";

function SolutionsCTA() {
  const { navigate } = usePageTransition();

  return (
    <section
      aria-label="Enquire now"
      className="relative w-full overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <Image
        src="/solutions/sol-cta.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />

      <div className="fix relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between px-6 lg:px-12">
        <h2 className="max-w-[680px] text-[28px] font-semibold tracking-[-1px] leading-[1.2] text-[#212121] md:text-[36px] lg:text-[48px]">
          Let&apos;s co-create the right solution for your business
        </h2>

        <div className="shrink-0 w-full md:w-auto">
          <Btn
            label="Enquire Now"
            onClick={() => navigate("/contact-us")}
            bgColor="bg-[#fff]!"
            hoverBgColor="bg-[#4a5240]"
            textColor="text-[#59624D] font-normal! "
            hoverTextColor="text-white"
            textSize="text-[20px]!"
            arrowColor="stroke-[#59624D]"
            hoverArrowColor="stroke-white"
            borderColor="border-transparent"
            className="w-full sm:w-auto inline-flex items-center lg:ps-16! lg:pr-14! justify-between! lg:gap-6! lg:gap-x-22!  py-4 lg:px-10 lg:py-5 text-[16px] lg:text-[20px]! rounded-full hover:font-normal! font-normal! cursor-pointer  border-none! whitespace-nowrap"
          />
        </div>
      </div>
    </section>
  );
}

export default SolutionsCTA;
