"use client";

import { useState } from "react";

interface GovernanceMemberCardProps {
  name: string;
  title: string;
  image: string | null;
  bio: string[];
}

// Portrait is the primary element; bio text is revealed as an overlay on
// hover (desktop) or tap/focus (touch, keyboard) rather than sitting
// permanently beneath the image — per the client's onzawealth.com reference.
// A soft dark gradient over the lower portion carries the always-visible
// name/title, and the bio animates in over that same gradient on activation
// so there's no second scrim layered on top.
export default function GovernanceMemberCard({
  name,
  title,
  image,
  bio,
}: GovernanceMemberCardProps) {
  const [active, setActive] = useState(false);

  return (
    <div
      tabIndex={0}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
      className="relative h-[420px] cursor-default overflow-hidden rounded-[20px] bg-[#ECEAE4] shadow-[inset_0_0_0_1px_#E9E9E9] outline-none"
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#ECEAE4] px-6 text-center font-inter text-[14px] text-[#8F8F8F]">
          {name} — portrait
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0) 34%, rgba(0,0,0,0.78) 100%)",
        }}
      />
      <div className="absolute inset-x-6.5 bottom-6.5">
        <div className="font-sora text-[24px] font-semibold tracking-[-0.02em] text-white">
          {name}
        </div>
        <div className="mt-1 font-inter text-[15px] leading-[1.4] text-white/78">
          {title}
        </div>
        <div
          className="flex flex-col gap-2 overflow-hidden transition-[max-height,opacity,margin-top] duration-300 ease-in-out"
          style={{
            marginTop: active ? "12px" : "0px",
            maxHeight: active ? "260px" : "0px",
            opacity: active ? 1 : 0,
          }}
        >
          {bio.map((line) => (
            <p key={line} className="m-0 font-inter text-[15px] leading-[1.45] text-white/90">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
