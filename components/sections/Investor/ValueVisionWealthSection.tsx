"use client";

import React from "react";
import Image from "next/image";

export default function ValueVisionWealthSection() {
  return (
    <section
      className="relative w-full bg-white overflow-hidden py-12 sm:py-16 lg:py-24"
      style={{
        // Dynamic horizontal page padding system
        // @ts-ignore
        "--margin": "clamp(16px, 5.7vw, 80px)",
      }}
    >
      {/* Background Architectural Vector Rings */}
      <div className="absolute right-[5%] top-[-10%] w-[500px] sm:w-[600px] lg:w-[700px] aspect-square pointer-events-none opacity-40 z-0">
        <svg
          viewBox="0 0 700 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="350" cy="350" r="320" stroke="#E2E2E2" strokeWidth="1" />
          <circle cx="480" cy="220" r="280" stroke="#E2E2E2" strokeWidth="1" />
        </svg>
      </div>

      <div
        className="relative z-10 max-w-[1440px] mx-auto w-full flex flex-col"
        style={{
          paddingLeft: "var(--margin)",
          paddingRight: "var(--margin)",
        }}
      >
        {/* Top Tagline */}
        {/* <div className="flex items-center gap-1.5 text-[#868686] mb-2 sm:mb-3">
          <span className="text-[12px] sm:text-[14px] font-mono tracking-tight">
            //
          </span>
          <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.12em] uppercase font-[family:var(--font-inter),sans-serif]">
            AN INTEGRATED INDUSTRIAL INFRASTRUCTURE PLATFORM
          </span>
        </div> */}

        {/* Section Title */}
        <h2
          className="font-[family:var(--font-sora),sans-serif] text-[#212121] font-semibold tracking-[-1.04px] mb-8 sm:mb-12 lg:mb-16"
          style={{
            fontSize: "clamp(28px, 4.1vw, 52px)",
            lineHeight: "1.1",
          }}
        >
          Trusted by Global Investors. <br /> Proven Through Execution.
        </h2>

        {/* Content Row: Image + Text Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Responsive Image */}
          <div className="lg:col-span-6 xl:col-span-6 w-full">
            <div className="relative w-full max-w-[720px] aspect-[238/159] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-gray-200 shadow-sm">
              <Image
                src="/Investor/ValueVisionWealthSection/InvestorImage.png"
                alt="Corporate Handshake Partnership"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover object-center w-full h-full"
              />
            </div>
          </div>

          {/* Right Column: Paragraph Block */}
          <div className="lg:col-span-6 xl:col-span-6 w-full flex flex-col gap-4 sm:gap-[20px] items-start self-stretch pt-0 lg:pt-2">
            {/* Heading */}

            {/* Paragraph 1 */}
            <p
              className="font-[family:var(--font-inter),sans-serif] text-[#212121] font-normal leading-[150%] self-stretch"
              style={{
                fontSize: "clamp(14px, 1.5vw, 18px)",
              }}
            >
              {/* KSH INFRA has earned the confidence of leading global
              institutional investors through its proven track record in
              developing and delivering Grade A industrial and logistics
              infrastructure. With over{" "}
              <strong className="font-bold">4 million sq. ft.</strong>{" "}
              delivered for global manufacturers including{" "}
              <strong className="font-bold">
                Kawasaki Motors, Jabil, Faurecia, Gedia, Rieter, Linamar,
                Saleri and Kimberly-Clark
              </strong>
              , we combine investment discipline with execution excellence
              across the industrial asset lifecycle. */}
              KSH INFRA has established a strong track record of partnering with
              global institutional investors to develop, operate and exit Grade
              A Industrial Assets across India’s key industrial markets.
            </p>

            {/* Paragraph 2 */}
            <p
              className="font-[family:var(--font-inter),sans-serif] text-[#212121] font-normal leading-[150%] self-stretch"
              style={{
                fontSize: "clamp(14px, 1.5vw, 18px)",
              }}
            >
              With a portfolio spanning over 7 Mn. Sq. Ft. of industrial
              infrastructure, KSH INFRA brings an integrated approach across the
              asset lifecycle—from investment and development to asset
              management and exit.
            </p>
            <p
              className="font-[family:var(--font-inter),sans-serif] text-[#212121] font-normal leading-[150%] self-stretch"
              style={{
                fontSize: "clamp(14px, 1.5vw, 18px)",
              }}
            >
              Our long-standing partnerships with institutional capital and
              commitment to sustainable development reinforce our position as an
              integrated industrial infrastructure platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
