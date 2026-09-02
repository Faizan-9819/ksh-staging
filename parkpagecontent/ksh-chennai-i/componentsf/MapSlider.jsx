"use client";
// "use client";
// import React, { useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, FreeMode } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/free-mode";

// const MapSlider = ({ iframeUrls, onSelect }) => {
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     setTimeout(() => {
//       if (swiperRef.current) {
//         swiperRef.current.update();
//       }
//     }, 200);
//   }, [iframeUrls]);

//   return (
//     <div className="flex sm:hidden overflow-hidden w-full">
//       <div className="w-full">
//         <Swiper
//           onSwiper={(swiper) => (swiperRef.current = swiper)}
//           modules={[Navigation, FreeMode]}
//           spaceBetween={20}
//           slidesPerView={1}
//           speed={300}
//           freeMode={true}
//           navigation={{
//             prevEl: ".swiper-button-prev-iframe",
//             nextEl: ".swiper-button-next-iframe",
//           }}
//         >
//           {iframeUrls.map((url, index) => (
//             <SwiperSlide key={index}>
//               <div className="flex flex-col items-center justify-center min-h-[260px]">
//                 <iframe
//                   src={url}
//                   width="100%"
//                   height="300"
//                   className="w-full"
//                   style={{ border: 0 }}
//                   allowFullScreen=""
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   onClick={() => onSelect(index)}
//                 ></iframe>
//                 <h3 className="text-center text-[#092241] bg-white w-full flex px-4 py-3 text-lg font-semibold mb-2">
//                   {index}
//                 </h3>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Navigation Buttons */}
//         <div className="flex items-center justify-start mt-5 mb-10">
//           <button className="swiper-button-prev-iframe h-[41px] w-[41px] mr-2">
//             <img
//               className="h-[41px] w-[41px]"
//               src="/AboutPage/timeline/whitearrowleft.svg"
//               alt="ArrowLeft"
//             />
//           </button>
//           <button className="swiper-button-next-iframe h-[41px] w-[41px]">
//             <img
//               className="h-[41px] w-[41px]"
//               src="/AboutPage/timeline/whitearrowright.svg"
//               alt="ArrowRight"
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MapSlider;

//******************************************************************************************************************* */
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

const iframeUrls = [
  {
    id: 1,
    title: "Bengaluru International Airport",
    km: 90,
    icon: "/ParkPage/mapicons/apl.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d497761.7169384042!2d77.47064889407676!3d12.92292183586535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3badd5005bf8ec2d%3A0x6fc352b9c63e655e!2sKSH%20Hosur%20Park%20I%2C%20JX22%2BHGG%2C%20Shoolagiri%2C%20Tamil%20Nadu%20635119!3m2!1d12.601438199999999!2d77.95131339999999!4m5!1s0x3bae1cfe75446265%3A0x296c70e9a129418e!2sKempegowda%20International%20Airport%20Bengaluru%2C%20Karnataka%20534320!3m2!1d13.198908999999999!2d77.7068926!5e0!3m2!1sen!2sin!4v1751188675215!5m2!1sen!2sin",
  },
  {
    id: 2,
    title: "Chennai International Airport",
    km: 286,
    icon: "/ParkPage/mapicons/road.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d995753.5229422647!2d78.39417003825847!3d12.865081284921866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3badd5005bf8ec2d%3A0x6fc352b9c63e655e!2sKSH%20Hosur%20Park%20I%2C%20JX22%2BHGG%2C%20Shoolagiri%2C%20Tamil%20Nadu%20635119!3m2!1d12.601438199999999!2d77.95131339999999!4m5!1s0x3a525e1f5da86397%3A0x21092f216ee26e47!2sChennai%20International%20Airport%2C%20Airport%20Rd%2C%20Meenambakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600027!3m2!1d12.993959499999999!2d80.1706653!5e0!3m2!1sen!2sin!4v1751190384534!5m2!1sen!2sin",
  },
  {
    id: 3,
    title: "Chennai seaport",
    km: 300,
    icon: "/ParkPage/mapicons/apl.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d376833.3640717693!2d79.57139957282862!3d12.934518395679525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3badd5005bf8ec2d%3A0x6fc352b9c63e655e!2sKSH%20Hosur%20Park%20I%2C%20JX22%2BHGG%2C%20Shoolagiri%2C%20Tamil%20Nadu%20635119!3m2!1d12.601438199999999!2d77.95131339999999!4m5!1s0x3a526f46253ae517%3A0x6d34df28245008f5!2sChennai%20Port%2C%20E%20Kal%20Mandapam%20Rd%2C%20Chennai%20Port%20Trust%2C%20Chennai%2C%20Tamil%20Nadu%20600001!3m2!1d13.0815305!2d80.292059!5e0!3m2!1sen!2sin!4v1751189004452!5m2!1sen!2sin",
  },
  {
    id: 4,
    title: "National Highways",
    km: 30,
    icon: "/ParkPage/mapicons/ship.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d51250.21622705815!2d77.74760205615776!3d12.804239742921263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3badd5005bf8ec2d%3A0x6fc352b9c63e655e!2sKSH%20Hosur%20Park%20I%2C%20JX22%2BHGG%2C%20Shoolagiri%2C%20Tamil%20Nadu%20635119!3m2!1d12.601438199999999!2d77.95131339999999!4m5!1s0x3bae718992c21bff%3A0x3766764d23679e90!2sHosur%20toll%2C%20QQGG%2BGW2%2C%20NH%2048%2C%20Attibele%2C%20Karnataka%20562107!3m2!1d12.7762672!2d77.7772461!5e0!3m2!1sen!2sin!4v1751189763525!5m2!1sen!2sin",
  },

  {
    id: 5,
    title: "State Highway",
    km: 37,
    icon: "/ParkPage/mapicons/clock.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d124538.41390017941!2d77.90693723963511!3d12.724808546011346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3badd5005bf8ec2d%3A0x6fc352b9c63e655e!2sKSH%20Hosur%20Park%20I%2C%20JX22%2BHGG%2C%20Shoolagiri%2C%20Tamil%20Nadu%20635119!3m2!1d12.601438199999999!2d77.95131339999999!4m5!1s0x3bae745b211cfc4d%3A0xa84272666ec0a9ec!2sSH%2017C%2C%20Tamil%20Nadu!3m2!1d12.820846!2d77.9185181!5e0!3m2!1sen!2sin!4v1751637125867!5m2!1sen!2sin",
  },
];

const MapSlider = ({ onSelect }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.update();
      }
    }, 200);
  }, []);

  return (
    <div className="flex sm:hidden overflow-hidden w-full">
      <div className="w-full lg:py-6">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, FreeMode]}
          spaceBetween={20}
          slidesPerView={1}
          speed={300}
          freeMode={true}
          navigation={{
            prevEl: ".swiper-button-prev-iframe",
            nextEl: ".swiper-button-next-iframe",
          }}
        >
          {iframeUrls.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col items-center justify-center min-h-[260px]">
                <iframe
                  src={item.mapframe}
                  width="100%"
                  height="300"
                  className="w-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onClick={() => onSelect(index)}
                ></iframe>
                <div className="bg-white w-full px-4 py-3 flex items-center justify-between text-[#092241]">
                  <div className="flex items-center space-x-2">
                    <img src={item.icon} alt={item.title} className="h-6 w-6" />
                    <h3 className="text-[16px] font-semibold">{item.title}</h3>
                  </div>
                  <span className="text-sm font-medium">{item.km} km</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-start mt-5 mb-10">
          <button className="swiper-button-prev-iframe h-[41px] w-[41px] mr-2">
            <img
              className="h-[41px] w-[41px]"
              src="/ParkPage/parrowp.svg"
              alt="ArrowLeft"
            />
          </button>
          <button className="swiper-button-next-iframe h-[41px] w-[41px]">
            <img
              className="h-[41px] w-[41px]"
              src="/ParkPage/parrown.svg"
              alt="ArrowRight"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapSlider;
