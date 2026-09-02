import type { SolutionStep } from "./data";

interface CaseSolutionProps {
  intro: string[];
  steps: SolutionStep[];
}

// Static lookup (not a template string) so Tailwind's content scanner can see
// and generate every one of these classes — an interpolated class name like
// `sm:grid-cols-${n}` would never be picked up at build time.
const COLUMNS_CLASS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

function DashConnector({
  dotTop = false,
  dotBottom = false,
}: {
  dotTop?: boolean;
  dotBottom?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      {dotTop && <span className="h-2 w-2 rounded-full bg-[#1A1A1A]" />}
      <span className="h-8 w-px border-l border-dashed border-[#1A1A1A]/50" />
      {dotBottom && <span className="h-2 w-2 rounded-full bg-[#1A1A1A]" />}
    </div>
  );
}

function ColumnGroup({ columns }: { columns: string[][] }) {
  const colsClass = COLUMNS_CLASS[columns.length] ?? "sm:grid-cols-3";
  return (
    <div className={`mt-3 grid grid-cols-1 ${colsClass} gap-x-8 gap-y-1`}>
      {columns.map((col, i) => (
        <ul
          key={i}
          className="list-disc pl-4 text-sm sm:text-base text-[#1A1A1A] leading-[1.5]"
        >
          {col.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}

function SolutionCard({ step }: { step: SolutionStep }) {
  return (
    <div className="w-full rounded-[20px] bg-black/10 px-6 py-5 sm:px-8 sm:py-6">
      {step.label && (
        <p className="text-sm sm:text-base font-semibold text-[#1A1A1A] leading-[1.5]">
          {step.label}
        </p>
      )}

      {step.text && (
        <p className="text-sm sm:text-base text-[#1A1A1A] leading-[1.5]">
          {step.text}
        </p>
      )}

      {step.columns && <ColumnGroup columns={step.columns} />}

      {step.bullets && (
        <ul className="mt-3 list-disc pl-4 space-y-1 text-sm sm:text-base text-[#1A1A1A] leading-[1.5]">
          {step.bullets.map((bullet, i) =>
            typeof bullet === "string" ? (
              <li key={i}>{bullet}</li>
            ) : (
              <li key={i}>
                {bullet.label}
                <ColumnGroup columns={bullet.columns} />
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}

export default function CaseSolution({ intro, steps }: CaseSolutionProps) {
  return (
    <section
      className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24"
      style={{
        background:
          "linear-gradient(0deg, #FAF3E6 0%, #FAF3E6 100%), radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%)",
      }}
    >
      <div className="fix relative z-10">
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6 max-w-[1000px] mx-auto">
          <h2 className="text-2xl sm:text-[32px] md:text-[48px] font-semibold text-[#1A1A1A] leading-[1.2]">
            SOLUTION
          </h2>
          {intro.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[15px] sm:text-[24px] text-[#212121] leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="max-w-[975px] mx-auto mt-2">
          <DashConnector dotTop />

          {steps.map((step, i) => (
            <div key={i}>
              <SolutionCard step={step} />
              {i < steps.length - 1 && <DashConnector />}
            </div>
          ))}

          <DashConnector dotBottom />
        </div>
      </div>
    </section>
  );
}
