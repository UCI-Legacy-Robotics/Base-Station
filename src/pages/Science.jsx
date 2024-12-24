import React, { useState } from "react";
import Layout from "../components/Layout";
import ToggleSwitch from "../components/ToggleSwitch";
import VerticalDivide from "../assets/VerticalDivide.png";
import IdleData from "../assets/IdleData.png";
import CapturedData from "../assets/CapturedData.png";
import LoadingData from "../assets/LoadingData.png";
import Exit from "../assets/Exit.png";
import Capture from "../assets/CaptureButton.png";

const styles = {
  Container:
    "bg-[#041428] rounded-md col-span-1 p-4 flex flex-col justify-between",
  Camera: "bg-[#305E69] w-full h-full rounded-md flex-grow cursor-pointer",
  BottomContainer: "bg-[#041428] rounded-md w-fit px-4 py-4 -ml-8",
  SectionTitle: "text-white text-[1.5em] mb-2 font-chivo-semibold",
  HeaderLabel: "text-white font-chivo-semibold text-[2rem] mb-1",
  Label: "text-white font-chivo-semibold text-[1.4rem]",
  StatusBox: "bg-[#56656E] text-white text-center rounded-md p-3 w-[5rem]",
  DrillContainer: "flex flex-col items-start",
  DepthContainer: "flex flex-col items-center w-full",
  Dataicon: "h-full w-full",

  // Popup styles
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

const Science = () => {
  // Toggle states
  const [isDrillToggled, setIsDrillToggled] = useState(false);
  const [isSensorsToggled, setIsSensorsToggled] = useState(false);

  // Status states
  const [drillStatus, setDrillStatus] = useState("Raised");
  const [depth, setDepth] = useState(0);
  const [sensorStatus, setSensorStatus] = useState("Raised");

  // Data image
  const [currentDataImage, setCurrentDataImage] = useState("idle");
  const dataImageMap = {
    loading: LoadingData,
    idle: IdleData,
    captured: CapturedData,
  };

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");

  // Popup actions
  const openPopup = (title) => {
    setPopupTitle(title);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Inline Popup
  const Popup = ({ title, onClose }) => {
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
        <div className={styles.overlay} onClick={onClose}></div>

        {/* Popup container */}
        <div className={styles.popup}>
          <div className={styles.popupBox}>
            <div className={styles.popupHeader}>
              <h2 className={styles.popupTitle}>{title}</h2>
              <img
                src={Exit}
                alt="Exit"
                className={styles.exitImage}
                onClick={onClose}
              />
            </div>

            {/* camera feed area */}
            <div className="flex-grow mt-20 relative">
              <div className="bg-black w-full h-full">{/* feed here */}</div>
              <img
                src={Capture}
                alt="Capture Button"
                className={styles.captureButton}
                onClick={handleCaptureClick}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  // Change data image
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
      <div className="h-full w-full grid grid-rows-[5fr_1fr] grid-cols-2 gap-4">
        {/*
          ArduCam 1
        */}
        <div className={styles.Container}>
          <p className={styles.SectionTitle}>ArduCam 1</p>
          <div
            className={styles.Camera}
            onClick={() => openPopup("ArduCam 1")}
          ></div>
        </div>

        {/*
          ArduCam 2
        */}
        <div className={styles.Container}>
          <p className={styles.SectionTitle}>ArduCam 2</p>
          <div
            className={styles.Camera}
            onClick={() => openPopup("ArduCam 2")}
          ></div>
        </div>

        {/* 
          control panel
        */}
        <div className="col-span-2 flex justify-center items-center">
          <div className={styles.BottomContainer}>
            <div className="flex items-center justify-center w-full h-full">
              {/* Left controls */}
              <div className="flex items-baseline space-x-14">
                {/* Drill */}
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

                {/* Depth */}
                <div className={styles.DepthContainer}>
                  <p className={styles.Label}>Depth</p>
                  <div className={styles.StatusBox}>{depth} cm</div>
                </div>
              </div>

              {/* Divider */}
              <img
                src={VerticalDivide}
                alt="Divider"
                className="mx-8 h-[5rem]"
              />

              {/* Right controls */}
              <div className="flex items-baseline space-x-14">
                {/* Sensors */}
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

                {/* Data */}
                <div className={styles.DepthContainer}>
                  <p className={styles.Label}>Data</p>
                  <img
                    src={dataImageMap[currentDataImage]}
                    alt="Data Capture Indicator"
                    className={styles.Dataicon}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render the Popup */}
      {showPopup && <Popup title={popupTitle} onClose={closePopup} />}
    </Layout>
  );
};

export default Science;
