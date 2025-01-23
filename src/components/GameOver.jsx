import React, { useEffect } from "react";

import "./GameOver.css";

const GameOver = ({ onRestart, onStart, setTitleState, score }) => {
  useEffect(() => {
    setTitleState("Game Over!");
    //If user is still on screen after 2.5 seconds, change title to "Play Again?"
    const timeout = setTimeout(() => {
      setTitleState("Play Again?");
    }, 2500);

    return () => clearTimeout(timeout); // Cleanup (will not run if user leaves screen before 2.5 seconds)
  }, [setTitleState]);

  return (
    <div className={`Game-Over`}>
      <h2 id="final-score">Final Score: {score}</h2>
      <div className="Button-Container">
        <button id="play-again-button" onClick={onRestart}>
          Play Again
        </button>
        <button id="start-screen-button" onClick={onStart}>
          Start Screen
        </button>
      </div>
    </div>
  );
};

export default GameOver;
