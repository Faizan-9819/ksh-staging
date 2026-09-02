"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRevealOnView } from "@/components/ui/useRevealOnView";

const HEADING_WORDS = ["We", "Make", "Leaders"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function WeMakeLeadersSection() {
  const containerRef = useRef<HTMLElement>(null);
  const greyRef = useRef<HTMLSpanElement>(null);
  const fixRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const leftImgReveal = useRevealOnView<HTMLDivElement>();
  const rightColReveal = useRevealOnView<HTMLDivElement>();
  const mobileImgReveal = useRevealOnView<HTMLDivElement>();

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
        s.style.color = i < fill ? "#212121" : "#BDAEA6";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Left image bleed to the true viewport edge — measured directly off
  // .fix's actual rendered position instead of a CSS calc() re-derivation
  // (Tailwind's arbitrary-value calc() and a plain CSS var calc() both
  // proved unreliable inside this flex layout at wide viewports, so this
  // reads the real gap and applies it as plain pixels instead).
  useEffect(() => {
    const update = () => {
      const fixEl = fixRef.current;
      const wrap = imgWrapRef.current;
      if (!fixEl || !wrap) return;
      const gap = fixEl.getBoundingClientRect().left;
      wrap.style.marginLeft = `-${gap}px`;
      wrap.style.width = `calc(100% + ${gap}px)`;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      ref={containerRef}
      id="we-make-leaders"
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
            stroke="url(#paint0_linear_wml_398)"
            strokeOpacity="0.2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_wml_398"
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

      {/* Global .fix container handling layout & spacing */}
      <div
        ref={fixRef}
        className="fix relative z-0! pt-[40px] sm:pt-[50px] lg:pt-[80px] pb-0 min-[1280px]:max-[1535px]:pb-[110px]"
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left Column: Title + Image (Desktop only) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between self-stretch">
            <div>
              {/* Title Container: word-by-word scroll color fill, same as OverviewAbout */}
              <h2 className="m-0 max-w-[439px] font-sora font-semibold text-[22px] xs:text-[26px] sm:text-[32px] xl:text-[34px] 2xl:text-[40px] leading-[1.15] tracking-[-0.8px]">
                <span ref={greyRef} className="block text-[#BDAEA6]">
                  {HEADING_WORDS.map((word, i) => (
                    <React.Fragment key={i}>
                      <span
                        data-w="1"
                        className="text-[#BDAEA6] [transition:color_.5s_ease] font-semibold inline-block"
                      >
                        {word}
                      </span>
                      {i < HEADING_WORDS.length - 1 ? " " : null}
                    </React.Fragment>
                  ))}
                </span>
              </h2>
            </div>

            {/* Left Image Wrapper: Desktop Only — bleeds to the true viewport
                edge; marginLeft/width are set imperatively in the effect
                above from .fix's real measured position. */}
            <motion.div
              ref={(node: HTMLDivElement | null) => {
                imgWrapRef.current = node;
                (leftImgReveal.ref as React.RefObject<HTMLDivElement | null>).current = node;
              }}
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={leftImgReveal.animate}
              className="hidden md:block overflow-hidden"
            >
              <img
                src="/career/seccareer.png"
                alt="KSH INFRA Leadership"
                className="w-full h-auto block object-cover object-left-bottom -mt-3"
              />
            </motion.div>
          </div>

          {/* Right Column: Paragraph Content */}
          <motion.div
            ref={rightColReveal.ref}
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={rightColReveal.animate}
            className="w-full lg:w-1/2 flex flex-col gap-6 font-inter self-stretch sm:pt-[0px] lg:pt-[30px] 2x:pt-[50px] min-[1280px]:max-[1535px]:pt-[50px]"
          >
            {/* Intro line */}
            <p className="m-0 font-sora text-[16px] sm:text-[24px] font-medium text-[#212121] leading-snug self-stretch">
              GROW WITH US. TRANSFORM THE WORLD!
            </p>

            {/* Body Paragraph 1 (bold/dark) */}
            <p className="m-0 text-[14px] sm:text-[16px] xl:text-[24px] font-medium leading-[140%] text-[#212121] self-stretch">
              Being part of the KSH INFRA team is more than just building
              modern Industrial & Logistics Parks. We create spaces built for
              tomorrow while respecting the natural environment.
            </p>

            {/* Body Paragraph 2 (bold/dark) */}
            <p className="m-0 text-[14px] sm:text-[16px] xl:text-[24px] font-medium leading-[140%] text-[#212121] self-stretch">
              Our team members bring enthusiasm and determination to every
              challenge. We go the extra mile to deliver real value to both
              our stakeholders and the environment.
            </p>

            {/* Body Paragraph 3 (muted) */}
            <p className="m-0 text-[13px] sm:text-[15px] xl:text-[20px] font-normal leading-[140%] text-[#4A4A4A] self-stretch">
              We collaborate to create meaningful assets that work better today
              while preparing for a sustainable future.
            </p>
          </motion.div>
        </div>

        {/* Mobile Image Wrapper: Placed after paragraphs column */}
        <motion.div
          ref={mobileImgReveal.ref}
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate={mobileImgReveal.animate}
          className="block md:hidden -ml-[24px] sm:-ml-[32px] w-[calc(100%+24px)] sm:w-[calc(100%+32px)] overflow-hidden mt-6"
        >
          <img
            src="/career/seccareer.png"
            alt="KSH INFRA Leadership"
            className="w-full h-auto block object-cover object-left-bottom -mt-3"
          />
        </motion.div>
      </div>
    </section>
  );
}
