# Memory Game

A memory card game built as part of the RS School course. Flip cards, remember where they are and find all 8 pairs in as few moves as possible.

**Deploy:** https://wadimx199789.github.io/memory-game/

## Features

- 16 shuffled cards (8 pairs of animal emoji)
- Moves and found pairs counters
- "New game" button to reshuffle and reset the board
- Win modal with the final number of moves
- Leaderboard with the top 10 results, saved in `localStorage`
- Light and dark themes with a switcher (system theme by default, choice is saved)
- The whole interface is generated with JavaScript (`document.createElement`)

## Tech stack

- JavaScript (ES modules)
- SCSS
- Vite

## Getting started

Requirements: [Node.js](https://nodejs.org/) 20 or newer.

```bash
git clone https://github.com/Wadimx199789/memory-game.git
cd memory-game
git checkout memory-game
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173/).

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server                 |
| `npm run build`   | Build the production version to `dist` |
| `npm run preview` | Preview the production build         |

## Deployment

The app is deployed to GitHub Pages by GitHub Actions (`.github/workflows/deploy.yml`) on every push to the `memory-game` branch.
