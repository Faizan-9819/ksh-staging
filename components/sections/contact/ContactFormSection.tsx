"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePageTransition } from "@/components/ui/PageTransitionContext";
import { Mail, Phone } from "lucide-react";
import Btn from "@/components/ui/Btn";
import CustomSelect from "@/components/ui/CustomSelect";
import { useFormSubmit } from "@/components/ui/FormSubmitContext";

const NAME_REGEX = /^[a-zA-Z\s]{2,}$/;
const PHONE_REGEX = /^[0-9]{6,15}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Matches Figma exactly (node 2488:414): default state is an outlined
// #C5BDAC circle with a #C5BDAC glyph; :hover fills the circle solid
// #C5BDAC with a white glyph. The wrapping <a> supplies `group` so these
// group-hover classes fire on hover — the filled look is the hover state
// for every icon here, not any icon's default appearance.
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <circle
      cx="20"
      cy="20"
      r="19.5"
      stroke="#C5BDAC"
      className="fill-none transition-colors duration-300 group-hover:fill-[#C5BDAC]"
    />
    <path
      d="M15.227 14.62C15.227 15.5149 14.5078 16.24 13.62 16.24C12.7322 16.24 12.013 15.5149 12.013 14.62C12.013 13.7257 12.7322 13 13.62 13C14.5078 13 15.227 13.7257 15.227 14.62ZM15.24 17.536H12V27.904H15.24V17.536ZM20.4123 17.536H17.1931V27.904H20.413V22.4614C20.413 19.4353 24.3198 19.1877 24.3198 22.4614V27.904H27.552V21.3391C27.552 16.2328 21.7705 16.4188 20.4123 18.9324V17.536Z"
      className="fill-[#C5BDAC] transition-colors duration-300 group-hover:fill-white"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <circle
      cx="20"
      cy="20"
      r="19.5"
      stroke="#C5BDAC"
      className="fill-none transition-colors duration-300 group-hover:fill-[#C5BDAC]"
    />
    <path
      d="M29 20.055C29 15.0541 24.9706 11 20 11C15.0294 11 11 15.0541 11 20.055C11 24.5745 14.2912 28.3207 18.5938 29V22.6725H16.3086V20.055H18.5938V18.0601C18.5938 15.7907 19.9374 14.5371 21.9932 14.5371C22.9776 14.5371 24.0078 14.714 24.0078 14.714V16.9423H22.873C21.755 16.9423 21.4062 17.6404 21.4062 18.3572V20.055H23.9023L23.5033 22.6725H21.4062V29C25.7088 28.3207 29 24.5745 29 20.055Z"
      className="fill-[#C5BDAC] transition-colors duration-300 group-hover:fill-white"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <circle
      cx="20"
      cy="20"
      r="19.5"
      stroke="#C5BDAC"
      className="fill-none transition-colors duration-300 group-hover:fill-[#C5BDAC]"
    />
    <g
      transform="translate(12 12)"
      className="fill-[#C5BDAC] transition-colors duration-300 group-hover:fill-white"
    >
      <path d="M8 1.44062C10.1375 1.44062 10.3906 1.45 11.2313 1.4875C12.0125 1.52187 12.4344 1.65313 12.7156 1.7625C13.0875 1.90625 13.3563 2.08125 13.6344 2.35938C13.9156 2.64063 14.0875 2.90625 14.2313 3.27813C14.3406 3.55938 14.4719 3.98437 14.5063 4.7625C14.5438 5.60625 14.5531 5.85938 14.5531 7.99375C14.5531 10.1313 14.5438 10.3844 14.5063 11.225C14.4719 12.0063 14.3406 12.4281 14.2313 12.7094C14.0875 13.0813 13.9125 13.35 13.6344 13.6281C13.3531 13.9094 13.0875 14.0813 12.7156 14.225C12.4344 14.3344 12.0094 14.4656 11.2313 14.5C10.3875 14.5375 10.1344 14.5469 8 14.5469C5.8625 14.5469 5.60938 14.5375 4.76875 14.5C3.9875 14.4656 3.56563 14.3344 3.28438 14.225C2.9125 14.0813 2.64375 13.9063 2.36563 13.6281C2.08438 13.3469 1.9125 13.0813 1.76875 12.7094C1.65938 12.4281 1.52813 12.0031 1.49375 11.225C1.45625 10.3813 1.44688 10.1281 1.44688 7.99375C1.44688 5.85625 1.45625 5.60312 1.49375 4.7625C1.52813 3.98125 1.65938 3.55938 1.76875 3.27813C1.9125 2.90625 2.0875 2.6375 2.36563 2.35938C2.64688 2.07813 2.9125 1.90625 3.28438 1.7625C3.56563 1.65313 3.99063 1.52187 4.76875 1.4875C5.60938 1.45 5.8625 1.44062 8 1.44062ZM8 0C5.82813 0 5.55625 0.009375 4.70313 0.046875C3.85313 0.084375 3.26875 0.221875 2.7625 0.41875C2.23438 0.625 1.7875 0.896875 1.34375 1.34375C0.896875 1.7875 0.625 2.23438 0.41875 2.75938C0.221875 3.26875 0.084375 3.85 0.046875 4.7C0.009375 5.55625 0 5.82813 0 8C0 10.1719 0.009375 10.4438 0.046875 11.2969C0.084375 12.1469 0.221875 12.7313 0.41875 13.2375C0.625 13.7656 0.896875 14.2125 1.34375 14.6563C1.7875 15.1 2.23438 15.375 2.75938 15.5781C3.26875 15.775 3.85 15.9125 4.7 15.95C5.55313 15.9875 5.825 15.9969 7.99688 15.9969C10.1688 15.9969 10.4406 15.9875 11.2938 15.95C12.1438 15.9125 12.7281 15.775 13.2344 15.5781C13.7594 15.375 14.2063 15.1 14.65 14.6563C15.0938 14.2125 15.3688 13.7656 15.5719 13.2406C15.7688 12.7313 15.9063 12.15 15.9438 11.3C15.9813 10.4469 15.9906 10.175 15.9906 8.00313C15.9906 5.83125 15.9813 5.55938 15.9438 4.70625C15.9063 3.85625 15.7688 3.27188 15.5719 2.76563C15.375 2.23438 15.1031 1.7875 14.6563 1.34375C14.2125 0.9 13.7656 0.625 13.2406 0.421875C12.7313 0.225 12.15 0.0875 11.3 0.05C10.4438 0.009375 10.1719 0 8 0Z" />
      <path d="M8.00024 3.89054C5.73149 3.89054 3.89086 5.73117 3.89086 7.99992C3.89086 10.2687 5.73149 12.1093 8.00024 12.1093C10.269 12.1093 12.1096 10.2687 12.1096 7.99992C12.1096 5.73117 10.269 3.89054 8.00024 3.89054ZM8.00024 10.6655C6.52836 10.6655 5.33461 9.47179 5.33461 7.99992C5.33461 6.52804 6.52836 5.33429 8.00024 5.33429C9.47211 5.33429 10.6659 6.52804 10.6659 7.99992C10.6659 9.47179 9.47211 10.6655 8.00024 10.6655Z" />
      <path d="M13.2312 3.72804C13.2312 4.25929 12.8 4.68741 12.2718 4.68741C11.7406 4.68741 11.3125 4.25616 11.3125 3.72804C11.3125 3.19679 11.7437 2.76866 12.2718 2.76866C12.8 2.76866 13.2312 3.19991 13.2312 3.72804Z" />
    </g>
  </svg>
);

const YoutubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <circle
      cx="20"
      cy="20"
      r="19.5"
      stroke="#C5BDAC"
      className="fill-none transition-colors duration-300 group-hover:fill-[#C5BDAC]"
    />
    <g transform="translate(10 12.9668)">
      <path
        d="M19.8008 3.03516C19.8008 3.03516 19.6055 1.65625 19.0039 1.05078C18.2422 0.253906 17.3906 0.25 17 0.203125C14.2031 0 10.0039 0 10.0039 0H9.99609C9.99609 0 5.79687 0 3 0.203125C2.60938 0.25 1.75781 0.253906 0.996094 1.05078C0.394531 1.65625 0.203125 3.03516 0.203125 3.03516C0.203125 3.03516 0 4.65625 0 6.27344V7.78906C0 9.40625 0.199219 11.0273 0.199219 11.0273C0.199219 11.0273 0.394531 12.4063 0.992187 13.0117C1.75391 13.8086 2.75391 13.7812 3.19922 13.8672C4.80078 14.0195 10 14.0664 10 14.0664C10 14.0664 14.2031 14.0586 17 13.8594C17.3906 13.8125 18.2422 13.8086 19.0039 13.0117C19.6055 12.4063 19.8008 11.0273 19.8008 11.0273C19.8008 11.0273 20 9.41016 20 7.78906V6.27344C20 4.65625 19.8008 3.03516 19.8008 3.03516ZM7.93359 9.62891V4.00781L13.3359 6.82812L7.93359 9.62891Z"
        className="fill-[#C5BDAC] transition-colors duration-300 group-hover:fill-white"
      />
    </g>
  </svg>
);

