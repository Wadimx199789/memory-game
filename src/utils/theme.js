import { getFromStorage, saveToStorage } from "./storage.js";

const THEME_KEY = "theme";
export const DARK = "dark";
export const LIGHT = "light";

const getThemeByBrowserSettings = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK
    : LIGHT;

export const getTheme = () => document.documentElement.dataset.theme;

const setTheme = (theme) => {
  const root = document.documentElement;

  root.classList.add("is-theme-switching");
  root.dataset.theme = theme;
  saveToStorage(THEME_KEY, theme);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.remove("is-theme-switching");
    });
  });
};

export const toggleTheme = () => {
  setTheme(getTheme() === DARK ? LIGHT : DARK);
};

export const initTheme = () => {
  const theme = getFromStorage(THEME_KEY) || getThemeByBrowserSettings();

  document.documentElement.dataset.theme = theme;
};
