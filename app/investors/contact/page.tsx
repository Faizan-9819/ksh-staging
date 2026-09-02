import Hero from "@/components/AifComponents/Contact/Hero";
import Intro from "@/components/AifComponents/Contact/Intro";
import OtherEnquiries from "@/components/AifComponents/Contact/OtherEnquiries";

export default function AifContactPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Hero />

      <main className="flex-1">
        <Intro />
        <OtherEnquiries />
      </main>
    </div>
  );
}
