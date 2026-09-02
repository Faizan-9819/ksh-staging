"use client";
import ParkMapCard from "../../Components/parkComponents/ParkMapCard";

const items = [
  {
    id: 1,
    title: "Pune International Airport",
    km: 37,
    icon: "/ParkPage/mapicons/apl.svg",
  },
  {
    id: 2,
    title: "Mumbai International Airport",
    km: 148,
    icon: "/ParkPage/mapicons/apl.svg",
  },
  { id: 3, title: "Seaport", km: 148, icon: "/ParkPage/mapicons/ship.svg" },
  {
    id: 4,
    title: "National Highways",
    km: 110,
    icon: "/ParkPage/mapicons/road.svg",
  },
  { id: 5, title: "City Center", km: 33, icon: "/ParkPage/mapicons/clock.svg" },
];

const staticItem = {
  id: "coordinates",
  title: "View on Map",
  value: "18.781965, 73.795441",
  icon: "/ParkPage/mapicons/road.svg",
  mapUrl:
    "https://www.google.com/maps/place/KSH+Infra+Chakan+Industrial+Park+3/@18.7805491,73.7975716,15.15z/data=!4m6!3m5!1s0x3bc2b501e48b0589:0x4515b5fdacda6de4!8m2!3d18.7870954!4d73.7935248!16s%2Fg%2F11s4szhnh9?hl=en&entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D",
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
