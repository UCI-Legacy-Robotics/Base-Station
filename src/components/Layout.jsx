import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatusBar from '../components/Statusbar';

// Define your styles
const styles = {
  NavBar: "fixed w-[18rem] text-[#FFFFFF] rounded-[0.5rem] bg-[#041428] left-[1rem] top-[1rem] bottom-[1rem] z-10",
  StatusBar: "fixed top-[1rem] right-[1rem] z-20 w-[55rem] h-[3.75rem] bg-[#041428] rounded-lg flex justify-center items-center px-[0.375rem] shadow-lg",
  Container: "relative h-screen bg-[#0A2342] flex",
  Content: "relative pt-[5.75rem] pb-[1rem] pr-[1rem] pl-[20rem] h-full w-full",
  Heading: "fixed top-[1rem] left-[20rem] text-white font-bold font-russo text-[2.75em] font-extrabold flex items-center",
};

// Mapping of paths to page titles
const pathTitleMap = {
  '/Navigation': 'Navigation',
  '/Cams': 'Cameras',
  '/Science': 'Science',
  '/Results': 'Results',
  '/Rocks': 'Rocks',
  '/Arm': 'Arm',
  '/Controller': 'Controller',
  '/Logs': 'Logs',
  '/Pictures': 'Pictures',
};

const Layout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Retrieve the title based on the current path
  const pageTitle = pathTitleMap[currentPath] || 'Error';

  return (
    <div className={styles.Container}>
      {/*
        Navbar on the left
      */}
      <div className={styles.NavBar}>
        <Navbar />
      </div>

      {/*
        StatusBar on top right
      */}
      <div className={styles.StatusBar}>
        <StatusBar />
      </div>

      {/*
        Dynamic Heading based on current route
      */}
      <div className={styles.Heading}>
        <h1>{pageTitle}</h1>
      </div>

      {/*
        Main content
      */}
      <div className={styles.Content}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
