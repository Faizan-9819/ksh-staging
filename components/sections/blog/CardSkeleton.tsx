export default function CardSkeleton() {
  return (
    <div className="flex flex-col w-full overflow-hidden rounded-[20px] border border-[#cdcdcd] bg-white">
      <div className="relative w-full aspect-[4/3] shrink-0 bg-[#f2efe9]">
        <div className="absolute top-4 right-4 w-16 h-6 rounded-full bg-white/70" />
      </div>
      <div className="flex flex-col gap-3 p-[24px] flex-1">
        <div className="h-5 w-[85%] rounded bg-[#f2efe9]" />
        <div className="h-5 w-[55%] rounded bg-[#f2efe9]" />
        <div className="h-4 w-24 rounded bg-[#f2efe9]" />
        <div className="h-9 w-32 rounded-full bg-[#f2efe9] mt-1" />
      </div>
    </div>
  );
}
