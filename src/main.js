import "./styles/main.scss";
import { cards } from "./data/cards.js";
import { renderHeader } from "./components/header.js";
import { createModal } from "./components/modal.js";
import { renderGame } from "./components/game.js";
import { renderLeaderboard } from "./components/leaderboard.js";
import { getFromStorage } from "./utils/storage.js";
import { createStats } from "./components/stats.js";
import { createBoard } from "./components/board.js";
import { shuffle } from "./utils/shuffle.js";

const PAIRS_COUNT = 8;

const stats = createStats();
const handleCardClick = (card) => {
  console.log(card.dataset.id);
};

const board = createBoard({ onCardClick: handleCardClick });

let movesCount = 0;
let pairsCount = 0;

const startNewGame = () => {
  movesCount = 0;
  pairsCount = 0;
  stats.updateStats({ movesCount, pairsCount });

  const pairs = cards.slice(0, PAIRS_COUNT);
  const deck = shuffle([...pairs, ...pairs]);
  board.renderCards(deck);
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
  game.append(stats.element, board.element);

  document.body.append(header, game);
  startNewGame();
};

initLayout();
