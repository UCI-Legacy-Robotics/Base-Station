import React, { useState } from "react";
import Layout from "../components/Layout";
import CameraPopup from "../components/CameraPopup";

const styles = {
    Quadrant:
        "bg-[#041428] flex flex-col justify-start items-start text-white relative p-4 rounded-md",
    QuadrentTitle: "text-white text-[1.5em] mb-2 font-chivo font-semibold",
    Content: "flex-grow bg-[#0A1E2B] w-full h-full rounded cursor-pointer",
};

const Cams = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [feedUrl, setFeedUrl] = useState("");

    const handleContentClick = (title, url) => {
        if (title !== "GNSS Map" && title !== "Gazebo") {
            setPopupTitle(title);
            setFeedUrl(url);
            setShowPopup(true);
        }
    };

    const closePopup = () => setShowPopup(false);

    return (
        <Layout>
            <div className="h-full w-full grid grid-rows-2 gap-[1rem]">
                {/* Cameras */}
                <div className="grid grid-cols-3 gap-[1rem]">
                    {/* ZED Camera 1 */}
                    <div
                        className={styles.Quadrant}
                        onClick={() =>
                            handleContentClick("ZED Camera 1", "url_to_feed1")
                        }
                    >
                        <h2 className={styles.QuadrentTitle}>ZED Camera 1</h2>
                        <div className={styles.Content}></div>
                    </div>
                    {/* ZED Camera 2 */}
                    <div
                        className={styles.Quadrant}
                        onClick={() =>
                            handleContentClick("ZED Camera 2", "url_to_feed2")
                        }
                    >
                        <h2 className={styles.QuadrentTitle}>ZED Camera 2</h2>
                        <div className={styles.Content}></div>
                    </div>
                    {/* Arm ArduCam */}
                    <div
                        className={styles.Quadrant}
                        onClick={() =>
                            handleContentClick("Arm ArduCam", "url_to_feed3")
                        }
                    >
                        <h2 className={styles.QuadrentTitle}>Arm ArduCam</h2>
                        <div className={styles.Content}></div>
                    </div>
                </div>

                {/* Bottom row with 2 columns */}
                <div className="grid grid-cols-2 gap-[1rem]">
                    {/* GNSS Map */}
                    <div
                        className={styles.Quadrant}
                        onClick={() => handleContentClick("GNSS Map")}
                    >
                        <h2 className={styles.QuadrentTitle}>GNSS Map</h2>
                        <div className={styles.Content}></div>
                    </div>
                    {/* Gazebo */}
                    <div
                        className={styles.Quadrant}
                        onClick={() => handleContentClick("Gazebo")}
                    >
                        <h2 className={styles.QuadrentTitle}>Gazebo</h2>
                        <div className={styles.Content}></div>
                    </div>
                </div>
            </div>

            {/* Render Popup */}
            {showPopup && (
                <CameraPopup
                    title={popupTitle}
                    onClose={closePopup}
                    feedUrl={feedUrl}
                />
            )}
        </Layout>
    );
};

export default Cams;
