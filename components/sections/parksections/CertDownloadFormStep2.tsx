"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OtpInput from "./OtpInput";
import type { CertDownloadDetails } from "./CertDownloadFormStep1";

const COOLDOWN_SECONDS = 60;

const FORM_BACKGROUND =
  "radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%)";

function maskEmail(email = "") {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(1, local.length - 2))}@${domain}`;
}

interface CertDownloadFormStep2Props {
  userDetails: (CertDownloadDetails & { source?: string }) | null;
  onClose: () => void;
  onBack: () => void;
  onTokenUpdate: (token: string) => void;
}

export default function CertDownloadFormStep2({
  userDetails,
  onClose,
  onTokenUpdate,
}: CertDownloadFormStep2Props) {
  const { name, email, phone, organization, source } = userDetails ?? {};
  const [otpToken, setOtpToken] = useState(userDetails?.otpToken || "");

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const [step, setStep] = useState<"otp" | "success">("otp");
  const [cooldown, setCooldown] = useState(COOLDOWN_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    startCooldown();
    return () => clearInterval(timerRef.current);
  }, []);

  function startCooldown() {
    setCooldown(COOLDOWN_SECONDS);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    setResendMsg("");
    setOtpError("");

    try {
      const res = await fetch("/api/cert-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organization, website: "" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setResendMsg(data.error || "Failed to resend. Please try again.");
      } else {
        setOtpToken((prev) => {
          const merged = prev ? `${prev},${data.token}` : data.token;
          onTokenUpdate?.(merged);
          return merged;
        });
        setOtp("");
        setResendMsg("New code sent!");
        startCooldown();
        setTimeout(() => setResendMsg(""), 3000);
      }
    } catch {
      setResendMsg("Failed to resend. Please check your connection.");
    } finally {
      setIsResending(false);
    }
  };

  const verifyOtp = async (enteredOtp: string) => {
    setIsVerifying(true);
    setOtpError("");

    try {
      const res = await fetch("/api/cert-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp: enteredOtp,
          token: otpToken,
          name,
          email,
          phone,
          organization,
          source,
          website: "",
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setOtpError(data.error || "OTP verification failed.");
        return;
      }

      setStep("success");
    } catch {
      setOtpError("Failed to verify OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpSubmit = async (enteredOtp: string) => {
    if (!enteredOtp || enteredOtp.length !== 4) {
      setOtpError("Please enter the 4-digit code");
      return;
    }
    await verifyOtp(enteredOtp);
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp || otp.length !== 4) {
      setOtpError("Please enter the 4-digit code");
      return;
    }
    await verifyOtp(otp);
  };

  if (step === "success") {
    return (
      <div style={{ background: FORM_BACKGROUND }} className="w-full max-w-[560px] p-6 flex flex-col gap-4">
        <div className="flex justify-end">
          <button type="button" onClick={onClose} aria-label="Close" className="cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center text-center gap-5 pb-4">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
            <path
              d="M8 12.5l2.5 2.5L16 9.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h2 className="text-white text-[24px] sm:text-[28px] font-bold leading-[1.15]">
            Thank You!
          </h2>

          <p className="text-white/70 text-[14px] leading-[1.7] max-w-[320px]">
            Your certification documents are on their way to{" "}
            <span className="text-white font-semibold">{email}</span>. Please check your inbox.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="border border-white/30 h-11 flex cursor-pointer items-center text-[14px] text-white px-5 rounded-full hover:border-white/60 transition-all duration-300 mt-1"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: FORM_BACKGROUND }} className="w-full max-w-[560px] p-6 md:p-10 flex flex-col gap-5">
      <header className="flex justify-between items-start">
        <h2 className="text-white text-[22px] sm:text-[28px] font-bold leading-[1.1]">
          Verify OTP
        </h2>
        <button type="button" onClick={onClose} aria-label="Close" className="ml-4 mt-1 shrink-0 cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <p className="text-white/60 text-[14px]">
        Code sent to <span className="text-white font-semibold">{maskEmail(email)}</span>
      </p>

      <form onSubmit={handleVerify} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <OtpInput
            value={otp}
            onChange={(val) => {
              setOtp(val);
              if (otpError) setOtpError("");
            }}
            onSubmit={handleOtpSubmit}
            disabled={isVerifying}
            length={4}
          />
          <AnimatePresence mode="wait">
            {otpError && (
              <motion.span
                key="err"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-red-200"
              >
                {otpError}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] text-white/50">Didn&apos;t get it?</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || isResending}
            className="text-[13px] text-white underline disabled:text-white/30 disabled:cursor-not-allowed transition-colors"
          >
            {isResending ? "Resending…" : "Resend OTP"}
          </button>
          {cooldown > 0 && <span className="text-[12px] text-white/40">in {cooldown}s</span>}
          {resendMsg && <span className="text-[12px] text-white">{resendMsg}</span>}
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button
            type="submit"
            disabled={isVerifying}
            className="bg-[#CFCFCF] text-black h-11 flex items-center text-[14px] px-6 gap-2 rounded-full cursor-pointer! disabled:opacity-50 transition-opacity"
          >
            <span className="whitespace-nowrap">{isVerifying ? "Verifying…" : "Verify"}</span>
            {isVerifying && (
              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
