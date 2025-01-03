import React, { useState, useEffect, useRef } from "react";

import TeleopIndicator from "../assets/BlueIndicator.png";
import AutoIndicator from "../assets/RedIndicator.png";
import ArrivalIndicator from "../assets/GreenIndicator.png";
import EmptyBattery from "../assets/EmptyBattery.png";
import QuarterBattery from "../assets/QuarterBattery.png";
import HalfBattery from "../assets/HalfBattery.png";
import ThreeQuarterBattery from "../assets/ThreeQuarterBattery.png";
import FullBattery from "../assets/FullBattery.png";
import NoConnection from "../assets/NoConnection.png";
import LowConnection from "../assets/LowConnection.png";
import HighConnection from "../assets/HighConnection.png";
import Exit from "../assets/Exit.png";
import ExitWarning from "../assets/ExitBlack.png";
import AlertIndicator from "../assets/AlertIndicator.png";
import ErrorIndicator from "../assets/ErrorIndicator.png";
import WarningIndicator from "../assets/WarningIndicator.png";
import UpArrow from "../assets/UpArrow.png";
import DownArrow from "../assets/DownArrow.png";

const styles = {
  content: "flex items-center gap-[2.2rem] justify-between",
  text: "text-white font-chivo text-base text-[1.14em] cursor-pointer",
  image: "w-[2rem] h-[2rem] cursor-pointer",
  popup: "fixed inset-0 flex items-center justify-center z-50",
  popupBox:
    "w-[50rem] h-[31.25rem] bg-[#041428] rounded-lg shadow-lg p-[1rem] flex flex-col justify-center relative",
  popupHeader:
    "w-full h-[4.875rem] border-[0.375rem] border-black flex items-center px-[1rem] absolute top-0 left-0 rounded-t-lg",
  popupTitle: "text-4xl font-bold",
  exitImage:
    "w-[2.5rem] h-[2.5rem] cursor-pointer absolute right-[1rem] top-1/2 transform -translate-y-1/2",
  popupButtons:
    "flex justify-end gap-[1rem] absolute bottom-[1rem] right-[1rem]",
  buttonStop:
    "px-[2rem] py-[0.5rem] rounded-[0.5rem] bg-[#9B111E] text-white font-russo text-[1.4em] hover:opacity-80",
  buttonStart:
    "px-[2rem] py-[0.5rem] rounded-[0.5rem] bg-[#305E69] text-white font-russo text-[1.4em] hover:opacity-80",
  overlay: "fixed inset-0 bg-[#323232] bg-opacity-75 z-40",
  timerPopupContainer: "flex items-center justify-center space-x-6",
  timerSection: "flex flex-col items-start space-y-0",
  timerControls: "flex items-center space-x-3",
  timerDigit: "text-white font-bold font-russo text-[6rem]",
  colon:
    "text-white font-bold font-russo text-[8rem] m-0 flex items-center mt-4",
  arrowContainer: "flex flex-col space-y-4",
  arrowImage: "w-[3rem] h-[2.5rem] cursor-pointer",
};

