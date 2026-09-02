"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import NavArrow from "@/components/ui/NavArrow";

/* ─── Data ─── */
const STATES = [
  {
    name: "Maharashtra",
    count: "05",
    mapSrc: "/home/map-mh.svg",
    mapActiveSrc: "/home/map-mh-active.svg",
    bigMapSrc: "/home/map-mh-active.svg",
    markers: [
      { left: "23%", top: "57%", delay: "0s" },
      { left: "33%", top: "55%", delay: "0.3s" },
      { left: "27%", top: "65%", delay: "0.6s" },
      { left: "36%", top: "65%", delay: "0.9s" },
      { left: "30%", top: "73%", delay: "1.2s" },
    ],
    parks: [
      { title: "KSH Chakan I",   city: "Chakan, Pune",       area: "0.40 MN. SQ. FT", buildings: "03 Buildings" },
      { title: "KSH Chakan II",  city: "Chakan, Pune",       area: "0.38 MN. SQ. FT", buildings: "02 Buildings" },
      { title: "KSH Chakan III", city: "Chakan, Pune",       area: "0.36 MN. SQ. FT", buildings: "02 Buildings" },
      { title: "KSH Chakan IV",  city: "Chakan, Pune",       area: "0.42 MN. SQ. FT", buildings: "03 Buildings" },
      { title: "KSH Talegaon",   city: "Talegaon, Pune",     area: "0.50 MN. SQ. FT", buildings: "04 Buildings" },
    ],
  },
  {
    name: "Karnataka",
    count: "01",
    mapSrc: "/home/map-ka.svg",
    mapActiveSrc: "/home/map-ka-active.svg",
    bigMapSrc: "/home/map-ka-active.svg",
    markers: [{ left: "54%", top: "52%", delay: "0s" }],
    parks: [
      { title: "KSH Hosur", city: "Hosur, Krishnagiri", area: "0.30 MN. SQ. FT", buildings: "02 Buildings" },
    ],
  },
  {
    name: "Tamil Nadu",
    count: "01",
    mapSrc: "/home/map-tn.svg",
    mapActiveSrc: "/home/map-tn-active.svg",
    bigMapSrc: "/home/map-tn-active.svg",
    markers: [{ left: "52%", top: "46%", delay: "0s" }],
    parks: [
      { title: "KSH Chennai", city: "Sriperumbudur, Chennai", area: "0.45 MN. SQ. FT", buildings: "03 Buildings" },
    ],
  },
];

/* India SVG outline — simplified but recognisable silhouette */
const INDIA_PATH =
  "M 200,30 C 215,28 240,32 255,42 C 270,52 278,65 280,80 C 282,95 270,108 265,120 C 260,132 255,140 258,155 C 261,170 275,178 278,192 C 281,206 272,218 268,230 C 264,242 262,256 255,268 C 248,280 238,290 232,302 C 226,314 222,328 218,342 C 214,356 212,370 208,382 C 204,394 196,404 190,416 C 184,428 180,442 172,452 C 164,462 154,466 146,470 C 138,474 130,474 124,468 C 118,462 116,452 112,442 C 108,432 102,424 96,416 C 90,408 82,404 76,396 C 70,388 66,378 62,368 C 58,358 54,348 52,338 C 50,328 50,318 48,308 C 46,298 40,290 38,280 C 36,270 38,260 40,250 C 42,240 46,230 46,220 C 46,210 42,202 40,192 C 38,182 38,172 42,162 C 46,152 54,144 58,134 C 62,124 62,114 66,104 C 70,94 78,86 84,78 C 90,70 94,62 102,56 C 110,50 120,46 130,42 C 140,38 152,36 162,34 C 172,32 182,32 192,30 Z";

/* Geographic seed positions of each state on the India outline (% of 400×500 viewbox) */
const STATE_ORIGINS: [number, number][] = [
  [50, 48],  // Maharashtra — west-centre
  [50, 62],  // Karnataka — south-centre
  [52, 68],  // Tamil Nadu — far south
];

