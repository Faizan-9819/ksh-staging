"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const NAME_REGEX = /^[A-Za-z ]{2,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FORM_BACKGROUND =
  "radial-gradient(1299.24% 173.53% at 85.49% 121.3%, #59624D 0%, #748066 95.02%)";

type FieldName = "name" | "email";

interface BrochurePopFormProps {
  onClose: () => void;
  title?: string;
  /** Path to this park's brochure PDF, e.g. "/brochure/ksh-hosur-i.pdf". */
  brochureUrl: string;
  /** Distinguishes the lead source in the sheet/notify email — e.g. the park slug. */
  parkName: string;
  /**
   * When provided (e.g. "/api/chakan-iv-brochure"), submits to this dedicated
   * route (its own Sheet + SMTP send) instead of the default /api/brochure route.
   * Chakan IV and Hosur I use their own separate Sheet + SMTP pipeline rather
   * than the shared brochure route every other park uses.
   */
  apiEndpoint?: string;
}

export default function BrochurePopForm({
  onClose,
  title = "Download Brochure",
  brochureUrl,
  parkName,
  apiEndpoint,
}: BrochurePopFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldError, setFieldError] = useState<{
    field: FieldName | "";
    text: string;
  }>({ field: "", text: "" });
  const [honeypot, setHoneypot] = useState("");

  const validateField = (field: FieldName, value: string) => {
    if (!value) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    }
    if (field === "name" && !NAME_REGEX.test(value)) {
      return "Name must be at least 2 letters and contain only letters/spaces.";
    }
    if (field === "email" && !EMAIL_REGEX.test(value)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const handleFocus = (field: FieldName) => {
    if (fieldError.field === field) {
      setFieldError({ field: "", text: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;

    let err = validateField("name", name);
    if (err) {
      setFieldError({ field: "name", text: err });
      return;
    }
    err = validateField("email", email);
    if (err) {
      setFieldError({ field: "email", text: err });
      return;
    }

    setSending(true);
    setErrorMessage("");
    setFieldError({ field: "", text: "" });

    try {
      if (apiEndpoint) {
        const res = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            timestamp: new Date().toISOString(),
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data?.error || "Submission failed");
        }

        setSubmitted(true);
        return;
      }

      const res = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          park: parkName,
          brochureUrl,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Brochure download form error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 flex justify-center items-center bg-black/60 z-50 px-4"
    >
      <form
        onSubmit={handleSubmit}
        style={{ background: FORM_BACKGROUND }}
        className="lg:w-[620px] max-w-full min-h-[280px] w-full p-6 md:p-12 flex flex-col gap-5 sm:gap-8 relative overflow-hidden"
        noValidate
      >
        <input
          type="text"
          name="honeypot"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
          className="absolute left-[-9000px]"
        />
        <header className="flex justify-between items-center">
          <h3 className="text-white text-[24px] md:text-[40px] font-bold">
            {title}
          </h3>
          <button
            type="button"
            className="cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {!submitted ? (
          <>
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => handleFocus("name")}
                  placeholder="Name"
                  className={`w-full bg-black/15 text-white border-b py-2 px-4 outline-none ${
                    fieldError.field === "name"
                      ? "border-red-400"
                      : "border-white/30"
                  }`}
                />
                {fieldError.field === "name" && (
                  <p className="mt-1 text-sm text-white">{fieldError.text}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus("email")}
                  placeholder="Email"
                  className={`w-full bg-black/15 text-white border-b py-2 px-4 outline-none ${
                    fieldError.field === "email"
                      ? "border-red-400"
                      : "border-white/30"
                  }`}
                />
                {fieldError.field === "email" && (
                  <p className="mt-1 text-sm text-white">{fieldError.text}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="self-start bg-[#CFCFCF] text-[#000] xl:mt-6 py-3 px-6 rounded-full cursor-pointer! flex items-center gap-2 disabled:opacity-50"
            >
              {sending ? "Sending..." : <span>Proceed to Download</span>}
            </button>
          </>
        ) : (
          <div className="mt-4 text-white fsans-600 text-[20px] sm:text-[30px] py-3 rounded-lg">
            Thank you for submitting this form. Please check your inbox for the
            brochure link!
          </div>
        )}

        {errorMessage && (
          <div className="mt-0 sm:mt-4 bg-white bg-opacity-20 text-red-300 text-[20px] sm:text-[30px] py-3 rounded-lg text-center">
            {errorMessage}
          </div>
        )}
      </form>
    </motion.div>
  );
}
