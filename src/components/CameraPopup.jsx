import React from "react";
import Exit from "../assets/Exit.png";
import Capture from "../assets/CaptureButton.png";

const popupStyles = {
    overlay: "fixed inset-0 bg-[#323232] bg-opacity-75 z-40",
    popup: "fixed inset-0 flex items-center justify-center z-50",
    popupBox:
        "w-[80rem] h-[50rem] bg-[#041428] rounded-lg shadow-lg p-[1rem] flex flex-col justify-center relative",
    popupHeader:
        "w-full h-[4.875rem] border-[0.375rem] border-black flex items-center px-[1rem] absolute top-0 left-0 rounded-t-lg",
    popupTitle: "text-4xl font-bold text-white",
    exitImage:
        "w-[2.5rem] h-[2.5rem] cursor-pointer absolute right-[1rem] top-1/2 transform -translate-y-1/2",
    captureButton:
        "absolute bottom-[0.5rem] right-[0.8rem] w-[5rem] h-[5rem] shadow-lg cursor-pointer",
};

const Popup = ({ title, onClose, feedUrl }) => {
    const handleCaptureClick = () => {
        const now = new Date();
        const month = now.toLocaleString("en-US", { month: "short" });
        const day = now.getDate();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const timestamp = `${month}-${day}-${hours}:${minutes}`;
        const logMessage = `${title.replace(/\s+/g, "")}-${timestamp}`;

        console.log(logMessage);
    };

    return (
        <>
            {/* Dark overlay */}
            <div className={popupStyles.overlay} onClick={onClose}></div>

            {/* Popup container */}
            <div className={popupStyles.popup}>
                <div className={popupStyles.popupBox}>
                    <div className={popupStyles.popupHeader}>
                        <h2 className={popupStyles.popupTitle}>{title}</h2>
                        <img
                            src={Exit}
                            alt="Exit"
                            className={popupStyles.exitImage}
                            onClick={onClose}
                        />
                    </div>

                    {/* Camera feed area */}
                    <div className="flex-grow mt-20 relative">
                        <div className="bg-black w-full h-full">
                            <img
                                src={feedUrl}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Capture button */}
                        <img
                            src={Capture}
                            alt="Capture Button"
                            className={popupStyles.captureButton}
                            onClick={handleCaptureClick}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popup;