export default function Parks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ─── Scroll driver ─── */
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  /* Phase split: 0–0.35 = India animate-in + hold, 0.35–0.65 = India out + states emerge, 0.65–1 = grid settled */
  const indiaOpacity  = useTransform(scrollYProgress, [0, 0.18, 0.38, 0.62], [0, 1, 1, 0]);
  const indiaScale    = useTransform(scrollYProgress, [0, 0.18, 0.38, 0.62], [0.88, 1, 1, 0.82]);

  /* ─── Interactive state (detail view) ─── */
  const [mode, setMode] = useState<"grid" | "detail">("grid");
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(-1);
  const [gridVisible, setGridVisible] = useState(false);
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((e) => setIsWide(e[0].contentRect.width >= 900));
    ro.observe(el);
    setIsWide(el.getBoundingClientRect().width >= 900);
    return () => ro.disconnect();
  }, []);

  /* Show grid once scroll crosses 0.65 */
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setGridVisible(v >= 0.60);
    });
    return unsub;
  }, [scrollYProgress]);

  const open   = (i: number) => { setSelected(i); setActive(0); setMode("detail"); };
  const goBack = () => { setMode("grid"); setHovered(-1); };
  const prev   = () => setActive((a) => { const n = STATES[selected].parks.length; return (a - 1 + n) % n; });
  const next   = () => setActive((a) => (a + 1) % STATES[selected].parks.length);

  const sd = STATES[selected];
  const parks = sd.parks;

  return (
    /* Outer track — 300vh height creates the scroll room */
    <div ref={trackRef} className="relative h-[300vh]">
      {/* Sticky viewport */}
      <div
        ref={sectionRef}
        className="sticky top-0 h-screen overflow-hidden bg-[linear-gradient(180deg,#24314E_0%,#2B3856_48%,#222F4B_100%)] font-[family-name:var(--font-inter),sans-serif]"
      >
        <div className="relative mx-auto h-full px-[30px]" style={{ maxWidth: 1500 }}>

          {/* ─── Header ─── */}
          <div className="relative z-[6] text-center pt-[clamp(40px,4.6vw,66px)]">
            <div className="flex items-center justify-center gap-[9px] mb-[clamp(10px,1.2vw,16px)]">
              <span className="text-[#8E97AC] font-semibold text-[clamp(12px,0.9vw,13px)]">//</span>
              <span className="text-[#9AA2B5] font-medium text-[clamp(11px,0.86vw,13px)] tracking-[0.18em]">LOCATIONS</span>
            </div>
            <h2 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-bold text-white text-[clamp(28px,3vw,42px)] tracking-[-0.01em]">
              Explore Our Parks
            </h2>
          </div>

          {/* ─── INDIA SVG (scroll-animated) ─── */}
          <motion.div
            style={{ opacity: indiaOpacity, scale: indiaScale, position: "absolute", left: "50%", top: "50%", translateX: "-50%", translateY: "-50%", zIndex: 2, pointerEvents: "none" }}
          >
            <svg
              viewBox="0 0 400 500"
              className="block h-auto w-[clamp(240px,30vw,380px)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glow beneath */}
              <ellipse cx="200" cy="480" rx="120" ry="14" fill="rgba(100,130,200,0.10)" />
              {/* India silhouette */}
              <path
                d={INDIA_PATH}
                fill="rgba(100,120,180,0.12)"
                stroke="rgba(160,180,230,0.55)"
                strokeWidth="1.5"
              />
              {/* State highlight blobs — MH, KA, TN */}
              <circle cx="195" cy="238" r="28" fill="rgba(255,255,255,0.06)" />
              <circle cx="195" cy="308" r="22" fill="rgba(255,255,255,0.05)" />
              <circle cx="198" cy="338" r="18" fill="rgba(255,255,255,0.04)" />
              {/* Dot markers */}
              {STATE_ORIGINS.map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx * 4} cy={cy * 5} r="8" fill="rgba(106,127,93,0.30)" />
                  <circle cx={cx * 4} cy={cy * 5} r="4" fill="rgba(180,210,170,0.7)" />
                  <circle cx={cx * 4} cy={cy * 5} r="2" fill="#fff" />
                </g>
              ))}
            </svg>
          </motion.div>

          {/* ─── GRID STATE (emerges as India fades) ─── */}
          <AnimatePresence>
            {gridVisible && mode === "grid" && (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-[5] flex flex-col justify-center pt-[clamp(80px,8vw,100px)]"
              >
                {isWide ? (
                  /* Desktop 3-column */
                  <div className="grid grid-cols-3 py-[clamp(40px,4.6vw,66px)]">
                    {STATES.map((st, i) => {
                      const hov = hovered === i;
                      return (
                        <motion.div
                          key={st.name}
                          onClick={() => open(i)}
                          onHoverStart={() => setHovered(i)}
                          onHoverEnd={() => setHovered(-1)}
                          initial={{ opacity: 0, y: 32 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 0.61, 0.36, 1] }}
                          className="relative flex flex-col cursor-pointer"
                          style={{
                            padding: "0 clamp(20px,3vw,46px)",
                            borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
                          }}
                        >
                          <div className="flex items-center justify-center h-[clamp(220px,26vw,360px)]">
                            <img
                              src={hov ? st.mapActiveSrc : st.mapSrc}
                              alt={`${st.name} map`}
                              className="max-w-full max-h-full w-auto h-auto"
                              style={{
                                transition: "transform .45s cubic-bezier(.22,.61,.36,1)",
                                transform: hov ? "scale(1.05)" : "scale(1)",
                              }}
                            />
                          </div>
                          <div className="flex items-baseline justify-between mt-[clamp(18px,2vw,28px)] gap-3">
                            <span className="font-[family-name:var(--font-inter),sans-serif] font-normal text-[clamp(18px,1.7vw,25px)] text-white">{st.name}</span>
                            <span className="font-[family-name:var(--font-sora),sans-serif] font-normal text-[clamp(24px,2.5vw,36px)] text-[#5B647C] tracking-[0.02em]">{st.count}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  /* Mobile stacked */
                  <div className="flex flex-col gap-[34px] px-[clamp(20px,5vw,40px)] py-[36px_0_52px] overflow-y-auto max-h-[80vh]">
                    {STATES.map((st, i) => (
                      <motion.div
                        key={st.name}
                        onClick={() => open(i)}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="cursor-pointer border-t border-white/10 pt-[30px]"
                      >
                        <div className="h-[230px] flex items-center justify-center">
                          <img src={st.mapSrc} alt={`${st.name} map`} className="max-w-full max-h-full" />
                        </div>
                        <div className="flex items-baseline justify-between mt-[18px]">
                          <span className="font-normal text-[22px] text-white">{st.name}</span>
                          <span className="font-[family-name:var(--font-sora),sans-serif] font-normal text-[30px] text-[#5B647C]">{st.count}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── DETAIL STATE ─── */}
          <AnimatePresence>
            {mode === "detail" && (
              <motion.div
                key="detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 z-[10] flex flex-col justify-center pt-[clamp(80px,8vw,100px)]"
              >
                {/* Back button */}
                <div className="absolute top-[clamp(40px,4.6vw,66px)] left-[clamp(20px,4.3vw,62px)]">
                  <button
                    onClick={goBack}
                    className="flex items-center gap-[18px] h-[50px] px-[22px] pr-[26px] bg-transparent border border-white/[0.38] rounded-full cursor-pointer [transition:background_.25s_ease]"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <svg width="46" height="14" viewBox="0 0 46 14" fill="none"><path d="M7 2 A5 5 0 1 0 7 12" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" fill="none" /><line x1="6" y1="7" x2="40" y2="7" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" strokeLinecap="round" /></svg>
                    <span className="font-medium text-[16px] text-white">Back</span>
                  </button>
                </div>

                <div
                  className="grid items-center gap-[clamp(20px,3vw,48px)] py-[clamp(20px,3vw,46px)_0_clamp(40px,5vw,72px)]"
                  style={{ gridTemplateColumns: isWide ? "1.05fr 0.95fr" : "1fr" }}
                >
                  {/* Left — big map + markers */}
                  <div className="relative w-full flex items-center justify-center">
                    <div className="relative w-full max-w-[560px]">
                      <img
                        src={sd.bigMapSrc}
                        alt={`${sd.name} map`}
                        className="block w-full h-auto"
                        style={{ filter: "grayscale(1) brightness(0.86)", animation: "ksh-map-in .65s cubic-bezier(.22,.61,.36,1) both" }}
                      />
                      {sd.markers.map((mk, mi) => (
                        <div key={mi} className="absolute w-0 h-0" style={{ left: mk.left, top: mk.top }}>
                          <div className="absolute left-1/2 top-1/2 w-[34px] h-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6A7F5D] opacity-60" style={{ animation: `ksh-ripple 2.6s ease-out infinite`, animationDelay: mk.delay }} />
                          <div className="absolute left-1/2 top-1/2 w-[34px] h-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(106,127,93,0.55)] border border-white/35 flex items-center justify-center" style={{ animation: "ksh-pin-in .5s ease both", animationDelay: mk.delay }}>
                            <span className="w-[7px] h-[7px] rounded-full bg-white block" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right — dropdown pill + card carousel + arrows */}
                  <div className="relative flex flex-col items-start">
                    {/* Pill */}
                    <div className="self-start min-w-[clamp(280px,30vw,335px)] mb-[clamp(18px,2vw,26px)]">
                      <div className="flex items-center justify-between gap-5 h-[74px] px-[30px] bg-white/[0.07] border border-white/[0.16] rounded-full backdrop-blur-[8px]">
                        <span className="font-[family-name:var(--font-sora),sans-serif] font-medium text-[clamp(18px,1.7vw,24px)] text-white">{sd.name}</span>
                        <span className="font-[family-name:var(--font-sora),sans-serif] font-normal text-[clamp(16px,1.5vw,22px)]">
                          <span className="text-white">{String(active + 1).padStart(2, "0")}</span>
                          <span className="text-[#6E7790]"> / {sd.count}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card carousel */}
                    <div className="relative w-[clamp(290px,30vw,340px)] h-[clamp(380px,40vw,470px)]">
                      {parks.map((p, i) => {
                        const rel = (i - active + parks.length) % parks.length;
                        const visible = rel <= 2;
                        const offset = 34, scaleStep = 0.07;
                        return (
                          <div
                            key={p.title}
                            className="absolute top-0 left-0 w-[clamp(290px,30vw,340px)] rounded-[20px] bg-[#FBFBF9] pt-[14px] px-[14px] shadow-[0_30px_60px_-34px_rgba(0,0,0,0.55)]"
                            style={{
                              transition: "transform .5s cubic-bezier(.22,.61,.36,1), opacity .5s ease",
                              transform: `translateX(${rel * offset}px) translateY(${rel * 6}px) scale(${1 - rel * scaleStep})`,
                              opacity: rel === 0 ? 1 : visible ? (rel === 1 ? 0.55 : 0.3) : 0,
                              zIndex: 10 - rel,
                              pointerEvents: rel === 0 ? "auto" : "none",
                            }}
                          >
                            <div className="w-full aspect-[312/200] rounded-[12px] overflow-hidden bg-[#CBC4B5]">
                              <img src="/home/warehouse.png" alt={p.title} className="w-full h-full object-cover block" />
                            </div>
                            <div className="flex items-center justify-between gap-[14px] px-[6px] pt-[20px] pb-[16px]">
                              <h3 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[clamp(18px,1.6vw,22px)] text-[#1C2A48]">{p.title}</h3>
                              <span className="shrink-0 flex items-center justify-center w-[42px] h-[42px] rounded-full border border-[#C9C6BD]">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12 L12 4 M6 4 H12 V10" stroke="#1C2A48" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              </span>
                            </div>
                            <div className="flex flex-col gap-[11px] px-[6px] pb-[22px]">
                              <div className="flex justify-between text-[14px]"><span className="text-[#8A8880]">City</span><span className="text-[#2A3856] font-medium">{p.city}</span></div>
                              <div className="flex justify-between text-[14px]"><span className="text-[#8A8880]">Total Area</span><span className="text-[#2A3856] font-medium">{p.area}</span></div>
                              <div className="flex justify-between text-[14px]"><span className="text-[#8A8880]">Buildings</span><span className="text-[#2A3856] font-medium">{p.buildings}</span></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Arrows */}
                    <div className="flex gap-3.5 mt-[clamp(20px,2.4vw,32px)]">
                      <NavArrow direction="prev" tone="light" onClick={prev} ariaLabel="Previous park" />
                      <NavArrow direction="next" tone="light" onClick={next} ariaLabel="Next park" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes ksh-ripple { 0%{ transform:scale(1); opacity:0.55; } 70%{ opacity:0; } 100%{ transform:scale(2.6); opacity:0; } }
        @keyframes ksh-pin-in { from{ transform:translate(-50%,-50%) scale(0); opacity:0; } to{ transform:translate(-50%,-50%) scale(1); opacity:1; } }
        @keyframes ksh-map-in { from{ transform:translateX(-26px) scale(0.95); opacity:0; } to{ transform:translateX(0) scale(1); opacity:1; } }
      `}</style>
    </div>
  );
}
