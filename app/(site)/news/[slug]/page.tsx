import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPostBySlug, isNewsPost, resolveMeta } from "@/lib/wordpress";
import PostContent from "@/components/sections/blog/PostContent";
import PostSkeleton from "@/components/sections/blog/PostSkeleton";

const SITE_URL = "https://www.kshinfra.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) {
    return {
      title: "News Not Found - KSH INFRA",
      description: "The requested news post could not be found.",
    };
  }

  const { title, description } = resolveMeta(post);
  const url = `${SITE_URL}/news/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title.rendered }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.featuredImage],
    },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return notFound();

  if (!isNewsPost(post.categories)) return notFound();

  return (
    <Suspense fallback={<PostSkeleton />}>
      <PostContent post={post} section="news" />
    </Suspense>
  );
}
