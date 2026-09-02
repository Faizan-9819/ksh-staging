"use client";
import ParkTabsMenu from "../../Components/parkComponents/ParkTabsMenu";
const tabs = [
  { title: "Overview", link: "#park-overview" },
  { title: "Park Highlights", link: "#park-highlight" },
  { title: "Location & Connectivity", link: "#location-connectivity" },
  // { title: "Park Infrastructure", link: "#park-infrastructure" },
  // { title: "Download Brochure", link: "/brochure/KSH_Hosur_Brochure_o1_v3.pdf" },
];
const TabMenu = () => <ParkTabsMenu tabs={tabs} />;
export default TabMenu;
