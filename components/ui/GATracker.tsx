"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// GA4's own auto pageview tracking doesn't reliably catch client-side route
// changes in the App Router — this fires the page_view event manually on
// every pathname change so GA4 pageviews stay accurate across navigations.
export default function GATracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname]);

  return null;
}
