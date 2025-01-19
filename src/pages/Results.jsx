import React from "react";
import Layout from "../components/Layout";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const styles = {
    Container: "w-full h-full min-h-0 grid grid-cols-2 grid-rows-2 gap-4",
    Quadrant: "bg-[#041428] rounded-md flex flex-col p-4 min-h-0",
    Header: "text-white text-[1.5em] font-chivo font-semibold mb-2",
    Content: "rounded-b-md flex-1 flex flex-col min-h-0 border border-white",
    EntryField: "flex-1 overflow-y-auto min-h-0 text-white",
};

// Chart data & options
const data = {
    labels: [
        "00:00:00",
        "00:01:00",
        "00:02:00",
        "00:03:00",
        "00:04:00",
        "00:05:00",
    ],
    datasets: [
        {
            label: "Null Temp",
            data: [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4],
            borderColor: "#4CAF50",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 0 },
    plugins: {
        legend: { display: false },
    },
    scales: {
        x: {
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            ticks: { color: "#ffffff" },
        },
        y: {
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            ticks: { color: "#ffffff" },
        },
    },
};

const Results = () => {
    return (
        <Layout>
            <div className={styles.Container}>
                {/* FAD Graph */}
                <div className={styles.Quadrant}>
                    <h2 className={styles.Header}>FAD Graph</h2>
                    <div className={styles.Content}>
                        <div className="flex-1">
                            <Line data={data} options={options} />
                        </div>
                    </div>
                </div>

                {/* 
                    Soil Temperature
                */}
                <div className={styles.Quadrant}>
                    <h2 className={styles.Header}>Soil Temperature</h2>
                    <div className={styles.Content}>
                        {/* Lables */}
                        <div className="grid grid-cols-3 text-white text-center font-semibold p-2 bg-[#0A2342]">
                            <p>Timestamp</p>
                            <p>Temperature (°C)</p>
                            <p>Notes</p>
                        </div>

                        <div className={styles.EntryField}>
                            {/* {[...Array(10)].map((_, i) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-3 items-center bg-[#1D4156] rounded-md 
                             border border-black text-center p-2 m-2"
                                >
                                    <p>12:00:{String(i).padStart(2, "0")}</p>
                                    <p>{25 + i}°C</p>
                                    <p>Condition {i}</p>
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>

                {/*
                    NPK
                */}
                <div className={styles.Quadrant}>
                    <h2 className={styles.Header}>NPK</h2>
                    <div className={styles.Content}>
                        {/* Lables */}
                        <div className="grid grid-cols-4 text-white text-center font-chivo font-semibold p-2 bg-[#0A2342]">
                            <p>Timestamp</p>
                            <p>Nitrogen (N)</p>
                            <p>Phosphorus (P)</p>
                            <p>Potassium (K)</p>
                        </div>
                        <div className={styles.EntryField}>
                            {/* {[...Array(15)].map((_, i) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-4 items-center bg-[#1D4156] 
                             rounded-md border border-black text-center
                             p-2 m-2"
                                >
                                    <p>12:01:{String(i).padStart(2, "0")}</p>
                                    <p>10 mg/kg</p>
                                    <p>20 mg/kg</p>
                                    <p>15 mg/kg</p>
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>

                {/*
                    Soil Moisture
                */}
                <div className={styles.Quadrant}>
                    <h2 className={styles.Header}>Soil Moisture</h2>
                    <div className={styles.Content}>
                        {/* Lables */}
                        <div className="grid grid-cols-3 text-white text-center font-semibold p-2 bg-[#0A2342]">
                            <p>Timestamp</p>
                            <p>Moisture (%)</p>
                            <p>Notes</p>
                        </div>
                        <div className={styles.EntryField}>
                            {/* Add multiple entries to test scrolling */}
                            {/* {[...Array(10)].map((_, i) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-3 items-center bg-[#1D4156] 
                             rounded-md border border-black text-center 
                             p-2 m-2"
                                >
                                    <p>12:02:{String(i).padStart(2, "0")}</p>
                                    <p>{30 + i}%</p>
                                    <p>Note {i}</p>
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Results;
