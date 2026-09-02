// // Parkinfracard.js
//

// const Parkinfracard = ({ onSelectVideo }) => {
//   // List of card items with a corresponding video URL for each
//   const parkinfra = [
//     {
//       id: 1,
//       title: "Building Area",
//       video: "/ParkPage/parkinfra/parkexterior/Building Area.mp4",
//     },
//     {
//       id: 2,
//       title: "Statistics",
//       video: "/ParkPage/parkinfra/parkexterior/Statistics.mp4",
//     },
//     {
//       id: 3,
//       title: "Roads",
//       video: "/ParkPage/parkinfra/parkexterior/Roadways.mp4",
//     },
//     {
//       id: 4,
//       title: "Building structure",
//       video: "/ParkPage/parkinfra/parkexterior/Building Area.mp4",
//     },
//     {
//       id: 5,
//       title: "Solar Roof",
//       video: "/ParkPage/parkinfra/parkexterior/Building Roof.mp4",
//     },
//     {
//       id: 6,
//       title: "Truck Apron",
//       video: "/ParkPage/parkinfra/parkexterior/Docking Apron.mp4",
//     },
//     {
//       id: 7,
//       title: "Parking",
//       video: "/ParkPage/parkinfra/parkexterior/Parking.mp4",
//     },
//   ];

//   return (
//     <div className="w-[290px] min-h-full h-[502px] px-[20px] flex flex-col justify-center gap-[20px] bg-[#E4E7EB]">
//       {parkinfra.map((park) => (
//         <div
//           key={park.id}
//           onClick={() => onSelectVideo(park.video)}
//           className="cursor-pointer border-b-[1px] border-b-[#6C8DAB] pb-[14px]"
//         >
//           <h2 className="text-[16px] text-[#092241] fsans-600">{park.title}</h2>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Parkinfracard;

//

// const Parkinfracard = ({ onSelectVideo, selectedVideo }) => {
//   const parkinfra = [
//     {
//       id: 1,
//       title: "Building Area",
//       video: "/ParkPage/parkinfra/parkexterior/Building Area.mp4",
//     },
//     {
//       id: 2,
//       title: "Statistics",
//       video: "/ParkPage/parkinfra/parkexterior/Statistics.mp4",
//     },
//     {
//       id: 3,
//       title: "Roads",
//       video: "/ParkPage/parkinfra/parkexterior/Roadways.mp4",
//     },
//     {
//       id: 4,
//       title: "Building structure",
//       video: "/ParkPage/parkinfra/parkexterior/Structure.mp4",
//     },
//     {
//       id: 5,
//       title: "Solar Roof",
//       video: "/ParkPage/parkinfra/parkexterior/Building Roof.mp4",
//     },
//     {
//       id: 6,
//       title: "Truck Apron",
//       video: "/ParkPage/parkinfra/parkexterior/Docking Apron.mp4",
//     },
//     {
//       id: 7,
//       title: "Parking",
//       video: "/ParkPage/parkinfra/parkexterior/Parking.mp4",
//     },
//   ];

//   return (
//     <div className="w-[25%] h-[502px] px-[20px] flex flex-col justify-center gap-[20px] bg-[#E4E7EB] overflow-y-auto">
//       {parkinfra.map((park) => {
//         const isActive = park.video === selectedVideo;

//         return (
//           <div
//             key={park.id}
//             onClick={() => onSelectVideo(park.video)}
//             className="cursor-pointer border-b-[1px] border-b-[#6C8DAB] pb-[14px]"
//           >
//             <h2
//               className={`text-[16px] fsans-600 ${
//                 isActive ? "text-[#092241]" : "text-[#6C8DAB]"
//               }`}
//             >
//               {park.title}
//             </h2>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Parkinfracard;

//*************************** */
// import { AnimatePresence, motion } from "framer-motion";
//

// const Parkinfracard = ({ onSelectVideo, selectedVideo, videos, activeTab }) => {
//   return (
//     <div className="w-[25%] h-[526px] px-[20px] flex flex-col justify-center gap-[20px] bg-[#E4E7EB] overflow-y-auto">
//       {videos.map((videoItem) => {
//         const isActive = videoItem.video === selectedVideo;

//         return (
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTab}
//               initial={{ x: `${activeTab === 2 ? "100%" : "-100%"}` }}
//               animate={{ x: 0 }}
//               exit={{
//                 x: `${activeTab === 2 ? "100%" : "-100%"}`,
//                 transition: { duration: 1 },
//               }}
//               transition={{ duration: 1 }}
//               onClick={() => onSelectVideo(videoItem.video)}
//               className={`cursor-pointer border-b-[1px] border-b-[#6C8DAB] pb-[14px] transition-colors duration-300 `}
//             >
//               <h2
//                 className={`text-[16px] fsans-600 ${
//                   isActive ? "text-[#092241]" : "text-[#6C8DAB]"
//                 }`}
//               >
//                 {videoItem.title}
//               </h2>
//             </motion.div>
//           </AnimatePresence>
//         );
//       })}
//     </div>
//   );
// };

