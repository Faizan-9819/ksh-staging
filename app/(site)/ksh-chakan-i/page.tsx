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
} from "@/parkpagecontent/chakan-1/content";

export const metadata = {
  title:
    "KSH Chakan I Premium Industrial Park in Pune with Custom Logistics and Warehouse Solutions",
  description:
    "KSH Chakan provides a premium industrial park in Pune with customizable infrastructure, scalable solutions, and seamless connectivity for businesses.",
};

export default function Page() {
  const chakanPlaceSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": "https://www.kshinfra.com/ksh-chakan-i#place",
    name: "KSH Chakan Park I",
    url: "https://www.kshinfra.com/ksh-chakan-i",
    description:
      "KSH Chakan Park I is a premier Industrial & Logistics park located in Pune, Maharashtra, offering Grade A infrastructure with sustainable design, strategic connectivity, and scalable facilities for manufacturing and warehousing operations.",
    address:
      "Gate no. 11/5, 11/4, 11/3 Chakan - Ambethan Road, Chakan, Biradvadi, Maharashtra 410501",
    latitude: "18.7602664",
    longitude: "73.8630346",
    image: "https://www.kshinfra.com/ParkPage/chakan-1/ch1spot.jpg",
    telephone: "02135256410",
  };

  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chakanPlaceSchema) }}
      />

      <VideoHeroSection
        content={heroContent}
        enhancedMobileLayout
        imageSrc="/ParkPage/chakan-1/ch1spot.jpg"
        mobileImageSrc="/ParkPage/chakan-1/ch1spotmob.jpg"
        parkName={heroContent.title}
        exitNote="*Successfully exited to Mapletree in 2021."
      />
      {/*  */}
      <TabNavSection
        content={{
          items: [
            { label: "Park Overview", target: "about" },
            { label: "Park Highlights", target: "location-overview" },
            { label: "Location & Connectivity", target: "interactive-map" },
            // { label: "Download Brochure", target: "", action: "brochure" },
          ],
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
        exitNote="*Successfully exited to Mapletree in 2021."
      />
      <GallerySlider content={galleryContent} />
      <InsightsSection content={insightsContent} />
    </main>
  );
}
