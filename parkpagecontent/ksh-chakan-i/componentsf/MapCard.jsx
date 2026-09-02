"use client";
import ParkMapCard from "../../Components/parkComponents/ParkMapCard";
const items = [
  { id: 1, title: "Pune International Airport", km: 35, icon: "/ParkPage/mapicons/apl.svg" },
  { id: 2, title: "Mumbai International Airport", km: 142, icon: "/ParkPage/mapicons/apl.svg" },
  { id: 3, title: "Seaport", km: 141, icon: "/ParkPage/mapicons/ship.svg" },
  { id: 4, title: "National Highways", km: 103, icon: "/ParkPage/mapicons/road.svg" },
  { id: 5, title: "City Center", km: 28, icon: "/ParkPage/mapicons/clock.svg" },
];
const MapCard = ({ activeIndex, onSelectAirport }) => <ParkMapCard items={items} activeIndex={activeIndex} onSelectAirport={onSelectAirport} />;
export default MapCard;
