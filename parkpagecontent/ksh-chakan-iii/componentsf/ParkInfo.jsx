"use client";
import ParkInfoBase from "../../Components/parkComponents/ParkInfoBase";
const stats = [
  { value: "1.50 MN SQ. FT.", label: "Total <br/> Area" },
  { value: "08", label: "Total<br/>Buildings" },
  { value: "Chakan,<br/>Pune", label: "Park<br/>Location" },
];
const ParkInfo = () => (
  <ParkInfoBase
    rootClassName="flex md:py-[84px] py-10 w-full justify-between items-center"
    stats={stats}
    imageSrc="/ParkPage/chakan-3/ch3sp.png"
    note="*Nearing Completion in December 2026"
  />
);
export default ParkInfo;
