export default function Hero() {
  return (
    // Governance uses hero-contact.png + a stronger top scrim
    <section className="relative h-[380px] overflow-hidden bg-[#8f8f8f] sm:h-[460px] lg:h-[600px]">
      <img
        src="/aif/governanceSpot.webp"
        alt=""
        className="absolute left-0 top-0 h-full w-full object-cover"
        style={{ objectPosition: "center 50%" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 top-[100px] lg:top-[180px]"
        style={{
          background:
            "linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.22) 45%,rgba(0,0,0,0.62) 78%,rgba(0,0,0,0.78) 100%)",
        }}
      />
      <img
        src="/aif/shared/brand-element.svg"
        alt=""
        className="pointer-events-none absolute -left-10 -top-16 w-[720px] max-w-none opacity-50 sm:left-10 sm:w-[960px] lg:left-[77px] lg:top-[-110px] lg:w-[1286px]"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[160px]"
        style={{
          background:
            "linear-gradient(180deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-[-5px] flex justify-end px-4 sm:bottom-[-30px] sm:px-10 lg:bottom-[-20px]">
        <h1
          className="whitespace-nowrap font-sora font-bold uppercase leading-none tracking-[-0.04em] text-transparent"
          style={{
            fontSize: "clamp(40px, 9vw, 158px)",
            backgroundImage:
              "linear-gradient(180deg, rgba(229,229,229,.6) 0%, rgba(255,255,255,0) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Governance
        </h1>
      </div>
    </section>
  );
}