const StatusBar = () => {
  // State variables
  const [longitude, setLongitude] = useState("000.000");
  const [latitude, setLatitude] = useState("000.000");
  const [altitude, setAltitude] = useState("000m");

  // Timer state variables
  const [initialTime, setInitialTime] = useState(0); // in seconds
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [batteryLevel, setBatteryLevel] = useState("Empty"); // Possible values: "Empty", "Quarter", "ThreeQuarter", "Full"
  const [statusIndicator, setStatusIndicator] = useState("Alert"); // Possible values: "Alert", "Error", "Warning"
  const [modeIndicator, setModeIndicator] = useState("Teleop"); // Possible values: "Teleop", "Arrival", "Auto"
  const [connectionIndicator, setConnectionIndicator] = useState("None"); //Possible values: "None", "Low", "Good"

  // State for pop-ups
  const [showTimerPopup, setShowTimerPopup] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);

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
  const connectionIndicatorImage =
    {
      None: NoConnection,
      Low: LowConnection,
      Good: HighConnection,
    }[connectionIndicator] || NoConnection;

  // Map batteryLevel value to corresponding image
  const batteryImage =
    {
      Empty: EmptyBattery,
      Quarter: QuarterBattery,
      Half: HalfBattery,
      ThreeQuarter: ThreeQuarterBattery,
      Full: FullBattery,
    }[batteryLevel] || EmptyBattery;

  // Helper function to format time in HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  // Handlers for clickable elements
  const handleTimerClick = () => {
    if (isRunning) {
      setHours(Math.floor(remainingTime / 3600));
      setMinutes(Math.floor((remainingTime % 3600) / 60));
    } else {
      setHours(Math.floor(initialTime / 3600));
      setMinutes(Math.floor((initialTime % 3600) / 60));
    }
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
    if (isRunning) {
      // Prevent multiple intervals
      return;
    }
    const totalSeconds = hours * 3600 + minutes * 60;
    setInitialTime(totalSeconds);
    setRemainingTime(totalSeconds);
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setShowTimerPopup(false);
  };

  const handleStopClick = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
    setShowTimerPopup(false);
  };

  // Handler functions for timer arrows
  const handleIncreaseHour = () => {
    setHours((prev) => (prev < 23 ? prev + 1 : 0));
  };

  const handleDecreaseHour = () => {
    setHours((prev) => (prev > 0 ? prev - 1 : 23));
  };

  const handleIncreaseMinute = () => {
    setMinutes((prev) => (prev < 59 ? prev + 1 : 0));
  };

  const handleDecreaseMinute = () => {
    setMinutes((prev) => (prev > 0 ? prev - 1 : 59));
  };

  // Clean up the interval on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

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
    return statusIndicator === "Warning"
      ? { color: "#000000" }
      : { color: "#FFFFFF" };
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
              <div className={styles.popupHeader} style={getPopupHeaderStyle()}>
                <h2 className={styles.popupTitle} style={getPopupTitleStyle()}>
                  Set Timer
                </h2>
                <img
                  src={getExitImage()}
                  alt="Exit"
                  className={styles.exitImage}
                  onClick={handleClosePopup}
                />
              </div>
              <div className={styles.timerPopupContainer}>
                {/* Hours Section */}
                <div className={styles.timerSection}>
                  <p className="text-white text-[2em] font-chivo opacity-70 m-0 -ml-1 leading-none">
                    Hours
                  </p>
                  <div className={styles.timerControls}>
                    <p className={styles.timerDigit}>
                      {String(hours).padStart(2, "0")}
                    </p>
                    <div className={styles.arrowContainer}>
                      <img
                        src={UpArrow}
                        alt="Increase Hour"
                        className={styles.arrowImage}
                        onClick={handleIncreaseHour}
                        aria-label="Increase Hour"
                      />
                      <img
                        src={DownArrow}
                        alt="Decrease Hour"
                        className={styles.arrowImage}
                        onClick={handleDecreaseHour}
                        aria-label="Decrease Hour"
                      />
                    </div>
                  </div>
                </div>
                {/* Colon */}
                <p className={styles.colon}>:</p>{" "}
                {/* Ensure font size matches digits */}
                {/* Minutes Section */}
                <div className={styles.timerSection}>
                  <p className="text-white text-[2em] font-chivo opacity-70 m-0 -ml-1 leading-none">
                    Minutes
                  </p>
                  <div className={styles.timerControls}>
                    <p className={styles.timerDigit}>
                      {String(minutes).padStart(2, "0")}
                    </p>
                    <div className={styles.arrowContainer}>
                      <img
                        src={UpArrow}
                        alt="Increase Minute"
                        className={styles.arrowImage}
                        onClick={handleIncreaseMinute}
                        aria-label="Increase Minute"
                      />
                      <img
                        src={DownArrow}
                        alt="Decrease Minute"
                        className={styles.arrowImage}
                        onClick={handleDecreaseMinute}
                        aria-label="Decrease Minute"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Buttons */}
              <div className={styles.popupButtons}>
                <button className={styles.buttonStop} onClick={handleStopClick}>
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

      {/* Main Status Bar */}
      <div>
        {/* Group all items in a single div */}
        <div className={styles.content}>
          {/* Location Information */}
          <p className={styles.text}>Lon: {longitude}</p>
          <p className={styles.text}>Lat: {latitude}</p>
          <p className={styles.text}>Alti: {altitude}</p>

          {/* Timer with Mode Indicator */}
          <img
            src={modeIndicatorImage}
            alt="Mode Indicator"
            className={styles.image}
          />
          <p className={styles.text} onClick={handleTimerClick}>
            Timer: {formatTime(remainingTime)}
          </p>

          {/* Connection Status Image */}
          <img
            src={connectionIndicatorImage}
            alt="Connection Status"
            className={styles.image}
          />

          {/* Battery Status */}
          <img
            src={batteryImage}
            alt={`Battery Level: ${batteryLevel}`}
            className={styles.image}
          />

          {/* Status Indicator Image */}
          <img
            src={statusIndicatorImage}
            alt={`${statusIndicator} Indicator`}
            className={`${styles.image} ${
              statusIndicator === "Alert"
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={handleAlertClick}
            title={
              statusIndicator === "Alert"
                ? "No details available"
                : `${statusIndicator}`
            }
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
                <h2 className={styles.popupTitle} style={getPopupTitleStyle()}>
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
              {/* Buttons can be added here if needed */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StatusBar;
