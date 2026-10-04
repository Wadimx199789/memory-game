import { createElement } from "../utils/create-element.js";
import { renderCard } from "./card.js";

export const createBoard = ({ onCardClick }) => {
  const board = createElement("ul", {
    className: "board",
  });

  const renderCards = (deck) => {
    board.replaceChildren(...deck.map(renderCard));
  };

  board.addEventListener("click", (event) => {
    const card = event.target.closest(".card");

    if (card) {
      onCardClick(card);
    }
  });

  return { element: board, renderCards };
};
