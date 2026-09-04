"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { WPPost } from "@/lib/wordpress";
import { isBlogPost, isNewsPost } from "@/lib/wordpress";
import BlogCard from "./BlogCard";
import PressCard from "./PressCard";
import { PRESS_RELEASES } from "./press-releases";

type TabId = null | "blogs" | "news" | "press";

const TABS: { title: string; id: TabId }[] = [
  { title: "All", id: null },
  { title: "Blogs", id: "blogs" },
  { title: "News", id: "news" },
  { title: "Press Release", id: "press" },
];

const POSTS_PER_PAGE = 9;

interface PostWithImage extends WPPost {
  featuredImage: string;
}

const TAB_INDEX_BY_URL_PARAM: Record<string, number> = {
  news: 2,
  press: 3,
  blogs: 1,
};

// Inverse of TAB_INDEX_BY_URL_PARAM — index 0 ("All") has no param, an empty
// ?tab= would be pointless on that tab.
const URL_PARAM_BY_TAB_INDEX: Record<number, string | null> = {
  0: null,
  1: "blogs",
  2: "news",
  3: "press",
};

export default function BlogTabs({
  initialPosts,
  initialNewsPosts,
}: {
  initialPosts: PostWithImage[];
  /** Prefetched server-side (like the dedicated /news page) so the News tab
   * renders instantly instead of firing a slow client-side fetch on click. */
  initialNewsPosts: PostWithImage[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlTab = searchParams.get("tab") ?? "";
  const activeIndex = TAB_INDEX_BY_URL_PARAM[urlTab] ?? 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Adjust state during render (React's documented alternative to an effect,
  // tracked via state rather than a ref per this project's stricter
  // react-hooks/refs rule) when the URL's ?tab= param changes — resets the
  // page number left over from before the navigation.
  const [lastUrlTab, setLastUrlTab] = useState(urlTab);
  if (lastUrlTab !== urlTab) {
    setLastUrlTab(urlTab);
    if (currentPage !== 1) setCurrentPage(1);
  }

  const resolvedIndex = activeIndex;
  const activeTab = TABS[resolvedIndex].id;
  const isPress = activeTab === "press";
  const isNews = activeTab === "news";

  // Selecting a tab pushes its ?tab= param into the URL (shallow — no full
  // page reload, no scroll jump) instead of only updating local state, so
  // the active tab survives a refresh/share/back-button, e.g. /blogs?tab=news.
  const selectTab = (index: number) => {
    setMobileDropdownOpen(false);
    const param = URL_PARAM_BY_TAB_INDEX[index];
    router.push(param ? `/blogs?tab=${param}` : "/blogs", { scroll: false });
  };

  useEffect(() => {
    tabButtonRefs.current[resolvedIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [resolvedIndex]);

  const blogOnlyPosts = useMemo(
    () =>
      initialPosts.filter(
        (p) => isBlogPost(p.categories) && !isNewsPost(p.categories),
      ),
    [initialPosts],
  );

  const allPosts = useMemo(
    () =>
      initialPosts.filter(
        (p) => isBlogPost(p.categories) || isNewsPost(p.categories),
      ),
    [initialPosts],
  );

  const postItems: PostWithImage[] = isNews
    ? initialNewsPosts
    : activeTab === "blogs"
      ? blogOnlyPosts
      : allPosts;
  const itemCount = isPress ? PRESS_RELEASES.length : postItems.length;

  const totalPages = Math.ceil(itemCount / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPressItems = isPress
    ? PRESS_RELEASES.slice(startIndex, startIndex + POSTS_PER_PAGE)
    : [];
  const currentPostItems = isPress
    ? []
    : postItems.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const currentItemsLength = isPress
    ? currentPressItems.length
    : currentPostItems.length;

  return (
    <section className="w-full bg-white">
      <div className="fix pt-[50px]">
        <h2 className="font-sora font-semibold text-[24px] sm:text-[32px] text-[#212121] mb-[30px]">
          Explore
        </h2>

        {/* Desktop/tablet — horizontal tab row */}
        <div className="hidden sm:flex overflow-x-auto no-scrollbar items-center border-b border-[#cdcdcd] gap-2">
          {TABS.map((tab, i) => (
            <button
              key={tab.title}
              ref={(el) => {
                tabButtonRefs.current[i] = el;
              }}
              onClick={() => selectTab(i)}
              className={`flex-1 min-w-[160px] text-center font-sora text-[16px] lg:text-[18px] whitespace-nowrap pb-[14px] transition-colors border-b-2 -mb-px ${
                resolvedIndex === i
                  ? "text-[#212121] border-[#59624d]"
                  : "text-[#868686] border-transparent hover:text-[#212121]"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Mobile — custom dropdown instead of a horizontally scrolling tab row, matching TabNavSection.tsx's park-page pattern */}
        <div className="relative sm:hidden pb-[14px]">
          <button
            onClick={() => setMobileDropdownOpen((v) => !v)}
            className="w-full flex items-center justify-between bg-transparent border border-[#cdcdcd] rounded-full px-5 py-3 cursor-pointer font-sora font-normal text-[16px] text-[#212121]"
          >
            <span>{TABS[resolvedIndex].title}</span>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className={`shrink-0 transition-transform duration-200 ${
                mobileDropdownOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="#212121"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {mobileDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 z-30 overflow-hidden rounded-[20px] border border-[#cdcdcd] bg-white shadow-lg">
              {TABS.map((tab, i) => (
                <button
                  key={tab.title}
                  onClick={() => selectTab(i)}
                  className={`w-full flex items-center px-5 py-3 text-left bg-transparent border-none cursor-pointer font-sora font-normal text-[16px] transition-colors duration-200 ${
                    resolvedIndex === i
                      ? "text-[#212121] bg-[#f2efe9]"
                      : "text-[#868686] hover:bg-[#f2efe9]/50"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${resolvedIndex}-${currentPage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.7, 0, 0.4, 1] }}
          className="fix py-[40px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]"
        >
          {currentItemsLength > 0 ? (
            isPress ? (
              currentPressItems.map((item) => (
                <PressCard
                  key={item.id}
                  item={item}
                  height="2xl:h-[529px] 1440:h-[500px] lg:h-[450px]"
                />
              ))
            ) : (
              currentPostItems.map((item) => (
                <BlogCard
                  key={item.id}
                  post={item}
                  featuredImage={item.featuredImage}
                  height="2xl:h-[529px] 1440:h-[500px] lg:h-[450px]"
                />
              ))
            )
          ) : (
            <p className="w-full text-center font-sora text-[20px] text-[#868686] py-10">
              No content available.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && currentItemsLength > 0 && (
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
