export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="font-sora text-xs text-[#59624D]">{"//"}</span>
      <span className="font-sora text-xs uppercase tracking-[-0.02em] text-[#59624D]">
        {children}
      </span>
    </div>
  );
}
