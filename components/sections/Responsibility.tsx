"use client";

import { useState, useEffect, useRef } from "react";

const DATA = [
  {
    title: "Environment",
    icon: "leaf",
    img: "/home/hero-bg.png",
    desc: "Creating modern architecture focused on clarity, purpose, and lasting impact.",
  },
  {
    title: "Social",
    icon: "people",
    img: "/home/about-right.png",
    desc: "Creating modern architecture focused on clarity, purpose, and lasting impact.",
  },
  {
    title: "Governance",
    icon: "leaf",
    img: "/home/about-left.png",
    desc: "Creating modern architecture focused on clarity, purpose, and lasting impact.",
  },
];

function LeafIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
      <path
        d="M24 8c-7 0-12 5-12 12 0 3 1 5 2 7"
        stroke="#222B3D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 38V20"
        stroke="#222B3D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 24c5 0 9-2 12-6 1 6-3 11-9 12-1 .2-2 .3-3 .3M24 28c-4 0-8-2-10-5-1 5 2 9 7 10"
        stroke="#222B3D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="17" r="5.5" stroke="#222B3D" strokeWidth="2" />
      <circle cx="12" cy="20" r="4" stroke="#222B3D" strokeWidth="2" />
      <circle cx="36" cy="20" r="4" stroke="#222B3D" strokeWidth="2" />
      <path
        d="M15 34c0-5 4-9 9-9s9 4 9 9"
        stroke="#222B3D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 33c0-4 3.6-7 8-7M44 33c0-4-3.6-7-8-7"
        stroke="#222B3D"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Keyframe positions (% of canvas 1500×768)
const K = {
  In: { l: 2, t: 66, w: 20, h: 26, op: 0 },
  P: { l: 2, t: 56.5, w: 25, h: 35.0, op: 1 },
  L: { l: 34, t: 16.0, w: 31, h: 75.8, op: 1 },
  G: { l: 42, t: 22, w: 22, h: 52, op: 0 },
};
function lerp(a: typeof K.In, b: typeof K.In, t: number) {
  const o: typeof K.In = { l: 0, t: 0, w: 0, h: 0, op: 0 };
  (["l", "t", "w", "h", "op"] as const).forEach((k) => {
    o[k] = a[k] + (b[k] - a[k]) * t;
  });
  return o;
}
function box(r: number) {
  r = Math.max(-1, Math.min(2, r));
  if (r >= 1) return lerp(K.P, K.In, r - 1);
  if (r >= 0) return lerp(K.L, K.P, r);
  return lerp(K.L, K.G, -r);
}
function styleFor(r: number): React.CSSProperties {
  const b = box(r);
  return {
    left: b.l.toFixed(2) + "%",
    top: b.t.toFixed(2) + "%",
    width: b.w.toFixed(2) + "%",
    height: b.h.toFixed(2) + "%",
    opacity: b.op,
    zIndex: Math.round(12 - Math.abs(r) * 3),
  };
}

