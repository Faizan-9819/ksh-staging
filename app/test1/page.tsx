// "use client";

// import React, { useLayoutEffect, useRef, useState } from "react";

// /* =========================================================================
//    Design tokens
//    ========================================================================= */
// const T = {
//   bg: "#F4EFE3",
//   card: "#FBF9F3",
//   iconDisc: "#ECE3D1",
//   ink: "#1C1C18",
//   body: "#54524B",
//   green: "#4A7A3E",
//   dot: "#3E5C29",
//   dash: "#C4CBB5",
//   hubGlow: "rgba(215,207,188,0.45)",
// };

// /* Fixed design canvas - uniformly scaled to container width */
// const CANVAS_W = 1536;
// const CANVAS_H = 1040;
// const CENTER = { x: 768, y: 564 };
// const RING_R = 196;

// /* Central image (served from Next.js /public) */
// const CENTRAL_IMAGE = "/about/kshscroll/aboutKSH.png";

// /* Card geometry + the arc.
//    Each visual row has a vertical center (yc) and an "offset" = how far the
//    card's inner edge sits from the center x. Top/bottom rows tuck IN (small
//    offset); the middle rows push OUT (large offset) to wrap the circle. */
// const CARD_W = 450;
// const ROWS = [
//   { yc: 252, off: 185 },
//   { yc: 460, off: 250 },
//   { yc: 668, off: 250 },
//   { yc: 876, off: 185 },
// ];
// const leftX = (off) => CENTER.x - off - CARD_W;
// const rightX = (off) => CENTER.x + off;

// /* =========================================================================
//    Icons
//    ========================================================================= */
// function StrokeIcon({ size = 40, children }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke={T.green}
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       {children}
//     </svg>
//   );
// }

// const ClipboardCheck = (p) => (
//   <StrokeIcon {...p}>
//     <rect x="5" y="4" width="14" height="17" rx="2.2" />
//     <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
//     <path d="M8.5 9h4M8.5 12.5h3.5M8.5 16h2" />
//     <circle cx="15.6" cy="15.6" r="3.1" />
//     <path d="M14.35 15.7l.9.9 1.55-1.75" />
//   </StrokeIcon>
// );

// const Handshake = (p) => (
//   <StrokeIcon {...p}>
//     <path d="m11 17 2 2a1 1 0 1 0 3-3" />
//     <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
//     <path d="m21 3 1 11h-2" />
//     <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
//     <path d="M3 4h8" />
//   </StrokeIcon>
// );

// const TruckClock = (p) => (
//   <StrokeIcon {...p}>
//     <path d="M10 17h4V6H2v11h1.2" />
//     <path d="M14 9h4l3 3v5h-2" />
//     <path d="M8.8 17h1.2" />
//     <circle cx="6.5" cy="17.6" r="2.1" />
//     <circle cx="17.5" cy="17.6" r="2.1" />
//     <circle cx="6" cy="6" r="3.1" />
//     <path d="M6 4.4V6l1.1.9" />
//   </StrokeIcon>
// );

// const LeadershipTeam = (p) => (
//   <StrokeIcon {...p}>
//     <circle cx="12" cy="6" r="2.5" />
//     <path d="M7.5 14.5a4.5 4.5 0 0 1 9 0" />
//     <circle cx="5" cy="9" r="1.9" />
//     <path d="M2 15.4a3.3 3.3 0 0 1 5-2.8" />
//     <circle cx="19" cy="9" r="1.9" />
//     <path d="M22 15.4a3.3 3.3 0 0 1-5-2.8" />
//     <circle cx="12" cy="19.4" r="1.55" />
//     <path d="M12 16.6v1.2M12 21v1.2M9.2 19.4h1.2M13.6 19.4h1.2M10 17.4l.85.85M13.15 20.55l.85.85M10 21.4l.85-.85M13.15 18.25l.85-.85" />
//   </StrokeIcon>
// );

// const BarChartUp = (p) => (
//   <StrokeIcon {...p}>
//     <rect x="4" y="13" width="3.2" height="7.5" rx="0.6" />
//     <rect x="9.6" y="10" width="3.2" height="10.5" rx="0.6" />
//     <rect x="15.2" y="6.5" width="3.2" height="14" rx="0.6" />
//     <path d="M5 11 10.5 7 14 9 20 3.5" />
//     <path d="M16.7 3.5H20V6.8" />
//   </StrokeIcon>
// );

// const PeopleGroup = (p) => (
//   <StrokeIcon {...p}>
//     <circle cx="12" cy="7" r="2.7" />
//     <path d="M6.8 16a5.2 5.2 0 0 1 10.4 0" />
//     <circle cx="5" cy="9.5" r="2" />
//     <path d="M2 16.4a3.4 3.4 0 0 1 5.1-2.95" />
//     <circle cx="19" cy="9.5" r="2" />
//     <path d="M22 16.4a3.4 3.4 0 0 1-5.1-2.95" />
//   </StrokeIcon>
// );

// const PersonStar = (p) => (
//   <StrokeIcon {...p}>
//     <circle cx="9" cy="8" r="3.1" />
//     <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
//     <path d="m18.4 3.2 1.15 2.33 2.57.37-1.86 1.81.44 2.56-2.3-1.21-2.3 1.21.44-2.56-1.86-1.81 2.57-.37z" />
//   </StrokeIcon>
// );

// const ShieldCheck = (p) => (
//   <StrokeIcon {...p}>
//     <path d="M12 3 19 6v5c0 4.6-3 7.7-7 9.2-4-1.5-7-4.6-7-9.2V6z" />
//     <path d="m8.8 12 2.1 2.1 4.3-4.3" />
//   </StrokeIcon>
// );

// /* Fallback mark if the central image fails to load */
// function BuildingMark({ size = 92 }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 64 64"
//       fill="none"
//       aria-hidden="true"
//     >
//       <g fill={T.green}>
//         <rect x="13" y="35" width="10" height="19" rx="1.5" />
//         <rect x="25.5" y="26" width="10" height="28" rx="1.5" />
//         <path d="M38 54V22l9-6v38z" />
//       </g>
//     </svg>
//   );
// }

// /* =========================================================================
//    Content - data-driven; row = index into ROWS
//    ========================================================================= */
// const LEFT_FEATURES = [
//   {
//     key: "execution",
//     row: 0,
//     Icon: ClipboardCheck,
//     title: "Unmatched Execution Capabilities",
//     body: [
//       "Transacted 4,000+ acres of land, 350+ years of cumulative experience; developing & leasing 65+ Mn. Sq. Ft. logistics real estate",
//     ],
//   },
//   {
//     key: "partnerships",
//     row: 1,
//     Icon: Handshake,
//     title: "Strategic Institutional Partnerships",
//     body: [
//       "Strategic partnerships with marquee global institutional investors delivering 23%+ IRRs",
//     ],
//   },
//   {
//     key: "delivery",
//     row: 2,
//     Icon: TruckClock,
//     title: "On Time Delivery",
//     body: [
//       "Strong execution history with timely & cost-effective delivery of large-scale projects",
//     ],
//   },
//   {
//     key: "leadership",
//     row: 3,
//     Icon: LeadershipTeam,
//     title: "Backed By An Experienced Leadership",
//     body: [
//       "Hands-on leadership team helps remain proactive & achieve institutional-grade land assembly with minimal risks",
//     ],
//   },
// ];

// const RIGHT_FEATURES = [
//   {
//     key: "track-record",
//     row: 0,
//     Icon: BarChartUp,
//     title: "Proven Track-Record",
//     body: [
//       "Track record of delivering ~7 Mn. Sq. Ft. across 7 projects with INR 2,000+ Cr.",
//     ],
//   },
//   {
//     key: "tenants",
//     row: 1,
//     Icon: PeopleGroup,
//     title: "Strong Tenant Relationships",
//     body: [
//       "Strong relationships across major manufacturing & industrial tenants. Track record of achieving higher than market rentals over long-term contracts",
//     ],
//   },
//   {
//     key: "advisors",
//     row: 2,
//     Icon: PersonStar,
//     title: "Partnerships With Tier I Advisors",
//     body: [
//       "Leading advisors & consultants across land acquisition, diligence, legal, structuring, tax, audit, construction, project execution & transaction advisory",
//     ],
//   },
//   {
//     key: "governance",
//     row: 3,
//     Icon: ShieldCheck,
//     title: "Best in class Governance",
//     body: [
//       "ESG Compliant Investments with ESG being a core philosophy at KSH INFRA",
//       "AIF set up with an independent Investment Committee (3/5 members)",
//     ],
//   },
// ];

