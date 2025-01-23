import React, { useState, useRef, useEffect } from "react";
import Ball from "./Ball";

import "./GameField.css";

let shiftCount = 0; // Counter for velocity shifts

const GameField = ({ onGameOver, setTitleState, score }) => {
  const ballSize = 12; // Ball dimensions: 12px
  const fieldRef = useRef(null); // Reference to the game field
  const [fieldSize, setFieldSize] = useState({ width: 0, height: 0 }); // Game field dimensions
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Ball position
  const velocity = useRef({ dx: 3, dy: 1.75 }); // Use ref for velocity to avoid stale state
  const animationFrameId = useRef(0); // Store the animation frame ID for cleanup
  const lastUpdateTime = useRef(0); // Store the last update time for delta time calculation

  // Measure the size of the game field, then set
  useEffect(() => {
    const updateFieldSize = () => {
      if (fieldRef.current) {
        const { offsetWidth, offsetHeight } = fieldRef.current;
        setFieldSize({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateFieldSize(); // Measure size on mount
    window.addEventListener("resize", updateFieldSize); // Re-measure on window resize

    return () => window.removeEventListener("resize", updateFieldSize); // Cleanup
  }, []);

  // Set the ball's initial position once fieldSize is valid
  useEffect(() => {
    if (fieldSize.width > 0 && fieldSize.height > 0) {
      setPosition({
        x: (fieldSize.width - ballSize) / 2,
        y: (fieldSize.height - ballSize) / 2,
      });
    }
  }, [fieldSize, ballSize]);

  //Randomize the ball's initial velocity
  useEffect(() => {
    velocity.current = {
      dx: Math.random() < 0.5 ? 3 : -3,
      dy: Math.random() < 0.5 ? 1.75 : -1.75, // Slightly slower than x values for more horizontal movement
    };
  }, []);

  // Move ball function
  const moveBall = () => {
    const now = Date.now();
    const deltaTime = now - lastUpdateTime.current;

    if (deltaTime > 16) {
      // Throttle updates to approximately 60fps
      setPosition((prev) => {
        let newX = prev.x + velocity.current.dx;
        let newY = prev.y + velocity.current.dy;

        // Horizontal bounds check
        if (newX <= 0 || newX >= fieldSize.width - ballSize) {
          velocity.current.dx *= -1; // Reverse direction
          newX = Math.max(0, Math.min(newX, fieldSize.width - ballSize));
          score.current += 1; // Increment score
          let velocityShift = Math.random() < 0.5 ? 1.05 : 1.1; // Randomize velocity increase
          if (score.current <= 25) {
            velocity.current.dx *= velocityShift; // Increase velocity x
            velocity.current.dy *= velocityShift; // Increase velocity y
            shiftCount++;
            console.log(
              `SHIFT COUNT: ${shiftCount}
              V-Shift: ${velocityShift}
              V: (${velocity.current.dx}, ${velocity.current.dy})`
            );
          } else if (score.current > 25 && score.current % 5 === 0) {
            //Velocity change-up every 5 points after 20
            //--> 50/50 chance to increase or decrease a velocity value by 10%
            //--> Coin flip to determine whether to change x OR y (exclusive)
            let random = Math.random();
            let coinFlip = Math.random() < 0.5 ? "x" : "y";
            if (random < 0.5) {
              velocityShift = 1.1;
              if (coinFlip === "x") velocity.current.dx *= velocityShift;
              if (coinFlip === "y") velocity.current.dy *= velocityShift;
            } else if (random >= 0.5) {
              velocityShift = 0.9;
              if (coinFlip === "x") velocity.current.dx *= velocityShift;
              if (coinFlip === "y") velocity.current.dy *= velocityShift;
            }

            //Quick checks to keep velocity within bounds
            //--> Keep V between 10-20 to improve user experience while maintaining a challenge
            //--> Higher values can cause frame issues and make the game too difficult
            //--> If negative, keep V between -10 and -20
            //--> If positive, keep V between 10 and 20
            //--> Vx and Vy have different ranges to allow for more horizontal movement
            //--> Vx stays between 14 and 20 (or neg equivalent); Vy stays between 10 and 16 (or neg equivalent)
            //--> If Vx or Vy is too high/low, new random value between 15-17 (Vx) or 12-16 (Vy) is assigned
            let randomVx = Math.random() * (17 - 15 + 1) + 15; //value between 15 and 17
            let randomVy = Math.random() * (15 - 13 + 1) + 13; //value between 13 and 15

            //Dx checks for greater than -14 and less than 14
            if (velocity.current.dx < 0 && velocity.current.dx > -14) {
              velocity.current.dx = randomVx * -1;
            } else if (velocity.current.dx > 0 && velocity.current.dx < 14) {
              velocity.current.dx = randomVx;
            }
            //Dy checks for greater than -10 and less than 10
            if (velocity.current.dy < 0 && velocity.current.dy > -10) {
              velocity.current.dy = randomVy * -1;
            } else if (velocity.current.dy > 0 && velocity.current.dy < 10) {
              velocity.current.dy = randomVy;
            }
            //Dx checks for greater than 20 and less than -20
            if (velocity.current.dx > 20) {
              velocity.current.dx = randomVx;
            } else if (velocity.current.dx < -20) {
              velocity.current.dx = randomVx * -1;
            }
            //Dy checks for greater than 16 and less than -16
            if (velocity.current.dy > 16) {
              velocity.current.dy = randomVy;
            } else if (velocity.current.dy < -16) {
              velocity.current.dy = randomVy * -1;
            }

            shiftCount++;
            console.log(
              `SHIFT COUNT: ${shiftCount}
              V${coinFlip}-Shift: ${velocityShift}
              V: (${velocity.current.dx}, ${velocity.current.dy})`
            );
          }
        }

        // Vertical bounds check
        if (newY <= 0 || newY >= fieldSize.height - ballSize) {
          velocity.current.dy *= -1; // Reverse direction
          newY = Math.max(0, Math.min(newY, fieldSize.height - ballSize));
        }

        return { x: newX, y: newY };
      });
    }

    // Continuously call moveBall
    animationFrameId.current = requestAnimationFrame(moveBall);
  };

  // Handle ball movement with requestAnimationFrame
  useEffect(() => {
    if (fieldSize.width > 0 && fieldSize.height > 0) {
      animationFrameId.current = requestAnimationFrame(moveBall);
    }

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [fieldSize]); // Depend only on fieldSize to ensure bounds are accurate

  // Set the title when the component mounts
  useEffect(() => {
    setTitleState("Play Pong!");
  }, [setTitleState]);

  return (
    <div className="Game-Field">
      <h2>Score: {score.current}</h2>
      <div className={`Box`} ref={fieldRef}>
        <Ball position={position} />
      </div>

      <button id="end-button" onClick={() => onGameOver()}>
        End Game
      </button>
    </div>
  );
};

export default GameField;
