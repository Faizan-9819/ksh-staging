import type { Metadata } from "next";
import { Suspense } from "react";
import BlogHero from "@/components/sections/blog/BlogHero";
import FeaturedSlider from "@/components/sections/blog/FeaturedSlider";
import BlogTabs from "@/components/sections/blog/BlogTabs";
import BlogsPageSkeleton from "@/components/sections/blog/BlogsPageSkeleton";
import {
  fetchPostsPage,
  fetchPostsByCategories,
  resolveFeaturedImage,
  sortPinnedNews,
  isBlogPost,
  isNewsPost,
  NEWS_CATEGORY_IDS,
} from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "KSH INFRA Blogs | Insights on Industrial Infrastructure & Logistics",
  description:
    "Explore KSH INFRA's latest blogs and news covering sustainable industrial parks, logistics solutions, and trends shaping India's warehousing and manufacturing sectors.",
  alternates: { canonical: "https://www.kshinfra.com/blogs" },
};

async function BlogsContent() {
  // Fetched in parallel and server-side (like the dedicated /news page) so the
  // "News" tab renders instantly on click instead of firing a slow client-side
  // fetch — fetchAllPosts()'s bulk _embed query has been observed taking ~9s.
  const [posts, newsPosts] = await Promise.all([
    fetchPostsPage(1, 31),
    fetchPostsByCategories(NEWS_CATEGORY_IDS, 100),
  ]);

  const [postsWithImages, newsPostsWithImages] = await Promise.all([
    Promise.all(
      posts.map(async (post) => ({
        ...post,
        featuredImage: await resolveFeaturedImage(post),
      })),
    ),
    Promise.all(
      newsPosts.map(async (post) => ({
        ...post,
        featuredImage: await resolveFeaturedImage(post),
      })),
    ),
  ]);

  const blogOnlyPosts = postsWithImages.filter(
    (post) => isBlogPost(post.categories) && !isNewsPost(post.categories),
  );

  return (
    <>
      <FeaturedSlider posts={blogOnlyPosts.slice(0, 4)} />
      <BlogTabs initialPosts={postsWithImages} initialNewsPosts={sortPinnedNews(newsPostsWithImages)} />
    </>
  );
}

export default function BlogsPage() {
  return (
    <main className="w-full">
      <BlogHero />
      <Suspense fallback={<BlogsPageSkeleton />}>
        <BlogsContent />
      </Suspense>
    </main>
  );
}
