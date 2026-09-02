// import ParkinSpot from "./componentsf/ParkinSpot";
// import TabMenu from "./componentsf/TabsMenu";
// import ParkOverview from "./componentsf/ParkOverview";
// import ParkInfo from "./componentsf/ParkInfo";
// import LastSw from "./componentsf/LastSw";
// import CharSlide from "./componentsf/CharSlide";
// import PhVdslider from "./componentsf/PhVdslider";
// import MapSection from "./componentsf/MapSection";
// import MapCard from "./componentsf/MapCard";
// import CharAcc from "./componentsf/CharAcc";
// import PDTab from "../Components/PDTab";
// // import ParkInfra from "./componentsf/ParkInfra";
// // import MapSection from "./componentsf/MapSection";
// export const metadata = {
//   title:
//     "KSH Chakan I Premium Industrial Park in Pune with Custom Logistics and Warehouse Solutions",
//   description:
//     "KSH Chakan provides a premium industrial park in Pune with customizable infrastructure, scalable solutions, and seamless connectivity for businesses.",
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
//         <PhVdslider />
//         <LastSw />
//       </div>
//     </>
//   );
// };

// export default page;
// app/ksh-chakan-i/page.jsx

import ParkinSpot from "./componentsf/ParkinSpot";
import TabMenu from "./componentsf/TabsMenu";
import ParkInfo from "./componentsf/ParkInfo";
import LastSw from "./componentsf/LastSw";
import MapSection from "./componentsf/MapSection";
import PhVdslider from "./componentsf/PhVdslider";
import CharAcc from "./componentsf/CharAcc";
import PDTab from "../Components/PDTab";

export const metadata = {
  title:
    "KSH Chakan I Premium Industrial Park in Pune with Custom Logistics and Warehouse Solutions",
  description:
    "KSH Chakan provides a premium industrial park in Pune with customizable infrastructure, scalable solutions, and seamless connectivity for businesses.",
};

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
  const chakanPlaceSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": "https://www.kshinfra.com/ksh-chakan-i#place",
    name: "KSH Chakan Park I",
    url: "https://www.kshinfra.com/ksh-chakan-i",
    description:
      "KSH Chakan Park I is a premier industrial and logistics park located in Pune, Maharashtra, offering Grade A infrastructure with sustainable design, strategic connectivity, and scalable facilities for manufacturing and warehousing operations.",
    address:
      "Gate no. 11/5, 11/4, 11/3 Chakan - Ambethan Road, Chakan, Biradvadi, Maharashtra 410501",
    image: "https://www.kshinfra.com/ParkPage/chakan-1/ch1spot.webp",
    latitude: "18.7223",
    longitude: "73.8482",
    telephone: "02135256410",
  };

  return (
    <>
      {/* Server-rendered JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chakanPlaceSchema) }}
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
        <PhVdslider />
        <LastSw />
      </div>
    </>
  );
};

export default page;
