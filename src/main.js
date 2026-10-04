import "./styles/main.scss";
import { cards } from "./data/cards.js";
import { renderHeader } from "./components/header.js";
import { createModal } from "./components/modal.js";
import { renderGame } from "./components/game.js";
import { renderLeaderboard } from "./components/leaderboard.js";
import { getFromStorage, saveToStorage } from "./utils/storage.js";
import { createButton } from "./components/button.js";
import { createStats } from "./components/stats.js";
import { createBoard } from "./components/board.js";
import { shuffle } from "./utils/shuffle.js";
import { initTheme } from "./utils/theme.js";

const PAIRS_COUNT = 8;

const CLOSE_DELAY = 1000;
const FLIP_DURATION = 400;

const LEADERS_KEY = "leaders";

const stats = createStats({ totalPairs: PAIRS_COUNT });

let movesCount = 0;
let pairsCount = 0;
let firstCard = null;
let isBoardLocked = false;
let closeTimer = null;
let matchTimers = [];

const handleCardClick = (card) => {
  if (
    isBoardLocked ||
    card.classList.contains("card--open") ||
    card.classList.contains("card--matched")
  ) {
    return;
  }

  card.classList.add("card--open");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  const secondCard = card;
  movesCount += 1;

  if (firstCard.dataset.id === secondCard.dataset.id) {
    const matchedFirstCard = firstCard;
    firstCard = null;
    pairsCount += 1;
    stats.updateStats({ movesCount, pairsCount });

    if (pairsCount === PAIRS_COUNT) {
      saveResult(movesCount);
    }

    const matchTimer = setTimeout(() => {
      matchedFirstCard.classList.replace("card--open", "card--matched");
      secondCard.classList.replace("card--open", "card--matched");
      matchTimers = matchTimers.filter((timer) => timer !== matchTimer);

      if (pairsCount === PAIRS_COUNT && matchTimers.length === 0) {
        showWinModal(movesCount);
      }
    }, FLIP_DURATION);

    matchTimers.push(matchTimer);
    return;
  }

  stats.updateStats({ movesCount, pairsCount });
  isBoardLocked = true;

  const openedFirstCard = firstCard;
  firstCard = null;

  closeTimer = setTimeout(() => {
    openedFirstCard.classList.remove("card--open");
    secondCard.classList.remove("card--open");
    isBoardLocked = false;
    closeTimer = null;
  }, CLOSE_DELAY);
};

const board = createBoard({ onCardClick: handleCardClick });

const getLeaders = () => {
  const leaders = getFromStorage(LEADERS_KEY, []);

  return Array.isArray(leaders) ? leaders : [];
};

const saveResult = (moves) => {
  const leaders = getLeaders();
  leaders.push({ moves, date: Date.now() });
  saveToStorage(LEADERS_KEY, leaders);
};

const showWinModal = (moves) => {
  const newGameButton = createButton({
    text: "New game",
    classes: ["button--primary"],
    onButtonClick: () => {
      modal.closeModal();
      startNewGame();
    },
  });

  const modal = createModal({
    modalTitle: "You won!",
    modalSubtitle: `Moves: ${moves}`,
    modalButtons: [newGameButton],
  });

  modal.openModal();
};

const startNewGame = () => {
  clearTimeout(closeTimer);
  closeTimer = null;
  matchTimers.forEach(clearTimeout);
  matchTimers = [];
  firstCard = null;
  isBoardLocked = false;

  movesCount = 0;
  pairsCount = 0;
  stats.updateStats({ movesCount, pairsCount });

  const pairs = cards.slice(0, PAIRS_COUNT);
  const deck = shuffle([...pairs, ...pairs]);
  board.renderCards(deck);
};

const showLeaderboard = () => {
  const leaders = getLeaders();

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
  initTheme();

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
