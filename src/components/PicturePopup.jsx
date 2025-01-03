import React from "react";
import CloseIcon from "../assets/Exit.png";

const styles = {
  Overlay: "fixed inset-0 bg-[#323232] bg-opacity-75 z-40",
  Popup: "fixed inset-0 flex items-center justify-center z-50",
  PopupContainer:
    "w-[80rem] h-[50rem] bg-[#041428] rounded-lg shadow-lg p-4 flex flex-col justify-center relative",
  Header:
    "w-full h-[4.875rem] border-[0.375rem] border-black flex items-center px-4 rounded-t-lg absolute top-0 left-0",
  Title: "text-4xl font-normal text-white font-russo",
  CloseButton:
    "w-[2.5rem] h-[2.5rem] cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2",
  ContentArea: "flex-grow mt-20 relative bg-black w-full h-full rounded",
};

const PicturePopup = ({ title, onClose }) => {
  return (
    <>
      <div className={styles.Overlay} onClick={onClose}></div>
      <div className={styles.Popup}>
        <div className={styles.PopupContainer}>
          {/* 
            Header
          */}
          <div className={styles.Header}>
            {/* Title */}
            <h2 className={styles.Title}>{title}</h2>
            {/* Exit Icon */}
            <img
              src={CloseIcon}
              alt="Close"
              className={styles.CloseButton}
              onClick={onClose}
            />
          </div>

          {/* Content Area */}
          <div className={styles.ContentArea}>{/* Image here */}</div>
        </div>
      </div>
    </>
  );
};

export default PicturePopup;
