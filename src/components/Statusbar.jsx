import React, { useState } from 'react';

import TeleopIndicator from '../assets/BlueIndicator.png';
import AutoIndicator from '../assets/RedIndicator.png';
import ArrivalIndicator from '../assets/GreenIndicator.png';
import EmptyBattery from '../assets/EmptyBattery.png';
import NoConnection from '../assets/NoConnection.png';
import LowConnection from '../assets/LowConnection.png';
import HighConnection from '../assets/HighConnection.png';
import Exit from '../assets/Exit.png';
import ExitWarning from '../assets/ExitBlack.png';
import AlertIndicator from '../assets/AlertIndicator.png';
import ErrorIndicator from '../assets/ErrorIndicator.png';
import WarningIndicator from '../assets/WarningIndicator.png';

// Extended styles object with updated classes
const styles = {
  container: "fixed top-[1rem] right-[1rem] w-[55rem] h-[3.75rem] bg-[#041428] rounded-lg flex justify-center items-center px-[0.375rem] shadow-lg",
  content: "flex items-center gap-[2.2rem] justify-between",
  text: "text-white font-chivo text-base text-[1.14em] cursor-pointer",
  image: "w-[2rem] h-[2rem] cursor-pointer",
  popup: "fixed inset-0 flex items-center justify-center z-50",
  popupBox: "w-[50rem] h-[31.25rem] bg-[#041428] rounded-lg shadow-lg p-[1rem] flex flex-col justify-between relative",
  popupHeader: "w-full h-[4.875rem] border-[0.375rem] border-black flex items-center px-[1rem] absolute top-0 left-0 rounded-t-lg",
  popupTitle: "text-4xl font-bold",
  exitImage: "w-[2.5rem] h-[2.5rem] cursor-pointer absolute right-[1rem] top-1/2 transform -translate-y-1/2",
  popupButtons: "flex justify-end gap-[1rem] absolute bottom-[1rem] right-[1rem]",
  buttonStop: "px-[2rem] py-[0.5rem] rounded-[0.5rem] bg-[#9B111E] text-white font-russo text-[1.4em] hover:opacity-80",
  buttonStart: "px-[2rem] py-[0.5rem] rounded-[0.5rem] bg-[#305E69] text-white font-russo text-[1.4em] hover:opacity-80",
  overlay: "fixed inset-0 bg-[#323232] bg-opacity-75 z-40",
};

