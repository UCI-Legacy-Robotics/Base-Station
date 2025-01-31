import React, { useState } from "react";
import Layout from "../components/Layout";

const System = () => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([]);
    const [visibleHistory, setVisibleHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(null);

    // Enter User Input
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (input.trim() !== "") {
                if (input.trim().toLowerCase() === "clear") {
                    setVisibleHistory([]);
                } else if (input.trim().toLowerCase() === "history") {
                    setVisibleHistory((prev) => [...prev, ">> history"]);
                    setVisibleHistory((prev) => [
                        ...prev,
                        ...history.slice(-5),
                    ]);
                } else {
                    setHistory((prevHistory) => {
                        const newHistory = [...prevHistory, input];
                        return newHistory.length > 5
                            ? newHistory.slice(1)
                            : newHistory;
                    });
                    setVisibleHistory((prevHistory) => [
                        ...prevHistory,
                        `>> ${input}`,
                    ]);
                }
                setInput("");
                setHistoryIndex(null);
            }
        }

        // Up Arrow
        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (history.length > 0) {
                setHistoryIndex((prevIndex) => {
                    let newIndex =
                        prevIndex === null
                            ? history.length - 1
                            : Math.max(0, prevIndex - 1);
                    setInput(history[newIndex]);
                    return newIndex;
                });
            }
        }
        // Down Arrow
        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (history.length > 0 && historyIndex !== null) {
                setHistoryIndex((prevIndex) => {
                    let newIndex = prevIndex + 1;
                    if (newIndex >= history.length) {
                        setInput("");
                        return null;
                    }
                    setInput(history[newIndex]);
                    return newIndex;
                });
            }
        }
    };

    return (
        <Layout>
            {/* Container */}
            <div className="bg-[#041428] h-full w-full rounded-md flex flex-col">
                {/* Title */}
                <div className="w-full h-[4rem] border-[0.375rem] border-black flex items-center px-[1rem] rounded-t-lg bg-[#0A2342]">
                    <h2 className="text-white font-chivo-semibold text-[2rem] mb-1">
                        System Tester
                    </h2>
                </div>

                {/* Terminal */}
                <div className="flex-grow p-4 text-white font-mono overflow-y-auto">
                    {visibleHistory.map((command, index) => (
                        <div key={index} className="mb-1">
                            {command.startsWith(">>") ? (
                                <span className="text-green-400">
                                    {command}
                                </span>
                            ) : (
                                <div className="text-gray-300">{command}</div>
                            )}
                        </div>
                    ))}

                    {/* Input */}
                    <div className="flex items-center mt-2">
                        <span className="text-green-400">{" >> "}</span>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-white font-mono ml-2 w-full"
                            autoFocus
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default System;
