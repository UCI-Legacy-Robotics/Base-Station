import React, { useState } from "react";
import Layout from "../components/Layout";
import PicturePopup from "../components/PicturePopup";
import ImageIcon from "../assets/ImageIcon.png";
import RemoveIcon from "../assets/RemoveIcon.png";

const styles = {
  HeaderContainer:
    "bg-[#0A2342] w-full flex items-center justify-between flex-shrink-0 border-4 border-black py-2",
  HeaderText:
    "text-white text-[1.5em] font-chivo font-bold flex justify-center w-1/3",
  ScrollContainer:
    "h-[calc(100%-4rem)] w-full overflow-y-auto rounded-b-md flex-grow space-y-2 pt-2",
  EntryContainer:
    "bg-[#1D4156] rounded-md border-4 border-black flex items-center justify-between py-2 px-4 cursor-pointer",
  EntryText:
    "text-white font-semibold font-chivo flex items-center justify-center text-center w-1/3",
  RemoveIcon: "h-6 w-6 cursor-pointer opacity-90 hover:opacity-100",
};

const Pictures = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [popupTitle, setPopupTitle] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [entries, setEntries] = useState([]
    // Array.from({ length: 20 }, (_, i) => ({
    //   name: `ZEDCamera${(i % 2) + 1}-Dec-30-12:21`,
    //   timestamp: "12:21:00",
    //   camera: `ZED Camera ${(i % 2) + 1}`,
    // }))
  );

  // Remove Photo
  const handleRemove = (indexToRemove) => {
    setEntries((prevEntries) =>
      prevEntries.filter((_, index) => index !== indexToRemove)
    );
  };
  // Click Photo
  const handleEntryClick = (entryName, index) => {
    setSelectedIndex(index);
    setPopupTitle(entryName);
    setShowPopup(true);
  };
  // Close Popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedIndex(null);
  };

  return (
    <Layout>
      <div className="bg-[#041428] h-full w-full rounded-b-md text-white p-4">
        {/* 
          Header Container
        */}
        <div className={styles.HeaderContainer}>
          <div className={styles.HeaderText}>Name</div>
          <div className={styles.HeaderText}>Timestamp</div>
          <div className={styles.HeaderText}>Associated Camera</div>
        </div>

        {/* 
          Scroll Area
        */}
        <div className={styles.ScrollContainer}>
          {/* Entry Container */}
          {entries.map((entry, index) => (
            <div
              key={index}
              onClick={() => handleEntryClick(entry.name, index)}
              className={`${styles.EntryContainer} ${
                selectedIndex === index ? "bg-[#56656E]" : "hover:bg-[#2A4A5E]"
              }`}
            >
              {/* Entry Contents */}
              <img src={ImageIcon} alt="Image Icon" className="h-6 w-6" />
              <div className={styles.EntryText}>{entry.name}</div>
              <div className={styles.EntryText}>{entry.timestamp}</div>
              <div className={styles.EntryText}>{entry.camera}</div>
              <img
                src={RemoveIcon}
                alt="Remove Icon"
                className={styles.RemoveIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Picture Popup */}
      {showPopup && (
        <PicturePopup title={popupTitle} onClose={handleClosePopup} />
      )}
    </Layout>
  );
};

export default Pictures;
