import { createElement } from "../utils/create-element.js";

export const renderGame = () => {
  const game = createElement("main", {
    className: "game",
  });

  return game;
};
