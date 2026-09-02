"use client";
import React, { useState } from "react";
import MapCard from "./MapCard";
import MapSlider from "./MapSlider";
import LineHead from "../../Components/Heading/LineHead";

const MapSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mobileCoordinates = "18.781965, 73.795441";

  const iframeUrls = [
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d120950.22711641135!2d73.75809516677145!3d18.677695798631202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2c134e6c4ff8f%3A0xa810745cf9310798!2sPune%20International%20Airport%2C%20New%20Airport%20Rd%2C%20Pune%20International%20Airport%20Area%2C%20Lohegaon%2C%20Pune%2C%20Maharashtra%20411032!3m2!1d18.579342999999998!2d73.9089168!4m5!1s0x3bc2b501e48b0589%3A0x4515b5fdacda6de4!2sKSH%20Infra%20Chakan%20Industrial%20Park%203%2C%20Village-%20Varale%2C%20Tal-%20Khed%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7870954!2d73.7935248!5e0!3m2!1sen!2sin!4v1753699042170!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d483124.7669982836!2d72.9883030198731!3d18.913138588294093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3be7c85099bd2947%3A0x1ecc1a60c474a8ae!2sChhatrapati%20Shivaji%20Maharaj%20International%20Airport%20Mumbai%2C%20Mumbai%2C%20Maharashtra%20400099!3m2!1d19.0902177!2d72.86281199999999!4m5!1s0x3bc2b501e48b0589%3A0x4515b5fdacda6de4!2sKSH%20Infra%20Chakan%20Industrial%20Park%203%2C%20Village-%20Varale%2C%20Tal-%20Khed%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7870954!2d73.7935248!5e0!3m2!1sen!2sin!4v1753699145797!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d483262.03019792866!2d72.9867597989495!3d18.865570563152307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3be7ce2a7be46f77%3A0x9cb4ef85dc485d31!2sNew%20Dock%20Rd!3m2!1d18.945432699999998!2d72.8489853!4m5!1s0x3bc2b501e48b0589%3A0x4515b5fdacda6de4!2sKSH%20Infra%20Chakan%20Industrial%20Park%203%2C%20Village-%20Varale%2C%20Tal-%20Khed%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7870954!2d73.7935248!5e0!3m2!1sen!2sin!4v1753699172458!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d241643.80515076386!2d73.27003649922212!3d18.85669309760878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3be7c2a7865b0105%3A0xff03de4c645d7a0c!2sNational%20Highways%20Authority%20of%20India%20PIU-Panvel%2C%20Survey%20No-63%2C%20Chinchpada-Kalamboli%20Bypass%20Road%2C%20Panvel%2C%20Maharashtra%20410206!3m2!1d18.9806882!2d73.08750599999999!4m5!1s0x3bc2b501e48b0589%3A0x4515b5fdacda6de4!2sKSH%20Infra%20Chakan%20Industrial%20Park%203%2C%20Village-%20Varale%2C%20Tal-%20Khed%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7870954!2d73.7935248!5e0!3m2!1sen!2sin!4v1753699200648!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d120942.7566262244!2d73.6811493670275!3d18.688161539993228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2bb496bf06797%3A0x52a541e25e980cf0!2sAbsolute%20Global%20Outsourcing%20Private%20Limited%20%7C%20Best%20B2B%20Lead%20Generation%20Company%2C%20no.%20306%2C307%2C%20City%20Centre%20-%20Kolte%20Patil%20Office%2C%20Tal%20Mulshi%2C%20308%2C%20Hinjawadi%20Phase%201%20Rd%2C%20behind%20Persistant%2C%20Hinjawadi%20Rajiv%20Gandhi%20Infotech%20Park%2C%20Hinjawadi%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411057!3m2!1d18.5882594!2d73.7372457!4m5!1s0x3bc2b501e48b0589%3A0x4515b5fdacda6de4!2sKSH%20Infra%20Chakan%20Industrial%20Park%203%2C%20Village-%20Varale%2C%20Tal-%20Khed%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7870954!2d73.7935248!5e0!3m2!1sen!2sin!4v1753699229953!5m2!1sen!2sin",
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
