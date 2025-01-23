import React, { useState, useRef, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import LoadingScreen from "./components/LoadingScreen";
import GameField from "./components/GameField";
import GameOver from "./components/GameOver";

import "./App.css";

function App() {
  const [gameState, setGameState] = useState("start");
  const [titleState, setTitleState] = useState("Pong!");
  const scoreRef = useRef(0);

  const resetScore = () => {
    scoreRef.current = 0;
  };

  return (
    <div className={`App`}>
      <h1>{titleState}</h1>
      {gameState === "start" && (
        <StartScreen
          setTitleState={setTitleState}
          onStart={() => setGameState("loading")}
        />
      )}
      {gameState === "loading" && (
        <LoadingScreen
          setTitleState={setTitleState}
          onLoad={() => setGameState("playing")}
        />
      )}
      {gameState === "playing" && (
        <GameField
          setTitleState={setTitleState}
          onGameOver={() => setGameState("gameOver")}
          score={scoreRef}
        />
      )}
      {gameState === "gameOver" && (
        <GameOver
          setTitleState={setTitleState}
          onRestart={() => {
            resetScore();
            setGameState("loading");
          }}
          onStart={() => {
            resetScore();
            setGameState("start");
          }}
          score={scoreRef.current}
        />
      )}
    </div>
  );
}

export default App;
