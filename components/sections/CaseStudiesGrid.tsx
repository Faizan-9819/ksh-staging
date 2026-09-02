import Link from "@/components/ui/Link";
import type { InsightPost } from "@/components/sections/Insights";

interface CaseStudiesGridProps {
  posts: InsightPost[];
}

export default function CaseStudiesGrid({ posts }: CaseStudiesGridProps) {
  return (
    <section className="relative w-full bg-[#fff] pt-34 pb-10 overflow-hidden">
      <div className="fix relative px-4 sm:px-0">
        {/* <div className="flex items-center gap-2.5 mb-2">
          <span className="text-[#8C8C84] font-semibold text-[13px]">
            {"//"}
          </span>
          <h5 className="text-[#8C8C84] font-medium text-[12px] tracking-[-2%]">
            CASE STUDIES
          </h5>
        </div> */}
        <h2 className="mb-6 sm:mb-8 leading-[110%] font-semibold text-[32px] sm:text-[48px]">
          Built Around Operational Needs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-16 sm:gap-y-8">
          {posts.map((post) => {
            const card = (
              <>
                <div className="relative h-[300px] rounded-xl overflow-hidden">
                  {/* Image */}
                  <img
                    src={post.img}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]"
                  />

                  {/* Subtle top-down overlay — just enough to keep the pill
                      legible over any photo, not a full dark scrim */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/0 to-transparent" />

                  {/* Company / date pill */}
                  <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/20">
                    <span className="text-xs font-medium text-white tracking-wider">
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* Title lives below the card, not inside the image overlay */}
                <h3 className="mt-3 text-[16px] sm:text-[18px] font-semibold text-[#1C2A48] leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-[#59624D]">
                  {post.title}
                </h3>
              </>
            );

            return post.href ? (
              <Link key={post.title} href={post.href} className="group block">
                {card}
              </Link>
            ) : (
              <div key={post.title} className="group">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
