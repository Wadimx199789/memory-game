import { createElement } from "../utils/create-element.js";

export const renderCard = ({ id, name, emoji }) => {
  const item = createElement("li");

  const card = createElement("button", {
    className: "card",
    type: "button",
    dataset: { id },
  });
  card.setAttribute("aria-label", "Card");

  const inner = createElement("span", {
    className: "card__inner",
  });

  const back = createElement("span", {
    className: "card__face card__back",
  });

  const front = createElement("span", {
    className: "card__face card__front",
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
  inner.append(back, front);
  card.append(inner);
  item.append(card);

  return item;
};
