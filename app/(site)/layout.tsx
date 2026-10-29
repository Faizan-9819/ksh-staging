import Footer from "@/components/sections/Footer";
import Navbar from "@/components/ui/Navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="w-full pt-safe-top">
        <Navbar />
      </header>
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
