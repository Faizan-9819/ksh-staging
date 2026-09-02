import CardSkeleton from "./CardSkeleton";

export default function NewsListSkeleton() {
  return (
    <section className="w-full bg-white">
      <div
        className="fix py-[40px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] animate-pulse"
        style={{
          paddingLeft: "var(--margin, clamp(16px, 5.7vw, 80px))",
          paddingRight: "var(--margin, clamp(16px, 5.7vw, 80px))",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
