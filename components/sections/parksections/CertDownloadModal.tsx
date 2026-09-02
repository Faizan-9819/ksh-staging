"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CertDownloadFormStep1, {
  type CertDownloadDetails,
} from "./CertDownloadFormStep1";
import CertDownloadFormStep2 from "./CertDownloadFormStep2";

interface CertDownloadModalProps {
  onClose: () => void;
  /** Park route slug (e.g. "ksh-hosur-i") — determines which certificate file is emailed. */
  source: string;
}

export default function CertDownloadModal({ onClose, source }: CertDownloadModalProps) {
  const [step, setStep] = useState<"details" | "otp">("details");
  const [userDetails, setUserDetails] = useState<
    (CertDownloadDetails & { source?: string }) | null
  >(null);
  // Accumulate all tokens issued across resends so any OTP sent within the
  // last 5 minutes still verifies.
  const allTokensRef = useRef("");

  const handleOtpSent = (details: CertDownloadDetails) => {
    const newToken = details.otpToken || "";
    allTokensRef.current = allTokensRef.current ? `${allTokensRef.current},${newToken}` : newToken;
    setUserDetails({ ...details, source, otpToken: allTokensRef.current });
    setStep("otp");
  };

  const handleBack = () => setStep("details");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 flex justify-center items-center bg-black/60 z-50 px-4"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-fit max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {step === "details" ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              <CertDownloadFormStep1
                onClose={onClose}
                onOtpSent={handleOtpSent}
                savedDetails={userDetails}
              />
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              <CertDownloadFormStep2
                userDetails={userDetails}
                onClose={onClose}
                onBack={handleBack}
                onTokenUpdate={(t) => {
                  allTokensRef.current = t;
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
