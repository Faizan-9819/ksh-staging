"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useVideoModal } from "./VideoModalContext";

let globalLenis: Lenis | null = null;

// Reference-counted lock: any number of modals/popups across the app can call
// stopLenis()/startLenis() independently (video modal, gallery popups,
// infra/location popups, ...) without one's start() prematurely resuming
// scroll while another still expects it locked. Lenis only actually resumes
// once every lock has been released. resize() is called on real resume so
// Lenis re-measures the document instead of scrolling with a stale limit
// cached from before the modal changed page height (the "stuck before the
// true bottom" bug).
let lockCount = 0;

// Lenis.stop() only pauses Lenis's own smooth-scroll interpolation — it
// stops preventDefault-ing wheel/touch events too, which hands scroll input
// straight back to the browser's native handling. Native scroll doesn't
// know or care about a popup's z-index, only DOM overflow ancestry, so with
// only lenis.stop() a modal open over the page still lets the page underneath
// scroll natively the instant the cursor is over the popup itself. Locking
// html/body overflow here closes that gap for every stopLenis() caller at
// once. Safe from layout shift: html has `scrollbar-gutter: stable` set
// globally (globals.css), so hiding the scrollbar reserves its width already
// and toggling overflow:hidden doesn't reflow page width.
function applyHardScrollLock() {
  if (typeof document === "undefined") return;
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}
function releaseHardScrollLock() {
  if (typeof document === "undefined") return;
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

export function stopLenis() {
  lockCount += 1;
  globalLenis?.stop();
  applyHardScrollLock();
}
export function startLenis() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    globalLenis?.resize();
    globalLenis?.start();
    releaseHardScrollLock();
  }
}

// A real route change is a safe point to guarantee scroll isn't stuck: any
// lock still held at that instant belongs to whatever the OLD page was
// showing (a popup, a pinned/captured section), and that's unmounting
// regardless — a lock that outlives its own page can only be a leak, not a
// legitimate hold. Without this, a single leaked lock anywhere (a popup
// whose close button got swallowed, a wheel-capture that never resolved)
// poisons scrolling on every page reached afterward for the rest of the
// session, since lockCount/globalLenis are module-level and otherwise never
// reset short of a hard refresh — which is exactly the "change page, scroll
// is stuck, only a refresh fixes it" bug this closes.
function forceUnlockLenis() {
  lockCount = 0;
  globalLenis?.resize();
  globalLenis?.start();
  releaseHardScrollLock();
}

// Lets scroll-linked animations (e.g. ExistingInvestorsSection's crossfade)
// sample scroll position on Lenis's own rAF tick instead of racing it with
// a second, independently-scheduled rAF loop (Framer Motion's useScroll).
// Falls back to a no-op unsubscribe if Lenis hasn't mounted yet.
export function subscribeLenisScroll(callback: () => void) {
  if (!globalLenis) return () => {};
  globalLenis.on("scroll", callback);
  return () => {
    globalLenis?.off("scroll", callback);
  };
}

