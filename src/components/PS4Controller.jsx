import React from "react";

// Assets
import ps4Controller from "../assets/ps4Controller.png";

// Buttons
import TopTrigger from "../assets/controllerButtons/TopTrigger.png";
import BottomTrigger from "../assets/controllerButtons/BottomTrigger.png";
import TouchPad from "../assets/controllerButtons/TouchPad.png";
import CircleButton from "../assets/controllerButtons/CircleButton.png";
import ArrowButton from "../assets/controllerButtons/ArrowButton.png";
import Joystick from "../assets/controllerButtons/Joystick.png";

// Filled Buttons
import FBottomTrigger from "../assets/controllerButtons/FilledBottomTrigger.png";
import FTopTrigger from "../assets/controllerButtons/FilledTopTrigger.png";
import FTouchPad from "../assets/controllerButtons/FilledTouchPad.png";
import FCircleButton from "../assets/controllerButtons/FilledCircleButton.png";
import FArrowButton from "../assets/controllerButtons/FilledArrowButton.png";
import FJoystick from "../assets/controllerButtons/FilledJoystick.png";

const styles = {
    Overlay: "fixed inset-0 bg-[#323232] bg-opacity-75 z-40",
    Popup: "fixed inset-0 flex items-center justify-center z-50",
    PopupBox: "w-[80rem] h-[50rem] bg-[#041428] rounded-lg shadow-lg relative",
    PopupHeader:
        "w-full h-[4.875rem] border-[0.375rem] border-black flex items-center px-[1rem] absolute top-0 left-0 rounded-t-lg",
    PopupTitle: "text-4xl font-bold text-white",
    ExitImage:
        "w-[2.5rem] h-[2.5rem] cursor-pointer absolute right-[1rem] top-1/2 transform -translate-y-1/2",
    PopupContent:
        "absolute inset-x-0 bottom-0 top-[4.875rem] p-[1rem] bg-[#041428] rounded-b-lg",
    ArrowBottomRight:
        "absolute bottom-[1rem] right-[1rem] w-[3rem] h-[3rem] cursor-pointer",
    ArrowBottomLeft:
        "absolute bottom-[1rem] left-[1rem] w-[3rem] h-[3rem] cursor-pointer transform rotate-180",
    BottomTrigger: "w-[5rem] h-[4rem]",
    TopTrigger: "w-[5rem] h-[2.5rem]",
    SquareContainer: "absolute top-[19%] right-[10.5%] w-[7.5rem] h-[7.5rem]",
    SquareButton: "absolute w-[2.5rem] h-[2.5rem]",
    ArrowContainer: "absolute top-[19%] left-[11.5%] w-[6.875rem] h-[7.5rem]",
    ArrowButton: "absolute w-[2.25rem] h-[3.125rem]",
};

