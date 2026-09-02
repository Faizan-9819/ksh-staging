// import ParkinSpot from "./componentsf/ParkinSpot";
// import TabMenu from "./componentsf/TabsMenu";
// import ParkOverview from "./componentsf/ParkOverview";
// import ParkInfo from "./componentsf/ParkInfo";
// import LastSw from "./componentsf/LastSw";
// import MapSection from "./componentsf/MapSection";
// import CharSlide from "./componentsf/CharSlide";
// import PhVdslider from "./componentsf/PhVdslider";
// import CharAcc from "../ksh-chakan-i/componentsf/CharAcc";
// import PDTab from "../Components/PDTab";
// // import ParkInfra from "../ksh-chakan-i/componentsf/ParkInfra";

// export const metadata = {
//   title: "Grade A Industrial & Warehouse in Chakan II, Pune - Maharashtra",
//   description:
//     "Discover Chakan Park II, a future-ready and sustainable industrial park in Pune, Maharashtra. With EDGE certification, it offers ergonomic design, cost savings, and easy access to key transportation hubs.",
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

// app/ksh-chakan-ii/page.jsx

import ParkinSpot from "./componentsf/ParkinSpot";
import TabMenu from "./componentsf/TabsMenu";
import ParkInfo from "./componentsf/ParkInfo";
import LastSw from "./componentsf/LastSw";
import MapSection from "./componentsf/MapSection";
import PhVdslider from "./componentsf/PhVdslider";
import CharAcc from "../ksh-chakan-i/componentsf/CharAcc";
import PDTab from "../Components/PDTab";

export const metadata = {
  title: "Grade A Industrial & Warehouse in Chakan II, Pune - Maharashtra",
  description:
    "Discover Chakan Park II, a future-ready and sustainable industrial park in Pune, Maharashtra. With EDGE certification, it offers ergonomic design, cost savings, and easy access to key transportation hubs.",
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
  const chakan2Schema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": "https://www.kshinfra.com/ksh-chakan-ii#place",
    name: "KSH Chakan Park II",
    url: "https://www.kshinfra.com/ksh-chakan-ii",
    description:
      "Discover Chakan Park II, a future-ready and sustainable industrial park in Pune, Maharashtra. With EDGE certification, it offers ergonomic design, cost savings, and easy access to key transportation hubs.",
    address:
      "Plot No. P-5 Phase II Chakan MIDC Post Khalumbre, Khed taluka, Maharashtra",
    image: "https://www.kshinfra.com/ParkPage/chakan-2/ch2spot.png",
    latitude: "18.7223",
    longitude: "73.8482",
    telephone: "02066083500",
  };

  return (
    <>
      {/* Server-rendered JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chakan2Schema) }}
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
