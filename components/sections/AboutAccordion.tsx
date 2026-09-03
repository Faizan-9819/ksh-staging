"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Btn from "../ui/Btn";

const BG_COLORS = ["#F9F7F2", "#EEEAE0", "#DBD6CB", "#CBC4B5"];
///
const DEFS = [
  {
    title: "Developer",
    icon: "/homeasset/icon-developer.svg",
    content:
      "We develop institutional-grade Industrial & Logistics infrastructure designed to meet the evolving needs of occupiers across India’s key growth markets.",
    href: "/parks",
  },
  {
    title: "Investor",
    icon: "/homeasset/icon-investor.svg",
    content:
      "We identify and invest in opportunities that create long-term value through strategic asset development and disciplined execution.",
    href: "/investors",
  },
  {
    title: "Capital Manager",
    icon: "/homeasset/icon-capital.svg",
    content:
      "We structure and deploy capital to support scalable growth, optimize investment performance and unlock value across the asset lifecycle.",
    href: "/solutions#solution-capital-deployment",
  },
  {
    title: "Property Manager",
    icon: "/homeasset/icon-property.svg",
    content:
      "We oversee asset operations and tenant engagement to ensure efficient performance, long-term sustainability and operational excellence.",
    href: "/solutions#solution-property-management",
  },
];

const T = { duration: 0.4, ease: [0.4, 0, 0.2, 1] } as const;

export default function AboutAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="relative left-1/2 w-screen -ml-[50vw]">
      {DEFS.map((d, i) => {
        const isOpen = i === open;

        return (
          <motion.div
            key={d.title}
            animate={{ background: BG_COLORS[i] }}
            transition={T}
            className="w-full border-t border-t-[rgba(15,29,58,0.06)]"
          >
            <div
              className="relative fix cursor-pointer py-6 sm:py-8 lg:py-[clamp(30px,3vw,40px)] px-4 sm:px-6 lg:px-0"
              onClick={() => setOpen(i)}
            >
              {/* Circle chevron — adaptive layouts for mobile viewports */}
              <motion.span
                animate={{
                  top: isOpen ? "calc(24px + 4px)" : "calc(24px + 2px)",
                  backgroundColor: isOpen ? "#6A7F5D" : "transparent",
                  borderColor: isOpen ? "#6A7F5D" : "#AEAEA6",
                  borderWidth: isOpen ? "1px" : "1.5px",
                }}
                className="lg:hidden absolute left-0 flex items-center justify-center w-[40px] h-[40px] rounded-full shrink-0 border"
                transition={T}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={T}
                >
                  <ChevronDown size={16} color={isOpen ? "#fff" : "#7A7A72"} />
                </motion.div>
              </motion.span>

              {/* Desktop-only animated Chevron structure */}
              <motion.span
                animate={{
                  top: isOpen ? "60px" : "30px",
                  backgroundColor: isOpen ? "#6A7F5D" : "transparent",
                  borderColor: isOpen ? "#6A7F5D" : "#AEAEA6",
                  borderWidth: isOpen ? "1px" : "1.5px",
                }}
                transition={T}
                className="hidden lg:flex absolute left-0 items-center justify-center w-[clamp(40px,3.5vw,50px)] h-[clamp(40px,3.5vw,50px)] rounded-full shrink-0 border"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={T}
                >
                  <ChevronDown size={16} color={isOpen ? "#fff" : "#7A7A72"} />
                </motion.div>
              </motion.span>

              {/* Layout Content wrapper */}
              <div className="flex flex-col lg:flex-row lg:items-center w-full">
                {/* Title + content section */}
                <div className="w-full lg:[flex:0_0_60%] min-w-0 pl-10 sm:pl-16 lg:pl-[clamp(56px,6vw,86px)]">
                  <motion.h3
                    animate={{
                      fontSize: isOpen
                        ? "clamp(28px, 4.4vw, 64px)"
                        : "clamp(20px, 2.2vw, 32px)",
                    }}
                    transition={T}
                    className="m-0 ms-4 mt-2 lg:mt-0 lg:ms-0 font-medium text-[#212121] leading-[1.1] lg:leading-[1.05] tracking-[-0.02em] font-[family-name:var(--font-sora),sans-serif]"
                  >
                    {d.title}
                  </motion.h3>

                  {/* Desktop view rendering content standard block rules */}
                  <div className="hidden lg:block">
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body-desktop"
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            marginTop: 20,
                          }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={T}
                          className="overflow-hidden"
                        >
                          <p className="m-0 text-[18px] leading-[1.4] text-[#4A4A4A] max-w-[560px]">
                            {d.content}
                          </p>
                          <div className="mt-6">
                            <Btn
                              label="Learn More"
                              href={d.href}
                              textColor="text-[#59624D]"
                              borderColor="border-[#59624D]"
                              bgColor="bg-transparent"
                              arrowColor="stroke-[#59624D]"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Mobile Specific Dropdown content layout (stacks: Icon then text info block) */}
                <div className="block lg:hidden w-full pl-5.5 mt-3.5">
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body-mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={T}
                        className="overflow-hidden flex flex-col gap-4 pt-2"
                      >
                        {/* Mobile Icon Rendered First */}
                        <div className="w-[80px] h-[80px] bg-black/5 rounded-xl p-2 flex items-center justify-center">
                          <Image
                            src={d.icon}
                            alt={d.title}
                            width={64}
                            height={64}
                            className="w-full h-auto object-contain opacity-80"
                            priority
                          />
                        </div>

                        {/* Mobile Content text block rendered below description icons */}
                        <div>
                          <p className="m-0 text-[14px] sm:text-[16px] leading-[1.45] text-[#4A4A4A]">
                            {d.content}
                          </p>
                          <div className="mt-4 min-h-[44px]">
                            <Btn
                              label="Learn More"
                              href={d.href}
                              textColor="text-[#59624D]"
                              borderColor="border-[#59624D]"
                              bgColor="bg-transparent"
                              arrowColor="stroke-[#59624D]"
                              className="py-2.5 px-5 text-sm"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Desktop Spacer Layout */}
                <div className="hidden lg:block lg:[flex:0_0_20%]" />

                {/* Desktop Icon Layout Visual Block */}
                <div className="hidden lg:flex lg:[flex:0_0_20%] items-center justify-center">
                  <motion.div
                    animate={{
                      width: isOpen ? "min(100%, 268px)" : 0,
                      opacity: isOpen ? 0.42 : 0,
                    }}
                    transition={T}
                    className="overflow-hidden"
                  >
                    <Image
                      src={d.icon}
                      alt={d.title}
                      width={168}
                      height={168}
                      className="w-full h-auto"
                      priority
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
