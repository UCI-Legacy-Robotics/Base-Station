// ToggleSwitch.jsx

import React from 'react';
import PropTypes from 'prop-types';

/**
 * ToggleSwitch Component
 *
 * A customizable toggle switch with labels on both sides.
 *
 * @param {Object} props
 * @param {string} props.labelLeft - Label displayed on the left side of the toggle.
 * @param {string} props.labelRight - Label displayed on the right side of the toggle.
 * @param {boolean} props.isToggled - Determines the toggle state (on/off).
 * @param {Function} props.onToggle - Callback function triggered when the toggle state changes.
 * @param {string} props.knobColorOn - Background color of the knob when toggled on.
 * @param {string} props.knobColorOff - Background color of the knob when toggled off.
 *
 * @returns {JSX.Element}
 */
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
      <span className={`text-white font-chivo ${!isToggled ? 'font-semibold' : 'font-normal opacity-80'}`}>
        {labelLeft}
      </span>

      {/* Toggle Switch */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={isToggled}
          onChange={onToggle}
        />
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
        ></div>
        <span
          className={`
            absolute left-0.5 top-0.5 w-7 h-7 rounded-full
            transition-transform duration-300
            transform ${isToggled ? 'translate-x-16' : 'translate-x-0'}
          `}
          style={{
            backgroundColor: isToggled ? knobColorOn : knobColorOff,
            border: '2px solid #000000', 
          }}
        ></span>
      </label>

      {/* Right Label */}
      <span className={`text-white font-chivo ${isToggled ? 'font-semibold' : 'font-normal opacity-80'}`}>
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
