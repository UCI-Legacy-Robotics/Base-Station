import React from 'react';
import Navbar from '../components/Navbar';

const containerClasses = [
  "flex",
  "items-center",
  "justify-center",
  "h-screen",
  "bg-[#0A2342]",
  "relative"
].join(' ');

const headingClasses = [
  "text-white",
  "text-4xl",
  "font-bold"
].join(' ');

const Controller = () => {
  return (
    <div className={containerClasses}>
      <Navbar />
      <h1 className={headingClasses}>Controller Page!</h1>
    </div>
  );
};

export default Controller;