// /* =========================================================================
//    Reusable card
//    ========================================================================= */
// function FeatureCard({ Icon, title, body, side }) {
//   const left = side === "left";
//   return (
//     <div
//       className={`flex items-center gap-[18px] rounded-[40px] px-[26px] py-[20px] shadow-[0_18px_40px_-22px_rgba(90,78,45,0.35)] ${
//         left ? "flex-row" : "flex-row-reverse"
//       }`}
//       style={{
//         width: CARD_W,
//         background: T.card,
//       }}
//     >
//       <div
//         className="flex-none w-[72px] h-[72px] rounded-full grid place-items-center"
//         style={{ background: T.iconDisc }}
//       >
//         <Icon size={40} />
//       </div>
//       <div className="text-left">
//         <h3
//           className="mb-[6px] text-[17px] leading-[1.2] font-bold tracking-[-0.01em]"
//           style={{ color: T.ink }}
//         >
//           {title}
//         </h3>
//         {body.map((p, i) => (
//           <p
//             key={i}
//             className="mt-2 first:mt-0 text-[13.5px] leading-[1.45]"
//             style={{ color: T.body }}
//           >
//             {p}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* =========================================================================
//    Ring + dots. Dots sit directly ON the ring (no spokes).
//    ========================================================================= */
// function ringDot(innerEdge) {
//   const dx = innerEdge.x - CENTER.x;
//   const dy = innerEdge.y - CENTER.y;
//   const d = Math.hypot(dx, dy) || 1;
//   return { x: CENTER.x + (dx / d) * RING_R, y: CENTER.y + (dy / d) * RING_R };
// }

// function RingLayer() {
//   const dots = [];
//   LEFT_FEATURES.forEach((f) => {
//     const r = ROWS[f.row];
//     dots.push({ key: f.key, ...ringDot({ x: CENTER.x - r.off, y: r.yc }) });
//   });
//   RIGHT_FEATURES.forEach((f) => {
//     const r = ROWS[f.row];
//     dots.push({ key: f.key, ...ringDot({ x: CENTER.x + r.off, y: r.yc }) });
//   });

//   return (
//     <svg
//       viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
//       width={CANVAS_W}
//       height={CANVAS_H}
//       style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
//       aria-hidden="true"
//     >
//       <circle
//         cx={CENTER.x}
//         cy={CENTER.y}
//         r={RING_R}
//         fill="none"
//         stroke={T.dash}
//         strokeWidth="1.4"
//         strokeDasharray="5 6"
//       />
//       {dots.map((d) => (
//         <circle key={d.key} cx={d.x} cy={d.y} r="8" fill={T.dot} />
//       ))}
//     </svg>
//   );
// }

// /* =========================================================================
//    Hub - central image inside the circle (falls back to the mark on error)
//    ========================================================================= */
// function CentralHub() {
//   const [failed, setFailed] = useState(false);
//   return (
//     <div
//       className="absolute -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full grid place-items-center"
//       style={{
//         left: CENTER.x,
//         top: CENTER.y,
//         // background: T.hubGlow,
//       }}
//     >
//       <div
//         className="w-full grid place-items-center overflow-hidden"
//         style={{}}
//       >
//         {failed ? (
//           <BuildingMark size={92} />
//         ) : (
//           <img
//             src={CENTRAL_IMAGE}
//             alt="KSH INFRA"
//             onError={() => setFailed(true)}
//             className="w-full h-full object-cover block"
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================================================================
//    Main section
//    ========================================================================= */
// export default function KshInfraSection() {
//   const wrapRef = useRef(null);
//   const [scale, setScale] = useState(1);

//   useLayoutEffect(() => {
//     const el = wrapRef.current;
//     if (!el) return;
//     const measure = () => setScale(el.clientWidth / CANVAS_W);
//     measure();
//     const ro = new ResizeObserver(measure);
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, []);

//   const renderCard = (f, side) => {
//     const r = ROWS[f.row];
//     const x = side === "left" ? leftX(r.off) : rightX(r.off);
//     return (
//       <div
//         key={f.key}
//         className="absolute -translate-y-1/2"
//         style={{
//           left: x,
//           top: r.yc,
//         }}
//       >
//         <FeatureCard {...f} side={side} />
//       </div>
//     );
//   };

//   return (
//     <section
//       style={{
//         background: T.bg,
//         fontFamily:
//           "'Poppins','Nunito Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
//       }}
//     >
//       <div
//         ref={wrapRef}
//         className="relative w-full mx-auto overflow-hidden"
//         style={{
//           maxWidth: CANVAS_W,
//           height: CANVAS_H * scale,
//         }}
//       >
//         <div
//           className="absolute top-0 left-0 origin-top-left"
//           style={{
//             width: CANVAS_W,
//             height: CANVAS_H,
//             transform: `scale(${scale})`,
//           }}
//         >
//           <h1
//             className="absolute top-[40px] left-0 text-center m-0 text-[46px] leading-[1.15] font-extrabold tracking-[-0.02em]"
//             style={{
//               width: CANVAS_W,
//               color: T.ink,
//             }}
//           >
//             KSH INFRA is well positioned as an
//             <br />
//             Integrated Fund &amp; Development Manager
//           </h1>

//           <RingLayer />
//           <CentralHub />

//           {LEFT_FEATURES.map((f) => renderCard(f, "left"))}
//           {RIGHT_FEATURES.map((f) => renderCard(f, "right"))}
//         </div>
//       </div>
//     </section>
//   );
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// "use client";

// import React, { useLayoutEffect, useRef, useState } from "react";

// /* =========================================================================
//    Design tokens
//    ========================================================================= */
// const T = {
//   bg: "#F4EFE3",
//   card: "#FBF9F3",
//   iconDisc: "#ECE3D1",
//   ink: "#1C1C18",
//   body: "#54524B",
//   green: "#4A7A3E",
//   dot: "#3E5C29",
//   dash: "#C4CBB5",
//   hubGlow: "rgba(215,207,188,0.45)",
// };

// /* Fixed design canvas - uniformly scaled to container width */
// const CANVAS_W = 1536;
// const CANVAS_H = 1040;
// const CENTER = { x: 768, y: 564 };
// const RING_R = 196;

// /* Central image (served from Next.js /public) */
// const CENTRAL_IMAGE = "/about/kshscroll/aboutKSH.png";

// /* Card geometry + the arc.
//    Each visual row has a vertical center (yc) and an "offset" = how far the
//    card's inner edge sits from the center x. Top/bottom rows tuck IN (small
//    offset); the middle rows push OUT (large offset) to wrap the circle.

//    Tightened vs. the original: rows pulled toward the vertical center
//    (spacing 208 -> 184) and offsets reduced (185/250 -> 170/215) so every
//    card sits closer to the circle with less gap between cards. Still fully
//    symmetric left/right and clear of both the ring (r196) and hub (r140). */
// const CARD_W = 450;
// const ROWS = [
//   { yc: 288, off: 170 },
//   { yc: 472, off: 215 },
//   { yc: 656, off: 215 },
//   { yc: 840, off: 170 },
// ];
// const leftX = (off) => CENTER.x - off - CARD_W;
// const rightX = (off) => CENTER.x + off;

// /* =========================================================================
//    Icons
//    ========================================================================= */
// function StrokeIcon({ size = 40, children }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke={T.green}
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       {children}
//     </svg>
//   );
// }

// const ClipboardCheck = (p) => (
//   <StrokeIcon {...p}>
//     <rect x="5" y="4" width="14" height="17" rx="2.2" />
//     <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
//     <path d="M8.5 9h4M8.5 12.5h3.5M8.5 16h2" />
//     <circle cx="15.6" cy="15.6" r="3.1" />
//     <path d="M14.35 15.7l.9.9 1.55-1.75" />
//   </StrokeIcon>
// );

