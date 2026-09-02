import CardSkeleton from "./CardSkeleton";

export default function BlogsPageSkeleton() {
  return (
    <>
      <section className="relative w-full bg-[#212121] overflow-hidden">
        <div className="fix flex flex-col lg:flex-row gap-[30px] lg:gap-[60px] py-[60px] animate-pulse">
          <div className="flex flex-col justify-between gap-[40px] lg:w-1/2">
            <div>
              <div className="h-8 w-32 rounded bg-white/10 mb-6" />
              <div className="h-9 w-[90%] rounded bg-white/10 mb-3" />
              <div className="h-9 w-[70%] rounded bg-white/10 mb-6" />
              <div className="h-9 w-36 rounded-full bg-white/10" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10" />
              <div className="h-4 w-10 rounded bg-white/10" />
              <div className="w-10 h-10 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-[280px] lg:h-[420px] rounded-[20px] bg-white/10" />
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="fix pt-[50px] animate-pulse" style={{}}>
          <div className="h-8 w-28 rounded bg-[#f2efe9] mb-[30px]" />
          <div className="flex items-center border-b border-[#cdcdcd] gap-2 pb-[14px]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-5 flex-1 min-w-[160px] rounded bg-[#f2efe9]"
              />
            ))}
          </div>
        </div>

        <div
          className="fix py-[40px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] animate-pulse"
          style={{}}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </section>
    </>
  );
}
