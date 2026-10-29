import Image from "next/image";

interface CaseAboutProps {
  heading: string;
  paragraphs: string[];
}

export default function CaseAbout({ heading, paragraphs }: CaseAboutProps) {
  return (
    <section className="relative w-full min-h-[480px] bg-[#FAF9F6] text-[#333333] overflow-hidden py-16 sm:py-20 md:py-24">
      {/* Background Image applied to parent section */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
        <Image
          src="/casestudies/caseabout.webp"
          alt="Background Pattern"
          fill
          priority
          className="object-cover object-right-top"
        />
      </div>

      {/* Background Decorative Vector Arcs */}
      <div className="absolute -right-20 -top-32 w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] rounded-full border border-gray-300/40 pointer-events-none" />
      <div className="absolute right-10 -top-10 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full border border-gray-300/30 pointer-events-none" />

      {/* Main Content Container using "fix" class */}
      <div className="fix relative z-10 flex flex-col justify-center">
        {/* Subtitle / Tag */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <span className="text-[#6B7280] font-medium text-xs sm:text-sm tracking-wider">
            {"//"}
          </span>
          <p className="text-[#6B7280] font-medium text-xs sm:text-sm uppercase tracking-widest">
            AN INTEGRATED INDUSTRIAL INFRASTRUCTURE PLATFORM
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1A1A1A] tracking-tight leading-[1.15] mb-8 sm:mb-10">
          {heading}
        </h2>

        {/* Paragraph Content */}
        <div className="space-y-6 text-[#4A4A4A] text-sm sm:text-base md:text-[17px] leading-relaxed font-normal">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
