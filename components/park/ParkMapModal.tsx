"use client";

import { useState } from "react";

const TABS = ["KSH INFRA Parks", "Notable Industries", "Connectivity"];

interface ParkMapModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ParkMapModal({ open, onClose }: ParkMapModalProps) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative w-full max-w-[1173px] bg-white rounded-[20px] shadow-[10px_14px_34px_0px_rgba(0,0,0,0.25)] overflow-hidden p-[24px] lg:p-[38px]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-[24px] right-[24px] lg:top-[38px] lg:right-[38px] size-[48px] rounded-full bg-[#f2f2f2] flex items-center justify-center cursor-pointer transition-opacity hover:opacity-70 z-10"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M1 1l16 16M17 1 1 17"
              stroke="#212121"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-[20px] flex-wrap justify-center mb-[30px]">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-[20px] py-[10px] rounded-[50px] text-[16px] lg:text-[20px] font-sora cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "bg-[#59624d] text-white"
                  : "border border-[#59624d] text-[#59624d] bg-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="rounded-[20px] border border-[#aeaeae] overflow-hidden h-[380px] lg:h-[502px]">
          <img
            src="/park/map-preview.png"
            alt={activeTab}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
