import Footer from "@/components/sections/Footer";
// import AifNavbar from "@/components/ui/AifNavbar";
import Navbar from "@/components/ui/Navbar";

export default function AifLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <AifNavbar /> */}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
