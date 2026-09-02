"use client";

import Link from "@/components/ui/Link";

export interface AboutLink {
  label: string;
  href: string;
}

export const ABOUT_LINKS: AboutLink[] = [
  { label: "Overview", href: "/about-ksh" },
  { label: "Vision, Mission & Values", href: "/about-ksh#vision-mission" },
  { label: "Our Team", href: "/our-team" },
  { label: "Growth Timeline", href: "/about-ksh#growth-timeline" },
];

// About dropdown — same flat row-of-tabs design as MediaDropdown.
export default function AboutDropdown({
  onNavigate,
  measurementOnly = false,
}: {
  onNavigate?: () => void;
  measurementOnly?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between px-10 gap-[60px] py-[30px]"
      data-name="About Dropdown"
    >
      {ABOUT_LINKS.map((link, index) => {
        const className = `font-sora font-normal text-[16px] 2xl:text-[20px] pb-[8px] w-full border-b no-underline transition-colors duration-200 ${
          index === 0
            ? "text-[#212121] border-[#212121] font-medium"
            : "text-[#bdaea6] border-[#bdaea6] hover:text-[#212121] hover:border-[#212121]"
        }`;

        return measurementOnly ? (
          <span key={link.label} className={className}>
            {link.label}
          </span>
        ) : (
          <Link
            key={link.label}
            href={link.href}
            onClick={onNavigate}
            className={className}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
