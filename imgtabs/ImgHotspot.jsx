// import React from "react";

// const ImgHotspot = () => {
//   return (
//     <div className="w-full min-h-full">
//       <img src="/ind/hspot/h1.jpg" className="w-full h-full" alt="" />
//     </div>
//   );
// };

// export default ImgHotspot;
//
//
//
//
//
//
//
//
//
//
//
//
// import React from "react";

// const ImgHotspot = ({ activeTab }) => {
//   const images = {
//     1: "/ind/hspot/h1.jpg",
//     2: "/ind/hspot/h2.jpg",
//   };

//   return (
//     <div className="w-full min-h-[600px]">
//       <img
//         src={images[activeTab]}
//         className="w-full min-h-[600px] object-cover"
//         alt=""
//       />
//     </div>
//   );
// };

// export default ImgHotspot;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
import React from "react";
import Hotspot from "./Hotspot";
import HotspotF from "./HotspotF";

const ImgHotspot = ({ activeTab, hotspots }) => {
  const images = {
    1: "/ind/hspot/h1.jpg",
    2: "/ind/hspot/h2.jpg",
  };

  return (
    <div className="relative w-full 1280:h-[550px] 1366:h-[550px] 1440:h-[600px] ">
      <img
        src={images[activeTab]}
        className="w-full h-full object-cover object-bottom"
        alt=""
      />

      {/* Hotspots overlay */}
      {hotspots[activeTab]?.map((spot) => (
        <div
          key={spot.id}
          className="absolute"
          style={{
            top: spot.y,
            left: spot.x,
            transform: "translate(-50%, -50%)",
          }}
        >
          <HotspotF
            title={spot.title}
            description={spot.description}
            position={spot.position}
            iwidth={spot.iwidth}
            fwidth={spot.fwidth}
          />
        </div>
      ))}
    </div>
  );
};

export default ImgHotspot;

// import React from "react";
// import Hotspot from "./Hotspot";
// import HotspotF from "./HotspotF";

// const ImgHotspot = ({ activeTab, hotspots }) => {
//   const images = {
//     1: "/ind/hspot/h1.jpg",
//     2: "/ind/hspot/h2.jpg",
//   };

//   return (
//     <div className="relative w-full 1440:h-[600px] h-[500px]">
//       <img
//         src={images[activeTab]}
//         className="w-full h-full object-cover"
//         alt=""
//       />

//       {/* Hotspots overlay */}
//       {hotspots[activeTab]?.map((spot) => (
//         <div
//           key={spot.id}
//           className="absolute"
//           style={{
//             top: spot.y,
//             left: spot.x,
//             transform: "translate(-50%, -50%)",
//           }}
//         >
//           <HotspotF
//             title={spot.title}
//             description={spot.description}
//             position={spot.position}
//             iwidth={spot.iwidth}
//             fwidth={spot.fwidth}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImgHotspot;
