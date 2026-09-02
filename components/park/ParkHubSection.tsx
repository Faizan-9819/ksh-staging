"use client";

import { useState } from "react";
import ParkMapModal from "./ParkMapModal";

export default function ParkHubSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="location-connectivity"
      className="relative w-full bg-white overflow-hidden"
    >
      <div className="fix relative py-[88px] max-lg:py-[60px]">
        <div className="flex flex-col gap-[16px] max-w-[1028px] mb-10">
          <div className="flex items-center gap-2">
            <span className="text-[#59624d] text-[12px] font-sora">//</span>
            <p className="font-sora text-[12px] tracking-[-0.24px] uppercase text-[#59624d]">
              An Integrated Industrial Infrastructure Platform
            </p>
          </div>
          <h2 className="font-sora font-semibold text-[32px] lg:text-[48px] tracking-[-0.96px] text-[#212121] m-0">
            Chakan: A Thriving Industrial Hub in Pune
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[100px] gap-y-10 items-center">
          {/* Map preview — click to open modal */}
          <button
            onClick={() => setModalOpen(true)}
            className="relative w-full max-w-[650px] cursor-pointer bg-transparent border-none p-0 text-left group"
            aria-label="Open Chakan hub map"
          >
            <div className="relative h-[420px] lg:h-[460px] transition-transform duration-300 group-hover:scale-[1.02]">
              <img
                src="/park/map-mh-detailed.png"
                alt="Maharashtra map showing KSH INFRA Parks in Chakan"
                className="absolute left-0 top-[110px] w-[75%] max-w-[420px]"
              />

              {/* Leader line + pill: KSH INFRA Parks (lowest of the three labels) */}
              <div className="absolute left-0 top-[26px] flex flex-col items-start z-10">
                <span className="px-[18px] py-[9px] rounded-[40px] bg-[#59624d] text-white text-[13px] lg:text-[15px] font-sora whitespace-nowrap">
                  KSH INFRA Parks
                </span>
                <span className="w-px h-[110px] bg-[#9e9e9e]/60 ml-[16px] mt-1" />
              </div>

              {/* Leader line + pill: Notable Industries (highest) */}
              <div className="absolute left-[38%] top-0 flex flex-col items-start z-10">
                <span className="px-[18px] py-[9px] rounded-[40px] border border-[#9e9e9e] text-[#9e9e9e] text-[13px] lg:text-[15px] font-sora whitespace-nowrap">
                  Notable Industries
                </span>
                <span className="w-px h-[145px] bg-[#9e9e9e]/60 ml-[45px] mt-1" />
              </div>

              {/* Leader line + pill: Connectivity (middle height) */}
              <div className="absolute left-[70%] top-[13px] flex flex-col items-start z-10">
                <span className="px-[18px] py-[9px] rounded-[40px] border border-[#9e9e9e] text-[#9e9e9e] text-[13px] lg:text-[15px] font-sora whitespace-nowrap">
                  Connectivity
                </span>
                <span className="w-px h-[145px] bg-[#9e9e9e]/60 ml-[30px] mt-1" />
              </div>

              {/* View Overview pill, bottom-right of map */}
              <span className="absolute bottom-[10px] right-[6%] inline-flex items-center justify-center px-[20px] py-[10px] rounded-[40px] border border-[#59624d] text-[#59624d] text-[15px] lg:text-[18px] font-sora whitespace-nowrap">
                View Overview
              </span>
            </div>
          </button>

          <div className="flex flex-col gap-[10px] max-w-[650px]">
            <p className="font-inter font-medium text-[18px] lg:text-[24px] leading-[1.4] text-[#212121] m-0">
              Chakan, located near Pune, is one of India's fastest-growing
              integrated industrial zones, strategically developed by MIDC as a
              key manufacturing and logistics corridor. Home to global
              automotive giants like Volkswagen, Mahindra &amp; Mahindra,
              Bridgestone, Bajaj Auto, and Mercedes Benz, it offers ready
              infrastructure, robust connectivity, and a growing talent pool.
            </p>
            <p className="font-inter text-[16px] lg:text-[24px] leading-[1.4] text-[#bdaea6] m-0">
              With metro connectivity and rapid social infrastructure underway,
              Chakan is set to become a benchmark for modern industrial
              development. KSH INFRA's parks in Chakan further reinforce its
              position as a central hub driving India's industrial growth.
            </p>
          </div>
        </div>
      </div>

      <ParkMapModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
