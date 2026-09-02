import Image from "next/image";

interface CaseOutcomeProps {
  paragraphs: string[];
}

export default function CaseOutcome({ paragraphs }: CaseOutcomeProps) {
  return (
    <section className="relative w-full min-h-[400px] md:min-h-[430px] flex items-center justify-center px-4 py-16 md:py-24 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/casestudies/caseCTA.webp"
          alt="Infrastructure Background"
          fill
          priority
          className="object-cover"
        />
        {/* Subtle overlay to ensure the background isn't too overpowering, matching the screenshot's faded look */}
        <div className="absolute inset-0 bg-white/40"></div>
      </div>

      {/* Middle Card */}
      <div className="relative z-10 w-full max-w-[990px] bg-white rounded-[20px] shadow-[0_4px_54px_0_rgba(0,0,0,0.10)] px-6 py-5 sm:px-6 sm:py-8 md:px-20 md:py-10 text-center mx-auto">
        {/* Title */}
        <h2 className="text-[#212121] font-semibold text-[27px] sm:text-[40px] md:text-[48px] mb-4 md:mb-6 uppercase tracking-tight">
          Outcome
        </h2>

        {/* Paragraphs */}
        <div className="space-y-4 max-w-[730px] mx-auto">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[#212121] font-normal text-[15px] sm:text-[16px] md:text-[24px] leading-[140%]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
