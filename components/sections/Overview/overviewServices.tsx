"use client";

import { PRESSABLE } from "@/lib/pressable";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Btn from "@/components/ui/Btn";
import ArrowUpRightIcon from "@/components/ui/ArrowUpRightIcon";

const SERVICES = [
  {
    id: 1,
    title: "Strategic Locations with Seamless Connectivity",
    description:
      "Positioned near major hubs for cost efficiency and growth, our parks offer excellent access to highways, smart docking, and streamlined Logistics that simplify transport and distribution.",
    src: "/Images/Image.jpg",
  },
  {
    id: 2,
    title: "Customizable and Ready-to-Move Facilities",
    description:
      "Choose from pre-built spaces ready for immediate occupancy or fully custom-built solutions tailored to your operational needs, ensuring flexibility for evolving business demands.",
    src: "/Images/Customizable.jpg",
  },
  {
    id: 3,
    title: "Advanced Safety and Emergency Preparedness",
    description:
      "Our parks are equipped with round-the-clock security, comprehensive CCTV surveillance, and routine monitoring protocols, ensuring a safe and secure environment at all times.",
    src: "/Images/Advanced.jpg",
  },
  {
    id: 4,
    title: "Sustainable and Smart Resource Management",
    description:
      "From solar power and Miyawaki-inspired green areas to smart energy systems and eco-friendly practices, our parks are designed to minimize costs and reduce environmental impact.",
    src: "/Images/Sustainable.jpg",
  },
  {
    id: 5,
    title: "Community Engagement and Modern Facility Management",
    description:
      "Dynamic wellness spaces, community-focused initiatives, and innovative management apps come together to create environments that enhance productivity and well-being.",
    src: "/Images/Community.jpg",
  },
];

