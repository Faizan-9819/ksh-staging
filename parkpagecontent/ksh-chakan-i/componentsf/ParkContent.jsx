// // ParkContent.js
// import React, { useState } from "react";
// import Parkinfracard from "./Parkinfracard";

// const ParkContent = () => {
//   // Initialize with a default video
//   const [selectedVideo, setSelectedVideo] = useState(
//     "/ParkPage/parkinfra/parkexterior/Building Area.mp4"
//   );

//   return (
//     <div className="flex justify-between w-full h-[502px] min-h-[502px] gap-[20px]">
//       {/* Video Section */}
//       <div className="w-[80%] ">
//         <video
//           src={selectedVideo}
//           controls
//           autoPlay
//           muted
//           loop
//           preload="metadata" // Loads only metadata initially for better performance
//           className="w-full min-h-[502px] h-[502px] object-cover shadow-lg"
//         />
//       </div>
//       {/* Card Section: Pass the callback to update video */}
//       <Parkinfracard onSelectVideo={setSelectedVideo} />
//     </div>
//   );
// };

// export default ParkContent;
// import React, { useState } from "react";
// import Parkinfracard from "./Parkinfracard";

// const ParkContent = () => {
//   const [selectedVideo, setSelectedVideo] = useState(
//     "/ParkPage/parkinfra/parkexterior/Building Area.mp4"
//   );

//   return (
//     <div className="flex justify-between w-full h-[502px] ">
//       {/* Video Section */}
//       <div className="w-auto h-full min-h-full flex items-center justify-center bg-black">
//         <video
//           src={selectedVideo}
//           controls
//           autoPlay
//           muted
//           loop
//           preload="metadata"
//           className="max-h-[502px] max-w-full object-contain shadow-lg"
//         />
//       </div>

//       {/* Card Section: Pass the callback + selected video path */}
//       <Parkinfracard
//         onSelectVideo={setSelectedVideo}
//         selectedVideo={selectedVideo}
//       />
//     </div>
//   );
// };

// export default ParkContent;

//
// import Parkinfracard from "./Parkinfracard";

// const ParkContent = ({ selectedVideo, setSelectedVideo, videos }) => {
//   return (
//     <div className="flex flex-col md:flex-row justify-between w-full gap-[20px] max-h-[502px]">
//       {/* Video Section */}
//       <div className="w-full md:w-[80%] h-full min-h-[502px] flex items-center justify-center bg-black">
//         <video
//           src={selectedVideo}
//           controls
//           autoPlay
//           muted
//           loop
//           preload="metadata"
//           className="h-full max-w-full object-contain shadow-lg"
//         />
//       </div>
//       {/* Card Section */}
//       <Parkinfracard
//         onSelectVideo={setSelectedVideo}
//         selectedVideo={selectedVideo}
//         videos={videos}
//       />
//     </div>
//   );
// };

// export default ParkContent;
//************************ */

import Parkinfracard from "./Parkinfracard";
import { motion, AnimatePresence } from "framer-motion";

const ParkContent = ({
  selectedVideo,
  setSelectedVideo,
  videos,
  activeTab,
}) => {
  // return (
  //   <div className="flex flex-col md:flex-row justify-between w-full gap-[0px] min-h-[478px]">
  //     {/* Video Section */}
  //     <AnimatePresence mode="wait">
  //       <motion.div
  //         key={Date.now()}
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //         exit={{ opacity: 0 }}
  //         transition={{ duration: 0.5, ease: "easeInOut" }}
  //         className="w-full md:w-[80%] h-full xl-1280:min-h-[478px] md:min-h-[502px] flex items-center justify-center bg-black"
  //       >
  //         <video
  //           src={selectedVideo}
  //           // controls
  //           autoPlay
  //           muted
  //           loop
  //           preload="metadata"
  //           className="min-h-[190px] sm:h-full max-w-full object-contain shadow-lg"
  //         />
  //       </motion.div>
  //     </AnimatePresence>
  //     {/* Card Section */}
  //     <Parkinfracard
  //       onSelectVideo={setSelectedVideo}
  //       selectedVideo={selectedVideo}
  //       videos={videos} // Pass the videos prop here
  //       activeTab={activeTab}
  //     />
  //   </div>
  // );
  return (
    <div className="flex flex-col md:flex-row justify-between w-full gap-[0px] min-1366:min-h-[535px] min-h-[487px]">
      {/* Video Section */}
      <div className="w-full md:w-[80%] min-h-full flex items-center justify-center bg-black">
        <AnimatePresence mode="wait">
          <motion.video
            src={selectedVideo}
            // controls
            key={Date.now()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            autoPlay
            muted
            loop
            preload="metadata"
            className="min-h-[190px] sm:h-full max-w-full object-contain shadow-lg"
          />
        </AnimatePresence>
      </div>
      {/* Card Section */}
      <Parkinfracard
        onSelectVideo={setSelectedVideo}
        selectedVideo={selectedVideo}
        videos={videos} // Pass the videos prop here
        activeTab={activeTab}
      />
    </div>
  );
};

export default ParkContent;
