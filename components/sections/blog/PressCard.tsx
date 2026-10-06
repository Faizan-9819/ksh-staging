"use client";

import Image from "next/image";
import Btn from "@/components/ui/Btn";
import type { PressRelease } from "./press-releases";

interface PressCardProps {
  item: PressRelease;
}

// Content-driven height — see BlogCard for why a fixed height clips the button.
export default function PressCard({ item }: PressCardProps) {
  const formattedDate = new Date(item.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className={`flex flex-col w-full overflow-hidden rounded-[20px] border border-[#cdcdcd] bg-white h-full`}
    >
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full aspect-[4/3] shrink-0 overflow-hidden group"
      >
        <Image
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          src={item.image}
          alt={`Press coverage: ${item.title}`}
          priority
        />
        <span className="absolute top-4 right-4 w-fit font-sora text-[13px] uppercase tracking-[-0.26px] text-[#59624d] bg-[#e9ecdf] rounded-full px-3 py-1">
          Press
        </span>
      </a>

      <div className="flex flex-col gap-3 p-[24px] flex-1">
        <a href={item.href} target="_blank" rel="noopener noreferrer">
          <h3 className="font-sora font-semibold text-[18px] leading-[1.3] text-[#212121] hover:text-[#59624d] transition-colors line-clamp-2">
            {item.title}
          </h3>
        </a>

        <p className="font-inter text-[14px] text-[#868686]">{formattedDate}</p>

        <Btn
          label="Read Article"
          onClick={() =>
            window.open(item.href, "_blank", "noopener,noreferrer")
          }
          bgColor="bg-transparent"
          textColor="text-[#212121]"
          arrowColor="stroke-[#212121]"
          hoverBgColor="bg-[#59624d]"
          hoverTextColor="text-white"
          hoverArrowColor="stroke-white"
          borderColor="border-[#cdcdcd]"
          textSize="text-[14px]"
          className="self-start px-5 py-2 gap-3 mt-auto"
        />
      </div>
    </div>
  );
}
