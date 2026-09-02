"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAME_REGEX = /^[a-zA-Z\s]{2,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function normalizeIndianPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `+91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  if (digits.length === 13 && digits.startsWith("091")) return `+91${digits.slice(3)}`;
  return null;
}

function validateFields({ name, email, phone }: { name: string; email: string; phone: string }) {
  const errs: Record<string, string> = {};
  if (!NAME_REGEX.test(name.trim())) {
    errs.name = "Please enter a valid name (letters & spaces only)";
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    errs.email = "Please enter a valid email address";
  }
  if (!normalizeIndianPhone(phone)) {
    errs.phone = "Enter a valid 10-digit Indian mobile number";
  }
  return errs;
}

const inputBase =
  "w-full bg-black/15 text-white border-b py-2 px-4 outline-none text-[15px] placeholder-white/40 transition-colors duration-200";

export interface CertDownloadDetails {
  name: string;
  email: string;
  phone: string;
  organization: string;
  otpToken: string;
}

interface CertDownloadFormStep1Props {
  onClose: () => void;
  onOtpSent: (details: CertDownloadDetails) => void;
  savedDetails: Partial<CertDownloadDetails> | null;
}

export default function CertDownloadFormStep1({
  onClose,
  onOtpSent,
  savedDetails,
}: CertDownloadFormStep1Props) {
  const [name, setName] = useState(savedDetails?.name || "");
  const [email, setEmail] = useState(savedDetails?.email || "");
  const [phone, setPhone] = useState(savedDetails?.phone || "");
  const [organization, setOrganization] = useState(savedDetails?.organization || "");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [serverError, setServerError] = useState("");

  const clearError = (field: string) => {
    setErrors((prev) => {
      const c = { ...prev };
      delete c[field];
      return c;
    });
  };

  const validateField = (field: "name" | "email" | "phone") => {
    const fieldErrors = validateFields({ name, email, phone });
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    } else {
      clearError(field);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d\s+\-()]/g, "");
    if (raw.replace(/\D/g, "").length > 13) return;
    setPhone(raw);
    const digitCount = raw.replace(/\D/g, "").length;
    if (digitCount >= 10) {
      if (!normalizeIndianPhone(raw)) {
        setErrors((prev) => ({ ...prev, phone: "Enter a valid 10-digit Indian mobile number" }));
      } else {
        clearError("phone");
      }
    } else {
      clearError("phone");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;

    const fieldErrors = validateFields({ name, email, phone });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsSending(true);
    setServerError("");

    try {
      const res = await fetch("/api/cert-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: normalizeIndianPhone(phone),
          organization: organization.trim(),
          website: honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.error || "Failed to send OTP. Please try again.");
        return;
      }

      onOtpSent({
        name: name.trim(),
        email: email.trim(),
        phone: normalizeIndianPhone(phone) as string,
        organization: organization.trim(),
        otpToken: data.token,
      });
    } catch {
      setServerError("Failed to send OTP. Please check your connection.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      style={{
        background:
          "radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%)",
      }}
      className="w-full max-w-[560px] p-6 md:p-10 flex flex-col gap-5"
    >
      <header className="flex justify-between items-start">
        <h3 className="text-white text-[22px] md:text-[32px] font-bold leading-[1.1]">
          Download Certifications
        </h3>
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

      <p className="text-white/60 text-[13px] -mt-2">
        We&apos;ll send a 4-digit OTP to your email to verify your identity.
      </p>

      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        className="absolute left-[-9000px]"
        aria-hidden="true"
      />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col w-full gap-1">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearError("name");
              }}
              onBlur={() => validateField("name")}
              disabled={isSending}
              className={`${inputBase} ${errors.name ? "border-red-400" : "border-white/30"}`}
            />
            {errors.name && <span className="text-xs text-red-200 pl-1">{errors.name}</span>}
          </div>

          <div className="flex flex-col w-full gap-1">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError("email");
              }}
              onBlur={() => validateField("email")}
              disabled={isSending}
              autoComplete="email"
              className={`${inputBase} ${errors.email ? "border-red-400" : "border-white/30"}`}
            />
            {errors.email && <span className="text-xs text-red-200 pl-1">{errors.email}</span>}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={handlePhoneChange}
            onBlur={() => validateField("phone")}
            disabled={isSending}
            autoComplete="tel"
            className={`${inputBase} ${errors.phone ? "border-red-400" : "border-white/30"}`}
          />
          {errors.phone && <span className="text-xs text-red-200 pl-1">{errors.phone}</span>}
        </div>

        <input
          type="text"
          placeholder="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          disabled={isSending}
          className={`${inputBase} border-white/30`}
        />

        {serverError && <p className="text-red-200 text-sm -mt-1">{serverError}</p>}

        <button
          type="submit"
          disabled={isSending}
          className="self-start bg-[#CFCFCF] text-black py-3 px-6 rounded-full cursor-pointer! flex items-center gap-2 disabled:opacity-50 transition-opacity"
        >
          <span className="whitespace-nowrap text-[15px]">
            {isSending ? "Sending OTP…" : "Send OTP"}
          </span>
          <AnimatePresence mode="wait">
            {isSending ? (
              <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              </motion.div>
            ) : (
              <motion.svg
                key="arrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                width="20"
                height="12"
                viewBox="159 10 42 20"
                fill="none"
              >
                <path
                  d="M159.5 20H193"
                  stroke="#212121"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M193 11C193 11 200 12.5 200 20C200 27.5 193 29 193 29"
                  stroke="#212121"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </form>
    </div>
  );
}
