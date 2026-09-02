"use client";
import ParkMapCard from "../../Components/parkComponents/ParkMapCard";

const items = [
  {
    id: 1,
    title: "Bengaluru International Airport",
    km: 90,
    icon: "/ParkPage/mapicons/apl.svg",
  },
  {
    id: 2,
    title: "Chennai International Airport",
    km: 286,
    icon: "/ParkPage/mapicons/apl.svg",
  },
  {
    id: 3,
    title: "Chennai seaport",
    km: 300,
    icon: "/ParkPage/mapicons/ship.svg",
  },
  {
    id: 4,
    title: "National Highway",
    km: 30,
    icon: "/ParkPage/mapicons/road.svg",
  },
  {
    id: 5,
    title: "State Highway",
    km: 37,
    icon: "/ParkPage/mapicons/road.svg",
  },
];

const staticItem = {
  id: "coordinates",
  title: "View on Map",
  value: "12.906333, 79.803333",
  icon: "/ParkPage/mapicons/road.svg",
  mapUrl:
    "https://www.google.com/maps/place/KSH+Chennai+Park+I/@12.8777275,79.7864167,17.83z/data=!4m6!3m5!1s0x3a52e9001b4d7eb3:0xac7c813c2700dc3e!8m2!3d12.8782506!4d79.7867802!16s%2Fg%2F11z49xyk5q?hl=en&entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D",
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
