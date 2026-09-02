"use client";

import { useEffect, useRef } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
  length?: number;
}

export default function OtpInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  length = 4,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const otp = (() => {
    const arr = value.split("").slice(0, length);
    while (arr.length < length) arr.push("");
    return arr;
  })();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const commit = (newOtp: string[]) => {
    onChange(newOtp.join(""));
    if (newOtp.every((d) => d !== "")) {
      setTimeout(() => onSubmit?.(newOtp.join("")), 100);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      const newOtp = [...otp];
      newOtp[index] = "";
      commit(newOtp);
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = val[0];
    commit(newOtp);
    if (index < length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    const newOtp = new Array(length).fill("");
    pasted.split("").forEach((d, i) => {
      newOtp[i] = d;
    });
    commit(newOtp);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex justify-start gap-2 sm:gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={disabled}
          className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-sora text-white bg-black/15 border-b border-white/30 outline-none focus:border-white transition-colors disabled:opacity-50"
        />
      ))}
    </div>
  );
}
