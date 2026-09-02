"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
// import Eyebrow from "@/components/AifComponents/Eyebrow";
import MemberCard from "@/components/AifComponents/Governance/MemberCard";
import Popup from "@/components/sections/team/popup";
import { stopLenis, startLenis } from "@/components/ui/LenisProvider";

const IC_PRINCIPLES = [
  {
    title: "Independent & disciplined decision making",
    body: "All investments, exits and incremental capital deployment are subject to Investment Committee approval",
  },
  {
    title: "Robust oversight framework",
    body: "Continuous monitoring of project performance vs. underwriting",
  },
  {
    title: "Defined risk triggers & controls",
    body: "IC intervention is mandated for any material deviations in IRR, costs, timelines and leasing assumptions",
  },
  {
    title: "Strong governance & conflict management",
    body: "Robust governance frameworks and processes to ensure transparency, accountability and effective conflict management",
  },
  {
    title: "Structured & active engagement",
    body: "Regular reviews and engagement aligned with the Fund's investment strategy and operations",
  },
];

// Rohit Hegde and Sundaresan Vaidyanathan also appear on the Team section
// (components/sections/team/memberssec.tsx) — their photo, description and
// linkedin here are kept identical to that source so the same person's data
// doesn't drift between the two sections. The other three IC members are
// independent members with no Team-section counterpart, so they keep their
// own governance-specific bios.
const CONFIRMED_MEMBERS = [
  {
    photo: "/aif/governance/tarana.png",
    name: "Tarana Lalwani",
    role: "Founding Partner, InnoVen Capital",
    academics: [
      "MBA Corporate Finance & Entrepreneurship – Columbia Business School",
      "BSc. Accounting & Economics – La Salle University",
    ],
    description:
      "20+ years of experience across venture capital, venture debt, investment banking, and structured finance.<br /><br />She has backed leading companies including ElasticRun, Porter, Zetwerk, BharatPe, and Servify, and has previously held investment roles at Seedfund, Radian, and Morgan Stanley",
    linkedin: "https://www.linkedin.com/in/tarana/",
  },
  {
    photo: "/aif/governance/dhr.jpg",
    name: "Dhruv Chopra",
    role: "Founder, MYAN Advisors",
    academics: [
      "MA Economics – Tufts University",
      "MBA Finance – Columbia Business School",
    ],
    description:
      "25+ years of experience across equity research, investor relations, and advisory, across New York, London, Hong Kong, and Mumbai.<br /><br />Founder of MYAN Advisors, he has previously held leadership positions at ICR, Lesaka Technologies (Net1), MobiKwik and Morgan Stanley",
    linkedin: "https://www.linkedin.com/in/dhruvchopra2009/",
  },
  {
    photo: "/aif/governance/ramch.jpg",
    name: "Ramachandran Chellam",
    role: "Strategic Advisor & Board Member, Green Malabar Finance Ventures",
    academics: [
      "CA (Rank Holder) – Institute of Chartered Accountants of India",
    ],
    description:
      "30+ years of experience in financial services, with expertise in strategic planning, fundraising, mergers & acquisitions, and CFO transformation.<br /><br />He has held senior leadership and CFO roles at Barclays Bank, Centurion Bank of Punjab, Eskan Bank, Bank Muscat, & IDBI Bank",
    linkedin: "https://www.linkedin.com/in/ramachandran-chellam-81886114/",
  },
  {
    photo: "/ourteam/team/mem2.png",
    name: "Rohit Hegde",
    role: "Managing Director, KSH INFRA",
    academics: [
      "Executive Masters in Change, System Psychodynamics - INSEAD",
      "MBA Finance – Sheffield Hallam University",
    ],
    description:
      "Rohit Hegde, Managing Director of KSH INFRA, is a visionary leader with deep expertise in real estate, infrastructure, and sustainable development. With a strong foundation in research, consulting, and strategic investment, he brings a sharp analytical mindset and a hands-on leadership style to the company. Known for his integrity, foresight, and commitment to excellence, Rohit has been instrumental in driving KSH INFRA’s growth across India. His passion for building future-ready, green infrastructure has positioned the brand as a trusted industry leader. Rohit’s people-first approach, combined with his strategic acumen, continues to inspire innovation and long-term value creation at KSH INFRA.",
    linkedin:
      "https://www.linkedin.com/in/rohit-hegde-79bab25?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAENVOcBEXKuJalMacOYRYklNSZ4cE9-iGY&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BKYuyOIGKRJ6N4e%2BltiGjiw%3D%3D",
  },
  {
    photo: "/ourteam/team/frame4.png",
    name: "Sundaresan Vaidyanathan",
    role: "CEO, KSH INFRA",
    academics: [
      "Global Program for Management Development 2016, Organizational Leadership – University of Michigan – Stephen M. Ross School of Business",
      "Masters in Business Administration, Finance and Marketing – IMI Delhi",
    ],
    description:
      "Sundaresan Vaidyanathan is the Chief Executive Officer of KSH INFRA, bringing over two decades of experience in real estate Investments, Land acquisition and Industrial Infrastructure development. Prior to joining KSH INFRA, he held senior leadership positions at Welspun One Logistics Parks, Mahindra Lifespaces and Tata Housing, where he played a key role in Investment Strategy, Platform expansion and the development of large-scale real estate projects across India.<br /><br />At KSH INFRA, Sundaresan leads the company's strategic growth and expansion, driving its transformation into an Integrated Industrial Infrastructure platform. He oversees Investment Strategy, Market Expansion, Institutional partnerships and Fund raising, while championing sustainable development and creating long-term value for stakeholders across KSH INFRA's Industrial and Logistics portfolio.",
    linkedin: "https://www.linkedin.com/in/sundaresan-vaidyanathan-12b7912/",
  },
];

