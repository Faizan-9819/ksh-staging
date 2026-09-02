"use client";
import React, { useState } from "react";
import MapCard from "./MapCard";
import MapSlider from "./MapSlider";
import LineHead from "../../Components/Heading/LineHead";

const MapSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // const iframeUrls = [
  //   "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d241926.82499569946!2d73.77953200000002!3d18.65921!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b37fe3960f95%3A0xf334e85aa9f4da16!2sKSH%20Infra%20Talegaon%20Industrial%20Park%201%2C%20Plot%20No.%20P12%2C%20Talegaon%20Floriculture%20%26%20Industrial%20Park%2C%20MIDC%20Talegaon%20Village%20Navlakh%20Umbre%2C%20Tal%2C%20Dist%2C%20Maval%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7695076!2d73.6884312!4m5!1s0x3bc2c134e6c4ff8f%3A0xa810745cf9310798!2sPune%20International%20Airport%2C%20New%20Airport%20Rd%2C%20Pune%20International%20Airport%20Area%2C%20Lohegaon%2C%20Pune%2C%20Maharashtra%20411032!3m2!1d18.579342999999998!2d73.9089168!5e0!3m2!1sen!2sin!4v1744265078800!5m2!1sen!2sin",

  //   "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d966322.9434910386!2d73.265938!3d18.90043!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b37fe3960f95%3A0xf334e85aa9f4da16!2sKSH%20Infra%20Talegaon%20Industrial%20Park%201%2C%20Plot%20No.%20P12%2C%20Talegaon%20Floriculture%20%26%20Industrial%20Park%2C%20MIDC%20Talegaon%20Village%20Navlakh%20Umbre%2C%20Tal%2C%20Dist%2C%20Maval%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7695076!2d73.6884312!4m5!1s0x3be7c85099bd2947%3A0x1ecc1a60c474a8ae!2sChhatrapati%20Shivaji%20Maharaj%20International%20Airport%20Mumbai%2C%20Mumbai%2C%20Maharashtra%20400099!3m2!1d19.0902177!2d72.86281199999999!5e0!3m2!1sen!2sin!4v1744265099266!5m2!1sen!2sin",

  //   "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d966598.0809654563!2d73.264536!3d18.852725!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b37fe3960f95%3A0xf334e85aa9f4da16!2sKSH%20Infra%20Talegaon%20Industrial%20Park%201%2C%20Plot%20No.%20P12%2C%20Talegaon%20Floriculture%20%26%20Industrial%20Park%2C%20MIDC%20Talegaon%20Village%20Navlakh%20Umbre%2C%20Tal%2C%20Dist%2C%20Maval%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7695076!2d73.6884312!4m5!1s0x3be7ce299e2b5e8b%3A0x5655b08ab6f01561!2sMumbai%20Port%20Trust%2C%20Mazgaon%2C%20Mumbai%2C%20Maharashtra!3m2!1d18.9482881!2d72.8441629!5e0!3m2!1sen!2sin!4v1744265123235!5m2!1sen!2sin",

  //   "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d483326.09659745794!2d73.387967!3d18.843329!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b37fe3960f95%3A0xf334e85aa9f4da16!2sKSH%20Infra%20Talegaon%20Industrial%20Park%201%2C%20Plot%20No.%20P12%2C%20Talegaon%20Floriculture%20%26%20Industrial%20Park%2C%20MIDC%20Talegaon%20Village%20Navlakh%20Umbre%2C%20Tal%2C%20Dist%2C%20Maval%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7695076!2d73.6884312!4m5!1s0x3be7c2a7865b0105%3A0xff03de4c645d7a0c!2sNational%20Highways%20Authority%20of%20India%20PIU-Panvel%2C%20Survey%20No-63%2C%20Chinchpada-Kalamboli%20Bypass%20Road%2C%20Panvel%2C%20Maharashtra%20410206!3m2!1d18.9806882!2d73.08750599999999!5e0!3m2!1sen!2sin!4v1744265164589!5m2!1sen!2sin",

  //   "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d241941.4461710328!2d73.764676!3d18.648953!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b37fe3960f95%3A0xf334e85aa9f4da16!2sKSH%20Infra%20Talegaon%20Industrial%20Park%201%2C%20Plot%20No.%20P12%2C%20Talegaon%20Floriculture%20%26%20Industrial%20Park%2C%20MIDC%20Talegaon%20Village%20Navlakh%20Umbre%2C%20Tal%2C%20Dist%2C%20Maval%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7695076!2d73.6884312!4m5!1s0x3bc2c11a533158cd%3A0x5f93cf9993209a7b!2sTerrace%20Garden%2C%20GVJH%2B62P%2C%20Central%20Excise%20Colony%2C%20Sangamvadi%2C%20Pune%2C%20Maharashtra%20411001!3m2!1d18.5305912!2d73.87758529999999!5e0!3m2!1sen!2sin!4v1744265186304!5m2!1sen!2sin",
  // ];

  const iframeUrls = [
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d241926.34382161908!2d73.61203783520143!3d18.659547459279004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x3bc2c134e6c4ff8f%3A0xa810745cf9310798!2sPune%20International%20Airport%20(PNQ)%2C%20New%20Airport%20Road%2C%20Pune%20International%20Airport%20Area%2C%20Lohegaon%2C%20Pune%2C%20Maharashtra!3m2!1d18.579342999999998!2d73.9089168!4m3!3m2!1d18.769925999999998!2d73.68963099999999!5e0!3m2!1sen!2sin!4v1756216278879!5m2!1sen!2sin",

    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d483148.717611114!2d72.93710509340303!3d18.904846902591174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x3be7c85099bd2947%3A0x1ecc1a60c474a8ae!2sChhatrapati%20Shivaji%20Maharaj%20International%20Airport%20Mumbai%2C%20Mumbai%2C%20Maharashtra%20400099!3m2!1d19.0902177!2d72.86281199999999!4m3!3m2!1d18.769925999999998!2d73.68963099999999!5e0!3m2!1sen!2sin!4v1756216455601!5m2!1sen!2sin",

    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d482955.94437736063!2d72.93168282272622!3d18.971485822623176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x3be7ce299e2b5e8b%3A0x5655b08ab6f01561!2sMumbai%20Port%20Trust%2C%20Mazgaon%2C%20Mumbai%2C%20Maharashtra!3m2!1d18.9482881!2d72.8441629!4m3!3m2!1d18.769925999999998!2d73.68963099999999!5e0!3m2!1sen!2sin!4v1756216519071!5m2!1sen!2sin",

    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d241635.7775554049!2d73.21846540578996!3d18.862265453343806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x3be7c2a7865b0105%3A0xff03de4c645d7a0c!2sNational%20Highways%20Authority%20of%20India%20PIU-Panvel%2C%20Survey%20No-63%2C%20Chinchpada-Kalamboli%20Bypass%20Road%2C%20Panvel%2C%20Maharashtra%20410206!3m2!1d18.9806882!2d73.08750599999999!4m3!3m2!1d18.769925999999998!2d73.68963099999999!5e0!3m2!1sen!2sin!4v1756216561295!5m2!1sen!2sin",

    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d241939.22419174426!2d73.59956473428967!3d18.650512106332393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x3bc2c11a533158cd%3A0x5f93cf9993209a7b!2sTerrace%20Garden%2C%20GVJH%2B62P%2C%20Central%20Excise%20Colony%2C%20Sangamvadi%2C%20Pune%2C%20Maharashtra%20411001!3m2!1d18.5305912!2d73.87758529999999!4m3!3m2!1d18.769925999999998!2d73.68963099999999!5e0!3m2!1sen!2sin!4v1756216611270!5m2!1sen!2sin",
  ];

  return (
    // <div
    //   className="relative w-full h-fit sm:h-screen overflow-hidden"
    //   id="location-connectivity"
    // >
    //   <div
    //     className="absolute top-[-50px] left-[-100px] h-[253px] w-[150%] blur-[17px] z-[10]"
    //     style={{
    //       background:
    //         "linear-gradient(180deg, #072040 0%, rgba(115, 115, 115, 0.00) 158.53%)",
    //     }}
    //   />
    //   {/* Render iframe if a location is selected */}
    //   <div className="hidden sm:flex w-full h-full">
    //     {selectedIndex !== null && (
    //       <iframe
    //         src={iframeUrls[selectedIndex]}
    //         className="w-full h-full"
    //         style={{
    //           border: 0,
    //           transform: "translateX(-100px)",
    //           scale: "120%",
    //         }}
    //         allowFullScreen
    //         loading="lazy"
    //         referrerPolicy="no-referrer-when-downgrade"
    //       ></iframe>
    //     )}
    //   </div>

    //   {/* Overlay MapCard on top-right */}
    //   <div className="hidden sm:flex">
    //     <div className="absolute top-[10%] max-w-full overflow-hidden fix12 left-[max(5%,calc((100vw-1250px)/2))] h-[200px] flex items-center mapseclinehead">
    //       <LineHead heading="Location & Connectivity Advantage" />
    //     </div>
    //     <div className="absolute top-[50%] -translate-y-1/2 xl-1600:top-[45%] xl-1920:top-[38%] xl-1280:right-0 -right-10 z-10">
    //       <MapCard
    //         activeIndex={selectedIndex}
    //         onSelectAirport={(index) => setSelectedIndex(index)}
    //       />
    //     </div>
    //   </div>

    //   {/* Mobile view with slider */}
    //   <div className="sm:hidden h-fit relative mx-[5%]">
    //     <LineHead heading="Location & Connectivity Advantage" />
    //     <MapSlider
    //       iframeUrls={iframeUrls}
    //       onSelect={(index) => setSelectedIndex(index)}
    //     />
    //   </div>
    // </div>

    <div
      className="relative w-full h-fit sm:h-full overflow-hidden"
      id="location-connectivity"
    >
      {/* <div
        className="absolute top-[-50px] left-[-100px] h-[253px] w-[150%] blur-[17px] z-[10]"
        style={{
          background:
            "linear-gradient(180deg, #072040 0%, rgba(115, 115, 115, 0.00) 158.53%)",
        }}
      /> */}
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
      {/* <div className="hidden sm:flex">
        <div className="absolute top-[10%] max-w-full overflow-hidden fix12 left-[max(5%,calc((100vw-1250px)/2))] h-[200px] flex items-center mapseclinehead">
          <LineHead heading="Location & Connectivity Advantage" />
        </div>
        <div className="absolute top-[50%] -translate-y-1/2 xl-1600:top-[45%] xl-1920:top-[38%] xl-1280:right-0 -right-10 z-10">
          <MapCard
            activeIndex={selectedIndex}
            onSelectAirport={(index) => setSelectedIndex(index)}
          />
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
        <MapSlider
          iframeUrls={iframeUrls}
          onSelect={(index) => setSelectedIndex(index)}
        />
      </div>
    </div>
  );
};

export default MapSection;
