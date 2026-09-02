"use client";

import { useEffect, useLayoutEffect } from "react";

// Forces the home page to always open at the very top (Hero) on a hard
// refresh or direct load, regardless of where the previous scroll position
// was — overriding the browser's native scroll-position restoration.
// Deliberately scoped to only this one page (mounted here, not in a
// layout/provider): other routes keep the site's default of preserving
// scroll position across a refresh.
//
// A single scrollTo(0, 0) isn't enough on its own: several of this page's
// sections load in as separate next/dynamic chunks after hydration, so the
// document keeps growing taller for a bit after the first paint. Chrome's
// native scroll restoration doesn't always give up after one attempt — if
// it couldn't reach the remembered offset yet because the page was still
// short, it can retry once the page grows enough to reach it, overriding a
// one-shot correction (that's what surfaced as still landing on the Map
// section instead of Hero). Setting scrollRestoration to "manual" stops the
// browser from attempting that restoration at all; restoring it on unmount
// keeps the change scoped to this page's lifetime.
//
// A URL hash (e.g. "/#testimonials", landed on from the navbar's Media or
// Capabilities dropdown) means the opposite is intended — the browser/Lenis
// is meant to land partway down the page, not at the top — so this backs
// off entirely whenever one is present rather than fighting that jump.
export default function ScrollToTopOnLoad() {
  useLayoutEffect(() => {
    if (window.location.hash) return;

    const history = window.history;
    const hasApi = "scrollRestoration" in history;
    const previous = hasApi ? history.scrollRestoration : null;
    if (hasApi) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    return () => {
      if (hasApi && previous) {
        history.scrollRestoration = previous;
      }
    };
  }, []);

  // Belt-and-braces re-assertion while the page's next/dynamic sections are
  // still mounting in and the document is still growing — covers the same
  // window a lingering browser restoration attempt would target, without
  // running indefinitely or ever fighting a real, later user scroll.
  useEffect(() => {
    if (window.location.hash) return;

    let cancelled = false;
    const reassert = () => {
      if (!cancelled && window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };
    const timers = [0, 150, 400, 800, 1500].map((delay) =>
      window.setTimeout(reassert, delay),
    );
    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return null;
}
