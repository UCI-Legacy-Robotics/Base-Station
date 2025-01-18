import React from "react";

const styles = {
    overlay: "fixed inset-0 bg-[#323232] bg-opacity-75 z-40",
    popup: "fixed inset-0 flex items-center justify-center z-50",
    popupBox:
        "w-[50rem] h-[31.25rem] bg-[#041428] rounded-lg shadow-lg p-[1rem] flex flex-col justify-center relative",
    popupHeader:
        "w-full h-[4.875rem] border-[0.375rem] border-black flex items-center px-[1rem] absolute top-0 left-0 rounded-t-lg",
    popupTitle: "text-4xl font-bold",
    exitImage:
        "w-[2.5rem] h-[2.5rem] cursor-pointer absolute right-[1rem] top-1/2 transform -translate-y-1/2",
};

const Alerts = (props) => {
    const {
        show,
        statusIndicator,
        onClose,
        getPopupHeaderStyle,
        getPopupTitleStyle,
        getExitImage,
    } = props;

    if (!show) return null;

    return (
        <>
            <div className={styles.overlay} onClick={onClose}></div>

            <div className={styles.popup}>
                <div className={styles.popupBox}>
                    <div
                        className={styles.popupHeader}
                        style={getPopupHeaderStyle && getPopupHeaderStyle()}
                    >
                        {/* Heading Title */}
                        <h2
                            className={styles.popupTitle}
                            style={getPopupTitleStyle && getPopupTitleStyle()}
                        >
                            {statusIndicator === "Alert"
                                ? "Alert"
                                : statusIndicator}
                        </h2>
                        {/* Exit */}
                        <img
                            src={getExitImage && getExitImage()}
                            alt="Exit"
                            className={styles.exitImage}
                            onClick={onClose}
                        />
                    </div>
                    {/* Main Content */}
                    <div className="flex-grow mt-20 px-4">
                        <p className="text-white">
                            Description: {statusIndicator.toLowerCase()}.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Alerts;
