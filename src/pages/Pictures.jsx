import React, { useState } from "react";
import Layout from "../components/Layout";
import PicturePopup from "../components/PicturePopup";
import ImageIcon from "../assets/ImageIcon.png";
import RemoveIcon from "../assets/RemoveIcon.png";

const styles = {
    HeaderContainer:
        "bg-[#0A2342] w-full flex items-center justify-between flex-shrink-0 border-4 border-black py-2",
    HeaderText:
        "text-white text-[1.5em] font-chivo font-bold flex justify-center w-1/3",
    ScrollContainer:
        "h-[calc(100%-4rem)] w-full overflow-y-auto rounded-b-md flex-grow space-y-2 pt-2",
    EntryContainer:
        "bg-[#1D4156] rounded-md border-4 border-black flex items-center justify-between py-2 px-4 cursor-pointer",
    EntryText:
        "text-white font-semibold font-chivo flex items-center justify-center text-center w-1/3",
    RemoveIcon: "h-6 w-6 cursor-pointer opacity-90 hover:opacity-100",
    ContextMenu:
        "h-fit w-[7rem] absolute bg-[#3B454B] text-white font-chivo font-normal p-[0.5rem] rounded-md shadow-md border-2 border-white z-50",
    MenuItem: "px-4 hover:bg-[#4A627F] cursor-pointer rounded-md",
};

const Pictures = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [popupTitle, setPopupTitle] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [entries, setEntries] = useState(
        []
        // Array.from({ length: 20 }, (_, i) => ({
        //   name: `ZEDCamera${(i % 2) + 1}-Dec-30-12:21`,
        //   timestamp: "12:21:00",
        //   camera: `ZED Camera ${(i % 2) + 1}`,
        // }))
    );
    // Place Context Menu
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        targetIndex: null,
    });

    // Remove Photo
    const handleRemove = (indexToRemove) => {
        setEntries((prevEntries) =>
            prevEntries.filter((_, index) => index !== indexToRemove)
        );
        setContextMenu({ visible: false });
    };

    // Rename Entry
    const handleRename = (index) => {
        const newName = prompt("Enter a new name:", entries[index].name);
        if (newName) {
            setEntries((prevEntries) =>
                prevEntries.map((entry, i) =>
                    i === index ? { ...entry, name: newName } : entry
                )
            );
        }
        setContextMenu({ visible: false });
    };

    // Open Photo
    const handleOpen = (index) => {
        setSelectedIndex(index);
        setPopupTitle(entries[index].name);
        setShowPopup(true);
        setContextMenu({ visible: false });
    };

    // Context Menu Handlers
    const handleContextMenu = (event, index) => {
        event.preventDefault();
        setContextMenu({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            targetIndex: index,
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu({ visible: false });
    };

    return (
        <Layout>
            <div
                className="bg-[#041428] h-full w-full rounded-b-md text-white p-4"
                onClick={handleCloseContextMenu}
            >
                {/* Header Container */}
                <div className={styles.HeaderContainer}>
                    <div className={styles.HeaderText}>Name</div>
                    <div className={styles.HeaderText}>Timestamp</div>
                    <div className={styles.HeaderText}>Associated Camera</div>
                </div>

                {/* Scroll Area */}
                <div className={styles.ScrollContainer}>
                    {entries.map((entry, index) => (
                        <div
                            key={index}
                            onClick={() => handleOpen(index)}
                            onContextMenu={(e) => handleContextMenu(e, index)}
                            className={`${styles.EntryContainer} hover:bg-[#2A4A5E]`}
                        >
                            {/* Photo Entrie Content */}
                            <img
                                src={ImageIcon}
                                alt="Image Icon"
                                className="h-6 w-6"
                            />
                            <div className={styles.EntryText}>{entry.name}</div>
                            <div className={styles.EntryText}>
                                {entry.timestamp}
                            </div>
                            <div className={styles.EntryText}>
                                {entry.camera}
                            </div>
                            <img
                                src={RemoveIcon}
                                alt="Remove Icon"
                                className={styles.RemoveIcon}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(index);
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* 
          Context Menu
        */}
                {contextMenu.visible && (
                    <div
                        className={styles.ContextMenu}
                        style={{ top: contextMenu.y, left: contextMenu.x }}
                    >
                        <div
                            className={styles.MenuItem}
                            onClick={() => handleOpen(contextMenu.targetIndex)}
                        >
                            Open
                        </div>
                        <div
                            className={styles.MenuItem}
                            onClick={() =>
                                handleRename(contextMenu.targetIndex)
                            }
                        >
                            Rename
                        </div>
                        <div
                            className={styles.MenuItem}
                            onClick={() =>
                                handleRemove(contextMenu.targetIndex)
                            }
                        >
                            Delete
                        </div>
                    </div>
                )}
            </div>

            {/* Picture Popup */}
            {showPopup && (
                <PicturePopup
                    title={popupTitle}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </Layout>
    );
};

export default Pictures;
