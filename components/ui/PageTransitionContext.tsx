"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { stopLenis, startLenis } from "./LenisProvider";

// Single on/off switch for the whole page-loader feature. Flip to `false` to
// make every <Link/> in the app behave as a plain next/link — no full-screen
// beige loader, no wait-for-media gate, no Lenis stop/start around
// navigation — with zero code changes anywhere else needed.
export const PAGE_TRANSITION_ENABLED = false;

// How long to wait for the destination page's own media (images still
// decoding, videos still buffering) before giving up and revealing it
// anyway — a single stalled/broken asset (bad CDN response, a video that
// never gets enough data) must never be able to strand the user behind the
// loader forever.
const MEDIA_TIMEOUT_MS = 6000;
// Safety ceiling on the whole transition, independent of the media wait —
// covers the pathological case where the destination route itself never
// commits (e.g. it throws during render) so the loader still can't hang.
const HARD_TIMEOUT_MS = 10000;

type PageTransitionContextValue = {
  /** True while the full-screen loader is up (destination requested but not yet ready). */
  isTransitioning: boolean;
  /** Navigate to `href` through the transition instead of a raw router.push. */
  navigate: (href: string) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null,
);

// Waits for every <img>/<video> currently in the document to finish loading
// (or fail — a broken asset shouldn't hold the page hostage either), polling
// on rAF rather than a single one-shot check since new media can mount a
// render or two after the route itself commits.
function waitForMediaReady(): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    let rafId = 0;
    let timeoutId = 0;

    const finish = () => {
      if (settled) return;
      settled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      resolve();
    };

    timeoutId = window.setTimeout(finish, MEDIA_TIMEOUT_MS);

    const checkOnce = () => {
      const images = Array.from(document.images);
      const videos = Array.from(document.querySelectorAll("video"));

      const imagesReady = images.every(
        (img) => img.complete || img.naturalWidth > 0 || img.src === "",
      );
      // readyState 3 (HAVE_FUTURE_DATA) or higher means playback can start
      // without immediately stalling — good enough for "ready to show",
      // rather than waiting for the whole file (HAVE_ENOUGH_DATA can lag
      // well behind what the user actually needs to see).
      const videosReady = videos.every(
        (video) => video.readyState >= 3 || video.error !== null,
      );

      if (imagesReady && videosReady) {
        finish();
        return true;
      }
      return false;
    };

    if (checkOnce()) return;

    const poll = () => {
      if (checkOnce()) return;
      rafId = requestAnimationFrame(poll);
    };
    rafId = requestAnimationFrame(poll);
  });
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  // The destination pathname we're waiting to actually commit — distinct
  // from `pathname` itself, which only updates once the route swap lands.
  const pendingPathRef = useRef<string | null>(null);
  const hasLockRef = useRef(false);

  const acquireLock = useCallback(() => {
    if (hasLockRef.current) return;
    hasLockRef.current = true;
    stopLenis();
  }, []);

  const releaseLock = useCallback(() => {
    if (!hasLockRef.current) return;
    hasLockRef.current = false;
    startLenis();
  }, []);

  const navigate = useCallback(
    (href: string) => {
      // Feature switched off — behave as a plain router.push, no loader, no
      // Lenis lock, no media wait. Still worth skipping the redundant-push
      // check below since a disabled loader doesn't need it either, but
      // router.push on the same URL is a harmless no-op anyway.
      if (!PAGE_TRANSITION_ENABLED) {
        router.push(href);
        return;
      }

      const url = new URL(href, window.location.href);
      const destinationPath = url.pathname;

      // Already on this exact URL (path + search + hash) — nothing to
      // transition to, so don't show the loader or push a redundant entry.
      if (
        destinationPath === window.location.pathname &&
        url.search === window.location.search &&
        url.hash === window.location.hash
      ) {
        return;
      }

      setIsTransitioning(true);
      acquireLock();
      pendingPathRef.current = destinationPath;
      router.push(href);

      // Belt-and-braces: if the destination pathname never actually shows up
      // (route error, navigation cancelled), don't strand the user forever.
      const hardTimeout = setTimeout(() => {
        if (pendingPathRef.current === destinationPath) {
          pendingPathRef.current = null;
          setIsTransitioning(false);
          releaseLock();
        }
      }, HARD_TIMEOUT_MS);

      return () => clearTimeout(hardTimeout);
    },
    [router, acquireLock, releaseLock],
  );

  // Fires once the destination pathname has actually committed to the DOM
  // (usePathname updates on the render after the route swap) — this is the
  // "the URL has changed" signal the loader waits for before it's even
  // allowed to start checking media, per the no-glitch requirement.
  useEffect(() => {
    if (!PAGE_TRANSITION_ENABLED) return;
    if (pendingPathRef.current === null) return;
    if (pathname !== pendingPathRef.current) return;

    pendingPathRef.current = null;
    let cancelled = false;

    waitForMediaReady().then(() => {
      if (cancelled) return;
      setIsTransitioning(false);
      releaseLock();
    });

    return () => {
      cancelled = true;
    };
  }, [pathname, releaseLock]);

  // Releasing the Lenis lock on unmount covers the (unlikely) case where
  // this provider itself unmounts mid-transition — never leave a lock held
  // with nothing left to release it.
  useEffect(() => {
    return () => {
      if (hasLockRef.current) {
        hasLockRef.current = false;
        startLenis();
      }
    };
  }, []);

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, navigate }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider",
    );
  }
  return ctx;
}
