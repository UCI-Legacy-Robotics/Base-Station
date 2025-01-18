import React, { useState } from "react";

// Images
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

// Components
import TimerPopup from "./TimerPopup";
import Alerts from "./AlertsPopup";

const styles = {
    content: "flex items-center gap-[2.7rem] justify-between",
    text: "text-white font-chivo font-normal text-base text-[1.14em] cursor-pointer",
    image: "w-[2rem] h-[2rem] cursor-pointer",
};

const StatusBar = () => {
    const [longitude, setLongitude] = useState("000.000");
    const [latitude, setLatitude] = useState("000.000");
    const [altitude, setAltitude] = useState("000m");

    // Indicators
    const [batteryLevel, setBatteryLevel] = useState("Empty");
    const [statusIndicator, setStatusIndicator] = useState("Error");
    const [modeIndicator, setModeIndicator] = useState("Teleop");
    const [connectionIndicator, setConnectionIndicator] = useState("None");

    // Popup visibility
    const [showTimerPopup, setShowTimerPopup] = useState(false);
    const [showAlertPopup, setShowAlertPopup] = useState(false);

    // We move the actual timer logic to <TimerPopup>, but we'll store a display value here
    const [timerDisplay, setTimerDisplay] = useState("00:00:00");

    // Mappings for images
    const statusIndicatorImage = {
        Alert: AlertIndicator,
        Error: ErrorIndicator,
        Warning: WarningIndicator,
    }[statusIndicator];

    const modeIndicatorImage = {
        Teleop: TeleopIndicator,
        Arrival: ArrivalIndicator,
        Auto: AutoIndicator,
    }[modeIndicator];

    const connectionIndicatorImage =
        {
            None: NoConnection,
            Low: LowConnection,
            Good: HighConnection,
        }[connectionIndicator] || NoConnection;

    const batteryImage =
        {
            Empty: EmptyBattery,
            Quarter: QuarterBattery,
            Half: HalfBattery,
            ThreeQuarter: ThreeQuarterBattery,
            Full: FullBattery,
        }[batteryLevel] || EmptyBattery;

    // Alert handling
    const handleAlertClick = () => {
        if (statusIndicator === "Error" || statusIndicator === "Warning") {
            setShowAlertPopup(true);
        }
    };

    // Close any open popup
    const handleClosePopup = () => {
        setShowTimerPopup(false);
        setShowAlertPopup(false);
    };

    // Trigger opening the TimerPopup
    const handleTimerClick = () => {
        setShowTimerPopup(true);
    };

    // Whenever TimerPopup updates the time, we store that string in timerDisplay
    const handleTimerUpdate = (timeString) => {
        setTimerDisplay(timeString);
    };

    // Popup header styles
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

    const getPopupTitleStyle = () => {
        return statusIndicator === "Warning"
            ? { color: "#000000" }
            : { color: "#FFFFFF" };
    };

    const getExitImage = () => {
        return statusIndicator === "Warning" ? ExitWarning : Exit;
    };

    return (
        <>
            {/* Timer Popup */}
            <TimerPopup
                show={showTimerPopup}
                statusIndicator={statusIndicator}
                onClose={handleClosePopup}
                getPopupTitleStyle={getPopupTitleStyle}
                getExitImage={getExitImage}
                onTimerUpdate={handleTimerUpdate}
            />

            {/* Alerts Popup */}
            <Alerts
                show={showAlertPopup}
                statusIndicator={statusIndicator}
                onClose={handleClosePopup}
                getPopupHeaderStyle={getPopupHeaderStyle}
                getPopupTitleStyle={getPopupTitleStyle}
                getExitImage={getExitImage}
            />

            {/* 
        Main Status Bar
      */}
            <div>
                <div className={styles.content}>
                    {/* Location */}
                    <p className={styles.text}>Lon: {longitude}</p>
                    <p className={styles.text}>Lat: {latitude}</p>
                    <p className={styles.text}>Alti: {altitude}</p>

                    {/* Mode + Timer (clickable) */}
                    <img
                        src={modeIndicatorImage}
                        alt="Mode Indicator"
                        className={styles.image}
                    />
                    <p className={styles.text} onClick={handleTimerClick}>
                        Timer: {timerDisplay}
                    </p>

                    {/* Connection */}
                    <img
                        src={connectionIndicatorImage}
                        alt="Connection Status"
                        className={styles.image}
                    />

                    {/* Battery */}
                    <img
                        src={batteryImage}
                        alt={`Battery Level: ${batteryLevel}`}
                        className={styles.image}
                    />

                    {/* Status Indicator */}
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
        </>
    );
};

export default StatusBar;
