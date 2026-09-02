"use client";
import ParkInfoBase from "../../Components/parkComponents/ParkInfoBase";
const stats = [
  { value: "0.14 MN SQ. FT.", label: "Total <br/> Area" },
  { value: "02", label: "Total<br/>Buildings" },
  { value: "Talegaon,<br/>Pune", label: "Park<br/>Location" },
];
const ParkInfo = () => <ParkInfoBase stats={stats} imageSrc="/ParkPage/talegaon-i/talsp.png" />;
export default ParkInfo;
