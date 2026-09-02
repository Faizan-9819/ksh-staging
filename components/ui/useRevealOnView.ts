"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Drop-in replacement for the `whileInView="show"` + `viewport={{ once: true }}`
// pattern used across the site's scroll-reveal sections. Framer's own
// IntersectionObserver occasionally never reports an intersection for
// elements that are already at/near the fold at first paint (layout not yet
// settled, a parent's width/margin still being set imperatively elsewhere,
// very short viewports, etc.) — combined with `once: true` that leaves the
// element permanently stuck at its `hidden` (opacity: 0) variant state with
// no recovery, which is what reads as "image doesn't show up at all" on some
// loads. This adds a fixed timeout fallback: if the observer hasn't fired
// within REVEAL_FALLBACK_MS of mount, the element is forced visible anyway.
const REVEAL_FALLBACK_MS = 1200;

export function useRevealOnView<T extends HTMLElement>(
  margin: string = "-80px",
) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: margin as never });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    if (inView) return;
    const t = setTimeout(() => setForced(true), REVEAL_FALLBACK_MS);
    return () => clearTimeout(t);
  }, [inView]);

  return { ref, animate: inView || forced ? "show" : "hidden" } as const;
}
