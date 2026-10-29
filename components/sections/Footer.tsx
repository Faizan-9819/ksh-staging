// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { GoArrowUpRight } from "react-icons/go";
// import Btn from "../ui/Btn";
// // import { IoLogoInstagram } from "react-icons/io5";
// // import { CiFacebook, CiLinkedin } from "react-icons/ci";
// // import { FiYoutube } from "react-icons/fi";

// import { FaFacebookF } from "react-icons/fa";

// import { FaLinkedinIn } from "react-icons/fa";

// import { FaYoutube } from "react-icons/fa";

// import { RiInstagramFill } from "react-icons/ri";
// // import {
// //   PiLinkedinLogo,
// //   PiFacebookLogo,
// //   PiInstagramLogo,
// //   PiYoutubeLogo,
// // } from "react-icons/pi";
// const NAV_COLS = [
//   [
//     { label: "Home", active: true },
//     { label: "Network", active: false },
//     { label: "Capabilities", active: false },
//     { label: "Solutions", active: false },
//   ],
//   [
//     { label: "Insights", active: false },
//     { label: "Sustainability & Impact", active: false },
//     { label: "Know Us", active: false },
//     { label: "Investor Relations", active: false },
//   ],
// ];

// const SOCIALS = [
//   {
//     label: "LinkedIn",
//     href: "#",
//     icon: <FaLinkedinIn />,
//   },
//   {
//     label: "YouTube",
//     href: "#",
//     icon: <FaYoutube />,
//   },
//   {
//     label: "Facebook",
//     href: "#",
//     icon: <FaFacebookF />,
//   },
//   {
//     label: "Instagram",
//     href: "#",
//     icon: <RiInstagramFill />,
//   },
// ];

// export default function Footer() {
//   function handleSubmit(e) {
//     e.preventDefault();
//   }

//   return (
//     <section className="relative w-full overflow-hidden rounded-t-[20px] bg-[#F9F7F2]">
//       <div className="fix">
//         <div className="relative p-[clamp(48px,5.5cqw,80px)_30px_clamp(44px,4.5cqw,64px)]">
//           {/* TOP ROW */}
//           <div className="grid grid-cols-1 gap-[clamp(32px,4cqw,56px)] md:grid-cols-2 items-start">
//             <div>
//               <div className="flex items-center mb-[clamp(26px,3cqw,40px)]">
//                 <img
//                   src="/ksh-black.svg"
//                   alt="KSH INFRA"
//                   className="h-[clamp(40px,4cqw,70px)] -ml-5 object-cover w-[230px]"
//                 />
//               </div>

//               <p className="max-w-[560px] text-[clamp(14px,1.12cqw,16px)] leading-[140%] text-[#000]">
//                 KSH INFRA is an integrated industrial infrastructure platform
//                 focused on investing, developing, leasing, and managing Grade A
//                 Industrial & Logistics assets across India's key growth
//                 corridors.
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
//               <h2 className="section-title font-semibold tracking-[-0.6px] leading-normal text-[30px]">
//                 Join Our Newletter
//               </h2>
//               <div className="grid grid-cols-2 gap-[clamp(14px,1.5cqw,20px)]">
//                 {["NAME", "EMAIL"].map((placeholder) => (
//                   <input
//                     key={placeholder}
//                     type="text"
//                     placeholder={placeholder}
//                     className="h-[47px] rounded-full bg-black/10 text-[12px] text-[#000] placeholder:text-[#000] px-6 "
//                   />
//                 ))}
//               </div>
//               <Btn
//                 arrowColor="stroke-[#59624D]"
//                 hoverBgColor="bg-[#5E6E4E]"
//                 bgColor="bg-[transparent]"
//                 borderColor="border-[#59624D]"
//                 textColor="#59624D"
//                 label="Submit"
//                 className="group inline-flex h-[clamp(50px,4.4cqw,38px)] w-[247px]! items-center rounded-full transition-colors "
//               />
//             </form>
//           </div>

//           {/* Divider */}
//           <div className="my-[clamp(36px,4cqw,24px)] h-px bg-[#E4E4E4]" />

