"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useVideoModal } from "./VideoModalContext";

export default function VideoModal() {
  const { open, closeModal } = useVideoModal();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeModal}
          className="fixed inset-0 z-[9999999999999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          style={{ isolation: "isolate" }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ ease: [0.22, 0.61, 0.36, 1], duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 cursor-pointer p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors duration-200 group"
            >
              <IoMdClose
                size={24}
                className="group-hover:scale-110 transition-transform duration-200"
              />
            </button>

            <video
              src="/home/case/BarnesB4.mp4"
              autoPlay
              controls
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
