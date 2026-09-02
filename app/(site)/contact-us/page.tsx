import type { Metadata } from "next";
import { Suspense } from "react";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import ConnectWithUsSection from "@/components/sections/contact/ConnectWithUsSectionClient";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title:
    "Contact KSH INFRA Industrial & Logistics Park,Warehouse Solutions and Infrastructure Development in India",
  description:
    "Connect with KSH INFRA for expert guidance on industrial and logistics park solutions, infrastructure development, and project collaboration in India.",
  alternates: { canonical: "https://www.kshinfra.com/contact-us" },
};

export default function ContactPage() {
  return (
    <main
      className="min-h-screen bg-white"
      style={{
        // Match the fluid margin formula used across your main hero component
        // @ts-ignore
        "--margin": "clamp(16px, 5.7vw, 80px)",
      }}
    >
      <ContactHero />
      <Suspense fallback={null}>
        <ContactFormSection />
      </Suspense>
      <ConnectWithUsSection />
      {/* <Footer /> */}
    </main>
  );
}