// const Handshake = (p) => (
//   <StrokeIcon {...p}>
//     <path d="m11 17 2 2a1 1 0 1 0 3-3" />
//     <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
//     <path d="m21 3 1 11h-2" />
//     <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
//     <path d="M3 4h8" />
//   </StrokeIcon>
// );

// const TruckClock = (p) => (
//   <StrokeIcon {...p}>
//     <path d="M10 17h4V6H2v11h1.2" />
//     <path d="M14 9h4l3 3v5h-2" />
//     <path d="M8.8 17h1.2" />
//     <circle cx="6.5" cy="17.6" r="2.1" />
//     <circle cx="17.5" cy="17.6" r="2.1" />
//     <circle cx="6" cy="6" r="3.1" />
//     <path d="M6 4.4V6l1.1.9" />
//   </StrokeIcon>
// );

// const LeadershipTeam = (p) => (
//   <StrokeIcon {...p}>
//     <circle cx="12" cy="6" r="2.5" />
//     <path d="M7.5 14.5a4.5 4.5 0 0 1 9 0" />
//     <circle cx="5" cy="9" r="1.9" />
//     <path d="M2 15.4a3.3 3.3 0 0 1 5-2.8" />
//     <circle cx="19" cy="9" r="1.9" />
//     <path d="M22 15.4a3.3 3.3 0 0 1-5-2.8" />
//     <circle cx="12" cy="19.4" r="1.55" />
//     <path d="M12 16.6v1.2M12 21v1.2M9.2 19.4h1.2M13.6 19.4h1.2M10 17.4l.85.85M13.15 20.55l.85.85M10 21.4l.85-.85M13.15 18.25l.85-.85" />
//   </StrokeIcon>
// );

// const BarChartUp = (p) => (
//   <StrokeIcon {...p}>
//     <rect x="4" y="13" width="3.2" height="7.5" rx="0.6" />
//     <rect x="9.6" y="10" width="3.2" height="10.5" rx="0.6" />
//     <rect x="15.2" y="6.5" width="3.2" height="14" rx="0.6" />
//     <path d="M5 11 10.5 7 14 9 20 3.5" />
//     <path d="M16.7 3.5H20V6.8" />
//   </StrokeIcon>
// );

// const PeopleGroup = (p) => (
//   <StrokeIcon {...p}>
//     <circle cx="12" cy="7" r="2.7" />
//     <path d="M6.8 16a5.2 5.2 0 0 1 10.4 0" />
//     <circle cx="5" cy="9.5" r="2" />
//     <path d="M2 16.4a3.4 3.4 0 0 1 5.1-2.95" />
//     <circle cx="19" cy="9.5" r="2" />
//     <path d="M22 16.4a3.4 3.4 0 0 1-5.1-2.95" />
//   </StrokeIcon>
// );

// const PersonStar = (p) => (
//   <StrokeIcon {...p}>
//     <circle cx="9" cy="8" r="3.1" />
//     <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
//     <path d="m18.4 3.2 1.15 2.33 2.57.37-1.86 1.81.44 2.56-2.3-1.21-2.3 1.21.44-2.56-1.86-1.81 2.57-.37z" />
//   </StrokeIcon>
// );

// const ShieldCheck = (p) => (
//   <StrokeIcon {...p}>
//     <path d="M12 3 19 6v5c0 4.6-3 7.7-7 9.2-4-1.5-7-4.6-7-9.2V6z" />
//     <path d="m8.8 12 2.1 2.1 4.3-4.3" />
//   </StrokeIcon>
// );

// /* Fallback mark if the central image fails to load */
// function BuildingMark({ size = 92 }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 64 64"
//       fill="none"
//       aria-hidden="true"
//     >
//       <g fill={T.green}>
//         <rect x="13" y="35" width="10" height="19" rx="1.5" />
//         <rect x="25.5" y="26" width="10" height="28" rx="1.5" />
//         <path d="M38 54V22l9-6v38z" />
//       </g>
//     </svg>
//   );
// }

// /* =========================================================================
//    Content - data-driven; row = index into ROWS
//    ========================================================================= */
// const LEFT_FEATURES = [
//   {
//     key: "execution",
//     row: 0,
//     Icon: ClipboardCheck,
//     title: "Unmatched Execution Capabilities",
//     body: [
//       "Transacted 4,000+ acres of land, 350+ years of cumulative experience; developing & leasing 65+ Mn. Sq. Ft. logistics real estate",
//     ],
//   },
//   {
//     key: "partnerships",
//     row: 1,
//     Icon: Handshake,
//     title: "Strategic Institutional Partnerships",
//     body: [
//       "Strategic partnerships with marquee global institutional investors delivering 23%+ IRRs",
//     ],
//   },
//   {
//     key: "delivery",
//     row: 2,
//     Icon: TruckClock,
//     title: "On Time Delivery",
//     body: [
//       "Strong execution history with timely & cost-effective delivery of large-scale projects",
//     ],
//   },
//   {
//     key: "leadership",
//     row: 3,
//     Icon: LeadershipTeam,
//     title: "Backed By An Experienced Leadership",
//     body: [
//       "Hands-on leadership team helps remain proactive & achieve institutional-grade land assembly with minimal risks",
//     ],
//   },
// ];

// const RIGHT_FEATURES = [
//   {
//     key: "track-record",
//     row: 0,
//     Icon: BarChartUp,
//     title: "Proven Track-Record",
//     body: [
//       "Track record of delivering ~7 Mn. Sq. Ft. across 7 projects with INR 2,000+ Cr.",
//     ],
//   },
//   {
//     key: "tenants",
//     row: 1,
//     Icon: PeopleGroup,
//     title: "Strong Tenant Relationships",
//     body: [
//       "Strong relationships across major manufacturing & industrial tenants. Track record of achieving higher than market rentals over long-term contracts",
//     ],
//   },
//   {
//     key: "advisors",
//     row: 2,
//     Icon: PersonStar,
//     title: "Partnerships With Tier I Advisors",
//     body: [
//       "Leading advisors & consultants across land acquisition, diligence, legal, structuring, tax, audit, construction, project execution & transaction advisory",
//     ],
//   },
//   {
//     key: "governance",
//     row: 3,
//     Icon: ShieldCheck,
//     title: "Best in class Governance",
//     body: [
//       "ESG Compliant Investments with ESG being a core philosophy at KSH INFRA",
//       "AIF set up with an independent Investment Committee (3/5 members)",
//     ],
//   },
// ];

// /* =========================================================================
//    Reusable card
//    ========================================================================= */
// function FeatureCard({ Icon, title, body, side }) {
//   const left = side === "left";
//   return (
//     <div
//       className={`flex items-center gap-[18px] rounded-[40px] px-[26px] py-[20px] shadow-[0_18px_40px_-22px_rgba(90,78,45,0.35)] ${
//         left ? "flex-row" : "flex-row-reverse"
//       }`}
//       style={{
//         width: CARD_W,
//         background: T.card,
//       }}
//     >
//       <div
//         className="flex-none w-[72px] h-[72px] rounded-full grid place-items-center"
//         style={{ background: T.iconDisc }}
//       >
//         <Icon size={40} />
//       </div>
//       <div className="text-left">
//         <h3
//           className="mb-[6px] text-[17px] leading-[1.2] font-bold tracking-[-0.01em]"
//           style={{ color: T.ink }}
//         >
//           {title}
//         </h3>
//         {body.map((p, i) => (
//           <p
//             key={i}
//             className="mt-2 first:mt-0 text-[13.5px] leading-[1.45]"
//             style={{ color: T.body }}
//           >
//             {p}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* =========================================================================
//    Ring + dots. Dots sit directly ON the ring (no spokes).
//    ========================================================================= */
// function ringDot(innerEdge) {
//   const dx = innerEdge.x - CENTER.x;
//   const dy = innerEdge.y - CENTER.y;
//   const d = Math.hypot(dx, dy) || 1;
//   return { x: CENTER.x + (dx / d) * RING_R, y: CENTER.y + (dy / d) * RING_R };
// }