const PS4Controller = ({ leftStick, rightStick, buttonStatesRef }) => {
    return (
        <div className="relative">
            <img
                src={ps4Controller}
                alt="PS4 Controller"
                className="max-w-[90rem] h-auto"
            />

            {/* Touch pad (index 17)*/}
            <img
                src={buttonStatesRef.current[17] ? FTouchPad : TouchPad}
                alt="TouchPad"
                className="absolute top-[12%] left-[34%] w-[12.5rem] h-[7.5rem]"
            />

            {/* Square Layout for Buttons */}
            <div className={styles.SquareContainer}>
                {/* Triangle Button (index 3) */}
                <img
                    src={
                        buttonStatesRef.current[3]
                            ? FCircleButton
                            : CircleButton
                    }
                    alt="Top Button"
                    className={`${styles.SquareButton} top-0 left-1/2 transform -translate-x-1/2`}
                />
                {/* Circle Button (index 1) */}
                <img
                    src={
                        buttonStatesRef.current[1]
                            ? FCircleButton
                            : CircleButton
                    }
                    alt="Right Button"
                    className={`${styles.SquareButton} top-1/2 right-0 transform -translate-y-1/2`}
                />
                {/* X Button (index 0) */}
                <img
                    src={
                        buttonStatesRef.current[0]
                            ? FCircleButton
                            : CircleButton
                    }
                    alt="Bottom Button"
                    className={`${styles.SquareButton} bottom-0 left-1/2 transform -translate-x-1/2`}
                />
                {/* Square Button (index 2) */}
                <img
                    src={
                        buttonStatesRef.current[2]
                            ? FCircleButton
                            : CircleButton
                    }
                    alt="Left Button"
                    className={`${styles.SquareButton} top-1/2 left-0 transform -translate-y-1/2`}
                />
            </div>

            {/* D-Pad Arrow Buttons */}
            <div className={styles.ArrowContainer}>
                {/* Up (index 12) */}
                <img
                    src={
                        buttonStatesRef.current[12] ? FArrowButton : ArrowButton
                    }
                    alt="Top Button"
                    className={`${styles.ArrowButton} top-0 left-1/2 transform -translate-x-1/2`}
                />
                {/* Right (index 15) */}
                <img
                    src={
                        buttonStatesRef.current[15] ? FArrowButton : ArrowButton
                    }
                    alt="Right Button"
                    className={`${styles.ArrowButton} top-1/2 right-0 transform -translate-y-1/2 rotate-90`}
                />
                {/* Down (index 13) */}
                <img
                    src={
                        buttonStatesRef.current[13] ? FArrowButton : ArrowButton
                    }
                    alt="Bottom Button"
                    className={`${styles.ArrowButton} bottom-0 left-1/2 transform -translate-x-1/2 rotate-180`}
                />
                {/* Left (index 14) */}
                <img
                    src={
                        buttonStatesRef.current[14] ? FArrowButton : ArrowButton
                    }
                    alt="Left Button"
                    className={`${styles.ArrowButton} top-1/2 left-0 transform -translate-y-1/2 -rotate-90`}
                />
            </div>

            {/* Left Joystick (index 10) */}
            <img
                src={buttonStatesRef.current[10] ? FJoystick : Joystick}
                alt="Left Joystick"
                className="absolute w-[5rem] h-[5rem]"
                style={{
                    top: `calc(44.5% + ${leftStick.y * 1.5625}rem)`,
                    left: `calc(29% + ${leftStick.x * 1.5625}rem)`,
                    transition: "transform 0.1s ease",
                }}
            />

            {/* Right Joystick (index 11) */}
            <img
                src={buttonStatesRef.current[11] ? FJoystick : Joystick}
                alt="Right Joystick"
                className="absolute w-[5rem] h-[5rem]"
                style={{
                    top: `calc(44.5% + ${rightStick.y * 1.5625}rem)`,
                    right: `calc(28.5% - ${rightStick.x * 1.5625}rem)`,
                    transition: "transform 0.1s ease",
                }}
            />

            {/* Left Side Triggers */}
            <div className="absolute left-[14%] -top-[20%] flex flex-col space-y-1">
                <img
                    src={
                        buttonStatesRef.current[6]
                            ? FBottomTrigger
                            : BottomTrigger
                    }
                    alt="Left Bottom Trigger"
                    className={styles.BottomTrigger}
                />
                <div className="mt-4">
                    <img
                        src={
                            buttonStatesRef.current[4]
                                ? FTopTrigger
                                : TopTrigger
                        }
                        alt="Left Top Trigger"
                        className={styles.TopTrigger}
                    />
                </div>
            </div>

            {/* Right Side Triggers */}
            <div className="absolute right-[14%] -top-[20%] flex flex-col space-y-1">
                <img
                    src={
                        buttonStatesRef.current[7]
                            ? FBottomTrigger
                            : BottomTrigger
                    }
                    alt="Right Bottom Trigger"
                    className={styles.BottomTrigger}
                />
                <div className="mt-4">
                    <img
                        src={
                            buttonStatesRef.current[5]
                                ? FTopTrigger
                                : TopTrigger
                        }
                        alt="Right Top Trigger"
                        className={styles.TopTrigger}
                    />
                </div>
            </div>
        </div>
    );
};

export default PS4Controller;