export default function Responsibility() {
  const rootRef = useRef<HTMLElement>(null);
  const imgEls = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const rafRef = useRef(0);
  const [active, setActive] = useState(0);
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      setIsWide(entries[0].contentRect.width >= 900);
    });
    if (rootRef.current) {
      ro.observe(rootRef.current);
      setIsWide(rootRef.current.getBoundingClientRect().width >= 900);
    }
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const tick = () => {
      rafRef.current = 0;
      const root = rootRef.current;
      if (!root || !isWide) return;
      const vh = window.innerHeight || 800;
      const rect = root.getBoundingClientRect();
      const total = root.offsetHeight - vh;
      const p = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
      const segment = p * 2;
      imgEls.current.forEach((el, i) => {
        if (!el) return;
        const b = box(i - segment);
        el.style.left = b.l.toFixed(2) + "%";
        el.style.top = b.t.toFixed(2) + "%";
        el.style.width = b.w.toFixed(2) + "%";
        el.style.height = b.h.toFixed(2) + "%";
        el.style.opacity = b.op.toFixed(3);
        el.style.zIndex = String(Math.round(12 - Math.abs(i - segment) * 3));
      });
      const ai = Math.min(2, Math.round(segment));
      setActive(ai);
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isWide]);

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-[#FBF2E8] font-[var(--font-inter),sans-serif]"
    >
      {/* ─── DESKTOP: sticky scrub ─── */}
      {isWide && (
        <div className="h-[340vh]">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <div className="fix relative aspect-[1500/768]">
              {/* Heading */}
              <div className="absolute left-[30px] top-[15.3%] w-[31%] z-[20]">
                <div className="flex items-center gap-[9px] mb-[18px]">
                  <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-semibold text-[13px]">
                    //
                  </span>
                  <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-normal text-[12px] uppercase tracking-[-0.24px]">
                    SUSTAINABILITY
                  </span>
                </div>
                <h2 className="m-0 mb-[18px] font-[family-name:var(--font-sora),sans-serif] font-semibold text-black text-[clamp(28px,3.2vw,40px)] leading-[1.0] tracking-[-0.02em]">
                  Responsibility
                </h2>
                <p className="m-0 font-normal text-[14px] leading-[1.4] text-[#4A4A4A] max-w-[330px]">
                  We create industrial spaces that work in harmony with the
                  environment.
                </p>
              </div>

              {/* Lerp images — keep spread style since values are runtime-computed */}
              {DATA.map((d, i) => {
                const init = styleFor(i);
                return (
                  <div
                    key={d.title}
                    ref={(el) => {
                      imgEls.current[i] = el;
                    }}
                    className="absolute rounded-[20px] overflow-hidden shadow-[0_30px_70px_-42px_rgba(40,40,30,0.5)] transition-none"
                    style={{ ...init }}
                  >
                    <img
                      src={d.img}
                      alt={d.title}
                      className="w-full h-full object-cover block"
                    />
                  </div>
                );
              })}

              {/* Services cluster */}
              <div className="absolute right-[30px] top-[15%] w-[31%] z-[20] flex flex-col">
                {DATA.map((d, i) => {
                  const on = i === active;
                  return (
                    <div
                      key={d.title}
                      className="rounded-[20px] [transition:background_.45s_ease,box-shadow_.45s_ease,padding_.35s_ease]"
                      style={{
                        padding: on
                          ? "clamp(22px,2.2vw,30px)"
                          : "0 clamp(22px,2.2vw,30px)",
                        margin: on ? 0 : "clamp(20px,2.4vw,34px) 0",
                        background: on ? "#FFFFFF" : "transparent",
                        boxShadow: on
                          ? "0 30px 60px -36px rgba(40,40,30,0.45)"
                          : "none",
                      }}
                    >
                      <div className="w-[42px] h-[42px] mb-[16px]">
                        {d.icon === "people" ? <PeopleIcon /> : <LeafIcon />}
                      </div>
                      <h3 className="m-0 mb-[10px] font-[family-name:var(--font-sora),sans-serif] font-normal text-[20px] text-[#212121] tracking-[-0.02em]">
                        {d.title}
                      </h3>
                      <p className="m-0 font-normal text-[14px] leading-[1.4] text-[#4A4A4A] max-w-[300px]">
                        {d.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── NARROW: stacked ─── */}
      {!isWide && (
        <div className="px-[clamp(20px,5vw,40px)] py-[clamp(40px,8vw,64px)]">
          <div className="flex items-center gap-[9px] mb-4">
            <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-semibold text-[13px]">
              //
            </span>
            <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-normal text-[12px] uppercase tracking-[-0.24px]">
              SUSTAINABILITY
            </span>
          </div>
          <h2 className="m-0 mb-[14px] font-[family-name:var(--font-sora),sans-serif] font-semibold text-black text-[clamp(28px,9vw,40px)] leading-[1.0] tracking-[-0.02em]">
            Responsibility
          </h2>
          <p className="m-0 mb-[30px] text-[14px] leading-[1.4] text-[#4A4A4A] max-w-[420px]">
            We create industrial spaces that work in harmony with the
            environment.
          </p>
          <div className="flex flex-col gap-[30px]">
            {DATA.map((d) => (
              <div key={d.title}>
                <div className="w-full aspect-[16/11] rounded-[18px] overflow-hidden mb-[18px]">
                  <img
                    src={d.img}
                    alt={d.title}
                    className="w-full h-full object-cover block"
                  />
                </div>
                <div className="w-[42px] h-[42px] mb-[12px]">
                  {d.icon === "people" ? <PeopleIcon /> : <LeafIcon />}
                </div>
                <h3 className="m-0 mb-[8px] font-[family-name:var(--font-sora),sans-serif] font-normal text-[20px] text-[#212121] tracking-[-0.02em]">
                  {d.title}
                </h3>
                <p className="m-0 text-[14px] leading-[1.4] text-[#4A4A4A]">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
