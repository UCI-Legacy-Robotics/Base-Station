import React, { useState } from "react";
import Layout from "../components/Layout";
import ToggleSwitch from "../components/ToggleSwitch";
import Popup from "../components/Popup";

import VerticalDivide from "../assets/VerticalDivide.png";
import IdleData from "../assets/IdleData.png";
import CapturedData from "../assets/CapturedData.png";
import LoadingData from "../assets/LoadingData.png";

const styles = {
  Container:
    "bg-[#041428] rounded-md col-span-1 p-4 flex flex-col justify-between",
  Camera: "bg-[#305E69] w-full h-full rounded-md flex-grow cursor-pointer",
  BottomContainer: "bg-[#041428] rounded-md w-full px-4 py-4",
  SectionTitle: "text-white text-[1.5em] mb-2 font-chivo-semibold",
  HeaderLabel: "text-white font-chivo-semibold text-[2rem] mb-1",
  Label: "text-white font-chivo-semibold text-[1.4rem]",
  StatusBox: "bg-[#56656E] text-white text-center rounded-md p-3 w-[5.5rem]",
  DrillContainer: "flex flex-col items-start",
  DepthContainer: "flex flex-col items-center w-full",
  DataiconContainer: "h-full w-full",
};

const Science = () => {
  // Toggle states
  const [isDrillToggled, setIsDrillToggled] = useState(false);
  const [isSensorsToggled, setIsSensorsToggled] = useState(false);

  // Status states
  const [drillStatus, setDrillStatus] = useState("Raised");
  const [depth, setDepth] = useState(0);
  const [sensorStatus, setSensorStatus] = useState("Raised");

  // Positions
  const [drillPosition, setDrillPosition] = useState("Raised");
  const [sensorPosition, setSensorPosition] = useState("Raised");

  // Data image
  const [currentDataImage, setCurrentDataImage] = useState("idle");
  const dataImageMap = {
    loading: LoadingData,
    idle: IdleData,
    captured: CapturedData,
  };

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupFeed, setPopupFeed] = useState("");

  // Camera Feeds
  const arduCam1Feed = "";
  const arduCam2Feed = "";

  // Popup actions
  const openPopup = (title, feedUrl) => {
    setPopupTitle(title);
    setPopupFeed(feedUrl);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupTitle("");
    setPopupFeed("");
  };

  // Update data image
  const changeDataImage = (imageKey) => {
    if (dataImageMap[imageKey]) {
      setCurrentDataImage(imageKey);
    } else {
      console.warn(`Invalid image key: ${imageKey}`);
    }
  };

  // Toggle functions
  const toggleDrill = () => {
    setIsDrillToggled((prevState) => {
      const newState = !prevState;
      setDrillStatus(newState ? "Enabled" : "Disabled");
      return newState;
    });
  };

  const toggleSensors = () => {
    setIsSensorsToggled((prevState) => {
      const newState = !prevState;
      setSensorStatus(newState ? "Enabled" : "Disabled");
      return newState;
    });
  };

  return (
    <Layout>
      <div className="h-full w-full grid grid-rows-[5fr_1fr] grid-cols-2 gap-[1rem]">
        {/* ArduCam 1 */}
        <div className={styles.Container}>
          <p className={styles.SectionTitle}>ArduCam 1</p>
          <div
            className={styles.Camera}
            onClick={() => openPopup("ArduCam 1", arduCam1Feed)}
          ></div>
        </div>

        {/* ArduCam 2 */}
        <div className={styles.Container}>
          <p className={styles.SectionTitle}>ArduCam 2</p>
          <div
            className={styles.Camera}
            onClick={() => openPopup("ArduCam 2", arduCam2Feed)}
          ></div>
        </div>

        {/* Control panel */}
        <div className="col-span-2 flex justify-center items-center">
          {/*
            Controls
          */}
          <div className={styles.BottomContainer}>
            <div className="flex w-full items-center justify-between">
              {/*
                Drill
              */}
              <div className="flex items-center gap-10">
                {/* Drill Toggle */}
                <div className={styles.DrillContainer}>
                  <h1 className={styles.HeaderLabel}>Drill</h1>
                  <ToggleSwitch
                    labelLeft="Disabled"
                    labelRight="Enabled"
                    isToggled={isDrillToggled}
                    onToggle={toggleDrill}
                    knobColorOn="#00FF00"
                    knobColorOff="#FF0000"
                  />
                </div>

                {/* Drill Position */}
                <div className="flex flex-col items-center">
                  <p className={styles.Label}>Status</p>
                  <div className={styles.StatusBox}>{drillPosition}</div>
                </div>

                {/* Depth */}
                <div className="flex flex-col items-center">
                  <p className={styles.Label}>Depth</p>
                  <div className={styles.StatusBox}>{depth} cm</div>
                </div>
              </div>

              {/* Divider in the middle */}
              <img
                src={VerticalDivide}
                alt="Divider"
                className="h-[5rem] pr-2"
              />

              {/*
                Sensors
              */}
              <div className="flex items-center gap-10">
                {/* Sensors Toggle */}
                <div className={styles.DrillContainer}>
                  <h1 className={styles.HeaderLabel}>Sensors</h1>
                  <ToggleSwitch
                    labelLeft="Disabled"
                    labelRight="Enabled"
                    isToggled={isSensorsToggled}
                    onToggle={toggleSensors}
                    knobColorOn="#00FF00"
                    knobColorOff="#FF0000"
                  />
                </div>

                {/* Sensor Position */}
                <div className="flex flex-col items-center">
                  <p className={styles.Label}>Status</p>
                  <div className={styles.StatusBox}>{sensorPosition}</div>
                </div>

                {/* Data */}
                <div className="flex flex-col items-center">
                  <p className={styles.Label}>Data</p>
                  <div className="px-3 w-[5rem]">
                    <img
                      src={dataImageMap[currentDataImage]}
                      alt="Data Capture Indicator"
                      className={styles.DataiconContainer}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render Popup with the feedUrl */}
      {showPopup && (
        <Popup title={popupTitle} onClose={closePopup} feedUrl={popupFeed} />
      )}
    </Layout>
  );
};

export default Science;