// function RingLayer() {
//   const dots = [];
//   LEFT_FEATURES.forEach((f) => {
//     const r = ROWS[f.row];
//     dots.push({ key: f.key, ...ringDot({ x: CENTER.x - r.off, y: r.yc }) });
//   });
//   RIGHT_FEATURES.forEach((f) => {
//     const r = ROWS[f.row];
//     dots.push({ key: f.key, ...ringDot({ x: CENTER.x + r.off, y: r.yc }) });
//   });

//   return (
//     <svg
//       viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
//       width={CANVAS_W}
//       height={CANVAS_H}
//       style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
//       aria-hidden="true"
//     >
//       <circle
//         cx={CENTER.x}
//         cy={CENTER.y}
//         r={RING_R}
//         fill="none"
//         stroke={T.dash}
//         strokeWidth="1.4"
//         strokeDasharray="5 6"
//       />
//       {dots.map((d) => (
//         <circle key={d.key} cx={d.x} cy={d.y} r="8" fill={T.dot} />
//       ))}
//     </svg>
//   );
// }

// /* =========================================================================
//    Beam layer - dotted lines from each ring dot out to its card, "breathing"
//    like an animated beam. Each beam has:
//      - a faint static dotted guide (always visible),
//      - a green dotted line whose dashes flow outward and whose opacity
//        gently pulses (the "breathe"),
//      - a glowing pulse that travels from the ring dot to the card.
//    Staggered per-beam start offsets keep the whole set organic rather than
//    pulsing in unison. Pure SMIL so it stays self-contained (no extra deps).
//    ========================================================================= */
// function BeamLayer() {
//   const beams = [];
//   const push = (f, side) => {
//     const r = ROWS[f.row];
//     const inner = {
//       x: side === "left" ? CENTER.x - r.off : CENTER.x + r.off,
//       y: r.yc,
//     };
//     beams.push({ key: f.key, start: ringDot(inner), end: inner });
//   };
//   LEFT_FEATURES.forEach((f) => push(f, "left"));
//   RIGHT_FEATURES.forEach((f) => push(f, "right"));

//   return (
//     <svg
//       viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
//       width={CANVAS_W}
//       height={CANVAS_H}
//       style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
//       aria-hidden="true"
//     >
//       {beams.map((b, i) => {
//         const begin = `${(i * 0.28).toFixed(2)}s`;
//         return (
//           <g key={b.key}>
//             {/* faint static dotted guide */}
//             <line
//               x1={b.start.x}
//               y1={b.start.y}
//               x2={b.end.x}
//               y2={b.end.y}
//               stroke={T.dash}
//               strokeWidth="1.4"
//               strokeDasharray="2 7"
//               strokeLinecap="round"
//               opacity="0.55"
//             />
//             {/* breathing flow line */}
//             <line
//               x1={b.start.x}
//               y1={b.start.y}
//               x2={b.end.x}
//               y2={b.end.y}
//               stroke={T.green}
//               strokeWidth="1.6"
//               strokeDasharray="2 9"
//               strokeLinecap="round"
//             >
//               <animate
//                 attributeName="stroke-dashoffset"
//                 values="22;0"
//                 dur="1.4s"
//                 begin={begin}
//                 repeatCount="indefinite"
//               />
//               <animate
//                 attributeName="opacity"
//                 values="0.12;0.55;0.12"
//                 dur="2.8s"
//                 begin={begin}
//                 repeatCount="indefinite"
//               />
//             </line>
//             {/* travelling pulse ("beam") */}
//             <circle r="3.2" fill={T.green}>
//               <animate
//                 attributeName="cx"
//                 values={`${b.start.x};${b.end.x}`}
//                 dur="1.4s"
//                 begin={begin}
//                 repeatCount="indefinite"
//               />
//               <animate
//                 attributeName="cy"
//                 values={`${b.start.y};${b.end.y}`}
//                 dur="1.4s"
//                 begin={begin}
//                 repeatCount="indefinite"
//               />
//               <animate
//                 attributeName="opacity"
//                 values="0;1;1;0"
//                 keyTimes="0;0.15;0.85;1"
//                 dur="1.4s"
//                 begin={begin}
//                 repeatCount="indefinite"
//               />
//             </circle>
//           </g>
//         );
//       })}
//     </svg>
//   );
// }

// /* =========================================================================
//    Hub - central image inside the circle (falls back to the mark on error)
//    ========================================================================= */
// function CentralHub() {
//   const [failed, setFailed] = useState(false);
//   return (
//     <div
//       className="absolute -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full grid place-items-center"
//       style={{
//         left: CENTER.x,
//         top: CENTER.y,
//         // background: T.hubGlow,
//       }}
//     >
//       <div
//         className="w-full grid place-items-center overflow-hidden"
//         style={{}}
//       >
//         {failed ? (
//           <BuildingMark size={92} />
//         ) : (
//           <img
//             src={CENTRAL_IMAGE}
//             alt="KSH INFRA"
//             onError={() => setFailed(true)}
//             className="w-full h-full object-cover block"
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================================================================
//    Main section
//    ========================================================================= */
// export default function KshInfraSection() {
//   const wrapRef = useRef(null);
//   const [scale, setScale] = useState(1);

//   useLayoutEffect(() => {
//     const el = wrapRef.current;
//     if (!el) return;
//     const measure = () => setScale(el.clientWidth / CANVAS_W);
//     measure();
//     const ro = new ResizeObserver(measure);
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, []);

//   const renderCard = (f, side) => {
//     const r = ROWS[f.row];
//     const x = side === "left" ? leftX(r.off) : rightX(r.off);
//     return (
//       <div
//         key={f.key}
//         className="absolute -translate-y-1/2"
//         style={{
//           left: x,
//           top: r.yc,
//         }}
//       >
//         <FeatureCard {...f} side={side} />
//       </div>
//     );
//   };

//   return (
//     <section
//       style={{
//         background: T.bg,
//         fontFamily:
//           "'Poppins','Nunito Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
//       }}
//     >
//       <div
//         ref={wrapRef}
//         className="relative w-full mx-auto overflow-hidden"
//         style={{
//           maxWidth: CANVAS_W,
//           height: CANVAS_H * scale,
//         }}
//       >
//         <div
//           className="absolute top-0 left-0 origin-top-left"
//           style={{
//             width: CANVAS_W,
//             height: CANVAS_H,
//             transform: `scale(${scale})`,
//           }}
//         >
//           <h1
//             className="absolute top-[40px] left-0 text-center m-0 text-[46px] leading-[1.15] font-extrabold tracking-[-0.02em]"
//             style={{
//               width: CANVAS_W,
//               color: T.ink,
//             }}
//           >
//             KSH INFRA is well positioned as an
//             <br />
//             Integrated Fund &amp; Development Manager
//           </h1>

//           <RingLayer />
//           <BeamLayer />
//           <CentralHub />

//           {LEFT_FEATURES.map((f) => renderCard(f, "left"))}
//           {RIGHT_FEATURES.map((f) => renderCard(f, "right"))}
//         </div>
//       </div>
//     </section>
//   );
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// "use client";

// import React, { useLayoutEffect, useRef, useState } from "react";

// /* =========================================================================
//    Design tokens
//    ========================================================================= */
// const T = {
//   bg: "#F4EFE3",
//   card: "#FBF9F3",
//   iconDisc: "#ECE3D1",
//   ink: "#1C1C18",
//   body: "#54524B",
//   green: "#4A7A3E",
//   dot: "#3E5C29",
//   dash: "#C4CBB5",
//   hubGlow: "rgba(215,207,188,0.45)",
// };

// /* Fixed design canvas - uniformly scaled to container width */
// const CANVAS_W = 1536;
// const CANVAS_H = 1040;
// const CENTER = { x: 768, y: 564 };

// /* Ring shrunk (196 -> 158) and hub shrunk to match (see CentralHub, 280 ->
//    244) so there's more clear space between the circle and the cards for the
//    beams to run. Dots sit ON the ring; beams start just OUTSIDE the dot. */
// const RING_R = 158;
// const DOT_R = 8;
// const BEAM_START_GAP = 6; // beam begins this far past the dot's outer edge

