"use client";
import ParkInfoBase from "../../Components/parkComponents/ParkInfoBase";
const stats = [
  { value: "0.85 MN SQ. FT.", label: "Total <br/> Area" },
  { value: "04", label: "Total<br/>Buildings" },
  { value: "Chakan,<br/>Pune", label: "Park<br/>Location" },
];
const ParkInfo = () => <ParkInfoBase stats={stats} imageSrc="/ParkPage/chakan-1/chakan1sp.png" note="*Successfully exited to Mapletree in 2021" />;
export default ParkInfo;
