"use client";

// Drop-in replacement for next/link — same `href`/children/className API, so
// existing usages migrate by only changing the import
// (`from "next/link"` -> `from "@/components/ui/Link"`). On top of normal
// navigation it triggers the full-screen page-transition loader (see
// PageTransitionContext.tsx), and holds it up until the destination route
// has actually committed AND its media has finished loading — see that
// file's `waitForMediaReady` for why.
import { forwardRef } from "react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition, PAGE_TRANSITION_ENABLED } from "./PageTransitionContext";

type LinkProps = NextLinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & {
    children?: React.ReactNode;
  };

// Same "is this a same-page hash link" check LenisProvider's own click
// interceptor uses (compare the pre-hash path against the current
// pathname) — a hash link should always fall through to native/Lenis
// hash-scroll handling, never the full-page transition loader.
function isSamePageHashLink(href: string, pathname: string): boolean {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return false;
  const path = href.slice(0, hashIndex) || "/";
  return path === pathname;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, onClick, onNavigate, children, ...rest },
  ref,
) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();
  const hrefStr = typeof href === "string" ? href : href.pathname || "";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    // next/link's real `onNavigate` prop (Next 15+) exists specifically so
    // callers can intercept/cancel client-side navigation before it starts —
    // Navbar's dropdown triggers rely on exactly this to toggle a dropdown
    // panel open instead of actually navigating. It has to be honored here,
    // with the same preventDefault-checkable event shape, or every dropdown
    // trigger silently starts navigating instead of opening its dropdown.
    if (onNavigate) {
      let defaultPrevented = false;
      onNavigate({
        preventDefault: () => {
          defaultPrevented = true;
        },
      });
      if (defaultPrevented) {
        e.preventDefault();
        return;
      }
    }

    // Feature switched off (PAGE_TRANSITION_ENABLED in
    // PageTransitionContext.tsx) — stop here and let NextLink's own default
    // behavior handle the click as if this were a plain next/link. Only
    // onClick/onNavigate (both already handled above) still apply; none of
    // the loader-specific logic below ever runs.
    if (!PAGE_TRANSITION_ENABLED) return;

    // Ctrl/Cmd/middle-click/Shift+click are all "open in new tab/window"
    // gestures — let the browser's native <a> behavior handle those
    // untouched, same as a plain next/link would. Only a plain left-click
    // triggers our own transition.
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    // External links, mailto:, tel:, etc. — anything not a same-origin
    // in-app path — get native browser navigation, not the SPA transition.
    if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(hrefStr) && !hrefStr.startsWith(window.location.origin)) {
      return;
    }

    // In-page anchor links (`#section` or `/current-page#section`) skip the
    // full-screen loader entirely — LenisProvider's own click interceptor
    // (and, for a hash link to a different page, its pathname-change effect)
    // already handles smooth-scrolling to the target. Forcing those through
    // a full-page loader would be exactly the "glitchy" behavior being
    // avoided, for a navigation that never actually leaves this page.
    if (isSamePageHashLink(hrefStr, pathname)) {
      return;
    }

    // Already on the destination URL (path + search + hash all match) —
    // nothing to transition to.
    const dest = new URL(hrefStr, window.location.href);
    if (
      dest.pathname === window.location.pathname &&
      dest.search === window.location.search &&
      dest.hash === window.location.hash
    ) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    navigate(hrefStr);
  };

  return (
    <NextLink ref={ref} href={href} onClick={handleClick} {...rest}>
      {children}
    </NextLink>
  );
});

export default Link;
