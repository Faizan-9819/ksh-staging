"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { WPPost } from "@/lib/wordpress";
import BlogCard from "./BlogCard";

const POSTS_PER_PAGE = 6;

interface PostWithImage extends WPPost {
  featuredImage: string;
}

export default function NewsListSection({
  initialPosts,
}: {
  initialPosts: PostWithImage[];
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(initialPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentItems = initialPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  return (
    <section className="w-full bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.7, 0, 0.4, 1] }}
          className="fix py-[40px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]"
          style={{
            paddingLeft: "var(--margin, clamp(16px, 5.7vw, 80px))",
            paddingRight: "var(--margin, clamp(16px, 5.7vw, 80px))",
          }}
        >
          {currentItems.length > 0 ? (
            currentItems.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                featuredImage={post.featuredImage}
              />
            ))
          ) : (
            <p className="w-full text-center font-sora text-[20px] text-[#868686] py-10">
              No news available.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && currentItems.length > 0 && (
        <div
          className="fix pb-[60px] flex justify-center gap-2"
          style={{
            paddingLeft: "var(--margin, clamp(16px, 5.7vw, 80px))",
            paddingRight: "var(--margin, clamp(16px, 5.7vw, 80px))",
          }}
        >
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-10 h-10 rounded-full font-inter text-[14px] transition-colors ${
                currentPage === idx + 1
                  ? "bg-[#59624d] text-white"
                  : "bg-[#f2efe9] text-[#212121] hover:bg-[#e9ecdf]"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