// export default Parkinfracard;

import { AnimatePresence, motion } from "framer-motion";

const Parkinfracard = ({ onSelectVideo, selectedVideo, videos, activeTab }) => {
  // return (
  //   <div className="w-[25%] min-h-[478px] min-1366:h-[527px] lg:min-h-[478px] overflow-hidden px-[20px] flex flex-col justify-center gap-[20px] bg-[#E4E7EB] overflow-y-auto">
  //     <AnimatePresence mode="wait">
  //       {videos.map((videoItem) => {
  //         const isActive = videoItem.video === selectedVideo;
  //         return (
  //           <motion.div
  //             // Generate a unique key for each card that updates on tab change.
  //             key={`card-${activeTab}-${videoItem.id}`}
  //             initial={{ x: activeTab === 2 ? "100%" : "-100%", opacity: 0 }}
  //             animate={{ x: 0, opacity: 1 }}
  //             exit={{
  //               x: activeTab === 2 ? "100%" : "-100%",
  //               opacity: 0,
  //               transition: { duration: 0.8, ease: [0.7, 0, 0.4, 1] },
  //             }}
  //             transition={{ duration: 0.8, ease: [0.7, 0, 0.4, 1] }}
  //             onClick={() => onSelectVideo(videoItem.video)}
  //             className={`cursor-pointer [&:not(:last-child)]:border-b-[1px] overflow-hidden pb-[20px] transition-colors duration-300 ${
  //               isActive
  //                 ? "border-b-[#092241]"
  //                 : " border-b-[#6C8DAB] hover:border-b-[#092241]"
  //             }`}
  //           >
  //             <p
  //               className={`text-[16px] spotlightheaddd fsans-600 transition-colors duration-200  ${
  //                 isActive
  //                   ? "text-[#092241]"
  //                   : "text-[#6C8DAB] hover:text-[#092241]"
  //               }`}
  //             >
  //               {videoItem.title}
  //             </p>
  //           </motion.div>
  //         );
  //       })}
  //     </AnimatePresence>
  //   </div>
  // );
  return (
    <div className="w-[25%] min-h-full overflow-hidden px-[20px] flex flex-col justify-center gap-[20px] bg-[#E4E7EB] overflow-y-auto">
      <AnimatePresence mode="wait">
        {videos.map((videoItem) => {
          const isActive = videoItem.video === selectedVideo;
          return (
            <motion.div
              // Generate a unique key for each card that updates on tab change.
              key={`card-${activeTab}-${videoItem.id}`}
              initial={{ x: activeTab === 2 ? "100%" : "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{
                x: activeTab === 2 ? "100%" : "-100%",
                opacity: 0,
                transition: { duration: 0.8, ease: [0.7, 0, 0.4, 1] },
              }}
              transition={{ duration: 0.8, ease: [0.7, 0, 0.4, 1] }}
              onClick={() => onSelectVideo(videoItem.video)}
              className={`cursor-pointer hover:border-b-[#092241] group hover:text-[#092241] [&:not(:last-child)]:border-b-[1px] overflow-hidden [&:not(:last-child)]:pb-[20px] transition-colors duration-300 ${
                isActive ? "border-b-[#092241]" : " border-b-[#6C8DAB] "
              }`}
            >
              <p
                className={`text-[16px] spotlightheaddd group-hover:text-[#092241] fsans-600 transition-colors duration-200  ${
                  isActive ? "text-[#092241]" : "text-[#6C8DAB] "
                }`}
              >
                {videoItem.title}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>
      {/* <AnimatePresence mode="wait">
        {videos.map((videoItem) => {
          const isActive = videoItem.video === selectedVideo;
          return (
            <motion.div
              // Generate a unique key for each card that updates on tab change.
              key={`card-${activeTab}-${videoItem.id}`}
              initial={{ x: activeTab === 2 ? "100%" : "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{
                x: activeTab === 2 ? "100%" : "-100%",
                opacity: 0,
                transition: { duration: 0.8, ease: [0.7, 0, 0.4, 1] },
              }}
              transition={{ duration: 0.8, ease: [0.7, 0, 0.4, 1] }}
              onClick={() => onSelectVideo(videoItem.video)}
              className={`cursor-pointer hover:border-b-[#092241] hover:text-[#092241] [&:not(:last-child)]:border-b-[1px] overflow-hidden [&:not(:last-child)]:pb-[20px] transition-colors duration-300 ${
                isActive ? "border-b-[#092241]" : " border-b-[#6C8DAB] "
              }`}
            >
              <p
                className={`text-[16px] spotlightheaddd fsans-600 transition-colors duration-200  ${
                  isActive
                    ? "text-[#092241]"
                    : "text-[#6C8DAB] hover:text-[#092241]"
                }`}
              >
                {videoItem.title}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence> */}
    </div>
  );
};

export default Parkinfracard;
