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
      <header>
        <Navbar />
      </header>
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
