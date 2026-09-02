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
} from "@/parkpagecontent/chakan-2/content";

export const metadata = {
  title: "Grade A Industrial & Warehouse in Chakan II, Pune - Maharashtra",
  description:
    "Discover Chakan Park II, a future-ready and sustainable industrial park in Pune, Maharashtra. With EDGE certification, it offers ergonomic design, cost savings, and easy access to key transportation hubs.",
};

export default function Page() {
  const chakan2Schema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": "https://www.kshinfra.com/ksh-chakan-ii#place",
    name: "KSH Chakan Park II",
    url: "https://www.kshinfra.com/ksh-chakan-ii",
    description:
      "Discover Chakan Park II, a future-ready and sustainable industrial park in Pune, Maharashtra. With EDGE certification, it offers ergonomic design, cost savings, and easy access to key transportation hubs.",
    address:
      "Plot No. P-5 Phase II Chakan MIDC Post Khalumbre, Khed taluka, Maharashtra",
    latitude: "18.736086",
    longitude: "73.837652",
    image: "https://www.kshinfra.com/ParkPage/chakan-2/ch2spot.jpg",
    telephone: "02066083500",
  };

  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chakan2Schema) }}
      />

      <VideoHeroSection
        content={heroContent}
        enhancedMobileLayout
        imageSrc="/ParkPage/chakan-2/ch2spot.jpg"
        mobileImageSrc="/ParkPage/chakan-2/ch2spotmob.jpg"
        brochureUrl="/brochure/ksh-chakan-ii.pdf"
        parkName={heroContent.title}
        exitNote="*Successfully exited to Mapletree in 2022."
        apiEndpoint="/api/chakan-ii-brochure"
      />
      <TabNavSection
        content={{
          items: [
            { label: "Park Overview", target: "about" },
            { label: "Park Highlights", target: "location-overview" },
            { label: "Location & Connectivity", target: "interactive-map" },
            // { label: "Download Certificate", target: "", action: "certificate" },
          ],
          brochureUrl: "/brochure/ksh-chakan-ii.pdf",
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
        exitNote="*Successfully exited to Mapletree in 2022."
      />
      <GallerySlider content={galleryContent} />
      <InsightsSection content={insightsContent} />
    </main>
  );
}
