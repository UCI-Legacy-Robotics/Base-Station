import React from "react";
import PropTypes from "prop-types";

const ToggleSwitch = ({
    labelLeft,
    labelRight,
    isToggled,
    onToggle,
    knobColorOn,
    knobColorOff,
}) => {
    return (
        <div className="flex items-center justify-center space-x-4">
            {/* Left Label */}
            <span
                className={`text-white font-chivo ${
                    !isToggled ? "font-semibold" : "font-normal opacity-80"
                }`}
            >
                {labelLeft}
            </span>

            {/* 
        Toggle Switch
      */}
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={isToggled}
                    onChange={onToggle}
                />
                {/* Background Area */}
                <div
                    className="
            w-24 h-8 bg-gray-200 rounded-full
            peer
            dark:bg-[#56656E]
            peer-focus:ring-4 peer-focus:ring-blue-300 
            dark:peer-focus:ring-blue-800 
            peer-checked:bg-blue-600 
            transition-colors duration-300
          "
                />
                {/* Knob */}
                <span
                    className={`
            absolute left-0.5 top-0.5 w-7 h-7 rounded-full
            transition-transform duration-300
            transform ${isToggled ? "translate-x-16" : "translate-x-0"}
          `}
                    style={{
                        backgroundColor: isToggled ? knobColorOn : knobColorOff,
                        border: "2px solid #000000",
                    }}
                ></span>
            </label>

            {/* Right Label */}
            <span
                className={`text-white font-chivo ${
                    isToggled ? "font-semibold" : "font-normal opacity-80"
                }`}
            >
                {labelRight}
            </span>
        </div>
    );
};

// PropTypes for type checking
ToggleSwitch.propTypes = {
    labelLeft: PropTypes.string.isRequired,
    labelRight: PropTypes.string.isRequired,
    isToggled: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    knobColorOn: PropTypes.string.isRequired,
    knobColorOff: PropTypes.string.isRequired,
};

export default ToggleSwitch;
