import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';

const containerClasses = [
  "loading-container",
  "flex",
  "items-center",
  "justify-center",
  "h-screen",
  "bg-[#0A2342]"
].join(' ');

const imageClasses = [
  "loading-image",
  "w-[470px]",
  "h-[610px]"
].join(' ');

const Loading = () => {
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavigation(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showNavigation) {
    return <Navigation />;
  }

  return (
    <div className={containerClasses}>
      <img
        src="src/assets/Logo.png"
        alt="Legacy Logo"
        className={imageClasses}
      />
    </div>
  );
};

export default Loading;
