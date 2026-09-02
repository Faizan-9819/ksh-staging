"use client";

import { useState, useEffect, useRef } from "react";

const DEFS = [
  {
    title: "Advanced Safety and Emergency Preparedness",
    desc: "Our parks are equipped with round-the-clock security, comprehensive CCTV surveillance, and routine monitoring protocols, ensuring a safe and secure environment at all times.",
    pos: {
      left: "50%",
      top: "5.5%",
      width: "22%",
      transform: "translateX(-50%)",
    },
  },
  {
    title: "Customizable and Ready-to-Move Facilities",
    desc: "Move in without delay. Our facilities are pre-fitted and fully configurable to your operational needs, so you can begin work from day one.",
    pos: { left: "5%", top: "21.8%", width: "21%" },
  },
  {
    title: "Sustainable and Smart Resource Management",
    desc: "Energy-efficient systems, water recycling, and intelligent monitoring keep operating costs low while minimising environmental impact across the park.",
    pos: { right: "5%", top: "21.8%", width: "21%" },
  },
  {
    title: "Strategic Locations with Seamless Connectivity",
    desc: "Positioned near key highways, ports, and transit corridors, our parks keep your supply chain fast, reliable, and effortlessly connected.",
    pos: { left: "1%", top: "46.8%", width: "21%" },
  },
  {
    title: "Community Engagement & Modern Facility Management",
    desc: "Dedicated on-site teams and active community programmes ensure every park is well-run, welcoming, and continuously improving.",
    pos: { right: "1.5%", top: "46.8%", width: "21%" },
  },
];

