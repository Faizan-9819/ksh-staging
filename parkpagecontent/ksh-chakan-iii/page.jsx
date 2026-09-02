// import ParkinSpot from "./componentsf/ParkinSpot";
// import TabMenu from "./componentsf/TabsMenu";
// import ParkOverview from "./componentsf/ParkOverview";
// import ParkInfo from "./componentsf/ParkInfo";
// import LastSw from "./componentsf/LastSw";
// import MapSection from "./componentsf/MapSection";
// import CharSlide from "./componentsf/CharSlide";
// import PhVdslider from "./componentsf/PhVdslider";
// import ParkInfra from "./componentsf/ParkInfra";
// import CharAcc from "../ksh-chakan-i/componentsf/CharAcc";
// import PDTab from "../Components/PDTab";

// export const metadata = {
//   title:
//     "KSH Chakan III Industrial Park and Warehouse in Pune Seamlessly Connected to Chakan Industrial Area",
//   description:
//     "KSH Chakan III provides industrial park and warehouse in Pune with custom solutions, modern infrastructure, and strategic connectivity to industrial area in Chakan.",
// };
// const tabsData = [
//   {
//     title: "KSH INFRA Parks",
//     image: "/ParkPage/chakan-1/cps.webp",
//     simage: "/ParkPage/kshpb.webp",
//   },
//   {
//     title: "Notable Industries",
//     image: "/ParkPage/chakan-1/chis.webp",
//     simage: "/ParkPage/chakan-1/chib.webp",
//   },
//   {
//     title: "Connectivity",
//     image: "/ParkPage/chakan-1/ccs.webp",
//     simage: "/ParkPage/chakan-1/ccb.webp",
//   },
// ];
// const page = () => {
//   return (
//     <>
//       <div className="bg-[#EEF0F3]">
//         <ParkinSpot />
//         <TabMenu />
//         {/* <ParkOverview /> */}

//         <PDTab
//           bwidth={1140}
//           tdata={tabsData}
//           para="Chakan, located near Pune, is one of India’s fastest-growing integrated industrial zones, strategically developed by MIDC as a key manufacturing and logistics corridor. Home to global automotive giants like Volkswagen, Mahindra & Mahindra, Bridgestone, Bajaj Auto, and Mercedes Benz, it offers ready infrastructure, robust connectivity, and a growing talent pool. With metro connectivity and rapid social infrastructure underway, Chakan is set to become a benchmark for modern industrial development. KSH INFRA’s parks in Chakan further reinforce its position as a central hub driving India’s industrial growth."
//           title="Chakan: A Thriving Industrial Hub in Pune"
//         />
//         <ParkInfo />
//         <MapSection />
//         {/* <CharSlide /> */}
//         <CharAcc />
//         <ParkInfra />
//         <PhVdslider />
//         <LastSw />
//       </div>
//     </>
//   );
// };

// export default page;

// app/ksh-chakan-iii/page.jsx

import ParkinSpot from "./componentsf/ParkinSpot";
import TabMenu from "./componentsf/TabsMenu";
import ParkInfo from "./componentsf/ParkInfo";
import LastSw from "./componentsf/LastSw";
import MapSection from "./componentsf/MapSection";
import PhVdslider from "./componentsf/PhVdslider";
import ParkInfra from "./componentsf/ParkInfra";
import CharAcc from "../ksh-chakan-i/componentsf/CharAcc";
import PDTab from "../Components/PDTab";

export const metadata = {
  title:
    "KSH Chakan III Industrial Park and Warehouse in Pune Seamlessly Connected to Chakan Industrial Area",
  description:
    "KSH Chakan III provides industrial park and warehouse in Pune with custom solutions, modern infrastructure, and strategic connectivity to industrial area in Chakan.",
};
//
const tabsData = [
  {
    title: "KSH INFRA Parks",
    image: "/ParkPage/chakan-1/cps.webp",
    simage: "/ParkPage/kshpb.webp",
  },
  {
    title: "Notable Industries",
    image: "/ParkPage/chakan-1/chis.webp",
    simage: "/ParkPage/chakan-1/chib.webp",
  },
  {
    title: "Connectivity",
    image: "/ParkPage/chakan-1/ccs.webp",
    simage: "/ParkPage/chakan-1/ccb.webp",
  },
];

const page = () => {
  const chakan3Schema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": "https://www.kshinfra.com/ksh-chakan-iii#place",
    name: "KSH Chakan Park III",
    url: "https://www.kshinfra.com/ksh-chakan-iii",
    description:
      "KSH Chakan Park III is a sustainable Grade A industrial and logistics park located in Chakan, Pune, offering eco-conscious design, strategic connectivity, and scalable infrastructure for modern industries.",
    address: "Village- Varale, Tal- Khed, Pune, Maharashtra 410501",
    latitude: "18.7223",
    longitude: "73.8482",
    telephone: "18002122030",
  };

  return (
    <>
      {/* Server-rendered JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chakan3Schema) }}
      />

      <div className="bg-[#EEF0F3]">
        <ParkinSpot />
        <TabMenu />

        <PDTab
          bwidth={1140}
          tdata={tabsData}
          para="Chakan, located near Pune, is one of India’s fastest-growing integrated industrial zones, strategically developed by MIDC as a key manufacturing and logistics corridor. Home to global automotive giants like Volkswagen, Mahindra & Mahindra, Bridgestone, Bajaj Auto, and Mercedes Benz, it offers ready infrastructure, robust connectivity, and a growing talent pool. With metro connectivity and rapid social infrastructure underway, Chakan is set to become a benchmark for modern industrial development. KSH INFRA’s parks in Chakan further reinforce its position as a central hub driving India’s industrial growth."
          title="Chakan: A Thriving Industrial Hub in Pune"
        />

        <ParkInfo />
        <MapSection />
        <CharAcc />
        <ParkInfra />
        <PhVdslider />
        <LastSw />
      </div>
    </>
  );
};

export default page;
