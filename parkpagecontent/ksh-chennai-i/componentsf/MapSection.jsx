"use client";
// "use client";
// import React, { useState } from "react";
// import MapCard from "./MapCard";
// import MapSlider from "./MapSlider";
// import LineHead from "../../Components/Heading/LineHead";

// const MapSection = () => {
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const iframeUrls = [
//     "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d241926.82499569946!2d73.77953200000002!3d18.65921!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b37fe3960f95%3A0xf334e85aa9f4da16!2sKSH%20Infra%20Talegaon%20Industrial%20Park%201%2C%20Plot%20No.%20P12%2C%20Talegaon%20Floriculture%20%26%20Industrial%20Park%2C%20MIDC%20Talegaon%20Village%20Navlakh%20Umbre%2C%20Tal%2C%20Dist%2C%20Maval%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7695076!2d73.6884312!4m5!1s0x3bc2c134e6c4ff8f%3A0xa810745cf9310798!2sPune%20International%20Airport%2C%20New%20Airport%20Rd%2C%20Pune%20International%20Airport%20Area%2C%20Lohegaon%2C%20Pune%2C%20Maharashtra%20411032!3m2!1d18.579342999999998!2d73.9089168!5e0!3m2!1sen!2sin!4v1744265078800!5m2!1sen!2sin",
//     "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d966322.9434910386!2d73.265938!3d18.90043!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b37fe3960f95%3A0xf334e85aa9f4da16!2sKSH%20Infra%20Talegaon%20Industrial%20Park%201%2C%20Plot%20No.%20P12%2C%20Talegaon%20Floriculture%20%26%20Industrial%20Park%2C%20MIDC%20Talegaon%20Village%20Navlakh%20Umbre%2C%20Tal%2C%20Dist%2C%20Maval%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7695076!2d73.6884312!4m5!1s0x3be7c85099bd2947%3A0x1ecc1a60c474a8ae!2sChhatrapati%20Shivaji%20Maharaj%20International%20Airport%20Mumbai%2C%20Mumbai%2C%20Maharashtra%20400099!3m2!1d19.0902177!2d72.86281199999999!5e0!3m2!1sen!2sin!4v1744265099266!5m2!1sen!2sin",
//     "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d966598.0809654563!2d73.264536!3d18.852725!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b37fe3960f95%3A0xf334e85aa9f4da16!2sKSH%20Infra%20Talegaon%20Industrial%20Park%201%2C%20Plot%20No.%20P12%2C%20Talegaon%20Floriculture%20%26%20Industrial%20Park%2C%20MIDC%20Talegaon%20Village%20Navlakh%20Umbre%2C%20Tal%2C%20Dist%2C%20Maval%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7695076!2d73.6884312!4m5!1s0x3be7ce299e2b5e8b%3A0x5655b08ab6f01561!2sMumbai%20Port%20Trust%2C%20Mazgaon%2C%20Mumbai%2C%20Maharashtra!3m2!1d18.9482881!2d72.8441629!5e0!3m2!1sen!2sin!4v1744265123235!5m2!1sen!2sin",
//     "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d483326.09659745794!2d73.387967!3d18.843329!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b37fe3960f95%3A0xf334e85aa9f4da16!2sKSH%20Infra%20Talegaon%20Industrial%20Park%201%2C%20Plot%20No.%20P12%2C%20Talegaon%20Floriculture%20%26%20Industrial%20Park%2C%20MIDC%20Talegaon%20Village%20Navlakh%20Umbre%2C%20Tal%2C%20Dist%2C%20Maval%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7695076!2d73.6884312!4m5!1s0x3be7c2a7865b0105%3A0xff03de4c645d7a0c!2sNational%20Highways%20Authority%20of%20India%20PIU-Panvel%2C%20Survey%20No-63%2C%20Chinchpada-Kalamboli%20Bypass%20Road%2C%20Panvel%2C%20Maharashtra%20410206!3m2!1d18.9806882!2d73.08750599999999!5e0!3m2!1sen!2sin!4v1744265164589!5m2!1sen!2sin",
//     "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d241941.4461710328!2d73.764676!3d18.648953!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b37fe3960f95%3A0xf334e85aa9f4da16!2sKSH%20Infra%20Talegaon%20Industrial%20Park%201%2C%20Plot%20No.%20P12%2C%20Talegaon%20Floriculture%20%26%20Industrial%20Park%2C%20MIDC%20Talegaon%20Village%20Navlakh%20Umbre%2C%20Tal%2C%20Dist%2C%20Maval%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7695076!2d73.6884312!4m5!1s0x3bc2c11a533158cd%3A0x5f93cf9993209a7b!2sTerrace%20Garden%2C%20GVJH%2B62P%2C%20Central%20Excise%20Colony%2C%20Sangamvadi%2C%20Pune%2C%20Maharashtra%20411001!3m2!1d18.5305912!2d73.87758529999999!5e0!3m2!1sen!2sin!4v1744265186304!5m2!1sen!2sin",
//   ];

//   return (
//     <div
//       className="relative w-full h-fit sm:h-screen overflow-hidden"
//       id="location-connectivity"
//     >
//       <div
//         className="absolute top-[-50px] left-[-100px] h-[253px] w-[150%] blur-[17px] z-[10]"
//         style={{
//           background:
//             "linear-gradient(180deg, #072040 0%, rgba(115, 115, 115, 0.00) 158.53%)",
//         }}
//       />
//       {/* Render iframe if a location is selected */}
//       <div className="hidden sm:flex w-full h-full">
//         {selectedIndex !== null && (
//           <iframe
//             src={iframeUrls[selectedIndex]}
//             className="w-full h-full"
//             style={{
//               border: 0,
//               transform: "translateX(-100px)",
//               scale: "120%",
//             }}
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         )}
//       </div>

