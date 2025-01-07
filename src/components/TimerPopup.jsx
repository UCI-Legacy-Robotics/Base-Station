import React, { useState, useRef, useEffect } from "react";
import UpArrow from "../assets/UpArrow.png";
import DownArrow from "../assets/DownArrow.png";

const styles = {
  overlay: "fixed inset-0 bg-[#323232] bg-opacity-75 z-40",
  popup: "fixed inset-0 flex items-center justify-center z-50",
  popupBox:
    "w-[50rem] h-[31.25rem] bg-[#041428] rounded-lg shadow-lg p-[1rem] flex flex-col justify-center relative",
  popupHeader:
    "w-full h-[4.875rem] border-[0.375rem] border-black flex items-center px-[1rem] absolute top-0 left-0 rounded-t-lg",
  popupTitle: "text-4xl font-russo font-bold",
  exitImage:
    "w-[2.5rem] h-[2.5rem] cursor-pointer absolute right-[1rem] top-1/2 transform -translate-y-1/2",
  timerPopupContainer: "flex items-center justify-center space-x-6 mt-12",
  timerSection: "flex flex-col items-start space-y-0",
  timerControls: "flex items-center space-x-3",
  timerDigit: "text-white font-bold font-russo text-[6rem]",
  colon:
    "text-white font-bold font-russo text-[8rem] m-0 flex items-center mt-4",
  arrowContainer: "flex flex-col space-y-4",
  arrowImage: "w-[3rem] h-[2.5rem] cursor-pointer hover:opacity-80",
  popupButtons:
    "flex justify-end gap-[1rem] absolute bottom-[1rem] right-[1rem]",
  buttonStop:
    "px-[2rem] py-[0.5rem] rounded-[0.5rem] bg-[#9B111E] text-white font-russo text-[1.4em] hover:opacity-80",
  buttonStart:
    "px-[2rem] py-[0.5rem] rounded-[0.5rem] bg-[#305E69] text-white font-russo text-[1.4em] hover:opacity-80",
};

const TimerPopup = (props) => {
  const {
    show,
    onClose,
    getPopupHeaderStyle,
    getPopupTitleStyle,
    getExitImage,
    onTimerUpdate,
  } = props;

  // Internal Timer State
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0); // total seconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Timer logic HH:MM:SS
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

  // Start the timer (then close popup)
  const handleStartClick = () => {
    if (isRunning) return;

    const totalSec = hours * 3600 + minutes * 60;
    setRemainingTime(totalSec);
    setIsRunning(true);
    onClose();
  };

  // Stop the timer (then close popup)
  const handleStopClick = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
    onClose();
  };

  // Increase/Decrease hours
  const handleIncreaseHour = () => {
    setHours((prev) => (prev < 23 ? prev + 1 : 0));
  };

  const handleDecreaseHour = () => {
    setHours((prev) => (prev > 0 ? prev - 1 : 23));
  };

  // Increase/Decrease minutes
  const handleIncreaseMinute = () => {
    setMinutes((prev) => (prev < 59 ? prev + 1 : 0));
  };

  const handleDecreaseMinute = () => {
    setMinutes((prev) => (prev > 0 ? prev - 1 : 59));
  };

  // On each tick, decrement remainingTime
  useEffect(() => {
    if (isRunning) {
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
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  // Whenever remainingTime changes, push the new string to parent
  useEffect(() => {
    const timeString = formatTime(remainingTime);
    if (onTimerUpdate) {
      onTimerUpdate(timeString);
    }
  }, [remainingTime, onTimerUpdate]);

  // If show=false, nothing is rendered
  if (!show) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.popup}>
        <div className={styles.popupBox}>
          {/* Header */}
          <div
            className={styles.popupHeader}
            style={getPopupHeaderStyle && getPopupHeaderStyle()}
          >
            <h2
              className={styles.popupTitle}
              style={getPopupTitleStyle && getPopupTitleStyle()}
            >
              Set Timer
            </h2>
            <img
              src={getExitImage && getExitImage()}
              alt="Exit"
              className={styles.exitImage}
              onClick={onClose}
            />
          </div>

          {/* Timer input display */}
          <div className={styles.timerPopupContainer}>
            {/* Hours */}
            <div className={styles.timerSection}>
              <p className="text-white text-[2em] font-chivo font-semibold opacity-70 m-0 -ml-1 leading-none">
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
                    className={`${styles.arrowImage}`}
                    onClick={handleIncreaseHour}
                    aria-label="Increase Hour"
                  />
                  <img
                    src={DownArrow}
                    alt="Decrease Hour"
                    className={`${styles.arrowImage}`}
                    onClick={handleDecreaseHour}
                    aria-label="Decrease Hour"
                  />
                </div>
              </div>
            </div>

            {/* Colon */}
            <p className={styles.colon}>:</p>

            {/* Minutes */}
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
                    className={`${styles.arrowImage}`}
                    onClick={handleIncreaseMinute}
                    aria-label="Increase Minute"
                  />
                  <img
                    src={DownArrow}
                    alt="Decrease Minute"
                    className={`${styles.arrowImage}`}
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
            <button className={styles.buttonStart} onClick={handleStartClick}>
              Start
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimerPopup;
