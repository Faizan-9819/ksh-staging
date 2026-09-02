"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { useFormSubmit } from "@/components/ui/FormSubmitContext";
import { usePageTransition } from "@/components/ui/PageTransitionContext";
import Btn from "@/components/ui/Btn";

export default function ThankYouPage() {
  const router = useRouter();
  const { navigate } = usePageTransition();
  const { syncAccess, revokeAccess } = useFormSubmit();

  useEffect(() => {
    const allowed = syncAccess();
    if (!allowed) {
      router.replace("/");
    }

    const handleBeforeUnload = () => revokeAccess();
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      revokeAccess();
    };
  }, [router, syncAccess, revokeAccess]);

  const goHome = () => {
    revokeAccess();
    navigate("/");
  };

  return (
    <div className="w-full">
      <div className="fix flex flex-col gap-5 justify-center items-center xl:h-[calc(100vh-100px)] h-[calc(100vh-65px)] text-center">
        <CircleCheck color="#59624D" size={124} />

        <h1 className="font-sora font-semibold text-[28px] sm:text-[40px] lg:text-[52px] text-[#212121] leading-[1.1]">
          Thank you for your submission!
        </h1>

        <p className="font-sora text-base sm:text-lg text-[#868686] max-w-2xl">
          Our team will review it and get back to you shortly.
        </p>

        <Btn
          label="Return Home"
          onClick={goHome}
          filled
          bgColor="bg-[#59624D]!"
          hoverBgColor="bg-[#4a5240]!"
          textColor="text-white!"
          hoverTextColor="text-white!"
          arrowColor="stroke-white"
          hoverArrowColor="stroke-white"
          fontWeight="font-normal!"
          className="border-none!"
        />
      </div>
    </div>
  );
}
