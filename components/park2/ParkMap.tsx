"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HEADING_WORDS = [
  "KSH",
  "INFRA",
  "Parks:",
  "New",
  "Benchmarks",
  "of",
  "Logistics",
  "Efficiency",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function ParkMap() {
  const containerRef = useRef<HTMLElement>(null);
  const greyRef = useRef<HTMLSpanElement>(null);

  // Scroll color fill effect for title text
  useEffect(() => {
    const onScroll = () => {
      const el = greyRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const p = Math.max(
        0,
        Math.min(1, (vh * 1.02 - r.top) / (r.height + vh * 0.5)),
      );
      const spans = el.querySelectorAll<HTMLSpanElement>("span[data-w]");
      const fill = p * spans.length;
      spans.forEach((s, i) => {
        s.style.color = i < fill ? "#212121" : "#64635D";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-white overflow-hidden font-sora"
    >
      {/* Background SVG Curve Pattern */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 hidden lg:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="624"
          height="543"
          viewBox="0 0 624 543"
          fill="none"
          className="absolute left-[20%] top-[-10%] opacity-80"
        >
          <path
            opacity="0.7"
            d="M622.79 -353.941V347.598C622.79 347.598 637.164 542 428.316 542C219.468 542 233.842 347.598 233.842 347.598M233.631 347.598V-173.907C233.631 -173.907 248.005 -368.31 39.1573 -368.31C-169.691 -368.31 -155.317 -173.907 -155.317 -173.907L-154.683 345.907C-154.683 345.907 -140.309 540.31 -349.157 540.31C-558.005 540.31 -543.842 345.907 -543.842 345.907V-175.598C-543.842 -175.598 -529.468 -370 -738.316 -370C-947.164 -370 -932.79 -175.598 -932.79 -175.598"
            stroke="url(#paint0_linear_1124_398)"
            strokeOpacity="0.2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1124_398"
              x1="-155"
              y1="-370"
              x2="-155"
              y2="542"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#24314E" stopOpacity="0.2" />
              <stop offset="1" stopColor="#24314E" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Centre vertical divider line */}
      {/* <div className="absolute inset-y-0 left-1/2 w-px bg-gray-100 -translate-x-1/2 hidden lg:block z-0" /> */}

      {/* Global .fix container handling layout & spacing */}
      <div className="relative z-0 pt-[50px] lg:pt-[80px] pb-0">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* Left Column: Eyebrow + Title + Image matching width of 'Efficiency' text */}
          <div className="w-full lg:w-[60%] flex flex-col justify-between self-stretch">
            <div className="pl-[var(--container-gap)]">
              {/* Eyebrow */}
              <motion.div
                variants={fadeUp}
                custom={0}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="flex items-center gap-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6B7280] mb-4"
              >
                <span className="text-[#9CA3AF]">//</span>
                <span>AN INTEGRATED INDUSTRIAL INFRASTRUCTURE PLATFORM</span>
              </motion.div>

              {/* Title with Scroll Fill Animation */}
              <h2 className="m-0 font-sora font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em]">
                <span ref={greyRef} className="block text-[#64635D]">
                  {HEADING_WORDS.map((word, i) => (
                    <React.Fragment key={i}>
                      <span
                        data-w="1"
                        className="text-[#64635D] [transition:color_.5s_ease] font-bold inline-block"
                      >
                        {word}
                      </span>
                      {i === 2 ? <br /> : " "}
                    </React.Fragment>
                  ))}
                </span>
              </h2>
            </div>

            {/* Image stretched to match the full width of the left text block up to the right edge of 'Efficiency' */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-8 md:-mt-8 hidden md:block"
            >
              <img
                src="/park2new/secondsection.png"
                alt="KSH INFRA Building"
                className="w-full h-auto block object-cover object-bottom-left"
              />
            </motion.div>
          </div>

          {/* Right Column: Paragraph Content */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="w-full lg:w-[40%] flex flex-col gap-6 text-[#4B5563] font-sora pb-[50px] lg:pb-[80px] prcont"
          >
            {/* Lead Paragraph */}
            <p className="text-[18px] sm:text-[20px] lg:text-[22px] font-semibold text-[#212121] leading-[1.45]">
              KSH Chakan Park IV in Shinde, Pune exemplifies high-quality
              sustainable Industrial & Logistics infrastructure, setting new
              standards for environmental responsibility. The industrial park
              has earned IGBC pre-certified Platinum status, showcasing our deep
              commitment to green industrial development. Its thoughtful design
              and premium utilities create a workspace where your team can
              thrive.
            </p>

            {/* Body Paragraph 1 */}
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#555E6D]">
              This customizable, move-in ready facility ensures excellent
              productivity, efficiency, and safety for your workforce. We've
              considered every detail so you can focus on what matters
              most—running your business successfully.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