interface EnquiryOption {
  value: string;
  label: string;
}

const ENQUIRY_OPTIONS: EnquiryOption[] = [
  { value: "Leasing", label: "Leasing" },
  { value: "Land Acquisition", label: "Land Acquisition" },
  { value: "Investor Relations", label: "Investor Relations" },
  { value: "General", label: "General Query" },
];

interface EnquirySelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

// Same keyboard-accessible custom listbox as the career page's department
// dropdown (see CustomSelect for why it isn't a native <select>).
function EnquirySelect({ value, onChange, disabled }: EnquirySelectProps) {
  return (
    <CustomSelect
      name="typeOfEnquiry"
      options={ENQUIRY_OPTIONS}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder="Type of Enquiry"
      triggerClassName={`w-full bg-white rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 border border-transparent focus:border-gray-400 transition-colors text-sm sm:text-base flex items-center justify-between ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      triggerStyle={{
        fontFamily: "var(--font-inter), Inter, sans-serif",
        fontWeight: 400,
        lineHeight: "normal",
        color: value ? "#212121" : "#868686",
      }}
      listClassName="absolute z-50 top-12 left-0 mt-2 w-full rounded-xl bg-white border border-[#E5E0D8] shadow-sm overflow-hidden"
      optionClassName="px-4 sm:px-5 py-2 text-sm sm:text-base"
      optionStyle={{
        fontFamily: "var(--font-inter), Inter, sans-serif",
        fontWeight: 400,
      }}
    />
  );
}

export default function ContactFormSection() {
  const router = useRouter();
  const { navigate } = usePageTransition();
  const { grantAccess } = useFormSubmit();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    typeOfEnquiry: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Lets AIF-section "Contact" CTAs deep-link here with the enquiry type
  // pre-selected, e.g. /contact-us?enquiry=investor-relations.
  useEffect(() => {
    if (searchParams.get("enquiry") === "investor-relations") {
      setFormData((prev) => ({ ...prev, typeOfEnquiry: "Investor Relations" }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!NAME_REGEX.test(formData.name)) {
      errs.name = "Please enter a valid name (letters & spaces only)";
    }
    if (!PHONE_REGEX.test(formData.phone)) {
      errs.phone = "Enter a valid phone number";
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!formData.typeOfEnquiry) {
      errs.typeOfEnquiry = "Please select a type of enquiry";
    }
    if (formData.message.trim().length < 5) {
      errs.message = "Message must be at least 5 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validate()) return;

    setIsSending(true);
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          companyName: formData.companyName,
          phone: formData.phone,
          email: formData.email,
          typeOfEnquiry: formData.typeOfEnquiry,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.error || "Submission failed");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        companyName: "",
        phone: "",
        email: "",
        typeOfEnquiry: "",
        message: "",
      });
      grantAccess();
      navigate("/thank-you");
    } catch (err) {
      console.error("Contact form error:", err);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact-form"
      className="w-full bg-white py-12 sm:py-16 lg:py-24 fix"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-20 items-center">
        {/* Left Column: Contact Information */}
        <div className="lg:col-span-6 flex flex-col gap-6 sm:gap-8">
          {/* Email */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#212121] shrink-0 stroke-[1.5]" />
            <a
              href="mailto:enquiry@kshinfra.com"
              className="hover:underline transition-all text-base sm:text-lg"
              style={{
                color: "#212121",
                fontFamily: "var(--font-sora), Sora, sans-serif",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              enquiry@kshinfra.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#212121] shrink-0 stroke-[1.5]" />
            <a
              href="tel:18002122030"
              className="hover:underline transition-all flex flex-wrap items-center gap-1.5 text-base sm:text-lg"
              style={{
                color: "#212121",
                fontFamily: "var(--font-sora), Sora, sans-serif",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              <span>1800-212-2030</span>
              <span style={{ color: "#868686" }}>(Toll-Free)</span>
            </a>
          </div>

          {/* Pune Head Office */}
          <div className="space-y-1.5 sm:space-y-2 pt-2">
            <h2
              className="text-xl sm:text-[22px] lg:text-[24px]"
              style={{
                color: "#212121",
                fontFamily: "var(--font-sora), Sora, sans-serif",
                fontWeight: 400,
                lineHeight: "140%",
              }}
            >
              Pune (Head Office)
            </h2>
            <p
              className="text-base sm:text-lg lg:text-[20px]"
              style={{
                color: "#868686",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontWeight: 400,
                lineHeight: "140%",
              }}
            >
              Gokhale Sanchit, Office No. 4, Survey No. 846, <br /> Servants of
              India Society, Near Marathwada College, <br /> Shivajinagar, Pune,
              Maharashtra - 411 004 (India)
            </p>
          </div>

          {/* Mumbai Office */}
          <div className="space-y-1.5 sm:space-y-2">
            <h2
              className="text-xl sm:text-[22px] lg:text-[24px]"
              style={{
                color: "#212121",
                fontFamily: "var(--font-sora), Sora, sans-serif",
                fontWeight: 400,
                lineHeight: "140%",
              }}
            >
              KSH INFRA, Mumbai
            </h2>
            <p
              className="text-base sm:text-lg lg:text-[20px]"
              style={{
                color: "#868686",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontWeight: 400,
                lineHeight: "140%",
              }}
            >
              INNOV8, 8th Floor, Tower B, <br /> Peninsula Business Park, <br />{" "}
              Lower Parel (W), Mumbai – 400013.
            </p>
          </div>

          {/* Social Links */}
          <div className="pt-2 space-y-3 sm:space-y-4">
            <p
              className="text-xl sm:text-[22px] lg:text-[24px]"
              style={{
                color: "#212121",
                fontFamily: "var(--font-sora), Sora, sans-serif",
                fontWeight: 400,
                lineHeight: "140%",
              }}
            >
              Follow us on
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/ksh-infra/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.facebook.com/KSHInfraIndia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/kshinfrapark/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.youtube.com/channel/UCae7QNTK0AUOf7kxBF53hag"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="group"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-6 bg-[#C5BDAC] rounded-[12px] sm:rounded-[24px] p-5 sm:p-8 lg:p-8 shadow-sm w-full">
          {isSubmitted ? (
            <p
              className="text-lg sm:text-xl text-center py-8"
              style={{
                color: "#212121",
                fontFamily: "var(--font-sora), Sora, sans-serif",
                fontWeight: 400,
                lineHeight: "140%",
              }}
            >
              Thank you for reaching out. Your enquiry has been submitted —
              we&apos;ll be in touch soon.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col lg:p-[24px] lg:pb-9 gap-3.5 sm:gap-6"
              noValidate
            >
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

              {/* Input Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSending}
                    className="w-full bg-white rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 outline-none border border-transparent focus:border-gray-400 transition-colors placeholder:text-[#868686] text-sm sm:text-base"
                    style={{
                      color: "#212121",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-600 pl-1">
                      {errors.name}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  disabled={isSending}
                  className="w-full bg-white rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 outline-none border border-transparent focus:border-gray-400 transition-colors placeholder:text-[#868686] text-sm sm:text-base"
                  style={{
                    color: "#212121",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                />
              </div>

              {/* Input Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSending}
                    className="w-full bg-white rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 outline-none border border-transparent focus:border-gray-400 transition-colors placeholder:text-[#868686] text-sm sm:text-base"
                    style={{
                      color: "#212121",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  />
                  {errors.phone && (
                    <span className="text-xs text-red-600 pl-1">
                      {errors.phone}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSending}
                    className="w-full bg-white rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 outline-none border border-transparent focus:border-gray-400 transition-colors placeholder:text-[#868686] text-sm sm:text-base"
                    style={{
                      color: "#212121",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-600 pl-1">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Select Dropdown */}
              <div>
                <EnquirySelect
                  value={formData.typeOfEnquiry}
                  disabled={isSending}
                  onChange={(nextValue) => {
                    setFormData((prev) => ({
                      ...prev,
                      typeOfEnquiry: nextValue,
                    }));
                    setErrors((prev) => {
                      if (!prev.typeOfEnquiry) return prev;
                      const next = { ...prev };
                      delete next.typeOfEnquiry;
                      return next;
                    });
                  }}
                />
                {errors.typeOfEnquiry && (
                  <span className="text-xs text-red-600 pl-1">
                    {errors.typeOfEnquiry}
                  </span>
                )}
              </div>

              {/* Message Area */}
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSending}
                  className="w-full bg-white rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 outline-none border border-transparent focus:border-gray-400 transition-colors resize-none placeholder:text-[#868686] text-sm sm:text-base"
                  style={{
                    color: "#212121",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                />
                {errors.message && (
                  <span className="text-xs text-red-600 pl-1">
                    {errors.message}
                  </span>
                )}
              </div>

              {serverError && (
                <p className="text-sm text-red-600">{serverError}</p>
              )}

              {/* Submit Button */}
              <div className="mt-1 sm:mt-2">
                <Btn
                  label={isSending ? "Sending..." : "Submit"}
                  bgColor="bg-white"
                  textColor="text-[#24314E]"
                  arrowColor="stroke-[#24314E]"
                  hoverBgColor="bg-[#6A7F5D]"
                  hoverTextColor="text-white"
                  hoverArrowColor="stroke-white"
                  className={`py-2.5 px-8 rounded-full shadow-none border-none! hover:border-none! text-sm sm:text-base ${isSending ? "opacity-50 pointer-events-none" : ""}`}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
// "use client";

// import React, { useState } from "react";
// import { Mail, Phone, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
// import Btn from "@/components/ui/Btn";

// export default function ContactFormSection() {
//   const [formData, setFormData] = useState({
//     name: "",
//     companyName: "",
//     phone: "",
//     email: "",
//     typeOfEnquiry: "",
//     message: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//   };

//   return (
//     <section
//       className="w-full bg-white py-16 sm:py-20 lg:py-24"
//       style={{
//         paddingLeft: "var(--margin, clamp(16px, 5.7vw, 80px))",
//         paddingRight: "var(--margin, clamp(16px, 5.7vw, 80px))",
//       }}
//     >
//       <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

//         {/* Left Column: Contact Information */}
//         <div className="lg:col-span-5 flex flex-col gap-8">

//           {/* Email */}
//           <div className="flex items-center gap-4">
//             <Mail className="w-6 h-6 text-[#212121] shrink-0 stroke-[1.5]" />
//             <a
//               href="mailto:leasing@kshinfra.com"
//               className="hover:underline transition-all"
//               style={{
//                 color: "#212121",
//                 fontFamily: "var(--font-sora), Sora, sans-serif",
//                 fontSize: "18px",
//                 fontWeight: 400,
//                 lineHeight: "normal",
//               }}
//             >
//               leasing@kshinfra.com
//             </a>
//           </div>

//           {/* Phone */}
//           <div className="flex items-center gap-4">
//             <Phone className="w-6 h-6 text-[#212121] shrink-0 stroke-[1.5]" />
//             <a
//               href="tel:18002122030"
//               className="hover:underline transition-all flex items-center gap-1.5"
//               style={{
//                 color: "#212121",
//                 fontFamily: "var(--font-sora), Sora, sans-serif",
//                 fontSize: "18px",
//                 fontWeight: 400,
//                 lineHeight: "normal",
//               }}
//             >
//               <span>1800-212-2030</span>
//               <span style={{ color: "#868686" }}>(Toll-Free)</span>
//             </a>
//           </div>

//           {/* Pune Head Office */}
//           <div className="space-y-2 pt-2">
//             <h3
//               style={{
//                 color: "#212121",
//                 fontFamily: "var(--font-sora), Sora, sans-serif",
//                 fontSize: "24px",
//                 fontWeight: 400,
//                 lineHeight: "140%",
//               }}
//             >
//               Pune (Head Office)
//             </h3>
//             <p
//               style={{
//                 color: "#868686",
//                 fontFamily: "var(--font-inter), Inter, sans-serif",
//                 fontSize: "20px",
//                 fontWeight: 400,
//                 lineHeight: "140%",
//               }}
//             >
//               Gokhale Sanchit, Office No. 4, Survey No. 846, Servants of India Society, Near Marathwada College, Shivajinagar, Pune, Maharashtra - 411 004 (India)
//             </p>
//           </div>

//           {/* Mumbai Office */}
//           <div className="space-y-2">
//             <h3
//               style={{
//                 color: "#212121",
//                 fontFamily: "var(--font-sora), Sora, sans-serif",
//                 fontSize: "24px",
//                 fontWeight: 400,
//                 lineHeight: "140%",
//               }}
//             >
//               KSH INFRA, Mumbai
//             </h3>
//             <p
//               style={{
//                 color: "#868686",
//                 fontFamily: "var(--font-inter), Inter, sans-serif",
//                 fontSize: "20px",
//                 fontWeight: 400,
//                 lineHeight: "140%",
//               }}
//             >
//               INNOV8, 8th Floor, Tower B, Peninsula Business Park, Lower Parel (W), Mumbai – 400013.
//             </p>
//           </div>

//           {/* Social Links */}
//           <div className="pt-2 space-y-4">
//             <p
//               style={{
//                 color: "#212121",
//                 fontFamily: "var(--font-sora), Sora, sans-serif",
//                 fontSize: "24px",
//                 fontWeight: 400,
//                 lineHeight: "140%",
//               }}
//             >
//               Follow us on
//             </p>
//             <div className="flex items-center gap-3">
//               {[
//                 { icon: Linkedin, href: "#", label: "LinkedIn" },
//                 { icon: Facebook, href: "#", label: "Facebook" },
//                 { icon: Instagram, href: "#", label: "Instagram" },
//                 { icon: Youtube, href: "#", label: "YouTube" },
//               ].map((social, i) => (
//                 <a
//                   key={i}
//                   href={social.href}
//                   aria-label={social.label}
//                   className="w-10 h-10 rounded-full border border-[#868686]/40 text-[#212121] flex items-center justify-center hover:bg-[#212121] hover:text-white hover:border-[#212121] transition-all"
//                 >
//                   <social.icon className="w-4 h-4" />
//                 </a>
//               ))}
//             </div>
//           </div>

//         </div>

//         {/* Right Column: Contact Form */}
//         <div className="lg:col-span-7 bg-[#C3BCB2] rounded-[24px] p-6 sm:p-10 shadow-sm">
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//             {/* Input Row 1 */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-white rounded-xl px-5 py-4 outline-none border border-transparent focus:border-gray-400 transition-colors placeholder:text-[#868686]"
//                 style={{
//                   color: "#212121",
//                   fontFamily: "var(--font-inter), Inter, sans-serif",
//                   fontSize: "16px",
//                   fontWeight: 400,
//                   lineHeight: "normal",
//                 }}
//               />
//               <input
//                 type="text"
//                 name="companyName"
//                 placeholder="Company Name"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 className="w-full bg-white rounded-xl px-5 py-4 outline-none border border-transparent focus:border-gray-400 transition-colors placeholder:text-[#868686]"
//                 style={{
//                   color: "#212121",
//                   fontFamily: "var(--font-inter), Inter, sans-serif",
//                   fontSize: "16px",
//                   fontWeight: 400,
//                   lineHeight: "normal",
//                 }}
//               />
//             </div>

//             {/* Input Row 2 */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-white rounded-xl px-5 py-4 outline-none border border-transparent focus:border-gray-400 transition-colors placeholder:text-[#868686]"
//                 style={{
//                   color: "#212121",
//                   fontFamily: "var(--font-inter), Inter, sans-serif",
//                   fontSize: "16px",
//                   fontWeight: 400,
//                   lineHeight: "normal",
//                 }}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-white rounded-xl px-5 py-4 outline-none border border-transparent focus:border-gray-400 transition-colors placeholder:text-[#868686]"
//                 style={{
//                   color: "#212121",
//                   fontFamily: "var(--font-inter), Inter, sans-serif",
//                   fontSize: "16px",
//                   fontWeight: 400,
//                   lineHeight: "normal",
//                 }}
//               />
//             </div>

//             {/* Select Dropdown */}
//             <select
//               name="typeOfEnquiry"
//               value={formData.typeOfEnquiry}
//               onChange={handleChange}
//               className="w-full bg-white rounded-xl px-5 py-4 outline-none border border-transparent focus:border-gray-400 transition-colors cursor-pointer appearance-none text-[#868686]"
//               style={{
//                 fontFamily: "var(--font-inter), Inter, sans-serif",
//                 fontSize: "16px",
//                 fontWeight: 400,
//                 lineHeight: "normal",
//               }}
//             >
//               <option value="" disabled>Type of Enquiry</option>
//               <option value="Leasing">Leasing</option>
//               <option value="Land Acquisition">Land Acquisition</option>
//               <option value="Investor Relations">Investor Relations</option>
//               <option value="General">General Query</option>
//             </select>

//             {/* Message Area */}
//             <textarea
//               name="message"
//               placeholder="Message"
//               rows={4}
//               value={formData.message}
//               onChange={handleChange}
//               required
//               className="w-full bg-white rounded-xl px-5 py-4 outline-none border border-transparent focus:border-gray-400 transition-colors resize-none placeholder:text-[#868686]"
//               style={{
//                 color: "#212121",
//                 fontFamily: "var(--font-inter), Inter, sans-serif",
//                 fontSize: "16px",
//                 fontWeight: 400,
//                 lineHeight: "normal",
//               }}
//             />

//             {/* Submit Button */}
//             <div className="mt-2">
//               <Btn
//                 label="Submit"
//                 bgColor="bg-white"
//                 textColor="text-[#212121]"
//                 arrowColor="stroke-[#212121]"
//                 hoverBgColor="bg-[#212121]"
//                 hoverTextColor="text-white"
//                 hoverArrowColor="stroke-white"
//                 className="py-2.5 px-8 rounded-full shadow-none border border-transparent"
//               />
//             </div>

//           </form>
//         </div>

//       </div>
//     </section>
//   );
// }
