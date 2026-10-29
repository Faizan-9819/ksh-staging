"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Btn from "../../ui/Btn";
import CustomSelect from "../../ui/CustomSelect";

const NAME_REGEX = /^[a-zA-Z\s]{2,}$/;
const PHONE_REGEX = /^\d{7,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ATTACH_LABEL_CLASS_NAME =
  "focus-ring-within cursor-pointer inline-flex items-center gap-1.5 rounded-sm text-[#212121] hover:text-[#59624D] transition-colors";

interface DepartmentOption {
  value: string;
  label: string;
}

const DEPARTMENT_OPTIONS: DepartmentOption[] = [
  { value: "investments", label: "Investments" },
  { value: "engineering", label: "Engineering" },
  { value: "leasing", label: "Leasing" },
  { value: "fund-management", label: "Fund Management" },
  { value: "finance", label: "Finance" },
  { value: "human-resources", label: "Human Resources" },
];

interface DepartmentSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function DepartmentSelect({
  value,
  onChange,
  disabled,
}: DepartmentSelectProps) {
  return (
    <CustomSelect
      name="user_department"
      options={DEPARTMENT_OPTIONS}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder="Select Department"
      triggerClassName={`w-full h-12 px-4 rounded-lg bg-white text-left border border-transparent focus:border-[#59624D] transition-all flex items-center justify-between ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      triggerStyle={{
        fontFamily: "var(--font-inter), Inter, sans-serif",
        fontSize: "14px",
        color: value ? "#212121" : "#868686",
      }}
      listClassName="absolute z-50 top-full left-0 mt-0 w-full rounded-lg bg-white border border-[#E5E0D8] shadow-lg py-1"
      optionClassName="px-4 py-1.5"
      optionStyle={{
        fontFamily: "var(--font-inter), Inter, sans-serif",
        fontSize: "16px",
      }}
    />
  );
}

export default function CareerFormSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_phone: "",
    user_email: "",
    user_education: "",
    user_department: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validateFile = (file: File) => {
    if (!VALID_FILE_TYPES.includes(file.type)) {
      return "Only PDF, DOC, and DOCX files are allowed.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size should not exceed 2MB.";
    }
    return "";
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validateFile(file);
    if (err) {
      setErrors((prev) => ({ ...prev, cv: err }));
      e.target.value = "";
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next.cv;
      return next;
    });
    setCvFile(file);
  };

  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validateFile(file);
    if (err) {
      setErrors((prev) => ({ ...prev, coverLetter: err }));
      e.target.value = "";
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next.coverLetter;
      return next;
    });
    setCoverLetterFile(file);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!NAME_REGEX.test(formData.first_name)) {
      errs.first_name = "Please enter a valid first name.";
    }
    if (!NAME_REGEX.test(formData.last_name)) {
      errs.last_name = "Please enter a valid last name.";
    }
    if (!PHONE_REGEX.test(formData.user_phone)) {
      errs.user_phone = "Please enter a valid phone number.";
    }
    if (!EMAIL_REGEX.test(formData.user_email)) {
      errs.user_email = "Please enter a valid email address.";
    }
    if (formData.user_education.trim().length < 2) {
      errs.user_education = "Please enter your education.";
    }
    if (!formData.user_department) {
      errs.user_department = "Please select a department.";
    }
    setErrors((prev) => ({ ...prev, ...errs }));
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validate() || !formRef.current) return;

    setIsSending(true);
    setServerError("");

    try {
      const body = new FormData();
      body.set("first_name", formData.first_name);
      body.set("last_name", formData.last_name);
      body.set("user_phone", formData.user_phone);
      body.set("user_email", formData.user_email);
      body.set("user_education", formData.user_education);
      body.set("user_department", formData.user_department);
      if (cvFile) body.set("attachment", cvFile);
      if (coverLetterFile) body.set("cover_letter", coverLetterFile);

      const res = await fetch("/api/career", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.error || "Submission failed");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Career form error:", err);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="career-form"
      className="relative w-full overflow-hidden bg-[#FAF8F5]"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/career/About/AboutHero.webp"
          alt="Office Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Content Container */}
      <div
        className="relative z-10 max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row items-center lg:items-end justify-between min-h-[600px] lg:min-h-[640px]"
        style={{
          paddingLeft: "var(--margin, clamp(16px, 5.7vw, 80px))",
          paddingRight: "var(--margin, clamp(16px, 5.7vw, 80px))",
          paddingTop: "clamp(32px, 5vw, 64px)",
        }}
      >
        {/* MOBILE ONLY: Man Image (Centered X-Axis, directly above form) */}
        <div className="w-full lg:hidden flex items-center justify-center mt-6">
          <div className="w-full max-w-[420px] aspect-[9/7] relative flex items-end justify-center">
            <Image
              src="/career/careernewPNG.png"
              alt="Career Candidate"
              width={684}
              height={532}
              priority
              className="w-full h-auto object-contain object-bottom"
            />
          </div>
        </div>

        {/* DESKTOP ONLY: Man Image Container (Anchored to Bottom Left) */}
        <div className="hidden lg:flex w-[684px] lg:max-[1439px]:w-[clamp(430px,43vw,620px)] aspect-[9/7] relative shrink-0 items-end justify-start">
          <Image
            src="/career/careernewPNG.png"
            alt="Career Candidate"
            width={684}
            height={532}
            priority
            className="w-full h-auto object-contain object-bottom"
            style={{
              maxHeight: "532px",
            }}
          />
        </div>

        {/* Form Container */}
        <div className="w-full lg:w-[670px] lg:max-[1439px]:w-[clamp(430px,43vw,620px)] max-w-[670px] mt-0 mb-8 lg:my-12 shrink-0">
          {isSubmitted ? (
            <div className="w-full bg-[#C5BDAC] rounded-[20px] p-6 sm:p-10 lg:p-[50px] shadow-sm">
              <p
                className="text-[#212121] text-lg sm:text-xl text-center"
                style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
              >
                Thank you for applying. We&apos;ve received your application and
                will be in touch soon.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="w-full bg-[#C5BDAC] rounded-[20px] p-6 sm:p-10 lg:mb-10 lg:p-[50px] flex flex-col gap-6 shadow-sm"
            >
              <input
                type="text"
                name="honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                className="absolute left-[-9000px]"
                aria-hidden="true"
              />

              {/* Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
                {/* Name */}
                <div>
                  <input
                    name="first_name"
                    type="text"
                    placeholder="Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    disabled={isSending}
                    className="w-full h-12 px-4 rounded-lg bg-white text-[#212121] placeholder-[#868686] outline-none border border-transparent focus:border-[#59624D] transition-all"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: "16px",
                    }}
                  />
                  {errors.first_name && (
                    <span className="text-xs text-red-600 pl-1">
                      {errors.first_name}
                    </span>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <input
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    disabled={isSending}
                    className="w-full h-12 px-4 rounded-lg bg-white text-[#212121] placeholder-[#868686] outline-none border border-transparent focus:border-[#59624D] transition-all"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: "16px",
                    }}
                  />
                  {errors.last_name && (
                    <span className="text-xs text-red-600 pl-1">
                      {errors.last_name}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <input
                    name="user_phone"
                    type="tel"
                    placeholder="Phone"
                    value={formData.user_phone}
                    onChange={handleChange}
                    disabled={isSending}
                    className="w-full h-12 px-4 rounded-lg bg-white text-[#212121] placeholder-[#868686] outline-none border border-transparent focus:border-[#59624D] transition-all"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: "16px",
                    }}
                  />
                  {errors.user_phone && (
                    <span className="text-xs text-red-600 pl-1">
                      {errors.user_phone}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    name="user_email"
                    type="email"
                    placeholder="Email"
                    value={formData.user_email}
                    onChange={handleChange}
                    disabled={isSending}
                    className="w-full h-12 px-4 rounded-lg bg-white text-[#212121] placeholder-[#868686] outline-none border border-transparent focus:border-[#59624D] transition-all"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: "16px",
                    }}
                  />
                  {errors.user_email && (
                    <span className="text-xs text-red-600 pl-1">
                      {errors.user_email}
                    </span>
                  )}
                </div>

                {/* Qualification */}
                <div>
                  <input
                    name="user_education"
                    type="text"
                    placeholder="Qualification"
                    value={formData.user_education}
                    onChange={handleChange}
                    disabled={isSending}
                    className="w-full h-12 px-4 rounded-lg bg-white text-[#212121] placeholder-[#868686] outline-none border border-transparent focus:border-[#59624D] transition-all"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: "16px",
                    }}
                  />
                  {errors.user_education && (
                    <span className="text-xs text-red-600 pl-1">
                      {errors.user_education}
                    </span>
                  )}
                </div>

                {/* Select Department Dropdown */}
                <div>
                  <DepartmentSelect
                    value={formData.user_department}
                    disabled={isSending}
                    onChange={(nextValue) => {
                      setFormData((prev) => ({
                        ...prev,
                        user_department: nextValue,
                      }));
                      setErrors((prev) => {
                        if (!prev.user_department) return prev;
                        const next = { ...prev };
                        delete next.user_department;
                        return next;
                      });
                    }}
                  />
                  {errors.user_department && (
                    <span className="text-xs text-red-600 pl-1">
                      {errors.user_department}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Form Actions: File Attachments + Submit */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                {/* Attachment Links */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
                  {/* Attach CV — inputs are sr-only (not display:none) so
                      they stay in the keyboard tab order; the label shows
                      the focus ring since the input itself is invisible. */}
                  <div>
                    <label className={ATTACH_LABEL_CLASS_NAME}>
                      <span
                        style={{
                          fontFamily: "var(--font-inter), Inter, sans-serif",
                          fontSize: "16px",
                          fontWeight: 400,
                        }}
                      >
                        + {cvFile ? cvFile.name : "Attach CV"}
                      </span>
                      <input
                        type="file"
                        name="attachment"
                        accept=".pdf,.doc,.docx"
                        className="sr-only"
                        onChange={handleCvChange}
                        disabled={isSending}
                      />
                    </label>
                    {errors.cv && (
                      <p className="text-xs text-red-600 mt-1">{errors.cv}</p>
                    )}
                  </div>

                  {/* Attach Cover Letter */}
                  <div>
                    <label className={ATTACH_LABEL_CLASS_NAME}>
                      <span
                        style={{
                          fontFamily: "var(--font-inter), Inter, sans-serif",
                          fontSize: "16px",
                          fontWeight: 400,
                        }}
                      >
                        +{" "}
                        {coverLetterFile
                          ? coverLetterFile.name
                          : "Attach Cover Letter"}
                      </span>
                      <input
                        type="file"
                        name="cover_letter"
                        accept=".pdf,.doc,.docx"
                        className="sr-only"
                        onChange={handleCoverLetterChange}
                        disabled={isSending}
                      />
                    </label>
                    {errors.coverLetter && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.coverLetter}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Btn
                  label={isSending ? "Sending..." : "Submit"}
                  className={`w-full sm:w-auto !h-12 !px-8 border-none shrink-0 ${isSending ? "opacity-50 pointer-events-none" : ""}`}
                  textColor="text-[#212121]"
                  hoverTextColor="text-[#FFFFFF]"
                  bgColor="bg-white"
                  hoverBgColor="bg-[#59624D]"
                  borderColor="border-transparent"
                  arrowColor="stroke-[#212121]"
                  hoverArrowColor="stroke-white"
                  textSize="text-[16px]"
                />
              </div>

              {serverError && (
                <p className="text-sm text-red-600">{serverError}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
