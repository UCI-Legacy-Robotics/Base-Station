import React from 'react';
import Layout from '../components/Layout';

// Styles object
const styles = {
  Heading: "text-white text-5xl font-extrabold pl-[19.875rem] pt-[1rem]",
};

const Controller = () => {
  return (
    <Layout>
      <h1 className={styles.Heading}>Controller</h1>
      {/* more content */}
    </Layout>
  );
};

export default Controller;
