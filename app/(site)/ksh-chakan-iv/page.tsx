import VideoHeroSection from "@/components/sections/parksections/VideoHeroSection";
import TabNavSection from "@/components/sections/parksections/TabNavSection";
import ParkAbout from "@/components/sections/parksections/ParkAbout";
import LocationOverviewSection from "@/components/sections/parksections/LocationOverviewSection";
import ExteriorInteriorWrapper from "@/components/park2/ExteriorInteriorWrapper";
import ConcavePanoramaSlider from "@/components/sections/parksections/ConcavePanoramaSlider";
import GallerySlider from "@/components/sections/parksections/GallerySlider";
import ParkScroll from "@/components/sections/parksections/ParkScroll";
import InsightsSection from "@/components/sections/parksections/InsightsSection";
import InteractiveMapSection from "@/components/sections/parksections/InteractiveMapClient";
import {
  interactiveMapContent,
  insightsContent,
  galleryContent,
  parkAboutContent,
  locationOverviewContent,
  heroContent,
} from "@/parkpagecontent/chakan-4/content";

export const metadata = {
  title:
    "KSH Chakan IV Industrial Parks Solutions in Pune offering Plug and Play Industrial Park and Grade A Infrastructure Facilities",
  description:
    "KSH Chakan IV offers Grade A industrial parks in Chakan with modern infrastructure, built-to-suit warehouses, and strategic connectivity near Pune.",
  alternates: { canonical: "https://www.kshinfra.com/ksh-chakan-iv" },
};

export default function Page() {
  const chakan4Schema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": "https://www.kshinfra.com/ksh-chakan-iv#place",
    name: "KSH Chakan Park IV",
    url: "https://www.kshinfra.com/ksh-chakan-iv",
    description:
      "KSH Chakan IV offers Grade A industrial parks in Chakan with modern infrastructure, built-to-suit warehouses, and strategic connectivity near Pune.",
    address: "Shinde Rd, Industrial Area, Chakan, Pune, Maharashtra 410501",
    latitude: "18.736086",
    longitude: "73.837652",
    image: "https://www.kshinfra.com/NewHeaderParks/chakan_4_desktop_header.webp",
    telephone: "18002122030",
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chakan4Schema) }}
      />

      <VideoHeroSection
        content={heroContent}
        enhancedMobileLayout
        imageSrc="/ParkPage/chakan-4/heroCh4/NewChakan4Spot.webp"
        mobileImageSrc="/ParkPage/chakan-4/heroCh4/chakan_4_mobile_New.webp"
        brochureUrl="/brochure/ksh-chakan-iv.pdf"
        parkName="KSH Chakan Park IV"
        apiEndpoint="/api/chakan-iv-brochure"
      />
      <TabNavSection
        content={{
          items: [
            { label: "Park Overview", target: "about" },
            { label: "Park Highlights", target: "location-overview" },
            { label: "Location & Connectivity", target: "interactive-map" },
            { label: "Park Infrastructure", target: "park-infrastructure" },
            // { label: "Download Certificate", target: "", action: "certificate" },
          ],
          brochureUrl: "/brochure/ksh-chakan-iv.pdf",
          parkName: "KSH Chakan Park IV",
        }}
      />
      <ParkAbout content={parkAboutContent} />
      <LocationOverviewSection content={locationOverviewContent} />
      <InteractiveMapSection
        content={interactiveMapContent}
        enhancedMobileLayout
      />
      <ParkScroll />
      <ExteriorInteriorWrapper />
      <ConcavePanoramaSlider
        content={galleryContent}
        hideOnMobile
        enablePopup
      />
      <GallerySlider content={galleryContent} />
      <InsightsSection content={insightsContent} />
    </div>
  );
}