// /* Central image (served from Next.js /public) */
// const CENTRAL_IMAGE = "/about/kshscroll/aboutKSH.png";

// /* Card geometry + the arc.
//    Each visual row has a vertical center (yc) and an "offset" = how far the
//    card's inner edge sits from the center x. Top/bottom rows tuck IN (small
//    offset); the middle rows push OUT (large offset) to wrap the circle.

//    Middle cards pushed further out (215 -> 260) and the ring shrunk, so the
//    beams to the middle cards are now long and clearly visible instead of
//    cramped. Outer offset nudged out slightly (170 -> 180) to keep the arc.
//    Vertical spacing (184) kept from the last pass. Still symmetric L/R and
//    clear of the ring (r158) and hub (r122). */
// const CARD_W = 450;
// const ROWS = [
//   { yc: 288, off: 180 },
//   { yc: 472, off: 260 },
//   { yc: 656, off: 260 },
//   { yc: 840, off: 180 },
// ];
// const leftX = (off) => CENTER.x - off - CARD_W;
// const rightX = (off) => CENTER.x + off;

// /* =========================================================================
//    Icons
//    ========================================================================= */
// function StrokeIcon({ size = 40, children }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke={T.green}
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       {children}
//     </svg>
//   );
// }

// const ClipboardCheck = (p) => (
//   <StrokeIcon {...p}>
//     <rect x="5" y="4" width="14" height="17" rx="2.2" />
//     <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
//     <path d="M8.5 9h4M8.5 12.5h3.5M8.5 16h2" />
//     <circle cx="15.6" cy="15.6" r="3.1" />
//     <path d="M14.35 15.7l.9.9 1.55-1.75" />
//   </StrokeIcon>
// );

// const Handshake = (p) => (
//   <StrokeIcon {...p}>
//     <path d="m11 17 2 2a1 1 0 1 0 3-3" />
//     <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
//     <path d="m21 3 1 11h-2" />
//     <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
//     <path d="M3 4h8" />
//   </StrokeIcon>
// );

// const TruckClock = (p) => (
//   <StrokeIcon {...p}>
//     <path d="M10 17h4V6H2v11h1.2" />
//     <path d="M14 9h4l3 3v5h-2" />
//     <path d="M8.8 17h1.2" />
//     <circle cx="6.5" cy="17.6" r="2.1" />
//     <circle cx="17.5" cy="17.6" r="2.1" />
//     <circle cx="6" cy="6" r="3.1" />
//     <path d="M6 4.4V6l1.1.9" />
//   </StrokeIcon>
// );

// const LeadershipTeam = (p) => (
//   <StrokeIcon {...p}>
//     <circle cx="12" cy="6" r="2.5" />
//     <path d="M7.5 14.5a4.5 4.5 0 0 1 9 0" />
//     <circle cx="5" cy="9" r="1.9" />
//     <path d="M2 15.4a3.3 3.3 0 0 1 5-2.8" />
//     <circle cx="19" cy="9" r="1.9" />
//     <path d="M22 15.4a3.3 3.3 0 0 1-5-2.8" />
//     <circle cx="12" cy="19.4" r="1.55" />
//     <path d="M12 16.6v1.2M12 21v1.2M9.2 19.4h1.2M13.6 19.4h1.2M10 17.4l.85.85M13.15 20.55l.85.85M10 21.4l.85-.85M13.15 18.25l.85-.85" />
//   </StrokeIcon>
// );

// const BarChartUp = (p) => (
//   <StrokeIcon {...p}>
//     <rect x="4" y="13" width="3.2" height="7.5" rx="0.6" />
//     <rect x="9.6" y="10" width="3.2" height="10.5" rx="0.6" />
//     <rect x="15.2" y="6.5" width="3.2" height="14" rx="0.6" />
//     <path d="M5 11 10.5 7 14 9 20 3.5" />
//     <path d="M16.7 3.5H20V6.8" />
//   </StrokeIcon>
// );

// const PeopleGroup = (p) => (
//   <StrokeIcon {...p}>
//     <circle cx="12" cy="7" r="2.7" />
//     <path d="M6.8 16a5.2 5.2 0 0 1 10.4 0" />
//     <circle cx="5" cy="9.5" r="2" />
//     <path d="M2 16.4a3.4 3.4 0 0 1 5.1-2.95" />
//     <circle cx="19" cy="9.5" r="2" />
//     <path d="M22 16.4a3.4 3.4 0 0 1-5.1-2.95" />
//   </StrokeIcon>
// );

// const PersonStar = (p) => (
//   <StrokeIcon {...p}>
//     <circle cx="9" cy="8" r="3.1" />
//     <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
//     <path d="m18.4 3.2 1.15 2.33 2.57.37-1.86 1.81.44 2.56-2.3-1.21-2.3 1.21.44-2.56-1.86-1.81 2.57-.37z" />
//   </StrokeIcon>
// );

// const ShieldCheck = (p) => (
//   <StrokeIcon {...p}>
//     <path d="M12 3 19 6v5c0 4.6-3 7.7-7 9.2-4-1.5-7-4.6-7-9.2V6z" />
//     <path d="m8.8 12 2.1 2.1 4.3-4.3" />
//   </StrokeIcon>
// );

// /* Fallback mark if the central image fails to load */
// function BuildingMark({ size = 92 }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 64 64"
//       fill="none"
//       aria-hidden="true"
//     >
//       <g fill={T.green}>
//         <rect x="13" y="35" width="10" height="19" rx="1.5" />
//         <rect x="25.5" y="26" width="10" height="28" rx="1.5" />
//         <path d="M38 54V22l9-6v38z" />
//       </g>
//     </svg>
//   );
// }

// /* =========================================================================
//    Content - data-driven; row = index into ROWS
//    ========================================================================= */
// const LEFT_FEATURES = [
//   {
//     key: "execution",
//     row: 0,
//     Icon: ClipboardCheck,
//     title: "Unmatched Execution Capabilities",
//     body: [
//       "Transacted 4,000+ acres of land, 350+ years of cumulative experience; developing & leasing 65+ Mn. Sq. Ft. logistics real estate",
//     ],
//   },
//   {
//     key: "partnerships",
//     row: 1,
//     Icon: Handshake,
//     title: "Strategic Institutional Partnerships",
//     body: [
//       "Strategic partnerships with marquee global institutional investors delivering 23%+ IRRs",
//     ],
//   },
//   {
//     key: "delivery",
//     row: 2,
//     Icon: TruckClock,
//     title: "On Time Delivery",
//     body: [
//       "Strong execution history with timely & cost-effective delivery of large-scale projects",
//     ],
//   },
//   {
//     key: "leadership",
//     row: 3,
//     Icon: LeadershipTeam,
//     title: "Backed By An Experienced Leadership",
//     body: [
//       "Hands-on leadership team helps remain proactive & achieve institutional-grade land assembly with minimal risks",
//     ],
//   },
// ];

// const RIGHT_FEATURES = [
//   {
//     key: "track-record",
//     row: 0,
//     Icon: BarChartUp,
//     title: "Proven Track-Record",
//     body: [
//       "Track record of delivering ~7 Mn. Sq. Ft. across 7 projects with INR 2,000+ Cr.",
//     ],
//   },
//   {
//     key: "tenants",
//     row: 1,
//     Icon: PeopleGroup,
//     title: "Strong Tenant Relationships",
//     body: [
//       "Strong relationships across major manufacturing & industrial tenants. Track record of achieving higher than market rentals over long-term contracts",
//     ],
//   },
//   {
//     key: "advisors",
//     row: 2,
//     Icon: PersonStar,
//     title: "Partnerships With Tier I Advisors",
//     body: [
//       "Leading advisors & consultants across land acquisition, diligence, legal, structuring, tax, audit, construction, project execution & transaction advisory",
//     ],
//   },
//   {
//     key: "governance",
//     row: 3,
//     Icon: ShieldCheck,
//     title: "Best in class Governance",
//     body: [
//       "ESG Compliant Investments with ESG being a core philosophy at KSH INFRA",
//       "AIF set up with an independent Investment Committee (3/5 members)",
//     ],
//   },
// ];

