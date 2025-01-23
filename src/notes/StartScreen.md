# Start Screen

## Summary:

This component renders the starting screen. It contains a button to start the game (initiate "loading" game state to render a 3-sec countdown; then update game state to "playing")

## Box Animation

### Summary:

The box animation uses similar logic to the actual GameField component which houses gameplay logic. The Box animation, however, takes advantage of the useRef hook to update the ball position without triggering rerender. GameField, in contrast, manipulates the ball through state management.

### Details:

The advantage to using useRef for the Box animation (as opposed to useState) is useRef does not trigger re-render. While not conventionally ideal, this approach is justified because the animation is isolated, not triggering changes in any other part of the UI. This updating of the ball position directly without need for re-render allows the animation to move smoothly without over-working the system with continuous re-rendering.

GameField must take the route of state management for the game animation because the animation triggers changes in the UI for score and velocity.
