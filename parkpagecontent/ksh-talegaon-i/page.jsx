// import ParkinSpot from "./componentsf/ParkinSpot";
// import TabMenu from "./componentsf/TabsMenu";
// import ParkOverview from "./componentsf/ParkOverview";
// import ParkInfo from "./componentsf/ParkInfo";
// import LastSw from "./componentsf/LastSw";
// import MapSection from "./componentsf/MapSection";
// // import CharSlide from "./componentsf/CharSlide";
// import PhVdslider from "./componentsf/PhVdslider";
// import ParkInfra from "../ksh-chakan-i/componentsf/ParkInfra";
// import PDTab from "../Components/PDTab";
// export const metadata = {
//   title:
//     "KSH Talegaon Premium Industrial and Logistics Park in Pune with Built-to-Suit Infrastructure",
//   description:
//     "KSH Talegaon is a premium industrial and logistics park in Pune, Maharashtra, offering scalable infrastructure, advanced connectivity, and customized Warehouse solutions",
// };
// const tabsData = [
//   {
//     title: "KSH INFRA Parks",
//     image: "/ParkPage/talegaon-i/tps.webp",
//     simage: "/ParkPage/kshpb.webp",
//   },
//   {
//     title: "Notable Industries",
//     image: "/ParkPage/talegaon-i/tis.webp",
//     simage: "/ParkPage/talegaon-i/tib.webp",
//   },
//   {
//     title: "Connectivity",
//     image: "/ParkPage/talegaon-i/tcs.webp",
//     simage: "/ParkPage/talegaon-i/tcb.webp",
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
//           para="Strategically located along the Mumbai–Pune National Highway, Talegaon is fast emerging as a key warehousing and logistics hub in Western India. KSH has established a strong presence at the heart of this industrial corridor, tapping into a thriving ecosystem of sectors including automotive, pharmaceuticals, chemicals, engineering, and food processing."
//           title="Talegaon: A Strategic Hub for Modern Industry"
//         />
//         <ParkInfo />
//         <MapSection />
//         {/* <ParkInfra /> */}
//         <PhVdslider />
//         <LastSw />
//       </div>
//     </>
//   );
// };

// export default page;

// app/ksh-talegaon-i/page.jsx

import ParkinSpot from "./componentsf/ParkinSpot";
import TabMenu from "./componentsf/TabsMenu";
import ParkInfo from "./componentsf/ParkInfo";
import LastSw from "./componentsf/LastSw";
import MapSection from "./componentsf/MapSection";
import PhVdslider from "./componentsf/PhVdslider";
import PDTab from "../Components/PDTab";

export const metadata = {
  title:
    "KSH Talegaon Premium Industrial and Logistics Park in Pune with Built-to-Suit Infrastructure",
  description:
    "KSH Talegaon is a premium industrial and logistics park in Pune, Maharashtra, offering scalable infrastructure, advanced connectivity, and customized Warehouse solutions",
};

const tabsData = [
  {
    title: "KSH INFRA Parks",
    image: "/ParkPage/talegaon-i/tps.webp",
    simage: "/ParkPage/kshpb.webp",
  },
  {
    title: "Notable Industries",
    image: "/ParkPage/talegaon-i/tis.webp",
    simage: "/ParkPage/talegaon-i/tib.webp",
  },
  {
    title: "Connectivity",
    image: "/ParkPage/talegaon-i/tcs.webp",
    simage: "/ParkPage/talegaon-i/tcb.webp",
  },
];

const page = () => {
  const talegaonSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": "https://www.kshinfra.com/ksh-talegaon-i#place",
    name: "KSH Talegaon Park I",
    url: "https://www.kshinfra.com/ksh-talegaon-i",
    description:
      "KSH Talegaon is a premium industrial and logistics park in Pune, Maharashtra, offering scalable infrastructure, advanced connectivity, and customized Warehouse solutions",
    address:
      "A-18, Talegaon Floriculture & Industrial Park, MIDC, TalegaonDabhade, NavlakhUmbre PO, Pune, Maharashtra 410507",
    latitude: "18.7223",
    longitude: "73.8482",
    telephone: "18001211880",
  };

  return (
    <>
      {/* Server-rendered JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(talegaonSchema) }}
      />

      <div className="bg-[#EEF0F3]">
        <ParkinSpot />
        <TabMenu />

        <PDTab
          bwidth={1140}
          tdata={tabsData}
          para="Strategically located along the Mumbai–Pune National Highway, Talegaon is fast emerging as a key warehousing and logistics hub in Western India. KSH INFRA has established a strong presence at the heart of this industrial corridor, tapping into a thriving ecosystem of sectors including automotive, pharmaceuticals, chemicals, engineering, and food processing."
          title="Talegaon: A Strategic Hub for Modern Industry"
        />

        <ParkInfo />
        <MapSection />
        <PhVdslider />
        <LastSw />
      </div>
    </>
  );
};

export default page;
