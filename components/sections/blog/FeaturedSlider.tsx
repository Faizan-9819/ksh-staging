"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { WPPost } from "@/lib/wordpress";
import { postPath } from "@/lib/wordpress";
import Btn from "@/components/ui/Btn";
import NavArrow from "@/components/ui/NavArrow";

interface FeaturedSliderProps {
  posts: (WPPost & { featuredImage: string })[];
}

export default function FeaturedSlider({ posts }: FeaturedSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!posts.length) return null;

  const active = posts[activeIndex];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % posts.length);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);

  return (
    <section className="relative w-full bg-[#212121] overflow-hidden">
      <div className="fix flex flex-col lg:flex-row gap-[30px] lg:gap-[60px] py-[60px]">
        <div className="flex flex-col justify-between gap-[40px] lg:w-1/2">
          <div>
            <h2 className="font-sora font-semibold text-[24px] sm:text-[32px] text-white mb-6">
              Featured
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.7, 0, 0.4, 1] }}
              >
                <h3
                  className="font-sora font-semibold text-[24px] sm:text-[32px] leading-[1.2] text-white border-b-[6px] border-[#59624d] w-fit pb-2 mb-6"
                  dangerouslySetInnerHTML={{ __html: active.title.rendered }}
                />
                <Btn
                  label="Read Article"
                  href={postPath(active)}
                  bgColor="bg-transparent"
                  textColor="text-white"
                  arrowColor="stroke-white"
                  hoverBgColor="bg-[#59624d]"
                  hoverTextColor="text-white"
                  hoverArrowColor="stroke-white"
                  borderColor="border-white/30"
                  textSize="text-[14px]"
                  className="px-5 py-2 gap-3"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <NavArrow
              direction="prev"
              tone="light"
              onClick={handlePrev}
              ariaLabel="Previous featured post"
            />
            <span className="font-inter text-white/50 text-[14px]">
              {activeIndex + 1} / {posts.length}
            </span>
            <NavArrow
              direction="next"
              tone="light"
              onClick={handleNext}
              ariaLabel="Next featured post"
            />
          </div>
        </div>

        <div className="relative w-full lg:w-1/2 h-[280px] lg:h-[420px] rounded-[20px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                src={active.featuredImage}
                alt={active.title.rendered.replace(/<[^>]+>/g, "")}
                priority={activeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
