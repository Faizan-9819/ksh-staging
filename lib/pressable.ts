import type { KeyboardEvent } from "react";

// Spread onto a clickable non-button element (<div onClick>) so keyboard
// users can reach it with Tab and activate it with Enter/Space, same as a
// mouse click (WCAG 2.1.1).
export const PRESSABLE = {
  role: "button",
  tabIndex: 0,
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.currentTarget.click();
    }
  },
} as const;
