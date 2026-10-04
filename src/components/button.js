import { createElement } from "../utils/create-element.js";

export const createButton = ({ onButtonClick, text, classes = [], action }) => {
  const button = createElement("button", {
    type: "button",
    textContent: text,
  });

  button.classList.add("button", ...classes);

  if (action) {
    button.dataset.action = action;
  }

  if (onButtonClick) {
    button.addEventListener("click", onButtonClick);
  }

  return button;
};
