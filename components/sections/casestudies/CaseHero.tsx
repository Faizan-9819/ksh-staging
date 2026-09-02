"use client";

interface CaseHeroProps {
  companyName: string;
  backgroundImage: string;
}

export default function CaseHero({
  companyName,
  backgroundImage,
}: CaseHeroProps) {
  return (
    <section
      className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-[#0F1D3A] font-[family:var(--font-inter),sans-serif] flex flex-col"
      style={{
        // @ts-ignore
        "--margin": "clamp(16px, 5.7vw, 80px)",
      }}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={`KSH INFRA facility built for ${companyName}`}
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          draggable={false}
          loading="eager"
        />
        {/* Subtle Dark Gradient Overlay for Vignette Effect */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" /> */}
      </div>

      {/* Watermark Text */}
      <h1
        className="absolute z-10 md:-bottom-8 -bottom-5 right-3 sm:right-4 lg:right-12 select-none pointer-events-none font-black text-[70px] sm:text-9xl md:text-[140px] lg:text-[230px] xl:text-[230px] 2xl:text-[200px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px] text-white/60 opacity-85"
        aria-hidden="true"
      >
        {companyName}
      </h1>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full z-20 h-[50px] lg:h-[100px] bg-linear-to-t from-black to-transparent" />
    </section>
  );
}