// Programmatic "scroll to this section" calls (nav links, "scroll down"
// buttons, tab strips) must go through Lenis instead of the browser's native
// `scrollIntoView`/`window.scrollTo({ behavior: "smooth" })` — Lenis is still
// driving the page's real scroll position every rAF tick underneath, so a
// second, independent native scroll animation fights it frame-by-frame for
// control, which is what shows up as the scroll stopping short or jerking.
// Falls back to the native call if Lenis hasn't mounted yet so this never
// becomes a silent no-op.
export function lenisScrollTo(
  target: number | string | HTMLElement,
  options?: {
    offset?: number;
    immediate?: boolean;
    duration?: number;
    // Lenis's own scrollTo() silently no-ops (returns immediately, doesn't
    // touch targetScroll/animatedScroll at all — see its source) if Lenis is
    // currently stopped, UNLESS force:true is passed. Callers that call this
    // right after stopLenis() (e.g. Map.tsx's checkEntry, resetting Lenis's
    // internal position to the section top the instant capture engages)
    // need force:true, or the reset call does nothing and Lenis's internal
    // targetScroll is left stale at wherever the user's pre-capture momentum
    // was heading — which the NEXT startLenis() then eases toward once
    // capture ends, producing a scroll jump sized by however far that stale
    // target had drifted (worse the faster the user was scrolling at entry).
    force?: boolean;
  },
) {
  if (globalLenis) {
    globalLenis.scrollTo(target, options);
    return;
  }
  if (typeof target !== "number") {
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.scrollTo({ top: target, behavior: "smooth" });
}

// A handful of sections (ScrollFrames' scroll-scrubbed canvas pin, Map's
// wheel-captured pin) drive themselves entirely off native `scroll` events
// measured against their own bounding rect — correct for organic,
// incremental scrolling, but a single long jump (Lenis snapping straight to
// a hash target several sections away) fires those same events mid-flight
// and trips their pin/capture/settle logic, stranding the page inside
// whichever section the jump happened to pass through instead of reaching
// the target. Those sections call isScrollJumpInProgress() and skip their
// own scroll handling for the duration of a flagged jump so it can pass
// through them untouched.
let jumpGuardUntil = 0;
// Fired once, after the fact, when the guard set by the most recent
// suppressScrollHijack() call elapses — lets a guarded section resync its
// own state (e.g. "did the jump land past me?") against real position right
// as normal scroll handling resumes, instead of only finding out on
// whichever real scroll/wheel event the user happens to produce next, which
// is what turns a skipped transition into a visible corrective jerk.
let jumpEndListeners: Array<() => void> = [];
// Guards against a stale, earlier-scheduled setTimeout firing jumpEndListeners
// after a LATER suppressScrollHijack() call already moved jumpGuardUntil
// further out — each call now carries its own token, and only the timeout
// whose token still matches the most recent call is allowed to fire.
let jumpGuardToken = 0;
export function suppressScrollHijack(ms = 1500) {
  jumpGuardUntil = Date.now() + ms;
  const token = ++jumpGuardToken;
  setTimeout(() => {
    if (token === jumpGuardToken) {
      jumpEndListeners.forEach((cb) => cb());
    }
  }, ms);
}
export function isScrollJumpInProgress() {
  return Date.now() < jumpGuardUntil;
}
export function onScrollJumpEnd(callback: () => void) {
  jumpEndListeners.push(callback);
  return () => {
    jumpEndListeners = jumpEndListeners.filter((cb) => cb !== callback);
  };
}

// Shared by the pathname-change effect and the same-page hash-click handler
// below. Retries across a few animation frames since the target element may
// not have committed to the DOM in the very same tick (e.g. it's inside a
// next/dynamic chunk that hasn't finished loading in yet).
//
// The actual scroll to the target runs as a native, CSS-driven smooth
// scroll (html.hash-jump-smooth in globals.css) rather than through Lenis —
// Lenis's own smoothing is deliberately left off <html> everywhere else
// because it fights native `scroll-behavior: smooth` for control of the
// position every frame (see the comment in globals.css), so the two must
// never run at the same time. Toggling the class on only for this one jump,
// letting the browser drive it, then handing back to Lenis once it
// finishes avoids that overlap entirely. isScrollJumpInProgress() stays
// true for the native scroll's real duration (measured via the `scrollend`
// event, with a timeout fallback for browsers that don't fire it yet) so
// ScrollFrames/Map/OurPurpose's scroll-position-driven pin logic still
// skips over it exactly as it did for the old instant jump.
function scrollToHashTarget(id: string) {
  let rafId: number;
  let attempts = 0;
  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      // Roughly matches Lenis's own duration for a comparable distance
      // (1.2s base) rather than a fixed guess — a short hop and a jump
      // across the whole page shouldn't both get the same guard window.
      const estimatedMs = Math.min(
        2500,
        Math.max(600, (el.getBoundingClientRect().top / 1000) * 900 + 700),
      );
      suppressScrollHijack(estimatedMs);

      document.documentElement.classList.add("hash-jump-smooth");
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        document.documentElement.classList.remove("hash-jump-smooth");
        document.removeEventListener("scrollend", finish);
        // Lenis doesn't know the native scroll just moved the real
        // scrollTop out from under it — resize() + a forced immediate
        // scrollTo of 0 distance re-anchors its internal target to the
        // actual current position so its very next rAF tick doesn't ease
        // back toward a stale target and undo the landing.
        globalLenis?.resize();
        globalLenis?.scrollTo(window.scrollY, { immediate: true, force: true });
      };
      document.addEventListener("scrollend", finish, { once: true });
      // Fallback for Safari (no `scrollend` support yet as of this
      // writing): resolve slightly after the guard's own estimate so a
      // slow/interrupted native scroll still gets to finish first.
      setTimeout(finish, estimatedMs + 150);

      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    attempts += 1;
    if (attempts < 30) {
      rafId = requestAnimationFrame(tryScroll);
    }
  };
  rafId = requestAnimationFrame(tryScroll);
  return () => cancelAnimationFrame(rafId);
}

