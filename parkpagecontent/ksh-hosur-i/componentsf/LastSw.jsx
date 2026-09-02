"use client";

import ParkLastSw from "../../Components/parkComponents/LastSw";

const cardData = [
  {
    parkTitle: "KSH Hosur Park I",
    pLocal: "Hosur | Bengaluru",
    totalLand: "1.26 MN SQ.FT.",
    buildings: "04 Buildings",
    pImg: "/ParkPage/hosur-1/hosurlw.png",
    pLink: "/ksh-hosur-i",
  },
  {
    parkTitle: "KSH Chennai Park I",
    pLocal: "Sriperumbudur | Chennai",
    totalLand: "1.60 MN SQ.FT.",
    buildings: "04 Buildings",
    pImg: "/south/chpi.webp",
    pLink: "/ksh-chennai-i",
  },
  {
    parkTitle: "KSH Chakan Park IV",
    pLocal: "Chakan | Pune",
    totalLand: "0.36 MN SQ.FT.",
    buildings: "02 Buildings",
    pImg: "/ParkPage/chakan-4/ch4lw.png",
    pLink: "/ksh-chakan-iv",
  },
  {
    parkTitle: "KSH Chakan Park III",
    pLocal: "Chakan | Pune",
    totalLand: "1.50 MN SQ.FT.",
    buildings: "08 Buildings",
    pImg: "/ParkPage/chakan-3/ch3lw.png",
    pLink: "/ksh-chakan-iii",
  },
  {
    parkTitle: "KSH Chakan Park II",
    pLocal: "Chakan | Pune",
    totalLand: "1.20 MN SQ.FT.",
    buildings: "05 Buildings",
    pImg: "/ParkPage/chakan-2/ch2lw.png",
    pLink: "/ksh-chakan-ii",
  },
  {
    parkTitle: "KSH Chakan Park I",
    pLocal: "Chakan | Pune",
    totalLand: "0.85 MN SQ.FT.",
    buildings: "04 Buildings",
    pImg: "/ParkPage/chakan-1/ch1lw.png",
    pLink: "/ksh-chakan-i",
  },
  {
    parkTitle: "KSH Talegaon Park I",
    pLocal: "Talegaon | Pune",
    totalLand: "0.14 MN SQ.FT.",
    buildings: "02 Buildings",
    pImg: "/ParkPage/talegaon-i/tal1lw.png",
    pLink: "/ksh-talegaon-i",
  },
];

const LastSw = () => <ParkLastSw cardData={cardData} />;

export default LastSw;
