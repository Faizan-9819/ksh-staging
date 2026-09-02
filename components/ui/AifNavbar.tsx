"use client";

import { useState } from "react";
import Link from "@/components/ui/Link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Btn from "./Btn";
import ArrowUpRightIcon from "./ArrowUpRightIcon";

// Content (labels + hrefs) matches aifhtmls2's collapsed 4-page nav exactly —
// Overview, Fund Details, Governance, Contact. No dropdown. Visual system
// (fixed blur pill, scroll-hide, mobile drawer) mirrors the main site's
// Navbar.tsx; typography comes from this project's own Sora/Inter fonts.
const AIF_NAV_LINKS = [
  { label: "Overview", href: "/investors" },
  { label: "Fund Details", href: "/investors/fund-I-details" },
  { label: "Governance", href: "/investors/governance" },
  { label: "Contact", href: "/investors/contact" },
];

// Below this, the header always stays put — avoids flicker from tiny
// scroll jitter right at the top of the page.
const SCROLL_HIDE_THRESHOLD = 50;

const NAV_LINK_CLASS =
  "nav-link font-sora text-white! no-underline whitespace-nowrap text-[13px] xl:text-[16px] 2xl:text-[18px] bg-[linear-gradient(#fff,#fff)] bg-no-repeat bg-[position:0_100%] bg-[length:0%_1.5px] transition-[background-size] duration-300 ease-in-out hover:bg-[length:100%_1.5px]";

export default function AifNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (menuOpen) return;

    const previous = scrollY.getPrevious() ?? latest;

    if (latest <= SCROLL_HIDE_THRESHOLD) {
      setHidden(false);
      return;
    }

    if (latest > previous) {
      setHidden(true); // scrolling down
    } else if (latest < previous) {
      setHidden(false); // scrolling up
    }
  });

  return (
    <>
      <motion.nav
        animate={{
          y: hidden ? "-100%" : "0%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0  z-[999999999999]! flex h-[60px] lg:h-[90px] items-center justify-between md:rounded-b-[20px] border border-t-0 border-white/12 bg-black/20 px-3! lg:px-7! backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]  md-fix"
      >
        <Link href="/aif" className="flex shrink-0 items-center">
          <img
            src="/aif/shared/header-logo.png"
            alt="KSH INFRA — Inspiring Green Development"
            className="h-10.5 w-auto xs:h-12 sm:h-14 lg:h-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="mr-5 lg:mr-0 hidden items-center gap-6 lg:flex xl:gap-12 2xl:gap-16">
          {AIF_NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${NAV_LINK_CLASS} ${active ? "bg-[length:100%_1.5px]!" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Button */}
        <div className="hidden shrink-0 lg:flex">
          <Btn
            label="Back to Home"
            href="/"
            bgColor="bg-[#C5BDAC]!"
            hoverBgColor="bg-[#CBC4B5]!"
            textColor="text-[#212121]!"
            hoverTextColor="text-[#212121]!"
            arrowColor="stroke-[#000]"
            arrowClassName="-rotate-180"
            hoverArrowColor="stroke-[#000]"
            fontWeight="font-normal!"
            className="cursor-pointer border-none! flex-row-reverse"
            filled
          />
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-colors hover:bg-white/10"
          >
            <Menu size={22} className="text-white" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <MobileDrawer
            key="mobile-drawer"
            onClose={() => setMenuOpen(false)}
            pathname={pathname}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileDrawer({
  onClose,
  pathname,
}: {
  onClose: () => void;
  pathname: string;
}) {
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed inset-0 z-[999999999999999]! flex h-dvh w-full flex-col overflow-y-auto bg-[#FBF2E8] lg:hidden"
    >
      {/* Drawer's own header */}
      <div className="flex h-[60px] shrink-0 items-center justify-between px-4">
        <Link href="/aif" onClick={onClose} className="flex items-center">
          <img src="/logom.svg" alt="KSH INFRA" className="h-auto w-[130px]" />
        </Link>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#212121]/10 bg-[#212121]/[0.03] transition-colors hover:bg-[#212121]/[0.06]"
        >
          <X size={20} className="text-[#212121]" />
        </button>
      </div>

      {/* Links */}
      <div className="flex flex-1 flex-col justify-center px-6">
        {AIF_NAV_LINKS.map((link, index) => {
          const active = pathname === link.href;
          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.08 + index * 0.04,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className={`group flex items-center justify-between border-b border-[#212121]/10 py-4 font-sora text-[18px] no-underline ${
                  active ? "text-[#59624D]" : "text-[#212121]"
                }`}
              >
                {link.label}
                <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-white text-[#59624D] transition-all duration-500 group-hover:bg-[#59624D] group-hover:text-white">
                  <ArrowUpRightIcon size={14} />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom action */}
      <div className="shrink-0 px-6 pb-8 pt-4">
        <Btn
          label="Contact"
          href="#"
          onClick={onClose}
          bgColor="bg-[#C5BDAC]"
          hoverBgColor="bg-[#CBC4B5]"
          textColor="text-[#212121]"
          hoverTextColor="text-[#212121]"
          arrowColor="stroke-[#000]"
          hoverArrowColor="stroke-[#000]"
          fontWeight="font-normal"
          className="w-full text-[18px]! justify-center border-none! py-3.5"
          filled
        />
      </div>
    </motion.div>
  );
}
