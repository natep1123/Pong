import React, { useEffect, useRef } from "react";
import Ball from "./Ball";
import "./StartScreen.css";

const StartScreen = ({ onStart, setTitleState }) => {
  const ballSize = 12; // Ball dimensions
  const boxRef = useRef(null); // Reference to the box
  const ballRef = useRef(null); // Reference to the ball for direct manipulation
  const velocity = useRef({ dx: 3, dy: 1.75 }); // Ball velocity
  const position = useRef({ x: 0, y: 0 }); // Ball position
  const animationFrameId = useRef(0); // Store the animation frame ID
  const boxSize = useRef({ width: 300, height: 300 }); // Box dimensions

  // Measure the size of the game field dynamically
  useEffect(() => {
    const updateBoxSize = () => {
      if (boxRef.current) {
        const { offsetWidth, offsetHeight } = boxRef.current;
        boxSize.current = { width: offsetWidth, height: offsetHeight };
      }
    };

    updateBoxSize();
    window.addEventListener("resize", updateBoxSize);

    return () => window.removeEventListener("resize", updateBoxSize);
  }, []);

  // Set the ball's initial position when the box size is valid
  useEffect(() => {
    if (boxSize.current.width > 0 && boxSize.current.height > 0) {
      position.current = {
        x: (boxSize.current.width - ballSize) / 2,
        y: (boxSize.current.height - ballSize) / 2,
      };
      updateBallPosition();
    }
  }, []);

  // Randomize the ball's initial velocity
  useEffect(() => {
    velocity.current = {
      dx: Math.random() < 0.5 ? 3 : -3,
      dy: Math.random() < 0.5 ? 1.75 : -1.75,
    };
  }, []);

  // Update the ball's position in the DOM
  const updateBallPosition = () => {
    if (ballRef.current) {
      ballRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    }
  };

  // Move the ball and handle bounds collision
  const moveBall = () => {
    position.current.x += velocity.current.dx;
    position.current.y += velocity.current.dy;

    // Horizontal bounds check
    if (
      position.current.x <= 0 ||
      position.current.x >= boxSize.current.width - ballSize
    ) {
      velocity.current.dx *= -1; // Reverse direction
      position.current.x = Math.max(
        0,
        Math.min(position.current.x, boxSize.current.width - ballSize)
      );
    }

    // Vertical bounds check
    if (
      position.current.y <= 0 ||
      position.current.y >= boxSize.current.height - ballSize
    ) {
      velocity.current.dy *= -1; // Reverse direction
      position.current.y = Math.max(
        0,
        Math.min(position.current.y, boxSize.current.height - ballSize)
      );
    }

    // Update the ball's position
    updateBallPosition();

    // Continue animation
    animationFrameId.current = requestAnimationFrame(moveBall);
  };

  // Start the animation loop
  useEffect(() => {
    if (boxSize.current.width > 0 && boxSize.current.height > 0) {
      animationFrameId.current = requestAnimationFrame(moveBall);
    }

    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  // Set the title on mount
  useEffect(() => {
    setTitleState("Pong!");
  }, [setTitleState]);

  return (
    <div className={`Start-Screen`}>
      <h2>High Score: ???</h2>
      <div ref={boxRef} className={`Box`}>
        <div
          ref={ballRef}
          className="Ball"
          style={{
            width: `${ballSize}px`,
            height: `${ballSize}px`,
            position: "absolute",
          }}
        />
      </div>
      <button id="start-button" onClick={onStart}>
        Start!
      </button>
    </div>
  );
};

export default StartScreen;
