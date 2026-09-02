"use client";

import { useState, useEffect, useRef } from "react";

const CARDS = [
  {
    num: "100",
    unit: "%",
    title: "High-Performance",
    body: "From industrial parks to logistics hubs, KSH INFRA delivers high-quality infrastructure solutions built to accelerate",
  },
  {
    num: "85",
    unit: "+",
    title: "Growth & Strategy",
    body: "From industrial parks to logistics hubs, KSH INFRA delivers high-quality.",
  },
  {
    num: "22",
    unit: "x",
    title: "Average ROI",
    body: "From industrial parks to logistics hubs, KSH INFRA delivers high-quality infrastructure built to accelerate.",
  },
  {
    num: "200",
    unit: "Acre",
    title: "Development",
    body: "From industrial parks to logistics hubs, KSH INFRA delivers high-quality infrastructure solutions built to accelerate.",
  },
];

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !revealed) {
            setRevealed(true);
            setTimeout(() => setSettled(true), 1300);
          }
        });
      },
      { threshold: 0.18 },
    );
    io.observe(el);

    setTimeout(() => {
      if (!el || revealed) return;
      const r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 800) * 0.9) {
        setRevealed(true);
        setTimeout(() => setSettled(true), 1300);
      }
    }, 120);

    let rafPending = false;
    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const section = sectionRef.current;
        const img = imgRef.current;
        if (!section || !img) return;
        const r = section.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        img.style.transform = "scale(" + (1 + p * 0.085).toFixed(4) + ")";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []); // eslint-disable-line

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#] font-[var(--font-inter),sans-serif] overflow-hidden"
    >
      <div className="fix relative">
        {/* Warehouse image band */}
        <div
          className="relative left-1/2 w-screen -ml-[50vw] aspect-[1440/822] overflow-hidden"
          style={{
            transition:
              "opacity 1.1s cubic-bezier(.22,.61,.36,1), transform 1.1s cubic-bezier(.22,.61,.36,1)",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "scale(1)" : "scale(1.05)",
          }}
        >
          <img
            ref={imgRef}
            src="/home/warehouse.png"
            alt="KSH INFRA aerial warehouse"
            className="absolute inset-0 w-full h-full object-cover object-[center_top] block will-change-transform"
            style={{ transformOrigin: "center 38%" }}
          />
          <div className="absolute left-0 right-0 bottom-0 h-[34%] bg-[linear-gradient(to_bottom,rgba(36,49,78,0)_0%,rgba(36,49,78,0.55)_62%,#24314E_100%)] pointer-events-none" />
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-[clamp(10px,2vw,20px)] relative z-[2] pb-[clamp(40px,4vw,57px)]"
          style={{ marginTop: "clamp(-80px,-9vw,-60px)" }}
        >
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              className="relative rounded-[20px] overflow-hidden bg-[#FBFBF9] shadow-[0_24px_50px_-32px_rgba(8,14,30,0.55)]"
              style={{
                padding:
                  "clamp(22px,2.3vw,33px) clamp(20px,2.1vw,30px) clamp(24px,2.4vw,32px)",
                transition:
                  "transform .4s cubic-bezier(.22,.61,.36,1), box-shadow .4s ease, background .45s ease, opacity .7s ease",
                transitionDelay: settled
                  ? "0s"
                  : (0.1 + i * 0.13).toFixed(2) + "s",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(30px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#C5BDAC";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 34px 60px -30px rgba(8,14,30,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FBFBF9";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 24px 50px -32px rgba(8,14,30,0.55)";
              }}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora),sans-serif] font-bold text-[clamp(40px,4.3vw,62px)] leading-[0.95] text-[#1C2A48] tracking-[-0.02em]">
                  {card.num}
                </span>
                <span className="font-[family-name:var(--font-sora),sans-serif] font-normal text-[clamp(15px,1.5vw,22px)] text-[#9C9A93]">
                  {card.unit}
                </span>
              </div>
              <div className="h-px bg-[#DAD6CC] my-[clamp(20px,2.4vw,34px)]" />
              <h3 className="m-0 mb-[clamp(10px,1.1vw,15px)] font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(17px,1.5vw,21px)] text-[#1C2A48] tracking-[-0.01em]">
                {card.title}
              </h3>
              <p className="m-0 font-normal text-[clamp(12px,0.97vw,14px)] leading-[1.62] text-[#74726B]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
