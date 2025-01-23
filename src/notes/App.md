# App

## Summary:

Top-level component. Manages the gameState variable and allows for the rendering of...

- StartScreen
- LoadingScreen
- GameField
- GameOver

It initiates the gameState variable, titleState variable and scoreRef variable. These two states and one reference are responsible for dynamically updating the state of the game (start, loading, playing, gameOver), as well as the title changes and tracking the score.

The score is used as a reference (instead of a state) for the following reasons:

1. Avoid unnecesary re-renders to help keep animation smooth
2. Mutable; so I can increment the score
