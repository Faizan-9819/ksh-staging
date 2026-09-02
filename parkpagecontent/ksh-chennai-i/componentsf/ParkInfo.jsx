"use client";
import ParkInfoBase from "../../Components/parkComponents/ParkInfoBase";

const stats = [
  { value: "1.60 MN SQ. FT.", label: "Total <br/> Area" },
  { value: "04", label: "Total<br/>Buildings" },
  { value: "Sriperumbudur,<br/>Chennai", label: "Park<br/>Location" },
];

const ParkInfo = () => (
  <ParkInfoBase
    stats={stats}
    imageSrc="/south/chpi.webp"
    valueColClassName="border-r w-1/2 md:w-[70%] border-[#B0B0B0] h-[60px] xl:h-[100px] flex items-center"
  />
);

export default ParkInfo;
