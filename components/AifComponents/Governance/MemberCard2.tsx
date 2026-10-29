import { PRESSABLE } from "@/lib/pressable";
import { FaLinkedinIn } from "react-icons/fa";

export default function MemberCard2({
  photo,
  name,
  role,
  onClick,
  linkedin,
}: {
  photo?: string;
  name: string;
  role: string;
  onClick?: () => void;
  linkedin?: string;
}) {
  return (
    <div
      {...(onClick ? PRESSABLE : {})}
      onClick={onClick}
      className={`group relative h-[340px] overflow-hidden rounded-[20px] bg-[#eceae4] shadow-[inset_0_0_0_1px_#e9e9e9] outline-none sm:h-[380px] lg:h-[420px] ${
        onClick ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="absolute inset-0 block h-full w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
          style={{ objectPosition: "top center" }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-6 text-center font-inter text-sm text-[#8f8f8f]">
          {name} &mdash; portrait
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(0,0,0,0) 34%,rgba(0,0,0,.78) 100%)",
        }}
      />
      {linkedin && (
        <a
          href={linkedin}
          aria-label={`${name} on LinkedIn`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0069B7] text-white"
        >
          <FaLinkedinIn size={20} className="fill-white" />
        </a>
      )}
      <div className="absolute inset-x-[26px] bottom-[26px]">
        <div className="font-sora text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-white">
          {name}
        </div>
        <div className="mt-1 font-inter text-[15px] leading-[1.4] text-white/78">
          {role}
        </div>
      </div>
    </div>
  );
}
