export const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);
  Object.assign(element, options);
  return element;
};
