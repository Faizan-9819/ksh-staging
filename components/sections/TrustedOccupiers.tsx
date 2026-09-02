import TrustedOccupiersGrid from "./TrustedOccupiersGrid";

const ICON_ROWS = [
  [
    "/home/newtrust/Frame 48097782-1.svg",
    "/home/newtrust/Frame 48097782-2.svg",
    "/home/newtrust/Frame 48097782.svg",
    "/home/newtrust/Frame 48097783-1.svg",
    "/home/newtrust/Frame 48097783.svg",
  ],
  [
    "/home/newtrust/Frame 48097786-1.svg",
    "/home/newtrust/Frame 48097786.png",
    "/home/newtrust/Frame 48097787.svg",
    "/home/newtrust/Frame 48097788-1.svg",
    "/home/newtrust/Frame 48097803.svg",
  ],
  [
    "/home/newtrust/Frame 48097789.svg",
    "/home/newtrust/Frame 48097790-1.svg",
    // "/home/newtrust/Frame 48097790.svg",
    "/home/newtrust/Frame 48097795-1.svg",
    "/home/newtrust/Frame 48097795.svg",
    "/home/newtrust/Frame 48097808.svg",
  ],
  [
    "/home/newtrust/Frame 48097796-1.svg",
    "/home/newtrust/Frame 48097796.svg",
    "/home/newtrust/Frame 48097797-1.svg",
    "/home/newtrust/Frame 48097797.svg",
    "/home/newtrust/Frame 48097800.svg",
  ],
  [
    "/home/newtrust/Frame 48097798.svg",
    "/home/newtrust/reter.svg",
    "/home/newtrust/Frame 48097805.svg",
    "/home/newtrust/Frame 48097807.svg",
    // New Images
    "/home/newtrust/spec.svg",
    "/home/newtrust/Autoneum.svg",
    "/home/newtrust/ver.svg",
    "/home/newtrust/Frame 48097792.png",
    "/home/newtrust/piolax.svg",
    "/home/newtrust/Tata Autocomp.svg",
  ],
];

export default function TrustedOccupiers() {
  return (
    <section className="relative w-full pt-20 overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #FBF2E8 50%, #FFFFFF 100%)",
        }}
      />

      <div className="relative z-1">
        <div className="text-center fix">
          <h2 className="section-title fix rdh48 pb-10 lg:pb-16 tracking-[-0.01em]">
            Trusted by Leading Occupiers
          </h2>
        </div>

        <TrustedOccupiersGrid rows={ICON_ROWS} />
      </div>
    </section>
  );
}
