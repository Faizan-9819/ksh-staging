"use client";

import Image from "next/image";

export default function ContactHero() {
  return (
    <section
      className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-[#CBC4B5] font-[family:var(--font-inter),sans-serif] flex flex-col justify-between"
      style={{
        // @ts-ignore
        "--margin": "clamp(16px, 5.7vw, 80px)",
      }}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <Image
          src="/home/ContactHero.png"
          alt="KSH INFRA Industrial Park"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom sm:object-fill pointer-events-none w-full h-full"
        />

        {/* Concentric Geometric Arcs */}
        <div className="hidden lg:block absolute left-[58%] top-[34%] w-[62%] pb-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 pointer-events-none" />
        <div className="hidden lg:block absolute left-[58%] top-[34%] w-[44%] pb-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] pointer-events-none" />
      </div>

      {/* Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none z-[2]" />

      {/* Side Hairline Guides */}
      <div
        className="absolute top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-[1]"
        style={{ left: "var(--margin)" }}
      />
      <div
        className="absolute top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-[1]"
        style={{ right: "var(--margin)" }}
      />

      {/* Navigation */}

      {/* Watermark Text Container - Positioned to the absolute rightmost edge */}
      <div className="absolute bottom-0 right-0 z-[3] flex justify-end pointer-events-none overflow-hidden w-full">
        <h1
          className="font-[family:var(--font-sora),sans-serif] capitalize select-none pointer-events-none whitespace-nowrap translate-x-[2%] lg:translate-x-[1%]"
          style={{
            fontSize: "clamp(64px, 15vw, 220px)",
            fontWeight: 700,
            lineHeight: "0.85",
            letterSpacing: "clamp(-2px, -0.03em, -6px)",
            background:
              "linear-gradient(180deg, rgba(229, 229, 229, 0.60) 27.25%, rgba(255, 255, 255, 0.00) 85%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Contact
        </h1>
      </div>
    </section>
  );
} // "use client";

// import Image from "next/image";
// import Navbar from "@/components/ui/Navbar";

// export default function ContactHero() {
//   return (
//     <section
//       className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-[#0F1D3A] font-[family:var(--font-inter),sans-serif] flex flex-col justify-between"
//       style={{
//         // @ts-ignore
//         "--margin": "clamp(16px, 5.7vw, 80px)",
//       }}
//     >
//       {/* Background Image Container - Unchanged */}
//       <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
//         <Image
//           src="/home/ContactHero.png"
//           alt="KSH INFRA Industrial Park"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover object-bottom sm:object-fill pointer-events-none w-full h-full"
//         />

//         {/* Concentric Geometric Arcs */}
//         <div className="hidden lg:block absolute left-[58%] top-[34%] w-[62%] pb-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 pointer-events-none" />
//         <div className="hidden lg:block absolute left-[58%] top-[34%] w-[44%] pb-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] pointer-events-none" />
//       </div>

//       {/* Scrim Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none z-[2]" />

//       {/* Side Hairline Guides */}
//       <div
//         className="absolute top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-[1]"
//         style={{ left: "var(--margin)" }}
//       />
//       <div
//         className="absolute top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none z-[1]"
//         style={{ right: "var(--margin)" }}
//       />

//       {/* Navigation */}

//       {/* Watermark Text Container - Positioned Slightly Down with Uniform Letter Styling */}
//       <div
//         className="relative z-[3] w-full flex items-end justify-end pointer-events-none overflow-hidden -mb-2 sm:-mb-4 lg:-mb-6"
//         style={{ paddingRight: "var(--margin)" }}
//       >
//         <h1
//           className="font-[family:var(--font-sora),sans-serif] text-center uppercase select-none pointer-events-none whitespace-nowrap"
//           style={{
//             fontSize: "clamp(52px, 13.2vw, 180px)",
//             fontWeight: 700,
//             lineHeight: "0.85",
//             letterSpacing: "clamp(-2px, -0.04em, -7.2px)",
//             background:
//               "linear-gradient(180deg, rgba(229, 229, 229, 0.60) 27.25%, rgba(255, 255, 255, 0.00) 69.98%)",
//             WebkitBackgroundClip: "text",
//             backgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           CONTACT
//         </h1>
//       </div>
//     </section>
//   );
// }
