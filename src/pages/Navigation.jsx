import React from 'react';
import Navbar from '../components/Navbar';
import StatusBar from '../components/Statusbar';

// Extended styles object with updated classes
const styles = {
  container: "relative h-screen bg-[#0A2342] pl-[19.875rem] pt-[1rem]",
  navbar: "absolute left-[1rem] top-[1rem] bottom-[1rem] w-[18rem] text-[#FFFFFF] rounded-[0.5rem] bg-[#041428]",
  heading: "text-white text-5xl font-extrabold",
};

const Navigation = () => {
  return (
    <div className={styles.container}>
      <Navbar className={styles.navbar} />
      <StatusBar/>
      <h1 className={styles.heading}>Navigation</h1>
    </div>
  );
};

export default Navigation;
