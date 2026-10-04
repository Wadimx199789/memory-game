import { createElement } from "../utils/create-element.js";

const TOTAL_PAIRS = 8;

const createStatsItem = (label) => {
  const item = createElement("div", {
    className: "stats__item",
  });

  const labelElement = createElement("span", {
    className: "stats__label",
    textContent: label,
  });

  const value = createElement("span", {
    className: "stats__value",
  });

  item.append(labelElement, value);

  return { item, value };
};

export const createStats = () => {
  const stats = createElement("div", {
    className: "stats",
  });

  const moves = createStatsItem("Moves");
  const pairs = createStatsItem("Pairs");

  stats.append(moves.item, pairs.item);

  const updateStats = ({ movesCount, pairsCount }) => {
    moves.value.textContent = movesCount;
    pairs.value.textContent = `${pairsCount} / ${TOTAL_PAIRS}`;
  };

  updateStats({ movesCount: 0, pairsCount: 0 });

  return { element: stats, updateStats };
};
