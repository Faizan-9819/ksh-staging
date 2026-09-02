import { fetchAllPosts, isBlogPost, isNewsPost, resolveFeaturedImage } from "@/lib/wordpress";
import RelatedPostsSlider from "./RelatedPostsSlider";

interface RelatedPostsProps {
  currentPostId: number;
  mode: "blogs" | "news";
}

export default async function RelatedPosts({ currentPostId, mode }: RelatedPostsProps) {
  const allPosts = await fetchAllPosts(20);
  if (!allPosts.length) return null;

  const filtered = allPosts.filter((post) => {
    if (post.id === currentPostId) return false;
    return mode === "news" ? isNewsPost(post.categories) : isBlogPost(post.categories) && !isNewsPost(post.categories);
  });

  const related = (filtered.length ? filtered : allPosts.filter((p) => p.id !== currentPostId)).slice(0, 8);
  if (!related.length) return null;

  const withImages = await Promise.all(
    related.map(async (post) => ({ ...post, featuredImage: await resolveFeaturedImage(post) })),
  );

  return (
    <RelatedPostsSlider posts={withImages} heading={mode === "news" ? "Other News" : "Other Blogs"} />
  );
}
