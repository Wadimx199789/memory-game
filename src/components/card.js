import { createElement } from "../utils/create-element.js";

export const renderCard = ({ id, name, emoji }) => {
  const item = createElement("li");

  const card = createElement("button", {
    className: "card",
    type: "button",
  });
  card.dataset.id = id;
  card.setAttribute("aria-label", "Card");

  const front = createElement("span", {
    className: "card__front",
  });

  const emojiElement = createElement("span", {
    className: "card__emoji",
    textContent: emoji,
  });

  const nameElement = createElement("span", {
    className: "card__name",
    textContent: name,
  });

  front.append(emojiElement, nameElement);
  card.append(front);
  item.append(card);

  return item;
};
