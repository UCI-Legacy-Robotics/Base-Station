import React from "react";
import Exit from "../assets/Exit.png";
import Arrow from "../assets/Arrow.png";

const styles = {
    Overlay: "fixed inset-0 bg-[#323232] bg-opacity-75 z-50",
    PopupContainer: "fixed inset-0 flex items-center justify-center z-50",
    PopupBox: "w-[80rem] h-[50rem] bg-[#041428] rounded-md shadow-lg relative",
    PopupHeader:
        "w-full h-[4.875rem] border-[0.375rem] border-black flex justify-between items-center px-[1rem] absolute top-0 left-0 rounded-t-lg",
    PopupTitle: "text-4xl font-bold text-white",
    ExitButton:
        "w-[2.5rem] h-[2.5rem] cursor-pointer flex items-center justify-center hover:opacity-50",
    PopupContent:
        "absolute inset-x-0 bottom-0 top-[4.875rem] p-[1rem] bg-[#041428] rounded-b-md",
    ArrowBottomRight:
        "absolute bottom-[1rem] right-[1rem] w-[3rem] h-[3rem] cursor-pointer hover:opacity-50",
    ArrowBottomLeft:
        "absolute bottom-[1rem] left-[1rem] w-[3rem] h-[3rem] cursor-pointer transform rotate-180",
};

const Popup = ({ isPopupVisible, currentPopup, closePopup, switchPopup }) => {
    if (!isPopupVisible) return null;

    return (
        <>
            {/* Overlay */}
            <div className={styles.Overlay} />

            {/* Popup Container */}
            <div className={styles.PopupContainer}>
                {/* Popup Box */}
                <div className={styles.PopupBox}>
                    {/* 
            Header Bar
          */}
                    <div className={styles.PopupHeader}>
                        {/* Title */}
                        <h2 id="popup-title" className={styles.PopupTitle}>
                            {currentPopup}
                        </h2>
                        {/* Exit */}
                        <button
                            aria-label="Close Popup"
                            className={styles.ExitButton}
                            onClick={closePopup}
                        >
                            <img
                                src={Exit}
                                alt="Close"
                                className="w-full h-full"
                            />
                        </button>
                    </div>
                    {/* 
            Content
          */}
                    <div className={styles.PopupContent}>
                        <div className="bg-black w-full h-full">
                            {/* Final Image of Controls here */}
                        </div>
                        {/* Next Page */}
                        <img
                            src={Arrow}
                            alt="Switch Popup"
                            className={
                                currentPopup === "Drive Controls"
                                    ? styles.ArrowBottomRight
                                    : styles.ArrowBottomLeft
                            }
                            onClick={switchPopup}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popup;
