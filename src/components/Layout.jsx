import React from 'react';
import Navbar from '../components/Navbar';
import StatusBar from '../components/Statusbar';

const styles = {
  Container: "relative h-screen bg-[#0A2342]",
};

const Layout = ({ children }) => {
  return (
    <div className={styles.Container}>
      <Navbar />
      <StatusBar />
      {children}
    </div>
  );
};

export default Layout;