// /* =========================================================================
//    Reusable card
//    ========================================================================= */
// function FeatureCard({ Icon, title, body, side }) {
//   const left = side === "left";
//   return (
//     <div
//       className={`flex items-center gap-[18px] rounded-[40px] px-[26px] py-[20px] shadow-[0_18px_40px_-22px_rgba(90,78,45,0.35)] ${
//         left ? "flex-row" : "flex-row-reverse"
//       }`}
//       style={{
//         width: CARD_W,
//         background: T.card,
//       }}
//     >
//       <div
//         className="flex-none w-[72px] h-[72px] rounded-full grid place-items-center"
//         style={{ background: T.iconDisc }}
//       >
//         <Icon size={40} />
//       </div>
//       <div className="text-left">
//         <h3
//           className="mb-[6px] text-[17px] leading-[1.2] font-bold tracking-[-0.01em]"
//           style={{ color: T.ink }}
//         >
//           {title}
//         </h3>
//         {body.map((p, i) => (
//           <p
//             key={i}
//             className="mt-2 first:mt-0 text-[13.5px] leading-[1.45]"
//             style={{ color: T.body }}
//           >
//             {p}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* =========================================================================
//    Geometry helpers
//    ========================================================================= */
// /* Unit direction from center toward a card's inner edge. */
// function dirTo(inner) {
//   const dx = inner.x - CENTER.x;
//   const dy = inner.y - CENTER.y;
//   const d = Math.hypot(dx, dy) || 1;
//   return { ux: dx / d, uy: dy / d };
// }

// /* Point ON the ring (dot position). */
// function ringDot(inner) {
//   const { ux, uy } = dirTo(inner);
//   return { x: CENTER.x + ux * RING_R, y: CENTER.y + uy * RING_R };
// }

// /* Point just OUTSIDE the dot - where a beam starts so it never overlaps the
//    dot or the ring. */
// function beamStart(inner) {
//   const { ux, uy } = dirTo(inner);
//   const r = RING_R + DOT_R + BEAM_START_GAP;
//   return { x: CENTER.x + ux * r, y: CENTER.y + uy * r };
// }

// function innerEdge(f, side) {
//   const r = ROWS[f.row];
//   return {
//     x: side === "left" ? CENTER.x - r.off : CENTER.x + r.off,
//     y: r.yc,
//   };
// }

// /* =========================================================================
//    Ring + dots. Dots sit directly ON the ring (no spokes).
//    ========================================================================= */
// function RingLayer() {
//   const dots = [];
//   LEFT_FEATURES.forEach((f) =>
//     dots.push({ key: f.key, ...ringDot(innerEdge(f, "left")) }),
//   );
//   RIGHT_FEATURES.forEach((f) =>
//     dots.push({ key: f.key, ...ringDot(innerEdge(f, "right")) }),
//   );

//   return (
//     <svg
//       viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
//       width={CANVAS_W}
//       height={CANVAS_H}
//       style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
//       aria-hidden="true"
//     >
//       <circle
//         cx={CENTER.x}
//         cy={CENTER.y}
//         r={RING_R}
//         fill="none"
//         stroke={T.dash}
//         strokeWidth="1.4"
//         strokeDasharray="5 6"
//       />
//       {dots.map((d) => (
//         <circle key={d.key} cx={d.x} cy={d.y} r={DOT_R} fill={T.dot} />
//       ))}
//     </svg>
//   );
// }

// /* =========================================================================
//    Beam layer - CONTINUOUS lines from just outside each dot to its card,
//    "breathing" like an animated beam. Each beam has:
//      - a solid, continuous base line (always visible),
//      - a green overlay whose opacity gently pulses (the "breathe"),
//      - a soft glowing pulse that travels along the line toward the card.
//    Lines start past the dot's outer edge (beamStart) so they never overlap
//    the dots or the ring. Staggered per-beam start offsets keep the set
//    organic. Pure SMIL so it stays self-contained (no extra deps).
//    ========================================================================= */
// function BeamLayer() {
//   const beams = [];
//   const push = (f, side) => {
//     const inner = innerEdge(f, side);
//     beams.push({ key: f.key, start: beamStart(inner), end: inner });
//   };
//   LEFT_FEATURES.forEach((f) => push(f, "left"));
//   RIGHT_FEATURES.forEach((f) => push(f, "right"));

//   return (
//     <svg
//       viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
//       width={CANVAS_W}
//       height={CANVAS_H}
//       style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
//       aria-hidden="true"
//     >
//       <defs>
//         <filter id="beamGlow" x="-60%" y="-60%" width="220%" height="220%">
//           <feGaussianBlur stdDeviation="4" />
//         </filter>
//       </defs>
//       {beams.map((b, i) => {
//         const begin = `${(i * 0.28).toFixed(2)}s`;
//         return (
//           <g key={b.key}>
//             {/* continuous base line */}
//             <line
//               x1={b.start.x}
//               y1={b.start.y}
//               x2={b.end.x}
//               y2={b.end.y}
//               stroke={T.dash}
//               strokeWidth="1.6"
//               strokeLinecap="round"
//               opacity="0.6"
//             />
//             {/* breathing green overlay (still continuous) */}
//             <line
//               x1={b.start.x}
//               y1={b.start.y}
//               x2={b.end.x}
//               y2={b.end.y}
//               stroke={T.green}
//               strokeWidth="1.6"
//               strokeLinecap="round"
//             >
//               <animate
//                 attributeName="opacity"
//                 values="0.1;0.5;0.1"
//                 dur="2.8s"
//                 begin={begin}
//                 repeatCount="indefinite"
//               />
//             </line>
//             {/* travelling glow */}
//             <circle r="7" fill={T.green} filter="url(#beamGlow)" opacity="0">
//               <animate
//                 attributeName="cx"
//                 values={`${b.start.x};${b.end.x}`}
//                 dur="1.6s"
//                 begin={begin}
//                 repeatCount="indefinite"
//               />
//               <animate
//                 attributeName="cy"
//                 values={`${b.start.y};${b.end.y}`}
//                 dur="1.6s"
//                 begin={begin}
//                 repeatCount="indefinite"
//               />
//               <animate
//                 attributeName="opacity"
//                 values="0;0.5;0.5;0"
//                 keyTimes="0;0.15;0.85;1"
//                 dur="1.6s"
//                 begin={begin}
//                 repeatCount="indefinite"
//               />
//             </circle>
//             {/* travelling core pulse */}
//             <circle r="3" fill={T.green} opacity="0">
//               <animate
//                 attributeName="cx"
//                 values={`${b.start.x};${b.end.x}`}
//                 dur="1.6s"
//                 begin={begin}
//                 repeatCount="indefinite"
//               />
//               <animate
//                 attributeName="cy"
//                 values={`${b.start.y};${b.end.y}`}
//                 dur="1.6s"
//                 begin={begin}
//                 repeatCount="indefinite"
//               />
//               <animate
//                 attributeName="opacity"
//                 values="0;1;1;0"
//                 keyTimes="0;0.15;0.85;1"
//                 dur="1.6s"
//                 begin={begin}
//                 repeatCount="indefinite"
//               />
//             </circle>
//           </g>
//         );
//       })}
//     </svg>
//   );
// }

// /* =========================================================================
//    Hub - central image inside the circle (falls back to the mark on error)
//    ========================================================================= */
// function CentralHub() {
//   const [failed, setFailed] = useState(false);
//   return (
//     <div
//       className="absolute -translate-x-1/2 -translate-y-1/2 w-[244px] h-[244px] rounded-full grid place-items-center"
//       style={{
//         left: CENTER.x,
//         top: CENTER.y,
//         // background: T.hubGlow,
//       }}
//     >
//       <div
//         className="w-full grid place-items-center overflow-hidden"
//         style={{}}
//       >
//         {failed ? (
//           <BuildingMark size={92} />
//         ) : (
//           <img
//             src={CENTRAL_IMAGE}
//             alt="KSH INFRA"
//             onError={() => setFailed(true)}
//             className="w-full h-full object-cover block"
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// /* =========================================================================
//    Main section
//    ========================================================================= */
// export default function KshInfraSection() {
//   const wrapRef = useRef(null);
//   const [scale, setScale] = useState(1);

