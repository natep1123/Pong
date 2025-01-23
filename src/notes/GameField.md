# Game Field

## Summary

This component handles the active game; intialized when game state is set to "playing".

## Details:

This logic uses state management for the ball animation (contrary to start screen animation) but it is necessary because the ball animation has side-effects that c=make changes and updates to other aspects of the UI. Those changes are the score variable being updated and the changes in velocity, making state the optimal choice for the animation (instead of useRef for example).

**Basic Game Logic:**

- Ball initializes to center of field with potenial for 4 directions: for possibility to go any 4 directions
  (NW, NE, SW, SE)
- Ball hs velocity of (dx, dy)
- Collisions of upper/lower bounds results in reversal of dy
- Collisions of right/left bounds results in reversal of dx (without paddle logic; stale box container)
- Right/left bound collisions increment score by 1
- Velocity increases by either 5% or 10% per left/right bound collision (50/50 random chance)
- When score reaches 20, random velocity changes occur per 5 points after (25, 30, 35...)
- Random chances per 5 points after 20:

1. 50/50 chance to increase or decrease a **singular** velocity value by 10%
2. Coin flip to decide if the shift applies to dx or dy (exclusive)
3. Barriers in place to keep velocity between 10-20 (or negative equivalent)
4. If a velocity value falls out of bounds, new random velocity generated between 13-17 (or negative equivalent)

**Code Specifications:**

-
