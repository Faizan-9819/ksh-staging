"use client";
import ParkTabsMenu from "../../Components/parkComponents/ParkTabsMenu";
const tabs = [
  { id: 1, title: "Overview", link: "#park-overview" },
  { id: 2, title: "Park Highlights", link: "#park-highlight" },
  { id: 3, title: "Location & Connectivity", link: "#location-connectivity" },
];
const TabMenu = () => <ParkTabsMenu tabs={tabs} />;
export default TabMenu;
