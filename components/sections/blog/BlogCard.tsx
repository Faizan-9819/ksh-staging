import Image from "next/image";
import Link from "@/components/ui/Link";
import type { WPPost } from "@/lib/wordpress";
import { formatPostDate, isNewsPost, postPath } from "@/lib/wordpress";
import Btn from "@/components/ui/Btn";

interface BlogCardProps {
  post: WPPost;
  featuredImage: string;
  height: string;
}

export default function BlogCard({
  post,
  featuredImage,
  height,
}: BlogCardProps) {
  const categoryLabel = isNewsPost(post.categories) ? "News" : "Blogs";
  const href = postPath(post);
  const titleText = post.title?.rendered || "";

  return (
    <div
      className={`flex flex-col w-full overflow-hidden rounded-[20px] border border-[#cdcdcd] bg-white ${height}`}
    >
      <Link
        href={href}
        className="relative w-full aspect-[4/3] shrink-0 overflow-hidden group"
      >
        <Image
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          src={featuredImage}
          alt={titleText.replace(/<[^>]+>/g, "") || "Blog thumbnail"}
          priority
        />
        <span className="absolute top-4 right-4 w-fit font-sora text-[13px] uppercase tracking-[-0.26px] text-[#59624d] bg-[#e9ecdf] rounded-full px-3 py-1">
          {categoryLabel}
        </span>
      </Link>

      <div className="flex flex-col gap-3 p-[24px] flex-1">
        <Link href={href}>
          <h3
            className="font-sora font-semibold text-[18px] leading-[1.3] text-[#212121] hover:text-[#59624d] transition-colors line-clamp-2"
            dangerouslySetInnerHTML={{ __html: titleText }}
          />
        </Link>

        {post.date && (
          <p className="font-inter text-[14px] text-[#868686]">
            {formatPostDate(post.date)}
          </p>
        )}

        <Btn
          label="Learn More"
          href={href}
          bgColor="bg-transparent"
          textColor="text-[#212121]"
          arrowColor="stroke-[#212121]"
          hoverBgColor="bg-[#59624d]"
          hoverTextColor="text-white"
          hoverArrowColor="stroke-white"
          borderColor="border-[#cdcdcd]"
          textSize="text-[14px]"
          className="self-start px-5 py-2 gap-3 mt-1"
        />
      </div>
    </div>
  );
}
