import Link from "@/components/ui/Link";

export default function NewsHero() {
  return (
    <section className="relative w-full bg-[#212121] pt-[140px] pb-[60px] overflow-hidden">
      <div
        className="fix"
        style={{
          paddingLeft: "var(--margin, clamp(16px, 5.7vw, 80px))",
          paddingRight: "var(--margin, clamp(16px, 5.7vw, 80px))",
        }}
      >
        <p className="font-inter text-[13px] sm:text-base text-white/40 mb-4">
          <Link href="/" className="hover:text-white transition-colors duration-300">
            Home
          </Link>{" "}
          &gt; News
        </p>
        <h1 className="font-sora font-semibold text-[32px] sm:text-[44px] lg:text-[60px] leading-[1.05] text-white border-b-[8px] border-[#59624d] w-fit pb-2">
          News
        </h1>
      </div>
    </section>
  );
}
