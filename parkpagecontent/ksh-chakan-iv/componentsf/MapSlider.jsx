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
    title: "Pune International Airport",
    km: 39,
    icon: "/ParkPage/mapicons/apl.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d241910.97913655167!2d73.869054!3d18.67032!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b501e48b0589%3A0x4515b5fdacda6de4!2sKSH%20Infra%20Chakan%20Industrial%20Park%203%2C%20Village-%20Varale%2C%20Tal-%20Khed%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7870954!2d73.7935248!4m5!1s0x3bc2c134e6c4ff8f%3A0xa810745cf9310798!2sPune%20International%20Airport%2C%20New%20Airport%20Rd%2C%20Pune%20International%20Airport%20Area%2C%20Lohegaon%2C%20Pune%2C%20Maharashtra%20411032!3m2!1d18.579342999999998!2d73.9089168!5e0!3m2!1sen!2sin!4v1744263038202!5m2!1sen!2sin",
  },
  {
    id: 2,
    title: "Mumbai International Airport",
    km: 143,
    icon: "/ParkPage/mapicons/apl.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d966322.9434910385!2d73.32064299999999!3d18.900430000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b501e48b0589%3A0x4515b5fdacda6de4!2sKSH%20Infra%20Chakan%20Industrial%20Park%203%2C%20Village-%20Varale%2C%20Tal-%20Khed%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7870954!2d73.7935248!4m5!1s0x3be7c85099bd2947%3A0x1ecc1a60c474a8ae!2sChhatrapati%20Shivaji%20Maharaj%20International%20Airport%20Mumbai%2C%20Mumbai%2C%20Maharashtra%20400099!3m2!1d19.0902177!2d72.86281199999999!5e0!3m2!1sen!2sin!4v1744263184893!5m2!1sen!2sin",
  },
  {
    id: 3,
    title: "Seaport",
    km: 141,
    icon: "/ParkPage/mapicons/ship.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d483298.0045152374!2d72.98957999880616!3d18.85308467926921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b501e48b0589%3A0x4515b5fdacda6de4!2sKSH%20Infra%20Chakan%20Industrial%20Park%203%2C%20Village-%20Varale%2C%20Tal-%20Khed%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7870954!2d73.7935248!4m5!1s0x3be7ce2a7be46f77%3A0x9cb4ef85dc485d31!2sNew%20Dock%20Rd%2C%20Indira%20Docks%2C%20Mumbai%20Port%20Trust%2C%20Mazgaon%2C%20Mumbai%2C%20Maharashtra!3m2!1d18.945432699999998!2d72.8489853!5e0!3m2!1sen!2sin!4v1744264861051!5m2!1sen!2sin",
  },
  {
    id: 4,
    title: "National Highways",
    km: 103,
    icon: "/ParkPage/mapicons/road.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d966652.1931949159!2d73.44267199999999!3d18.843329000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b501e48b0589%3A0x4515b5fdacda6de4!2sKSH%20Infra%20Chakan%20Industrial%20Park%203%2C%20Village-%20Varale%2C%20Tal-%20Khed%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7870954!2d73.7935248!4m5!1s0x3be7c2a7865b0105%3A0xff03de4c645d7a0c!2sNational%20Highways%20Authority%20of%20India%20PIU-Panvel%2C%20Survey%20No-63%2C%20Chinchpada-Kalamboli%20Bypass%20Road%2C%20Panvel%2C%20Maharashtra%20410206!3m2!1d18.9806882!2d73.08750599999999!5e0!3m2!1sen!2sin!4v1744263243359!5m2!1sen!2sin",
  },
  {
    id: 5,
    title: "City Center",
    km: 33,
    icon: "/ParkPage/mapicons/clock.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d121034.50564964209!2d73.682246!3d18.559232!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b501e48b0589%3A0x4515b5fdacda6de4!2sKSH%20Infra%20Chakan%20Industrial%20Park%203%2C%20Village-%20Varale%2C%20Tal-%20Khed%2C%20Pune%2C%20Maharashtra%20410507!3m2!1d18.7870954!2d73.7935248!4m5!1s0x3bc2bb496bf06797%3A0x52a541e25e980cf0!2sAbsolute%20Global%20Outsourcing%20Private%20Limited%20%7C%20Best%20B2B%20Lead%20Generation%20Company%2C%20no.%20306%2C307%2C%20City%20Centre%20-%20Kolte%20Patil%20Office%2C%20Tal%20Mulshi%2C%20308%2C%20Hinjewadi%20Phase%201%20Rd%2C%20behind%20Persistant%2C%20Hinjawadi%20Rajiv%20Gandhi%20Infotech%20Park%2C%20Hinjawadi%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411057!3m2!1d18.5882594!2d73.7372457!5e0!3m2!1sen!2sin!4v1744264066645!5m2!1sen!2sin",
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