export default function OverviewServices() {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const svc = SERVICES[active];

  // Clean, zero-scroll state update handler to eliminate overlapping shifts completely
  const handleServiceSelect = (index: number) => {
    setActive(index);
  };

  return (
    <>
      <section className="relative w-full bg-[#F8F8F6] overflow-hidden">
        {/* decorative arcs */}
        <div className="absolute pointer-events-none rounded-full border border-[#24314E]/10 -top-[180px] left-[8%] w-[620px] h-[620px]" />
        <div className="absolute pointer-events-none rounded-full border border-[#24314E]/10 -bottom-[260px] right-[4%] w-[680px] h-[680px]" />

        <div className="fix relative py-10 max-sm:py-6 px-4 sm:px-6 md:px-8 lg:px-0">
          {/* ── STEP 1 FOR MOBILE: STATIC HEADING TITLE BLOCK ON TOP ── */}
          <div className="w-full bg-white rounded-[14px] p-5 mb-5 shadow-[0_16px_40px_-32px_rgba(15,29,58,0.3)] lg:hidden">
            {/* <div className="flex items-center gap-[9px] mb-3">
              <span className="font-[family-name:var(--font-sora),sans-serif] text-[#59624D] font-semibold text-[13px]">
                //
              </span>
              <h5 className="text-[#59624D] font-normal text-[12px] uppercase tracking-[-0.24px] whitespace-nowrap">
                OUR SERVICES
              </h5>
            </div> */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="section-title m-0 font-semibold text-[18px] sm:text-[22px] leading-[1.14] tracking-[-0.012em] text-[#212121]">
                KSH INFRA builds solutions that meet and grow with your evolving
                industry needs. We create spaces that help you achieve your
                business goals more effectively.
              </h2>
            </div>
          </div>

          {/* ── MOBILE-ONLY SELF-CONTAINED ACCORDION (< lg) ── */}
          <div className="block lg:hidden bg-white rounded-[14px] p-5 shadow-[0_16px_40px_-32px_rgba(15,29,58,0.3)]">
            <div className="w-full flex flex-col">
              {SERVICES.map((s, i) => {
                const on = i === active;
                return (
                  <div
                    key={s.title}
                    className="flex flex-col"
                    style={{
                      borderBottom: `1px solid ${on ? "#243150" : "#E4E3DD"}`,
                    }}
                  >
                    {/* Header: Title + Arrow */}
                    <div
                      {...PRESSABLE}
                      onClick={() => handleServiceSelect(i)}
                      className="flex items-center justify-between gap-4 cursor-pointer py-4"
                    >
                      <span
                        className="font-[family-name:var(--font-sora),sans-serif] text-[15px] sm:text-[16px] font-medium [transition:color_.35s_ease]"
                        style={{
                          color: on ? "#212121" : "#636363",
                        }}
                      >
                        {s.title}
                      </span>
                      <span
                        className="shrink-0 flex items-center justify-center rounded-full [transition:background_.35s_ease,border-color_.35s_ease,color_.35s_ease,transform_.35s_ease] w-[36px] h-[36px]"
                        style={{
                          background: on ? "#59624D" : "#ffffff",
                          color: on ? "#ffffff" : "#59624D",
                          transform: on ? "rotate(90deg)" : "rotate(0deg)",
                        }}
                      >
                        <ArrowUpRightIcon size={16} />
                      </span>
                    </div>

                    {/* Body: Contains Large Image + Description + Learn More Btn */}
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5 pt-2 flex flex-col gap-4 items-start">
                            {/* Large Image */}
                            <div className="w-full relative rounded-[14px] overflow-hidden h-[220px] sm:h-[300px] shadow-sm">
                              <img
                                src={s.src}
                                alt={s.title}
                                className="w-full h-full object-cover block"
                              />
                            </div>

                            {/* Description */}
                            <p className="m-0 font-[family-name:var(--font-sora),sans-serif] text-[13px] sm:text-[14px] leading-[1.6] text-[#616161]">
                              {s.description}
                            </p>

                            {/* Button */}
                            <Btn
                              label="Learn More"
                              onClick={() => setModalOpen(true)}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── DESKTOP-ONLY PIXEL-PERFECT LAYOUT (lg and above) ── */}
          <div className="hidden lg:flex flex-row gap-[clamp(18px,2vw,28px)] items-stretch">
            {/* Left Image Panel */}
            <div className="relative overflow-hidden w-full lg:[flex:1_1_34%] min-w-[280px] rounded-[18px] min-h-[clamp(360px,38vw,548px)] shadow-md">
              {SERVICES.map((s, i) => (
                <img
                  key={s.title}
                  src={s.src}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover block [transition:opacity_.7s_ease,transform_1.2s_ease]"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "scale(1)" : "scale(1.04)",
                  }}
                />
              ))}

              {/* Dynamic Glass overlay description panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute rounded-[20px] bg-[rgba(255,255,255,0.10)] backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)] border border-[rgba(255,255,255,0.45)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]"
                  style={{
                    left: "clamp(12px,1.6vw,22px)",
                    right: "clamp(12px,1.6vw,22px)",
                    bottom: "clamp(12px,1.6vw,22px)",
                    padding: "clamp(16px,1.9vw,28px)",
                  }}
                >
                  <h3 className="m-0 mb-2 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[16px] text-[#fff]">
                    {svc.title}
                  </h3>
                  <p className="m-0 font-normal text-[14px] text-[#fff]">
                    {svc.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column Layout Desktop */}
            <div className="w-full lg:[flex:1_1_60%] min-w-[300px] flex flex-col gap-[clamp(16px,1.6vw,22px)]">
              {/* Top heading card */}
              <div className="bg-white rounded-[14px] p-5 shadow-[0_16px_40px_-32px_rgba(15,29,58,0.3)]">
                <div className="flex justify-between items-center">
                  <h2 className="section-title m-0 font-medium max-w-[90%] lg:text-[24px] leading-[1.4] tracking-[-0.012em] text-[#212121]">
                    KSH INFRA builds solutions that meet and grow with your
                    evolving industry needs. We create spaces that help you
                    achieve your business goals more effectively.
                  </h2>
                </div>
              </div>

              {/* Desktop Interactive Service List */}
              <div className="bg-white rounded-[14px] p-5 sm:p-6 lg:py-0 lg:px-[30px] lg:pb-[60px] shadow-[0_16px_40px_-32px_rgba(15,29,58,0.3)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between overflow-hidden">
                <div className="w-full flex flex-col">
                  {SERVICES.map((s, i) => {
                    const on = i === active;
                    return (
                      <div
                        key={s.title}
                        {...PRESSABLE}
                        onClick={() => handleServiceSelect(i)}
                        // Tabbing onto a row previews it, same as hovering.
                        onFocus={() => setActive(i)}
                        onMouseEnter={() => {
                          if (
                            typeof window !== "undefined" &&
                            window.innerWidth >= 1024
                          ) {
                            setActive(i);
                          }
                        }}
                        className="flex items-center justify-between gap-4 group cursor-pointer"
                        style={{
                          padding: "clamp(14px,1.5vw,15px) 0",
                          borderBottom: `1px solid ${on ? "#243150" : "#E4E3DD"}`,
                        }}
                      >
                        <span
                          className="font-[family-name:var(--font-sora),sans-serif] text-[16px] md:whitespace-nowrap [transition:color_.35s_ease]"
                          style={{
                            color: on ? "#212121" : "#636363",
                          }}
                        >
                          {s.title}
                        </span>
                        <span
                          className="shrink-0 flex items-center justify-center rounded-full [transition:background_.35s_ease,border-color_.35s_ease,color_.35s_ease] w-[36px] h-[36px] lg:w-[clamp(38px,3vw,44px)] lg:h-[clamp(38px,3vw,44px)]"
                          style={{
                            background: on ? "#59624D" : "#ffffff",
                            color: on ? "#ffffff" : "#59624D",
                          }}
                        >
                          <ArrowUpRightIcon size={16} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