export default function USP() {
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) =>
      setIsWide(entries[0].contentRect.width >= 980),
    );
    ro.observe(el);
    setIsWide(el.getBoundingClientRect().width >= 980);

    const io = new IntersectionObserver(
      (ents) => {
        if (ents[0].isIntersecting) setRevealed(true);
      },
      { threshold: 0.16 },
    );
    io.observe(el);
    setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 800) * 0.92) setRevealed(true);
    }, 140);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const toggle = (i: number) => setOpen((prev) => (prev === i ? -1 : i));

  return (
    <section
      ref={sectionRef}
      className="relative w-full font-[var(--font-inter),sans-serif] overflow-hidden bg-[linear-gradient(177deg,#F8F8F7_0%,#FAF2E5_56%,#FBE6C6_100%)]"
    >
      <div className="fix relative">
        {/* ─── DESKTOP STAGE ─── */}
        {isWide && (
          <div className="relative w-full aspect-[1440/960]">
            {/* Roof image */}
            <div
              className="absolute bottom-0 origin-bottom"
              style={{
                left: "50%",
                width: "90.3%",
                transition:
                  "transform 1s cubic-bezier(.22,.61,.36,1), opacity 1s ease",
                transform: revealed
                  ? "translateX(-50%) translateY(0)"
                  : "translateX(-50%) translateY(46px)",
                opacity: revealed ? 1 : 0,
              }}
            >
              <img
                src="/home/usp-roof.png"
                alt="KSH INFRA warehouse roof"
                className="block w-full h-auto"
              />
            </div>

            {/* Heading */}
            <div className="absolute left-0 z-[3]" style={{ top: "5.4%" }}>
              <div className="flex items-center gap-[9px] mb-[14px]">
                <span className="text-[#8C8C84] font-semibold text-[13px]">
                  //
                </span>
                <span className="text-[#8C8C84] font-medium text-[12px] tracking-[-2%]">
                  SPECIALITIES
                </span>
              </div>
              <h2 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-bold text-[#1C2A48] text-[clamp(30px,3.4vw,47px)] leading-[1.12] tracking-[-0.012em]">
                What Sets KSH INFRA
                <br />
                Parks Apart
              </h2>
            </div>

            {/* Floating cards */}
            {DEFS.map((d, i) => {
              const isOpen = i === open;
              const stagger = (0.15 + i * 0.12).toFixed(2);
              return (
                <div
                  key={d.title}
                  className="absolute"
                  style={{ zIndex: isOpen ? 30 : 5, ...d.pos }}
                >
                  <div
                    style={{
                      transition: `opacity .7s ease ${stagger}s, transform .7s cubic-bezier(.22,.61,.36,1) ${stagger}s`,
                      opacity: revealed ? 1 : 0,
                      transform: revealed
                        ? "translateY(0)"
                        : "translateY(22px)",
                    }}
                  >
                    <div
                      onClick={() => toggle(i)}
                      className="cursor-pointer rounded-2xl backdrop-blur-[16px] border border-[rgba(255,255,255,0.75)] shadow-[0_22px_55px_-34px_rgba(35,50,90,0.4)] [transition:box-shadow_.35s_ease,background_.35s_ease] bg-[linear-gradient(160deg,rgba(255,255,255,0.62),rgba(255,255,255,0.40))]"
                      style={{
                        padding:
                          "clamp(16px,1.45vw,21px) clamp(18px,1.55vw,22px)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "linear-gradient(160deg, rgba(255,255,255,0.72), rgba(255,255,255,0.5))";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 28px 60px -30px rgba(35,50,90,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "linear-gradient(160deg, rgba(255,255,255,0.62), rgba(255,255,255,0.40))";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 22px 55px -34px rgba(35,50,90,0.4)";
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="m-0 font-medium text-[clamp(15px,1.18vw,17px)] leading-[1.28] text-[#1C2A48]">
                          {d.title}
                        </h3>
                        <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(60,70,95,0.32)]">
                          {isOpen ? (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <line
                                x1="3"
                                y1="7"
                                x2="11"
                                y2="7"
                                stroke="#41475A"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <line
                                x1="3"
                                y1="7"
                                x2="11"
                                y2="7"
                                stroke="#41475A"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                              <line
                                x1="7"
                                y1="3"
                                x2="7"
                                y2="11"
                                stroke="#41475A"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                        </span>
                      </div>
                      <div
                        className="overflow-hidden"
                        style={{
                          transition:
                            "max-height .5s cubic-bezier(.22,.61,.36,1), opacity .4s ease, margin-top .4s ease",
                          maxHeight: isOpen ? 150 : 0,
                          opacity: isOpen ? 1 : 0,
                          marginTop: isOpen ? 12 : 0,
                        }}
                      >
                        <p className="m-0 font-normal text-[clamp(13px,1.04vw,14px)] leading-[1.62] text-[#646973] max-w-[268px]">
                          {d.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── NARROW / STACKED ─── */}
        {!isWide && (
          <div className="px-[clamp(20px,5vw,40px)] py-[clamp(40px,8vw,64px)]">
            <div className="flex items-center gap-[9px] mb-[14px]">
              <span className="text-[#8C8C84] font-semibold text-[13px]">
                //
              </span>
              <span className="text-[#8C8C84] font-medium text-[12px] tracking-[-2%]">
                SPECIALITIES
              </span>
            </div>
            <h2 className="mt-0 mx-0 mb-[26px] font-[family-name:var(--font-sora),sans-serif] font-bold text-[#1C2A48] text-[clamp(28px,7vw,40px)] leading-[1.12]">
              What Sets KSH INFRA Parks Apart
            </h2>
            <div className="w-full max-w-[520px] mx-auto mb-[30px]">
              <img
                src="/home/usp-roof.png"
                alt="KSH INFRA warehouse roof"
                className="block w-full h-auto"
              />
            </div>
            <div className="flex flex-col gap-[14px]">
              {DEFS.map((d, i) => {
                const isOpen = i === open;
                return (
                  <div
                    key={d.title}
                    onClick={() => toggle(i)}
                    className="cursor-pointer rounded-2xl px-[22px] py-5 bg-[linear-gradient(160deg,rgba(255,255,255,0.78),rgba(255,255,255,0.6))] backdrop-blur-[16px] border border-[rgba(255,255,255,0.8)] shadow-[0_16px_40px_-30px_rgba(35,50,90,0.4)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-medium text-[17px] leading-[1.28] text-[#1C2A48]">
                        {d.title}
                      </h3>
                      <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(60,70,95,0.32)]">
                        {isOpen ? (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <line
                              x1="3"
                              y1="7"
                              x2="11"
                              y2="7"
                              stroke="#41475A"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <line
                              x1="3"
                              y1="7"
                              x2="11"
                              y2="7"
                              stroke="#41475A"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                            <line
                              x1="7"
                              y1="3"
                              x2="7"
                              y2="11"
                              stroke="#41475A"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                    <div
                      className="overflow-hidden"
                      style={{
                        transition:
                          "max-height .5s ease, opacity .4s ease, margin-top .4s ease",
                        maxHeight: isOpen ? 150 : 0,
                        opacity: isOpen ? 1 : 0,
                        marginTop: isOpen ? 12 : 0,
                      }}
                    >
                      <p className="m-0 font-normal text-[14px] leading-[1.62] text-[#646973]">
                        {d.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
