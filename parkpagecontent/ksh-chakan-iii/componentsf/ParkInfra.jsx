"use client";
import ParkInfraBase from "../../Components/parkComponents/ParkInfraBase";
const exteriorVideos = [
  { id: 1, title: "Building Area", video: "/ParkPage/chakan-3/videos/exterior/totalarea.mp4" },
  { id: 2, title: "Building Details", video: "/ParkPage/chakan-3/videos/exterior/buildingnames.mp4" },
  { id: 3, title: "Roads", video: "/ParkPage/chakan-3/videos/exterior/roads.mp4" },
  { id: 4, title: "Solar Roof", video: "/ParkPage/chakan-3/videos/exterior/sroof.mp4" },
  { id: 5, title: "Parking & Truck Apron", video: "/ParkPage/chakan-3/videos/exterior/tparkingapron.mp4" },
];
const interiorVideos = [
  { id: 1, title: "Flooring", video: "/ParkPage/chakan-3/videos/interior/flooring.mp4" },
  { id: 2, title: "Column To Column", video: "/ParkPage/chakan-3/videos/interior/ctc.mp4" },
  { id: 3, title: "Internal Facilities", video: "/ParkPage/chakan-3/videos/interior/intf.mp4" },
  { id: 4, title: "Internal Height", video: "/ParkPage/chakan-3/videos/interior/inth.mp4" },
];
const ParkInfra = () => <ParkInfraBase exteriorVideos={exteriorVideos} interiorVideos={interiorVideos} />;
export default ParkInfra;
