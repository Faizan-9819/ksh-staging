"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ParkTabsMenu from "../../Components/parkComponents/ParkTabsMenu";
import BrochurePopForm from "../../Components/parkComponents/BrochurePopForm";

const TabMenu = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  useEffect(() => {
    document.body.style.overflow = showPopup ? "hidden" : "auto";
  }, [showPopup]);

  const tabs = [
    { title: "Overview", link: "#park-overview" },
    { title: "Park Highlights", link: "#park-highlight" },
    { title: "Location & Connectivity", link: "#location-connectivity" },
    { title: "Park Infrastructure", link: "#park-infrastructure" },
    { title: "Download Brochure", onClick: handleOpenPopup },
  ];

  return (
    <>
      <ParkTabsMenu tabs={tabs} />
      <AnimatePresence>
        {showPopup && (
          <BrochurePopForm
            onClose={handleClosePopup}
            apiEndpoint="/api/hosur-brochure"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default TabMenu;