const StatusBar = () => {
  // State variables
  const [longitude, setLongitude] = useState("000.000");
  const [latitude, setLatitude] = useState("000.000");
  const [altitude, setAltitude] = useState("000m");
  const [timer, setTimer] = useState("00:00:00");
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [batteryLevel, setBatteryLevel] = useState("0%");
  const [statusIndicator, setStatusIndicator] = useState("Alert"); // Possible values: "Alert", "Error", "Warning"
  const [modeIndicator, setModeIndicator] = useState("Teleop"); // Possible values: "Teleop", "Arrival", "Auto"
  const [connectionIndicator, setConnectionIndicator] = useState("None"); //Possible values: "None", "Low", "Good"

  // State for pop-ups
  const [showTimerPopup, setShowTimerPopup] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);

  // Determine which connection image to display
  const connectionImage = connectionStatus === "Connected" ? HighConnection : LowConnection;

  // Map statusIndicator value to corresponding image
  const statusIndicatorImage = {
    Alert: AlertIndicator,
    Error: ErrorIndicator,
    Warning: WarningIndicator,
    }[statusIndicator];

  // Map modeIndicator value to corresponding image
  const modeIndicatorImage = {
    Teleop: TeleopIndicator,
    Arrival: ArrivalIndicator,
    Auto: AutoIndicator,
    }[modeIndicator];

  // Map connectionIndicator value to corresponding image
  const connectionIndicatorImage = {
    None: NoConnection,
    Low: LowConnection,
    Good: HighConnection,
    }[connectionIndicator] || NoConnection;

  // Handlers for clickable elements
  const handleTimerClick = () => {
    setShowTimerPopup(true);
  };

  const handleAlertClick = () => {
    if (statusIndicator === "Error" || statusIndicator === "Warning") {
      setShowAlertPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowTimerPopup(false);
    setShowAlertPopup(false);
  };

  const handleStartClick = () => {
    console.log("Start");
    setShowTimerPopup(false);
  };

  const handleStopClick = () => {
    console.log("Stop");
    setShowTimerPopup(false);
  };

  // Determine popup header background color based on statusIndicator
  const getPopupHeaderStyle = () => {
    switch (statusIndicator) {
      case "Error":
        return { backgroundColor: "#9B111E" };
      case "Warning":
        return { backgroundColor: "#EED202" };
      default:
        return { backgroundColor: "#0A2342" };
    }
  };

  // Determine popupTitle text color based on statusIndicator
  const getPopupTitleStyle = () => {
    return statusIndicator === "Warning" ? { color: "#000000" } : { color: "#FFFFFF" };
  };

  // Determine which exit image to use based on statusIndicator
  const getExitImage = () => {
    return statusIndicator === "Warning" ? ExitWarning : Exit;
  };

  return (
    <>
      {/* Timer Popup */}
      {showTimerPopup && (
        <>
          <div className={styles.overlay} onClick={handleClosePopup}></div>
          <div className={styles.popup}>
            <div className={styles.popupBox}>
              <div className={styles.popupHeader} style={{ backgroundColor: "#0A2342" }}>
                <h2
                  className={styles.popupTitle}
                  style={{ color: "#FFFFFF" }}
                >
                  Set Timer
                </h2>
                <img
                  src={Exit}
                  alt="Exit"
                  className={styles.exitImage}
                  onClick={handleClosePopup}
                />
              </div>
              {/* Buttons */}
              <div className={styles.popupButtons}>
                <button
                  className={styles.buttonStop}
                  onClick={handleStopClick}
                >
                  Stop
                </button>
                <button
                  className={styles.buttonStart}
                  onClick={handleStartClick}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className={styles.container}>
        {/* Group all items in a single div */}
        <div className={styles.content}>
          {/* Location Information */}
          <p className={styles.text}>Lon: {longitude}</p>
          <p className={styles.text}>Lat: {latitude}</p>
          <p className={styles.text}>Alti: {altitude}</p>

          {/* Timer with Mode Indicator */}
          <img src={modeIndicatorImage} alt="Mode Indicator" className={styles.image} />
          <p className={styles.text} onClick={handleTimerClick}>Timer: {timer}</p>

          {/* Connection Status Image */}
          <img
            src={connectionIndicatorImage}
            alt="Connection Status"
            className={styles.image}
          />

          {/* Battery Status */}
          <img src={EmptyBattery} alt="Battery Status" className={styles.image} />
          
          {/* Status Indicator Image */}
          <img
            src={statusIndicatorImage}
            alt={`${statusIndicator} Indicator`}
            className={`${styles.image} ${statusIndicator === "Alert" ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleAlertClick}
            title={statusIndicator === "Alert" ? "No details available" : `${statusIndicator}`}
          />
        </div>
      </div>

      {/* Alert Popup */}
      {showAlertPopup && (
        <>
          <div className={styles.overlay} onClick={handleClosePopup}></div>
          <div className={styles.popup}>
            <div className={styles.popupBox}>
              <div className={styles.popupHeader} style={getPopupHeaderStyle()}>
                <h2
                  className={styles.popupTitle}
                  style={getPopupTitleStyle()}
                >
                  {statusIndicator === "Alert" ? "Alert" : `${statusIndicator}`}
                </h2>
                <img
                  src={getExitImage()} // Conditional exit image
                  alt="Exit"
                  className={styles.exitImage}
                  onClick={handleClosePopup}
                />
              </div>
              {/* Alert Details Content */}
              <div className="flex-grow mt-20">
                <p className="text-white">
                  Here are the details of the {statusIndicator.toLowerCase()}.
                </p>
                {/* Add details */}
              </div>
              {/*buttons add here */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StatusBar;
