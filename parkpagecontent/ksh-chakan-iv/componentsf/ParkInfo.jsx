"use client";
import ParkInfoBase from "../../Components/parkComponents/ParkInfoBase";
const stats = [
  { value: "0.36 MN SQ. FT.", label: "Total <br/>  Area" },
  { value: "02", label: "Total<br/>Buildings" },
  { value: "Chakan,<br/>Pune", label: "Park<br/>Location" },
];
const ParkInfo = () => <ParkInfoBase stats={stats} imageSrc="/ParkPage/chakan-4/ch4sp.png" />;
export default ParkInfo;
