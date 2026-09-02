"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { stopLenis, startLenis } from "@/components/ui/LenisProvider";

const RESPONSIBILITY_POINTS = [
  "Using material produced with the least amount of energy expenditure",
  "Sustainable usage of water resources, extending beyond the lifecycle of a park",
  "Efficient and eco-conscious construction processes, reducing the need for carbon-intensive methods",
  "Effective waste management and recycling protocols",
  "Creating future-proof, adaptable, customisable, and durable designs",
];

interface EnvironmentalThoughtsPopupProps {
  onClose: () => void;
}

export default function EnvironmentalThoughtsPopup({
  onClose,
}: EnvironmentalThoughtsPopupProps) {
  // Lock scroll via Lenis (not body.style.overflow) — matches every other
  // popup on the site; toggling native overflow instead fights Lenis and
  // causes the scroll-stopping/jerk bug.
  useEffect(() => {
    stopLenis();
    return () => startLenis();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="env-popup-scroll relative w-full max-w-[860px] max-h-[85vh] overflow-y-auto rounded-[20px] bg-white p-6 pr-12 sm:p-8 sm:pr-14 md:p-10 md:pr-16"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 sm:top-6 sm:right-6 flex items-center justify-center cursor-pointer"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="#6C775E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex flex-col gap-4 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] text-[#212121]">
          <p className="m-0">
            At KSH INFRA, our growth and development strategy is firmly rooted
            in genuine environmental cause. KSH INFRA Parks are a testament to
            this commitment—designed to deliver measurable operational savings
            while significantly reducing environmental impact.
          </p>
          <p className="m-0">
            Going beyond compliance with green building standards, we have
            integrated sustainable practices across the park, including the
            plantation of over 1,000 trees, creating a naturally vibrant and
            rejuvenating work environment for all stakeholders.
          </p>
          <p className="m-0 mt-2">
            Here are just a few ways KSH INFRA leads the way in environmental
            responsibility:
          </p>
          <ul className="m-0 list-disc pl-5 flex flex-col gap-2">
            {RESPONSIBILITY_POINTS.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      <style jsx global>{`
        .env-popup-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(108, 119, 94, 0.4) transparent;
        }
        .env-popup-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .env-popup-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .env-popup-scroll::-webkit-scrollbar-thumb {
          background: rgba(108, 119, 94, 0.4);
          border-radius: 9999px;
        }
        .env-popup-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(108, 119, 94, 0.6);
        }
      `}</style>
    </motion.div>
  );
}
