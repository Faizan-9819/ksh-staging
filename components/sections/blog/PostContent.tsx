import Image from "next/image";
import Link from "@/components/ui/Link";
import { Suspense } from "react";
import type { WPPostWithImage } from "@/lib/wordpress";
import { cleanPostHtml, formatPostDate, isNewsPost } from "@/lib/wordpress";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import ShareIcons from "./ShareIcons";
import RelatedPosts from "./RelatedPosts";

const SITE_URL = "https://www.kshinfra.com";

interface PostContentProps {
  post: WPPostWithImage;
  section: "blogs" | "news";
}

export default function PostContent({ post, section }: PostContentProps) {
  const isNews = isNewsPost(post.categories);
  const categoryLabel = isNews ? "News" : "Blogs";
  const url = `${SITE_URL}/${section}/${post.slug}`;
  const titleText = post.title.rendered;
  // There's no standalone /news listing page (only the dynamic /news/[slug]
  // detail route) — News lives inside /blogs behind the "News" tab, same
  // path MediaDropdown.tsx's own News link already uses. `/${section}` alone
  // is only ever correct for "blogs".
  const categoryHref = section === "news" ? "/blogs?tab=news" : `/${section}`;

  const schema = articleSchema({
    type: isNews ? "NewsArticle" : "BlogPosting",
    headline: titleText.replace(/<[^>]+>/g, ""),
    image: post.featuredImage,
    datePublished: post.date,
    dateModified: post.modified,
    url,
  });

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: categoryLabel, url: `${SITE_URL}/${section}` },
    { name: titleText.replace(/<[^>]+>/g, ""), url },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="bg-white">
        <div className="fix pt-[140px] pb-[40px] lg:pb-[60px]">
          <div className="mb-6">
            <p className="font-inter text-[14px] text-[#868686] mb-4">
              <Link
                href="/"
                className="hover:text-[#212121] transition-colors duration-300"
              >
                Home
              </Link>{" "}
              &gt;{" "}
              <Link
                href={categoryHref}
                className="hover:text-[#212121] transition-colors duration-300"
              >
                {categoryLabel}
              </Link>
            </p>

            <span className="w-fit inline-block font-sora text-[13px] uppercase tracking-[-0.26px] text-[#59624d] bg-[#e9ecdf] rounded-full px-3 py-1 mb-4">
              {categoryLabel}
            </span>

            <h1
              className="font-sora font-semibold text-[24px] lg:text-[48px] leading-[1.2] text-[#212121]"
              dangerouslySetInnerHTML={{ __html: titleText }}
            />
          </div>

          <div className="flex items-center gap-2 font-inter text-[15px] text-[#868686] mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M8 2V6M16 2V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {formatPostDate(post.date)}
          </div>

          <div className="relative w-full aspect-[12.13/7.13] rounded-[20px] overflow-hidden">
            <Image
              fill
              sizes="100vw"
              className="object-cover"
              src={post.featuredImage}
              alt={titleText.replace(/<[^>]+>/g, "")}
              priority
            />
          </div>
        </div>
      </div>

      <div className="fix">
        <div className="flex md:flex-row flex-col-reverse gap-9 lg:gap-16 py-10 lg:py-16">
          <div className="h-fit md:sticky md:top-24">
            <ShareIcons url={url} title={titleText.replace(/<[^>]+>/g, "")} />
          </div>

          <div
            className="blog-content flex-1 font-inter text-[16px] leading-[1.75] text-[#434343] space-y-4 [&_img]:rounded-[16px] [&_a]:text-[#59624d] [&_a]:underline"
            dangerouslySetInnerHTML={{
              __html: cleanPostHtml(post.content.rendered),
            }}
          />
        </div>
      </div>

      <Suspense
        fallback={
          <p className="text-center font-sora text-[20px] text-[#868686] py-10">
            Loading related posts...
          </p>
        }
      >
        <RelatedPosts currentPostId={post.id} mode={section} />
      </Suspense>
    </div>
  );
}