//       {/* Overlay MapCard on top-right */}
//       <div className="hidden sm:flex">
//         <div className="absolute top-[10%] max-w-full overflow-hidden fix12 left-[max(5%,calc((100vw-1250px)/2))] h-[200px] flex items-center mapseclinehead">
//           <LineHead heading="Location & Connectivity Advantage" />
//         </div>
//         <div className="absolute top-[50%] -translate-y-1/2 xl-1600:top-[45%] xl-1920:top-[38%] xl-1280:right-0 -right-10 z-10">
//           <MapCard
//             activeIndex={selectedIndex}
//             onSelectAirport={(index) => setSelectedIndex(index)}
//           />
//         </div>
//       </div>

//       {/* Mobile view with slider */}
//       <div className="sm:hidden h-fit relative mx-[5%]">
//         <LineHead heading="Location & Connectivity Advantage" />
//         <MapSlider
//           iframeUrls={iframeUrls}
//           onSelect={(index) => setSelectedIndex(index)}
//         />
//       </div>
//     </div>
//   );
// };

// export default MapSection;

import React, { useState } from "react";
import MapCard from "./MapCard";
import MapSlider from "./MapSlider";
import LineHead from "../../Components/Heading/LineHead";

const MapSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mobileCoordinates = "12.906333, 79.803333";

  // const iframeUrls = [

  const iframeUrls = [
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d497762.9879065745!2d77.43797748400453!3d12.922284225830243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bae1cfe75446265%3A0x296c70e9a129418e!2sKempegowda%20International%20Airport%20Bengaluru%2C%20Karnataka%20534320!3m2!1d13.198908999999999!2d77.7068926!4m5!1s0x3badd5005bf8ec2d%3A0x6fc352b9c63e655e!2sKSH%20Hosur%20Park%20I%2C%20JX22%2BHGG%2C%20Shoolagiri%2C%20Tamil%20Nadu%20635119!3m2!1d12.601438199999999!2d77.95131339999999!5e0!3m2!1sen!2sin!4v1753701365970!5m2!1sen!2sin",

    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d996794.5236306257!2d78.39284813203386!3d12.600129552698936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3a525e1f5da86397%3A0x21092f216ee26e47!2sChennai%20International%20Airport%2C%20Airport%20Rd%2C%20Meenambakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600027!3m2!1d12.993959499999999!2d80.1706653!4m5!1s0x3badd5005bf8ec2d%3A0x6fc352b9c63e655e!2sKSH%20Hosur%20Park%20I%2C%20JX22%2BHGG%2C%20Shoolagiri%2C%20Tamil%20Nadu%20635119!3m2!1d12.601438199999999!2d77.95131339999999!5e0!3m2!1sen!2sin!4v1753701405063!5m2!1sen!2sin",

    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d996622.5321415302!2d78.45354504196403!3d12.644280746578133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3a526f46253ae517%3A0x6d34df28245008f5!2sChennai%20Port%2C%20E%20Kal%20Mandapam%20Rd%2C%20Chennai%20Port%20Trust%2C%20Chennai%2C%20Tamil%20Nadu%20600001!3m2!1d13.0815305!2d80.292059!4m5!1s0x3badd5005bf8ec2d%3A0x6fc352b9c63e655e!2sKSH%20Hosur%20Park%20I%2C%20JX22%2BHGG%2C%20Shoolagiri%2C%20Tamil%20Nadu%20635119!3m2!1d12.601438199999999!2d77.95131339999999!5e0!3m2!1sen!2sin!4v1753701439261!5m2!1sen!2sin",

    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d124556.22984919093!2d77.78333049311078!3d12.688460049724782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bae718992c21bff%3A0x3766764d23679e90!2sHosur%20toll%2C%20QQGG%2BGW2%2C%20NH%2048%2C%20Attibele%2C%20Karnataka%20562107!3m2!1d12.7762672!2d77.7772461!4m5!1s0x3badd5005bf8ec2d%3A0x6fc352b9c63e655e!2sKSH%20Hosur%20Park%20I%2C%20JX22%2BHGG%2C%20Shoolagiri%2C%20Tamil%20Nadu%20635119!3m2!1d12.601438199999999!2d77.95131339999999!5e0!3m2!1sen!2sin!4v1753701475179!5m2!1sen!2sin",

    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d124546.46757121319!2d77.84059034344574!3d12.708389931028012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bae745b211cfc4d%3A0xa84272666ec0a9ec!2sSH%2017C%2C%20Tamil%20Nadu!3m2!1d12.817145199999999!2d77.9185358!4m5!1s0x3badd5005bf8ec2d%3A0x6fc352b9c63e655e!2sKSH%20Hosur%20Park%20I%2C%20JX22%2BHGG%2C%20Shoolagiri%2C%20Tamil%20Nadu%20635119!3m2!1d12.601438199999999!2d77.95131339999999!5e0!3m2!1sen!2sin!4v1753701507549!5m2!1sen!2sin",
  ];

  return (
    <div
      className="relative w-full h-fit sm:h-full overflow-hidden"
      id="location-connectivity"
    >
      {/* <div
        className="absolute top-[-50px] left-[-100px] h-[253px] w-[150%] blur-[17px] z-[10]"
        className="absolute top-[-50px] left-[-100px] h-[253px] w-[150%] blur-[17px] z-[10]"
        style={{
          background:
            "linear-gradient(180deg, #072040 0%, rgba(115, 115, 115, 0.00) 158.53%)",
        }}
      /> */}

      {/* <div className="bg-red-400 xyzsfd"> */}
      {/* Render iframe if a location is selected */}
      {/* <div className="hidden sm:flex w-full h-full">
          {selectedIndex !== null && (
            <iframe
              src={iframeUrls[selectedIndex]}
              className="w-full h-full"
              style={{
                border: 0,
                transform: "translateX(-100px)",
                scale: "120%",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
        </div> */}

      {/* Overlay MapCard on top-right */}
      {/* <div className="hidden w-full  sm:flex">
          // <div className=" max-w-full overflow-hidden fix12 left-[max(5%,calc((100vw-1250px)/2))] h-[200px] flex items-center mapseclinehead">
          //   <LineHead heading="Location & Connectivity Advantage" />
          // </div> */}
      {/* <div className="absolute top-[50%] -translate-y-1/2 xl-1600:top-[45%] xl-1920:top-[38%] xl-1280:right-0 -right-10 z-10"> */}
      {/* <div className="top-[50%] -translate-y-1/2 xl-1600:top-[45%] xl-1920:top-[38%] xl-1280:right-0 -right-10 z-10"> */}
      {/* <div className="flex flex-col min-h-full w-full  z-10"> */}
      {/* <MapCard
              activeIndex={selectedIndex}
              onSelectAirport={(index) => setSelectedIndex(index)}
            /> */}
      {/* </div> */}
      {/* </div>
        </div>
      </div> */}

      <div className=" hidden sm:flex z-30 pb-10 fix12">
        <h2 className="leading-[26px] fsans-600 w-full spotlightheaddd text-[30px] pb-[20px] border-b  border-b-[#092241]  fsans-600 text-[#092241] linehead-text">
          Location & Connectivity
        </h2>
      </div>
      <div className="hidden xyzsfd relative sm:flex min-h-full w-full">
        {/* Render iframe if a location is selected */}
        <div className="w-[70%] hidden relative sm:flex">
          {selectedIndex !== null && (
            <iframe
              src={iframeUrls[selectedIndex]}
              className="w-full h-full relative"
              // style={{
              //   border: 0,
              //   transform: "translateX(-100px)",
              //   scale: "120%",
              // }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
        </div>
        <div className="w-[30%] z-50">
          <MapCard
            activeIndex={selectedIndex}
            onSelectAirport={(index) => setSelectedIndex(index)}
          />
        </div>
      </div>

      {/* Mobile view with slider */}
      <div className="sm:hidden h-fit relative mx-[5%]">
        <LineHead heading="Location & Connectivity Advantage" />
        <div className="mt-[0px] mb-[16px] flex flex-wrap items-center gap-2">
          <span className="text-[16px] fpt-600 text-[#092241]">
            View on Map:
          </span>
          <a
            target="_blank"
            href="https://www.google.com/maps/place/KSH+Infra+Chakan+Industrial+Park+3/@18.7805491,73.7975716,15.15z/data=!4m6!3m5!1s0x3bc2b501e48b0589:0x4515b5fdacda6de4!8m2!3d18.7870954!4d73.7935248!16s%2Fg%2F11s4szhnh9?hl=en&entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D"
            className="flex gap-2 items-center"
          >
            <span className="text-[14px] font-medium text-[#E4222E] underline underline-offset-2">
              {mobileCoordinates}
            </span>
            <span>
              <img src="/buttonarrows/redarico.svg" className="w-7 h-7" />
            </span>
          </a>
        </div>
        <MapSlider
          iframeUrls={iframeUrls}
          onSelect={(index) => setSelectedIndex(index)}
        />
      </div>
    </div>
  );
};

export default MapSection;
