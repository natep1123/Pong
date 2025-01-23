# Markdown Notes for Pong Game

## React Hooks for Quick Reference:

### What is a React Hook?

---> A React Hook is a special function that lets you "hook into" React features (such as state and lifecycle methods), in functional components. Hooks allow you to use state and other React features without writing a class.

### What is a "lifetime" in React?

In React, a component's lifetime refers to the period during which a component is mounted on the DOM until it is unmounted. This includes the following phases:

1. **Mounting**: When the component is created and inserted into the DOM.
2. **Updating**: When the component's state or props change, causing a re-render.
3. **Unmounting**: When the component is removed from the DOM.

During its lifetime, a component can use hooks like `useEffect` to perform side effects at specific points, such as after it mounts or before it unmounts. The `useRef` hook can persist values across the entire lifetime of the component without causing re-renders.

### **useState()**:

---> A React hook that allows you to add state to functional components, returning a state variable and a function to update it.

### **useEffect()**:

---> A React hook that allows you to perform side effects in functional components, such as fetching data or directly manipulating the DOM.

### **useRef()**:

---> A React hook that returns a mutable ref object whose `.current` property is initialized to the passed argument and persists for the component's lifetime.

## Components (Descending):

App ---> StartScreen, LoadingScreen, GameField, GameOver; re-renders based on gameState
SS ---> Start-button
LS ---> 3s Countdown
GF ---> Boundaries, Paddle(L), Paddle(R) Ball; Game logic for collisions, paddle controls and velocity
GO ---> Restart-button

### 1. App.jsx

#### **Summary**:

The main component that initializes the game state. Calls themeSwitcher() to set the theme based on the current time. It renders the start screen, loading screen, game field, and game over screens based on the gameState variable.

#### **Hooks** (and/or) **Logic** Explanations:

1. themeSwitcher()

- imported JS function from './utils' to live-update theme upon render. Adds ("dawn","day","dusk", or "night") class to document.body
- [] Feature: settings button for drop-down selection of theme ("auto" for time-based; others as options ---> update localStorage)

2. useState() for gameState ("start", "loading", "playing", "gameOver")

- const [gameState, setGameState] = useState("start");
- gameState is the state being manipulated
- setGameState is the function that will be called to change the state of gameState variable
- "start" inside useState() is the default state for rendering

### 2. StartScreen.jsx

#### **Summary**:

Default opening-page. StartScreen rendered; gameState initialized to "start" until button is clicked.

### 3. LoadingScreen.jsx

#### **Summary**:

On click of start button, gameState changes to "loading" and re-render occurs to show a 3-second countdown. Once the countdown is complete, it transitions the gameState to "playing".

### 4. GameField.jsx

#### **Summary**:

When gameState = "playing", re-render occurs to display the gameField. It contains paddles and ball as child components.

#### **Hooks** (and/or) **Logic** Explanations:

1. .getBoundingClientRect()

- Used to dynamically retrieve the boundaries based on viewport size.

### 5. GameOver.jsx

#### **Summary**:

The screen that appears when gameState = "gameOver". It displays the final score and provides an option to restart the game, which sets gameState = "start" and returns to start screen

### 6. Paddle.jsx

#### **Summary**:

Represents a paddle in the game. It handles the paddle's position and movement based on user input.

### 7. Ball.jsx

#### **Summary**:

Component for the ball in the game. It handles the ball's position, movement, and collision with paddles and walls.
