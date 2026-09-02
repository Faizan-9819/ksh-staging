import VideoHeroSection from "@/components/sections/parksections/VideoHeroSection";
import TabNavSection from "@/components/sections/parksections/TabNavSection";
import ParkAbout from "@/components/sections/parksections/ParkAbout";
import LocationOverviewSection from "@/components/sections/parksections/LocationOverviewSection";
import InfrastructureSection from "@/components/sections/parksections/InfrastructureSection";
import ConcavePanoramaSlider from "@/components/sections/parksections/ConcavePanoramaSlider";
import ParkScroll from "@/components/sections/parksections/ParkScroll";
import InsightsSection from "@/components/sections/parksections/InsightsSection";
import InteractiveMapSection from "@/components/sections/parksections/InteractiveMapClient";

export default function () {
  return (
    <main className="w-full">
      <VideoHeroSection />
      <TabNavSection />
      <ParkAbout />
      <LocationOverviewSection />
      <InteractiveMapSection />
      <ParkScroll />
      <InfrastructureSection />
      <ConcavePanoramaSlider />
      <InsightsSection />
    </main>
  );
}
