import type { Metadata } from "next";
import ConnectWithUsSection from "@/components/sections/team/Connectus";
import TeamSection from "@/components/sections/team/memberssec";
import TeamSpot from "@/components/sections/team/ourteam";

export const metadata: Metadata = {
  title: "Our Team | KSH INFRA Experts Driving Industrial & Logistics Success",
  description:
    "Meet the KSH INFRA team driving industrial & logistics excellence with expertise, innovation, and sustainable growth across world-class projects.",
  alternates: { canonical: "https://www.kshinfra.com/our-team" },
};

const page = () => {
  return (
    <div>
      <TeamSpot />
      <TeamSection />
      {/* <ConnectWithUsSection /> */}
    </div>
  );
};

export default page;
