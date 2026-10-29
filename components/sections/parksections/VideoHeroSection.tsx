"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Btn from "@/components/ui/Btn";
import HeroVideoToggle from "@/components/ui/HeroVideoToggle";
import CertDownloadModal from "./CertDownloadModal";
import BrochurePopForm from "./BrochurePopForm";
import { lenisScrollTo } from "@/components/ui/LenisProvider";
import Btn2 from "@/components/ui/Btn2";

/** Dedicated circular scroll-cue button, using the same pointed straight-arrow glyph as Btn2's "Download Brochure/Certificate" CTA. */
function ScrollCueButton({
  onClick,
  exitNote,
}: {
  onClick: () => void;
  /** Optional footnote (e.g. an exit/completion disclaimer) shown under the button — omitted on pages that don't need it. */
  exitNote?: string;
}) {
  return (
    <div className="flex flex-col items-end gap-0">
      <button
        onClick={onClick}
        aria-label="Scroll to explore"
        className="hidden sm:flex h-20 w-20 rounded-full border border-white items-center justify-center shrink-0 cursor-pointer transition-colors duration-300 hover:bg-white group"
      >
        <svg
          width="19"
          height="40"
          viewBox="0 0 19 42"
          fill="none"
          className="pointer-events-none"
        >
          <path
            d="M9.30664 0L9.30664 33.5"
            className="stroke-white transition-colors duration-300 group-hover:stroke-[#212121]"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M18.3066 33.5L9.30664 40.5L0.306641 33.5"
            className="stroke-white transition-colors duration-300 group-hover:stroke-[#212121]"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {exitNote && (
        <p
          className="font-inter text-white/85 font-normal text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.4] m-0 mt-[8px]"
          dangerouslySetInnerHTML={{ __html: exitNote }}
        />
      )}
    </div>
  );
}

export interface VideoHeroContent {
  videoSrc: string;
  title: string;
  subtitle: string;
  areaValue: string;
  areaUnit: string;
  areaLabel: string;
  buildingsValue: string;
  buildingsLabel: string;
  locationValue: string;
  locationUnit: string;
  locationLabel: string;
  ctaLabel: string;
  /** "brochure" opens the gated brochure-download form instead of the certificate flow. Defaults to "certificate". */
  ctaAction?: "certificate" | "brochure";
  /** When true, Card 2 renders as a plain stat card (matching Card 1/3's height) with no CTA button. */
  hideCta?: boolean;
}

const DEFAULT_CONTENT: VideoHeroContent = {
  videoSrc: "/homeasset/Hero_Section.mp4",
  title: "KSH Chakan Park IV",
  subtitle: "Pune, Maharashtra",
  areaValue: "0.36 Mn.",
  areaUnit: "Sq. Ft.",
  areaLabel: "Total Area",
  buildingsValue: "02",
  buildingsLabel: "Total Buildings",
  locationValue: "Chakan,",
  locationUnit: "Pune",
  locationLabel: "Park Location",
  ctaLabel: "Download Certificate",
};

