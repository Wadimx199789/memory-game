import { createElement } from "../utils/create-element.js";
import { createButton } from "./button.js";

export const createModal = ({
  onCloseModal,
  modalTitle,
  modalSubtitle,
  modalContent,
  modalButtons = [],
}) => {
  const modal = createElement("dialog", {
    className: "modal",
  });

  const modalWindow = createElement("div", {
    className: "modal__window",
  });

  const title = createElement("h2", {
    className: "modal__title",
    textContent: modalTitle,
  });

  modalWindow.append(title);

  if (modalSubtitle) {
    const subtitle = createElement("p", {
      className: "modal__text",
      textContent: modalSubtitle,
    });

    modalWindow.append(subtitle);
  }

  if (modalContent) {
    modalWindow.append(modalContent);
  }

  const actions = createElement("div", {
    className: "modal__actions",
  });

  const closeButton = createButton({
    text: "Close",
    classes: ["button--secondary"],
    action: "close",
  });
  actions.append(...modalButtons, closeButton);
  modalWindow.append(actions);
  modal.append(modalWindow);

  const openModal = () => {
    document.body.append(modal);
    document.body.classList.add("is-locked");
    modal.showModal();
  };

  const closeModal = () => {
    modal.close();
  };

  modal.addEventListener("close", () => {
    modal.remove();
    document.body.classList.remove("is-locked");

    if (onCloseModal) {
      onCloseModal();
    }
  });

  modal.addEventListener("click", (event) => {
    const isOverlayClick = event.target === modal;
    const isCloseClick = event.target.closest("[data-action='close']");

    if (isOverlayClick || isCloseClick) {
      closeModal();
    }
  });

  return { openModal, closeModal };
};
