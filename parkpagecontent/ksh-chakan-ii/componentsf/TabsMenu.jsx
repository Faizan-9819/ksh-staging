"use client";
import ParkTabsMenu from "../../Components/parkComponents/ParkTabsMenu";
const tabs = [
  { title: "Overview", link: "#park-overview" },
  { title: "Park Highlights", link: "#park-highlight" },
  { title: "Location & Connectivity", link: "#location-connectivity" },
  { title: "Download Brochure", link: "/brochure/KSH-Infra-Chakan-Park-2-Brochure.pdf" },
];
const TabMenu = () => <ParkTabsMenu tabs={tabs} />;
export default TabMenu;
