import ParkinSpot from "./componentsf/ParkinSpot";
import TabMenu from "./componentsf/TabsMenu";
import ParkInfo from "./componentsf/ParkInfo";
import LastSw from "./componentsf/LastSw";
import MapSection from "./componentsf/MapSection";
import PhVdslider from "./componentsf/PhVdslider";
import CharSlide from "./componentsf/CharSlide";
import ParkInfra from "./componentsf/ParkInfra";
import CharAcc from "./componentsf/CharAcc";
import PDTab from "../Components/PDTab";
import Link from "next/link";

export const metadata = {
  title: "KSH INFRA: Industrial & Warehouse Park in Chennai",
  description:
    "Discover KSH Chennai Park I, a Grade A industrial park in Sriperumbudur with strategic port-airport access and future-ready infrastructure.",
};

const tabsData = [
  {
    title: "Notable Industries",
    image: "/ParkPage/hosur-1/hisf.webp",
    simage: "/ParkPage/hosur-1/hibf.webp",
  },
  {
    title: "Connectivity",
    image: "/ParkPage/hosur-1/hcsf.webp",
    simage: "/ParkPage/hosur-1/hcbf.webp",
  },
];

const page = () => {
  const chennaiSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": "https://www.kshinfra.com/ksh-chennai-i#place",
    name: "KSH Chennai Park I",
    url: "https://www.kshinfra.com/ksh-chennai-i",
    description:
      "Discover KSH Chennai Park I, a Grade A industrial park in Sriperumbudur with strategic port-airport access and future-ready infrastructure.",
    address: "Sriperumbudur, Chennai, Tamil Nadu",
    telephone: "+91-1800-212-2030",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chennaiSchema) }}
      />

      <div className="bg-[#EEF0F3]">
        {/* <ParkinSpot />
        <TabMenu />

        <PDTab
          bwidth={838}
          tdata={tabsData}
          para="Sriperumbudur-Chennai has emerged as one of South India's most strategic industrial destinations. With direct access to ports, airport connectivity, and an established ecosystem for automotive, electronics, and engineering, the region supports high-volume manufacturing and export-led growth. KSH Chennai Park I offers compliant, scalable infrastructure designed for speed, efficiency, and long-term expansion."
          title="Chennai: The Next Industrial Powerhouse"
        />

        <ParkInfo />
        <MapSection />
        <CharAcc />
        <ParkInfra />
        <PhVdslider />
        <LastSw /> */}
        <div className="fix12 h-[60vh] lg:pt-0 pt-[100px] lg:h-screen flex flex-col justify-center items-center gap-5">
          <h1 className="text-[#092241] text-[32px] lg:text-[48px] fpt-500 leading-[105%]">
            Coming Soon
          </h1>
          <Link
            href="/"
            className="bg-[#E30613] w-fit flex items-center gap-2 whitespace-nowrap px-[21px] py-[14px] text-white rounded-3xl group"
          >
            <span>Return Home</span>
            <img
              className="rotate-45 group-hover:rotate-0 transition-all duration-300"
              src="/rightUpArrow.svg"
              alt="Arrow"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
