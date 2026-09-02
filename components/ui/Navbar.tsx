"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/ui/Link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Btn from "./Btn";
import ParksDropdown, { PARK_CITIES } from "./ParksDropdown";
import MediaDropdown, { MEDIA_LINKS } from "./MediaDropdown";
import CapabilitiesDropdown, {
  CAPABILITIES_LINKS,
} from "./CapabilitiesDropdown";
import AboutDropdown, { ABOUT_LINKS } from "./AboutDropdown";
import AifDropdown, { AIF_LINKS } from "./AifDropdown";
import { stopLenis, startLenis } from "./LenisProvider";
import { useNavbarVisibility } from "./NavbarVisibilityContext";

// Flat-list dropdowns (as opposed to Parks' nested city groups) share the
// same simple mobile accordion — just a different item list per key.
const SIMPLE_DROPDOWN_LINKS: Record<
  "media" | "capabilities" | "about" | "aif",
  { label: string; href: string }[]
> = {
  media: MEDIA_LINKS,
  capabilities: CAPABILITIES_LINKS,
  about: ABOUT_LINKS,
  aif: AIF_LINKS,
};

type DropdownKey = "parks" | "media" | "capabilities" | "about" | "aif";

const NAV_LINKS: {
  label: string;
  href: string;
  dropdown?: DropdownKey;
  newTab?: boolean;
}[] = [
  { label: "About", href: "/about-ksh", dropdown: "about" },
  { label: "Parks", href: "/parks", dropdown: "parks" },
  { label: "Investors", href: "/investors", dropdown: "aif" },
  { label: "Capabilities", href: "/solutions", dropdown: "capabilities" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Careers", href: "/careers" },
  { label: "Media", href: "/#", dropdown: "media" },
];

interface NavbarProps {
  margin?: number;
}

// Below this, the header always stays put — avoids flicker from tiny
// scroll jitter right at the top of the page.
const SCROLL_HIDE_THRESHOLD = 50;

const NAV_LINK_CLASS =
  "nav-link font-sora text-white! no-underline whitespace-nowrap text-[13px] xl:text-[14px] 2xl:text-[15px] bg-[linear-gradient(#fff,#fff)] bg-no-repeat bg-[position:0_100%] bg-[length:0%_1.5px] transition-[background-size] duration-300 ease-in-out hover:bg-[length:100%_1.5px]";

// Nav row styling used inside the white Parks layer — dark-text variant of
// NAV_LINK_CLASS, appropriate for a light background.
const WHITE_NAV_LINK_CLASS =
  "font-sora whitespace-nowrap text-[13px] xl:text-[14px] 2xl:text-[15px] font-medium text-[#4a4a4a] hover:text-[#59624d] transition-colors";

const WHITE_NAV_CHEVRON_LINK_CLASS =
  "font-sora whitespace-nowrap text-[13px] xl:text-[14px] 2xl:text-[15px] font-medium text-[#212121] hover:text-[#59624d] flex items-center gap-1 transition-colors";

// The navbar's Contact link always goes to a blank contact form, regardless
// of which page it's clicked from — only the AIF pages' own in-content
// "Contact Fund Team" / "Request Fund Information" buttons (which hardcode
// their own /contact-us?enquiry=investor-relations href) should pre-select
// "Investor Relations".
const CONTACT_HREF = "/contact-us";

export default function Navbar({}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  // A page-level popup (e.g. Map's mobile state-detail overlay) can force
  // the navbar out of the way over its own z-index instead of layering on
  // top of it — same idea as the scroll-direction hide below, just another
  // source that can request it.
  const { forceHidden } = useNavbarVisibility();
  // Which of the white extend-the-navbar dropdowns is open, if any — Parks
  // and Media share the exact same shell/animation/blur, only their content
  // differs, and only one can be open at a time.
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const dropdownOpen = openDropdown !== null;
  const dropdownLayerRef = useRef<HTMLDivElement | null>(null);
  const dropdownTriggerRefs = useRef<
    Record<DropdownKey, HTMLButtonElement | null>
  >({
    parks: null,
    media: null,
    capabilities: null,
    about: null,
    aif: null,
  });

  // Each dropdown's content has a different natural height. Measured up
  // front from off-screen probes (see below) so that switching between them
  // while the panel is already open can smoothly transition the content
  // area straight to the new target height, instead of snapping the instant
  // the crossfade swaps DOM content.
  const [parksContentHeight, setParksContentHeight] = useState<number>();
  const [mediaContentHeight, setMediaContentHeight] = useState<number>();
  const [capabilitiesContentHeight, setCapabilitiesContentHeight] =
    useState<number>();
  const [aboutContentHeight, setAboutContentHeight] = useState<number>();
  const [aifContentHeight, setAifContentHeight] = useState<number>();
  const parksProbeRef = useRef<HTMLDivElement | null>(null);
  const mediaProbeRef = useRef<HTMLDivElement | null>(null);
  const capabilitiesProbeRef = useRef<HTMLDivElement | null>(null);
  const aboutProbeRef = useRef<HTMLDivElement | null>(null);
  const aifProbeRef = useRef<HTMLDivElement | null>(null);
  const contentHeight =
    openDropdown === "parks"
      ? parksContentHeight
      : openDropdown === "media"
        ? mediaContentHeight
        : openDropdown === "capabilities"
          ? capabilitiesContentHeight
          : openDropdown === "about"
            ? aboutContentHeight
            : openDropdown === "aif"
              ? aifContentHeight
              : undefined;

  useEffect(() => {
    const measure = () => {
      if (parksProbeRef.current)
        setParksContentHeight(parksProbeRef.current.scrollHeight);
      if (mediaProbeRef.current)
        setMediaContentHeight(mediaProbeRef.current.scrollHeight);
      if (capabilitiesProbeRef.current)
        setCapabilitiesContentHeight(capabilitiesProbeRef.current.scrollHeight);
      if (aboutProbeRef.current)
        setAboutContentHeight(aboutProbeRef.current.scrollHeight);
      if (aifProbeRef.current)
        setAifContentHeight(aifProbeRef.current.scrollHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (menuOpen || dropdownOpen) return;

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

  // Background scroll disables whenever the mobile drawer OR a white
  // dropdown is open — both are treated as modal overlays. Uses Lenis's
  // own stop()/start() (same reference-counted lock every other
  // modal/popup in this app already uses) instead of toggling body
  // overflow — overflow:hidden removes the native scrollbar and reflows
  // the whole page width, which every `sticky`/`h-screen` section
  // (ParkScroll, VideoHeroSection) visibly jumps against. Lenis.stop()
  // only disables scroll input handling; nothing about the page's layout
  // or scrollbar ever changes, so there's no shift either way.
  useEffect(() => {
    const shouldLock = menuOpen || dropdownOpen;
    if (shouldLock) {
      stopLenis();
    }
    return () => {
      if (shouldLock) startLenis();
    };
  }, [menuOpen, dropdownOpen]);

  useEffect(() => {
    if (!menuOpen && !dropdownOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, dropdownOpen]);

  const closeDropdown = () => setOpenDropdown(null);
  const toggleDropdown = (key: DropdownKey) =>
    setOpenDropdown((current) => (current === key ? null : key));

  // Click-outside-to-close: only listens while a white dropdown layer is
  // open; ignores clicks inside the layer itself or on any trigger link.
  useEffect(() => {
    if (!dropdownOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        dropdownLayerRef.current?.contains(target) ||
        Object.values(dropdownTriggerRefs.current).some((el) =>
          el?.contains(target),
        )
      ) {
        return;
      }
      setOpenDropdown(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [dropdownOpen]);

  // Close-on-scroll: Lenis is stopped while a dropdown is open (see above),
  // but wheel/touch input still fires on the document even though it no
  // longer moves the page — treat any such attempt as intent to scroll and
  // close the dropdown.
  useEffect(() => {
    if (!dropdownOpen) return;
    const onScrollAttempt = () => setOpenDropdown(null);
    window.addEventListener("wheel", onScrollAttempt, { passive: true });
    window.addEventListener("touchmove", onScrollAttempt, { passive: true });
    return () => {
      window.removeEventListener("wheel", onScrollAttempt);
      window.removeEventListener("touchmove", onScrollAttempt);
    };
  }, [dropdownOpen]);

  return (
    <>
      <motion.nav
        animate={{
          y: hidden || forceHidden ? "-100%" : "0%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        // className={`fixed top-0 left-0 right-0  z-[999999999999]! flex h-[60px] lg:h-[90px] items-center justify-between md:rounded-b-[20px] border border-t-0 border-white/12 bg-[linear-gradient(180deg,rgba(20,24,30,0.72)_0%,rgba(18,22,28,0.58)_45%,rgba(14,18,24,0.42)_100%)] px-3 lg:px-7 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] md:w-[90%] md:max-w-[var(--container-max)] md:mx-auto ${
        //   dropdownOpen ? "pointer-events-none" : ""
        // }`}
        className="fixed top-0 left-0 right-0 z-[999999999999]! flex h-[80px] lg:h-[90px] items-center justify-between md:rounded-b-[20px] border border-t-0 w-full overflow-hidden border-white/12 bg-[linear-gradient(180deg,rgba(20,24,30,0.72)_0%,rgba(18,22,28,0.58)_45%,rgba(14,18,24,0.42)_100%)] px-3! 2xl:px-7! backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] md-fix"
      >
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <Link href="/">
            <img
              src="/home/ksh-logo.png"
              alt="KSH INFRA"
              className="h-auto w-[160px] cursor-pointer xs:w-[135px] sm:w-[145px] md:w-[155px] lg:w-[170px] xl:w-[180px]"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="mr-5 min-[1200px]:mr-0 hidden items-center gap-6 min-[1200px]:flex xl:gap-[clamp(14px,2vw,28px)] 2xl:gap-[clamp(18px,2.4vw,40px)]">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative">
                {/* Plain <button>, not a <Link> — this label has no
                    destination of its own, it only opens/closes the
                    dropdown panel. A real <a href> here (even with a
                    preventDefault handler on click) still shows the target
                    URL on hover and still navigates on middle-click/
                    ctrl-click/"open in new tab", bypassing the dropdown
                    entirely — none of which makes sense for a pure UI
                    toggle. */}
                <button
                  type="button"
                  ref={(el) => {
                    dropdownTriggerRefs.current[link.dropdown!] = el;
                  }}
                  className={`${NAV_LINK_CLASS} flex items-center gap-1 cursor-pointer bg-transparent border-none p-0`}
                  onClick={() => toggleDropdown(link.dropdown!)}
                  aria-expanded={openDropdown === link.dropdown}
                >
                  {link.label}
                  <svg
                    width="8"
                    height="4"
                    viewBox="0 0 8 4"
                    fill="none"
                    className={`shrink-0 transition-transform duration-200 ${
                      openDropdown === link.dropdown ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M1 .5 4 3.5 7 .5"
                      stroke="#fff"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={NAV_LINK_CLASS}
                target={link.newTab ? "_blank" : undefined}
                rel={link.newTab ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        {/* Desktop Button */}
        <div className="hidden shrink-0 min-[1200px]:flex">
          <Btn
            label="Contact"
            href={CONTACT_HREF}
            bgColor="bg-[#C5BDAC]!"
            hoverBgColor="bg-[#CBC4B5]!"
            textColor="text-[#212121]!"
            hoverTextColor="text-[#212121]!"
            arrowColor="stroke-[#000]"
            hoverArrowColor="stroke-[#000]"
            fontWeight="font-normal!"
            className="cursor-pointer border-none!"
            filled
          />
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center min-[1200px]:hidden">
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

      {/* Backdrop blur over the rest of the page while a white dropdown
          layer is open — pure blur, no dark/white tint. pointer-events-none
          so it never intercepts clicks; the document mousedown listener
          above already handles outside-click-to-close on its own. */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            key="dropdown-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[999999999998]! hidden min-[1200px]:block pointer-events-none backdrop-blur-[5px] [-webkit-backdrop-filter:blur(5px)]"
          />
        )}
      </AnimatePresence>

      {/* White dropdown layer — occupies the same top-0 slot as the dark
          navbar. Collapsed to height 0 when closed; height-animates open on
          click. Shared shell for both Parks and Media; only the content
          below the nav row (ParksDropdown vs MediaDropdown) differs. */}
      <div
        ref={dropdownLayerRef}
        className="fixed top-0 left-0 fix right-0  z-[9999999999999]! hidden min-[1200px]:block"
      >
        <AnimatePresence initial={false}>
          {dropdownOpen && (
            <motion.div
              key="white-nav-layer"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.7, ease: [0.7, 0, 0.4, 1] }}
              className={`overflow-hidden rounded-b-[20px] shadow-xl ${
                openDropdown === "media" ||
                openDropdown === "capabilities" ||
                openDropdown === "about" ||
                openDropdown === "aif"
                  ? "bg-[#FBF2E8]"
                  : "bg-white"
              }`}
            >
              {/* White nav row — mirrors the dark navbar's row, dark-text variant */}
              <div className="flex h-[60px] lg:h-[90px] items-center justify-between 2xl:px-7 px-3">
                <div className="flex shrink-0 items-center">
                  <Link href="/" onClick={closeDropdown}>
                    <img
                      src="/logom.svg"
                      alt="KSH INFRA"
                      className="h-auto w-[120px] cursor-pointer xs:w-[135px] sm:w-[145px] md:w-[155px] lg:w-[170px] xl:w-[180px]"
                    />
                  </Link>
                </div>

                <div className="mr-5 min-[1200px]:mr-0 hidden items-center gap-6 min-[1200px]:flex xl:gap-[clamp(14px,2vw,28px)] 2xl:gap-[clamp(18px,2.4vw,40px)]">
                  {NAV_LINKS.map((link) => {
                    const isChevronLink = Boolean(link.dropdown);
                    return isChevronLink ? (
                      // Same reasoning as the dark navbar's trigger above —
                      // a pure dropdown toggle, no destination of its own.
                      <button
                        type="button"
                        key={link.label}
                        className={`${WHITE_NAV_CHEVRON_LINK_CLASS} cursor-pointer bg-transparent border-none p-0`}
                        onClick={() => toggleDropdown(link.dropdown!)}
                        aria-expanded={openDropdown === link.dropdown}
                      >
                        {link.label}
                        <svg
                          width="8"
                          height="4"
                          viewBox="0 0 8 4"
                          fill="none"
                          className={`shrink-0 transition-transform duration-200 ${
                            openDropdown === link.dropdown ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M1 .5 4 3.5 7 .5"
                            stroke="#212121"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={closeDropdown}
                        className={WHITE_NAV_LINK_CLASS}
                        target={link.newTab ? "_blank" : undefined}
                        rel={link.newTab ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="hidden shrink-0 lg:ps-5 2xl:ps-0 min-[1200px]:flex">
                  <Btn
                    label="Contact"
                    href={CONTACT_HREF}
                    onClick={closeDropdown}
                    bgColor="bg-[#C5BDAC]!"
                    hoverBgColor="bg-[#CBC4B5]!"
                    textColor="text-[#212121]!"
                    hoverTextColor="text-[#212121]!"
                    arrowColor="stroke-[#000]"
                    hoverArrowColor="stroke-[#000]"
                    fontWeight="font-normal!"
                    className="cursor-pointer border-none!"
                    filled
                  />
                </div>
              </div>

              {/* Dropdown content. Parks content area is white, matching the
                  outer shell — only the preview card inside ParksDropdown
                  keeps its own cream background. Media's whole shell is
                  already cream (see the outer motion.div above), so its
                  content area stays transparent — giving it one continuous
                  color top to bottom instead of a white-then-cream split.
                  Keyed AnimatePresence below crossfades Parks <-> Media
                  instead of snapping instantly when switching menus. The
                  wrapper's own height is pinned to the pre-measured target
                  (see the probes below) and CSS-transitions between the two,
                  so switching menus smoothly resizes instead of jumping the
                  instant the crossfade swaps DOM content. */}
              <div
                className="overflow-hidden rounded-b-[20px] transition-[height] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ height: contentHeight }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {openDropdown === "parks" && (
                    <motion.div
                      key="parks-content"
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <ParksDropdown onNavigate={closeDropdown} />
                    </motion.div>
                  )}
                  {openDropdown === "media" && (
                    <motion.div
                      key="media-content"
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <MediaDropdown onNavigate={closeDropdown} />
                    </motion.div>
                  )}
                  {openDropdown === "capabilities" && (
                    <motion.div
                      key="capabilities-content"
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <CapabilitiesDropdown onNavigate={closeDropdown} />
                    </motion.div>
                  )}
                  {openDropdown === "about" && (
                    <motion.div
                      key="about-content"
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <AboutDropdown onNavigate={closeDropdown} />
                    </motion.div>
                  )}
                  {openDropdown === "aif" && (
                    <motion.div
                      key="aif-content"
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <AifDropdown onNavigate={closeDropdown} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Off-screen probes — render both dropdowns' content invisibly at all
          times purely to measure their natural height up front (see
          parksContentHeight/mediaContentHeight above). visibility:hidden
          keeps them out of layout flow (via fixed positioning) and out of
          the accessibility tree/tab order. */}
      <div className="invisible fixed left-0 right-0 top-0 pointer-events-none hidden min-[1200px]:block">
        <div ref={parksProbeRef}>
          <ParksDropdown />
        </div>
      </div>
      <div className="invisible fixed left-0 right-0 top-0 pointer-events-none hidden min-[1200px]:block">
        <div ref={mediaProbeRef}>
          <MediaDropdown />
        </div>
      </div>
      <div className="invisible fixed left-0 right-0 top-0 pointer-events-none hidden min-[1200px]:block">
        <div ref={capabilitiesProbeRef}>
          <CapabilitiesDropdown />
        </div>
      </div>
      <div className="invisible fixed left-0 right-0 top-0 pointer-events-none hidden min-[1200px]:block">
        <div ref={aboutProbeRef}>
          <AboutDropdown />
        </div>
      </div>
      <div className="invisible fixed left-0 right-0 top-0 pointer-events-none hidden min-[1200px]:block">
        <div ref={aifProbeRef}>
          <AifDropdown />
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <MobileDrawer
            key="mobile-drawer"
            onClose={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {

  // Every dropdown-flagged nav link expands into a submenu on mobile instead
  // of navigating directly — Parks has its own nested city groups (below),
  // while Media/Capabilities/About share one simple flat-list accordion
  // (see SIMPLE_DROPDOWN_LINKS). Only one of these — Parks or a simple one —
  // is ever open at a time.
  const [openMobileKey, setOpenMobileKey] = useState<DropdownKey | null>(null);
  const [openCity, setOpenCity] = useState<string | null>(null);

  const toggleMobileDropdown = (key: DropdownKey) => {
    setOpenMobileKey((current) => {
      const next = current === key ? null : key;
      if (next !== "parks") setOpenCity(null);
      return next;
    });
  };

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
      className="fixed inset-0 z-[999999999999999]! flex h-dvh w-full flex-col overflow-y-auto bg-[#FBF2E8] min-[1200px]:hidden"
    >
      {/* Drawer's own header */}
      <div className="flex h-[60px] shrink-0 items-center justify-between px-4">
        <Link href="/" onClick={onClose} className="flex items-center">
          <img
            src="/logom.svg"
            alt="KSH INFRA"
            className="h-auto w-[130px] brightness-100"
          />
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
        {NAV_LINKS.map((link, index) => {
          if (link.dropdown === "parks") {
            const isOpen = openMobileKey === "parks";
            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 + index * 0.04,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="border-b border-[#212121]/10"
              >
                <button
                  type="button"
                  onClick={() => toggleMobileDropdown("parks")}
                  aria-expanded={isOpen}
                  aria-controls="mobile-parks-submenu"
                  className="group flex w-full items-center justify-between py-4 font-sora text-[18px] text-[#212121]"
                >
                  {link.label}
                  <div
                    className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      isOpen
                        ? "border-[#59624D] bg-[#59624D] text-white"
                        : "border-[#8F8F8F] text-[#8F8F8F] group-hover:border-[#59624D] group-hover:bg-[#59624D] group-hover:text-white"
                    }`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id="mobile-parks-submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 pb-4 pl-2">
                        <Link
                          href="/parks"
                          onClick={onClose}
                          className="py-2 font-sora text-[15px] text-[#59624D] no-underline"
                        >
                          Park Overview
                        </Link>

                        {PARK_CITIES.map((group) => {
                          const isCityOpen = openCity === group.city;
                          return (
                            <div key={group.city}>
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenCity((city) =>
                                    city === group.city ? null : group.city,
                                  )
                                }
                                aria-expanded={isCityOpen}
                                className="flex w-full items-center justify-between py-2.5 font-sora text-[16px] font-medium text-[#212121]"
                              >
                                {group.city}
                                <ChevronDown
                                  size={14}
                                  className={`text-[#8F8F8F] transition-transform duration-300 ${
                                    isCityOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              <AnimatePresence initial={false}>
                                {isCityOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      ease: [0.4, 0, 0.2, 1],
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <div className="flex flex-col gap-3 pb-3 pl-3 pt-1">
                                      {group.parks.map((park) =>
                                        park.comingSoon ? (
                                          // Matches ParksDropdown.tsx's desktop guard — that
                                          // page hasn't been built yet, so this can't be a
                                          // real link (was previously a live <Link href="#">,
                                          // a dead/misleading tap target on mobile only).
                                          <span
                                            key={park.label}
                                            className="font-sora text-[14px] text-[#4a4a4a]/60"
                                          >
                                            {park.label}{" "}
                                            <span className="text-[12px]">(Coming Soon)</span>
                                          </span>
                                        ) : (
                                          <Link
                                            key={park.href}
                                            href={park.href}
                                            onClick={onClose}
                                            className="font-sora text-[14px] text-[#4a4a4a] no-underline"
                                          >
                                            {park.label}
                                          </Link>
                                        ),
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          }

          if (
            link.dropdown === "media" ||
            link.dropdown === "capabilities" ||
            link.dropdown === "about" ||
            link.dropdown === "aif"
          ) {
            const key = link.dropdown;
            const isOpen = openMobileKey === key;
            const items = SIMPLE_DROPDOWN_LINKS[key];
            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 + index * 0.04,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="border-b border-[#212121]/10"
              >
                <button
                  type="button"
                  onClick={() => toggleMobileDropdown(key)}
                  aria-expanded={isOpen}
                  aria-controls={`mobile-${key}-submenu`}
                  className="group flex w-full items-center justify-between py-4 font-sora text-[18px] text-[#212121]"
                >
                  {link.label}
                  <div
                    className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      isOpen
                        ? "border-[#59624D] bg-[#59624D] text-white"
                        : "border-[#8F8F8F] text-[#8F8F8F] group-hover:border-[#59624D] group-hover:bg-[#59624D] group-hover:text-white"
                    }`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`mobile-${key}-submenu`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 pb-4 pl-2">
                        {items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="py-2 font-sora text-[15px] text-[#4a4a4a] no-underline"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={link.label}
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
                className="flex items-center justify-between border-b border-[#212121]/10 py-4 font-sora text-[18px] text-[#212121] no-underline"
                target={link.newTab ? "_blank" : undefined}
                rel={link.newTab ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom action */}
      <div className="shrink-0 px-6 pb-8 pt-4">
        <Btn
          label="Contact"
          href={CONTACT_HREF}
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
