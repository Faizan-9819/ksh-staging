"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import BrochurePopForm from "./BrochurePopForm";
import CertDownloadModal from "./CertDownloadModal";
import { lenisScrollTo } from "@/components/ui/LenisProvider";

export interface TabNavItem {
  label: string;
  /** Section id to scroll to. Ignored when `action` is set. */
  target: string;
  /** "brochure" opens the download-brochure popup; "certificate" opens the download-certificate popup — instead of scrolling. */
  action?: "brochure" | "certificate";
}

export interface TabNavContent {
  items: TabNavItem[];
  /** Required for the "Download Brochure" tab to open its popup form. */
  brochureUrl?: string;
  parkName?: string;
}

const DEFAULT_CONTENT: TabNavContent = {
  items: [
    { label: "Park Overview", target: "about" },
    { label: "Park Highlights", target: "location-overview" },
    { label: "Location & Connectivity", target: "interactive-map" },
    { label: "Park Infrastructure", target: "park-infrastructure" },
    { label: "Download Certificate", target: "", action: "certificate" },
  ],
  brochureUrl: "/brochure/ksh-infra-park.pdf",
  parkName: "KSH INFRA Park",
};

const TICK_COUNT = 40;

/**
 * Some sections render separate desktop/mobile variants (e.g. `park-infrastructure`
 * + `park-infrastructure-mobile`), only one of which is visible at a time via CSS.
 * Prefer whichever variant is actually laid out (offsetParent !== null).
 */
function findVisibleSection(target: string): HTMLElement | null {
  const base = document.getElementById(target);
  const mobile = document.getElementById(`${target}-mobile`);
  if (base && base.offsetParent !== null) return base;
  if (mobile && mobile.offsetParent !== null) return mobile;
  return base ?? mobile;
}

export default function TabNavSection({
  content = DEFAULT_CONTENT,
}: {
  content?: TabNavContent;
} = {}) {
  const [active, setActive] = useState(0);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [showBrochureForm, setShowBrochureForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const pathname = usePathname();
  // Route slug (e.g. "ksh-hosur-i") — tells the API which certificate file to email.
  const certSource = pathname?.split("/").filter(Boolean).pop() ?? "";
  const navItems = content.items;

  const handleClick = (index: number, item: TabNavItem) => {
    setMobileDropdownOpen(false);
    if (item.action === "brochure") {
      setShowBrochureForm(true);
      return;
    }
    if (item.action === "certificate") {
      setShowCertForm(true);
      return;
    }
    setActive(index);
    const el = findVisibleSection(item.target);
    if (el) {
      lenisScrollTo(el, { offset: -96 });
    }
  };

  useEffect(() => {
    const scrollItems = navItems.filter((item) => !item.action);
    const sections = scrollItems
      .map((item) => findVisibleSection(item.target))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIdx = sections.findIndex((s) => s === entry.target);
            if (sectionIdx === -1) return;
            const idx = navItems.indexOf(scrollItems[sectionIdx]);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const activeTickIndex = Math.round(
    (active / (navItems.length - 1)) * (TICK_COUNT - 1),
  );

  const activeItem = navItems[active];

  return (
    <nav aria-label="Park sections" className="top-0 z-30 w-full bg-[#fbf2e8]" data-name="Sticky Sub-Nav">
      <div className="fix flex flex-col justify-center gap-4 sm:gap-5 lg:gap-[15px] py-[22px] sm:py-[32px] lg:py-[44px]">
        {/* Tick ruler — desktop/tablet only, replaced by a dropdown below sm */}
        <div className="hidden sm:flex items-center justify-between">
          {Array.from({ length: TICK_COUNT }).map((_, i) => (
            <span
              key={i}
              className={`block w-px shrink-0 transition-all duration-300 ${
                i === activeTickIndex
                  ? "h-[16px] bg-[#212121]"
                  : "h-[8px] bg-[#e3d5c8]"
              }`}
            />
          ))}
        </div>

        {/* Labels — desktop/tablet row */}
        <div className="hidden sm:flex items-center justify-between lg:max-xl:gap-x-4">
          {navItems.map((item, i) => (
            <button
              type="button"
              key={i}
              aria-current={i === active ? "true" : undefined}
              onClick={() => handleClick(i, item)}
              className={`whitespace-nowrap bg-transparent border-none cursor-pointer font-sora font-normal text-[17px] lg:text-[16px] xl:text-[20px] leading-[1.4] transition-colors duration-300 ${
                i === active ? "text-[#212121] underline underline-offset-8" : "text-[#bdaea6]"
              }`}
              dangerouslySetInnerHTML={{ __html: item.label }}
            />
          ))}
        </div>

        {/* Mobile — full-width custom dropdown instead of a horizontally scrolling row */}
        <div className="relative sm:hidden">
          <button
            type="button"
            aria-expanded={mobileDropdownOpen}
            onClick={() => setMobileDropdownOpen((v) => !v)}
            className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer font-sora font-normal text-[14px] leading-[1.4] text-[#212121]"
          >
            <span dangerouslySetInnerHTML={{ __html: activeItem.label }} />
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className={`shrink-0 transition-transform duration-200 ${
                mobileDropdownOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="#212121"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {mobileDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 z-30 overflow-hidden rounded-[20px] border border-[#e3d5c8] bg-[#fbf2e8] shadow-lg">
              {navItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(i, item)}
                  className={`w-full flex items-center px-5 py-3 text-left bg-transparent border-none cursor-pointer font-sora font-normal text-[14px] leading-[1.4] transition-colors duration-200 ${
                    i === active
                      ? "text-[#212121] bg-[#e3d5c8]/40"
                      : "text-[#bdaea6] hover:bg-[#e3d5c8]/20"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item.label }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showBrochureForm && (
          <BrochurePopForm
            onClose={() => setShowBrochureForm(false)}
            brochureUrl={content.brochureUrl ?? DEFAULT_CONTENT.brochureUrl!}
            parkName={content.parkName ?? DEFAULT_CONTENT.parkName!}
          />
        )}
        {showCertForm && (
          <CertDownloadModal
            onClose={() => setShowCertForm(false)}
            source={certSource}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
