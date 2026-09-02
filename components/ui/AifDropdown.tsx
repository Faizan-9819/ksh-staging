"use client";

import Link from "@/components/ui/Link";

export interface AifLink {
  label: string;
  href: string;
}

export const AIF_LINKS: AifLink[] = [
  { label: "Overview", href: "/investors" },
  { label: "Fund I Details", href: "/investors/fund-I-details" },
  { label: "Governance", href: "/investors/governance" },
  { label: "Institutional Investors", href: "/investors/institutional-investors" },
];

// AIF dropdown — same flat row-of-tabs design as AboutDropdown/CapabilitiesDropdown.
export default function AifDropdown({
  onNavigate,
  measurementOnly = false,
}: {
  onNavigate?: () => void;
  measurementOnly?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between px-10 gap-[60px] py-[30px]"
      data-name="AIF Dropdown"
    >
      {AIF_LINKS.map((link, index) => {
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
