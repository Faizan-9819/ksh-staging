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
  // {
  //   id: 1,
  //   title: "Pune International Airport",
  //   km: 34,
  //   icon: "/ParkPage/mapicons/apl.svg",
  //   mapframe:
  //     "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d241951.32895502!2d73.70385896191407!3d18.64201697837987!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b427f3ca505d%3A0xd175ea8fa8d8f15f!2sKSH%20Infra%2C%20QQ3J%2BPQ5%2C%20Sawardari%2C%20Maharashtra%20410507!3m2!1d18.7540191!2d73.7822305!4m5!1s0x3bc2c134e6c4ff8f%3A0xa810745cf9310798!2sPune%20International%20Airport%2C%20New%20Airport%20Rd%2C%20Pune%20International%20Airport%20Area%2C%20Lohegaon%2C%20Pune%2C%20Maharashtra%20411032!3m2!1d18.579342999999998!2d73.9089168!5e0!3m2!1sen!2sin!4v1744064883358!5m2!1sen!2sin",
  // },
  // {
  //   id: 2,
  //   title: "Mumbai International Airport",
  //   km: 137,
  //   icon: "/ParkPage/mapicons/apl.svg",
  //   mapframe:
  //     "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d966322.9434910386!2d73.316076!3d18.90043!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b427f3ca505d%3A0xd175ea8fa8d8f15f!2sKSH%20Infra%2C%20QQ3J%2BPQ5%2C%20Sawardari%2C%20Maharashtra%20410507!3m2!1d18.7540191!2d73.7822305!4m5!1s0x3be7c85099bd2947%3A0x1ecc1a60c474a8ae!2sChhatrapati%20Shivaji%20Maharaj%20International%20Airport%20Mumbai%2C%20Mumbai%2C%20Maharashtra%20400099!3m2!1d19.0902177!2d72.86281199999999!5e0!3m2!1sen!2sin!4v1744066719634!5m2!1sen!2sin",
  // },
  // {
  //   id: 3,
  //   title: "Seaport 1",
  //   km: 142,
  //   icon: "/ParkPage/mapicons/ship.svg",
  //   mapframe:
  //     "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d120968.75171917143!2d73.75828006065481!3d18.65171942885317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b427f3ca505d%3A0xd175ea8fa8d8f15f!2sQQ3J%2BPQ5%20KSH%20Infra%2C%20Sawardari%2C%20Maharashtra%20410507!3m2!1d18.7540148!2d73.7822271!4m5!1s0x3bc2c134e6c4ff8f%3A0xa810745cf9310798!2sPune%20International%20Airport%20(PNQ)%2C%20New%20Airport%20Road%2C%20Pune%20International%20Airport%20Area%2C%20Lohegaon%2C%20Pune%2C%20Maharashtra!3m2!1d18.579342999999998!2d73.9089168!5e0!3m2!1sen!2sin!4v1672824325508!5m2!1sen!2sin",
  // },
  // {
  //   id: 4,
  //   title: "National Highways",
  //   km: 95,
  //   icon: "/ParkPage/mapicons/road.svg",
  //   mapframe:
  //     "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d120968.75171917143!2d73.75828006065481!3d18.65171942885317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b427f3ca505d%3A0xd175ea8fa8d8f15f!2sQQ3J%2BPQ5%20KSH%20Infra%2C%20Sawardari%2C%20Maharashtra%20410507!3m2!1d18.7540148!2d73.7822271!4m5!1s0x3bc2c134e6c4ff8f%3A0xa810745cf9310798!2sPune%20International%20Airport%20(PNQ)%2C%20New%20Airport%20Road%2C%20Pune%20International%20Airport%20Area%2C%20Lohegaon%2C%20Pune%2C%20Maharashtra!3m2!1d18.579342999999998!2d73.9089168!5e0!3m2!1sen!2sin!4v1672824325508!5m2!1sen!2sin",
  // },
  // {
  //   id: 5,
  //   title: "City Center",
  //   km: 29,
  //   icon: "/ParkPage/mapicons/clock.svg",
  //   mapframe:
  //     "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d241910.69237252203!2d73.765441!3d18.670521!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b427f3ca505d%3A0xd175ea8fa8d8f15f!2sKSH%20Infra%2C%20QQ3J%2BPQ5%2C%20Sawardari%2C%20Maharashtra%20410507!3m2!1d18.7540191!2d73.7822305!4m5!1s0x3bc2bbe7af9b56b1%3A0x7c1c86b796e12483!2sCity%20Centre%20-%20Kolte%20Patil%2C%20Hinjewadi%20Phase%201%20Rd%2C%20Phase%201%2C%20Hinjawadi%20Rajiv%20Gandhi%20Infotech%20Park%2C%20Hinjawadi%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411057!3m2!1d18.5866126!2d73.7384206!5e0!3m2!1sen!2sin!4v1744066944513!5m2!1sen!2sin",
  // },
  {
    id: 1,
    title: "Pune International Airport",
    km: 40,
    icon: "/ParkPage/mapicons/apl.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d120946.71366116963!2d73.77181336095057!3d18.68261368087196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b45b8d420287%3A0x4b3a170117c264d9!2sQQVH%2B23X%2C%20Chakan%20Rd%2C%20Phase%202%2C%20Bhamboli%2C%20Maharashtra%20410507!3m2!1d18.7921896!2d73.7778466!4m5!1s0x3bc2c134e6c4ff8f%3A0xa810745cf9310798!2sPune%20International%20Airport%20(PNQ)%2C%20New%20Airport%20Road%2C%20Pune%20International%20Airport%20Area%2C%20Lohegaon%2C%20Pune%2C%20Maharashtra!3m2!1d18.579342999999998!2d73.9089168!5e0!3m2!1sen!2sin!4v1672838418405!5m2!1sen!2sin",
  },
  {
    id: 2,
    title: "Mumbai International Airport",
    km: 146,
    icon: "/ParkPage/mapicons/apl.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d483140.5380297514!2d73.04011218123938!3d18.907679061945885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b45b8d420287%3A0x4b3a170117c264d9!2sQQVH%2B23X%2C%20Chakan%20Rd%2C%20Phase%202%2C%20Bhamboli%2C%20Maharashtra%20410507!3m2!1d18.7921896!2d73.7778466!4m5!1s0x3be7c85099bd2947%3A0x1ecc1a60c474a8ae!2sChhatrapati%20Shivaji%20Maharaj%20International%20Airport%20(BOM)%2C%20Mumbai%2C%20Maharashtra!3m2!1d19.0903694!2d72.86275189999999!5e0!3m2!1sen!2sin!4v1672838480299!5m2!1sen!2sin",
  },
  {
    id: 3,
    title: "Seaport",
    km: 145,
    icon: "/ParkPage/mapicons/ship.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d483198.03899255063!2d73.02957897760068!3d18.887760827469805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b45b8d420287%3A0x4b3a170117c264d9!2sQQVH%2B23X%2C%20Chakan%20Rd%2C%20Phase%202%2C%20Bhamboli%2C%20Maharashtra%20410507!3m2!1d18.7921896!2d73.7778466!4m5!1s0x3be7ce299e2b5e8b%3A0x5655b08ab6f01561!2sMumbai%20Port%20Trust%2C%20Mazgaon%2C%20Mumbai%2C%20Maharashtra!3m2!1d18.9482881!2d72.8441629!5e0!3m2!1sen!2sin!4v1672838524949!5m2!1sen!2sin",
  },
  {
    id: 4,
    title: "National Highways",
    km: 107,
    icon: "/ParkPage/mapicons/road.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d241662.6700932955!2d73.29258943511357!3d18.843591746384696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b45b8d420287%3A0x4b3a170117c264d9!2sQQVH%2B23X%2C%20Chakan%20Rd%2C%20Phase%202%2C%20Bhamboli%2C%20Maharashtra%20410507!3m2!1d18.7921896!2d73.7778466!4m5!1s0x3be7c2a7865b0105%3A0xff03de4c645d7a0c!2sNational%20Highways%20Authority%20of%20India%20PIU-Panvel%2C%20Survey%20No-63%2C%20Chinchpada-Kalamboli%20Bypass%20Road%2C%20Panvel%2C%20Maharashtra%20410206!3m2!1d18.9806882!2d73.08750599999999!5e0!3m2!1sen!2sin!4v1672838551621!5m2!1sen!2sin",
  },
  {
    id: 5,
    title: "City Center",
    km: 31,
    icon: "/ParkPage/mapicons/clock.svg",
    mapframe:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d120937.2828496356!2d73.65853276107731!3d18.69582641034172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3bc2b45b8d420287%3A0x4b3a170117c264d9!2sQQVH%2B23X%2C%20Chakan%20Rd%2C%20Phase%202%2C%20Bhamboli%2C%20Maharashtra%20410507!3m2!1d18.7921896!2d73.7778466!4m5!1s0x3bc2bbe7af4be47b%3A0xf2ecdaf0207acee!2sCity%20Center%20Building%2C%20Phase%201%2C%20Hinjewadi%20Rajiv%20Gandhi%20Infotech%20Park%2C%20Hinjawadi%2C%20Pimpri-Chinchwad%2C%20Maharashtra!3m2!1d18.586313099999998!2d73.73863779999999!5e0!3m2!1sen!2sin!4v1672838590518!5m2!1sen!2sin",
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
      <div className="w-full">
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
