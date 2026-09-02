"use client";

export default function CareerHeroSection() {
  return (
    <section
      className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-[#CBC4B5] font-[family:var(--font-inter),sans-serif] flex flex-col"
      style={{
        // @ts-ignore
        "--margin": "clamp(16px, 5.7vw, 80px)",
      }}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="career/careerHero/careernew.webp"
          alt="Careers at KSH INFRA"
          className="hidden lg:block w-full h-full object-cover object-center pointer-events-none select-none"
          draggable={false}
          loading="eager"
        />
        <img
          src="/career/careerHero/careerMobile.webp"
          alt="Careers at KSH INFRA"
          className="lg:hidden w-full h-full object-cover object-center pointer-events-none select-none"
          draggable={false}
          loading="eager"
        />
        {/* Subtle Dark Gradient Overlay for Vignette Effect */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" /> */}
      </div>

      {/* Great Place To Work badge — flush beneath the navbar logo, no gap */}
      <img
        src="/GPTWlogo.svg"
        alt="Great Place To Work"
        className="absolute z-30 top-[80px] lg:top-[87px] left-[7%] 2xl:left-[7%] 1920:left-[17%] h-auto w-[90px] sm:w-[100px] lg:w-[60px] pointer-events-none select-none"
        draggable={false}
      />

      {/* Watermark Text */}
      <h1
        className="absolute z-10 md:-bottom-8 -bottom-5 right-3 sm:right-4 lg:right-12 select-none pointer-events-none font-black text-[70px] sm:text-9xl md:text-[140px] lg:text-[230px] xl:text-[230px] 2xl:text-[200px] tracking-tight md:tracking-[-6px] lg:tracking-[-9.2px] text-white/80 opacity-75"
        aria-hidden="true"
      >
        Careers
      </h1>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full z-20 h-[50px] lg:h-[130px] bg-linear-to-t from-black to-transparent" />
    </section>
  );
}
