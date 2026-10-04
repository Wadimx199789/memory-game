import { createElement } from "../utils/create-element.js";
import { createButton } from "./button.js";

export const renderHeader = ({ onNewGame, onShowLeaderboard }) => {
  const header = createElement("header", {
    className: "header",
  });

  const title = createElement("h1", {
    className: "header__title",
    textContent: "Memory Game",
  });

  const actions = createElement("div", {
    className: "header__actions",
  });

  const newGameButton = createButton({
    text: "New game",
    classes: ["button--primary"],
    action: "new-game",
  });

  const leaderboardButton = createButton({
    text: "Leaderboard",
    classes: ["button--secondary"],
    action: "leaderboard",
  });

  actions.append(newGameButton, leaderboardButton);
  header.append(title, actions);

  header.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");

    if (!button) {
      return;
    }

    if (button.dataset.action === "new-game") {
      onNewGame();
    }

    if (button.dataset.action === "leaderboard") {
      onShowLeaderboard();
    }
  });

  return header;
};
