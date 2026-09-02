"use client";

export default function ParkIntro() {
  return (
    <section id="overview" className="relative w-full bg-white overflow-hidden">
      <div className="fix relative pt-[88px] pb-[60px] max-lg:pt-[60px] max-lg:pb-[40px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[100px] gap-y-10">
          <div className="relative flex flex-col">
            <div className="flex flex-col gap-[20px] max-w-[550px] relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-[#59624d] text-[12px] font-sora">//</span>
                <p className="font-sora text-[12px] tracking-[-0.24px] uppercase text-[#59624d]">
                  An Integrated Industrial Infrastructure Platform
                </p>
              </div>
              <h2 className="font-sora font-semibold text-[32px] lg:text-[40px] tracking-[-0.8px] text-[#212121] m-0">
                Lorem ipsum dolor sit amet,{" "}
                <span className="text-[#bdaea6]">
                  consectetur adipiscing elit
                </span>
              </h2>
            </div>

            {/* Decorative circle behind the photo, echoing the Figma brand element */}
            <div
              aria-hidden
              className="hidden lg:block absolute left-[60px] top-[190px] size-[340px] rounded-full border border-[rgba(33,33,33,0.06)]"
            />

            {/* Diagonal gable roof photo, anchored right under the heading */}
            <div className="relative mt-[40px] lg:mt-[55px] h-[260px] lg:h-[300px] w-full max-w-[550px] overflow-hidden">
              <img
                src="/park/warehouse-gable.png"
                alt="KSH Chakan Park IV warehouse"
                className="w-full h-full object-cover"
                style={{
                  clipPath: "polygon(0 100%, 0 35%, 32% 0, 100% 0, 100% 100%)",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 max-w-[650px] lg:justify-self-end">
            <p className="font-inter font-medium text-[18px] lg:text-[24px] leading-[1.4] text-[#212121] m-0">
              KSH Chakan Park IV in Shinde, Pune exemplifies high-quality
              sustainable Industrial &amp; Logistics infrastructure, setting new
              standards for environmental responsibility. The industrial park
              has earned IGBC pre-certified Platinum status, showcasing our deep
              commitment to green industrial development. Its thoughtful design
              and premium utilities create a workspace where your team can
              thrive.
            </p>
            <p className="font-inter text-[16px] lg:text-[20px] leading-[1.4] text-[#4a4a4a] m-0">
              This customizable, move-in ready facility ensures excellent
              productivity, efficiency, and safety for your workforce. We've
              considered every detail so you can focus on what matters
              most—running your business successfully.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
