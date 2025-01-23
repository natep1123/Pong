import React, { useState, useEffect } from "react";

import "./LoadingScreen.css";

const LoadingScreen = ({ onLoad, setTitleState }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    setTitleState("Starting in...");

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Defer onLoad to avoid triggering parent state updates mid-render
          setTimeout(onLoad, 0); // Defer onLoad to the next event loop
          return prev; // Keep countdown at 1 during cleanup
        }
        return prev - 1;
      });
    }, 1000); // 1 second interval

    return () => clearInterval(timer);
  }, [setTitleState, onLoad]);

  return (
    <div className={`Loading-Screen`}>
      <h2 id="countdown">{countdown}</h2>
    </div>
  );
};

export default LoadingScreen;
