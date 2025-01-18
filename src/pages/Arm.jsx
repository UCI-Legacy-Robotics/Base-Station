import React, { useState } from "react";
import Layout from "../components/Layout";
import CameraPopup from "../components/CameraPopup";

const styles = {
    CardhalfHeight: "bg-[#041428] rounded-md p-[1rem] flex flex-col h-1/2",
    CardLarge: "bg-[#041428] rounded-md p-[1rem] flex flex-col flex-grow-[2]",
    flexGrowCol: "flex-grow flex flex-col gap-[1rem]",
    controlsRow: "flex gap-[1rem] mt-auto",
    launchKeyContainer:
        "flex-grow-[10] h-20 bg-[#041428] rounded-md flex items-center px-4 gap-[1rem]",
    abortContainer:
        "flex-grow h-20 bg-[#041428] rounded-md p-4 flex items-center",
    Header: "text-white text-[1.5em] mb-2 font-chivo font-semibold",
    Cam: "bg-[#305E69] w-full h-full rounded-md flex-grow",
    ArmOrintation: "border boarder-white w-full h-full rounded-md flex-grow",
    TextInput:
        "bg-[#56656E] text-white text-[1.3rem] font-russo p-[1rem] rounded-md flex-grow h-[3rem]",
    EnterButton:
        "bg-[#305E69] text-white text-[1.3rem] font-russo font-light rounded-md " +
        "opacity-100 hover:opacity-60 transition-opacity w-[10rem] h-[3rem] flex items-center justify-center",
    AbortButton:
        "bg-[#9B111E] text-white text-[1.3rem] font-russo font-light px-[1rem] " +
        "rounded-md opacity-100 hover:opacity-60 transition-opacity w-full h-[3rem] flex items-center justify-center",
};

const Arm = () => {
    // Launch Key Handler
    const [launchKey, setLaunchKey] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [feedUrl, setFeedUrl] = useState("");

    const handleEnter = () => {
        console.log("Launch Key:", launchKey);
        setLaunchKey("");
    };

    // Abort Handler
    const handleAbort = () => {
        console.log("Abort Auto-Typing triggered");
    };

    // Parse Text Input
    const handleInputChange = (e) => {
        const rawValue = e.target.value.replace(/\s+/g, "");
        setLaunchKey(rawValue);
    };

    const handlePopupOpen = (title, url) => {
        setPopupTitle(title);
        setFeedUrl(url);
        setShowPopup(true);
    };

    const handlePopupClose = () => setShowPopup(false);

    const spacedValue = launchKey.split("").join(" ");

    return (
        <Layout>
            <div className="h-full w-full flex flex-col gap-[1rem]">
                {/* 
          Cams and Orientation 
        */}
                <div className={`flex gap-[1rem] flex-grow`}>
                    {/* ArduCam */}
                    <div className={styles.CardLarge}>
                        <h1 className={styles.Header}>Ardu Cam</h1>
                        <div
                            className={styles.Cam}
                            onClick={() =>
                                handlePopupOpen(
                                    "Ardu Cam",
                                    "url_to_arducam_feed"
                                )
                            }
                        />
                    </div>

                    {/* 
            Right Section
          */}
                    <div className={styles.flexGrowCol}>
                        {/* Arm Orientation */}
                        <div className={styles.CardhalfHeight}>
                            <h1 className={styles.Header}>Arm Orientation</h1>
                            <div className={styles.ArmOrintation}>
                                {/* Orientation feed */}
                            </div>
                        </div>

                        {/* ZedCam */}
                        <div className={styles.CardhalfHeight}>
                            <h1 className={styles.Header}>Zed Camera 1</h1>
                            <div
                                className={styles.Cam}
                                onClick={() =>
                                    handlePopupOpen(
                                        "Zed Camera 1",
                                        "url_to_zedcam1_feed"
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* 
          Controls
        */}
                <div className={styles.controlsRow}>
                    {/* Launch Key Controls */}
                    <div className={styles.launchKeyContainer}>
                        <input
                            type="text"
                            value={spacedValue}
                            onChange={handleInputChange}
                            placeholder="Enter Launch Key"
                            className={styles.TextInput}
                        />
                        <button
                            onClick={handleEnter}
                            className={styles.EnterButton}
                        >
                            Enter
                        </button>
                    </div>

                    {/* Abort Auto-Typing Button */}
                    <div className={styles.abortContainer}>
                        <button
                            onClick={handleAbort}
                            className={styles.AbortButton}
                        >
                            Abort Auto-Typing
                        </button>
                    </div>
                </div>

                {/* Camera Popup */}
                {showPopup && (
                    <CameraPopup
                        title={popupTitle}
                        onClose={handlePopupClose}
                        feedUrl={feedUrl}
                    />
                )}
            </div>
        </Layout>
    );
};

export default Arm;
