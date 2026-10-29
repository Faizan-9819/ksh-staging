import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { VideoModalProvider } from "@/components/ui/VideoModalContext";
import { NavbarVisibilityProvider } from "@/components/ui/NavbarVisibilityContext";
import { FormSubmitProvider } from "@/components/ui/FormSubmitContext";
import LenisProvider from "@/components/ui/LenisProvider";
import { PageTransitionProvider } from "@/components/ui/PageTransitionContext";
import PageLoader from "@/components/ui/PageLoader";
import VideoModal from "@/components/ui/VideoModal";
import GATracker from "@/components/ui/GATracker";
import SkipLink from "@/components/ui/SkipLink";
import { organizationSchema } from "@/lib/schema";

// Self-hosted via @fontsource (npm package assets, resolved at install time) —
// next/font/google fetches font files from Google's servers during `next
// build`, which silently falls back to a system font with no error if the
// build environment has no outbound network access. Local files sidestep
// that entirely.
const sora = localFont({
  src: [
    { path: "../node_modules/@fontsource/sora/files/sora-latin-100-normal.woff2", weight: "100", style: "normal" },
    { path: "../node_modules/@fontsource/sora/files/sora-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../node_modules/@fontsource/sora/files/sora-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../node_modules/@fontsource/sora/files/sora-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../node_modules/@fontsource/sora/files/sora-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../node_modules/@fontsource/sora/files/sora-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-sora",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "../node_modules/@fontsource/inter/files/inter-latin-100-normal.woff2", weight: "100", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-200-normal.woff2", weight: "200", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-800-normal.woff2", weight: "800", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-900-normal.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KSH INFRA — Inspiring Green Development",
  description:
    "From industrial parks to logistics hubs, KSH INFRA delivers high-quality infrastructure solutions built to accelerate.",
  metadataBase: new URL("https://www.kshinfra.com"),
  alternates: { canonical: "https://www.kshinfra.com/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased overflow-x-hidden ${sora.variable} ${inter.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <FormSubmitProvider>
          <VideoModalProvider>
            <NavbarVisibilityProvider>
              <LenisProvider>
                <PageTransitionProvider>
                  {children}
                  <PageLoader />
                </PageTransitionProvider>
              </LenisProvider>
            </NavbarVisibilityProvider>
            <VideoModal />
          </VideoModalProvider>
        </FormSubmitProvider>
        <GATracker />
        <GoogleAnalytics gaId="G-EJMNK3JR62" />
        <GoogleTagManager gtmId="GTM-NBGQVCX" />
      </body>
    </html>
  );
}
