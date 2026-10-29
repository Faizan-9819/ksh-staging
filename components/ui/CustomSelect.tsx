"use client";

import React, { useEffect, useId, useRef, useState } from "react";

export interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  /** Submitted via a hidden input so the form's FormData still sees it. */
  name: string;
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  invalid?: boolean;
  triggerClassName: string;
  triggerStyle?: React.CSSProperties;
  listClassName: string;
  optionClassName: string;
  optionStyle?: React.CSSProperties;
}

// Chrome renders a native <select>'s option hover/highlight color at the OS
// level — no CSS can override it — so the forms use this custom listbox to
// get the beige hover. It follows the WAI-ARIA "select-only combobox"
// pattern so it stays fully keyboard operable: focus stays on the trigger,
// Arrow keys / Home / End move the highlighted option (announced through
// aria-activedescendant), Enter/Space pick it, Escape or Tab closes, and
// typing a letter jumps to the next option starting with it.
//
// The trigger is a focusable div rather than a <button> on purpose: a
// button fires a synthetic click for Enter/Space, which would re-toggle the
// list right after the key handler already opened/closed it.
export default function CustomSelect({
  name,
  options,
  value,
  onChange,
  placeholder,
  disabled,
  invalid,
  triggerClassName,
  triggerStyle,
  listClassName,
  optionClassName,
  optionStyle,
}: CustomSelectProps) {
  const [isOpenState, setIsOpen] = useState(false);
  // Never show the list while disabled (e.g. mid-submit).
  const isOpen = isOpenState && !disabled;
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const baseId = useId();
  const listId = `${baseId}-listbox`;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  const selectedIndex = options.findIndex((opt) => opt.value === value);
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  const open = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const choose = (index: number) => {
    const opt = options[index];
    if (opt) onChange(opt.value);
    close();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const last = options.length - 1;

    if (!isOpen) {
      if (["ArrowDown", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        open(selectedIndex >= 0 ? selectedIndex : 0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        open(selectedIndex >= 0 ? selectedIndex : last);
      } else if (e.key === "Home") {
        e.preventDefault();
        open(0);
      } else if (e.key === "End") {
        e.preventDefault();
        open(last);
      } else if (e.key.length === 1 && /\S/.test(e.key)) {
        const match = findByLetter(e.key, selectedIndex);
        if (match >= 0) open(match);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(last, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(activeIndex);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        // Let focus move on naturally; just don't leave the list open.
        close();
        break;
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const match = findByLetter(e.key, activeIndex);
          if (match >= 0) setActiveIndex(match);
        }
    }
  };

  const findByLetter = (letter: string, from: number) => {
    const lower = letter.toLowerCase();
    for (let step = 1; step <= options.length; step++) {
      const i = (from + step + options.length) % options.length;
      if (options[i].label.toLowerCase().startsWith(lower)) return i;
    }
    return -1;
  };

  return (
    <div className="relative w-full">
      <input type="hidden" name={name} value={value} />

      <div
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-label={placeholder}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-activedescendant={
          isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined
        }
        aria-disabled={disabled || undefined}
        aria-invalid={invalid || undefined}
        onClick={() => {
          if (disabled) return;
          if (isOpen) close();
          else open(selectedIndex >= 0 ? selectedIndex : 0);
        }}
        onKeyDown={handleKeyDown}
        onBlur={close}
        className={triggerClassName}
        style={triggerStyle}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={`shrink-0 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="#868686"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-label={placeholder}
        hidden={!isOpen}
        className={listClassName}
      >
        {options.map((opt, index) => {
          const isSelected = index === selectedIndex;
          const isActive = index === activeIndex;
          return (
            <li
              key={opt.value}
              id={optionId(index)}
              role="option"
              aria-selected={isSelected}
              // Keep focus on the combobox so its onBlur doesn't close the
              // list before this click lands.
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => choose(index)}
              className={`${optionClassName} cursor-pointer transition-colors text-[#212121] ${
                isActive ? "bg-[#E2DED5]" : ""
              } ${isSelected ? "font-medium" : ""}`}
              style={optionStyle}
            >
              {opt.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
