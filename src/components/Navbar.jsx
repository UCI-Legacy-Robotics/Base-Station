import React from "react";
import { useLocation } from "react-router-dom";

// Images
import LegacyLogo from "/Legacy-Icon.png";
import LineDivide from "../assets/LineDivide.png";
import NavIcon from "../assets/NavIcon.png";
import CamIcon from "../assets/CamIcon.png";
import ScienceIcon from "../assets/ScienceIcon.png";
import ResultsIcon from "../assets/ResultsIcon.png";
import RocksIcon from "../assets/RocksIcon.png";
import ArmIcon from "../assets/ArmIcon.png";
import ControllerIcon from "../assets/Controller.png";
import LogsIcon from "../assets/LogsIcon.png";
import PicturesIcon from "../assets/PicturesIcon.png";
import SystemIcon from "../assets/SystemIcon.png";

const styles = {
    container: "p-4",
    heading: "flex items-center text-[2rem] mb-4 space-x-2 font-russo",
    list: "space-y-2",
    lineDivider: "my-4 w-full",
    icon: "w-[1.875rem] h-[1.875rem]",
    logo: "w-[4.4375rem] h-[4.1875rem]",
    headerText: "font-russo leading-tight",
    text: "font-russo leading-tight text-[0.8em]",
};

// Helper function to get classes for active/inactive links
const getLinkClasses = (path, currentPath) => {
    const activeClasses = "bg-[#FFFFFF] text-[#041428]";
    const baseClasses =
        "flex items-center hover:bg-gray-700 p-2 rounded space-x-[0.9375rem] text-[1.5rem] font-russo";
    return path === currentPath
        ? `${baseClasses} ${activeClasses}`
        : baseClasses;
};

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className={styles.container}>
            {/*
      Header
    */}
            <h2 className={styles.heading}>
                <img
                    src={LegacyLogo}
                    alt="Legacy Logo"
                    className={styles.logo}
                />
                <span className={styles.headerText}>LEGACY ROBOTICS</span>
            </h2>
            <img
                src={LineDivide}
                alt="Divider"
                className={styles.lineDivider}
            />
            <ul className={styles.list}>
                {/*
        Navigation
      */}
                <li>
                    <a
                        href="/Navigation"
                        className={getLinkClasses("/Navigation", currentPath)}
                    >
                        <img
                            src={NavIcon}
                            alt="Navigation icon"
                            className={styles.icon}
                        />
                        <span className={styles.text}>Navigation</span>
                    </a>
                </li>
                {/*
        Cams
      */}
                <li>
                    <a
                        href="/Cams"
                        className={getLinkClasses("/Cams", currentPath)}
                    >
                        <img
                            src={CamIcon}
                            alt="Cams icon"
                            className={styles.icon}
                        />
                        <span className={styles.text}>Cams</span>
                    </a>
                </li>
                {/*
        Science
      */}
                <li>
                    <a
                        href="/Science"
                        className={getLinkClasses("/Science", currentPath)}
                    >
                        <img
                            src={ScienceIcon}
                            alt="Science icon"
                            className={styles.icon}
                        />
                        <span className={styles.text}>Science</span>
                    </a>
                </li>
                {/*
        Results
      */}
                <li>
                    <a
                        href="/Results"
                        className={getLinkClasses("/Results", currentPath)}
                    >
                        <img
                            src={ResultsIcon}
                            alt="Results icon"
                            className={styles.icon}
                        />
                        <span className={styles.text}>Results</span>
                    </a>
                </li>
                {/*
        Rocks
      */}
                <li>
                    <a
                        href="/Rocks"
                        className={getLinkClasses("/Rocks", currentPath)}
                    >
                        <img
                            src={RocksIcon}
                            alt="Rocks icon"
                            className={styles.icon}
                        />
                        <span className={styles.text}>Rocks</span>
                    </a>
                </li>
                {/*
        Arm
      */}
                <li>
                    <a
                        href="/Arm"
                        className={getLinkClasses("/Arm", currentPath)}
                    >
                        <img
                            src={ArmIcon}
                            alt="Arm icon"
                            className={styles.icon}
                        />
                        <span className={styles.text}>Arm</span>
                    </a>
                </li>
                {/*
        Controller
      */}
                <li>
                    <a
                        href="/Controller"
                        className={getLinkClasses("/Controller", currentPath)}
                    >
                        <img
                            src={ControllerIcon}
                            alt="Controller icon"
                            className={styles.icon}
                        />
                        <span className={styles.text}>Controller</span>
                    </a>
                </li>
                {/*
        System
      */}
                <li>
                    <a
                        href="/System"
                        className={getLinkClasses("/System", currentPath)}
                    >
                        <img
                            src={SystemIcon}
                            alt="System icon"
                            className={styles.icon}
                        />
                        <span className={styles.text}>System</span>
                    </a>
                </li>
                {/*
        Logs
      */}
                <li>
                    <a
                        href="/Logs"
                        className={getLinkClasses("/Logs", currentPath)}
                    >
                        <img
                            src={LogsIcon}
                            alt="Logs icon"
                            className={styles.icon}
                        />
                        <span className={styles.text}>Logs</span>
                    </a>
                </li>
                {/* 
        Pictures 
      */}
                <li>
                    <a
                        href="/Pictures"
                        className={getLinkClasses("/Pictures", currentPath)}
                    >
                        <img
                            src={PicturesIcon}
                            alt="Pictures icon"
                            className={styles.icon}
                        />
                        <span className={styles.text}>Pictures</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
