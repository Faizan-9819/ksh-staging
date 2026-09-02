"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ServicesModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center p-[24px] bg-[rgba(8,14,28,0.74)] backdrop-blur-[6px]"
        >
          <motion.div
            key="modal-box"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[min(960px,92vw)] rounded-[18px] overflow-hidden bg-[#0B1220] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-[14px] right-[14px] z-[3] w-[42px] h-[42px] rounded-full bg-[rgba(0,0,0,0.45)] border border-white/25 cursor-pointer flex items-center justify-center [transition:background_.2s_ease]"
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.7)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.45)")}
            >
              <X size={18} color="#fff" />
            </button>

            {/* Video placeholder */}
            <div className="relative w-full aspect-[16/9] bg-black">
              <img
                src="https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=900&q=80"
                alt="Facility"
                className="w-full h-full object-cover opacity-[0.55] block"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-[24px]">
                <span className="flex items-center justify-center w-[78px] h-[78px] rounded-[22px] bg-[linear-gradient(150deg,rgba(255,255,255,0.55),rgba(210,214,220,0.3))] border border-white/50 backdrop-blur-[4px]">
                  <Play size={28} color="#2A4FA8" fill="#2A4FA8" />
                </span>
                <p className="m-0 font-[family-name:var(--font-inter),sans-serif] font-medium text-[15px] text-white/[0.86]">
                  Add your video file to play it here
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
