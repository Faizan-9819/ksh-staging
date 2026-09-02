import { Check } from "lucide-react";

interface CaseChallengesProps {
  intro: string;
  items: string[];
  closing?: string;
}

export default function CaseChallenges({
  intro,
  items,
  closing,
}: CaseChallengesProps) {
  return (
    <section
      className="relative w-full overflow-hidden pt-4 pb-16 sm:pb-20 md:pt-10 md:pb-24"
      style={{
        background: "linear-gradient(0deg, #F8F8F8 0%, #F8F8F8 100%), #FFF",
      }}
    >
      {/* Background Decorative Vector Arc */}
      <div className="absolute -left-40 top-1/3 w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full border border-gray-300/40 pointer-events-none" />

      <div className="fix relative z-10">
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6 max-w-[1050px] mx-auto">
          <h2 className="text-2xl sm:text-[32px] md:text-[48px] font-semibold text-[#1A1A1A] leading-[1.2]">
            CHALLENGES
          </h2>
          <p className="text-[15px] sm:text-[24px]  text-[#212121] leading-normal">
            {intro}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-20 gap-y-6 sm:gap-y-8 mt-8 sm:mt-14 max-w-[900px] mx-auto">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#59624D]">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </span>
              <span className="text-sm sm:text-base text-[#1A1A1A] leading-[1.5]">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {closing && (
          <p className="mt-8 sm:mt-16 max-w-[1100px] mx-auto text-center text-base sm:text-[24px] text-[#212121] leading-normal">
            {closing}
          </p>
        )}
      </div>
    </section>
  );
}
