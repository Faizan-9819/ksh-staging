"use client";
import ParkInfoBase from "../../Components/parkComponents/ParkInfoBase";
const stats = [
  { value: "1.20 MN SQ. FT.", label: "Total <br/> Area" },
  { value: "05", label: "Total<br/>Buildings" },
  { value: "Chakan,<br/>Pune", label: "Park<br/>Location" },
];
const ParkInfo = () => <ParkInfoBase stats={stats} imageSrc="/ParkPage/chakan-2/c2sp.png" note="*Successfully exited to Mapletree in 2022" />;
export default ParkInfo;
