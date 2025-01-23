import React from "react";

function Paddle({ position, side }) {
  return <div className="Paddle" style={{ top: position, [side]: 0 }}></div>;
}

export default Paddle;
