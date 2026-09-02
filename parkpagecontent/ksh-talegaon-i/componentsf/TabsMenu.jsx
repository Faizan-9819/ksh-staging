"use client";
import ParkTabsMenu from "../../Components/parkComponents/ParkTabsMenu";
const tabs = [
  { title: "Overview", link: "#park-overview" },
  { title: "Park Highlights", link: "#park-highlight" },
  { title: "Location & Connectivity", link: "#location-connectivity" },
  // { title: "Park Infrastructure", link: "#park-infrastructure" },
  {
    title: "Download Brochure",
    link: "/brochure/Talegaon_Park_1_Brochure.pdf",
  },
];
const TabMenu = () => <ParkTabsMenu tabs={tabs} />;
export default TabMenu;
