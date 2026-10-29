"use client";

// First Tab stop on every page (WCAG 2.4.1). LenisProvider intercepts
// same-page "#hash" clicks on "/" without moving focus, so focus the
// target explicitly — the interceptor doesn't stopPropagation, so this
// onClick still runs.
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      onClick={() => document.getElementById("main-content")?.focus()}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[2147483647] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-[#212121] focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}
