import { createElement } from "../utils/create-element.js";

export const renderCard = ({ id, emoji }) => {
  const item = createElement("li");

  const card = createElement("button", {
    className: "card",
    type: "button",
  });
  card.dataset.id = id;
  card.setAttribute("aria-label", "Card");

  const front = createElement("span", {
    className: "card__front",
    textContent: emoji,
  });

  card.append(front);
  item.append(card);

  return item;
};
