import React, { useState } from "react";
import Layout from "../components/Layout";
import LineDivide from "../assets/LineDivide.png";
import ToggleSwitch from "../components/ToggleSwitch";

// Styles object
const styles = {
    GNSSMap: "bg-[#041428] p-[1rem] flex flex-col items-start rounded-md",
    map: "bg-[#0A1E2B] flex-1 w-full h-full rounded-md",
    lineDivider: "my-2 mb-2 w-full",

    ControlPanel: "bg-[#041428] p-4 flex flex-col space-y-4 rounded-md",
    LabelFeild: "flex items-center space-x-4 p-2",
    PanelHeader: "text-white font-chivo-semibold text-[1.5em]",
    Label: "text-white font-chivo-regular text-[1em] w-[5rem]",
    ScrollPanel: "bg-[#0A1E2B] h-[12rem] overflow-y-auto p-2 rounded-md",
    Entry: "text-white font-chivo-regular p-2 rounded-md my-1 flex justify-between items-center cursor-pointer",
    EntryBox: "bg-[#56656E] w-[12rem] h-[2rem] text-white rounded-md px-2",
    Unselected: "bg-[#244164]",
    Selected: "bg-[#56656E]",
    AddRemove:
        "mt-2 bg-[#305E69] text-white rounded-md hover:opacity-60 w-[6rem] h-[2rem]",
    StopRemove:
        "mt-1 bg-[#9B111E] text-white font-russo-regular rounded-md hover:opacity-50 w-[7rem] h-[3rem]",
};

const Navigation = () => {
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [pinPoints, setPinPoints] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isToggled, setIsToggled] = useState(false);
    const [accuracy, setAccuracy] = useState(0);

    // Input Handler with Validation
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Regex to allow negative numbers and decimals
        const numberRegex = /^-?\d*\.?\d*$/;

        if (!numberRegex.test(value)) {
            return;
        }

        if (name === "longitude") {
            setLongitude(value);
        } else if (name === "latitude") {
            setLatitude(value);
        }
    };

    // Add Handler
    const handleAdd = () => {
        if (longitude && latitude) {
            const parsedLongitude = parseFloat(longitude);
            const parsedLatitude = parseFloat(latitude);

            if (isNaN(parsedLongitude) || isNaN(parsedLatitude)) {
                alert(
                    "Please enter valid numeric values for longitude and latitude."
                );
                return;
            }

            setPinPoints([
                ...pinPoints,
                { longitude: parsedLongitude, latitude: parsedLatitude },
            ]);
            setLongitude("");
            setLatitude("");
        } else {
            alert("Both longitude and latitude are required.");
        }
    };

    // Select Handler
    const handleSelect = (index) => {
        setSelectedIndex(index === selectedIndex ? null : index);
    };

    // Remove Handler
    const handleRemove = () => {
        if (selectedIndex !== null) {
            setPinPoints(pinPoints.filter((_, i) => i !== selectedIndex));
            setSelectedIndex(null);
        }
    };

    // Toggle Handler
    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    // Stop handler
    const handleStop = () => {
        console.log("Stop");
    };

    // Abort Handler
    const handleAbort = () => {
        console.log("Abort");
    };

    return (
        <Layout>
            <div className="h-full w-full grid grid-cols-1 md:grid-cols-[5fr_2fr] gap-4">
                {/*
          GNSS Map display
        */}
                <div className={styles.GNSSMap}>
                    <h2 className="text-white font-chivo-semibold text-2xl mb-[0.8rem] text-[2.2em]">
                        GNSS Map
                    </h2>
                    <div className={styles.map}>{/* Insert map feed */}</div>
                </div>
                {/*
          Control Panel
        */}
                <div className={styles.ControlPanel}>
                    {/*
            Accuracy
          */}
                    <div className={`${styles.LabelFeild} justify-center`}>
                        <h2 className={styles.PanelHeader}>Accuracy: </h2>
                        <div className="bg-[#56656E] w-[6rem] h-[2rem] flex items-center justify-center text-white rounded-md">
                            <span>±{accuracy} meters</span>
                        </div>
                    </div>
                    {/*
            Add Pin-Point
          */}
                    <img
                        src={LineDivide}
                        alt="Divider"
                        className={styles.lineDivider}
                    />
                    <div>
                        <h2 className={styles.PanelHeader}>Add Pin-Point</h2>
                        {/* Add Longitude */}
                        <div className={styles.LabelFeild}>
                            <h2 className={styles.Label}>Longitude</h2>
                            <input
                                type="number"
                                name="longitude"
                                value={longitude}
                                onChange={handleInputChange}
                                placeholder="Entry..."
                                step="any"
                                className={styles.EntryBox}
                            />
                        </div>
                        {/* Add Latitude */}
                        <div className={styles.LabelFeild}>
                            <h2 className={styles.Label}>Latitude</h2>
                            <input
                                type="number"
                                name="latitude"
                                value={latitude}
                                onChange={handleInputChange}
                                placeholder="Entry..."
                                step="any"
                                className={styles.EntryBox}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleAdd}
                                className={styles.AddRemove}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    {/*
            Remove Pin-Point
          */}
                    <img
                        src={LineDivide}
                        alt="Divider"
                        className={styles.lineDivider}
                    />
                    <div>
                        <h2 className={styles.PanelHeader}>Remove Pin-Point</h2>
                        <div className={styles.ScrollPanel}>
                            {pinPoints.map((point, index) => (
                                <div
                                    key={index}
                                    className={`${styles.Entry} ${
                                        selectedIndex === index
                                            ? styles.Selected
                                            : styles.Unselected
                                    }`}
                                    onClick={() => handleSelect(index)}
                                >
                                    {`Lon: ${point.longitude}, Lat: ${point.latitude}`}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleRemove}
                                className={styles.AddRemove}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                    {/*
            Control Select
          */}
                    <img
                        src={LineDivide}
                        alt="Divider"
                        className={styles.lineDivider}
                    />
                    {/* Toggle Switch */}
                    <ToggleSwitch
                        labelLeft="Teleop"
                        labelRight="Auto"
                        isToggled={isToggled}
                        onToggle={handleToggle}
                        knobColorOn="#FF0000"
                        knobColorOff="#0000FF"
                    />
                    {/*
            Stop and Abort Buttons
          */}
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={handleStop}
                            className={styles.StopRemove}
                        >
                            Stop
                        </button>
                        <button
                            onClick={handleAbort}
                            className={styles.StopRemove}
                        >
                            Abort
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Navigation;
