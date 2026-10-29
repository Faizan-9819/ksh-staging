"use client";

import React, { useEffect, useRef, useState } from "react";

const scopeOf = (el: HTMLElement | null) =>
  el?.closest<HTMLElement>("[data-hero-video-scope], section") ?? null;

interface HeroVideoToggleProps {
  /**
   * Render the bare button in normal flow (e.g. inside the home hero's
   * slide-dots row) instead of pinned to the hero's bottom-left corner.
   */
  inline?: boolean;
  /** Extra classes for the button itself when `inline`. */
  className?: string;
  /** Distance from the hero's bottom edge when not `inline`. */
  bottomClassName?: string;
  /** "sm" for inline use next to other small controls (home hero dots). */
  size?: "md" | "sm";
}

// Play/pause control for autoplaying hero background videos (WCAG 2.2.2:
// moving content that starts automatically must be pausable). Drop it inside
// the hero's <section> — or any ancestor marked `data-hero-video-scope` — and
// it controls every <video> in there, including ones mounted later (e.g. the
// home hero's per-slide / per-viewport videos). While paused, any video that
// tries to autoplay is paused again so the choice sticks across slides.
export default function HeroVideoToggle({
  inline = false,
  className = "",
  bottomClassName = "bottom-6 md:bottom-8",
  size = "md",
}: HeroVideoToggleProps) {
  const sizeClassName = size === "sm" ? "h-[56px] w-[56px]" : "h-[75px] w-[75px]";  const buttonRef = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);

  // Users who ask for reduced motion start with the video paused.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scopeOf(buttonRef.current)
        ?.querySelectorAll("video")
        .forEach((video) => video.pause());
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with a browser media query on mount
      setPaused(true);
    }
  }, []);

  useEffect(() => {
    const scope = scopeOf(buttonRef.current);
    if (!scope || !paused) return;
    // `play` doesn't bubble, so listen in the capture phase.
    const keepPaused = (e: Event) => {
      if (e.target instanceof HTMLVideoElement) e.target.pause();
    };
    scope.addEventListener("play", keepPaused, true);
    return () => scope.removeEventListener("play", keepPaused, true);
  }, [paused]);

  const toggle = () => {
    const videos = scopeOf(buttonRef.current)?.querySelectorAll("video") ?? [];
    const nextPaused = !paused;
    setPaused(nextPaused);
    videos.forEach((video) => {
      if (nextPaused) video.pause();
      else void video.play().catch(() => {});
    });
  };

  const button = (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={paused ? "Play background video" : "Pause background video"}
      aria-pressed={paused}
      // Same glassy look as the site's video-card play buttons.
      className={`${inline ? className : "pointer-events-auto"} ${sizeClassName} flex aspect-square shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transform-gpu transition-colors duration-500 ease-out hover:bg-black/30`}
    >
      {paused ? (
        <svg
          viewBox="0 0 40 40"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={9}
          strokeLinejoin="round"
          aria-hidden="true"
          // Nudged right so the triangle looks optically centred.
          className="size-[36%] translate-x-[12.5%]"
        >
          <path d="M4.5 4.5 L35.5 20 L4.5 35.5 Z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 40 40"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={9}
          strokeLinejoin="round"
          aria-hidden="true"
          className="size-[36%]"
        >
          <path d="M8 4.5 V35.5 M32 4.5 V35.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );

  if (inline) return button;

  // Same container + side padding as the navbar bar (Navbar.tsx: `md-fix
  // px-3! 2xl:px-7!`), so the button's left edge lines up with the logo.
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-30 ${bottomClassName}`}
    >
      <div className="md-fix px-3! 2xl:px-7!">{button}</div>
    </div>
  );
}
