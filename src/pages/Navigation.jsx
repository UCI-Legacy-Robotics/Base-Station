import React from 'react';

const containerClasses = [
  "flex",
  "items-center",
  "justify-center",
  "h-screen",
  "bg-[#0A2342]"
].join(' ');

const headingClasses = [
  "text-white",
  "text-4xl",
  "font-bold"
].join(' ');

const Navigation = () => {
  return (
    <div className={containerClasses}>
      <h1 className={headingClasses}> Navigation Page!</h1>
    </div>
  );
};

export default Navigation;
