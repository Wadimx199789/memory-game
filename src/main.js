import "./styles/main.scss";
import { renderHeader } from "./components/header.js";
import { renderGame } from "./components/game.js";

const startNewGame = () => {
  console.log("new game");
};

const showLeaderboard = () => {
  console.log("leaderboard");
};

const initLayout = () => {
  const header = renderHeader({
    onNewGame: startNewGame,
    onShowLeaderboard: showLeaderboard,
  });
  const game = renderGame();

  document.body.append(header, game);
};

initLayout();
