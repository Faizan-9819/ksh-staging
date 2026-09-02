import Footer from "@/components/sections/Footer";
import Navbar from "@/components/ui/Navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full pt-safe-top">
        <Navbar />
      </div>
      {children}
      <Footer />
    </>
  );
}
