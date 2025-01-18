import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import FilterIcon from "../assets/FilterIcon.png";

const styles = {
    HeaderContainer:
        "bg-[#0A2342] w-full flex flex-col flex-none p-2 pb-0 space-y-2 border-4 border-black",
    HeaderText:
        "text-white text-[1.3em] w-full h-full font-chivo font-bold flex items-center justify-center",
    MainContent:
        "w-full flex flex-col flex-grow overflow-hidden rounded-b-md pt-2",
    LabelBar:
        "h-12 w-full flex items-center justify-around flex-shrink-0 border-t-4 border-black",
    ScrollableContent: "flex-grow overflow-y-auto space-y-2",
    TextContent:
        "text-white w-full h-full font-chivo font-semibold flex items-center justify-center",
    LogEntry:
        "flex justify-between items-center bg-[#1D4156] rounded-md border border-black",
};

const Logs = () => {
    // Log entries
    const [entries, setEntries] = useState([]);

    // Auto Scroll
    const scrollRef = useRef(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setIsAutoScroll(scrollTop + clientHeight >= scrollHeight);
    };

    // Filter Entires
    const [filterText, setFilterText] = useState("");
    const filterEntries = () => {
        const trimmedFilter = filterText.trim();

        if (!trimmedFilter) {
            return entries;
        }

        if (trimmedFilter.includes("through")) {
            const [start, , end] = trimmedFilter.split(" ");
            return entries.filter(
                (entry) => entry.timestamp >= start && entry.timestamp <= end
            );
        }
        const keywords = trimmedFilter.toLowerCase().split(" ");
        return entries.filter((entry) =>
            keywords.every(
                (keyword) =>
                    entry.timestamp.toLowerCase().includes(keyword) ||
                    entry.sender.toLowerCase().includes(keyword) ||
                    entry.type.toLowerCase().includes(keyword) ||
                    entry.protocol.toLowerCase().includes(keyword) ||
                    entry.description.toLowerCase().includes(keyword)
            )
        );
    };

    const filteredEntries = filterEntries();

    // Auto Scroll and Filter dynamically
    useEffect(() => {
        if (isAutoScroll && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [filteredEntries, isAutoScroll]);

    ///////Effect to simulate incoming log data
    // useEffect(() => {
    //   let index = 0;
    //   const interval = setInterval(() => {
    //     setEntries((prevEntries) => [
    //       ...prevEntries,
    //       {
    //         timestamp: `12:34:${index < 10 ? `0${index}` : index}`,
    //         sender: index % 2 === 0 ? "Rover" : "BaseStation",
    //         type: ["TypeA", "TypeB", "TypeC"][Math.floor(Math.random() * 3)],
    //         protocol: ["Action", "Subscriber", "Client"][
    //           Math.floor(Math.random() * 3)
    //         ],
    //         description: "Data Sent",
    //       },
    //     ]);
    //     index++;
    //     if (index >= 1000) clearInterval(interval);
    //   }, 500);
    //   return () => clearInterval(interval);
    // }, []);

    return (
        <Layout>
            <div className="bg-[#041428] h-full w-full rounded-md flex flex-col p-[1rem]">
                {/* 
          Header Container
        */}
                <div className={styles.HeaderContainer}>
                    <div className="flex items-center w-full">
                        {/* Filter Icon */}
                        <img
                            src={FilterIcon}
                            alt="Filter Icon"
                            className="h-10 w-10 mr-2"
                        />
                        {/* Filter Bar */}
                        <input
                            type="text"
                            placeholder="Filter logs..."
                            className="flex-grow p-2 text-white bg-transparent border border-[#56656E] rounded-md focus:outline-none"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                    </div>
                    {/* Titles */}
                    <div className={styles.LabelBar}>
                        <h2 className={styles.HeaderText}>TimeStamp</h2>
                        <h2 className={styles.HeaderText}>Sender</h2>
                        <h2 className={styles.HeaderText}>Type</h2>
                        <h2 className={styles.HeaderText}>Protocol</h2>
                        <h2 className={styles.HeaderText}>Description</h2>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className={styles.MainContent}>
                    {/* Scrollable Content */}
                    <div
                        className={styles.ScrollableContent}
                        ref={scrollRef}
                        onScroll={handleScroll}
                    >
                        {/* Map Entries */}
                        {filteredEntries.map((entry, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-[#1D4156] rounded-md border-4 border-black h-[3rem]"
                            >
                                <p className={styles.TextContent}>
                                    {entry.timestamp}
                                </p>
                                <p className={styles.TextContent}>
                                    {entry.sender}
                                </p>
                                <p className={styles.TextContent}>
                                    {entry.type}
                                </p>
                                <p className={styles.TextContent}>
                                    {entry.protocol}
                                </p>
                                <p className={styles.TextContent}>
                                    {entry.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Logs;
