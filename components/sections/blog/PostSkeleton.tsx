export default function PostSkeleton() {
  return (
    <div>
      <div className="bg-white animate-pulse">
        <div className="fix pt-[140px] pb-[40px] lg:pb-[60px]">
          <div className="bg-[#f2efe9] h-4 w-32 mb-6 rounded" />
          <div className="bg-[#f2efe9] h-10 w-3/4 mb-8 rounded" />
          <div className="bg-[#f2efe9] aspect-[12.13/7.13] w-full rounded-[20px]" />
        </div>
      </div>
      <div
        className="fix py-16"
        style={{
          paddingLeft: "var(--margin, clamp(16px, 5.7vw, 80px))",
          paddingRight: "var(--margin, clamp(16px, 5.7vw, 80px))",
        }}
      >
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#f2efe9] h-4 rounded"
              style={{ width: `${90 - i * 5}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
