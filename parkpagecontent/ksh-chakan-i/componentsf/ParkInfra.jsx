"use client";
import ParkInfraBase from "../../Components/parkComponents/ParkInfraBase";
const exteriorVideos = [
  { id: 1, title: "Building Area", video: "/ParkPage/parkinfra/parkexterior/Building Area.mp4" },
  { id: 2, title: "Statistics", video: "/ParkPage/parkinfra/parkexterior/Statistics.mp4" },
  { id: 3, title: "Solar Roof", video: "/ParkPage/parkinfra/parkexterior/Building Roof.mp4" },
  { id: 4, title: "Truck Apron", video: "/ParkPage/parkinfra/parkexterior/Docking Apron.mp4" },
];
const interiorVideos = [
  { id: 1, title: "Flooring", video: "/ParkPage/parkinfra/parkinterior/Flooring.mp4" },
  { id: 2, title: "Column To Column", video: "/ParkPage/parkinfra/parkinterior/Column.mp4" },
  { id: 3, title: "Internal Facilities", video: "/ParkPage/parkinfra/parkinterior/Internal Facilities.mp4" },
  { id: 4, title: "Internal Height", video: "/ParkPage/parkinfra/parkinterior/Height.mp4" },
];
const ParkInfra = () => <ParkInfraBase exteriorVideos={exteriorVideos} interiorVideos={interiorVideos} />;
export default ParkInfra;
