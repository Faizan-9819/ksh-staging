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
  parkScrollContent,
  heroContent,
} from "@/parkpagecontent/chakan-3/content";

export const metadata = {
  title:
    "KSH Chakan III Industrial Park and Warehouse in Pune Seamlessly Connected to Chakan Industrial Area",
  description:
    "KSH Chakan III provides industrial park and warehouse in Pune with custom solutions, modern infrastructure, and strategic connectivity to industrial area in Chakan.",
};

export default function Page() {
  const chakan3Schema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": "https://www.kshinfra.com/ksh-chakan-iii#place",
    name: "KSH Chakan Park III",
    url: "https://www.kshinfra.com/ksh-chakan-iii",
    description:
      "KSH Chakan Park III is a sustainable Grade A Industrial & Logistics park located in Chakan, Pune, offering eco-conscious design, strategic connectivity, and scalable infrastructure for modern industries.",
    address: "Village- Varale, Tal- Khed, Pune, Maharashtra 410501",
    latitude: "18.736086",
    longitude: "73.837652",
    image: "https://www.kshinfra.com/ParkPage/chakan-3/ch3spot.jpg",
    telephone: "18002122030",
  };

  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chakan3Schema) }}
      />

      <VideoHeroSection
        content={heroContent}
        enhancedMobileLayout
        imageSrc="/ParkPage/chakan-3/ch3spot.jpg"
        mobileImageSrc="/ParkPage/chakan-3/ch3spotmob.jpg"
        brochureUrl="/brochure/ksh-chakan-iii.pdf"
        parkName={heroContent.title}
        exitNote="*Nearing Completion in December 2026."
        apiEndpoint="/api/chakan-iii-brochure"
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
          brochureUrl: "/brochure/ksh-chakan-iii.pdf",
          parkName: heroContent.title,
        }}
      />
      <ParkAbout content={parkAboutContent} />
      <LocationOverviewSection content={locationOverviewContent} />
      <InteractiveMapSection
        content={interactiveMapContent}
        enhancedMobileLayout
      />
      <ParkScroll content={parkScrollContent} />
      <ExteriorInteriorWrapper />
      <ConcavePanoramaSlider
        content={galleryContent}
        hideOnMobile
        enablePopup
      />
      <GallerySlider content={galleryContent} />
      <InsightsSection content={insightsContent} />
    </main>
  );
}
