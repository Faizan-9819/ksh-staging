export default function Intro() {
  return (
    <section className="bg-white">
      <div className="fix py-16 lg:pb-14 lg:pt-[88px]">
        <div className="mb-6 flex items-center gap-2 lg:mb-[30px]">
          <span className="font-sora text-xs text-[#59624D]">{"//"}</span>
          <span className="font-sora text-xs uppercase tracking-[-0.02em] text-[#59624D]">
            Governance
          </span>
        </div>
        <h1 className="mb-6 max-w-[22ch] font-sora text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#212121] sm:text-[40px] lg:mb-7 lg:text-[52px]">
          Oversight that is visible, structured and explainable.
        </h1>
        <p className="m-0 max-w-[78ch] font-inter text-lg font-medium leading-[1.4] text-[#212121] sm:text-xl lg:text-2xl">
          Investment governance should be understandable &mdash; not hidden
          in formal documentation alone. This section describes the roles,
          decision process, oversight principles and conflict controls that
          support the platform. Detailed authorities and thresholds remain
          within the Fund&rsquo;s formal documents.
        </p>
      </div>
    </section>
  );
}