//   useLayoutEffect(() => {
//     const el = wrapRef.current;
//     if (!el) return;
//     const measure = () => setScale(el.clientWidth / CANVAS_W);
//     measure();
//     const ro = new ResizeObserver(measure);
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, []);

//   const renderCard = (f, side) => {
//     const r = ROWS[f.row];
//     const x = side === "left" ? leftX(r.off) : rightX(r.off);
//     return (
//       <div
//         key={f.key}
//         className="absolute -translate-y-1/2"
//         style={{
//           left: x,
//           top: r.yc,
//         }}
//       >
//         <FeatureCard {...f} side={side} />
//       </div>
//     );
//   };

//   return (
//     <section
//       style={{
//         background: T.bg,
//         fontFamily:
//           "'Poppins','Nunito Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
//       }}
//     >
//       <div
//         ref={wrapRef}
//         className="relative w-full mx-auto overflow-hidden"
//         style={{
//           maxWidth: CANVAS_W,
//           height: CANVAS_H * scale,
//         }}
//       >
//         <div
//           className="absolute top-0 left-0 origin-top-left"
//           style={{
//             width: CANVAS_W,
//             height: CANVAS_H,
//             transform: `scale(${scale})`,
//           }}
//         >
//           <h1
//             className="absolute top-[40px] left-0 text-center m-0 text-[46px] leading-[1.15] font-extrabold tracking-[-0.02em]"
//             style={{
//               width: CANVAS_W,
//               color: T.ink,
//             }}
//           >
//             KSH INFRA is well positioned as an
//             <br />
//             Integrated Fund &amp; Development Manager
//           </h1>

//           <RingLayer />
//           <BeamLayer />
//           <CentralHub />

//           {LEFT_FEATURES.map((f) => renderCard(f, "left"))}
//           {RIGHT_FEATURES.map((f) => renderCard(f, "right"))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useLayoutEffect, useRef, useState } from "react";

/* =========================================================================
   Design tokens
   ========================================================================= */
const T = {
  bg: "#F4EFE3",
  card: "#FBF9F3",
  iconDisc: "#ECE3D1",
  ink: "#1C1C18",
  body: "#54524B",
  green: "#4A7A3E",
  dot: "#3E5C29",
  dash: "#C4CBB5",
  hubGlow: "rgba(215,207,188,0.45)",
};

/* Fixed design canvas - uniformly scaled to container width */
const CANVAS_W = 1536;
const CANVAS_H = 1040;
const CENTER = { x: 768, y: 564 };

/* Ring shrunk (196 -> 158) and hub shrunk to match (see CentralHub, 280 ->
   244) so there's more clear space between the circle and the cards for the
   beams to run. Dots sit ON the ring; beams start just OUTSIDE the dot. */
const RING_R = 158;
const DOT_R = 8;
const BEAM_START_GAP = 6; // beam begins this far past the dot's outer edge

/* Central image (served from Next.js /public) */
const CENTRAL_IMAGE = "/about/kshscroll/aboutKSH.png";

/* Card geometry + the arc.
   Each visual row has a vertical center (yc) and an "offset" = how far the
   card's inner edge sits from the center x. Top/bottom rows tuck IN (small
   offset); the middle rows push OUT (large offset) to wrap the circle.

   Middle cards pushed further out (215 -> 260) and the ring shrunk, so the
   beams to the middle cards are now long and clearly visible instead of
   cramped. Outer offset nudged out slightly (170 -> 180) to keep the arc.
   Vertical spacing (184) kept from the last pass. Still symmetric L/R and
   clear of the ring (r158) and hub (r122). */
const CARD_W = 450;
const ROWS = [
  { yc: 288, off: 180 },
  { yc: 472, off: 260 },
  { yc: 656, off: 260 },
  { yc: 840, off: 180 },
];
const leftX = (off) => CENTER.x - off - CARD_W;
const rightX = (off) => CENTER.x + off;

/* =========================================================================
   Icons
   ========================================================================= */
