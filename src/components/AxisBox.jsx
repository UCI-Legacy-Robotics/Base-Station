import React from "react";
import PropTypes from "prop-types";
import JoystickArea from "../assets/JoystickArea.png";

const localStyles = {
  Container:
    "bg-[#122945] w-[15.625rem] h-fit rounded-md border-4 border-black flex flex-col justify-start items-center",
  TitleBox:
    "w-full h-fit flex items-center justify-center text-white font-semibold font-chivo text-[1.4rem] border-b-4 border-black rounded-t-md",
  AxisContainer:
    "flex justify-around items-center w-full h-fit px-[1rem] py-[1rem] pb-0",
  AxisIndicator:
    "w-[2.5rem] h-[5.625rem] bg-[#56656E] border-4 border-black flex items-center justify-center relative",
  AxisLabel: "text-white font-bold text-center",
  AxisValue: "text-white font-bold text-center inline-block w-[3ch]",
  JoystickContainer: "flex-1 w-full h-full p-[1rem] pt-0 relative",
  JoystickCircle:
    "absolute w-[1.875rem] h-[1.875rem] bg-[#305E69] border-[0.125rem] border-[#BBBBBB] rounded-full transform translate-x-[-50%] translate-y-[-50%]",
};

const AxisBox = ({ title, xValue, yValue }) => {
  // Float parser helper
  const safeParseFloat = (value) =>
    isNaN(parseFloat(value)) ? 0 : parseFloat(value);
  // Dynamically style Axis Indicator
  const calculateBarStyle = (value) => {
    const floatValue = safeParseFloat(value);
    const scaledValue = Math.min(Math.max(floatValue, -1), 1);
    const height = Math.max(1, Math.abs(scaledValue) * 3.125);
    const transformOrigin = scaledValue >= 0 ? "bottom" : "top";
    const offset = "2.1875rem";

    return {
      height: `${height}rem`,
      transformOrigin,
      [scaledValue >= 0 ? "bottom" : "top"]: offset,
    };
  };

  return (
    <div className={localStyles.Container}>
      {/* Title */}
      <div className={localStyles.TitleBox}>{title}</div>
      {/* Axis Indicator */}
      <div className={localStyles.AxisContainer}>
        {[
          ["X", xValue],
          ["Y", -yValue],
        ].map(([axis, value]) => (
          <div key={axis} className="flex flex-col items-center">
            {/* Label */}
            <span className={localStyles.AxisLabel}>{axis}</span>
            {/* 
              Axis Indicator
            */}
            <div className={localStyles.AxisIndicator}>
              <div
                className="bg-black w-full absolute"
                style={calculateBarStyle(value)}
              ></div>
            </div>
            <span className={localStyles.AxisValue}>{value}</span>
          </div>
        ))}
      </div>
      {/* Joystick Graph */}
      <div className={localStyles.JoystickContainer}>
        <img src={JoystickArea} alt="Joystick Area" className="w-full h-full" />
        {/* Dynamically indicate Location */}
        <div
          aria-label={`Joystick position: X=${xValue}, Y=${yValue}`}
          className={localStyles.JoystickCircle}
          style={{
            top: `${50 + safeParseFloat(yValue) * 50}%`,
            left: `${50 + safeParseFloat(xValue) * 50}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

// Required Variables for usage [title, x and y values for TWO joysticks]
AxisBox.propTypes = {
  title: PropTypes.string.isRequired,
  xValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  yValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default AxisBox;
