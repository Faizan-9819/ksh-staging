import VideoHeroSection from "@/components/sections/parksections/VideoHeroSection";
import TabNavSection from "@/components/sections/parksections/TabNavSection";
import ParkAbout from "@/components/sections/parksections/ParkAbout";
import LocationOverviewSection from "@/components/sections/parksections/LocationOverviewSection";
import ExteriorInteriorWrapper from "@/components/park2/ExteriorInteriorWrapper";
import ConcavePanoramaSlider from "@/components/sections/parksections/ConcavePanoramaSlider";
import GallerySlider from "@/components/sections/parksections/GallerySlider";
import InsightsSection from "@/components/sections/parksections/InsightsSection";
import InteractiveMapSection from "@/components/sections/parksections/InteractiveMapClient";
import {
  interactiveMapContent,
  insightsContent,
  galleryContent,
  parkAboutContent,
  locationOverviewContent,
  heroContent,
} from "@/parkpagecontent/talegaon-i/content";

export const metadata = {
  title:
    "KSH Talegaon Premium Industrial & Logistics Park in Pune with Built-to-Suit Infrastructure",
  description:
    "KSH Talegaon is a premium Industrial & Logistics park in Pune, Maharashtra, offering scalable infrastructure, advanced connectivity, and customized Warehouse solutions",
};

export default function Page() {
  const talegaonSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": "https://www.kshinfra.com/ksh-talegaon-i#place",
    name: "KSH Talegaon Park I",
    url: "https://www.kshinfra.com/ksh-talegaon-i",
    description:
      "KSH Talegaon is a premium Industrial & Logistics park in Pune, Maharashtra, offering scalable infrastructure, advanced connectivity, and customized Warehouse solutions",
    address:
      "A-18, Talegaon Floriculture & Industrial Park, MIDC, TalegaonDabhade, NavlakhUmbre PO, Pune, Maharashtra 410507",
    latitude: "18.732103",
    longitude: "73.676376",
    image: "https://www.kshinfra.com/ParkPage/talegaon-i/t1spot.jpg",
    telephone: "18001211880",
  };

  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(talegaonSchema) }}
      />

      <VideoHeroSection
        content={heroContent}
        enhancedMobileLayout
        imageSrc="/ParkPage/talegaon-i/t1spot.jpg"
        mobileImageSrc="/ParkPage/talegaon-i/tspotmob.jpg"
        brochureUrl="/brochure/ksh-talegaon-i.pdf"
        parkName={heroContent.title}
        exitNote='*Successfully exited to "Mapletree" in 2021.'
        apiEndpoint="/api/talegaon-i-brochure"
      />
      <TabNavSection
        content={{
          items: [
            { label: "Park Overview", target: "about" },
            { label: "Park Highlights", target: "location-overview" },
            { label: "Location & Connectivity", target: "interactive-map" },
            // { label: "Download Certificate", target: "", action: "certificate" },
          ],
          brochureUrl: "/brochure/ksh-talegaon-i.pdf",
          parkName: heroContent.title,
        }}
      />
      <ParkAbout content={parkAboutContent} />
      <LocationOverviewSection content={locationOverviewContent} />
      <InteractiveMapSection
        content={interactiveMapContent}
        enhancedMobileLayout
      />
      <ExteriorInteriorWrapper />
      <ConcavePanoramaSlider
        content={galleryContent}
        hideOnMobile
        enablePopup
        exitNote='*Successfully exited to "Mapletree" in 2021.'
      />
      <GallerySlider content={galleryContent} />
      <InsightsSection content={insightsContent} />
    </main>
  );
}