function StrokeIcon({ size = 40, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={T.green}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const ClipboardCheck = (p) => (
  <StrokeIcon {...p}>
    <rect x="5" y="4" width="14" height="17" rx="2.2" />
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="M8.5 9h4M8.5 12.5h3.5M8.5 16h2" />
    <circle cx="15.6" cy="15.6" r="3.1" />
    <path d="M14.35 15.7l.9.9 1.55-1.75" />
  </StrokeIcon>
);

const Handshake = (p) => (
  <StrokeIcon {...p}>
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </StrokeIcon>
);

const TruckClock = (p) => (
  <StrokeIcon {...p}>
    <path d="M10 17h4V6H2v11h1.2" />
    <path d="M14 9h4l3 3v5h-2" />
    <path d="M8.8 17h1.2" />
    <circle cx="6.5" cy="17.6" r="2.1" />
    <circle cx="17.5" cy="17.6" r="2.1" />
    <circle cx="6" cy="6" r="3.1" />
    <path d="M6 4.4V6l1.1.9" />
  </StrokeIcon>
);

const LeadershipTeam = (p) => (
  <StrokeIcon {...p}>
    <circle cx="12" cy="6" r="2.5" />
    <path d="M7.5 14.5a4.5 4.5 0 0 1 9 0" />
    <circle cx="5" cy="9" r="1.9" />
    <path d="M2 15.4a3.3 3.3 0 0 1 5-2.8" />
    <circle cx="19" cy="9" r="1.9" />
    <path d="M22 15.4a3.3 3.3 0 0 1-5-2.8" />
    <circle cx="12" cy="19.4" r="1.55" />
    <path d="M12 16.6v1.2M12 21v1.2M9.2 19.4h1.2M13.6 19.4h1.2M10 17.4l.85.85M13.15 20.55l.85.85M10 21.4l.85-.85M13.15 18.25l.85-.85" />
  </StrokeIcon>
);

const BarChartUp = (p) => (
  <StrokeIcon {...p}>
    <rect x="4" y="13" width="3.2" height="7.5" rx="0.6" />
    <rect x="9.6" y="10" width="3.2" height="10.5" rx="0.6" />
    <rect x="15.2" y="6.5" width="3.2" height="14" rx="0.6" />
    <path d="M5 11 10.5 7 14 9 20 3.5" />
    <path d="M16.7 3.5H20V6.8" />
  </StrokeIcon>
);

const PeopleGroup = (p) => (
  <StrokeIcon {...p}>
    <circle cx="12" cy="7" r="2.7" />
    <path d="M6.8 16a5.2 5.2 0 0 1 10.4 0" />
    <circle cx="5" cy="9.5" r="2" />
    <path d="M2 16.4a3.4 3.4 0 0 1 5.1-2.95" />
    <circle cx="19" cy="9.5" r="2" />
    <path d="M22 16.4a3.4 3.4 0 0 1-5.1-2.95" />
  </StrokeIcon>
);

const PersonStar = (p) => (
  <StrokeIcon {...p}>
    <circle cx="9" cy="8" r="3.1" />
    <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
    <path d="m18.4 3.2 1.15 2.33 2.57.37-1.86 1.81.44 2.56-2.3-1.21-2.3 1.21.44-2.56-1.86-1.81 2.57-.37z" />
  </StrokeIcon>
);

const ShieldCheck = (p) => (
  <StrokeIcon {...p}>
    <path d="M12 3 19 6v5c0 4.6-3 7.7-7 9.2-4-1.5-7-4.6-7-9.2V6z" />
    <path d="m8.8 12 2.1 2.1 4.3-4.3" />
  </StrokeIcon>
);

/* Fallback mark if the central image fails to load */
function BuildingMark({ size = 92 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <g fill={T.green}>
        <rect x="13" y="35" width="10" height="19" rx="1.5" />
        <rect x="25.5" y="26" width="10" height="28" rx="1.5" />
        <path d="M38 54V22l9-6v38z" />
      </g>
    </svg>
  );
}

/* =========================================================================
   Content - data-driven; row = index into ROWS
   ========================================================================= */
const LEFT_FEATURES = [
  {
    key: "execution",
    row: 0,
    Icon: ClipboardCheck,
    title: "Unmatched Execution Capabilities",
    body: [
      "Transacted 4,000+ acres of land, 350+ years of cumulative experience; developing & leasing 65+ Mn. Sq. Ft. logistics real estate",
    ],
  },
  {
    key: "partnerships",
    row: 1,
    Icon: Handshake,
    title: "Strategic Institutional Partnerships",
    body: [
      "Strategic partnerships with marquee global institutional investors delivering 23%+ IRRs",
    ],
  },
  {
    key: "delivery",
    row: 2,
    Icon: TruckClock,
    title: "On Time Delivery",
    body: [
      "Strong execution history with timely & cost-effective delivery of large-scale projects",
    ],
  },
  {
    key: "leadership",
    row: 3,
    Icon: LeadershipTeam,
    title: "Backed By An Experienced Leadership",
    body: [
      "Hands-on leadership team helps remain proactive & achieve institutional-grade land assembly with minimal risks",
    ],
  },
];

const RIGHT_FEATURES = [
  {
    key: "track-record",
    row: 0,
    Icon: BarChartUp,
    title: "Proven Track-Record",
    body: [
      "Track record of delivering ~7 Mn. Sq. Ft. across 7 projects with INR 2,000+ Cr.",
    ],
  },
  {
    key: "tenants",
    row: 1,
    Icon: PeopleGroup,
    title: "Strong Tenant Relationships",
    body: [
      "Strong relationships across major manufacturing & industrial tenants. Track record of achieving higher than market rentals over long-term contracts",
    ],
  },
  {
    key: "advisors",
    row: 2,
    Icon: PersonStar,
    title: "Partnerships With Tier I Advisors",
    body: [
      "Leading advisors & consultants across land acquisition, diligence, legal, structuring, tax, audit, construction, project execution & transaction advisory",
    ],
  },
  {
    key: "governance",
    row: 3,
    Icon: ShieldCheck,
    title: "Best in class Governance",
    body: [
      "ESG Compliant Investments with ESG being a core philosophy at KSH INFRA",
      "AIF set up with an independent Investment Committee (3/5 members)",
    ],
  },
];

/* =========================================================================
   Reusable card
   ========================================================================= */
function FeatureCard({ Icon, title, body, side }) {
  const left = side === "left";
  return (
    <div
      className={`flex items-center gap-[18px] rounded-[40px] px-[26px] py-[20px] shadow-[0_18px_40px_-22px_rgba(90,78,45,0.35)] ${
        left ? "flex-row" : "flex-row-reverse"
      }`}
      style={{
        width: CARD_W,
        background: T.card,
      }}
    >
      <div
        className="flex-none w-[72px] h-[72px] rounded-full grid place-items-center"
        style={{ background: T.iconDisc }}
      >
        <Icon size={40} />
      </div>
      <div className="text-left">
        <h3
          className="mb-[6px] text-[17px] leading-[1.2] font-bold tracking-[-0.01em]"
          style={{ color: T.ink }}
        >
          {title}
        </h3>
        {body.map((p, i) => (
          <p
            key={i}
            className="mt-2 first:mt-0 text-[13.5px] leading-[1.45]"
            style={{ color: T.body }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   Geometry helpers
   ========================================================================= */
/* Unit direction from center toward a card's inner edge. */
function dirTo(inner) {
  const dx = inner.x - CENTER.x;
  const dy = inner.y - CENTER.y;
  const d = Math.hypot(dx, dy) || 1;
  return { ux: dx / d, uy: dy / d };
}

/* Point ON the ring (dot position). */
function ringDot(inner) {
  const { ux, uy } = dirTo(inner);
  return { x: CENTER.x + ux * RING_R, y: CENTER.y + uy * RING_R };
}

/* Point just OUTSIDE the dot - where a beam starts so it never overlaps the
   dot or the ring. */
function beamStart(inner) {
  const { ux, uy } = dirTo(inner);
  const r = RING_R + DOT_R + BEAM_START_GAP;
  return { x: CENTER.x + ux * r, y: CENTER.y + uy * r };
}

function innerEdge(f, side) {
  const r = ROWS[f.row];
  return {
    x: side === "left" ? CENTER.x - r.off : CENTER.x + r.off,
    y: r.yc,
  };
}

/* =========================================================================
   Ring + dots. Dots sit directly ON the ring (no spokes).
   ========================================================================= */
function RingLayer() {
  const dots = [];
  LEFT_FEATURES.forEach((f) =>
    dots.push({ key: f.key, ...ringDot(innerEdge(f, "left")) }),
  );
  RIGHT_FEATURES.forEach((f) =>
    dots.push({ key: f.key, ...ringDot(innerEdge(f, "right")) }),
  );

  return (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      width={CANVAS_W}
      height={CANVAS_H}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={RING_R}
        fill="none"
        stroke={T.dash}
        strokeWidth="1.4"
        strokeDasharray="5 6"
      />
      {dots.map((d) => (
        <circle key={d.key} cx={d.x} cy={d.y} r={DOT_R} fill={T.dot} />
      ))}
    </svg>
  );
}

/* =========================================================================
   Beam layer - plain static continuous lines from just outside each dot to
   its card. Lines start past the dot's outer edge (beamStart) so they never
   overlap the dots or the ring. No animation.
   ========================================================================= */
function BeamLayer() {
  const beams = [];
  const push = (f, side) => {
    const inner = innerEdge(f, side);
    beams.push({ key: f.key, start: beamStart(inner), end: inner });
  };
  LEFT_FEATURES.forEach((f) => push(f, "left"));
  RIGHT_FEATURES.forEach((f) => push(f, "right"));

  return (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      width={CANVAS_W}
      height={CANVAS_H}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      {beams.map((b) => (
        <line
          key={b.key}
          x1={b.start.x}
          y1={b.start.y}
          x2={b.end.x}
          y2={b.end.y}
          stroke={T.dash}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.6"
        />
      ))}
    </svg>
  );
}

/* =========================================================================
   Hub - central image inside the circle (falls back to the mark on error)
   ========================================================================= */
function CentralHub() {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 w-[244px] h-[244px] rounded-full grid place-items-center"
      style={{
        left: CENTER.x,
        top: CENTER.y,
        // background: T.hubGlow,
      }}
    >
      <div
        className="w-full grid place-items-center overflow-hidden"
        style={{}}
      >
        {failed ? (
          <BuildingMark size={92} />
        ) : (
          <img
            src={CENTRAL_IMAGE}
            alt="KSH INFRA"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover block"
          />
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   Main section
   ========================================================================= */
export default function KshInfraSection() {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / CANVAS_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const renderCard = (f, side) => {
    const r = ROWS[f.row];
    const x = side === "left" ? leftX(r.off) : rightX(r.off);
    return (
      <div
        key={f.key}
        className="absolute -translate-y-1/2"
        style={{
          left: x,
          top: r.yc,
        }}
      >
        <FeatureCard {...f} side={side} />
      </div>
    );
  };

  return (
    <section
      style={{
        background: T.bg,
        fontFamily:
          "'Poppins','Nunito Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
      }}
    >
      <div
        ref={wrapRef}
        className="relative w-full mx-auto overflow-hidden"
        style={{
          maxWidth: CANVAS_W,
          height: CANVAS_H * scale,
        }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            transform: `scale(${scale})`,
          }}
        >
          <h1
            className="absolute top-[40px] left-0 text-center m-0 text-[46px] leading-[1.15] font-extrabold tracking-[-0.02em]"
            style={{
              width: CANVAS_W,
              color: T.ink,
            }}
          >
            KSH INFRA is well positioned as an
            <br />
            Integrated Fund &amp; Development Manager
          </h1>

          <RingLayer />
          <BeamLayer />
          <CentralHub />

          {LEFT_FEATURES.map((f) => renderCard(f, "left"))}
          {RIGHT_FEATURES.map((f) => renderCard(f, "right"))}
        </div>
      </div>
    </section>
  );
}
