"use client";

import Image from "next/image";
import { usePageTransition, PAGE_TRANSITION_ENABLED } from "./PageTransitionContext";

// z-index has to clear the highest value already in live use elsewhere
// (GalleryMediaPopup.tsx's z-[9999999999999999], 16 nines) — this overlay
// must always paint above every existing popup/drawer/modal in the app, not
// just most of them, so it's one order of magnitude past that instead of a
// "reasonable" round number that would get buried under half the site.
export default function PageLoader() {
  const { isTransitioning } = usePageTransition();

  // Feature switched off (PAGE_TRANSITION_ENABLED in PageTransitionContext.tsx)
  // — don't even mount the overlay div, rather than just keeping it
  // permanently invisible.
  if (!PAGE_TRANSITION_ENABLED) return null;

  return (
    <div
      aria-hidden={!isTransitioning}
      className="fixed inset-0 z-[99999999999999999] flex items-center justify-center bg-[#FBF2E8] transition-opacity duration-300"
      style={{
        opacity: isTransitioning ? 1 : 0,
        pointerEvents: isTransitioning ? "auto" : "none",
      }}
    >
      <Image src="/logom.svg" alt="" priority width={204} height={70} className="w-[130px] h-auto" />
    </div>
  );
}
