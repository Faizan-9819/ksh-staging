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
  value: "12.59930742917555, 77.9513241885427",
  icon: "/ParkPage/mapicons/road.svg",
  mapUrl:
    "https://www.google.com/maps/place/KSH+Hosur+Park+I/@12.6014382,77.9487385,17z/data=!3m1!4b1!4m6!3m5!1s0x3badd5005bf8ec2d:0x6fc352b9c63e655e!8m2!3d12.6014382!4d77.9513134!16s%2Fg%2F11x73dxj8h?entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D",
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
