"use client";
import ParkMapCard from "../../Components/parkComponents/ParkMapCard";

const items = [
  {
    id: 1,
    title: "Pune International Airport",
    km: 39,
    icon: "/ParkPage/mapicons/apl.svg",
  },
  {
    id: 2,
    title: "Mumbai International Airport",
    km: 143,
    icon: "/ParkPage/mapicons/apl.svg",
  },
  { id: 3, title: "Seaport", km: 141, icon: "/ParkPage/mapicons/ship.svg" },
  {
    id: 4,
    title: "National Highways",
    km: 103,
    icon: "/ParkPage/mapicons/road.svg",
  },
  { id: 5, title: "City Center", km: 33, icon: "/ParkPage/mapicons/clock.svg" },
];

const staticItem = {
  id: "coordinates",
  title: "View on Map",
  value: "18.772928, 73.749446",
  icon: "/ParkPage/mapicons/road.svg",
  mapUrl:
    "https://www.google.com/maps/place/KSH+INFRA+Chakan+Industrial+Park+4/@18.7728356,73.7478948,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b500280e43b1:0xaa7df7414683ae36!8m2!3d18.7728356!4d73.7504697!16s%2Fg%2F11ybdty61x?hl=en&entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D",
};

const MapCard = ({ activeIndex, onSelectAirport }) => (
  <ParkMapCard
    items={items}
    activeIndex={activeIndex}
    onSelectAirport={onSelectAirport}
    staticItem={staticItem}
  />
);

export default MapCard;
