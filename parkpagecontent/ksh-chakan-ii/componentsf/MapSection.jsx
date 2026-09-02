"use client";
import React, { useState } from "react";
import MapCard from "./MapCard";
import MapSlider from "./MapSlider";
import LineHead from "../../Components/Heading/LineHead";

const MapSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const iframeUrls = [
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d120946.71366116963!2d73.77181336095057!3d18.68261368087196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b45b8d420287%3A0x4b3a170117c264d9!2sQQVH%2B23X%2C%20Chakan%20Rd%2C%20Phase%202%2C%20Bhamboli%2C%20Maharashtra%20410507!3m2!1d18.7921896!2d73.7778466!4m5!1s0x3bc2c134e6c4ff8f%3A0xa810745cf9310798!2sPune%20International%20Airport%20(PNQ)%2C%20New%20Airport%20Road%2C%20Pune%20International%20Airport%20Area%2C%20Lohegaon%2C%20Pune%2C%20Maharashtra!3m2!1d18.579342999999998!2d73.9089168!5e0!3m2!1sen!2sin!4v1672838418405!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d483140.5380297514!2d73.04011218123938!3d18.907679061945885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b45b8d420287%3A0x4b3a170117c264d9!2sQQVH%2B23X%2C%20Chakan%20Rd%2C%20Phase%202%2C%20Bhamboli%2C%20Maharashtra%20410507!3m2!1d18.7921896!2d73.7778466!4m5!1s0x3be7c85099bd2947%3A0x1ecc1a60c474a8ae!2sChhatrapati%20Shivaji%20Maharaj%20International%20Airport%20(BOM)%2C%20Mumbai%2C%20Maharashtra!3m2!1d19.0903694!2d72.86275189999999!5e0!3m2!1sen!2sin!4v1672838480299!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d483198.03899255063!2d73.02957897760068!3d18.887760827469805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b45b8d420287%3A0x4b3a170117c264d9!2sQQVH%2B23X%2C%20Chakan%20Rd%2C%20Phase%202%2C%20Bhamboli%2C%20Maharashtra%20410507!3m2!1d18.7921896!2d73.7778466!4m5!1s0x3be7ce299e2b5e8b%3A0x5655b08ab6f01561!2sMumbai%20Port%20Trust%2C%20Mazgaon%2C%20Mumbai%2C%20Maharashtra!3m2!1d18.9482881!2d72.8441629!5e0!3m2!1sen!2sin!4v1672838524949!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d241662.6700932955!2d73.29258943511357!3d18.843591746384696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b45b8d420287%3A0x4b3a170117c264d9!2sQQVH%2B23X%2C%20Chakan%20Rd%2C%20Phase%202%2C%20Bhamboli%2C%20Maharashtra%20410507!3m2!1d18.7921896!2d73.7778466!4m5!1s0x3be7c2a7865b0105%3A0xff03de4c645d7a0c!2sNational%20Highways%20Authority%20of%20India%20PIU-Panvel%2C%20Survey%20No-63%2C%20Chinchpada-Kalamboli%20Bypass%20Road%2C%20Panvel%2C%20Maharashtra%20410206!3m2!1d18.9806882!2d73.08750599999999!5e0!3m2!1sen!2sin!4v1672838551621!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d120937.2828496356!2d73.65853276107731!3d18.69582641034172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b45b8d420287%3A0x4b3a170117c264d9!2sQQVH%2B23X%2C%20Chakan%20Rd%2C%20Phase%202%2C%20Bhamboli%2C%20Maharashtra%20410507!3m2!1d18.7921896!2d73.7778466!4m5!1s0x3bc2bbe7af4be47b%3A0xf2ecdaf0207acee!2sCity%20Center%20Building%2C%20Phase%201%2C%20Hinjewadi%20Rajiv%20Gandhi%20Infotech%20Park%2C%20Hinjawadi%2C%20Pimpri-Chinchwad%2C%20Maharashtra!3m2!1d18.586313099999998!2d73.73863779999999!5e0!3m2!1sen!2sin!4v1672838590518!5m2!1sen!2sin",
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
