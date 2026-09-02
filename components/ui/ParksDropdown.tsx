"use client";

import Link from "@/components/ui/Link";
import { useState } from "react";
import Btn from "./Btn";

export interface ParkLink {
  label: string;
  href: string;
  image: string;
  /** True for parks with no live page yet — link becomes non-navigating and shows a "Coming Soon" tooltip on hover instead. */
  comingSoon?: boolean;
}

export interface ParkCity {
  city: string;
  parks: ParkLink[];
}

export const PARK_CITIES: ParkCity[] = [
  {
    city: "Pune",
    parks: [
      {
        label: "KSH Chakan IV",
        href: "/ksh-chakan-iv",
        image: "/ParkPage/chakan-4/heroCh4/NewChakan4Spot.webp",
      },
      {
        label: "KSH Chakan III",
        href: "/ksh-chakan-iii",
        image: "/ParkPage/chakan-3/ch3spot.jpg",
      },
      {
        label: "KSH Chakan II",
        href: "/ksh-chakan-ii",
        image: "/ParkPage/chakan-2/ch2spot.jpg",
      },
      {
        label: "KSH Chakan I",
        href: "/ksh-chakan-i",
        image: "/ParkPage/chakan-1/ch1spot.jpg",
      },
      {
        label: "KSH Talegaon I",
        href: "/ksh-talegaon-i",
        image: "/ParkPage/talegaon-i/t1spot.jpg",
      },
    ],
  },
  {
    city: "Bengaluru",
    parks: [
      {
        label: "KSH Hosur I",
        href: "/ksh-hosur-i",
        image: "/ParkPage/hosur-1/hspot.jpg",
      },
    ],
  },
  {
    city: "Chennai",
    parks: [
      {
        label: "KSH Chennai I",
        href: "#",
        image: "/ParkPage/chpov.png",
        comingSoon: true,
      },
    ],
  },
];

const DEFAULT_PARK = PARK_CITIES[1].parks[0];

interface ParksDropdownProps {
  onNavigate?: () => void;
  measurementOnly?: boolean;
}

// Parks preview + city-columns content. This is rendered as the lower
// section of the combined white nav layer (see ParksNavPanel.tsx) — it is
// no longer a standalone top-level panel with its own rounding/shadow.
export default function ParksDropdown({
  onNavigate,
  measurementOnly = false,
}: ParksDropdownProps) {
  const [preview, setPreview] = useState<ParkLink>(DEFAULT_PARK);

  return (
    <div className="px-7 flex gap-[45px] py-[30px]" data-name="Parks Dropdown">
      {/* Preview card */}
      <div
        className="shrink-0 w-[370px] rounded-[20px] p-[30px]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(251, 242, 232) 0%, rgb(251, 242, 232) 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-[20px]">
          <div className="h-[172px] w-full overflow-hidden rounded-[12px] bg-white">
            <img
              src={preview.image}
              alt={preview.label}
              className="h-full w-full object-cover"
            />
          </div>
          <Btn
            label="Park Overview"
            href={measurementOnly ? undefined : "/parks"}
            onClick={onNavigate}
            textColor="text-[#59624d]"
            hoverTextColor="text-white"
            bgColor="bg-transparent"
            hoverBgColor="bg-[#59624d]"
            borderColor="border-[#59624d]"
            arrowColor="stroke-[#59624d]"
            hoverArrowColor="stroke-white"
            fontWeight="font-normal"
            textSize="text-[14px]"
            className="w-full justify-between"
          />
        </div>
      </div>

      {/* City columns */}
      <div className="flex gap-[50px] items-start pt-[3px]">
        {PARK_CITIES.map((group) => (
          <div key={group.city} className="flex flex-col gap-[20px] w-[212px]">
            <div className="flex flex-col gap-[11px] w-full">
              <p className="font-sora font-normal text-[24px] text-[#212121] m-0">
                {group.city}
              </p>
              <div className="h-px w-full bg-[#212121]/20" />
            </div>
            <div className="flex flex-col gap-[20px] w-full">
              {group.parks.map((park) =>
                park.comingSoon ? (
                  <div
                    key={park.label}
                    className="group relative w-fit"
                    onMouseEnter={() => setPreview(park)}
                  >
                    <span className="w-fit cursor-default font-sora font-normal text-[16px] tracking-[-0.32px] text-[#212121]">
                      {park.label}
                    </span>
                    {/* "Coming Soon" tooltip — shown on hover, anchored above the label */}
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 hidden -translate-x-1/2 group-hover:block">
                      <div className="whitespace-nowrap rounded-lg bg-[#FBF2E8] px-3 py-1.5 text-sm font-medium text-[#212121] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]">
                        Coming Soon
                      </div>
                      <div className="mx-auto -mt-1.5 h-2.5 w-2.5 rotate-45 bg-[#FBF2E8]" />
                    </div>
                  </div>
                ) : measurementOnly ? (
                  <span
                    key={park.label}
                    onMouseEnter={() => setPreview(park)}
                    className="w-fit font-sora font-normal text-[16px] tracking-[-0.32px] text-[#212121] no-underline hover:text-[#59624d] bg-[linear-gradient(#000,#000)] bg-no-repeat bg-[position:0_100%] bg-[length:0%_1.5px] transition-all duration-300 ease-in-out hover:bg-[length:100%_1.5px]"
                  >
                    {park.label}
                  </span>
                ) : (
                  <Link
                    key={park.label}
                    href={park.href}
                    onClick={onNavigate}
                    onMouseEnter={() => setPreview(park)}
                    className="w-fit font-sora font-normal text-[16px] tracking-[-0.32px] text-[#212121] no-underline hover:text-[#59624d] bg-[linear-gradient(#000,#000)] bg-no-repeat bg-[position:0_100%] bg-[length:0%_1.5px] transition-all duration-300 ease-in-out hover:bg-[length:100%_1.5px]"
                  >
                    {park.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
