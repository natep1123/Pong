import React from "react";

const Ball = ({ position }) => {
  return (
    <div className="Ball" style={{ top: position.y, left: position.x }}></div>
  );
};

export default Ball;