//           {/* BOTTOM ROW */}
//           <div className="grid grid-cols-1 gap-x-[80px] md:grid-cols-2">
//             <div className="grid grid-cols-2 gap-[clamp(24px,2.6cqw,40px)]">
//               {NAV_COLS.map((col, ci) => (
//                 <div key={ci}>
//                   {col.map(({ label }) => (
//                     <a
//                       key={label}
//                       href="#"
//                       /* relative: anchors the absolute border
//              group: tracks hover state for children
//              overflow-hidden: ensures the line stays inside the link
//           */
//                       className="relative overflow-hidden flex items-center group justify-between py-[clamp(15px,1.6cqw,14px)]"
//                     >
//                       {/* Static Black Border (Base) */}
//                       <div className="absolute group bottom-0 left-0 h-[1.5px] w-full bg-[#636363]" />

//                       {/* Animated Black Border (Overlay) */}
//                       <div className="absolute bottom-0 left-0 h-[1px] w-full bg-black scale-x-0 transition-transform duration-400 ease-in-out origin-left group-hover:scale-x-100" />

//                       <h4 className="text-[16px] tracking-[-0.32px] transition-colors text-[#636363] group-hover:text-black">
//                         {label}
//                       </h4>

//                       <div className="flex h-[clamp(32px,2.7cqw,38px)] group-hover:bg-black group-hover:text-white w-[clamp(32px,2.7cqw,38px)] items-center justify-center transition-all duration-500 rounded-full border border-[#636363] group-hover:border-black">
//                         <GoArrowUpRight />
//                       </div>
//                     </a>
//                   ))}
//                 </div>
//               ))}
//             </div>
//             {/* <div className="grid grid-cols-2 gap-[clamp(24px,2.6cqw,40px)]">
//               {NAV_COLS.map((col, ci) => (
//                 <div key={ci}>
//                   {col.map(({ label, active }) => (
//                     <a
//                       key={label}
//                       href="#"
//                       className="flex items-center group  justify-between border-b border-[#333] py-[clamp(15px,1.6cqw,14px)]"
//                     >
//                       <h4
//                         className={`text-[clamp(15px,1.3cqw,18px)] font-medium transition-colors text-[#333] group-hover:text-black`}
//                       >
//                         {label}
//                       </h4>
//                       <div
//                         className={`flex h-[clamp(32px,2.7cqw,38px)] group-hover:bg-[#C55C25] group-hover:text-white w-[clamp(32px,2.7cqw,38px)] items-center justify-center transition-all duration-500 rounded-full border `}
//                       >
//                         <GoArrowUpRight />
//                       </div>
//                     </a>
//                   ))}
//                 </div>
//               ))}
//             </div> */}

//             <div className="">
//               <div className="mb-[clamp(34px,3.6cqw,48px)]  grid grid-cols-2 gap-[28px]">
//                 <div>
//                   <h2 className="mb-3.5 text-[20px] tracking-[-0.4px] text-[#000]">
//                     KSH INFRA, Pune (Head Office)
//                   </h2>
//                   <p className="text-[clamp(13px,1.08cqw,14px)]  leading-[140%] text-[#333]">
//                     Gokhale Sanchit, Office No. 4, <br />
//                     Survey No. 846, Servants of India Society, <br />
//                     Near Marathwada College, Shivajinagar, <br />
//                     Pune, Maharashtra - 411 004 (India)
//                   </p>
//                 </div>
//                 <div>
//                   <h2 className="mb-3.5 text-[20px] tracking-[-0.4px] text-[#000]">
//                     KSH INFRA, Mumbai
//                   </h2>
//                   <p className="text-[clamp(13px,1.08cqw,14px)] w-[85%] leading-[140%] text-[#333]">
//                     INNOV8, 8th Floor, Tower B, <br />
//                     Peninsula Business Park, <br />
//                     Lower Parel (W), Mumbai – 400013.
//                   </p>
//                 </div>
//               </div>
// fazi
//               {/* Policies and Socials */}
//               <div className="flex flex-wrap w-full justify-between gap-6">
//                 <div>
//                   <h2 className="mb-4 text-[clamp(18px,1.7cqw,20px)] tracking-[-0.4px] text-[#000]">
//                     Policies
//                   </h2>
//                   {["Privacy", "Disclaimer"].map((p) => (
//                     <a
//                       key={p}
//                       href="#"
//                       className="block text-[clamp(13px,1.08cqw,15px)] mb-2 font-[family:var(--font-sora),sans-serif] text-[#333] hover:text-[#C55C25]"
//                     >
//                       {p}
//                     </a>
//                   ))}
//                 </div>
//                 <div className="flex gap-2 mr-12">
//                   {SOCIALS.map(({ label, href, icon }) => (
//                     <a
//                       key={label}
//                       href={href}
//                       aria-label={label}
//                       className="flex h-[42px] w-[42px] hover:-translate-y-1 p-1 transition-all duration-500 items-center justify-center rounded-full bg-black text-white!"
//                     >
//                       {icon}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import Link from "@/components/ui/Link";
import { useRef, useState } from "react";
import Btn from "../ui/Btn";
import ArrowUpRightIcon from "../ui/ArrowUpRightIcon";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FiMail, FiPhone } from "react-icons/fi";
// import { NODAL_OFFICER } from "@/lib/nodalOfficer";

