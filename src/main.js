import "./styles/main.scss";
import { renderHeader } from "./components/header.js";
import { createModal } from "./components/modal.js";
import { renderGame } from "./components/game.js";
import { renderLeaderboard } from "./components/leaderboard.js";
import { getFromStorage } from "./utils/storage.js";

const startNewGame = () => {
  console.log("new game");
};

const showLeaderboard = () => {
  const leaders = getFromStorage("leaders", []);

  if (leaders.length) {
    const topLeaders = [...leaders]
      .sort((a, b) => a.moves - b.moves || a.date - b.date)
      .slice(0, 10);

    const modal = createModal({
      modalTitle: "Leaderboard",
      modalContent: renderLeaderboard(topLeaders),
    });

    modal.openModal();
    return;
  }

  const modal = createModal({
    modalTitle: "Leaderboard",
    modalSubtitle: "No results yet",
  });

  modal.openModal();
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