export default function InvestmentCommittee() {
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{
    name: string;
    designation: string;
    linkedin?: string;
    academics?: string[];
    description: string;
  } | null>(null);

  useEffect(() => {
    if (!open) return;
    stopLenis();
    return () => startLenis();
  }, [open]);

  return (
    <section className="bg-[#fbf2e8]">
      <div className="fix py-16 lg:py-20">
        {/* <Eyebrow>Investment Committee</Eyebrow> */}
        <h2 className="mb-5 max-w-[26ch] font-sora text-[28px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#212121] sm:text-[36px] lg:text-[44px]">
          Unbiased investment oversight through an independent IC framework
        </h2>
        <p className="mb-12 max-w-[74ch] font-inter text-lg leading-[1.4] text-[#4a4a4a] lg:mb-16 lg:text-xl">
          The AIF is set up with an independent Investment Committee &mdash; 3
          of 5 members are independent.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-11 lg:gap-y-0">
          {IC_PRINCIPLES.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-2.5 border-t border-[#ded9cf] pt-[18px]"
            >
              <div className="font-sora text-xl font-semibold leading-[1.2] xl:h-20 tracking-[-0.02em] text-[#212121]">
                {item.title}
              </div>
              <p className="m-0 font-inter text-base leading-[1.4] text-[#4a4a4a]">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="my-16 h-px bg-[#d8d3c7]" />

        {/* <div className="mb-4.5 flex items-center gap-2">
          <span className="font-sora text-xs text-[#59624D]">{"//"}</span>
          <span className="font-sora text-xs uppercase tracking-[-0.02em] text-[#59624D]">
            Investment Committee
          </span>
        </div> */}
        <h3 className="m-0 mb-6 text-left font-sora text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#212121] lg:text-[34px]">
          Investment Committee Members
        </h3>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONFIRMED_MEMBERS.map((member) => (
            <MemberCard
              key={member.name}
              photo={member.photo}
              name={member.name}
              role={member.role}
              linkedin={member.linkedin}
              onClick={() => {
                setSelectedMember({
                  name: member.name,
                  designation: member.role,
                  description: member.description,
                  linkedin: member.linkedin,
                  academics: member.academics,
                });
                setOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <Popup
            key="ic-popup"
            open={open}
            onClose={() => setOpen(false)}
            member={selectedMember}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