/** Card 1 — Total Area */
function AreaCard({
  content,
  className = "flex-1 min-w-0",
}: {
  content: VideoHeroContent;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex flex-col justify-between ${content.hideCta ? "h-[150px]" : "h-[180px] sm:h-[220px] lg:h-[248px]"} rounded-[20px] border border-[#cdcdcd] bg-white hover:bg-[#C5BDAC] duration-500 cursor-pointer overflow-hidden p-[16px] sm:p-[24px] lg:p-[30px] ${className}`}
    >
      <img
        src="/ParkPage/glaze.svg"
        alt=""
        className="pointer-events-none absolute -top-10 -right-20 w-64 h-auto opacity-0 group-hover:opacity-100 group-hover:top-0 group-hover:right-0 transition-all duration-300"
      />

      <div className="relative flex items-end gap-[6px]">
        <span
          className="font-sora font-normal text-[26px] sm:text-[32px] lg:text-[40px] tracking-[-0.52px] sm:tracking-[-0.64px] lg:tracking-[-0.8px] text-[#212121] leading-none"
          dangerouslySetInnerHTML={{ __html: content.areaValue }}
        />
        <span
          className="font-inter font-normal text-[16px] sm:text-[20px] lg:text-[24px] tracking-[-0.32px] sm:tracking-[-0.4px] lg:tracking-[-0.48px] text-[#6d6d6d] leading-[1.2]"
          dangerouslySetInnerHTML={{ __html: content.areaUnit }}
        />
      </div>
      <p
        className="relative font-sora font-normal text-[12px] sm:text-[15px] lg:text-[18px] tracking-[-0.24px] sm:tracking-[-0.3px] lg:tracking-[-0.36px] uppercase text-[#212121] text-right m-0"
        dangerouslySetInnerHTML={{ __html: content.areaLabel }}
      />
    </div>
  );
}

/** Card 2 — Total Buildings + Download Brochure */
function BuildingsCtaCard({
  content,
  className = "flex flex-1 min-w-0",
  onCtaClick,
}: {
  content: VideoHeroContent;
  className?: string;
  onCtaClick: () => void;
}) {
  if (content.hideCta) {
    return (
      <div
        className={`flex flex-col justify-between h-[150px] rounded-[20px] border border-[#cdcdcd] bg-white p-[16px] sm:p-[24px] lg:p-[30px] ${className}`}
      >
        <p
          className="font-sora font-normal text-[26px] sm:text-[32px] lg:text-[40px] tracking-[-0.52px] sm:tracking-[-0.64px] lg:tracking-[-0.8px] text-[#212121] m-0 leading-none"
          dangerouslySetInnerHTML={{ __html: content.buildingsValue }}
        />
        <p
          className="font-sora font-normal text-[12px] sm:text-[15px] lg:text-[18px] tracking-[-0.24px] sm:tracking-[-0.3px] lg:tracking-[-0.36px] uppercase text-[#212121] text-right m-0"
          dangerouslySetInnerHTML={{ __html: content.buildingsLabel }}
        />
      </div>
    );
  }

  return (
    <div className={`flex-col gap-[16px] lg:gap-[20px] ${className}`}>
      <div className="flex flex-1 flex-col justify-between rounded-[20px] border border-[#cdcdcd] bg-white p-[16px] sm:p-[24px] lg:p-[30px]">
        <p
          className="font-sora font-normal text-[26px] sm:text-[32px] lg:text-[40px] tracking-[-0.52px] sm:tracking-[-0.64px] lg:tracking-[-0.8px] text-[#212121] m-0 leading-none"
          dangerouslySetInnerHTML={{ __html: content.buildingsValue }}
        />
        <p
          className="font-sora font-normal text-[12px] sm:text-[15px] lg:text-[18px] tracking-[-0.24px] sm:tracking-[-0.3px] lg:tracking-[-0.36px] uppercase text-[#212121] text-right m-0"
          dangerouslySetInnerHTML={{ __html: content.buildingsLabel }}
        />
      </div>

      <Btn2
        label={content.ctaLabel}
        onClick={onCtaClick}
        bgColor="bg-[#59624d]"
        hoverBgColor="bg-[#59624d]"
        textColor="text-white"
        hoverTextColor="text-white"
        borderColor="border-[#59624d]"
        arrowColor="stroke-white"
        hoverArrowColor="stroke-white"
        textSize="text-[14px] sm:text-[17px] lg:text-[20px]"
        arrowClassName="lg:h-auto h-[30px]"
        filled
        className="h-[50px] sm:h-[60px] lg:h-[75px] rounded-[60px] justify-center gap-[24px] lg:gap-[60px] shrink-0 px-[20px]"
      />
    </div>
  );
}

/** Card 3 — Park Location */
function LocationCard({
  content,
  className = "flex-1 min-w-0",
}: {
  content: VideoHeroContent;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col justify-between ${content.hideCta ? "h-[150px]" : "h-[180px] sm:h-[220px] lg:h-[248px]"} rounded-[20px] border border-[#cdcdcd] bg-white p-[16px] sm:p-[24px] lg:p-[30px] ${className}`}
    >
      <div className="flex items-end gap-[6px]">
        <span
          className="font-sora font-normal text-[26px] sm:text-[32px] lg:text-[40px] tracking-[-0.52px] sm:tracking-[-0.64px] lg:tracking-[-0.8px] text-[#212121] leading-none"
          dangerouslySetInnerHTML={{ __html: content.locationValue }}
        />
        <span
          className="font-inter font-normal text-[16px] sm:text-[20px] lg:text-[24px] tracking-[-0.32px] sm:tracking-[-0.4px] lg:tracking-[-0.48px] text-[#6d6d6d] leading-[1.2]"
          dangerouslySetInnerHTML={{ __html: content.locationUnit }}
        />
      </div>
      <p
        className="font-sora font-normal text-[12px] sm:text-[15px] lg:text-[18px] tracking-[-0.24px] sm:tracking-[-0.3px] lg:tracking-[-0.36px] uppercase text-[#212121] text-right m-0"
        dangerouslySetInnerHTML={{ __html: content.locationLabel }}
      />
    </div>
  );
}

export default function VideoHeroSection({
  content = DEFAULT_CONTENT,
  enhancedMobileLayout = false,
  imageSrc,
  mobileImageSrc,
  brochureUrl = "/brochure/ksh-infra-park.pdf",
  parkName,
  exitNote,
  apiEndpoint,
}: {
  content?: VideoHeroContent;
  /** Opt-in only — park2 must keep its exact current mobile layout (Buildings+CTA card hidden below sm). When true, stacks all 3 stats + CTA full-width on mobile instead of cropping to 2 cards. */
  enhancedMobileLayout?: boolean;
  /** When provided (with mobileImageSrc), renders a static hero image instead of the video background. */
  imageSrc?: string;
  mobileImageSrc?: string;
  /** Path to this park's brochure PDF, opened via the gated download form. */
  brochureUrl?: string;
  /** Distinguishes the lead source in the sheet/notify email — defaults to content.title. */
  parkName?: string;
  /** Optional footnote (e.g. an exit/completion disclaimer) shown under the scroll-cue button — omitted on pages that don't need it. */
  exitNote?: string;
  /** Passed straight through to BrochurePopForm — see its own doc comment. */
  apiEndpoint?: string;
} = {}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Route slug (e.g. "ksh-hosur-i") — tells the API which certificate file to email.
  const certSource = pathname?.split("/").filter(Boolean).pop() ?? "";
  // Tracks scroll position directly (not latched) — cards appear past the
  // threshold on the way down and disappear again on the way back up.
  const [revealed, setRevealed] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const [showBrochureForm, setShowBrochureForm] = useState(false);
  // Only the image matching the real viewport is ever mounted, matching the
  // same fix already applied to Hero.tsx's video variants: both `<Image
  // priority>` elements previously rendered unconditionally (visibility
  // toggled via `hidden sm:block`/`sm:hidden`), and `priority` injects a
  // `<link rel="preload">` for its src regardless of that CSS — so every
  // visit preloaded BOTH the desktop and mobile hero image in full
  // (~2.2MB + ~800KB on the Hosur page, for example) no matter which one
  // the visitor could actually see. Starts as `null` ("not yet determined")
  // rather than defaulting to desktop/true for the same reason as Hero.tsx:
  // the very first render is what the preload tag gets generated from, and
  // defaulting to true would still preload the desktop image for mobile
  // visitors before this could ever correct itself client-side.
  const [isDesktopViewport, setIsDesktopViewport] = useState<boolean | null>(
    null,
  );

  useLayoutEffect(() => {
    const checkWidth = () => setIsDesktopViewport(window.innerWidth >= 640);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const handleCtaClick = () => {
    if (content.ctaAction === "brochure") {
      setShowBrochureForm(true);
    } else {
      setShowCertForm(true);
    }
  };

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setRevealed(progress >= 0.5);
  });

  const scrollToReveal = () => {
    const el = wrapperRef.current;
    if (!el) return;
    const target = el.offsetTop + el.offsetHeight * 0.5;
    lenisScrollTo(target);
  };

  return (
    <div ref={wrapperRef} className="relative w-full h-[145vh]">
      {/* Sticky video background, pinned for the full scroll range of this wrapper */}
      <div
        data-hero-video-scope
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#8e8e8e]"
      >
        {imageSrc && mobileImageSrc ? (
          isDesktopViewport !== null && (
            <Image
              key={isDesktopViewport ? "hero-desktop" : "hero-mobile"}
              src={isDesktopViewport ? imageSrc : mobileImageSrc}
              alt={content.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )
        ) : (
          <video
            src={content.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {!(imageSrc && mobileImageSrc) && (
          // Kept small and low so it sits under the cards that slide in
          // over the bottom of this hero (their bottom padding is 64–80px).
          <HeroVideoToggle
            size="sm"
            bottomClassName="bottom-1 lg:bottom-5"
          />
        )}

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(201.2deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.32) 68.6%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.65) 96%)",
          }}
        />

        {/* Title + scroll cue: fades out once the cards take over */}
        <motion.div
          animate={{ opacity: revealed ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`absolute inset-x-0 bottom-20 flex flex-wrap items-center justify-between  fix ${
            revealed ? "pointer-events-none" : ""
          }`}
        >
          <div className="flex flex-col items-start text-white">
            <h1
              className="font-sora font-semibold text-[32px] sm:text-[46px] lg:text-[60px] tracking-[-0.64px] sm:tracking-[-0.92px] lg:tracking-[-1.2px] leading-none m-0"
              dangerouslySetInnerHTML={{ __html: content.title }}
            />
            <p
              className="font-inter font-normal text-[15px] sm:text-[19px] lg:text-[24px] leading-[1.4] m-0 mt-[8px]"
              dangerouslySetInnerHTML={{ __html: content.subtitle }}
            />
          </div>

          <ScrollCueButton onClick={scrollToReveal} exitNote={exitNote} />
        </motion.div>

        {/* Cards: hidden at rest, fade in once revealed and stay shown */}
        <motion.div
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 60 }}
          initial={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute inset-x-0 bottom-0 pb-[64px] lg:pb-[80px] fix ${
            revealed ? "" : "pointer-events-none"
          }`}
        >
          {enhancedMobileLayout ? (
            <>
              {/* Mobile: all 3 stats + CTA stacked full-width so nothing is cropped */}
              <div className="flex sm:hidden flex-col gap-[16px]">
                <AreaCard content={content} className="w-full" />
                <LocationCard content={content} className="w-full" />
                <BuildingsCtaCard
                  content={content}
                  className="flex w-full"
                  onCtaClick={handleCtaClick}
                />
              </div>
              {/* Tablet/desktop: original 3-card row, unchanged */}
              <div className="hidden sm:flex items-stretch gap-[16px]">
                <AreaCard content={content} />
                <BuildingsCtaCard
                  content={content}
                  onCtaClick={handleCtaClick}
                />
                <LocationCard content={content} />
              </div>
            </>
          ) : (
            <div className="flex items-stretch gap-[16px]">
              <AreaCard content={content} />
              <BuildingsCtaCard
                content={content}
                className="hidden sm:flex flex-1 min-w-0"
                onCtaClick={handleCtaClick}
              />
              <LocationCard content={content} />
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showCertForm && (
          <CertDownloadModal
            onClose={() => setShowCertForm(false)}
            source={certSource}
          />
        )}
        {showBrochureForm && (
          <BrochurePopForm
            onClose={() => setShowBrochureForm(false)}
            brochureUrl={brochureUrl}
            parkName={parkName ?? content.title}
            apiEndpoint={apiEndpoint}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
