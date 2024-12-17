import React from 'react';
import Layout from '../components/Layout';

// Styles object
const styles = {
  Heading: "text-white text-5xl font-extrabold pl-[19.875rem] pt-[1rem]",
};

const Arm = () => {
  return (
    <Layout>
      <h1 className={styles.Heading}>Arm</h1>
      {/* more content */}
    </Layout>
  );
};

export default Arm;
