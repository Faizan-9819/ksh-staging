"use client";
import ParkInfraBase from "../../Components/parkComponents/ParkInfraBase";
const exteriorVideos = [
  { id: 1, title: "Statistics", video: "/ParkPage/hosur-1/videos/exterior/stats.mp4" },
  { id: 2, title: "Building Names", video: "/ParkPage/hosur-1/videos/exterior/buildingnames.mp4" },
  { id: 3, title: "Roads", video: "/ParkPage/hosur-1/videos/exterior/roads.mp4" },
  { id: 4, title: "Truck Apron", video: "/ParkPage/hosur-1/videos/exterior/trap.mp4" },
];
const interiorVideos = [
  { id: 1, title: "Column To Column", video: "/ParkPage/hosur-1/videos/interior/ctc.mp4" },
  { id: 2, title: "Internal Facilities", video: "/ParkPage/hosur-1/videos/interior/intf.mp4" },
  { id: 3, title: "Internal Height", video: "/ParkPage/hosur-1/videos/interior/inth.mp4" },
];
const ParkInfra = () => <ParkInfraBase exteriorVideos={exteriorVideos} interiorVideos={interiorVideos} />;
export default ParkInfra;