function LenisInner({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const { open } = useVideoModal();
  const pathname = usePathname();
  const isFirstPathname = useRef(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      // Lets nested scrollable elements (e.g. the testimonial card's
      // overflow-y-auto content box) take over natively only while they
      // actually have room left to scroll in that direction — without this,
      // an unconditional data-lenis-prevent on such a box hands wheel input
      // straight to raw native scroll the instant the cursor is over it,
      // which fights Lenis's own smoothed animation everywhere else on the
      // page and reads as the scroll jerking between smooth and instant.
      allowNestedScroll: true,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    let rafId: number;
    function raf(time: number) {
      // lenis.raf() synchronously fires "scroll" to every subscriber (e.g.
      // ExistingInvestorsSection's subscribeLenisScroll crossfade) — if any
      // one of them ever throws, the exception used to propagate out of
      // this function and skip the requestAnimationFrame(raf) call below,
      // permanently killing the recursive rAF chain. Since globalLenis/rafId
      // are module-level and survive client-side route changes, that dead
      // loop then froze scroll on every page for the rest of the session —
      // exactly the "scroll stops, only a hard refresh fixes it" bug — even
      // though the throwing listener had nothing to do with whatever page
      // the user was on when it happened to fire. The try/catch guarantees
      // the next frame is always scheduled no matter what a subscriber does.
      try {
        lenis.raf(time);
      } catch (err) {
        console.error("Lenis raf tick threw, continuing loop:", err);
      }
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Lenis only measures the document's scrollable height once, at init (or
    // whenever something explicitly calls resize()). Pages whose content
    // grows AFTER that first measurement — team member photos with no
    // reserved aspect ratio, or a blog post's raw dangerouslySetInnerHTML
    // WordPress HTML full of unsized <img> tags — keep loading in below the
    // fold and pushing the real document taller, but Lenis keeps clamping
    // scroll to its stale, shorter limit. That's what reads as "scroll just
    // stops partway down": it's not stuck, it's already at Lenis's (wrong)
    // 100%. Watching body height and re-measuring on every change keeps
    // Lenis's limit in sync as async content finishes loading in.
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      lenis.destroy();
      globalLenis = null;
      lockCount = 0;
    };
  }, []);

  // Self-heals a leaked scroll lock without requiring a full page
  // navigation. Every modal/popup on the site increments lockCount via
  // stopLenis() and is supposed to decrement it via startLenis() on close —
  // forceUnlockLenis() (above) already covers the case where a lock survives
  // past a route change, but a lock that leaks while the user stays on the
  // SAME page (e.g. a popup's cleanup skipped for any reason) previously had
  // no recovery path short of a hard refresh, which is exactly the "wheel
  // scroll just stops working" bug this closes. If our own bookkeeping says
  // nothing should be locking scroll (lockCount === 0) but Lenis still
  // reports itself stopped, that combination can only mean a stale/leaked
  // stop() call — never a legitimate lock — so clearing it on the very next
  // wheel gesture is always safe.
  useEffect(() => {
    const onGesture = () => {
      if (lockCount === 0 && globalLenis?.isStopped) {
        forceUnlockLenis();
      }
    };
    // touchstart alongside wheel — touch-only devices (the primary way of
    // tapping a team photo to open its popup) never fire wheel events, so
    // without this a leaked lock on mobile had no self-heal path at all.
    window.addEventListener("wheel", onGesture, { passive: true });
    window.addEventListener("touchstart", onGesture, { passive: true });
    return () => {
      window.removeEventListener("wheel", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };
  }, []);

  useEffect(() => {
    // Early-return guard rather than an if/open-else-closed startLenis() —
    // that shape calls startLenis() twice for one stopLenis() (once from
    // the close transition's own body, again from the prior render's
    // cleanup below), which can zero out a completely unrelated lock still
    // held elsewhere (e.g. a navbar dropdown) and resume scroll under it.
    if (!open) return;
    stopLenis();
    return () => startLenis();
  }, [open]);

  // On every real navigation (not the initial mount), snap Lenis back to
  // the top. Lenis tracks its own animated/target scroll internally, so
  // Next's native scroll-to-top on route change doesn't reset it — without
  // this, a page you leave scrolled halfway/at the bottom leaves the next
  // page's Lenis state stuck at that same offset.
  //
  // A hash link (e.g. /#testimonials from the Capabilities dropdown) is the
  // one case that should scroll somewhere else instead: the browser's own
  // hash-scroll (or Next's) sets the real scrollTop, but Lenis keeps
  // overwriting it back on its own next rAF tick since it doesn't know
  // about that target — from the user's end this reads as the anchor link
  // just silently not working. Scrolling to the target through Lenis
  // itself (lenis.scrollTo, not the browser API) is the only way it
  // sticks. The element may not have committed to the DOM in the very same
  // tick as the pathname change, so this retries across a few animation
  // frames instead of firing once immediately.
  useEffect(() => {
    if (isFirstPathname.current) {
      isFirstPathname.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    forceUnlockLenis();
    const hash = window.location.hash;
    if (!hash) {
      globalLenis?.scrollTo(0, { immediate: true, force: true });
      return;
    }
    return scrollToHashTarget(decodeURIComponent(hash.slice(1)));
  }, [pathname]);

  // The effect above only fires when the pathname itself changes, so a
  // same-page hash link (e.g. clicking "Testimonials" in the Media or
  // Capabilities dropdown while already on "/") leaves it untouched and the
  // click silently does nothing. Intercepted here in the capture phase —
  // before Next's own <Link> handler sees the click — so only this exact
  // case (an `<a href>` whose path matches the current page) is taken over;
  // every other link, including hash links to a *different* page, is left
  // alone and still flows through the pathname effect above once that page
  // has mounted.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const anchor = (e.target as HTMLElement).closest?.("a[href]");
      const href = anchor?.getAttribute("href");
      if (!href) return;

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const path = href.slice(0, hashIndex) || "/";
      const hash = href.slice(hashIndex);
      if (hash.length <= 1 || path !== window.location.pathname) return;

      // preventDefault() alone is enough to stop the native/Next.js
      // navigation — do NOT also stopPropagation(). This fires in the
      // capture phase, upstream of React's own bubble-phase synthetic
      // dispatch, so stopPropagation() here would silently swallow the
      // click before React (and thus this same <a>'s own onClick, e.g. a
      // navbar dropdown/mobile-menu's onNavigate={closeDropdown}) ever
      // sees it. That left the dropdown/drawer stuck open forever with its
      // Lenis scroll-lock (see stopLenis/startLenis below) never released
      // — clicking a same-page hash link (e.g. "Testimonials") from an
      // open dropdown both failed to scroll (Lenis was still locked by
      // that same stuck-open dropdown) and permanently froze scrolling
      // sitewide until a hard refresh.
      e.preventDefault();
      window.history.pushState(null, "", href);
      scrollToHashTarget(decodeURIComponent(hash.slice(1)));
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return <>{children}</>;
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return <LenisInner>{children}</LenisInner>;
}
