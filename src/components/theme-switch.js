import { createElement } from "../utils/create-element.js";
import { DARK, getTheme, toggleTheme } from "../utils/theme.js";

export const renderThemeSwitch = () => {
  const wrapper = createElement("div", {
    className: "theme-switch-wrapper",
  });

  const input = createElement("input", {
    className: "theme-switch__input visually-hidden",
    type: "checkbox",
    id: "theme-switch",
    checked: getTheme() === DARK,
  });
  input.setAttribute("aria-label", "Dark theme");
  input.addEventListener("change", toggleTheme);

  const label = createElement("label", {
    className: "theme-switch",
    htmlFor: "theme-switch",
  });

  const indicator = createElement("span", {
    className: "theme-switch__indicator",
  });

  const lightIcon = createElement("span", {
    className: "theme-switch__icon theme-switch__icon--light",
  });

  const darkIcon = createElement("span", {
    className: "theme-switch__icon theme-switch__icon--dark",
  });

  label.append(indicator, lightIcon, darkIcon);
  wrapper.append(input, label);

  return wrapper;
};
