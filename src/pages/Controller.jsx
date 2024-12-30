import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";

// Assets
import InfoIcon from "../assets/InfoIcon.png";

// Components
import AxisBox from "../components/AxisBox";
import Popup from "../components/ControllerPopup";
import PS4Controller from "../components/PS4Controller";

const styles = {
  Title:
    "absolute top-[1rem] left-[1rem] text-white text-[2rem] font-chivo font-semibold",
  InfoIcon:
    "absolute bottom-[1rem] right-[1rem] w-[2.5rem] h-[2.5rem] cursor-pointer hover:opacity-50",
};

const Controller = () => {
  // Popup state controls
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentPopup, setCurrentPopup] = useState("Drive Controls");
  const openPopup = () => setIsPopupVisible(true);
  const closePopup = () => setIsPopupVisible(false);
  const switchPopup = () => {
    setCurrentPopup((prev) =>
      prev === "Drive Controls" ? "Arm Controls" : "Drive Controls"
    );
  };

  // Joystick position states
  const [leftStick, setLeftStick] = useState({ x: 0, y: 0 });
  const [rightStick, setRightStick] = useState({ x: 0, y: 0 });
  // Button states
  const buttonStatesRef = useRef({});

  useEffect(() => {
    const checkGamepadButtons = () => {
      const gamepads = navigator.getGamepads();
      const updatedButtonStates = { ...buttonStatesRef.current };

      for (const gamepad of gamepads) {
        if (gamepad) {
          // Update button states
          gamepad.buttons.forEach((button, index) => {
            updatedButtonStates[index] = button.pressed;
          });

          // Update joystick axes
          if (gamepad.axes.length >= 4) {
            const leftStickX = gamepad.axes[0];
            const leftStickY = gamepad.axes[1];
            const rightStickX = gamepad.axes[2];
            const rightStickY = gamepad.axes[3];

            setLeftStick({
              x: leftStickX.toFixed(2),
              y: leftStickY.toFixed(2),
            });
            setRightStick({
              x: rightStickX.toFixed(2),
              y: rightStickY.toFixed(2),
            });
          }
        }
      }

      // Update the ref but avoid triggering re-renders
      buttonStatesRef.current = updatedButtonStates;

      // Schedule the next check
      requestAnimationFrame(checkGamepadButtons);
    };

    // Start the animation loop
    const animationFrameId = requestAnimationFrame(checkGamepadButtons);

    // Cleanup on component unmount
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <Layout>
      <div className="bg-[#041428] rounded-md h-full w-full relative">
        {/* Title */}
        <div className={styles.Title}>Controller Tester</div>

        {/* Info Icon */}
        <img
          className={styles.InfoIcon}
          src={InfoIcon}
          alt="Info Icon"
          onClick={openPopup}
        />

        {/* 
          Main Content
        */}
        <div className="flex w-full h-full">
          {/* Left Joystick */}
          <div className="w-1/4 flex flex-col items-center justify-center mt-36">
            <AxisBox
              title="Left Joystick"
              xValue={leftStick.x}
              yValue={leftStick.y}
            />
          </div>

          {/* Controller */}
          <div className="w-1/2 flex items-center justify-center relative">
            <PS4Controller
              leftStick={leftStick}
              rightStick={rightStick}
              buttonStatesRef={buttonStatesRef}
              styles={styles}
            />
          </div>

          {/* Right Joystick */}
          <div className="w-1/4 flex flex-col items-center justify-center mt-36">
            <AxisBox
              title="Right Joystick"
              xValue={rightStick.x}
              yValue={rightStick.y}
            />
          </div>
        </div>

        {/* Popup */}
        <Popup
          isPopupVisible={isPopupVisible}
          currentPopup={currentPopup}
          closePopup={closePopup}
          switchPopup={switchPopup}
        />
      </div>
    </Layout>
  );
};

export default Controller;
