import type { Metadata } from "next";
import SolutionsCTA from "@/components/sections/solutions/SolutionsCTA";
import Hero from "@/components/sections/Testimonials/Hero";
import TestiScroll from "@/components/sections/Testimonials/TestiScroll";

export const metadata: Metadata = {
  title: "KSH INFRA Testimonials | Client Experiences & Partnerships",
  description:
    "Read client testimonials and experiences with KSH INFRA across Grade A Industrial & Logistics facilities, manufacturing projects and industrial parks.",
  alternates: { canonical: "https://www.kshinfra.com/testimonials" },
};

const page = () => {
  return (
    <div>
      <Hero />
      <TestiScroll />
      <SolutionsCTA />
    </div>
  );
};

export default page;
