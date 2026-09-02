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
} from "@/parkpagecontent/hosur-1/content";

export const metadata = {
  title: "KSH INFRA: Industrial & Warehouse Park in Hosur",
  description:
    "Discover KSH Hosur Warehouse Park, the first of KSH INFRA's industrial parks attracting global investors. Setting the benchmark for green industrial infrastructure.",
};

export default function Page() {
  const hosurSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": "https://www.kshinfra.com/ksh-hosur-i#place",
    name: "KSH Hosur Park I",
    url: "https://www.kshinfra.com/ksh-hosur-i",
    description:
      "Discover KSH Hosur Warehouse Park, the first of KSH INFRA's industrial parks attracting global investors. Setting the benchmark for green industrial infrastructure.",
    address: "JX22+G94, Shoolagiri, Tamil Nadu 635117",
    latitude: "12.723",
    longitude: "77.776",
    telephone: "+91-1800-212-2030",
  };

  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hosurSchema) }}
      />

      <VideoHeroSection
        content={heroContent}
        enhancedMobileLayout
        imageSrc="/ParkPage/hosur-1/hspot.jpg"
        mobileImageSrc="/ParkPage/hosur-1/hspotmob.jpg"
        brochureUrl="/brochure/ksh-hosur-i.pdf"
        parkName={heroContent.title}
        apiEndpoint="/api/hosur-brochure"
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
          brochureUrl: "/brochure/ksh-hosur-i.pdf",
          parkName: heroContent.title,
        }}
      />
      <ParkAbout content={parkAboutContent} />
      <LocationOverviewSection content={locationOverviewContent} />
      <InteractiveMapSection
        content={interactiveMapContent}
        enhancedMobileLayout
      />
      <ParkScroll
        content={parkScrollContent}
        svgImages={[
          "/ParkPage/hosur-1/imgs/hosur1.svg",
          "/ParkPage/hosur-1/imgs/hosur2.svg",
          "/ParkPage/hosur-1/imgs/hosur3.svg",
          "/ParkPage/hosur-1/imgs/hosur4.svg",
          "/ParkPage/hosur-1/imgs/hosur5.svg",
        ]}
      />
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
