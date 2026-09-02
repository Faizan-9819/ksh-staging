"use client";

import Link from "@/components/ui/Link";

export interface MediaLink {
  label: string;
  href: string;
}

export const MEDIA_LINKS: MediaLink[] = [
  { label: "Blogs", href: "/blogs" },
  { label: "News", href: "/blogs?tab=news" },
  { label: "Press Release", href: "/blogs?tab=press" },
];

// Media dropdown — a flat row of category tabs (no preview card, no nested
// groups, unlike ParksDropdown). Rendered as the lower section of the
// combined white nav layer (see MediaDropdown usage in Navbar.tsx).
export default function MediaDropdown({
  onNavigate,
  measurementOnly = false,
}: {
  onNavigate?: () => void;
  measurementOnly?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between px-10 gap-[60px] py-[30px]"
      data-name="Media Dropdown"
    >
      {MEDIA_LINKS.map((link, index) => {
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
