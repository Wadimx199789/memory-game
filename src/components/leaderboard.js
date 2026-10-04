import { createElement } from "../utils/create-element.js";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}.${month}.${date.getFullYear()}`;
};

const createRow = (cells, cellTag) => {
  const row = createElement("tr");

  cells.forEach((text) => {
    row.append(createElement(cellTag, { textContent: text }));
  });

  return row;
};

export const renderLeaderboard = (leaders) => {
  const table = createElement("table", {
    className: "leaderboard",
  });

  const head = createElement("thead");
  head.append(createRow(["#", "Moves", "Date"], "th"));

  const body = createElement("tbody");

  leaders.forEach((leader, index) => {
    body.append(
      createRow([index + 1, leader.moves, formatDate(leader.date)], "td"),
    );
  });

  table.append(head, body);

  const scroll = createElement("div", {
    className: "leaderboard__scroll",
  });
  scroll.append(table);

  return scroll;
};
