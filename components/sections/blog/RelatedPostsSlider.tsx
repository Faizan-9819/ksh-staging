"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import BlogCard from "./BlogCard";
import NavArrow from "@/components/ui/NavArrow";
import type { WPPost } from "@/lib/wordpress";

interface RelatedPost extends WPPost {
  featuredImage: string;
}

export default function RelatedPostsSlider({
  posts,
  heading,
}: {
  posts: RelatedPost[];
  heading: string;
}) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!posts.length) return null;

  return (
    <section className="fix py-[60px]">
      <div className="flex items-center justify-between gap-3 mb-[30px]">
        <h2 className="font-sora font-semibold text-[24px] sm:text-[32px] text-[#212121]">
          {heading}
        </h2>
        <div className="flex items-center gap-3">
          <NavArrow
            direction="prev"
            tone="dark"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <NavArrow
            direction="next"
            tone="dark"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>

      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        onSwiper={(s) => (swiperRef.current = s)}
        breakpoints={{
          768: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <BlogCard
              post={post}
              featuredImage={post.featuredImage}
              height="lg:h-[490px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
