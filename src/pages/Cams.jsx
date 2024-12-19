import React, { useState } from 'react';
import Layout from '../components/Layout';
import Exit from '../assets/Exit.png';
import Capture from '../assets/CaptureButton.png';

// Styles object
const styles = {
  Quadrant: "bg-[#041428] flex flex-col justify-start items-start text-white relative p-4 rounded-md",
  QuadrentTitle: "text-white text-[1.5em] mb-2 font-chivo-semibold ",
  Content: "flex-grow bg-[#0A1E2B] w-full h-full rounded cursor-pointer",

  popup: "fixed inset-0 flex items-center justify-center z-50",
  popupBox: "w-[80rem] h-[50rem] bg-[#041428] rounded-lg shadow-lg p-[1rem] flex flex-col justify-center relative",
  popupHeader: "w-full h-[4.875rem] border-[0.375rem] border-black flex items-center px-[1rem] absolute top-0 left-0 rounded-t-lg",
  popupTitle: "text-4xl font-bold text-white",
  exitImage: "w-[2.5rem] h-[2.5rem] cursor-pointer absolute right-[1rem] top-1/2 transform -translate-y-1/2",
  overlay: "fixed inset-0 bg-[#323232] bg-opacity-75 z-40",
  captureButton: "absolute bottom-[0.5rem] right-[0.8rem] w-[5rem] h-[5rem] shadow-lg cursor-pointer",
};

// Popup Component
const Popup = ({ title, onClose }) => {
  const handleCaptureClick = () => {
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'short' });
    const day = now.getDate();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timestamp = `${month}-${day}-${hours}:${minutes}`;
    const logMessage = `${title.replace(/\s+/g, '')}-${timestamp}`;

    console.log(logMessage);
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.popup}>
        <div className={styles.popupBox}>
          <div className={styles.popupHeader}>
            <h2 className={styles.popupTitle}>{title}</h2>
            <img
              src={Exit}
              alt="Exit"
              className={styles.exitImage}
              onClick={onClose}
            />
          </div>
          <div className="flex-grow mt-20 relative">
            <div className="bg-black w-full h-full">{/* Camera Feed */}</div>
            <img
              src={Capture}
              alt="Capture Button"
              className={styles.captureButton}
              onClick={handleCaptureClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};


const Cams = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');

  const handleContentClick = (title) => {
    if (title !== 'GNSS Map' && title !== 'Gazebo') {
      setPopupTitle(title);
      setShowPopup(true);
    }
  };

  const closePopup = () => setShowPopup(false);

  return (
    <Layout>
      <div className="h-full w-full grid grid-rows-2 gap-[1rem]">
        {/* Cameras */}
        <div className="grid grid-cols-3 gap-[1rem]">
          {/* ZED Camera 1 */}
          <div
            className={styles.Quadrant}
            onClick={() => handleContentClick('ZED Camera 1')}
          >
            <h2 className={styles.QuadrentTitle}>ZED Camera 1</h2>
            <div className={styles.Content}></div>
          </div>
          {/* ZED Camera 2 */}
          <div
            className={styles.Quadrant}
            onClick={() => handleContentClick('ZED Camera 2')}
          >
            <h2 className={styles.QuadrentTitle}>ZED Camera 2</h2>
            <div className={styles.Content}></div>
          </div>
          {/* Arm ArduCam */}
          <div
            className={styles.Quadrant}
            onClick={() => handleContentClick('Arm ArduCam')}
          >
            <h2 className={styles.QuadrentTitle}>Arm ArduCam</h2>
            <div className={styles.Content}></div>
          </div>
        </div>

        {/* Bottom row with 2 columns */}
        <div className="grid grid-cols-2 gap-[1rem]">
          {/* GNSS Map */}
          <div
            className={styles.Quadrant}
            onClick={() => handleContentClick('GNSS Map')}
          >
            <h2 className={styles.QuadrentTitle}>GNSS Map</h2>
            <div className={styles.Content}></div>
          </div>
          {/* Gazebo */}
          <div
            className={styles.Quadrant}
            onClick={() => handleContentClick('Gazebo')}
          >
            <h2 className={styles.QuadrentTitle}>Gazebo</h2>
            <div className={styles.Content}></div>
          </div>
        </div>
      </div>

      {/* Render Popup */}
      {showPopup && <Popup title={popupTitle} onClose={closePopup} />}
    </Layout>
  );
};

export default Cams;