// href is null where this project has no matching page yet — those labels
// stay visible but non-navigating instead of linking to the wrong place.
// "Media" points at /blogs, the tabbed Blogs/News/Press Release landing page
// the navbar's Media dropdown links into (a "#" fallback made Ctrl+click
// just reopen whatever page you were already on).
const NAV_COLS: {
  title: string;
  links: { label: string; href: string | null }[];
}[] = [
  {
    title: "Explore KSH INFRA",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about-ksh" },
      { label: "Parks", href: "/parks" },
      { label: "Investors", href: "/investors" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Media", href: "/blogs" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ksh-infra/?viewAsMember=true",
    icon: <FaLinkedinIn />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCae7QNTK0AUOf7kxBF53hag",
    icon: <FaYoutube />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/KSHInfraIndia/",
    icon: <FaFacebookF />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kshinfrapark/",
    icon: <RiInstagramFill />,
  },
];

const CONTACT_DETAILS = [
  {
    label: "leasing@kshinfra.com",
    href: "mailto:leasing@kshinfra.com",
    icon: <FiMail />,
  },
  {
    label: "1800-212-2030 (Toll-Free)",
    href: "tel:18002122030",
    icon: <FiPhone />,
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return;

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSending(true);
    setError("");

    const sourceUrl = typeof window !== "undefined" ? window.location.href : "";

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriber_name: name,
          subscriber_email: email,
          source_url: sourceUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.error || "Submission failed");
      }

      setIsSubmitted(true);
      setName("");
      setEmail("");
    } catch (err) {
      console.error("Newsletter form error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <footer className="relative w-full overflow-hidden rounded-t-[20px] bg-[#F9F7F2]">
      <div className="fix">
        <div className="relative lg:py-24 py-12">
          {/* TOP ROW */}
          <div className="grid grid-cols-1 gap-[clamp(32px,4cqw,56px)] md:grid-cols-2 items-start">
            <div>
              <div className="flex items-center mb-[clamp(26px,3cqw,40px)] max-md:mb-6">
                <img
                  src="/Footer Registered.png"
                  alt="KSH INFRA"
                  className="h-[60px] -ml-5 max-md:-ml-3 object-cover  w-[230px]"
                />
              </div>

              <p className="max-w-[560px] text-[clamp(14px,1.12cqw,16px)] leading-[140%] text-[#000]">
                KSH INFRA is an integrated Industrial infrastructure platform
                focused on investing, developing, leasing, and managing Grade A
                Industrial & Logistics assets across India&apos;s key growth
                corridors.
              </p>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-[20px] w-full"
              noValidate
            >
              <h2 className="section-title font-semibold tracking-[-0.6px] leading-normal text-[30px] max-md:text-[24px]">
                Join Our Newsletter
              </h2>

              {isSubmitted ? (
                <p className="text-[14px] text-[#000]">
                  Thanks for subscribing — check your inbox!
                </p>
              ) : (
                <>
                  <input
                    type="text"
                    name="honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                    className="absolute left-[-9000px]"
                    aria-hidden="true"
                  />
                  <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-[clamp(14px,1.5cqw,20px)]">
                    <input
                      type="text"
                      placeholder="NAME"
                      aria-label="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSending}
                      className="h-[47px] w-full rounded-full bg-black/10 text-[12px] text-[#000] placeholder:text-[#000] px-6 focus:ring-1 focus:ring-[#59624D]/30"
                    />
                    <input
                      type="email"
                      placeholder="EMAIL"
                      aria-label="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSending}
                      className="h-[47px] w-full rounded-full bg-black/10 text-[12px] text-[#000] placeholder:text-[#000] px-6 focus:ring-1 focus:ring-[#59624D]/30"
                    />
                  </div>
                  {error && <p className="text-[12px] text-red-600">{error}</p>}
                  <Btn
                    arrowColor="stroke-[#59624D]"
                    hoverBgColor="bg-[#59624D]"
                    bgColor="bg-[transparent]"
                    borderColor="border-[#59624D]"
                    textColor="text-[#59624D]!"
                    fontWeight="font-normal"
                    label={isSending ? "Submitting..." : "Submit"}
                    className={`group inline-flex h-[48px] w-[247px]! max-sm:w-full! justify-between! items-center rounded-full transition-colors ${isSending ? "opacity-50 pointer-events-none" : ""}`}
                  />
                </>
              )}
            </form>
          </div>

          {/* Divider */}
          <div className="my-[clamp(36px,4cqw,24px)] max-md:my-8 h-px bg-[#E4E4E4]" />

          {/* BOTTOM ROW */}
          <div className="grid grid-cols-1 gap-y-10 gap-x-[80px] md:grid-cols-2">
            {/* Navigation Links - Stacked on Mobile for clean UI */}
            <nav aria-label="Footer" className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-[clamp(24px,2.6cqw,40px)] gap-y-0 max-sm:gap-y-6">
              {NAV_COLS.map((col) => (
                <div key={col.title} className="flex flex-col">
                  <h2 className="mb-2 text-[clamp(18px,1.7cqw,20px)] tracking-[-0.4px] font-medium text-[#000]">
                    {col.title}
                  </h2>
                  {col.links.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href ?? "#"}
                      aria-disabled={href === null}
                      className="relative overflow-hidden flex items-center group justify-between gap-4 py-[clamp(15px,1.6cqw,14px)]"
                    >
                      {/* Static Black Border (Base) */}
                      <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[#00000020]" />

                      {/* Animated Black Border (Overlay) */}
                      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-black scale-x-0 transition-transform duration-400 ease-in-out origin-left group-hover:scale-x-100" />

                      <span className="font-sora text-[16px] tracking-[-0.32px] transition-colors text-[#636363] group-hover:text-black group-focus-visible:text-black">
                        {label}
                      </span>

                      <div className="flex h-[clamp(32px,2.7cqw,38px)] w-[clamp(32px,2.7cqw,38px)] shrink-0 items-center justify-center rounded-full bg-transparent border border-[#59624D] text-[#59624D] group-hover:bg-[#59624D] group-hover:text-white transition-all duration-500 transform-gpu">
                        <ArrowUpRightIcon size={14} />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </nav>

            {/* Address & Policy Meta Block */}
            {/* justify-start (not justify-between) — with only 2 children,
                justify-between dumps ALL leftover height (from this column
                being grid-stretched to match the taller nav-links column
                beside it) into the single gap between them, so the divider
                line ends up sitting much closer to the address text above
                it than to "Policies"/"Registered details" below. gap-6
                matches the pb-6 above the line exactly, so the line is
                perfectly centered between the two rows either way. */}
            <div className="flex flex-col justify-start gap-6">
              {/* Address Columns — grid-cols-2 gives both columns equal
                  width AND (via the default grid row-stretch) equal height,
                  so each column's own border-b sits at the same level as a
                  separate, equal-width line rather than one line spanning
                  both — the columns' actual text runs differ in length
                  (Pune's address is one line longer than Mumbai's), so
                  without the grid's row-stretch behavior these two borders
                  would otherwise land at two different heights. */}
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-7 gap-y-6">
                <div className="border-b border-[#00000020] pb-6">
                  <h2 className="mb-3.5 text-[20px] tracking-[-0.4px] font-medium text-[#000]">
                    KSH INFRA, Pune <br /> (Head Office)
                  </h2>
                  <p className="text-[clamp(13px,1.08cqw,14px)] leading-[140%] text-[#333]">
                    Gokhale Sanchit, Office No. 4, <br />
                    Survey No. 846, Servants of India Society, <br />
                    Near Marathwada College, Shivajinagar, <br />
                    Pune, Maharashtra - 411 004 (India)
                  </p>
                </div>
                <div className="border-b border-[#00000020] pb-6">
                  <h2 className="mb-3.5 text-[20px] tracking-[-0.4px] font-medium text-[#000]">
                    KSH INFRA, Mumbai
                  </h2>
                  <p className="text-[clamp(13px,1.08cqw,14px)] md:w-[85%] leading-[140%] text-[#333]">
                    INNOV8, 8th Floor, Tower B, <br />
                    Peninsula Business Park, <br />
                    Lower Parel (W), Mumbai – 400013.
                  </p>
                </div>
              </div>

              {/* Policies + Socials (stacked, left) and Registered details
                  (right) — same grid-cols-2 + gap as the address row above,
                  so both rows form one aligned 2x2 block of equal-width
                  columns. */}
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-7 gap-y-6">
                {/* Left: Connect, then Policies below it */}
                <div className="flex flex-col gap-9">
                  <div>
                    <h2 className="mb-4 text-[clamp(18px,1.7cqw,20px)] tracking-[-0.4px] font-medium text-[#000]">
                      Connect
                    </h2>
                    <div className="flex flex-col gap-3">
                      {CONTACT_DETAILS.map(({ label, href, icon }) => (
                        <a
                          key={label}
                          href={href}
                          className="flex items-center gap-2 group mt- text-[clamp(13px,1.08cqw,15px)] font-[family:var(--font-sora),sans-serif] text-[#333] hover:text-[#C55C25] transition-colors"
                        >
                          <span className="flex h-[30px] w-[30px] mt- shrink-0 items-center justify-center rounded-full group-hover:bg-[#59624D] group-hover:border-[#59624D] transition-all duration-300 bg-black border border-[#000] text-[#fff]">
                            <span className="text-[15px]">{icon}</span>
                          </span>
                          <span className="h-full">{label}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* TODO(KSH): Nodal Officer block hidden until KSH shares the officer details (lib/nodalOfficer.ts).
                  <div>
                    <h2 className="mb-2 text-[clamp(18px,1.7cqw,20px)] tracking-[-0.4px] font-medium text-[#000]">
                      Accessibility (Nodal Officer)
                    </h2>
                    <div className="flex flex-col gap-1.5 text-[clamp(13px,1.08cqw,15px)] font-[family:var(--font-sora),sans-serif] text-[#333]">
                      <p className="m-0">
                        {NODAL_OFFICER.name}, {NODAL_OFFICER.designation}
                      </p>
                      <a
                        href={`mailto:${NODAL_OFFICER.email}`}
                        className="hover:text-[#C55C25] transition-colors"
                      >
                        {NODAL_OFFICER.email}
                      </a>
                      <a
                        href={NODAL_OFFICER.phoneHref}
                        className="hover:text-[#C55C25] transition-colors"
                      >
                        {NODAL_OFFICER.phone}
                      </a>
                    </div>
                  </div>
                  */}

                  <div>
                    <h2 className="mb-1 text-[clamp(18px,1.7cqw,20px)] tracking-[-0.4px] font-medium text-[#000]">
                      Policies
                    </h2>
                    <div className="flex flex-col gap-2">
                      {[
                        { label: "Privacy Policy", href: "/privacy-policy" },
                        {
                          label: "Accessibility Statement",
                          href: "/accessibility-statement",
                        },
                        // { label: "Disclaimer", href: "#" },
                      ].map(({ label, href }) => (
                        <Link
                          key={label}
                          href={href}
                          className="block text-[clamp(13px,1.08cqw,15px)] font-[family:var(--font-sora),sans-serif] text-[#333] hover:text-[#C55C25] transition-colors"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Registered details */}
                <div>
                  <h2 className="mb-3.5 text-[20px] tracking-[-0.4px] font-medium text-[#000]">
                    KSH INFRA FUND I <br /> Registration Details
                  </h2>
                  <div className="flex flex-col gap-2.5 text-[clamp(13px,1.08cqw,14px)] leading-[140%] text-[#333]">
                    <p className="m-0">
                      <span className="text-[#333] text-[14px] font-medium">
                        CIN No (Investment Manager):
                      </span>{" "}
                      U66300PN2024PTC229079
                    </p>
                    <p className="m-0">
                      <span className="text-[#333] text-[14px] font-medium">
                        CIN No (Development Manager):
                      </span>{" "}
                      U70200PN2018PTC175793
                    </p>
                    <p className="m-0">
                      <span className="text-[#333] text-[14px] font-medium">
                        AIF SEBI registration:
                      </span>{" "}
                      IN/AIF2/26-27/2209
                    </p>
                  </div>

                  {/* Social Media Links — under Registration Details */}
                  <div className="flex gap-2 items-center mt-6">
                    {SOCIALS.map(({ label, href, icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-[42px] w-[42px] hover:-translate-y-1 active:translate-y-0 p-1 transition-all duration-300 items-center justify-center rounded-full bg-black text-white! hover:bg-[#5E6E4E]"
                      >
                        <span className="text-[16px]">{icon}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
